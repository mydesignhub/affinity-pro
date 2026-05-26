import React, { useState, useEffect, useRef } from 'react';
import { Send, Trash2, ThumbsUp, ThumbsDown, ArrowRight, Brain, Loader2, Copy, Edit2, CheckCircle2, Unlock } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

import {
    SUGGESTED_QUESTIONS, SUGGESTED_QUESTIONS_EN,
    SMART_GREETINGS, SMART_GREETINGS_EN,
    REPEAT_RESPONSES, REPEAT_RESPONSES_EN, API_FALLBACK_RESPONSES, API_FALLBACK_RESPONSES_EN,
    KNOWLEDGE_BASE
} from '../../../data/ai_database';

// ─── Local quiz invitations (Design/Affinity scope) ──────────────────────────
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

// ─── Retry chips ──────────────────────────────────────────────────────────────
const RETRY_CHIP_EN = "🔁 Try again";
const RETRY_CHIP_KH = "🔁 សាកម្តងទៀត";
const RETRY_CHIP_LABELS = [RETRY_CHIP_EN, RETRY_CHIP_KH];

// Offline chips — must be answerable locally so users aren't stuck during outages
const OFFLINE_FALLBACK_CHIPS_EN = [RETRY_CHIP_EN, "What is Affinity Designer?"];
const OFFLINE_FALLBACK_CHIPS_KH = [RETRY_CHIP_KH, "Affinity Designer ជាអ្វី?"];

// ─── Multi-turn intent patterns ───────────────────────────────────────────────
const CORRECTION_PATTERNS_EN = /\b(i (didn'?t|did not) (ask|mean)|that'?s not what i (asked|meant)|that'?s wrong|wrong answer|you (?:are )?wrong|you misunderstood|you don'?t understand|that'?s not it|not (?:that|what i (?:asked|meant))|i mean(?:t)? (?:something )?(?:else|different)|different (?:question|thing)|that doesn'?t answer|off topic|off-topic)\b/i;
const CORRECTION_PATTERNS_KH = [
    'មិនមែនហ្នឹង', 'មិនមែនអ៊ីចឹង', 'មិនបានសួរ', 'សួររឿងផ្សេង', 'សួរផ្សេង',
    'ខ្ញុំចង់សួរផ្សេង', 'ខ្ញុំសួរផ្សេង', 'ខុសហើយ', 'មិនត្រូវ', 'មិនមែនវាទេ',
    'អ្នកមិនយល់', 'យល់ខុស', 'ហ្នឹងមិនមែនទេ', 'ចម្លើយខុស', 'អ្នកឆ្លើយខុស',
    'ខ្ញុំមិនបានសួរ', 'ខុសប្រធានបទ'
];

const UNCERTAIN_PATTERNS_EN = /\b(i (?:don'?t|do not) know (?:what|where|how) (?:to (?:ask|start|learn|begin)|i (?:should|can))|where (?:do|should) i (?:start|begin)|help me (?:start|begin)|i'?m (?:lost|new|confused|stuck|a beginner)|teach me from (?:the )?(?:start|beginning|scratch)|guide me|walk me through)\b/i;
const UNCERTAIN_PATTERNS_KH = [
    'មិនដឹងចាប់ផ្តើមពីណា', 'មិនដឹងសួរអ្វី', 'មិនដឹងសួរអី', 'មិនយល់សោះ',
    'ខ្ញុំជាមនុស្សថ្មី', 'ជួយខ្ញុំចាប់ផ្តើម', 'ខ្ញុំមិនយល់ច្បាស់', 'ចាប់ផ្តើមពីណា',
    'រៀនចាប់ផ្តើមយ៉ាងម៉េច', 'ខ្ញុំទើបតែចាប់ផ្តើម', 'ខ្ញុំជាbeginner',
    'ខ្ញុំទើបចេះ', 'ខ្ញុំមិនទាន់ចេះ', 'ខ្ញុំចង់រៀនពីដំបូង', 'ណែនាំខ្ញុំផង'
];

const CONTINUATION_PATTERNS_EN = /\b(tell me more|more (?:detail|details|example|examples|info|please)|another (?:example|one)|explain (?:more|again|further|that|this)|go deeper|elaborate|expand on (?:that|this|it)|continue|keep going|more about (?:this|that|it)|what (?:else|next))\b/i;
const CONTINUATION_PATTERNS_KH = [
    'ប្រាប់បន្ថែម', 'ប្រាប់ខ្ញុំបន្ថែម', 'ឧទាហរណ៍ផ្សេង', 'ពន្យល់ម្តងទៀត',
    'ពន្យល់បន្ថែម', 'លម្អិតបន្ថែម', 'បន្ថែមទៀត', 'បន្តទៅ',
    'ខ្ញុំចង់ដឹងបន្ថែម', 'ដឹងបន្ថែម', 'ម៉េចទៀត', 'អីទៀត',
    'ឧទាហរណ៍បន្ថែម', 'ពន្យល់ឱ្យច្បាស់', 'ឱ្យច្បាស់បន្តិច', 'អ្វីបន្ទាប់'
];

// ─── API ──────────────────────────────────────────────────────────────────────
const AI_REQUEST_TIMEOUT_MS = 45000;

const MARKETING_SYSTEM_EN = `[SYSTEM: You are "Affinity iPad AI" — the official smart assistant & marketing coach for the Affinity iPad learning platform. Your mission:
1. EDUCATE: Teach Affinity Photo, Designer & Publisher on iPad with clear, practical answers
2. ENGAGE: Be warm, expert, and encouraging — make design feel achievable
3. CONVERT: Naturally guide users toward taking Quizzes, earning Design Certificates, and exploring app features
4. Brand voice: Confident, friendly, concise. Max 3 short paragraphs. Always end with a next step or CTA.
Relevant app features to mention when appropriate: Skill Quizzes (Beginner/Intermediate/Advanced), Final Certification Exam (90% pass), downloadable PDF Certificates, Color Generator, Layout Tools, AI Assistant.]\n`;

const MARKETING_SYSTEM_KH = `[ប្រព័ន្ធ: អ្នកគឺ "Affinity iPad AI" — ជំនួយការ AI ផ្លូវការ និង Marketing Coach សម្រាប់ Platform រៀន Affinity iPad។ ភារកិច្ច:
1. EDUCATE: បង្រៀន Affinity Photo, Designer & Publisher ដោយច្បាស់លាស់
2. ENGAGE: ស្រលាញ់ ជំនាញ ហ្មមត់ — ធ្វើឱ្យ Design ហាក់ងាយស្រួល
3. CONVERT: ណែនាំ Quiz, Certificate, Tools ដោយធម្មជាតិ
4. ភាសា: ខ្លី, ច្បាស់, ចប់ដោយ CTA ។ ៣ កថាខណ្ឌ ត្រឹម។
Features App: Skill Quiz (Beginner/Intermediate/Advanced), Final Exam (90%), Certificate PDF, Color Generator, Layout Tools.]\n`;

const callRealAI = async (userPrompt, language, history = []) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), AI_REQUEST_TIMEOUT_MS);
    try {
        const systemContext = language === 'en' ? MARKETING_SYSTEM_EN : MARKETING_SYSTEM_KH;
        const recentHistoryText = systemContext + history.slice(-10).map(msg =>
            `${msg.role === 'user' ? 'User' : 'AI Assistant'}: ${msg.text}`
        ).join('\n');
        const response = await fetch('https://my-affinity-backend.onrender.com/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ prompt: userPrompt, history: recentHistoryText, language }),
            signal: controller.signal
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`HTTP ${response.status}: ${errorData.details || errorData.error || 'Server error'}`);
        }
        const data = await response.json();
        return data.reply || data.answer || data.text || data.message || "✅ Connected, but response was empty.";
    } catch (error) {
        const reason = error.name === 'AbortError' ? `Timeout after ${AI_REQUEST_TIMEOUT_MS}ms` : error.message;
        return `*(Debug Error)* ⚠️ Connection Failed: ${reason}`;
    } finally {
        clearTimeout(timeoutId);
    }
};

// ─── Text utilities ───────────────────────────────────────────────────────────
const strictClean = (text) => {
    if (!text) return '';
    return text.toLowerCase().replace(/[^\p{L}\p{N}\p{M}]/gu, '');
};

const superClean = (t) => (t || '').toLowerCase().replace(/[^\p{L}\p{N}\p{M}]/gu, '');

const triggerHaptic = (type = 'light') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        if (type === 'error') navigator.vibrate([50, 50, 50]);
        else if (type === 'success') navigator.vibrate([30, 50, 30]);
        else navigator.vibrate(10);
    }
};

// Fisher-Yates shuffle — unbiased and O(n)
const getRandomItems = (arr, count) => {
    if (!arr || !arr.length) return [];
    const a = arr.slice();
    const n = a.length;
    const take = Math.min(count, n);
    for (let i = n - 1; i > n - 1 - take; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(n - take).reverse();
};

const getRandomQuizInvitation = (language = 'kh') => {
    const invitations = language === 'en' ? LOCAL_QUIZ_INVITATIONS_EN : LOCAL_QUIZ_INVITATIONS;
    return invitations[Math.floor(Math.random() * invitations.length)];
};

// Safe bold formatter — no dangerouslySetInnerHTML
const formatBoldInline = (line) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
            return <strong key={j} className="font-black">{part.slice(2, -2)}</strong>;
        }
        return <React.Fragment key={j}>{part}</React.Fragment>;
    });
};

