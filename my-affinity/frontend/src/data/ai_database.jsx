// ==========================================
// 🎨 GRAPHIC DESIGN AI - MASTER DATABASE
// ==========================================

// 🌟 Import Sub-Databases (FULLY DE-DUPLICATED)
import { basicsData } from './sub_databases/db_basics';
import { designData } from './sub_databases/db_design';
import { affinityAndEditingData } from './sub_databases/db_affinity_editing';

export const SUGGESTED_QUESTIONS = [
    "របៀបរចនា Poster ឱ្យទាក់ទាញ? 🖼️",
    "តិចនិកប្រើ Affinity Personas 🚀",
    "របៀបធ្វើស្បែករលោង (Frequency Separation) ✨",
    "តិចនិក Power Duplicate 🔄",
    "តើ Live Filters ក្នុង Affinity ជាអ្វី?",
    "របៀបប្រើ Affinity លើ iPad 📱",
    "របៀបរើសវត្ថុច្រើនលើ iPad 👆",
    "របៀប Zoom និងរំកិលប្លង់លើ iPad 🔍",
    "តើ ច្បាប់ពណ៌ 60-30-10 គឺជាអ្វី? 🎨",
    "តើ Dodge និង Burn គឺជាអ្វី?",
    "តើ Rasterize មានន័យថាម៉េច?", 
    "របៀបលុបមនុស្សចេញពីរូបភាព 🧹", 
    "របៀបលក់ Digital Assets 💰", 
    "តើ Affinity Photo និង Designer ខុសគ្នាម៉េច?", 
    "ពន្យល់ពី Blend Modes ទាំងអស់ 🌈",
    "Affinity Command Controller 🎛️",
    "មុខងារ Quick Menu លើ iPad",
    "របៀបរៀបចំ Studio Panels លើ iPad",
    "ការកាត់រូប Export (Slices) ✂️",
    "របៀបប្រើប្រាស់ Macros និង Brushes",
    "របៀបរក្សាទុកក្នុង Assets Panel 📦",
    "មុខងារ Artboards ក្នុង Affinity",
    "Snapping ក្នុង Affinity 🧲",
    "History Panel (Time Travel) ⏱️",
    "Clipping និង Masking ក្នុង Affinity",
    "Affinity Symbols គឺអ្វី?",
    "តើ Shape Builder Tool ប្រើធ្វើអី? 🔲",
    "Geometry Operations (Add, Subtract, Intersect)",
    "Image Layer vs Pixel Layer",
    "Stroke vs Fill",
    "Designer Persona vs Pixel Persona",
    "Artistic Text vs Frame Text",
    "សរសេរអក្សរតាមខ្សែកោង 〰️",
    "Affinity V3 និងអនាគត (Canva)",
    "Shortcut ផ្លូវកាត់សំខាន់ៗមានអ្វីខ្លះ? ⌨️",
    "Blend Ranges (លាក់ពណ៌លឿនបំផុត)",
    "Global Colors (ប្តូរពណ៌ម្តងទាំងអស់)",
    "Copy Effect ពី Layer មួយទៅមួយទៀត",
    "កាត់តរូបភាព (Photomanipulation) 🌌",
    "រលាយវត្ថុនិង Background បញ្ចូលគ្នា 🌪️",
    "ការធ្វើឱ្យរូបស្លេកៗ (Fading) 🌫️",
    "របៀបប្តូរថ្ងៃទៅយប់ (Day to Night) 🌙",
    "របៀបបង្កើតស្រមោលឱ្យពិតៗ 👥",
    "របៀបកាត់សក់ឬ Background ឱ្យស្អាត ✂️",
    "ប្តូរវត្ថុទៅជាមាស 🏆",
    "របៀបកែពន្លឺ ក្នុង Affinity 💡",
    "ពណ៌ Cinematic 🎬",
    "Color Grading (Split Toning) 🎨",
    "ព្រិល Background (Depth of Field)",
    "រូបភាពខ្ញុំព្រិល (My image is blurry)",
    "តើ Typography ជាអ្វី?",
    "របៀបរៀបចំ Portfolio"
];

