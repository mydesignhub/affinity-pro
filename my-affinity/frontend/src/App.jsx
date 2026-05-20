import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, Moon, Aperture, Droplet, Sliders, ChevronRight, CheckCircle, XCircle, 
  BookOpen, Award, PlayCircle, MessageCircle, Send, Sparkles, Loader2, 
  Bot, Settings, HelpCircle, BarChart, Zap, Triangle, Touchpad, 
  AlertTriangle, RotateCcw, Globe, RefreshCw, Layout, Image as ImageIcon, 
  Lightbulb, Palette, X, WifiOff, Download, TrendingUp, Share2, Clipboard, Camera,
  Layers, Crop, Save, ScanFace, Facebook, Upload, ImageDown, FileJson,
  Monitor, Smartphone, ArrowLeft, Minus, Plus, ChevronDown, ChevronUp, Search,
  Grid, List as ListIcon, Filter, Clock, Coffee, Mountain, Smile, Star,
  ThumbsUp, User, Activity, Cloud, Copy, ClipboardPaste, SplitSquareHorizontal, Maximize,
  Crown, QrCode, Lock, Key, Mail, Shield, Info, Check, ShieldCheck, Type, Unlock, Minimize, Circle, CheckCircle2, DownloadCloud
} from 'lucide-react';

import { auth, db } from './firebase';
import { signOut } from 'firebase/auth';
import { doc, getDocs, collection, query } from 'firebase/firestore';

import Header from './components/layout/Header';
import ToolsView from './components/features/tools/ToolsView';
import Test from './components/features/quiz/Test';
import ChatBot from './components/features/ai/ChatBot';
import LessonCard from './components/features/learn/LessonCard';
import PremiumModal from './components/features/premium/PremiumModal';

import { courseData, TIPS_LIST, TIPS_LIST_EN } from './data/data';
import { useLanguage, LanguageProvider } from './contexts/LanguageContext';

// ==========================================
// 1. CONFIGURATION & UTILS
// ==========================================

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

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

// ==========================================
// 2. SUB-COMPONENTS (LessonModal, TipsSection, ContactSection)
// ==========================================

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

// ==========================================
// 3. MAIN APP CONTENT
// ==========================================

