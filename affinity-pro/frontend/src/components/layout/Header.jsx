/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, BookOpen, Award, Zap, ShieldAlert, Lock, Mail, KeyRound, X, AlertCircle, CheckCircle2, Crown, Triangle, Menu, Globe, Type, Minus, Plus, Info } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

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

const BotAvatar = ({ size = 16, className = '', ariaLabel = 'AI assistant' }) => (
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

// FIREBASE IMPORTS
import { signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; 

const ADMIN_EMAIL = 'koymy.mlk@gmail.com';

export default function Header({ activeTab, setActiveTab, isDarkMode, setIsDarkMode, appFontScale, setAppFontScale, onOpenDashboard }) {
    const { lang, setLang, toggleLanguage, t } = useLanguage();
    
    // Admin States
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [password, setPassword] = useState('');
    const [adminError, setAdminError] = useState('');
    const [adminSuccess, setAdminSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const [isSuperAdminActive, setIsSuperAdminActive] = useState(false);

    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const optionsRef = useRef(null);
    const clickCount = useRef(0);
    const clickTimer = useRef(null);

    const isHiddenOnMobile = activeTab === 'ai' || activeTab === 'tools';

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (optionsRef.current && !optionsRef.current.contains(e.target)) {
                setIsOptionsOpen(false);
            }
        };
        if (isOptionsOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOptionsOpen]);

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
                className={`${isHiddenOnMobile ? 'hidden md:block' : 'block'} w-full relative z-[60] transition-colors duration-500 ease-in-out backdrop-blur-xl shadow-sm ${isDarkMode ? 'bg-[#121212]/85 shadow-black/20' : 'bg-[#FFFFFF]/85 shadow-[#0277C5]/5'}`}
                style={{ 
                    paddingTop: 'calc(env(safe-area-inset-top) + 40px)',
                    marginTop: '-40px',
                    touchAction: 'none' 
                }} 
            >
                <div className={`max-w-7xl mx-auto px-4 py-2 md:py-3 flex justify-between md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-4 relative z-10`}>
                    
                    <div 
                        className="flex items-center gap-3 cursor-pointer group active:scale-95 transition-transform duration-300 ease-spring outline-none" 
                        onPointerDown={handleLogoClick}
                        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                    >
                        <div className={`w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] relative rounded-[12px] sm:rounded-[14px] overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-500 ease-spring group-hover:scale-105 border flex items-center justify-center ${isDarkMode ? 'bg-[#1E1E1E] border-[#3A3A3C] group-hover:border-[#41B6E6]/50' : 'bg-[#FFFFFF] border-[#E5E7EB] group-hover:border-[#0277C5]/40'}`}>
                            <img src="/logo.svg" alt="App Logo" className="w-6 h-6 object-contain" />
                        </div>
                        
                        <div className="flex flex-col justify-center pt-0.5">
                            <h1 className={`text-[15px] sm:text-[17px] font-black leading-none group-hover:text-[#0277C5] transition-colors duration-300 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                                Affinity<span className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}>Pro</span>
                            </h1>
                            <div className="relative flex items-center h-[16px] overflow-hidden mt-0.5">
                                <span className={`text-[9px] font-bold uppercase tracking-widest whitespace-nowrap block transition-colors ${isDarkMode ? 'text-[#A0A0A0] group-hover:text-[#41B6E6]' : 'text-[#6B7280] group-hover:text-[#0277C5]'}`}>
                                    {lang === 'en' ? 'Masterclass' : 'ថ្នាក់រៀនកម្រិតខ្ពស់'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <nav className={`hidden md:flex justify-center space-x-1 p-1 rounded-full border shadow-sm transition-colors duration-500 z-10 ${isDarkMode ? 'bg-[#000000]/20 border-[#2C2C2C]' : 'bg-[#F4F5F7] border-[#E5E7EB]'}`}>
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
                                    {t_id === 'ai' && <BotAvatar size={15}/>}
                                </div>
                                <span className={`font-khmer font-bold uppercase hidden lg:block tracking-wide text-[12px] transition-opacity duration-300 ${activeTab === t_id ? 'opacity-100' : 'opacity-80'}`}>
                                    {t(`tab_${t_id}`)}
                                </span>
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center justify-end gap-2 sm:gap-3 z-10" ref={optionsRef}>
                        {isSuperAdminActive && (
                            <button 
                                onClick={(e) => { e.preventDefault(); triggerHaptic(); window.dispatchEvent(new CustomEvent('toggleSuperAdminPanel')); }} 
                                className={`hidden sm:flex items-center justify-center gap-1 h-[36px] sm:h-[40px] px-3 sm:px-4 rounded-[12px] sm:rounded-[14px] border text-[11px] font-bold font-sans transition-all duration-300 ease-out active:scale-90 shadow-lg bg-gradient-to-r from-[#41B6E6] to-[#0277C5] text-white animate-fade-in-up border-[#41B6E6]/50`}
                                title="Open Super Admin Panel"
                            >
                                <Crown size={14} /> <span className="uppercase tracking-wider mt-[1px]">Admin</span>
                            </button>
                        )}

                        <button 
                            onClick={(e) => { e.preventDefault(); triggerHaptic(); setIsOptionsOpen(!isOptionsOpen); }} 
                            onTouchStart={() => triggerHaptic()}
                            className={`w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] flex items-center justify-center rounded-[12px] sm:rounded-[14px] transition-all duration-300 ease-out active:scale-90 border ${isDarkMode ? 'bg-[#1E1E1E]/50 border-[#2C2C2C] text-[#A0A0A0] hover:text-[#F1F1F1] hover:bg-[#2C2C2C]' : 'bg-[#FFFFFF]/80 border-[#E5E7EB] text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#F8F9FA]'}`}
                            title="Options"
                        >
                            <div className={`transition-transform duration-300 ${isOptionsOpen ? 'rotate-90 scale-0 opacity-0 hidden' : 'rotate-0 scale-100 opacity-100 block'}`}>
                                <Menu size={18} />
                            </div>
                            <div className={`transition-transform duration-300 ${isOptionsOpen ? 'rotate-0 scale-100 opacity-100 block' : '-rotate-90 scale-0 opacity-0 hidden'}`}>
                                <X size={18} />
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        <div className={`absolute top-[calc(100%+10px)] right-4 w-64 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-300 transform origin-top-right overflow-hidden ${isOptionsOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'} ${isDarkMode ? 'bg-[#121212]/95 border-[#2C2C2C]' : 'bg-[#FFFFFF]/95 border-[#E5E7EB]'}`}>
                            <div className="p-2 space-y-1">
                                {/* Language Segmented Control */}
                                <div className={`w-full flex flex-col px-4 py-3 rounded-xl ${isDarkMode ? 'hover:bg-[#1E1E1E]' : 'hover:bg-[#F8F9FA]'}`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <Globe size={18} className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} />
                                            <span className={`text-sm font-medium ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{lang === 'en' ? 'Language' : 'ភាសា'}</span>
                                        </div>
                                    </div>
                                    <div className={`flex items-center p-1 rounded-lg border ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F4F5F7] border-[#E5E7EB]'}`}>
                                        <button 
                                            onClick={(e) => { e.preventDefault(); triggerHaptic(); setLang('en'); }}
                                            className={`flex-1 py-2 text-xs font-bold font-sans rounded-md transition-all duration-300 ${lang === 'en' ? (isDarkMode ? 'bg-[#2C2C2C] text-[#41B6E6] shadow-sm' : 'bg-white text-[#0277C5] shadow-sm') : (isDarkMode ? 'text-[#A0A0A0] hover:text-[#F1F1F1]' : 'text-[#6B7280] hover:text-[#1A1A1A]')}`}
                                        >
                                            English
                                        </button>
                                        <button 
                                            onClick={(e) => { e.preventDefault(); triggerHaptic(); setLang('km'); }}
                                            className={`flex-1 py-2 text-xs font-bold font-khmer rounded-md transition-all duration-300 ${lang === 'km' ? (isDarkMode ? 'bg-[#2C2C2C] text-[#41B6E6] shadow-sm' : 'bg-white text-[#0277C5] shadow-sm') : (isDarkMode ? 'text-[#A0A0A0] hover:text-[#F1F1F1]' : 'text-[#6B7280] hover:text-[#1A1A1A]')}`}
                                        >
                                            ខ្មែរ
                                        </button>
                                    </div>
                                </div>

                                {/* Theme */}
                                <button 
                                    onClick={(e) => { e.preventDefault(); triggerHaptic(); setIsDarkMode(!isDarkMode); }}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-[#1E1E1E]' : 'hover:bg-[#F8F9FA]'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        {isDarkMode ? <Moon size={18} className="text-[#41B6E6]" /> : <Sun size={18} className="text-[#0277C5]" />}
                                        <span className={`text-sm font-medium ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{lang === 'en' ? 'Theme' : 'រូបរាង'}</span>
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded border ${isDarkMode ? 'bg-[#2C2C2C] border-[#3A3A3C] text-[#F1F1F1]' : 'bg-[#F4F5F7] border-[#E5E7EB] text-[#1A1A1A]'}`}>
                                        {isDarkMode ? (lang === 'en' ? 'Dark' : 'ងងឹត') : (lang === 'en' ? 'Light' : 'ភ្លឺ')}
                                    </span>
                                </button>

                                <div className={`h-[1px] w-full my-1 ${isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#E5E7EB]'}`} />

                                {/* Font Size */}
                                <div className={`w-full flex flex-col px-4 py-3 rounded-xl ${isDarkMode ? 'hover:bg-[#1E1E1E]' : 'hover:bg-[#F8F9FA]'}`}>
                                    <div className="flex items-center gap-3 mb-3">
                                        <Type size={18} className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} />
                                        <span className={`text-sm font-medium ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{lang === 'en' ? 'Text Size' : 'ទំហំអក្សរ'}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => { triggerHaptic(); setAppFontScale(Math.max(80, appFontScale - 10)); }}
                                            className={`p-1.5 rounded-lg border active:scale-90 transition-transform ${isDarkMode ? 'border-[#3A3A3C] text-[#A0A0A0] hover:text-[#F1F1F1]' : 'border-[#E5E7EB] text-[#6B7280] hover:text-[#1A1A1A]'}`}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <div className="flex-1 h-1.5 bg-[#E5E7EB] dark:bg-[#2C2C2C] rounded-full overflow-hidden relative">
                                            <div 
                                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0277C5] to-[#41B6E6] transition-all duration-300"
                                                style={{ width: `${((appFontScale - 80) / 50) * 100}%` }}
                                            />
                                        </div>
                                        <button 
                                            onClick={() => { triggerHaptic(); setAppFontScale(Math.min(130, appFontScale + 10)); }}
                                            className={`p-1.5 rounded-lg border active:scale-90 transition-transform ${isDarkMode ? 'border-[#3A3A3C] text-[#A0A0A0] hover:text-[#F1F1F1]' : 'border-[#E5E7EB] text-[#6B7280] hover:text-[#1A1A1A]'}`}
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <div className="flex justify-center mt-2">
                                        <span className={`text-[10px] font-mono font-bold ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{appFontScale}%</span>
                                    </div>
                                </div>

                                <div className={`h-[1px] w-full my-1 ${isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#E5E7EB]'}`} />

                                {/* About / Terms */}
                                <button 
                                    onClick={(e) => { e.preventDefault(); triggerHaptic(); setIsOptionsOpen(false); window.dispatchEvent(new CustomEvent('openAboutModal')); }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-[#1E1E1E] text-[#A0A0A0] hover:text-[#F1F1F1]' : 'hover:bg-[#F8F9FA] text-[#6B7280] hover:text-[#1A1A1A]'}`}
                                >
                                    <Info size={18} />
                                    <span className="text-sm font-medium font-khmer">{lang === 'en' ? 'About & Terms' : 'អំពី និង លក្ខខណ្ឌ'}</span>
                                </button>
                            </div>
                        </div>
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

                        <div className="mt-6 pt-4 text-center relative z-10 flex flex-col gap-3" style={{ borderColor: isDarkMode ? '#2C2C2C' : '#E5E7EB' }}>
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