export const SUGGESTED_QUESTIONS_EN = [
    "How to design an effective Poster? 🖼️",
    "Tips for Affinity Personas 🚀",
    "Pro Skin Retouch (Frequency Separation) ✨",
    "The Power Duplicate trick 🔄",
    "What are Live Filters in Affinity?",
    "Affinity iPad Gestures 📱",
    "How to multi-select on iPad 👆",
    "Zoom & Pan canvas on iPad 🔍",
    "The 60-30-10 Color Rule? 🎨",
    "What is Dodge and Burn?",
    "What does Rasterize mean?", 
    "How to erase objects (Inpainting)? 🧹", 
    "How to sell Digital Assets? 💰", 
    "Affinity Photo vs Designer?", 
    "Explain all Blend Modes 🌈",
    "Affinity Command Controller 🎛️",
    "iPad Quick Menu trick",
    "Managing iPad Studio Panels",
    "How to use Export Slices ✂️",
    "How to use Macros and Brushes",
    "How to use the Assets Panel 📦",
    "Affinity Artboards",
    "Snapping Tool Affinity 🧲",
    "Affinity History Panel Snapshot ⏱️",
    "Clipping vs Masking affinity",
    "What are Affinity Symbols?",
    "What is the Shape Builder Tool? 🔲",
    "Affinity Boolean Geometry",
    "Image Layer vs Pixel Layer",
    "Stroke vs Fill in Affinity",
    "Designer Persona vs Pixel Persona",
    "Artistic Text vs Frame Text",
    "Text on a path Affinity 〰️",
    "Affinity V3 Updates",
    "Essential Keyboard Shortcuts ⌨️",
    "Affinity Blend Ranges",
    "Affinity Global Colors Swatches",
    "Paste FX Layer Styles Affinity",
    "Photomanipulation techniques 🌌",
    "How to seamlessly blend subjects 🌪️",
    "How to fade images properly 🌫️",
    "Day to night editing 🌙",
    "Mastering realistic shadows 👥",
    "Precise background removal ✂️",
    "Turn anything into gold effect 🏆",
    "How to edit light in affinity 💡",
    "Cinematic color grading 🎬",
    "Split Toning Color Grading 🎨",
    "Depth of Field (Blur)",
    "My image is blurry",
    "What is Typography?",
    "How to build a portfolio"
];

export const GREETINGS = [
    "បាទ សួស្ដី! 👋 ខ្ញុំគឺ **AI Assistant** ជាជំនួយការផ្ទាល់ខ្លួនដ៏រីករាយរបស់អ្នក។ ខ្ញុំអាចជួយអ្នកទាំងការងារទូទៅ និងការ Design។ តើថ្ងៃនេះអ្នកចង់ឱ្យខ្ញុំជួយអ្វីខ្លះ? ខ្ញុំត្រៀមខ្លួនរួចរាល់ហើយ! ✨",
    "បាទ ស្វាគមន៍មកកាន់ការជជែក! 🤖 ខ្ញុំនៅទីនេះដើម្បីឆ្លើយសំណួរទូទៅ និងជួយអ្នករៀនពី Design ឬកម្មវិធី Affinity លើ iPad។ តើមានអ្វីឱ្យខ្ញុំជួយទេថ្ងៃនេះ?"
];

export const GREETINGS_EN = [
    "Hello! 👋 I am your friendly personal **AI Assistant**. I can help you with general knowledge as well as graphic design. What are we exploring today? I'm ready when you are! ✨",
    "Welcome! 🤖 I am here to chat with you about anything, from general topics to design theory and layout workflows. How can I brighten your day?"
];

export const SMART_GREETINGS = ["បាទ សួស្តីម្តងទៀត! 👋 ថ្ងៃមុនយើងបានជជែកគ្នាពី **{topic}**។ តើថ្ងៃនេះចង់រៀនពីវាបន្ត ឬចង់ប្តូរប្រធានបទថ្មី? 😊"];
export const SMART_GREETINGS_EN = ["Hello again! 👋 Last time we discussed **{topic}**. Want to dive deeper into that today? 😊"];

export const REJECTION_RESPONSES = [
    "បាទ សំណួរនេះគួរឱ្យចាប់អារម្មណ៍ណាស់! 🤔 ប៉ុន្តែហាក់ដូចជាខ្ញុំមិនទាន់មានទិន្នន័យច្បាស់លាស់សម្រាប់ឆ្លើយតបនៅពេលនេះទេ។ ចង់ឱ្យខ្ញុំសាកល្បងស្វែងរកព័ត៌មានបន្ថែម ឬយើងប្តូរប្រធានបទវិញ? 🌐",
    "បាទ វ៉ាវ សំណួរនេះពិបាកបន្តិច! 😅 ខ្ញុំជៀសវាងការឆ្លើយខុស ដូច្នេះសូមអភ័យទោសដែលខ្ញុំមិនទាន់អាចឆ្លើយបាន។ តោះ ចង់ជជែករឿងអ្វីផ្សេងទៀតទេ?"
];
export const REJECTION_RESPONSES_EN = [
    "That's an interesting topic! 🤔 However, I might not have enough verified data to give you a perfect answer right now. Should we try a different question? 🌐",
    "Wow, that's a tough one! 😅 I'm always learning, so I'll pass on this one to avoid giving wrong info. What else is on your mind?"
];

