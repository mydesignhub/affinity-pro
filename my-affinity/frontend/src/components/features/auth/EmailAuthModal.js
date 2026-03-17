import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut } from 'firebase/auth';

const triggerHaptic = (type = 'light') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        if (type === 'error') navigator.vibrate([50, 50, 50]);
        else navigator.vibrate(10);
    }
};

const EmailAuthModal = ({ onClose, onSuccess, isDarkMode, lang }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    // 🌟 NEW STATE: Tracks if we are waiting for the user to check their email
    const [isPendingVerification, setIsPendingVerification] = useState(false); 

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'auto'; };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleInitialSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        triggerHaptic();

        try {
            if (isSignUp) {
                // 1. Create the account
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                
                // 2. Update their profile with their name
                await updateProfile(userCredential.user, { displayName: name });
                
                // 3. Send the verification email
                await sendEmailVerification(userCredential.user);
                
                // 4. Force sign out so they can't access the app until verified
                await signOut(auth);
                
                triggerHaptic('success');
                // 🌟 INSTEAD OF CLEARING DATA AND SWITCHING TABS, WE SHOW THE PENDING UI
                setIsPendingVerification(true);

            } else {
                // Standard Sign In Logic
                await attemptLogin();
            }
        } catch (err) {
            triggerHaptic('error');
            console.error("Auth error:", err);
            handleAuthError(err);
        } finally {
            setIsLoading(false);
        }
    };

    // 🌟 SEPARATED LOGIN LOGIC SO WE CAN REUSE IT
    const attemptLogin = async () => {
        setIsLoading(true);
        setError('');
        triggerHaptic();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            // Check if they actually clicked the link in the email
            if (!userCredential.user.emailVerified) {
                await signOut(auth); // Log them back out
                triggerHaptic('error');
                setError(lang === 'en' ? 'Email not verified yet. Please check your inbox or spam folder and click the link.' : 'មិនទាន់បានបញ្ជាក់អ៊ីមែលទេ។ សូមពិនិត្យមើលប្រអប់សារ ឬថត Spam រួចចុចលើតំណភ្ជាប់។');
            } else {
                triggerHaptic('success');
                onSuccess(userCredential.user);
                handleClose();
            }
        } catch (err) {
            triggerHaptic('error');
            console.error("Login error:", err);
            handleAuthError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAuthError = (err) => {
        if (err.code === 'auth/email-already-in-use') setError(lang === 'en' ? 'Email is already in use.' : 'អ៊ីមែលនេះត្រូវបានប្រើរួចហើយ។');
        else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') setError(lang === 'en' ? 'Incorrect email or password.' : 'អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។');
        else if (err.code === 'auth/weak-password') setError(lang === 'en' ? 'Password should be at least 6 characters.' : 'ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៦ តួអក្សរ។');
        else setError(lang === 'en' ? 'Authentication failed. Please try again.' : 'បរាជ័យក្នុងការចូល។ សូមព្យាយាមម្តងទៀត។');
    };

    return (
        <div className={`fixed inset-0 z-[110] flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={handleClose} />

            <div className={`relative w-full max-w-md p-6 sm:p-8 rounded-[32px] shadow-2xl transition-transform duration-300 ease-out transform ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'} ${isDarkMode ? 'bg-[#1E1E1E] border border-[#2C2C2C]' : 'bg-[#FFFFFF] border border-[#E5E7EB]'}`}>
                
                <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-2xl font-black font-khmer ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        {isPendingVerification 
                            ? (lang === 'en' ? 'Check Your Inbox' : 'ពិនិត្យមើលប្រអប់សារ')
                            : isSignUp ? (lang === 'en' ? 'Create Account' : 'បង្កើតគណនី') : (lang === 'en' ? 'Welcome Back' : 'សូមស្វាគមន៍មកវិញ')}
                    </h2>
                    <button onClick={handleClose} className={`p-2 rounded-full transition-colors active:scale-90 ${isDarkMode ? 'bg-[#121212] text-[#A0A0A0] hover:text-white' : 'bg-[#F8F9FA] text-[#6B7280] hover:text-black'}`}>
                        <X size={20} />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2 text-red-500 text-xs font-bold animate-shake">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <p className="leading-relaxed">{error}</p>
                    </div>
                )}

                {/* 🌟 NEW PENDING VERIFICATION UI 🌟 */}
                {isPendingVerification ? (
                    <div className="flex flex-col items-center justify-center py-4 animate-fade-in-up text-center">
                        <div className={`p-4 rounded-full mb-4 ${isDarkMode ? 'bg-green-500/10 text-green-500' : 'bg-green-50 text-green-600'}`}>
                            <Mail size={40} />
                        </div>
                        <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            {lang === 'en' ? 'Verification Link Sent!' : 'បានផ្ញើតំណបញ្ជាក់រួចរាល់!'}
                        </h3>
                        <p className={`text-sm mb-8 leading-relaxed font-khmer ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                            {lang === 'en' ? `We sent an email to ` : `យើងបានផ្ញើអ៊ីមែលទៅកាន់ `}
                            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{email}</span>. 
                            {lang === 'en' ? ` Please click the link in that email to verify your account, then click the button below to sign in.` : ` សូមចុចលើតំណភ្ជាប់ក្នុងអ៊ីមែលនោះដើម្បីបញ្ជាក់គណនីរបស់អ្នក បន្ទាប់មកចុចប៊ូតុងខាងក្រោមដើម្បីចូលគណនី។`}
                        </p>
                        
                        {/* Auto-Login Button that uses the credentials they just typed! */}
                        <button 
                            onClick={attemptLogin} 
                            disabled={isLoading}
                            className={`w-full py-4 rounded-xl font-black font-khmer text-[14px] transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${isLoading ? 'opacity-70' : 'shadow-lg hover:-translate-y-1 bg-green-500 text-white'}`}
                        >
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                            {lang === 'en' ? 'I have verified my email' : 'ខ្ញុំបានបញ្ជាក់អ៊ីមែលរួចរាល់'}
                        </button>
                        
                        <button 
                            onClick={() => { setIsPendingVerification(false); setIsSignUp(false); setError(''); }}
                            className={`mt-4 text-xs font-bold font-khmer hover:underline ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}
                        >
                            {lang === 'en' ? 'Switch to a different account' : 'ប្តូរទៅគណនីផ្សេង'}
                        </button>
                    </div>
                ) : (
                    /* 🌟 STANDARD FORM UI 🌟 */
                    <>
                        <form onSubmit={handleInitialSubmit} className="space-y-4 animate-fade-in-up">
                            {isSignUp && (
                                <div className={`flex items-center gap-3 p-3.5 rounded-xl border ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                    <User size={18} className={isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'} />
                                    <input 
                                        type="text" required value={name} onChange={(e) => setName(e.target.value)}
                                        placeholder={lang === 'en' ? "Full Name" : "ឈ្មោះពេញ"}
                                        className={`w-full bg-transparent outline-none text-sm font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}
                                    />
                                </div>
                            )}
                            <div className={`flex items-center gap-3 p-3.5 rounded-xl border ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                <Mail size={18} className={isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'} />
                                <input 
                                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                    placeholder={lang === 'en' ? "Email Address" : "អាសយដ្ឋានអ៊ីមែល"}
                                    className={`w-full bg-transparent outline-none text-sm font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}
                                />
                            </div>
                            <div className={`flex items-center gap-3 p-3.5 rounded-xl border ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                <Lock size={18} className={isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'} />
                                <input 
                                    type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                    placeholder={lang === 'en' ? "Password" : "ពាក្យសម្ងាត់"}
                                    className={`w-full bg-transparent outline-none text-sm font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}
                                />
                            </div>

                            <button disabled={isLoading} type="submit" className={`w-full py-4 rounded-xl font-black font-khmer text-[14px] mt-2 transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${isLoading ? 'opacity-70' : 'shadow-lg hover:-translate-y-1'} ${isDarkMode ? 'bg-[#41B6E6] text-[#0A0A0A]' : 'bg-[#0277C5] text-white'}`}>
                                {isLoading && <Loader2 size={18} className="animate-spin" />}
                                {isSignUp ? (lang === 'en' ? 'Sign Up' : 'ចុះឈ្មោះ') : (lang === 'en' ? 'Sign In' : 'ចូលគណនី')}
                            </button>
                        </form>

                        <div className="mt-6 text-center animate-fade-in-up">
                            <button onClick={() => { setIsSignUp(!isSignUp); setError(''); }} className={`text-sm font-bold font-khmer hover:underline ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                                {isSignUp 
                                    ? (lang === 'en' ? 'Already have an account? Sign In' : 'មានគណនីរួចហើយ? ចូលគណនី') 
                                    : (lang === 'en' ? "Don't have an account? Sign Up" : 'មិនទាន់មានគណនី? ចុះឈ្មោះ')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EmailAuthModal;