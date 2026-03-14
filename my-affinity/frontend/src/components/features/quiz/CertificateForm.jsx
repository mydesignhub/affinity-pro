import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Flame, CheckCircle2, XCircle, Play, Star, Award, Lock, ChevronRight, User, Timer, Camera, PenTool, Book } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { initialQuestionBank } from '../../../data/data';
import CertificateForm from './CertificateForm';

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

// Default empty states for the 3 apps
const defaultLevels = { photo: ['beginner'], designer: ['beginner'], publisher: ['beginner'] };
const defaultStars = { 
    photo: { beginner: 0, intermediate: 0, advanced: 0 }, 
    designer: { beginner: 0, intermediate: 0, advanced: 0 }, 
    publisher: { beginner: 0, intermediate: 0, advanced: 0 } 
};
const defaultScores = { photo: 0, designer: 0, publisher: 0 };
const defaultCerts = { photo: null, designer: null, publisher: null };

const Test = ({ isDarkMode }) => {
    const { lang } = useLanguage(); 

    const [gameState, setGameState] = useState('menu');
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [quizConfig, setQuizConfig] = useState({ level: 'beginner', amount: 5 });
    
    // Tracks which Affinity app is active
    const [activeAppTab, setActiveAppTab] = useState('photo');

    // 🌟 VERCEL FIX: Initialize states safely to prevent Error #418 Hydration Mismatch
    const [userName, setUserName] = useState('');
    const [highScores, setHighScores] = useState(defaultScores);
    const [unlockedLevels, setUnlockedLevels] = useState(defaultLevels);
    const [levelStars, setLevelStars] = useState(defaultStars);
    const [certsData, setCertsData] = useState(defaultCerts);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const nameInputRef = useRef(null);

    const [timeLeft, setTimeLeft] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [streak, setStreak] = useState(0);
    const [isShaking, setIsShaking] = useState(false);

    // 🌟 VERCEL FIX: Read from localStorage ONLY after the component has mounted
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

    // Extract current app's specific data
    const currentUnlocked = unlockedLevels[activeAppTab] || ['beginner'];
    const currentStars = levelStars[activeAppTab] || { beginner: 0, intermediate: 0, advanced: 0 };
    const currentHighScore = highScores[activeAppTab] || 0;
    const currentCert = certsData[activeAppTab] || null;

    useEffect(() => {
        if (nameInputRef.current && userName && !nameInputRef.current.textContent) {
            nameInputRef.current.textContent = userName;
        }
    }, [activeAppTab, userName]); 

    // Save everything to localStorage whenever it changes (ONLY if data is loaded)
    useEffect(() => {
        if (isDataLoaded) {
            localStorage.setItem('myAffinity_quiz_unlocked', JSON.stringify(unlockedLevels));
            localStorage.setItem('myAffinity_quiz_stars', JSON.stringify(levelStars));
            localStorage.setItem('myAffinity_quiz_scores', JSON.stringify(highScores));
            localStorage.setItem('myAffinity_quiz_certs', JSON.stringify(certsData));
            if (userName) localStorage.setItem('myAffinity_user_name', userName);
        }
    }, [unlockedLevels, levelStars, highScores, certsData, userName, isDataLoaded]);

    useEffect(() => {
        if (gameState !== 'playing' || quizConfig.level !== 'final' || timeLeft === null) return;
        if (timeLeft <= 0) { finishQuiz(score); return; }
        const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timerId);
    }, [gameState, quizConfig.level, timeLeft, score]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60); const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const startQuiz = (level) => { 
        if (level === 'final') {
            if (!userName.trim()) { alert(lang === 'en' ? "Please enter your name first!" : "សូមបញ្ចូលឈ្មោះរបស់អ្នកជាមុនសិន!"); return; }
            if (currentCert) {
                const confirmRetake = window.confirm(lang === 'en' ? "You already have a certificate. Retake?" : "អ្នកមានវិញ្ញាបនបត្ររួចហើយ។ បន្តឬទេ?");
                if (!confirmRetake) return;
            }
            setTimeLeft(15 * 60);
        } else { setTimeLeft(null); }

        if (!currentUnlocked.includes(level) && level !== 'final') { triggerHaptic('error'); return; }
        triggerHaptic();
        
        // Filter ONLY questions for the active app
        let filtered = initialQuestionBank.filter(q => q.app === activeAppTab);
        if (level !== 'final') {
             filtered = filtered.filter(q => q.level === level);
        }

        // Pad with other levels if not enough questions exist
        if (filtered.length < quizConfig.amount && level !== 'final') {
            const extra = initialQuestionBank.filter(q => q.app === activeAppTab && q.level !== level);
            filtered = [...filtered, ...extra];
        }

        const amount = level === 'final' ? 15 : Math.min(quizConfig.amount, filtered.length);
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
        setCurrentQuestion(0); setScore(0); setIsAnswered(false); setSelectedOption(null); setUserAnswers([]); setStreak(0);
        setGameState('playing'); 
    };

    const finishQuiz = (finalScore) => {
        const percentage = Math.round((finalScore / questions.length) * 100);
        
        // Get formatted app name for the Certificate
        const appDisplayName = activeAppTab === 'photo' ? 'Affinity Photo' : activeAppTab === 'designer' ? 'Affinity Designer' : 'Affinity Publisher';

        if (quizConfig.level === 'final') {
            if (percentage >= 90) {
                // Save the cert exactly to this active App!
                const newCert = { name: userName, score: percentage, date: new Date().toISOString(), appCourse: appDisplayName };
                setCertsData(prev => ({ ...prev, [activeAppTab]: newCert }));
                setGameState('certificate');
            } else {
                setCertsData(prev => ({ ...prev, [activeAppTab]: null })); 
                setGameState('result');
            }
        } else {
            let stars = finalScore >= (questions.length * 0.8) ? 3 : finalScore >= (questions.length * 0.5) ? 2 : finalScore >= (questions.length * 0.3) ? 1 : 0;
            
            // Save Stars
            setLevelStars(prev => {
                const appStars = prev[activeAppTab] || { beginner: 0, intermediate: 0, advanced: 0 };
                if (stars > (appStars[quizConfig.level] || 0)) {
                    return { ...prev, [activeAppTab]: { ...appStars, [quizConfig.level]: stars } };
                }
                return prev;
            });

            // Unlock next levels
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

            // Save High Score
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

    if (gameState === 'certificate') return <CertificateForm certData={currentCert} isDarkMode={isDarkMode} onBack={() => setGameState('menu')} />;

    if (gameState === 'menu') {
        const allUnlocked = currentUnlocked.includes('advanced') && currentStars.advanced >= 2;
        return (
            <div className="flex flex-col items-center justify-start min-h-full pt-4 sm:pt-8 px-2 sm:px-6 pb-28 sm:pb-32 w-full">
                
                {/* 🌟 3-WAY TOGGLE ABOVE THE QUIZ MENU 🌟 */}
                <div className={`flex justify-center p-1.5 rounded-2xl mx-auto max-w-md w-full mb-6 border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                    <button onClick={() => { setActiveAppTab('photo'); triggerHaptic(); }} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${activeAppTab === 'photo' ? (isDarkMode ? 'bg-[#41B6E6] text-[#0A0A0A]' : 'bg-[#0277C5] text-white') : (isDarkMode ? 'text-[#A0A0A0] hover:text-[#F1F1F1]' : 'text-[#6B7280] hover:text-[#1A1A1A]')}`}>
                        <Camera size={16} /> Photo
                    </button>
                    <button onClick={() => { setActiveAppTab('designer'); triggerHaptic(); }} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${activeAppTab === 'designer' ? (isDarkMode ? 'bg-[#41B6E6] text-[#0A0A0A]' : 'bg-[#0277C5] text-white') : (isDarkMode ? 'text-[#A0A0A0] hover:text-[#F1F1F1]' : 'text-[#6B7280] hover:text-[#1A1A1A]')}`}>
                        <PenTool size={16} /> Designer
                    </button>
                    <button onClick={() => { setActiveAppTab('publisher'); triggerHaptic(); }} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${activeAppTab === 'publisher' ? (isDarkMode ? 'bg-[#41B6E6] text-[#0A0A0A]' : 'bg-[#0277C5] text-white') : (isDarkMode ? 'text-[#A0A0A0] hover:text-[#F1F1F1]' : 'text-[#6B7280] hover:text-[#1A1A1A]')}`}>
                        <Book size={16} /> Publisher
                    </button>
                </div>

                <div className={`p-5 sm:p-8 rounded-[32px] sm:rounded-[40px] border shadow-2xl w-full max-w-[95%] sm:max-w-lg transition-all duration-500 backdrop-blur-2xl animate-fade-in-up ${isDarkMode ? 'bg-[#1A1A1A]/90 border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]' : 'bg-[#FFFFFF]/95 border-black/5 shadow-[0_20px_60px_rgba(2,119,197,0.1)]'}`}>
                    
                    <div className="flex items-center justify-between mb-5 sm:mb-6 px-1">
                        <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center shadow-inner ${isDarkMode ? 'bg-[#41B6E6]/10' : 'bg-[#0277C5]/10'}`}><Award className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} size={24} /></div>
                            <div className="flex flex-col">
                                <h2 className={`text-[19px] sm:text-[22px] font-black font-khmer leading-none tracking-tight ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{lang === 'en' ? 'Skill Test' : 'តេស្តសមត្ថភាព'}</h2>
                                <p className={`text-[9px] sm:text-[10px] mt-1.5 uppercase font-black tracking-widest ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{lang === 'en' ? 'High Score:' : 'ពិន្ទុខ្ពស់បំផុត:'} {currentHighScore}</p>
                            </div>
                        </div>
                        
                        <div className={`flex flex-col items-end px-3 sm:px-4 py-2 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            <label className={`text-[8px] sm:text-[9px] font-black uppercase mb-1 tracking-widest ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{lang === 'en' ? 'Questions' : 'សំណួរ'}</label>
                            <div className="flex gap-3">
                                {[5, 10].map(amt => (
                                    <button key={amt} onClick={() => { triggerHaptic(); setQuizConfig({...quizConfig, amount: amt}) }} className={`text-[13px] font-black transition-all ${quizConfig.amount === amt ? (isDarkMode ? 'text-[#41B6E6] scale-110 drop-shadow-md' : 'text-[#0277C5] scale-110 drop-shadow-md') : (isDarkMode ? 'text-[#6B7280] hover:text-[#A0A0A0]' : 'text-[#9CA3AF] hover:text-[#6B7280]')}`}>{amt}</button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={`relative flex items-center gap-3 p-4 mb-6 rounded-2xl border transition-all duration-300 shadow-inner group ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C] focus-within:border-[#41B6E6]/50 focus-within:bg-[#1E1E1E]/50' : 'bg-[#F8F9FA] border-[#E5E7EB] focus-within:border-[#0277C5]/50 focus-within:bg-white'}`}>
                        <User size={18} className={`opacity-50 transition-colors ${isDarkMode ? 'text-[#41B6E6] group-focus-within:opacity-100' : 'text-[#0277C5] group-focus-within:opacity-100'}`} />
                        <div className="absolute overflow-hidden w-0 h-0 opacity-0 -z-10">
                            <input type="text" name="fake_email" tabIndex="-1" />
                            <input type="password" name="fake_password" tabIndex="-1" />
                        </div>
                        <div className="relative flex-1 flex items-center w-full">
                            {!userName && (
                                <div className={`absolute left-0 pointer-events-none text-[14px] font-khmer font-bold tracking-wide opacity-40 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                                    {lang === 'en' ? "Enter your full name..." : "រាយឈ្មោះរបស់អ្នក..."}
                                </div>
                            )}
                            <div 
                                ref={nameInputRef}
                                contentEditable="true"
                                onInput={(e) => setUserName(e.currentTarget.textContent)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault(); 
                                        e.target.blur(); 
                                    }
                                }}
                                onFocus={(e) => {
                                    setTimeout(() => {
                                        e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }, 300);
                                }}
                                className={`bg-transparent outline-none w-full font-khmer text-[14px] font-bold tracking-wide whitespace-nowrap overflow-x-auto no-scrollbar ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}
                                spellCheck="false"
                                role="textbox"
                                aria-multiline="false"
                                autoCorrect="off"
                                autoCapitalize="words"
                                suppressHydrationWarning
                            />
                        </div>
                    </div>

                    <div className="grid gap-3">
                        {['beginner', 'intermediate', 'advanced'].map(lvl => {
                            const isLocked = !currentUnlocked.includes(lvl);
                            const stars = currentStars[lvl] || 0;
                            const displayLevel = lang === 'en' ? lvl.charAt(0).toUpperCase() + lvl.slice(1) : (lvl === 'beginner' ? 'កម្រិតដំបូង' : lvl === 'intermediate' ? 'កម្រិតមធ្យម' : 'កម្រិតខ្ពស់');

                            return (
                                <button key={lvl} onClick={() => startQuiz(lvl)} className={`p-4 rounded-[24px] border flex items-center justify-between transition-all duration-500 ease-out active:scale-[0.98] ${isLocked ? (isDarkMode ? 'opacity-40 grayscale border-[#2C2C2C] cursor-not-allowed bg-[#121212]' : 'opacity-40 grayscale border-[#E5E7EB] cursor-not-allowed bg-[#F8F9FA]') : (isDarkMode ? 'border-[#3A3A3C] bg-[#1E1E1E] hover:-translate-y-1 hover:border-[#41B6E6]/40 shadow-sm hover:shadow-[0_10px_20px_rgba(65,182,230,0.1)]' : 'border-[#E5E7EB] bg-white hover:-translate-y-1 hover:border-[#0277C5]/40 shadow-sm hover:shadow-[0_10px_20px_rgba(2,119,197,0.1)]')}`}>
                                    <div className="flex items-center gap-4 text-left">
                                        <div className={`p-3 rounded-2xl shadow-sm ${isLocked ? 'bg-gray-100 text-gray-400 dark:bg-[#2C2C2C] dark:text-[#A0A0A0]' : 'bg-[#0277C5] text-white dark:bg-[#41B6E6] dark:text-[#121212]'}`}>{isLocked ? <Lock size={18}/> : <Play size={18} fill="currentColor"/>}</div>
                                        <div>
                                            <span className={`font-khmer font-black text-[15px] block tracking-tight ${isDarkMode && !isLocked ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{displayLevel}</span>
                                            <div className="flex gap-1 mt-1.5">
                                                {[1, 2, 3].map(s => <Star key={s} size={11} className={s <= stars ? "fill-[#C5B002] text-[#C5B002]" : (isDarkMode ? "fill-[#2C2C2C] text-[#2C2C2C]" : "fill-[#E5E7EB] text-[#E5E7EB]")} />)}
                                            </div>
                                        </div>
                                    </div>
                                    {!isLocked && <ChevronRight size={20} className={`opacity-40 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}/>}
                                </button>
                            );
                        })}
                        
                        <div className={`mt-2 pt-3 border-t flex flex-col gap-3 ${isDarkMode ? 'border-[#2C2C2C]' : 'border-[#E5E7EB]'}`}>
                            <button onClick={() => startQuiz('final')} disabled={!allUnlocked} className={`p-5 rounded-[24px] border flex items-center justify-between transition-all duration-500 ease-out active:scale-[0.98] ${allUnlocked ? 'border-[#C5B002] bg-[#C5B002]/10 shadow-lg hover:-translate-y-1 hover:shadow-[#C5B002]/20' : 'opacity-40 border-gray-200 dark:border-[#2C2C2C] cursor-not-allowed bg-transparent'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl ${allUnlocked ? 'bg-[#C5B002] text-white shadow-inner' : 'bg-gray-100 text-gray-400 dark:bg-[#2C2C2C] dark:text-[#A0A0A0]'}`}><Trophy size={20}/></div>
                                    <div className="text-left">
                                        <span className={`font-khmer font-black text-[15px] block tracking-tight ${allUnlocked ? 'text-[#C5B002]' : ''}`}>{currentCert ? (lang === 'en' ? 'Retake Final Exam' : 'ប្រឡងយកវិញ្ញាបនបត្រម្តងទៀត') : (lang === 'en' ? 'Final Certification Exam' : 'តេស្តបញ្ចប់យកវិញ្ញាបនបត្រ')}</span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest mt-1 block ${allUnlocked ? 'opacity-80 text-[#C5B002]' : 'opacity-50'}`}>{lang === 'en' ? '15 Questions • 15 Mins • 90% to Pass' : '១៥ សំណួរ • ១៥ នាទី • ជាប់ ៩០%'}</span>
                                    </div>
                                </div>
                                {!allUnlocked && <Lock size={16} className="opacity-30"/>}
                            </button>

                            {currentCert && (
                                <button onClick={() => setGameState('certificate')} className={`p-4 rounded-[24px] border flex items-center justify-center gap-3 transition-all duration-500 ease-out hover:-translate-y-1 active:scale-95 shadow-md ${isDarkMode ? 'border-[#41B6E6]/50 bg-[#41B6E6]/10 text-[#41B6E6] hover:shadow-[0_10px_20px_rgba(65,182,230,0.15)]' : 'border-[#0277C5]/50 bg-[#0277C5]/10 text-[#0277C5] hover:shadow-[0_10px_20px_rgba(2,119,197,0.15)]'}`}>
                                    <Award size={20} />
                                    <span className="font-khmer font-black text-[15px] tracking-tight">{lang === 'en' ? 'View My Certificate' : 'មើលវិញ្ញាបនបត្ររបស់ខ្ញុំ'}</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const q = questions[currentQuestion];
    if (gameState === 'playing' && q) {
        return (
            <div className="flex flex-col items-center justify-start min-h-full pt-4 sm:pt-8 px-2 sm:px-6 pb-28 sm:pb-32 w-full">
                <style>{`
                    @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 50% { transform: translateX(5px); } 75% { transform: translateX(-5px); } }
                    .animate-shake { animation: shake 0.4s ease-in-out; }
                `}</style>
                <div className={`p-6 sm:p-10 rounded-[32px] sm:rounded-[40px] border shadow-2xl w-full max-w-[95%] sm:max-w-xl transition-all duration-500 relative backdrop-blur-2xl animate-fade-in-up ${isShaking ? 'animate-shake border-red-500' : isDarkMode ? 'bg-[#1A1A1A]/90 border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]' : 'bg-[#FFFFFF]/95 border-black/5 shadow-[0_20px_60px_rgba(2,119,197,0.1)]'}`}>
                    
                    <div className="flex items-center justify-between mb-8">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-[#41B6E6]/10 border-[#41B6E6]/20' : 'bg-[#0277C5]/10 border-[#0277C5]/20'}`}><span className={`text-[11px] font-black font-mono tracking-widest ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}>{currentQuestion + 1} / {questions.length}</span></div>
                        
                        {quizConfig.level === 'final' && timeLeft !== null && (
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border shadow-sm ${timeLeft < 60 ? 'bg-red-500/10 border-red-500/20 text-red-500 animate-pulse' : (isDarkMode ? 'bg-[#41B6E6]/10 border-[#41B6E6]/20 text-[#41B6E6]' : 'bg-[#0277C5]/10 border-[#0277C5]/20 text-[#0277C5]')}`}>
                                <Timer size={16} />
                                <span className="font-black text-[13px] font-mono">{formatTime(timeLeft)}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-2 px-4 py-2 bg-[#C55002]/10 rounded-2xl border border-[#C55002]/20 shadow-sm"><Flame size={16} className={streak > 0 ? 'text-[#C55002] fill-[#C55002] animate-pulse' : 'text-gray-400 dark:text-gray-600'} /><span className="font-black text-[13px] font-mono text-[#C55002]">{streak}</span></div>
                    </div>
                    
                    <h3 className={`text-[19px] sm:text-2xl font-black mb-8 font-khmer leading-relaxed tracking-tight ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{q.question}</h3>
                    
                    <div className="grid gap-3.5" key={currentQuestion}>
                        {q.options.map((opt, i) => {
                            const isUserChoice = selectedOption === i;
                            const isCorrectChoice = q.correct === i;
                            
                            let btnStyle = isDarkMode ? 'bg-[#121212] border-[#2C2C2C] text-[#E3E3E3]' : 'bg-[#F8F9FA] border-[#E5E7EB] text-[#1A1C1E]';
                            let iconStyle = isDarkMode ? 'bg-[#1E1E1E] border-[#3A3A3C] text-[#A0A0A0]' : 'bg-[#FFFFFF] border-[#D1D5DB] text-[#6B7280] shadow-sm';

                            if (!isAnswered) {
                                btnStyle += isDarkMode ? ' hover:bg-[#1E1E1E] hover:border-[#41B6E6]/50 hover:-translate-y-1 shadow-sm' : ' hover:bg-white hover:border-[#0277C5]/50 hover:-translate-y-1 shadow-sm';
                            } else {
                                if (isCorrectChoice) {
                                    btnStyle = 'bg-green-500/10 border-green-500/30 text-green-600 font-bold';
                                    iconStyle = 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/20';
                                } else if (isUserChoice) {
                                    btnStyle = 'bg-red-500/10 border-red-500/30 text-red-600 font-bold';
                                    iconStyle = 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20';
                                } else {
                                    btnStyle = 'opacity-40 border-transparent grayscale bg-transparent';
                                    iconStyle = 'opacity-40 bg-transparent border-transparent';
                                }
                            }

                            return (
                                <button key={i} disabled={isAnswered} onClick={() => {
                                    setSelectedOption(i); setIsAnswered(true);
                                    const isCorrect = i === q.correct;
                                    if (isCorrect) { setScore(score + 1); setStreak(streak + 1); triggerHaptic('success'); }
                                    else { setStreak(0); setIsShaking(true); triggerHaptic('error'); setTimeout(() => setIsShaking(false), 500); }
                                    setUserAnswers(prev => [...prev, { qId: currentQuestion, selected: i, isCorrect }]);
                                    setTimeout(() => {
                                        if (currentQuestion + 1 < questions.length) { 
                                            setCurrentQuestion(currentQuestion + 1); 
                                            
                                            // 🌟 FIX: Reset the selection and answer status for the NEXT question!
                                            setIsAnswered(false); 
                                            setSelectedOption(null); 
                                        }
                                        else finishQuiz(score + (isCorrect ? 1 : 0));
                                    }, 1000);
                                }} className={`p-4 text-left rounded-[20px] sm:rounded-[24px] border-2 transition-all duration-300 ease-out font-khmer text-[15px] sm:text-[16px] flex items-center group relative overflow-hidden ${btnStyle}`}>
                                    <span className={`w-10 h-10 min-w-[40px] flex items-center justify-center rounded-[12px] mr-4 text-[12px] font-black border transition-all ${iconStyle}`}>{String.fromCharCode(65 + i)}</span>
                                    <span className="flex-1 leading-snug py-1 pr-2">{opt}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    if (gameState === 'result') {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="flex flex-col items-center justify-start min-h-full pt-8 sm:pt-12 px-2 sm:px-6 pb-28 sm:pb-32 w-full">
                <div className={`p-8 sm:p-10 text-center rounded-[32px] sm:rounded-[40px] border shadow-2xl w-full max-w-[95%] sm:max-w-md backdrop-blur-2xl transition-all duration-500 animate-fade-in-up ${isDarkMode ? 'bg-[#1A1A1A]/90 border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]' : 'bg-[#FFFFFF]/95 border-black/5 shadow-[0_20px_60px_rgba(2,119,197,0.1)]'}`}>
                    
                    <div className="relative w-36 h-36 mx-auto mb-8">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 144 144">
                            <circle cx="72" cy="72" r="64" className={isDarkMode ? 'text-[#2C2C2C]' : 'text-[#E5E7EB]'} strokeWidth="16" fill="none" stroke="currentColor" />
                            <circle cx="72" cy="72" r="64" className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} strokeWidth="16" fill="none" strokeDasharray="401.9" strokeDashoffset={401.9 - (401.9 * percentage) / 100} strokeLinecap="round" stroke="currentColor" style={{transition: 'stroke-dashoffset 1.5s ease-out'}} />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                            <span className={`text-[40px] font-black ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{percentage}</span>
                            <span className={`text-[10px] font-black uppercase tracking-widest mt-1.5 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{lang === 'en' ? '% Score' : '% ពិន្ទុ'}</span>
                        </div>
                    </div>
                    
                    <h2 className={`text-[22px] sm:text-2xl font-black font-khmer mb-3 tracking-tight ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                        {percentage >= 80 ? (lang === 'en' ? "Excellent Work!" : "អស្ចារ្យណាស់បង!") : (lang === 'en' ? "Keep Practicing!" : "ព្យាយាមម្តងទៀត!")}
                    </h2>
                    
                    <p className={`font-khmer font-medium text-[15px] mb-10 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                        {lang === 'en' ? `You answered ${score} out of ${questions.length} questions correctly.` : `អ្នកឆ្លើយត្រូវ ${score} ក្នុងចំណោម ${questions.length} សំណួរ។`}
                    </p>
                    
                    <div className="flex flex-col gap-4">
                        <button onClick={() => setGameState('review')} className={`w-full py-4 rounded-[24px] font-black font-khmer border-2 transition-all duration-300 ease-out active:scale-95 ${isDarkMode ? 'border-[#41B6E6]/30 text-[#41B6E6] hover:bg-[#41B6E6]/10' : 'border-[#0277C5]/30 text-[#0277C5] hover:bg-[#0277C5]/10'}`}>
                            {lang === 'en' ? 'Review Answers' : 'មើលចម្លើយឡើងវិញ'}
                        </button>
                        <button onClick={() => setGameState('menu')} className="w-full py-4 rounded-[24px] bg-[#C55002] text-white font-black font-khmer transition-all duration-300 ease-out active:scale-95 shadow-xl hover:shadow-[#C55002]/30 hover:-translate-y-1">
                            {lang === 'en' ? 'Back to Menu' : 'ត្រលប់ទៅកាន់ Menu'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col font-khmer animate-fade-in max-w-[95%] sm:max-w-2xl mx-auto w-full pt-4 sm:pt-8 px-2 sm:px-6 pb-28 sm:pb-32 min-h-full">
            <div className="flex items-center justify-between mb-8 px-2">
                <div className="flex flex-col">
                    <h2 className={`text-[22px] font-black leading-none tracking-tight ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{lang === 'en' ? 'Review' : 'ការត្រួតពិនិត្យ'}</h2>
                    <p className={`text-[10px] font-black uppercase mt-2 tracking-widest ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{lang === 'en' ? 'Review your answers' : 'ពិនិត្យមើលចម្លើយរបស់អ្នកឡើងវិញ'}</p>
                </div>
                <button onClick={() => setGameState('result')} className={`p-3 rounded-2xl shadow-sm border transition-all active:scale-90 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] hover:bg-[#2C2C2C] text-[#A0A0A0]' : 'bg-[#FFFFFF] border-[#E5E7EB] hover:bg-[#F8F9FA] text-[#6B7280]'}`}><XCircle size={22} /></button>
            </div>
            
            <div className="flex-1 space-y-4 px-1">
                {userAnswers.map((ans, idx) => {
                    const qInfo = questions[ans.qId];
                    if (!qInfo) return null;
                    return (
                        <div key={idx} className={`p-6 sm:p-8 rounded-[28px] border shadow-sm transition-all duration-500 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                            <p className={`font-black text-[15px] sm:text-[16px] mb-6 leading-relaxed ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{idx + 1}. {qInfo.question}</p>
                            <div className="grid gap-3">
                                {qInfo.options.map((opt, i) => {
                                    const isCorrect = qInfo.correct === i;
                                    const isSelected = ans.selected === i;
                                    
                                    let style = isDarkMode ? 'text-[#A0A0A0] bg-[#121212] border-[#2C2C2C]' : 'text-[#6B7280] bg-[#F8F9FA] border-[#E5E7EB]';
                                    let iconStyle = 'opacity-30 border-2';
                                    
                                    if (isCorrect) {
                                        style = 'bg-green-500/10 text-green-600 border-green-500/30 font-bold shadow-sm';
                                        iconStyle = 'text-green-500 border-none';
                                    } else if (isSelected) {
                                        style = 'bg-red-500/10 text-red-600 border-red-500/30 font-bold shadow-sm';
                                        iconStyle = 'text-red-500 border-none';
                                    }
                                    
                                    return (
                                        <div key={i} className={`p-4 rounded-[20px] border flex items-center gap-4 text-[14px] sm:text-[15px] transition-all ${style}`}>
                                            <div className="w-5 h-5 flex items-center justify-center shrink-0">
                                                {isCorrect ? <CheckCircle2 size={20} className={iconStyle} /> : isSelected ? <XCircle size={20} className={iconStyle} /> : <div className={`w-4 h-4 rounded-full ${iconStyle}`}/>}
                                            </div>
                                            <span className="flex-1 leading-relaxed">{opt}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Test;