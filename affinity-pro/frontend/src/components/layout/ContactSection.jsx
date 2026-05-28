import React from 'react';
import { Facebook, Send, Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

// ─── Update these URLs with your own Affinity Pro social links ────────────────
const SOCIAL_LINKS = {
    facebook: 'https://web.facebook.com/YOUR_PAGE',   // TODO: replace
    telegram: 'https://t.me/koymy',
    website:  'https://mydesignkh.vercel.app/',
};
// ─────────────────────────────────────────────────────────────────────────────

const ContactSection = ({ isDarkMode }) => {
    const { t } = useLanguage();
    return (
        <div className={`mt-16 border-t pt-10 text-center ${isDarkMode ? 'border-[#2C2C2C]' : 'border-[#E5E7EB]'}`}>
            <div className="flex justify-center gap-8 sm:gap-10">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className={`w-14 h-14 flex items-center justify-center rounded-[20px] border shadow-sm ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}><Facebook className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} size={24} /></div>
                    <span className={`text-[11px] font-khmer tracking-wide ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Facebook</span>
                </a>
                <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className={`w-14 h-14 flex items-center justify-center rounded-[20px] border shadow-sm ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}><Send className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} size={24} /></div>
                    <span className={`text-[11px] font-khmer tracking-wide ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Telegram</span>
                </a>
                <a href={SOCIAL_LINKS.website} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className={`w-14 h-14 flex items-center justify-center rounded-[20px] border shadow-sm ${isDarkMode ? 'bg-[#1C1C1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E5E7EB]'}`}><Globe className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} size={24} /></div>
                    <span className={`text-[11px] font-khmer tracking-wide ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Website</span>
                </a>
            </div>
            <p className={`text-center text-[10px] mt-10 font-khmer uppercase opacity-50 tracking-widest ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{t('footer_copy')}</p>
        </div>
    );
};

export default React.memo(ContactSection);
