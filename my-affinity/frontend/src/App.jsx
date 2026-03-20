import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, PlayCircle, Sparkles, Zap, Facebook, Send, Globe, BookOpen, Award, Bot, Camera, PenTool, Book, Lock, KeyRound, AlertCircle, ChevronDown, Crown, LogOut, Copy, ShieldCheck, Database, Loader2, Maximize, Minimize, Clock, DownloadCloud, Circle, CheckCircle2, Trash2, X } from 'lucide-react';

// FIREBASE IMPORTS
import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, googleProvider, db } from './firebase'; 

import Header from './components/layout/Header';
import ToolsView from './components/features/tools/ToolsView';
import Test from './components/features/quiz/Test';
import ChatBot from './components/features/ai/ChatBot';
import LessonCard from './components/features/learn/LessonCard';

import { courseData, TIPS_LIST, TIPS_LIST_EN } from './data/data';
import { useLanguage, LanguageProvider } from './contexts/LanguageContext';

const triggerHaptic = (type = 'light') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        if (type === 'error') navigator.vibrate([50, 50, 50]);
        else if (type === 'success') navigator.vibrate([30, 50, 30]);
        else navigator.vibrate(10);
    }
};

const APP_THEMES = {
    photo: { gradient: 'from-[#B52885] to-[#223180]', text: 'text-[#B52885]', bg: 'bg-[#B52885]', border: 'border-[#B52885]', lightBg: 'bg-[#B52885]/10' },
    designer: { gradient: 'from-[#2862B5] to-[#F4B32A]', text: 'text-[#2862B5]', bg: 'bg-[#2862B5]', border: 'border-[#2862B5]', lightBg: 'bg-[#2862B5]/10' },
    publisher: { gradient: 'from-[#D7383D] to-[#532463]', text: 'text-[#D7383D]', bg: 'bg-[#D7383D]', border: 'border-[#D7383D]', lightBg: 'bg-[#D7383D]/10' }
};

const VALID_PASSCODES = {
    photo: ['PHOTO-A1B2C', 'PHOTO-X9Y8Z'],
    designer: ['DESIGN-A1B2C', 'DESIGN-X9Y8Z'],
    publisher: ['PUB-A1B2C', 'PUB-X9Y8Z']
};

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const ADMIN_EMAIL = 'koymy.mlk@gmail.com';

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
      const separator = url.includes('?') ? '&' : '?';
      return isPurchased 
          ? `${url}${separator}autoplay=1&playsinline=1&fs=0&modestbranding=1&rel=0` 
          : `${url}${separator}end=20&controls=0&disablekb=1&rel=0&autoplay=1&playsinline=1&fs=0&modestbranding=1`;
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
                        <div className="w-10 h-10 flex items-center justify-center bg-[#C65102]/10 rounded-[14px] text-[#C65102] border border-[#C65102]/20 shadow-[0_0_15px_rgba(198,81,2,0.15)] shrink-0 [&>svg]:w-5 [&>svg]:h-5">{lesson.icon}</div>
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
                                                    className={`w-full h-full absolute inset-0 transition-opacity duration-700 ease-in-out no-callout ${isVideoLoading ? 'opacity-0' : 'opacity-100 z-20'}`}
                                                    sandbox="allow-scripts allow-same-origin allow-presentation"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                    title={`Step ${currentStepData.id} Video`}
                                                    onLoad={() => setIsVideoLoading(false)}
                                                />
                                                
                                                <div 
                                                    className={`lg:hidden absolute top-0 left-0 h-[70px] z-30 bg-transparent no-callout cursor-default ${isCssFullscreen ? 'right-[60px]' : 'w-full'}`} 
                                                    onContextMenu={e => e.preventDefault()} 
                                                    onClick={e => { e.preventDefault(); e.stopPropagation(); }}
                                                    onDoubleClick={e => { e.preventDefault(); e.stopPropagation(); }}
                                                    onTouchStart={e => e.stopPropagation()} onTouchEnd={e => e.stopPropagation()} onPointerDown={e => e.stopPropagation()}
                                                />

                                                {isCssFullscreen && (
                                                    <div 
                                                        className="hidden lg:block absolute top-0 left-0 w-full h-[80px] z-30 bg-transparent no-callout cursor-default" 
                                                        onContextMenu={e => e.preventDefault()} 
                                                        onClick={e => { e.preventDefault(); e.stopPropagation(); }}
                                                        onDoubleClick={e => { e.preventDefault(); e.stopPropagation(); }}
                                                        onTouchStart={e => e.stopPropagation()} onTouchEnd={e => e.stopPropagation()} onPointerDown={e => e.stopPropagation()}
                                                    />
                                                )}

                                                <div 
                                                    className="lg:hidden absolute bottom-0 left-0 w-[80px] h-[60px] z-30 bg-transparent no-callout cursor-default" 
                                                    onContextMenu={e => e.preventDefault()} 
                                                    onClick={e => { e.preventDefault(); e.stopPropagation(); }}
                                                    onDoubleClick={e => { e.preventDefault(); e.stopPropagation(); }}
                                                    onTouchStart={e => e.stopPropagation()} onTouchEnd={e => e.stopPropagation()} onPointerDown={e => e.stopPropagation()}
                                                />

                                                <div 
                                                    className="lg:hidden absolute bottom-0 right-0 w-[120px] h-[55px] z-30 bg-transparent no-callout cursor-default" 
                                                    onContextMenu={e => e.preventDefault()} 
                                                    onClick={e => { e.preventDefault(); e.stopPropagation(); }}
                                                    onDoubleClick={e => { e.preventDefault(); e.stopPropagation(); }}
                                                    onTouchStart={e => e.stopPropagation()} onTouchEnd={e => e.stopPropagation()} onPointerDown={e => e.stopPropagation()}
                                                />

                                                <div 
                                                    className="hidden lg:block absolute bottom-[48px] right-[10px] w-[100px] h-[40px] z-30 bg-transparent no-callout cursor-default" 
                                                    onContextMenu={e => e.preventDefault()} 
                                                    onClick={e => { e.preventDefault(); e.stopPropagation(); }}
                                                    onDoubleClick={e => { e.preventDefault(); e.stopPropagation(); }}
                                                    onTouchStart={e => e.stopPropagation()} onTouchEnd={e => e.stopPropagation()} onPointerDown={e => e.stopPropagation()}
                                                />
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
                   <p key={safeTipIndex} className={`text-[15px] sm:text-base leading-relaxed border-l-[3px] pl-5 sm:pl-6 py-2 animate-fade-in-up ${lang === 'km' ? 'font-khmer' : 'font-sans'} ${isDarkMode ? 'text-[#F1F1F1] border-[#41B6E6]' : 'text-[#1A1A1A] border-[#0277C5]'}`}>
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
                        <span className="mt-0.5"><span className={`font-bold block mb-1 ${lang === 'km' ? 'font-khmer' : 'font-sans'} ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{t(`tip_${num}_title`)}</span> <span className={`${lang === 'km' ? 'font-khmer' : 'font-sans'} leading-relaxed`} dangerouslySetInnerHTML={{ __html: t(`tip_${num}_desc`) }} /></span>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
};

const ContactSection = ({ isDarkMode }) => {
    const { t } = useLanguage();
    return (
        <div className={`mt-16 mb-10 border-t pt-10 text-center ${isDarkMode ? 'border-[#2C2C2C]' : 'border-[#E5E7EB]'}`}>
            <div className="flex justify-center gap-8 sm:gap-10">
                <a href="https://web.facebook.com/myaffinity" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className={`w-14 h-14 flex items-center justify-center rounded-[20px] border shadow-sm ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}><Facebook className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} size={24} /></div>
                    <span className={`text-[11px] font-khmer tracking-wide ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Facebook</span>
                </a>
                <a href="https://t.me/koymy" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className={`w-14 h-14 flex items-center justify-center rounded-[20px] border shadow-sm ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}><Send className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} size={24} /></div>
                    <span className={`text-[11px] font-khmer tracking-wide ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Telegram</span>
                </a>
                <a href="https://myaffinity.gumroad.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 hover:opacity-80 transition-opacity">
                      <div className={`w-14 h-14 flex items-center justify-center rounded-[20px] border shadow-sm ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}><Globe className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} size={24} /></div>
                    <span className={`text-[11px] font-khmer tracking-wide ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Website</span>
                </a>
            </div>
            <p className={`text-center text-[10px] mt-10 font-khmer uppercase opacity-50 tracking-widest ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{t('footer_copy')}</p>
        </div>
    );
};

