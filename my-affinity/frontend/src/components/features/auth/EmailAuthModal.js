import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { auth } from '../../../firebase';
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
    const [successMsg, setSuccessMsg] = useState(''); // New state for verification message

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
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
                setSuccessMsg(lang === 'en' ? 'Account created! Please check your inbox to verify your email before signing in.' : 'គណនីបានបង្កើត! សូមពិនិត្យមើលប្រអប់សារអ៊ីមែលរបស់អ្នកដើម្បីបញ្ជាក់មុនពេលចូលគណនី។');
                setIsSignUp(false); // Switch to sign in view
                setPassword(''); // Clear password for security

            } else {
                // SIGN IN LOGIC
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                
                // Check if they verified their email
                if (!userCredential.user.emailVerified) {
                    await signOut(auth); // Log them back out
                    triggerHaptic('error');
                    setError(lang === 'en' ? 'Please verify your email address first. Check your inbox or spam folder.' : 'សូមបញ្ជាក់អាសយដ្ឋានអ៊ីមែលរបស់អ្នកជាមុនសិន។ សូមពិនិត្យមើលប្រអប់សារ ឬថត Spam របស់អ្នក។');
                } else {
                    triggerHaptic('success');
                    onSuccess(userCredential.user);
                    handleClose();
                }
            }
        } catch (err) {
            triggerHaptic('error');
            console.error("Auth error:", err);
            
            if (err.code === 'auth/email-already-in-use') setError(lang === 'en' ? 'Email is already in use.' : 'អ៊ីមែលនេះត្រូវបានប្រើរួចហើយ។');
            else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') setError(lang === 'en' ? 'Incorrect email or password.' : 'អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។');
            else if (err.code === 'auth/weak-password') setError(lang === 'en' ? 'Password should be at least 6 characters.' : 'ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៦ តួអក្សរ។');
            else setError(lang === 'en' ? 'Authentication failed. Please try again.' : 'បរាជ័យក្នុងការចូល។ សូមព្យាយាមម្តងទៀត។');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`fixed inset-0 z-[110] flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={handleClose} />

            <div className={`relative w-full max-w-md p-6 sm:p-8 rounded-[32px] shadow-2xl transition-transform duration-300 ease-out transform ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'} ${isDarkMode ? 'bg-[#1E1E1E] border border-[#2C2C2C]' : 'bg-[#FFFFFF] border border-[#E5E7EB]'}`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-2xl font-black font-khmer ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        {isSignUp ? (lang === 'en' ? 'Create Account' : 'បង្កើតគណនី') : (lang === 'en' ? 'Welcome Back' : 'សូមស្វាគមន៍មកវិញ')}
                    </h2>
                    <button onClick={handleClose} className={`p-2 rounded-full transition-colors active:scale-90 ${isDarkMode ? 'bg-[#121212] text-[#A0A0A0] hover:text-white' : 'bg-[#F8F9FA] text-[#6B7280] hover:text-black'}`}>
                        <X size={20} />
                    </button>
                </div>

                {/* ERROR MESSAGE */}
                {error && (
                    <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2 text-red-500 text-xs font-bold animate-shake">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <p className="leading-relaxed">{error}</p>
                    </div>
                )}

                {/* SUCCESS MESSAGE (For Verification Email) */}
                {successMsg && (
                    <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 flex items-start gap-2 text-green-500 text-xs font-bold animate-fade-in-up">
                        <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                        <p className="leading-relaxed">{successMsg}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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

                <div className="mt-6 text-center">
                    <button onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccessMsg(''); }} className={`text-sm font-bold font-khmer hover:underline ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                        {isSignUp 
                            ? (lang === 'en' ? 'Already have an account? Sign In' : 'មានគណនីរួចហើយ? ចូលគណនី') 
                            : (lang === 'en' ? "Don't have an account? Sign Up" : 'មិនទាន់មានគណនី? ចុះឈ្មោះ')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailAuthModal;