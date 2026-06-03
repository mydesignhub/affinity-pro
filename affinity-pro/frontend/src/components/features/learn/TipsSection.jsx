import React, { useState, useEffect } from 'react';
import { PlayCircle, ChevronRight, Sparkles, Zap } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { TIPS_LIST, TIPS_LIST_EN } from '../../../data/data';

const TipsSection = ({ isExpanded, onToggle, isDarkMode }) => {
    const { t, lang } = useLanguage();
    const [tipIndex, setTipIndex] = useState(0);
    const currentTipsList = lang === 'en' ? TIPS_LIST_EN : TIPS_LIST;
    
    const safeTipIndex = tipIndex < currentTipsList.length ? tipIndex : 0;
    
    useEffect(() => { setTipIndex(Math.floor(Math.random() * currentTipsList.length)); }, [lang, currentTipsList.length]);
    
    useEffect(() => {
      if (!isExpanded) return;
      const interval = setInterval(() => { setTipIndex((prev) => (prev + 1) % currentTipsList.length); }, 15000);
      return () => clearInterval(interval);
    }, [isExpanded, currentTipsList.length]);
    
    const nextTip = (e) => { e.stopPropagation(); setTipIndex((prev) => (prev + 1) % currentTipsList.length); };
    
    return (
      <div className="mt-12">
        <button onClick={onToggle} className={`w-full flex items-center justify-between p-6 rounded-[24px] border transition-all group active:scale-[0.98] shadow-sm ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C] hover:bg-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB] hover:shadow-md'}`}>
          <div className="flex items-center space-x-5">
              <div className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-colors ring-1 ${isDarkMode ? 'bg-[#41B6E6]/10 ring-[#41B6E6]/20 group-hover:bg-[#41B6E6]/20' : 'bg-[#0277C5]/10 ring-[#0277C5]/20 group-hover:bg-[#0277C5]/20'}`}>
                  <PlayCircle className={`w-6 h-6 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`} />
              </div>
              <h3 className={`font-bold text-[19px] font-khmer tracking-tight ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{t('tips_title')}</h3>
          </div>
          <ChevronRight className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-90' : ''} ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`} />
        </button>
        {isExpanded && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 animate-fade-in-up">
            <div className={`bg-gradient-to-br border rounded-[24px] p-6 sm:p-8 md:col-span-2 relative overflow-hidden shadow-xl flex flex-col justify-center min-h-[180px] ${isDarkMode ? 'from-[#1C1C1E] to-[#121212] border-[#2C2C2C]' : 'from-[#FFFFFF] to-[#F8F9FA] border-[#E5E7EB]'}`}>
               <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none ${isDarkMode ? 'bg-[#41B6E6]/10' : 'bg-[#0277C5]/10'}`}></div>
               <div className="flex justify-between items-center mb-6 relative z-10">
                   <h4 className={`font-bold font-khmer flex items-center gap-3 text-[17px] sm:text-lg whitespace-nowrap ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                      <Sparkles className="w-5 h-5 text-[#C5B002]" /> {t('tips_pro')}
                   </h4>
                   <button onClick={nextTip} className={`text-[11px] px-4 py-2 rounded-full font-khmer transition-all font-bold tracking-wide border active:scale-95 whitespace-nowrap ${isDarkMode ? 'bg-[#F1F1F1]/10 hover:bg-[#F1F1F1]/20 text-[#F1F1F1] border-[#F1F1F1]/5' : 'bg-[#1A1A1A]/5 hover:bg-[#1A1A1A]/10 text-[#1A1A1A] border-[#1A1A1A]/5'}`}>{t('tips_new')}</button>
               </div>
               <div className="relative z-10 flex-1 flex items-center">
                   <p 
                       key={safeTipIndex} 
                       className={`text-[15px] sm:text-base leading-relaxed border-l-[3px] pl-5 sm:pl-6 py-2 animate-fade-in-up ${lang === 'km' ? 'font-khmer' : 'font-sans'} ${isDarkMode ? 'text-[#F1F1F1] border-[#41B6E6]' : 'text-[#1A1A1A] border-[#0277C5]'}`}
                       style={{ fontSize: 'calc(15px * var(--explain-font-scale, 1))' }}
                   >
                       {currentTipsList[safeTipIndex]}
                   </p>
               </div>
            </div>
            <div className={`border rounded-[24px] p-6 sm:p-8 md:col-span-2 shadow-lg ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
              <h4 className={`font-bold font-khmer mb-6 flex items-center text-[17px] sm:text-lg ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}><Zap className="w-5 h-5 mr-3 text-[#C5B002]" /> {t('tips_shortcut')}</h4>
              <ul className={`space-y-3 sm:space-y-4 text-[14px] sm:text-sm font-khmer ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                {[1, 2, 3, 4].map((num) => (
                    <li key={num} className={`flex items-start gap-4 p-4 rounded-[20px] border transition-colors ${isDarkMode ? 'bg-[#121212]/50 border-[#2C2C2C] hover:bg-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB] hover:bg-[#E5E7EB]/50'}`}>
                        <span className={`font-bold w-10 h-10 flex items-center justify-center rounded-full text-sm shrink-0 shadow-inner ${isDarkMode ? 'bg-[#41B6E6]/10 text-[#41B6E6]' : 'bg-[#0277C5]/10 text-[#0277C5]'}`}>{num}</span>
                        <span className="mt-0.5">
                            <span 
                                className={`font-bold block mb-1 ${lang === 'km' ? 'font-khmer' : 'font-sans'} ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}
                                style={{ fontSize: 'calc(14px * var(--explain-font-scale, 1))' }}
                            >
                                {t(`tip_${num}_title`)}
                            </span> 
                            <span 
                                className={`${lang === 'km' ? 'font-khmer' : 'font-sans'} leading-relaxed`} 
                                style={{ fontSize: 'calc(14px * var(--explain-font-scale, 1))' }}
                                dangerouslySetInnerHTML={{ __html: t(`tip_${num}_desc`) }} 
                            />
                        </span>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
};

export default React.memo(TipsSection);
