import React, { useState, useEffect, useRef } from 'react';
import { Send, RefreshCw, Trash2, ThumbsUp, ThumbsDown, ArrowRight, Brain, X, CheckCircle2, Unlock, Copy, Edit2 } from 'lucide-react';
import AiBotIcon from './AiBotIcon';
import { useLanguage } from '../../../contexts/LanguageContext';
import { apiFetch } from '../../../config';
import { sanitizeHtml, inlineMarkdownToHtml } from '../../../utils/sanitize';
import { collection, addDoc } from 'firebase/firestore';
import { db, C } from '../../../firebase';

import {
    SUGGESTED_QUESTIONS, SUGGESTED_QUESTIONS_EN,
    GREETINGS, GREETINGS_EN,
    SMART_GREETINGS, SMART_GREETINGS_EN,
    REJECTION_RESPONSES, REJECTION_RESPONSES_EN,
    REPEAT_RESPONSES, REPEAT_RESPONSES_EN,
    API_FALLBACK_RESPONSES, API_FALLBACK_RESPONSES_EN,
    GREETINGS_FORMAL, GREETINGS_FORMAL_EN,
    GREETINGS_CASUAL, GREETINGS_CASUAL_EN,
    STATUS_HOW_ARE_YOU, STATUS_HOW_ARE_YOU_EN,
    STATUS_WHATS_UP, STATUS_WHATS_UP_EN,
    KNOWLEDGE_BASE, OUT_OF_SCOPE_KEYWORDS,
    isDesignRelated,
    // 🧠 Combined "Elite" conversation engine
    superClean, matchesKeyword, processKhmerNLP,
    CORRECTION_PATTERNS_EN, CORRECTION_PATTERNS_KH,
    UNCERTAIN_PATTERNS_EN, UNCERTAIN_PATTERNS_KH,
    CONTINUATION_PATTERNS_EN, CONTINUATION_PATTERNS_KH,
    CAPABILITY_PATTERNS_EN, CAPABILITY_PATTERNS_KH, CAPABILITY_ANSWER_KH, CAPABILITY_ANSWER_EN,
    isAffirmative, isNegative, extractOfferedTopic, NO_PIVOTS_KH, NO_PIVOTS_EN, detectSocialIntent,
    detectGreetingType, isHowAreYou, isWhatsUp,
    extractProfileSignals, updateUserProfile, clearUserProfile, buildProfileContext,
    parseMultiChoiceQuestion, isShortGibberish,
    RETRY_CHIP_LABELS, OFFLINE_FALLBACK_CHIPS_EN, OFFLINE_FALLBACK_CHIPS_KH,
    SHORT_RETURN_GREETINGS, SHORT_RETURN_GREETINGS_EN,
    SHORT_INPUT_REJECTIONS, SHORT_INPUT_REJECTIONS_EN,
    GUIDANCE_MENU_KH, GUIDANCE_MENU_EN, GUIDANCE_CHIPS_KH, GUIDANCE_CHIPS_EN,
} from '../../../ai_brain';

const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
};

