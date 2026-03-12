import React, { useState, useEffect } from 'react';
import { ChevronRight, PlayCircle, Sparkles, Zap, Facebook, Send, Globe, BookOpen, Award, Bot, Camera, PenTool, Book } from 'lucide-react';

import Header from './components/layout/Header';
import ToolsView from './components/features/tools/ToolsView';
import Test from './components/features/quiz/Test';
import ChatBot from './components/features/ai/ChatBot';
import LessonCard from './components/features/learn/LessonCard';
import LessonModal from './components/features/learn/LessonModal'; 

// 🌟 IMPORTING THE NEW COURSE DATA 🌟
import { courseData, TIPS_LIST, TIPS_LIST_EN } from './data/data';
import { useLanguage, LanguageProvider } from './contexts/LanguageContext';

// ... (Keep triggerHaptic, TipsSection, and ContactSection exactly as they were) ...
const triggerHaptic = () => { if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10); };

// ... [TipsSection Code Here] ...
// ... [ContactSection Code Here] ...

function AppContent() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('learn');
  
  // 🌟 NEW STATE: Tracks which Affinity App is selected in the Learn Tab
  const [activeAppTab, setActiveAppTab] = useState('photo'); 
  
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
      if (typeof window !== 'undefined') return localStorage.getItem('myAffinity_theme') === 'dark';
      return true; 
  });

  const [chatMessages, setChatMessages] = useState([]);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
      localStorage.setItem('myAffinity_theme', isDarkMode ? 'dark' : 'light');
      const newBgColor = isDarkMode ? '#0A0A0A' : '#F4F5F7';
      let metaTheme = document.querySelector("meta[name='theme-color']");
      if (metaTheme) metaTheme.setAttribute("content", newBgColor);
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
        if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) setIsKeyboardOpen(true);
    };
    const handleFocusOut = () => setIsKeyboardOpen(false);

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
        window.removeEventListener('switchTab', handleSwitchTab);
        document.removeEventListener('focusin', handleFocusIn);
        document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  // 🌟 Find the correct lesson data to pass to the modal across all 3 apps
  const getSelectedLesson = () => {
      if (!expandedLesson) return null;
      return courseData[activeAppTab].find(l => l.id === expandedLesson);
  };

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
      
      {activeTab !== 'tools' && activeTab !== 'ai' && (
          <Header activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      )}
      
      {expandedLesson && (
        <LessonModal lesson={getSelectedLesson()} onClose={() => setExpandedLesson(null)} isDarkMode={isDarkMode} />
      )}
      
      {activeTab !== 'ai' ? (
        <main className="flex-1 max-w-7xl mx-auto w-full overflow-y-auto custom-scrollbar p-4 md:p-8 relative z-0">
            {activeTab === 'learn' && (
            <div className="space-y-6 pb-24">
                <div className="text-center py-6 mt-2 relative">
                    <div className={`absolute inset-0 blur-[120px] rounded-full pointer-events-none ${isDarkMode ? 'bg-[#41B6E6]/10' : 'bg-[#0277C5]/10'}`} />
                    <h2 className={`text-3xl md:text-5xl font-black mb-4 tracking-tight ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>iPad Masterclass</h2>
                    <p className={`max-w-xl mx-auto text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Select an app to begin your professional training.</p>
                </div>

                {/* 🌟 THE 3-WAY APP TOGGLE BUTTONS 🌟 */}
                <div className={`flex justify-center p-1.5 rounded-2xl mx-auto max-w-md border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
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

                {/* 🌟 RENDER THE SPECIFIC 10 LESSONS FOR THE SELECTED APP 🌟 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
                    {courseData[activeAppTab].map(l => (
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