const formatMessage = (text) => {
    if (typeof text !== 'string') return text;
    return text.split('\n').map((line, i, arr) => (
        <React.Fragment key={i}>
            {formatBoldInline(line)}
            {i !== arr.length - 1 && <br />}
        </React.Fragment>
    ));
};

// ─── Custom Bot Avatar (My Design logo SVG) ───────────────────────────────────
const MY_DESIGN_LOGO_PATHS = (
    <g>
        <path d="M117.784,111.227c-3.019,1.194 -5.412,3.587 -6.606,6.606l-3.326,8.385c-0.295,0.765 -1.438,0.765 -1.733,0c-0,-0 -3.326,-8.385 -3.326,-8.385c-1.191,-3.021 -3.585,-5.415 -6.606,-6.606l-8.385,-3.326c-0.958,-0.379 -0.958,-1.354 0,-1.733l8.385,-3.326c3.021,-1.191 5.415,-3.585 6.606,-6.606l3.326,-8.385c0.299,-0.752 1.434,-0.752 1.733,0l3.326,8.385c1.194,3.019 3.587,5.412 6.606,6.606l8.441,3.326c0.757,0.299 0.757,1.434 0,1.733l-8.441,3.326Z" fillRule="nonzero" />
        <path d="M48.781,50.899l0,9.742l-4.669,0l-1.76,-3.233l0,-18.304l6.428,11.794Z" fillRule="nonzero" />
        <path d="M59.418,39.157l0,18.243l-1.767,3.241l-4.648,0l0,-9.72l6.414,-11.764Z" fillRule="nonzero" />
        <path d="M100.633,52.872l0,26.917c0,1.179 -0.483,2.311 -1.343,3.146l-8.604,8.352l-28.303,0l10.002,-9.656l18.301,0l0,-28.759c0,-1.179 -0.483,-2.311 -1.343,-3.146l-2.351,-2.283c-0.86,-0.835 -2.026,-1.304 -3.241,-1.304l-12.964,0l0,26.813l-9.996,18.331l0,-53.371c0,-0.756 0.63,-1.369 1.409,-1.369l21.612,0c1.215,0 2.381,0.469 3.24,1.304l12.236,11.878c0.86,0.835 1.343,1.967 1.343,3.146Z" fillRule="nonzero" />
        <path d="M40.943,37.912l0,21.423l-9.947,0l0,-18.341c0,-2.457 2.053,-4.449 4.583,-4.449l3.953,0c0.78,0 1.41,0.612 1.41,1.368Z" fillRule="nonzero" />
        <path d="M55.414,64.743l-4.522,8.294l-0.016,0.031l-4.532,-8.325l9.069,0Z" fillRule="nonzero" />
        <path d="M35.266,79.911l0,11.374l-0.373,0l-7.695,-14.114l3.797,-6.966l9.947,0l3.799,6.968l-7.695,14.114l-0.373,0l0,-11.376c1.225,-0.313 2.132,-1.425 2.132,-2.747c0,-1.565 -1.27,-2.835 -2.835,-2.835c-1.565,0 -2.835,1.27 -2.835,2.835c0,1.322 0.907,2.434 2.132,2.747Z" fillRule="nonzero" />
        <path d="M42.353,62.009l0,5.464l-1.409,1.369l-9.948,0l-1.409,-1.369l0,-5.464c0,-0.755 0.631,-1.369 1.409,-1.369l9.947,0c0.779,0.001 1.41,0.613 1.41,1.369Z" fillRule="nonzero" />
        <path d="M69.56,113.856c3.29,3.113 4.519,6.226 3.786,9.339l-45.473,0c-12.825,0 -23.237,-10.412 -23.237,-23.237l0,-72.085c0,-12.825 10.412,-23.237 23.237,-23.237l72.085,0c12.825,0 23.237,10.412 23.237,23.237l0,45.998c-3.113,0.533 -6.226,-0.401 -9.339,-3.635l-0,-42.364c0,-7.67 -6.227,-13.898 -13.898,-13.898l-72.085,0c-7.67,0 -13.898,6.227 -13.898,13.898l0,72.085c0,7.67 6.227,13.898 13.898,13.898l41.687,-0Z" fillRule="nonzero" />
    </g>
);