export const REPEAT_RESPONSES = {
    level1_greeting: ["បាទ សួស្តីម្តងទៀតបង! 👋 តើថ្ងៃនេះមានអារម្មណ៍ចង់រចនាអ្វីដែរ?"],
    level1_general: ["បាទ ហាក់ដូចជាអ្នកទើបតែសួររឿងនេះ! តើមានចំណុចណាដែលមិនទាន់ច្បាស់មែនទេ? កុំបារម្ភ សួរខ្ញុំបានរហូត! 🤗"],
    level2: ["បាទ ហាហា! សួរដដែលៗច្រើនដងហើយណា៎! 😆 ខ្ញុំសប្បាយចិត្តនឹងឆ្លើយ តែបើសួររឿងថ្មីរឹតតែសប្បាយ!"],
};

export const REPEAT_RESPONSES_EN = {
    level1_greeting: ["Hello again! 👋 Feeling creative today?"],
    level1_general: ["You just asked that! Is there a specific detail you need clarified? Don't worry, I'm here to help! 🤗"],
    level2: ["Haha! You've asked that a few times now! 😆 I love chatting, but let's explore a new design topic!"],
};

export const API_FALLBACK_RESPONSES = ["បាទ ជាសំណួរដ៏គួរឱ្យចាប់អារម្មណ៍ណាស់! 🤩 តែឥឡូវនេះទុកពេលឱ្យខ្ញុំគិតបន្តិចសិនណា៎។ ជួយសួរខ្ញុំពីបញ្ហា Design ផ្សេងទៀតវិញសិនបានទេ? 💡"];
export const API_FALLBACK_RESPONSES_EN = ["That's a very cool question! 🤩 Let me process that for a bit. In the meantime, could we talk about some other design tricks? 💡"];

export const QUIZ_INVITATIONS = [
    "បាទ ងាយស្រួលមែនទែន! 🤗 តោះសាកល្បងលេងសួរឆ្លើយ (Quiz) ពីរឿង Graphic Design និងការប្រើប្រាស់ Affinity មើល។ ឧទាហរណ៍៖ 'តើពណ៌អ្វីដែលផ្តល់អារម្មណ៍ស្ងប់ស្ងាត់?' ឬ 'តើមានតិចនិកអ្វីខ្លះដើម្បីធ្វើឱ្យរូបភាពកាន់តែទាក់ទាញជាងមុន?' 🤔 តោះ សួរខ្ញុំមក!",
    "បាទ តោះមកធ្វើតេស្តខួរក្បាលបន្តិច! 🧠 សាកល្បងសួរខ្ញុំពីរឿងក្បួនរចនា ឬការប្រើប្រាស់ឧបករណ៍ផ្សេងៗមើល។ ឧទាហរណ៍៖ 'តើពណ៌អ្វីខ្លះដែលស៊ីគ្នា?' 🎨 ខ្ញុំត្រៀមខ្លួនឆ្លើយហើយ!",
    "បាទ បើចង់ពង្រឹងសមត្ថភាព Design របស់អ្នក តោះយើងលេងឆ្លើយសំណួរគ្នា! 🎯 អ្នកអាចសួរខ្ញុំពីបញ្ហាកាត់តរូបភាព ឬចំណុចដែលអ្នកឆ្ងល់។ សួរមកចុះ កុំគិតយូរ!"
];
export const QUIZ_INVITATIONS_EN = [
    "That's super easy! 🤗 Let's have a quick Graphic Design and Affinity Quiz. You can ask me things like, 'Which colors evoke a calming emotion?' or 'What techniques make an image look more dynamic?' 🤔 Let's go, ask away!",
    "Let's test your creative brain! 🧠 Try asking me a tricky design question or an Affinity workflow. For example: 'What colors make the best contrast?' 🎨 I'm ready for the challenge!",
    "If you want to level up your design skills, let's do a quick Q&A session! 🎯 Ask me anything about photo manipulation or layout rules. Don't be shy, hit me with your best question!"
];

// ==========================================
// 🌟 100% MATCHING KNOWLEDGE BASE 🌟
// ==========================================
export const KNOWLEDGE_BASE = [
    ...basicsData,
    ...designData,
    ...affinityAndEditingData
];