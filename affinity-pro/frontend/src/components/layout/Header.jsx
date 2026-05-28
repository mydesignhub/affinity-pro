/* eslint-disable */
import React, { useState, useRef } from 'react';
import { Moon, Sun, BookOpen, Award, Zap, Bot, ShieldAlert, Lock, Mail, KeyRound, X, AlertCircle, CheckCircle2, Crown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

// FIREBASE IMPORTS
import { signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; 

const ADMIN_EMAIL = 'koymy.mlk@gmail.com';

export default function Header({ activeTab, setActiveTab, isDarkMode, setIsDarkMode }) {
    const { lang, toggleLanguage, t } = useLanguage();
    
    // Admin States
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [password, setPassword] = useState('');
    const [adminError, setAdminError] = useState('');
    const [adminSuccess, setAdminSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const [isSuperAdminActive, setIsSuperAdminActive] = useState(false);

    const clickCount = useRef(0);
    const clickTimer = useRef(null);

    const isHiddenOnMobile = activeTab === 'ai' || activeTab === 'tools';

    const triggerHaptic = (type = 'light') => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            if (type === 'error') navigator.vibrate([50, 50, 50]);
            else if (type === 'success') navigator.vibrate([30, 50, 30]);
            else navigator.vibrate(10);
        }
    };

    const handleLogoClick = () => {
        triggerHaptic();
        
        // 🛡️ 5-CLICK SECRET SUPER ADMIN TRIGGER 🛡️
        clickCount.current += 1;
        if (clickTimer.current) clearTimeout(clickTimer.current);
        
        if (clickCount.current === 5) {
            triggerHaptic('success');
            setShowAdminModal(true);
            clickCount.current = 0;
        } else {
            clickTimer.current = setTimeout(() => {
                clickCount.current = 0;
            }, 1500); 
        }

        window.dispatchEvent(new CustomEvent('switchTab', { detail: 'learn' }));
    };

    const handleTabClick = (tabId) => {
        triggerHaptic();
        window.dispatchEvent(new CustomEvent('switchTab', { detail: tabId }));
    };

    const handleAdminAuth = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAdminError('');
        setAdminSuccess('');

        if (!password || password.length < 6) {
            setAdminError("Password must be at least 6 characters.");
            setIsLoading(false);
            triggerHaptic('error');
            return;
        }

        try {
            if (isSignUpMode) {
                await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, password);
                triggerHaptic('success');
                setAdminSuccess("Admin Password Initialized Permanently!");
            } else {
                await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
                triggerHaptic('success');
                setAdminSuccess("Granted! You are now Super Admin.");
            }
            
            setTimeout(() => {
                setShowAdminModal(false);
                setPassword('');
                setAdminSuccess('');
                setIsSignUpMode(false);
                setIsSuperAdminActive(true); // Activate the Crown button!
                window.dispatchEvent(new CustomEvent('superAdminUnlocked'));
            }, 1500);

        } catch (error) {
            triggerHaptic('error');
            console.error("Auth Error:", error.code);
            
            if (error.code === 'auth/email-already-in-use') {
                setAdminError("Admin already initialized! Please switch to Login mode.");
                setIsSignUpMode(false);
            } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
                setAdminError("Invalid Admin Password.");
            } else {
                setAdminError("Authentication failed. " + error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async () => {
        setIsLoading(true);
        setAdminError('');
        setAdminSuccess('');
        
        try {
            await sendPasswordResetEmail(auth, ADMIN_EMAIL);
            triggerHaptic('success');
            setAdminSuccess(`Password reset link sent to ${ADMIN_EMAIL}`);
        } catch (error) {
            triggerHaptic('error');
            setAdminError("Failed to send reset email. Initialize account first if you haven't.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <header 
                className={`${isHiddenOnMobile ? 'hidden md:block' : 'block'} w-full relative z-[60] transition-colors duration-500 ease-in-out backdrop-blur-xl shadow-sm ${isDarkMode ? 'bg-[#121212]/85 border-b border-white/5 shadow-black/20' : 'bg-[#FFFFFF]/85 border-b border-black/5 shadow-[#0277C5]/5'}`}
                style={{ 
                    paddingTop: 'calc(env(safe-area-inset-top) + 50px)', 
                    marginTop: '-46px',
                    touchAction: 'none' 
                }} 
            >
                <div className="max-w-7xl mx-auto px-4 pt-1.5 pb-2.5 flex justify-between items-center relative z-10">
                    
                    <div 
                        className="flex items-center gap-3 cursor-pointer group active:scale-95 transition-transform duration-300 ease-spring outline-none" 
                        onPointerDown={handleLogoClick}
                        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                    >
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 relative rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-500 ease-spring group-hover:scale-105 border ${isDarkMode ? 'bg-[#1E1E1E] border-[#3A3A3C] group-hover:border-[#41B6E6]/50' : 'bg-[#FFFFFF] border-[#E5E7EB] group-hover:border-[#0277C5]/40'}`}>
                            <img src="/logo.svg" alt="App Logo" className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex flex-col justify-center pt-0.5">
                            <h1 className={`text-[15px] sm:text-[17px] font-black leading-normal group-hover:text-[#0277C5] transition-colors duration-300 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                                Affinity<span className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}>Pro</span>
                            </h1>
                            <div className="relative flex items-center -mt-0.5">
                                <span className={`text-[10px] font-bold uppercase tracking-widest whitespace-nowrap block transition-colors ${isDarkMode ? 'text-[#A0A0A0] group-hover:text-[#41B6E6]' : 'text-[#6B7280] group-hover:text-[#0277C5]'}`}>
                                    {lang === 'en' ? 'Masterclass' : 'ថ្នាក់រៀនកម្រិតខ្ពស់'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <nav className={`hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-x-1 p-1 rounded-full border shadow-sm transition-colors duration-500 z-10 ${isDarkMode ? 'bg-[#000000]/20 border-[#2C2C2C]' : 'bg-[#F4F5F7] border-[#E5E7EB]'}`}>
                        {['learn', 'quiz', 'tools', 'ai'].map(t_id => (
                            <button 
                                key={t_id} 
                                onClick={() => handleTabClick(t_id)} 
                                className={`px-5 lg:px-6 py-1.5 rounded-full transition-all duration-300 ease-spring active:scale-95 flex items-center gap-2 whitespace-nowrap font-medium text-sm ${activeTab === t_id ? (isDarkMode ? 'bg-[#1E1E1E] text-[#41B6E6] shadow-sm ring-1 ring-[#3A3A3C]' : 'bg-[#FFFFFF] text-[#0277C5] shadow-sm ring-1 ring-[#E5E7EB]') : (isDarkMode ? 'text-[#A0A0A0] hover:text-[#F1F1F1] hover:bg-[#1E1E1E]/50' : 'text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#FFFFFF]/50')}`}
                            >
                                <div className={`transition-transform duration-300 ease-spring ${activeTab === t_id ? 'scale-110' : 'scale-100'}`}>
                                    {t_id === 'learn' && <BookOpen size={15}/>}
                                    {t_id === 'quiz' && <Award size={15}/>}
                                    {t_id === 'tools' && <Zap size={15}/>}
                                    {t_id === 'ai' && <Bot size={15}/>}
                                </div>
                                <span className={`font-khmer font-bold uppercase hidden lg:block tracking-wide text-[12px] transition-opacity duration-300 ${activeTab === t_id ? 'opacity-100' : 'opacity-80'}`}>
                                    {t(`tab_${t_id}`)}
                                </span>
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3 z-10">
                        {isSuperAdminActive && (
                            <button 
                                onClick={(e) => { e.preventDefault(); triggerHaptic(); window.dispatchEvent(new CustomEvent('toggleSuperAdminPanel')); }} 
                                className={`hidden sm:flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl border text-[11px] font-bold font-sans transition-all duration-300 ease-out active:scale-90 shadow-lg bg-gradient-to-r from-[#41B6E6] to-[#0277C5] text-white animate-fade-in-up border-[#41B6E6]/50`}
                                title="Open Super Admin Panel"
                            >
                                <Crown size={14} /> <span className="uppercase tracking-wider mt-[1px]">Admin</span>
                            </button>
                        )}

                        <button 
                            onClick={(e) => { e.preventDefault(); triggerHaptic(); toggleLanguage(); }} 
                            onTouchStart={() => triggerHaptic()}
                            className={`flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl border text-[11px] font-bold font-sans transition-all duration-300 ease-out active:scale-90 ${isDarkMode ? 'bg-[#1E1E1E]/50 border-[#2C2C2C] text-[#A0A0A0] hover:text-[#F1F1F1] hover:bg-[#2C2C2C]' : 'bg-[#FFFFFF]/80 border-[#E5E7EB] text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#F8F9FA]'}`}
                            title="Switch Language"
                        >
                            <span className="font-khmer tracking-wider mt-[1px]">{lang === 'en' ? 'ខ្មែរ' : 'EN'}</span>
                        </button>
                        
                        <button 
                            onClick={(e) => { e.preventDefault(); triggerHaptic(); setIsDarkMode(!isDarkMode); }} 
                            onTouchStart={() => triggerHaptic()}
                            className={`p-2 rounded-xl transition-all duration-300 ease-out active:scale-90 hover:rotate-[15deg] border ${isDarkMode ? 'bg-[#1E1E1E]/50 border-[#2C2C2C] text-[#A0A0A0] hover:text-[#FFD700] hover:bg-[#2C2C2C]' : 'bg-[#FFFFFF]/80 border-[#E5E7EB] text-[#6B7280] hover:text-[#0277C5] hover:bg-[#F8F9FA]'}`}
                            title="Toggle Theme"
                        >
                            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                        </button>
                    </div>
                </div>
            </header>

            {showAdminModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className={`w-full max-w-sm rounded-[32px] p-6 sm:p-8 border shadow-2xl relative overflow-hidden ${isDarkMode ? 'bg-[#121212] border-[#3A3A3C]' : 'bg-white border-[#E5E7EB]'}`}>
                        
                        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20 pointer-events-none ${isDarkMode ? 'bg-[#41B6E6]' : 'bg-[#0277C5]'}`}></div>
                        
                        <button onClick={() => { setShowAdminModal(false); setPassword(''); setAdminError(''); setIsSignUpMode(false); }} className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#2C2C2C] text-[#9AA0A6]' : 'hover:bg-[#F3F4F6] text-[#6B7280]'}`}>
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center mb-6 text-center">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-inner border ${isDarkMode ? 'bg-[#1E1E1E] border-[#3A3A3C] text-[#41B6E6]' : 'bg-[#F8F9FA] border-[#E5E7EB] text-[#0277C5]'}`}>
                                <Lock size={32} />
                            </div>
                            <h2 className={`text-xl font-black font-khmer tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                {isSignUpMode ? 'Initialize Admin' : 'Super Administrator'}
                            </h2>
                            <p className={`text-[13px] mt-1 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                                {isSignUpMode ? 'Create your permanent password.' : 'Full system access required.'}
                            </p>
                        </div>

                        <form onSubmit={handleAdminAuth} className="space-y-4 relative z-10">
                            <div>
                                <div className={`relative flex items-center p-1 rounded-2xl border ${isDarkMode ? 'bg-[#1E1E1E] border-[#3A3A3C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                    <Mail className={`absolute left-4 w-5 h-5 ${isDarkMode ? 'text-[#5F6368]' : 'text-[#9CA3AF]'}`} />
                                    <input 
                                        type="email" 
                                        value={ADMIN_EMAIL} 
                                        disabled
                                        className={`w-full bg-transparent py-3 pl-12 pr-4 outline-none font-bold text-[13px] opacity-50 cursor-not-allowed ${isDarkMode ? 'text-white' : 'text-black'}`}
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <div className={`relative flex items-center p-1 rounded-2xl border transition-colors ${isDarkMode ? 'bg-[#1E1E1E] border-[#3A3A3C] focus-within:border-[#41B6E6]' : 'bg-[#F8F9FA] border-[#E5E7EB] focus-within:border-[#0277C5]'}`}>
                                    <KeyRound className={`absolute left-4 w-5 h-5 ${isDarkMode ? 'text-[#9AA0A6]' : 'text-[#6B7280]'}`} />
                                    <input 
                                        type="password" 
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setAdminError(''); }}
                                        placeholder={isSignUpMode ? "Create New Password" : "Enter Password"}
                                        autoFocus
                                        className={`w-full bg-transparent py-3 pl-12 pr-4 outline-none font-bold tracking-widest text-[14px] ${isDarkMode ? 'text-white' : 'text-black'}`}
                                    />
                                </div>
                            </div>

                            {adminError && (
                                <p className="text-red-500 text-[12px] font-bold flex items-center gap-1.5 animate-pop-in-center">
                                    <AlertCircle size={14} /> {adminError}
                                </p>
                            )}
                            
                            {adminSuccess && (
                                <p className="text-green-500 text-[12px] font-bold flex items-center gap-1.5 animate-pop-in-center">
                                    <CheckCircle2 size={14} /> {adminSuccess}
                                </p>
                            )}

                            <button 
                                type="submit" 
                                disabled={isLoading || !password}
                                className={`w-full py-3.5 rounded-xl font-black text-[14px] flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] ${isLoading || !password ? 'opacity-50 cursor-not-allowed' : ''} ${isDarkMode ? 'bg-[#41B6E6] text-[#121212] hover:bg-[#329DCA]' : 'bg-[#0277C5] text-white hover:bg-[#01579B]'}`}
                            >
                                {isLoading ? 'Processing...' : (isSignUpMode ? 'Save Permanent Password' : 'Unlock System')}
                            </button>
                        </form>

                        <div className="mt-6 pt-4 border-t text-center relative z-10 flex flex-col gap-3" style={{ borderColor: isDarkMode ? '#2C2C2C' : '#E5E7EB' }}>
                            <button 
                                type="button"
                                onClick={() => { setIsSignUpMode(!isSignUpMode); setAdminError(''); setAdminSuccess(''); }}
                                className={`text-[12px] font-bold transition-colors ${isDarkMode ? 'text-[#41B6E6] hover:text-[#F1F1F1]' : 'text-[#0277C5] hover:text-[#1A1A1A]'}`}
                            >
                                {isSignUpMode ? "Already have a password? Login" : "First Time? Initialize Admin Password"}
                            </button>
                            
                            {!isSignUpMode && (
                                <button 
                                    type="button"
                                    onClick={handleResetPassword}
                                    disabled={isLoading}
                                    className={`text-[12px] font-bold transition-colors ${isDarkMode ? 'text-[#9AA0A6] hover:text-[#F1F1F1]' : 'text-[#6B7280] hover:text-[#1A1A1A]'}`}
                                >
                                    Send Password Reset Link
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}