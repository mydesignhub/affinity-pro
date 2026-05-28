import React, { useState, useEffect } from 'react';
import {
  Crown, Check, Info, ArrowLeft, X, Loader2,
  Send, Key, RotateCcw, Shield, Lock, WifiOff, Layers, PlayCircle,
  ChevronRight, KeyRound, ChevronDown, ShieldCheck, Minimize, Maximize,
  Clock, DownloadCloud, CheckCircle2, Circle, AlertCircle, Download, LogOut
} from 'lucide-react';

import { doc, getDoc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider, db, C } from '../../../firebase';
import { useLanguage } from '../../../contexts/LanguageContext';

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

const getDeviceId = () => {
    let id = localStorage.getItem('affinityPro_deviceId');
    if (!id) {
        id = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
        localStorage.setItem('affinityPro_deviceId', id);
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

    const appColor = theme.bg.replace('bg-[', '').replace(']', '');

    // Purchase request states
    const [requestStatus, setRequestStatus] = useState('idle'); // idle | submitting | pending | approved | rejected
    const [paymentNote, setPaymentNote] = useState('');
    const [currentRequestId, setCurrentRequestId] = useState(null);

    useEffect(() => {
        if (!showRegistration) {
            setCheckoutMode('select');
            setPasscodeInput('');
            setPasscodeError('');
            setRequestStatus('idle');
            setPaymentNote('');
            setCurrentRequestId(null);
        }
    }, [showRegistration]);

    // When QR view opens, check if there's already a pending request for this device+app
    useEffect(() => {
        if (checkoutMode !== 'qr') {
            setRequestStatus('idle');
            setPaymentNote('');
            return;
        }
        const reqId = `${activeAppTab}_${getDeviceId()}`;
        getDoc(doc(db, C("purchaseRequests"), reqId)).then(snap => {
            if (snap.exists()) {
                const s = snap.data().status;
                if (s === 'pending' || s === 'approved' || s === 'rejected') {
                    setCurrentRequestId(reqId);
                    setRequestStatus(s);
                }
            }
        }).catch(() => {});
    }, [checkoutMode, activeAppTab]);

    // Real-time listener: auto-unlock when admin approves in Firebase Console
    useEffect(() => {
        if (!currentRequestId || requestStatus !== 'pending') return;

        const unsubscribe = onSnapshot(doc(db, C("purchaseRequests"), currentRequestId), (snap) => {
            if (!snap.exists()) return;
            const data = snap.data();

            if (data.status === 'approved') {
                const duration = data.plan === 'month'
                    ? 30 * 24 * 60 * 60 * 1000
                    : 365 * 24 * 60 * 60 * 1000;
                const updatedPurchases = {
                    ...purchasedCourses,
                    [activeAppTab]: { unlocked: true, expiry: Date.now() + duration, keyUsed: 'firebase_purchase' }
                };
                setPurchasedCourses(updatedPurchases);
                if (user) {
                    setDoc(doc(db, C("users"), user.uid), { purchasedCourses: updatedPurchases }, { merge: true });
                }
                setRequestStatus('approved');
                triggerHaptic('success');
            } else if (data.status === 'rejected') {
                setRequestStatus('rejected');
                triggerHaptic('error');
            }
        });

        return () => unsubscribe();
    }, [currentRequestId, requestStatus]);

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
            localStorage.removeItem('affinityPro_purchases');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    // 🌟 ធ្វើសមកាលកម្មទិន្នន័យទិញ (Sync Purchases)
    const syncPurchasesToCloud = async (loggedInUser) => {
        const userRef = doc(db, C("users"), loggedInUser.uid);
        const userSnap = await getDoc(userRef);

        let finalPurchases = { ...purchasedCourses };

        if (userSnap.exists()) {
            const data = userSnap.data();
            if (data.purchasedCourses) {
                const now = Date.now();
                for (const course in data.purchasedCourses) {
                    if (data.purchasedCourses[course] && data.purchasedCourses[course].expiry > now) {
                        finalPurchases[course] = data.purchasedCourses[course];
                    }
                }
                setPurchasedCourses(finalPurchases);
            }
        } else {
            if (Object.values(purchasedCourses).some(c => c !== null)) {
                await setDoc(userRef, { purchasedCourses });
            }
        }

        // Upgrade maxDevices to 2 for key-based purchases now that Google is linked
        const keyPurchases = Object.values(finalPurchases)
            .filter(p => p && p.keyUsed && p.keyUsed !== 'firebase_purchase');
        for (const purchase of keyPurchases) {
            try {
                const actRef = doc(db, C("keyActivations"), purchase.keyUsed);
                const actSnap = await getDoc(actRef);
                if (actSnap.exists() && (actSnap.data().maxDevices || 1) < 2) {
                    await setDoc(actRef, { maxDevices: 2, userId: loggedInUser.uid }, { merge: true });
                }
            } catch (e) { /* non-critical */ }
        }
    };

    // Auto-format activation key: PH-Y-XXXXX / DS-Y-XXXXX / PB-Y-XXXXX
    const handlePasscodeChange = (e) => {
        const clean = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');

        if (clean.startsWith('PH') || clean.startsWith('DS') || clean.startsWith('PB')) {
            let f = clean;
            if (f.length > 2) f = f.substring(0, 2) + '-' + f.substring(2);
            if (f.length > 4) f = f.substring(0, 4) + '-' + f.substring(4);
            setPasscodeInput(f.substring(0, 10));
        } else {
            setPasscodeInput(clean);
        }
    };

    const handleSubmitPurchase = async () => {
        setRequestStatus('submitting');
        const reqId = `${activeAppTab}_${getDeviceId()}`;
        try {
            await setDoc(doc(db, C("purchaseRequests"), reqId), {
                deviceId: getDeviceId(),
                userId: user?.uid || null,
                userEmail: user?.email || null,
                app: activeAppTab,
                appName: appDisplayName,
                plan,
                status: 'pending',
                paymentNote: paymentNote.trim() || null,
                createdAt: Date.now(),
            });
            setCurrentRequestId(reqId);
            setRequestStatus('pending');
        } catch (err) {
            console.error('Failed to submit purchase request:', err);
            triggerHaptic('error');
            setRequestStatus('idle');
        }
    };

    // Map key prefix → course tab
    const detectTabFromKey = (code) => {
        if (code.startsWith('PH-')) return 'photo';
        if (code.startsWith('DS-')) return 'designer';
        if (code.startsWith('PB-')) return 'publisher';
        return activeAppTab; // fallback: treat as current tab
    };

    const getTabDisplayName = (tab) =>
        tab === 'photo' ? 'Pixel' : tab === 'designer' ? 'Vector' : 'Layout';

    const handleVerifyPasscode = async () => {
        if (!activeAppTab) return;
        const code = passcodeInput.trim().toUpperCase();
        const deviceId = getDeviceId();
        const maxDevices = user ? 2 : 1;
        setIsVerifying(true);
        setPasscodeError('');

        // ── Auto-detect which course this key is for from its prefix ─────────
        const detectedTab  = detectTabFromKey(code);
        const targetMatch  = `affinity_${detectedTab}`;
        const courseName   = getTabDisplayName(detectedTab);

        const applyUnlock = async (expiry) => {
            const updatedPurchases = {
                ...purchasedCourses,
                [detectedTab]: { unlocked: true, expiry, keyUsed: code, deviceId }
            };
            setPurchasedCourses(updatedPurchases);
            if (user) await setDoc(doc(db, C("users"), user.uid), { purchasedCourses: updatedPurchases }, { merge: true });
        };

        const finish = (msg) => {
            triggerHaptic('success');
            setSuccessMsg(msg);
            setTimeout(() => { setSuccessMsg(''); setCheckoutMode('select'); setShowRegistration(false); setPasscodeInput(''); }, 2500);
            setIsVerifying(false);
        };

        try {
            // ── PATH A: Brand-new key (still in activationCodes) ──
            const freshRef = doc(db, C("activationCodes"), code);
            const freshSnap = await getDoc(freshRef);

            if (freshSnap.exists() && freshSnap.data().used === false) {
                const keyData = freshSnap.data();
                const now = Date.now();

                if (keyData.targetApp !== targetMatch) {
                    triggerHaptic('error');
                    setPasscodeError(lang === 'en' ? 'Invalid key — course mismatch.' : 'លេខកូដមិនត្រឹមត្រូវ — វគ្គមិនផ្គូផ្គង។');
                    setIsVerifying(false); return;
                }
                if (keyData.expiresAt && now > keyData.expiresAt) {
                    await deleteDoc(freshRef);
                    triggerHaptic('error');
                    setPasscodeError(lang === 'en' ? 'Activation key expired.' : 'លេខកូដនេះបានផុតកំណត់ហើយ។');
                    setIsVerifying(false); return;
                }

                let duration = 365 * 24 * 60 * 60 * 1000;
                if (keyData.plan === 'month') duration = 30 * 24 * 60 * 60 * 1000;
                if (keyData.plan === 'trial') duration = 7 * 24 * 60 * 60 * 1000;

                const base = Math.max(purchasedCourses[detectedTab]?.expiry || 0, now);
                const newExpiry = base + duration;

                await deleteDoc(freshRef);

                // Create persistent activation record with device tracking
                await setDoc(doc(db, C("keyActivations"), code), {
                    app: targetMatch, plan: keyData.plan, expiry: newExpiry,
                    userId: user?.uid || null, maxDevices,
                    devices: [{ id: deviceId, addedAt: now }],
                    createdAt: now,
                });

                await applyUnlock(newExpiry);
                const hint = maxDevices === 1
                    ? (lang === 'en' ? ' Tip: Link Google to unlock on 2 devices.' : ' គន្លឹះ: ភ្ជាប់ Google ដើម្បីប្រើ ២ ឧបករណ៍។')
                    : '';
                finish((lang === 'en' ? `${courseName} Unlocked! 🎉` : `វគ្គ ${courseName} ត្រូវបានដោះសោ! 🎉`) + hint);
                return;
            }

            // ── PATH B: Key already consumed → device reset or add second device ──
            const actRef = doc(db, C("keyActivations"), code);
            const actSnap = await getDoc(actRef);

            if (actSnap.exists()) {
                const act = actSnap.data();
                const now = Date.now();

                if (act.app !== targetMatch) {
                    triggerHaptic('error');
                    setPasscodeError(lang === 'en' ? 'Invalid key — course mismatch.' : 'លេខកូដមិនត្រឹមត្រូវ — វគ្គមិនផ្គូផ្គង។');
                    setIsVerifying(false); return;
                }
                if (act.expiry && now > act.expiry) {
                    triggerHaptic('error');
                    setPasscodeError(lang === 'en' ? 'Activation key expired.' : 'លេខកូដនេះបានផុតកំណត់ហើយ។');
                    setIsVerifying(false); return;
                }

                const devices = act.devices || [];
                const effectiveMax = Math.max(act.maxDevices || 1, maxDevices);

                // Already active on this device → just re-sync
                if (devices.some(d => d.id === deviceId)) {
                    await applyUnlock(act.expiry);
                    finish(lang === 'en' ? `${courseName} already active on this device!` : `វគ្គ ${courseName} បានដោះសោរួចហើយ!`);
                    return;
                }

                let newDevices;
                let wasReset = false;

                if (devices.length < effectiveMax) {
                    newDevices = [...devices, { id: deviceId, addedAt: now }];
                } else {
                    // Evict oldest device, add this one
                    newDevices = [...devices.slice(1), { id: deviceId, addedAt: now }];
                    wasReset = true;
                }

                await setDoc(actRef, { ...act, maxDevices: effectiveMax, devices: newDevices, userId: user?.uid || act.userId }, { merge: true });
                await applyUnlock(act.expiry);

                const msg = wasReset
                    ? (lang === 'en' ? `${courseName} transferred! Previous device access revoked.` : `វគ្គ ${courseName} ផ្ទេរជោគជ័យ! ឧបករណ៍ចាស់ត្រូវបានលុបចោល។`)
                    : (lang === 'en' ? `${courseName} — Device ${newDevices.length} of ${effectiveMax} activated!` : `វគ្គ ${courseName} — ឧបករណ៍ទី ${newDevices.length} ត្រូវបានដោះសោ!`);
                finish(msg);
                return;
            }

            // Key exists in neither collection
            triggerHaptic('error');
            setPasscodeError(lang === 'en' ? 'Invalid or already used key.' : 'លេខកូដមិនត្រឹមត្រូវ ឬត្រូវបានប្រើរួច។');

        } catch(error) {
            console.error("Verification error", error);
            triggerHaptic('error');
            setPasscodeError("Connection error. Please try again.");
        }
        setIsVerifying(false);
    };

    const getKhmerCourseTitle = (id) => {
        if (id === 'photo') return 'វគ្គសិក្សា Pixel';
        if (id === 'designer') return 'វគ្គសិក្សា Vector';
        if (id === 'publisher') return 'វគ្គសិក្សា Layout';
        return 'ចុះឈ្មោះវគ្គបច្ចេកទេសជំនាញ';
    };

    const getInputPlaceholder = () => {
        if (lang !== 'en') return "PH / DS / PB — Y — XXXXX";
        return "PH / DS / PB — Y — XXXXX";
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
                                    <a href="https://t.me/koymy" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-[15px] transition-all active:scale-[0.98] shadow-lg hover:-translate-y-1 text-white" style={{ backgroundColor: '#2AABEE' }}>
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
                                            <span className={`text-[11px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-white/50' : 'text-black/40'}`}>
                                                {lang === 'en' ? 'THEN' : 'បន្ទាប់មក'}
                                            </span>
                                            <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                                        </div>

                                        {/* IDLE: Submit form */}
                                        {(requestStatus === 'idle') && (
                                            <div className="w-full flex flex-col gap-3">
                                                <p className={`text-[13px] font-khmer text-center leading-relaxed ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                                                    {lang === 'en' ? 'After paying, tap the button below. We\'ll review and unlock your course automatically.' : 'បន្ទាប់ពីបង់ប្រាក់ ចុចប៊ូតុងខាងក្រោម យើងនឹងពិនិត្យ ហើយដោះសោដោយស្វ័យប្រវត្តិ។'}
                                                </p>
                                                <textarea
                                                    value={paymentNote}
                                                    onChange={e => setPaymentNote(e.target.value.slice(0, 200))}
                                                    placeholder={lang === 'en' ? 'Optional: Enter your ABA transaction ID or name on receipt...' : 'ស្រេចចិត្ត: បញ្ចូល ID ប្រតិបត្តិការ ABA ឬឈ្មោះលើវិក័យប័ត្រ...'}
                                                    rows={2}
                                                    className={`w-full px-4 py-3 rounded-[16px] border text-[13px] font-khmer resize-none outline-none transition-colors ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C] text-white placeholder:text-[#555]' : 'bg-[#F8F9FA] border-[#E5E7EB] text-black placeholder:text-gray-400'}`}
                                                />
                                                <button
                                                    onClick={() => { triggerHaptic(); handleSubmitPurchase(); }}
                                                    className={`w-full py-4 rounded-[20px] flex items-center justify-center gap-2 font-bold font-khmer text-[15px] transition-all active:scale-[0.98] shadow-lg text-white bg-gradient-to-r ${theme.gradient}`}
                                                >
                                                    <CheckCircle2 className="w-5 h-5" />
                                                    {lang === 'en' ? 'I\'ve Paid — Submit for Review' : 'ខ្ញុំបានបង់ — ដាក់ស្នើសុំពិនិត្យ'}
                                                </button>
                                            </div>
                                        )}

                                        {/* SUBMITTING */}
                                        {requestStatus === 'submitting' && (
                                            <div className="flex flex-col items-center gap-3 py-4">
                                                <Loader2 className={`w-8 h-8 animate-spin ${theme.text}`} />
                                                <p className={`text-[13px] font-khmer font-bold ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                                                    {lang === 'en' ? 'Submitting...' : 'កំពុងដាក់ស្នើ...'}
                                                </p>
                                            </div>
                                        )}

                                        {/* PENDING: Waiting for admin */}
                                        {requestStatus === 'pending' && (
                                            <div className={`w-full rounded-[24px] p-5 border flex flex-col items-center gap-3 text-center ${isDarkMode ? 'bg-[#1A1A1A] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                                <div className="relative">
                                                    <Loader2 className={`w-10 h-10 animate-spin ${theme.text}`} />
                                                </div>
                                                <p className={`font-black font-khmer text-[16px] ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                                    {lang === 'en' ? 'Request Submitted!' : 'ដាក់ស្នើដោយជោគជ័យ!'}
                                                </p>
                                                <p className={`text-[12px] font-khmer leading-relaxed ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                                                    {lang === 'en' ? 'Waiting for admin review. Keep this screen open — your course will unlock automatically once approved.' : 'រង់ចាំការពិនិត្យ។ ទុកអេក្រង់នេះបើក — វគ្គរបស់អ្នកនឹងដោះសោដោយស្វ័យប្រវត្តិ។'}
                                                </p>
                                                <div className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest opacity-50 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                                    <Clock size={12} />
                                                    {lang === 'en' ? 'Usually within minutes' : 'ជាធម្មតាក្នុងរយៈពេលប៉ុន្មាននាទី'}
                                                </div>
                                            </div>
                                        )}

                                        {/* APPROVED */}
                                        {requestStatus === 'approved' && (
                                            <div className="w-full rounded-[24px] p-5 border border-green-500/30 bg-green-500/10 flex flex-col items-center gap-3 text-center">
                                                <CheckCircle2 className="w-12 h-12 text-green-500" />
                                                <p className="font-black font-khmer text-[16px] text-green-500">
                                                    {lang === 'en' ? 'Payment Approved!' : 'ការបង់ប្រាក់ត្រូវបានអនុម័ត!'}
                                                </p>
                                                <p className={`text-[12px] font-khmer ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                                                    {lang === 'en' ? 'Your course is now unlocked. Enjoy learning!' : 'វគ្គរបស់អ្នកត្រូវបានដោះសោ។ រីករាយជាមួយការសិក្សា!'}
                                                </p>
                                            </div>
                                        )}

                                        {/* REJECTED */}
                                        {requestStatus === 'rejected' && (
                                            <div className="w-full rounded-[24px] p-5 border border-red-500/30 bg-red-500/10 flex flex-col items-center gap-3 text-center">
                                                <AlertCircle className="w-10 h-10 text-red-500" />
                                                <p className="font-black font-khmer text-[15px] text-red-500">
                                                    {lang === 'en' ? 'Payment Not Verified' : 'ការបង់ប្រាក់មិនអាចផ្ទៀងផ្ទាត់បាន'}
                                                </p>
                                                <p className={`text-[12px] font-khmer leading-relaxed ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                                                    {lang === 'en' ? 'Please contact support on Telegram.' : 'សូមទាក់ទងផ្នែកជំនួយតាម Telegram។'}
                                                </p>
                                                <a
                                                    href="https://t.me/koymy"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-6 py-3 rounded-[16px] font-bold font-khmer text-[13px] text-white flex items-center gap-2 active:scale-95"
                                                    style={{ backgroundColor: '#2AABEE' }}
                                                >
                                                    <Send size={16} /> {lang === 'en' ? 'Contact Support' : 'ទំនាក់ទំនងផ្នែកជំនួយ'}
                                                </a>
                                                <button
                                                    onClick={() => { setRequestStatus('idle'); setCurrentRequestId(null); }}
                                                    className={`text-[11px] font-bold underline opacity-60 ${isDarkMode ? 'text-white' : 'text-black'}`}
                                                >
                                                    {lang === 'en' ? 'Try again' : 'ព្យាយាមម្ដងទៀត'}
                                                </button>
                                            </div>
                                        )}
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
                                                maxLength={30}
                                                autoComplete="off"
                                                spellCheck={false}
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