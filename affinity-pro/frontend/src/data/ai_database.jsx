// ==========================================
// 🎨 GRAPHIC DESIGN AI - MASTER DATABASE
// ==========================================

// 🌟 Import Sub-Databases (FULLY DE-DUPLICATED)
import { basicsData } from './sub_databases/db_basics';
import { designData } from './sub_databases/db_design';
import { layoutData } from './sub_databases/db_layout';
import { pixelData } from './sub_databases/db_pixel';
import { vectorData } from './sub_databases/db_vector';

export const SUGGESTED_QUESTIONS = [
    // Vector
    "Pen Tool",
    "របៀបប្រើ Node Tool លើ PC",
    "Corner Tool (បំពត់ជ្រុង)",
    "Pencil Tool និង Rope Stabilizer",
    "Shape Builder Tool 🔲",
    "Vector Warp Groups",
    "Contour Tool (ពង្រីករាង)",
    "Symbols Panel (សមកាលកម្ម)",
    "Appearance Panel (ការតុបតែង)",
    "Geometry Operations (Boolean)",
    "Isometric Panel (គូរ 3D)",
    "Power Duplicate (Ctrl+J)",
    
    // Pixel
    "Inpainting Brush Tool",
    "Clone vs Healing Brush Tool",
    "Frequency Separation",
    "Selection Tools (ជ្រើសរើសវត្ថុ)",
    "Quick Mask Mode (Q)",
    "Channels Panel",
    "Adjustment Layers Mastery",
    "LUTs (Look Up Tables)",
    "Develop Persona (កែរូប RAW)",
    "Tone Mapping Persona",
    "Focus Merge (រូបច្បាស់កម្រិតជ្រៅ)",
    "Panorama Merge (តរូបភាពធំ)",
    "Pattern Layers (សាច់ក្រណាត់)",
    "Transparent Background",
    
    // Layout & App
    "Artistic Text vs Frame Text",
    "Text Styles (កំណត់ស្តង់ដារអក្សរ)",
    "Typography Panel (ក្បូរក្បាច់អក្សរ)",
    "Text Wrap (រុំអក្សរ)",
    "Baseline Grid (តម្រឹមបន្ទាត់)",
    "Master Pages និង Artboards",
    "Bleed, Margins & Slug",
    "Preflight Panel (ឆែកកំហុស)",
    "PDF Export Settings",
    "Data Merge (ទាញទិន្នន័យស្វ័យប្រវត្តិ)",
    "Packaging Files (ប្រមូល File)",
    "Grid Systems & Column Guides",
    "Reset Studio (បាត់ឧបករណ៍)",
    "Assets Panel (ឃ្លាំងផ្ទុករូប)",
    "Stock Panel (ទាញរូបភាពព្រី)",
    "Export Persona (កាត់រូបរហ័ស)",
    "Macros (កត់ត្រាសកម្មភាព)"
];

export const SUGGESTED_QUESTIONS_EN = [
    // Vector
    "How to use the Pen Tool?",
    "node tool vector editing",
    "How to use the Corner Tool?",
    "Pencil Tool Workflow",
    "What is the Shape Builder Tool?",
    "Non-destructive Vector Warping",
    "Affinity Contour Tool",
    "Symbols Panel (Synced Components)",
    "Affinity Appearance Panel",
    "Affinity Boolean Geometry",
    "Isometric Panel (3D Grids)",
    "Duplicate and Repeat",

    // Pixel
    "How to remove objects?",
    "Clone vs Healing Brush",
    "Frequency Separation Skin Retouch",
    "Selection Tools Mastery",
    "Quick Mask Mode",
    "Channels Panel & RGB isolation",
    "Adjustment Layers Mastery",
    "Applying LUTs",
    "Develop Persona (RAW Processing)",
    "HDR Tone Mapping Persona",
    "Focus Merge (Macro Stacking)",
    "Panorama Merge Workflow",
    "Pattern Layers & Seamless Textures",
    "How to export a transparent PNG?",

    // Layout & App
    "Text Tools",
    "Mastering Text Styles",
    "Typography Panel Secrets",
    "Text Wrapping Workflow",
    "Baseline Grid Alignment",
    "Master Pages vs Artboards",
    "Bleed, Margins & Print Standards",
    "Preflight Panel (Live Check)",
    "CMYK vs RGB Export",
    "Automating with Data Merge",
    "Packaging Files Workflow",
    "Grid Systems",
    "Resetting the Workspace",
    "Affinity Assets Panel",
    "Stock Panel (Free Images)",
    "Export Persona Mastery",
    "Macros & Batch Processing"
];

export const GREETINGS = [
    "បាទ សួស្ដី! 👋 ខ្ញុំគឺ **AI Assistant** ជាជំនួយការផ្ទាល់ខ្លួនដ៏រីករាយរបស់អ្នក។ ខ្ញុំអាចជួយអ្នកទាំងការងារទូទៅ និងការ Design។ តើថ្ងៃនេះអ្នកចង់ឱ្យខ្ញុំជួយអ្វីខ្លះ? ខ្ញុំត្រៀមខ្លួនរួចរាល់ហើយ! ✨",
    "បាទ ស្វាគមន៍មកកាន់ការជជែក! 🤖 ខ្ញុំនៅទីនេះដើម្បីឆ្លើយសំណួរទូទៅ និងជួយអ្នករៀនពី Design ឬកម្មវិធី Affinity លើ PC។ តើមានអ្វីឱ្យខ្ញុំជួយទេថ្ងៃនេះ?"
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
    ...layoutData,
    ...pixelData,
    ...vectorData
];