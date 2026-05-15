import React, { useState, useEffect } from 'react';
import { 
  Crown, Check, Info, ArrowLeft, X, Loader2, 
  Send, Key, RotateCcw, Shield, Lock, WifiOff, Layers, PlayCircle, ChevronRight, KeyRound
} from 'lucide-react';

import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider, db } from '../../../firebase'; 
import { useLanguage } from '../../../contexts/LanguageContext';

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const VALID_PASSCODES = {
    photo: ['PHOTO-A1B2C', 'PHOTO-X9Y8Z'],
    designer: ['DESIGN-A1B2C', 'DESIGN-X9Y8Z'],
    publisher: ['PUB-A1B2C', 'PUB-X9Y8Z']
};

const getDeviceId = () => {
    if (typeof window === 'undefined') return 'server';
    let id = localStorage.getItem('myDesign_deviceId');
    if (!id) {
        id = Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem('myDesign_deviceId', id);
    }
    return id;
};

const formatExpiry = (timestamp, lang) => {
    if (!timestamp) return lang === 'en' ? 'Lifetime Access' : 'ប្រើបានរហូត (Lifetime)';
    const d = new Date(parseInt(timestamp));
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const triggerHaptic = (type = 'light') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        if (type === 'error') navigator.vibrate([50, 50, 50]);
        else if (type === 'success') navigator.vibrate([30, 100, 30]);
        else navigator.vibrate(10); 
    }
};

