import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, RefreshCw, Trash2, ThumbsUp, ThumbsDown, ArrowRight, Brain, Loader2 } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase'; 

// 🌟 FIX: Removed QUIZ_INVITATIONS from import to prevent React from crashing!
import { 
  SUGGESTED_QUESTIONS, SUGGESTED_QUESTIONS_EN, GREETINGS, GREETINGS_EN,
  SMART_GREETINGS, SMART_GREETINGS_EN, REJECTION_RESPONSES, REJECTION_RESPONSES_EN,
  REPEAT_RESPONSES, REPEAT_RESPONSES_EN, API_FALLBACK_RESPONSES, API_FALLBACK_RESPONSES_EN,
  KNOWLEDGE_BASE 
} from '../../../data/ai_database';

// 🌟 SAFE LOCAL FALLBACKS
const LOCAL_QUIZ_INVITATIONS = [
    "បាទ ងាយស្រួលមែនទែន! 🤗 តោះសាកល្បងលេងសួរឆ្លើយ (Quiz) ពីរឿង Graphic Design។ សួរខ្ញុំមក!",
    "បាទ តោះមកធ្វើតេស្តខួរក្បាលបន្តិច! 🧠 សាកល្បងសួរខ្ញុំពីរឿងក្បួនរចនាមើល!",
    "បាទ បើចង់ពង្រឹងសមត្ថភាព Design តោះយើងលេងឆ្លើយសំណួរគ្នា! 🎯"
];
const LOCAL_QUIZ_INVITATIONS_EN = [
    "That's super easy! 🤗 Let's have a quick Graphic Design Quiz. Ask away!",
    "Let's test your creative brain! 🧠 Try asking me a tricky design question!",
    "If you want to level up your design skills, let's do a quick Q&A session! 🎯"
];

const triggerHaptic = (type = 'light') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        if (type === 'error') navigator.vibrate([50, 50, 50]);
        else if (type === 'success') navigator.vibrate([30, 50, 30]);
        else navigator.vibrate(10);
    }
};

const getRandomItems = (arr, count) => {
    if (!arr || !arr.length) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const getRandomQuizInvitation = (language = 'kh') => {
    const invitations = language === 'en' ? LOCAL_QUIZ_INVITATIONS_EN : LOCAL_QUIZ_INVITATIONS;
    return invitations[Math.floor(Math.random() * invitations.length)];
};

const callRealAI = async (userPrompt, language, history = []) => {
    try {
        const recentHistoryText = history.slice(-6).map(msg => 
            `${msg.role === 'user' ? 'User' : 'AI Assistant'}: ${msg.text}`
        ).join('\n');

        const response = await fetch('https://my-affinity-backend.onrender.com/chat', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                prompt: userPrompt,
                history: recentHistoryText,
                language: language
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`HTTP ${response.status}: ${errorData.details || errorData.error || 'Server crashed'}`);
        }

        const data = await response.json();
        return data.reply || data.answer || data.text || data.message || "✅ Connected, but response was empty.";
            
    } catch (error) {
        console.error("Backend AI Failed:", error);
        return `*(Debug Error)* ⚠️ Connection Failed: ${error.message}\n\n*If this says "Failed to fetch", Render is sleeping (wait 1 minute) or CORS is blocking it.*`;
    }
};

