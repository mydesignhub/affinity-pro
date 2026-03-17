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
  ThumbsUp, User, Activity, Cloud, Copy, ClipboardPaste, SplitSquareHorizontal, Maximize, Minimize,
  Crown, QrCode, Lock, Key, Mail, Shield, Info, Check, ShieldCheck
} from 'lucide-react';

import { auth, db } from './firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut,
  GoogleAuthProvider,      
  signInWithPopup,
  sendEmailVerification
} from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';

import { TIPS_LIST, lessonsData, videoCourseData } from './data';
import ChatBot from './components/ChatBot';
import Header from './components/Header';
import LessonCard from './components/LessonCard';
import LessonItem from './components/LessonItem';
import PhotoLab from './components/PhotoLab';
import UpdateNotifier from './components/UpdateNotifier';
import Test from './components/Test'; 
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'; 

// ==========================================
// 1. CONFIGURATION & UTILS
// ==========================================

const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10); 
    }
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

// ==========================================
// 2. SUB-COMPONENTS
// ==========================================

const VideoModal = ({ video, onClose, isDarkMode, isPremium }) => {
    const [closing, setClosing] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const [isCssFullscreen, setIsCssFullscreen] = useState(false);
    const containerRef = useRef(null);
    const { lang } = useLanguage();

    useEffect(() => {
        setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'auto'; };
    }, []);

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

    const toggleFullScreen = async () => {
        const elem = containerRef.current; 
        if (!elem) return;
        triggerHaptic();
        
        try {
            const isStandardFs = document.fullscreenElement || document.webkitFullscreenElement;
            
            if (!isStandardFs && !isCssFullscreen) {
                if (elem.requestFullscreen) await elem.requestFullscreen();
                else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen(); 
                else setIsCssFullscreen(true);

                // Releases the device orientation lock so users can freely rotate vertical/landscape
                if (window.screen && window.screen.orientation && window.screen.orientation.unlock) {
                    try { window.screen.orientation.unlock(); } catch (e) {}
                }
            } else {
                if (isStandardFs) {
                    if (document.exitFullscreen) await document.exitFullscreen();
                    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                }
                setIsCssFullscreen(false);
            }
        } catch (err) {
            console.error("Fullscreen API error:", err);
            setIsCssFullscreen(!isCssFullscreen);
        }
    };

    const getVideoUrl = (url) => {
        if (!url) return '';
        const separator = url.includes('?') ? '&' : '?';
        return isPremium 
            ? `${url}${separator}autoplay=1&playsinline=1&fs=0&modestbranding=1&rel=0` 
            : `${url}${separator}end=20&controls=0&disablekb=1&rel=0&autoplay=1&playsinline=1&fs=0&modestbranding=1`;
    };

    const displayTitle = lang === 'en' && video.title_en ? video.title_en : video.title;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-0 sm:p-6" style={{ paddingTop: isIOS ? 'max(env(safe-area-inset-top), 10px)' : '0px' }}>
            <div className={`absolute inset-0 backdrop-blur-xl transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'} bg-black/90`} onClick={handleClose} />
            
            <style>{`
                .video-container:fullscreen { width: 100vw !important; height: 100dvh !important; max-width: none !important; max-height: none !important; border-radius: 0 !important; border: none !important; background: black; display: flex !important; align-items: center !important; justify-content: center !important; }
                .video-container:-webkit-full-screen { width: 100vw !important; height: 100dvh !important; max-width: none !important; max-height: none !important; border-radius: 0 !important; border: none !important; background: black; display: flex !important; align-items: center !important; justify-content: center !important; }
                .video-container:fullscreen iframe { width: 100% !important; height: 100% !important; }
                .video-container:-webkit-full-screen iframe { width: 100% !important; height: 100% !important; }
            `}</style>

            <div className={`relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-4xl sm:rounded-[32px] flex flex-col transition-transform duration-300 ${closing ? 'translate-y-full sm:translate-y-12 sm:opacity-0' : 'translate-y-0 sm:opacity-100'} ${isDarkMode ? 'bg-[#121212]' : 'bg-[#FAFAFA]'}`}>
                
                {!isCssFullscreen && (
                    <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#C65102]/20 rounded-full">
                                <PlayCircle className="w-5 h-5 text-[#C65102]" />
                            </div>
                            <h2 className={`font-bold font-khmer line-clamp-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>{displayTitle}</h2>
                        </div>
                        <button onClick={handleClose} className={`p-2 rounded-full transition-all active:scale-90 ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black'}`}>
                            <X size={20} />
                        </button>
                    </div>
                )}

                <div ref={containerRef} className={`video-container w-full relative overflow-hidden flex flex-col items-center justify-center bg-black transition-all duration-300 shrink-0
                    ${isCssFullscreen 
                        ? '!fixed !top-0 !left-0 !right-0 !bottom-0 !z-[999999] !w-full !h-[100dvh] !rounded-none !border-none !m-0 !p-0' 
                        : 'aspect-video'
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

                    {isVideoLoading && video.videoUrl && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                            <Loader2 size={36} className="animate-spin mb-3 text-[#C65102]" />
                            <span className="text-[11px] font-bold uppercase tracking-widest text-white/50">Loading Video...</span>
                        </div>
                    )}

                    {video.videoUrl ? (
                        <>
                            <iframe 
                                src={getVideoUrl(video.videoUrl)}
                                className={`w-full h-full absolute inset-0 transition-opacity duration-700 ease-in-out ${isVideoLoading ? 'opacity-0' : 'opacity-100 z-20'}`}
                                sandbox="allow-scripts allow-same-origin allow-presentation"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                title={displayTitle}
                                onLoad={() => setIsVideoLoading(false)}
                            />

                            {/* 🛡️ ULTRA SECURE RESPONSIVE SHIELDS 🛡️ */}
                            
                            {/* 1. Full Top Bar (Blocks Avatar, Title, Share, Watch Later, 3-dots everywhere) */}
                            <div 
                                className="absolute top-0 left-0 right-0 w-full h-[65px] sm:h-[75px] z-30 bg-[rgba(255,255,255,0.01)] cursor-default" 
                                style={{ WebkitTouchCallout: 'none' }} onContextMenu={e => e.preventDefault()} 
                            />

                            {/* 2. Bottom Right (Blocks YouTube Logo and Desktop watermark) */}
                            <div 
                                className="absolute bottom-0 right-0 w-[120px] h-[55px] z-30 bg-[rgba(255,255,255,0.01)] cursor-default" 
                                style={{ WebkitTouchCallout: 'none' }} onContextMenu={e => e.preventDefault()} 
                            />
                        </>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50">
                            <PlayCircle className="w-16 h-16 mb-4 opacity-50 text-[#C65102]" />
                            <p className="font-khmer text-sm">Video Player Coming Soon</p>
                        </div>
                    )}
                </div>
                
                {!isCssFullscreen && (
                    <div className="flex flex-col flex-1 min-h-0">
                        {video.videoUrl && (
                            <div className="px-5 sm:px-8 pt-4 w-full shrink-0">
                                <button 
                                    onClick={toggleFullScreen}
                                    className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold font-khmer text-[13px] sm:text-[14px] transition-all active:scale-[0.98] shadow-sm border ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-black/5 border-black/10 text-black hover:bg-black/10'}`}
                                >
                                    <Maximize size={18} className="text-[#C65102]" />
                                    {lang === 'en' ? 'Watch Fullscreen' : 'មើលពេញអេក្រង់'}
                                </button>
                            </div>
                        )}
                        <div className="p-5 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-[#C65102]/10 text-[#C65102] rounded-full text-xs font-bold uppercase tracking-wider">
                                    {video.duration} MIN
                                </span>
                                <button className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${isDarkMode ? 'border-[#C65102]/30 text-[#C65102] bg-[#C65102]/10 hover:bg-[#C65102]/20' : 'border-[#C65102]/20 text-[#C65102] bg-[#C65102]/10 hover:bg-[#C65102]/20'}`}>
                                    <Download className="w-3.5 h-3.5" /> {lang === 'en' ? 'Download RAW' : 'ទាញយករូប RAW'}
                                </button>
                            </div>
                            <p className={`text-[15px] leading-relaxed font-khmer ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#5F6368]'}`}>
                                {video.description}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const PremiumModal = ({ onClose, onPlayVideo, isDarkMode, isPremium, setIsPremium, currentUser }) => {
    const [closing, setClosing] = useState(false);
    const [view, setView] = useState('main'); 
    
    const [passcode, setPasscode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true); 
    const [showSignOutConfirm, setShowSignOutConfirm] = useState(false); 
    
    const [adminCodes, setAdminCodes] = useState([]);
    const [isLoadingCodes, setIsLoadingCodes] = useState(false);
    const [copiedAll, setCopiedAll] = useState(false);
    const [copiedCode, setCopiedCode] = useState(null);
    const [generateCount, setGenerateCount] = useState(5);

    const { lang } = useLanguage();
    const localDeviceId = getDeviceId();
    const SECRET_PASSCODE = "MYDESIGN2026"; 
    
    const isAdmin = currentUser?.email === 'koymy.mlk@gmail.com' || currentUser?.email === 'koymy.mlk@gmial.com';

    const telegramMsg = encodeURIComponent(lang === 'en' ? "Hello! I would like to purchase the Lightroom Premium Course ($20). Here is my payment slip:" : "សួស្តីបង! ខ្ញុំចង់ទិញវគ្គសិក្សា Lightroom Premium ($20)។ នេះជាវិក័យប័ត្របង់ប្រាក់របស់ខ្ញុំ៖");
    const telegramLink = `tg://msg?text=${telegramMsg}`;

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'auto'; };
    }, []);

    useEffect(() => {
        if (isAdmin && view === 'info') {
            const fetchUnusedCodes = async () => {
                setIsLoadingCodes(true);
                try {
                    const q = query(collection(db, "activationCodes"), where("used", "==", false));
                    const querySnapshot = await getDocs(q);
                    let codes = [];
                    const now = Date.now();
                    
                    querySnapshot.forEach((docItem) => {
                        const data = docItem.data();
                        if (data.expiresAt && now > data.expiresAt) {
                            deleteDoc(docItem.ref).catch(e => console.log("Silent cleanup error:", e));
                        } else {
                            codes.push(docItem.id);
                        }
                    });
                    setAdminCodes(codes);
                } catch (error) {
                    console.error("Error fetching unused codes:", error);
                } finally {
                    setIsLoadingCodes(false);
                }
            };
            
            fetchUnusedCodes();
        }
    }, [isAdmin, view]);

    const handleClose = () => {
        if (closing) return;
        setClosing(true);
        setTimeout(onClose, 400);
    };

    const processUserLogin = async (user) => {
        const isAdminUser = user.email === 'koymy.mlk@gmail.com' || user.email === 'koymy.mlk@gmial.com';
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        const localPremium = localStorage.getItem('myDesign_premium') === 'true';
        const localExpiry = localStorage.getItem('myDesign_premium_expiry');

        if (userSnap.exists()) {
            let data = userSnap.data();
            let devices = data.activeDevices || [];
            if (!devices.includes(localDeviceId)) {
                if (devices.length >= 2) { 
                    devices = [...devices.slice(1), localDeviceId]; 
                } else {
                    devices.push(localDeviceId);
                }
            }
            
            let updateData = { activeDevices: devices };
            
            if (isAdminUser) {
                updateData.isPremium = true;
                updateData.premiumExpiry = null;
            } else if (localPremium && !data.isPremium) {
                updateData.isPremium = true;
                updateData.premiumExpiry = localExpiry ? parseInt(localExpiry) : null;
            }
            
            await setDoc(userRef, updateData, { merge: true });
        } else {
            await setDoc(userRef, {
                email: user.email || user.phoneNumber || "Social User",
                isPremium: isAdminUser ? true : localPremium, 
                premiumExpiry: isAdminUser ? null : (localExpiry ? parseInt(localExpiry) : null),
                activeDevices: [localDeviceId],
                createdAt: new Date().toISOString()
            });
        }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        triggerHaptic();
        if (!email || !password) return;
        if (!isLoginMode && password.length < 6) {
            setError(lang === 'en' ? 'Password must be at least 6 characters.' : 'លេខសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៦ ខ្ទង់។');
            return;
        }
        setIsLoading(true);
        setError('');
        setSuccessMsg('');
        
        try {
            let userCredential;
            if (isLoginMode) {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
                if (!userCredential.user.emailVerified) {
                    await auth.signOut();
                    setError(lang === 'en' ? 'Please verify your email first. Check your inbox.' : 'សូមផ្ទៀងផ្ទាត់អុីមែលរបស់អ្នកជាមុនសិន។');
                    setIsLoading(false);
                    return;
                }
            } else {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await sendEmailVerification(userCredential.user);
                await auth.signOut(); 
                
                setSuccessMsg(lang === 'en' ? 'Success! Check your email to verify your account.' : 'ជោគជ័យ! សូមពិនិត្យមើលអុីមែលរបស់អ្នកដើម្បីផ្ទៀងផ្ទាត់គណនី។');
                setIsLoginMode(true); 
                setPassword(''); 
                setIsLoading(false);
                return; 
            }
            
            await processUserLogin(userCredential.user);
            setView('main'); 
        } catch (err) {
            console.error("Auth Error:", err);
            if (err.code === 'auth/email-already-in-use') setError(lang === 'en' ? 'Email already in use. Please log in.' : 'អុីមែលនេះមានរួចហើយ។ សូមចូលគណនី។');
            else if (err.code === 'auth/invalid-credential') setError(lang === 'en' ? 'Invalid email or password.' : 'អុីមែល ឬលេខសម្ងាត់មិនត្រឹមត្រូវទេ។');
            else setError(lang === 'en' ? 'Authentication failed.' : 'ប្រតិបត្តិការបរាជ័យ។');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        triggerHaptic();
        setError('');
        setIsLoading(true);
        const provider = new GoogleAuthProvider();
        
        provider.setCustomParameters({
            prompt: 'select_account'
        });

        try {
            const result = await signInWithPopup(auth, provider);
            await processUserLogin(result.user);
            setView('main');
        } catch (error) {
            console.error("Google Error:", error);
            setError(lang === 'en' ? 'Google Sign-In failed or was cancelled.' : 'ការចូលគណនី Google បរាជ័យ ឬត្រូវបានលុបចោល។');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUnlockPasscode = async () => {
        triggerHaptic();
        setError('');
        if (!passcode) return;
        setIsLoading(true);
        const cleanCode = passcode.toUpperCase().trim();

        if (cleanCode === SECRET_PASSCODE) {
            const expiryDate = Date.now() + (365 * 24 * 60 * 60 * 1000); 
            localStorage.setItem('myDesign_premium', 'true');
            localStorage.setItem('myDesign_premium_expiry', expiryDate.toString());
            setIsPremium(true);
            if (currentUser) {
                const userRef = doc(db, "users", currentUser.uid);
                await setDoc(userRef, { isPremium: true, premiumExpiry: expiryDate }, { merge: true });
            }
            setSuccessMsg(lang === 'en' ? 'Premium Updated Successfully!' : 'ទទួលបានសិទ្ធិ Premium ដោយជោគជ័យ!');
            setTimeout(() => { setSuccessMsg(''); setView('main'); }, 2000);
            setPasscode('');
            setIsLoading(false);
            return;
        }

        try {
            const codeRef = doc(db, "activationCodes", cleanCode);
            const codeSnap = await getDoc(codeRef);

            if (codeSnap.exists() && codeSnap.data().used === false) {
                const data = codeSnap.data();
                
                if (data.expiresAt && Date.now() > data.expiresAt) {
                    await deleteDoc(codeRef); 
                    setError(lang === 'en' ? 'This activation code has expired (7-Day limit).' : 'លេខកូដនេះបានផុតកំណត់ហើយ (៧ ថ្ងៃ)។');
                    setTimeout(() => setError(''), 4000);
                    setIsLoading(false);
                    return;
                }

                const currentExp = parseInt(localStorage.getItem('myDesign_premium_expiry')) || Date.now();
                const baseTime = currentExp > Date.now() ? currentExp : Date.now();
                const expiryDate = baseTime + (365 * 24 * 60 * 60 * 1000); 
                
                await setDoc(codeRef, { used: true, usedAt: new Date().toISOString(), usedBy: localDeviceId }, { merge: true });

                localStorage.setItem('myDesign_premium', 'true');
                localStorage.setItem('myDesign_premium_expiry', expiryDate.toString());
                setIsPremium(true);
                
                if (currentUser) {
                    const userRef = doc(db, "users", currentUser.uid);
                    await setDoc(userRef, { isPremium: true, premiumExpiry: expiryDate }, { merge: true });
                }
                
                setSuccessMsg(lang === 'en' ? 'Premium Updated Successfully!' : 'ទទួលបានសិទ្ធិ Premium ដោយជោគជ័យ!');
                setTimeout(() => { setSuccessMsg(''); setView('main'); }, 2000);
                setPasscode('');
            } else {
                setError(lang === 'en' ? 'Invalid or already used code.' : 'លេខកូដមិនត្រឹមត្រូវ ឬត្រូវបានប្រើប្រាស់រួច។');
                setTimeout(() => setError(''), 3000);
            }
        } catch (err) {
            console.error(err);
            setError(lang === 'en' ? 'Database Blocked! Please check Firestore rules.' : 'មានបញ្ហាក្នុងការត្រួតពិនិត្យ។ សូមសាកល្បងម្ដងទៀត។');
        } finally {
            setIsLoading(false);
        }
    };

    const generateAdminCodes = async (count) => {
        triggerHaptic();
        setIsLoading(true);
        setError('');
        try {
            let newCodes = [];
            const expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000); 

            for(let i = 0; i < count; i++) {
                const randomCode = "PRO-" + Math.random().toString(36).substring(2, 7).toUpperCase();
                await setDoc(doc(db, "activationCodes", randomCode), { 
                    used: false, 
                    createdAt: new Date().toISOString(),
                    expiresAt: expiresAt
                });
                newCodes.push(randomCode);
            }
            setAdminCodes(prev => [...newCodes, ...prev]);
            setPasscode('');
            setSuccessMsg(lang === 'en' ? `Generated ${count} codes (Valid 7 Days)!` : `បង្កើតកូដជោគជ័យ ${count} (សុពលភាព ៧ ថ្ងៃ)!`);
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            console.error("Database Save Error:", err);
            setError(lang === 'en' ? 'Database Blocked! Please update Firestore Rules.' : 'បរាជ័យ! សូមពិនិត្យមើល Firestore Rules។');
        } finally {
            setIsLoading(false);
        }
    };

    const getShareLink = (code) => {
        const msg = lang === 'en' 
            ? `🎉 Thank you for your purchase! Here is your 1-Year Premium Activation Key for the Lightroom Masterclass:\n\n🔑 ${code}\n\nEnter this code in the app to unlock all videos and RAW files.`
            : `🎉 អរគុណសម្រាប់ការគាំទ្រ! នេះគឺជាលេខកូដ Premium ១ ឆ្នាំរបស់អ្នកសម្រាប់វគ្គសិក្សា Lightroom Masterclass:\n\n🔑 ${code}\n\nសូមបញ្ចូលលេខកូដនេះក្នុងកម្មវិធីដើម្បីបើកសិទ្ធិចូលរៀននិងទាញយកឯកសារ RAW។`;
        return `tg://msg?text=${encodeURIComponent(msg)}`; 
    };

    const handleSignOut = async () => {
        triggerHaptic();
        try {
            if (currentUser) {
                const userRef = doc(db, "users", currentUser.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    let devices = userSnap.data().activeDevices || [];
                    devices = devices.filter(id => id !== localDeviceId);
                    await setDoc(userRef, { activeDevices: devices }, { merge: true });
                }
            }
        } catch (err) { console.error(err); }
        
        localStorage.removeItem('myDesign_premium');
        localStorage.removeItem('myDesign_premium_expiry');
        setIsPremium(false);
        
        await auth.signOut();
        setShowSignOutConfirm(false); 
        setView('main'); 
    };

    const handleCopyAllCodes = () => {
        triggerHaptic();
        navigator.clipboard.writeText(adminCodes.join('\n'));
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
    };

    const isIOSSafe = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    return (
        <div className={`fixed inset-0 z-[200] flex flex-col w-full h-full transition-transform duration-500 ease-spring ${closing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'} ${isDarkMode ? 'bg-[#000000]' : 'bg-[#F5F5F7]'}`}>
            
            <div 
                className={`flex items-center justify-between px-5 pb-4 border-b shrink-0 ${isDarkMode ? 'border-white/10 bg-[#000000]' : 'border-black/5 bg-[#F5F5F7]'}`}
                style={{ paddingTop: 'max(env(safe-area-inset-top), 20px)' }}
            >
                <div className="flex items-center gap-3">
                    {view !== 'main' ? (
                        <button onClick={() => { 
                            if(view === 'auth') setView('checkout');
                            else setView('main');
                            setError(''); setSuccessMsg(''); triggerHaptic(); 
                        }} className={`p-1.5 rounded-full transition-all active:scale-90 ${isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'}`}>
                            <ArrowLeft size={20} />
                        </button>
                    ) : (
                        <div className={`p-2 rounded-full ${isPremium ? 'bg-[#31A8FF]/20' : 'bg-[#C65102]/20'}`}>
                            {isPremium 
                                ? <Check className={`w-5 h-5 ${isDarkMode ? 'text-[#31A8FF]' : 'text-[#0088CC]'}`} />
                                : <Crown className="w-5 h-5 text-[#C65102]" />
                            }
                        </div>
                    )}
                    <h2 className={`font-bold font-khmer text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        {view === 'auth' ? (lang === 'en' ? 'Account Setup' : 'កំណត់គណនី') :
                         view === 'checkout' ? (lang === 'en' ? 'Checkout' : 'ទូទាត់ប្រាក់') :
                         view === 'info' ? (lang === 'en' ? 'Account Info' : 'ព័ត៌មានគណនី') :
                         isPremium ? (lang === 'en' ? 'Premium Account' : 'គណនី Premium') :
                         (lang === 'en' ? 'Unlock Premium' : 'ចុះឈ្មោះវគ្គ Premium')}
                    </h2>
                </div>
                <button onClick={handleClose} className={`p-2 rounded-full transition-all active:scale-90 ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-[#9AA0A6] hover:text-white' : 'bg-black/5 hover:bg-black/10 text-[#5F6368] hover:text-black'}`}>
                    <X size={24} />
                </button>
            </div>

            <div 
                className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8 max-w-3xl mx-auto w-full"
                style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 40px)' }}
            >
                
                {/* 🌟 VIEW 1: MAIN DASHBOARD & VIDEO LIST 🌟 */}
                {view === 'main' && (
                    <div className="animate-fade-in-up">
                        
                        {isPremium ? (
                            <div className={`mb-8 p-6 rounded-3xl border text-center relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-[#31A8FF]/10 to-transparent border-[#31A8FF]/20' : 'bg-gradient-to-br from-[#31A8FF]/5 to-white border-[#31A8FF]/20'}`}>
                                <div className="absolute top-0 left-0 w-40 h-40 bg-[#C65102]/10 rounded-full blur-[60px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 shadow-[0_0_30px_rgba(49,168,255,0.3)] ${isDarkMode ? 'bg-[#31A8FF]/20' : 'bg-[#31A8FF]/10'}`}>
                                    <Crown className={`w-8 h-8 ${isDarkMode ? 'text-[#31A8FF]' : 'text-[#0088CC]'}`} />
                                </div>
                                <h3 className={`text-xl font-bold font-khmer mb-2 relative z-10 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                    {lang === 'en' ? 'Premium Account' : 'គណនី Premium'}
                                </h3>
                                
                                <div className="mb-2 relative z-10">
                                    <button onClick={() => { setView('info'); triggerHaptic(); }} className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-colors flex items-center justify-center gap-2 mx-auto ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-white border-black/10 hover:bg-gray-50 text-black shadow-sm'}`}>
                                        <Info className={`w-4 h-4 ${isDarkMode ? 'text-[#31A8FF]' : 'text-[#0088CC]'}`} />
                                        {lang === 'en' ? 'Account Info' : 'ព័ត៌មានគណនី'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-8">
                                <button onClick={() => { setView('checkout'); triggerHaptic(); }} className="w-full relative overflow-hidden text-white p-5 rounded-3xl flex flex-col items-center justify-center gap-2 shadow-lg shadow-[#C65102]/30 active:scale-[0.98] transition-all bg-gradient-to-r from-[#C65102] to-[#E86A10]">
                                    <Crown className="w-8 h-8" />
                                    <span className="font-black font-khmer text-xl tracking-wide">
                                        {lang === 'en' ? 'Unlock Premium' : 'ចុះឈ្មោះវគ្គបច្ចេកទេសជំនាញ'}
                                    </span>
                                </button>
                            </div>
                        )}

                        <h3 className={`text-lg font-bold font-khmer mb-4 flex items-center gap-2 ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>
                            <Layers className="w-5 h-5 text-[#C65102]" />
                            {lang === 'en' ? 'Course Curriculum' : 'មាតិកាវគ្គសិក្សា'}
                        </h3>

                        <div className="space-y-3 pb-10">
                            {videoCourseData.map((video, idx) => (
                                <div key={video.id} 
                                     onClick={() => { if(isPremium) { onPlayVideo(video.id); } else { setView('checkout'); triggerHaptic(); } }}
                                     className={`p-4 rounded-2xl border flex items-start gap-4 transition-all ${isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-black/5 shadow-sm'} ${isPremium ? 'cursor-pointer hover:bg-white/5 hover:border-[#C65102]/30 active:scale-[0.98]' : 'cursor-pointer hover:border-[#C65102]/30'}`}>
                                    
                                    <div className={`w-20 h-14 rounded-lg flex items-center justify-center shrink-0 border ${isPremium ? 'bg-[#C65102]/10 border-[#C65102]/30' : (isDarkMode ? 'bg-black/50 border-white/5' : 'bg-gray-100 border-black/5')}`}>
                                        {isPremium 
                                            ? <PlayCircle className="w-7 h-7 text-[#C65102] ml-1 drop-shadow-[0_0_8px_rgba(198,81,2,0.5)]" /> 
                                            : <Lock className="w-6 h-6 opacity-40 text-gray-400" />
                                        }
                                    </div>
                                    
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-[#C65102] uppercase tracking-wider">{idx < 8 ? `Module ${idx + 1}` : 'Project'}</span>
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isDarkMode ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`}>{video.duration}</span>
                                            </div>
                                            
                                            <button onClick={(e) => { if(isPremium) e.stopPropagation(); }} className={`flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded border transition-colors ${isPremium ? 'border-[#C65102] bg-[#C65102] text-white shadow-[0_0_10px_rgba(198,81,2,0.4)] hover:bg-[#E86A10]' : (isDarkMode ? 'border-[#C65102]/30 text-[#C65102] bg-[#C65102]/10' : 'border-[#C65102]/20 text-[#C65102] bg-[#C65102]/5')}`}>
                                                <Download className="w-3 h-3" /> {lang === 'en' ? 'RAW File' : 'ឯកសារ RAW'}
                                            </button>
                                        </div>
                                        <h4 className={`text-sm font-bold font-khmer line-clamp-1 mb-1 ${isDarkMode ? 'text-[#E3E3E3]' : 'text-gray-900'}`}>{lang === 'en' ? video.title_en : video.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 🌟 VIEW 2: PROFESSIONAL ACCOUNT INFO DASHBOARD 🌟 */}
                {view === 'info' && isPremium && (
                    <div className="animate-fade-in-up">
                        <div className="text-center pb-6 pt-2 relative">
                            <div className="absolute top-0 left-1/2 w-64 h-64 bg-[#31A8FF]/10 rounded-full blur-[80px] -translate-x-1/2 pointer-events-none"></div>
                            
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 shadow-[0_0_30px_rgba(49,168,255,0.3)] ${isDarkMode ? 'bg-[#31A8FF]/20' : 'bg-[#31A8FF]/10'}`}>
                                <Crown className={`w-10 h-10 ${isDarkMode ? 'text-[#31A8FF]' : 'text-[#0088CC]'}`} />
                            </div>
                            <h3 className={`text-2xl font-bold font-khmer mb-1 relative z-10 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                {lang === 'en' ? 'Hello, Lightroom Master!' : 'សួស្តី Lightroom Master!'}
                            </h3>
                            <p className={`text-sm font-medium mb-6 px-4 relative z-10 ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>
                                {currentUser?.email || (lang === 'en' ? "Local Account (Unprotected)" : "មិនទាន់ភ្ជាប់គណនី")}
                            </p>

                            {!currentUser && (
                                <div className={`mb-6 p-4 rounded-xl border text-sm text-left font-khmer relative z-10 ${isDarkMode ? 'bg-[#C65102]/10 border-[#C65102]/30 text-[#E86A10]' : 'bg-[#C65102]/10 border-[#C65102]/20 text-[#C65102]'}`}>
                                    <p className="font-bold flex items-center gap-2 mb-2"><Info className="w-4 h-4"/> {lang === 'en' ? 'Protect Your Purchase' : 'ការពារការទិញរបស់អ្នក'}</p>
                                    <p className="mb-3 text-xs opacity-90">{lang === 'en' ? 'If you clear browser data, you will lose access. Create a free account to save it permanently.' : 'បង្កើតគណនីឥតគិតថ្លៃឥឡូវនេះ ដើម្បីរក្សាទុកវគ្គសិក្សាជារៀងរហូត។'}</p>
                                    <button onClick={() => setView('auth')} className="w-full py-2.5 rounded-lg bg-[#C65102] text-white font-bold active:scale-95 transition-all">
                                        {lang === 'en' ? 'Create Account' : 'ភ្ជាប់គណនីការពារ'}
                                    </button>
                                </div>
                            )}

                            <div className={`mb-6 p-5 rounded-2xl border text-left flex items-center justify-between relative z-10 ${isDarkMode ? 'bg-[#31A8FF]/10 border-[#31A8FF]/20' : 'bg-[#31A8FF]/5 border-[#31A8FF]/20'}`}>
                                <div>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 block ${isDarkMode ? 'text-[#31A8FF]' : 'text-[#0088CC]'}`}>
                                        {lang === 'en' ? 'Premium Plan' : 'គម្រោង Premium'}
                                    </span>
                                    <p className={`text-xs font-medium font-khmer ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {lang === 'en' ? 'Valid until:' : 'សុពលភាព៖'} {formatExpiry(localStorage.getItem('myDesign_premium_expiry'), lang)}
                                    </p>
                                </div>
                                <span className={`text-[10px] px-3 py-1 rounded-full font-bold ${isDarkMode ? 'bg-[#31A8FF]/20 text-[#31A8FF]' : 'bg-[#0088CC]/10 text-[#0088CC]'}`}>ACTIVE</span>
                            </div>

                            {/* 🌟 SECRET ADMIN PANEL INJECTION 🌟 */}
                            {isAdmin && (
                                <div className={`mb-6 p-5 rounded-2xl border text-left animate-fade-in-up shadow-xl relative z-10 ${isDarkMode ? 'bg-[#121212] border-[#C65102]/50' : 'bg-white border-[#C65102]/50 shadow-[#C65102]/10'}`}>
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold flex items-center gap-2 text-[#C65102]">
                                            <ShieldCheck className="w-5 h-5"/> Admin Control Panel
                                        </h4>
                                        {isLoadingCodes && <Loader2 className="w-4 h-4 text-[#C65102] animate-spin" />}
                                    </div>
                                    <p className={`text-xs mb-4 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Generate secure, single-use activation keys. Keys automatically expire 7 days after generation to protect database.
                                    </p>
                                    
                                    <div className="flex gap-3 mb-2">
                                        <input 
                                            type="number" 
                                            value={generateCount} 
                                            onChange={(e) => setGenerateCount(Number(e.target.value))} 
                                            className={`w-20 p-3 rounded-xl border text-center outline-none font-bold ${isDarkMode ? 'bg-[#1E1E1E] border-white/20 text-white' : 'bg-gray-50 border-black/20 text-black'}`}
                                            min="1" max="50"
                                        />
                                        <button onClick={() => generateAdminCodes(generateCount)} disabled={isLoading} className={`flex-1 rounded-xl bg-[#C65102] text-white font-bold active:scale-[0.98] shadow-md flex items-center justify-center transition-opacity ${isLoading ? 'opacity-50' : ''}`}>
                                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate Keys'}
                                        </button>
                                    </div>

                                    {error && <p className="text-red-500 text-xs font-bold mt-2 mb-4 animate-pulse">{error}</p>}
                                    {successMsg && <p className="text-[#C65102] text-xs font-bold mt-2 mb-4 animate-pulse">{successMsg}</p>}
                                    
                                    {adminCodes.length > 0 ? (
                                        <div className="mt-4 space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-1">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-bold text-[#C65102]">{adminCodes.length} Unused Codes Ready</span>
                                                <button onClick={handleCopyAllCodes} className="text-xs bg-[#C65102]/10 text-[#C65102] px-2 py-1 rounded flex items-center gap-1">
                                                    {copiedAll ? <CheckCircle size={12}/> : <Copy size={12}/>} {copiedAll ? 'Copied' : 'Copy All'}
                                                </button>
                                            </div>
                                            {adminCodes.map(c => (
                                                <div key={c} className={`p-3 rounded-xl border flex items-center justify-between ${isDarkMode ? 'bg-[#1E1E1E] border-white/10' : 'bg-gray-50 border-black/10'}`}>
                                                    <span className={`font-mono font-bold tracking-widest text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>{c}</span>
                                                    <div className="flex gap-2">
                                                        <button 
                                                            onClick={() => { 
                                                                navigator.clipboard.writeText(c); 
                                                                setCopiedCode(c); 
                                                                triggerHaptic();
                                                                setTimeout(() => setCopiedCode(null), 2000); 
                                                            }} 
                                                            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'}`}
                                                        >
                                                            {copiedCode === c ? <CheckCircle size={18} className="text-green-500"/> : <Copy size={18} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />}
                                                        </button>
                                                        <a 
                                                            href={getShareLink(c)} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer" 
                                                            className="p-2 rounded-lg bg-[#0088CC]/10 hover:bg-[#0088CC]/20 transition-colors text-[#0088CC]"
                                                        >
                                                            <Send size={18} />
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className={`mt-4 p-4 rounded-xl border border-dashed text-center ${isDarkMode ? 'border-white/20 bg-white/5' : 'border-black/20 bg-black/5'}`}>
                                            <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No unused codes found.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <button 
                                onClick={() => { triggerHaptic(); setShowSignOutConfirm(true); }} 
                                className={`w-full p-4 rounded-xl border font-bold font-khmer active:scale-[0.98] transition-colors flex items-center justify-center gap-2 relative z-10 ${isDarkMode ? 'bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20' : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'}`}
                            >
                                <WifiOff className="w-5 h-5" /> {lang === 'en' ? 'Sign Out Device' : 'ចាកចេញពីឧបករណ៍នេះ'}
                            </button>
                        </div>
                    </div>
                )}

                {/* 🌟 VIEW 3: CHECKOUT/SALES SCREEN (Slim & Premium Redesign) 🌟 */}
                {view === 'checkout' && (
                    <div className="animate-fade-in-up flex flex-col items-center">
                        
                        {/* Premium Header */}
                        <div className="text-center mb-8">
                            <div className={`inline-flex items-center justify-center p-3 rounded-2xl mb-4 ${isDarkMode ? 'bg-[#C65102]/20' : 'bg-[#C65102]/10'}`}>
                                <Crown className="w-8 h-8 text-[#C65102]" />
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

                        {/* Unified Payment Action Card */}
                        <div className={`w-full max-w-md rounded-3xl p-6 mb-8 border backdrop-blur-md shadow-xl ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-black/5'}`}>
                            <div className="flex flex-col items-center gap-6">
                                
                                {/* KHQR Block */}
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-40 h-40 bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex items-center justify-center">
                                        <img src="/aba-khqr.png" alt="ABA KHQR" className="w-full h-full object-contain rounded-xl" />
                                    </div>
                                    <span className={`text-xs font-bold tracking-widest uppercase ${isDarkMode ? 'text-[#C65102]' : 'text-[#C65102]'}`}>SCAN TO PAY</span>
                                </div>

                                {/* Divider */}
                                <div className="w-full flex items-center gap-4 opacity-50">
                                    <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                                    <span className={`text-[10px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-white/50' : 'text-black/40'}`}>THEN</span>
                                    <div className={`h-px flex-1 ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}></div>
                                </div>

                                {/* Telegram CTA */}
                                <div className="w-full text-center">
                                    <p className={`text-[13px] font-khmer mb-4 ${isDarkMode ? 'text-[#E3E3E3]' : 'text-gray-600'}`}>
                                        {lang === 'en' ? 'Send your receipt via Telegram to get your activation key.' : 'ផ្ញើវិក័យប័ត្រតាម Telegram ដើម្បីទទួលបានលេខកូដ។'}
                                    </p>
                                    <a href={telegramLink} target="_blank" rel="noopener noreferrer" className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold font-khmer transition-all active:scale-[0.98] ${isDarkMode ? 'bg-[#31A8FF]/20 text-[#31A8FF] hover:bg-[#31A8FF]/30' : 'bg-[#0088CC] text-white hover:bg-[#0077B3] shadow-md shadow-[#0088CC]/20'}`}>
                                        <Send className="w-5 h-5" />
                                        {lang === 'en' ? 'Send Receipt' : 'ផ្ញើវិក័យប័ត្រទីនេះ'}
                                    </a>
                                </div>

                            </div>
                        </div>

                        {/* Slim Inline Activation Key Input */}
                        <div className="w-full max-w-md mb-8">
                            <label className={`block text-[11px] font-bold uppercase tracking-widest mb-2 pl-1 ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>
                                {lang === 'en' ? 'Activation Key' : 'លេខកូដសម្ងាត់'}
                            </label>
                            <div className={`relative flex items-center p-1.5 rounded-2xl border transition-colors ${isDarkMode ? 'bg-[#121212] border-white/10 focus-within:border-[#C65102]' : 'bg-white border-black/10 shadow-sm focus-within:border-[#C65102]'}`}>
                                <Key className={`absolute left-4 w-5 h-5 ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-400'}`} />
                                <input 
                                    type="text"
                                    value={passcode}
                                    onChange={(e) => setPasscode(e.target.value.toUpperCase())}
                                    placeholder="PRO-XXXXX"
                                    className={`flex-1 bg-transparent py-3 pl-12 pr-2 outline-none font-bold tracking-widest uppercase text-sm w-full ${isDarkMode ? 'text-white' : 'text-black'}`}
                                />
                                <button onClick={handleUnlockPasscode} disabled={isLoading || !passcode} className={`px-6 py-3 rounded-xl bg-[#C65102] text-white font-bold font-khmer text-sm active:scale-[0.95] transition-all flex items-center justify-center shrink-0 ${(isLoading || !passcode) ? 'opacity-50' : 'shadow-md shadow-[#C65102]/20'}`}>
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (lang === 'en' ? 'Unlock' : 'បញ្ជាក់')}
                                </button>
                            </div>
                            {error && <p className="text-red-500 text-[11px] font-bold mt-2 text-center animate-pulse">{error}</p>}
                        </div>

                        {/* Subtle Restore Purchase Link */}
                        <button onClick={() => { setView('auth'); triggerHaptic(); }} className={`text-[13px] font-bold font-khmer flex items-center gap-1.5 transition-colors pb-4 hover:underline ${isDarkMode ? 'text-[#9AA0A6] hover:text-white' : 'text-gray-500 hover:text-black'}`}>
                            <RotateCcw className="w-4 h-4" />
                            {lang === 'en' ? 'Restore Purchase' : 'ទាញយកវគ្គសិក្សាវិញ'}
                        </button>

                    </div>
                )}

                {/* 🌟 VIEW 5: AUTH SETUP 🌟 */}
                {view === 'auth' && (
                    <div className="animate-fade-in-up max-w-sm mx-auto py-2">
                        <div className="text-center mb-8">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'bg-[#31A8FF]/20' : 'bg-[#31A8FF]/10'}`}>
                                <Shield className={`w-8 h-8 ${isDarkMode ? 'text-[#31A8FF]' : 'text-[#0088CC]'}`} />
                            </div>
                            <h3 className={`text-2xl font-bold font-khmer mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                {isLoginMode ? (lang === 'en' ? 'Welcome Back' : 'សូមស្វាគមន៍ត្រលប់មកវិញ') : (lang === 'en' ? 'Secure Your Purchase' : 'ការពារការទិញរបស់អ្នក')}
                            </h3>
                            <p className={`text-sm font-khmer ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>
                                {isLoginMode ? (lang === 'en' ? 'Log in to sync your active devices.' : 'ចូលគណនីដើម្បីគ្រប់គ្រងឧបករណ៍របស់អ្នក។') : (lang === 'en' ? 'Create a free account to permanently save your key.' : 'បង្កើតគណនីដើម្បីរក្សាទុកសិទ្ធិ Premium ជារៀងរហូត។')}
                            </p>
                        </div>

                        {successMsg && (
                            <div className={`p-4 rounded-xl mb-6 text-sm font-khmer text-center font-bold border animate-fade-in-up ${isDarkMode ? 'bg-[#C65102]/10 border-[#C65102]/30 text-[#C65102]' : 'bg-[#C65102]/10 border-[#C65102]/20 text-[#C65102]'}`}>
                                {successMsg}
                            </div>
                        )}

                        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder={lang === 'en' ? 'Email Address' : 'អុីមែល (Email)'}
                                className={`w-full p-4 rounded-2xl border font-medium outline-none transition-all ${isDarkMode ? 'bg-[#121212] border-white/10 text-white focus:border-[#C65102]' : 'bg-gray-50 border-black/10 text-black focus:border-[#C65102]'}`}
                            />
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder={lang === 'en' ? 'Password (Min. 6 chars)' : 'លេខសម្ងាត់ (យ៉ាងហោច ៦ ខ្ទង់)'}
                                className={`w-full p-4 rounded-2xl border font-medium outline-none transition-all ${isDarkMode ? 'bg-[#121212] border-white/10 text-white focus:border-[#C65102]' : 'bg-gray-50 border-black/10 text-black focus:border-[#C65102]'}`}
                            />
                            {error && <p className="text-red-500 text-xs font-bold text-center animate-pulse">{error}</p>}
                            
                            <button type="submit" disabled={isLoading || !email || !password} className={`w-full p-4 mt-2 rounded-2xl bg-[#C65102] text-white font-bold font-khmer active:scale-[0.98] shadow-lg shadow-[#C65102]/20 flex justify-center items-center ${(isLoading || !email || !password) ? 'opacity-50' : ''}`}>
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLoginMode ? (lang === 'en' ? 'Sign In' : 'ចូលគណនី') : (lang === 'en' ? 'Create Secure Account' : 'បង្កើតគណនីការពារ'))}
                            </button>
                        </form>

                        <div className="relative flex items-center justify-center mb-6">
                            <div className={`absolute w-full border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}></div>
                            <span className={`relative px-4 text-xs font-bold tracking-widest ${isDarkMode ? 'bg-[#121212] text-[#9AA0A6]' : 'bg-white text-gray-400'}`}>OR FAST LOGIN</span>
                        </div>

                        <div className="mb-8">
                            <button onClick={handleGoogleAuth} disabled={isLoading} className={`w-full p-3.5 rounded-2xl border flex items-center justify-center gap-3 font-bold active:scale-[0.98] transition-all ${isLoading ? 'opacity-50' : ''} ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-white border-gray-200 hover:bg-gray-50 text-black shadow-sm'}`}>
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                    <>
                                        <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                                        Google
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="text-center">
                            <button type="button" onClick={() => { setIsLoginMode(!isLoginMode); setError(''); setSuccessMsg(''); triggerHaptic(); }} className={`text-sm font-bold font-khmer transition-colors hover:underline ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#C65102]'}`}>
                                {isLoginMode ? (lang === 'en' ? "Don't have an account? Sign Up" : "មិនទាន់មានគណនី? បង្កើតគណនី") : (lang === 'en' ? "Already have an account? Log In" : "មានគណនីរួចហើយ? ចូលគណនី")}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 🌟 CONFIRMATION MODAL FOR SIGN OUT 🌟 */}
            {showSignOutConfirm && (
                <div className="fixed inset-0 z-[400] flex items-center justify-center p-5 backdrop-blur-sm bg-black/40 animate-fade-in-up">
                    <div className={`w-full max-w-[320px] p-6 rounded-[24px] shadow-2xl border ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E0E0E0]'}`}>
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                                <WifiOff size={24} className="text-red-500" />
                            </div>
                            <p className={`text-[15px] font-bold font-khmer mb-2 leading-relaxed ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>
                                {lang === 'en' ? 'Sign Out Device?' : 'តើអ្នកពិតជាចង់ចាកចេញមែនទេ?'}
                            </p>
                            <p className={`text-xs font-khmer mb-6 leading-relaxed ${isDarkMode ? 'text-[#9AA0A6]' : 'text-gray-500'}`}>
                                {lang === 'en' ? 'You will need to sign in again to access premium features.' : 'អ្នកនឹងត្រូវចូលគណនីម្ដងទៀតដើម្បីប្រើប្រាស់សិទ្ធិ Premium។'}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <button 
                                onClick={() => { setShowSignOutConfirm(false); handleSignOut(); }}
                                className="w-full py-3 rounded-xl bg-red-500 text-white font-khmer font-bold text-[14px] active:scale-[0.98] transition-all shadow-md"
                            >
                                {lang === 'en' ? 'Yes, Sign Out' : 'បាទ/ចាស ចាកចេញ'}
                            </button>
                            <button 
                                onClick={() => setShowSignOutConfirm(false)}
                                className={`w-full py-3 rounded-xl font-khmer font-bold text-[14px] active:scale-[0.98] transition-all ${isDarkMode ? 'bg-[#2C2C2C] text-[#9AA0A6] hover:bg-[#3A3A3C]' : 'bg-[#F2F2F7] text-[#5F6368] hover:bg-[#E5E5EA]'}`}
                            >
                                {lang === 'en' ? 'Cancel' : 'បោះបង់'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const LessonModal = ({ lesson, onClose, isDarkMode }) => {
  const [closing, setClosing] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [expandedItem, setExpandedItem] = useState(null);
  const modalRef = useRef(null);
  const dragStartY = useRef(null);

  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => { 
      setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
      document.body.style.overflow = 'hidden'; 
      return () => { document.body.style.overflow = 'auto'; }; 
  }, []);

  const handleClose = () => { 
      if (closing) return; 
      setClosing(true); 
      setTimeout(onClose, 300); 
  };

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

  const onTouchStart = (e) => {
    const scrollTop = modalRef.current?.querySelector('.scroll-content')?.scrollTop || 0;
    if (scrollTop <= 0) { dragStartY.current = e.touches[0].clientY; }
  };
  const onTouchMove = (e) => {
    if (dragStartY.current === null) return;
    const deltaY = e.touches[0].clientY - dragStartY.current;
    if (deltaY > 0) { setDragOffset(deltaY); if (e.cancelable && deltaY > 10) e.preventDefault(); }
  };
  const onTouchEnd = () => { if (dragOffset > 150) { handleClose(); } else { setDragOffset(0); } dragStartY.current = null; };
  const opacity = 1 - (dragOffset / 500); 

  const { lang } = useLanguage();
  const displayTitle = lang === 'en' && lesson.title_en ? lesson.title_en : lesson.title;

  return (
      <div 
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          style={{ paddingTop: isIOS ? 'max(env(safe-area-inset-top), 10px)' : '45px' }} 
      >
          <div className={`absolute inset-0 backdrop-blur-md transition-opacity duration-500 ease-out ${closing ? 'opacity-0' : 'opacity-100'} ${isDarkMode ? 'bg-[#121212]/80' : 'bg-[#1A1C1E]/30'}`} style={{ opacity: Math.max(0, opacity) }} onClick={handleClose} />
          
          <div 
              ref={modalRef} 
              className={`relative w-full max-w-3xl rounded-t-[32px] sm:rounded-3xl shadow-2xl flex flex-col h-full sm:h-auto sm:max-h-[90vh] transition-transform duration-500 ease-spring ring-1 ${isDarkMode ? 'bg-[#1E1E1E]/90 ring-white/10 backdrop-blur-xl' : 'bg-[#FFFFFF]/90 ring-black/5 backdrop-blur-xl'} ${closing ? 'translate-y-full' : 'translate-y-0'}`} 
              style={{ transform: `translateY(${closing ? '100%' : `${dragOffset}px`})`, transition: dragOffset > 0 ? 'none' : 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)' }} 
              onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
          >
             <div className="w-full flex justify-center pt-3 pb-2 shrink-0 cursor-grab active:cursor-grabbing sm:hidden" onClick={handleClose}>
                 <div className={`w-12 h-1.5 rounded-full opacity-50 ${isDarkMode ? 'bg-[#9AA0A6]' : 'bg-[#5F6368]'}`}></div>
             </div>
             <div className={`border-b px-5 py-3.5 flex items-center justify-between sticky top-0 z-10 shrink-0 rounded-t-[32px] ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <div className="flex items-center gap-3.5">
                    <div className="p-2.5 bg-[#C65102]/10 rounded-xl text-[#C65102] border border-[#C65102]/20 shadow-[0_0_15px_rgba(198,81,2,0.15)] [&>svg]:w-5 [&>svg]:h-5">{lesson.icon}</div>
                    <h2 className={`text-xl font-bold font-khmer tracking-tight ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>{displayTitle}</h2>
                </div>
                <button onClick={handleClose} className={`p-2 rounded-full transition-all active:scale-90 ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-[#9AA0A6] hover:text-white' : 'bg-black/5 hover:bg-black/10 text-[#5F6368] hover:text-black'}`}>
                    <XCircle className="w-6 h-6 opacity-80" />
                </button>
             </div>
             <div className="scroll-content flex-1 overflow-y-auto p-6 space-y-4 overscroll-contain">
                {lesson.content.map((item, idx) => (
                    <LessonItem 
                        key={idx} 
                        id={`lesson-item-${idx}`}
                        item={item} 
                        isExpanded={expandedItem === idx} 
                        onToggle={() => { setExpandedItem(expandedItem === idx ? null : idx); triggerHaptic(); }} 
                        isDarkMode={isDarkMode} 
                    />
                ))}
             </div>
          </div>
      </div>
  )
};

const TipsSection = ({ isExpanded, onToggle, isDarkMode }) => {
  const [tipIndex, setTipIndex] = useState(0);
  const { t, lang } = useLanguage();

  useEffect(() => {
    setTipIndex(Math.floor(Math.random() * TIPS_LIST.length));
  }, []);

  useEffect(() => {
    if (!isExpanded) return;
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS_LIST.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [isExpanded]);

  const nextTip = (e) => {
    e.stopPropagation();
    setTipIndex((prev) => (prev + 1) % TIPS_LIST.length);
  };

  return (
    <div className="mt-12">
      <button onClick={onToggle} className={`w-full flex items-center justify-between p-6 rounded-3xl border transition-all duration-300 group active:scale-95 shadow-sm ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-black/5 border-black/5 hover:bg-black/10'}`}>
        <div className="flex items-center space-x-5">
            <div className="bg-[#C65102]/10 p-3 rounded-2xl group-hover:bg-[#C65102]/20 transition-colors ring-1 ring-[#C65102]/20 shadow-[0_0_15px_rgba(198,81,2,0.15)]"><PlayCircle className="w-6 h-6 text-[#C65102]" /></div>
            <h3 className={`font-bold text-xl font-khmer tracking-tight ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>{t('tips_title')}</h3>
        </div>
        <ChevronRight className={`w-6 h-6 transition-transform ease-spring duration-500 ${isExpanded ? 'rotate-90' : ''} ${isDarkMode ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`} />
      </button>
      {isExpanded && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
          <div className={`bg-gradient-to-br border rounded-3xl p-8 md:col-span-2 relative overflow-hidden shadow-xl flex flex-col justify-center min-h-[180px] backdrop-blur-md ${isDarkMode ? 'from-white/5 to-transparent border-white/10' : 'from-white to-white/50 border-black/5'}`}>
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#C65102]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
             <div className="flex justify-between items-center mb-6 relative z-10">
                 <h4 className={`font-bold font-khmer flex items-center gap-3 text-lg whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    <Sparkles className="w-5 h-5 text-[#C65102]" /> {t('tips_pro')}
                 </h4>
                 <button onClick={nextTip} className={`text-[10px] px-4 py-2 rounded-full font-khmer transition-all duration-300 font-bold tracking-wide border active:scale-95 whitespace-nowrap shadow-sm ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white border-white/10' : 'bg-black/5 hover:bg-black/10 text-black border-black/5'}`}>{t('tips_new')}</button>
             </div>
             <div className="relative z-10 flex-1 flex items-center">
                 <p key={tipIndex} className={`text-base font-khmer leading-relaxed border-l-4 border-[#C65102] pl-6 py-2 animate-fade-in-up ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>{lang === 'en' && window.TIPS_LIST_EN ? window.TIPS_LIST_EN[tipIndex] : TIPS_LIST[tipIndex]}</p>
             </div>
          </div>
          <div className={`border rounded-3xl p-8 md:col-span-2 shadow-lg backdrop-blur-md ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/80 border-black/5'}`}>
            <h4 className={`font-bold font-khmer mb-6 flex items-center text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}><Zap className="w-5 h-5 mr-3 text-[#C65102]" /> {t('tips_shortcut')}</h4>
            <ul className={`space-y-4 text-sm font-khmer ${isDarkMode ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>
              <li className={`flex items-start gap-4 p-4 rounded-2xl border transition-colors ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-black/5 hover:bg-black/5'}`}>
                <span className="font-bold text-[#C65102] bg-[#C65102]/10 w-8 h-8 flex items-center justify-center rounded-full text-sm shrink-0 shadow-[0_0_10px_rgba(198,81,2,0.1)]">1</span>
                <span><span className={`font-bold block mb-1 ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>{t('tip_1_title')}</span> {t('tip_1_desc')}</span>
              </li>
              <li className={`flex items-start gap-4 p-4 rounded-2xl border transition-colors ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-black/5 hover:bg-black/5'}`}>
                <span className="font-bold text-[#C65102] bg-[#C65102]/10 w-8 h-8 flex items-center justify-center rounded-full text-sm shrink-0 shadow-[0_0_10px_rgba(198,81,2,0.1)]">2</span>
                <span><span className={`font-bold block mb-1 ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>{t('tip_2_title')}</span> {t('tip_2_desc')}</span>
              </li>
              <li className={`flex items-start gap-4 p-4 rounded-2xl border transition-colors ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-black/5 hover:bg-black/5'}`}>
                <span className="font-bold text-[#C65102] bg-[#C65102]/10 w-8 h-8 flex items-center justify-center rounded-full text-sm shrink-0 shadow-[0_0_10px_rgba(198,81,2,0.1)]">3</span>
                <span><span className={`font-bold block mb-1 ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>{t('tip_3_title')}</span> {t('tip_3_desc')}</span>
              </li>
              <li className={`flex items-start gap-4 p-4 rounded-2xl border transition-colors ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-black/5 hover:bg-black/5'}`}>
                <span className="font-bold text-[#C65102] bg-[#C65102]/10 w-8 h-8 flex items-center justify-center rounded-full text-sm shrink-0 shadow-[0_0_10px_rgba(198,81,2,0.1)]">4</span>
                <span><span className={`font-bold block mb-1 ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>{t('tip_4_title')}</span> {t('tip_4_desc')}</span>
              </li>
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
  <div className={`mt-16 mb-10 border-t pt-10 text-center ${isDarkMode ? 'border-white/10' : 'border-black/5'}`}>
      <div className="flex justify-center gap-10">
          <a href="https://web.facebook.com/mydesignpro" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 hover:opacity-80 transition-all duration-300 hover:-translate-y-1">
              <div className={`p-3 rounded-xl border shadow-lg backdrop-blur-md ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'}`}><Facebook className="text-[#C65102] w-5 h-5" /></div>
              <span className={`text-[10px] font-khmer ${isDarkMode ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>Facebook</span>
          </a>
          <a href="https://t.me/koymy" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 hover:opacity-80 transition-all duration-300 hover:-translate-y-1">
              <div className={`p-3 rounded-xl border shadow-lg backdrop-blur-md ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'}`}><Send className="text-[#E86A10] w-5 h-5" /></div>
              <span className={`text-[10px] font-khmer ${isDarkMode ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>Telegram</span>
          </a>
          <a href="https://myaffinity.gumroad.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 hover:opacity-80 transition-all duration-300 hover:-translate-y-1">
                <div className={`p-3 rounded-xl border shadow-lg backdrop-blur-md ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'}`}><Globe className="text-[#E86A10] w-5 h-5" /></div>
              <span className={`text-[10px] font-khmer ${isDarkMode ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>Website</span>
          </a>
      </div>
      <p className={`text-center text-[10px] mt-8 font-khmer uppercase opacity-50 tracking-widest ${isDarkMode ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>{t('footer_copy')}</p>
  </div>
  );
};

// ==========================================
// 3. MAIN APP CONTENT
// ==========================================

const AppContent = () => {
  const [activeTab, setActiveTab] = useState(() => {
      if (typeof window !== 'undefined') {
          return sessionStorage.getItem('myDesign_activeTab') || 'learn';
      }
      return 'learn';
  });
  
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null); 
  const [isPremiumOpen, setIsPremiumOpen] = useState(false); 
  const [expandedSection, setExpandedSection] = useState(null);

  const [isPremium, setIsPremium] = useState(() => {
      if (typeof window !== 'undefined') {
          return localStorage.getItem('myDesign_premium') === 'true';
      }
      return false;
  });

  const [currentUser, setCurrentUser] = useState(null);
  const localDeviceId = getDeviceId(); 
  const { lang, t } = useLanguage();

  useEffect(() => {
      let unsubscribeDoc = null;
      
      const checkExpiryValid = (expiryNum) => expiryNum ? Date.now() < expiryNum : true;
      const cachedPremium = localStorage.getItem('myDesign_premium') === 'true';
      const cachedExpiry = localStorage.getItem('myDesign_premium_expiry');

      const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
          setCurrentUser(user);
          if (user) {
              const isAdminUser = user.email === 'koymy.mlk@gmail.com' || user.email === 'koymy.mlk@gmial.com';
              const userRef = doc(db, "users", user.uid);
              
              try {
                  const docSnap = await getDoc(userRef);
                  if (!docSnap.exists()) {
                      await setDoc(userRef, {
                          email: user.email || "Social User",
                          isPremium: isAdminUser ? true : cachedPremium,
                          premiumExpiry: isAdminUser ? null : (cachedExpiry ? parseInt(cachedExpiry) : null),
                          activeDevices: [localDeviceId],
                          createdAt: new Date().toISOString()
                      });
                  } else {
                      const data = docSnap.data();
                      let updates = {};
                      let devices = data.activeDevices || [];
                      
                      if (!devices.includes(localDeviceId)) {
                          if (devices.length >= 2) devices = [...devices.slice(1), localDeviceId];
                          else devices.push(localDeviceId);
                          updates.activeDevices = devices;
                      }
                      
                      if (isAdminUser && (!data.isPremium || data.premiumExpiry !== null)) {
                          updates.isPremium = true;
                          updates.premiumExpiry = null;
                      } else if (cachedPremium && !data.isPremium && !isAdminUser) {
                          updates.isPremium = true;
                          updates.premiumExpiry = cachedExpiry ? parseInt(cachedExpiry) : null;
                      }
                      
                      if (Object.keys(updates).length > 0) {
                          await setDoc(userRef, updates, { merge: true });
                      }
                  }
              } catch(e) { console.error("Sync Error:", e); }

              unsubscribeDoc = onSnapshot(userRef, (docSnap) => {
                  if (docSnap.exists()) {
                      const data = docSnap.data();
                      const devices = data.activeDevices || [];
                      
                      if (devices.length > 0 && !devices.includes(localDeviceId)) {
                          auth.signOut();
                          alert(lang === 'en' ? 'Session expired: Device limit reached.' : 'គណនីរបស់អ្នកត្រូវបានចូលប្រើនៅលើឧបករណ៍ច្រើនពេក។ សូមចូលគណនីម្ដងទៀត។');
                          return;
                      }

                      const isPremValid = isAdminUser || (data.isPremium && checkExpiryValid(data.premiumExpiry));
                      setIsPremium(isPremValid);
                      
                      if (isPremValid) {
                          localStorage.setItem('myDesign_premium', 'true');
                          if(data.premiumExpiry) localStorage.setItem('myDesign_premium_expiry', data.premiumExpiry.toString());
                          else localStorage.removeItem('myDesign_premium_expiry'); 
                      } else {
                          localStorage.removeItem('myDesign_premium');
                          localStorage.removeItem('myDesign_premium_expiry');
                      }
                  }
              });
          } else {
              if (unsubscribeDoc) unsubscribeDoc();
              
              const currentLocalPrem = localStorage.getItem('myDesign_premium') === 'true';
              const currentLocalExp = localStorage.getItem('myDesign_premium_expiry');
              
              if (currentLocalPrem && currentLocalExp && Date.now() > parseInt(currentLocalExp)) {
                  setIsPremium(false);
                  localStorage.removeItem('myDesign_premium');
                  localStorage.removeItem('myDesign_premium_expiry');
              } else {
                  setIsPremium(currentLocalPrem);
              }
          }
      });
      return () => {
          unsubscribeAuth();
          if (unsubscribeDoc) unsubscribeDoc();
      };
  }, [lang, localDeviceId]);

  const mainScrollRef = useRef(null);

  useEffect(() => {
      window.history.replaceState({ tab: activeTab, modal: null, premium: false, video: null }, '');

      const handlePopState = (e) => {
          const state = e.state;
          if (state) {
              sessionStorage.setItem('myDesign_activeTab', state.tab || 'learn');
              setActiveTab(state.tab || 'learn');
              setExpandedLesson(state.modal || null);
              setIsPremiumOpen(state.premium || false);
              setActiveVideo(state.video || null);
          } else {
              sessionStorage.setItem('myDesign_activeTab', 'learn');
              setActiveTab('learn');
              setExpandedLesson(null);
              setIsPremiumOpen(false);
              setActiveVideo(null);
          }
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
  }, [activeTab]);

  const handleTabChange = (tabId) => {
      if (tabId === activeTab) return;
      triggerHaptic();
      
      sessionStorage.setItem('myDesign_activeTab', tabId); 
      window.history.pushState({ tab: tabId, modal: null, premium: false, video: null }, '');
      
      setActiveTab(tabId);
      setExpandedLesson(null); 
      setIsPremiumOpen(false);
      setActiveVideo(null);
  };

  const openLesson = (lessonId) => {
      triggerHaptic();
      window.history.pushState({ tab: activeTab, modal: lessonId, premium: false, video: null }, '');
      setExpandedLesson(lessonId);
  };

  const closeLesson = () => {
      window.history.back();
  };

  const openPremium = () => {
      triggerHaptic();
      window.history.pushState({ tab: activeTab, modal: expandedLesson, premium: true, video: null }, '');
      setIsPremiumOpen(true);
  };

  const closePremium = () => {
      window.history.back();
  };

  const openVideo = (videoId) => {
      triggerHaptic();
      if (!isPremium) {
          openPremium(); 
          return;
      }
      window.history.pushState({ tab: activeTab, modal: expandedLesson, premium: isPremiumOpen, video: videoId }, '');
      setActiveVideo(videoId);
  };

  const closeVideo = () => {
      window.history.back();
  };
  
  const [chatMessages, setChatMessages] = useState(() => {
      try {
          const savedChat = localStorage.getItem('myDesignChatHistory');
          if (savedChat) {
              const parsed = JSON.parse(savedChat);
              if (Array.isArray(parsed) && parsed.length > 0) return parsed;
          }
      } catch (e) {
          console.error("Error parsing chat history:", e);
      }
      const defaultText = typeof window !== 'undefined' && localStorage.getItem('myDesign_lang') === 'en' 
          ? "Hello! 👋 I am your personal AI assistant.\n\nWhat editing techniques would you like to learn today? You can ask me about color grading, how to use tools, or even look for beautiful presets! 😊✨" 
          : "សួស្ដីបងបាទ! 👋 ខ្ញុំជាគ្រូជំនួយ AI ផ្ទាល់ខ្លួនរបស់បង。\n\nតើបងចង់ដឹងពីក្បួនកែរូបអ្វីខ្លះនៅថ្ងៃនេះ? បងអាចសួរខ្ញុំបានពីអត្ថន័យនៃពណ៌ របៀបប្រើប្រាស់មុខងារផ្សេងៗ ឬ ស្វែងរក Preset ស្អាតៗក៏បានដែរណា៎! ធានាថារៀនជាមួយខ្ញុំមិនធុញទេបាទ! 😊✨";
      return [{ role: 'model', text: defaultText }];
  });

  const [sessionAiGreeted, setSessionAiGreeted] = useState(false);

  useEffect(() => {
      if (activeTab === 'ai' && !sessionAiGreeted) {
          setSessionAiGreeted(true);
          setChatMessages(prev => {
              if (prev.length <= 1 && prev[0]?.text.includes("ខ្ញុំជាគ្រូជំនួយ")) {
                  return prev; 
              }
              
              const greetings = lang === 'en' ? [
                  "Hello again! 👋 Do you have any photos to edit today? 😊",
                  "Welcome back! 🚀 Feel free to ask any questions about photo editing!",
                  "Hi there! 🎨 I'm ready, what tools do you want to learn today?"
              ] : [
                  "សួស្ដីបងម្ដងទៀតបាទ! 👋 ថ្ងៃនេះមានរូបចង់កែពណ៌ទេបាទ? 😊",
                  "ស្វាគមន៍ត្រលប់មកវិញបង! 🚀 តើមានចម្ងល់អ្វីទាក់ទងនឹងការកែរូបអាចសួរខ្ញុំបានណា៎!",
                  "សួស្ដីបាទ! 🎨 ខ្ញុំត្រៀមខ្លួនរួចរាល់ហើយ តើបងចង់រៀនពីមុខងារអ្វីដែរថ្ងៃនេះ?"
              ];
              const randomGreet = greetings[Math.floor(Math.random() * greetings.length)];
              
              if (prev[prev.length - 1]?.text !== randomGreet && !greetings.includes(prev[prev.length - 1]?.text)) {
                  return [...prev, { role: 'model', text: randomGreet }];
              }
              return prev;
          });
      }
  }, [activeTab, sessionAiGreeted, lang]);

  useEffect(() => {
      localStorage.setItem('myDesignChatHistory', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
        const savedTheme = localStorage.getItem('app-theme');
        return savedTheme ? savedTheme === 'dark' : true;
    } catch(e) { return true; }
  });

  useEffect(() => {
    try {
        localStorage.setItem('app-theme', isDarkMode ? 'dark' : 'light');
    } catch(e) {}

    const viewportContent = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
    let existingMeta = document.querySelector('meta[name="viewport"]');
    if (!existingMeta) {
        existingMeta = document.createElement('meta');
        existingMeta.name = "viewport";
        existingMeta.content = viewportContent;
        document.head.appendChild(existingMeta);
    } else if (existingMeta.content !== viewportContent) {
        existingMeta.content = viewportContent;
    }

    document.documentElement.style.setProperty('background-color', isDarkMode ? '#121212' : '#FAFAFA', 'important');
    document.body.style.setProperty('background-color', isDarkMode ? '#121212' : '#FAFAFA', 'important');

    let themeMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeMeta) {
      themeMeta = document.createElement('meta');
      themeMeta.name = "theme-color";
      document.head.appendChild(themeMeta);
    }
    themeMeta.setAttribute("content", isDarkMode ? "#121212" : "#FAFAFA");
    let appleStatusMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (!appleStatusMeta) {
      appleStatusMeta = document.createElement('meta');
      appleStatusMeta.name = 'apple-mobile-web-app-status-bar-style';
      document.head.appendChild(appleStatusMeta);
    }
    appleStatusMeta.content = 'black-translucent';

    const manifest = {
      "short_name": "Lightroom",
      "name": "My Design Lightroom Master",
      "icons": [
        { 
          "src": "/logo.svg", 
          "type": "image/svg+xml", 
          "sizes": "144x144 192x192 512x512 any", 
          "purpose": "any maskable" 
        }
      ],
      "start_url": ".",
      "display": "standalone",
      "theme_color": isDarkMode ? "#121212" : "#FAFAFA",
      "background_color": isDarkMode ? "#121212" : "#FAFAFA"
    };
    
    const manifestString = JSON.stringify(manifest);
    const manifestUrl = 'data:application/manifest+json;charset=utf-8,' + encodeURIComponent(manifestString);
    
    let manifestLink = document.querySelector('link[rel="manifest"]');
    if (!manifestLink) {
      manifestLink = document.createElement('link');
      manifestLink.rel = 'manifest';
      document.head.appendChild(manifestLink);
    }
    manifestLink.href = manifestUrl;

    let appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
    if (!appleIcon) {
      appleIcon = document.createElement('link');
      appleIcon.rel = 'apple-touch-icon';
      appleIcon.href = '/logo.svg'; 
      document.head.appendChild(appleIcon);
    }
  }, [isDarkMode]);

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
      const handleFocus = (e) => {
          const target = e.target;
          const tag = target?.tagName;
          const type = target?.type;
          
          let isContentEditable = false;
          if (target?.isContentEditable) {
              isContentEditable = true;
          } else if (typeof target?.getAttribute === 'function') {
              isContentEditable = target.getAttribute('contenteditable') === 'true';
          }

          if (
              (tag === 'INPUT' && (type === 'text' || type === 'search' || type === 'number')) || 
              tag === 'TEXTAREA' || 
              isContentEditable
          ) {
              setIsKeyboardOpen(true);
          }
      };

      const handleBlur = () => {
          setIsKeyboardOpen(false);
      };

      window.addEventListener('focus', handleFocus, true);
      window.addEventListener('blur', handleBlur, true);

      return () => {
          window.removeEventListener('focus', handleFocus, true);
          window.removeEventListener('blur', handleBlur, true);
      };
  }, []);

  useEffect(() => {
      if (mainScrollRef.current) {
          mainScrollRef.current.scrollTop = 0;
      }
  }, [activeTab]);

  return (
      <div 
          className={`fixed top-0 bottom-0 left-0 right-0 w-full flex flex-col font-khmer overflow-hidden transition-colors duration-500 ease-spring ${isDarkMode ? 'bg-[#121212] text-[#E3E3E3]' : 'bg-[#FAFAFA] text-[#1A1C1E]'}`}
          style={{
              paddingLeft: 'env(safe-area-inset-left)',
              paddingRight: 'env(safe-area-inset-right)'
          }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className={`absolute -top-[20%] -left-[10%] w-[60%] h-[50%] rounded-full blur-[140px] transition-opacity duration-1000 ${isDarkMode ? 'bg-[#C65102]/20 opacity-60' : 'bg-[#C65102]/10 opacity-50'}`}></div>
            <div className={`absolute top-[40%] -right-[20%] w-[50%] h-[50%] rounded-full blur-[140px] transition-opacity duration-1000 ${isDarkMode ? 'bg-[#31A8FF]/10 opacity-50' : 'bg-[#31A8FF]/5 opacity-40'}`}></div>
        </div>

        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@100..700&display=swap'); 
            body, html { 
                height: 100%;
                width: 100%;
                overscroll-behavior-y: none; 
                -webkit-tap-highlight-color: transparent; 
                margin: 0; 
                padding: 0; 
            } 
            main { -webkit-overflow-scrolling: touch; } 
            .font-khmer { font-family: 'Kantumruy Pro', sans-serif; } 
            .no-scrollbar::-webkit-scrollbar { display: none; } 
          
          @keyframes fade-in-up { 
              0% { opacity: 0; transform: translateY(20px) scale(0.98); filter: blur(4px); } 
              100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } 
          } 
          .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .ease-spring { transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1) !important; }
          
          .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; margin: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}; border-radius: 10px; border: 1px solid transparent; background-clip: padding-box; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #C65102; }
          
          :root {
              --track-bg: ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
              --thumb-bg: ${isDarkMode ? '#E3E3E3' : '#1A1C1E'};
              --thumb-border: ${isDarkMode ? '#1E1E1E' : '#D1D5DB'};
          }
          input[type=range] { -webkit-appearance: none; background: transparent; pointer-events: none; touch-action: pan-y; width: 100%; margin: -2px 0; padding: 12px 0; } 
          input[type=range]:focus { outline: none; }
          input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 2px; cursor: pointer; background: var(--track-bg); border-radius: 2px; transition: background 0.3s; pointer-events: none; backdrop-filter: blur(8px); } 
          input[type=range]:hover::-webkit-slider-runnable-track { background: ${isDarkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'}; }
          input[type=range]::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: 32px;
              width: 32px;
              border-radius: 50%;
              background-color: transparent !important;
              background-image: radial-gradient(circle at 50% 50%, var(--thumb-bg) 0px, var(--thumb-bg) 6px, transparent 6.5px) !important;
              border: none; 
              margin-top: -15px; 
              cursor: grab; 
              pointer-events: auto; 
              transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); 
              box-shadow: none !important;
              -webkit-box-shadow: none !important;
          } 

          input[type=range]::-webkit-slider-thumb:hover {transform: scale(1.15); box-shadow: none !important;}

          input[type=range]::-webkit-slider-thumb:active {
              transform: scale(1.25);
              cursor: grabbing; 
              box-shadow: none !important;
              background-color: transparent !important;
              background-image: radial-gradient(circle at 50% 50%, #C65102 0px, #C65102 6.5px, transparent 7px) !important; 
          }        
        `}</style>
        
        <UpdateNotifier isDarkMode={isDarkMode} />

        <div className="flex-none z-40 relative w-full" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
          <Header activeTab={activeTab} setActiveTab={handleTabChange} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div>

        {isPremiumOpen && <PremiumModal onClose={closePremium} onPlayVideo={openVideo} isDarkMode={isDarkMode} isPremium={isPremium} setIsPremium={setIsPremium} currentUser={currentUser} />}

        {activeVideo && <VideoModal video={videoCourseData.find(v => v.id === activeVideo)} onClose={closeVideo} isDarkMode={isDarkMode} isPremium={isPremium} />}
        
        {expandedLesson && <LessonModal lesson={lessonsData.find(l => l.id === expandedLesson)} onClose={closeLesson} isDarkMode={isDarkMode} />}
        
        <main ref={mainScrollRef} className={`flex-1 min-h-0 relative w-full ${activeTab === 'ai' || activeTab === 'lab' ? 'overflow-hidden p-0' : 'overflow-y-auto custom-scrollbar p-4 pb-[calc(env(safe-area-inset-bottom)+90px)] md:p-8 z-10'}`}>
          <div className="max-w-7xl mx-auto h-full w-full">
              {activeTab === 'learn' && (
                <div className="space-y-6 pb-6">
                  <div className="text-center py-10 mt-2 relative z-10"><h2 className={`text-4xl md:text-6xl font-black mb-6 tracking-tight ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>{t('title_main')}</h2><p className={`max-w-xl mx-auto text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>{t('subtitle_main')}</p></div>
                  
                  <div className="relative z-10 mb-8 animate-fade-in-up">
                      <button 
                          onClick={openPremium} 
                          className={`w-full relative overflow-hidden text-white p-5 rounded-3xl flex items-center justify-between shadow-lg active:scale-[0.98] transition-all group bg-gradient-to-r from-[#C65102] to-[#E86A10] shadow-[#C65102]/20`}
                      >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2"></div>
                          <div className="flex items-center gap-4 relative z-10">
                              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                  <Crown className="w-7 h-7 text-white" />
                              </div>
                              <div className="text-left">
                                  <h3 className="font-bold text-lg leading-tight font-khmer flex items-center gap-2">
                                      {lang === 'en' ? 'Premium Video Masterclass' : 'វគ្គសិក្សាវីដេអូពិសេស'}
                                  </h3>
                                  <p className="text-[13px] opacity-90 font-khmer mt-1">
                                      {lang === 'en' ? '11 Videos + Practice RAW Files' : '១១ វីដេអូមេរៀន + ឯកសារអនុវត្ត'}
                                  </p>
                              </div>
                          </div>
                          <ChevronRight className="w-6 h-6 opacity-70 group-hover:translate-x-1 transition-transform relative z-10 shrink-0" />
                      </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10">{lessonsData.map(l => <LessonCard key={l.id} lesson={l} onClick={() => openLesson(l.id)} isDarkMode={isDarkMode} />)}</div>
                  <div className="relative z-10"><TipsSection isExpanded={expandedSection === 'tips'} onToggle={() => setExpandedSection(expandedSection === 'tips' ? null : 'tips')} isDarkMode={isDarkMode} /></div>
                  <div className="relative z-10"><ContactSection isDarkMode={isDarkMode} /></div>
                </div>
              )}
              
              <div className={activeTab === 'lab' ? 'h-full w-full p-0 md:p-8 relative z-10' : 'absolute w-0 h-0 opacity-0 overflow-hidden pointer-events-none -z-50'}>
                  <PhotoLab isDarkMode={isDarkMode} />
              </div>
              
              {activeTab === 'quiz' && <div className="relative z-10"><Test isDarkMode={isDarkMode} /></div>}
              
              {activeTab === 'ai' && <div className="h-full w-full max-w-3xl mx-auto md:p-8 relative z-10"><ChatBot messages={chatMessages} setMessages={setChatMessages} isDarkMode={isDarkMode} /></div>}
          </div>
        </main>

        <div 
            className={`md:hidden fixed left-0 right-0 bottom-0 z-50 w-full pointer-events-none transition-transform duration-500 ease-spring ${isKeyboardOpen ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
            style={{ paddingBottom: '0px' }}
        >
            <nav className={`pointer-events-auto flex items-center justify-around w-full px-2 py-1.5 backdrop-blur-[35px] border-t transition-colors duration-500 shadow-[0_-5px_30px_rgba(0,0,0,0.1)] ${isDarkMode ? 'bg-[#1C1C1E]/85 border-white/10' : 'bg-[#F9F9F9]/90 border-black/5'}`}>
                {['learn', 'quiz', 'lab', 'ai'].map(tabId => {
                    const isActive = activeTab === tabId;
                    return (
                        <button key={tabId} onClick={() => handleTabChange(tabId)} className={`relative flex flex-col items-center justify-center gap-1 w-16 h-12 transition-all duration-300 group ${isActive ? (isDarkMode ? 'text-[#E3E3E3]' : 'text-[#C65102]') : (isDarkMode ? 'text-[#9AA0A6] hover:text-[#E3E3E3]' : 'text-[#5F6368] hover:text-[#1A1C1E]')}`}>
                            
                            <div className={`relative z-10 transition-transform duration-300 ${isActive ? '-translate-y-0.5 scale-105' : 'scale-95 group-hover:scale-100'}`}>
                                {tabId === 'learn' && <BookOpen size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? (isDarkMode ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'drop-shadow-[0_0_8px_rgba(198,81,2,0.3)]') : ''} />}
                                {tabId === 'quiz' && <Award size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? (isDarkMode ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'drop-shadow-[0_0_8px_rgba(198,81,2,0.3)]') : ''} />}
                                {tabId === 'lab' && <Sliders size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? (isDarkMode ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'drop-shadow-[0_0_8px_rgba(198,81,2,0.3)]') : ''} />}
                                {tabId === 'ai' && <Bot size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? (isDarkMode ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'drop-shadow-[0_0_8px_rgba(198,81,2,0.3)]') : ''} />}
                            </div>
                            <span className={`relative z-10 text-[9px] font-medium uppercase tracking-wide transition-all duration-300 ${isActive ? 'opacity-100 font-bold' : 'opacity-70'}`}>
                                {tabId === 'learn' ? t('tab_learn') : tabId === 'quiz' ? t('tab_quiz') : tabId === 'lab' ? t('tab_lab') : tabId === 'ai' ? t('tab_ai') : tabId}
                            </span>
                        </button>
                    )
                })}
            </nav>
        </div>

      </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}