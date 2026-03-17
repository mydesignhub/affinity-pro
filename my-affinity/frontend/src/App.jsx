import React, { useState, useEffect } from 'react';
import { ChevronRight, PlayCircle, Sparkles, Zap, Facebook, Send, Globe, BookOpen, Award, Bot, Camera, PenTool, Book, Lock, KeyRound, AlertCircle, ChevronDown, RotateCcw, Crown, LogOut, Copy, ShieldCheck, CheckCircle, Database, Loader2 } from 'lucide-react';

// FIREBASE IMPORTS
import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
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

  useEffect(() => {
      if (isAdmin && activeAppTab && showRegistration) {
          const savedKeys = localStorage.getItem(`myAffinity_last_keys_${activeAppTab}`);
          if (savedKeys) {
              setGeneratedKeys(savedKeys);
          } else {
              setGeneratedKeys('');
          }
      }
  }, [activeAppTab, showRegistration, isAdmin]);

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
                                
                                {/* 🌟 SECURE ADMIN PANEL 🌟 */}
                                {isAdmin ? (
                                    <div className={`p-5 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                        <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${theme.gradient} rounded-full blur-[60px] opacity-10 pointer-events-none`}></div>
                                        <h4 className={`text-xl font-black font-khmer flex items-center gap-3 mb-2 ${theme.text}`}>
                                            <ShieldCheck className="w-6 h-6"/> Admin Control Panel
                                        </h4>
                                        <p className={`text-sm mb-6 font-khmer leading-relaxed ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>
                                            Generate secure, single-use activation keys for <strong>{appDisplayName}</strong>. Keys automatically expire 7 days after generation.
                                        </p>
                                        
                                        <div className="flex gap-3 mb-4">
                                            <input 
                                                type="number" 
                                                value={genAmount} 
                                                onChange={e => setGenAmount(Number(e.target.value))}
                                                className={`w-24 p-3.5 rounded-2xl border text-center outline-none font-bold text-lg transition-colors ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C] text-white focus:border-white/30' : 'bg-gray-50 border-[#E5E7EB] text-black focus:border-black/30'}`}
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
                                                    <div key={c} className={`p-3.5 rounded-xl border flex items-center justify-between shadow-sm transition-colors ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                                        <span className={`font-mono font-bold tracking-widest text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>{c}</span>
                                                        <div className="flex gap-2">
                                                            <button 
                                                                onClick={() => { 
                                                                    navigator.clipboard.writeText(c); 
                                                                    setCopiedCode(c); 
                                                                    triggerHaptic();
                                                                    setTimeout(() => setCopiedCode(null), 2000); 
                                                                }} 
                                                                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}
                                                            >
                                                                {copiedCode === c ? <CheckCircle size={18} className="text-green-500"/> : <Copy size={18} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />}
                                                            </button>
                                                            <button onClick={() => shareSingleKeyTelegram(c)} className={`p-2 rounded-lg transition-colors shadow-sm text-white bg-gradient-to-r ${theme.gradient}`}>
                                                                <Send size={18} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className={`w-full h-px my-6 ${isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#E5E7EB]'}`}></div>
                                        <button onClick={handleSignOutDevice} className="w-full py-3.5 rounded-xl border font-bold font-khmer text-sm active:scale-[0.98] transition-colors flex items-center justify-center gap-2 text-red-500 hover:bg-red-500/10 border-red-500/20">
                                            <LogOut size={18} /> Sign Out Device
                                        </button>
                                    </div>

                                ) : isCoursePurchased ? (
                                    
                                    /* 🌟 PREMIUM ACCOUNT DASHBOARD 🌟 */
                                    <div className="space-y-8 max-w-md mx-auto">
                                        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl flex items-center justify-between relative overflow-hidden ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-20 pointer-events-none bg-gradient-to-br ${theme.gradient}`}></div>
                                            <div className="relative z-10">
                                                <p className={`text-xs font-bold uppercase tracking-widest mb-1 opacity-70 ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>Member Plan</p>
                                                <p className={`text-2xl font-black mb-1 ${theme.text}`}>Full Access</p>
                                                <p className={`text-sm font-medium ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
                                                    Valid until: <span className="font-bold">{new Date(purchasedCourses[activeAppTab].expiry).toLocaleDateString()}</span>
                                                </p>
                                            </div>
                                            <Crown size={48} className={`opacity-20 relative z-10 ${theme.text}`} />
                                        </div>

                                        {/* 🌟 GOOGLE ACCOUNT LINK/SYNC FOR PREMIUM 🌟 */}
                                        <div className="w-full flex items-center gap-4 opacity-50 mb-6">
                                            <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                                            <span className={`text-[10px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-white/50' : 'text-black/40'}`}>ACCOUNT SYNC</span>
                                            <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                                        </div>

                                        <div className="w-full mb-8">
                                            {user ? (
                                                <div className={`p-4 rounded-2xl border flex items-center justify-between shadow-sm animate-fade-in-up ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                                    <div className="flex items-center gap-4">
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
                                                    <button onClick={handleLogout} className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${isDarkMode ? 'bg-[#2C2C2C] hover:bg-[#3C3C3C]' : 'bg-[#E5E7EB] hover:bg-[#D1D5DB]'}`}>
                                                        Logout
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-center animate-fade-in-up">
                                                    <button onClick={handleGoogleLogin} className={`w-full flex items-center justify-center gap-3 p-4 rounded-2xl font-bold text-sm border transition-all active:scale-[0.98] shadow-sm hover:shadow-md ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] text-white hover:bg-[#2C2C2C]' : 'bg-white border-gray-200 text-black hover:bg-gray-50'}`}>
                                                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                                        Continue with Google
                                                    </button>
                                                    <p className={`text-xs mt-4 font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                                                        <Sparkles size={12} className="inline mr-1" />
                                                        {lang === 'en' ? 'Secure your purchase by linking an account.' : 'សូមភ្ជាប់គណនីដើម្បីការពារការទិញរបស់អ្នក។'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-center">
                                            <p className={`text-sm font-bold mb-3 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Need Help with your purchase?</p>
                                            <a href="https://t.me/+d9YiokUaUtZiNTZl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-sm transition-all active:scale-[0.98] shadow-lg hover:-translate-y-1 text-white" style={{ backgroundColor: '#2AABEE' }}>
                                                <Send size={18} /> Contact Support Team
                                            </a>
                                        </div>

                                        <div className={`w-full h-px my-6 ${isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#E5E7EB]'}`}></div>
                                        <button onClick={handleSignOutDevice} className="w-full py-4 rounded-xl font-bold font-khmer text-sm active:scale-[0.98] transition-colors flex items-center justify-center gap-2 text-red-500 hover:bg-red-500/10">
                                            <LogOut size={18} /> Sign Out Device
                                        </button>
                                    </div>

                                ) : (
                                    /* 🌟 UNPURCHASED LOGIC (Redesigned Flow) 🌟 */
                                    <div className="flex flex-col items-center animate-fade-in-up">
                                        
                                        {/* STEP 1: PAYMENT HEADER */}
                                        <div className="text-center mb-8">
                                            <div className={`inline-flex items-center justify-center p-4 rounded-3xl mb-4 ${theme.lightBg}`}>
                                                <Crown className={`w-10 h-10 ${theme.text}`} />
                                            </div>
                                            <h3 className={`text-3xl font-black font-khmer tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                                {lang === 'en' ? 'Pro Masterclass' : 'ចុះឈ្មោះវគ្គបច្ចេកទេសជំនាញ'}
                                            </h3>
                                            <p className={`text-sm font-medium ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>
                                                {lang === 'en' ? 'One-time payment. One year full access.' : 'បង់ប្រាក់ម្ដង ប្រើប្រាស់បានពេញ១ឆ្នាំ'}
                                            </p>
                                            <div className="mt-4 flex items-baseline justify-center gap-1">
                                                <span className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-black'}`}>$20</span>
                                                <span className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-400'}`}>/ {lang === 'en' ? 'YEAR' : 'ឆ្នាំ'}</span>
                                            </div>
                                        </div>

                                        {/* UNIFIED PAYMENT CARD */}
                                        <div className={`w-full max-w-md mx-auto rounded-3xl p-6 sm:p-8 mb-8 border backdrop-blur-md shadow-xl flex flex-col items-center gap-6 ${isDarkMode ? 'bg-[#1E1E1E]/80 border-[#2C2C2C]' : 'bg-white/80 border-[#E5E7EB] shadow-black/5'}`}>
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-44 h-44 bg-white rounded-3xl p-3 shadow-md border border-gray-100 flex items-center justify-center">
                                                    <img src="/aba-khqr.png" alt="ABA KHQR" className="w-full h-full object-contain rounded-xl" />
                                                </div>
                                                <span className={`text-xs font-bold tracking-widest uppercase ${theme.text}`}>SCAN TO PAY</span>
                                            </div>
                                            
                                            <div className="w-full flex items-center gap-4 opacity-50">
                                                <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                                                <span className={`text-[10px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-white/50' : 'text-black/40'}`}>THEN</span>
                                                <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                                            </div>
                                            
                                            <div className="w-full text-center">
                                                <p className={`text-[13px] font-khmer mb-4 leading-relaxed ${isDarkMode ? 'text-[#E3E3E3]' : 'text-gray-600'}`}>
                                                    {lang === 'en' ? 'Send your receipt via Telegram to get your activation key.' : 'ផ្ញើវិក័យប័ត្រតាម Telegram ដើម្បីទទួលបានលេខកូដ។'}
                                                </p>
                                                <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold font-khmer transition-all active:scale-[0.98] shadow-lg text-white bg-gradient-to-r ${theme.gradient}`}>
                                                    <Send className="w-5 h-5" />
                                                    {lang === 'en' ? 'Send Receipt to Telegram' : 'ផ្ញើវិក័យប័ត្រទីនេះ'}
                                                </a>
                                            </div>
                                        </div>

                                        {/* STEP 2: INLINE KEY CODE */}
                                        <div className="w-full max-w-md mx-auto mb-10">
                                            <label className={`block text-[11px] font-bold uppercase tracking-widest mb-3 pl-1 ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>
                                                {lang === 'en' ? 'Activation Key' : 'លេខកូដសម្ងាត់'}
                                            </label>
                                            <div className={`relative flex items-center p-1.5 rounded-2xl border transition-colors shadow-sm ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C] focus-within:border-[#41B6E6]' : 'bg-white border-[#E5E7EB] focus-within:border-[#0277C5]'}`}>
                                                <KeyRound className={`absolute left-4 w-5 h-5 ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-400'}`} />
                                                <input 
                                                    type="text" 
                                                    value={passcodeInput}
                                                    onChange={(e) => {
                                                        setPasscodeInput(e.target.value.toUpperCase());
                                                        setPasscodeError('');
                                                    }}
                                                    placeholder={getInputPlaceholder()}
                                                    className={`flex-1 bg-transparent py-3 pl-12 pr-2 outline-none font-bold tracking-widest uppercase text-sm w-full ${isDarkMode ? 'text-white' : 'text-black'}`}
                                                />
                                                <button 
                                                    onClick={handleVerifyPasscode}
                                                    disabled={!passcodeInput.trim() || isVerifying}
                                                    className={`px-6 py-3 rounded-xl text-white font-bold font-khmer text-sm active:scale-[0.95] transition-all flex items-center justify-center shrink-0 ${(isVerifying || !passcodeInput.trim()) ? 'opacity-50 cursor-not-allowed bg-gray-500' : `shadow-md bg-gradient-to-r ${theme.gradient}`}`}
                                                >
                                                    {isVerifying ? 'Checking...' : (lang === 'en' ? 'Unlock' : 'បញ្ជាក់')}
                                                </button>
                                            </div>
                                            {passcodeError && (
                                                <p className="text-red-500 text-[11px] font-bold tracking-wide mt-3 flex items-center justify-center gap-1">
                                                    <AlertCircle size={14} /> {passcodeError}
                                                </p>
                                            )}
                                        </div>

                                        {/* STEP 3: ACCOUNT SYNC */}
                                        <div className="w-full flex items-center gap-4 opacity-50 max-w-md mx-auto mb-8">
                                            <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                                            <span className={`text-[10px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-white/50' : 'text-black/40'}`}>ACCOUNT SYNC</span>
                                            <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                                        </div>

                                        <div className="w-full max-w-md mx-auto">
                                            {user ? (
                                                <div className={`p-4 rounded-2xl border flex items-center justify-between shadow-sm animate-fade-in-up ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                                    <div className="flex items-center gap-4">
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
                                                    <button onClick={handleLogout} className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${isDarkMode ? 'bg-[#2C2C2C] hover:bg-[#3C3C3C]' : 'bg-[#E5E7EB] hover:bg-[#D1D5DB]'}`}>
                                                        Logout
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <button onClick={handleGoogleLogin} className={`w-full flex items-center justify-center gap-3 p-4 rounded-2xl font-bold text-sm border transition-all active:scale-[0.98] shadow-sm hover:shadow-md ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] text-white hover:bg-[#2C2C2C]' : 'bg-white border-gray-200 text-black hover:bg-gray-50'}`}>
                                                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                                        Continue with Google
                                                    </button>
                                                    <p className={`text-xs mt-4 font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                                                        <Sparkles size={12} className="inline mr-1" />
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