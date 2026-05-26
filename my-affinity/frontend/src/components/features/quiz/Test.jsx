/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Flame, CheckCircle2, XCircle, Play, Star, Award, Lock, ChevronRight, User, Timer, Camera, PenTool, Book, ShieldCheck, X } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { initialQuestionBank } from '../../../data/data';
import CertificateForm from './CertificateForm';

// === UTILITY FUNCTIONS ===
const triggerHaptic = (type = 'light') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        if (type === 'error') navigator.vibrate([50, 50, 50]);
        else if (type === 'success') navigator.vibrate([30, 50, 30]);
        else navigator.vibrate(10);
    }
};

const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

// 🌟 Time Limit Rules per Level 🌟
const getTimeLimitForLevel = (level) => {
    switch(level) {
        case 'beginner': return 30;
        case 'intermediate': return 20;
        case 'advanced': return 15;
        case 'final': return 15;
        default: return 30;
    }
};

const defaultLevels = { photo: ['beginner'], designer: ['beginner'], publisher: ['beginner'] };
const defaultStars = { 
    photo: { beginner: 0, intermediate: 0, advanced: 0 }, 
    designer: { beginner: 0, intermediate: 0, advanced: 0 }, 
    publisher: { beginner: 0, intermediate: 0, advanced: 0 } 
};
const defaultScores = { photo: 0, designer: 0, publisher: 0 };
const defaultCerts = { photo: null, designer: null, publisher: null };

