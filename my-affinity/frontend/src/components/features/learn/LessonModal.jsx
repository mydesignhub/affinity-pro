import React, { useEffect, useState } from 'react';
// 🌟 VERCEL FIX: Ensured Loader2 is explicitly imported here!
import { X, PlayCircle, DownloadCloud, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
    }
};

const LessonModal = ({ lesson, onClose, isDarkMode, completedSteps, setCompletedSteps }) => {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  
  // Track if the YouTube iframe is still loading
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden'; 
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  // Reset the loading spinner every time a new video step is clicked
  useEffect(() => {
    setIsVideoLoading(true);
  }, [activeStep]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); 
  };

  const handleToggleComplete = (e, stepKey) => {
      e.stopPropagation();
      triggerHaptic();
      if (completedSteps.includes(stepKey)) {
          setCompletedSteps(prev => prev.filter(id => id !== stepKey));
      } else {
          setCompletedSteps(prev => [...prev, stepKey]);
      }
  };

  if (!lesson) return null;

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

            {/* DYNAMIC VIDEO PLAYER WITH LOADING STATE */}
            {currentStepData && (
                <div className={`w-full aspect-video rounded-2xl relative overflow-hidden flex flex-col items-center justify-center group mb-6 shadow-lg border shrink-0 ${isDarkMode ? 'bg-[#0A0A0A] border-[#2C2C2C]' : 'bg-[#1A1A1A] border-black'}`}>
                    {currentStepData.videoUrl ? (
                        <>
                            {/* The Animated Loading Spinner */}
                            {isVideoLoading && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                    <Loader2 size={36} className={`animate-spin mb-3 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`} />
                                    <span className={`text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                                        Loading
                                    </span>
                                </div>
                            )}

                            {/* The iFrame Video */}
                            <iframe 
                                src={currentStepData.videoUrl}
                                className={`w-full h-full absolute inset-0 transition-opacity duration-700 ease-in-out ${isVideoLoading ? 'opacity-0' : 'opacity-100 z-20'}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                title={`Step ${currentStepData.id} Video`}
                                onLoad={() => setIsVideoLoading(false)}
                            />
                        </>
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

            {/* PRACTICE RESOURCES BOX */}
            {(lesson.instruction || lesson.downloadUrl) && (
                <div className={`mb-8 p-5 rounded-2xl border flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between ${isDarkMode ? 'bg-[#1E1E1E]/50 border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                    <div className="flex-1">
                        <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}>
                            <DownloadCloud size={16} />
                            {lang === 'en' ? 'Practice Resources' : 'ឯកសារអនុវត្ត'}
                        </h4>
                        <p className={`text-[13px] font-khmer leading-relaxed ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                            {lang === 'en' ? lesson.instruction_en : lesson.instruction}
                        </p>
                    </div>
                    {lesson.downloadUrl && (
                        <a 
                            href={lesson.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`shrink-0 w-full sm:w-auto text-center px-5 py-2.5 rounded-xl font-khmer font-bold text-[13px] transition-transform active:scale-95 shadow-sm
                                ${isDarkMode ? 'bg-[#41B6E6] text-[#0A0A0A] hover:bg-[#2CA0D0]' : 'bg-[#0277C5] text-white hover:bg-[#01579B]'}
                            `}
                        >
                            {lang === 'en' ? 'Download Assets (.zip)' : 'ទាញយកឯកសារ (.zip)'}
                        </a>
                    )}
                </div>
            )}

            {/* 🌟 INTERACTIVE CHECKLIST MENU 🌟 */}
            <div className="flex flex-col gap-3 pb-6">
                <h4 className={`text-sm font-bold uppercase tracking-widest px-2 opacity-50 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                    {lang === 'en' ? 'Course Content' : 'មាតិកាមេរៀន'}
                </h4>
                
                {lesson.steps?.map((step, idx) => {
                    const isActive = activeStep === idx;
                    const stepKey = `${lesson.id}_${step.id}`;
                    const isCompleted = completedSteps.includes(stepKey);

                    return (
                        <div 
                            key={step.id}
                            className={`flex items-center gap-3 p-3 sm:p-4 rounded-2xl border transition-all duration-300 ease-out
                                ${isActive 
                                    ? (isDarkMode ? 'bg-[#41B6E6]/10 border-[#41B6E6]/50 shadow-md' : 'bg-[#0277C5]/10 border-[#0277C5]/50 shadow-md') 
                                    : (isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]')
                                }
                            `}
                        >
                            <button 
                                onClick={() => setActiveStep(idx)}
                                className="flex-1 flex items-start gap-4 text-left active:scale-[0.98] transition-transform"
                            >
                                <div className={`mt-0.5 w-7 h-7 shrink-0 rounded-full flex items-center justify-center font-bold text-xs
                                    ${isActive 
                                        ? (isDarkMode ? 'bg-[#41B6E6] text-[#0A0A0A]' : 'bg-[#0277C5] text-white') 
                                        : (isDarkMode ? 'bg-[#2C2C2C] text-[#A0A0A0]' : 'bg-[#E5E7EB] text-[#6B7280]')
                                    }
                                `}>
                                    {isActive ? <PlayCircle size={14} className="ml-0.5" /> : step.id}
                                </div>

                                <p className={`text-[14px] sm:text-[15px] font-khmer leading-relaxed
                                    ${isActive 
                                        ? (isDarkMode ? 'text-[#F1F1F1] font-medium' : 'text-[#1A1A1A] font-medium') 
                                        : (isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]')
                                    }
                                `}>
                                    {lang === 'en' ? step.english : step.khmer}
                                </p>
                            </button>

                            <button 
                                onClick={(e) => handleToggleComplete(e, stepKey)}
                                className={`shrink-0 p-2 rounded-full transition-transform active:scale-75
                                    ${isCompleted ? 'text-green-500' : (isDarkMode ? 'text-[#2C2C2C] hover:text-[#A0A0A0]' : 'text-[#E5E7EB] hover:text-[#6B7280]')}
                                `}
                            >
                                {isCompleted ? <CheckCircle2 size={24} className="fill-green-500/20" /> : <Circle size={24} />}
                            </button>
                        </div>
                    );
                })}
            </div>

        </div>
      </div>
    </div>
  );
};

export default LessonModal;