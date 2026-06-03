import React, { useState, useEffect, useRef, Suspense } from 'react';
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

import { auth, db, C } from './firebase';
import { signOut } from 'firebase/auth';
import { getDocs, collection, query, onSnapshot, doc, setDoc } from 'firebase/firestore';

import Header from './components/layout/Header';
import LessonCard from './components/features/learn/LessonCard';
import LessonModal from './components/features/learn/LessonModal';
import TipsSection from './components/features/learn/TipsSection';
import ContactSection from './components/layout/ContactSection';
import AboutModal from './components/layout/AboutModal';
import { triggerHaptic } from './utils/haptics';

const ToolsView = React.lazy(() => import('./components/features/tools/ToolsView'));
const Test = React.lazy(() => import('./components/features/quiz/Test'));
const ChatBot = React.lazy(() => import('./components/features/ai/ChatBot'));
const PremiumModal = React.lazy(() => import('./components/features/premium/PremiumModal'));

import { courseData, TIPS_LIST, TIPS_LIST_EN } from './data/data';
import { useLanguage, LanguageProvider } from './contexts/LanguageContext';

// ==========================================
// 1. CONFIGURATION & UTILS
// ==========================================

const APP_THEMES = {
    photo: { gradient: 'from-[#B52885] to-[#223180]', text: 'text-[#B52885]', bg: 'bg-[#B52885]', border: 'border-[#B52885]', lightBg: 'bg-[#B52885]/10' },
    designer: { gradient: 'from-[#2862B5] to-[#F4B32A]', text: 'text-[#2862B5]', bg: 'bg-[#2862B5]', border: 'border-[#2862B5]', lightBg: 'bg-[#2862B5]/10' },
    publisher: { gradient: 'from-[#D7383D] to-[#532463]', text: 'text-[#D7383D]', bg: 'bg-[#D7383D]', border: 'border-[#D7383D]', lightBg: 'bg-[#D7383D]/10' }
};

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

// Stable per-device id (shared with PremiumModal via the same localStorage key).
// Ensuring it exists at app load lets the global purchase listener watch the
// correct request docs even for requests created later in this session.
const getDeviceId = () => {
    let id = localStorage.getItem('affinityPro_deviceId');
    if (!id) {
        id = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
        localStorage.setItem('affinityPro_deviceId', id);
    }
    return id;
};

// ==========================================
// 3. MAIN APP CONTENT
// ==========================================

