import React, { useState, useRef } from 'react';
import { Moon, Sun, BookOpen, Award, Zap, Bot, Trash2, Lock, Mail, KeyRound, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

// FIREBASE IMPORTS
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';

const ADMIN_EMAIL = 'koymy.mlk@gmail.com';

export default function Header({ activeTab, setActiveTab, isDarkMode, setIsDarkMode }) {
    const { lang, toggleLanguage, t } = useLanguage();
    
    // Admin States
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [password, setPassword] = useState('');
    const [adminError, setAdminError] = useState('');
    const [adminSuccess, setAdminSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const clickCount = useRef(0);
    const clickTimer = useRef(null);

    const triggerHaptic = (type = 'light') => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            if (type === 'error') navigator.vibrate([50, 50, 50]);
            else if (type === 'success') navigator.vibrate([30, 50, 30]);
            else navigator.vibrate(10);
        }
    };

    const handleLogoClick = () => {
        triggerHaptic();
        
        // 🛡️ 5-CLICK SECRET ADMIN TRIGGER 🛡️
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

        // Normal Behavior
        setActiveTab('learn');
        window.dispatchEvent(new CustomEvent('switchTab', { detail: 'learn' }));
    };

    const handleClearChat = () => {
        triggerHaptic();
        window.dispatchEvent(new CustomEvent('clearAiChat'));
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAdminError('');
        setAdminSuccess('');

        if (!password) {
            setAdminError("Password is required.");
            setIsLoading(false);
            triggerHaptic('error');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
            triggerHaptic('success');
            setAdminSuccess("Admin Access Granted.");
            setTimeout(() => {
                setShowAdminModal(false);
                setPassword('');
                setAdminSuccess('');
                // Dispatch event to app to set global admin state if needed
                window.dispatchEvent(new CustomEvent('adminUnlocked'));
            }, 1000);
        } catch (error) {
            triggerHaptic('error');
            setAdminError("Invalid credentials or unauthorized access.");
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
            setAdminError("Failed to send reset email. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <header className={`sticky top-0 z-40 backdrop-blur-2xl border-b transition-colors duration-500 shadow-sm ${isDarkMode ? 'bg-[#121212]/90 border-[#2C2C2C]' : 'bg-[#FFFFFF]/90 border-[#E5E7EB]'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
                        
                        <div className="flex items-center gap-3 sm:gap-4 cursor-pointer group min-w-0" onClick={handleLogoClick}>
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-[14px] flex items-center justify-center overflow-hidden shadow-md border transition-all duration-300 group-active:scale-95 group-hover:scale-105 ${isDarkMode ? 'bg-[#1E1E1E] border-[#3A3A3C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                <img src="/logo.svg" alt="App Logo" className="w-full h-full object-cover pointer-events-none" />
                            </div>
                            <div className="flex flex-col justify-center min-w-0 select-none">
                                <h1 className={`text-[17px] sm:text-[20px] font-black tracking-tight leading-none mb-0.5 truncate ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                                    My<span className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}>Affinity</span>
                                </h1>
                                <p className={`text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] truncate ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                                    {lang === 'en' ? 'Masterclass' : 'ថ្នាក់រៀនកម្រិតខ្ពស់'}
                                </p>
                            </div>
                        </div>

                        <nav className={`hidden md:flex items-center gap-1.5 p-1.5 shrink-0 rounded-2xl border shadow-inner ${isDarkMode ? 'bg-[#000000]/20 border-[#2C2C2C]' : 'bg-[#F4F5F7] border-[#E5E7EB]'}`}>
                            {['learn', 'quiz', 'tools', 'ai'].map(t_id => (
                                <button key={t_id} onClick={() => handleTabClick(t_id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-khmer font-bold text-sm transition-all duration-300 ${activeTab === t_id ? (isDarkMode ? 'bg-[#1E1E1E] text-[#41B6E6] shadow-sm border border-[#3A3A3C]' : 'bg-[#FFFFFF] text-[#0277C5] shadow-sm border border-[#E5E7EB]') : (isDarkMode ? 'text-[#A0A0A0] hover:text-[#F1F1F1] hover:bg-[#1E1E1E]/50' : 'text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#FFFFFF]/50')}`}>
                                    {t_id === 'learn' && <BookOpen size={16} />}
                                    {t_id === 'quiz' && <Award size={16} />}
                                    {t_id === 'tools' && <Zap size={16} />}
                                    {t_id === 'ai' && <Bot size={16} />}
                                    {t(`tab_${t_id}`)}
                                </button>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                            <button onClick={(e) => { e.preventDefault(); triggerHaptic(); toggleLanguage(); }} className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs transition-all active:scale-90 border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] text-[#F1F1F1] hover:bg-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#1A1A1A] hover:bg-[#F8F9FA]'}`} title="Switch Language">
                                {lang === 'en' ? 'ខ្មែរ' : 'EN'}
                            </button>
                            <button onClick={(e) => { e.preventDefault(); triggerHaptic(); setIsDarkMode(!isDarkMode); }} className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all active:scale-90 border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] text-[#F1F1F1] hover:bg-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB] text-[#1A1A1A] hover:bg-[#F8F9FA]'}`} title="Toggle Theme">
                                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                        </div>
                        
                    </div>
                </div>
            </header>

            {/* 🛡️ ADMIN AUTHENTICATION MODAL 🛡️ */}
            {showAdminModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className={`w-full max-w-sm rounded-[32px] p-6 sm:p-8 border shadow-2xl relative overflow-hidden ${isDarkMode ? 'bg-[#121212] border-[#3A3A3C]' : 'bg-white border-[#E5E7EB]'}`}>
                        
                        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20 pointer-events-none ${isDarkMode ? 'bg-[#41B6E6]' : 'bg-[#0277C5]'}`}></div>
                        
                        <button onClick={() => { setShowAdminModal(false); setPassword(''); setAdminError(''); }} className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#2C2C2C] text-[#9AA0A6]' : 'hover:bg-[#F3F4F6] text-[#6B7280]'}`}>
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center mb-6 text-center">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-inner border ${isDarkMode ? 'bg-[#1E1E1E] border-[#3A3A3C] text-[#41B6E6]' : 'bg-[#F8F9FA] border-[#E5E7EB] text-[#0277C5]'}`}>
                                <Lock size={32} />
                            </div>
                            <h2 className={`text-xl font-black font-khmer tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>System Administrator</h2>
                            <p className={`text-[13px] mt-1 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Authorized personnel only.</p>
                        </div>

                        <form onSubmit={handleAdminLogin} className="space-y-4 relative z-10">
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
                                        placeholder="Admin Password"
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
                                {isLoading ? 'Verifying...' : 'Unlock System'}
                            </button>
                        </form>

                        <div className="mt-6 pt-4 border-t text-center relative z-10" style={{ borderColor: isDarkMode ? '#2C2C2C' : '#E5E7EB' }}>
                            <button 
                                onClick={handleResetPassword}
                                disabled={isLoading}
                                className={`text-[12px] font-bold transition-colors ${isDarkMode ? 'text-[#9AA0A6] hover:text-[#F1F1F1]' : 'text-[#6B7280] hover:text-[#1A1A1A]'}`}
                            >
                                Send Password Reset Link
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}