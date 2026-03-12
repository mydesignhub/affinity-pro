import React, { useEffect, useState } from 'react';
import { X, PlayCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const LessonModal = ({ lesson, onClose, isDarkMode }) => {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  
  // 🌟 NEW: Track which micro-lesson step they are watching
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden'; 
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); 
  };

  if (!lesson) return null;

  // Get the current step object
  const currentStepData = lesson.steps && lesson.steps.length > 0 ? lesson.steps[activeStep] : null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Background Dimmer */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={handleClose} />

      {/* Modal Container */}
      <div className={`relative w-full max-w-4xl h-[95vh] md:h-auto md:max-h-[90vh] flex flex-col shadow-2xl transition-transform duration-300 ease-out rounded-t-[32px] md:rounded-[32px]
        ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-full md:translate-y-8 md:scale-95'}
        ${isDarkMode ? 'bg-[#121212] border border-[#2C2C2C]' : 'bg-[#FFFFFF] border border-[#E5E7EB]'}
      `}>
        
        {/* Header Bar */}
        <div className={`flex items-center justify-between p-5 border-b shrink-0 ${isDarkMode ? 'border-[#2C2C2C]' : 'border-[#E5E7EB]'}`}>
            <h3 className={`font-bold font-khmer text-lg truncate pr-4 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                {lang === 'en' ? lesson.title_en : lesson.title}
            </h3>
            <button onClick={handleClose} className={`p-2 rounded-full transition-colors active:scale-90 ${isDarkMode ? 'bg-[#1E1E1E] text-[#A0A0A0] hover:text-[#F1F1F1]' : 'bg-[#F8F9FA] text-[#6B7280] hover:text-[#1A1A1A]'}`}>
              <X size={20} />
            </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar flex flex-col">
            
            <p className={`text-[15px] font-khmer leading-relaxed mb-6 px-1 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                {lang === 'en' ? lesson.desc_en : lesson.desc}
            </p>

            {/* 🌟 DYNAMIC VIDEO PLAYER 🌟 */}
            {currentStepData && (
                <div className={`w-full aspect-video rounded-2xl relative overflow-hidden flex flex-col items-center justify-center group mb-8 shadow-lg border shrink-0 ${isDarkMode ? 'bg-[#0A0A0A] border-[#2C2C2C]' : 'bg-[#1A1A1A] border-black'}`}>
                    {currentStepData.videoUrl ? (
                        <iframe 
                            src={currentStepData.videoUrl} 
                            className="w-full h-full absolute inset-0"
                            allowFullScreen 
                            title={`Step ${currentStepData.id} Video`}
                        />
                    ) : (
                        <div className="text-center text-white/50 p-4">
                            <PlayCircle size={48} className="mx-auto mb-3 opacity-50 group-hover:opacity-100 transition-opacity text-[#41B6E6]" />
                            <p className="font-khmer font-bold tracking-wide">
                                {lang === 'en' ? `STEP ${currentStepData.id} COMING SOON` : `វីដេអូទី ${currentStepData.id} កំពុងរៀបចំ`}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* 🌟 INTERACTIVE PLAYLIST MENU 🌟 */}
            <div className="flex flex-col gap-3 pb-6">
                <h4 className={`text-sm font-bold uppercase tracking-widest px-2 opacity-50 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                    {lang === 'en' ? 'Course Content' : 'មាតិកាមេរៀន'}
                </h4>
                
                {lesson.steps?.map((step, idx) => {
                    const isActive = activeStep === idx;
                    return (
                        <button 
                            key={step.id}
                            onClick={() => setActiveStep(idx)}
                            className={`flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-300 ease-out active:scale-[0.98]
                                ${isActive 
                                    ? (isDarkMode ? 'bg-[#41B6E6]/10 border-[#41B6E6]/50 shadow-md' : 'bg-[#0277C5]/10 border-[#0277C5]/50 shadow-md') 
                                    : (isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] hover:bg-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB] hover:bg-[#E5E7EB]')
                                }
                            `}
                        >
                            {/* Number / Status Icon */}
                            <div className={`mt-0.5 w-7 h-7 shrink-0 rounded-full flex items-center justify-center font-bold text-xs
                                ${isActive 
                                    ? (isDarkMode ? 'bg-[#41B6E6] text-[#0A0A0A]' : 'bg-[#0277C5] text-white') 
                                    : (isDarkMode ? 'bg-[#2C2C2C] text-[#A0A0A0]' : 'bg-[#E5E7EB] text-[#6B7280]')
                                }
                            `}>
                                {isActive ? <PlayCircle size={14} className="ml-0.5" /> : step.id}
                            </div>

                            {/* Step Text */}
                            <p className={`text-[15px] font-khmer leading-relaxed flex-1
                                ${isActive 
                                    ? (isDarkMode ? 'text-[#F1F1F1] font-medium' : 'text-[#1A1A1A] font-medium') 
                                    : (isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]')
                                }
                            `}>
                                {lang === 'en' ? step.english : step.khmer}
                            </p>
                        </button>
                    );
                })}
            </div>

        </div>
      </div>
    </div>
  );
};

export default LessonModal;