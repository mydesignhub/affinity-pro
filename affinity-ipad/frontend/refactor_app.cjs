const fs = require('fs');

const path = 'd:\\My App\\Affinity iPad\\affinity-ipad\\frontend\\src\\App.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add Suspense
content = content.replace(
    "import React, { useState, useEffect, useRef } from 'react';",
    "import React, { useState, useEffect, useRef, Suspense } from 'react';"
);

// 2. Replace static imports with lazy
const oldImports = `import Header from './components/layout/Header';
import ToolsView from './components/features/tools/ToolsView';
import Test from './components/features/quiz/Test';
import ChatBot from './components/features/ai/ChatBot';
import LessonCard from './components/features/learn/LessonCard';
import PremiumModal from './components/features/premium/PremiumModal';`;

const newImports = `import Header from './components/layout/Header';
import LessonCard from './components/features/learn/LessonCard';
import LessonModal from './components/features/learn/LessonModal';
import TipsSection from './components/features/learn/TipsSection';
import ContactSection from './components/layout/ContactSection';
import { triggerHaptic } from './utils/haptics';

const ToolsView = React.lazy(() => import('./components/features/tools/ToolsView'));
const Test = React.lazy(() => import('./components/features/quiz/Test'));
const ChatBot = React.lazy(() => import('./components/features/ai/ChatBot'));
const PremiumModal = React.lazy(() => import('./components/features/premium/PremiumModal'));`;

content = content.replace(oldImports, newImports);

// 3. Remove triggerHaptic, LessonModal, TipsSection, ContactSection inline definitions
const markerStart = "const triggerHaptic = (type = 'light') => {";
const markerEnd = "// ==========================================\n// 3. MAIN APP CONTENT";

const startIndex = content.indexOf(markerStart);
const endIndex = content.indexOf(markerEnd);

if (startIndex !== -1 && endIndex !== -1) {
    const toRemove = content.substring(startIndex, endIndex);
    const replacement = `const APP_THEMES = {
    photo: { gradient: 'from-[#B52885] to-[#223180]', text: 'text-[#B52885]', bg: 'bg-[#B52885]', border: 'border-[#B52885]', lightBg: 'bg-[#B52885]/10' },
    designer: { gradient: 'from-[#2862B5] to-[#F4B32A]', text: 'text-[#2862B5]', bg: 'bg-[#2862B5]', border: 'border-[#2862B5]', lightBg: 'bg-[#2862B5]/10' },
    publisher: { gradient: 'from-[#D7383D] to-[#532463]', text: 'text-[#D7383D]', bg: 'bg-[#D7383D]', border: 'border-[#D7383D]', lightBg: 'bg-[#D7383D]/10' }
};

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

`;
    content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
}

// 4. Wrap PremiumModal in Suspense
const oldPremiumModal = `<PremiumModal
                    activeAppTab={activeAppTab}
                    isCoursePurchased={isCoursePurchased}
                    theme={theme}
                    appDisplayName={appDisplayName}
                    isDarkMode={isDarkMode}
                    showAdminPanel={showAdminPanel}
                    purchasedCourses={purchasedCourses}
                    setPurchasedCourses={setPurchasedCourses}
                    user={user}
                    setUser={setUser}
                    setIsSuperAdmin={setShowAdminPanel}
                    handleSignOutDevice={handleSignOutDevice}
                    triggerHaptic={triggerHaptic}
                />`;

const newPremiumModal = `<Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="animate-spin text-[#0277C5] w-8 h-8" /></div>}>
                    <PremiumModal
                        activeAppTab={activeAppTab}
                        isCoursePurchased={isCoursePurchased}
                        theme={theme}
                        appDisplayName={appDisplayName}
                        isDarkMode={isDarkMode}
                        showAdminPanel={showAdminPanel}
                        purchasedCourses={purchasedCourses}
                        setPurchasedCourses={setPurchasedCourses}
                        user={user}
                        setUser={setUser}
                        setIsSuperAdmin={setShowAdminPanel}
                        handleSignOutDevice={handleSignOutDevice}
                        triggerHaptic={triggerHaptic}
                    />
                </Suspense>`;
content = content.replace(oldPremiumModal, newPremiumModal);

// 5. Wrap ToolsView in Suspense
const oldToolsView = `{activeTab === 'tools' && <div className="relative z-10"><ToolsView isDarkMode={isDarkMode} /></div>}`;
const newToolsView = `{activeTab === 'tools' && <div className="relative z-10"><Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="animate-spin w-8 h-8 opacity-50" /></div>}><ToolsView isDarkMode={isDarkMode} /></Suspense></div>}`;
content = content.replace(oldToolsView, newToolsView);

// 6. Wrap Test in Suspense
const oldTest = `{activeTab === 'quiz' && <div className="relative z-10"><Test isDarkMode={isDarkMode} isAdmin={false} /></div>}`;
const newTest = `{activeTab === 'quiz' && <div className="relative z-10"><Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="animate-spin w-8 h-8 opacity-50" /></div>}><Test isDarkMode={isDarkMode} isAdmin={false} /></Suspense></div>}`;
content = content.replace(oldTest, newTest);

// 7. Wrap ChatBot in Suspense
const oldChatBot = `<ChatBot messages={chatMessages} setMessages={setChatMessages} isDarkMode={isDarkMode} liveAiData={liveAiData} setLiveAiData={setLiveAiData} isAdmin={false} />`;
const newChatBot = `<Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="animate-spin w-8 h-8 opacity-50" /></div>}><ChatBot messages={chatMessages} setMessages={setChatMessages} isDarkMode={isDarkMode} liveAiData={liveAiData} setLiveAiData={setLiveAiData} isAdmin={false} /></Suspense>`;
content = content.replace(oldChatBot, newChatBot);

fs.writeFileSync(path, content, 'utf8');
console.log('App.jsx successfully refactored');
