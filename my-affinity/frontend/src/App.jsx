import React, { useState, useEffect } from 'react';
import { ChevronRight, PlayCircle, Sparkles, Zap, Facebook, Send, Globe, BookOpen, Award, Bot, Camera, PenTool, Book, Lock, KeyRound, AlertCircle, ChevronDown, RotateCcw, Crown, LogOut, Copy, ShieldCheck } from 'lucide-react';

// FIREBASE IMPORTS
import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from './firebase'; 

import Header from './components/layout/Header';
import ToolsView from './components/features/tools/ToolsView';
import Test from './components/features/quiz/Test';
import ChatBot from './components/features/ai/ChatBot';
import LessonCard from './components/features/learn/LessonCard';
import LessonModal from './components/features/learn/LessonModal'; 

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

// 🌟 UPDATED: Fallback manual codes with clear app prefixes
const VALID_PASSCODES = {
    photo: ['PHOTO-A1B2C', 'PHOTO-X9Y8Z'],
    designer: ['DESIGN-A1B2C', 'DESIGN-X9Y8Z'],
    publisher: ['PUB-A1B2C', 'PUB-X9Y8Z']
};

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const ADMIN_EMAIL = 'koymy.mlk@gmail.com';

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
        <button onClick={onToggle} className={`w-full flex items-center justify-between p-6 rounded-3xl border transition-all group active:scale-95 shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] hover:bg-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB] hover:bg-[#F8F9FA]'}`}>
          <div className="flex items-center space-x-5">
              <div className={`p-3 rounded-2xl transition-colors ring-1 ${isDarkMode ? 'bg-[#41B6E6]/10 ring-[#41B6E6]/20 group-hover:bg-[#41B6E6]/20' : 'bg-[#0277C5]/10 ring-[#0277C5]/20 group-hover:bg-[#0277C5]/20'}`}>
                  <PlayCircle className={`w-6 h-6 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`} />
              </div>
              <h3 className={`font-bold text-xl font-khmer tracking-tight ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{t('tips_title')}</h3>
          </div>
          <ChevronRight className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-90' : ''} ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`} />
        </button>
        {isExpanded && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
            <div className={`bg-gradient-to-br border rounded-3xl p-8 md:col-span-2 relative overflow-hidden shadow-xl flex flex-col justify-center min-h-[180px] ${isDarkMode ? 'from-[#1E1E1E] to-[#121212] border-[#2C2C2C]' : 'from-[#FFFFFF] to-[#F8F9FA] border-[#E5E7EB]'}`}>
               <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none ${isDarkMode ? 'bg-[#41B6E6]/10' : 'bg-[#0277C5]/10'}`}></div>
               <div className="flex justify-between items-center mb-6 relative z-10">
                   <h4 className={`font-bold font-khmer flex items-center gap-3 text-lg whitespace-nowrap ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                      <Sparkles className="w-5 h-5 text-[#C5B002]" /> {t('tips_pro')}
                   </h4>
                   <button onClick={nextTip} className={`text-[10px] px-4 py-2 rounded-full font-khmer transition-all font-bold tracking-wide border active:scale-95 whitespace-nowrap ${isDarkMode ? 'bg-[#F1F1F1]/10 hover:bg-[#F1F1F1]/20 text-[#F1F1F1] border-[#F1F1F1]/5' : 'bg-[#1A1A1A]/5 hover:bg-[#1A1A1A]/10 text-[#1A1A1A] border-[#1A1A1A]/5'}`}>{t('tips_new')}</button>
               </div>
               <div className="relative z-10 flex-1 flex items-center">
                   <p key={safeTipIndex} className={`text-base leading-relaxed border-l-4 pl-6 py-2 animate-fade-in-up ${lang === 'km' ? 'font-khmer' : 'font-sans'} ${isDarkMode ? 'text-[#F1F1F1] border-[#41B6E6]' : 'text-[#1A1A1A] border-[#0277C5]'}`}>
                       {currentTipsList[safeTipIndex]}
                   </p>
               </div>
            </div>
            <div className={`border rounded-3xl p-8 md:col-span-2 shadow-lg ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
              <h4 className={`font-bold font-khmer mb-6 flex items-center text-lg ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}><Zap className="w-5 h-5 mr-3 text-[#C5B002]" /> {t('tips_shortcut')}</h4>
              <ul className={`space-y-4 text-sm font-khmer ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                {[1, 2, 3, 4].map((num) => (
                    <li key={num} className={`flex items-start gap-4 p-4 rounded-2xl border transition-colors ${isDarkMode ? 'bg-[#121212]/50 border-[#2C2C2C] hover:bg-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB] hover:bg-[#E5E7EB]/50'}`}>
                        <span className={`font-bold w-8 h-8 flex items-center justify-center rounded-full text-sm shrink-0 ${isDarkMode ? 'bg-[#41B6E6]/10 text-[#41B6E6]' : 'bg-[#0277C5]/10 text-[#0277C5]'}`}>{num}</span>
                        <span><span className={`font-bold block mb-1 ${lang === 'km' ? 'font-khmer' : 'font-sans'} ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{t(`tip_${num}_title`)}</span> <span className={`${lang === 'km' ? 'font-khmer' : 'font-sans'}`} dangerouslySetInnerHTML={{ __html: t(`tip_${num}_desc`) }} /></span>
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
            <div className="flex justify-center gap-10">
                <a href="https://web.facebook.com/myaffinity" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className={`p-3 rounded-xl border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}><Facebook className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} size={20} /></div>
                    <span className={`text-[10px] font-khmer ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Facebook</span>
                </a>
                <a href="https://t.me/koymy" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className={`p-3 rounded-xl border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}><Send className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} size={20} /></div>
                    <span className={`text-[10px] font-khmer ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Telegram</span>
                </a>
                <a href="https://myaffinity.gumroad.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                      <div className={`p-3 rounded-xl border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}><Globe className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} size={20} /></div>
                    <span className={`text-[10px] font-khmer ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Website</span>
                </a>
            </div>
            <p className={`text-center text-[10px] mt-8 font-khmer uppercase opacity-50 tracking-widest ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{t('footer_copy')}</p>
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
  
  // USER & ADMIN STATE
  const [user, setUser] = useState(null);
  const isAdmin = user?.email === ADMIN_EMAIL;

  // ADMIN GENERATOR STATE
  const [genAmount, setGenAmount] = useState(1);
  const [generatedKeys, setGeneratedKeys] = useState('');

  const [purchasedCourses, setPurchasedCourses] = useState({ photo: null, designer: null, publisher: null });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState(''); 
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

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

      if (isDataLoaded) localStorage.setItem('myAffinity_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode, isDataLoaded]);

  useEffect(() => {
      if (isDataLoaded) {
          localStorage.setItem('myAffinity_completed_steps', JSON.stringify(completedSteps));
          localStorage.setItem('myAffinity_purchases', JSON.stringify(purchasedCourses));
      }
  }, [completedSteps, purchasedCourses, isDataLoaded]);

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

  const handleOpenCourse = (courseId) => {
      setActiveAppTab(courseId);
      setShowRegistration(false);
      setGeneratedKeys('');
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
      } catch (error) {
          console.error("Error signing out:", error);
      }
  };

  const handleSignOutDevice = () => {
      triggerHaptic();
      const message = lang === 'en' ? 'Are you sure you want to sign out this device? Your course access will be removed locally.' : 'តើអ្នកប្រាកដជាចង់ចាកចេញពីឧបករណ៍នេះទេ? សិទ្ធិចូលរៀនរបស់អ្នកនឹងត្រូវដកចេញ។';
      if(window.confirm(message)) {
          setPurchasedCourses(prev => ({...prev, [activeAppTab]: null}));
          handleLogout();
          setShowRegistration(false);
      }
  };

  // 🌟 UPDATED: Dynamic prefix generation
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
          setGeneratedKeys(newKeys.join('\n'));
      } catch (error) {
          console.error("Error generating keys:", error);
          alert("Failed to generate keys in database.");
      }
  };

  const shareAdminKeysTelegram = () => {
      triggerHaptic();
      const text = `Here are the newly generated premium keys for ${getAppDisplayName(activeAppTab)} (Expires in 7 Days if unused):\n\n${generatedKeys}`;
      const url = `https://t.me/share/url?url=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
  };

  const currentCourseData = activeAppTab ? (courseData[activeAppTab] || []) : [];
  const totalSteps = currentCourseData.reduce((acc, lesson) => acc + (lesson.steps?.length || 0), 0);
  const progressPrefix = activeAppTab === 'photo' ? 'ph' : activeAppTab === 'designer' ? 'ds' : 'pb';
  const completedInThisTab = completedSteps.filter(id => id.startsWith(progressPrefix)).length;
  const progressPercentage = totalSteps === 0 ? 0 : Math.round((completedInThisTab / totalSteps) * 100);

  const isCoursePurchased = isAdmin || (activeAppTab ? purchasedCourses[activeAppTab]?.unlocked === true : false);
  const theme = activeAppTab ? APP_THEMES[activeAppTab] : APP_THEMES.photo;
  
  const getAppDisplayName = (id) => id === 'photo' ? 'Affinity Photo 2 iPad' : id === 'designer' ? 'Affinity Designer 2 iPad' : 'Affinity Publisher 2 iPad';
  const appDisplayName = activeAppTab ? getAppDisplayName(activeAppTab) : '';
  
  const telegramMessage = lang === 'en' 
    ? `Hello! I would like to purchase the full 1-year access for the ${appDisplayName} course for $20. Here is my payment screenshot:` 
    : `សួស្តី! ខ្ញុំចង់ទិញសិទ្ធិចូលរៀនវគ្គ ${appDisplayName} រយៈពេល១ឆ្នាំពេញ ក្នុងតម្លៃ $20។ នេះជារូបភាពវិក្កយបត្របង់ប្រាក់របស់ខ្ញុំ៖`;
  
  const telegramUrl = `https://t.me/koymy?text=${encodeURIComponent(telegramMessage)}`;

  // 🌟 UPDATED: Dynamic placeholder helper
  const getInputPlaceholder = () => {
      if (lang !== 'en') return "បញ្ចូលលេខកូដសម្ងាត់...";
      if (activeAppTab === 'photo') return "PHOTO-XXXXX";
      if (activeAppTab === 'designer') return "DESIGN-XXXXX";
      if (activeAppTab === 'publisher') return "PUB-XXXXX";
      return "CODE-XXXXX";
  };

  return (
    <div className={`fixed inset-0 w-full h-full flex flex-col font-khmer overflow-hidden touch-pan-x touch-pan-y transition-colors duration-500 pt-[env(safe-area-inset-top)] ${isDarkMode ? 'bg-[#0A0A0A] text-[#F1F1F1]' : 'bg-[#F4F5F7] text-[#1A1A1A]'}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@100..700&display=swap'); 
        body, html { overscroll-behavior: none; background-color: ${isDarkMode ? '#0A0A0A' : '#F4F5F7'}; transition: background-color 0.5s ease; } 
        .font-khmer { font-family: 'Kantumruy Pro', sans-serif; } 
        .no-scrollbar::-webkit-scrollbar { display: none; } 
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px) scale(0.99); } to { opacity: 1; transform: translateY(0) scale(1); } } 
        .animate-fade-in-up { animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 50% { transform: translateX(5px); } 75% { transform: translateX(-5px); } }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
      
      {activeTab !== 'tools' && activeTab !== 'ai' && (
          <Header activeTab={activeTab} setActiveTab={(tab) => {
              setActiveTab(tab);
              window.history.pushState({ modalOpen: false, tab: tab, course: null }, '');
          }} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
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

      {activeAppTab && !expandedLesson && (
        <div className={`fixed inset-0 z-40 overflow-y-auto custom-scrollbar flex flex-col pt-[env(safe-area-inset-top)] ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#F4F5F7]'}`}>
            <div className={`sticky top-0 z-50 px-4 py-3 border-b flex items-center justify-between backdrop-blur-xl ${isDarkMode ? 'border-[#2C2C2C] bg-[#0A0A0A]/90' : 'border-[#E5E7EB] bg-[#FFFFFF]/90'}`}>
                <button onClick={() => { setActiveAppTab(null); window.history.back(); }} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#1E1E1E]' : 'hover:bg-gray-100'}`}>
                    <ChevronRight className="w-6 h-6 rotate-180" />
                </button>
                <h2 className={`font-black text-lg text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient}`}>{appDisplayName}</h2>
                <div className="w-10"></div> 
            </div>

            <div className="p-4 md:p-8 max-w-7xl mx-auto w-full pb-32">
                
                <div className={`mb-8 border rounded-3xl overflow-hidden shadow-md ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                    <button 
                        onClick={() => setShowRegistration(!showRegistration)} 
                        className={`w-full p-6 flex items-center justify-between transition-colors active:scale-[0.99] relative overflow-hidden ${showRegistration ? (isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#F8F9FA]') : ''}`}
                    >
                        <div className={`absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-gradient-to-r ${theme.gradient}`}></div>
                        
                        <div className="flex items-center gap-4 relative z-10">
                            {isCoursePurchased ? (
                                <div className={`p-3 rounded-xl ${theme.lightBg}`}>
                                    {isAdmin ? <ShieldCheck size={28} className={theme.text} /> : <Crown size={28} className={theme.text} />}
                                </div>
                            ) : (
                                <div className={`p-3 rounded-xl ${theme.lightBg}`}>
                                    <Lock size={28} className={theme.text} />
                                </div>
                            )}
                            
                            <div className="text-left">
                                <h3 className={`font-black font-khmer text-lg md:text-xl ${isCoursePurchased ? theme.text : (isDarkMode ? 'text-white' : 'text-black')}`}>
                                    {isCoursePurchased 
                                        ? (isAdmin ? 'Admin Control Panel' : 'Premium Member') 
                                        : (lang === 'en' ? `Register for ${appDisplayName}` : `ចុះឈ្មោះវគ្គ ${appDisplayName}`)}
                                </h3>
                                {isCoursePurchased && (
                                    <p className={`text-xs font-bold mt-1 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Account Info & Settings</p>
                                )}
                            </div>
                        </div>
                        <ChevronDown className={`w-6 h-6 relative z-10 transition-transform duration-300 ${showRegistration ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showRegistration && (
                        <div className={`p-6 md:p-10 border-t ${isDarkMode ? 'border-[#2C2C2C]' : 'border-[#E5E7EB]'} animate-fade-in-up relative overflow-hidden`}>
                            <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] pointer-events-none bg-gradient-to-br ${theme.gradient} opacity-20`}></div>
                            
                            <div className="max-w-3xl mx-auto relative z-10">
                                
                                {/* ADMIN LOGIC */}
                                {isAdmin ? (
                                    <div className="space-y-6">
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-[#41B6E6] flex items-center gap-2">
                                            <ShieldCheck size={18} /> Admin Key Generator
                                        </h4>
                                        <div className="flex gap-4 items-center">
                                            <div className={`p-3 rounded-xl border flex-1 ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                                <input 
                                                    type="number" min="1" max="100" 
                                                    value={genAmount} onChange={e => setGenAmount(e.target.value)}
                                                    className={`w-full bg-transparent outline-none font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}
                                                    placeholder="Amount to generate"
                                                />
                                            </div>
                                            <button onClick={handleGenerateAdminKeys} className={`px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r ${theme.gradient} hover:opacity-90 active:scale-95`}>
                                                Generate
                                            </button>
                                        </div>

                                        {generatedKeys && (
                                            <div className="mt-4 animate-fade-in-up">
                                                <textarea 
                                                    readOnly 
                                                    value={generatedKeys} 
                                                    rows={5}
                                                    className={`w-full p-4 rounded-xl border text-sm font-mono leading-relaxed resize-none ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C] text-[#A0A0A0]' : 'bg-[#F8F9FA] border-[#E5E7EB] text-[#6B7280]'}`} 
                                                />
                                                <div className="flex gap-3 mt-3">
                                                    <button onClick={() => {navigator.clipboard.writeText(generatedKeys); triggerHaptic('success');}} className={`flex-1 flex justify-center items-center gap-2 p-3 rounded-xl font-bold text-sm border ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] text-white hover:bg-[#2C2C2C]' : 'bg-white border-gray-200 text-black hover:bg-gray-50'}`}>
                                                        <Copy size={16} /> Copy All
                                                    </button>
                                                    <button onClick={shareAdminKeysTelegram} className="flex-1 flex justify-center items-center gap-2 p-3 rounded-xl font-bold text-sm border-none text-white shadow-md active:scale-95" style={{ backgroundColor: '#2AABEE' }}>
                                                        <Send size={16} /> Share via Telegram
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        <div className={`w-full h-px my-8 ${isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#E5E7EB]'}`}></div>
                                        <button onClick={handleSignOutDevice} className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-400 transition-colors">
                                            <LogOut size={16} /> Sign Out Device
                                        </button>
                                    </div>

                                ) : isCoursePurchased ? (
                                    
                                    /* PREMIUM LOGIC */
                                    <div className="space-y-8">
                                        <div className={`p-6 rounded-2xl border shadow-sm flex items-center justify-between ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                            <div>
                                                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Member Plan</p>
                                                <p className={`text-xl font-black ${theme.text}`}>Full Access (1-Year)</p>
                                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                                                    Expires: {new Date(purchasedCourses[activeAppTab].expiry).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <Crown size={40} className={`opacity-20 ${theme.text}`} />
                                        </div>

                                        <div>
                                            <p className={`text-sm font-bold mb-3 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Need Help?</p>
                                            <a href="https://t.me/+d9YiokUaUtZiNTZl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm transition-all active:scale-95 shadow-md hover:-translate-y-1 text-white" style={{ backgroundColor: '#2AABEE' }}>
                                                <Send size={18} /> Support Team
                                            </a>
                                        </div>

                                        <div className="space-y-3">
                                            <p className={`text-sm font-bold ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Update Key Code</p>
                                            <div className={`flex flex-col sm:flex-row gap-3 p-2 rounded-2xl border ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                                <input 
                                                    type="text" value={passcodeInput} onChange={(e) => setPasscodeInput(e.target.value.toUpperCase())}
                                                    placeholder="Enter new code..."
                                                    className={`flex-1 bg-transparent outline-none px-4 font-bold tracking-widest placeholder:tracking-normal ${isDarkMode ? 'text-white' : 'text-black'}`}
                                                />
                                                <button onClick={handleVerifyPasscode} disabled={!passcodeInput.trim() || isVerifying} className={`px-6 py-3 rounded-xl font-bold text-[13px] transition-all ${!passcodeInput.trim() ? 'opacity-50' : 'active:scale-95 text-white bg-gradient-to-r ' + theme.gradient}`}>
                                                    {isVerifying ? 'Verifying...' : 'Update'}
                                                </button>
                                            </div>
                                            {passcodeError && (
                                                <p className="text-red-500 text-[11px] font-bold tracking-wide mt-2 flex items-center justify-start gap-1">
                                                    <AlertCircle size={12} /> {passcodeError}
                                                </p>
                                            )}
                                        </div>

                                        <div className={`w-full h-px my-6 ${isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#E5E7EB]'}`}></div>
                                        <button onClick={handleSignOutDevice} className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-400 transition-colors">
                                            <LogOut size={16} /> Sign Out Device
                                        </button>
                                    </div>

                                ) : (
                                    /* UNPURCHASED LOGIC REORDERED */
                                    <>
                                        {/* STEP 1: PAYMENT */}
                                        <div className="mb-10">
                                            <h4 className={`text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 ${theme.text}`}>
                                                <span className={`text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] ${theme.bg}`}>1</span> 
                                                {lang === 'en' ? "Get Access Code" : 'បង់ប្រាក់ & យកលេខកូដ'}
                                            </h4>
                                            <div className="flex flex-col md:flex-row gap-8 relative z-10 items-center md:items-start">
                                                <div className="flex flex-col items-center shrink-0 w-full md:w-auto">
                                                    <div className="p-3 bg-white rounded-3xl shadow-lg border border-gray-100 mb-4">
                                                        <img src="/aba-khqr.png" alt="ABA KHQR" className={`w-48 h-48 object-contain rounded-xl shadow-sm border ${isDarkMode ? 'border-[#2C2C2C]' : 'border-gray-200'}`} />
                                                    </div>
                                                    <h3 className={`text-2xl font-black font-khmer ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>$20.00</h3>
                                                    <p className={`text-xs font-bold uppercase tracking-widest mt-1 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Full 1-Year Access</p>
                                                </div>

                                                <div className="flex-1 w-full text-center md:text-left flex flex-col justify-center h-full pt-2 md:pt-10">
                                                    <p className={`text-[14px] leading-relaxed font-khmer mb-6 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                                                        {lang === 'en' 
                                                            ? `Scan the KHQR to pay $20. Send the payment screenshot to our Telegram to receive your Key Code.` 
                                                            : `ស្កេន KHQR ដើម្បីបង់ប្រាក់ $20 រួចផ្ញើវិក្កយបត្រមក Telegram ដើម្បីទទួលបានលេខកូដដោះសោសម្ងាត់។`}
                                                    </p>
                                                    <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 w-full md:w-auto rounded-xl font-black font-khmer text-[14px] transition-all active:scale-95 shadow-lg hover:-translate-y-1 mb-6 text-white" style={{ backgroundColor: '#2AABEE' }}>
                                                        <Send size={18} /> {lang === 'en' ? 'Send Screenshot to Telegram' : 'ផ្ញើវិក្កយបត្រទៅ Telegram'}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`w-full h-px mb-10 ${isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#E5E7EB]'}`}></div>

                                        {/* STEP 2: KEY CODE */}
                                        <div className="mb-10">
                                            <h4 className={`text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${theme.text}`}>
                                                <span className={`text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] ${theme.bg}`}>2</span> 
                                                {lang === 'en' ? 'Enter Key Code' : 'បញ្ចូលលេខកូដ'}
                                            </h4>
                                            <div className={`flex flex-col sm:flex-row gap-3 p-4 rounded-2xl border ${passcodeError ? 'border-red-500 animate-shake bg-red-500/5' : (isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]')}`}>
                                                <div className="flex-1 flex items-center gap-3">
                                                    <KeyRound size={20} className={passcodeError ? 'text-red-500' : (isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]')} />
                                                    <input 
                                                        type="text" 
                                                        value={passcodeInput}
                                                        onChange={(e) => {
                                                            setPasscodeInput(e.target.value.toUpperCase());
                                                            setPasscodeError('');
                                                        }}
                                                        placeholder={getInputPlaceholder()}
                                                        className={`w-full bg-transparent outline-none font-bold text-center sm:text-left tracking-widest placeholder:tracking-normal ${isDarkMode ? 'text-white' : 'text-black'}`}
                                                    />
                                                </div>
                                                <button 
                                                    onClick={handleVerifyPasscode}
                                                    disabled={!passcodeInput.trim() || isVerifying}
                                                    className={`px-6 py-3 rounded-xl font-bold font-khmer text-[13px] transition-all active:scale-95 ${!passcodeInput.trim() ? 'opacity-50 cursor-not-allowed bg-gray-500' : `shadow-md hover:-translate-y-1 text-white bg-gradient-to-r ${theme.gradient}`}`}
                                                >
                                                    {isVerifying ? 'Checking...' : (lang === 'en' ? 'Unlock Now' : 'ដោះសោឥឡូវនេះ')}
                                                </button>
                                            </div>
                                            {passcodeError && (
                                                <p className="text-red-500 text-[11px] font-bold tracking-wide mt-2 flex items-center justify-center md:justify-start gap-1">
                                                    <AlertCircle size={12} /> {passcodeError}
                                                </p>
                                            )}
                                        </div>

                                        <div className={`w-full h-px mb-10 ${isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#E5E7EB]'}`}></div>

                                        {/* STEP 3: SECURE ACCOUNT (Google Only) */}
                                        <div className="mb-4">
                                            <h4 className={`text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${theme.text}`}>
                                                <span className={`text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] ${theme.bg}`}>3</span> 
                                                {lang === 'en' ? (user ? 'Account Linked' : 'Secure Account') : (user ? 'គណនីបានភ្ជាប់' : 'ភ្ជាប់គណនី')}
                                            </h4>
                                            
                                            {user ? (
                                                <div className={`p-4 rounded-xl border flex items-center justify-between shadow-sm animate-fade-in-up ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                                    <div className="flex items-center gap-3">
                                                        {user.photoURL ? (
                                                            <img src={user.photoURL} alt="Profile" className={`w-12 h-12 rounded-full border-2 ${theme.border}`} />
                                                        ) : (
                                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${theme.bg}`}>
                                                                {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>{user.displayName || 'User'}</p>
                                                            <p className={`text-xs ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{user.email}</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={handleLogout} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${isDarkMode ? 'bg-[#2C2C2C] hover:bg-[#3C3C3C]' : 'bg-[#E5E7EB] hover:bg-[#D1D5DB]'}`}>
                                                        Logout
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="max-w-sm">
                                                    <button onClick={handleGoogleLogin} className={`w-full flex items-center justify-center gap-3 p-4 rounded-xl font-bold text-sm border transition-all active:scale-95 shadow-sm hover:shadow-md ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C] text-white hover:bg-[#1A1A1A]' : 'bg-white border-gray-200 text-black hover:bg-gray-50'}`}>
                                                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                                        Continue with Google
                                                    </button>
                                                    <p className={`text-xs mt-3 font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                                                        <Sparkles size={12} className="inline mr-1" />
                                                        Recommend: Link your account to secure your access.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {isCoursePurchased && (
                    <div className={`mb-8 p-5 md:p-6 rounded-[24px] border shadow-sm animate-fade-in-up relative overflow-hidden ${isDarkMode ? 'bg-[#1E1E1E]/50 border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none bg-gradient-to-br ${theme.gradient} opacity-20`}></div>
                        <div className="flex justify-between items-end mb-4 relative z-10">
                            <div>
                                <h4 className={`font-bold font-khmer text-[13px] md:text-sm uppercase tracking-widest ${theme.text}`}>
                                    {lang === 'en' ? 'Course Progress' : 'វឌ្ឍនភាពនៃការសិក្សា'}
                                </h4>
                                <p className={`text-[12px] md:text-sm mt-1.5 font-khmer ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                                    {lang === 'en' ? `${completedInThisTab} of ${totalSteps} lessons completed` : `បានបញ្ចប់ ${completedInThisTab} នៃ ${totalSteps} មេរៀន`}
                                </p>
                            </div>
                            <span className={`text-3xl font-black ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{progressPercentage}%</span>
                        </div>
                        <div className={`h-3 w-full rounded-full overflow-hidden relative z-10 ${isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#F4F5F7]'}`}>
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${theme.gradient}`}
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <h3 className={`font-black text-2xl mb-6 flex items-center gap-3 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                    <BookOpen className={theme.text} /> 
                    {lang === 'en' ? 'Course Curriculum' : 'បញ្ជីមេរៀន'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {currentCourseData.map((l) => (
                        <LessonCard key={l.id} lesson={l} onClick={() => handleOpenLesson(l.id)} isDarkMode={isDarkMode} />
                    ))}
                </div>
            </div>
        </div>
      )}
      
      {activeTab !== 'ai' && !activeAppTab ? (
        <main className="flex-1 max-w-7xl mx-auto w-full overflow-y-auto custom-scrollbar p-4 md:p-8 relative z-0">
            {activeTab === 'learn' && (
            <div className="space-y-6 pb-24">
                <div className="text-center py-6 mt-2 relative">
                    <div className={`absolute inset-0 blur-[120px] rounded-full pointer-events-none ${isDarkMode ? 'bg-[#B52885]/10' : 'bg-[#B52885]/5'}`} />
                    <h2 className={`text-3xl md:text-5xl font-black mb-4 tracking-tight ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>iPad Masterclass</h2>
                    <p className={`max-w-xl mx-auto text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                        {lang === 'en' ? 'Select an app to begin your professional training.' : 'ជ្រើសរើសកម្មវិធីដើម្បីចាប់ផ្តើមការហ្វឹកហាត់កម្រិតអាជីពរបស់អ្នក។'}
                    </p>
                </div>

                <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full relative z-10">
                    <button onClick={() => handleOpenCourse('photo')} className={`group relative flex items-center justify-between p-5 md:p-6 rounded-3xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 overflow-hidden ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none bg-gradient-to-r ${APP_THEMES.photo.gradient}`}></div>
                        <div className="flex items-center gap-5 relative z-10">
                            <div className={`p-4 rounded-2xl ${APP_THEMES.photo.lightBg} ${APP_THEMES.photo.text}`}><Camera size={28} /></div>
                            <div className="text-left">
                                <h3 className={`font-black text-lg md:text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>Affinity Photo 2 iPad</h3>
                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{lang === 'en' ? 'Professional photo editing & manipulation' : 'ការកែច្នៃរូបភាពបែបអាជីព'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 relative z-10">
                            {!isAdmin && !purchasedCourses['photo']?.unlocked && <Lock size={18} className={`${APP_THEMES.photo.text} opacity-80`} />}
                            {isAdmin && <ShieldCheck size={18} className="text-[#41B6E6]" />}
                            <ChevronRight size={24} className={isDarkMode ? 'text-[#A0A0A0] group-hover:text-white' : 'text-[#6B7280] group-hover:text-black'} />
                        </div>
                    </button>

                    <button onClick={() => handleOpenCourse('designer')} className={`group relative flex items-center justify-between p-5 md:p-6 rounded-3xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 overflow-hidden ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none bg-gradient-to-r ${APP_THEMES.designer.gradient}`}></div>
                        <div className="flex items-center gap-5 relative z-10">
                            <div className={`p-4 rounded-2xl ${APP_THEMES.designer.lightBg} ${APP_THEMES.designer.text}`}><PenTool size={28} /></div>
                            <div className="text-left">
                                <h3 className={`font-black text-lg md:text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>Affinity Designer 2 iPad</h3>
                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{lang === 'en' ? 'Vector graphics & illustration' : 'ការឌីហ្សាញក្រាហ្វិក និងគំនូរ'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 relative z-10">
                            {!isAdmin && !purchasedCourses['designer']?.unlocked && <Lock size={18} className={`${APP_THEMES.designer.text} opacity-80`} />}
                            {isAdmin && <ShieldCheck size={18} className="text-[#41B6E6]" />}
                            <ChevronRight size={24} className={isDarkMode ? 'text-[#A0A0A0] group-hover:text-white' : 'text-[#6B7280] group-hover:text-black'} />
                        </div>
                    </button>

                    <button onClick={() => handleOpenCourse('publisher')} className={`group relative flex items-center justify-between p-5 md:p-6 rounded-3xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 overflow-hidden ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none bg-gradient-to-r ${APP_THEMES.publisher.gradient}`}></div>
                        <div className="flex items-center gap-5 relative z-10">
                            <div className={`p-4 rounded-2xl ${APP_THEMES.publisher.lightBg} ${APP_THEMES.publisher.text}`}><Book size={28} /></div>
                            <div className="text-left">
                                <h3 className={`font-black text-lg md:text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>Affinity Publisher 2 iPad</h3>
                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{lang === 'en' ? 'Page layout & typography design' : 'ការរៀបចំទំព័រ និងសៀវភៅ'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 relative z-10">
                            {!isAdmin && !purchasedCourses['publisher']?.unlocked && <Lock size={18} className={`${APP_THEMES.publisher.text} opacity-80`} />}
                            {isAdmin && <ShieldCheck size={18} className="text-[#41B6E6]" />}
                            <ChevronRight size={24} className={isDarkMode ? 'text-[#A0A0A0] group-hover:text-white' : 'text-[#6B7280] group-hover:text-black'} />
                        </div>
                    </button>
                </div>

                <TipsSection isExpanded={expandedSection === 'tips'} onToggle={() => setExpandedSection(expandedSection === 'tips' ? null : 'tips')} isDarkMode={isDarkMode} />
                <ContactSection isDarkMode={isDarkMode} />
            </div>
            )}
            {activeTab === 'tools' && <div className="pb-24"><ToolsView isDarkMode={isDarkMode} /></div>}
            {activeTab === 'quiz' && <Test isDarkMode={isDarkMode} />}
        </main>
      ) : (
        <div className={`flex-1 relative w-full h-full md:pb-0 z-0 ${activeAppTab ? 'hidden' : 'block'}`}>
             <ChatBot messages={chatMessages} setMessages={setChatMessages} isDarkMode={isDarkMode} />
        </div>
      )}

      <div className={`md:hidden absolute bottom-0 w-full p-4 z-50 pointer-events-none transition-all duration-300 ease-in-out ${isKeyboardOpen ? 'translate-y-32 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <nav className={`pointer-events-auto backdrop-blur-2xl border flex justify-around p-3 pb-safe rounded-[32px] shadow-2xl transition-all duration-500 ${isDarkMode ? 'bg-[#121212]/80 border-white/10 shadow-black/80' : 'bg-white/80 border-black/5 shadow-[#0277C5]/10'}`}>
            {['learn', 'quiz', 'tools', 'ai'].map(t_id => (
                <button key={t_id} onClick={() => { 
                    setActiveTab(t_id);
                    setActiveAppTab(null);
                    triggerHaptic(); 
                    window.history.pushState({ modalOpen: false, tab: t_id, course: null }, '');
                }} className={`flex flex-col items-center gap-1 transition-all duration-500 ease-out ${activeTab === t_id ? (isDarkMode ? 'text-[#41B6E6] -translate-y-1.5' : 'text-[#0277C5] -translate-y-1.5') : (isDarkMode ? 'text-[#A0A0A0] hover:text-[#F1F1F1]' : 'text-[#6B7280] hover:text-[#1A1A1A]')}`}>
                    {t_id === 'learn' && <BookOpen size={22} className={activeTab === t_id ? 'drop-shadow-md' : ''}/>}
                    {t_id === 'quiz' && <Award size={22} className={activeTab === t_id ? 'drop-shadow-md' : ''}/>}
                    {t_id === 'tools' && <Zap size={22} className={activeTab === t_id ? 'drop-shadow-md' : ''}/>}
                    {t_id === 'ai' && <Bot size={22} className={activeTab === t_id ? 'drop-shadow-md' : ''}/>}
                    <span className="text-[9px] font-black uppercase tracking-widest">{t(`tab_${t_id}`)}</span>
                </button>
            ))}
          </nav>
      </div>
    </div>
  );
}

export default function App() { return <LanguageProvider><AppContent /></LanguageProvider>; }