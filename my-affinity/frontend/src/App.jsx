import React, { useState, useEffect } from 'react';
import { ChevronRight, PlayCircle, Sparkles, Zap, Facebook, Send, Globe, BookOpen, Award, Bot } from 'lucide-react';

// 🌟 UPDATED IMPORT PATHS 🌟
import Header from './components/layout/Header';
import ToolsView from './components/features/tools/ToolsView';
import Test from './components/features/quiz/Test';
import ChatBot from './components/features/ai/ChatBot';
import LessonCard from './components/features/learn/LessonCard';
import LessonModal from './components/features/learn/LessonModal'; 

import { lessonsData, TIPS_LIST, TIPS_LIST_EN } from './data/data';
import { useLanguage, LanguageProvider } from './contexts/LanguageContext';

const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
    }
};

const TipsSection = ({ isExpanded, onToggle, isDarkMode }) => {
    const { t, lang } = useLanguage();
    const [tipIndex, setTipIndex] = useState(0);
    const currentTipsList = lang === 'en' ? TIPS_LIST_EN : TIPS_LIST;
  
    const safeTipIndex = tipIndex < currentTipsList.length ? tipIndex : 0;
  
    useEffect(() => { 
        setTipIndex(Math.floor(Math.random() * currentTipsList.length)); 
    }, [lang, currentTipsList.length]);
  
    useEffect(() => {
      if (!isExpanded) return;
      const interval = setInterval(() => { 
          setTipIndex((prev) => (prev + 1) % currentTipsList.length); 
      }, 15000);
      return () => clearInterval(interval);
    }, [isExpanded, currentTipsList.length]);
  
    const nextTip = (e) => { 
        e.stopPropagation(); 
        setTipIndex((prev) => (prev + 1) % currentTipsList.length); 
    };
  
    return (
      <div className="mt-12">
        <button onClick={onToggle} className={`w-full flex items-center justify-between p-6 rounded-3xl border transition-all group active:scale-95 shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] hover:bg-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB] hover:bg-[#F8F9FA]'}`}>
          <div className="flex items-center space-x-5">
              <div className={`p-3 rounded-2xl transition-colors ring-1 ${isDarkMode ? 'bg-[#41B6E6]/10 ring-[#41B6E6]/20 group-hover:bg-[#41B6E6]/20' : 'bg-[#0277C5]/10 ring-[#0277C5]/20 group-hover:bg-[#0277C5]/20'}`}>
                  <PlayCircle className={`w-6 h-6 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`} />
              </div>
              <h3 className={`font-bold text-xl font-khmer tracking-tight ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{t('tips_title')}</h3>
          </div>
          <ChevronRight className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-90' : ''} ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`} />
        </button>
        {isExpanded && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
            <div className={`bg-gradient-to-br border rounded-3xl p-8 md:col-span-2 relative overflow-hidden shadow-xl flex flex-col justify-center min-h-[180px] ${isDarkMode ? 'from-[#1E1E1E] to-[#121212] border-[#2C2C2C]' : 'from-[#FFFFFF] to-[#F8F9FA] border-[#E5E7EB]'}`}>
               <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none ${isDarkMode ? 'bg-[#41B6E6]/10' : 'bg-[#0277C5]/10'}`}></div>
               <div className="flex justify-between items-center mb-6 relative z-10">
                   <h4 className={`font-bold font-khmer flex items-center gap-3 text-lg whitespace-nowrap ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                      <Sparkles className="w-5 h-5 text-[#C5B002]" /> {t('tips_pro')}
                   </h4>
                   <button onClick={nextTip} className={`text-[10px] px-4 py-2 rounded-full font-khmer transition-all font-bold tracking-wide border active:scale-95 whitespace-nowrap ${isDarkMode ? 'bg-[#F1F1F1]/10 hover:bg-[#F1F1F1]/20 text-[#F1F1F1] border-[#F1F1F1]/5' : 'bg-[#1A1A1A]/5 hover:bg-[#1A1A1A]/10 text-[#1A1A1A] border-[#1A1A1A]/5'}`}>{t('tips_new')}</button>
               </div>
               <div className="relative z-10 flex-1 flex items-center">
                   <p key={safeTipIndex} className={`text-base leading-relaxed border-l-4 pl-6 py-2 animate-fade-in-up ${lang === 'km' ? 'font-khmer' : 'font-sans'} ${isDarkMode ? 'text-[#F1F1F1] border-[#41B6E6]' : 'text-[#1A1A1A] border-[#0277C5]'}`}>
                       {currentTipsList[safeTipIndex]}
                   </p>
               </div>
            </div>
            <div className={`border rounded-3xl p-8 md:col-span-2 shadow-lg ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
              <h4 className={`font-bold font-khmer mb-6 flex items-center text-lg ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}><Zap className="w-5 h-5 mr-3 text-[#C5B002]" /> {t('tips_shortcut')}</h4>
              <ul className={`space-y-4 text-sm font-khmer ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                {[1, 2, 3, 4].map((num) => (
                    <li key={num} className={`flex items-start gap-4 p-4 rounded-2xl border transition-colors ${isDarkMode ? 'bg-[#121212]/50 border-[#2C2C2C] hover:bg-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB] hover:bg-[#E5E7EB]/50'}`}>
                        <span className={`font-bold w-8 h-8 flex items-center justify-center rounded-full text-sm shrink-0 ${isDarkMode ? 'bg-[#41B6E6]/10 text-[#41B6E6]' : 'bg-[#0277C5]/10 text-[#0277C5]'}`}>{num}</span>
                        <span><span className={`font-bold block mb-1 ${lang === 'km' ? 'font-khmer' : 'font-sans'} ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{t(`tip_${num}_title`)}</span> <span className={`${lang === 'km' ? 'font-khmer' : 'font-sans'}`} dangerouslySetInnerHTML={{ __html: t(`tip_${num}_desc`) }} /></span>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
};

const ContactSection = ({ isDarkMode }) => {
    const { t } = useLanguage();
    return (
        <div className={`mt-16 mb-10 border-t pt-10 text-center ${isDarkMode ? 'border-[#2C2C2C]' : 'border-[#E5E7EB]'}`}>
            <div className="flex justify-center gap-10">
                <a href="https://web.facebook.com/myaffinity" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className={`p-3 rounded-xl border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}><Facebook className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} size={20} /></div>
                    <span className={`text-[10px] font-khmer ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Facebook</span>
                </a>
                <a href="https://t.me/myaffinity" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className={`p-3 rounded-xl border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}><Send className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} size={20} /></div>
                    <span className={`text-[10px] font-khmer ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Telegram</span>
                </a>
                <a href="https://myaffinity.gumroad.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                      <div className={`p-3 rounded-xl border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}><Globe className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} size={20} /></div>
                    <span className={`text-[10px] font-khmer ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Website</span>
                </a>
            </div>
            <p className={`text-center text-[10px] mt-8 font-khmer uppercase opacity-50 tracking-widest ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{t('footer_copy')}</p>
        </div>
    );
};

function AppContent() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('learn');
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  
  // 🌟 NEW LOCAL STORAGE KEY FOR MY AFFINITY
  const [isDarkMode, setIsDarkMode] = useState(() => {
      if (typeof window !== 'undefined') {
          return localStorage.getItem('myAffinity_theme') === 'dark';
      }
      return true; 
  });

  const [chatMessages, setChatMessages] = useState([]);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
      localStorage.setItem('myAffinity_theme', isDarkMode ? 'dark' : 'light');
      const newBgColor = isDarkMode ? '#0A0A0A' : '#F4F5F7';
      
      let metaTheme = document.querySelector("meta[name='theme-color']");
      if (metaTheme) {
          metaTheme.setAttribute("content", newBgColor);
      }
      
      document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
      document.documentElement.style.backgroundColor = newBgColor;
      document.body.style.backgroundColor = newBgColor;
  }, [isDarkMode]);

  useEffect(() => {
    const handleSwitchTab = (e) => {
        if (e.detail) {
            setActiveTab(e.detail);
            setExpandedLesson(null); 
        }
    };
    window.addEventListener('switchTab', handleSwitchTab);

    const handleFocusIn = (e) => {
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) {
            setIsKeyboardOpen(true);
        }
    };

    const handleFocusOut = () => {
        setIsKeyboardOpen(false);
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
        window.removeEventListener('switchTab', handleSwitchTab);
        document.removeEventListener('focusin', handleFocusIn);
        document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  return (
    <div className={`fixed inset-0 w-full h-full flex flex-col font-khmer overflow-hidden touch-pan-x touch-pan-y transition-colors duration-500 pt-[env(safe-area-inset-top)] ${isDarkMode ? 'bg-[#0A0A0A] text-[#F1F1F1]' : 'bg-[#F4F5F7] text-[#1A1A1A]'}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@100..700&display=swap'); 
        body, html { overscroll-behavior: none; background-color: ${isDarkMode ? '#0A0A0A' : '#F4F5F7'}; transition: background-color 0.5s ease; } 
        .font-khmer { font-family: 'Kantumruy Pro', sans-serif; } 
        .no-scrollbar::-webkit-scrollbar { display: none; } 
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px) scale(0.99); } to { opacity: 1; transform: translateY(0) scale(1); } } 
        .animate-fade-in-up { animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
      
      <Header activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      {/* If you have UpdateNotifier, you can uncomment it below once you move it over */}
      {/* <UpdateNotifier isDarkMode={isDarkMode} /> */}
      
      {expandedLesson && (
        <LessonModal lesson={lessonsData.find(l => l.id === expandedLesson)} onClose={() => setExpandedLesson(null)} isDarkMode={isDarkMode} />
      )}
      
      {activeTab !== 'ai' ? (
        <main className="flex-1 max-w-7xl mx-auto w-full overflow-y-auto custom-scrollbar p-4 md:p-8 relative z-0">
            {activeTab === 'learn' && (
            <div className="space-y-6 pb-24">
                <div className="text-center py-10 mt-6 relative">
                    <div className={`absolute inset-0 blur-[120px] rounded-full pointer-events-none ${isDarkMode ? 'bg-[#41B6E6]/10' : 'bg-[#0277C5]/10'}`} />
                    <h2 className={`text-4xl md:text-6xl font-black mb-6 tracking-tight ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{t('title_main')}</h2>
                    <p className={`max-w-xl mx-auto text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{t('subtitle_main')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {lessonsData.map(l => (
                        <LessonCard key={l.id} lesson={l} onClick={() => setExpandedLesson(l.id)} isDarkMode={isDarkMode} />
                    ))}
                </div>
                <TipsSection isExpanded={expandedSection === 'tips'} onToggle={() => setExpandedSection(expandedSection === 'tips' ? null : 'tips')} isDarkMode={isDarkMode} />
                <ContactSection isDarkMode={isDarkMode} />
            </div>
            )}
            {activeTab === 'tools' && <div className="pb-24"><ToolsView isDarkMode={isDarkMode} /></div>}
            {activeTab === 'quiz' && <Test isDarkMode={isDarkMode} />}
        </main>
      ) : (
        <div className="flex-1 relative w-full h-full md:pb-0 z-0">
             <ChatBot messages={chatMessages} setMessages={setChatMessages} isDarkMode={isDarkMode} />
        </div>
      )}

      {/* AUTO-HIDING MOBILE BOTTOM NAV */}
      <div className={`md:hidden absolute bottom-0 w-full p-4 z-50 pointer-events-none transition-all duration-300 ease-in-out ${isKeyboardOpen ? 'translate-y-32 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <nav className={`pointer-events-auto backdrop-blur-2xl border flex justify-around p-3 pb-safe rounded-[32px] shadow-2xl transition-all duration-500 ${isDarkMode ? 'bg-[#121212]/80 border-white/10 shadow-black/80' : 'bg-white/80 border-black/5 shadow-[#0277C5]/10'}`}>
            {['learn', 'quiz', 'tools', 'ai'].map(t_id => (
                <button key={t_id} onClick={() => { setActiveTab(t_id); triggerHaptic(); }} className={`flex flex-col items-center gap-1 transition-all duration-500 ease-out ${activeTab === t_id ? (isDarkMode ? 'text-[#41B6E6] -translate-y-1.5' : 'text-[#0277C5] -translate-y-1.5') : (isDarkMode ? 'text-[#A0A0A0] hover:text-[#F1F1F1]' : 'text-[#6B7280] hover:text-[#1A1A1A]')}`}>
                    {t_id === 'learn' && <BookOpen size={22} className={activeTab === t_id ? 'drop-shadow-md' : ''}/>}
                    {t_id === 'quiz' && <Award size={22} className={activeTab === t_id ? 'drop-shadow-md' : ''}/>}
                    {t_id === 'tools' && <Zap size={22} className={activeTab === t_id ? 'drop-shadow-md' : ''}/>}
                    {t_id === 'ai' && <Bot size={22} className={activeTab === t_id ? 'drop-shadow-md' : ''}/>}
                    <span className="text-[9px] font-black uppercase tracking-widest">
                        {t(`tab_${t_id}`)}
                    </span>
                </button>
            ))}
          </nav>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}