const Test = ({ isDarkMode, isAdmin }) => {
    // === STATE MANAGEMENT ===
    const { lang } = useLanguage(); 
    const [gameState, setGameState] = useState('menu');
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [quizConfig, setQuizConfig] = useState({ level: 'beginner', amount: 5 });
    
    const [activeAppTab, setActiveAppTab] = useState('photo');

    const [userName, setUserName] = useState('');
    const [highScores, setHighScores] = useState(defaultScores);
    const [unlockedLevels, setUnlockedLevels] = useState(defaultLevels);
    const [levelStars, setLevelStars] = useState(defaultStars);
    const [certsData, setCertsData] = useState(defaultCerts);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const [activeCertData, setActiveCertData] = useState(null);
    const nameInputRef = useRef(null);

    const [timeLeft, setTimeLeft] = useState(null);
    const [questionTimeLeft, setQuestionTimeLeft] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [streak, setStreak] = useState(0);
    const [isShaking, setIsShaking] = useState(false);

    const currentUnlocked = unlockedLevels[activeAppTab] || ['beginner'];
    const currentStars = levelStars[activeAppTab] || { beginner: 0, intermediate: 0, advanced: 0 };
    const currentHighScore = highScores[activeAppTab] || 0;
    const currentCert = certsData[activeAppTab] || null;

    // === EFFECTS ===
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedName = localStorage.getItem('myAffinity_user_name');
            if (savedName) setUserName(savedName);

            const savedScores = localStorage.getItem('myAffinity_quiz_scores');
            if (savedScores) setHighScores(JSON.parse(savedScores));

            const savedUnlocked = localStorage.getItem('myAffinity_quiz_unlocked');
            if (savedUnlocked) setUnlockedLevels(JSON.parse(savedUnlocked));

            const savedStars = localStorage.getItem('myAffinity_quiz_stars');
            if (savedStars) setLevelStars(JSON.parse(savedStars));

            const savedCerts = localStorage.getItem('myAffinity_quiz_certs');
            if (savedCerts) setCertsData(JSON.parse(savedCerts));

            setIsDataLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (gameState === 'menu' && nameInputRef.current && userName && !nameInputRef.current.textContent) {
            nameInputRef.current.textContent = userName;
        }
    }, [gameState, activeAppTab, userName]); 

    useEffect(() => {
        if (isDataLoaded) {
            localStorage.setItem('myAffinity_quiz_unlocked', JSON.stringify(unlockedLevels));
            localStorage.setItem('myAffinity_quiz_stars', JSON.stringify(levelStars));
            localStorage.setItem('myAffinity_quiz_scores', JSON.stringify(highScores));
            localStorage.setItem('myAffinity_quiz_certs', JSON.stringify(certsData));
            if (userName) localStorage.setItem('myAffinity_user_name', userName);
        }
    }, [unlockedLevels, levelStars, highScores, certsData, userName, isDataLoaded]);

    // 🌟 GLOBAL TIMER FOR FINAL EXAM
    useEffect(() => {
        if (gameState !== 'playing' || quizConfig.level !== 'final' || timeLeft === null) return;
        if (timeLeft <= 0) { finishQuiz(score); return; }
        const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timerId);
    }, [gameState, quizConfig.level, timeLeft, score]);

    // 🌟 PER-QUESTION TIMER FOR REGULAR LEVELS
    useEffect(() => {
        if (gameState !== 'playing' || quizConfig.level === 'final' || isAnswered || questionTimeLeft === null) return;
        
        if (questionTimeLeft <= 0) {
            setIsAnswered(true);
            setStreak(0);
            setIsShaking(true);
            triggerHaptic('error');
            setTimeout(() => setIsShaking(false), 500);
            setUserAnswers(prev => [...prev, { qId: currentQuestion, selected: -1, isCorrect: false }]);
            
            setTimeout(() => {
                if (currentQuestion + 1 < questions.length) { 
                    setCurrentQuestion(currentQuestion + 1); 
                    setIsAnswered(false); 
                    setSelectedOption(null); 
                    setQuestionTimeLeft(getTimeLimitForLevel(quizConfig.level));
                }
                else finishQuiz(score);
            }, 1500);
            return;
        }
        
        const timerId = setInterval(() => {
            setQuestionTimeLeft(prev => prev - 1);
        }, 1000);
        
        return () => clearInterval(timerId);
    }, [gameState, isAnswered, questionTimeLeft, currentQuestion, questions.length, score, quizConfig.level]);

    // === GAME LOGIC ===
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60); const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const startQuiz = (level) => { 
        if (level === 'final') {
            if (!userName.trim()) {
                if (isAdmin) {
                    setUserName("Admin Tester");
                } else {
                    alert(lang === 'en' ? "Please enter your name first!" : "សូមបញ្ចូលឈ្មោះរបស់អ្នកជាមុនសិន!"); 
                    return; 
                }
            }
            if (currentCert) {
                const confirmRetake = window.confirm(lang === 'en' ? "You already have a certificate. Retaking will reset your current certificate. Continue?" : "អ្នកមានវិញ្ញាបនបត្ររួចហើយ។ ការប្រឡងម្តងទៀតនឹងលុបវិញ្ញាបនបត្រចាស់។ បន្តឬទេ?");
                if (!confirmRetake) return;
            }
            
            if (isAdmin) {
                const appDisplayName = activeAppTab === 'photo' ? 'Affinity Photo' : activeAppTab === 'designer' ? 'Affinity Designer' : 'Affinity Publisher';
                const dummyCert = { name: userName || "Admin Tester", score: 100, date: new Date().toISOString(), appCourse: appDisplayName };
                setCertsData(prev => ({ ...prev, [activeAppTab]: dummyCert }));
                setActiveCertData(dummyCert);
                setGameState('certificate');
                return;
            }
            setTimeLeft(15 * 60);
        } else { 
            setQuestionTimeLeft(getTimeLimitForLevel(level));
            setTimeLeft(null); 
        }

        if (!isAdmin && !currentUnlocked.includes(level) && level !== 'final') { triggerHaptic('error'); return; }
        triggerHaptic();
        
        let filtered = initialQuestionBank.filter(q => q.app === activeAppTab);
        if (level !== 'final') {
             filtered = filtered.filter(q => q.level === level);
        }

        if (filtered.length < quizConfig.amount && level !== 'final') {
            const extra = initialQuestionBank.filter(q => q.app === activeAppTab && q.level !== level);
            filtered = [...filtered, ...extra];
        }

        const amount = level === 'final' ? 40 : Math.min(quizConfig.amount, filtered.length);
        let shuffledQuestions = shuffleArray(filtered).slice(0, amount);

        const finalQuestions = shuffledQuestions.map(q => {
            const currentOptions = lang === 'en' && q.options_en ? q.options_en : q.options;
            const currentQuestionText = lang === 'en' && q.question_en ? q.question_en : q.question;
            const optionsWithOriginalIndex = currentOptions.map((opt, index) => ({ text: opt, isCorrect: index === q.correct }));
            const shuffledOptions = shuffleArray(optionsWithOriginalIndex);
            const newCorrectIndex = shuffledOptions.findIndex(opt => opt.isCorrect);
            return { ...q, question: currentQuestionText, options: shuffledOptions.map(opt => opt.text), correct: newCorrectIndex };
        });

        setQuestions(finalQuestions); 
        setQuizConfig(prev => ({...prev, level}));
        setCurrentQuestion(0); 
        setScore(0); 
        setIsAnswered(false); 
        setSelectedOption(null); 
        setUserAnswers([]); 
        setStreak(0);
        setGameState('playing'); 
    };

    const handleOptionClick = (selectedIndex) => {
        if (isAnswered) return;
        
        setSelectedOption(selectedIndex);
        setIsAnswered(true);

        const qInfo = questions[currentQuestion];
        const isCorrect = selectedIndex === qInfo.correct;
        const newScore = isCorrect ? score + 1 : score;

        if (isCorrect) {
            setScore(newScore);
            setStreak(s => s + 1);
            triggerHaptic('success');
        } else {
            setStreak(0);
            setIsShaking(true);
            triggerHaptic('error');
            setTimeout(() => setIsShaking(false), 500);
        }

        setUserAnswers(prev => [...prev, { qId: currentQuestion, selected: selectedIndex, isCorrect }]);

        setTimeout(() => {
            if (currentQuestion + 1 < questions.length) {
                setSelectedOption(null);
                setIsAnswered(false);
                setCurrentQuestion(prev => prev + 1);
                setQuestionTimeLeft(getTimeLimitForLevel(quizConfig.level));
            } else {
                finishQuiz(newScore);
            }
        }, 1200); 
    };

    const finishQuiz = (finalScore) => {
        const percentage = Math.round((finalScore / questions.length) * 100);
        const appDisplayName = activeAppTab === 'photo' ? 'Affinity Photo' : activeAppTab === 'designer' ? 'Affinity Designer' : 'Affinity Publisher';

        if (quizConfig.level === 'final') {
            if (percentage >= 90 || isAdmin) {
                const displayScore = isAdmin && percentage < 90 ? 100 : percentage;
                const newCert = { name: userName || 'Administrator', score: displayScore, date: new Date().toISOString(), appCourse: appDisplayName };
                setCertsData(prev => ({ ...prev, [activeAppTab]: newCert }));
                
                setActiveCertData(newCert);
                setGameState('certificate');
            } else {
                setCertsData(prev => ({ ...prev, [activeAppTab]: null })); 
                setGameState('result');
            }
        } else {
            let stars = finalScore >= (questions.length * 0.8) ? 3 : finalScore >= (questions.length * 0.5) ? 2 : finalScore >= (questions.length * 0.3) ? 1 : 0;
            
            setLevelStars(prev => {
                const appStars = prev[activeAppTab] || { beginner: 0, intermediate: 0, advanced: 0 };
                if (stars > (appStars[quizConfig.level] || 0)) {
                    return { ...prev, [activeAppTab]: { ...appStars, [quizConfig.level]: stars } };
                }
                return prev;
            });

            if (stars >= 1 || percentage >= 80) {
                setUnlockedLevels(prev => {
                    const appLevels = prev[activeAppTab] || ['beginner'];
                    if (quizConfig.level === 'beginner' && !appLevels.includes('intermediate')) {
                        return { ...prev, [activeAppTab]: [...appLevels, 'intermediate'] };
                    } else if (quizConfig.level === 'intermediate' && !appLevels.includes('advanced')) {
                        return { ...prev, [activeAppTab]: [...appLevels, 'advanced'] };
                    }
                    return prev;
                });
            }

            setHighScores(prev => {
                const appScore = prev[activeAppTab] || 0;
                if (finalScore > appScore) {
                    return { ...prev, [activeAppTab]: finalScore };
                }
                return prev;
            });

            setGameState('result');
        }
    };

    // === RENDER STATE: CERTIFICATE ===
    if (gameState === 'certificate') {
        const certToRender = activeCertData || currentCert;
        if (!certToRender) {
             setGameState('menu');
             return null;
        }
        return (
            <div className="fixed inset-0 w-full h-full z-[99999] bg-[#0A0A0A] flex flex-col items-center justify-center p-0 sm:p-6 overflow-hidden">
                <CertificateForm 
                    certData={certToRender} 
                    isDarkMode={isDarkMode} 
                    onBack={() => {
                        setActiveCertData(null);
                        setGameState('menu');
                    }} 
                />
            </div>
        );
    }

    // === RENDER STATE: MENU ===
    if (gameState === 'menu') {
        const allUnlocked = isAdmin || (currentUnlocked.includes('advanced') && currentStars.advanced >= 2);
        
        return (
            <div className={`w-full flex flex-col relative z-10 pb-[150px] transition-colors duration-500 ${isDarkMode ? 'text-[#F1F1F1] bg-transparent' : 'text-[#1A1A1A] bg-transparent'}`}>
                
                {/* 🌟 HEADER TITLE 🌟 */}
                <div className="pt-2 pb-3 px-4 transition-colors flex flex-col items-center text-center">
                    <h1 className={`text-2xl sm:text-3xl font-black font-khmer mb-1 tracking-tight ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}>
                        {lang === 'en' ? 'Skill Test Pro' : 'តេស្តសមត្ថភាពវិជ្ជាជីវៈ'}
                    </h1>
                    <p className={`text-[12px] sm:text-[13px] max-w-md mx-auto font-medium font-khmer ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                        {lang === 'en' ? 'Test your knowledge and get certified' : 'សាកល្បងចំណេះដឹង និងទទួលយកវិញ្ញាបនបត្រ'}
                    </p>
                </div>

                <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 pt-2 px-2 sm:px-6">
                    <div className={`w-full rounded-[2rem] border p-5 sm:p-10 shadow-sm transition-all ${isDarkMode ? 'bg-[#18191A] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                        
                        <div className="flex items-center justify-between mb-8 px-1">
                            <div>
                                <h2 className={`text-lg sm:text-xl font-black font-khmer leading-none ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{lang === 'en' ? 'Select Level' : 'ជ្រើសរើសកម្រិត'}</h2>
                                <p className={`text-[10px] sm:text-xs ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'} mt-2 uppercase font-black tracking-widest`}>{lang === 'en' ? 'High Score:' : 'ពិន្ទុខ្ពស់បំផុត:'} <span className={isDarkMode ? "text-[#41B6E6]" : "text-[#0277C5]"}>{currentHighScore}</span></p>
                            </div>
                            <div className={`flex flex-col items-end px-4 py-2.5 rounded-2xl border ${isDarkMode ? 'bg-[#242526] border-[#3E4042]' : 'bg-[#F8F9FA] border-[#CED0D4]'}`}>
                                <label className={`text-[9px] font-black uppercase ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'} mb-1.5`}>{lang === 'en' ? 'Questions' : 'ចំនួនសំណួរ'}</label>
                                <div className="flex gap-3 sm:gap-4">
                                    {[5, 10].map(amt => (
                                        <button key={amt} onClick={() => setQuizConfig({...quizConfig, amount: amt})} className={`text-[13px] sm:text-[14px] font-black transition-all ${quizConfig.amount === amt ? (isDarkMode ? 'text-[#41B6E6] scale-110 drop-shadow-md' : 'text-[#0277C5] scale-110 drop-shadow-md') : isDarkMode ? 'text-[#A0A0A0] hover:text-[#F1F1F1]' : 'text-[#6B7280] hover:text-[#1A1A1A]'}`}>{amt}</button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`flex items-center gap-3 p-4 sm:p-5 mb-8 rounded-2xl border transition-all ${isDarkMode ? 'bg-[#242526] border-[#3E4042] focus-within:border-[#41B6E6]/50' : 'bg-[#F8F9FA] border-[#CED0D4] focus-within:border-[#0277C5]/50'} focus-within:bg-transparent shadow-sm group`}>
                            <User size={18} className={`opacity-50 transition-colors ${isDarkMode ? 'text-[#41B6E6] group-focus-within:opacity-100' : 'text-[#0277C5] group-focus-within:opacity-100'}`} />
                            <div className="relative flex-1 flex items-center">
                                {!userName && (
                                    <div className={`absolute left-0 pointer-events-none text-[14px] font-khmer ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                                        {lang === 'en' ? "Enter your name..." : "បញ្ជូលឈ្មោះរបស់អ្នក..."}
                                    </div>
                                )}
                                <div 
                                    ref={nameInputRef}
                                    contentEditable="true"
                                    onInput={(e) => setUserName(e.currentTarget.textContent)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }}
                                    className={`bg-transparent outline-none w-full font-khmer text-[15px] font-bold whitespace-nowrap overflow-hidden ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}
                                    style={{ WebkitUserModify: 'read-write-plaintext-only' }}
                                    spellCheck="false" autoCorrect="off" autoCapitalize="words" suppressHydrationWarning
                                />
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {['beginner', 'intermediate', 'advanced'].map(lvl => {
                                const isLocked = !isAdmin && !currentUnlocked.includes(lvl);
                                const stars = currentStars[lvl] || 0;
                                const displayLevel = lang === 'en' ? lvl.charAt(0).toUpperCase() + lvl.slice(1) : (lvl === 'beginner' ? 'កម្រិតដំបូង' : lvl === 'intermediate' ? 'កម្រិតមធ្យម' : 'កម្រិតខ្ពស់');

                                return (
                                    <button key={lvl} onClick={() => startQuiz(lvl)} className={`p-4 sm:p-5 rounded-[1.25rem] sm:rounded-2xl border flex items-center justify-between transition-all duration-300 ease-spring active:scale-[0.98] ${isLocked ? (isDarkMode ? 'opacity-40 grayscale border-[#3E4042] cursor-not-allowed bg-[#242526]' : 'opacity-40 grayscale border-[#CED0D4] cursor-not-allowed bg-[#F8F9FA]') : (isDarkMode ? 'border-[#3E4042] bg-[#242526] hover:-translate-y-1 hover:border-[#41B6E6]/40 shadow-sm hover:shadow-[0_10px_20px_rgba(65,182,230,0.1)]' : 'border-[#CED0D4] bg-white hover:-translate-y-1 hover:border-[#0277C5]/40 shadow-sm hover:shadow-[0_10px_20px_rgba(2,119,197,0.1)]')}`}>
                                        <div className="flex items-center gap-4 text-left">
                                            <div className={`p-3 rounded-xl shadow-sm ${isLocked ? (isDarkMode ? 'bg-[#3A3B3C] text-[#A0A0A0]' : 'bg-[#E5E7EB] text-[#6B7280]') : (isDarkMode ? 'bg-[#41B6E6] text-[#121212]' : 'bg-[#0277C5] text-white')}`}>{isLocked ? <Lock size={18}/> : <Play size={18} fill="currentColor" className="ml-0.5"/>}</div>
                                            <div><span className={`font-khmer font-black text-[15px] block ${isDarkMode && !isLocked ? 'text-[#F1F1F1]' : ''}`}>{displayLevel}</span><div className="flex gap-1 mt-1.5">{[1, 2, 3].map(s => <Star key={s} size={11} className={s <= stars ? "fill-[#C5B002] text-[#C5B002]" : (isDarkMode ? "text-[#3A3B3C]" : "text-[#E5E7EB]")} />)}</div></div>
                                        </div>
                                        {!isLocked && <ChevronRight size={20} className={`opacity-50 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}/>}
                                    </button>
                                );
                            })}
                            
                            <div className={`mt-4 pt-6 border-t ${isDarkMode ? 'border-[#3E4042]' : 'border-[#E5E7EB]'} flex flex-col gap-3`}>
                                <button onClick={() => startQuiz('final')} disabled={!allUnlocked} className={`p-5 rounded-[1.25rem] sm:rounded-2xl border flex items-center justify-between transition-all duration-300 ease-spring active:scale-[0.98] ${allUnlocked ? 'border-[#C5B002] bg-[#C5B002]/10 shadow-lg hover:-translate-y-1 hover:shadow-[#C5B002]/20' : (isDarkMode ? 'opacity-40 border-[#3E4042] cursor-not-allowed bg-[#242526]' : 'opacity-40 border-[#CED0D4] cursor-not-allowed bg-[#F8F9FA]')}`}>
                                    <div className="flex items-center gap-4 text-left">
                                        <div className={`p-3 rounded-xl ${allUnlocked ? 'bg-[#C5B002] text-white shadow-inner' : (isDarkMode ? 'bg-[#3A3B3C] text-[#A0A0A0]' : 'bg-[#E5E7EB] text-[#6B7280]')}`}><Trophy size={20}/></div>
                                        <div>
                                            <span className={`font-khmer font-black text-[15px] block ${allUnlocked ? 'text-[#C5B002]' : (isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]')}`}>
                                                {currentCert ? (lang === 'en' ? 'Retake Final Exam' : 'ប្រឡងយកវិញ្ញាបនបត្រម្តងទៀត') : (lang === 'en' ? 'Final Certification Exam' : 'តេស្តបញ្ចប់យកវិញ្ញាបនបត្រ')}
                                                {isAdmin && <span className="ml-2 text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full inline-flex align-middle">ADMIN</span>}
                                            </span>
                                            <span className={`text-[10px] sm:text-[11px] ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'} font-black uppercase tracking-tighter mt-1 block`}>
                                                {lang === 'en' ? '40 Questions • 15 Mins • 90% to Pass' : '៤០ សំណួរ • ១៥ នាទី • ជាប់ ៩០%'}
                                            </span>
                                        </div>
                                    </div>
                                    {!allUnlocked && <Lock size={16} className={isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}/>}
                                </button>

                                {/* 🌟 ADMIN ONLY: Instant Generate Certificate Button */}
                                {isAdmin && !currentCert && (
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault(); e.stopPropagation();
                                            triggerHaptic('success');
                                            const finalName = userName.trim() || 'Admin Tester';
                                            const appDisplayName = activeAppTab === 'photo' ? 'Affinity Photo' : activeAppTab === 'designer' ? 'Affinity Designer' : 'Affinity Publisher';
                                            const newCert = { name: finalName, score: 100, date: new Date().toISOString(), appCourse: appDisplayName };
                                            
                                            setCertsData(prev => ({ ...prev, [activeAppTab]: newCert }));
                                            setActiveCertData(newCert); 
                                            setGameState('certificate');
                                        }}
                                        className={`p-4 rounded-[24px] border flex items-center justify-center gap-3 transition-all duration-500 ease-out hover:-translate-y-1 active:scale-95 shadow-md ${isDarkMode ? 'border-[#41B6E6]/50 bg-[#41B6E6]/10 text-[#41B6E6] hover:shadow-[0_10px_20px_rgba(65,182,230,0.15)]' : 'border-[#0277C5]/50 bg-[#0277C5]/10 text-[#0277C5] hover:shadow-[0_10px_20px_rgba(2,119,197,0.15)]'}`}
                                    >
                                        <ShieldCheck size={20} />
                                        <span className="font-khmer font-black text-[15px] tracking-tight">Admin: Generate Certificate</span>
                                    </button>
                                )}

                                {/* 🌟 USERS: View Saved Certificate */}
                                {currentCert && (
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault(); e.stopPropagation();
                                            setActiveCertData(currentCert);
                                            setGameState('certificate');
                                        }} 
                                        className={`p-4 rounded-[24px] border flex items-center justify-center gap-3 transition-all duration-500 ease-out hover:-translate-y-1 active:scale-95 shadow-md ${isDarkMode ? 'border-[#41B6E6]/50 bg-[#41B6E6]/10 text-[#41B6E6] hover:shadow-[0_10px_20px_rgba(65,182,230,0.15)]' : 'border-[#0277C5]/50 bg-[#0277C5]/10 text-[#0277C5] hover:shadow-[0_10px_20px_rgba(2,119,197,0.15)]'}`}
                                    >
                                        <Award size={20} />
                                        <span className="font-khmer font-black text-[15px] tracking-tight">{lang === 'en' ? 'View My Certificate' : 'មើលវិញ្ញាបនបត្ររបស់ខ្ញុំ'}</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // === RENDER STATE: PLAYING ===
    const q = questions[currentQuestion];
    if (gameState === 'playing' && q) {
        const progressPercent = ((currentQuestion) / questions.length) * 100;
        
        return (
            <div className={`w-full flex flex-col relative z-10 pb-[150px] transition-colors duration-500 ${isDarkMode ? 'text-[#F1F1F1] bg-transparent' : 'text-[#1A1A1A] bg-transparent'}`}>
                
                {/* Standard Unified Panel containing Top Bar and Question */}
                <div className="w-full max-w-3xl mx-auto pt-2 px-2 sm:px-6">
                    <div className={`w-full rounded-[2rem] border p-5 sm:p-8 shadow-sm flex flex-col gap-6 transition-all ${isShaking ? 'animate-shake border-red-500' : isDarkMode ? 'bg-[#18191A] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                        
                        {/* Top Bar */}
                        <div className="flex items-center justify-between gap-4 border-b pb-5 border-gray-500/10">
                            <button onClick={() => setGameState('menu')} className={`p-1.5 sm:p-2 rounded-full outline-none focus:outline-none transition-colors active:scale-95 ${isDarkMode ? 'hover:bg-[#242526] text-[#A0A0A0]' : 'hover:bg-[#F0F2F5] text-[#6B7280]'}`}>
                                <X size={20} className="sm:w-6 sm:h-6" />
                            </button>
                            
                            <div className="flex-1 max-w-sm mx-auto">
                                <div className={`h-2 sm:h-2.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#E5E7EB]'}`}>
                                    <div className={`h-full bg-gradient-to-r from-[#41B6E6] to-[#0277C5] rounded-full transition-all duration-300 ease-out`} style={{ width: `${progressPercent}%` }}></div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 shrink-0">
                                {quizConfig.level === 'final' ? (
                                    timeLeft !== null && (
                                        <div className={`flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-xl border ${timeLeft <= 60 ? 'bg-red-500/10 border-red-500/20 text-red-500 animate-pulse' : (isDarkMode ? 'bg-[#41B6E6]/10 border-[#41B6E6]/20 text-[#41B6E6]' : 'bg-[#0277C5]/10 border-[#0277C5]/20 text-[#0277C5]')}`}>
                                            <Timer size={14} className="sm:w-4 sm:h-4" />
                                            <span className="font-black text-[11px] sm:text-sm font-mono">{formatTime(timeLeft)}</span>
                                        </div>
                                    )
                                ) : (
                                    questionTimeLeft !== null && (
                                        <div className={`flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-xl border ${questionTimeLeft <= 5 ? 'bg-red-500/10 border-red-500/20 text-red-500 animate-pulse' : (isDarkMode ? 'bg-[#41B6E6]/10 border-[#41B6E6]/20 text-[#41B6E6]' : 'bg-[#0277C5]/10 border-[#0277C5]/20 text-[#0277C5]')}`}>
                                            <Timer size={14} className="sm:w-4 sm:h-4" />
                                            <span className="font-black text-[11px] sm:text-sm font-mono">{formatTime(questionTimeLeft)}</span>
                                        </div>
                                    )
                                )}
                                <div className={`flex items-center gap-1 px-2.5 py-1 sm:py-1.5 rounded-xl border ${isDarkMode ? 'bg-[#C55002]/10 border-[#C55002]/20' : 'bg-[#C55002]/10 border-[#C55002]/20'}`}>
                                    <Flame size={14} className={`sm:w-4 sm:h-4 ${streak > 0 ? 'text-[#C55002] fill-[#C55002] animate-pulse' : (isDarkMode ? 'text-[#4E4F50]' : 'text-[#CED0D4]')}`} />
                                    <span className="font-black text-[11px] sm:text-sm text-[#C55002]">{streak}</span>
                                </div>
                            </div>
                        </div>

                        {/* Question */}
                        <div className="w-full mb-2">
                            <h2 className="text-xl sm:text-2xl font-black font-khmer leading-snug sm:leading-relaxed text-left">
                                {q.question}
                            </h2>
                        </div>

                        {/* Options */}
                        <div className="grid gap-3.5 w-full">
                            {q.options.map((opt, i) => {
                                const isUserChoice = selectedOption === i;
                                const isCorrectChoice = q.correct === i;
                                
                                let btnStyle = isDarkMode ? 'bg-[#242526] border-[#3E4042] text-[#F1F1F1]' : 'bg-[#F8F9FA] border-[#CED0D4] text-[#1A1C1E] shadow-sm';
                                let iconStyle = isDarkMode ? 'bg-[#3A3B3C] text-[#A0A0A0] border-[#4E4F50]' : 'bg-white text-[#6B7280] border-[#E4E6EB]';

                                if (!isAnswered) {
                                    btnStyle += isDarkMode ? ' hover:border-[#41B6E6]/50' : ' hover:border-[#0277C5]/50';
                                } else {
                                    if (isCorrectChoice) {
                                        btnStyle = 'bg-green-500/10 border-green-500/40 text-green-600 font-bold';
                                        iconStyle = 'bg-green-500 text-white border-green-500 shadow-md shadow-green-500/20';
                                    } else if (isUserChoice) {
                                        btnStyle = 'bg-red-500/10 border-red-500/40 text-red-600 font-bold';
                                        iconStyle = 'bg-red-500 text-white border-red-500 shadow-md shadow-red-500/20';
                                    } else {
                                        btnStyle = 'opacity-40 grayscale border-transparent bg-transparent shadow-none text-[#6B7280]';
                                        iconStyle = 'opacity-0';
                                    }
                                }

                                return (
                                    <button 
                                        key={i} 
                                        disabled={isAnswered} 
                                        style={{ WebkitTapHighlightColor: 'transparent' }}
                                        onClick={() => handleOptionClick(i)} 
                                        className={`p-4 sm:p-5 text-left rounded-[1.25rem] border-2 transition-all duration-300 ease-spring font-khmer text-[15px] sm:text-[16px] font-bold flex items-center group relative overflow-hidden active:scale-[0.98] outline-none focus:outline-none ${btnStyle}`}
                                    >
                                        <span className={`w-9 h-9 min-w-[36px] flex items-center justify-center rounded-xl border mr-4 text-[12px] sm:text-[13px] font-black transition-all ${iconStyle}`}>{String.fromCharCode(65 + i)}</span>
                                        <span className="flex-1 leading-snug">{opt}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // === RENDER STATE: RESULT ===
    if (gameState === 'result') {
        const percentage = Math.round((score / questions.length) * 100);

        return (
            <div className={`w-full flex flex-col relative z-10 pb-[150px] transition-colors duration-500 ${isDarkMode ? 'text-[#F1F1F1] bg-transparent' : 'text-[#1A1A1A] bg-transparent'}`}>
                <div className="w-full max-w-3xl mx-auto pt-4 px-2 sm:px-6">
                    <div className={`w-full rounded-[2rem] border p-10 sm:p-14 text-center shadow-sm transition-all ${isDarkMode ? 'bg-[#18191A] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-10">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 144 144">
                                <circle cx="72" cy="72" r="64" className={isDarkMode ? 'text-[#2C2C2C]' : 'text-[#F0F2F5]'} strokeWidth="12" fill="none" stroke="currentColor" />
                                <circle cx="72" cy="72" r="64" className="text-[#0277C5]" strokeWidth="12" fill="none" strokeDasharray="401.9" strokeDashoffset={401.9 - (401.9 * percentage) / 100} strokeLinecap="round" stroke="currentColor" style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}/>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                                <span className="text-4xl sm:text-5xl font-black">{percentage}</span>
                                <span className={`text-[10px] sm:text-[11px] font-black ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'} mt-2 uppercase tracking-widest`}>{lang === 'en' ? '% Score' : '% ពិន្ទុ'}</span>
                            </div>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black font-khmer mb-4">
                            {percentage >= 80 ? (lang === 'en' ? "Excellent!" : "អស្ចារ្យណាស់បង!") : (lang === 'en' ? "Try again!" : "ព្យាយាមម្តងទៀត!")}
                        </h2>
                        <p className={`font-khmer font-medium ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'} mb-10 text-[15px] sm:text-[16px]`}>
                            {lang === 'en' ? `You answered ${score} / ${questions.length} questions correctly` : `អ្នកឆ្លើយត្រូវ ${score} / ${questions.length} សំណួរ`}
                        </p>
                        <div className="flex flex-col gap-4 max-w-sm mx-auto">
                            <button onClick={() => setGameState('review')} style={{ WebkitTapHighlightColor: 'transparent' }} className={`w-full py-4 sm:py-5 rounded-[1.25rem] outline-none focus:outline-none font-black font-khmer border-2 transition-all active:scale-[0.98] ${isDarkMode ? 'bg-[#242526] border-[#3E4042] text-[#41B6E6] hover:border-[#41B6E6]/50' : 'bg-[#F0F2F5] border-[#CED0D4] text-[#0277C5] hover:border-[#0277C5]/50'}`}>
                                {lang === 'en' ? 'Review Answers' : 'មើលចម្លើយឡើងវិញ'}
                            </button>
                            <button onClick={() => setGameState('menu')} style={{ WebkitTapHighlightColor: 'transparent' }} className="w-full py-4 sm:py-5 rounded-[1.25rem] outline-none focus:outline-none bg-[#0277C5] text-white font-black font-khmer active:scale-[0.98] transition-all shadow-xl shadow-[#0277C5]/30 hover:bg-[#01579B]">
                                {lang === 'en' ? 'Back to Menu' : 'ត្រលប់ទៅកាន់ Menu'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // === RENDER STATE: REVIEW ===
    return (
        <div className={`w-full flex flex-col relative z-10 pb-[150px] transition-colors duration-500 ${isDarkMode ? 'text-[#F1F1F1] bg-transparent' : 'text-[#1A1A1A] bg-transparent'}`}>
            <div className="w-full max-w-3xl mx-auto pt-2 px-2 sm:px-6">
                <div className={`w-full rounded-[2rem] border p-6 sm:p-10 shadow-sm transition-all flex flex-col ${isDarkMode ? 'bg-[#18191A] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                    
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-500/10 shrink-0">
                        <div className="flex flex-col">
                            <h2 className="text-xl sm:text-2xl font-black font-khmer leading-none">{lang === 'en' ? 'Review' : 'ការត្រួតពិនិត្យ'}</h2>
                            <p className={`text-[10px] sm:text-xs ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'} font-black font-khmer uppercase mt-2 tracking-widest`}>{lang === 'en' ? 'Review your answers' : 'ពិនិត្យមើលចម្លើយរបស់អ្នកឡើងវិញ'}</p>
                        </div>
                        <button onClick={() => setGameState('result')} style={{ WebkitTapHighlightColor: 'transparent' }} className={`p-3 rounded-full outline-none focus:outline-none transition-colors ${isDarkMode ? 'bg-[#242526] hover:bg-[#3A3B3C]' : 'bg-[#F8F9FA] hover:bg-[#E5E7EB]'} shadow-sm`}><X size={20} className={isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'} /></button>
                    </div>
                    
                    <div className="flex flex-col space-y-5">
                        {userAnswers.map((ans, idx) => {
                            const qInfo = questions[ans.qId];
                            if (!qInfo) return null;
                            return (
                                <div key={idx} className={`p-5 sm:p-6 rounded-[1.5rem] border transition-all ${isDarkMode ? 'bg-[#242526] border-[#3E4042]' : 'bg-[#F8F9FA] border-[#CED0D4]'}`}>
                                    <p className="font-black font-khmer text-[15px] sm:text-[16px] mb-5 leading-relaxed">{idx + 1}. {qInfo.question}</p>
                                    <div className="grid gap-3">
                                        {qInfo.options.map((opt, i) => {
                                            const isCorrect = qInfo.correct === i;
                                            const isSelected = ans.selected === i;
                                            let style = isDarkMode ? 'text-[#A0A0A0] bg-transparent border-[#3E4042]' : 'text-[#6B7280] bg-white border-[#E4E6EB]';
                                            
                                            if (isCorrect) style = 'bg-green-500/10 text-green-600 border-green-500/30 font-bold';
                                            else if (isSelected) style = 'bg-red-500/10 text-red-600 border-red-500/30 font-bold';
                                            
                                            return (
                                                <div key={i} className={`p-3.5 sm:p-4 rounded-xl border flex items-center gap-3 text-[14px] font-khmer transition-all ${style}`}>
                                                    {isCorrect ? <CheckCircle2 size={18} /> : isSelected ? <XCircle size={18} /> : <div className={`w-[18px] h-[18px] rounded-full border-2 shrink-0 ${isDarkMode ? 'border-[#4E4F50]' : 'border-[#CED0D4]'}`}/>}
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