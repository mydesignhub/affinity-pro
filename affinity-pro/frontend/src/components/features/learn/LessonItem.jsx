import React from 'react';
import { ChevronDown, ChevronRight, Palette, Lightbulb, Layout, Globe, Search, Star, Sparkles, Play, MonitorPlay, Minus, Square, Box, Maximize, Grip, Contrast, PenTool, Check, X } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
    }
};

const DemoPlayer = ({ title, duration = '0:05', isDarkMode, children }) => {
    return (
        <div className={`w-full rounded-2xl overflow-hidden border shadow-xl my-8 transition-all duration-300 ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C] shadow-black/50' : 'bg-[#FFFFFF] border-[#E5E7EB] shadow-[#0277C5]/10'}`}>
            <div className={`px-4 py-2.5 border-b flex items-center justify-between ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{title}</span>
                </div>
                <div className={`text-[9px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 animate-pulse ${isDarkMode ? 'bg-[#41B6E6]/10 text-[#41B6E6]' : 'bg-[#0277C5]/10 text-[#0277C5]'}`}>
                    <MonitorPlay size={10} /> ANIMATED DEMO
                </div>
            </div>
            
            <div className="relative w-full h-48 sm:h-64 overflow-hidden flex items-center justify-center p-6" style={{ '--theme-accent': isDarkMode ? '#41B6E6' : '#0277C5', '--theme-accent-light': isDarkMode ? 'rgba(65, 182, 230, 0.2)' : 'rgba(2, 119, 197, 0.15)' }}>
                {children}
            </div>
            
            <div className={`px-4 py-3 flex items-center gap-3 border-t ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                <Play className={`w-4 h-4 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`} fill="currentColor" />
                <div className="flex-1 h-1.5 rounded-full overflow-hidden relative" style={{ backgroundColor: isDarkMode ? '#2C2C2C' : '#E5E7EB' }}>
                    <div className="absolute top-0 left-0 h-full w-full rounded-full" style={{ backgroundColor: isDarkMode ? '#41B6E6' : '#0277C5', animation: 'demo-progress 5s linear infinite', transformOrigin: 'left' }}></div>
                </div>
                <span className={`text-[10px] font-mono font-bold ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>{duration}</span>
            </div>
        </div>
    );
};

export default function LessonItem({ id, item, isExpanded, onToggle, isDarkMode }) {
    const { lang } = useLanguage();
    
    const displayTool = lang === 'en' && item.tool_en ? item.tool_en : item.tool;
    const displaySubtitle = lang === 'en' && item.khmer_en ? item.khmer_en : item.khmer;
    const displayShortDesc = lang === 'en' && item.shortDesc_en ? item.shortDesc_en : (item.shortDesc || item.desc.split('\n')[0]);
    const displayDesc = lang === 'en' && item.desc_en ? item.desc_en : item.desc;
    const displayTip = lang === 'en' && item.tip_en ? item.tip_en : item.tip;

    return (
        <div id={id} onClick={onToggle} className={`p-6 rounded-3xl border shadow-sm transition-all duration-300 ease-spring group cursor-pointer ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] hover:border-[#41B6E6]/50' : 'bg-[#FFFFFF] border-[#E5E7EB] hover:border-[#0277C5]/50'}`}>
            
            <style>{`
                @keyframes demo-progress { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
                @keyframes hierarchy-hero { 0%, 15% { transform: scale(1); background-color: #9CA3AF; height: 1rem; } 40%, 80% { transform: scale(1.1) translateY(-10px); background-color: var(--theme-accent); height: 2.5rem; } 100% { transform: scale(1); background-color: #9CA3AF; height: 1rem; } }
                @keyframes hierarchy-sub { 0%, 15% { transform: scale(1); background-color: #9CA3AF; opacity: 1; } 40%, 80% { transform: scale(0.9) translateY(-5px); background-color: var(--theme-accent); opacity: 0.7; } 100% { transform: scale(1); background-color: #9CA3AF; opacity: 1; } }
                @keyframes track-text { 0%, 15% { letter-spacing: 1px; font-weight: 500; color: #9CA3AF; transform: scale(1); } 40%, 80% { letter-spacing: 18px; font-weight: 900; color: var(--theme-accent); transform: scale(1.15); } 100% { letter-spacing: 1px; font-weight: 500; color: #9CA3AF; transform: scale(1); } }
                @keyframes trace-path { 0%, 10% { stroke-dashoffset: 600; fill: transparent; } 40%, 80% { stroke-dashoffset: 0; fill: var(--theme-accent-light); } 100% { stroke-dashoffset: 600; fill: transparent; } }
                @keyframes pen-follow { 0%, 10% { transform: translate(-40px, 40px); opacity: 0; } 15% { opacity: 1; } 40%, 80% { transform: translate(110px, 40px); opacity: 1; } 85% { opacity: 0; } 100% { transform: translate(-40px, 40px); opacity: 0; } }
                @keyframes resize-browser { 0%, 15% { width: 100%; border-radius: 8px; } 40%, 80% { width: 35%; border-radius: 24px; } 100% { width: 100%; border-radius: 8px; } }
                @keyframes stack-columns { 0%, 15% { flex-direction: row; } 40%, 80% { flex-direction: column; } 100% { flex-direction: row; } }
                @keyframes slide-linear { 0%, 10% { left: 0; } 45%, 85% { left: calc(100% - 24px); } 100% { left: 0; } }
                /* 🌟 NEW: Pro Animation Keyframes 🌟 */
                @keyframes draw-bleed { 0%, 100% { stroke-dashoffset: 150; } 50% { stroke-dashoffset: 0; } }
                @keyframes fold-box-top { 0%, 10% { transform: rotateX(0deg); } 40%, 100% { transform: rotateX(-90deg); } }
                @keyframes fold-box-bottom { 0%, 10% { transform: rotateX(0deg); } 40%, 100% { transform: rotateX(90deg); } }
                @keyframes fold-box-left { 0%, 10% { transform: rotateY(0deg); } 40%, 100% { transform: rotateY(-90deg); } }
                @keyframes fold-box-right { 0%, 10% { transform: rotateY(0deg); } 40%, 100% { transform: rotateY(90deg); } }
            `}</style>

            <div className="flex justify-between items-start mb-3 gap-3">
                <div className="flex flex-wrap items-center gap-2 flex-1">
                    <span className={`font-bold text-lg leading-tight w-full sm:w-auto transition-colors ${isDarkMode ? 'text-[#F1F1F1] group-hover:text-[#41B6E6]' : 'text-[#1A1A1A] group-hover:text-[#0277C5]'}`}>{displayTool}</span>
                    <span className={`text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-lg border whitespace-nowrap ${lang === 'km' ? 'font-khmer' : 'font-sans'} ${isDarkMode ? 'bg-[#2C2C2C] text-[#A0A0A0] border-[#2C2C2C]' : 'bg-[#F8F9FA] text-[#6B7280] border-[#E5E7EB]'}`}>{displaySubtitle}</span>
                </div>
                <ChevronDown className={`w-5 h-5 mt-1 transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180 text-[#0277C5] dark:text-[#41B6E6]' : (isDarkMode ? 'text-[#6B7280]' : 'text-[#A0A0A0]')}`} />
            </div>
            
            <p className={`text-[13px] sm:text-sm leading-relaxed line-clamp-2 ${lang === 'km' ? 'font-khmer' : 'font-sans'} ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                {displayShortDesc}
            </p>
            
            {displayTip && (
                <div className={`mt-4 pt-3 border-t flex items-start space-x-2 ${isDarkMode ? 'border-[#2C2C2C]' : 'border-[#E5E7EB]'}`}>
                    <span className="text-[13px] mt-0.5">💡</span>
                    <p className={`text-xs font-medium leading-relaxed ${lang === 'km' ? 'font-khmer' : 'font-sans'} ${isDarkMode ? 'text-[#C5B002]' : 'text-[#C55002]'}`}>
                        {displayTip.replace('💡', '').trim()} 
                    </p>
                </div>
            )}
            
            {isExpanded && (
                <div className="mt-5 pt-5 border-t border-[#0277C5]/10 animate-fade-in-up cursor-default" onClick={(e) => e.stopPropagation()}>
                    
                    {item.advancedUI === 'graphic_hierarchy' && (
                        <DemoPlayer title="Organizing Visual Hierarchy" isDarkMode={isDarkMode}>
                            <div className="flex flex-col items-center justify-center gap-4 transition-all w-full max-w-[250px]">
                                <div className="w-full rounded-md shadow-md" style={{ animation: 'hierarchy-hero 5s ease-in-out infinite' }}></div>
                                <div className="w-3/4 rounded-md shadow-sm" style={{ animation: 'hierarchy-sub 5s ease-in-out infinite' }}></div>
                                <div className="w-full h-12 rounded-md bg-gray-400/30 dark:bg-gray-600/30"></div>
                            </div>
                        </DemoPlayer>
                    )}

                    {item.advancedUI === 'graphic_typo_hierarchy' && (
                        <DemoPlayer title="Typesetting & Tracking" isDarkMode={isDarkMode}>
                            <div className="flex items-center justify-center w-full h-full">
                                <span className="text-xl sm:text-3xl font-sans tracking-tight uppercase shadow-sm" style={{ animation: 'track-text 5s ease-in-out infinite' }}>
                                    Typography
                                </span>
                            </div>
                        </DemoPlayer>
                    )}

                    {item.advancedUI === 'graphic_software_tools' && (
                        <DemoPlayer title="Vector Path Generation (Pen Tool)" isDarkMode={isDarkMode}>
                            <div className="relative w-full max-w-[250px] aspect-video">
                                <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                                    <line x1="0" y1="50" x2="200" y2="50" stroke={isDarkMode ? "#333" : "#E5E7EB"} strokeDasharray="4" />
                                    <line x1="100" y1="0" x2="100" y2="100" stroke={isDarkMode ? "#333" : "#E5E7EB"} strokeDasharray="4" />
                                    <path d="M 20 80 Q 80 10, 180 80 Z" fill="none" stroke="var(--theme-accent)" strokeWidth="3" strokeLinecap="round" strokeDasharray="600" style={{ animation: 'trace-path 5s ease-in-out infinite' }} />
                                    <circle cx="20" cy="80" r="4" fill="white" stroke="var(--theme-accent)" strokeWidth="2" />
                                    <circle cx="180" cy="80" r="4" fill="white" stroke="var(--theme-accent)" strokeWidth="2" />
                                </svg>
                                <div className="absolute top-0 left-0 w-5 h-5 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-lg z-10" style={{ animation: 'pen-follow 5s ease-in-out infinite' }}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]"></div>
                                </div>
                            </div>
                        </DemoPlayer>
                    )}

                    {item.advancedUI === 'graphic_spec_web' && (
                        <DemoPlayer title="Responsive Mobile-First Design" isDarkMode={isDarkMode}>
                            <div className={`border-[4px] p-2 h-[120px] flex overflow-hidden shadow-2xl ${isDarkMode ? 'border-[#3A3A3C] bg-[#1A1A1A]' : 'border-[#D1D5DB] bg-white'}`} style={{ animation: 'resize-browser 5s ease-in-out infinite', margin: '0 auto' }}>
                                <div className="w-full h-full flex gap-2" style={{ animation: 'stack-columns 5s ease-in-out infinite' }}>
                                    <div className="flex-1 rounded-sm shadow-inner" style={{ backgroundColor: 'var(--theme-accent)' }}></div>
                                    <div className="flex-1 rounded-sm" style={{ backgroundColor: 'var(--theme-accent-light)' }}></div>
                                    <div className="flex-[2] rounded-sm" style={{ backgroundColor: 'var(--theme-accent-light)' }}></div>
                                </div>
                            </div>
                        </DemoPlayer>
                    )}

                    {item.advancedUI === 'graphic_spec_motion' && (
                        <DemoPlayer title="Animation Easing vs Linear" isDarkMode={isDarkMode}>
                            <div className="flex flex-col w-full max-w-[280px] gap-8 relative mt-4">
                                <div className="relative w-full h-6 border-b-2 border-dashed border-gray-300 dark:border-gray-700">
                                    <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-gray-400 shadow-md" style={{ animation: 'slide-linear 5s linear infinite' }}></div>
                                    <span className="absolute -top-5 text-[9px] font-mono text-gray-400 uppercase tracking-widest">Linear (Robotic)</span>
                                </div>
                                <div className="relative w-full h-6 border-b-2 border-dashed border-gray-300 dark:border-gray-700">
                                    <div className="absolute top-0 left-0 w-6 h-6 rounded-full shadow-lg shadow-[var(--theme-accent)]" style={{ backgroundColor: 'var(--theme-accent)', animation: 'slide-linear 5s cubic-bezier(0.87, 0, 0.13, 1) infinite' }}></div>
                                    <span className="absolute -top-5 text-[9px] font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--theme-accent)' }}>Easing (Natural)</span>
                                </div>
                            </div>
                        </DemoPlayer>
                    )}
                    
                    {item.advancedUI === 'graphic_what_is_design' && (
                        <div className={`mb-6 p-4 sm:p-6 rounded-2xl border shadow-inner flex flex-col items-center justify-center gap-4 ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            <div className="flex items-center gap-2 sm:gap-4">
                                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl border-2 flex items-center justify-center shadow-md font-serif text-xl sm:text-2xl font-bold ${isDarkMode ? 'border-[#3B82F6] text-[#3B82F6] bg-[#1E1E1E]' : 'border-[#3B82F6] text-[#3B82F6] bg-white'}`}>Aa</div>
                                <span className={`text-xl font-bold ${isDarkMode ? 'text-[#6B7280]' : 'text-[#A0A0A0]'}`}>+</span>
                                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl border-2 flex flex-col items-center justify-center shadow-md overflow-hidden ${isDarkMode ? 'border-[#10B981] bg-[#1E1E1E]' : 'border-[#10B981] bg-white'}`}>
                                    <div className="w-full h-1/2 bg-[#10B981]/20 border-b border-[#10B981]/30"></div>
                                    <div className="w-full h-1/2 bg-[#10B981]/40 flex items-end justify-center pb-1"><div className="w-4 h-4 bg-[#10B981] rounded-full"></div></div>
                                </div>
                                <span className={`text-xl font-bold ${isDarkMode ? 'text-[#6B7280]' : 'text-[#A0A0A0]'}`}>+</span>
                                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl border-2 flex items-center justify-center shadow-md ${isDarkMode ? 'border-yellow-500 bg-[#1E1E1E]' : 'border-yellow-500 bg-white'}`}>
                                    <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
                                </div>
                                <span className={`text-xl font-bold ml-1 sm:ml-2 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>=</span>
                                <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full border-4 flex items-center justify-center shadow-lg ml-1 sm:ml-2 ${isDarkMode ? 'border-[#41B6E6] bg-[#1E1E1E] shadow-[#41B6E6]/20' : 'border-[#0277C5] bg-white shadow-[#0277C5]/20'}`}>
                                    <Lightbulb className={`w-6 h-6 sm:w-10 sm:h-10 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`} />
                                </div>
                            </div>
                            <div className="flex w-full justify-between max-w-[320px] px-1 sm:px-2 mt-2">
                                <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-center w-12 sm:w-16 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Type</span>
                                <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-center w-12 sm:w-16 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Image</span>
                                <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-center w-12 sm:w-16 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Color</span>
                                <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-center w-14 sm:w-20 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}>Message</span>
                            </div>
                        </div>
                    )}

                    {item.advancedUI === 'graphic_elements' && (
                        <div className={`mb-6 p-4 rounded-2xl border shadow-inner ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                <div className={`flex flex-col items-center justify-center p-3 rounded-xl border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}><Minus className={`w-10 h-10 mb-2 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`} strokeWidth={3} /><span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Line</span></div>
                                <div className={`flex flex-col items-center justify-center p-3 rounded-xl border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}><Square className="w-10 h-10 mb-2 text-[#3B82F6]" strokeWidth={2.5} /><span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Shape</span></div>
                                <div className={`flex flex-col items-center justify-center p-3 rounded-xl border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}><Box className="w-10 h-10 mb-2 text-[#10B981]" strokeWidth={2.5} /><span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Form</span></div>
                                <div className={`flex flex-col items-center justify-center p-3 rounded-xl border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}><Palette className="w-10 h-10 mb-2 text-[#F59E0B]" strokeWidth={2.5} /><span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Color</span></div>
                                <div className={`flex flex-col items-center justify-center p-3 rounded-xl border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}><Maximize className={`w-10 h-10 mb-2 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`} strokeWidth={2} /><span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Space</span></div>
                                <div className={`flex flex-col items-center justify-center p-3 rounded-xl border shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}><Grip className="w-10 h-10 mb-2 text-[#8B5CF6]" strokeWidth={2.5} /><span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Texture</span></div>
                                <div className={`flex flex-col items-center justify-center p-3 rounded-xl border shadow-sm col-span-3 sm:col-span-2 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}><Contrast className={`w-10 h-10 mb-2 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`} strokeWidth={2.5} /><span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Value (Light / Dark)</span></div>
                            </div>
                        </div>
                    )}

                    {item.advancedUI === 'graphic_composition' && (
                        <div className={`mb-6 p-4 rounded-2xl border shadow-inner ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className={`p-4 rounded-xl border shadow-sm flex flex-col items-center ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                    <div className="w-full h-24 mb-3 border-b-2 flex items-end justify-center pb-2 relative" style={{borderColor: isDarkMode?'#6B7280':'#A0A0A0'}}><div className="absolute bottom-0 w-4 h-4 bg-current rotate-45 translate-y-2"></div><div className="w-full flex justify-between px-6"><div className="w-8 h-8 bg-[#3B82F6] rounded-md shadow-md"></div><div className={`w-8 h-8 rounded-full shadow-md ${isDarkMode ? 'bg-[#41B6E6]' : 'bg-[#0277C5]'}`}></div></div></div>
                                    <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Balance</span>
                                </div>
                                <div className={`p-4 rounded-xl border shadow-sm flex flex-col items-center ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                    <div className="w-full h-24 mb-3 flex items-center justify-center gap-6"><div className="w-16 h-16 bg-[#1A1A1A] rounded-md shadow-lg border border-white/20"></div><div className="w-6 h-6 bg-[#FFFFFF] rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] border border-gray-200"></div></div>
                                    <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Contrast</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {item.advancedUI === 'graphic_color_theory' && (
                        <div className={`mb-6 p-5 rounded-2xl border shadow-inner ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            <div className="flex flex-col lg:flex-row items-center gap-6">
                                <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
                                   <div className="absolute inset-0 rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.2)]" style={{background: 'conic-gradient(#FF0000, #FF00FF, #0000FF, #00FFFF, #00FF00, #FFFF00, #FF0000)'}}></div>
                                   <div className={`absolute w-20 h-20 rounded-full shadow-inner z-10 flex items-center justify-center ${isDarkMode ? 'bg-[#121212]' : 'bg-[#F8F9FA]'}`}><Palette className={`w-6 h-6 opacity-50 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`} /></div>
                                   <div className="absolute inset-1.5 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none z-20">
                                       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md border-2 border-black"></div>
                                       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md border-2 border-black"></div>
                                       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full border-l-2 border-dashed border-white/60"></div>
                                   </div>
                                </div>
                                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 w-full">
                                    <div className={`p-3 rounded-xl border shadow-sm flex flex-col justify-center gap-2 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                        <div className="flex rounded-md overflow-hidden shadow-sm h-5"><div className="flex-1 bg-[#0044CC]"></div><div className="flex-1 bg-[#3377FF]"></div><div className="flex-1 bg-[#99BBFF]"></div></div>
                                        <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Monochromatic</span>
                                    </div>
                                    <div className={`p-3 rounded-xl border shadow-sm flex flex-col justify-center gap-2 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                        <div className="flex rounded-md overflow-hidden shadow-sm h-5"><div className="flex-1 bg-[#FF0000]"></div><div className="flex-1 bg-[#00FFFF]"></div></div>
                                        <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Complementary</span>
                                    </div>
                                    <div className={`p-3 rounded-xl border shadow-sm flex flex-col justify-center gap-2 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                        <div className="flex rounded-md overflow-hidden shadow-sm h-5"><div className="flex-1 bg-[#FF0000]"></div><div className="flex-1 bg-[#FF6600]"></div><div className="flex-1 bg-[#FFCC00]"></div></div>
                                        <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Analogous</span>
                                    </div>
                                    <div className={`p-3 rounded-xl border shadow-sm flex flex-col justify-center gap-2 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                        <div className="flex rounded-md overflow-hidden shadow-sm h-5"><div className="flex-1 bg-[#FF0000]"></div><div className="flex-1 bg-[#0000FF]"></div><div className="flex-1 bg-[#FFFF00]"></div></div>
                                        <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Triadic</span>
                                    </div>
                                    <div className={`p-3 rounded-xl border shadow-sm flex flex-col justify-center gap-2 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                        <div className="flex rounded-md overflow-hidden shadow-sm h-5"><div className="flex-1 bg-[#FF0000]"></div><div className="flex-1 bg-[#00FF66]"></div><div className="flex-1 bg-[#0066FF]"></div></div>
                                        <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Split-Comp</span>
                                    </div>
                                    <div className={`p-3 rounded-xl border shadow-sm flex flex-col justify-center gap-2 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                        <div className="flex rounded-md overflow-hidden shadow-sm h-5"><div className="flex-1 bg-[#FF0000]"></div><div className="flex-1 bg-[#00FFFF]"></div><div className="flex-1 bg-[#FFCC00]"></div><div className="flex-1 bg-[#0000FF]"></div></div>
                                        <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Tetradic</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {item.advancedUI === 'graphic_history' && (
                        <div className={`mb-6 p-4 rounded-2xl border shadow-inner overflow-hidden ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            <div className="flex flex-col space-y-4 sm:space-y-6 relative py-2">
                                <div className={`absolute left-6 -translate-x-1/2 top-4 bottom-4 w-0.5 z-0 ${isDarkMode ? 'bg-[#2C2C2C]' : 'bg-[#E5E7EB]'}`}></div>
                                
                                <div className="relative z-10 flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#10B981] to-[#047857] text-white flex items-center justify-center font-bold text-[11px] shrink-0 shadow-lg border-4 border-current" style={{borderColor: isDarkMode ? '#121212' : '#F8F9FA'}}>1880s</div>
                                    <div className={`p-4 rounded-xl border shadow-sm flex-1 mt-1 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                        <span className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Arts & Crafts</span>
                                    </div>
                                </div>
                                <div className="relative z-10 flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0277C5] to-[#01579B] text-white flex items-center justify-center font-bold text-[11px] shrink-0 shadow-lg border-4 border-current" style={{borderColor: isDarkMode ? '#121212' : '#F8F9FA'}}>1919</div>
                                    <div className={`p-4 rounded-xl border shadow-sm flex-1 mt-1 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                        <span className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Bauhaus</span>
                                    </div>
                                </div>
                                <div className="relative z-10 flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white flex items-center justify-center font-bold text-[11px] shrink-0 shadow-lg border-4 border-current" style={{borderColor: isDarkMode ? '#121212' : '#F8F9FA'}}>1920s</div>
                                    <div className={`p-4 rounded-xl border shadow-sm flex-1 mt-1 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                        <span className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Art Deco</span>
                                    </div>
                                </div>
                                <div className="relative z-10 flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white flex items-center justify-center font-bold text-[11px] shrink-0 shadow-lg border-4 border-current" style={{borderColor: isDarkMode ? '#121212' : '#F8F9FA'}}>1950s</div>
                                    <div className={`p-4 rounded-xl border shadow-sm flex-1 mt-1 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                        <span className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Swiss Design</span>
                                    </div>
                                </div>
                                <div className="relative z-10 flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EC4899] to-[#BE185D] text-white flex items-center justify-center font-bold text-[11px] shrink-0 shadow-lg border-4 border-current" style={{borderColor: isDarkMode ? '#121212' : '#F8F9FA'}}>1970s</div>
                                    <div className={`p-4 rounded-xl border shadow-sm flex-1 mt-1 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                        <span className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Post-Modernism</span>
                                    </div>
                                </div>
                                <div className="relative z-10 flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-white flex items-center justify-center font-bold text-[11px] shrink-0 shadow-lg border-4 border-current" style={{borderColor: isDarkMode ? '#121212' : '#F8F9FA'}}>1990s</div>
                                    <div className={`p-4 rounded-xl border shadow-sm flex-1 mt-1 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                        <span className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Digital Era</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {item.advancedUI === 'graphic_typo_anatomy' && (
                        <div className={`mb-6 p-6 rounded-2xl border shadow-inner overflow-hidden relative ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            <div className="relative h-32 flex items-center justify-center font-serif text-[100px] leading-none select-none">
                                <div className={`absolute w-full border-t-2 border-dashed top-4 ${isDarkMode ? 'border-[#41B6E6]/60' : 'border-[#0277C5]/60'}`}></div>
                                <div className="absolute w-full border-t-2 border-dashed border-[#3B82F6]/60 top-[52px]"></div>
                                <div className="absolute w-full border-t-2 border-solid border-[#10B981]/80 bottom-4"></div>
                                <span className={`relative z-10 pb-2 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Hpx</span>
                                <div className={`absolute left-4 top-1 text-[10px] font-bold ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}>Cap Height</div>
                                <div className="absolute left-4 top-[38px] text-[10px] font-bold text-[#3B82F6]">X-Height</div>
                                <div className="absolute left-4 bottom-5 text-[10px] font-bold text-[#10B981]">Baseline</div>
                            </div>
                        </div>
                    )}

                    {item.advancedUI === 'graphic_typo_expressive' && (
                        <div className={`mb-6 p-8 rounded-2xl border shadow-inner flex items-center justify-center h-32 ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            <div className={`text-4xl font-black tracking-tighter flex items-end ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                                <span>F</span><span>A</span><span>L</span><span className={`transform translate-y-4 rotate-12 transition-transform hover:translate-y-8 duration-500 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}>L</span>
                            </div>
                        </div>
                    )}

                    {item.advancedUI === 'graphic_typo_variable' && (
                        <div className={`mb-6 p-6 rounded-2xl border shadow-inner flex flex-col items-center gap-4 ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            <div className={`flex justify-between w-full text-4xl items-center ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}>
                                <span className="font-sans font-thin">A</span>
                                <span className="font-sans font-normal">A</span>
                                <span className="font-sans font-bold">A</span>
                                <span className="font-sans font-black">A</span>
                            </div>
                            <div className={`w-full h-1.5 rounded-full bg-gradient-to-r ${isDarkMode ? 'from-[#41B6E6]/20 to-[#41B6E6]' : 'from-[#0277C5]/20 to-[#0277C5]'}`}></div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Weight Slider</span>
                        </div>
                    )}

                    {item.advancedUI === 'graphic_software_ai' && (
                        <div className={`mb-6 p-6 rounded-2xl border shadow-inner flex flex-col items-center justify-center bg-gradient-to-r ${isDarkMode ? 'from-[#1E1E1E] to-[#2C2C2C] border-[#2C2C2C]' : 'from-[#F8F9FA] to-white border-[#E5E7EB]'}`}>
                            <div className="relative">
                                <Sparkles className="w-12 h-12 text-[#C5B002] animate-pulse" />
                                <div className="absolute inset-0 bg-[#C5B002] blur-xl opacity-20 rounded-full"></div>
                            </div>
                            <div className={`mt-4 px-6 py-2 rounded-full border text-xs font-bold font-mono shadow-sm ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C] text-[#F1F1F1]' : 'bg-white border-[#E5E7EB] text-[#1A1A1A]'}`}>
                                /generate logo --cyberpunk
                            </div>
                        </div>
                    )}

                    {item.advancedUI === 'graphic_spec_branding' && (
                        <div className={`mb-6 p-6 rounded-2xl border shadow-inner flex items-center justify-between overflow-x-auto no-scrollbar ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            <div className="flex flex-col items-center gap-2 shrink-0"><div className={`w-10 h-10 rounded-lg rotate-45 shadow-lg flex items-center justify-center ${isDarkMode ? 'bg-[#41B6E6]' : 'bg-[#0277C5]'}`}><div className="w-3 h-3 bg-white rounded-full -rotate-45"></div></div><span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Logo</span></div>
                            <span className={`font-bold shrink-0 mx-2 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}>+</span>
                            <div className="flex flex-col items-center gap-2 shrink-0"><div className="flex shadow-md rounded-lg overflow-hidden"><div className="w-4 h-10 bg-[#3B82F6]"></div><div className="w-4 h-10 bg-[#10B981]"></div><div className="w-4 h-10 bg-[#C5B002]"></div></div><span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Color</span></div>
                            <span className={`font-bold shrink-0 mx-2 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}>+</span>
                            <div className="flex flex-col items-center gap-2 shrink-0"><div className={`w-10 h-10 border-2 rounded-lg flex items-center justify-center font-serif font-bold text-xl shadow-sm bg-white/5 ${isDarkMode ? 'text-[#41B6E6] border-[#41B6E6]' : 'text-[#0277C5] border-[#0277C5]'}`}>Aa</div><span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Voice</span></div>
                            <span className={`font-black text-xl shrink-0 mx-3 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>=</span>
                            <div className="flex flex-col items-center gap-2 shrink-0"><div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 shadow-xl ${isDarkMode ? 'bg-[#41B6E6] border-[#1E1E1E]' : 'bg-[#0277C5] border-white'}`}><Globe className="w-6 h-6 text-white" /></div><span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Brand</span></div>
                        </div>
                    )}

                    {/* 🌟 OVERHAULED PRINT DESIGN VECTOR ANIMATION 🌟 */}
                    {item.advancedUI === 'graphic_spec_print' && (
                        <div className={`mb-6 p-6 sm:p-8 rounded-2xl border shadow-inner flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 relative overflow-hidden ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            
                            <div className="relative w-32 h-44 flex items-center justify-center">
                                {/* The Bleed Box (Animated Dashed Line) */}
                                <div className="absolute inset-0 flex justify-center">
                                    <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <rect x="2" y="2" width="96" height="96" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="8,6" strokeLinecap="round" style={{ animation: 'draw-bleed 3s linear infinite' }} />
                                    </svg>
                                    <span className="absolute -top-3 text-[10px] font-black text-[#EF4444] uppercase tracking-[0.2em] bg-transparent">Bleed Margin</span>
                                </div>
                                
                                {/* The Final Cut Document (Solid Line) */}
                                <div className={`absolute w-[80%] h-[85%] border-[3px] border-solid rounded-md flex items-center justify-center shadow-2xl z-10 ${isDarkMode ? 'bg-[#1E1E1E] border-[#4A4A4C]' : 'bg-white border-[#D1D5DB]'}`}>
                                    
                                    {/* The Safe Margin Box (Dotted Line) */}
                                    <div className="w-[82%] h-[88%] border-[1.5px] border-[#3B82F6] border-dashed opacity-80 flex flex-col items-center justify-center gap-2 relative">
                                        <span className="absolute bottom-2 text-[7px] font-black text-[#3B82F6] uppercase tracking-wider">Safe Zone</span>
                                        <div className={`w-12 h-1.5 rounded-full ${isDarkMode ? 'bg-[#4A4A4C]' : 'bg-[#E5E7EB]'}`}></div>
                                        <div className={`w-8 h-1.5 rounded-full ${isDarkMode ? 'bg-[#4A4A4C]' : 'bg-[#E5E7EB]'}`}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Premium CMYK Color Spheres */}
                            <div className="flex flex-col gap-3 items-center z-10">
                                <div className="flex relative">
                                    <div className="w-6 h-6 rounded-full bg-[#00FFFF] shadow-inner mix-blend-screen absolute -left-4 opacity-90 border border-white/20"></div>
                                    <div className="w-6 h-6 rounded-full bg-[#FF00FF] shadow-inner mix-blend-screen absolute left-0 opacity-90 border border-white/20"></div>
                                    <div className="w-6 h-6 rounded-full bg-[#FFFF00] shadow-inner mix-blend-multiply absolute left-4 opacity-90 border border-white/20"></div>
                                    <div className="w-6 h-6 rounded-full bg-[#000000] shadow-inner mix-blend-normal absolute left-8 opacity-90 border border-white/20"></div>
                                </div>
                                <span className={`text-[11px] font-black uppercase tracking-[0.3em] mt-6 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>CMYK</span>
                            </div>
                        </div>
                    )}

                    {/* 🌟 OVERHAULED PACKAGING 3D FOLD ANIMATION 🌟 */}
                    {item.advancedUI === 'graphic_spec_packaging' && (
                        <div className={`mb-6 p-8 rounded-2xl border shadow-inner flex flex-col md:flex-row items-center justify-center gap-10 overflow-hidden ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            
                            {/* The 2D Flat Die-Line */}
                            <div className="relative w-32 h-32 flex flex-col items-center justify-center">
                                <div className={`w-14 h-24 border-[2px] border-dashed flex items-center justify-center relative ${isDarkMode ? 'border-[#6B7280] bg-[#1E1E1E]' : 'border-[#A0A0A0] bg-white'}`}>
                                    {/* Flaps */}
                                    <div className="absolute -top-5 w-10 h-5 border-[2px] border-dashed border-b-0 border-current rounded-t-lg"></div>
                                    <div className="absolute -bottom-5 w-10 h-5 border-[2px] border-dashed border-t-0 border-current rounded-b-lg"></div>
                                    <div className="absolute -left-6 w-6 h-20 border-[2px] border-dashed border-r-0 border-current rounded-l-md"></div>
                                    <div className="absolute -right-6 w-6 h-20 border-[2px] border-dashed border-l-0 border-current rounded-r-md"></div>
                                    <span className={`text-[9px] font-black uppercase tracking-wider text-center leading-tight ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>2D<br/>Die-Line</span>
                                </div>
                            </div>
                            
                            <ChevronRight className={`hidden md:block w-8 h-8 ${isDarkMode ? 'text-[#3A3A3C]' : 'text-[#D1D5DB]'}`} />
                            
                            {/* The 3D Folding Box Animation */}
                            <div className="w-28 h-28 relative transform perspective-1000 rotate-x-[15deg] rotate-y-[-25deg] transform-style-3d group hover:rotate-y-[25deg] transition-transform duration-[1500ms] ease-out">
                                {/* Front Face */}
                                <div className={`absolute inset-0 bg-gradient-to-br border shadow-2xl flex items-center justify-center transform translate-z-[14px] rounded-sm z-20 ${isDarkMode ? 'from-[#41B6E6] to-[#0277C5] border-white/20' : 'from-[#0277C5] to-[#01579B] border-black/10'}`}>
                                    <span className="text-white font-black text-sm tracking-widest">PRODUCT</span>
                                </div>
                                {/* Top Flap (Animated Fold) */}
                                <div className={`absolute top-0 left-0 right-0 h-[28px] border transform origin-top rounded-sm shadow-inner z-10 ${isDarkMode ? 'bg-[#76CFF0] border-white/40' : 'bg-[#41B6E6] border-white/40'}`} style={{ animation: 'fold-box-top 4s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite alternate' }}></div>
                                {/* Bottom Flap */}
                                <div className={`absolute bottom-0 left-0 right-0 h-[28px] border transform origin-bottom rotate-x-90 rounded-sm shadow-inner ${isDarkMode ? 'bg-[#01579B] border-black/30' : 'bg-[#013f70] border-black/20'}`}></div>
                                {/* Left Flap (Animated Fold) */}
                                <div className={`absolute top-0 left-0 bottom-0 w-[28px] border transform origin-left rounded-sm shadow-inner z-10 ${isDarkMode ? 'bg-[#0277C5] border-black/20' : 'bg-[#01579B] border-black/10'}`} style={{ animation: 'fold-box-left 4s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite alternate 0.2s' }}></div>
                                {/* Right Flap (Animated Fold) */}
                                <div className={`absolute top-0 right-0 bottom-0 w-[28px] border transform origin-right rounded-sm shadow-inner z-10 ${isDarkMode ? 'bg-[#0277C5] border-black/20' : 'bg-[#01579B] border-black/10'}`} style={{ animation: 'fold-box-right 4s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite alternate 0.4s' }}></div>
                            </div>
                        </div>
                    )}

                    {item.advancedUI === 'graphic_spec_info' && (
                        <div className={`mb-6 p-6 rounded-2xl border shadow-inner flex items-end justify-center gap-3 h-40 ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            <div className="w-8 bg-[#3B82F6] rounded-t-md shadow-lg h-[30%] relative group hover:h-[40%] transition-all duration-300"><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 text-[#3B82F6]">30%</span></div>
                            <div className="w-8 bg-[#10B981] rounded-t-md shadow-lg h-[60%] relative group hover:h-[70%] transition-all duration-300"><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 text-[#10B981]">60%</span></div>
                            <div className={`w-8 rounded-t-md shadow-lg h-[90%] relative group hover:h-[100%] transition-all duration-300 ${isDarkMode ? 'bg-[#41B6E6]' : 'bg-[#0277C5]'}`}><span className={`absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}>90%</span></div>
                            <div className="w-8 bg-[#C5B002] rounded-t-md shadow-lg h-[50%] relative group hover:h-[60%] transition-all duration-300"><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 text-[#C5B002]">50%</span></div>
                        </div>
                    )}

                    {item.advancedUI === 'graphic_prof_process' && (
                        <div className={`mb-6 p-8 rounded-2xl border shadow-inner flex flex-wrap items-center justify-center gap-2 sm:gap-4 ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            <div className="flex flex-col items-center gap-2"><div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${isDarkMode ? 'border-[#3B82F6] bg-[#1E1E1E]' : 'border-[#3B82F6] bg-white'}`}><Search className="w-5 h-5 text-[#3B82F6]" /></div><span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider ${isDarkMode?'text-[#A0A0A0]':'text-[#6B7280]'}`}>Research</span></div>
                            <div className={`h-0.5 w-4 sm:w-8 border-t-2 border-dashed mb-5 ${isDarkMode ? 'border-[#6B7280]' : 'border-[#A0A0A0]'}`}></div>
                            <div className="flex flex-col items-center gap-2"><div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${isDarkMode ? 'border-[#C5B002] bg-[#1E1E1E]' : 'border-[#C5B002] bg-white'}`}><Lightbulb className="w-5 h-5 text-[#C5B002]" /></div><span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider ${isDarkMode?'text-[#A0A0A0]':'text-[#6B7280]'}`}>Ideate</span></div>
                            <div className={`h-0.5 w-4 sm:w-8 border-t-2 border-dashed mb-5 ${isDarkMode ? 'border-[#6B7280]' : 'border-[#A0A0A0]'}`}></div>
                            <div className="flex flex-col items-center gap-2"><div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${isDarkMode ? 'border-[#41B6E6] bg-[#1E1E1E]' : 'border-[#0277C5] bg-white'}`}><PenTool className={`w-4 h-4 ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`} /></div><span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider ${isDarkMode?'text-[#A0A0A0]':'text-[#6B7280]'}`}>Sketch</span></div>
                            <div className={`h-0.5 w-4 sm:w-8 border-t-2 border-dashed mb-5 ${isDarkMode ? 'border-[#6B7280]' : 'border-[#A0A0A0]'}`}></div>
                            <div className="flex flex-col items-center gap-2"><div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)] ${isDarkMode ? 'border-[#10B981] bg-[#1E1E1E]' : 'border-[#10B981] bg-white'}`}><Star className="w-6 h-6 text-[#10B981]" fill="currentColor" /></div><span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#10B981]`}>Execute</span></div>
                        </div>
                    )}

                    {item.advancedUI === 'graphic_prof_feedback' && (
                        <div className={`mb-6 p-6 rounded-2xl border shadow-inner flex items-center justify-center gap-6 ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            <div className={`relative p-4 rounded-2xl border ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                <div className={`w-16 h-16 rounded-xl flex items-center justify-center border ${isDarkMode ? 'bg-[#41B6E6]/20 border-[#41B6E6]/50' : 'bg-[#0277C5]/20 border-[#0277C5]/50'}`}><Layout className={isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'} /></div>
                                <div className="absolute -top-4 -right-8 bg-red-100 text-red-600 text-[9px] font-bold px-2 py-1 rounded-full shadow-md animate-bounce" style={{animationDelay: '100ms'}}>Make logo bigger!</div>
                                <div className="absolute -bottom-3 -left-6 bg-blue-100 text-blue-600 text-[9px] font-bold px-2 py-1 rounded-full shadow-md animate-bounce" style={{animationDelay: '400ms'}}>Change color?</div>
                            </div>
                        </div>
                    )}

                    {item.advancedUI === 'graphic_prof_portfolio' && (
                        <div className={`mb-6 p-4 rounded-2xl border shadow-inner grid grid-cols-3 gap-2 ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            <div className={`aspect-square rounded-lg bg-gradient-to-br ${isDarkMode ? 'from-[#41B6E6] to-[#0277C5]' : 'from-[#0277C5] to-[#01579B]'} opacity-80 hover:opacity-100 transition-opacity shadow-sm flex flex-col justify-end p-2`}><div className="w-1/2 h-1.5 bg-white/50 rounded"></div></div>
                            <div className={`aspect-square rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] opacity-80 hover:opacity-100 transition-opacity shadow-sm flex flex-col justify-end p-2`}><div className="w-2/3 h-1.5 bg-white/50 rounded"></div></div>
                            <div className={`aspect-square rounded-lg bg-gradient-to-br from-[#10B981] to-[#34D399] opacity-80 hover:opacity-100 transition-opacity shadow-sm flex flex-col justify-end p-2`}><div className="w-1/3 h-1.5 bg-white/50 rounded"></div></div>
                            <div className={`aspect-square rounded-lg bg-gradient-to-br from-purple-500 to-purple-400 opacity-80 hover:opacity-100 transition-opacity shadow-sm flex flex-col justify-end p-2`}><div className="w-3/4 h-1.5 bg-white/50 rounded"></div></div>
                            <div className={`col-span-2 rounded-lg bg-gradient-to-r from-[#2C2C2C] to-[#6B7280] opacity-80 hover:opacity-100 transition-opacity shadow-sm flex items-center justify-center`}><span className="text-white/70 text-xs font-bold uppercase tracking-wider">Case Study ➜</span></div>
                        </div>
                    )}

                    {item.advancedUI === 'graphic_prof_business' && (
                        <div className={`mb-6 p-6 rounded-2xl border shadow-inner flex justify-center gap-6 ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                            <div className={`w-20 h-28 border-2 rounded-lg relative flex flex-col items-center pt-3 shadow-md transform -rotate-6 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                <div className="w-8 h-8 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981] font-black mb-2">$</div>
                                <div className={`w-12 h-1 rounded mb-1 ${isDarkMode ? 'bg-[#3A3A3C]' : 'bg-gray-200'}`}></div>
                                <div className={`w-10 h-1 rounded ${isDarkMode ? 'bg-[#3A3A3C]' : 'bg-gray-200'}`}></div>
                                <span className={`absolute bottom-2 text-[8px] font-bold uppercase ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Invoice</span>
                            </div>
                            <div className={`w-20 h-28 border-2 rounded-lg relative flex flex-col items-center pt-4 shadow-xl transform rotate-6 z-10 ${isDarkMode ? 'bg-[#1E1E1E] border-[#41B6E6]/50' : 'bg-white border-[#0277C5]/30'}`}>
                                <div className={`w-12 h-1 rounded mb-2 ${isDarkMode ? 'bg-[#6B7280]' : 'bg-gray-300'}`}></div>
                                <div className={`w-14 h-1 rounded mb-2 ${isDarkMode ? 'bg-[#6B7280]' : 'bg-gray-300'}`}></div>
                                <div className={`w-10 h-1 rounded mb-4 ${isDarkMode ? 'bg-[#6B7280]' : 'bg-gray-300'}`}></div>
                                <div className="w-12 h-4 border-b-2 border-blue-500 font-script text-[8px] text-blue-500 leading-none flex items-end">Signed</div>
                                <span className={`absolute bottom-2 text-[8px] font-bold uppercase ${isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]'}`}>Contract</span>
                            </div>
                        </div>
                    )}

                    {item.advancedUI === 'graphic_prof_ethics' && (
                        <div className={`mb-6 p-4 rounded-2xl border shadow-inner grid grid-cols-2 gap-4 ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                             <div className={`p-5 rounded-xl border flex flex-col items-center justify-center gap-3 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center"><X className="w-6 h-6 text-red-500" strokeWidth={2.5} /></div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Copyright</span>
                             </div>
                             <div className={`p-5 rounded-xl border flex flex-col items-center justify-center gap-3 ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E5E7EB]'}`}>
                                <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center"><Check className="w-6 h-6 text-[#10B981]" strokeWidth={3} /></div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>Eco-Design</span>
                             </div>
                        </div>
                    )}

                    {!item.advancedUI && item.image && (
                        <div className={`mb-6 w-full overflow-hidden rounded-2xl border shadow-sm ${isDarkMode ? 'border-[#2C2C2C]' : 'border-[#E5E7EB]'}`}>
                            <img src={item.image} crossOrigin="anonymous" alt={item.tool} className="w-full h-auto object-cover max-h-[250px]" loading="lazy" />
                        </div>
                    )}
                    
                    <p className={`text-[14px] sm:text-[15px] leading-relaxed whitespace-pre-wrap ${lang === 'km' ? 'font-khmer' : 'font-sans'} ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{displayDesc}</p>
                    
                    {/* 🌟 THE PRACTICE ACTION BUTTON 🌟 */}
                    {item.practiceTool && (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                triggerHaptic();
                                window.dispatchEvent(new CustomEvent('switchTab', { detail: item.practiceTool.tab }));
                                setTimeout(() => {
                                    window.dispatchEvent(new CustomEvent('switchToolSubTab', { detail: item.practiceTool.subTab }));
                                }, 150); // Small delay allows the tab to render first
                            }}
                            className={`mt-8 w-full py-4 rounded-2xl font-khmer font-bold text-[14.5px] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 ${isDarkMode ? 'bg-[#41B6E6] text-[#121212] hover:bg-[#329DCA]' : 'bg-[#0277C5] text-white hover:bg-[#015B96]'}`}
                        >
                            <Sparkles size={18} />
                            {lang === 'en' ? item.practiceTool.label_en : item.practiceTool.label}
                            <ChevronRight size={18} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}