const BotAvatar = ({ size = 16, className = 'text-white drop-shadow-sm', ariaLabel = 'AI assistant' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        fill="currentColor"
        className={className}
        role="img"
        aria-label={ariaLabel}
        style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
    >
        {MY_DESIGN_LOGO_PATHS}
    </svg>
);

// ─── Multi-choice question parser ─────────────────────────────────────────────
const parseMultiChoiceQuestion = (botText) => {
    if (!botText) return null;
    const m = botText.match(/([^?？។៕\n]+[?？])\s*$/);
    if (!m) return null;
    let question = m[1].trim();
    if (!/\bor\b|ឬ/i.test(question)) return null;
    const leadinRe = /^.*(?:\b(?:about|with|between|from|like|cover|tackle|explore)\s+|(?:ពី|អំពី|ដូចជា|ក្នុងចំណោម|រវាង)\s*)/i;
    question = question.replace(leadinRe, '').replace(/[?？]\s*$/, '').trim();
    const choices = question
        .split(/,\s*|\s+(?:ឬ|or)\s+/i)
        .map(s => s.trim().replace(/^(?:តើ|the|a|an|or|ឬ)\s+/i, ''))
        .filter(s => s.length > 1 && s.length < 80);
    return (choices.length >= 2 && choices.length <= 5) ? choices : null;
};

// ─── FOLLOW_UP_MAP (Design/Affinity topic chain) ──────────────────────────────
const FOLLOW_UP_MAP = {
    // Marketing funnel chain
    'App នេះជាអ្វី': 'App ប្រើបានដោយឥតគិតថ្លៃទេ?',
    'what is this app': 'is the app free to use',
    'App ប្រើបានដោយឥតគិតថ្លៃទេ?': 'ចាប់ផ្តើមដោយរបៀបណា',
    'is the app free to use': 'how to get started',
    'ចាប់ផ្តើមដោយរបៀបណា': 'ចង់ធ្វើតេស្ត',
    'how to get started': 'take a quiz',
    'វិញ្ញាបនបត្ររចនា 🏆': 'ចាប់ផ្តើមដោយរបៀបណា',
    'design certificate': 'how to get started',
    'ហេតុអ្វីប្រើ Affinity iPad': 'App ប្រើបានដោយឥតគិតថ្លៃទេ?',
    'why use affinity on ipad': 'is the app free to use',
    'Affinity ធៀបនឹង Photoshop': 'ហេតុអ្វីប្រើ Affinity iPad',
    'affinity vs photoshop': 'why use affinity on ipad',

    // Design learning chain
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

// ─────────────────────────────────────────────────────────────────────────────
const ChatBot = ({ messages = [], setMessages, isDarkMode, liveAiData = [], setLiveAiData, isAdmin }) => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const lastScrollY = useRef(0);
    const [viewportHeight, setViewportHeight] = useState('100%');
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState('');
    const [animState, setAnimState] = useState('idle');
    const [headerStatusText, setHeaderStatusText] = useState('Affinity iPad AI');
    const touchStartX = useRef(0);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const suggestionsScrollRef = useRef(null);
    const isInitialMount = useRef(true);
    const isAutoScrolling = useRef(false);
    const idleTimerRef = useRef(null);

    // Anti-repetition: track recent chips and KB hits to avoid showing same content
    const recentChipsRef = useRef([]);
    const recentKbHitsRef = useRef([]);

    const [currentSuggestions, setCurrentSuggestions] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [currentTopic, setCurrentTopic] = useState(() => {
        if (typeof window !== 'undefined') return localStorage.getItem('myDesign_current_topic') || null;
        return null;
    });

    const { lang, t } = useLanguage();

    const COMBINED_DB = [...(KNOWLEDGE_BASE || []), ...liveAiData];

    // ─── Capability detection ─────────────────────────────────────────────────
    useEffect(() => {
        const touchCapable =
            (typeof window !== 'undefined' && 'ontouchstart' in window) ||
            (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) ||
            (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
        setIsTouchDevice(!!touchCapable);

        if (typeof window !== 'undefined' && window.matchMedia) {
            const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
            setReducedMotion(mq.matches);
            const handler = (e) => setReducedMotion(e.matches);
            if (mq.addEventListener) mq.addEventListener('change', handler);
            else if (mq.addListener) mq.addListener(handler);
            return () => {
                if (mq.removeEventListener) mq.removeEventListener('change', handler);
                else if (mq.removeListener) mq.removeListener(handler);
            };
        }
    }, []);

    // Fix iOS Safari window scroll
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

    // ─── Chip helpers ─────────────────────────────────────────────────────────
    const getSuggestList = () => lang === 'en' ? (SUGGESTED_QUESTIONS_EN || []) : (SUGGESTED_QUESTIONS || []);

    const pickFreshChips = (count = 3) => {
        const all = getSuggestList();
        if (!all || all.length === 0) return [];
        const recent = new Set(recentChipsRef.current);
        const available = all.filter(c => !recent.has(c));
        const pool = available.length >= count ? available : all;
        const picked = getRandomItems(pool, count);
        recentChipsRef.current.push(...picked);
        while (recentChipsRef.current.length > 6) recentChipsRef.current.shift();
        return picked;
    };

    const getTopicRelatedChips = (query, count = 3) => {
        if (!query) return pickFreshChips(count);
        const all = getSuggestList();
        const recent = new Set(recentChipsRef.current);
        const qLower = query.toLowerCase();
        const qTokens = qLower.split(/[\s\-,?។]+/).filter(t => t.length > 2);
        if (qTokens.length === 0) return pickFreshChips(count);

        const scored = all
            .filter(q => q !== query && !recent.has(q))
            .map(q => {
                const ql = q.toLowerCase();
                let score = 0;
                for (const tok of qTokens) { if (ql.includes(tok)) score += tok.length; }
                return { q, score };
            })
            .filter(x => x.score > 0)
            .sort((a, b) => b.score - a.score);

        const picked = scored.slice(0, count).map(x => x.q);
        if (picked.length >= count) {
            recentChipsRef.current.push(...picked);
            while (recentChipsRef.current.length > 6) recentChipsRef.current.shift();
            return picked;
        }
        return pickFreshChips(count);
    };

    const generateFilteredChips = (exactMatch, rawQuery) => {
        let chipsData = lang === 'en' && exactMatch.chips_en ? exactMatch.chips_en : exactMatch.chips;
        if (chipsData) {
            const strictQuery = strictClean(rawQuery);
            chipsData = chipsData.filter(c => strictClean(c) !== strictQuery);
            if (chipsData.length < 2) {
                const more = pickFreshChips(2);
                chipsData = [...new Set([...chipsData, ...more])].slice(0, 3);
            }
        }
        return chipsData ? chipsData.slice(0, 3) : pickFreshChips(3);
    };

    // ─── Secret background training (Firebase) ────────────────────────────────
    const runSecretBackgroundTraining = async (userQ, botA) => {
        try {
            const prompt = `Analyze this interaction:\nUser Question: "${userQ}"\nBot Answer: "${botA}"\n\nTask:\n1. Check if this is related to Graphic Design, Affinity software, Photo Editing, Layouts, or Typography. If it is UNRELATED, reply ONLY with the exact word: REJECT\n2. If it IS related, format as JSON:\n{"primaryKeys": ["key1", "key2"], "keys": ["k1", "k2", "k3"], "regex": ["reg1"], "answer": "Corrected Khmer", "answer_en": "English translation"}`;
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
            if (setLiveAiData) setLiveAiData(prev => [...prev, newEntry]);
        } catch { }
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
            if (setLiveAiData) setLiveAiData(prev => [...prev, newEntry]);
            triggerHaptic('success');
            setMessages(prev => {
                const newMsgs = [...prev];
                newMsgs[index] = { ...newMsgs[index], isTraining: false, feedback: 'up', isTrainable: false };
                newMsgs.push({ role: 'model', text: `✅ **Trained & Synced to Cloud!**\nKeys: *${newEntry.primaryKeys.join(', ')}*`, chips: [], isTrainable: false });
                return newMsgs;
            });
            setTimeout(() => { if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, 100);
        } catch (err) {
            triggerHaptic('error');
            setMessages(prev => { const newMsgs = [...prev]; newMsgs[index] = { ...newMsgs[index], isTraining: false }; return newMsgs; });
            alert("Admin Train Failed: " + err.message);
        }
    };

    // ─── Greeting ─────────────────────────────────────────────────────────────
    const generateSmartGreeting = () => {
        const interests = JSON.parse(localStorage.getItem('myDesign_user_interests') || '[]');
        const hour = new Date().getHours();

        const timeKh = hour >= 5 && hour < 12 ? "អរុណសួស្តី! 🌅" : hour >= 12 && hour < 17 ? "ទិវាសួស្តី! ☀️" : hour >= 17 && hour < 22 ? "សាយន្តសួស្តី! 🌇" : "រាត្រីសួស្តី! 🌙";
        const timeEn = hour >= 5 && hour < 12 ? "Good morning! 🌅" : hour >= 12 && hour < 17 ? "Good afternoon! ☀️" : hour >= 17 && hour < 22 ? "Good evening! 🌇" : "Working late? 🌙";

        let greetingMsg, defaultChips;

        if (interests.length > 0) {
            const smartList = lang === 'en' ? (SMART_GREETINGS_EN || []) : (SMART_GREETINGS || []);
            const template = getRandomItems(smartList, 1)[0];
            if (template) {
                greetingMsg = (typeof template === 'object' ? template.greeting || '' : template).replace('{topic}', interests[interests.length - 1]);
                defaultChips = lang === 'en'
                    ? [interests[interests.length - 1], "Design Certificate 🏆", "Take a Quiz 🎯"]
                    : [interests[interests.length - 1], "វិញ្ញាបនបត្ររចនា 🏆", "ចង់ធ្វើតេស្ត 🎯"];
            }
        }

        if (!greetingMsg) {
            greetingMsg = lang === 'en'
                ? `${timeEn} I'm **Affinity iPad AI** — your personal design coach. 🎨\n\nI can **teach you Affinity**, **quiz your skills**, and guide you to an official **Design Certificate**. What's your goal today?`
                : `${timeKh} ខ្ញុំគឺ **Affinity iPad AI** — គ្រូ Design ផ្ទាល់ខ្លួនរបស់អ្នក! 🎨\n\nខ្ញុំបង្រៀន **Affinity**, ធ្វើ **Quiz**, ហើយណែនាំអ្នកទៅ **វិញ្ញាបនបត្ររចនា** ផ្លូវការ។ ថ្ងៃនេះចង់ចាប់ផ្តើមពីណា?`;
            defaultChips = lang === 'en'
                ? ["What is this app?", "Take a Quiz 🎯", "Is the app free to use?"]
                : ["App នេះជាអ្វី", "ចង់ធ្វើតេស្ត 🎯", "App ប្រើបានដោយឥតគិតថ្លៃទេ?"];
        }

        setMessages([{ role: 'model', text: greetingMsg, chips: defaultChips.slice(0, 3), isTrainable: false }]);
    };

    // ─── Idle marketing nudge ─────────────────────────────────────────────────
    const triggerIdleQuiz = () => {
        setMessages(prev => {
            if (prev.length === 0) return prev;
            const lastMsg = prev[prev.length - 1];
            const allInvitations = [...LOCAL_QUIZ_INVITATIONS, ...LOCAL_QUIZ_INVITATIONS_EN];
            if (lastMsg.role === 'model' && allInvitations.includes(lastMsg.text)) return prev;

            const nudges = lang === 'en' ? [
                { text: getRandomQuizInvitation('en'), chips: ["Take a Quiz 🎯", "Design Certificate 🏆", "What is this app?"] },
                { text: "Still here? 👋 Did you know you can earn an official **Affinity Design Certificate** by passing the Final Exam? It's a great addition to your portfolio!", chips: ["Design Certificate 🏆", "How to get started", "Is the app free?"] },
                { text: "💡 **Quick tip:** The fastest way to master Affinity is to take a Skill Quiz first — it shows exactly which areas to focus on. Ready to try?", chips: ["Take a Quiz 🎯", "Affinity vs Photoshop", "Why use Affinity on iPad?"] },
            ] : [
                { text: getRandomQuizInvitation('kh'), chips: ["ចង់ធ្វើតេស្ត 🎯", "វិញ្ញាបនបត្ររចនា 🏆", "App នេះជាអ្វី"] },
                { text: "នៅទីនេះ? 👋 តើអ្នកដឹងទេថា អ្នកអាចទទួល **វិញ្ញាបនបត្ររចនា Affinity** ផ្លូវការ ដោយការប្រឡង Final Exam? ល្អណាស់សម្រាប់ Portfolio!", chips: ["វិញ្ញាបនបត្ររចនា 🏆", "ចាប់ផ្តើមដោយរបៀបណា", "App ប្រើបានដោយឥតគិតថ្លៃទេ?"] },
                { text: "💡 **គន្លឹះ:** វិធីលឿនបំផុតដើម្បីស្ទាត់ Affinity គឺចាប់ផ្តើមដោយ Skill Quiz — វាបង្ហាញច្បាស់ថាត្រូវ Focus ផ្នែកណា។ ត្រៀមហើយ?", chips: ["ចង់ធ្វើតេស្ត 🎯", "Affinity ធៀបនឹង Photoshop", "ហេតុអ្វីប្រើ Affinity iPad"] },
            ];

            const picked = nudges[Math.floor(Math.random() * nudges.length)];
            return [...prev, { role: 'model', text: picked.text, chips: picked.chips, isTrainable: false }];
        });
    };

    const resetIdleTimer = () => {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(triggerIdleQuiz, 120000);
    };

    // ─── Effects ──────────────────────────────────────────────────────────────
    useEffect(() => {
        try {
            const savedHistory = localStorage.getItem('myDesign_chat_history');
            if (savedHistory && JSON.parse(savedHistory).length > 0) {
                setMessages(JSON.parse(savedHistory));
            } else {
                generateSmartGreeting();
            }
        } catch { generateSmartGreeting(); }
        setCurrentSuggestions(pickFreshChips(3));
    }, [lang]);

    useEffect(() => {
        resetIdleTimer();
        return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current); };
    }, [messages, input, lang]);

    useEffect(() => {
        if (messages && messages.length > 0) {
            const HISTORY_CAP = 200;
            const persisted = messages.length > HISTORY_CAP ? messages.slice(-HISTORY_CAP) : messages;
            localStorage.setItem('myDesign_chat_history', JSON.stringify(persisted));
        }
        if (currentTopic) localStorage.setItem('myDesign_current_topic', currentTopic);
    }, [messages, currentTopic]);

    const handleInputInput = (e) => setInput(e.currentTarget.textContent || e.currentTarget.innerText);

    // Animated refresh for suggestion chips
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
            if (suggestionsScrollRef.current) suggestionsScrollRef.current.scrollTo({ left: 0, behavior: 'auto' });
        }, isAuto ? 0 : 300);
    };

    const getAnimClasses = () => {
        switch (animState) {
            case 'out-left': return 'opacity-0 -translate-x-12 scale-95 transition-all duration-300';
            case 'out-right': return 'opacity-0 translate-x-12 scale-95 transition-all duration-300';
            case 'in-right': return 'opacity-0 translate-x-12 scale-95 transition-none';
            case 'in-left': return 'opacity-0 -translate-x-12 scale-95 transition-none';
            default: return 'opacity-100 translate-x-0 scale-100 transition-all duration-300';
        }
    };

    useEffect(() => {
        if (reducedMotion) return;
        const intervalId = setInterval(() => { handleRefresh(null, true); }, 15000);
        return () => clearInterval(intervalId);
    }, [lang, reducedMotion]);

    // Pull-to-refresh suggestions
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

    // Rotating header status text
    useEffect(() => {
        const texts = lang === 'en'
            ? ['Online · AI Coach', 'Quiz Available 🎯', 'Earn Certificates 🏆', 'Design Expert Ready', 'Free to Start ✨']
            : ['Online · AI Coach', 'Quiz រង់ចាំ 🎯', 'ទទួល Certificate 🏆', 'ជំនួយការ Design', 'ឥតគិតថ្លៃ ✨'];
        setHeaderStatusText(texts[0]);
        if (reducedMotion) return;
        let currentIndex = 0;
        const textInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            setHeaderStatusText(texts[currentIndex]);
        }, 3000);
        return () => clearInterval(textInterval);
    }, [lang, reducedMotion]);

    // ─── Chat actions ─────────────────────────────────────────────────────────
    const handleClearChat = (e) => {
        if (e) e.preventDefault();
        triggerHaptic();
        setShowConfirmModal(true);
    };

    const confirmClear = () => {
        localStorage.removeItem('myDesign_chat_history');
        localStorage.removeItem('myDesign_current_topic');
        localStorage.removeItem('myDesign_ai_memory_cache');
        recentChipsRef.current = [];
        recentKbHitsRef.current = [];
        generateSmartGreeting();
        setCurrentTopic(null);
        setShowConfirmModal(false);
    };

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
        setMessages(prev => { const updated = [...prev]; updated[index] = { ...updated[index], feedback: type }; return updated; });
    };

    // ─── AI response logic ────────────────────────────────────────────────────
    const buildContextualBackendPrompt = (userInput, kind, lastBotText) => {
        if (!lastBotText) return userInput;
        const snippet = lastBotText.length > 400 ? '…' + lastBotText.slice(-400) : lastBotText;
        if (kind === 'CONTINUATION') {
            return lang === 'en'
                ? `${userInput}\n\n[Context: the user wants you to CONTINUE elaborating on your previous response: "${snippet}". Provide MORE detail or examples — do NOT restart with a generic intro.]`
                : `${userInput}\n\n[បរិបទ៖ អ្នកប្រើប្រាស់ចង់ឱ្យអ្នកបន្តពន្យល់បន្ថែមលើចម្លើយមុន: "${snippet}"។ ផ្តល់ព័ត៌មានលម្អិត ឬឧទាហរណ៍ — កុំចាប់ផ្តើមឡើងវិញ។]`;
        }
        return lang === 'en'
            ? `${userInput}\n\n[Context: this is a ${kind} to your previous question — "${snippet}". Continue that thought; do NOT pivot to a generic reply.]`
            : `${userInput}\n\n[បរិបទ៖ នេះជាចម្លើយ ${kind} ចំពោះសំណួរមុន — "${snippet}"។ សូមបន្ត — កុំប្តូរប្រធានបទ។]`;
    };

    const findAIResponse = (inputTxt, history = [], source = 'user') => {
        const rawInput = inputTxt.trim();
        const rawLower = rawInput.toLowerCase();
        const cleanInput = strictClean(rawInput);
        const wordCount = rawInput.split(/\s+/).length;
        const isTrustedSource = source === 'chip' || source === 'suggestion';

        // Retry chip — re-send last real user message to backend
        if (RETRY_CHIP_LABELS.includes(rawInput)) {
            const lastQuery = [...history].reverse().find(m => m.role === 'user' && !RETRY_CHIP_LABELS.includes(m.text?.trim()));
            return { needsBackend: true, backendPrompt: lastQuery?.text || rawInput };
        }

        // Shared response formatter with anti-repetition
        const formatSuccessResponse = (bestMatch, opts = {}) => {
            const itemKey = bestMatch.primaryKeys && bestMatch.primaryKeys[0];
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
                const ackEN = "*(We covered this just above 👆 — same breakdown for quick recall. Want a different angle? Tap a chip below.)*\n\n";
                const ackKH = "*(យើងបានពិភាក្សារឿងនេះអម្បាញ់មិញ 👆 — នេះជាការពន្យល់ដដែលសម្រាប់រំលឹក។ បើចង់ស្តាប់មុំផ្សេង សូមចុចលើ chip ខាងក្រោម។)*\n\n";
                answerText = (lang === 'en' ? ackEN : ackKH) + answerText;
            } else if (opts.lowConfidence) {
                const softEN = "*(Not 100% sure which area you meant, but this looks closest. If it's off, rephrase or tap a chip.)*\n\n";
                const softKH = "*(ខ្ញុំមិនច្បាស់ ១០០% ប៉ុន្តែនេះហាក់ជិតបំផុត។ បើខុស សូមសរសេរម្តងទៀត ឬចុចលើ chip។)*\n\n";
                answerText = (lang === 'en' ? softEN : softKH) + answerText;
            }
            return { answer: answerText, chips: generateFilteredChips(bestMatch, rawInput), uiElement: bestMatch.uiElement, colors: finalColors, actionButton: bestMatch.actionButton, needsBackend: false };
        };

        // ── ZERO-FLAW PATH: chip/suggestion clicks ────────────────────────────
        // Bot-curated chips MUST always get a deterministic answer with no drift.
        if (isTrustedSource) {
            const inputSuperClean = superClean(rawInput);

            for (const item of COMBINED_DB) {
                if (item.primaryKeys && item.primaryKeys.some(pk => superClean(pk) === inputSuperClean))
                    return formatSuccessResponse(item);
            }
            for (const item of COMBINED_DB) {
                if (item.regex && item.regex.some(r => { try { return new RegExp(r, 'i').test(rawInput); } catch { return false; } }))
                    return formatSuccessResponse(item);
            }
            if (cleanInput.length > 1) {
                for (const item of COMBINED_DB) {
                    if (item.primaryKeys && item.primaryKeys.some(pk => strictClean(pk) === cleanInput))
                        return formatSuccessResponse(item);
                }
            }
            // Strict fuzzy — only very high confidence
            let bestItem = null, bestScore = 0;
            const rawTokens = rawLower.split(/\s+/).filter(t => t.length > 1);
            for (const item of COMBINED_DB) {
                let score = 0;
                const searchKeys = item.keys ? item.keys.map(k => k.toLowerCase().trim()).filter(k => k.length > 1) : [];
                for (const key of searchKeys) {
                    const keyClean = strictClean(key);
                    if (rawLower === key || cleanInput === keyClean) { score += 5000 + keyClean.length; }
                    else if (keyClean.length > 2 && cleanInput.includes(keyClean)) { score += 2000 + ((key.split(' ').length || 1) * 100) + keyClean.length; }
                    else {
                        const keyTokens = key.split(/\s+/); let sharedTokens = 0;
                        for (const token of rawTokens) { if (keyTokens.includes(token)) sharedTokens++; }
                        if (sharedTokens > 0) score += (sharedTokens * 200) + keyClean.length;
                    }
                }
                if (score > bestScore) { bestScore = score; bestItem = item; }
            }
            if (bestItem && bestScore >= 2000) return formatSuccessResponse(bestItem);

            // Forward to backend — chips are always design-related
            return { needsBackend: true, query: rawInput, isTrustedChip: true };
        }

        // ── CORRECTION intent ─────────────────────────────────────────────────
        const isCorrection = CORRECTION_PATTERNS_EN.test(rawInput) || CORRECTION_PATTERNS_KH.some(p => rawInput.includes(p));
        if (isCorrection && history.length >= 2) {
            return {
                answer: lang === 'en'
                    ? "Apologies — I misread your question. 🙏 Could you rephrase what you'd like to know? Or pick a topic:"
                    : "សុំទោស — ខ្ញុំយល់សំណួរខុសហើយ។ 🙏 សូមបងសរសេរម្តងទៀត ឬជ្រើសរើសប្រធានបទ៖",
                chips: pickFreshChips(3),
                needsBackend: false
            };
        }

        // ── UNCERTAIN intent ──────────────────────────────────────────────────
        const isUncertain = UNCERTAIN_PATTERNS_EN.test(rawInput) || UNCERTAIN_PATTERNS_KH.some(p => rawInput.includes(p));
        if (isUncertain) {
            const guidanceKH = "មិនអីទេ — តោះចាប់ផ្តើមមេរៀនដំបូង។ 🧭 ជ្រើសរើសផ្នែកដែលចង់រៀន៖\n\n1️⃣ **Affinity Designer** (Vector, Pen Tool, Layers)\n2️⃣ **Affinity Photo** (Retouching, Masking, Color)\n3️⃣ **Affinity Publisher** (Layout, Typography, Export)\n4️⃣ **Design Principles** (Color Theory, Hierarchy, Grid)\n\nបងជ្រើសរើសមួយណាដែលត្រូវការបំផុត?";
            const guidanceEN = "No worries — let's start from the beginning. 🧭 Pick the area you want to learn:\n\n1️⃣ **Affinity Designer** (Vector, Pen Tool, Layers)\n2️⃣ **Affinity Photo** (Retouching, Masking, Color)\n3️⃣ **Affinity Publisher** (Layout, Typography, Export)\n4️⃣ **Design Principles** (Color Theory, Hierarchy, Grid)\n\nWhich one do you need most?";
            return {
                answer: lang === 'en' ? guidanceEN : guidanceKH,
                chips: lang === 'en'
                    ? ["What is Affinity Designer?", "What is Affinity Photo?", "What is Affinity Publisher?"]
                    : ["Affinity Designer ជាអ្វី?", "Affinity Photo ជាអ្វី?", "Affinity Publisher ជាអ្វី?"],
                needsBackend: false
            };
        }

        // ── Repeat detection ──────────────────────────────────────────────────
        let repeatCount = 0;
        for (let i = history.length - 1; i >= 0; i--) {
            if (history[i].role === 'user') {
                if (strictClean(history[i].text) === cleanInput) repeatCount++;
                else break;
            }
        }
        if (repeatCount > 1) {
            const repeatData = lang === 'en' ? (REPEAT_RESPONSES_EN || {}) : (REPEAT_RESPONSES || {});
            return { answer: getRandomItems(repeatData?.level2 || ["Let's explore a new topic!"], 1)[0], chips: pickFreshChips(3), needsBackend: false };
        }

        const lastBotMessage = [...history].reverse().find(m => m.role === 'model');
        const lastBotText = (lastBotMessage?.text || '').trim();
        const lastBotEndsInQuestion = /[?？]\s*$/.test(lastBotText);

        // ── NO ────────────────────────────────────────────────────────────────
        const exactNo = ['nothanks', 'no', 'nope', 'nevermind', 'ទេ', 'អត់ទេ', 'ទេអរគុណ', 'អត់ទេអរគុណ', 'មិនបាច់ទេ', 'អត់ចង់ទេ'].map(strictClean);
        const isShortNoPrefix = wordCount <= 2 && (/^(no|nope|nah)$/i.test(cleanInput) || cleanInput === 'ទេ' || cleanInput === 'អត់' || cleanInput === 'អត់ទេ');
        if (exactNo.includes(cleanInput) || isShortNoPrefix) {
            if (history.length <= 1) {
                setCurrentTopic(null);
                return { answer: lang === 'en' ? "No problem! I'll be right here when you're ready to design. 🎨✨" : "បាទ មិនអីទេ! ខ្ញុំនឹងនៅទីនេះរង់ចាំជួយបង។ 🎨✨", chips: pickFreshChips(3), needsBackend: false };
            }
            return { needsBackend: true, backendPrompt: buildContextualBackendPrompt(rawInput, 'NO', lastBotText) };
        }

        // ── YES ───────────────────────────────────────────────────────────────
        const exactYes = ['yes', 'yep', 'sure', 'បាទ', 'ចាស', 'ចា', 'យល់ព្រម', 'មែន', 'ចង់', 'តោះ', 'បន្ត', 'ចង់ដឹង'].map(strictClean);
        const isShortYesPrefix = wordCount <= 2 && (/^(yes|yep|yeah|sure)$/i.test(cleanInput) || cleanInput === 'បាទ' || cleanInput === 'ចាស');
        if (exactYes.includes(cleanInput) || isShortYesPrefix) {
            if (history.length <= 1) {
                return { answer: lang === 'en' ? "Great! 🎨 What would you like to learn or create today?" : "ល្អណាស់! 🎨 តើថ្ងៃនេះបងចង់រៀន ឬរចនាអ្វីខ្លះ?", chips: pickFreshChips(3), needsBackend: false };
            }
            const choicesYes = parseMultiChoiceQuestion(lastBotText);
            if (choicesYes) {
                return {
                    answer: lang === 'en' ? "Got it! 👍 Which one would you like me to cover? Tap one below:" : "បាទបង! 👍 តើបងចង់ឱ្យខ្ញុំពន្យល់ផ្នែកណា? សូមចុចមួយខាងក្រោម៖",
                    chips: choicesYes, needsBackend: false
                };
            }
            if (lastBotEndsInQuestion) {
                return { needsBackend: true, backendPrompt: buildContextualBackendPrompt(rawInput, 'YES', lastBotText) };
            }
            // Yes to a non-question: try to continue current topic
            if (currentTopic) {
                const topicData = COMBINED_DB.find(item => [...(item.primaryKeys || []), ...(item.keys || [])].map(strictClean).includes(strictClean(currentTopic)));
                if (topicData) return formatSuccessResponse(topicData);
            }
        }

        // ── OK / Thanks ───────────────────────────────────────────────────────
        const exactOk = ['ok', 'okay', 'អូខេ', 'យល់ហើយ', 'gotit', 'isee', 'ចឹងតើ'].map(strictClean);
        const exactThanks = ['thanks', 'thankyou', 'អរគុណ', 'អគុណ', 'អរគុណច្រើន', 'អគុណច្រើន'].map(strictClean);
        const emojiRegex = /^(👋|🙏|❤️|👍|✌️|✨|😊|😁|📸|🎨|🔥)$/;

        if (emojiRegex.test(rawInput.trim())) return { answer: lang === 'en' ? `Hello there! ${rawInput.trim()} How can I help you today?` : `សួស្តី! ${rawInput.trim()} តើថ្ងៃនេះចង់ឱ្យខ្ញុំជួយអ្វីខ្លះ?`, chips: pickFreshChips(3), needsBackend: false };
        if (exactThanks.includes(cleanInput)) return { answer: lang === 'en' ? "You're very welcome! Let me know if you need more help. ✨" : "ដោយក្តីរីករាយបំផុត! 😊 បើមានចម្ងល់អ្វីកុំភ្លេចសួរណា!", chips: pickFreshChips(3), needsBackend: false };
        if (exactOk.includes(cleanInput)) {
            if (lastBotEndsInQuestion && history.length > 1) {
                const choicesOk = parseMultiChoiceQuestion(lastBotText);
                if (choicesOk) {
                    return { answer: lang === 'en' ? "Got it! 👍 Which one? Tap one below:" : "បាទ! 👍 តើផ្នែកណា? ចុចមួយខាងក្រោម៖", chips: choicesOk, needsBackend: false };
                }
                return { needsBackend: true, backendPrompt: buildContextualBackendPrompt(rawInput, 'YES (acknowledged via OK)', lastBotText) };
            }
            return { answer: lang === 'en' ? "Awesome! 🎨 Want to explore another design topic?" : "ល្អណាស់! 🎨 ចង់រៀនរឿងរចនាអ្វីបន្ទាប់ទៀតទេ?", chips: pickFreshChips(3), needsBackend: false };
        }

        // ── CONTINUATION intent ───────────────────────────────────────────────
        const isContinuation = CONTINUATION_PATTERNS_EN.test(rawInput) || CONTINUATION_PATTERNS_KH.some(p => rawInput.includes(p));
        if (isContinuation && wordCount <= 4 && history.length >= 2 && lastBotText) {
            return { needsBackend: true, backendPrompt: buildContextualBackendPrompt(rawInput, 'CONTINUATION', lastBotText) };
        }

        // ── HOW ARE YOU ───────────────────────────────────────────────────────
        const howAreYouWords = ['howareyou', 'howru', 'sup', 'សុខសប្បាយទេ', 'អ្នកសុខសប្បាយទេ', 'សុខទេ', 'ម៉េចហើយ'].map(strictClean);
        if (howAreYouWords.includes(cleanInput) || /\b(how are you|how r u)\b/i.test(rawInput)) {
            return { answer: lang === 'en' ? "I'm doing wonderfully! Ready to help you design. 🎨" : "បាទ ខ្ញុំសុខសប្បាយ! 😊 ត្រៀមខ្លួនជួយបងជានិច្ច។", chips: pickFreshChips(3), needsBackend: false };
        }

        // ── KB lookup (normal path) ───────────────────────────────────────────
        for (const item of COMBINED_DB) {
            if (item.primaryKeys && item.primaryKeys.some(pk => superClean(pk) === superClean(rawInput)))
                return formatSuccessResponse(item);
        }
        if (cleanInput.length > 1) {
            for (const item of COMBINED_DB) {
                if (item.regex && item.regex.some(r => { try { return new RegExp(r, 'i').test(rawInput); } catch { return false; } }))
                    return formatSuccessResponse(item);
                if (item.primaryKeys && item.primaryKeys.some(pk => strictClean(pk) === cleanInput))
                    return formatSuccessResponse(item);
            }
        }

        // Deep-include search
        const coreSubject = cleanInput;
        for (const item of COMBINED_DB) {
            const exactTriggers = [...(item.primaryKeys || []), ...(item.keys || [])].map(strictClean);
            const isDeepInclude = exactTriggers.some(trigger => trigger.length > 3 && (cleanInput.includes(trigger) || coreSubject.includes(trigger)));
            if (isDeepInclude) return formatSuccessResponse(item);
        }

        // ── Long sentence → backend ───────────────────────────────────────────
        if (wordCount > 6) return { needsBackend: true, query: rawInput };

        // ── Fuzzy scoring ─────────────────────────────────────────────────────
        let matches = [];
        const rawTokens = rawLower.split(/\s+/).filter(t => t.length > 1);
        if (cleanInput.length > 1 || rawTokens.length > 0) {
            for (const item of COMBINED_DB) {
                let score = 0;
                const searchKeys = item.keys ? item.keys.map(k => k.toLowerCase().trim()).filter(k => k.length > 1) : [];
                for (const key of searchKeys) {
                    const keyClean = strictClean(key);
                    if (rawLower === key || cleanInput === keyClean) { score += 5000 + keyClean.length; }
                    else if (keyClean.length > 2 && cleanInput.includes(keyClean)) { score += 2000 + ((key.split(' ').length || 1) * 100) + keyClean.length; }
                    else if (cleanInput.length > 2 && keyClean.includes(cleanInput)) { score += 1500 + cleanInput.length; }
                    else {
                        const keyTokens = key.split(/\s+/); let sharedTokens = 0;
                        for (const token of rawTokens) { if (keyTokens.includes(token)) sharedTokens++; }
                        if (sharedTokens > 0) score += (sharedTokens * 200) + keyClean.length;
                    }
                    if (item.primaryKeys?.some(pk => rawInput.includes(pk) || pk.includes(rawInput.trim()))) score = Math.max(score, 1000);
                }
                if (score > 0) matches.push({ item, score });
            }
        }

        if (matches.length > 0) {
            matches.sort((a, b) => b.score - a.score);
            if (matches[0].score >= 500) {
                return formatSuccessResponse(matches[0].item, { lowConfidence: matches[0].score < 1500 });
            }
            // Weak match — suggest
            if (matches[0].score >= 30) {
                const topicName = matches[0].item.primaryKeys ? matches[0].item.primaryKeys[0] : null;
                if (topicName) {
                    setCurrentTopic(topicName);
                    return {
                        answer: lang === 'en' ? `Not completely sure 🤔. Did you mean "**${topicName}**"?` : `ខ្ញុំមិនសូវប្រាកដទេ 🤔។ តើបងចង់សួរពី "**${topicName}**" មែនទេ?`,
                        chips: [lang === 'en' ? "Yes" : "បាទ", lang === 'en' ? "No thanks" : "ទេ អរគុណ", ...pickFreshChips(1)],
                        needsBackend: false
                    };
                }
            }
        }

        // ── FOLLOW_UP_MAP — "more" / "continue" ──────────────────────────────
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
                    return { answer: lang === 'en' ? "That covers the basics of this topic! 🎨 What would you like to learn next?" : "បាទ សម្រាប់ប្រធានបទនេះគឺអស់ហើយ! 🎨 តើបងចង់រៀនពីរឿងអ្វីបន្ទាប់?", chips: pickFreshChips(3), needsBackend: false };
                }
            }
        }

        // ── Boredom / casual fallback ─────────────────────────────────────────
        const boredomWords = ['អផ្សុក', 'មិនដឹងសួរអី', 'bored', 'play', 'លេង', 'សួរអីគេ'].map(strictClean);
        if (boredomWords.some(w => cleanInput.includes(w))) {
            return { answer: getRandomQuizInvitation(lang), chips: pickFreshChips(3), needsBackend: false };
        }

        return { needsBackend: true, query: rawInput };
    };

    // ─── Send handler ─────────────────────────────────────────────────────────
    const dismissKeyboard = () => {
        if (isKeyboardOpen && inputRef.current) { inputRef.current.blur(); setIsKeyboardOpen(false); }
    };

    // Only dismiss keyboard on taps on non-interactive areas
    const handleScrollAreaTap = (e) => {
        if (!isKeyboardOpen) return;
        const interactive = e.target.closest('button, a, input, textarea, [contenteditable="true"], [role="button"]');
        if (interactive) return;
        dismissKeyboard();
    };

    const handleSend = async (text = null, customHistory = null, source = 'user') => {
        if (loading) return;
        const msg = typeof text === 'string' ? text : input;
        if (!msg.trim()) return;

        const keepFocus = isKeyboardOpen && source === 'user';
        const rudeWords = ['ឆ្កួត', 'ចង្រៃ', 'មីចោរ', 'អាឆ្កែ', 'ចុយ', 'ថោកទាប', 'ឡប់', 'ភ្លើ', 'ល្ងង់', 'អាថោក', 'fuck', 'shit', 'bitch', 'stupid', 'asshole'].map(strictClean);
        const cleanMsg = strictClean(msg);
        if (rudeWords.some(word => cleanMsg.includes(word))) {
            setInput(''); if (inputRef.current) inputRef.current.textContent = '';
            setMessages(prev => [...prev, { role: 'model', text: lang === 'en' ? "Please use appropriate language! 🚫🙏" : "សូមមេត្តាប្រើប្រាស់ពាក្យសម្ដីសមរម្យ! 🚫🙏", chips: [], isTrainable: false }]);
            if (keepFocus) setTimeout(() => inputRef.current?.focus(), 50);
            return;
        }

        setInput('');
        if (inputRef.current) inputRef.current.textContent = '';
        if (source !== 'user') setIsKeyboardOpen(false);

        const currentHistory = customHistory || messages;
        setMessages([...currentHistory, { role: 'user', text: msg }]);
        setLoading(true);

        try {
            let responseData = findAIResponse(msg, currentHistory, source);
            const isTrustedChip = !!responseData.isTrustedChip;
            const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

            if (responseData.needsBackend) {
                const useCache = !responseData.backendPrompt;
                let cachedAnswer = null;
                let cachedChips = null;
                if (useCache) {
                    try {
                        const globalMemory = JSON.parse(localStorage.getItem('myDesign_ai_memory_cache') || '[]');
                        const foundMem = globalMemory.find(mem =>
                            mem.lang === lang &&
                            mem.q === cleanMsg &&
                            (!mem.ts || (Date.now() - mem.ts) < CACHE_TTL_MS)
                        );
                        if (foundMem) { cachedAnswer = foundMem.a; cachedChips = foundMem.chips || null; }
                    } catch { }
                }

                if (cachedAnswer) {
                    await new Promise(resolve => setTimeout(resolve, 300));
                    const cachedNextChips = cachedChips || (isTrustedChip ? getTopicRelatedChips(msg, 3) : pickFreshChips(3));
                    setMessages(prev => [...prev, { role: 'model', text: cachedAnswer, chips: cachedNextChips, isTrainable: true }]);
                } else {
                    const historyDiet = currentHistory.slice(-10);
                    const basePrompt = responseData.backendPrompt || msg;
                    const rawAiAnswer = await callRealAI(basePrompt, lang, historyDiet);
                    let aiBackendAnswer = rawAiAnswer;
                    let resolvedSource = 'backend';

                    const trimmed = (aiBackendAnswer || '').trim();
                    const isUnusable = trimmed.length < 3 || trimmed.includes('Connected, but response was empty');

                    if (aiBackendAnswer.includes('*(Debug Error)*') || isUnusable) {
                        const fallbackList = lang === 'en' ? (API_FALLBACK_RESPONSES_EN || []) : (API_FALLBACK_RESPONSES || []);
                        aiBackendAnswer = getRandomItems(fallbackList, 1)[0] || (lang === 'en' ? "I am currently offline. Try again shortly!" : "សុំទោស ខ្ញុំកំពុងគ្មានអ៊ីនធឺណិត។ សាកម្តងទៀត!");
                        resolvedSource = 'fallback';
                    }

                    const nextChips = resolvedSource === 'fallback'
                        ? (lang === 'en' ? OFFLINE_FALLBACK_CHIPS_EN : OFFLINE_FALLBACK_CHIPS_KH)
                        : isTrustedChip ? getTopicRelatedChips(msg, 3) : pickFreshChips(3);

                    if (useCache && resolvedSource === 'backend') {
                        try {
                            const globalMemory = JSON.parse(localStorage.getItem('myDesign_ai_memory_cache') || '[]');
                            const fresh = globalMemory.filter(mem => !mem.ts || (Date.now() - mem.ts) < CACHE_TTL_MS);
                            fresh.push({ q: cleanMsg, a: aiBackendAnswer, chips: nextChips, lang, ts: Date.now() });
                            while (fresh.length > 50) fresh.shift();
                            localStorage.setItem('myDesign_ai_memory_cache', JSON.stringify(fresh));
                        } catch { }
                        runSecretBackgroundTraining(cleanMsg, aiBackendAnswer);
                    }

                    setMessages(prev => [...prev, { role: 'model', text: aiBackendAnswer, chips: nextChips, isTrainable: resolvedSource === 'backend' }]);
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
        } catch {
            const fallbackList = lang === 'en' ? (API_FALLBACK_RESPONSES_EN || []) : (API_FALLBACK_RESPONSES || []);
            const randomFallback = getRandomItems(fallbackList, 1)[0] || "Connection issue. Try again.";
            const offlineChips = lang === 'en' ? OFFLINE_FALLBACK_CHIPS_EN : OFFLINE_FALLBACK_CHIPS_KH;
            setMessages(prev => [...prev, { role: 'model', text: randomFallback, chips: offlineChips, isTrainable: false }]);
        } finally {
            setLoading(false);
            if (keepFocus) setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 50);
        }
    };

    // ─── Scroll management ────────────────────────────────────────────────────
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const scrollToBottom = (behavior) => {
            isAutoScrolling.current = true;
            if (behavior === 'auto') { container.scrollTop = container.scrollHeight; }
            else { if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: "end" }); }
            setTimeout(() => { isAutoScrolling.current = false; if (container) lastScrollY.current = container.scrollTop; }, 350);
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
            const currentScrollY = scrollContainerRef.current.scrollTop;
            if (currentScrollY <= 0) {
                setShowHeader(prev => { if (!prev) window.dispatchEvent(new CustomEvent('aiScrolling', { detail: false })); return true; });
                lastScrollY.current = 0; return;
            }
            if (currentScrollY > lastScrollY.current + 12 && currentScrollY > 60) {
                setShowHeader(prev => { if (prev) window.dispatchEvent(new CustomEvent('aiScrolling', { detail: true })); return false; });
            } else if (currentScrollY < lastScrollY.current - 12) {
                setShowHeader(prev => { if (!prev) window.dispatchEvent(new CustomEvent('aiScrolling', { detail: false })); return true; });
            }
            lastScrollY.current = currentScrollY;
        };
        const container = scrollContainerRef.current;
        if (container) container.addEventListener('scroll', handleScroll, { passive: true });
        return () => { if (container) container.removeEventListener('scroll', handleScroll); };
    }, []);

    useEffect(() => {
        return () => { window.dispatchEvent(new CustomEvent('aiScrolling', { detail: false })); };
    }, []);

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
        let blurTimer;
        const handleFocusIn = (e) => {
            const tag = e.target.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) {
                clearTimeout(blurTimer); setIsKeyboardOpen(true); setShowHeader(true);
                window.dispatchEvent(new CustomEvent('aiScrolling', { detail: false }));
                setTimeout(() => { if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, 300);
            }
        };
        const handleFocusOut = () => { blurTimer = setTimeout(() => { setIsKeyboardOpen(false); }, 100); };
        document.addEventListener('focusin', handleFocusIn);
        document.addEventListener('focusout', handleFocusOut);
        return () => { document.removeEventListener('focusin', handleFocusIn); document.removeEventListener('focusout', handleFocusOut); clearTimeout(blurTimer); };
    }, []);

    // ─── Theme ────────────────────────────────────────────────────────────────
    const theme = {
        bg: isDarkMode ? 'bg-[#121212]' : 'bg-[#FAFAFA]',
        textMain: isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]',
        textSub: isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]',
        userBubble: isDarkMode ? 'bg-gradient-to-r from-[#41B6E6] to-[#0277C5] text-[#FFFFFF]' : 'bg-gradient-to-r from-[#0277C5] to-[#01579B] text-[#FFFFFF]',
        botBubble: isDarkMode ? 'bg-[#242526] text-[#F1F1F1] border border-[#3E4042]' : 'bg-[#FFFFFF] text-[#1A1A1A] border border-[#E5E7EB]',
        inputBg: isDarkMode ? 'bg-[#242526] border border-[#3E4042]' : 'bg-[#FFFFFF] border border-[#CED0D4]',
        inputColor: isDarkMode ? 'text-[#F1F1F1] placeholder-[#A0A0A0]' : 'text-[#1A1A1A] placeholder-[#6B7280]',
        iconColor: 'text-[#0277C5]',
    };

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <div className={`fixed inset-0 overflow-hidden font-sans transition-colors z-[40] ${theme.bg}`} style={{ height: viewportHeight, touchAction: 'none' }}>

            {/* HEADER */}
            <div
                className={`absolute top-0 left-0 w-full z-[60] transition-all duration-700 ease-out backdrop-blur-xl shadow-sm ${isDarkMode ? 'bg-[#121212]/85 border-b border-white/5 shadow-black/20' : 'bg-[#FFFFFF]/85 border-b border-black/5 shadow-[#0277C5]/5'} ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
                style={{ paddingTop: 'calc(env(safe-area-inset-top) + 50px)', marginTop: '-46px' }}
            >
                <div className="flex items-center justify-between px-4 pt-1.5 pb-2.5">
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${isDarkMode ? 'from-[#41B6E6] to-[#0277C5]' : 'from-[#0277C5] to-[#01579B]'} flex items-center justify-center shadow-inner`}>
                            <BotAvatar size={20} className="text-white drop-shadow-sm" ariaLabel="Affinity iPad AI" />
                        </div>
                        <div className="flex flex-col justify-center pt-0.5">
                            <h2 className={`text-[15px] font-black font-khmer leading-normal flex items-center gap-1 ${theme.textMain}`}>
                                {t('ai_name') || 'Affinity iPad AI'} {isAdmin && <Unlock size={12} className={theme.iconColor} />}
                            </h2>
                            <div className="relative flex items-center -mt-0.5">
                                <span key={headerStatusText} className="text-[10px] font-bold uppercase tracking-widest text-green-500 animate-fade-in-up whitespace-nowrap flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> {headerStatusText}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleClearChat}
                        className={`p-2 rounded-xl transition-all duration-300 ease-out active:scale-90 border ${isDarkMode ? 'bg-[#1E1E1E]/50 border-[#2C2C2C] text-[#A0A0A0] hover:text-[#FF453A] hover:bg-[#FF453A]/10' : 'bg-[#F8F9FA]/80 border-[#E5E7EB] text-[#6B7280] hover:text-[#FF453A] hover:bg-[#FF453A]/10'}`}
                        title={t('clear_tooltip')}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* SCROLL CONTAINER */}
            <div
                ref={scrollContainerRef}
                className="absolute inset-0 overflow-y-auto overflow-x-hidden overscroll-none no-scrollbar"
                style={{
                    paddingTop: `calc(64px + env(safe-area-inset-top))`,
                    paddingBottom: isKeyboardOpen ? '80px' : (!showHeader ? `calc(85px + env(safe-area-inset-bottom))` : `calc(135px + env(safe-area-inset-bottom))`),
                    touchAction: 'pan-y'
                }}
                id="messenger-scroll-container"
                onClick={handleScrollAreaTap}
            >
                <div className="max-w-4xl mx-auto w-full p-3 sm:p-4 space-y-4">
                    {messages.map((m, i) => {
                        const isUser = m.role === 'user';
                        return (
                            <div key={i} className={`flex flex-col w-full ${isUser ? 'items-end' : 'items-start'} animate-fade-in-up mb-2 group`}>
                                <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} items-end relative`}>
                                    {!isUser && (
                                        <div className={`w-7 h-7 rounded-[10px] bg-gradient-to-tr ${isDarkMode ? 'from-[#41B6E6] to-[#0277C5]' : 'from-[#0277C5] to-[#01579B]'} flex items-center justify-center mr-2 shrink-0 mb-1 shadow-sm`}>
                                            <BotAvatar size={16} />
                                        </div>
                                    )}

                                    <div className="max-w-[85%] sm:max-w-[75%] flex flex-col">
                                        {isUser && editingIndex === i ? (
                                            <div className={`w-full flex flex-col gap-2 p-3 rounded-[20px] border shadow-sm ${theme.inputBg}`}>
                                                <textarea value={editText} onChange={(e) => setEditText(e.target.value)} className={`w-full resize-none outline-none bg-transparent text-[14.5px] font-khmer no-scrollbar ${theme.textMain}`} rows={3} autoFocus />
                                                <div className="flex justify-end gap-2 mt-1">
                                                    <button onClick={cancelEdit} className={`px-3 py-1.5 rounded-full text-[12px] font-bold transition-all ${isDarkMode ? 'bg-[#3A3B3C] text-[#E4E6EB] hover:bg-[#4E4F50]' : 'bg-[#F0F2F5] text-[#6B7280] hover:bg-[#E4E6EB]'}`}>Cancel</button>
                                                    <button onClick={() => submitEdit(i)} className="px-3 py-1.5 rounded-full bg-[#0277C5] text-white text-[12px] font-bold hover:opacity-90 transition-all">Update</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                {m.text && (
                                                    <div className={`px-3.5 py-2.5 sm:px-4 sm:py-3 text-[14.5px] sm:text-[15px] leading-relaxed break-words [word-break:break-word] overflow-hidden shadow-sm font-khmer ${isUser ? `${theme.userBubble} rounded-[20px] rounded-br-[4px]` : `${theme.botBubble} rounded-[20px] rounded-bl-[4px]`}`}>
                                                        {typeof m.text === 'object' ? JSON.stringify(m.text) : formatMessage(m.text)}
                                                    </div>
                                                )}

                                                {/* Color palette */}
                                                {!isUser && m.uiElement === 'color_palette' && m.colors && (
                                                    <div className="flex gap-2 mt-4 mb-1">
                                                        {m.colors.map(colorHex => (
                                                            <div key={colorHex} className="flex flex-col items-center gap-1 group/color">
                                                                <div className="w-12 h-12 rounded-xl shadow-md border-2 border-black/10 transform transition-transform group-hover/color:scale-110" style={{ backgroundColor: colorHex }}></div>
                                                                <span className="text-[9px] font-mono font-bold opacity-70">{colorHex}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Action button */}
                                                {!isUser && m.actionButton && (
                                                    <button
                                                        onClick={() => {
                                                            triggerHaptic();
                                                            if (m.actionButton.subTab) localStorage.setItem('myDesign_target_subtab', m.actionButton.subTab);
                                                            window.dispatchEvent(new CustomEvent('switchTab', { detail: m.actionButton.actionToTrigger }));
                                                            if (m.actionButton.subTab) setTimeout(() => window.dispatchEvent(new CustomEvent('switchToolSubTab', { detail: m.actionButton.subTab })), 100);
                                                        }}
                                                        className="mt-4 px-4 py-2.5 bg-[#0277C5] text-white font-khmer font-bold text-sm rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-lg w-full"
                                                    >
                                                        {lang === 'en' ? m.actionButton.label_en : m.actionButton.label} <ArrowRight size={16} />
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* User message actions */}
                                {isUser && !loading && editingIndex !== i && (
                                    <div className={`flex items-center justify-end gap-2 mt-1.5 mr-1 transition-opacity w-full ${isTouchDevice ? 'opacity-70' : 'opacity-40 group-hover:opacity-100'}`}>
                                        <button onClick={() => handleCopy(m.text, i)} className={`p-1 rounded-md transition-colors ${isDarkMode ? 'text-[#B0B3B8] hover:text-[#41B6E6]' : 'text-[#6B7280] hover:text-[#0277C5]'}`} title="Copy message" aria-label="Copy message">
                                            {copiedIndex === i ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
                                        </button>
                                        <button onClick={() => handleEditClick(i, m.text)} className={`p-1 rounded-md transition-colors ${isDarkMode ? 'text-[#B0B3B8] hover:text-[#41B6E6]' : 'text-[#6B7280] hover:text-[#0277C5]'}`} title="Edit message" aria-label="Edit message">
                                            <Edit2 size={14} />
                                        </button>
                                    </div>
                                )}

                                {/* Chips */}
                                {!isUser && m.chips && m.chips.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2 ml-9">
                                        {m.chips.map((chip, idx) => (
                                            <button
                                                key={idx}
                                                onClick={(e) => {
                                                    e.preventDefault(); e.stopPropagation();
                                                    if (loading) return;
                                                    triggerHaptic();
                                                    if (RETRY_CHIP_LABELS.includes(chip)) {
                                                        const lastUser = [...messages].reverse().find(mm => mm.role === 'user');
                                                        if (lastUser) handleSend(lastUser.text, null, 'chip');
                                                        return;
                                                    }
                                                    handleSend(chip, null, 'chip');
                                                }}
                                                className={`px-3.5 py-1.5 text-[12px] font-khmer rounded-full border transition-all active:scale-95 ${isDarkMode ? 'bg-[#242526] border-[#41B6E6]/30 text-[#41B6E6] hover:bg-[#3A3B3C]' : 'bg-[#FFFFFF] border-[#0277C5]/30 text-[#0277C5] hover:bg-[#F0F2F5]'}`}
                                            >
                                                {chip}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Bot message actions */}
                                {!isUser && i > 0 && !m.feedback && (
                                    <div className={`flex gap-2 mt-1.5 ml-9 transition-opacity items-center ${isTouchDevice ? 'opacity-70' : 'opacity-40 group-hover:opacity-100'}`}>
                                        <button onClick={() => handleCopy(m.text, i)} className={`p-1 rounded-md transition-colors ${isDarkMode ? 'text-[#B0B3B8] hover:text-[#41B6E6]' : 'text-[#6B7280] hover:text-[#0277C5]'}`} title="Copy text" aria-label="Copy text">
                                            {copiedIndex === i ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
                                        </button>
                                        <button onClick={() => handleFeedback(i, 'up')} className={`p-1 rounded-md transition-colors ${isDarkMode ? 'text-[#B0B3B8] hover:text-green-500' : 'text-[#6B7280] hover:text-green-500'}`} aria-label="Mark as helpful"><ThumbsUp size={14} /></button>
                                        <button onClick={() => handleFeedback(i, 'down')} className={`p-1 rounded-md transition-colors ${isDarkMode ? 'text-[#B0B3B8] hover:text-red-500' : 'text-[#6B7280] hover:text-red-500'}`} aria-label="Mark as unhelpful"><ThumbsDown size={14} /></button>
                                        {isAdmin && m.isTrainable && !m.isTraining && (
                                            <button onClick={() => handleAutoTrain(i)} className={`p-1 rounded-md transition-colors ml-2 flex items-center gap-1 text-xs font-bold font-khmer ${isDarkMode ? 'text-[#B0B3B8] hover:text-[#41B6E6]' : 'text-[#6B7280] hover:text-[#0277C5]'}`} title="Auto-Train AI">
                                                <Brain size={14} /> <span>Train</span>
                                            </button>
                                        )}
                                        {m.isTraining && (
                                            <div className="ml-2 flex items-center gap-1 text-[#41B6E6] animate-pulse">
                                                <Loader2 size={12} className="animate-spin" /> <span className="text-[10px] font-bold">Training...</span>
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
                            <div className={`w-7 h-7 rounded-[10px] bg-gradient-to-tr ${isDarkMode ? 'from-[#41B6E6] to-[#0277C5]' : 'from-[#0277C5] to-[#01579B]'} flex items-center justify-center mr-2 shrink-0 mb-1 shadow-sm`}>
                                <BotAvatar size={16} />
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

            {/* BOTTOM INPUT AREA */}
            <div className="absolute bottom-0 left-0 right-0 z-[50] pointer-events-none flex flex-col justify-end transform-gpu" style={{ transform: 'translateZ(0)' }}>
                <div className={`absolute inset-0 ${theme.bg}`} style={{ maskImage: 'linear-gradient(to top, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)' }}></div>

                <div className={`relative w-full pointer-events-auto transition-all duration-300 pt-2 ${isKeyboardOpen ? 'pb-3' : (!showHeader ? 'pb-[calc(20px+env(safe-area-inset-bottom))] md:pb-6' : 'pb-[calc(70px+env(safe-area-inset-bottom))] md:pb-6')}`}>

                    {/* FLOATING SUGGESTIONS */}
                    <div
                        className={`relative w-full overflow-hidden transition-all duration-300 ${input.trim().length > 0 || loading ? 'opacity-0 h-0 mb-0 pointer-events-none' : 'opacity-100 h-[38px] mb-2.5'}`}
                        style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)', maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)' }}
                    >
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
                                        className={`shrink-0 px-3.5 py-1.5 text-[12px] font-medium font-khmer rounded-full whitespace-nowrap active:scale-95 transition-all shadow-sm backdrop-blur-md border ${isDarkMode ? 'bg-[#242526]/80 border-[#41B6E6]/40 text-[#41B6E6] hover:bg-[#3A3B3C]' : 'bg-[#FFFFFF]/90 border-[#0277C5]/40 text-[#0277C5] hover:bg-[#F0F2F5]'}`}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* INPUT FIELD */}
                    <div className="w-[92%] max-w-[380px] md:w-full md:max-w-4xl mx-auto md:px-4 flex items-end pb-1 relative">
                        <div className={`flex-1 relative flex items-center w-full shadow-sm rounded-[24px] overflow-hidden border backdrop-blur-lg ${isDarkMode ? 'bg-[#242526]/80 border-[#3E4042]' : 'bg-[#FFFFFF]/90 border-[#CED0D4]'}`}>
                            {!input && <div className={`absolute left-4 top-[10px] pointer-events-none text-[14.5px] font-khmer opacity-50 ${isDarkMode ? 'text-white' : 'text-black'}`}>{t('placeholder')}</div>}
                            <div
                                ref={inputRef}
                                contentEditable="true"
                                onInput={handleInputInput}
                                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (input.trim() && !loading) { triggerHaptic(); handleSend(input); } } }}
                                className={`w-full min-h-[40px] max-h-[100px] overflow-y-auto no-scrollbar pl-4 pr-10 pt-2.5 pb-2.5 text-[14.5px] leading-snug font-khmer outline-none transition-all whitespace-pre-wrap break-words ${theme.inputColor} ${loading && input.trim() === '' ? 'opacity-50' : ''}`}
                                suppressHydrationWarning
                            />
                            <button
                                type="button"
                                disabled={!input.trim() || loading}
                                onPointerDown={(e) => e.preventDefault()}
                                onClick={(e) => { e.stopPropagation(); if (!loading && input.trim()) { triggerHaptic(); handleSend(input); } }}
                                className={`absolute right-1 bottom-1 p-1.5 rounded-full transition-transform active:scale-90 ${input.trim() && !loading ? theme.iconColor : 'opacity-30'}`}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONFIRM CLEAR MODAL */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-5 backdrop-blur-md bg-black/60 animate-fade-in-up">
                    <div className={`w-full max-w-[320px] p-6 rounded-[32px] shadow-2xl border text-center transition-all ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-5"><Trash2 size={28} className="text-red-500" /></div>
                        <h2 className={`text-[16px] font-bold font-khmer mb-8 leading-relaxed ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{t('clear_confirm')}</h2>
                        <div className="flex flex-col gap-3">
                            <button type="button" onClick={confirmClear} className="w-full py-3.5 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-khmer font-bold text-[15px] active:scale-95 transition-all shadow-lg shadow-red-500/20">
                                {lang === 'en' ? 'Clear Everything' : 'លុបចេញទាំងអស់'}
                            </button>
                            <button type="button" onClick={() => setShowConfirmModal(false)} className={`w-full py-3.5 rounded-2xl font-khmer font-bold text-[15px] active:scale-95 transition-all border ${isDarkMode ? 'bg-[#2C2C2C] border-[#3E4042] text-[#A0A0A0] hover:text-[#F1F1F1]' : 'bg-[#F8F9FA] border-[#CED0D4] text-[#6B7280] hover:text-[#1A1A1A]'}`}>
                                {lang === 'en' ? 'Cancel' : 'បោះបង់'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
