import React, { useState, useEffect, useRef } from 'react';
import { XCircle } from 'lucide-react';
import LessonItem from './LessonItem';
import { useLanguage } from '../../../contexts/LanguageContext';

const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
    }
};

export default function LessonModal({ lesson, onClose, isDarkMode }) {
    const { lang } = useLanguage();
    const [closing, setClosing] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const [expandedItem, setExpandedItem] = useState(null);
    const modalRef = useRef(null);
    const dragStartY = useRef(null);
  
    const displayTitle = lang === 'en' && lesson.title_en ? lesson.title_en : lesson.title;

    useEffect(() => { 
        document.body.style.overflow = 'hidden'; 
        return () => { document.body.style.overflow = ''; }; 
    }, []);

    const handleClose = () => { 
        triggerHaptic();
        setClosing(true); 
        setTimeout(onClose, 400); 
    };
  
    useEffect(() => {
        if (expandedItem !== null) {
            setTimeout(() => {
                const el = document.getElementById(`lesson-item-${expandedItem}`);
                if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            }, 250); // Smooth scroll timing
        }
    }, [expandedItem]);
  
    const onTouchStart = (e) => {
      const scrollTop = modalRef.current?.querySelector('.scroll-content')?.scrollTop || 0;
      if (scrollTop <= 0) { dragStartY.current = e.touches[0].clientY; }
    };
    const onTouchMove = (e) => {
      if (dragStartY.current === null) return;
      const deltaY = e.touches[0].clientY - dragStartY.current;
      if (deltaY > 0) { setDragOffset(deltaY); if (e.cancelable && deltaY > 10) e.preventDefault(); }
    };
    const onTouchEnd = () => { 
        if (dragOffset > 150) { handleClose(); } 
        else { setDragOffset(0); } 
        dragStartY.current = null; 
    };
    const opacity = 1 - (dragOffset / 500); 
  
    return (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6">
            {/* 🌟 Premium Blurred Backdrop 🌟 */}
            <div 
                className={`absolute inset-0 backdrop-blur-md transition-opacity duration-500 ease-out ${closing ? 'opacity-0' : 'opacity-100'} ${isDarkMode ? 'bg-black/70' : 'bg-black/30'}`} 
                style={{ opacity: Math.max(0, opacity) }} 
                onClick={handleClose} 
            />
            
            {/* 🌟 Glassmorphism Modal Container (Touching Status Bar) 🌟 */}
            <div 
                ref={modalRef} 
                className={`relative w-full max-w-3xl rounded-t-[28px] sm:rounded-[32px] shadow-2xl flex flex-col h-[calc(100dvh-env(safe-area-inset-top,0px))] sm:h-auto sm:max-h-[90vh] transition-transform duration-500 ease-spring border-t sm:border ${isDarkMode ? 'bg-[#1A1A1A]/95 border-white/10 backdrop-blur-3xl' : 'bg-[#FFFFFF]/95 border-black/5 backdrop-blur-3xl'} ${closing ? 'translate-y-full' : 'translate-y-0'}`} 
                style={{ transform: `translateY(${closing ? '100%' : `${dragOffset}px`})`, transition: dragOffset > 0 ? 'none' : 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)' }} 
                onTouchStart={onTouchStart} 
                onTouchMove={onTouchMove} 
                onTouchEnd={onTouchEnd}
            >
               {/* Pull Handle for Mobile (Reduced Padding) */}
               <div className="w-full flex justify-center pt-2.5 pb-1.5 shrink-0 cursor-grab active:cursor-grabbing sm:hidden" onClick={handleClose}>
                   <div className={`w-10 h-1.5 rounded-full ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}></div>
               </div>
               
               {/* 🌟 Modal Header (Reduced Height) 🌟 */}
               <div className={`border-b px-4 sm:px-6 pb-3 pt-1 sm:py-4 flex items-center justify-between shrink-0 ${isDarkMode ? 'border-white/10' : 'border-black/5'}`}>
                  <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shadow-inner [&>svg]:w-5 [&>svg]:h-5 ${isDarkMode ? 'bg-[#41B6E6]/10 text-[#41B6E6]' : 'bg-[#0277C5]/10 text-[#0277C5]'}`}>
                          {lesson.icon}
                      </div>
                      <h2 className={`text-[18px] sm:text-[20px] font-black font-khmer tracking-tight ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{displayTitle}</h2>
                  </div>
                  <button onClick={handleClose} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-[#2C2C2C] hover:bg-[#3A3A3C] text-[#9AA0A6]' : 'bg-[#F8F9FA] hover:bg-[#E5E7EB] text-[#6B7280]'}`}>
                      <XCircle size={20} />
                  </button>
               </div>
               
               {/* 🌟 Content Area with iOS Safe Bottom Margin 🌟 */}
               <div className="scroll-content flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 overscroll-contain custom-scrollbar pb-[calc(env(safe-area-inset-bottom,20px)+20px)]">
                  {lesson.content.map((item, idx) => (
                      <LessonItem 
                          key={idx} 
                          id={`lesson-item-${idx}`}
                          item={item} 
                          isExpanded={expandedItem === idx} 
                          onToggle={() => { setExpandedItem(expandedItem === idx ? null : idx); triggerHaptic(); }} 
                          isDarkMode={isDarkMode} 
                      />
                  ))}
               </div>
            </div>
        </div>
    )
}