function AppContent() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState(() => {
    // Deep-link: ?tab=quiz|tools|ai opens that screen on load (portfolio mockups).
    const t = new URLSearchParams(window.location.search).get('tab');
    return ['learn', 'quiz', 'tools', 'ai'].includes(t) ? t : 'learn';
  });
  const [activeAppTab, setActiveAppTab] = useState(null);
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [appFontScale, setAppFontScale] = useState(100);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  
  const [user, setUser] = useState(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const [purchasedCourses, setPurchasedCourses] = useState({ photo: null, designer: null, publisher: null });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // Layout Scroll States
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollY = useRef(0);
  const [isAndroid] = useState(() => /Android/i.test(navigator.userAgent));
  const mainScrollRef = useRef(null);
  const isAppInitialMount = useRef(true);

  useEffect(() => {
      const timer = setTimeout(() => {
          isAppInitialMount.current = false;
      }, 800);
      return () => clearTimeout(timer);
  }, []);

  // ─── Keep-alive ping — prevents Render free tier from sleeping ────────────
  useEffect(() => {
      const API_URL = import.meta.env.VITE_API_URL || '';
      if (!API_URL || API_URL.includes('localhost')) return; // skip in local dev
      const ping = () =>
          fetch(`${API_URL}/health`, { method: 'GET' }).catch(() => {/* silent */});
      ping(); // immediate ping on app load (wakes server if sleeping)
      const id = setInterval(ping, 10 * 60 * 1000); // every 10 minutes
      return () => clearInterval(id);
  }, []);

  const [liveAiData, setLiveAiData] = useState(() => {
      if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('affinityPro_live_ai');
          return saved ? JSON.parse(saved) : [];
      }
      return [];
  });

  const fetchCloudAI = async () => {
      try {
          const q = query(collection(db, C("ai_knowledge")));
          const snap = await getDocs(q);
          const cloudData = [];
          
          snap.forEach(doc => cloudData.push({ ...doc.data(), id: doc.id }));

          if (cloudData.length > 0) {
              setLiveAiData(cloudData);
              localStorage.setItem('affinityPro_live_ai', JSON.stringify(cloudData));
          } else {
              const saved = localStorage.getItem('affinityPro_live_ai');
              if (saved) setLiveAiData(JSON.parse(saved));
          }
      } catch(e) {
          const saved = localStorage.getItem('affinityPro_live_ai');
          if (saved) setLiveAiData(JSON.parse(saved));
      }
  };

  useEffect(() => {
      if (typeof window !== 'undefined') {
          const savedTheme = localStorage.getItem('affinityPro_theme');
          if (savedTheme !== null) setIsDarkMode(savedTheme === 'dark');
          else setIsDarkMode(false);

          const savedSteps = localStorage.getItem('affinityPro_completed_steps');
          if (savedSteps) setCompletedSteps(JSON.parse(savedSteps));

          const savedPurchases = localStorage.getItem('affinityPro_purchases');
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

  // Device revocation: if another device evicts this one via key re-entry, clear local access
  useEffect(() => {
      if (!isDataLoaded) return;
      const deviceId = localStorage.getItem('affinityPro_deviceId');
      if (!deviceId) return;

      const apps = ['photo', 'designer', 'publisher'];
      const unsubscribers = [];

      apps.forEach(app => {
          const purchase = purchasedCourses[app];
          if (!purchase?.keyUsed || purchase.keyUsed === 'firebase_purchase') return;

          const actRef = doc(db, C('keyActivations'), purchase.keyUsed);
          const unsub = onSnapshot(actRef, (snap) => {
              if (!snap.exists()) return;
              const devices = snap.data().devices || [];
              if (!devices.some(d => d.id === deviceId)) {
                  setPurchasedCourses(prev => {
                      const updated = { ...prev, [app]: null };
                      localStorage.setItem('affinityPro_purchases', JSON.stringify(updated));
                      return updated;
                  });
              }
          }, () => {});
          unsubscribers.push(unsub);
      });

      return () => unsubscribers.forEach(u => u());
  }, [purchasedCourses, isDataLoaded]);



  useEffect(() => {
      const newBgColor = isDarkMode ? '#0A0A0A' : '#F4F5F7';
      let metaTheme = document.querySelector("meta[name='theme-color']");
      if (metaTheme) metaTheme.setAttribute("content", newBgColor);
      document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
      document.documentElement.style.backgroundColor = newBgColor;
      document.body.style.backgroundColor = newBgColor;
      document.documentElement.style.setProperty('--explain-font-scale', `${appFontScale / 100}`);

      if (isDataLoaded) {
          localStorage.setItem('affinityPro_theme', isDarkMode ? 'dark' : 'light');
      }
  }, [isDarkMode, isDataLoaded]);

  useEffect(() => {
      if (isDataLoaded) {
          localStorage.setItem('affinityPro_completed_steps', JSON.stringify(completedSteps));
          localStorage.setItem('affinityPro_purchases', JSON.stringify(purchasedCourses));
          localStorage.setItem('affinityPro_live_ai', JSON.stringify(liveAiData));
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
            setIsScrollingDown(false);
            window.history.pushState({ modalOpen: false, tab: e.detail, course: null }, '');
        }
    };
    window.addEventListener('switchTab', handleSwitchTab);

    const handleSuperAdminUnlocked = () => setShowAdminPanel(true);
    const handleToggleAdminPanel = () => setShowAdminPanel(prev => !prev);
    window.addEventListener('superAdminUnlocked', handleSuperAdminUnlocked);
    window.addEventListener('toggleSuperAdminPanel', handleToggleAdminPanel);

    const handleFocusIn = (e) => {
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) setIsKeyboardOpen(true);
    };
    const handleFocusOut = () => setIsKeyboardOpen(false);

    const handleOpenAbout = () => setIsAboutModalOpen(true);

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    window.addEventListener('openAboutModal', handleOpenAbout);

    return () => {
        window.removeEventListener('switchTab', handleSwitchTab);
        window.removeEventListener('superAdminUnlocked', handleSuperAdminUnlocked);
        window.removeEventListener('toggleSuperAdminPanel', handleToggleAdminPanel);
        document.removeEventListener('focusin', handleFocusIn);
        document.removeEventListener('focusout', handleFocusOut);
        window.removeEventListener('openAboutModal', handleOpenAbout);
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
      
      if (!isAppInitialMount.current) {
          if (currentY <= 0) {
            setIsScrollingDown(false);
          } else if (currentY > lastScrollY.current + 12 && currentY > 60) {
            setIsScrollingDown(true);
          } else if (currentY < lastScrollY.current - 12) {
            setIsScrollingDown(false);
          }
      }
      
      lastScrollY.current = currentY;
    };
    
    const scrollContainer = mainScrollRef.current;
    if (scrollContainer) scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    const handleAiScroll = (e) => setIsScrollingDown(e.detail);
    window.addEventListener('aiScrolling', handleAiScroll);

    return () => {
      if (scrollContainer) scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('aiScrolling', handleAiScroll);
    };
  }, [activeTab, activeAppTab]);

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
              localStorage.removeItem('affinityPro_purchases');
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
  const getAppDisplayName = (id) => id === 'photo' ? 'Pixel (Photo) / ភីកសែល (រូបថត)' : id === 'designer' ? 'Vector (Designer) / វ៉ិចទ័រ (ឌីហ្សាញ)' : 'Layout (Publisher) / ប្លង់ (ផាប់លីស៊ឺ)';
  const appDisplayName = activeAppTab ? getAppDisplayName(activeAppTab) : '';

  return (
    <div
        className={`absolute top-0 left-0 right-0 w-full flex flex-col font-khmer overflow-hidden transition-colors duration-500 ease-spring ${isDarkMode ? 'bg-[#0A0A0A] text-[#F1F1F1]' : 'bg-[#F4F5F7] text-[#1A1A1A]'}`}
        style={{ height: isAndroid ? '100dvh' : 'calc(100dvh + 25px)', maxWidth: '100vw', overflowX: 'hidden', paddingLeft: 'env(safe-area-inset-left)', paddingRight: 'env(safe-area-inset-right)' }}
        onContextMenu={(e) => e.preventDefault()}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@100..700&display=swap'); 
        body, html { overscroll-behavior: none; background-color: ${isDarkMode ? '#0A0A0A' : '#F4F5F7'}; transition: background-color 0.5s ease; -webkit-tap-highlight-color: transparent; } 
        .font-khmer { font-family: 'Kantumruy Pro', sans-serif; } 
        .no-scrollbar::-webkit-scrollbar { display: none; } 
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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
        style={{ transform: `translateY(${(isScrollingDown || activeAppTab) ? '-120%' : '0px'})`, touchAction: 'none' }}
      >
          <Header 
              activeTab={activeTab} 
              setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setIsScrollingDown(false);
                  window.history.pushState({ modalOpen: false, tab: tab, course: null }, '');
              }} 
              isDarkMode={isDarkMode} 
              setIsDarkMode={setIsDarkMode} 
              appFontScale={appFontScale}
              setAppFontScale={setAppFontScale}
              isAdmin={false}
              onOpenDashboard={() => setShowAdminPanel(true)}
          />
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
        <div className={`fixed inset-0 z-[60] overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#F4F5F7]'}`} style={{ overflowX: 'hidden' }}>
            
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
                <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="animate-spin text-[#0277C5] w-8 h-8" /></div>}>
                    <PremiumModal
                        activeAppTab={activeAppTab}
                        isCoursePurchased={isCoursePurchased}
                        theme={theme}
                        appDisplayName={appDisplayName}
                        isDarkMode={isDarkMode}
                        showAdminPanel={showAdminPanel}
                        purchasedCourses={purchasedCourses}
                        setPurchasedCourses={setPurchasedCourses}
                        user={user}
                        setUser={setUser}
                        setIsSuperAdmin={setShowAdminPanel}
                        handleSignOutDevice={handleSignOutDevice}
                        triggerHaptic={triggerHaptic}
                    />
                </Suspense>

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
        <main ref={mainScrollRef} className="flex-1 min-h-0 max-w-7xl mx-auto w-full overflow-y-auto overflow-x-hidden no-scrollbar p-4 md:p-8 relative z-10" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 90px)', overscrollBehaviorY: 'contain', overflowX: 'hidden' }}>
            <div className="w-full flex-none shrink-0" style={{ height: 'calc(env(safe-area-inset-top) + 60px)' }}></div>
            
            {activeTab === 'learn' && (
            <div className="space-y-6 pb-6">
                <div className="text-center py-6 mt-2 relative z-10">
                    <h2 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Affinity Pro Masterclass</h2>
                    <p className={`max-w-xl mx-auto text-[15px] md:text-base leading-relaxed ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                        {lang === 'en' ? 'Select an app to begin your professional training.' : 'ជ្រើសរើសកម្មវិធីដើម្បីចាប់ផ្តើមការហ្វឹកហាត់កម្រិតអាជីពរបស់អ្នក។'}
                    </p>
                </div>

                <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full relative z-10 px-1 sm:px-0">
                    <button onClick={() => handleOpenCourse('photo')} className={`group relative w-full flex items-center p-4 sm:p-5 rounded-[24px] border transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] overflow-hidden ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]' : 'bg-white border-[#E5E7EB] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]'}`}>
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none bg-gradient-to-r ${APP_THEMES.photo.gradient}`}></div>
                        <div className="flex items-center gap-4 sm:gap-5 relative z-10 w-full">
                            <div className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-[18px] flex items-center justify-center shadow-inner ${APP_THEMES.photo.lightBg}`}>
                                <Aperture className={`w-8 h-8 sm:w-10 sm:h-10 drop-shadow-sm ${APP_THEMES.photo.text}`} strokeWidth={1.5} />
                            </div>
                            <div className="text-left flex-1 min-w-0">
                                <h3 className={`font-black text-[15px] sm:text-[18px] tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>Pixel (Photo) / ភីកសែល (រូបថត)</h3>
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
                                <Triangle className={`w-8 h-8 sm:w-10 sm:h-10 drop-shadow-sm ${APP_THEMES.designer.text}`} strokeWidth={1.5} />
                            </div>
                            <div className="text-left flex-1 min-w-0">
                                <h3 className={`font-black text-[15px] sm:text-[18px] tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>Vector (Designer) / វ៉ិចទ័រ (ឌីហ្សាញ)</h3>
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
                                <Layout className={`w-8 h-8 sm:w-10 sm:h-10 drop-shadow-sm ${APP_THEMES.publisher.text}`} strokeWidth={1.5} />
                            </div>
                            <div className="text-left flex-1 min-w-0">
                                <h3 className={`font-black text-[15px] sm:text-[18px] tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>Layout (Publisher) / ប្លង់ (ផាប់លីស៊ឺ)</h3>
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
        {activeTab === 'tools' && <div className="relative z-10 overflow-x-hidden w-full"><Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="animate-spin w-8 h-8 opacity-50" /></div>}><ToolsView isDarkMode={isDarkMode} /></Suspense></div>}
            
            {activeTab === 'quiz' && <div className="relative z-10"><Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="animate-spin w-8 h-8 opacity-50" /></div>}><Test isDarkMode={isDarkMode} isAdmin={false} /></Suspense></div>}
        </main>
      ) : (
        <div className={`flex-1 relative w-full h-full md:pb-0 z-10 ${activeAppTab ? 'hidden' : 'block'}`}>
             <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="animate-spin w-8 h-8 opacity-50" /></div>}><ChatBot messages={chatMessages} setMessages={setChatMessages} isDarkMode={isDarkMode} liveAiData={liveAiData} setLiveAiData={setLiveAiData} isAdmin={false} /></Suspense>
        </div>
      )}

      {/* 🌟 Floating Bottom Navigation Menu 🌟 */}
      <div 
        className={`md:hidden absolute bottom-0 left-0 right-0 z-50 w-full pointer-events-none flex flex-col justify-end transition-all duration-500 ease-spring ${(isKeyboardOpen || activeAppTab) ? 'opacity-0' : 'opacity-100'}`}
        style={{ transform: `translateY(${(isKeyboardOpen || activeAppTab || isScrollingDown) ? '150%' : '0px'})` }}
      >
          <div className={`absolute inset-x-0 bottom-[-50px] h-[170px] pointer-events-none ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#F4F5F7]'}`} style={{ maskImage: 'linear-gradient(to top, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)' }}></div>
          <div className="relative w-full flex justify-center" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 12px)' }}>
              <nav className={`pointer-events-auto flex items-center justify-around w-[92%] max-w-[380px] px-2 py-1.5 backdrop-blur-2xl border shadow-2xl rounded-[30px] transition-colors duration-500 ${isDarkMode ? 'bg-[#1C1C1E]/85 border-white/10 shadow-black/50' : 'bg-white/90 border-black/10 shadow-[#0277C5]/10'}`}>
            {['learn', 'quiz', 'tools', 'ai'].map(t_id => {
                const isActive = activeTab === t_id;
                return (
                    <button 
                        key={t_id} 
                        onClick={() => { 
                            setActiveTab(t_id);
                            setActiveAppTab(null);
                            setIsScrollingDown(false);
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

      {isAboutModalOpen && (
          <AboutModal 
              onClose={() => setIsAboutModalOpen(false)} 
              isDarkMode={isDarkMode} 
          />
      )}
    </div>
  );
}

export default function App() { return <LanguageProvider><AppContent /></LanguageProvider>; }
