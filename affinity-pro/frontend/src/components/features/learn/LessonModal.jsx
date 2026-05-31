import React, { useState, useEffect, useRef } from 'react';
import { X, Clock, PlayCircle, Lock, Loader2, Minimize, Maximize, DownloadCloud, CheckCircle2, Circle, Layout, Image as ImageIcon, Layers, Sparkles, Wand2, Box, Moon, PenTool, MonitorPlay, MousePointer2, Shapes, Palette, Type, Blend, Grid, Briefcase, Star, LayoutTemplate, Files, List, Table, Newspaper, FileText, Calendar, Printer, BookOpen } from 'lucide-react';

const iconMap = {
    ph1: <Layout />, ph2: <ImageIcon />, ph3: <Layers />, ph4: <Sparkles />, ph5: <Wand2 />, ph6: <Box />, ph7: <Briefcase />, ph8: <Moon />, ph9: <PenTool />, ph10: <MonitorPlay />,
    ds1: <MousePointer2 />, ds2: <Shapes />, ds3: <PenTool />, ds4: <Palette />, ds5: <Type />, ds6: <Blend />, ds7: <Grid />, ds8: <Briefcase />, ds9: <Box />, ds10: <Star />,
    pb1: <LayoutTemplate />, pb2: <Files />, pb3: <Type />, pb4: <List />, pb5: <Table />, pb6: <BookOpen />, pb7: <Newspaper />, pb8: <FileText />, pb9: <Calendar />, pb10: <Printer />
};
import { useLanguage } from '../../../contexts/LanguageContext';
import { triggerHaptic } from '../../../utils/haptics';

