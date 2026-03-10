import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
    }
};

export default function LessonCard({ lesson, onClick, isDarkMode }) {
  const { lang } = useLanguage();
  
  const displayTitle = lang === 'en' && lesson.title_en ? lesson.title_en : lesson.title;
  const displayDescription = lang === 'en' && lesson.description_en ? lesson.description_en : lesson.description;

  return (
    <button 
        onClick={(e) => { triggerHaptic(); if (onClick) onClick(e); }} 
        className={`rounded-[28px] p-6 overflow-hidden border transition-all duration-500 ease-out hover:-translate-y-1.5 active:scale-[0.98] cursor-pointer w-full text-left relative shadow-sm hover:shadow-2xl group outline-none ${isDarkMode ? 'bg-[#1A1A1A]/80 backdrop-blur-md border-white/5 hover:border-[#41B6E6]/40 shadow-black/40' : 'bg-white/90 backdrop-blur-md border-black/5 hover:border-[#0277C5]/30 shadow-[#0277C5]/5'}`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-[18px] flex flex-shrink-0 items-center justify-center shadow-inner transition-transform duration-500 ease-out group-hover:scale-110 ${isDarkMode ? 'bg-[#41B6E6]/10 text-[#41B6E6]' : 'bg-[#0277C5]/10 text-[#0277C5]'}`}>
            {lesson.icon}
        </div>
        <h3 className={`flex-1 font-bold text-lg font-khmer transition-colors pr-6 sm:pr-8 break-words ${lang === 'km' ? 'leading-normal' : 'leading-tight'} ${isDarkMode ? 'text-[#F1F1F1] group-hover:text-[#41B6E6]' : 'text-[#1A1A1A] group-hover:text-[#0277C5]'}`}>
            {displayTitle}
        </h3>
      </div>
      
      <p className={`text-[13px] sm:text-sm font-khmer line-clamp-2 leading-relaxed ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
        {displayDescription}
      </p>

      <div className={`absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 shadow-md ${isDarkMode ? 'bg-[#2C2C2C] text-[#41B6E6]' : 'bg-[#F8F9FA] text-[#0277C5]'}`}>
         <ArrowRight className="w-4 h-4" />
      </div>
    </button>
  );
}