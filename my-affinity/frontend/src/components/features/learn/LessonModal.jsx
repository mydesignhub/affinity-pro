import React, { useEffect, useState, useRef } from 'react';
import { X, PlayCircle, DownloadCloud, CheckCircle2, Circle, Loader2, Maximize, Minimize, Lock, Clock } from 'lucide-react';
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
  
  const [hasStarted, setHasStarted] = useState(false);
  const [previewEnded, setPreviewEnded] = useState(false);
  const [isCssFullscreen, setIsCssFullscreen] = useState(false);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const dragStartY = useRef(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [closing, setClosing] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

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

  useEffect(() => {
      if (expandedItem !== null) {
          setTimeout(() => {
              const el = document.getElementById(`lesson-item-${expandedItem}`);
              if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
          }, 150);
      }
  }, [expandedItem]);

  useEffect(() => {
      const handleFsChange = () => {
          const isStandard = document.fullscreenElement || document.webkitFullscreenElement;
          if (!isStandard) setIsCssFullscreen(false);
      };
      document.addEventListener('fullscreenchange', handleFsChange);
      document.addEventListener('webkitfullscreenchange', handleFsChange);
      return () => {
          document.removeEventListener('fullscreenchange', handleFsChange);
          document.removeEventListener('webkitfullscreenchange', handleFsChange);
      };
  }, []);

  const handleClose = () => {
    if (closing) return;
    setClosing(true);
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
          const isStandardFs = document.fullscreenElement || document.webkitFullscreenElement;
          
          if (!isStandardFs && !isCssFullscreen) {
              if (elem.requestFullscreen) {
                  await elem.requestFullscreen();
              } else if (elem.webkitRequestFullscreen) {
                  elem.webkitRequestFullscreen(); 
              } else {
                  setIsCssFullscreen(true);
              }
              
              if (window.screen && window.screen.orientation && window.screen.orientation.lock) {
                  try { await window.screen.orientation.lock('landscape'); } catch (e) {}
              }
          } else {
              if (isStandardFs) {
                  if (document.exitFullscreen) await document.exitFullscreen();
                  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
              }
              setIsCssFullscreen(false);
              
              if (window.screen && window.screen.orientation && window.screen.orientation.unlock) {
                  window.screen.orientation.unlock();
              }
          }
      } catch (err) {
          console.error("Fullscreen API error:", err);
          setIsCssFullscreen(!isCssFullscreen);
      }
  };

  const onTouchStart = (e) => {
      const scrollTop = modalRef.current?.querySelector('.scroll-content')?.scrollTop || 0;
      if (scrollTop <= 0) { dragStartY.current = e.touches[0].clientY; }
  };
  const onTouchMove = (e) => {
      if (dragStartY.current === null || isCssFullscreen) return;
      const deltaY = e.touches[0].clientY - dragStartY.current;
      if (deltaY > 0) { setDragOffset(deltaY); if (e.cancelable && deltaY > 10) e.preventDefault(); }
  };
  const onTouchEnd = () => { 
      if (isCssFullscreen) return;
      if (dragOffset > 150) { handleClose(); } else { setDragOffset(0); } 
      dragStartY.current = null; 
  };
  
  const opacity = 1 - (dragOffset / 500); 

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

  // 🌟 SECURITY FIX: fs=0 forces users to use our Fullscreen button, keeping shields active
  const getVideoUrl = (url) => {
      if (!url) return '';
      const separator = url.includes('?') ? '&' : '?';
      return isPurchased 
          ? `${url}${separator}autoplay=1&playsinline=1&fs=0&modestbranding=1&rel=0` 
          : `${url}${separator}end=20&controls=0&disablekb=1&rel=0&autoplay=1&playsinline=1&fs=0&modestbranding=1`;
  };

  const displayTitle = lang === 'en' && lesson.title_en ? lesson.title_en : lesson.title;

  return (
    <div className={`fixed inset-0 z-[250] flex items-end sm:items-center justify-center p-0 sm:p-6 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" style={{ opacity: Math.max(0, opacity) }} onClick={handleClose} />

      <div 
          ref={modalRef} 
          className={`relative w-full h-full flex flex-col ease-spring ring-1 
              ${isDarkMode ? 'bg-[#1E1E1E]/95 ring-white/10' : 'bg-[#FFFFFF]/95 ring-black/5'}
              ${isCssFullscreen 
                  ? '!transform-none !backdrop-filter-none sm:max-w-none sm:max-h-none !w-full !h-[100dvh] !rounded-none !m-0 !p-0 z-[99999]' 
                  : `sm:h-auto sm:max-h-[90vh] sm:max-w-3xl sm:rounded-3xl shadow-2xl backdrop-blur-2xl transition-transform duration-500 ${closing ? 'translate-y-full' : 'translate-y-0'}`
              }
          `}
          style={isCssFullscreen ? { transform: 'none' } : { 
              transform: `translateY(${closing ? '100%' : `${dragOffset}px`})`, 
              transition: dragOffset > 0 ? 'none' : 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)' 
          }} 
          onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
      >
        
        {!isCssFullscreen && (
            <div className={`flex flex-col border-b sticky top-0 z-20 shrink-0 sm:rounded-t-3xl ${isDarkMode ? 'border-[#2C2C2C] bg-[#1E1E1E]/80 backdrop-blur-xl' : 'border-[#E5E7EB] bg-[#FFFFFF]/80 backdrop-blur-xl'}`} style={{ paddingTop: 'env(safe-area-inset-top)' }}>
                <div className="w-full flex justify-center pt-3 pb-1 shrink-0 cursor-grab active:cursor-grabbing sm:hidden" onClick={handleClose}>
                    <div className={`w-12 h-1.5 rounded-full opacity-50 ${isDarkMode ? 'bg-[#9AA0A6]' : 'bg-[#5F6368]'}`}></div>
                </div>
                <div className="flex items-center justify-between p-4 sm:p-5">
                    <div className="flex items-center gap-3.5 pr-4">
                        <div className="p-2.5 bg-[#C65102]/10 rounded-xl text-[#C65102] border border-[#C65102]/20 shadow-[0_0_15px_rgba(198,81,2,0.15)] shrink-0 [&>svg]:w-5 [&>svg]:h-5">{lesson.icon}</div>
                        <h2 className={`text-xl font-bold font-khmer tracking-tight line-clamp-1 ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>{displayTitle}</h2>
                    </div>
                    <button onClick={handleClose} className={`p-2 shrink-0 rounded-full transition-colors active:scale-90 ${isDarkMode ? 'bg-[#2C2C2C] text-[#A0A0A0] hover:text-[#F1F1F1]' : 'bg-[#F8F9FA] text-[#6B7280] hover:text-[#1A1A1A]'}`}>
                      <X size={20} />
                    </button>
                </div>
            </div>
        )}

        <div className={`flex-1 overflow-y-auto no-scrollbar flex flex-col ${isCssFullscreen ? 'p-0' : 'p-4 sm:p-6 scroll-content'}`} style={isCssFullscreen ? {} : { paddingBottom: 'max(env(safe-area-inset-bottom), 24px)' }}>
            
            {!isCssFullscreen && (
                <p className={`text-[15px] font-khmer leading-relaxed mb-6 px-1 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                    {lang === 'en' ? lesson.desc_en : lesson.desc}
                </p>
            )}

            {currentStepData && (
                <div className={isCssFullscreen ? 'w-full h-full' : 'mb-6'}>
                    <div ref={containerRef} className={`w-full relative overflow-hidden flex flex-col items-center justify-center group shadow-lg shrink-0 bg-black transition-all duration-300
                        ${isCssFullscreen 
                            ? '!fixed !top-0 !left-0 !right-0 !bottom-0 !z-[999999] !w-full !h-[100dvh] !rounded-none !border-none !m-0 !p-0' 
                            : `aspect-video rounded-2xl border ${isDarkMode ? 'border-[#2C2C2C]' : 'border-black'}`
                        }`}
                    >
                        
                        {isCssFullscreen && (
                            <button 
                                onClick={toggleFullScreen}
                                className="absolute z-[60] p-3 sm:p-4 bg-black/60 text-white rounded-full backdrop-blur-md shadow-2xl active:scale-90 transition-transform"
                                style={{ top: 'max(env(safe-area-inset-top), 16px)', left: 'max(env(safe-area-inset-left), 16px)' }}
                            >
                                <Minimize size={24} />
                            </button>
                        )}

                        {!isPurchased && !previewEnded && (
                            <div className="absolute top-4 right-4 z-40 bg-[#C5B002] text-white px-3 py-1.5 rounded-full font-bold text-[10px] tracking-widest uppercase shadow-lg flex items-center gap-1.5 animate-pulse pointer-events-none">
                                <Clock size={12} /> 20s PREVIEW
                            </div>
                        )}

                        {currentStepData.videoUrl ? (
                            <>
                                {!hasStarted ? (
                                    <div onClick={handlePlayClick} className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 cursor-pointer z-50 hover:bg-black/50 transition-colors">
                                        <PlayCircle size={64} className="text-[#C5B002] mb-3 drop-shadow-lg" />
                                        <span className="font-bold font-khmer text-white tracking-wide drop-shadow-md">
                                            {isPurchased ? (lang === 'en' ? 'Play Video' : 'ចាក់វីដេអូ') : (lang === 'en' ? 'Play 20s Free Preview' : 'ចាក់មើលសាកល្បង ២០ វិនាទី')}
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
                                        <button onClick={() => { handleClose(); setTimeout(onUnlockDemo, 300); }} className="px-8 py-3 bg-[#C5B002] text-white font-black font-khmer rounded-xl text-[13px] active:scale-95 shadow-lg shadow-[#C5B002]/20">
                                            {lang === 'en' ? 'Unlock Full Access' : 'ដោះសោសិទ្ធិពេញលេញ'}
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        {isVideoLoading && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                                <Loader2 size={36} className={`animate-spin mb-3 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`} />
                                                <span className={`text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Loading</span>
                                            </div>
                                        )}

                                        <iframe 
                                            ref={videoRef}
                                            src={getVideoUrl(currentStepData.videoUrl)}
                                            className={`w-full h-full absolute inset-0 transition-opacity duration-700 ease-in-out ${isVideoLoading ? 'opacity-0' : 'opacity-100 z-20'}`}
                                            // 🌟 SECURITY FIX: Sandbox prevents "Watch on YouTube" links from escaping the app!
                                            sandbox="allow-scripts allow-same-origin allow-presentation"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                            title={`Step ${currentStepData.id} Video`}
                                            onLoad={() => setIsVideoLoading(false)}
                                        />
                                        
                                        {/* 🌟 SECURITY FIX: Physical Shield strictly over the Top Bar (Share/Title) */}
                                        <div className="absolute top-0 left-0 w-full h-[70px] z-30 bg-transparent" />
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
                    
                    {!isCssFullscreen && currentStepData.videoUrl && (
                        <div className="flex flex-col sm:flex-row gap-3 mt-3 w-full">
                            <button 
                                onClick={toggleFullScreen}
                                className={`flex-1 py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold font-khmer text-[13px] sm:text-[14px] transition-all active:scale-[0.98] shadow-sm border ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] text-[#F1F1F1] hover:bg-[#2C2C2C]' : 'bg-white border-[#E5E7EB] text-[#1A1A1A] hover:bg-[#F8F9FA]'}`}
                            >
                                {/* 🌟 DYNAMIC BUTTON TEXT & ICONS 🌟 */}
                                {isCssFullscreen ? (
                                    <>
                                        <Minimize size={18} className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} />
                                        {lang === 'en' ? 'Exit Fullscreen' : 'ចាកចេញពីអេក្រង់ពេញ'}
                                    </>
                                ) : (
                                    <>
                                        <Maximize size={18} className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} />
                                        {lang === 'en' ? 'Watch Fullscreen' : 'មើលពេញអេក្រង់'}
                                    </>
                                )}
                            </button>

                            {!isPurchased && (
                                <button 
                                    onClick={() => { handleClose(); setTimeout(onUnlockDemo, 300); }}
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

            {!isCssFullscreen && (lesson.instruction || lesson.downloadUrl) && (
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

            {!isCssFullscreen && (
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
                                    onClick={() => { setActiveStep(idx); triggerHaptic(); }}
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
            )}

        </div>
      </div>
    </div>
  );
};

export default LessonModal;