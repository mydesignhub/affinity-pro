import React, { createContext, useState, useContext, useEffect } from 'react';

export const translations = {
  km: {
    ai_name: "AI Assistant", online: "Online", placeholder: "សួរសំណួរ...", clear_confirm: "តើអ្នកពិតជាចង់លុបប្រវត្តិសន្ទនាមែនទេ?",
    thanks_feedback: "អរគុណសម្រាប់មតិកែលម្អ! 👍", recorded_issue: "យើងបានកត់ត្រាបញ្ហានេះដើម្បីកែលម្អ។ 🛠️", clear_tooltip: "លុបប្រវត្តិឆាត", refresh_tooltip: "ផ្លាស់ប្តូរសំណួរណែនាំ",
    tab_learn: "មេរៀន", tab_quiz: "តេស្ត", tab_tools: "ឧបករណ៍", tab_ai: "AI",
    title_main: "Affinity Masterclass", subtitle_main: "រៀនពីមូលដ្ឋានគ្រឹះដល់កម្រិតខ្ពស់ នៃការរចនាក្រាហ្វិកកំរិតស្ដង់ដា។",
    tips_title: "គន្លឹះបន្ថែម (Tips)", tips_pro: "គន្លឹះពិសេស (Pro Tip)", tips_new: "គន្លឹះថ្មី", tips_shortcut: "គន្លឹះប្រើកម្មវិធី (Shortcut Tricks)",
    footer_copy: "© 2026 My Affinity. Crafted with Passion.",
    tip_1_title: "Zoom In / Zoom Out៖", tip_1_desc: "ប្រើ `Ctrl/Cmd` + `+` ឬ `-` ឬចុច `Alt` រួចអូស Mouse Wheel ដើម្បីពង្រីកឬបង្រួមផ្ទាំងការងារយ៉ាងរហ័ស។",
    tip_2_title: "Undo / Redo៖", tip_2_desc: "ចុច `Ctrl/Cmd` + `Z` ដើម្បីថយក្រោយ ១ ជំហាន និង `Ctrl/Cmd` + `Shift` + `Z` ដើម្បីទៅមុខវិញបើកែខុស។",
    tip_3_title: "Group Layers៖", tip_3_desc: "ជ្រើសរើស Layers ដែលអ្នកចង់បាន រួចចុច `Ctrl/Cmd` + `G` ដើម្បីចងវាជាក្រុម ធ្វើឱ្យការងារមានរបៀបរៀបរយ។",
    tip_4_title: "Save ឱ្យបានញឹកញាប់៖", tip_4_desc: "កុំភ្លេចចុច `Ctrl/Cmd` + `S` ឱ្យបានញឹកញាប់ ដើម្បីការពារការបាត់បង់ទិន្នន័យពេលកុំព្យូទ័រគាំង ឬដាច់ភ្លើង។",
    // TOOLS SECTION
    tools_title: "ឧបករណ៍ជំនួយ", tools_subtitle: "បង្កើតពណ៌ គំរូប្លង់ និងខ្នាតស្តង់ដារយ៉ាងងាយស្រួល។",
    tools_color: "ពណ៌ (COLOR)", tools_layout: "ប្លង់ (LAYOUT)", tools_sizes: "ខ្នាត (SIZES)",
    tools_swatches: "បន្សំពណ៌ (Swatches)", tools_export_pdf: "ទាញយកឯកសារ PDF", tools_generating: "កំពុងបង្កើត PDF...",
    tools_orientation: "ទិសដៅក្រដាស (Orientation)", tools_landscape: "LANDSCAPE", tools_portrait: "PORTRAIT", tools_square: "SQUARE",
    tools_platform: "បណ្តាញសង្គម / ប្រភេទ", tools_px: "ទំហំ (Pixels)", tools_ratio: "សមាមាត្រ (Ratio)",
    tools_select_all: "ជ្រើសរើសទាំងអស់", tools_deselect_all: "ដកចេញទាំងអស់",
    // QUIZ SECTION
    quiz_title: "តេស្តសមត្ថភាព", quiz_subtitle: "សាកល្បងចំណេះដឹងរបស់អ្នកលើការរចនាក្រាហ្វិក",
    quiz_highscore: "កំណត់ត្រាខ្ពស់បំផុត", quiz_pts: "ពិន្ទុ", quiz_diff: "កម្រិតលំបាក", quiz_amt: "ចំនួនសំណួរ",
    quiz_start: "ចាប់ផ្ដើម", quiz_mixed: "គ្រប់កម្រិតទាំងអស់ (Mixed)", quiz_beg: "កម្រិតមូលដ្ឋាន (Beginner)",
    quiz_int: "កម្រិតមធ្យម (Intermediate)", quiz_adv: "កម្រិតខ្ពស់ (Advanced)", quiz_q: "សំណួរ",
    quiz_review: "ការត្រួតពិនិត្យ & ការណែនាំ", quiz_advice: "ការណែនាំសម្រាប់អ្នក៖",
    quiz_good: "អ្នកយល់ដឹងពីមុខវិជ្ជា Graphic Design បានល្អខ្លាំងណាស់! 🎉", quiz_bad: "អ្នកគួរតែចំណាយពេលអាន 'មេរៀន' បន្ថែមបន្តិចទៀត។ កុំបារម្ភ ការហាត់អនុវត្តញឹកញាប់នឹងធ្វើឱ្យអ្នកពូកែ! 💪",
    quiz_awesome: "អស្ចារ្យណាស់!", quiz_try: "ព្យាយាមទៀត!", quiz_record: "🎉 កំណត់ត្រាថ្មី!",
    quiz_score_msg: "អ្នកឆ្លើយត្រូវ", quiz_view_ans: "មើលចម្លើយ និង ការណែនាំ", quiz_restart: "សាកល្បងម្តងទៀត"
  },
  en: {
    ai_name: "AI Assistant", online: "Online", placeholder: "Ask a question...", clear_confirm: "Are you sure you want to clear chat history?",
    thanks_feedback: "Thanks for your feedback! 👍", recorded_issue: "We've recorded this issue for improvement. 🛠️", clear_tooltip: "Clear chat history", refresh_tooltip: "Refresh suggestions",
    tab_learn: "Learn", tab_quiz: "Quiz", tab_tools: "Tools", tab_ai: "AI",
    title_main: "Affinity Masterclass", subtitle_main: "Master graphic design from basic to advanced professional levels.",
    tips_title: "Additional Tips", tips_pro: "Daily Tip", tips_new: "Next Tip", tips_shortcut: "Shortcut Tricks",
    footer_copy: "© 2026 My Affinity. Crafted with Passion.",
    tip_1_title: "Zoom In / Zoom Out:", tip_1_desc: "Use `Ctrl/Cmd` + `+` or `-`, or hold `Alt` and scroll the mouse wheel to quickly zoom your canvas.",
    tip_2_title: "Undo / Redo:", tip_2_desc: "Press `Ctrl/Cmd` + `Z` to step backward, and `Ctrl/Cmd` + `Shift` + `Z` to step forward.",
    tip_3_title: "Group Layers:", tip_3_desc: "Select multiple layers and press `Ctrl/Cmd` + `G` to group them and keep your workspace organized.",
    tip_4_title: "Save Often:", tip_4_desc: "Press `Ctrl/Cmd` + `S` frequently to prevent data loss in case of a crash or power outage.",
    // TOOLS SECTION
    tools_title: "Design Tools", tools_subtitle: "Generate colors, layouts, and standard sizes easily.",
    tools_color: "COLOR", tools_layout: "LAYOUT", tools_sizes: "SIZES",
    tools_swatches: "Color Swatches", tools_export_pdf: "Export to PDF", tools_generating: "Generating PDF...",
    tools_orientation: "Canvas Orientation", tools_landscape: "LANDSCAPE", tools_portrait: "PORTRAIT", tools_square: "SQUARE",
    tools_platform: "Platform / Type", tools_px: "Size (Pixels)", tools_ratio: "Ratio",
    tools_select_all: "Select All", tools_deselect_all: "Deselect All",
    // QUIZ SECTION
    quiz_title: "Knowledge Quiz", quiz_subtitle: "Test your graphic design knowledge.",
    quiz_highscore: "Highest Score", quiz_pts: "Pts", quiz_diff: "Difficulty Level", quiz_amt: "Number of Questions",
    quiz_start: "Start Quiz", quiz_mixed: "All Levels (Mixed)", quiz_beg: "Beginner",
    quiz_int: "Intermediate", quiz_adv: "Advanced", quiz_q: "Questions",
    quiz_review: "Review & Feedback", quiz_advice: "Advice for you:",
    quiz_good: "You have an excellent understanding of Graphic Design! 🎉", quiz_bad: "You should spend a bit more time reviewing the 'Learn' section. Keep practicing! 💪",
    quiz_awesome: "Awesome!", quiz_try: "Keep Trying!", quiz_record: "🎉 New Record!",
    quiz_score_msg: "You got", quiz_view_ans: "View Answers & Feedback", quiz_restart: "Try Again"
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('myAffinity_lang') || 'en';
        }
        return 'en';
    } catch(e) { return 'en'; }
  });

  useEffect(() => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem('myAffinity_lang', lang);
        }
    } catch(e) {}
  }, [lang]);

  const t = (key) => translations[lang]?.[key] || key;

  const toggleLanguage = () => {
      setLang(prev => prev === 'en' ? 'km' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);