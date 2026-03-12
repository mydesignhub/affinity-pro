import React, { useEffect, useState } from 'react';
import { X, PlayCircle, BookOpen } from 'lucide-react';

const LessonModal = ({ lesson, onClose, isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for fade-out animation
  };

  if (!lesson) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Background Dimmer */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md" 
        onClick={handleClose} 
      />

      {/* Modal Container */}
      <div className={`relative w-full max-w-3xl max-h-[90vh] md:max-h-[85vh] flex flex-col shadow-2xl transition-transform duration-300 ease-out rounded-t-[32px] md:rounded-[32px]
        ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-full md:translate-y-8 md:scale-95'}
        ${isDarkMode ? 'bg-[#121212] border border-[#2C2C2C]' : 'bg-[#FFFFFF] border border-[#E5E7EB]'}
      `}>
        
        {/* Header Bar */}
        <div className={`flex items-center justify-between p-5 border-b shrink-0 ${isDarkMode ? 'border-[#2C2C2C]' : 'border-[#E5E7EB]'}`}>
            <h3 className={`font-bold font-khmer text-lg truncate pr-4 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                {lesson.title}
            </h3>
            <button 
              onClick={handleClose} 
              className={`p-2 rounded-full transition-colors active:scale-90 ${isDarkMode ? 'bg-[#1E1E1E] text-[#A0A0A0] hover:text-[#F1F1F1]' : 'bg-[#F8F9FA] text-[#6B7280] hover:text-[#1A1A1A]'}`}
            >
              <X size={20} />
            </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8 no-scrollbar">
            
            {/* 🌟 VIDEO PLAYER CONTAINER 🌟 */}
            <div className={`w-full aspect-video rounded-2xl relative overflow-hidden flex items-center justify-center group mb-8 shadow-lg border ${isDarkMode ? 'bg-[#0A0A0A] border-[#2C2C2C]' : 'bg-[#1A1A1A] border-black'}`}>
                {lesson.videoUrl ? (
                    <iframe 
                        src={lesson.videoUrl} 
                        className="w-full h-full absolute inset-0"
                        allowFullScreen 
                        title="Lesson Video"
                    />
                ) : (
                    <div className="text-center text-white/50 p-4">
                        <PlayCircle size={48} className="mx-auto mb-3 opacity-50 group-hover:opacity-100 transition-opacity text-[#41B6E6]" />
                        <p className="font-khmer font-bold tracking-wide">VIDEO TUTORIAL COMING SOON</p>
                        <p className="text-xs mt-2 opacity-70">The video link for this phase has not been added yet.</p>
                    </div>
                )}
            </div>

            {/* Lesson Text Content */}
            <div className="space-y-6">
                <div className={`flex items-start gap-3 p-4 rounded-2xl border ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                    <BookOpen className={`shrink-0 mt-0.5 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`} size={20} />
                    <p className={`text-[15px] font-khmer leading-relaxed ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                        {lesson.desc}
                    </p>
                </div>
                
                <div className="pl-2">
                    <h4 className={`text-sm font-bold uppercase tracking-widest mb-4 opacity-50 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                        Key Takeaways
                    </h4>
                    <p className={`text-[15px] font-khmer leading-loose whitespace-pre-wrap ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                        {lesson.content}
                    </p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default LessonModal;