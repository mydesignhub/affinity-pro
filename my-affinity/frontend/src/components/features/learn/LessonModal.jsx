import React, { useEffect, useState, useRef } from 'react';
import { X, PlayCircle, DownloadCloud, CheckCircle2, Circle, Loader2, Maximize, Lock, Clock } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const triggerHaptic = (type = 'light') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        if (type === 'error') navigator.vibrate([50, 50, 50]);
        else navigator.vibrate(10);
    }
};

const LessonModal = ({ lesson, onClose, isDarkMode, completedSteps, setCompletedSteps, isPurchased, onUnlockDemo }) => {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  
  // 🌟 NEW STATES FOR CUSTOM PLAY & POPUP 🌟
  const [hasStarted, setHasStarted] = useState(false);
  const [previewEnded, setPreviewEnded] = useState(false);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden'; 
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  useEffect(() => {
    setIsVideoLoading(true);
    setHasStarted(false);
    setPreviewEnded(false);
  }, [activeStep]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); 
  };

  const handleToggleComplete = (e, stepKey) => {
      e.stopPropagation();
      if (!isPurchased) {
          triggerHaptic('error');
          alert(lang === 'en' ? "Please unlock the full course to track your progress!" : "សូមដោះសោវគ្គសិក្សាដើម្បីតាមដានការសិក្សារបស់អ្នក!");
          return;
      }
      triggerHaptic();
      if (completedSteps.includes(stepKey)) {
          setCompletedSteps(prev => prev.filter(id => id !== stepKey));
      } else {
          setCompletedSteps(prev => [...prev, stepKey]);
      }
  };

  const toggleFullScreen = async () => {
      const elem = containerRef.current; 
      if (!elem) return;
      triggerHaptic();
      try {
          const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
          if (!isFullscreen) {
              if (elem.requestFullscreen) {
                  await elem.requestFullscreen();
              } else if (elem.webkitRequestFullscreen) {
                  elem.webkitRequestFullscreen(); 
              }
              if (window.screen && window.screen.orientation && window.screen.orientation.lock) {
                  try {
                      await window.screen.orientation.lock('landscape');
                  } catch (e) {
                      console.warn('Orientation lock is not supported.');
                  }
              }
          } else {
              if (document.exitFullscreen) {
                  await document.exitFullscreen();
              } else if (document.webkitExitFullscreen) {
                  document.webkitExitFullscreen();
              }
              if (window.screen && window.screen.orientation && window.screen.orientation.unlock) {
                  window.screen.orientation.unlock();
              }
          }
      } catch (err) {
          console.error("Fullscreen API error:", err);
      }
  };

  if (!lesson) return null;

  const currentStepData = lesson.steps && lesson.steps.length > 0 ? lesson.steps[activeStep] : null;

  const handlePlayClick = () => {
      setHasStarted(true);
      if (!isPurchased) {
          setTimeout(() => {
              setPreviewEnded(true);
              triggerHaptic('error'); 
          }, 21500);
      }
  };

  const getVideoUrl = (url) => {
      if (!url) return '';
      const separator = url.includes('?') ? '&' : '?';
      return isPurchased 
          ? `${url}${separator}autoplay=1&playsinline=1&fs=0&modestbranding=1&rel=0` 
          : `${url}${separator}end=20&controls=0&disablekb=1&rel=0&autoplay=1&playsinline=1&fs=0&modestbranding=1`;
  };

  return (
    <div className={`fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={handleClose} />

      {/* 🌟 FULL SCREEN MODAL CONTAINER 🌟 */}
      <div className={`relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-4xl flex flex-col shadow-2xl transition-transform duration-300 ease-out rounded-none sm:rounded-[32px]
        ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-full sm:translate-y-8 sm:scale-95'}
        ${isDarkMode ? 'bg-[#121212] sm:border border-[#2C2C2C]' : 'bg-[#FFFFFF] sm:border border-[#E5E7EB]'}
      `}>
        
        {/* 🌟 SAFE AREA HEADER 🌟 Pushes content down below iOS Notch / Android Status Bar safely */}
        <div 
            className={`flex flex-col border-b shrink-0 ${isDarkMode ? 'border-[#2C2C2C]' : 'border-[#E5E7EB]'}`}
            style={{ paddingTop: 'max(env(safe-area-inset-top), 12px)' }}
        >
            <div className="flex items-center justify-between p-4 sm:p-5">
                <h3 className={`font-bold font-khmer text-lg truncate pr-4 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                    {lang === 'en' ? lesson.title_en : lesson.title}
                </h3>
                <button onClick={handleClose} className={`p-2 shrink-0 rounded-full transition-colors active:scale-90 ${isDarkMode ? 'bg-[#1E1E1E] text-[#A0A0A0] hover:text-[#F1F1F1]' : 'bg-[#F8F9FA] text-[#6B7280] hover:text-[#1A1A1A]'}`}>
                  <X size={20} />
                </button>
            </div>
        </div>

        {/* 🌟 SAFE AREA CONTENT 🌟 Pushes content up above iOS Home Indicator safely */}
        <div 
            className="flex-1 overflow-y-auto p-4 sm:p-6 no-scrollbar flex flex-col"
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 24px)' }}
        >
            
            <p className={`text-[15px] font-khmer leading-relaxed mb-6 px-1 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                {lang === 'en' ? lesson.desc_en : lesson.desc}
            </p>

            {currentStepData && (
                <div className="mb-6">
                    <div ref={containerRef} className={`w-full aspect-video rounded-2xl relative overflow-hidden flex flex-col items-center justify-center group shadow-lg border shrink-0 bg-black ${isDarkMode ? 'border-[#2C2C2C]' : 'border-black'}`}>
                        
                        {!isPurchased && !previewEnded && (
                            <div className="absolute top-4 right-4 z-40 bg-[#C5B002] text-white px-3 py-1.5 rounded-full font-bold text-[10px] tracking-widest uppercase shadow-lg flex items-center gap-1.5 animate-pulse pointer-events-none">
                                <Clock size={12} /> 20s PREVIEW
                            </div>
                        )}

                        {currentStepData.videoUrl ? (
                            <>
                                {!hasStarted ? (
                                    <div 
                                        onClick={handlePlayClick}
                                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 cursor-pointer z-50 hover:bg-black/50 transition-colors"
                                    >
                                        <PlayCircle size={64} className="text-[#C5B002] mb-3 drop-shadow-lg" />
                                        <span className="font-bold font-khmer text-white tracking-wide drop-shadow-md">
                                            {isPurchased 
                                                ? (lang === 'en' ? 'Play Video' : 'ចាក់វីដេអូ') 
                                                : (lang === 'en' ? 'Play 20s Free Preview' : 'ចាក់មើលសាកល្បង ២០ វិនាទី')}
                                        </span>
                                    </div>
                                ) : previewEnded && !isPurchased ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0A0A] z-50 p-6 text-center border-2 border-[#C5B002]/30 rounded-2xl animate-fade-in-up">
                                        <Lock size={40} className="text-[#C5B002] mb-4 animate-bounce" />
                                        <h4 className="text-white font-black font-khmer text-lg sm:text-xl mb-2">
                                            {lang === 'en' ? 'Preview Finished!' : 'ការមើលសាកល្បងត្រូវបានបញ្ចប់!'}
                                        </h4>
                                        <p className="text-[#A0A0A0] text-[13px] sm:text-sm font-khmer mb-6 max-w-sm mx-auto">
                                            {lang === 'en' ? 'Unlock the full course to watch the rest of this lesson and access all features.' : 'ដោះសោវគ្គសិក្សាដើម្បីបន្តមើលមេរៀននេះ និងទទួលបានឯកសារអនុវត្ត។'}
                                        </p>
                                        <button onClick={handleClose} className="px-8 py-3 bg-[#C5B002] text-white font-black font-khmer rounded-xl text-[13px] active:scale-95 shadow-lg shadow-[#C5B002]/20">
                                            {lang === 'en' ? 'Unlock Full Access' : 'ដោះសោសិទ្ធិពេញលេញ'}
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        {isVideoLoading && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                                <Loader2 size={36} className={`animate-spin mb-3 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`} />
                                                <span className={`text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                                                    Loading
                                                </span>
                                            </div>
                                        )}

                                        <iframe 
                                            ref={videoRef}
                                            src={getVideoUrl(currentStepData.videoUrl)}
                                            className={`w-full h-full absolute inset-0 transition-opacity duration-700 ease-in-out ${isVideoLoading ? 'opacity-0' : 'opacity-100 z-20'}`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                            title={`Step ${currentStepData.id} Video`}
                                            onLoad={() => setIsVideoLoading(false)}
                                        />
                                        
                                        {/* Full-width bottom shield to securely block sharing & YouTube links */}
                                        <div className="absolute bottom-0 left-0 w-full h-[60px] z-30 bg-transparent" />
                                    </>
                                )}
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
                    
                    {currentStepData.videoUrl && (
                        <div className="flex flex-col sm:flex-row gap-3 mt-3 w-full">
                            <button 
                                onClick={toggleFullScreen}
                                className={`flex-1 py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold font-khmer text-[13px] sm:text-[14px] transition-all active:scale-[0.98] shadow-sm border ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] text-[#F1F1F1] hover:bg-[#2C2C2C]' : 'bg-white border-[#E5E7EB] text-[#1A1A1A] hover:bg-[#F8F9FA]'}`}
                            >
                                <Maximize size={18} className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} />
                                {lang === 'en' ? 'Rotate Fullscreen' : 'មើលពេញអេក្រង់'}
                            </button>

                            {!isPurchased && (
                                <button 
                                    onClick={handleClose}
                                    className="flex-1 py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold font-khmer text-[13px] sm:text-[14px] transition-all active:scale-[0.98] shadow-sm border border-[#C5B002]/40 bg-[#C5B002]/10 text-[#C5B002] hover:bg-[#C5B002]/20"
                                >
                                    <Lock size={18} />
                                    {lang === 'en' ? 'Unlock Full Course' : 'ដោះសោវគ្គសិក្សា'}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}

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
                        isPurchased ? (
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
                        ) : (
                            <button onClick={() => triggerHaptic('error')} className={`shrink-0 w-full sm:w-auto text-center px-5 py-2.5 rounded-xl font-khmer font-bold text-[13px] transition-all cursor-not-allowed flex justify-center items-center gap-2
                                ${isDarkMode ? 'bg-[#2C2C2C] text-[#A0A0A0]' : 'bg-[#E5E7EB] text-[#6B7280]'}
                            `}>
                                <Lock size={14} /> {lang === 'en' ? 'Locked' : 'បានចាក់សោ'}
                            </button>
                        )
                    )}
                </div>
            )}

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
                                    ${!isPurchased ? 'opacity-30 cursor-not-allowed' : ''}
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