const LessonModal = ({ lesson, onClose, isDarkMode, completedSteps, setCompletedSteps, isPurchased, onUnlockDemo }) => {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [previewEnded, setPreviewEnded] = useState(false);
  const [isCssFullscreen, setIsCssFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); 
  
  const togglePlayPause = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!videoRef.current) return;
      
      if (isPlaying) {
          videoRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          setIsPlaying(false);
      } else {
          videoRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
          setIsPlaying(true);
      }
      triggerHaptic();
  };
  
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
    setIsPlaying(true); 
  }, [activeStep]);

  useEffect(() => {
      if (expandedItem !== null) {
          setTimeout(() => {
              const el = document.getElementById(`lesson-item-${expandedItem}`);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                  try { window.screen.orientation.unlock(); } catch (e) {}
              }
              else if (elem.webkitRequestFullscreen) {
                  elem.webkitRequestFullscreen(); 
                  try { window.screen.orientation.unlock(); } catch (e) {}
              }
              else {
                  setIsCssFullscreen(true);
              }
          } else {
              if (isStandardFs) {
                  if (document.exitFullscreen) await document.exitFullscreen();
                  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
              }
              setIsCssFullscreen(false);
              try { window.screen.orientation.unlock(); } catch (e) {}
          }
      } catch (err) {
          console.error("Fullscreen API error:", err);
          setIsCssFullscreen(!isCssFullscreen);
      }
  };

  const onTouchStart = (e) => {
      const scrollTop = modalRef.current?.querySelector('.scroll-content')?.scrollTop || 0;
      if (scrollTop <= 0) dragStartY.current = e.touches[0].clientY;
  };
  const onTouchMove = (e) => {
      if (dragStartY.current === null || isCssFullscreen) return;
      const deltaY = e.touches[0].clientY - dragStartY.current;
      if (deltaY > 0) { setDragOffset(deltaY); if (e.cancelable && deltaY > 10) e.preventDefault(); }
  };
  const onTouchEnd = () => { 
      if (isCssFullscreen) return;
      if (dragOffset > 150) handleClose(); else setDragOffset(0); 
      dragStartY.current = null; 
  };
  
  const opacity = 1 - (dragOffset / 500); 

  if (!lesson) return null;

  const currentStepData = lesson.steps && lesson.steps.length > 0 
      ? lesson.steps[activeStep] 
      : { id: 1, videoUrl: lesson.videoUrl }; 

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
      const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^"&?\/\s]{11})/);
      const videoId = videoIdMatch ? videoIdMatch[1] : '';
      const separator = url.includes('?') ? '&' : '?';
      const antiSuggestedGrid = videoId ? `&loop=1&playlist=${videoId}` : '';

      return isPurchased 
          ? `${url}${separator}autoplay=1&playsinline=1&fs=0&modestbranding=1&rel=0&controls=1&enablejsapi=1${antiSuggestedGrid}` 
          : `${url}${separator}end=20&controls=0&disablekb=1&rel=0&autoplay=1&playsinline=1&fs=0&modestbranding=1&enablejsapi=1`;
  };

  const displayTitle = lang === 'en' && lesson.title_en ? lesson.title_en : lesson.title;

  return (
    <div className={`fixed inset-0 z-[250] flex items-end sm:items-center justify-center p-0 sm:p-6 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" style={{ opacity: Math.max(0, opacity) }} onClick={handleClose} />

      <style>{`
          .video-container:fullscreen { width: 100vw !important; height: 100dvh !important; max-width: none !important; max-height: none !important; border-radius: 0 !important; border: none !important; background: black; display: flex !important; align-items: center !important; justify-content: center !important; }
          .video-container:-webkit-full-screen { width: 100vw !important; height: 100dvh !important; max-width: none !important; max-height: none !important; border-radius: 0 !important; border: none !important; background: black; display: flex !important; align-items: center !important; justify-content: center !important; }
          .video-container:fullscreen iframe { width: 100% !important; height: 100% !important; object-fit: cover; }
          .video-container:-webkit-full-screen iframe { width: 100% !important; height: 100% !important; object-fit: cover; }
          .no-callout { -webkit-touch-callout: none !important; -webkit-user-select: none !important; user-select: none !important; outline: none !important; }
      `}</style>

      <div 
          ref={modalRef} 
          className={`relative w-full h-full flex flex-col ease-spring ring-1 
              ${isDarkMode ? 'bg-[#1C1C1E]/95 ring-white/10' : 'bg-[#FFFFFF]/95 ring-black/5'}
              ${isCssFullscreen 
                  ? '!transform-none !backdrop-filter-none sm:max-w-none sm:max-h-none !w-full !h-[100dvh] !rounded-none !m-0 !p-0 z-[99999]' 
                  : `sm:h-auto sm:max-h-[90vh] sm:max-w-3xl sm:rounded-[32px] shadow-2xl backdrop-blur-2xl transition-transform duration-500 ${closing ? 'translate-y-full' : 'translate-y-0'}`
              }
          `}
          style={isCssFullscreen ? { transform: 'none' } : { 
              transform: `translateY(${closing ? '100%' : `${dragOffset}px`})`, 
              transition: dragOffset > 0 ? 'none' : 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)' 
          }} 
          onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
      >
        
        {!isCssFullscreen && (
            <div className={`flex flex-col border-b sticky top-0 z-20 shrink-0 sm:rounded-t-[32px] ${isDarkMode ? 'border-[#2C2C2C] bg-[#1C1C1E]/80 backdrop-blur-xl' : 'border-[#E5E7EB] bg-[#FFFFFF]/80 backdrop-blur-xl'}`} style={{ paddingTop: 'env(safe-area-inset-top)' }}>
                <div className="w-full flex justify-center pt-3 pb-1 shrink-0 cursor-grab active:cursor-grabbing sm:hidden" onClick={handleClose}>
                    <div className={`w-12 h-1.5 rounded-full opacity-50 ${isDarkMode ? 'bg-[#9AA0A6]' : 'bg-[#5F6368]'}`}></div>
                </div>
                <div className="flex items-center justify-between p-4 sm:p-5">
                    <div className="flex items-center gap-3.5 pr-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-[#C65102]/10 rounded-[14px] text-[#C65102] border border-[#C65102]/20 shadow-[0_0_15px_rgba(198,81,2,0.15)] shrink-0 [&>svg]:w-5 [&>svg]:h-5">
                            {lesson.icon || (iconMap[lesson.id] ? React.cloneElement(iconMap[lesson.id], { className: 'w-5 h-5' }) : <BookOpen className="w-5 h-5" />)}
                        </div>
                        <h2 className={`text-[19px] font-black font-khmer tracking-tight line-clamp-1 ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>{displayTitle}</h2>
                    </div>
                    <button onClick={handleClose} className={`p-2.5 shrink-0 rounded-full transition-colors active:scale-90 ${isDarkMode ? 'bg-[#2C2C2C] text-[#A0A0A0] hover:text-[#F1F1F1]' : 'bg-[#F8F9FA] text-[#6B7280] hover:text-[#1A1A1A]'}`}>
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
                    
                    <div ref={containerRef} className={`video-container w-full shadow-lg shrink-0 bg-black transition-all duration-300
                        ${isCssFullscreen 
                            ? '!fixed !top-0 !left-0 !right-0 !bottom-0 !z-[999999] !w-full !h-[100dvh] !rounded-none !border-none !m-0 !p-0' 
                            : `relative aspect-video rounded-2xl border overflow-hidden ${isDarkMode ? 'border-[#2C2C2C]' : 'border-black'}`
                        }`}
                    >
                        
                        <div className="absolute inset-0 w-full h-full flex flex-col"
                             style={isCssFullscreen ? {
                                 paddingTop: 'env(safe-area-inset-top)',
                                 paddingBottom: 'env(safe-area-inset-bottom)',
                                 paddingLeft: 'env(safe-area-inset-left)',
                                 paddingRight: 'env(safe-area-inset-right)'
                             } : {}}
                        >
                            <div className={`relative w-full h-full flex-1 flex flex-col items-center justify-center overflow-hidden group ${isCssFullscreen ? '' : 'rounded-[inherit]'}`}>
                                
                                {isCssFullscreen && (
                                    <button 
                                        onClick={toggleFullScreen}
                                        className="absolute z-[60] p-3 sm:p-4 bg-black/60 text-white rounded-full backdrop-blur-md shadow-2xl active:scale-90 transition-transform"
                                        style={{ top: '16px', left: '16px' }}
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
                                                    tabIndex="-1"
                                                    src={getVideoUrl(currentStepData.videoUrl)}
                                                    className={`w-full h-full absolute inset-0 transition-opacity duration-700 ease-in-out no-callout ${isVideoLoading ? 'opacity-0' : 'opacity-100 z-10'}`}
                                                    sandbox="allow-scripts allow-same-origin allow-presentation"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                    title={`Step ${currentStepData.id} Video`}
                                                    onLoad={() => setIsVideoLoading(false)}
                                                />
                                                
                                                <div 
                                                    className="absolute top-0 left-0 w-full h-[75px] landscape:h-[110px] sm:h-[110px] z-20 bg-[rgba(255,255,255,0.01)] no-callout cursor-default" 
                                                    onContextMenu={e => e.preventDefault()} 
                                                />
                                                <div 
                                                    className="absolute bottom-0 left-0 w-[120px] landscape:w-[160px] h-[65px] landscape:h-[80px] z-20 bg-[rgba(255,255,255,0.01)] no-callout cursor-default" 
                                                    onContextMenu={e => e.preventDefault()} 
                                                />
                                                <div 
                                                    className="absolute bottom-0 right-0 w-[120px] landscape:w-[160px] h-[65px] landscape:h-[80px] z-20 bg-[rgba(255,255,255,0.01)] no-callout cursor-default" 
                                                    onContextMenu={e => e.preventDefault()} 
                                                />
                                                <div 
                                                    className="absolute top-[75px] landscape:top-[110px] sm:top-[110px] bottom-[65px] landscape:bottom-[80px] left-0 right-0 z-30 cursor-pointer flex items-center justify-center no-callout" 
                                                    onContextMenu={e => e.preventDefault()} 
                                                    onClick={togglePlayPause}
                                                    onDoubleClick={e => { e.preventDefault(); e.stopPropagation(); }}
                                                >
                                                    <div className={`transition-all duration-300 transform bg-black/50 backdrop-blur-md rounded-full p-4 sm:p-5 shadow-2xl pointer-events-none ${!isPlaying ? 'scale-100 opacity-100' : 'scale-150 opacity-0'}`}>
                                                        <PlayCircle size={60} className="text-white drop-shadow-lg" />
                                                    </div>
                                                </div>
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
                        </div>
                    </div>
                    
                    {!isCssFullscreen && currentStepData.videoUrl && (
                        <div className="flex flex-col sm:flex-row gap-3 mt-3 w-full">
                            <button 
                                onClick={toggleFullScreen}
                                className={`flex-1 py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold font-khmer text-[13px] sm:text-[14px] transition-all active:scale-[0.98] shadow-sm border ${isDarkMode ? 'bg-[#2C2C2C] border-[#3C3C3C] text-[#F1F1F1] hover:bg-[#3C3C3C]' : 'bg-white border-[#E5E7EB] text-[#1A1A1A] hover:bg-[#F8F9FA]'}`}
                            >
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
                <div className={`mb-8 p-5 rounded-[20px] border flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between ${isDarkMode ? 'bg-[#1E1E1E]/50 border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
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
                                className={`shrink-0 w-full sm:w-auto text-center px-5 py-3 rounded-xl font-khmer font-bold text-[13px] transition-transform active:scale-95 shadow-sm
                                    ${isDarkMode ? 'bg-[#41B6E6] text-[#0A0A0A] hover:bg-[#2CA0D0]' : 'bg-[#0277C5] text-white hover:bg-[#01579B]'}
                                `}
                            >
                                {lang === 'en' ? 'Download Assets (.zip)' : 'ទាញយកឯកសារ (.zip)'}
                            </a>
                        ) : (
                            <button onClick={() => triggerHaptic('error')} className={`shrink-0 w-full sm:w-auto text-center px-5 py-3 rounded-xl font-khmer font-bold text-[13px] transition-all cursor-not-allowed flex justify-center items-center gap-2
                                ${isDarkMode ? 'bg-[#2C2C2C] text-[#A0A0A0]' : 'bg-[#E5E7EB] text-[#6B7280]'}
                            `}>
                                <Lock size={14} /> {lang === 'en' ? 'Locked' : 'បានចាក់សោ'}
                            </button>
                        )
                    )}
                </div>
            )}

            {!isCssFullscreen && lesson.steps && lesson.steps.length > 0 && (
                <div className="flex flex-col gap-3 pb-6">
                    <h4 className={`text-sm font-bold uppercase tracking-widest px-2 opacity-50 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                        {lang === 'en' ? 'Course Content' : 'មាតិកាមេរៀន'}
                    </h4>
                    
                    {lesson.steps.map((step, idx) => {
                        const isActive = activeStep === idx;
                        const stepKey = `${lesson.id}_${step.id}`;
                        const isCompleted = completedSteps.includes(stepKey);

                        return (
                            <div 
                                key={step.id}
                                className={`flex items-center gap-3 p-3 sm:p-4 rounded-[20px] border transition-all duration-300 ease-out
                                    ${isActive 
                                        ? (isDarkMode ? 'bg-[#41B6E6]/10 border-[#41B6E6]/50 shadow-md' : 'bg-[#0277C5]/10 border-[#0277C5]/50 shadow-md') 
                                        : (isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]')
                                    }
                                `}
                            >
                                <button 
                                    onClick={() => { setActiveStep(idx); triggerHaptic(); }}
                                    className="flex-1 flex items-center gap-4 text-left active:scale-[0.98] transition-transform min-w-0"
                                >
                                    <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-[14px] shadow-inner
                                        ${isActive 
                                            ? (isDarkMode ? 'bg-[#41B6E6] text-[#0A0A0A]' : 'bg-[#0277C5] text-white') 
                                            : (isDarkMode ? 'bg-[#2C2C2C] text-[#A0A0A0]' : 'bg-[#F3F4F6] text-[#6B7280]')
                                        }
                                    `}>
                                        {isActive ? <PlayCircle size={18} className="ml-0.5" /> : step.id}
                                    </div>

                                    <div className="flex-1 min-w-0 pr-2">
                                        <p className={`text-[14px] sm:text-[15px] font-khmer leading-relaxed truncate
                                            ${isActive 
                                                ? (isDarkMode ? 'text-[#F1F1F1] font-bold' : 'text-[#1A1A1A] font-bold') 
                                                : (isDarkMode ? 'text-[#A0A0A0] font-medium' : 'text-[#4B5563] font-medium')
                                            }
                                        `}>
                                            {lang === 'en' ? step.english : step.khmer}
                                        </p>
                                    </div>
                                </button>

                                <button 
                                    onClick={(e) => handleToggleComplete(e, stepKey)}
                                    className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-transform active:scale-75
                                        ${isCompleted ? 'text-green-500 bg-green-500/10' : (isDarkMode ? 'text-[#3C3C3C] hover:text-[#A0A0A0]' : 'text-[#D1D5DB] hover:text-[#6B7280]')}
                                        ${!isPurchased ? 'opacity-30 cursor-not-allowed' : ''}
                                    `}
                                >
                                    {isCompleted ? <CheckCircle2 size={24} className="text-green-500" /> : <Circle size={24} />}
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

export default React.memo(LessonModal);