function AppContent() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('learn');
  const [activeAppTab, setActiveAppTab] = useState(null); 
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [completedSteps, setCompletedSteps] = useState([]);
  
  const [user, setUser] = useState(null);

  const [purchasedCourses, setPurchasedCourses] = useState({ photo: null, designer: null, publisher: null });
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Layout Scroll States
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAndroid] = useState(() => /Android/i.test(navigator.userAgent));
  const mainScrollRef = useRef(null);

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
          
          snap.forEach(doc => cloudData.push({ ...doc.data(), id: doc.id }));
          
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

  // Scroll Behavior Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentY = mainScrollRef.current?.scrollTop || 0;
      if (currentY > lastScrollY && currentY > 100) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }
      setLastScrollY(currentY);
    };
    const scrollContainer = mainScrollRef.current;
    scrollContainer?.addEventListener('scroll', handleScroll);
    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleOpenCourse = (courseId) => {
      setActiveAppTab(courseId);
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

  const handleSignOutDevice = async () => {
      triggerHaptic();
      let message = '';
      if (!user) {
          message = lang === 'en' 
              ? '⚠️ WARNING: You have NOT linked a Google account!\n\nIf you sign out now, you will LOSE ACCESS to your premium course permanently. Are you absolutely sure you want to sign out?' 
              : '⚠️ ព្រមាន៖ អ្នកមិនទាន់បានភ្ជាប់គណនី Google ទេ!\n\nប្រសិនបើអ្នកចាកចេញឥឡូវនេះ អ្នកនឹងបាត់បង់សិទ្ធិចូលរៀនវគ្គ Premium នេះជារៀងរហូត។ តើអ្នកពិតជាចង់ចាកចេញមែនទេ?';
      } else {
          message = lang === 'en'
              ? 'Are you sure you want to sign out?\n\nYour purchase is safely linked to your Google account. You can sign in again later on this or another device.'
              : 'តើអ្នកប្រាកដជាចង់ចាកចេញពីឧបករណ៍នេះទេ?\n\nសិទ្ធិ Premium របស់អ្នកត្រូវបានរក្សាទុកដោយសុវត្ថិភាពក្នុងគណនី Google របស់អ្នក។ អ្នកអាចចូលគណនីម្ដងទៀតនៅពេលក្រោយ។';
      }

      if(window.confirm(message)) {
          try {
              await signOut(auth);
              setUser(null);
              setPurchasedCourses({ photo: null, designer: null, publisher: null });
              localStorage.removeItem('myAffinity_purchases');
          } catch (error) {
              console.error("Error signing out:", error);
          }
      }
  };

  const currentCourseData = activeAppTab ? (courseData[activeAppTab] || []) : [];
  const totalSteps = currentCourseData.reduce((acc, lesson) => acc + (lesson.steps?.length || 0), 0);
  const progressPrefix = activeAppTab === 'photo' ? 'ph' : activeAppTab === 'designer' ? 'ds' : 'pb';
  const completedInThisTab = completedSteps.filter(id => id.startsWith(progressPrefix)).length;
  const progressPercentage = totalSteps === 0 ? 0 : Math.round((completedInThisTab / totalSteps) * 100);

  const isCoursePurchased = activeAppTab ? purchasedCourses[activeAppTab]?.unlocked === true : false;
  const theme = activeAppTab ? APP_THEMES[activeAppTab] : APP_THEMES.photo;
  const getAppDisplayName = (id) => id === 'photo' ? 'Affinity Photo 2 iPad' : id === 'designer' ? 'Affinity Designer 2 iPad' : 'Affinity Publisher 2 iPad';
  const appDisplayName = activeAppTab ? getAppDisplayName(activeAppTab) : '';

  return (
    <div 
        className={`absolute top-0 left-0 right-0 w-full flex flex-col font-khmer overflow-hidden transition-colors duration-500 ease-spring ${isDarkMode ? 'bg-[#0A0A0A] text-[#F1F1F1]' : 'bg-[#F4F5F7] text-[#1A1A1A]'}`}
        style={{ height: 'calc(100dvh + 25px)', paddingLeft: 'env(safe-area-inset-left)', paddingRight: 'env(safe-area-inset-right)' }}
        onContextMenu={(e) => e.preventDefault()}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@100..700&display=swap'); 
        body, html { overscroll-behavior: none; background-color: ${isDarkMode ? '#0A0A0A' : '#F4F5F7'}; transition: background-color 0.5s ease; -webkit-tap-highlight-color: transparent; } 
        .font-khmer { font-family: 'Kantumruy Pro', sans-serif; } 
        .no-scrollbar::-webkit-scrollbar { display: none; } 
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px) scale(0.99); } to { opacity: 1; transform: translateY(0) scale(1); } } 
        .animate-fade-in-up { animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .ease-spring { transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      `}</style>
      
      {/* 🌟 Background Glows 🌟 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute -top-[10%] -left-[10%] w-[60%] h-[50%] rounded-full blur-[80px] sm:blur-[120px] transform-gpu translate-z-0 transition-opacity duration-1000 ${isDarkMode ? 'bg-[#41B6E6]/10' : 'bg-[#0277C5]/10'}`}></div>
        <div className={`absolute top-[40%] -right-[20%] w-[50%] h-[50%] rounded-full blur-[80px] sm:blur-[120px] transform-gpu translate-z-0 transition-opacity duration-1000 ${isDarkMode ? 'bg-[#41B6E6]/5' : 'bg-[#0277C5]/5'}`}></div>
      </div>

      {/* 🌟 iPhone Status Area Mask 🌟 */}
      {!isAndroid && (
        <div
          className={`fixed top-0 left-0 right-0 z-[65] pointer-events-none md:hidden backdrop-blur-md transition-colors duration-500 bg-gradient-to-b ${isDarkMode ? 'from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent' : 'from-[#F4F5F7] via-[#F4F5F7]/60 to-transparent'}`}
          style={{ height: 'calc(env(safe-area-inset-top) + 15px)', WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)' }}
        ></div>
      )}

      {/* 🌟 Floating Header 🌟 */}
      <div
        className={`absolute top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-spring ${(isScrollingDown || activeAppTab) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ transform: `translateY(${(isScrollingDown || activeAppTab) ? '-120%' : '0'})`, touchAction: 'none' }}
      >
          <Header activeTab={activeTab} setActiveTab={(tab) => {
              setActiveTab(tab);
              window.history.pushState({ modalOpen: false, tab: tab, course: null }, '');
          }} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
      
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
                className="p-4 md:p-8 max-w-7xl mx-auto w-full flex-1 relative z-10"
                style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 40px)' }}
            >
                <PremiumModal 
                    activeAppTab={activeAppTab}
                    isCoursePurchased={isCoursePurchased}
                    theme={theme}
                    appDisplayName={appDisplayName}
                    isDarkMode={isDarkMode}
                    showAdminPanel={false} 
                    purchasedCourses={purchasedCourses}
                    setPurchasedCourses={setPurchasedCourses}
                    user={user}
                    setUser={setUser}
                    setIsSuperAdmin={() => {}} 
                    handleSignOutDevice={handleSignOutDevice}
                    triggerHaptic={triggerHaptic}
                />

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
        <main ref={mainScrollRef} className="flex-1 min-h-0 max-w-7xl mx-auto w-full overflow-y-auto custom-scrollbar p-4 md:p-8 relative z-10" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 150px)', overscrollBehaviorY: 'contain' }}>
            <div className="w-full flex-none shrink-0" style={{ height: 'calc(env(safe-area-inset-top) + 60px)' }}></div>
            
            {activeTab === 'learn' && (
            <div className="space-y-6 pb-6">
                <div className="text-center py-6 mt-2 relative z-10">
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
                                {!purchasedCourses['photo']?.unlocked && <Lock size={18} className={`${APP_THEMES.photo.text} opacity-80`} />}
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
                                {!purchasedCourses['designer']?.unlocked && <Lock size={18} className={`${APP_THEMES.designer.text} opacity-80`} />}
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
                                {!purchasedCourses['publisher']?.unlocked && <Lock size={18} className={`${APP_THEMES.publisher.text} opacity-80`} />}
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-white/5 group-hover:bg-white/10' : 'bg-black/5 group-hover:bg-black/10'}`}>
                                    <ChevronRight size={20} className={isDarkMode ? 'text-[#A0A0A0] group-hover:text-white' : 'text-[#6B7280] group-hover:text-black'} />
                                </div>
                            </div>
                        </div>
                    </button>
                </div>

                <div className="relative z-10">
                    <TipsSection isExpanded={expandedSection === 'tips'} onToggle={() => setExpandedSection(expandedSection === 'tips' ? null : 'tips')} isDarkMode={isDarkMode} />
                    <ContactSection isDarkMode={isDarkMode} />
                </div>
            </div>
            )}
            {activeTab === 'tools' && <div className="pb-24 relative z-10"><ToolsView isDarkMode={isDarkMode} /></div>}
            
            {activeTab === 'quiz' && <div className="relative z-10"><Test isDarkMode={isDarkMode} isAdmin={false} /></div>}
        </main>
      ) : (
        <div className={`flex-1 relative w-full h-full md:pb-0 z-10 ${activeAppTab ? 'hidden' : 'block'}`}>
             <ChatBot messages={chatMessages} setMessages={setChatMessages} isDarkMode={isDarkMode} liveAiData={liveAiData} setLiveAiData={setLiveAiData} isAdmin={false} />
        </div>
      )}

      {/* 🌟 Floating Bottom Navigation Menu 🌟 */}
      <div 
        className={`md:hidden absolute left-0 right-0 z-50 w-full pointer-events-none flex justify-center transition-transform duration-500 ease-spring ${(isKeyboardOpen || activeAppTab) ? 'translate-y-32 opacity-0' : 'translate-y-0 opacity-100'}`}
        style={{
            bottom: `calc(env(safe-area-inset-bottom) + ${isAndroid ? '30px' : '20px'})`,
            transform: `translateY(${isScrollingDown && !activeAppTab ? '150%' : '0'})`
        }}
      >
          <nav className={`pointer-events-auto flex items-center justify-around w-[92%] max-w-[380px] px-2 py-1.5 backdrop-blur-2xl border shadow-2xl rounded-[30px] transition-colors duration-500 ${isDarkMode ? 'bg-[#1C1C1E]/85 border-white/10 shadow-black/50' : 'bg-white/90 border-black/10 shadow-[#0277C5]/10'}`}>
            {['learn', 'quiz', 'tools', 'ai'].map(t_id => {
                const isActive = activeTab === t_id;
                return (
                    <button 
                        key={t_id} 
                        onClick={() => { 
                            setActiveTab(t_id);
                            setActiveAppTab(null);
                            triggerHaptic(); 
                            window.history.pushState({ modalOpen: false, tab: t_id, course: null }, '');
                        }} 
                        className={`relative flex flex-col items-center justify-center gap-0.5 w-[70px] h-12 transition-colors duration-300 group outline-none rounded-2xl ${isActive ? (isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]') : (isDarkMode ? 'text-[#A0A0A0] hover:text-[#F1F1F1]' : 'text-[#6B7280] hover:text-[#1A1A1A]')}`}
                    >
                        <div className={`relative z-10 transition-transform duration-300 ${isActive ? '-translate-y-0.5 scale-105' : 'scale-95 group-hover:scale-100'}`}>
                            {t_id === 'learn' && <BookOpen size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'drop-shadow-[0_0_8px_rgba(65,182,230,0.3)]' : ''}/>}
                            {t_id === 'quiz' && <Award size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'drop-shadow-[0_0_8px_rgba(65,182,230,0.3)]' : ''}/>}
                            {t_id === 'tools' && <Zap size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'drop-shadow-[0_0_8px_rgba(65,182,230,0.3)]' : ''}/>}
                            {t_id === 'ai' && <Bot size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'drop-shadow-[0_0_8px_rgba(65,182,230,0.3)]' : ''}/>}
                        </div>
                        <span className={`relative z-10 text-[9px] font-medium uppercase tracking-wide mt-[1px] transition-opacity duration-300 ${isActive ? 'opacity-100 font-bold' : 'opacity-70'}`}>
                            {t(`tab_${t_id}`)}
                        </span>
                    </button>
                )
            })}
          </nav>
      </div>
    </div>
  );
}

export default function App() { return <LanguageProvider><AppContent /></LanguageProvider>; }