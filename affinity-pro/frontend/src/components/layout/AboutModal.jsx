import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, FileText, Code2, Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AboutModal({ onClose, isDarkMode }) {
    const { lang } = useLanguage();
    const [render, setRender] = useState(false);

    useEffect(() => {
        setRender(true);
    }, []);

    const handleAnimationEnd = () => {
        if (!render) onClose();
    };

    const handleClose = () => {
        setRender(false);
    };

    return (
        <div 
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-colors duration-500 ${render ? (isDarkMode ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/30 backdrop-blur-sm') : 'bg-transparent backdrop-blur-none pointer-events-none'}`}
            onAnimationEnd={handleAnimationEnd}
            onClick={handleClose}
        >
            <div 
                className={`relative w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col rounded-[24px] border shadow-2xl transition-all duration-500 ease-spring ${render ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'} ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className={`flex items-center justify-between p-5 border-b ${isDarkMode ? 'border-[#2C2C2C]' : 'border-[#E5E7EB]'}`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-tr ${isDarkMode ? 'from-[#41B6E6] to-[#0277C5]' : 'from-[#0277C5] to-[#01579B]'}`}>
                            <Code2 color="white" size={20} />
                        </div>
                        <div>
                            <h2 className={`font-black text-lg ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                                {lang === 'en' ? 'About Affinity Pro' : 'អំពី Affinity Pro'}
                            </h2>
                            <p className={`text-xs font-mono opacity-60 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Version 1.0.0</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleClose}
                        className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#2C2C2C] text-[#A0A0A0]' : 'hover:bg-[#F4F5F7] text-[#6B7280]'}`}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                    
                    {/* Intro */}
                    <section>
                        <h3 className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-3 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}>
                            <Heart size={16} /> {lang === 'en' ? 'Crafted with Passion' : 'បង្កើតឡើងដោយក្ដីស្រលាញ់'}
                        </h3>
                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                            {lang === 'en' 
                                ? 'Affinity Pro Masterclass was created to empower aspiring designers by providing an accessible, interactive platform to master Affinity Photo, Designer, and Publisher.'
                                : 'Affinity Pro Masterclass ត្រូវបានបង្កើតឡើងក្នុងគោលបំណងជួយអ្នករចនាជំនាន់ក្រោយ ឲ្យទទួលបាននូវចំណេះដឹងផ្នែករចនាលើកម្មវិធី Affinity Photo, Designer, និង Publisher យ៉ាងងាយស្រួល។'}
                        </p>
                    </section>

                    {/* Ownership */}
                    <section>
                        <h3 className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-3 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}>
                            <ShieldCheck size={16} /> {lang === 'en' ? 'Ownership & Copyright' : 'កម្មសិទ្ធិបញ្ញា'}
                        </h3>
                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                            {lang === 'en' 
                                ? 'All content, including texts, lessons, custom graphics, user interface design, and overall layout are the exclusive property of My Koy (My Design). Unauthorized reproduction, distribution, or commercialization of any part of this application without explicit permission is strictly prohibited.'
                                : 'រាល់មាតិកា អត្ថបទ មេរៀន ក្រាហ្វិក ការរចនាចំណុចប្រទាក់ និងទម្រង់ទាំងស្រុង គឺជាកម្មសិទ្ធិបញ្ញាផ្តាច់មុខរបស់អ្នកបង្កើត My Koy (My Design)។ ការចម្លង ការចែកចាយ ឬការប្រើប្រាស់ក្នុងគោលបំណងពាណិជ្ជកម្មដោយគ្មានការអនុញ្ញាត គឺត្រូវបានហាមឃាត់យ៉ាងតឹងរ៉ឹង។'}
                        </p>
                    </section>

                    {/* Terms */}
                    <section>
                        <h3 className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-3 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}>
                            <FileText size={16} /> {lang === 'en' ? 'Terms of Use' : 'លក្ខខណ្ឌនៃការប្រើប្រាស់'}
                        </h3>
                        <ul className={`list-disc list-inside space-y-2 text-sm leading-relaxed ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                            {lang === 'en' ? (
                                <>
                                    <li>This application is provided "as is" for educational purposes.</li>
                                    <li>You agree not to exploit or misuse the platform's features, including the AI assistant.</li>
                                    <li>We reserve the right to modify or terminate the service at any time without prior notice.</li>
                                </>
                            ) : (
                                <>
                                    <li>កម្មវិធីនេះត្រូវបានផ្តល់ជូនសម្រាប់គោលបំណងអប់រំ និងសិក្សាតែប៉ុណ្ណោះ។</li>
                                    <li>អ្នកប្រើប្រាស់យល់ព្រមមិនប្រើប្រាស់ខុសគោលដៅ ឬរំខានដល់ប្រព័ន្ធ ជាពិសេសមុខងារ AI Assistant។</li>
                                    <li>យើងខ្ញុំរក្សាសិទ្ធិក្នុងការកែប្រែ ឬបញ្ឈប់សេវាកម្មនៅពេលណាមួយដោយមិនបាច់ជូនដំណឹងជាមុន។</li>
                                </>
                            )}
                        </ul>
                    </section>
                </div>
                
                {/* Footer */}
                <div className={`p-4 text-center border-t ${isDarkMode ? 'border-[#2C2C2C] bg-[#121212]' : 'border-[#E5E7EB] bg-[#F8F9FA]'}`}>
                    <p className={`text-xs opacity-60 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                        © 2026 My Design. Crafted with Passion.
                    </p>
                </div>
            </div>
        </div>
    );
}