export default function PremiumModal({ 
    activeAppTab, 
    isCoursePurchased, 
    theme, 
    appDisplayName, 
    isDarkMode, 
    showAdminPanel,
    purchasedCourses,
    setPurchasedCourses,
    user,
    setUser,
    setIsSuperAdmin,
    handleSignOutDevice,
}) {
    const { lang } = useLanguage();
    const [showRegistration, setShowRegistration] = useState(false);
    
    // 🌟 UI States
    const [checkoutMode, setCheckoutMode] = useState('select'); // select | qr | key
    const [plan, setPlan] = useState('year'); // month | year

    const [passcodeInput, setPasscodeInput] = useState('');
    const [passcodeError, setPasscodeError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    const localDeviceId = getDeviceId();
    const SECRET_PASSCODE = "MYDESIGN2026"; // Universal emergency backdoor

    // 🌟 Telegram Deep Link Logic 🌟
    let telegramMsg = "";
    if (plan === 'month') {
        telegramMsg = lang === 'en' 
            ? `Hello! I would like to purchase the ${appDisplayName} course (1 Month - $5). Here is my payment slip:` 
            : `សួស្តីបង! ខ្ញុំចង់ទិញវគ្គសិក្សា ${appDisplayName} (១ខែ - $5)។ នេះជាវិក្កយបត្របង់ប្រាក់របស់ខ្ញុំ៖`;
    } else {
        telegramMsg = lang === 'en' 
            ? `Hello! I would like to purchase the ${appDisplayName} course (1 Year - $20). Here is my payment slip:` 
            : `សួស្តីបង! ខ្ញុំចង់ទិញវគ្គសិក្សា ${appDisplayName} (១ឆ្នាំ - $20)។ នេះជាវិក្កយបត្របង់ប្រាក់របស់ខ្ញុំ៖`;
    }
    const telegramUrl = `tg://resolve?domain=koymy&text=${encodeURIComponent(telegramMsg)}`;

    useEffect(() => {
        if (!showRegistration) {
            setCheckoutMode('select');
            setPasscodeInput('');
            setPasscodeError('');
        }
    }, [showRegistration]);

    // 🌟 ការឡូកអ៊ីនជាមួយ Google
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

    // 🌟 ធ្វើសមកាលកម្មទិន្នន័យទិញ (Sync Purchases)
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

    // 🌟 Auto-Hyphen ឆ្លាតវៃសម្រាប់កូដចាស់ (Backdoor) និងកូដថ្មី (Admin Gen) 🌟
    const handlePasscodeChange = (e) => {
        let raw = e.target.value.toUpperCase();
        let cleanText = raw.replace(/[^A-Z0-9]/g, ''); 
        
        // 1. ឆែកមើលថាតើវាជាកូដ Backdoor ចាស់ឬទេ? (PHOTO-, DESIGN-, PUB-)
        if (cleanText.startsWith('PHOTO') || cleanText.startsWith('DESIGN') || cleanText.startsWith('PUB')) {
            let prefixLength = cleanText.startsWith('PHOTO') ? 5 : cleanText.startsWith('DESIGN') ? 6 : 3;
            if (cleanText.length > prefixLength) {
                setPasscodeInput(cleanText.substring(0, prefixLength) + '-' + cleanText.substring(prefixLength, prefixLength + 5));
            } else {
                setPasscodeInput(cleanText);
            }
        } 
        // 2. ឆែកមើលថាតើវាជាកូដថ្មីពី Admin ឬទេ? (PH-Y-XXXXX, DS-M-XXXXX, PB-T-XXXXX)
        else if (cleanText.startsWith('PH') || cleanText.startsWith('DS') || cleanText.startsWith('PB')) {
            let formatted = cleanText;
            if (formatted.length > 2) formatted = formatted.substring(0, 2) + '-' + formatted.substring(2);
            if (formatted.length > 4) formatted = formatted.substring(0, 4) + '-' + formatted.substring(4);
            setPasscodeInput(formatted.substring(0, 10)); 
        } 
        // 3. វាយធម្មតា
        else {
            setPasscodeInput(raw);
        }
    };

    // 🌟 ផ្ទៀងផ្ទាត់លេខកូដ (Verify Passcode ជាមួយ Firebase) 🌟
    const handleVerifyPasscode = async () => {
        if (!activeAppTab) return;
        const code = passcodeInput.trim().toUpperCase();
        setIsVerifying(true);
        setPasscodeError('');

        // 1. ឆែក Backdoor & Master Code មុនគេ
        if (code === SECRET_PASSCODE || (VALID_PASSCODES[activeAppTab] && VALID_PASSCODES[activeAppTab].includes(code))) {
            triggerHaptic('success');
            const updatedPurchases = { ...purchasedCourses, [activeAppTab]: { unlocked: true, expiry: Date.now() + ONE_YEAR_MS, keyUsed: code }};
            setPurchasedCourses(updatedPurchases);
            if (user) await setDoc(doc(db, "users", user.uid), { purchasedCourses: updatedPurchases }, { merge: true });
            
            setSuccessMsg(lang === 'en' ? 'Unlocked Successfully!' : 'ទទួលបានសិទ្ធិជោគជ័យ!');
            setTimeout(() => { setSuccessMsg(''); setShowRegistration(false); setPasscodeInput(''); }, 2000);
            setIsVerifying(false);
            return;
        }

        // 2. ឆែក Database
        try {
            const keyRef = doc(db, "activationCodes", code);
            const keySnap = await getDoc(keyRef);

            if (keySnap.exists() && keySnap.data().used === false) {
                const keyData = keySnap.data();
                const now = Date.now();

                // កំណត់ App ID ដើម្បីផ្គូផ្គង (ឧទាហរណ៍៖ activeAppTab='photo' ត្រូវគ្នាជាមួយ 'affinity_photo')
                const targetMatch = `affinity_${activeAppTab}`;

                if (keyData.targetApp !== targetMatch) {
                    triggerHaptic('error');
                    setPasscodeError(lang === 'en' ? 'Code is not for this course.' : 'លេខកូដនេះមិនត្រឹមត្រូវសម្រាប់វគ្គនេះទេ។');
                    setIsVerifying(false); return;
                }

                if (keyData.expiresAt && now > keyData.expiresAt) {
                    await deleteDoc(keyRef);
                    triggerHaptic('error');
                    setPasscodeError(lang === 'en' ? 'Activation key expired.' : 'លេខកូដនេះបានផុតកំណត់ហើយ។');
                    setIsVerifying(false); return;
                }

                // គណនាថ្ងៃផុតកំណត់ដោយផ្អែកលើកញ្ចប់
                let duration = 365 * 24 * 60 * 60 * 1000; // Default Year
                if (keyData.plan === 'month') duration = 30 * 24 * 60 * 60 * 1000;
                if (keyData.plan === 'trial') duration = 7 * 24 * 60 * 60 * 1000; // 🌟 កូដសាកល្បង ៧ ថ្ងៃពី Admin

                const currentExp = purchasedCourses[activeAppTab]?.expiry || now;
                const baseTime = currentExp > now ? currentExp : now;
                const newExpiry = baseTime + duration;

                // 🌟 លុបកូដចេញពី Database ដើម្បីធានាប្រើបានតែ ១ ដង
                await deleteDoc(keyRef);

                const updatedPurchases = {
                    ...purchasedCourses,
                    [activeAppTab]: { unlocked: true, expiry: newExpiry, keyUsed: code }
                };
                setPurchasedCourses(updatedPurchases);

                if (user) {
                    await setDoc(doc(db, "users", user.uid), { purchasedCourses: updatedPurchases }, { merge: true });
                }

                triggerHaptic('success');
                setSuccessMsg(lang === 'en' ? 'Premium Unlocked!' : 'ទទួលបានសិទ្ធិជោគជ័យ!');
                setTimeout(() => { 
                    setSuccessMsg(''); 
                    setCheckoutMode('select'); 
                    setShowRegistration(false); 
                    setPasscodeInput(''); 
                }, 2000);

            } else {
                triggerHaptic('error');
                setPasscodeError(lang === 'en' ? 'Invalid or already used key.' : 'លេខកូដមិនត្រឹមត្រូវ ឬត្រូវបានប្រើរួច។');
            }
        } catch(error) {
            console.error("Verification error", error);
            triggerHaptic('error');
            setPasscodeError("Connection error. Please try again.");
        }
        setIsVerifying(false);
    };

    const getKhmerCourseTitle = (id) => {
        if (id === 'photo') return 'វគ្គសិក្សា Photo 2 iPad';
        if (id === 'designer') return 'វគ្គសិក្សា Designer 2 iPad';
        if (id === 'publisher') return 'វគ្គសិក្សា Publisher 2 iPad';
        return 'ចុះឈ្មោះវគ្គបច្ចេកទេសជំនាញ';
    };

    const getInputPlaceholder = () => {
        if (lang !== 'en') return "បញ្ចូលលេខកូដសម្ងាត់...";
        if (activeAppTab === 'photo') return "PH-Y-XXXXX";
        if (activeAppTab === 'designer') return "DS-Y-XXXXX";
        if (activeAppTab === 'publisher') return "PB-Y-XXXXX";
        return "CODE-XXXXX";
    };

    const handleDownloadQR = () => {
        triggerHaptic();
        const link = document.createElement('a');
        link.href = plan === 'month' ? '/aba-khqr5.png' : '/aba-khqr20.png';
        link.download = plan === 'month' ? 'Premium_KHQR_5.png' : 'Premium_KHQR_20.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={`mb-8 border rounded-3xl overflow-hidden shadow-md ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}>
            <button 
                onClick={() => { setShowRegistration(!showRegistration); triggerHaptic(); }} 
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
                        
                        {/* 🌟 1. PREMIUM VIEW (UNLOCKED) 🌟 */}
                        {isCoursePurchased ? (
                            <div className="space-y-8 max-w-md mx-auto">
                                <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl flex items-center justify-between relative overflow-hidden ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-20 pointer-events-none bg-gradient-to-br ${theme.gradient}`}></div>
                                    <div className="relative z-10">
                                        <p className={`text-[11px] font-bold uppercase tracking-widest mb-1 opacity-70 ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>Member Plan</p>
                                        <p className={`text-2xl font-black mb-1 ${theme.text}`}>Full Access</p>
                                        {purchasedCourses[activeAppTab]?.expiry && (
                                            <p className={`text-[13px] font-medium ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
                                                Valid until: <span className="font-bold">{formatExpiry(purchasedCourses[activeAppTab].expiry, lang)}</span>
                                            </p>
                                        )}
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
                                                {lang === 'en' ? '⚠️ You are using a local key. Link your Google account now to secure permanent access across devices.' : '⚠️ អ្នកកំពុងប្រើកូដនៅលើឧបករណ៍នេះតែប៉ុណ្ណោះ។ សូមភ្ជាប់គណនី Google របស់អ្នកឥឡូវនេះ ដើម្បីកុំឱ្យបាត់បង់សិទ្ធិចូលរៀន។'}
                                            </p>
                                            <button onClick={handleGoogleLogin} className={`w-full flex items-center justify-center gap-3 p-4 rounded-2xl font-bold text-[15px] border transition-all active:scale-[0.98] shadow-sm hover:shadow-md ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C] text-white hover:bg-[#2C2C2C]' : 'bg-white border-gray-200 text-black hover:bg-gray-50'}`}>
                                                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                                Link Google Account
                                            </button>
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
                            
                            /* 🌟 2. NON-PREMIUM VIEW (PURCHASE/UNLOCK) 🌟 */
                            <div className="flex flex-col items-center animate-fade-in-up w-full">
                                
                                {checkoutMode !== 'select' && (
                                    <div className="w-full max-w-md flex justify-start mb-4">
                                        <button onClick={() => { setCheckoutMode('select'); setPasscodeError(''); }} className={`p-2 rounded-full transition-all active:scale-90 ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}>
                                            <ArrowLeft size={20} />
                                        </button>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-[24px] mb-4 shadow-inner ${theme.lightBg}`}>
                                        {checkoutMode === 'key' ? <Key className={`w-10 h-10 ${theme.text}`} /> : <Crown className={`w-10 h-10 ${theme.text}`} />}
                                    </div>
                                    <h3 className={`text-2xl md:text-3xl font-black font-khmer tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                        {checkoutMode === 'key' ? (lang === 'en' ? 'Enter Activation Key' : 'បញ្ចូលលេខកូដសម្ងាត់') : (lang === 'en' ? 'Pro Masterclass' : getKhmerCourseTitle(activeAppTab))}
                                    </h3>
                                    {checkoutMode === 'select' && (
                                        <p className={`text-[14px] font-medium ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>
                                            {lang === 'en' ? 'Choose a plan to unlock full access.' : 'ជ្រើសរើសកញ្ចប់ ដើម្បីចូលរៀនបានពេញលេញ'}
                                        </p>
                                    )}
                                </div>

                                {/* 🌟 ជម្រើសទូទាត់ប្រាក់ (2 Options) 🌟 */}
                                {checkoutMode === 'select' && (
                                    <div className="flex flex-col gap-4 w-full max-w-md mx-auto animate-fade-in-up">
                                        <button 
                                            onClick={() => { setPlan('month'); setCheckoutMode('qr'); triggerHaptic(); }} 
                                            className={`w-full p-6 rounded-3xl border transition-all relative flex items-center justify-between group ${isDarkMode ? 'bg-[#242526] border-transparent hover:border-gray-500' : 'bg-gray-100 border-transparent hover:border-gray-300 shadow-sm'}`}
                                        >
                                            <div className="text-left">
                                                <div className={`text-2xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>$5</div>
                                                <div className={`text-sm font-bold font-khmer ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>{lang === 'en' ? '1 Month Access' : 'គម្រោង ១ ខែ - $5'}</div>
                                            </div>
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-white/10 text-white' : 'bg-black/10 text-black'}`}>
                                                <ChevronRight />
                                            </div>
                                        </button>

                                        <button 
                                            onClick={() => { setPlan('year'); setCheckoutMode('qr'); triggerHaptic(); }} 
                                            className={`w-full p-6 rounded-3xl border transition-all relative flex items-center justify-between group ${isDarkMode ? 'bg-black shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)]'} ${theme.border}`}
                                        >
                                            <div className="absolute -top-3 left-6 bg-[#FF3B30] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">Best Value</div>
                                            <div className="text-left">
                                                <div className={`text-2xl font-black mb-1 ${theme.text}`}>$20</div>
                                                <div className={`text-sm font-bold font-khmer ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>{lang === 'en' ? '1 Year Access' : 'គម្រោង ១ ឆ្នាំ - $20'}</div>
                                            </div>
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${theme.bg}`}>
                                                <ChevronRight />
                                            </div>
                                        </button>
                                        
                                        <div className="flex items-center my-2 w-full opacity-60">
                                            <div className={`flex-1 border-t ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}></div>
                                            <span className={`px-4 text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-400'}`}>{lang === 'en' ? 'Or' : 'ឬ'}</span>
                                            <div className={`flex-1 border-t ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}></div>
                                        </div>

                                        <button 
                                            onClick={() => { setCheckoutMode('key'); triggerHaptic(); }}
                                            className={`w-full py-4 rounded-[20px] font-bold font-khmer text-[15px] flex items-center justify-center gap-3 transition-all ${isDarkMode ? 'bg-[#242526] text-white hover:bg-[#2C2C2E]' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
                                        >
                                            <Key size={20} /> {lang === 'en' ? 'Enter Premium Key' : 'វាយលេខកូដសម្ងាត់'}
                                        </button>

                                        {!user && (
                                            <button 
                                                onClick={handleGoogleLogin}
                                                className={`w-full mt-2 py-4 rounded-[20px] font-bold text-[15px] flex items-center justify-center gap-3 transition-all border ${isDarkMode ? 'bg-[#1C1C1E] text-white border-[#2C2C2C] hover:bg-[#2C2C2C]' : 'bg-white text-black border-gray-200 hover:bg-gray-50 shadow-sm'}`}
                                            >
                                                <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                                                {lang === 'en' ? 'Log In to Restore Purchase' : 'ចូលគណនីទាញយកវគ្គវិញ'}
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* 🌟 ផ្ទាំង QR & Telegram (Direct) 🌟 */}
                                {checkoutMode === 'qr' && (
                                    <div className={`w-full max-w-md mx-auto rounded-[32px] p-6 sm:p-8 mb-8 border backdrop-blur-md shadow-xl flex flex-col items-center gap-6 animate-fade-in-up ${isDarkMode ? 'bg-[#1C1C1E]/80 border-[#2C2C2C]' : 'bg-white/80 border-[#E5E7EB] shadow-black/5'}`}>
                                        <div className={`inline-flex px-4 py-2 rounded-full text-sm font-bold font-khmer mb-2 items-center gap-2 ${theme.lightBg} ${theme.text}`}>
                                            <Crown size={16}/> 
                                            {plan === 'month' ? (lang === 'en' ? '1 Month Plan - $5' : 'គម្រោង ១ ខែ - $5') : (lang === 'en' ? '1 Year Plan - $20' : 'គម្រោង ១ ឆ្នាំ - $20')}
                                        </div>

                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-44 h-44 bg-white rounded-[24px] p-3 shadow-md border border-gray-100 flex items-center justify-center relative group overflow-hidden">
                                                <img src={plan === 'month' ? '/aba-khqr5.png' : '/aba-khqr20.png'} alt="ABA KHQR" className="w-full h-full object-contain rounded-xl" />
                                                <button onClick={handleDownloadQR} className="absolute inset-0 bg-black/60 flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity flex backdrop-blur-sm cursor-pointer">
                                                    <Download size={32} className="mb-2" />
                                                    <span className="font-bold text-sm font-khmer">{lang === 'en' ? 'Download QR' : 'ទាញយក QR'}</span>
                                                </button>
                                            </div>
                                            <span className={`text-xs font-bold tracking-widest uppercase ${theme.text}`}>SCAN TO PAY</span>
                                        </div>
                                        
                                        <button onClick={handleDownloadQR} className={`flex items-center justify-center gap-2 mx-auto font-bold text-sm font-khmer mb-2 hover:underline md:hidden ${theme.text}`}>
                                            <Download size={16}/> {lang === 'en' ? 'Save QR to Photos' : 'រក្សាទុក QR ទៅក្នុងទូរស័ព្ទ'}
                                        </button>

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
                                )}

                                {/* 🌟 ផ្ទាំងបញ្ចូលកូដ (Enter Key) 🌟 */}
                                {checkoutMode === 'key' && (
                                    <div className="w-full max-w-md mx-auto mb-10 animate-fade-in-up">
                                        {!user && (
                                            <p className={`text-center text-[11.5px] font-khmer font-bold mb-6 px-2 ${theme.text}`}>
                                                {lang === 'en' ? 'Using key without an account works for 1 device. Create an account to use on 2 devices and secure your purchase.' : 'ប្រើកូដសម្ងាត់ផ្ទាល់នឹងជាប់បានតែ ១ ឧបករណ៍។ បង្កើតគណនីដើម្បីប្រើបាន ២ ឧបករណ៍ និងការពារការបាត់បង់។'}
                                            </p>
                                        )}
                                        <div className={`relative flex items-center p-2 rounded-[24px] border transition-colors shadow-sm ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'} focus-within:border-[${appColor}]`}>
                                            <KeyRound className={`absolute left-5 w-6 h-6 ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-400'}`} />
                                            <input 
                                                type="text" 
                                                value={passcodeInput}
                                                onChange={handlePasscodeChange}
                                                placeholder={getInputPlaceholder()}
                                                className={`flex-1 bg-transparent py-3 pl-14 pr-2 outline-none font-bold tracking-widest uppercase text-[15px] w-full ${isDarkMode ? 'text-white' : 'text-black'}`}
                                            />
                                            <button 
                                                onClick={handleVerifyPasscode}
                                                disabled={!passcodeInput.trim() || isVerifying}
                                                className={`px-7 py-3.5 rounded-[18px] text-white font-bold font-khmer text-[15px] active:scale-[0.95] transition-all flex items-center justify-center shrink-0 ${(isVerifying || !passcodeInput.trim()) ? 'opacity-50 cursor-not-allowed bg-gray-500' : `shadow-md bg-gradient-to-r ${theme.gradient}`}`}
                                            >
                                                {isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : (lang === 'en' ? 'Unlock' : 'បញ្ជាក់')}
                                            </button>
                                        </div>
                                        {successMsg && <p className="text-green-500 text-[13px] font-bold tracking-wide mt-4 text-center">{successMsg}</p>}
                                        {passcodeError && (
                                            <p className="text-red-500 text-[13px] font-bold tracking-wide mt-4 flex items-center justify-center gap-1.5">
                                                <AlertCircle size={16} /> {passcodeError}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}