// 🌟 THE ULTIMATE SAFE CLEANER: Strips only punctuation & spaces. Keeps Khmer and Emojis completely intact!
const strictClean = (text) => {
    if (!text) return '';
    return text.toLowerCase().replace(/[\s\u200B.,!?។៕"“”'*_()\-:;&]/g, '');
};

const formatMessage = (text) => {
    if (typeof text !== 'string') return text;
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return formattedText.split('\n').map((line, i, arr) => (
        <React.Fragment key={i}>
            <span dangerouslySetInnerHTML={{ __html: line }} />
            {i !== arr.length - 1 && <br />}
        </React.Fragment>
    ));
};

const ChatBot = ({ messages = [], setMessages, isDarkMode, liveAiData = [], setLiveAiData, isAdmin }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false); 
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const [viewportHeight, setViewportHeight] = useState('100%');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInitialMount = useRef(true); 
  const isAutoScrolling = useRef(false);
  const idleTimerRef = useRef(null); 
  
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(() => {
      if (typeof window !== 'undefined') return localStorage.getItem('myDesign_current_topic') || null;
      return null;
  });

  const { lang, t } = useLanguage();

  const COMBINED_DB = [...(KNOWLEDGE_BASE || []), ...liveAiData];

  const runSecretBackgroundTraining = async (userQ, botA) => {
      try {
          const prompt = `Analyze this interaction:\nUser Question: "${userQ}"\nBot Answer: "${botA}"\n\nTask:\n1. Check if this is related to Graphic Design, Affinity software, Photo Editing, Layouts, or Typography. If it is UNRELATED (e.g., cooking, politics, general greetings), reply ONLY with the exact word: REJECT\n2. If it IS related, correct grammar, translate it to provide both English and Khmer answers, and format as JSON:\n{"primaryKeys": ["key1", "key2"], "keys": ["k1", "k2", "k3"], "regex": ["reg1"], "answer": "Corrected Khmer", "answer_en": "English translation"}`;

          const res = await callRealAI(prompt, 'en', []);
          
          if (res.includes('REJECT')) return; 
          
          const match = res.match(/\{[\s\S]*\}/);
          if (!match) return;
          
          const newEntry = JSON.parse(match[0]);
          const existingKeys = new Set(COMBINED_DB.flatMap(item => [...(item.primaryKeys || []), ...(item.keys || [])].map(strictClean)));
          
          const uniquePrimaryKeys = newEntry.primaryKeys.filter(k => !existingKeys.has(strictClean(k)));
          const uniqueKeys = newEntry.keys.filter(k => !existingKeys.has(strictClean(k)));

          if (uniquePrimaryKeys.length === 0 && uniqueKeys.length === 0) return; 
          if (uniquePrimaryKeys.length === 0 && uniqueKeys.length > 0) uniquePrimaryKeys.push(uniqueKeys[0]);

          newEntry.primaryKeys = uniquePrimaryKeys;
          newEntry.keys = uniqueKeys;
          
          const docRef = await addDoc(collection(db, "ai_knowledge"), newEntry);
          newEntry.id = docRef.id;

          if(setLiveAiData) setLiveAiData(prev => [...prev, newEntry]);

      } catch (err) {
          console.log("Secret training skipped.");
      }
  };

  const handleAutoTrain = async (index) => {
      const botMsg = messages[index];
      const userMsg = messages[index - 1];
      if (!userMsg || userMsg.role !== 'user') return;

      triggerHaptic();
      setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[index] = { ...newMsgs[index], isTraining: true };
          return newMsgs;
      });

      try {
          const prompt = `Format this interaction:\nUser: "${userMsg.text}"\nBot: "${botMsg.text}"\n\nTask: Correct grammar, translate perfectly to English/Khmer, and generate JSON:\n{"primaryKeys": ["key1"], "keys": ["k1", "k2", "k3"], "regex": ["reg1"], "answer": "Khmer answer", "answer_en": "English translation"}`;

          const res = await callRealAI(prompt, 'en', []);
          
          const match = res.match(/\{[\s\S]*\}/);
          if (!match) throw new Error("Invalid JSON format.");
          
          const newEntry = JSON.parse(match[0]);
          const existingKeys = new Set(COMBINED_DB.flatMap(item => [...(item.primaryKeys || []), ...(item.keys || [])].map(strictClean)));
          
          const uniquePrimaryKeys = newEntry.primaryKeys.filter(k => !existingKeys.has(strictClean(k)));
          const uniqueKeys = newEntry.keys.filter(k => !existingKeys.has(strictClean(k)));

          if (uniquePrimaryKeys.length === 0 && uniqueKeys.length === 0) throw new Error("Duplicate prevented.");
          if (uniquePrimaryKeys.length === 0 && uniqueKeys.length > 0) uniquePrimaryKeys.push(uniqueKeys[0]);

          newEntry.primaryKeys = uniquePrimaryKeys;
          newEntry.keys = uniqueKeys;
          
          const docRef = await addDoc(collection(db, "ai_knowledge"), newEntry);
          newEntry.id = docRef.id;

          if(setLiveAiData) setLiveAiData(prev => [...prev, newEntry]);

          triggerHaptic('success');
          setMessages(prev => {
              const newMsgs = [...prev];
              newMsgs[index] = { ...newMsgs[index], isTraining: false, feedback: 'up', isTrainable: false };
              newMsgs.push({
                  role: 'model',
                  text: `✅ **Trained & Synced to Cloud!**\nKeys: *${newEntry.primaryKeys.join(', ')}*`,
                  chips: [],
                  isTrainable: false
              });
              return newMsgs;
          });
          
          setTimeout(() => {
              if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }, 100);

      } catch (err) {
          triggerHaptic('error');
          setMessages(prev => {
              const newMsgs = [...prev];
              newMsgs[index] = { ...newMsgs[index], isTraining: false };
              return newMsgs;
          });
          alert("Admin Train Failed: " + err.message);
      }
  };

  const getSuggestList = () => {
      const fullList = lang === 'en' ? (SUGGESTED_QUESTIONS_EN || []) : (SUGGESTED_QUESTIONS || []);
      const userAskedQuestions = messages.filter(m => m.role === 'user').map(m => strictClean(m.text));
      const freshQuestions = fullList.filter(q => !userAskedQuestions.includes(strictClean(q)));
      return freshQuestions.length >= 3 ? freshQuestions : fullList;
  };

  const generateSmartGreeting = () => {
      const interests = JSON.parse(localStorage.getItem('myDesign_user_interests') || '[]');
      const suggestList = getSuggestList();
      const hour = new Date().getHours();
      
      let timeGreetingKh = hour >= 5 && hour < 12 ? "បាទ អរុណសួស្តី! 🌅" : hour >= 12 && hour < 17 ? "បាទ ទិវាសួស្តី! ☀️" : hour >= 17 && hour < 22 ? "បាទ សាយន្តសួស្តី! 🌇" : "បាទ រាត្រីសួស្តី! 🌙";
      let timeGreetingEn = hour >= 5 && hour < 12 ? "Good morning! 🌅" : hour >= 12 && hour < 17 ? "Good afternoon! ☀️" : hour >= 17 && hour < 22 ? "Good evening! 🌇" : "Working late? 🌙";

      let greetingMsg = `${lang === 'en' ? timeGreetingEn : timeGreetingKh} ${lang === 'en' ? "I am **Design Master**, your AI assistant. What are we creating today? 🎨" : "ខ្ញុំគឺ **Design Master**។ តើថ្ងៃនេះចង់ឱ្យខ្ញុំជួយអ្វីខ្លះ? 🎨"}`;
      let defaultChips = getRandomItems(suggestList, 3);

      if (interests.length > 0) {
          const smartList = lang === 'en' ? (SMART_GREETINGS_EN || []) : (SMART_GREETINGS || []);
          const smartMsgTemplate = getRandomItems(smartList, 1)[0];
          if (smartMsgTemplate) {
              greetingMsg = smartMsgTemplate.replace('{topic}', interests[interests.length - 1]);
              defaultChips = [interests[interests.length - 1], ...getRandomItems(suggestList, 2)];
          }
      }

      setMessages([{ role: 'model', text: greetingMsg, chips: defaultChips.slice(0, 3), isTrainable: false }]);
  };

  const triggerIdleQuiz = () => {
      setMessages(prev => {
          if (prev.length === 0) return prev;
          const lastMsg = prev[prev.length - 1];
          const allInvitations = [...LOCAL_QUIZ_INVITATIONS, ...LOCAL_QUIZ_INVITATIONS_EN];
          if (lastMsg.role === 'model' && allInvitations.includes(lastMsg.text)) return prev;
          return [...prev, { role: 'model', text: getRandomQuizInvitation(lang), chips: getRandomItems(getSuggestList(), 3), isTrainable: false }];
      });
  };

  const resetIdleTimer = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(triggerIdleQuiz, 120000); 
  };

  useEffect(() => {
      try {
          const savedHistory = localStorage.getItem('myDesign_chat_history');
          if (savedHistory && JSON.parse(savedHistory).length > 0) {
              setMessages(JSON.parse(savedHistory));
          } else {
              generateSmartGreeting();
          }
      } catch (e) {
          generateSmartGreeting();
      }
      setCurrentSuggestions(getRandomItems(getSuggestList(), 3)); 
      const interval = setInterval(() => { handleRefresh(null, true); }, 15000); 
      return () => clearInterval(interval);
  }, [lang]);

  useEffect(() => {
      resetIdleTimer();
      return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current); };
  }, [messages, input, lang]); 

  useEffect(() => {
      if (messages && messages.length > 0) {
          localStorage.setItem('myDesign_chat_history', JSON.stringify(messages));
      }
      if (currentTopic) localStorage.setItem('myDesign_current_topic', currentTopic);
  }, [messages, currentTopic]);

  const handleInputInput = (e) => setInput(e.currentTarget.textContent);

  const handleRefresh = (e, isAuto = false) => {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      if (!isAuto) triggerHaptic();
      if (isAnimating) return; 
      setIsAnimating(true);
      setTimeout(() => {
          setCurrentSuggestions(getRandomItems(getSuggestList(), 3));
          setIsAnimating(false);
      }, 300); 
  };

  const handleClearChat = (e) => {
      if (e) e.preventDefault();
      triggerHaptic();
      setShowConfirmModal(true);
  };

  const confirmClear = () => {
      localStorage.removeItem('myDesign_chat_history');
      localStorage.removeItem('myDesign_current_topic');
      generateSmartGreeting();
      setCurrentTopic(null);
      setShowConfirmModal(false);
  };

  const handleFeedback = (index, type) => {
      triggerHaptic();
      setMessages(prev => {
          const updated = [...prev];
          updated[index] = { ...updated[index], feedback: type };
          return updated;
      });
  };

  const generateFilteredChips = (exactMatch, rawQuery) => {
      let chipsData = lang === 'en' && exactMatch.chips_en ? exactMatch.chips_en : exactMatch.chips;
      if (chipsData) {
          const strictQuery = strictClean(rawQuery);
          chipsData = chipsData.filter(c => strictClean(c) !== strictQuery);
          if (chipsData.length < 2) chipsData = [...new Set([...chipsData, ...getRandomItems(getSuggestList(), 3)])].slice(0, 2);
      }
      return chipsData ? chipsData.slice(0, 3) : getRandomItems(getSuggestList(), 3);
  };

  const findAIResponse = (inputTxt, history = []) => {
      const rawInput = inputTxt.trim();
      const cleanInput = strictClean(rawInput); 

      // Remove Question Words safely
      const questionWords = ['តើ', 'ជាអ្វី', 'អ្វីទៅជា', 'អ្វីទៅ', 'ស្អីគេ', 'ស្អី', 'គឺជាអ្វី', 'របៀប', 'របៀបណា', 'យ៉ាងម៉េច', 'howto', 'whatis', 'explain'];
      let coreSubject = cleanInput;
      let wordStripped = true;
      while(wordStripped) {
          wordStripped = false;
          for(const qw of questionWords) {
              const cleanQw = strictClean(qw);
              if (coreSubject.startsWith(cleanQw)) {
                  coreSubject = coreSubject.substring(cleanQw.length);
                  wordStripped = true;
                  break;
              }
          }
      }
      coreSubject = coreSubject.trim();

      // 1. DEEP INCLUDE GUARANTEE
      for (const item of COMBINED_DB) {
          const exactTriggers = [...(item.primaryKeys || []), ...(item.keys || [])].map(strictClean); 
          
          const isExact = exactTriggers.includes(cleanInput) || exactTriggers.includes(coreSubject);
          const isDeepInclude = exactTriggers.some(trigger => trigger.length > 3 && (cleanInput.includes(trigger) || coreSubject.includes(trigger)));

          if (isExact || isDeepInclude) {
              setCurrentTopic(item.primaryKeys ? item.primaryKeys[0] : null); 
              let answerText = lang === 'en' && item.answer_en ? item.answer_en : item.answer;
              let finalColors = item.colors;

              if (item.dynamicColor) {
                  const hex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
                  finalColors = [hex]; answerText = answerText.replace('{hex}', hex);
              }
              return { answer: answerText, chips: generateFilteredChips(item, rawInput), uiElement: item.uiElement, colors: finalColors, actionButton: item.actionButton, needsBackend: false };
          }
          
          if (item.regex && item.regex.some(r => { try { return new RegExp(`\\b${r}\\b`, 'i').test(rawInput); } catch { return new RegExp(r, 'i').test(rawInput); } })) {
              setCurrentTopic(item.primaryKeys ? item.primaryKeys[0] : null); 
              return { answer: lang === 'en' && item.answer_en ? item.answer_en : item.answer, chips: generateFilteredChips(item, rawInput), uiElement: item.uiElement, actionButton: item.actionButton, needsBackend: false };
          }
      }

      // 2. LONG SENTENCE FIREWALL
      const wordCount = rawInput.trim().split(/\s+/).length;
      if (wordCount > 6) return { needsBackend: true, query: rawInput };

      // 3. SHORT TYPO & DEEP KEYWORD GUESSING
      let bestMatch = null;
      let highestScore = 0;
      for (const item of COMBINED_DB) {
          let score = 0;
          const searchKeys = [...(item.primaryKeys || []), ...(item.keys || [])].map(strictClean);
          for(const key of searchKeys) {
              if (key.length >= 4 && cleanInput.includes(key)) score = Math.max(score, key.length * 10); 
              if (cleanInput.length >= 4 && key.includes(cleanInput)) score = Math.max(score, cleanInput.length * 10);
          }
          
          if (item.primaryKeys?.some(pk => rawInput.includes(pk) || pk.includes(rawInput.trim()))) {
              score = Math.max(score, 1000); 
          }
          
          if (score > highestScore) { highestScore = score; bestMatch = item; }
      }

      if (bestMatch && highestScore >= 50) {
          setCurrentTopic(bestMatch.primaryKeys ? bestMatch.primaryKeys[0] : null); 
          let answerText = lang === 'en' && bestMatch.answer_en ? bestMatch.answer_en : bestMatch.answer;
          let finalColors = bestMatch.colors;

          if (bestMatch.dynamicColor) {
              const hex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
              finalColors = [hex]; answerText = answerText.replace('{hex}', hex);
          }
          return { answer: answerText, chips: generateFilteredChips(bestMatch, rawInput), uiElement: bestMatch.uiElement, colors: finalColors, actionButton: bestMatch.actionButton, needsBackend: false };
      }

      // 4. CONVERSATIONAL RABBIT HOLE
      const FOLLOW_UP_MAP = {
          'តើអ្វីទៅជា Graphic Design?': 'ធាតុផ្សំមូលដ្ឋានទាំង ៦', 'what is graphic design': 'the 6 elements of design',
          'ធាតុផ្សំមូលដ្ឋានទាំង ៦': 'គោលការណ៍រចនា', 'the 6 elements of design': 'design principles',
          'គោលការណ៍រចនា': 'ឋានានុក្រមទស្សនីយភាព', 'design principles': 'visual hierarchy',
          'ឋានានុក្រមទស្សនីយភាព': 'តើ Contrast ជាអ្វី?', 'visual hierarchy': 'what is contrast',
          'តើ Contrast ជាអ្វី?': 'តើ Alignment ជាអ្វី?', 'what is contrast': 'what is alignment',
          'តើ Alignment ជាអ្វី?': 'តើ Proximity ជាអ្វី?', 'what is alignment': 'what is proximity',
          'តើ Proximity ជាអ្វី?': 'អ្វីទៅជា White Space?', 'what is proximity': 'what is white space',
          'អ្វីទៅជា White Space?': 'Rule of Thirds ជាអ្វី?', 'what is white space': 'what is the rule of thirds',
          'Rule of Thirds ជាអ្វី?': 'Grid System ជាអ្វី?', 'what is the rule of thirds': 'what is a grid system',
          'Grid System ជាអ្វី?': 'Margin និង Padding ខុសគ្នាម៉េច?', 'what is a grid system': 'margin vs padding',
          'អ្វីទៅជា Typography?': 'កាយវិភាគវិទ្យាអក្សរ', 'what is typography': 'type anatomy',
          'កាយវិភាគវិទ្យាអក្សរ': 'របៀបតម្រៀប Font ឱ្យស្អាត?', 'type anatomy': 'how to pair fonts',
          'របៀបតម្រៀប Font ឱ្យស្អាត?': 'Kerning និង Tracking ខុសគ្នាម៉េច?', 'how to pair fonts': 'kerning vs tracking',
          'Kerning និង Tracking ខុសគ្នាម៉េច?': 'Variable Fonts', 'kerning vs tracking': 'what are variable fonts',
          'Color Theory': 'អត្ថន័យនៃពណ៌ (Color Psychology)', 'color theory': 'color psychology',
          'អត្ថន័យនៃពណ៌ (Color Psychology)': 'ក្បួនពណ៌ UI ៦០-៣០-១០', 'color psychology': 'the 60-30-10 rule',
          'ក្បួនពណ៌ UI ៦០-៣០-១០': 'តើ HSL គឺជាអ្វី?', 'the 60-30-10 rule': 'what is hsl',
          'តើ HSL គឺជាអ្វី?': 'RGB និង CMYK ខុសគ្នាម៉េច?', 'what is hsl': 'rgb vs cmyk',
          'អ្វីទៅជា Vector និង Raster?': 'តើ Photoshop និង Illustrator ខុសគ្នាម៉េច?', 'vector vs raster': 'photoshop vs illustrator',
          'តើ Photoshop និង Illustrator ខុសគ្នាម៉េច?': 'របៀបប្រើ Pen Tool', 'photoshop vs illustrator': 'how to use the pen tool',
          'របៀបប្រើ Pen Tool': 'បញ្ញាសិប្បនិម្មិត (AI in Design)', 'how to use the pen tool': 'ai in design',
          'កាត់តរូបភាព': 'តើ Dodge និង Burn គឺជាអ្វី?', 'photomanipulation': 'dodge and burn',
          'តើ Dodge និង Burn គឺជាអ្វី?': 'ព្រិល Background', 'dodge and burn': 'depth of field',
          'ព្រិល Background': 'Smart Object ជាអ្វី?', 'depth of field': 'what is a smart object',
          'Smart Object ជាអ្វី?': 'តើ Blend Modes ដំណើរការយ៉ាងម៉េច?', 'what is a smart object': 'how do blend modes work',
          'តើ Blend Modes ដំណើរការយ៉ាងម៉េច?': 'Opacity និង Fill ខុសគ្នាម៉េច?', 'how do blend modes work': 'opacity vs fill',
          'របៀបគិតលុយអតិថិជន? 💰': 'Value-Based Pricing', 'how to price my work? 💰': 'value based pricing',
          'Value-Based Pricing': 'របៀបដោះស្រាយភ្ញៀវរអ៊ូ?', 'value based pricing': 'dealing with difficult clients?',
          'របៀបដោះស្រាយភ្ញៀវរអ៊ូ?': 'របៀបរៀបចំ Portfolio?', 'dealing with difficult clients?': 'how to build a portfolio',
          'របៀបរៀបចំ Portfolio?': 'ក្រមសីលធម៌ កម្មសិទ្ធិបញ្ញា', 'how to build a portfolio': 'design copyright and ethics',
      };

      const exactMore = ['ទៀត', 'more', 'next', 'បន្ត', 'ប្រាប់ទៀត', 'តទៀត', 'continue', 'go on'].map(strictClean);
      if ((exactMore.includes(cleanInput) || cleanInput.endsWith('ទៀត')) && currentTopic) {
          const topicData = COMBINED_DB.find(item => [...(item.primaryKeys || []), ...(item.keys || [])].map(strictClean).includes(strictClean(currentTopic)));
          if (topicData && topicData.primaryKeys) {
              const nextTopic = FOLLOW_UP_MAP[topicData.primaryKeys[0]] || FOLLOW_UP_MAP[strictClean(topicData.primaryKeys[0])];
              if (nextTopic) {
                  const nextData = COMBINED_DB.find(item => [...(item.primaryKeys || []), ...(item.keys || [])].map(strictClean).includes(strictClean(nextTopic)));
                  if (nextData) {
                      setCurrentTopic(nextData.primaryKeys[0]);
                      return { answer: lang === 'en' ? nextData.answer_en || nextData.answer : nextData.answer, chips: generateFilteredChips(nextData, rawInput), needsBackend: false };
                  }
              } else {
                  return { answer: lang === 'en' ? "That covers the basics of this topic! 🎨 What next?" : "បាទ សម្រាប់ប្រធានបទនេះគឺអស់ត្រឹមនេះហើយ! 🎨 តើបងចង់រៀនពីរឿងអ្វីបន្ទាប់?", chips: getRandomItems(getSuggestList(), 3), needsBackend: false };
              }
          }
      }

      // 5. Casual/System Fallbacks
      const boredomWords = ['អផ្សុក', 'មិនដឹងសួរអី', 'សួរអី', 'bored', 'whattoask', 'play', 'លេង', 'សួរអីគេ'].map(strictClean);
      if (boredomWords.some(w => cleanInput.includes(w))) {
          return { answer: getRandomQuizInvitation(lang), chips: getRandomItems(getSuggestList(), 3), needsBackend: false };
      }

      let repeatCount = 0;
      for (let i = history.length - 1; i >= 0; i--) {
          if (history[i].role === 'user') {
              if (strictClean(history[i].text) === cleanInput) repeatCount++;
              else break; 
          }
      }
      if (repeatCount > 1) {
          const repeatData = lang === 'en' ? (REPEAT_RESPONSES_EN || {}) : (REPEAT_RESPONSES || {});
          const level2 = repeatData.level2 || ["Haha! Let's explore a new topic!"];
          return { answer: getRandomItems(level2, 1)[0], chips: getRandomItems(getSuggestList(), 3), needsBackend: false };
      }

      const exactHowAreYou = ['howareyou', 'whatsup', 'howareyoudoing', 'howru', 'sup', 'សុខសប្បាយទេ', 'អ្នកសុខសប្បាយទេ', 'សុខទេ', 'ម៉េចហើយ'].map(strictClean);
      if (exactHowAreYou.includes(cleanInput)) {
          return { answer: lang === 'en' ? "I'm doing wonderfully! Ready to help you design. 🎨" : "បាទ ខ្ញុំសុខសប្បាយទេ អរគុណ! 😊 ត្រៀមខ្លួនជួយបងជានិច្ច។", chips: getRandomItems(getSuggestList(), 3), needsBackend: false };
      }

      const exactThanks = ['thanks', 'thankyou', 'អរគុណ', 'អគុណ', 'អរគុណច្រើន', 'អគុណច្រើន', 'អរគុណធំៗ'].map(strictClean);
      if (exactThanks.includes(cleanInput)) {
          return { answer: lang === 'en' ? "You're very welcome! Let me know if you need more help. ✨" : "បាទ ដោយក្តីរីករាយបំផុត! 😊", chips: getRandomItems(getSuggestList(), 3), needsBackend: false };
      }

      const lastBotMsg = history.slice().reverse().find(m => m.role === 'model');
      const isBackendActive = lastBotMsg && (lastBotMsg.text.includes('*(Online AI)*') || lastBotMsg.text.includes('*(Backend AI)*'));
      
      const exactNo = ['nothanks', 'no', 'nope', 'nevermind', 'ទេ', 'អត់ទេ', 'ទេអរគុណ', 'អត់ទេអរគុណ', 'មិនបាច់ទេ', 'អត់ចង់ទេ'].map(strictClean);
      if (exactNo.includes(cleanInput) || cleanInput.startsWith('ទេ') || cleanInput.startsWith('no')) {
          setCurrentTopic(null);
          if (lastBotMsg && (lastBotMsg.text.includes('មែនទេ') || lastBotMsg.text.includes('Did you mean'))) {
              return { answer: lang === 'en' ? "No problem! What else would you like to learn about? 😊" : "បាទ មិនអីទេ! តើមានអ្វីផ្សេងទៀតដែលបងចង់ស្វែងយល់ទេ? 😊", chips: getRandomItems(getSuggestList(), 3), needsBackend: false };
          }
          return { needsBackend: true, query: rawInput }; 
      }

      const exactYes = ['yes', 'yep', 'ok', 'sure', 'បាទ', 'ចាស', 'ចា', 'យល់ព្រម', 'មែន', 'ចង់', 'អូខេ', 'តោះ', 'បន្ត', 'ដឹង', 'ចង់ដឹង'].map(strictClean);
      if (exactYes.includes(cleanInput) || cleanInput.startsWith('បាទ') || cleanInput.startsWith('ចាស') || cleanInput.startsWith('yes') || cleanInput.startsWith('ok')) {
          if (isBackendActive) return { needsBackend: true, query: rawInput }; 
          
          if (lastBotMsg && (lastBotMsg.text.includes('មែនទេ') || lastBotMsg.text.includes('Did you mean'))) {
              const match = lastBotMsg.text.match(/\*\*(.*?)\*\*/);
              const targetTopic = match ? match[1] : currentTopic;

              if (targetTopic) {
                  const topicData = COMBINED_DB.find(item => [...(item.primaryKeys || []), ...(item.keys || [])].map(strictClean).includes(strictClean(targetTopic)));
                  if (topicData) {
                      let answerText = lang === 'en' && topicData.answer_en ? topicData.answer_en : topicData.answer;
                      let finalColors = topicData.colors;
                      if (topicData.dynamicColor) {
                          const hex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
                          finalColors = [hex]; answerText = answerText.replace('{hex}', hex);
                      }
                      setCurrentTopic(topicData.primaryKeys ? topicData.primaryKeys[0] : null);
                      return { answer: answerText, chips: generateFilteredChips(topicData, rawInput), uiElement: topicData.uiElement, colors: finalColors, actionButton: topicData.actionButton, needsBackend: false };
                  }
              }
          }
      }

      if (bestMatch && highestScore >= 30) {
          const topicName = bestMatch.primaryKeys ? bestMatch.primaryKeys[0] : (bestMatch.keys ? bestMatch.keys[0] : null);
          setCurrentTopic(topicName); 
          return { 
              answer: lang === 'en' ? `I'm not completely sure 🤔. \n\nDid you mean "**${topicName}**"?` : `ខ្ញុំមិនសូវប្រាកដទេ 🤔។ \n\nតើបងចង់សួរពី "**${topicName}**" មែនទេ?`, 
              chips: [lang === 'en' ? "Yes" : "បាទ", lang === 'en' ? "No thanks" : "ទេ អរគុណ", ...getRandomItems(getSuggestList(), 1)],
              needsBackend: false
          };
      }

      return { needsBackend: true, query: rawInput };
  };

  const handleSend = async (text = null) => {
      if (loading) return; 

      const msg = typeof text === 'string' ? text : input;
      if (!msg.trim()) return; 

      const rudeWords = ['ឆ្កួត', 'ចង្រៃ', 'មីចោរ', 'អាឆ្កែ', 'ចុយ', 'ថោកទាប', 'ឡប់', 'ភ្លើ', 'ល្ងង់', 'អាថោក', 'មីថោក', 'ឡប់សតិ', 'អាឡប់', 'មីចោលម្សៀត', 'fuck', 'shit', 'bitch', 'stupid', 'asshole', 'dick', 'idiot'].map(strictClean);
      const cleanMsg = strictClean(msg);
      if (rudeWords.some(word => cleanMsg.includes(word))) {
          setInput(''); if (inputRef.current) inputRef.current.textContent = '';
          setMessages(prev => [...prev, { role: 'model', text: lang === 'en' ? "Please use appropriate language! 🚫🙏" : "សូមមេត្តាប្រើប្រាស់ពាក្យសម្ដីសមរម្យ! 🚫🙏", chips: [], isTrainable: false }]);
          return; 
      }
      
      setInput(''); 
      if (inputRef.current) inputRef.current.textContent = '';
      setIsKeyboardOpen(false); 

      setMessages(prev => [...prev, { role: 'user', text: msg }]); 
      setLoading(true);
      
      try {
          let responseData = findAIResponse(msg, messages);

          if (responseData.needsBackend) {
              let cachedAnswer = null;
              try {
                  const globalMemory = JSON.parse(localStorage.getItem('myDesign_ai_memory_cache') || '[]');
                  const foundMem = globalMemory.find(mem => mem.lang === lang && (mem.q === cleanMsg || (mem.q.length > 5 && cleanMsg.includes(mem.q)) || (cleanMsg.length > 5 && mem.q.includes(cleanMsg))));
                  if (foundMem) cachedAnswer = foundMem.a;
              } catch (e) {}

              if (cachedAnswer) {
                  await new Promise(resolve => setTimeout(resolve, 600));
                  setMessages(prev => [...prev, { role: 'model', text: cachedAnswer, isTrainable: true }]);
              } else {
                  const historyDiet = messages.slice(-4); 
                  let aiBackendAnswer = await callRealAI(msg, lang, historyDiet);
                  
                  if (aiBackendAnswer.includes('*(Debug Error)*')) {
                      const fallbackList = lang === 'en' ? (API_FALLBACK_RESPONSES_EN || []) : (API_FALLBACK_RESPONSES || []);
                      aiBackendAnswer = getRandomItems(fallbackList, 1)[0] || "Internet Error. Try again.";
                      setMessages(prev => [...prev, { role: 'model', text: aiBackendAnswer, chips: getRandomItems(getSuggestList(), 3), isTrainable: false }]);
                  } else {
                      try {
                          const globalMemory = JSON.parse(localStorage.getItem('myDesign_ai_memory_cache') || '[]');
                          globalMemory.push({ q: cleanMsg, a: aiBackendAnswer, lang: lang });
                          if (globalMemory.length > 50) globalMemory.shift();
                          localStorage.setItem('myDesign_ai_memory_cache', JSON.stringify(globalMemory));
                      } catch (e) {}
                      
                      const nextChips = getRandomItems(getSuggestList(), 3);
                      setMessages(prev => [...prev, { role: 'model', text: aiBackendAnswer, chips: nextChips, isTrainable: true }]);

                      runSecretBackgroundTraining(cleanMsg, aiBackendAnswer);
                  }
              }
              
          } else {
              await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));
              setMessages(prev => [...prev, { 
                  role: 'model', 
                  text: responseData.answer, 
                  chips: responseData.chips || [],
                  uiElement: responseData.uiElement,
                  colors: responseData.colors,
                  actionButton: responseData.actionButton,
                  isTrainable: false 
              }]);
          }

      } catch (error) {
          const fallbackList = lang === 'en' ? (API_FALLBACK_RESPONSES_EN || []) : (API_FALLBACK_RESPONSES || []);
          const randomFallback = getRandomItems(fallbackList, 1)[0] || "Connection issue.";
          setMessages(prev => [...prev, { role: 'model', text: randomFallback, chips: getRandomItems(getSuggestList(), 3), isTrainable: false }]);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const scrollToBottom = (behavior) => {
          isAutoScrolling.current = true; 
          if (behavior === 'auto') {
              container.scrollTop = container.scrollHeight;
          } else {
              if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: "end" });
          }
          setTimeout(() => {
              isAutoScrolling.current = false;
              if (container) setLastScrollY(container.scrollTop);
          }, 350);
      };
      
      if (isInitialMount.current) {
          setShowHeader(true); 
          scrollToBottom('auto');
          const timeoutId = setTimeout(() => {
              scrollToBottom('auto');
              isInitialMount.current = false;
          }, 300);
          return () => clearTimeout(timeoutId);
      } else {
          scrollToBottom('smooth');
      }
  }, [messages, loading]);

  useEffect(() => {
      const handleScroll = () => {
          if (isAutoScrolling.current) return; 
          if (!scrollContainerRef.current) return;
          const currentScrollY = scrollContainerRef.current.scrollTop;
          
          if (currentScrollY > lastScrollY && currentScrollY > 50) setShowHeader(false);
          else if (currentScrollY < lastScrollY) setShowHeader(true);
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
              setKeyboardHeight(keyboardH > 50 ? keyboardH : 0);
              
              setTimeout(() => {
                  if (messagesEndRef.current && !isInitialMount.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
              }, 50);
          }
      };

      if (window.visualViewport) {
          window.visualViewport.addEventListener('resize', updateViewport);
          window.visualViewport.addEventListener('scroll', updateViewport);
          updateViewport();
      } else window.addEventListener('resize', () => setViewportHeight(`${window.innerHeight}px`));

      return () => {
          if (window.visualViewport) {
              window.visualViewport.removeEventListener('resize', updateViewport);
              window.visualViewport.removeEventListener('scroll', updateViewport);
          } else window.removeEventListener('resize', () => setViewportHeight(`${window.innerHeight}px`));
      };
  }, []);

  useEffect(() => {
      const handleFocusIn = (e) => {
          const tag = e.target.tagName;
          if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) {
              setIsKeyboardOpen(true);
              setShowHeader(true);
              setTimeout(() => {
                  if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
              }, 150);
          }
      };
      const handleFocusOut = () => setIsKeyboardOpen(false);

      document.addEventListener('focusin', handleFocusIn);
      document.addEventListener('focusout', handleFocusOut);

      return () => {
          document.removeEventListener('focusin', handleFocusIn);
          document.removeEventListener('focusout', handleFocusOut);
      };
  }, []);

  const theme = {
      bg: isDarkMode ? 'bg-[#121212]' : 'bg-[#F8F9FA]',
      textMain: isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]',
      textSub: isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]',
      userBubble: isDarkMode ? 'bg-gradient-to-r from-[#41B6E6] to-[#0277C5] text-[#FFFFFF]' : 'bg-gradient-to-r from-[#0277C5] to-[#01579B] text-[#FFFFFF]', 
      botBubble: isDarkMode ? 'bg-[#1E1E1E] text-[#F1F1F1] border border-[#2C2C2C]' : 'bg-[#FFFFFF] text-[#1A1A1A] border border-[#E5E7EB]',
      inputBg: isDarkMode ? 'bg-[#1E1E1E] border border-[#2C2C2C]' : 'bg-[#FFFFFF] border border-[#E5E7EB]',
      inputColor: isDarkMode ? 'text-[#F1F1F1] placeholder-[#A0A0A0]' : 'text-[#1A1A1A] placeholder-[#6B7280]',
      iconColor: 'text-[#C55002]',
  };

  return (
    <div className={`absolute left-0 w-full flex flex-col overflow-hidden font-sans transition-colors ${theme.bg}`} style={{ height: '100%', paddingBottom: `${keyboardHeight}px` }}>
      
      <div className={`absolute top-0 left-0 w-full z-30 transition-transform duration-300 ease-in-out ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className={`flex items-center justify-between px-4 py-3 backdrop-blur-md border-b shadow-sm ${isDarkMode ? 'bg-[#121212]/80 border-white/5 shadow-black/20' : 'bg-white/80 border-black/5 shadow-[#0277C5]/5'}`}>
              <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${isDarkMode ? 'from-[#41B6E6] to-[#0277C5]' : 'from-[#0277C5] to-[#01579B]'} flex items-center justify-center shadow-inner`}>
                      <Bot size={18} className="text-white drop-shadow-sm" />
                  </div>
                  <div className="flex flex-col">
                      <h2 className={`text-[15px] font-black font-khmer leading-none ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>MY DESIGN AI</h2>
                      <span className="text-[9px] font-black uppercase tracking-widest text-green-500 flex items-center gap-1.5 mt-1">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> {lang === 'en' ? 'Online' : 'កំពុងភ្ជាប់'}
                      </span>
                  </div>
              </div>
              
              <button type="button" onClick={handleClearChat} className={`p-2 rounded-xl transition-all duration-300 ease-out active:scale-90 border ${isDarkMode ? 'bg-[#1E1E1E]/50 border-[#2C2C2C] text-[#A0A0A0] hover:text-[#FF453A] hover:bg-[#FF453A]/10' : 'bg-[#F8F9FA]/80 border-[#E5E7EB] text-[#6B7280] hover:text-[#FF453A] hover:bg-[#FF453A]/10'}`} title={t('clear_tooltip')}><Trash2 size={16} /></button>
          </div>
      </div>
      
      <div ref={scrollContainerRef} className={`flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-none pt-20 no-scrollbar ${theme.bg}`} id="messenger-scroll-container">
          <div className="max-w-4xl mx-auto w-full p-3 sm:p-4 space-y-4">
              {messages.map((m, i) => {
                  const isUser = m.role === 'user';
                  return (
                      <div key={i} className={`flex flex-col w-full ${isUser ? 'items-end' : 'items-start'} animate-fade-in-up`}>
                          <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} items-end`}>
                              {!isUser && (
                                  <div className={`w-7 h-7 rounded-[10px] bg-gradient-to-tr ${isDarkMode ? 'from-[#41B6E6] to-[#0277C5]' : 'from-[#0277C5] to-[#01579B]'} flex items-center justify-center mr-2 shrink-0 mb-1 shadow-sm`}>
                                      <Bot size={14} className="text-white" />
                                  </div>
                              )}
                              
                              <div className={`max-w-[85%] sm:max-w-[75%] flex flex-col`}>
                                  {m.text && (
                                      <div className={`px-3.5 py-2.5 sm:px-4 sm:py-3 text-[14.5px] sm:text-[15px] leading-relaxed break-words [word-break:break-word] overflow-hidden shadow-sm font-khmer ${isUser ? `${theme.userBubble} rounded-2xl rounded-br-[4px]` : `${theme.botBubble} rounded-2xl rounded-bl-[4px]`}`}>
                                          {typeof m.text === 'object' ? JSON.stringify(m.text) : formatMessage(m.text)}
                                          
                                          {!isUser && m.uiElement === 'color_palette' && m.colors && (
                                              <div className="flex gap-2 mt-4 mb-1">
                                                  {m.colors.map(colorHex => (
                                                      <div key={colorHex} className="flex flex-col items-center gap-1 group">
                                                          <div className="w-12 h-12 rounded-xl shadow-md border-2 border-black/10 transform transition-transform group-hover:scale-110" style={{backgroundColor: colorHex}}></div>
                                                          <span className="text-[9px] font-mono font-bold opacity-70">{colorHex}</span>
                                                      </div>
                                                  ))}
                                              </div>
                                          )}

                                          {!isUser && m.actionButton && (
                                              <button onClick={() => { triggerHaptic(); if (m.actionButton.subTab) { localStorage.setItem('myDesign_target_subtab', m.actionButton.subTab); } window.dispatchEvent(new CustomEvent('switchTab', { detail: m.actionButton.actionToTrigger })); if (m.actionButton.subTab) { setTimeout(() => { window.dispatchEvent(new CustomEvent('switchToolSubTab', { detail: m.actionButton.subTab })); }, 100); } }} className="mt-4 px-4 py-2.5 bg-[#C55002] text-white font-khmer font-bold text-sm rounded-xl active:scale-95 transition-transform flex items-center gap-2 shadow-lg">
                                                  {lang === 'en' ? m.actionButton.label_en : m.actionButton.label} <ArrowRight size={16} />
                                              </button>
                                          )}
                                      </div>
                                  )}
                              </div>
                          </div>
                          
                          {!isUser && m.chips && m.chips.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2 ml-9">
                                  {m.chips.map((chip, idx) => (
                                      <button key={idx} onClick={() => { triggerHaptic(); handleSend(chip); }} className={`px-3 py-1.5 text-[12px] font-khmer rounded-full border transition-all active:scale-95 ${isDarkMode ? 'bg-[#1E1E1E] border-[#41B6E6]/30 text-[#41B6E6] hover:bg-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#0277C5]/30 text-[#0277C5] hover:bg-[#F8F9FA]'}`}>
                                          {chip}
                                      </button>
                                  ))}
                              </div>
                          )}

                          {!isUser && i > 0 && !m.feedback && (
                              <div className="flex gap-2 mt-1.5 ml-9 opacity-40 hover:opacity-100 transition-opacity items-center">
                                  <button onClick={() => handleFeedback(i, 'up')} className="p-1 hover:text-green-500 rounded-md transition-colors"><ThumbsUp size={14}/></button>
                                  <button onClick={() => handleFeedback(i, 'down')} className="p-1 hover:text-red-500 rounded-md transition-colors"><ThumbsDown size={14}/></button>
                                  
                                  {isAdmin && m.isTrainable && !m.isTraining && (
                                      <button onClick={() => handleAutoTrain(i)} className="p-1 hover:text-[#41B6E6] rounded-md transition-colors ml-2 flex items-center gap-1" title="Auto-Train AI with this answer">
                                          <Brain size={14}/> <span className="text-[10px] font-bold">Auto-Train</span>
                                      </button>
                                  )}
                                  {m.isTraining && (
                                      <div className="ml-2 flex items-center gap-1 text-[#41B6E6] animate-pulse">
                                          <Loader2 size={12} className="animate-spin"/> <span className="text-[10px] font-bold">Training...</span>
                                      </div>
                                  )}
                              </div>
                          )}
                          {!isUser && m.feedback && (
                              <div className={`text-[10px] ml-9 mt-1.5 opacity-50 font-khmer font-medium ${m.feedback === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                  {m.feedback === 'up' ? t('thanks_feedback') : t('recorded_issue')}
                              </div>
                          )}
                      </div>
                  );
              })}
              
              {loading && (
                  <div className="flex justify-start items-end animate-fade-in-up">
                      <div className={`w-7 h-7 rounded-[10px] bg-gradient-to-tr ${isDarkMode ? 'from-[#41B6E6] to-[#0277C5]' : 'from-[#0277C5] to-[#01579B]'} flex items-center justify-center mr-2 shrink-0 mb-1 shadow-sm`}><Bot size={14} className="text-white" /></div>
                      <div className={`px-4 py-3.5 ${theme.botBubble} rounded-2xl rounded-bl-[4px] flex gap-1.5 shadow-sm`}>
                          <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDarkMode ? 'bg-[#A0A0A0]' : 'bg-[#6B7280]'}`} style={{animationDelay: '0ms'}}></div>
                          <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDarkMode ? 'bg-[#A0A0A0]' : 'bg-[#6B7280]'}`} style={{animationDelay: '150ms'}}></div>
                          <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDarkMode ? 'bg-[#A0A0A0]' : 'bg-[#6B7280]'}`} style={{animationDelay: '300ms'}}></div>
                      </div>
                  </div>
              )}
              <div ref={messagesEndRef} className="h-2" />
          </div>
      </div>
      
      <div className={`flex-none z-20 w-full flex flex-col px-2 transition-all duration-300 ${theme.bg} ${isKeyboardOpen ? 'pb-3' : 'pb-[85px] sm:pb-[90px]'}`}>
         <div className="max-w-4xl mx-auto w-full">
             <div className="flex items-center px-2 py-1.5 w-full overflow-hidden">
                 <button onMouseDown={(e) => e.preventDefault()} onTouchStart={(e) => e.preventDefault()} onClick={handleRefresh} className={`p-2 shrink-0 transition-transform duration-300 active:scale-90 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} ${isAnimating ? 'rotate-180 opacity-50' : ''}`} aria-label={t('refresh_tooltip')}><RefreshCw size={18} className={isAnimating ? 'animate-spin' : ''} /></button>
                 <div className="flex-1 overflow-x-auto no-scrollbar scroll-smooth">
                     <div className={`flex items-center gap-2 px-1 py-1 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                         {currentSuggestions.map((q, i) => (
                             <button key={i} onMouseDown={(e) => e.preventDefault()} onTouchStart={(e) => e.preventDefault()} onClick={(e) => { e.preventDefault(); triggerHaptic(); handleSend(q); }} className={`shrink-0 px-3 py-1.5 text-[12px] sm:text-[13px] font-medium font-khmer rounded-full whitespace-nowrap active:scale-95 transition-all shadow-sm border ${isDarkMode ? 'bg-[#1E1E1E] border-[#41B6E6]/30 text-[#41B6E6] hover:bg-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#0277C5]/30 text-[#0277C5] hover:bg-[#F8F9FA]'}`}>{q}</button>
                         ))}
                     </div>
                 </div>
             </div>
             
             <div className="flex items-end px-2 pb-1 w-full relative">
                <div className={`flex-1 relative flex items-center w-full shadow-sm rounded-[24px] overflow-hidden ${theme.inputBg}`}>
                    {!input && (
                        <div className={`absolute left-4 pointer-events-none text-[15px] font-khmer ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                            {t('placeholder')}
                        </div>
                    )}
                    <div 
                        ref={inputRef}
                        contentEditable={!loading ? "true" : "false"}
                        onInput={handleInputInput}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !loading) {
                                e.preventDefault();
                                if (input.trim()) { triggerHaptic(); handleSend(input); }
                            } else if (e.key === 'Enter') e.preventDefault();
                        }}
                        className={`w-full min-h-[44px] max-h-[120px] overflow-y-auto pl-4 pr-12 py-2.5 text-[15px] font-khmer outline-none transition-all whitespace-pre-wrap break-words ${theme.inputColor} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        spellCheck="false" role="textbox" aria-multiline="true" autoCorrect="off" autoCapitalize="off" suppressHydrationWarning
                    />
                    <button type="button" disabled={!input.trim() || loading} onMouseDown={(e) => { e.preventDefault(); if (!loading) handleSend(input); }} onTouchStart={(e) => { e.preventDefault(); if (!loading) { triggerHaptic(); handleSend(input); } }} className={`absolute right-1.5 bottom-1 p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 active:scale-90 transition-transform ${input.trim() && !loading ? theme.iconColor : 'text-[#9AA0A6] dark:text-[#6B7280]'}`} aria-label="Send Message"><Send size={20} className={input.trim() && !loading ? '' : 'opacity-50'} /></button>
                </div>
             </div>
         </div>
      </div>

      {showConfirmModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-5 backdrop-blur-md bg-black/60 animate-fade-in-up">
              <div className={`w-full max-w-[320px] p-6 rounded-[32px] shadow-2xl border transition-all ${isDarkMode ? 'bg-[#1A1A1A] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                  <div className="text-center">
                      <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-5"><Trash2 size={28} className="text-red-500" /></div>
                      <p className={`text-[16px] font-bold font-khmer mb-8 leading-relaxed ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{t('clear_confirm')}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                      <button type="button" onClick={confirmClear} className="w-full py-3.5 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-khmer font-bold text-[15px] active:scale-95 transition-all shadow-lg shadow-red-500/20">{lang === 'en' ? 'Clear Everything' : 'លុបចេញទាំងអស់'}</button>
                      <button type="button" onClick={() => setShowConfirmModal(false)} className={`w-full py-3.5 rounded-2xl font-khmer font-bold text-[15px] active:scale-95 transition-all border ${isDarkMode ? 'bg-[#2C2C2C] border-[#3A3A3C] text-[#A0A0A0] hover:text-[#F1F1F1]' : 'bg-[#F8F9FA] border-[#E5E7EB] text-[#6B7280] hover:text-[#1A1A1A]'}`}>{lang === 'en' ? 'Cancel' : 'បោះបង់'}</button>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default ChatBot;