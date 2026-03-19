// ==========================================
// 🎨 GRAPHIC DESIGN AI - MASTER DATABASE
// ==========================================

// 🌟 Import Sub-Databases (FULLY DE-DUPLICATED)
import { basicsData } from './sub_databases/db_basics.jsx';
import { designData } from './sub_databases/db_design.jsx';
import { affinityIpadData } from './sub_databases/db_affinity_ipad.jsx'; // Changed Name
import { editingData } from './sub_databases/db_editing.jsx';

export const SUGGESTED_QUESTIONS = [
    "របៀបរចនា Poster ឱ្យទាក់ទាញ? 🖼️",
    "តិចនិកប្រើ Affinity Personas 🚀",
    "របៀបធ្វើស្បែករលោង (Frequency Separation) ✨",
    "តិចនិក Power Duplicate 🔄",
    "តើ Live Filters ក្នុង Affinity ជាអ្វី?",
    "របៀបប្រើ Affinity លើ iPad 📱",
    "តើ ច្បាប់ពណ៌ 60-30-10 គឺជាអ្វី? 🎨",
    "តើ Dodge និង Burn គឺជាអ្វី?",
    "តើ Rasterize មានន័យថាម៉េច?", 
    "របៀបលុបមនុស្សចេញពីរូបភាព 🧹", 
    "របៀបលក់ Digital Assets 💰", 
    "តើ Affinity Photo និង Designer ខុសគ្នាម៉េច?", 
    "ពន្យល់ពី Blend Modes ទាំងអស់ 🌈"
];

export const SUGGESTED_QUESTIONS_EN = [
    "How to design an effective Poster? 🖼️",
    "Tips for Affinity Personas 🚀",
    "Pro Skin Retouch (Frequency Separation) ✨",
    "The Power Duplicate trick 🔄",
    "What are Live Filters in Affinity?",
    "Affinity iPad Gestures 📱",
    "The 60-30-10 Color Rule? 🎨",
    "What is Dodge and Burn?",
    "What does Rasterize mean?", 
    "How to erase objects (Inpainting)? 🧹", 
    "How to sell Digital Assets? 💰", 
    "Affinity Photo vs Designer?", 
    "Explain all Blend Modes 🌈"
];

export const GREETINGS = [
    "បាទ សួស្ដី! 👋 ខ្ញុំគឺ **Design Master** ជាជំនួយការផ្ទាល់ខ្លួនដ៏រីករាយរបស់អ្នក។ តើថ្ងៃនេះអ្នកចង់រៀនពីអ្វីដែរ? ខ្ញុំត្រៀមខ្លួនរួចរាល់ហើយ! 🎨✨",
    "បាទ ស្វាគមន៍មកកាន់ពិភពសិល្បៈ! 🎨 ខ្ញុំនៅទីនេះដើម្បីជួយបង្រៀនអ្នកពីការ Design, ការរៀបចំគំនិត និងការប្រើប្រាស់កម្មវិធី Affinity លើ iPad។ តើមានអ្វីឱ្យខ្ញុំជួយទេថ្ងៃនេះ?"
];

export const GREETINGS_EN = [
    "Hello! 👋 I am **Design Master**, your friendly personal Graphic Design AI assistant. What are we creating today? I'm ready when you are! 🎨✨",
    "Welcome to the creative zone! 🎨 I am here to help you master design theory, layout, and Affinity iPad workflows. How can I brighten your day?"
];

export const SMART_GREETINGS = ["បាទ សួស្តីម្តងទៀត! 👋 ថ្ងៃមុនយើងបានជជែកគ្នាពី **{topic}**។ តើថ្ងៃនេះចង់រៀនពីវាបន្ត ឬចង់ប្តូរប្រធានបទថ្មី? 😊"];
export const SMART_GREETINGS_EN = ["Hello again! 👋 Last time we discussed **{topic}**. Want to dive deeper into that today? 😊"];

export const REJECTION_RESPONSES = [
    "បាទ អូយ! 😅 ខ្ញុំគឺជា AI ដែលមានខួរក្បាលពេញទៅដោយកូដពណ៌ និងហ្វុនអក្សរតែប៉ុណ្ណោះ។ រឿងក្រៅពី Graphic Design ខ្ញុំសុំចុះចាញ់ហើយ! សួរខ្ញុំពីក្បួនរចនាវិញមក ល្អទេ? 🎨",
    "បាទ វ៉ាវ សំណួរនេះប្លែកមែន! 🤔 តែសុំទោសផង ខ្ញុំជាអ្នកជំនាញខាង Graphic Design អញ្ចឹងខ្ញុំចេះតែរឿងរចនាទេ។ តោះ ចង់រៀនលាយពណ៌ជាមួយខ្ញុំទេ?"
];
export const REJECTION_RESPONSES_EN = [
    "Oops! 😅 My brain is completely filled with color hex codes and typography rules. I have no clue about that! Ask me how to make a logo pop instead! 🎨",
    "Wow, that's an interesting topic! 🤔 But unfortunately, I'm purely a Graphic Design AI. Can we pivot back and talk about some cool design magic? ✨"
];

export const REPEAT_RESPONSES = {
    level1_greeting: "បាទ សួស្តីម្តងទៀតបង! 👋 តើថ្ងៃនេះមានអារម្មណ៍ចង់រចនាអ្វីដែរ?",
    level1_general: "បាទ ហាក់ដូចជាអ្នកទើបតែសួររឿងនេះ! តើមានចំណុចណាដែលមិនទាន់ច្បាស់មែនទេ? កុំបារម្ភ សួរខ្ញុំបានរហូត! 🤗",
    level2: ["បាទ ហាហា! សួរដដែលៗច្រើនដងហើយណា៎! 😆 ខ្ញុំសប្បាយចិត្តនឹងឆ្លើយ តែបើសួររឿងថ្មីរឹតតែសប្បាយ!"],
};

export const REPEAT_RESPONSES_EN = {
    level1_greeting: "Hello again! 👋 Feeling creative today?",
    level1_general: "You just asked that! Is there a specific detail you need clarified? Don't worry, I'm here to help! 🤗",
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
    ...affinityIpadData,
    ...editingData
];