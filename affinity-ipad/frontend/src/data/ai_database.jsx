// ==========================================
// 🎨 GRAPHIC DESIGN AI - MASTER DATABASE
// ==========================================

// 🌟 Import Sub-Databases (FULLY DE-DUPLICATED)
import { basicsData } from './sub_databases/db_basics';
import { designData } from './sub_databases/db_design';
import { affinityAndEditingData } from './sub_databases/db_affinity_editing';

export const SUGGESTED_QUESTIONS = [
    "App នេះជាអ្វី",
    "App ប្រើបានដោយឥតគិតថ្លៃទេ?",
    "ចាប់ផ្តើមដោយរបៀបណា",
    "វិញ្ញាបនបត្ររចនា 🏆",
    "ហេតុអ្វីប្រើ Affinity iPad",
    "Affinity ធៀបនឹង Photoshop",
    "Affinity Command Controller 🎛️",
    "មុខងារ Quick Menu លើ iPad",
    "ការភ្ជាប់ Keyboard លើ iPad ⌨️",
    "របៀបបញ្ចូល Font ខ្មែរលើ iPad 🔠",
    "Shortcut ផ្លូវកាត់សំខាន់ៗមានអ្វីខ្លះ?",
    "Artistic Text vs Frame Text",
    "របៀប Zoom និងរំកិលប្លង់លើ iPad 🔍",
    "របៀបប្រើ Affinity លើ iPad 📱",
    "Global Colors (ប្តូរពណ៌ម្តងទាំងអស់)",
    "ការកាត់រូប Export (Slices)",
    "មុខងារ Artboards",
    "របៀបរក្សាទុកក្នុង Assets Panel",
    "Copy Effect ពី Layer មួយទៅមួយទៀត",
    "តើ Affinity Photo និង Designer ខុសគ្នាម៉េច?",
    "Affinity Symbols គឺអ្វី?",
    "តិចនិក Power Duplicate 🔄",
    "តើ Smart Object ជាអ្វី?",
    "Image Layer vs Pixel Layer",
    "អ្វីទៅជា Vector និង Raster?",
    "Geometry Operations",
    "តើ Shape Builder Tool ប្រើធ្វើអី? 🔲",
    "តើ Rasterize មានន័យថាម៉េច?",
    "Clipping និង Masking ក្នុង Affinity",
    "សរសេរអក្សរតាមខ្សែកោង",
    "Pen Tool និង Pencil Tool ខុសគ្នាម៉េច?",
    "របៀបប្រើ Node Tool លើ iPad",
    "Snapping ក្នុង Affinity 🧲",
    "តើ Pen Tool ប្រើធ្វើអ្វី?",
    "តើ Blend Modes ដំណើរការយ៉ាងម៉េច?",
    "របៀបបង្កើត Text Effects ស្អាតៗ ✨",
    "រលាយវត្ថុនិង Background បញ្ចូលគ្នា 🌪️",
    "របៀបប្តូរថ្ងៃទៅយប់ (Day to Night) 🌙",
    "តើ Masking ជាអ្វី?",
    "ពន្យល់ពី Blend Modes ទាំងអស់ 🌈",
    "តើ Dodge និង Burn គឺជាអ្វី?",
    "ពណ៌ Cinematic",
    "Color Grading (Split Toning)",
    "របៀបបង្កើតស្រមោលឱ្យពិតៗ 👥",
    "សម្រាប់បោះពុម្ព 🖨️",
    "ពណ៌ចៃដន្យ 🎨",
    "ចង់ស្តាប់រឿងកំប្លែង 😆",
    "តើ គោលការណ៍រចនា មានអ្វីខ្លះ?",
    "របៀបរចនា Poster ឱ្យទាក់ទាញ? 🖼️",
    "អ្វីទៅជា Typography?",
    "តើ HSL គឺជាអ្វី?",
    "តើអ្នកអាចធ្វើអ្វីបានខ្លះ? 🤖",
    "របៀបរកគំនិត Design 💡",
    "អ្នកណាគេបង្កើតអ្នក? 👨‍💻",
    "ចង់ធ្វើតេស្ត 🎯",
    "កាត់តរូបភាព (Photomanipulation)"
];

export const SUGGESTED_QUESTIONS_EN = [
    "What is this app?",
    "Is the app free to use?",
    "How to get started",
    "Design Certificate 🏆",
    "Why use Affinity on iPad?",
    "Affinity vs Photoshop",
    "Affinity Command Controller 🎛️",
    "iPad Quick Menu trick",
    "Using External Keyboards ⌨️",
    "Installing Custom Fonts on iPad 🔠",
    "Essential Keyboard Shortcuts",
    "Artistic Text vs Frame Text",
    "Zoom & Pan canvas on iPad 🔍",
    "Affinity iPad Gestures 📱",
    "Global Colors (Swatches)",
    "How to use Export Slices ✂️",
    "Affinity Artboards",
    "How to use the Assets Panel",
    "Copying Layer Styles (Paste FX)",
    "Affinity Photo vs Designer?",
    "What are Affinity Symbols?",
    "The Power Duplicate trick 🔄",
    "What is a Smart Object?",
    "Image Layer vs Pixel Layer",
    "Vector vs Raster?",
    "Affinity Boolean Geometry",
    "What is the Shape Builder Tool? 🔲",
    "What does rasterize mean?",
    "Clipping vs Masking affinity layers",
    "Text on a Path",
    "Pen Tool vs Pencil Tool?",
    "Node Tool Vector Editing",
    "Snapping Tool Affinity 🧲",
    "Paste FX Layer Styles Affinity",
    "How to use the Pen Tool?",
    "How do Blend Modes work?",
    "How to create premium Text Effects ✨",
    "How to seamlessly blend subjects 🌪️",
    "How to turn Day into Night? 🌙",
    "What is Masking?",
    "Explain all Blend Modes 🌈",
    "What is Dodge and Burn?",
    "Cinematic Color",
    "Split Toning Color Grading",
    "Mastering realistic shadows 👥",
    "For Printing 🖨️",
    "Random Color 🎨",
    "Tell me a joke 😆",
    "Core Design Principles?",
    "How to design an effective Poster? 🖼️",
    "What is Typography?",
    "What is HSL?",
    "What can you do? 🤖",
    "How to find inspiration 💡",
    "Who created you? 👨‍💻",
    "Take a Quiz 🎯"
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