const getRandomItems = (arr, count) => {
    if (!arr || !arr.length) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// ============================================================================
// 🌟 REAL AI BACKEND INTEGRATION (GROQ)
// ============================================================================
const callRealAI = async (userPrompt, language, history = []) => {
    try {
        const recentHistoryText = history.slice(-10).map((msg) =>
            `${msg.role === 'user' ? 'User' : 'AI Assistant'}: ${msg.text}`
        ).join('\n');

        const data = await apiFetch('/chat', {
            method: 'POST',
            body: { prompt: userPrompt, history: recentHistoryText, language },
            timeoutMs: 30000,
        });
        return data.reply || data.answer || data.text || data.message || '✅ Connected, but response was empty.';
    } catch (error) {
        console.error('Backend AI failed:', error);
        return `*(Debug Error)* ⚠️ Connection Failed: ${error.message}\n\n*If this says "Failed to fetch", the server may be waking up (wait ~1 minute) or CORS is blocking the request.*`;
    }
};

const strictClean = (text) => {
    if (!text) return '';
    return text
        .toLowerCase()
        .normalize('NFC')
        .replace(/[​-‍﻿\s.,!?។៕៖៚"“”‘’'*_()\-:;\/]/g, '');
};

// Tokenize for overlap scoring. Khmer clusters of 2+ chars become tokens; so do Latin words.
const tokenize = (text) => {
    if (!text) return [];
    const lower = text.toLowerCase().normalize('NFC');
    const tokens = [];
    const latin = lower.match(/[a-z0-9]{2,}/g);
    if (latin) tokens.push(...latin);
    const khmer = lower.match(/[ក-៿]{2,}/g);
    if (khmer) tokens.push(...khmer);
    return tokens;
};

// 0..1 = fraction of KB-key tokens that appear in the user input.
// Substring fallback is strict: both tokens must be >=4 chars so short
// words like "pen"/"too"/"tool" don't generate spurious hits inside longer ones.
const tokenOverlap = (userTokens, keyTokens) => {
    if (!keyTokens.length) return 0;
    const userSet = new Set(userTokens);
    let hits = 0;
    for (const kt of keyTokens) {
        if (userSet.has(kt)) { hits++; continue; }
        if (kt.length < 4) continue;
        for (const ut of userTokens) {
            if (ut.length >= 4 && (ut.includes(kt) || kt.includes(ut))) { hits++; break; }
        }
    }
    return hits / keyTokens.length;
};

const formatMessage = (text) => {
    if (typeof text !== 'string') return text;
    const html = sanitizeHtml(inlineMarkdownToHtml(text));
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

const ChatBot = ({ messages, setMessages, isDarkMode, isAdmin, liveAiData = [], setLiveAiData }) => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false); 
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [viewportHeight, setViewportHeight] = useState('100%');
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    
    // 🌟 NEW UX STATES
    const [isAndroid, setIsAndroid] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState('');
    const [animState, setAnimState] = useState('idle');
    const [headerStatusText, setHeaderStatusText] = useState('MY DESIGN AI');
    const touchStartX = useRef(0);
    
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const suggestionsScrollRef = useRef(null);
    const isInitialMount = useRef(true);
    const isAutoScrolling = useRef(false);
    // 🧠 Anti-repetition trackers — keep the bot from replaying the same KB
    // paragraph or the same suggestion chips turn after turn (feels "real").
    const recentKbHitsRef = useRef([]);
    const recentChipsRef = useRef([]);
    
    const [currentSuggestions, setCurrentSuggestions] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [trainModalData, setTrainModalData] = useState(null);
    const [isTraining, setIsTraining] = useState(false);
    const [trainSuccess, setTrainSuccess] = useState(false);

    const [currentTopic, setCurrentTopic] = useState(() => {
        if (typeof window !== 'undefined') return localStorage.getItem('affinityPro_current_topic') || null;
        return null;
    });

    const { lang, t } = useLanguage();

    // Merge the local ai_brain knowledge base with live entries synced from
    // Firestore (`ai_knowledge`) so admin-trained answers are searchable too.
    const COMBINED_DB = [...KNOWLEDGE_BASE, ...(liveAiData || [])];

    const getSuggestList = () => lang === 'en' ? SUGGESTED_QUESTIONS_EN : SUGGESTED_QUESTIONS;

    useEffect(() => {
        setIsAndroid(/Android/i.test(navigator.userAgent));
    }, []);

    // 🌟 FIX IOS SAFARI WINDOW SCROLL BUG 🌟
    useEffect(() => {
        const fixViewport = () => {
            if (window.scrollY > 0 || document.documentElement.scrollTop > 0) window.scrollTo(0, 0);
        };
        window.addEventListener('scroll', fixViewport, { passive: true });
        document.body.addEventListener('touchmove', fixViewport, { passive: true });
        return () => {
            window.removeEventListener('scroll', fixViewport);
            document.body.removeEventListener('touchmove', fixViewport);
        };
    }, []);

    const generateSmartGreeting = () => {
        const savedTopic = localStorage.getItem('affinityPro_current_topic'); 
        const greetList = lang === 'en' ? GREETINGS_EN : GREETINGS;
        const smartList = lang === 'en' ? SMART_GREETINGS_EN : SMART_GREETINGS;
        const suggestList = getSuggestList();
        
        let greetingMsg = getRandomItems(greetList, 1)[0] || GREETINGS[0];
        let defaultChips = getRandomItems(suggestList, 3);

        if (savedTopic && savedTopic.trim() !== "") {
            const smartMsgTemplate = getRandomItems(smartList, 1)[0];
            if (smartMsgTemplate) {
                greetingMsg = smartMsgTemplate.replace(/\{topic\}/g, savedTopic);
                defaultChips = [savedTopic, ...getRandomItems(suggestList, 2)];
            }
        }
        setMessages([{ role: 'model', text: greetingMsg, chips: defaultChips, source: 'local' }]);
    };

    useEffect(() => {
        try {
            const savedHistory = localStorage.getItem('affinityPro_chat_history');
            if (savedHistory && JSON.parse(savedHistory).length > 0) {
                setMessages(JSON.parse(savedHistory));
            } else {
                generateSmartGreeting();
            }
        } catch (error) {
            localStorage.removeItem('affinityPro_chat_history');
            generateSmartGreeting();
        }
        setCurrentSuggestions(getRandomItems(getSuggestList(), 3)); 
    }, [lang]);

    useEffect(() => {
        if (messages.length > 0) localStorage.setItem('affinityPro_chat_history', JSON.stringify(messages));
        if (currentTopic) localStorage.setItem('affinityPro_current_topic', currentTopic);
    }, [messages, currentTopic]);

    const handleInputInput = (e) => setInput(e.currentTarget.textContent || e.currentTarget.innerText);

    // 🌟 ANIMATED REFRESH 🌟
    const handleRefresh = (e, isAuto = false, dir = 'right') => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        if (!isAuto) setAnimState(dir === 'right' ? 'out-left' : 'out-right');

        setTimeout(() => {
            setCurrentSuggestions(prev => {
                const allList = getSuggestList();
                const available = allList.filter(item => !prev.includes(item));
                const pool = available.length >= 3 ? available : allList;
                return getRandomItems(pool, 3);
            });

            if (!isAuto) {
                setAnimState(dir === 'right' ? 'in-right' : 'in-left');
                setTimeout(() => setAnimState('idle'), 50);
            }

            if (suggestionsScrollRef.current) {
                suggestionsScrollRef.current.scrollTo({ left: 0, behavior: 'auto' });
            }
        }, isAuto ? 0 : 300);
    };

    const getAnimClasses = () => {
        switch (animState) {
            case 'out-left': return 'opacity-0 -translate-x-12 scale-95 transition-all duration-300';
            case 'out-right': return 'opacity-0 translate-x-12 scale-95 transition-all duration-300';
            case 'in-right': return 'opacity-0 translate-x-12 scale-95 transition-none';
            case 'in-left': return 'opacity-0 -translate-x-12 scale-95 transition-none';
            case 'idle':
            default: return 'opacity-100 translate-x-0 scale-100 transition-all duration-300';
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => { handleRefresh(null, true); }, 15000); 
        return () => clearInterval(intervalId);
    }, [lang]);

    // 🌟 PULL TO REFRESH SUGGESTIONS 🌟
    useEffect(() => {
        const container = suggestionsScrollRef.current;
        if (!container) return;

        const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
        const handleTouchEnd = (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const distance = touchStartX.current - touchEndX;

            if (distance > 60 && container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                triggerHaptic(); handleRefresh(null, false, 'right');
            } else if (distance < -60 && container.scrollLeft <= 10) {
                triggerHaptic(); handleRefresh(null, false, 'left');
            }
        };

        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });
        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [lang]);

    // 🌟 HEADER TEXT ANIMATION 🌟
    useEffect(() => {
        const texts = lang === 'en' ? ['Welcome', 'to', 'My Design'] : ['សូមស្វាគមន៍', 'មកកាន់', 'ម៉ាយឌីហ្សាញ'];
        setHeaderStatusText(texts[0]);
        let currentIndex = 0;
        const textInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            setHeaderStatusText(texts[currentIndex]);
        }, 3000);
        return () => clearInterval(textInterval);
    }, [lang]);

    const handleClearChat = (e) => {
        if (e) e.preventDefault();
        triggerHaptic();
        setShowConfirmModal(true);
    };

    const confirmClear = () => {
        localStorage.removeItem('affinityPro_chat_history');
        localStorage.removeItem('affinityPro_current_topic');
        clearUserProfile();
        recentKbHitsRef.current = [];
        recentChipsRef.current = [];
        generateSmartGreeting();
        setCurrentTopic(null);
        setShowConfirmModal(false);
    };

    // 🌟 NEW MSG CONTROLS 🌟
    const handleCopy = (text, index) => {
        triggerHaptic(); navigator.clipboard.writeText(text);
        setCopiedIndex(index); setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleEditClick = (index, text) => { triggerHaptic(); setEditingIndex(index); setEditText(text); };
    const cancelEdit = () => { setEditingIndex(null); setEditText(''); };

    const submitEdit = (index) => {
        if (!editText.trim()) return;
        const newHistory = messages.slice(0, index);
        setEditingIndex(null); handleSend(editText, newHistory);
    };

    const handleFeedback = (index, type) => {
        triggerHaptic();
        setMessages(prev => {
            const updated = [...prev]; updated[index] = { ...updated[index], feedback: type }; return updated;
        });
    };

    const handleTrainClick = (index) => {
        triggerHaptic();
        const userMsg = index > 0 && messages[index - 1].role === 'user' ? messages[index - 1].text : '';
        const botMsg = messages[index].text;
        setTrainModalData({ question: userMsg, answer: botMsg });
    };

    // 🔒 Silent auto-trainer — after a fresh backend answer, ask the AI to distill
    // it into a KB entry and persist it to Firestore so the brain keeps growing.
    const runSecretBackgroundTraining = async (userQ, botA) => {
        try {
            const prompt = `Analyze this interaction:\nUser Question: "${userQ}"\nBot Answer: "${botA}"\n\nTask:\n1. Check if this is related to Graphic Design, Affinity software, Photo Editing, Layouts, or Typography. If it is UNRELATED, reply ONLY with the exact word: REJECT\n2. If it IS related, format as JSON:\n{"primaryKeys": ["key1", "key2"], "keys": ["k1", "k2", "k3"], "regex": ["reg1"], "answer": "Corrected Khmer", "answer_en": "English translation"}`;
            const res = await callRealAI(prompt, 'en', []);
            if (res.includes('REJECT')) return;
            const match = res.match(/\{[\s\S]*\}/);
            if (!match) return;
            const newEntry = JSON.parse(match[0]);
            const existingKeys = new Set(COMBINED_DB.flatMap(item => [...(item.primaryKeys || []), ...(item.keys || [])].map(strictClean)));
            const uniquePrimaryKeys = (newEntry.primaryKeys || []).filter(k => !existingKeys.has(strictClean(k)));
            const uniqueKeys = (newEntry.keys || []).filter(k => !existingKeys.has(strictClean(k)));
            if (uniquePrimaryKeys.length === 0 && uniqueKeys.length === 0) return;
            if (uniquePrimaryKeys.length === 0 && uniqueKeys.length > 0) uniquePrimaryKeys.push(uniqueKeys[0]);
            newEntry.primaryKeys = uniquePrimaryKeys;
            newEntry.keys = uniqueKeys;
            const docRef = await addDoc(collection(db, C('ai_knowledge')), newEntry);
            newEntry.id = docRef.id;
            if (setLiveAiData) setLiveAiData(prev => [...prev, newEntry]);
        } catch { /* best-effort background training */ }
    };

    // ✍️ Admin "Train AI" modal — persists a curated Q&A straight to Firestore.
    const submitTraining = async (e) => {
        e.preventDefault();
        if (!trainModalData.question.trim() || !trainModalData.answer.trim()) return;

        setIsTraining(true);
        try {
            const q = trainModalData.question.trim();
            const entry = {
                primaryKeys: [q],
                keys: [q],
                regex: [],
                answer: trainModalData.answer.trim(),
                answer_en: trainModalData.answer.trim(),
            };
            const docRef = await addDoc(collection(db, C('ai_knowledge')), entry);
            if (setLiveAiData) setLiveAiData(prev => [...prev, { ...entry, id: docRef.id }]);
            setTrainSuccess(true);
            setTimeout(() => {
                setTrainModalData(null);
                setTrainSuccess(false);
            }, 2000);
        } catch (error) {
            alert(error.message || 'Failed to save to Firestore. Please check your connection.');
        } finally {
            setIsTraining(false);
        }
    };

    // 🧠 Pick suggestion chips that haven't been shown in the last few turns,
    // so the bot doesn't keep offering the user the exact same prompts.
    const pickFreshChips = (count = 3) => {
        const all = getSuggestList();
        const recent = recentChipsRef.current;
        const fresh = all.filter(q => !recent.includes(q));
        const pool = fresh.length >= count ? fresh : all;
        const picked = getRandomItems(pool, count);
        recentChipsRef.current = [...picked, ...recent].slice(0, 9);
        return picked;
    };

    // 🧠 After a trusted chip is forwarded to the backend, surface follow-up
    // chips related to that topic (from the nearest KB node); else fresh ones.
    const getTopicRelatedChips = (query, count = 3) => {
        const userTokens = tokenize(query);
        let best = null, bestOverlap = 0;
        for (const item of COMBINED_DB) {
            const rawKeys = [...(item.primaryKeys || []), ...(item.keys || [])];
            for (const key of rawKeys) {
                const ov = tokenOverlap(userTokens, tokenize(key));
                if (ov > bestOverlap) { bestOverlap = ov; best = item; }
            }
        }
        if (best && bestOverlap >= 0.5) {
            const chips = (lang === 'en' && best.chips_en) ? best.chips_en : best.chips;
            if (chips && chips.length) return chips.slice(0, count);
        }
        return pickFreshChips(count);
    };

    const generateFilteredChips = (exactMatch, rawQuery) => {
        let chipsData = lang === 'en' && exactMatch.chips_en ? exactMatch.chips_en : exactMatch.chips;
        if (chipsData) {
            const strictQuery = strictClean(rawQuery);
            chipsData = chipsData.filter(c => strictClean(c) !== strictQuery);
            if (chipsData.length < 2) {
                const moreSuggestions = pickFreshChips(3);
                chipsData = [...new Set([...chipsData, ...moreSuggestions])].slice(0, 2);
            }
        }
        return chipsData || pickFreshChips(2);
    };

    const findAIResponse = (inputTxt, history = [], source = 'user') => {
        const rawInput = inputTxt.trim();
        const rawLower = rawInput.toLowerCase();
        const cleanInput = strictClean(rawInput);
        const wordCount = rawInput.split(/\s+/).filter(Boolean).length;
        const isTrustedSource = source === 'chip' || source === 'suggestion';

        // 🔁 RETRY CHIP — re-send the last real user question to the backend.
        if (RETRY_CHIP_LABELS.includes(rawInput)) {
            const lastQuery = [...history].reverse().find(m => m.role === 'user' && !RETRY_CHIP_LABELS.includes((m.text || '').trim()));
            return { needsBackend: true, backendPrompt: lastQuery?.text || rawInput };
        }

        // Shared response shaper — anti-repetition acknowledgment + low-confidence
        // hedge. Re-hit ack wins over the hedge (don't say "not sure" about
        // something we just confidently answered).
        const formatSuccessResponse = (bestMatch, opts = {}) => {
            const itemKey = bestMatch.primaryKeys ? bestMatch.primaryKeys[0] : null;
            const isRecentRehit = itemKey && recentKbHitsRef.current.includes(itemKey);
            if (itemKey) {
                recentKbHitsRef.current.push(itemKey);
                while (recentKbHitsRef.current.length > 3) recentKbHitsRef.current.shift();
            }
            setCurrentTopic(itemKey || null);

            let answerText = lang === 'en' && bestMatch.answer_en ? bestMatch.answer_en : bestMatch.answer;
            let finalColors = bestMatch.colors;
            if (bestMatch.dynamicColor) {
                const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
                finalColors = [hex]; answerText = answerText.replace('{hex}', hex);
            }
            if (isRecentRehit) {
                const ackEN = "*(We just covered this 👆 — same breakdown for quick recall. Want a different angle? Tap a chip below.)*\n\n";
                const ackKH = "*(យើងទើបតែនិយាយរឿងនេះ 👆 — នេះជាការពន្យល់ដដែលសម្រាប់រំលឹក។ បើចង់ស្តាប់មុំផ្សេង សូមចុច chip ខាងក្រោម។)*\n\n";
                answerText = (lang === 'en' ? ackEN : ackKH) + answerText;
            } else if (opts.lowConfidence) {
                const softEN = "*(I'm not 100% sure which topic you meant, but this looks closest. If it's off, tap a chip below or rephrase.)*\n\n";
                const softKH = "*(ខ្ញុំមិនច្បាស់ ១០០% ថាបងសួរពីប្រធានបទណាទេ ប៉ុន្តែនេះហាក់ដូចជាជិតបំផុត។ បើខុស សូមចុច chip ខាងក្រោម ឬសរសេរម្តងទៀត។)*\n\n";
                answerText = (lang === 'en' ? softEN : softKH) + answerText;
            }
            return { answer: answerText, chips: generateFilteredChips(bestMatch, rawInput), uiElement: bestMatch.uiElement, colors: finalColors, actionButton: bestMatch.actionButton, needsBackend: false };
        };

        // ============================================================
        // 🛡️ ZERO-FLAW PATH — chip / suggestion clicks (HIGHEST PRIORITY)
        // Bot-curated prompts MUST map to their exact answer with zero drift,
        // bypassing all conversational intent detection.
        // ============================================================
        if (isTrustedSource) {
            const inputSuperClean = superClean(rawInput);
            for (const item of COMBINED_DB) {
                if (item.primaryKeys && item.primaryKeys.some(pk => superClean(pk) === inputSuperClean)) return formatSuccessResponse(item);
            }
            for (const item of COMBINED_DB) {
                if (item.regex && item.regex.some(r => { try { return new RegExp(r, 'i').test(rawInput); } catch { return false; } })) return formatSuccessResponse(item);
            }
            if (cleanInput.length > 1) {
                for (const item of COMBINED_DB) {
                    if (item.primaryKeys && item.primaryKeys.some(pk => strictClean(pk) === cleanInput)) return formatSuccessResponse(item);
                }
            }
            let bestItem = null, bestScore = 0;
            const rawTokensT = rawLower.split(/\s+/).filter(t => t.length > 1);
            for (const item of COMBINED_DB) {
                let score = 0;
                const searchKeys = item.keys ? item.keys.map(k => k.toLowerCase().trim()).filter(k => k.length > 1) : [];
                for (const key of searchKeys) {
                    const keyClean = strictClean(key);
                    if (rawLower === key || cleanInput === keyClean) score += 5000 + keyClean.length;
                    else if (keyClean.length > 2 && cleanInput.includes(keyClean)) score += 2000 + ((key.split(' ').length || 1) * 100) + keyClean.length;
                    else { const kt = key.split(/\s+/); let shared = 0; for (const t of rawTokensT) if (kt.includes(t)) shared++; if (shared > 0) score += shared * 200 + keyClean.length; }
                }
                if (score > bestScore) { bestScore = score; bestItem = item; }
            }
            if (bestItem && bestScore >= 2000) return formatSuccessResponse(bestItem);
            // Trusted but unmatched → safe to forward (chips are design-scoped).
            return { needsBackend: true, query: rawInput, isTrustedChip: true };
        }

        // 🔁 Repeat detection (same question typed 2+ times in a row).
        let repeatCount = 0;
        for (let i = history.length - 1; i >= 0; i--) {
            if (history[i].role === 'user') { if (strictClean(history[i].text) === cleanInput) repeatCount++; else break; }
        }
        if (repeatCount > 1) {
            const repeatData = lang === 'en' ? REPEAT_RESPONSES_EN : REPEAT_RESPONSES;
            return { answer: getRandomItems(repeatData.level2, 1)[0], chips: pickFreshChips(3), needsBackend: false };
        }

        // Detect the bot's last question so a bare yes/no routes back to it.
        const lastBotMessage = [...history].reverse().find(m => m.role === 'model');
        const lastBotText = (lastBotMessage?.text || '').trim();
        const lastBotEndsInQuestion = /[?？]\s*$/.test(lastBotText);
        const buildContextualBackendPrompt = (userInput, kind) => {
            if (!lastBotEndsInQuestion && kind !== 'CONTINUATION') return userInput;
            const snippet = lastBotText.length > 400 ? '…' + lastBotText.slice(-400) : lastBotText;
            if (kind === 'CONTINUATION') {
                return lang === 'en'
                    ? `${userInput}\n\n[Context: the user wants you to CONTINUE elaborating on your previous response: "${snippet}". Give MORE detail/examples — do NOT restart with a generic intro.]`
                    : `${userInput}\n\n[បរិបទ៖ អ្នកប្រើចង់ឱ្យអ្នកបន្តពន្យល់បន្ថែមលើចម្លើយមុន៖ "${snippet}"។ ផ្តល់ព័ត៌មាន/ឧទាហរណ៍បន្ថែម — កុំចាប់ផ្តើមឡើងវិញ។]`;
            }
            return lang === 'en'
                ? `${userInput}\n\n[Context: this is a ${kind} answer to your previous question — "${snippet}". Continue that thread; do NOT pivot to a generic reply.]`
                : `${userInput}\n\n[បរិបទ៖ នេះជាចម្លើយ ${kind} ចំពោះសំណួរមុនរបស់អ្នក — "${snippet}"។ សូមបន្តតាមនោះ។]`;
        };

        // 🧠 CORRECTION — "you misunderstood / wrong answer".
        const isCorrection = CORRECTION_PATTERNS_EN.test(rawInput) || CORRECTION_PATTERNS_KH.some(p => rawInput.includes(p));
        if (isCorrection && history.length >= 2) {
            return { answer: lang === 'en' ? "Apologies — I misread your question. 🙏 Could you rephrase what you'd like to know? Or pick a direction below:" : "សុំទោសបង — ខ្ញុំយល់សំណួរខុសហើយ។ 🙏 សូមសរសេររឿងដែលចង់ដឹងម្តងទៀតបន្តិច ឬជ្រើសរើសខាងក្រោម៖", chips: pickFreshChips(3), needsBackend: false };
        }

        // 🧠 UNCERTAIN — "I don't know where to start". Show the 4-path menu.
        const isUncertain = UNCERTAIN_PATTERNS_EN.test(rawInput) || UNCERTAIN_PATTERNS_KH.some(p => rawInput.includes(p));
        if (isUncertain) {
            return { answer: lang === 'en' ? GUIDANCE_MENU_EN : GUIDANCE_MENU_KH, chips: lang === 'en' ? GUIDANCE_CHIPS_EN : GUIDANCE_CHIPS_KH, needsBackend: false };
        }

        // 🧠 CAPABILITY / ABOUT — "what can you do? / who are you? / ចេះអ្វីខ្លះ?"
        // Answer with what the bot helps with instead of forwarding to the
        // backend (which would otherwise define a random design concept).
        const isCapability =
            (wordCount <= 8 && CAPABILITY_PATTERNS_EN.test(rawInput)) ||
            (wordCount <= 3 && rawInput.replace(/\s/g, '').length <= 22 && CAPABILITY_PATTERNS_KH.some(p => rawInput.includes(p))) ||
            ['help', 'helpme', 'ជួយ', 'ជួយផង', 'ជួយខ្ញុំ', 'ជួយខ្ញុំផង'].includes(cleanInput);
        if (isCapability) {
            return { answer: lang === 'en' ? CAPABILITY_ANSWER_EN : CAPABILITY_ANSWER_KH, chips: lang === 'en' ? GUIDANCE_CHIPS_EN : GUIDANCE_CHIPS_KH, needsBackend: false };
        }

        // ── NEGATIVE ("no / ទេ / not now / no thanks") ──────────────────────
        // Whole short reply only, so "how to remove background" is never a "no".
        if (isNegative(rawInput, cleanInput, wordCount)) {
            setCurrentTopic(null);
            if (history.length <= 1) {
                return { answer: lang === 'en' ? "No problem at all! Take your time. ✨ I'll be right here whenever you're ready to create something amazing." : "បាទ មិនអីទេបង! សម្រាកសិនចុះ។ ✨ ពេលណាមានអារម្មណ៍ចង់ Design ឬមានសំណួរ ចាំជជែកជាមួយខ្ញុំទៀតណា៎!", chips: pickFreshChips(3), needsBackend: false };
            }
            // Mid-conversation "no" → graceful local pivot + fresh ideas (offline-safe).
            return { answer: getRandomItems(lang === 'en' ? NO_PIVOTS_EN : NO_PIVOTS_KH, 1)[0], chips: pickFreshChips(3), needsBackend: false };
        }

        // ── AFFIRMATIVE ("yes / ok / sure / បាទ / ចង់ / យល់ហើយ") ─────────────
        // Continue the bot's OWN offer: resolve the exact topic it proposed —
        // local KB first (instant, offline), backend-with-context as fallback —
        // instead of a generic "what do you want to know?" reply.
        if (isAffirmative(rawInput, cleanInput, wordCount)) {
            if (history.length <= 1) {
                return { answer: lang === 'en' ? "Great! 🚀 What specifically would you like to know? Tell me the topic or your goal and I'll dive in!" : "បាទ! 🚀 តើបងចង់ដឹងពីក្បួនរចនាអ្វីដែរ? ប្រាប់ខ្ញុំពីប្រធានបទ ឬគោលដៅ ខ្ញុំនឹងជួយភ្លាម!", chips: pickFreshChips(3), needsBackend: false };
            }
            const choicesYes = parseMultiChoiceQuestion(lastBotText);
            if (choicesYes) {
                return { answer: lang === 'en' ? "Got it! 👍 Which of these did you want me to cover? Tap one below:" : "បាទបង! 👍 តើបងចង់ឱ្យខ្ញុំពន្យល់ផ្នែកណាក្នុងចំណោមនេះ? សូមចុចមួយខាងក្រោម៖", chips: choicesYes, needsBackend: false };
            }
            const offered = extractOfferedTopic(lastBotText);
            if (offered) {
                const sub = findAIResponse(offered, history, 'suggestion');
                if (sub && !sub.needsBackend) return sub;                 // instant local KB answer
                return { needsBackend: true, backendPrompt: buildContextualBackendPrompt(offered, 'YES') };
            }
            if (lastBotEndsInQuestion) {
                return { needsBackend: true, backendPrompt: buildContextualBackendPrompt(rawInput, 'YES') };
            }
            return { answer: lang === 'en' ? "Awesome! 🚀 What would you like to explore next?" : "ល្អណាស់បង! 🚀 តើចង់ស្វែងយល់អ្វីបន្តទៀត?", chips: pickFreshChips(3), needsBackend: false };
        }

        // THANKS / EMOJI / light acknowledgments ("got it", "i see").
        const exactThanks = ['thanks', 'thankyou', 'អរគុណ', 'អគុណ', 'អរគុណច្រើន'].map(strictClean);
        const exactAck = ['gotit', 'isee', 'understood', 'ចឹងតើ', 'okthen'].map(strictClean);
        const emojiRegex = /^(👋|🙏|❤️|👍|✌️|✨|😊|😁|📸|🎨|🔥)$/;
        if (emojiRegex.test(rawInput)) return { answer: lang === 'en' ? `Hello there! ${rawInput} How can I help with your design today?` : `សួស្តី! ${rawInput} តើថ្ងៃនេះចង់ឱ្យខ្ញុំជួយរឿង Design អ្វីដែរ?`, chips: pickFreshChips(3), needsBackend: false };
        if (exactThanks.includes(cleanInput)) return { answer: lang === 'en' ? "You're very welcome! 😊 Ask me anything else about design anytime. ✨" : "ដោយក្តីរីករាយបំផុត! 😊 បើមានចម្ងល់រឿង Design កុំភ្លេចសួរណា៎! ✨", chips: pickFreshChips(3), needsBackend: false };
        if (exactAck.includes(cleanInput)) {
            if (lastBotEndsInQuestion && history.length > 1) return { needsBackend: true, backendPrompt: buildContextualBackendPrompt(rawInput, 'acknowledged') };
            return { answer: lang === 'en' ? "Glad that made sense! 🙌 What would you like to explore next?" : "ល្អណាស់បង! 🙌 ខ្ញុំសប្បាយចិត្តដែលជួយបាន។ តើចង់ស្វែងយល់អ្វីបន្តទៀត?", chips: pickFreshChips(3), needsBackend: false };
        }

        // GREETINGS (broad Khmer + romanized + English) + "how are you" / "what's up".
        // "How are you" is checked first (more specific than a bare greeting).
        if (isHowAreYou(rawInput)) {
            const list = lang === 'en' ? STATUS_HOW_ARE_YOU_EN : STATUS_HOW_ARE_YOU;
            return { answer: getRandomItems(list, 1)[0], chips: pickFreshChips(3), needsBackend: false };
        }
        if (isWhatsUp(rawInput)) {
            const list = lang === 'en' ? STATUS_WHATS_UP_EN : STATUS_WHATS_UP;
            return { answer: getRandomItems(list, 1)[0], chips: pickFreshChips(3), needsBackend: false };
        }
        const greetType = detectGreetingType(rawInput, wordCount);
        if (greetType) {
            let total = 0, consec = 0, isConsec = true;
            for (let i = history.length - 1; i >= 0; i--) {
                if (history[i].role === 'user') {
                    const pr = history[i].text; const pwc = pr.split(/\s+/).filter(Boolean).length;
                    if (detectGreetingType(pr, pwc)) { total++; if (isConsec) consec++; }
                    else isConsec = false;
                }
            }
            if (total >= 1) {
                if (consec >= 2) { const rd = lang === 'en' ? REPEAT_RESPONSES_EN : REPEAT_RESPONSES; return { answer: getRandomItems(rd.level2, 1)[0], chips: pickFreshChips(3), needsBackend: false }; }
                const shortList = lang === 'en' ? SHORT_RETURN_GREETINGS_EN : SHORT_RETURN_GREETINGS;
                return { answer: getRandomItems(shortList, 1)[0], chips: pickFreshChips(3), needsBackend: false };
            }
            const targetList = greetType === 'formal' ? (lang === 'en' ? GREETINGS_FORMAL_EN : GREETINGS_FORMAL) : (lang === 'en' ? GREETINGS_CASUAL_EN : GREETINGS_CASUAL);
            return { answer: getRandomItems(targetList, 1)[0], chips: pickFreshChips(3), needsBackend: false };
        }

        // 🧠 CONTINUATION — short "tell me more" with prior context.
        const isContinuation = CONTINUATION_PATTERNS_EN.test(rawInput) || CONTINUATION_PATTERNS_KH.some(p => rawInput.includes(p));
        if (isContinuation && wordCount <= 4 && history.length >= 2 && lastBotText) {
            return { needsBackend: true, backendPrompt: buildContextualBackendPrompt(rawInput, 'CONTINUATION') };
        }

        // ============================================================
        // KB MATCHING — exact / regex / fuzzy substring + token scoring
        // ============================================================
        for (const item of COMBINED_DB) { if (item.primaryKeys && item.primaryKeys.some(pk => superClean(pk) === superClean(rawInput))) return formatSuccessResponse(item); }
        // Exact primaryKey (filler-stripped) still short-circuits. Regex is NOT
        // returned first here — it feeds the scoring pass below so the MOST
        // SPECIFIC entry wins instead of whichever appears earliest in the array
        // (otherwise a broad regex like "ia" or "logo" shadows specific topics).
        if (cleanInput.length > 1) {
            for (const item of COMBINED_DB) {
                if (item.primaryKeys && item.primaryKeys.some(pk => strictClean(pk) === cleanInput)) return formatSuccessResponse(item);
            }
        }

        let matches = [];
        const rawTokens = rawLower.split(/\s+/).filter(t => t.length > 1);
        if (cleanInput.length > 1 || rawTokens.length > 0) {
            for (const item of COMBINED_DB) {
                let score = 0;
                const searchKeys = item.keys ? item.keys.map(k => k.toLowerCase().trim()).filter(k => k.length > 1) : [];
                for (const key of searchKeys) {
                    const keyClean = strictClean(key);
                    if (rawLower === key || cleanInput === keyClean) score += 5000 + keyClean.length;
                    else if (keyClean.length > 2 && cleanInput.includes(keyClean)) score += 2000 + ((key.split(' ').length || 1) * 100) + keyClean.length;
                    else if (cleanInput.length > 2 && keyClean.includes(cleanInput)) score += 1500 + cleanInput.length;
                    else { const kt = key.split(/\s+/); let shared = 0; for (const t of rawTokens) if (kt.includes(t)) shared++; if (shared > 0) score += shared * 200 + keyClean.length; }
                }
                // KB regex anchors contribute a MODERATE score (1600): above weak
                // token-overlap, but BELOW a direct substring key match (2000+) so a
                // greedy regex can't outrank an entry whose key literally appears in
                // the query. Curated regex-only entries still clear the 500 threshold.
                if (score < 1600 && item.regex && wordCount <= 12 && item.regex.some(r => { try { return new RegExp(r, 'i').test(rawInput); } catch { return false; } })) score = Math.max(score, 1600);
                if (score > 0) matches.push({ item, score });
            }
        }
        if (matches.length > 0) {
            matches.sort((a, b) => b.score - a.score);
            const seen = new Set(); const uniq = [];
            for (const m of matches) {
                const ans = (m.item.answer || (m.item.primaryKeys && m.item.primaryKeys[0]) || '').replace(/\s+/g, '');
                if (!seen.has(ans)) { seen.add(ans); uniq.push(m); }
            }
            if (uniq.length > 0 && uniq[0].score >= 500) {
                return formatSuccessResponse(uniq[0].item, { lowConfidence: uniq[0].score < 1500 });
            }
        }

        // ============================================================
        // 💬 SOCIAL / SMALL-TALK — only after the KB misses, so real design
        // questions are never swallowed. Keeps the bot lively (compliments,
        // feelings, jokes, "are you human", goodbyes) while every reply nudges
        // back to design. Gated to short messages to avoid eating mixed queries.
        // ============================================================
        if (wordCount <= 6) {
            const socialReply = detectSocialIntent(rawInput, lang);
            if (socialReply) {
                setCurrentTopic(null);
                return { answer: socialReply, chips: pickFreshChips(3), needsBackend: false };
            }
        }

        // ============================================================
        // OFFLINE REJECTION — blacklist / gibberish / off-topic
        // ============================================================
        // Word-boundary blacklist so "car" doesn't reject "scarcity".
        if (OUT_OF_SCOPE_KEYWORDS.some(word => matchesKeyword(rawInput, cleanInput, word))) {
            const rejectList = lang === 'en' ? REJECTION_RESPONSES_EN : REJECTION_RESPONSES;
            return { answer: getRandomItems(rejectList, 1)[0], chips: pickFreshChips(3), needsBackend: false };
        }
        if (isShortGibberish(rawInput, cleanInput)) {
            const shortList = lang === 'en' ? SHORT_INPUT_REJECTIONS_EN : SHORT_INPUT_REJECTIONS;
            return { answer: getRandomItems(shortList, 1)[0], chips: pickFreshChips(3), needsBackend: false };
        }
        // Whitelist gate: a non-short message must contain at least one design term.
        const designRelated = isDesignRelated(rawInput);
        const isShortReply = wordCount <= 2;
        if (!designRelated && !isShortReply) {
            const rejectList = lang === 'en' ? REJECTION_RESPONSES_EN : REJECTION_RESPONSES;
            return { answer: getRandomItems(rejectList, 1)[0], chips: pickFreshChips(3), needsBackend: false };
        }

        return { needsBackend: true, query: rawInput };
    };

    const handleSend = async (text = null, customHistory = null, source = 'user') => {
        if (loading) return;

        const rawMsg = typeof text === 'string' ? text : input;
        if (!rawMsg.trim()) return;

        // 🌟 Apply the 8-layer Khmer NLP cleanup before anything else (Khmer only).
        const msg = lang === 'km' ? processKhmerNLP(rawMsg) : rawMsg.trim();

        const isFromChip = source !== 'user';
        const keepFocus = isKeyboardOpen && !isFromChip;
        const rudeWords = ['ឆ្កួត', 'ចង្រៃ', 'មីចោរ', 'អាឆ្កែ', 'ចុយ', 'ថោកទាប', 'ឡប់', 'ភ្លើ', 'ល្ងង់', 'អាថោក', 'មីថោក', 'fuck', 'shit', 'bitch', 'stupid', 'asshole'];
        const cleanMsg = strictClean(msg);

        if (rudeWords.some(word => matchesKeyword(msg, cleanMsg, word))) {
            setInput(''); if (inputRef.current) inputRef.current.textContent = '';
            setMessages(prev => [...prev, { role: 'model', text: lang === 'en' ? "Please use appropriate language! 🚫🙏 I am here to help you learn design." : "សូមមេត្តាប្រើប្រាស់ពាក្យសម្ដីសមរម្យ! 🚫🙏 ខ្ញុំនៅទីនេះដើម្បីជួយបង្រៀននិងពន្យល់ពីបច្ចេកទេសតែប៉ុណ្ណោះ។", chips: [], source: 'local' }]);
            if (keepFocus) setTimeout(() => inputRef.current?.focus(), 50);
            return;
        }

        setInput('');
        if (inputRef.current) inputRef.current.textContent = '';
        if (isFromChip) {
            setIsKeyboardOpen(false);
            if (inputRef.current) inputRef.current.blur();
        }

        const currentHistory = customHistory || messages;

        // 🧠 Quietly learn the user's profile (skill / software / discipline /
        // goal) from typed messages only — chip clicks aren't real signals.
        if (source === 'user') {
            const signals = extractProfileSignals(msg);
            if (Object.keys(signals).length > 0) updateUserProfile(signals);
        }

        setMessages([...currentHistory, { role: 'user', text: msg }]);
        setLoading(true);

        try {
            const responseData = findAIResponse(msg, currentHistory, source);
            const isTrustedChip = !!responseData.isTrustedChip;

            if (responseData.needsBackend) {
                const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
                // Skip the cache for enriched prompts (yes/no/continuation) — the
                // key would just be "yes" and return a wrong cached answer.
                const useCache = !responseData.backendPrompt;
                let cachedAnswer = null, cachedChips = null;
                if (useCache) {
                    try {
                        const mem = JSON.parse(localStorage.getItem('affinityPro_ai_memory_cache') || '[]');
                        const found = mem.find(m => m.lang === lang && m.q === cleanMsg && (!m.ts || (Date.now() - m.ts) < CACHE_TTL_MS));
                        if (found) { cachedAnswer = found.a; cachedChips = found.chips || null; }
                    } catch { /* cache is best-effort */ }
                }

                if (cachedAnswer) {
                    await new Promise(resolve => setTimeout(resolve, 350));
                    const nextChips = cachedChips || (isTrustedChip ? getTopicRelatedChips(msg, 3) : pickFreshChips(3));
                    setMessages(prev => [...prev, { role: 'model', text: cachedAnswer, chips: nextChips, source: 'backend' }]);
                } else {
                    const historyDiet = currentHistory.slice(-10); // 5-turn memory window
                    const profileContext = buildProfileContext(lang);
                    const basePrompt = responseData.backendPrompt || msg;
                    const backendPrompt = profileContext ? basePrompt + profileContext : basePrompt;
                    const [rawAiAnswer] = await Promise.all([
                        callRealAI(backendPrompt, lang, historyDiet),
                        new Promise(resolve => setTimeout(resolve, 500))
                    ]);

                    let aiBackendAnswer = rawAiAnswer;
                    let resolvedSource = 'backend';
                    const trimmed = (aiBackendAnswer || '').trim();
                    const isUnusable = trimmed.length < 3 || trimmed.includes('Connected, but response was empty');

                    if (aiBackendAnswer.includes('*(Debug Error)*') || isUnusable) {
                        const fallbackList = lang === 'en' ? API_FALLBACK_RESPONSES_EN : API_FALLBACK_RESPONSES;
                        aiBackendAnswer = getRandomItems(fallbackList, 1)[0] || (lang === 'en' ? "I am currently offline, but here is a quick tip: Use high contrast!" : "សុំទោស ខ្ញុំកំពុងគ្មានអ៊ីនធឺណិត។ ប៉ុន្តែនេះជាគន្លឹះ៖ ត្រូវប្រើពណ៌ដែលផ្ទុយគ្នាជានិច្ច!");
                        resolvedSource = 'fallback';
                    }

                    const nextChips = resolvedSource === 'fallback'
                        ? (lang === 'en' ? OFFLINE_FALLBACK_CHIPS_EN : OFFLINE_FALLBACK_CHIPS_KH)
                        : (isTrustedChip ? getTopicRelatedChips(msg, 3) : pickFreshChips(3));

                    if (useCache && resolvedSource === 'backend') {
                        try {
                            const mem = JSON.parse(localStorage.getItem('affinityPro_ai_memory_cache') || '[]');
                            const fresh = mem.filter(m => !m.ts || (Date.now() - m.ts) < CACHE_TTL_MS);
                            fresh.push({ q: cleanMsg, a: aiBackendAnswer, chips: nextChips, lang, ts: Date.now() });
                            while (fresh.length > 50) fresh.shift();
                            localStorage.setItem('affinityPro_ai_memory_cache', JSON.stringify(fresh));
                        } catch { /* cache is best-effort */ }
                        // 🔒 Grow the Firestore knowledge base from fresh backend answers.
                        runSecretBackgroundTraining(cleanMsg, aiBackendAnswer);
                    }

                    setMessages(prev => [...prev, { role: 'model', text: aiBackendAnswer, chips: nextChips, source: resolvedSource }]);
                }

            } else {
                await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));
                setMessages(prev => [...prev, {
                    role: 'model', text: responseData.answer, chips: responseData.chips || [],
                    uiElement: responseData.uiElement, colors: responseData.colors, actionButton: responseData.actionButton, source: 'local'
                }]);
            }

        } catch (error) {
            const fallbackList = lang === 'en' ? API_FALLBACK_RESPONSES_EN : API_FALLBACK_RESPONSES;
            const randomFallback = getRandomItems(fallbackList, 1)[0] || (lang === 'en' ? "I'm having trouble connecting to the internet. While we wait, try practicing with the Layout Tool!" : "ខ្ញុំកំពុងមានបញ្ហាភ្ជាប់អ៊ីនធឺណិត។ ចន្លោះពេលនេះ សូមសាកល្បងអនុវត្តនៅក្នុង Layout Tool សិនទៅ!");
            const offlineChips = lang === 'en' ? OFFLINE_FALLBACK_CHIPS_EN : OFFLINE_FALLBACK_CHIPS_KH;
            setMessages(prev => [...prev, { role: 'model', text: randomFallback, chips: offlineChips, source: 'fallback' }]);
        } finally {
            setLoading(false);
            if (keepFocus) { setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 50); }
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollToBottom = (behavior) => {
            isAutoScrolling.current = true; 
            if (behavior === 'auto') { container.scrollTop = container.scrollHeight; } 
            else { if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: "end" }); }
            setTimeout(() => { isAutoScrolling.current = false; if (container) setLastScrollY(container.scrollTop); }, 800);
        };
        
        if (isInitialMount.current) {
            setShowHeader(true); scrollToBottom('auto');
            const timeoutId = setTimeout(() => { scrollToBottom('auto'); isInitialMount.current = false; }, 300);
            return () => clearTimeout(timeoutId);
        } else { scrollToBottom('smooth'); }
    }, [messages, loading]);

    useEffect(() => {
        const handleScroll = () => {
            if (isAutoScrolling.current || !scrollContainerRef.current) return;
            const container = scrollContainerRef.current;
            if (container.scrollHeight <= container.clientHeight + 20) return;

            const currentScrollY = container.scrollTop;
            
            if (currentScrollY <= 0) { 
                setShowHeader(true); 
                window.dispatchEvent(new CustomEvent('chatbotScroll', { detail: { showHeader: true } }));
                setLastScrollY(0); 
                return; 
            }
            if (currentScrollY > lastScrollY + 15 && currentScrollY > 60) {
                setShowHeader(false);
                window.dispatchEvent(new CustomEvent('chatbotScroll', { detail: { showHeader: false } }));
            }
            else if (currentScrollY < lastScrollY - 15) {
                setShowHeader(true);
                window.dispatchEvent(new CustomEvent('chatbotScroll', { detail: { showHeader: true } }));
            }
            
            setLastScrollY(currentScrollY);
        };
        const container = scrollContainerRef.current;
        if (container) container.addEventListener('scroll', handleScroll, { passive: true });
        return () => { if (container) container.removeEventListener('scroll', handleScroll); };
    }, [lastScrollY]);

    useEffect(() => {
        const updateViewport = () => {
            if (window.visualViewport) {
                setViewportHeight(`${window.visualViewport.height}px`);
                const keyboardH = window.innerHeight - window.visualViewport.height;
                if (keyboardH > 50) setKeyboardHeight(keyboardH); else setKeyboardHeight(0);
                setTimeout(() => { if (messagesEndRef.current && !isInitialMount.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, 50);
            }
        };

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', updateViewport);
            window.visualViewport.addEventListener('scroll', updateViewport);
            updateViewport();
        } else {
            window.addEventListener('resize', () => setViewportHeight(`${window.innerHeight}px`));
        }

        return () => {
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', updateViewport);
                window.visualViewport.removeEventListener('scroll', updateViewport);
            } else { window.removeEventListener('resize', () => setViewportHeight(`${window.innerHeight}px`)); }
        };
    }, []);

    useEffect(() => {
        let blurTimer;
        const handleFocusIn = (e) => {
            const tag = e.target.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) {
                clearTimeout(blurTimer); setIsKeyboardOpen(true); setShowHeader(true);
                setTimeout(() => { if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, 300);
            }
        };
        const handleFocusOut = () => { blurTimer = setTimeout(() => { setIsKeyboardOpen(false); }, 100); };

        document.addEventListener('focusin', handleFocusIn);
        document.addEventListener('focusout', handleFocusOut);

        return () => {
            document.removeEventListener('focusin', handleFocusIn);
            document.removeEventListener('focusout', handleFocusOut);
            clearTimeout(blurTimer);
        };
    }, []);

    const dismissKeyboard = () => {
        if (isKeyboardOpen && inputRef.current) {
            inputRef.current.blur();
            setIsKeyboardOpen(false);
        }
    };

    // 🌟 KEEPING YOUR ORIGINAL APP COLORS 🌟
    const theme = {
        bg: isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#F4F5F7]',
        textMain: isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]',
        textSub: isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]',
        userBubble: isDarkMode ? 'bg-gradient-to-r from-[#41B6E6] to-[#0277C5] text-[#FFFFFF]' : 'bg-gradient-to-r from-[#0277C5] to-[#01579B] text-[#FFFFFF]', 
        botBubble: isDarkMode ? 'bg-[#1E1E1E] text-[#F1F1F1] border border-[#2C2C2C]' : 'bg-[#FFFFFF] text-[#1A1A1A] border border-[#E5E7EB]',
        inputBg: isDarkMode ? 'bg-[#1E1E1E] border border-[#2C2C2C]' : 'bg-[#FFFFFF] border border-[#E5E7EB]',
        inputColor: isDarkMode ? 'text-[#F1F1F1] placeholder-[#A0A0A0]' : 'text-[#1A1A1A] placeholder-[#6B7280]',
        iconColor: 'text-[#C55002]',
    };

  return (
    <div
        className={`fixed inset-0 overflow-hidden font-sans transition-colors z-[40] bg-transparent`}
        style={{ height: viewportHeight, touchAction: 'none' }}
    >
        {/* 🌟 HEADER 🌟 */}
        <div
            className={`md:hidden absolute top-0 left-0 w-full z-[60] transition-all duration-500 ease-spring backdrop-blur-xl shadow-sm ${isDarkMode ? 'bg-[#121212]/85 shadow-black/20' : 'bg-[#FFFFFF]/85 shadow-[#0277C5]/5'} ${showHeader ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ 
                paddingTop: 'calc(env(safe-area-inset-top) + 40px)', 
                marginTop: '-40px',
                transform: `translateY(${showHeader ? '0' : '-120%'})`,
                touchAction: 'none'
            }}
        >
            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-3">
                    <div className={`w-[36px] h-[36px] rounded-[12px] bg-gradient-to-tr flex items-center justify-center shadow-inner ${isDarkMode ? 'from-[#41B6E6] to-[#0277C5]' : 'from-[#0277C5] to-[#01579B]'}`}>
                        <AiBotIcon size={24} color="white" className="drop-shadow-sm" />
                    </div>
                    <div className="flex flex-col justify-center pt-0.5">
                        <h2 className={`text-[15px] font-black font-khmer leading-none flex items-center gap-1 ${theme.textMain}`}>
                            {t('ai_name') || 'MY DESIGN AI'} {isAdmin && <Unlock size={12} className={theme.iconColor} />}
                        </h2>
                        <div className="relative flex items-center h-[16px] overflow-hidden mt-0.5">
                            <span key={headerStatusText} className={`text-[9px] font-bold uppercase tracking-widest bg-gradient-to-r ${isDarkMode ? 'from-[#41B6E6] to-[#0277C5]' : 'from-[#0277C5] to-[#01579B]'} bg-clip-text text-transparent animate-text-slide whitespace-nowrap`}>
                                {headerStatusText}
                            </span>
                        </div>
                    </div>
                </div>
                <button onClick={handleClearChat} className={`w-[36px] h-[36px] flex items-center justify-center rounded-[12px] transition-all duration-300 ease-out active:scale-90 border ${isDarkMode ? 'bg-[#1E1E1E]/50 border-[#2C2C2C] text-[#A0A0A0] hover:text-[#FF453A] hover:bg-[#FF453A]/10' : 'bg-[#F8F9FA]/80 border-[#E5E7EB] text-[#6B7280] hover:text-[#FF453A] hover:bg-[#FF453A]/10'}`} title={t('clear_tooltip')}>
                    <Trash2 size={16} />
                </button>
            </div>
        </div>

        {/* 🌟 DESKTOP CONTROLS 🌟 */}
        <div className="hidden md:flex absolute top-4 right-8 z-[70]">
            <button onClick={handleClearChat} className={`p-2.5 rounded-xl transition-all duration-300 border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E]/80 border-[#2C2C2C] text-[#A0A0A0] hover:text-[#FF453A] hover:bg-[#FF453A]/10' : 'bg-[#FFFFFF]/80 border-[#E5E7EB] text-[#6B7280] hover:text-[#FF453A] hover:bg-[#FF453A]/10'}`} title={t('clear_tooltip')}>
                <Trash2 size={18} />
            </button>
        </div>

        {/* 🌟 SCROLL CONTAINER 🌟 */}
        <div
            ref={scrollContainerRef}
            className={`absolute inset-0 overflow-y-auto overflow-x-hidden overscroll-none no-scrollbar`}
            style={{
                paddingTop: `calc(64px + env(safe-area-inset-top))`,
                paddingBottom: isKeyboardOpen ? '80px' : (!showHeader ? `calc(85px + env(safe-area-inset-bottom))` : `calc(135px + env(safe-area-inset-bottom))`),
                touchAction: 'pan-y'
            }}
            id="messenger-scroll-container"
            onTouchStart={dismissKeyboard}
            onClick={dismissKeyboard}
        >
            <div className="max-w-4xl mx-auto w-full p-3 sm:p-4 space-y-4">
                {messages.map((m, i) => {
                    const isUser = m.role === 'user';
                    return (
                        <div key={i} className={`flex flex-col w-full ${isUser ? 'items-end' : 'items-start'} animate-fade-in-up mb-2 group`}>
                            <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} items-end relative`}>
                                {!isUser && (
                                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${isDarkMode ? 'from-[#41B6E6] to-[#0277C5]' : 'from-[#0277C5] to-[#01579B]'} flex items-center justify-center mr-2 shrink-0 mb-1 shadow-sm`}>
                                        <AiBotIcon size={18} color="white" className="drop-shadow-sm" />
                                    </div>
                                )}

                                <div className={`max-w-[85%] sm:max-w-[75%] flex flex-col`}>
                                    {isUser && editingIndex === i ? (
                                        <div className={`w-full flex flex-col gap-2 p-3 rounded-[20px] border shadow-sm ${theme.inputBg}`}>
                                            <textarea value={editText} onChange={(e) => setEditText(e.target.value)} className={`w-full resize-none outline-none bg-transparent text-[14.5px] font-khmer ${theme.textMain}`} rows={3} autoFocus />
                                            <div className="flex justify-end gap-2 mt-1">
                                                <button onClick={cancelEdit} className={`px-3 py-1.5 rounded-full text-[12px] font-bold transition-all ${isDarkMode ? 'bg-[#3A3B3C] text-[#E4E6EB] hover:bg-[#4E4F50]' : 'bg-[#F0F2F5] text-[#6B7280] hover:bg-[#E4E6EB]'}`}>Cancel</button>
                                                <button onClick={() => submitEdit(i)} className={`px-3 py-1.5 rounded-full bg-[#C55002] text-white text-[12px] font-bold hover:opacity-90 transition-all`}>Update</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {m.text && (
                                                <div className={`px-3.5 py-2.5 sm:px-4 sm:py-3 text-[14.5px] sm:text-[15px] leading-relaxed break-words [word-break:break-word] overflow-hidden shadow-sm font-khmer ${isUser ? `${theme.userBubble} rounded-[20px] rounded-br-[4px]` : `${theme.botBubble} rounded-[20px] rounded-bl-[4px]`}`}>
                                                    {typeof m.text === 'object' ? JSON.stringify(m.text) : formatMessage(m.text)}
                                                </div>
                                            )}
                                            
                                            {/* UI: Color Palette */}
                                            {!isUser && m.uiElement === 'color_palette' && m.colors && (
                                                <div className="flex gap-2 mt-4 mb-1">
                                                    {m.colors.map(colorHex => (
                                                        <div key={colorHex} className="flex flex-col items-center gap-1 group/color">
                                                            <div className="w-12 h-12 rounded-xl shadow-md border-2 border-black/10 transform transition-transform group-hover/color:scale-110" style={{backgroundColor: colorHex}}></div>
                                                            <span className="text-[9px] font-mono font-bold opacity-70">{colorHex}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* UI: Action Button */}
                                            {!isUser && m.actionButton && (
                                                <button 
                                                    onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                                    onTouchStart={(e) => e.stopPropagation()}
                                                    onClick={() => {
                                                        triggerHaptic();
                                                        if (m.actionButton.subTab) localStorage.setItem('affinityPro_target_subtab', m.actionButton.subTab);
                                                        window.dispatchEvent(new CustomEvent('switchTab', { detail: m.actionButton.actionToTrigger }));
                                                        if (m.actionButton.subTab) {
                                                            setTimeout(() => window.dispatchEvent(new CustomEvent('switchToolSubTab', { detail: m.actionButton.subTab })), 100); 
                                                        }
                                                    }}
                                                    className="mt-4 px-4 py-2.5 bg-[#C55002] text-white font-khmer font-bold text-sm rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-lg w-full"
                                                >
                                                    {lang === 'en' ? m.actionButton.label_en : m.actionButton.label} <ArrowRight size={16} />
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            {isUser && !loading && editingIndex !== i && (
                                <div className="flex items-center justify-end gap-2 mt-1.5 mr-1 opacity-40 group-hover:opacity-100 transition-opacity w-full">
                                    <button onClick={() => handleCopy(m.text, i)} className={`p-1 rounded-md transition-colors ${isDarkMode ? 'text-[#B0B3B8] hover:text-[#41B6E6]' : 'text-[#6B7280] hover:text-[#0277C5]'}`} title="Copy message">{copiedIndex === i ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}</button>
                                    <button onClick={() => handleEditClick(i, m.text)} className={`p-1 rounded-md transition-colors ${isDarkMode ? 'text-[#B0B3B8] hover:text-[#41B6E6]' : 'text-[#6B7280] hover:text-[#0277C5]'}`} title="Edit message"><Edit2 size={14} /></button>
                                </div>
                            )}

                            {!isUser && m.chips && m.chips.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2 ml-9">
                                    {m.chips.map((chip, idx) => (
                                        <button key={idx} onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); }} onTouchStart={(e) => e.stopPropagation()} onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (!loading) { triggerHaptic(); handleSend(chip, null, 'chip'); } }} className={`px-3.5 py-1.5 text-[12px] font-khmer rounded-full border transition-all active:scale-95 ${isDarkMode ? 'bg-[#1E1E1E] border-[#41B6E6]/30 text-[#41B6E6] hover:bg-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#0277C5]/30 text-[#0277C5] hover:bg-[#F8F9FA]'}`}>
                                            {chip}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {!isUser && i > 0 && !m.feedback && (
                                <div className="flex gap-2 mt-1.5 ml-9 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleCopy(m.text, i)} className={`p-1 rounded-md transition-colors ${isDarkMode ? 'text-[#B0B3B8] hover:text-[#41B6E6]' : 'text-[#6B7280] hover:text-[#0277C5]'}`} title="Copy text">{copiedIndex === i ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}</button>
                                    <button onClick={() => handleFeedback(i, 'up')} className={`p-1 rounded-md transition-colors ${isDarkMode ? 'text-[#B0B3B8] hover:text-green-500' : 'text-[#6B7280] hover:text-green-500'}`}><ThumbsUp size={14} /></button>
                                    <button onClick={() => handleFeedback(i, 'down')} className={`p-1 rounded-md transition-colors ${isDarkMode ? 'text-[#B0B3B8] hover:text-red-500' : 'text-[#6B7280] hover:text-red-500'}`}><ThumbsDown size={14} /></button>
                                    {isAdmin && m.source === 'backend' && <button onClick={() => handleTrainClick(i)} className={`p-1 rounded-md transition-colors flex items-center gap-1 ml-2 text-xs font-bold font-khmer ${isDarkMode ? 'text-[#B0B3B8] hover:text-[#41B6E6]' : 'text-[#6B7280] hover:text-[#0277C5]'}`} title="Train AI Database"><Brain size={14} /> <span>Train</span></button>}
                                </div>
                            )}

                            {!isUser && m.feedback && <div className={`text-[10px] ml-9 mt-1.5 opacity-50 font-khmer font-medium ${m.feedback === 'up' ? 'text-green-500' : 'text-red-500'}`}>{m.feedback === 'up' ? t('thanks_feedback') : t('recorded_issue')}</div>}
                        </div>
                    );
                })}

                {loading && (
                    <div className="flex justify-start items-end animate-fade-in-up">
                        <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${isDarkMode ? 'from-[#41B6E6] to-[#0277C5]' : 'from-[#0277C5] to-[#01579B]'} flex items-center justify-center mr-2 shrink-0 mb-1 shadow-sm`}>
                            <AiBotIcon size={18} color="white" className="drop-shadow-sm" />
                        </div>
                        <div className={`px-4 py-3.5 ${theme.botBubble} rounded-[20px] rounded-bl-[4px] flex gap-1.5 shadow-sm`}>
                            <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDarkMode ? 'bg-[#A0A0A0]' : 'bg-[#6B7280]'}`} style={{ animationDelay: '0ms' }}></div>
                            <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDarkMode ? 'bg-[#A0A0A0]' : 'bg-[#6B7280]'}`} style={{ animationDelay: '150ms' }}></div>
                            <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDarkMode ? 'bg-[#A0A0A0]' : 'bg-[#6B7280]'}`} style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} className="h-6" />
            </div>
        </div>

        {/* 🌟 BOTTOM INPUT AREA 🌟 */}
        <div className="absolute bottom-0 left-0 right-0 z-[50] pointer-events-none flex flex-col justify-end transform-gpu" style={{ transform: 'translateZ(0)' }}>
            <div className={`absolute inset-0 ${theme.bg}`} style={{ maskImage: 'linear-gradient(to top, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)' }}></div>

            <div className={`relative w-full pointer-events-auto transition-all duration-300 pt-2 ${isKeyboardOpen ? 'pb-3' : (!showHeader ? 'pb-[calc(20px+env(safe-area-inset-bottom))] md:pb-6' : (isAndroid ? 'pb-[calc(62px+env(safe-area-inset-bottom))] md:pb-6' : 'pb-[calc(48px+env(safe-area-inset-bottom))] md:pb-6'))}`}>

                {/* 🌟 FLOATING SUGGESTIONS 🌟 */}
                <div className={`relative w-full overflow-hidden transition-all duration-300 ${input.trim().length > 0 || loading ? 'opacity-0 h-0 mb-0 pointer-events-none' : 'opacity-100 h-[38px] mb-2.5'}`}>
                    <div className={`absolute top-0 left-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-r ${isDarkMode ? 'from-[#121212] to-transparent' : 'from-[#F8F9FA] to-transparent'}`}></div>

                    <div ref={suggestionsScrollRef} className="flex-1 overflow-x-auto no-scrollbar scroll-smooth w-full px-4" style={{ touchAction: 'pan-x' }}>
                        <div className={`flex items-center gap-2 py-1 w-max mx-auto max-w-4xl ${getAnimClasses()}`}>
                            {currentSuggestions.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dismissKeyboard();
                                        if (!loading) { triggerHaptic(); handleSend(q, null, 'suggestion'); }
                                    }}
                                    className={`shrink-0 px-3.5 py-1.5 text-[12px] font-medium font-khmer rounded-full whitespace-nowrap active:scale-95 transition-all shadow-sm backdrop-blur-md border ${isDarkMode ? 'bg-[#1E1E1E]/80 border-[#41B6E6]/40 text-[#41B6E6] hover:bg-[#2C2C2C]' : 'bg-[#FFFFFF]/90 border-[#0277C5]/40 text-[#0277C5] hover:bg-[#F8F9FA]'}`}>
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={`absolute top-0 right-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-l ${isDarkMode ? 'from-[#121212] to-transparent' : 'from-[#F8F9FA] to-transparent'}`}></div>
                </div>

                {/* INPUT FIELD */}
                <div className="w-[92%] max-w-[380px] mx-auto flex items-end pb-1 relative">
                    <div className={`flex-1 relative flex items-center w-full shadow-sm rounded-[22px] overflow-hidden border backdrop-blur-lg ${isDarkMode ? 'bg-[#1E1E1E]/80 border-[#2C2C2C]' : 'bg-[#FFFFFF]/90 border-[#E5E7EB]'}`}>
                        {!input && <div className={`absolute left-4 top-[10px] pointer-events-none text-[14.5px] font-khmer opacity-50 ${isDarkMode ? 'text-white' : 'text-black'}`}>{t('placeholder')}</div>}
                        <div
                            ref={inputRef}
                            contentEditable="true"
                            onInput={handleInputInput}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (input.trim() && !loading) { triggerHaptic(); handleSend(input); } } }}
                            className={`w-full min-h-[40px] max-h-[100px] overflow-y-auto pl-4 pr-10 pt-2.5 pb-2.5 text-[14.5px] leading-snug font-khmer outline-none transition-all whitespace-pre-wrap break-words ${theme.inputColor} ${loading && input.trim() === '' ? 'opacity-50' : ''}`}
                            suppressHydrationWarning
                        />
                        <button
                            type="button"
                            disabled={!input.trim() || loading}
                            onPointerDown={(e) => e.preventDefault()}
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (!loading && input.trim()) { triggerHaptic(); handleSend(input); } }}
                            className={`absolute right-1 bottom-1 p-1.5 rounded-full transition-transform active:scale-90 ${input.trim() && !loading ? theme.iconColor : 'opacity-30'}`}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* 🌟 MODALS 🌟 */}
        {showConfirmModal && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-5 backdrop-blur-md bg-black/60 animate-fade-in-up">
                <div className={`w-full max-w-[320px] p-6 rounded-[32px] shadow-2xl border text-center transition-all ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                    <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-5"><Trash2 size={28} className="text-red-500" /></div>
                    <h2 className={`text-[16px] font-bold font-khmer mb-8 leading-relaxed ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{t('clear_confirm')}</h2>
                    <div className="flex flex-col gap-3">
                        <button type="button" onClick={confirmClear} className="w-full py-3.5 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-khmer font-bold text-[15px] active:scale-95 transition-all shadow-lg shadow-red-500/20">{lang === 'en' ? 'Clear Everything' : 'លុបចេញទាំងអស់'}</button>
                        <button type="button" onClick={() => setShowConfirmModal(false)} className={`w-full py-3.5 rounded-2xl font-khmer font-bold text-[15px] active:scale-95 transition-all border ${isDarkMode ? 'bg-[#2C2C2C] border-[#3E4042] text-[#A0A0A0] hover:text-[#F1F1F1]' : 'bg-[#F8F9FA] border-[#CED0D4] text-[#6B7280] hover:text-[#1A1A1A]'}`}>{lang === 'en' ? 'Cancel' : 'បោះបង់'}</button>
                    </div>
                </div>
            </div>
        )}

        {trainModalData && (
            <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in-up">
                <div className={`relative w-full max-w-xl flex flex-col max-h-[90vh] rounded-[24px] shadow-2xl overflow-hidden ${isDarkMode ? 'bg-[#1E1E1E] border border-[#2C2C2C] text-[#F1F1F1]' : 'bg-white border border-[#E5E7EB] text-[#1A1A1A]'}`}>
                    <div className={`flex items-center justify-between p-5 border-b ${isDarkMode ? 'border-[#2C2C2C]' : 'border-[#E5E7EB]'}`}>
                        <h2 className="text-lg font-bold flex items-center gap-2"><Brain className="text-[#41B6E6]" /> Train AI Database</h2>
                        <button onClick={() => setTrainModalData(null)} className={`p-1.5 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-100'}`}><X size={20} /></button>
                    </div>
                    <form onSubmit={submitTraining} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 font-khmer">
                        {trainSuccess && <div className="flex items-center gap-2 p-3 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl mb-2"><CheckCircle2 size={18} /><span className="font-bold text-sm">Successfully Saved to AI Brain!</span></div>}
                        <div className="flex flex-col gap-2"><label className={`text-sm font-bold ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>User Question (Trigger)</label><textarea value={trainModalData.question} onChange={(e) => setTrainModalData({ ...trainModalData, question: e.target.value })} required rows={2} className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0277C5] resize-none ${isDarkMode ? 'bg-[#121212] border-[#3E4042] text-white' : 'bg-gray-50 border-gray-200 text-black'}`} /></div>
                        <div className="flex flex-col gap-2"><label className={`text-sm font-bold ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Ideal AI Answer</label><textarea value={trainModalData.answer} onChange={(e) => setTrainModalData({ ...trainModalData, answer: e.target.value })} required rows={6} className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0277C5] resize-none ${isDarkMode ? 'bg-[#121212] border-[#3E4042] text-white' : 'bg-gray-50 border-gray-200 text-black'}`} /></div>
                        <button type="submit" disabled={isTraining} className="w-full py-3.5 mt-2 rounded-xl font-bold text-white bg-gradient-to-r from-[#0277C5] to-[#41B6E6] hover:opacity-90 transition-colors disabled:opacity-50">{isTraining ? 'Saving to Memory...' : 'Save to AI Brain'}</button>
                    </form>
                </div>
            </div>
        )}
    </div >
);
};

export default ChatBot;