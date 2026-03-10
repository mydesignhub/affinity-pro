import React from 'react';
import { Moon, Sun, BookOpen, Award, Zap, Bot, Trash2 } from 'lucide-react';
// Notice the updated path below!
import { useLanguage } from '../../contexts/LanguageContext';

export default function Header({ activeTab, setActiveTab, isDarkMode, setIsDarkMode }) {
    const { lang, toggleLanguage, t } = useLanguage();

    const triggerHaptic = () => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
    };

    const handleTabClick = (tabId) => {
        triggerHaptic();
        setActiveTab(tabId);
        window.dispatchEvent(new CustomEvent('switchTab', { detail: tabId }));
    };

    const handleClearChat = () => {
        triggerHaptic();
        window.dispatchEvent(new CustomEvent('clearAiChat'));
    };

    return (
        <header className={`sticky top-0 z-40 backdrop-blur-2xl border-b transition-colors duration-500 shadow-sm ${isDarkMode ? 'bg-[#121212]/90 border-[#2C2C2C]' : 'bg-[#FFFFFF]/90 border-[#E5E7EB]'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    
                    <div className="flex items-center gap-3 sm:gap-4 cursor-pointer group" onClick={() => handleTabClick('learn')}>
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] flex items-center justify-center overflow-hidden shadow-md border transition-all duration-300 group-active:scale-95 group-hover:scale-105 ${isDarkMode ? 'bg-[#1E1E1E] border-[#3A3A3C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            <img src="/logo.svg" alt="App Logo" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h1 className={`text-[17px] sm:text-[20px] font-black tracking-tight leading-none mb-0.5 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                                My<span className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}>Affinity</span>
                            </h1>
                            <p className={`text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                                {lang === 'en' ? 'Masterclass' : 'ថ្នាក់រៀនកម្រិតខ្ពស់'}
                            </p>
                        </div>
                    </div>

                    <nav className={`hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl border shadow-inner ${isDarkMode ? 'bg-[#000000]/20 border-[#2C2C2C]' : 'bg-[#F4F5F7] border-[#E5E7EB]'}`}>
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

                    <div className="flex items-center gap-2 sm:gap-3">
                        {activeTab === 'ai' && (
                            <button onClick={handleClearChat} className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all active:scale-90 border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E]/50 border-[#2C2C2C] text-red-400 hover:text-red-500 hover:bg-red-500/10' : 'bg-[#F8F9FA]/80 border-[#E5E7EB] text-red-500 hover:bg-red-500/10'}`} title={t('clear_tooltip')}>
                                <Trash2 size={18} />
                            </button>
                        )}
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
    );
}