function AppContent() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('learn');
  const [activeAppTab, setActiveAppTab] = useState(null); 
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false); 
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [completedSteps, setCompletedSteps] = useState([]);
  
  const [user, setUser] = useState(null);

  // 🌟 TWO-LEVEL ADMIN LOGIC
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [showSuperAdminModal, setShowSuperAdminModal] = useState(false);
  const [superAdminTab, setSuperAdminTab] = useState('ai'); // 'ai' or 'cert'

  useEffect(() => {
      const unlockSuperAdmin = () => setIsSuperAdmin(true);
      const toggleSuperAdminPanel = () => setShowSuperAdminModal(prev => !prev);
      
      window.addEventListener('superAdminUnlocked', unlockSuperAdmin);
      window.addEventListener('toggleSuperAdminPanel', toggleSuperAdminPanel);
      
      return () => {
          window.removeEventListener('superAdminUnlocked', unlockSuperAdmin);
          window.removeEventListener('toggleSuperAdminPanel', toggleSuperAdminPanel);
      };
  }, []);

  const isBasicAdmin = user?.email === ADMIN_EMAIL;
  const showAdminPanel = isBasicAdmin || isSuperAdmin;

  const [genAmount, setGenAmount] = useState(5);
  const [generatedKeys, setGeneratedKeys] = useState('');
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [isFetchingKeys, setIsFetchingKeys] = useState(false); 

  const [purchasedCourses, setPurchasedCourses] = useState({ photo: null, designer: null, publisher: null });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState(''); 
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // --- NEW AI TRAINING STATES ---
  const [liveAiData, setLiveAiData] = useState(() => {
      if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('myAffinity_live_ai');
          return saved ? JSON.parse(saved) : [];
      }
      return [];
  });

  const fetchCloudAI = async () => {
      try {
          const q = query(collection(db, "ai_knowledge"));
          const snap = await getDocs(q);
          const cloudData = [];
          snap.forEach(doc => cloudData.push(doc.data()));
          if (cloudData.length > 0) {
              setLiveAiData(cloudData);
              localStorage.setItem('myAffinity_live_ai', JSON.stringify(cloudData));
          } else {
              const saved = localStorage.getItem('myAffinity_live_ai');
              if (saved) setLiveAiData(JSON.parse(saved));
          }
      } catch(e) {
          const saved = localStorage.getItem('myAffinity_live_ai');
          if (saved) setLiveAiData(JSON.parse(saved));
      }
  };

  useEffect(() => {
      if (showAdminPanel && activeAppTab && showRegistration) {
          const savedKeys = localStorage.getItem(`myAffinity_last_keys_${activeAppTab}`);
          if (savedKeys) {
              setGeneratedKeys(savedKeys);
          } else {
              setGeneratedKeys('');
          }
      }
  }, [activeAppTab, showRegistration, showAdminPanel]);

  useEffect(() => {
      if (typeof window !== 'undefined') {
          const savedTheme = localStorage.getItem('myAffinity_theme');
          if (savedTheme !== null) setIsDarkMode(savedTheme === 'dark');
          
          const savedSteps = localStorage.getItem('myAffinity_completed_steps');
          if (savedSteps) setCompletedSteps(JSON.parse(savedSteps));

          const savedPurchases = localStorage.getItem('myAffinity_purchases');
          if (savedPurchases) {
              const parsed = JSON.parse(savedPurchases);
              const validatedPurchases = { photo: null, designer: null, publisher: null };
              const now = Date.now();
              for (const app in parsed) {
                  if (parsed[app] && parsed[app].expiry > now) {
                      validatedPurchases[app] = parsed[app];
                  }
              }
              setPurchasedCourses(validatedPurchases);
          }

          const unsubscribe = auth.onAuthStateChanged((currentUser) => {
              setUser(currentUser);
          });
          
          fetchCloudAI();
          setIsDataLoaded(true); 
          return () => unsubscribe();
      }
  }, []);

  const [chatMessages, setChatMessages] = useState([]);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
      const newBgColor = isDarkMode ? '#0A0A0A' : '#F4F5F7';
      let metaTheme = document.querySelector("meta[name='theme-color']");
      if (metaTheme) metaTheme.setAttribute("content", newBgColor);
      document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
      document.documentElement.style.backgroundColor = newBgColor;
      document.body.style.backgroundColor = newBgColor;

      if (isDataLoaded) {
          localStorage.setItem('myAffinity_theme', isDarkMode ? 'dark' : 'light');
      }
  }, [isDarkMode, isDataLoaded]);

  // Syncing ALL data to localStorage
  useEffect(() => {
      if (isDataLoaded) {
          localStorage.setItem('myAffinity_completed_steps', JSON.stringify(completedSteps));
          localStorage.setItem('myAffinity_purchases', JSON.stringify(purchasedCourses));
          localStorage.setItem('myAffinity_live_ai', JSON.stringify(liveAiData));
      }
  }, [completedSteps, purchasedCourses, liveAiData, isDataLoaded]);

  useEffect(() => {
    const handlePopState = (event) => {
        if (expandedLesson !== null) {
            setExpandedLesson(null);
            window.history.pushState({ modalOpen: true, tab: activeTab, course: activeAppTab }, '');
            return;
        }
        if (activeAppTab !== null) {
            setActiveAppTab(null);
            setShowRegistration(false);
            window.history.pushState({ modalOpen: false, tab: activeTab, course: null }, '');
            return;
        }
        if (activeTab !== 'learn') {
            setActiveTab('learn');
            window.history.pushState({ modalOpen: false, tab: 'learn', course: null }, '');
            return;
        }
    };
    window.addEventListener('popstate', handlePopState);
    window.history.pushState({ modalOpen: false, tab: activeTab, course: null }, '');
    return () => window.removeEventListener('popstate', handlePopState);
  }, [expandedLesson, activeAppTab, activeTab]);

  useEffect(() => {
    const handleSwitchTab = (e) => {
        if (e.detail) { 
            setActiveTab(e.detail); 
            setExpandedLesson(null); 
            setActiveAppTab(null);
            window.history.pushState({ modalOpen: false, tab: e.detail, course: null }, '');
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

  useEffect(() => {
      if (typeof window !== 'undefined' && window.screen && window.screen.orientation && window.screen.orientation.unlock) {
          try { window.screen.orientation.unlock(); } catch (e) {}
      }
  }, []);

  const handleOpenCourse = (courseId) => {
      setActiveAppTab(courseId);
      setShowRegistration(false);
      setPasscodeError('');
      triggerHaptic();
      window.history.pushState({ modalOpen: true, tab: activeTab, course: courseId }, '');
  };

  const handleOpenLesson = (lessonId) => {
      setExpandedLesson(lessonId);
      window.history.pushState({ modalOpen: true, tab: activeTab, course: activeAppTab }, '');
  };

  const getSelectedLesson = () => {
      if (!expandedLesson || !activeAppTab) return null;
      return courseData[activeAppTab].find(l => l.id === expandedLesson);
  };

  const handleVerifyPasscode = async () => {
      if (!activeAppTab) return;
      const code = passcodeInput.trim().toUpperCase();
      setIsVerifying(true);
      setPasscodeError('');

      try {
          const keyRef = doc(db, "keys", code);
          const keySnap = await getDoc(keyRef);

          if (keySnap.exists()) {
              const keyData = keySnap.data();
              const now = Date.now();

              if (keyData.status === 'unused' && (now - keyData.createdAt > SEVEN_DAYS_MS)) {
                  triggerHaptic('error');
                  setPasscodeError(lang === 'en' ? 'Key expired (over 7 days).' : 'លេខកូដនេះផុតកំណត់ហើយ។');
                  setIsVerifying(false);
                  return;
              }

              if (keyData.status === 'unused' && keyData.course === activeAppTab) {
                  await updateDoc(keyRef, { status: 'used', usedAt: now, usedBy: user ? user.uid : 'anonymous_device' });
                  
                  const updatedPurchases = {
                      ...purchasedCourses,
                      [activeAppTab]: { unlocked: true, expiry: now + ONE_YEAR_MS, keyUsed: code }
                  };
                  setPurchasedCourses(updatedPurchases);

                  if (user) {
                      await setDoc(doc(db, "users", user.uid), { purchasedCourses: updatedPurchases }, { merge: true });
                  }

                  triggerHaptic('success');
                  setPasscodeInput('');
                  setShowRegistration(false);
              } else {
                  triggerHaptic('error');
                  setPasscodeError(lang === 'en' ? 'Key already used or invalid course.' : 'លេខកូដនេះត្រូវបានប្រើរួចហើយ ឬខុសវគ្គ។');
              }
          } 
          else if (VALID_PASSCODES[activeAppTab].includes(code)) {
              triggerHaptic('success');
              const updatedPurchases = { ...purchasedCourses, [activeAppTab]: { unlocked: true, expiry: Date.now() + ONE_YEAR_MS, keyUsed: code }};
              setPurchasedCourses(updatedPurchases);
              if (user) await setDoc(doc(db, "users", user.uid), { purchasedCourses: updatedPurchases }, { merge: true });
              setPasscodeInput('');
              setShowRegistration(false);
          } else {
              triggerHaptic('error');
              setPasscodeError(lang === 'en' ? 'Invalid Key Code.' : 'លេខកូដមិនត្រឹមត្រូវ។');
          }
      } catch(error) {
          console.error("Verification error", error);
          setPasscodeError("Connection error. Please try again.");
      }
      setIsVerifying(false);
  };

  const syncPurchasesToCloud = async (loggedInUser) => {
      const userRef = doc(db, "users", loggedInUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
          const data = userSnap.data();
          if (data.purchasedCourses) {
              const mergedPurchases = { ...purchasedCourses };
              let hasChanges = false;
              for (const course in data.purchasedCourses) {
                  if (data.purchasedCourses[course] && data.purchasedCourses[course].expiry > Date.now()) {
                      mergedPurchases[course] = data.purchasedCourses[course];
                      hasChanges = true;
                  }
              }
              if (hasChanges) setPurchasedCourses(mergedPurchases);
          }
      } else {
          if (Object.values(purchasedCourses).some(c => c !== null)) {
              await setDoc(userRef, { purchasedCourses });
          }
      }
  };

  const handleGoogleLogin = async () => { 
      triggerHaptic(); 
      try {
          googleProvider.setCustomParameters({ prompt: 'select_account' });
          const result = await signInWithPopup(auth, googleProvider);
          const loggedInUser = result.user;
          setUser(loggedInUser);
          await syncPurchasesToCloud(loggedInUser);
      } catch (error) {
          console.error("Error signing in with Google:", error.message);
          alert(lang === 'en' ? "Failed to sign in." : "ការចូលបរាជ័យ។");
      }
  };

  const handleLogout = async () => {
      triggerHaptic();
      try {
          await signOut(auth);
          setUser(null);
          setIsSuperAdmin(false); 
          setPurchasedCourses({ photo: null, designer: null, publisher: null });
          localStorage.removeItem('myAffinity_purchases');
      } catch (error) {
          console.error("Error signing out:", error);
      }
  };

  const handleSignOutDevice = () => {
      triggerHaptic();
      
      let message = '';
      if (!user && !isSuperAdmin) {
          message = lang === 'en' 
              ? '⚠️ WARNING: You have NOT linked a Google account!\n\nIf you sign out now, you will LOSE ACCESS to your premium course permanently. Are you absolutely sure you want to sign out?' 
              : '⚠️ ព្រមាន៖ អ្នកមិនទាន់បានភ្ជាប់គណនី Google ទេ!\n\nប្រសិនបើអ្នកចាកចេញឥឡូវនេះ អ្នកនឹងបាត់បង់សិទ្ធិចូលរៀនវគ្គ Premium នេះជារៀងរហូត។ តើអ្នកពិតជាចង់ចាកចេញមែនទេ?';
      } else {
          message = lang === 'en'
              ? 'Are you sure you want to sign out?\n\nYour purchase is safely linked to your Google account. You can sign in again later on this or another device.'
              : 'តើអ្នកប្រាកដជាចង់ចាកចេញពីឧបករណ៍នេះទេ?\n\nសិទ្ធិ Premium របស់អ្នកត្រូវបានរក្សាទុកដោយសុវត្ថិភាពក្នុងគណនី Google របស់អ្នក។ អ្នកអាចចូលគណនីម្ដងទៀតនៅពេលក្រោយ។';
      }

      if(window.confirm(message)) {
          handleLogout();
          setShowRegistration(false);
      }
  };

  const handleGenerateAdminKeys = async () => {
      triggerHaptic();
      if (!activeAppTab) return;
      
      const prefix = activeAppTab === 'photo' ? 'PHOTO' : activeAppTab === 'designer' ? 'DESIGN' : 'PUB';
      let newKeys = [];

      try {
          for(let i=0; i<genAmount; i++){
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
              let randomStr = '';
              for(let j=0; j<5; j++) {
                  randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
              }
              
              const keyCode = `${prefix}-${randomStr}`;
              newKeys.push(keyCode);

              await setDoc(doc(db, "keys", keyCode), {
                  course: activeAppTab,
                  createdAt: Date.now(),
                  status: 'unused'
              });
          }
          const keysString = newKeys.join('\n');
          setGeneratedKeys(keysString);
          localStorage.setItem(`myAffinity_last_keys_${activeAppTab}`, keysString);
      } catch (error) {
          console.error("Error generating keys:", error);
          alert("Failed to generate keys in database.");
      }
  };

  const handleFetchUnusedKeys = async () => {
      triggerHaptic();
      setIsFetchingKeys(true);
      setGeneratedKeys(''); 
      
      try {
          const q = query(collection(db, "keys"), where("course", "==", activeAppTab));
          const querySnapshot = await getDocs(q);
          
          let keys = [];
          const now = Date.now();
          
          querySnapshot.forEach((docSnap) => {
              const data = docSnap.data();
              if (data.status === 'unused' && (now - data.createdAt <= SEVEN_DAYS_MS)) {
                  keys.push(docSnap.id);
              }
          });
          
          if (keys.length > 0) {
              const keysString = keys.join('\n');
              setGeneratedKeys(keysString);
              localStorage.setItem(`myAffinity_last_keys_${activeAppTab}`, keysString);
          } else {
              alert(lang === 'en' ? "No active unused keys found." : "មិនមានលេខកូដដែលនៅទំនេរទេសម្រាប់វគ្គនេះ។");
              localStorage.removeItem(`myAffinity_last_keys_${activeAppTab}`);
          }
      } catch (error) {
          console.error("Error fetching unused keys:", error);
          alert("Failed to fetch keys from database.");
      } finally {
          setIsFetchingKeys(false);
      }
  };

  const shareSingleKeyTelegram = (code) => {
      triggerHaptic();
      const appName = getAppDisplayName(activeAppTab);
      
      const textEn = `🎉 Thank you for your purchase! Here is your Premium Activation Key for the ${appName}:\n\n🔑 ${code}\n\n⚠️ IMPORTANT:\n1. This code is for ONE-TIME USE only.\n2. Please link your Google Account immediately after unlocking to secure your access.\n3. Your account supports a maximum of 2 devices.\n\nEnjoy learning!`;
      
      const textKm = `🙏 សូមអរគុណសម្រាប់ការគាំទ្រ! នេះគឺជាលេខកូដ Premium Member របស់អ្នកសម្រាប់វគ្គសិក្សា ${appName}៖\n\n🔑 ${code}\n\n📝 ព័ត៌មានសំខាន់ៗដែលត្រូវដឹង៖\n១. លេខកូដនេះអាចប្រើប្រាស់បានតែម្តងគត់ (One-time use)។\n២. សូមភ្ជាប់គណនី Google របស់អ្នក ដើម្បីរក្សាសិទ្ធិប្រើប្រាស់ និង អាចភ្ជាប់មេរៀនលើឧបករណ៍ផ្សេងទៀត\n៣. គណនីរបស់អ្នកអាចប្រើប្រាស់បានអតិបរមាត្រឹម ២ ឧបករណ៍ប៉ុណ្ណោះ។\n\nសូមរីករាយក្នុងការសិក្សា!`;
      
      const message = lang === 'en' ? textEn : textKm;
      const url = `https://t.me/share/url?url=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
  };

  const handleCopyAllCodes = () => {
      triggerHaptic();
      navigator.clipboard.writeText(generatedKeys);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
  };

  // 🌟 TRIGGER CERTIFICATE TEST FROM ADMIN PANEL
  const testCertificate = (appId) => {
      triggerHaptic('success');
      setShowSuperAdminModal(false);
      setActiveTab('quiz'); 
      setTimeout(() => {
          window.dispatchEvent(new CustomEvent('forceTestCertificate', { detail: appId }));
      }, 150); 
  };

  const currentCourseData = activeAppTab ? (courseData[activeAppTab] || []) : [];
  const totalSteps = currentCourseData.reduce((acc, lesson) => acc + (lesson.steps?.length || 0), 0);
  const progressPrefix = activeAppTab === 'photo' ? 'ph' : activeAppTab === 'designer' ? 'ds' : 'pb';
  const completedInThisTab = completedSteps.filter(id => id.startsWith(progressPrefix)).length;
  const progressPercentage = totalSteps === 0 ? 0 : Math.round((completedInThisTab / totalSteps) * 100);

  const isCoursePurchased = showAdminPanel || (activeAppTab ? purchasedCourses[activeAppTab]?.unlocked === true : false);
  const theme = activeAppTab ? APP_THEMES[activeAppTab] : APP_THEMES.photo;
  
  const getAppDisplayName = (id) => id === 'photo' ? 'Affinity Photo 2 iPad' : id === 'designer' ? 'Affinity Designer 2 iPad' : 'Affinity Publisher 2 iPad';
  const appDisplayName = activeAppTab ? getAppDisplayName(activeAppTab) : '';

  const getKhmerCourseTitle = (id) => {
      if (id === 'photo') return 'វគ្គសិក្សា Photo 2 iPad';
      if (id === 'designer') return 'វគ្គសិក្សា Designer 2 iPad';
      if (id === 'publisher') return 'វគ្គសិក្សា Publisher 2 iPad';
      return 'ចុះឈ្មោះវគ្គបច្ចេកទេសជំនាញ';
  };
  
  const telegramMessage = lang === 'en' 
    ? `Hello! I would like to purchase the full 1-year access for the ${appDisplayName} course for $20. Here is my payment screenshot:` 
    : `សួស្តី! ខ្ញុំចង់ទិញសិទ្ធិចូលរៀនវគ្គ ${appDisplayName} រយៈពេល១ឆ្នាំពេញ ក្នុងតម្លៃ $20។ នេះជារូបភាពវិក្កយបត្របង់ប្រាក់របស់ខ្ញុំ៖`;
  
  const telegramUrl = `https://t.me/koymy?text=${encodeURIComponent(telegramMessage)}`;

  const getInputPlaceholder = () => {
      if (lang !== 'en') return "បញ្ចូលលេខកូដសម្ងាត់...";
      if (activeAppTab === 'photo') return "PHOTO-XXXXX";
      if (activeAppTab === 'designer') return "DESIGN-XXXXX";
      if (activeAppTab === 'publisher') return "PUB-XXXXX";
      return "CODE-XXXXX";
  };

  return (
    <div 
        className={`fixed inset-0 w-full h-full flex flex-col font-khmer overflow-hidden touch-pan-x touch-pan-y transition-colors duration-500 ${isDarkMode ? 'bg-[#0A0A0A] text-[#F1F1F1]' : 'bg-[#F4F5F7] text-[#1A1A1A]'}`}
        onContextMenu={(e) => e.preventDefault()}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@100..700&display=swap'); 
        body, html { overscroll-behavior: none; background-color: ${isDarkMode ? '#0A0A0A' : '#F4F5F7'}; transition: background-color 0.5s ease; } 
        .font-khmer { font-family: 'Kantumruy Pro', sans-serif; } 
        .no-scrollbar::-webkit-scrollbar { display: none; } 
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px) scale(0.99); } to { opacity: 1; transform: translateY(0) scale(1); } } 
        .animate-fade-in-up { animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
      
      {/* 🌟 FIXED HEADER VISIBILITY 🌟 */}
      <div 
          style={{ paddingTop: 'max(env(safe-area-inset-top), 0px)' }} 
          className={`w-full shrink-0 ${(activeTab === 'tools' || activeTab === 'ai') ? 'hidden md:block' : 'block'}`}
      >
          <Header activeTab={activeTab} setActiveTab={(tab) => {
              setActiveTab(tab);
              window.history.pushState({ modalOpen: false, tab: tab, course: null }, '');
          }} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>

      {/* 🌟 GLOBAL SUPER ADMIN PANEL 🌟 */}
      {showSuperAdminModal && isSuperAdmin && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
              <div className={`w-full max-w-2xl max-h-[85vh] rounded-[32px] flex flex-col border shadow-2xl relative overflow-hidden ${isDarkMode ? 'bg-[#121212] border-[#3A3A3C]' : 'bg-white border-[#E5E7EB]'}`}>
                  
                  <div className={`flex items-center justify-between p-5 border-b ${isDarkMode ? 'border-[#2C2C2C]' : 'border-[#E5E7EB]'}`}>
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg">
                              <Crown size={20} />
                          </div>
                          <div>
                              <h2 className={`font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>Super Admin Panel</h2>
                              <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>System Management</p>
                          </div>
                      </div>
                      <button onClick={() => setShowSuperAdminModal(false)} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#2C2C2C] text-[#A0A0A0]' : 'hover:bg-gray-100 text-gray-500'}`}>
                          <X size={20} />
                      </button>
                  </div>

                  <div className={`flex p-3 gap-2 border-b ${isDarkMode ? 'border-[#2C2C2C] bg-[#1A1A1A]' : 'border-[#E5E7EB] bg-gray-50'}`}>
                      <button onClick={() => setSuperAdminTab('ai')} className={`flex-1 py-2.5 rounded-xl font-bold text-[13px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${superAdminTab === 'ai' ? (isDarkMode ? 'bg-[#2C2C2C] text-[#41B6E6] shadow-sm border border-[#3A3A3C]' : 'bg-white text-[#0277C5] shadow-sm border border-[#E5E7EB]') : (isDarkMode ? 'text-[#6B7280] hover:text-[#A0A0A0]' : 'text-[#9CA3AF] hover:text-gray-600')}`}><Database size={16}/> AI Studio</button>
                      <button onClick={() => setSuperAdminTab('cert')} className={`flex-1 py-2.5 rounded-xl font-bold text-[13px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${superAdminTab === 'cert' ? (isDarkMode ? 'bg-[#2C2C2C] text-[#41B6E6] shadow-sm border border-[#3A3A3C]' : 'bg-white text-[#0277C5] shadow-sm border border-[#E5E7EB]') : (isDarkMode ? 'text-[#6B7280] hover:text-[#A0A0A0]' : 'text-[#9CA3AF] hover:text-gray-600')}`}><Award size={16}/> Certificates</button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-inherit">
                      {superAdminTab === 'ai' ? (
                          <div className="animate-fade-in-up space-y-4">
                              <p className={`text-[13px] font-khmer leading-relaxed ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>
                                  Manage the AI training data you added directly from the AI Chat. When ready, copy the final Data Code to update your main <code className="bg-black/20 px-1 rounded">data.js</code> file.
                              </p>
                              
                              <div className="flex gap-3 pt-2 mb-2">
                                  <button 
                                      onClick={() => {
                                          if (liveAiData.length === 0) return;
                                          triggerHaptic('success');
                                          let codeStr = "";
                                          liveAiData.forEach(item => {
                                              codeStr += `    {\n        primaryKeys: ${JSON.stringify(item.primaryKeys)},\n        keys: ${JSON.stringify(item.keys)},\n        regex: ${JSON.stringify(item.regex)},\n        answer: ${JSON.stringify(item.answer)},\n        answer_en: ${JSON.stringify(item.answer_en)}\n    },\n`;
                                          });
                                          navigator.clipboard.writeText(codeStr);
                                          alert("AI Data Code Copied! Paste this inside KNOWLEDGE_BASE in your data.js file.");
                                      }}
                                      className={`w-full py-3.5 rounded-2xl font-bold text-[13px] transition-all flex items-center justify-center gap-2 shadow-lg ${liveAiData.length === 0 ? 'opacity-50 cursor-not-allowed bg-gray-500 text-white' : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90'}`}
                                  >
                                      <Copy size={16} /> Copy All Data Code ({liveAiData.length} Entries)
                                  </button>
                              </div>

                              {liveAiData.length > 0 && (
                                  <div className="mt-4 border-t border-dashed border-gray-500/30 pt-4">
                                      <div className="flex justify-between items-center mb-3">
                                          <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>{liveAiData.length} Live Offline Entries</span>
                                          <button onClick={() => { if(window.confirm('Clear all offline training data?')) { setLiveAiData([]); localStorage.removeItem('myAffinity_live_ai'); } }} className="text-red-500 hover:text-red-400"><Trash2 size={16}/></button>
                                      </div>
                                      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                                          {liveAiData.map((data, i) => (
                                              <div key={i} className={`p-3.5 rounded-xl border text-[11px] font-khmer leading-relaxed relative ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C] text-[#A0A0A0]' : 'bg-[#F8F9FA] border-[#E5E7EB] text-[#6B7280]'}`}>
                                                  <button 
                                                      onClick={() => {
                                                          triggerHaptic();
                                                          const updated = liveAiData.filter((_, index) => index !== i);
                                                          setLiveAiData(updated);
                                                          localStorage.setItem('myAffinity_live_ai', JSON.stringify(updated));
                                                      }}
                                                      className="absolute top-2 right-2 text-red-500 hover:text-red-400 p-1.5 bg-red-500/10 rounded-md transition-colors"
                                                      title="Remove this entry"
                                                  >
                                                      <Trash2 size={14} />
                                                  </button>
                                                  <div className="pr-8 space-y-1.5">
                                                      <div><strong className={isDarkMode ? 'text-white' : 'text-black'}>Keys: </strong> {data.keys.join(', ')}</div>
                                                      <div><strong className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}>KM: </strong> <span className="line-clamp-2">{data.answer}</span></div>
                                                      <div><strong className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}>EN: </strong> <span className="line-clamp-2">{data.answer_en}</span></div>
                                                  </div>
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                              )}
                          </div>
                      ) : (
                          <div className="animate-fade-in-up space-y-4">
                              <p className={`text-[13px] font-khmer leading-relaxed ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>
                                  Instantly generate and view passing certificates to verify rendering and UI without taking the 40-question exam.
                              </p>
                              <div className="grid gap-3">
                                  <button onClick={() => testCertificate('photo')} className={`w-full p-4 rounded-2xl font-black font-khmer flex items-center justify-between border transition-all active:scale-[0.98] ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] hover:border-[#41B6E6]/50' : 'bg-[#F8F9FA] border-[#E5E7EB] hover:border-[#0277C5]/50'}`}>
                                      <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-xl bg-[#B52885]/10 text-[#B52885] flex items-center justify-center"><Camera size={20}/></div>
                                          <span className={isDarkMode ? 'text-white' : 'text-black'}>Affinity Photo Certificate</span>
                                      </div>
                                      <ChevronRight size={18} className="opacity-50"/>
                                  </button>
                                  <button onClick={() => testCertificate('designer')} className={`w-full p-4 rounded-2xl font-black font-khmer flex items-center justify-between border transition-all active:scale-[0.98] ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] hover:border-[#41B6E6]/50' : 'bg-[#F8F9FA] border-[#E5E7EB] hover:border-[#0277C5]/50'}`}>
                                      <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-xl bg-[#2862B5]/10 text-[#2862B5] flex items-center justify-center"><PenTool size={20}/></div>
                                          <span className={isDarkMode ? 'text-white' : 'text-black'}>Affinity Designer Certificate</span>
                                      </div>
                                      <ChevronRight size={18} className="opacity-50"/>
                                  </button>
                                  <button onClick={() => testCertificate('publisher')} className={`w-full p-4 rounded-2xl font-black font-khmer flex items-center justify-between border transition-all active:scale-[0.98] ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] hover:border-[#41B6E6]/50' : 'bg-[#F8F9FA] border-[#E5E7EB] hover:border-[#0277C5]/50'}`}>
                                      <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-xl bg-[#D7383D]/10 text-[#D7383D] flex items-center justify-center"><Book size={20}/></div>
                                          <span className={isDarkMode ? 'text-white' : 'text-black'}>Affinity Publisher Certificate</span>
                                      </div>
                                      <ChevronRight size={18} className="opacity-50"/>
                                  </button>
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}
      
      {expandedLesson && (
        <LessonModal 
            lesson={getSelectedLesson()} 
            onClose={() => {
                setExpandedLesson(null);
                if (window.history.state && window.history.state.modalOpen) window.history.back(); 
            }} 
            isDarkMode={isDarkMode} 
            completedSteps={completedSteps}
            setCompletedSteps={setCompletedSteps}
            isPurchased={isCoursePurchased}
            onUnlockDemo={() => setPurchasedCourses(prev => ({...prev, [activeAppTab]: { unlocked: true, expiry: Date.now() + ONE_YEAR_MS }}))}
        />
      )}

      {/* 🌟 FULL SCREEN COURSE PANEL 🌟 */}
      {activeAppTab && !expandedLesson && (
        <div className={`fixed inset-0 z-[60] overflow-y-auto custom-scrollbar flex flex-col ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#F4F5F7]'}`}>
            
            <div 
                className={`sticky top-0 z-50 px-4 pb-3 border-b flex items-center justify-between backdrop-blur-xl ${isDarkMode ? 'border-[#2C2C2C] bg-[#0A0A0A]/90' : 'border-[#E5E7EB] bg-[#FFFFFF]/90'}`}
                style={{ paddingTop: 'max(env(safe-area-inset-top), 12px)' }}
            >
                <button onClick={() => { setActiveAppTab(null); window.history.back(); }} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#1E1E1E]' : 'hover:bg-gray-100'}`}>
                    <ChevronRight className="w-6 h-6 rotate-180" />
                </button>
                <h2 className={`font-black text-lg text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient}`}>{appDisplayName}</h2>
                <div className="w-10"></div> 
            </div>

            <div 
                className="p-4 md:p-8 max-w-7xl mx-auto w-full flex-1"
                style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 40px)' }}
            >
                <div className={`mb-8 border rounded-3xl overflow-hidden shadow-md ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                    <button 
                        onClick={() => setShowRegistration(!showRegistration)} 
                        className={`w-full p-6 flex items-center justify-between transition-colors active:scale-[0.99] relative overflow-hidden ${showRegistration ? (isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#F8F9FA]') : ''}`}
                    >
                        <div className={`absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-gradient-to-r ${theme.gradient}`}></div>
                        
                        <div className="flex items-center gap-4 relative z-10 w-full">
                            {isCoursePurchased ? (
                                <div className={`w-14 h-14 flex items-center justify-center shrink-0 rounded-[18px] shadow-inner ${theme.lightBg}`}>
                                    {showAdminPanel ? <ShieldCheck size={28} className={theme.text} /> : <Crown size={28} className={theme.text} />}
                                </div>
                            ) : (
                                <div className={`w-14 h-14 flex items-center justify-center shrink-0 rounded-[18px] shadow-inner ${theme.lightBg}`}>
                                    <Lock size={28} className={theme.text} />
                                </div>
                            )}
                            
                            <div className="text-left flex-1 min-w-0">
                                <h3 className={`font-black font-khmer text-[17px] md:text-xl truncate ${isCoursePurchased ? theme.text : (isDarkMode ? 'text-white' : 'text-black')}`}>
                                    {isCoursePurchased 
                                        ? (showAdminPanel ? 'Admin Control Panel' : 'Premium Member') 
                                        : (lang === 'en' ? `Register for ${appDisplayName}` : `ចុះឈ្មោះវគ្គ ${appDisplayName}`)}
                                </h3>
                                {isCoursePurchased && (
                                    <p className={`text-[13px] font-bold mt-1 truncate ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Account Info & Settings</p>
                                )}
                            </div>
                        </div>
                        <ChevronDown className={`w-6 h-6 shrink-0 relative z-10 transition-transform duration-300 ${showRegistration ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showRegistration && (
                        <div className={`p-6 md:p-10 border-t ${isDarkMode ? 'border-[#2C2C2C]' : 'border-[#E5E7EB]'} animate-fade-in-up relative overflow-hidden`}>
                            <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] pointer-events-none bg-gradient-to-br ${theme.gradient} opacity-20`}></div>
                            
                            <div className="max-w-3xl mx-auto relative z-10">
                                
                                {showAdminPanel ? (
                                    <div className={`p-5 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                        <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${theme.gradient} rounded-full blur-[60px] opacity-10 pointer-events-none`}></div>
                                        <h4 className={`text-xl font-black font-khmer flex items-center gap-3 mb-6 ${theme.text}`}>
                                            <ShieldCheck className="w-6 h-6"/> Key Generator
                                        </h4>

                                        {/* --- ONLY KEY MANAGER UI HERE (AI Studio moved to global panel) --- */}
                                        <div className="animate-fade-in-up">
                                            <p className={`text-[14px] mb-6 font-khmer leading-relaxed ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>
                                                Generate secure, single-use activation keys for <strong>{appDisplayName}</strong>. Keys automatically expire 7 days after generation.
                                            </p>
                                            
                                            <div className="flex gap-3 mb-4">
                                                <input 
                                                    type="number" 
                                                    value={genAmount} 
                                                    onChange={e => setGenAmount(Number(e.target.value))}
                                                    className={`w-24 p-3.5 rounded-2xl border text-center outline-none font-bold text-lg transition-colors shadow-inner ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C] text-white focus:border-[#41B6E6]' : 'bg-gray-50 border-[#E5E7EB] text-black focus:border-[#0277C5]'}`}
                                                    min="1" max="50"
                                                />
                                                <button onClick={handleGenerateAdminKeys} className={`flex-1 rounded-2xl font-bold font-khmer text-[15px] text-white transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 bg-gradient-to-r ${theme.gradient}`}>
                                                    Generate Keys
                                                </button>
                                            </div>

                                            <button 
                                                onClick={handleFetchUnusedKeys} 
                                                disabled={isFetchingKeys}
                                                className={`w-full py-3.5 mb-6 rounded-2xl border font-bold font-khmer text-[14px] transition-all flex items-center justify-center gap-2 shadow-sm ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C] text-[#A0A0A0] hover:text-white hover:border-[#41B6E6]/50' : 'bg-white border-[#E5E7EB] text-gray-600 hover:text-black hover:border-[#0277C5]/50'}`}
                                            >
                                                {isFetchingKeys ? <Loader2 size={18} className="animate-spin" /> : <Database size={18} />}
                                                {lang === 'en' ? 'View Available Unused Keys' : 'មើលលេខកូដដែលនៅទំនេរ'}
                                            </button>

                                            {generatedKeys && (
                                                <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar animate-fade-in-up pr-2">
                                                    <div className="flex justify-between items-center mb-3 sticky top-0 bg-inherit py-1 z-10">
                                                        <span className={`text-xs font-bold uppercase tracking-widest ${theme.text}`}>
                                                            {generatedKeys.split('\n').length} Codes Ready
                                                        </span>
                                                        <button onClick={handleCopyAllCodes} className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-colors ${theme.text} ${theme.lightBg} hover:opacity-80`}>
                                                            {copiedAll ? <CheckCircle size={14}/> : <Copy size={14}/>} {copiedAll ? 'Copied' : 'Copy All'}
                                                        </button>
                                                    </div>
                                                    {generatedKeys.split('\n').map(c => (
                                                        <div key={c} className={`p-3.5 rounded-[20px] border flex items-center justify-between shadow-sm transition-colors ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                                            <span className={`font-mono font-bold tracking-widest text-[15px] ${isDarkMode ? 'text-white' : 'text-black'}`}>{c}</span>
                                                            <div className="flex gap-2">
                                                                <button 
                                                                    onClick={() => { 
                                                                        navigator.clipboard.writeText(c); 
                                                                        setCopiedCode(c); 
                                                                        triggerHaptic();
                                                                        setTimeout(() => setCopiedCode(null), 2000); 
                                                                    }} 
                                                                    className={`p-2.5 rounded-xl transition-colors ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}
                                                                >
                                                                    {copiedCode === c ? <CheckCircle size={18} className="text-green-500"/> : <Copy size={18} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />}
                                                                </button>
                                                                <button onClick={() => shareSingleKeyTelegram(c)} className={`p-2.5 rounded-xl transition-colors shadow-sm text-white bg-gradient-to-r ${theme.gradient}`}>
                                                                    <Send size={18} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className={`w-full h-px my-6 ${isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#E5E7EB]'}`}></div>
                                        <button onClick={handleSignOutDevice} className="w-full py-3.5 rounded-xl border font-bold font-khmer text-[15px] active:scale-[0.98] transition-colors flex items-center justify-center gap-2 text-red-500 hover:bg-red-500/10 border-red-500/20">
                                            <LogOut size={18} /> Sign Out Device
                                        </button>
                                    </div>

                                ) : isCoursePurchased ? (
                                    
                                    <div className="space-y-8 max-w-md mx-auto">
                                        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl flex items-center justify-between relative overflow-hidden ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-20 pointer-events-none bg-gradient-to-br ${theme.gradient}`}></div>
                                            <div className="relative z-10">
                                                <p className={`text-[11px] font-bold uppercase tracking-widest mb-1 opacity-70 ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>Member Plan</p>
                                                <p className={`text-2xl font-black mb-1 ${theme.text}`}>Full Access</p>
                                                <p className={`text-[13px] font-medium ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
                                                    Valid until: <span className="font-bold">{new Date(purchasedCourses[activeAppTab].expiry).toLocaleDateString()}</span>
                                                </p>
                                            </div>
                                            <Crown size={48} className={`opacity-20 relative z-10 ${theme.text}`} />
                                        </div>

                                        <div className="w-full mb-8">
                                            {user ? (
                                                <div className={`p-4 rounded-[24px] border flex items-center justify-between shadow-sm animate-fade-in-up ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                                    <div className="flex items-center gap-4 min-w-0">
                                                        {user.photoURL ? (
                                                            <img src={user.photoURL} alt="Profile" className={`w-12 h-12 rounded-full border-2 shrink-0 ${theme.border}`} />
                                                        ) : (
                                                            <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner ${theme.bg}`}>
                                                                {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                        <div className="min-w-0 pr-2">
                                                            <p className={`font-bold text-[15px] truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>{user.displayName || 'User'}</p>
                                                            <p className={`text-[13px] truncate ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{user.email}</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={handleLogout} className={`px-4 py-2.5 shrink-0 rounded-xl text-[13px] font-bold transition-colors ${isDarkMode ? 'bg-[#2C2C2C] hover:bg-[#3C3C3C]' : 'bg-[#E5E7EB] hover:bg-[#D1D5DB]'}`}>
                                                        Logout
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-center animate-fade-in-up">
                                                    <p className={`text-[13px] mb-3 font-bold px-2 leading-relaxed ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                                                        <Sparkles size={12} className="inline mr-1" />
                                                        {lang === 'en' ? '⚠️ You are using a local key. Link your Google account now to secure permanent access across devices.' : '⚠️ អ្នកកំពុងប្រើកូដនៅលើឧបករណ៍នេះតែប៉ុណ្ណោះ។ សូមភ្ជាប់គណនី Google របស់អ្នកឥឡូវនេះ ដើម្បីកុំឱ្យបាត់បង់សិទ្ធិចូលរៀន។'}
                                                    </p>
                                                    <button onClick={handleGoogleLogin} className={`w-full flex items-center justify-center gap-3 p-4 rounded-2xl font-bold text-[15px] border transition-all active:scale-[0.98] shadow-sm hover:shadow-md ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C] text-white hover:bg-[#2C2C2C]' : 'bg-white border-gray-200 text-black hover:bg-gray-50'}`}>
                                                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                                        Link Google Account
                                                    </button>
                                                    <p className={`text-[13px] mt-4 font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                                                        <Sparkles size={14} className="inline mr-1" />
                                                        {lang === 'en' ? 'Secure your purchase by linking an account.' : 'សូមភ្ជាប់គណនីដើម្បីការពារការទិញរបស់អ្នក។'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-center">
                                            <p className={`text-[15px] font-bold mb-3 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Need Help with your purchase?</p>
                                            <a href="https://t.me/+d9YiokUaUtZiNTZl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-[15px] transition-all active:scale-[0.98] shadow-lg hover:-translate-y-1 text-white" style={{ backgroundColor: '#2AABEE' }}>
                                                <Send size={18} /> Contact Support Team
                                            </a>
                                        </div>

                                        <div className={`w-full h-px my-6 ${isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#E5E7EB]'}`}></div>
                                        <button onClick={handleSignOutDevice} className="w-full py-4 rounded-xl font-bold font-khmer text-[15px] active:scale-[0.98] transition-colors flex items-center justify-center gap-2 text-red-500 hover:bg-red-500/10">
                                            <LogOut size={18} /> Sign Out Device
                                        </button>
                                    </div>

                                ) : (
                                    <div className="flex flex-col items-center animate-fade-in-up">
                                        
                                        <div className="text-center mb-8">
                                            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-[24px] mb-4 shadow-inner ${theme.lightBg}`}>
                                                <Crown className={`w-10 h-10 ${theme.text}`} />
                                            </div>
                                            <h3 className={`text-3xl font-black font-khmer tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                                {lang === 'en' ? 'Pro Masterclass' : getKhmerCourseTitle(activeAppTab)}
                                            </h3>
                                            <p className={`text-[15px] font-medium ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>
                                                {lang === 'en' ? 'One-time payment. One year full access.' : 'បង់ប្រាក់ម្ដង ប្រើប្រាស់បានពេញ១ឆ្នាំ'}
                                            </p>
                                            <div className="mt-4 flex items-baseline justify-center gap-1">
                                                <span className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-black'}`}>$20</span>
                                                <span className={`text-[13px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-400'}`}>/ {lang === 'en' ? 'YEAR' : 'ឆ្នាំ'}</span>
                                            </div>
                                        </div>

                                        <div className={`w-full max-w-md mx-auto rounded-[32px] p-6 sm:p-8 mb-8 border backdrop-blur-md shadow-xl flex flex-col items-center gap-6 ${isDarkMode ? 'bg-[#1C1C1E]/80 border-[#2C2C2C]' : 'bg-white/80 border-[#E5E7EB] shadow-black/5'}`}>
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-44 h-44 bg-white rounded-[24px] p-3 shadow-md border border-gray-100 flex items-center justify-center">
                                                    <img src="/aba-khqr.png" alt="ABA KHQR" className="w-full h-full object-contain rounded-xl" />
                                                </div>
                                                <span className={`text-xs font-bold tracking-widest uppercase ${theme.text}`}>SCAN TO PAY</span>
                                            </div>
                                            
                                            <div className="w-full flex items-center gap-4 opacity-50">
                                                <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                                                <span className={`text-[11px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-white/50' : 'text-black/40'}`}>THEN</span>
                                                <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                                            </div>
                                            
                                            <div className="w-full text-center">
                                                <p className={`text-[14px] font-khmer mb-4 leading-relaxed ${isDarkMode ? 'text-[#E3E3E3]' : 'text-gray-600'}`}>
                                                    {lang === 'en' ? 'Send your receipt via Telegram to get your activation key.' : 'ផ្ញើវិក័យប័ត្រតាម Telegram ដើម្បីទទួលបានលេខកូដ។'}
                                                </p>
                                                <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className={`w-full py-4 rounded-[20px] flex items-center justify-center gap-2 font-bold font-khmer transition-all active:scale-[0.98] shadow-lg text-white bg-gradient-to-r ${theme.gradient}`}>
                                                    <Send className="w-5 h-5" />
                                                    {lang === 'en' ? 'Send Receipt to Telegram' : 'ផ្ញើវិក័យប័ត្រទីនេះ'}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="w-full max-w-md mx-auto mb-10">
                                            <label className={`block text-[11px] font-bold uppercase tracking-widest mb-3 pl-1 ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>
                                                {lang === 'en' ? 'Activation Key' : 'លេខកូដសម្ងាត់'}
                                            </label>
                                            <div className={`relative flex items-center p-2 rounded-[24px] border transition-colors shadow-sm ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C] focus-within:border-[#41B6E6]' : 'bg-white border-[#E5E7EB] focus-within:border-[#0277C5]'}`}>
                                                <KeyRound className={`absolute left-5 w-6 h-6 ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-400'}`} />
                                                <input 
                                                    type="text" 
                                                    value={passcodeInput}
                                                    onChange={(e) => {
                                                        setPasscodeInput(e.target.value.toUpperCase());
                                                        setPasscodeError('');
                                                    }}
                                                    placeholder={getInputPlaceholder()}
                                                    className={`flex-1 bg-transparent py-3 pl-14 pr-2 outline-none font-bold tracking-widest uppercase text-[15px] w-full ${isDarkMode ? 'text-white' : 'text-black'}`}
                                                />
                                                <button 
                                                    onClick={handleVerifyPasscode}
                                                    disabled={!passcodeInput.trim() || isVerifying}
                                                    className={`px-7 py-3.5 rounded-[18px] text-white font-bold font-khmer text-[15px] active:scale-[0.95] transition-all flex items-center justify-center shrink-0 ${(isVerifying || !passcodeInput.trim()) ? 'opacity-50 cursor-not-allowed bg-gray-500' : `shadow-md bg-gradient-to-r ${theme.gradient}`}`}
                                                >
                                                    {isVerifying ? 'Checking...' : (lang === 'en' ? 'Unlock' : 'បញ្ជាក់')}
                                                </button>
                                            </div>
                                            {passcodeError && (
                                                <p className="text-red-500 text-[13px] font-bold tracking-wide mt-4 flex items-center justify-center gap-1.5">
                                                    <AlertCircle size={16} /> {passcodeError}
                                                </p>
                                            )}
                                        </div>

                                        <div className="w-full flex items-center gap-4 opacity-50 max-w-md mx-auto mb-8">
                                            <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                                            <span className={`text-[11px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-white/50' : 'text-black/40'}`}>ACCOUNT SYNC</span>
                                            <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                                        </div>

                                        <div className="w-full max-w-md mx-auto">
                                            {user ? (
                                                <div className={`p-4 rounded-[24px] border flex items-center justify-between shadow-sm animate-fade-in-up ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                                    <div className="flex items-center gap-4 min-w-0">
                                                        {user.photoURL ? (
                                                            <img src={user.photoURL} alt="Profile" className={`w-12 h-12 rounded-full border-2 shrink-0 ${theme.border}`} />
                                                        ) : (
                                                            <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner ${theme.bg}`}>
                                                                {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                        <div className="min-w-0 pr-2">
                                                            <p className={`font-bold text-[15px] truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>{user.displayName || 'User'}</p>
                                                            <p className={`text-[13px] truncate ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{user.email}</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={handleLogout} className={`px-4 py-2.5 shrink-0 rounded-xl text-[13px] font-bold transition-colors ${isDarkMode ? 'bg-[#2C2C2C] hover:bg-[#3C3C3C]' : 'bg-[#E5E7EB] hover:bg-[#D1D5DB]'}`}>
                                                        Logout
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <button onClick={handleGoogleLogin} className={`w-full flex items-center justify-center gap-3 p-4 rounded-[24px] font-bold text-[15px] border transition-all active:scale-[0.98] shadow-sm hover:shadow-md ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C] text-white hover:bg-[#2C2C2C]' : 'bg-white border-gray-200 text-black hover:bg-gray-50'}`}>
                                                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                                        Continue with Google
                                                    </button>
                                                    <p className={`text-[13px] mt-4 font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                                                        <Sparkles size={14} className="inline mr-1" />
                                                        {lang === 'en' ? 'Secure your purchase by linking an account.' : 'សូមភ្ជាប់គណនីដើម្បីការពារការទិញរបស់អ្នក។'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {isCoursePurchased && (
                    <div className={`mb-8 p-5 md:p-6 rounded-[32px] border shadow-sm animate-fade-in-up relative overflow-hidden ${isDarkMode ? 'bg-[#1C1C1E]/50 border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none bg-gradient-to-br ${theme.gradient} opacity-20`}></div>
                        <div className="flex justify-between items-end mb-5 relative z-10">
                            <div>
                                <h4 className={`font-bold font-khmer text-[14px] md:text-[15px] uppercase tracking-widest ${theme.text}`}>
                                    {lang === 'en' ? 'Course Progress' : 'វឌ្ឍនភាពនៃការសិក្សា'}
                                </h4>
                                <p className={`text-[13px] md:text-[14px] mt-1.5 font-khmer ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                                    {lang === 'en' ? `${completedInThisTab} of ${totalSteps} lessons completed` : `បានបញ្ចប់ ${completedInThisTab} នៃ ${totalSteps} មេរៀន`}
                                </p>
                            </div>
                            <span className={`text-4xl font-black ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{progressPercentage}%</span>
                        </div>
                        <div className={`h-4 w-full rounded-full overflow-hidden relative z-10 shadow-inner ${isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#F4F5F7]'}`}>
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${theme.gradient}`}
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <h3 className={`font-black text-[22px] md:text-3xl mb-6 flex items-center gap-3 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                    <BookOpen className={`w-7 h-7 md:w-8 md:h-8 ${theme.text}`} /> 
                    {lang === 'en' ? 'Course Curriculum' : 'បញ្ជីមេរៀន'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentCourseData.map((l) => (
                        <LessonCard key={l.id} lesson={l} onClick={() => handleOpenLesson(l.id)} isDarkMode={isDarkMode} />
                    ))}
                </div>
            </div>
        </div>
      )}
      
      {activeTab !== 'ai' && !activeAppTab ? (
        <main className="flex-1 max-w-7xl mx-auto w-full overflow-y-auto custom-scrollbar p-4 md:p-8 relative z-0" style={{ paddingTop: activeTab === 'tools' ? 'max(env(safe-area-inset-top), 16px)' : undefined }}>
            {activeTab === 'learn' && (
            <div className="space-y-6 pb-24">
                <div className="text-center py-6 mt-2 relative">
                    <div className={`absolute inset-0 blur-[120px] rounded-full pointer-events-none ${isDarkMode ? 'bg-[#B52885]/10' : 'bg-[#B52885]/5'}`} />
                    <h2 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>iPad Masterclass</h2>
                    <p className={`max-w-xl mx-auto text-[15px] md:text-base leading-relaxed ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                        {lang === 'en' ? 'Select an app to begin your professional training.' : 'ជ្រើសរើសកម្មវិធីដើម្បីចាប់ផ្តើមការហ្វឹកហាត់កម្រិតអាជីពរបស់អ្នក។'}
                    </p>
                </div>

                <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full relative z-10 px-1 sm:px-0">
                    <button onClick={() => handleOpenCourse('photo')} className={`group relative w-full flex items-center p-4 sm:p-5 rounded-[24px] border transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] overflow-hidden ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]' : 'bg-white border-[#E5E7EB] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]'}`}>
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none bg-gradient-to-r ${APP_THEMES.photo.gradient}`}></div>
                        <div className="flex items-center gap-4 sm:gap-5 relative z-10 w-full">
                            <div className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-[18px] flex items-center justify-center shadow-inner ${APP_THEMES.photo.lightBg}`}>
                                <img src="/photo2 icon.svg" alt="Photo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-sm" />
                            </div>
                            <div className="text-left flex-1 min-w-0">
                                <h3 className={`font-black text-[17px] sm:text-[20px] tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>Affinity Photo 2 iPad</h3>
                                <p className={`text-[13px] sm:text-[14px] mt-0.5 sm:mt-1 font-medium truncate ${isDarkMode ? 'text-[#9AA0A6]' : 'text-[#6B7280]'}`}>{lang === 'en' ? 'Professional photo editing & manipulation' : 'ការកែច្នៃរូបភាពបែបអាជីព'}</p>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 shrink-0 pl-2">
                                {!showAdminPanel && !purchasedCourses['photo']?.unlocked && <Lock size={18} className={`${APP_THEMES.photo.text} opacity-80`} />}
                                {showAdminPanel && <ShieldCheck size={18} className="text-[#41B6E6]" />}
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-white/5 group-hover:bg-white/10' : 'bg-black/5 group-hover:bg-black/10'}`}>
                                    <ChevronRight size={20} className={isDarkMode ? 'text-[#A0A0A0] group-hover:text-white' : 'text-[#6B7280] group-hover:text-black'} />
                                </div>
                            </div>
                        </div>
                    </button>

                    <button onClick={() => handleOpenCourse('designer')} className={`group relative w-full flex items-center p-4 sm:p-5 rounded-[24px] border transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] overflow-hidden ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]' : 'bg-white border-[#E5E7EB] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]'}`}>
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none bg-gradient-to-r ${APP_THEMES.designer.gradient}`}></div>
                        <div className="flex items-center gap-4 sm:gap-5 relative z-10 w-full">
                            <div className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-[18px] flex items-center justify-center shadow-inner ${APP_THEMES.designer.lightBg}`}>
                                <img src="/designer2 icon.svg" alt="Designer" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-sm" />
                            </div>
                            <div className="text-left flex-1 min-w-0">
                                <h3 className={`font-black text-[17px] sm:text-[20px] tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>Affinity Designer 2 iPad</h3>
                                <p className={`text-[13px] sm:text-[14px] mt-0.5 sm:mt-1 font-medium truncate ${isDarkMode ? 'text-[#9AA0A6]' : 'text-[#6B7280]'}`}>{lang === 'en' ? 'Vector graphics & illustration' : 'ការឌីហ្សាញក្រាហ្វិក និងគំនូរ'}</p>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 shrink-0 pl-2">
                                {!showAdminPanel && !purchasedCourses['designer']?.unlocked && <Lock size={18} className={`${APP_THEMES.designer.text} opacity-80`} />}
                                {showAdminPanel && <ShieldCheck size={18} className="text-[#41B6E6]" />}
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-white/5 group-hover:bg-white/10' : 'bg-black/5 group-hover:bg-black/10'}`}>
                                    <ChevronRight size={20} className={isDarkMode ? 'text-[#A0A0A0] group-hover:text-white' : 'text-[#6B7280] group-hover:text-black'} />
                                </div>
                            </div>
                        </div>
                    </button>

                    <button onClick={() => handleOpenCourse('publisher')} className={`group relative w-full flex items-center p-4 sm:p-5 rounded-[24px] border transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] overflow-hidden ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]' : 'bg-white border-[#E5E7EB] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]'}`}>
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none bg-gradient-to-r ${APP_THEMES.publisher.gradient}`}></div>
                        <div className="flex items-center gap-4 sm:gap-5 relative z-10 w-full">
                            <div className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-[18px] flex items-center justify-center shadow-inner ${APP_THEMES.publisher.lightBg}`}>
                                <img src="/publisher2 icon.svg" alt="Publisher" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-sm" />
                            </div>
                            <div className="text-left flex-1 min-w-0">
                                <h3 className={`font-black text-[17px] sm:text-[20px] tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>Affinity Publisher 2 iPad</h3>
                                <p className={`text-[13px] sm:text-[14px] mt-0.5 sm:mt-1 font-medium truncate ${isDarkMode ? 'text-[#9AA0A6]' : 'text-[#6B7280]'}`}>{lang === 'en' ? 'Page layout & typography design' : 'ការរៀបចំទំព័រ និងសៀវភៅ'}</p>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 shrink-0 pl-2">
                                {!showAdminPanel && !purchasedCourses['publisher']?.unlocked && <Lock size={18} className={`${APP_THEMES.publisher.text} opacity-80`} />}
                                {showAdminPanel && <ShieldCheck size={18} className="text-[#41B6E6]" />}
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-white/5 group-hover:bg-white/10' : 'bg-black/5 group-hover:bg-black/10'}`}>
                                    <ChevronRight size={20} className={isDarkMode ? 'text-[#A0A0A0] group-hover:text-white' : 'text-[#6B7280] group-hover:text-black'} />
                                </div>
                            </div>
                        </div>
                    </button>
                </div>

                <TipsSection isExpanded={expandedSection === 'tips'} onToggle={() => setExpandedSection(expandedSection === 'tips' ? null : 'tips')} isDarkMode={isDarkMode} />
                <ContactSection isDarkMode={isDarkMode} />
            </div>
            )}
            {activeTab === 'tools' && <div className="pb-24"><ToolsView isDarkMode={isDarkMode} /></div>}
            
            {/* 🌟 TEST RECEIVES SUPER ADMIN BYPASS 🌟 */}
            {activeTab === 'quiz' && <Test isDarkMode={isDarkMode} isAdmin={isSuperAdmin} />}
        </main>
      ) : (
        <div className={`flex-1 relative w-full h-full md:pb-0 z-0 ${activeAppTab ? 'hidden' : 'block'}`} style={{ paddingTop: 'max(env(safe-area-inset-top), 0px)' }}>
             {/* 🌟 CHATBOT RECEIVES SUPER ADMIN AND LIVE DATA 🌟 */}
             <ChatBot messages={chatMessages} setMessages={setChatMessages} isDarkMode={isDarkMode} liveAiData={liveAiData} setLiveAiData={setLiveAiData} isAdmin={isSuperAdmin} />
        </div>
      )}

      <div className={`md:hidden absolute bottom-0 w-full p-4 z-50 pointer-events-none transition-all duration-300 ease-in-out ${(isKeyboardOpen || activeAppTab) ? 'translate-y-32 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <nav className={`pointer-events-auto backdrop-blur-2xl border flex justify-around p-3 pb-safe rounded-[32px] shadow-2xl transition-all duration-500 ${isDarkMode ? 'bg-[#1C1C1E]/80 border-white/10 shadow-[0_-5px_30px_rgba(0,0,0,0.3)]' : 'bg-white/80 border-black/5 shadow-[#0277C5]/10'}`}>
            {['learn', 'quiz', 'tools', 'ai'].map(t_id => (
                <div key={t_id} onClick={() => { 
                    setActiveTab(t_id);
                    setActiveAppTab(null);
                    triggerHaptic(); 
                    window.history.pushState({ modalOpen: false, tab: t_id, course: null }, '');
                }} className={`flex flex-col items-center gap-1.5 transition-all duration-500 ease-out cursor-pointer ${activeTab === t_id ? (isDarkMode ? 'text-[#41B6E6] -translate-y-1.5' : 'text-[#0277C5] -translate-y-1.5') : (isDarkMode ? 'text-[#A0A0A0] hover:text-[#F1F1F1]' : 'text-[#6B7280] hover:text-[#1A1A1A]')}`}>
                    {t_id === 'learn' && <BookOpen size={24} className={activeTab === t_id ? 'drop-shadow-md' : ''}/>}
                    {t_id === 'quiz' && <Award size={24} className={activeTab === t_id ? 'drop-shadow-md' : ''}/>}
                    {t_id === 'tools' && <Zap size={24} className={activeTab === t_id ? 'drop-shadow-md' : ''}/>}
                    {t_id === 'ai' && <Bot size={24} className={activeTab === t_id ? 'drop-shadow-md' : ''}/>}
                    <span className="text-[10px] font-black uppercase tracking-widest">{t(`tab_${t_id}`)}</span>
                </div>
            ))}
          </nav>
      </div>
    </div>
  );
}

export default function App() { return <LanguageProvider><AppContent /></LanguageProvider>; }