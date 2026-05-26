/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import {
    Trophy, Flame, CheckCircle2, XCircle, Play, Star, Award,
    Lock, ChevronRight, User, Timer, Camera, PenTool, Book,
    ShieldCheck, X, RotateCcw,
} from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { initialQuestionBank } from '../../../data/data';
import CertificateForm from './CertificateForm';

// ─── Module-level utilities ───────────────────────────────────────────────────

const triggerHaptic = (type = 'light') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        if (type === 'error')   navigator.vibrate([50, 50, 50]);
        else if (type === 'success') navigator.vibrate([30, 50, 30]);
        else navigator.vibrate(10);
    }
};

const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const getTimeLimit = (level) => {
    if (level === 'beginner')    return 30;
    if (level === 'intermediate') return 20;
    return 15;
};

const formatTime = (s) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

const appDisplayName = (tab) =>
    tab === 'photo' ? 'Affinity Photo'
    : tab === 'designer' ? 'Affinity Designer'
    : 'Affinity Publisher';

const safeParse = (key) => {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
};

// ─── Animated score ring (result screen) ─────────────────────────────────────

const ScoreRing = ({ pct, ringColor, dk }) => {
    const r = 64;
    const circ = 2 * Math.PI * r;
    const [offset, setOffset] = React.useState(circ);
    React.useEffect(() => {
        const id = setTimeout(() => setOffset(circ * (1 - pct / 100)), 120);
        return () => clearTimeout(id);
    }, [pct]);
    return (
        <div className="relative w-36 h-36 mx-auto mb-7">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 144 144">
                <circle cx="72" cy="72" r={r} strokeWidth="12" fill="none" stroke={dk ? '#2C2C2C' : '#F0F2F5'} />
                <circle cx="72" cy="72" r={r} strokeWidth="12" fill="none" stroke={ringColor}
                    strokeDasharray={circ.toFixed(2)}
                    strokeDashoffset={offset.toFixed(2)}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1.4s ease-in-out' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl sm:text-5xl font-black tabular-nums">{pct}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest mt-0.5 ${dk ? 'text-[#4B5563]' : 'text-[#D1D5DB]'}`}>%</span>
            </div>
        </div>
    );
};

// ─── Circular countdown ring (per-question timer) ─────────────────────────────

const TimerRing = ({ timeLeft, totalTime, isDark }) => {
    const r = 17;
    const circ = +(2 * Math.PI * r).toFixed(3);
    const offset = +(circ * Math.max(0, 1 - timeLeft / totalTime)).toFixed(3);
    const low = timeLeft <= 5;
    const clr = low ? '#ef4444' : isDark ? '#41B6E6' : '#0277C5';
    const track = isDark ? '#3A3B3C' : '#E5E7EB';
    return (
        <div className="relative w-[46px] h-[46px] flex items-center justify-center shrink-0">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 46 46" width="46" height="46">
                <circle cx="23" cy="23" r={r} fill="none" strokeWidth="3" stroke={track} />
                <circle cx="23" cy="23" r={r} fill="none" strokeWidth="3"
                    strokeDasharray={circ} strokeDashoffset={offset}
                    strokeLinecap="round" stroke={clr}
                    style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s ease' }}
                />
            </svg>
            <span className={`text-[11px] font-black tabular-nums leading-none ${low ? 'text-red-500 animate-pulse' : isDark ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}>
                {timeLeft}
            </span>
        </div>
    );
};

// ─── Default state ─────────────────────────────────────────────────────────────

const DEFAULT_LEVELS = { photo: ['beginner'], designer: ['beginner'], publisher: ['beginner'] };
const DEFAULT_STARS  = {
    photo:     { beginner: 0, intermediate: 0, advanced: 0 },
    designer:  { beginner: 0, intermediate: 0, advanced: 0 },
    publisher: { beginner: 0, intermediate: 0, advanced: 0 },
};
const DEFAULT_SCORES = { photo: 0, designer: 0, publisher: 0 };
const DEFAULT_CERTS  = { photo: null, designer: null, publisher: null };

const APP_TABS = [
    { id: 'photo',     labelEn: 'Photo',     labelKh: 'ហ្វូតូ',  Icon: Camera   },
    { id: 'designer',  labelEn: 'Designer',  labelKh: 'ឌីស៊ីញ', Icon: PenTool  },
    { id: 'publisher', labelEn: 'Publisher', labelKh: 'ផ្លីសឺ', Icon: Book     },
];

// ─── Component ────────────────────────────────────────────────────────────────

const Test = ({ isDarkMode, isAdmin }) => {
    const { lang } = useLanguage();
    const dk = isDarkMode;

    // Quiz state
    const [gameState,       setGameState]       = useState('menu');
    const [questions,       setQuestions]       = useState([]);
    const [currentQ,        setCurrentQ]        = useState(0);
    const [score,           setScore]           = useState(0);
    const [selected,        setSelected]        = useState(null);
    const [answered,        setAnswered]        = useState(false);
    const [quizConfig,      setQuizConfig]      = useState({ level: 'beginner', amount: 5 });
    const [activeTab,       setActiveTab]       = useState('photo');

    // User & progress
    const [userName,        setUserName]        = useState('');
    const [highScores,      setHighScores]      = useState(DEFAULT_SCORES);
    const [unlockedLevels,  setUnlockedLevels]  = useState(DEFAULT_LEVELS);
    const [levelStars,      setLevelStars]      = useState(DEFAULT_STARS);
    const [certsData,       setCertsData]       = useState(DEFAULT_CERTS);
    const [dataLoaded,      setDataLoaded]      = useState(false);
    const [activeCert,      setActiveCert]      = useState(null);

    // Timers
    const [globalTimer,     setGlobalTimer]     = useState(null);
    const [qTimer,          setQTimer]          = useState(null);

    // Round feedback
    const [userAnswers,     setUserAnswers]     = useState([]);
    const [streak,          setStreak]          = useState(0);
    const [maxStreak,       setMaxStreak]       = useState(0);
    const [shaking,         setShaking]         = useState(false);

    const nameRef = useRef(null);

    // Derived
    const unlocked   = unlockedLevels[activeTab] || ['beginner'];
    const stars      = levelStars[activeTab]     || DEFAULT_STARS.photo;
    const bestScore  = highScores[activeTab]     || 0;
    const cert       = certsData[activeTab]      || null;
    const allOpen    = isAdmin || (unlocked.includes('advanced') && stars.advanced >= 2);

    // ─── Persistence ──────────────────────────────────────────────────────────

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const n = localStorage.getItem('myAffinity_user_name');
        if (n) setUserName(n);
        const sc = safeParse('myAffinity_quiz_scores');   if (sc) setHighScores(sc);
        const ul = safeParse('myAffinity_quiz_unlocked'); if (ul) setUnlockedLevels(ul);
        const sl = safeParse('myAffinity_quiz_stars');    if (sl) setLevelStars(sl);
        const cd = safeParse('myAffinity_quiz_certs');    if (cd) setCertsData(cd);
        setDataLoaded(true);
    }, []);

    useEffect(() => {
        if (gameState === 'menu' && nameRef.current && userName && !nameRef.current.textContent)
            nameRef.current.textContent = userName;
    }, [gameState, activeTab, userName]);

    useEffect(() => {
        if (!dataLoaded) return;
        localStorage.setItem('myAffinity_quiz_unlocked', JSON.stringify(unlockedLevels));
        localStorage.setItem('myAffinity_quiz_stars',    JSON.stringify(levelStars));
        localStorage.setItem('myAffinity_quiz_scores',   JSON.stringify(highScores));
        localStorage.setItem('myAffinity_quiz_certs',    JSON.stringify(certsData));
        if (userName) localStorage.setItem('myAffinity_user_name', userName);
    }, [unlockedLevels, levelStars, highScores, certsData, userName, dataLoaded]);

    // ─── Timers ───────────────────────────────────────────────────────────────

    // Global timer — final exam countdown
    useEffect(() => {
        if (gameState !== 'playing' || quizConfig.level !== 'final' || globalTimer === null) return;
        if (globalTimer <= 0) { finishQuiz(score); return; }
        const id = setTimeout(() => setGlobalTimer(t => t - 1), 1000);
        return () => clearTimeout(id);
    }, [gameState, quizConfig.level, globalTimer, score]);

    // Per-question timer
    useEffect(() => {
        if (gameState !== 'playing' || quizConfig.level === 'final' || answered || qTimer === null) return;
        if (qTimer <= 0) {
            setAnswered(true);
            setStreak(0);
            setShaking(true);
            triggerHaptic('error');
            setTimeout(() => setShaking(false), 500);
            setUserAnswers(prev => [...prev, { qId: currentQ, selected: -1, isCorrect: false }]);
            setTimeout(() => {
                if (currentQ + 1 < questions.length) {
                    setCurrentQ(n => n + 1);
                    setAnswered(false);
                    setSelected(null);
                    setQTimer(getTimeLimit(quizConfig.level));
                } else {
                    finishQuiz(score);
                }
            }, 1100);
            return;
        }
        const id = setTimeout(() => setQTimer(t => t - 1), 1000);
        return () => clearTimeout(id);
    }, [gameState, quizConfig.level, answered, qTimer, currentQ, questions.length, score]);

    // ─── Game logic ───────────────────────────────────────────────────────────

    const startQuiz = (level) => {
        if (!isAdmin && !unlocked.includes(level) && level !== 'final') { triggerHaptic('error'); return; }
        triggerHaptic();

        if (level === 'final') {
            if (!userName.trim()) {
                if (isAdmin) { setUserName('Admin Tester'); }
                else { alert(lang === 'en' ? 'Please enter your name first!' : 'សូមបញ្ចូលឈ្មោះរបស់អ្នកជាមុនសិន!'); return; }
            }
            if (cert && !window.confirm(lang === 'en'
                ? 'You already have a certificate. Retaking will reset it. Continue?'
                : 'អ្នកមានវិញ្ញាបនបត្ររួចហើយ។ ការប្រឡងម្ដងទៀតនឹងលុបវា។ បន្ត?')) return;
            if (isAdmin) {
                const c = { name: userName || 'Admin Tester', score: 100, date: new Date().toISOString(), appCourse: appDisplayName(activeTab) };
                setCertsData(p => ({ ...p, [activeTab]: c }));
                setActiveCert(c); setGameState('certificate'); return;
            }
            setGlobalTimer(15 * 60);
        } else {
            setQTimer(getTimeLimit(level));
            setGlobalTimer(null);
        }

        let pool = initialQuestionBank.filter(q => q.app === activeTab);
        if (level !== 'final') pool = pool.filter(q => q.level === level);
        const amount = level === 'final' ? Math.min(40, pool.length) : Math.min(quizConfig.amount, pool.length);

        const built = shuffleArray(pool).slice(0, amount).map(q => {
            const opts = (lang === 'en' && q.options_en) ? q.options_en : q.options;
            const text = (lang === 'en' && q.question_en) ? q.question_en : q.question;
            const tagged   = opts.map((t, i) => ({ text: t, isCorrect: i === q.correct }));
            const shuffled = shuffleArray(tagged);
            return { ...q, question: text, options: shuffled.map(o => o.text), correct: shuffled.findIndex(o => o.isCorrect) };
        });

        setQuestions(built);
        setQuizConfig(p => ({ ...p, level }));
        setCurrentQ(0); setScore(0); setStreak(0); setMaxStreak(0);
        setAnswered(false); setSelected(null); setUserAnswers([]);
        setGameState('playing');
    };

    const handleAnswer = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        const q = questions[currentQ];
        const ok = idx === q.correct;
        const newScore = ok ? score + 1 : score;

        if (ok) {
            setScore(newScore);
            setStreak(s => { const n = s + 1; setMaxStreak(m => Math.max(m, n)); return n; });
            triggerHaptic('success');
        } else {
            setStreak(0);
            setShaking(true);
            triggerHaptic('error');
            setTimeout(() => setShaking(false), 500);
        }

        setUserAnswers(prev => [...prev, { qId: currentQ, selected: idx, isCorrect: ok }]);

        setTimeout(() => {
            if (currentQ + 1 < questions.length) {
                setSelected(null); setAnswered(false);
                setCurrentQ(n => n + 1);
                setQTimer(getTimeLimit(quizConfig.level));
            } else {
                finishQuiz(newScore);
            }
        }, 800);
    };

    const finishQuiz = (finalScore) => {
        const total = questions.length;
        const pct   = Math.round((finalScore / total) * 100);
        if (quizConfig.level === 'final') {
            if (pct >= 90 || isAdmin) {
                const displayScore = (isAdmin && pct < 90) ? 100 : pct;
                const c = { name: userName || 'Administrator', score: displayScore, date: new Date().toISOString(), appCourse: appDisplayName(activeTab) };
                setCertsData(p => ({ ...p, [activeTab]: c }));
                setActiveCert(c); setGameState('certificate');
            } else {
                setCertsData(p => ({ ...p, [activeTab]: null }));
                setGameState('result');
            }
        } else {
            const s = finalScore >= total * 0.8 ? 3 : finalScore >= total * 0.5 ? 2 : finalScore >= total * 0.3 ? 1 : 0;
            setLevelStars(prev => {
                const app = prev[activeTab] || {};
                return s > (app[quizConfig.level] || 0) ? { ...prev, [activeTab]: { ...app, [quizConfig.level]: s } } : prev;
            });
            if (s >= 1) {
                setUnlockedLevels(prev => {
                    const ls = prev[activeTab] || ['beginner'];
                    if (quizConfig.level === 'beginner'     && !ls.includes('intermediate')) return { ...prev, [activeTab]: [...ls, 'intermediate'] };
                    if (quizConfig.level === 'intermediate' && !ls.includes('advanced'))     return { ...prev, [activeTab]: [...ls, 'advanced'] };
                    return prev;
                });
            }
            setHighScores(prev => finalScore > (prev[activeTab] || 0) ? { ...prev, [activeTab]: finalScore } : prev);
            setGameState('result');
        }
    };

    // ─── Helpers ──────────────────────────────────────────────────────────────

    const lvlLabel = (lvl) => lang === 'en'
        ? (lvl.charAt(0).toUpperCase() + lvl.slice(1))
        : lvl === 'beginner' ? 'កម្រិតដំបូង' : lvl === 'intermediate' ? 'កម្រិតមធ្យម' : 'កម្រិតខ្ពស់';

    const StarRow = ({ count }) => (
        <div className="flex gap-0.5">
            {[1, 2, 3].map(i => (
                <Star key={i} size={10} className={i <= count ? 'fill-[#C5B002] text-[#C5B002]' : dk ? 'text-[#3A3B3C]' : 'text-[#E5E7EB]'} />
            ))}
        </div>
    );

    // ─── Render: Certificate ──────────────────────────────────────────────────

    if (gameState === 'certificate') {
        const c = activeCert || cert;
        if (!c) { setGameState('menu'); return null; }
        return (
            <div className="fixed inset-0 z-[99999] bg-[#0A0A0A] flex flex-col items-center justify-center p-0 sm:p-6 overflow-hidden">
                <CertificateForm certData={c} isDarkMode={isDarkMode}
                    onBack={() => { setActiveCert(null); setGameState('menu'); }} />
            </div>
        );
    }

    // ─── Render: Menu ─────────────────────────────────────────────────────────

    if (gameState === 'menu') {
        const LEVEL_DEFS = [
            { id: 'beginner',     hint: null },
            { id: 'intermediate', hint: lang === 'en' ? 'Get ★ on Beginner to unlock'     : 'ទទួល ★ នៅ Beginner ដើម្បីដោះសោ' },
            { id: 'advanced',     hint: lang === 'en' ? 'Get ★ on Intermediate to unlock' : 'ទទួល ★ នៅ Intermediate ដើម្បីដោះសោ' },
        ];

        return (
            <div className={`w-full flex flex-col relative z-10 pb-[150px] ${dk ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>

                {/* Page header */}
                <div className="pt-3 pb-2 px-4 flex flex-col items-center text-center">
                    <h1 className={`text-2xl sm:text-3xl font-black font-khmer mb-1 tracking-tight ${dk ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}>
                        {lang === 'en' ? 'Skill Test Pro' : 'តេស្តសមត្ថភាពវិជ្ជាជីវៈ'}
                    </h1>
                    <p className={`text-[12px] max-w-md font-medium font-khmer ${dk ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
                        {lang === 'en' ? 'Test your knowledge and get certified' : 'សាកល្បងចំណេះដឹង និងទទួលយកវិញ្ញាបនបត្រ'}
                    </p>
                </div>

                <div className="max-w-3xl mx-auto w-full px-3 sm:px-6 flex flex-col gap-4 pt-2">
                    <div className={`rounded-[2rem] border p-5 sm:p-8 shadow-sm ${dk ? 'bg-[#18191A] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>

                        {/* ── App tab switcher ── */}
                        <div className={`flex gap-2 mb-7 p-1.5 rounded-2xl ${dk ? 'bg-[#242526]' : 'bg-[#F0F2F5]'}`}>
                            {APP_TABS.map(({ id, labelEn, labelKh, Icon }) => {
                                const active  = activeTab === id;
                                const hasCert = !!certsData[id];
                                return (
                                    <button key={id} onClick={() => setActiveTab(id)}
                                        className={`relative flex-1 flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-xl font-black font-khmer text-[11px] sm:text-[12px] transition-all duration-200 active:scale-[0.97] select-none
                                            ${active
                                                ? dk ? 'bg-[#41B6E6] text-[#0A0A0A] shadow-md' : 'bg-[#0277C5] text-white shadow-md'
                                                : dk ? 'text-[#6B7280] hover:text-[#A0A0A0]'  : 'text-[#9CA3AF] hover:text-[#4B5563]'}`}>
                                        <div className="flex items-center gap-1.5">
                                            <Icon size={13} />
                                            <span>{lang === 'en' ? labelEn : labelKh}</span>
                                        </div>
                                        {hasCert && (
                                            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C5B002] rounded-full flex items-center justify-center shadow">
                                                <Award size={9} className="text-white" strokeWidth={2.5} />
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* ── Title row + question count ── */}
                        <div className="flex items-center justify-between mb-5 px-0.5">
                            <div>
                                <h2 className={`text-base sm:text-lg font-black font-khmer ${dk ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                                    {lang === 'en' ? 'Select Level' : 'ជ្រើសរើសកម្រិត'}
                                </h2>
                                <p className={`text-[10px] mt-1 font-black uppercase tracking-widest ${dk ? 'text-[#4B5563]' : 'text-[#D1D5DB]'}`}>
                                    {lang === 'en' ? 'Best:' : 'ល្អបំផុត:'}&nbsp;
                                    <span className={dk ? 'text-[#41B6E6]' : 'text-[#0277C5]'}>{bestScore}</span>
                                </p>
                            </div>
                            <div className={`flex flex-col items-end px-4 py-2.5 rounded-2xl border ${dk ? 'bg-[#242526] border-[#3E4042]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                <span className={`text-[9px] font-black uppercase tracking-widest mb-1.5 ${dk ? 'text-[#4B5563]' : 'text-[#D1D5DB]'}`}>
                                    {lang === 'en' ? 'Questions' : 'ចំនួន'}
                                </span>
                                <div className="flex gap-3">
                                    {[5, 10].map(n => (
                                        <button key={n} onClick={() => setQuizConfig(c => ({ ...c, amount: n }))}
                                            className={`text-[14px] font-black transition-all ${quizConfig.amount === n
                                                ? dk ? 'text-[#41B6E6] scale-110' : 'text-[#0277C5] scale-110'
                                                : dk ? 'text-[#4B5563] hover:text-[#A0A0A0]' : 'text-[#D1D5DB] hover:text-[#6B7280]'}`}>
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── Name input ── */}
                        <div className={`flex items-center gap-3 p-4 mb-5 rounded-2xl border transition-all group shadow-sm
                            ${dk ? 'bg-[#242526] border-[#3E4042] focus-within:border-[#41B6E6]/50 focus-within:bg-transparent'
                                 : 'bg-[#F8F9FA] border-[#E5E7EB] focus-within:border-[#0277C5]/40 focus-within:bg-white'}`}>
                            <User size={16} className={`shrink-0 opacity-40 group-focus-within:opacity-100 transition-opacity ${dk ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`} />
                            <div className="relative flex-1 flex items-center overflow-hidden">
                                {!userName && (
                                    <span className={`absolute left-0 pointer-events-none text-[14px] font-khmer ${dk ? 'text-[#4B5563]' : 'text-[#D1D5DB]'}`}>
                                        {lang === 'en' ? 'Enter your name…' : 'បញ្ចូលឈ្មោះ…'}
                                    </span>
                                )}
                                <div ref={nameRef} contentEditable suppressHydrationWarning spellCheck={false}
                                    onInput={e => setUserName(e.currentTarget.textContent)}
                                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }}
                                    className={`bg-transparent outline-none w-full font-khmer text-[15px] font-bold whitespace-nowrap overflow-hidden ${dk ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}
                                    style={{ WebkitUserModify: 'read-write-plaintext-only' }}
                                />
                            </div>
                        </div>

                        {/* ── Level buttons ── */}
                        <div className="grid gap-3 mb-5">
                            {LEVEL_DEFS.map(({ id, hint }) => {
                                const locked = !isAdmin && !unlocked.includes(id);
                                const s = stars[id] || 0;
                                return (
                                    <button key={id} onClick={() => startQuiz(id)} disabled={locked}
                                        className={`p-4 sm:p-5 rounded-[1.25rem] border flex items-center justify-between transition-all duration-200 active:scale-[0.98] select-none
                                            ${locked
                                                ? dk ? 'opacity-40 border-[#2C2C2C] bg-[#1E1F20] cursor-not-allowed'
                                                     : 'opacity-40 border-[#F0F2F5] bg-[#F8F9FA] cursor-not-allowed'
                                                : dk ? 'border-[#3E4042] bg-[#242526] hover:border-[#41B6E6]/40 hover:-translate-y-0.5'
                                                     : 'border-[#E5E7EB] bg-white hover:border-[#0277C5]/30 hover:-translate-y-0.5 shadow-sm'
                                            }`}>
                                        <div className="flex items-center gap-3.5">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                                                ${locked
                                                    ? dk ? 'bg-[#2C2C2C] text-[#4B5563]' : 'bg-[#F0F2F5] text-[#D1D5DB]'
                                                    : dk ? 'bg-[#41B6E6]/15 text-[#41B6E6]' : 'bg-[#0277C5]/10 text-[#0277C5]'}`}>
                                                {locked ? <Lock size={16} /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                                            </div>
                                            <div className="text-left">
                                                <span className={`font-khmer font-black text-[15px] block leading-none mb-1.5 ${dk ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                                                    {lvlLabel(id)}
                                                </span>
                                                {locked && hint
                                                    ? <span className={`text-[10px] font-medium ${dk ? 'text-[#4B5563]' : 'text-[#D1D5DB]'}`}>{hint}</span>
                                                    : <StarRow count={s} />
                                                }
                                            </div>
                                        </div>
                                        {!locked && <ChevronRight size={18} className={`opacity-40 ${dk ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`} />}
                                    </button>
                                );
                            })}
                        </div>

                        {/* ── Final exam + certs ── */}
                        <div className={`pt-5 border-t ${dk ? 'border-[#2C2C2C]' : 'border-[#F0F2F5]'} flex flex-col gap-3`}>
                            <button onClick={() => startQuiz('final')} disabled={!allOpen}
                                className={`p-4 sm:p-5 rounded-[1.25rem] border flex items-center justify-between transition-all duration-200 active:scale-[0.98] select-none
                                    ${allOpen
                                        ? 'border-[#C5B002]/50 bg-[#C5B002]/[0.07] hover:-translate-y-0.5 shadow-sm'
                                        : dk ? 'opacity-40 border-[#2C2C2C] bg-[#1E1F20] cursor-not-allowed'
                                             : 'opacity-40 border-[#F0F2F5] bg-[#F8F9FA] cursor-not-allowed'}`}>
                                <div className="flex items-center gap-3.5">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                                        ${allOpen ? 'bg-[#C5B002]/20 text-[#C5B002]'
                                                  : dk ? 'bg-[#2C2C2C] text-[#4B5563]' : 'bg-[#F0F2F5] text-[#D1D5DB]'}`}>
                                        {allOpen ? <Trophy size={18} /> : <Lock size={16} />}
                                    </div>
                                    <div className="text-left">
                                        <span className={`font-khmer font-black text-[15px] block leading-none mb-1 ${allOpen ? 'text-[#C5B002]' : dk ? 'text-[#4B5563]' : 'text-[#D1D5DB]'}`}>
                                            {cert
                                                ? lang === 'en' ? 'Retake Final Exam' : 'ប្រឡងម្ដងទៀត'
                                                : lang === 'en' ? 'Final Certification Exam' : 'តេស្តបញ្ចប់'}
                                            {isAdmin && <span className="ml-2 text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded-full">ADMIN</span>}
                                        </span>
                                        <span className={`text-[10px] font-medium ${dk ? 'text-[#4B5563]' : 'text-[#D1D5DB]'}`}>
                                            {allOpen
                                                ? lang === 'en' ? '40 Qs · 15 min · 90% to pass' : '៤០ · ១៥ នាទី · ជាប់ ៩០%'
                                                : lang === 'en' ? 'Need ★★ on Advanced to unlock' : 'ត្រូវការ ★★ Advanced ដើម្បីដោះសោ'}
                                        </span>
                                    </div>
                                </div>
                                {!allOpen && <Lock size={14} className={dk ? 'text-[#3A3B3C]' : 'text-[#E5E7EB]'} />}
                            </button>

                            {isAdmin && !cert && (
                                <button onClick={() => {
                                    triggerHaptic('success');
                                    const name = userName.trim() || 'Admin Tester';
                                    const c = { name, score: 100, date: new Date().toISOString(), appCourse: appDisplayName(activeTab) };
                                    setCertsData(p => ({ ...p, [activeTab]: c }));
                                    setActiveCert(c); setGameState('certificate');
                                }}
                                className={`p-4 rounded-[1.25rem] border flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:scale-[0.98]
                                    ${dk ? 'border-[#41B6E6]/30 bg-[#41B6E6]/[0.06] text-[#41B6E6]' : 'border-[#0277C5]/30 bg-[#0277C5]/[0.06] text-[#0277C5]'}`}>
                                    <ShieldCheck size={17} />
                                    <span className="font-black font-khmer text-[14px]">Admin: Generate Certificate</span>
                                </button>
                            )}

                            {cert && (
                                <button onClick={() => { setActiveCert(cert); setGameState('certificate'); }}
                                    className="p-4 rounded-[1.25rem] border border-[#C5B002]/40 bg-[#C5B002]/[0.07] flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:scale-[0.98]">
                                    <Award size={17} className="text-[#C5B002]" />
                                    <span className="font-black font-khmer text-[14px] text-[#C5B002]">
                                        {lang === 'en' ? 'View My Certificate' : 'មើលវិញ្ញាបនបត្រ'}
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ─── Render: Playing ──────────────────────────────────────────────────────

    const q = questions[currentQ];
    if (gameState === 'playing' && q) {
        const progPct  = (currentQ / questions.length) * 100;
        const isFinal  = quizConfig.level === 'final';
        const timeLimit = getTimeLimit(quizConfig.level);

        return (
            <div className={`w-full flex flex-col relative z-10 pb-[150px] ${dk ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                <div className="w-full max-w-3xl mx-auto pt-2 px-3 sm:px-6">
                    <div className={`w-full rounded-[2rem] border p-5 sm:p-8 shadow-sm flex flex-col gap-6 transition-colors ${dk ? 'bg-[#18191A]' : 'bg-white'}
                        ${shaking ? 'animate-shake border-red-500/40' : dk ? 'border-[#2C2C2C]' : 'border-[#E5E7EB]'}`}>

                        {/* ── Top bar ── */}
                        <div className="flex items-center gap-3 border-b pb-5 border-gray-500/10">
                            {/* Back */}
                            <button onClick={() => setGameState('menu')}
                                className={`p-1.5 rounded-full shrink-0 transition-colors active:scale-90 ${dk ? 'hover:bg-[#242526] text-[#6B7280]' : 'hover:bg-[#F0F2F5] text-[#9CA3AF]'}`}>
                                <X size={20} />
                            </button>

                            {/* Progress bar + Q counter */}
                            <div className="flex-1 min-w-0">
                                <div className={`h-2 w-full rounded-full overflow-hidden mb-1.5 ${dk ? 'bg-[#2C2C2C]' : 'bg-[#F0F2F5]'}`}>
                                    <div className="h-full bg-gradient-to-r from-[#41B6E6] to-[#0277C5] rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${progPct}%` }} />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className={`text-[10px] font-bold truncate ${dk ? 'text-[#4B5563]' : 'text-[#D1D5DB]'}`}>
                                        {isFinal ? appDisplayName(activeTab) : lvlLabel(quizConfig.level)}
                                    </span>
                                    <span className={`text-[10px] font-black tabular-nums shrink-0 ml-2 ${dk ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
                                        {currentQ + 1}&thinsp;/&thinsp;{questions.length}
                                    </span>
                                </div>
                            </div>

                            {/* Timer + streak */}
                            <div className="flex items-center gap-2 shrink-0">
                                {isFinal
                                    ? globalTimer !== null && (
                                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-black tabular-nums
                                            ${globalTimer <= 60
                                                ? 'bg-red-500/10 border-red-500/20 text-red-500 animate-pulse'
                                                : dk ? 'bg-[#41B6E6]/10 border-[#41B6E6]/20 text-[#41B6E6]'
                                                     : 'bg-[#0277C5]/10 border-[#0277C5]/20 text-[#0277C5]'}`}>
                                            <Timer size={13} />
                                            <span>{formatTime(globalTimer)}</span>
                                        </div>
                                    )
                                    : qTimer !== null && (
                                        <TimerRing timeLeft={qTimer} totalTime={timeLimit} isDark={dk} />
                                    )
                                }
                                {/* Streak */}
                                <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border ${dk ? 'bg-[#242526] border-[#3E4042]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                    <Flame size={14} className={streak > 0 ? 'text-orange-500 fill-orange-500' : dk ? 'text-[#3A3B3C]' : 'text-[#E5E7EB]'} />
                                    <span className={`text-[12px] font-black tabular-nums ${streak > 0 ? 'text-orange-500' : dk ? 'text-[#4B5563]' : 'text-[#D1D5DB]'}`}>{streak}</span>
                                </div>
                            </div>
                        </div>

                        {/* ── Question + options (re-animates per question) ── */}
                        <div key={currentQ} className="animate-fade-in-up flex flex-col gap-5">
                            <h2 className="text-[18px] sm:text-xl font-black font-khmer leading-snug sm:leading-relaxed">
                                {q.question}
                            </h2>
                            <div className="grid gap-3">
                                {q.options.map((opt, i) => {
                                    const isChoice  = selected === i;
                                    const isCorrect = q.correct === i;

                                    let card  = dk ? 'bg-[#242526] border-[#3E4042] text-[#E4E6EB]'
                                                   : 'bg-[#F8F9FA] border-[#E5E7EB] text-[#1A1C1E] shadow-sm';
                                    let badge = dk ? 'bg-[#3A3B3C] text-[#9CA3AF] border-[#4E4F50]'
                                                   : 'bg-white text-[#9CA3AF] border-[#E5E7EB]';

                                    if (!answered) {
                                        card += dk ? ' hover:border-[#41B6E6]/40 hover:bg-[#2E2F30]'
                                                   : ' hover:border-[#0277C5]/30 hover:bg-white';
                                    } else if (isCorrect) {
                                        card  = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 font-bold';
                                        badge = 'bg-emerald-500 text-white border-emerald-500';
                                    } else if (isChoice) {
                                        card  = 'bg-red-500/10 border-red-500/40 text-red-600 font-bold';
                                        badge = 'bg-red-500 text-white border-red-500';
                                    } else {
                                        card  = 'opacity-30 border-transparent bg-transparent shadow-none';
                                        badge = 'opacity-0';
                                    }

                                    return (
                                        <button key={i} disabled={answered} onClick={() => handleAnswer(i)}
                                            className={`animate-slide-in p-4 sm:p-5 text-left rounded-[1.25rem] border-2 flex items-center gap-4 font-khmer text-[15px] sm:text-[16px] font-bold transition-all duration-200 active:scale-[0.98] outline-none select-none ${card}`}
                                            style={{ animationDelay: `${i * 45}ms`, animationFillMode: 'both' }}>
                                            <span className={`w-9 h-9 min-w-[36px] flex items-center justify-center rounded-xl border text-[12px] font-black shrink-0 transition-all ${badge}`}>
                                                {String.fromCharCode(65 + i)}
                                            </span>
                                            <span className="flex-1 leading-snug">{opt}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ─── Render: Result ───────────────────────────────────────────────────────

    if (gameState === 'result') {
        const total  = questions.length;
        const pct    = Math.round((score / total) * 100);
        const isFinal = quizConfig.level === 'final';
        const ringColor = pct >= (isFinal ? 90 : 80) ? '#10b981' : pct >= 50 ? '#0277C5' : '#ef4444';

        return (
            <div className={`w-full flex flex-col relative z-10 pb-[150px] ${dk ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                <div className="w-full max-w-3xl mx-auto pt-4 px-3 sm:px-6 animate-fade-in-up">
                    <div className={`rounded-[2rem] border p-10 sm:p-14 text-center shadow-sm ${dk ? 'bg-[#18191A] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>

                        {/* Score ring */}
                        <ScoreRing pct={pct} ringColor={ringColor} dk={dk} />

                        {/* Message */}
                        <h2 className="text-2xl sm:text-3xl font-black font-khmer mb-2">
                            {pct >= (isFinal ? 90 : 80)
                                ? (lang === 'en' ? 'Excellent!' : 'អស្ចារ្យ!')
                                : (lang === 'en' ? 'Keep going!' : 'ព្យាយាមម្ដងទៀត!')}
                        </h2>
                        <p className={`font-khmer font-medium text-[15px] mb-5 ${dk ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>
                            {lang === 'en' ? `${score} / ${total} correct` : `ឆ្លើយត្រូវ ${score} / ${total}`}
                        </p>

                        {/* Best streak badge */}
                        {maxStreak >= 2 && (
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-2 text-[12px] font-black
                                ${dk ? 'bg-orange-500/10 border border-orange-500/20 text-orange-400' : 'bg-orange-50 border border-orange-200 text-orange-600'}`}>
                                <Flame size={13} className="fill-orange-500 text-orange-500" />
                                {lang === 'en' ? `Best streak: ${maxStreak}` : `ស្ទ្រេកល្អបំផុត: ${maxStreak}`}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col gap-3 max-w-[280px] mx-auto mt-8">
                            <button onClick={() => startQuiz(quizConfig.level)}
                                className={`w-full py-4 rounded-[1.25rem] font-black font-khmer text-[15px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg
                                    ${dk ? 'bg-[#41B6E6] text-[#0A0A0A] hover:bg-[#30A5D5] shadow-[#41B6E6]/20'
                                         : 'bg-[#0277C5] text-white hover:bg-[#0166A8] shadow-[#0277C5]/20'}`}>
                                <RotateCcw size={16} />
                                {lang === 'en' ? 'Play Again' : 'លេងម្ដងទៀត'}
                            </button>
                            <button onClick={() => setGameState('review')}
                                className={`w-full py-4 rounded-[1.25rem] font-black font-khmer text-[15px] border-2 active:scale-[0.98] transition-all
                                    ${dk ? 'border-[#3E4042] text-[#9CA3AF] hover:border-[#41B6E6]/40 hover:text-[#F1F1F1]'
                                         : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#0277C5]/40 hover:text-[#1A1A1A]'}`}>
                                {lang === 'en' ? 'Review Answers' : 'មើលចម្លើយ'}
                            </button>
                            <button onClick={() => setGameState('menu')}
                                className={`w-full py-3 font-bold font-khmer text-[14px] active:scale-[0.98] transition-all ${dk ? 'text-[#4B5563] hover:text-[#9CA3AF]' : 'text-[#D1D5DB] hover:text-[#9CA3AF]'}`}>
                                {lang === 'en' ? 'Back to Menu' : 'ត្រឡប់ Menu'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ─── Render: Review ───────────────────────────────────────────────────────

    return (
        <div className={`w-full flex flex-col relative z-10 pb-[150px] ${dk ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
            <div className="w-full max-w-3xl mx-auto pt-2 px-3 sm:px-6">
                <div className={`rounded-[2rem] border p-6 sm:p-10 shadow-sm ${dk ? 'bg-[#18191A] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                    <div className="flex items-center justify-between mb-6 pb-5 border-b border-gray-500/10">
                        <div>
                            <h2 className="text-xl font-black font-khmer">{lang === 'en' ? 'Review' : 'ការត្រួតពិនិត្យ'}</h2>
                            <p className={`text-[11px] font-bold uppercase tracking-widest mt-1 ${dk ? 'text-[#4B5563]' : 'text-[#D1D5DB]'}`}>
                                {score}&thinsp;/&thinsp;{questions.length}&nbsp;{lang === 'en' ? 'correct' : 'ត្រូវ'}
                            </p>
                        </div>
                        <button onClick={() => setGameState('result')}
                            className={`p-2.5 rounded-full transition-colors ${dk ? 'bg-[#242526] hover:bg-[#3A3B3C] text-[#9CA3AF]' : 'bg-[#F0F2F5] hover:bg-[#E5E7EB] text-[#6B7280]'}`}>
                            <X size={18} />
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        {userAnswers.map((ans, idx) => {
                            const qi = questions[ans.qId];
                            if (!qi) return null;
                            return (
                                <div key={idx} className={`p-5 rounded-[1.5rem] border ${dk ? 'bg-[#242526] border-[#3E4042]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                    <p className="font-black font-khmer text-[15px] mb-4 leading-relaxed">
                                        {idx + 1}.&nbsp;{qi.question}
                                    </p>
                                    <div className="grid gap-2">
                                        {qi.options.map((opt, i) => {
                                            const ok  = qi.correct === i;
                                            const sel = ans.selected === i;
                                            let s = dk ? 'text-[#6B7280] bg-transparent border-[#3E4042]' : 'text-[#9CA3AF] bg-white border-[#E5E7EB]';
                                            if (ok)  s = 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 font-bold';
                                            if (sel && !ok) s = 'bg-red-500/10 text-red-600 border-red-500/30 font-bold';
                                            return (
                                                <div key={i} className={`p-3.5 rounded-xl border flex items-center gap-3 text-[13px] font-khmer ${s}`}>
                                                    {ok  ? <CheckCircle2 size={16} className="shrink-0" />
                                                    : sel ? <XCircle      size={16} className="shrink-0" />
                                                    : <div className={`w-4 h-4 rounded-full border-2 shrink-0 ${dk ? 'border-[#4E4F50]' : 'border-[#E5E7EB]'}`} />}
                                                    <span className="leading-snug">{opt}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Test;
