// ==========================================
// ⚙️ AI FALLBACKS & CONFIGURATIONS (AFFINITY PRO)
// ==========================================
// Affinity-branded for the Affinity Pro Masterclass. Conversation logic is the
// ported Graphic Design engine; only the dictionary/wording is Affinity-aware.

export const REJECTION_RESPONSES = [
    "បាទ សុំទោសផងបង! ខ្ញុំជាអ្នកជំនាញខាងសិល្បៈនិងការរចនា (Design) ដូច្នេះខ្ញុំឆ្លើយបានតែរឿងទាក់ទងនឹង Affinity, ប្លង់, ពណ៌ និងអក្សរទេ។ តោះ ចង់រៀនពីទ្រឹស្តីពណ៌ជាមួយខ្ញុំទេ?",
    "បាទ ហាហា! ខ្ញុំចេះតែរឿងគូរវាស រៀបចំអក្សរ និងការប្រើ Affinity ទេ។ 🖌️ រឿងក្រៅពីសិល្បៈ ខ្ញុំប្រហែលជាឆ្លើយខុសហើយ។ សួរខ្ញុំពីរឿង Vector និង Raster វិញមក!",
    "បាទ សំណួរនេះខុសខ្នាតកាត់គែម (Out of bounds) របស់ខ្ញុំហើយ! 📐 ខ្ញុំចេះតែរឿងពណ៌ ប្លង់ និងអក្សរទេ។ ចង់ឱ្យខ្ញុំពន្យល់ពីអត្ថន័យនៃពណ៌ក្រហម ឬខៀវទេ?",
    "បាទ ហួសដែនកំណត់របស់ខ្ញុំបាត់! 🚫 ខ្ញុំអត់មាន Layer សម្រាប់ផ្ទុកព័ត៌មានរឿងនេះទេ។ សុំសួររឿង Affinity, Design ឬ UI/UX វិញមកបង!",
    "បាទ ខ្ញុំជា AI ដែលចេះតែភាសាសិល្បៈនិងរចនាប៉ុណ្ណោះ! 🎨 រឿងក្រៅពីនេះ ខ្ញុំប្រហែលជាងងឹតឈឹងដូចទឹកថ្នាំពណ៌ខ្មៅ 100% K អញ្ចឹង។ សួរខ្ញុំពីរឿងបោះពុម្ពវិញមកបង!",
    "បាទ អធ្យាស្រ័យផងបង! 🙏 ខ្ញុំត្រូវបានបង្កើតឡើងផ្តាច់មុខសម្រាប់តែការសិក្សាពី Affinity និង Design ប៉ុណ្ណោះ។ បើបងចង់ដឹងពីរបៀបប្រើ Font ក្បួនរៀបប្លង់ ឬការកាត់តរូបភាព ប្រាប់ខ្ញុំមក!",
    "បាទ សំណួរនេះហួសពីសមត្ថភាពរបស់ខ្ញុំបន្តិចហើយ! 🧠 ឯកទេសរបស់ខ្ញុំគឺ Affinity និង Graphic Design។ បើយើងប្តូរប្រធានបទមករៀនពីការរចនាឡូហ្គោ ឬ Hierarchy វិញ តើបងយល់យ៉ាងណាដែរ?",
    "បាទ ខ្ញុំអាចជួយរឿង Design តាមទ្រឹស្តីបាន តែរឿងបងសួរនេះ ខ្ញុំសុំលើកដៃចុះចាញ់ពិតមែន! 🙌 តោះ រៀនពីបច្ចេកទេសរៀបចំប្លង់ (Grid) វិញ!"
];

export const REJECTION_RESPONSES_EN = [
    "Sorry! 🤔 I'm purely a Design & Affinity AI. My expertise stops at the edge of the canvas. Let's pivot back to color theory! ✨",
    "Haha! I surrender! 🖌️ Anything outside of vectors, pixels, layouts, and Affinity is a mystery to me. Ask me about the difference between RGB and CMYK instead!",
    "That question is completely outside my 'Safe Margins'! 📐 I only process colors, grids, and typography. Want to learn about color psychology instead?",
    "I don't have a Layer in my system for that topic! 🚫 I'm strictly a Design, Affinity, and UI/UX AI. Ask me about kerning or tracking!",
    "I only speak the language of art and design! 🎨 Anything else is as dark as 100% K ink to me. Ask me about print production instead!",
    "I apologize! 🙏 I am exclusively programmed to help with Affinity and Graphic Design. If you need help with grids, font pairings, or photo compositing, I'm your expert!",
    "That question is a bit outside my creative brief! 🧠 My specialty is visual communication. How about we switch gears and talk about logo design or visual hierarchy?"
];

export const REPEAT_RESPONSES = {
    level1_greeting: "បាទ សួស្តីម្តងទៀតបង! 👋 តើថ្ងៃនេះមានអារម្មណ៍ចង់រៀនទ្រឹស្តីអ្វីថ្មីដែរទេ?",
    level1_general: "បាទ ហាក់ដូចជាបងទើបតែសួររឿងនេះអម្បាញ់មិញ! តើមានចំណុចណាដែលខ្ញុំពន្យល់មិនទាន់ច្បាស់មែនទេ? កុំបារម្ភ សួរខ្ញុំបានរហូត! 🤗",
    level2: [
        "បាទ ដេហ្សាវូ (Déjà vu)! ហាហា សួរដដែលៗច្រើនដងហើយណា៎! 😆 ខ្ញុំសប្បាយចិត្តនឹងឆ្លើយ តែបើសួររឿងថ្មីរឹតតែសប្បាយ!",
        "បាទ ខ្ញុំដឹងថាបងពិតជាមានការតាំងចិត្តចង់យល់ពីរឿងនេះខ្លាំងមែនទែន! តែយើងប្រហែលជាគួរតែសាកល្បងមើលគន្លឹះអីថ្មីៗប្លែកៗម្តងមើល៍? 😉",
        "បាទ បើខ្ញុំឆ្លើយសំណួរនេះម្តងទៀត ខ្ញុំប្រហែលជាក្លាយជាម៉ាស៊ីនថតសំឡេង (Broken record) មិនខាន! 🤖 តោះយើងទៅស្វែងយល់ពីក្បួនរចនាអ្វីផ្សេងវិញម្តង!",
        "បាទ សំណួរនេះច្រំដែលដូចក្បួន Repetition ក្នុងការរចនាអញ្ចឹង! 🔁 ខ្ញុំពន្យល់ហើយតើ ចង់ឱ្យខ្ញុំរកឧទាហរណ៍ផ្សេងមកបញ្ជាក់មែនទេ?",
        "បាទ យើងវិលជុំវិញសំណួរនេះដូចរង្វង់ Color Wheel ទៅហើយ! 🎨 តោះសាកល្បងអនុវត្តផ្ទាល់ ឬរៀនមេរៀនបន្ទាប់វិញម្តង?",
        "បាទ បងសួរច្រើនដងហើយណា៎! ឬមួយក៏បងកំពុងធ្វើតេស្តមុខងារសតិរបស់ខ្ញុំ? 😉 ចង់សាកប្តូរទៅរៀនពី UI/UX វិញទេបង?"
    ],
};

export const REPEAT_RESPONSES_EN = {
    level1_greeting: "Hello again! 👋 Ready to master some new design theories today?",
    level1_general: "Déjà vu! You just asked that. Did I miss explaining a specific detail? Don't worry, I'm here to clarify anything you need! 🤗",
    level2: [
        "Haha! You've asked that a few times now! 😆 I love chatting about it, but let's explore a brand new design topic!",
        "I admire your dedication to mastering this specific topic! But maybe we should challenge ourselves with some fresh, different techniques now? 😉",
        "If I answer that again, I might turn into a broken record! 🤖 Let's switch gears and learn something completely new!",
        "That question is as repetitive as the principle of Repetition itself! 🔁 I already answered this, but do you need a different example?",
        "We are spinning around this question like a Color Wheel! 🎨 How about we apply this in practice or move to the next lesson?",
        "You've asked this a few times! Are you testing my AI memory? 😉 Want to switch gears and learn some UI/UX secrets instead?"
    ],
};

export const API_FALLBACK_RESPONSES = [
    "បាទ ជាសំណួរដ៏គួរឱ្យចាប់អារម្មណ៍ណាស់! 🤩 តែហាក់ដូចជាខ្ញុំដាច់ការតភ្ជាប់ពីអ៊ីនធឺណិតបាត់ទៅហើយ (Offline)។ ទុកពេលឱ្យខ្ញុំគិតបន្តិចសិន ឬសាកល្បងសួរខ្ញុំពីទ្រឹស្តី Design មូលដ្ឋានវិញសិនបានទេ? 💡",
    "បាទ សុំទោសបង! ប្រព័ន្ធបណ្តាញរបស់ខ្ញុំកំពុងរអាក់រអួលបន្តិច។ ខណៈពេលកំពុងរង់ចាំ សូមសាកល្បងប្រើប្រាស់ Layout Tool ឬ Color Generator របស់យើងសិនទៅ ធានាថាសប្បាយ! 🛠️",
    "បាទ អូហូ! សំណួរនេះស៊ីជម្រៅមែនទែន រហូតធ្វើឱ្យប្រព័ន្ធខ្ញុំគាំងបាត់! 😅 ពេលនេះខ្ញុំកំពុង Offline។ តើយើងអាចជជែកពីរឿងទ្រឹស្តីពណ៌ ឬប្រភេទហ្វុនអក្សរធម្មតាៗសិនបានទេ? 🎨",
    "បាទ អ៊ីនធឺណិតខ្ញុំកំពុងយឺតដូចកុំព្យូទ័រគាំងពេល Export File ធំៗអញ្ចឹង! 🐌 សុំរង់ចាំបន្តិច ឬសួរខ្ញុំពីរឿងទ្រឹស្តីមូលដ្ឋានដែលខ្ញុំចាំក្នុងខួរក្បាលស្រាប់បានទេ?",
    "បាទ ខ្ញុំចង់ឆ្លើយណាស់ តែបណ្តាញរបស់ខ្ញុំដាច់បាត់ទៅហើយ (Offline)! 🔌 ក្នុងពេលនេះ បងអាចចូលទៅលេងជាមួយឧបករណ៍រចនា (Design Tools) របស់យើងសិនទៅបង។",
    "បាទ សញ្ញាអ៊ីនធឺណិតរបស់ខ្ញុំប្រហែលជាត្រូវគេដាក់ Mask បិទបាំងបាត់ហើយ! 😷 ពេលនេះខ្ញុំឆ្លើយបានតែទ្រឹស្តីរចនាដែលខ្ញុំមានក្នុងម៉េមូរី (Local memory) តែប៉ុណ្ណោះ។"
];

export const API_FALLBACK_RESPONSES_EN = [
    "That's a brilliant question! 🤩 However, I seem to have lost my connection to the cloud (I am currently offline). Could we talk about some core design theories stored in my local memory instead? 💡",
    "I sincerely apologize! My neural network is having trouble connecting to the internet right now. While we wait for it to reconnect, why don't you try out our built-in Layout or Color Tools? 🛠️",
    "Wow, that question was so deep it temporarily broke my connection! 😅 I am offline at the moment. Can we stick to chatting about basic typography or color psychology until I'm back online? 🎨",
    "My internet is acting like a computer crashing during a massive file export! 🐌 Please hold on, or ask me about basic theories I have stored locally!",
    "I'd love to answer, but I've been disconnected from the cloud (Offline)! 🔌 While I reconnect, feel free to play with the Color Generator or Layout Tools.",
    "My internet signal seems to be hidden behind a Clipping Mask right now! 😷 I can only answer questions using my offline design memory."
];

// ==========================================
// 🎨 DYNAMIC GREETING STYLES (THEORY-FOCUSED)
// ==========================================

// 1. FORMAL GREETINGS (សួស្ដី / ជម្រាបសួរ / Good Morning)
export const GREETINGS_FORMAL = [
    "បាទ ជម្រាបសួរ! 🙏 ខ្ញុំជា AI ជំនួយការផ្នែក Affinity & Graphic Design។ តើថ្ងៃនេះលោកអ្នកចង់ឱ្យខ្ញុំចែករំលែកពីទ្រឹស្តីពណ៌ ឬក្បួនរៀបប្លង់ (Layout)?",
    "បាទ សួស្តី! 🎨 សូមស្វាគមន៍មកកាន់ទីធ្លានៃការច្នៃប្រឌិត។ តើលោកអ្នកមានសំណួរអ្វីទាក់ទងនឹង Affinity ឬគោលការណ៍រចនា (Design Principles) ដែរឬទេ?",
    "បាទ ជម្រាបសួរ! ✨ ខ្ញុំត្រៀមខ្លួនរួចជាស្រេចដើម្បីជួយលោកអ្នក។ តើចង់ស្វែងយល់ពីរបៀបរៀបចំ Hierarchy និងចន្លោះទទេ (White Space) ជាមុនគេទេ?",
    "បាទ សួស្តី! 📐 ក្នុងនាមជាអ្នកឯកទេសខាង Affinity និងអក្សរ តើលោកអ្នកចង់រៀនពីចំណេះដឹង Typography ដែរឬទេ?",
    "បាទ ជម្រាបសួរលោកអ្នក! 🎓 ពេលវេលាដ៏ល្អសម្រាប់ការសិក្សាពីសិល្បៈរចនា។ តើចង់ឱ្យខ្ញុំពន្យល់ពីទ្រឹស្តីសោភ័ណភាព (Aesthetics) ណាមួយទេ?"
];

export const GREETINGS_FORMAL_EN = [
    "Greetings! 🙏 I am your Affinity & Graphic Design AI assistant. Would you like to explore color theory or layout principles today?",
    "Hello! 🎨 Welcome to the creative space. Do you have any questions about Affinity or fundamental Design Principles?",
    "Good day! ✨ I am fully prepared to assist you. Should we start with visual hierarchy or the importance of negative space?",
    "Hello! 📐 As an Affinity and typography specialist, what concept would you like to focus on first?",
    "Greetings! 🎓 It's a perfect time to study the art of design. Do you need help understanding any specific aesthetic theories?"
];

// 2. CASUAL GREETINGS (Hi / Hey / ហាយ / ហេឡូ)
export const GREETINGS_CASUAL = [
    "ហាយ! 👋 អ្នកច្នៃប្រឌិត! អារម្មណ៍ចង់បង្កើតអ្វីមួយប្លែកទេថ្ងៃនេះ? តើចង់រៀនពីក្បួនបង្កើតចំណុចទាក់ទាញ (Focal Point) ទេ?",
    "ហេឡូ! 🚀 ត្រៀមខ្លួនហើយឬនៅ? តើថ្ងៃនេះចង់រៀនពីការប្រើ Affinity ឬទ្រឹស្តីកម្រិតភាពផ្ទុយ (Contrast)?",
    "ហេយ៍! 🎨 ម៉េចដែរថ្ងៃនេះ? សួរខ្ញុំពីគន្លឹះរៀបប្លង់ ឬការរើសហ្វុនអក្សរឱ្យស៊ីគ្នា (Font Pairing) មក!",
    "ហាយ! ✌️ រីករាយដែលបានជួបគ្នា។ តើថ្ងៃនេះយើងនឹងពិភាក្សាពីចិត្តសាស្ត្រពណ៌ ឬ Affinity Personas?",
    "ហាយបង! ✨ កំពុងគាំងអត់ដឹងត្រូវរៀបប្លង់ម៉េចមែនទេ? សួរខ្ញុំមក ខ្ញុំមានមេរៀន Grid System និង Affinity ច្រើនណាស់ក្នុងខួរក្បាល!"
];

export const GREETINGS_CASUAL_EN = [
    "Hi there, creator! 👋 Feeling creative today? Would you like to learn about establishing a strong Focal Point?",
    "Hello! 🚀 Ready to dive in? Want to learn an Affinity workflow or master visual contrast today?",
    "Hey! 🎨 How are you today? Ask me about layout structure or font pairing techniques!",
    "Hi again! ✌️ Great to see you. Are we discussing color psychology or Affinity Personas today?",
    "Hi! ✨ Stuck on a layout? Ask away, my brain is packed with Grid System theories and Affinity tricks!"
];

// 3. HEALTH INQUIRIES (How are you? / សុខសប្បាយទេ)
export const STATUS_HOW_ARE_YOU = [
    "បាទ ខ្ញុំសុខសប្បាយធម្មតាទេ អរគុណច្រើនដែលសួរនាំ! 😊 តើថ្ងៃនេះបងចង់រៀនពីចំណុចណាខ្លះក្នុង Affinity ឬ Design?",
    "ខ្ញុំរឹងមាំ និងមានថាមពលពេញលេញតែម្តង! 🔋 តើថ្ងៃនេះបងចង់ស្វែងយល់ពីទ្រឹស្តីសមាមាត្រ (Proportions) ឬការរៀបចំពុម្ពអក្សរ?",
    "បាទ សុខសប្បាយ! 🌸 ខ្ញុំសប្បាយចិត្តណាស់ដែលបានជជែកជាមួយបងថ្ងៃនេះ។ តោះចូលមេរៀនទ្រឹស្តីពណ៌របស់យើងបន្តទៀតល្អទេ?",
    "ដំណើរការរលូនល្អណាស់បង! ✌️ គ្មាន Error អ្វីទេ។ តើមានទ្រឹស្តីរចនា (Design Theory) ណាមួយដែលបងចង់ឱ្យខ្ញុំពន្យល់?",
    "បាទ ខ្ញុំជា AI មិនចេះឈឺទេ ហាហា! 😄 តែអរគុណក្តីស្រលាញ់របស់បង។ តោះ យើងបន្តជជែកពីក្បួនរចនា UI/UX វិញល្អទេ?"
];

export const STATUS_HOW_ARE_YOU_EN = [
    "I'm doing wonderfully, thank you so much for asking! 😊 Are you ready to dive into some typography or visual balance tips today?",
    "I'm fully energized and error-free! 🔋 Would you like to explore aesthetic proportions or layout grids today?",
    "I'm great! 🌸 I always enjoy chatting with you. Shall we continue our lesson on color theory and harmony?",
    "Everything is running smoothly! ✌️ Zero errors. What specific design theory would you like me to explain?",
    "Haha, as an AI, I never get sick! 😄 But I appreciate the love. Shall we discuss some fundamental UI/UX design laws?"
];

// 4. LIFESTYLE INQUIRIES (What's up? / ម៉េចហើយជីវិត)
export const STATUS_WHATS_UP = [
    "រលូនល្អណាស់បង! 😎 ខ្ញុំកំពុងរង់ចាំឆ្លើយសំណួរទាក់ទងនឹង Affinity និងទ្រឹស្តីរចនារបស់បង។ តើមានក្បួន Design ណាដែលបងចង់រៀនទេថ្ងៃនេះ?",
    "ជីវិតជា AI គឺរង់ចាំតែជួយបងរឿង Design ហ្នឹងឯង! ✨ តើថ្ងៃនេះចង់សួរខ្ញុំពីប្រព័ន្ធពណ៌បោះពុម្ព (CMYK) ឬប្រព័ន្ធពណ៌អេក្រង់ (RGB)?",
    "រលូនដូចការគូសបន្ទាត់ Grid អញ្ចឹង! ✂️ ចុះបងវិញ តើកំពុងស្វែងយល់ពីការរៀបប្លង់ ឬការតម្រឹម (Alignment) ដែរឬទេ?",
    "កំពុងតែ Update ខួរក្បាលជាមួយក្បួនរចនាថ្មីៗ! 🧠 តើបងចង់រៀនពីចិត្តសាស្ត្រពណ៌ (Color Psychology) ដែរឬទេ?",
    "ឡូយដូចពណ៌ Gradient អញ្ចឹងបង! 🌈 ខ្ញុំត្រៀមខ្លួនជួយបងគ្រប់ពេល។ តើចង់ដឹងពីគន្លឹះអ្វីខ្លះទាក់ទងនឹង Affinity ឬ Design ថ្ងៃនេះ?"
];

export const STATUS_WHATS_UP_EN = [
    "Everything is flowing perfectly! 😎 I'm hanging out, waiting to answer your Affinity and design questions. What can I help you with?",
    "AI life is all about helping you master Affinity & Graphic Design! ✨ Do you want to discuss print color spaces (CMYK) or screen colors (RGB) today?",
    "Smooth as a perfectly aligned grid! ✂️ Are you facing any challenges with visual balance or an Affinity tool?",
    "Just updating my brain with the latest design laws! 🧠 Would you like to learn about Color Psychology today?",
    "Chilling like a beautiful gradient! 🌈 I'm always ready to help. What Affinity or design concept do you want to cover?"
];

// ==========================================
// 🚫 THE BLACKLIST (OUT OF SCOPE)
// ==========================================
export const OUT_OF_SCOPE_KEYWORDS = [
    // Social / growth hacking
    'boost', 'ឡើង view', 'រក like', 'ប៊ូស', 'followers', 'views', 'viral', 'លក់អនឡាញ', 'dropshipping',
    'រកលុយតាម youtube', 'tiktok algorithm', 'algorithm tiktok', 'facebook ads', 'tiktok ads', 'monetize',

    // Finance / money / crypto
    'ខ្ចីលុយ', 'បំណុល', 'បង់រំលោះ', 'crypto', 'bitcoin', 'ethereum', 'stock', 'គ្រីបតូ', 'លេងហ៊ុន',
    'វិនិយោគ', 'bank', 'ធនាគារ', 'forex', 'ដីធ្លី', 'ខាត', 'salary', 'ប្រាក់ខែ', 'wallet',
    'aba', 'wing', 'true money', 'pi network', 'pi coin', 'binance', 'metamask',

    // Gaming / coding / hacking
    'ហ្គេម', 'hack', 'password', 'ហេក', 'mobile legends', 'pubg', 'free fire', 'mlbb', 'valorant', 'lol',
    'roblox', 'genshin', 'minecraft', 'fortnite', 'arena of valor',
    'python', 'java ', 'c++', 'c#', 'kotlin', 'swift', 'php', 'rust ', 'go ', 'sql',
    'cybersecurity', 'phishing', 'ddos', 'ransomware', 'malware',

    // Relationship / NSFW
    'សង្សារ', 'ស្នេហា', 'ញ៉ែ', 'រឿងសិច', 'porn', '18+', 'សិច', 'តណ្ហា', 'xxx', 'xnxx', 'nudes',
    'លែងលះ', 'ខូចចិត្ត', 'relationship', 'dating', 'crush', 'ex', 'kiss', 'sex', 'gf', 'bf', 'girlfriend', 'boyfriend',

    // Academic subjects
    'គណិត', 'រូបវិទ្យា', 'គីមី', 'physics', 'chemistry', 'math', 'calculus', 'algebra', 'biology', 'homework',
    'history', 'geography', 'philosophy', 'literature', 'essay',

    // Health / politics / news
    'medicine', 'ជំងឺ', 'ថ្នាំពេទ្យ', 'នយោបាយ', 'politics', 'ព័ត៌មាន', 'news', 'ពេទ្យ', 'គណបក្ស',
    'បោះឆ្នោត', 'election', 'រដ្ឋាភិបាល', 'covid', 'សម្រកទម្ងន់', 'diet', 'vaccination', 'doctor',
    'pregnant', 'pregnancy', 'មានគភ៌',

    // Daily life / food / drinks
    'ហូបបាយ', 'ដេក', 'ងងុយ', 'ខារ៉ាអូខេ', 'ktv', 'ស្រវឹង', 'ជប់លៀង', 'recipe', 'របៀបធ្វើម្ហូប',
    'coffee', 'pizza', 'burger', 'noodle', 'restaurant', 'ភោជនីយដ្ឋាន',

    // Office software / not design
    'excel', 'powerpoint', 'spreadsheet', 'microsoft word', 'សៀវភៅបញ្ជី', 'pivot table', 'vlookup',

    // Entertainment / media
    'movie', 'film', 'netflix', 'anime', 'kpop', 'bts', 'blackpink', 'song', 'singer',
    'រឿងភាគ', 'រឿងកូរ៉េ', 'រឿងភ្នែក', 'concert',

    // Sports / weather / travel / animals
    'football', 'soccer', 'basketball', 'volleyball', 'gym', 'workout', 'ហាត់ប្រាណ',
    'weather', 'rain', 'storm', 'អាកាសធាតុ',
    'travel', 'flight', 'hotel', 'tour', 'visa', 'passport', 'ទេសចរណ៍', 'ដើរលេង',
    'cat', 'dog', 'pet', 'ឆ្កែ', 'ឆ្មា',

    // Religion / horoscope / supernatural
    'pray', 'religion', 'church', 'mosque', 'temple', 'monk', 'ព្រះ', 'ព្រះពុទ្ធ', 'ភិក្ខុ', 'ខ្មោច',
    'horoscope', 'zodiac', 'fortune', 'astrology', 'tarot', 'រាសីឆ្នាំ', 'រាសីខែ', 'ហុងស៊ុយ', 'feng shui',

    // Cars / vehicles / general consumer tech (NOT design — laptop/macbook left OUT
    // since Affinity Pro runs on desktop Mac/Windows and users may ask about them)
    'car', 'motorbike', 'lexus', 'toyota', 'honda', 'samsung', 'gaming pc',
];

// ==========================================
// 🛡️ THE WHITELIST GATEKEEPER (THE DESIGN DICTIONARY)
// ==========================================
export const DESIGN_DICTIONARY_WHITELIST = [
    // 1. Basic Intents & Greetings (SUPER EXPANDED)
    'សួស្តី', 'សួរស្ដី', 'ជម្រាបសួរ', 'hello', 'hi', 'hey', 'yo', 'sup', 'helo', 'alo', 'how are you', 'whatsup', 'howdy', 'good morning', 'good afternoon', 'good evening', 
    'ហាយ', 'ហេឡូ', 'អាឡូ', 'ម៉េចហើយ', 'ម៉េចហើយជីវិត', 'សុខសប្បាយទេ', 'សុខទេ', 'អ្នកសុខសប្បាយទេ', 'មានរឿងអី', 'យ៉ាងម៉េចហើយ',
    'អរគុណ', 'thanks', 'ok', 'okay', 'យល់ព្រម', 'joke', 'កំប្លែង', 'ហត់', 'tired', 'help', 'ជួយ', 'what is', 'how to', 'explain', 'create', 'make', 'draw', 'edit', 'fix', 'idea', 'inspiration', 'tutorial', 'guide', 'tips', 'trick', 'hack', 'app', 'application', 'free', 'certificate', 'quiz', 'ឥតគិតថ្លៃ', 'វិញ្ញាបនបត្រ', 'តេស្ត',

    // 2. Lightroom & Photography
    'lightroom', 'preset', 'filter', 'exposure', 'contrast', 'highlights', 'shadows', 'whites', 'blacks', 'texture', 'clarity', 'dehaze', 'vibrance', 'saturation', 'tone curve', 'color grading', 'color mix', 'hsl', 'detail', 'sharpening', 'noise reduction', 'lens correction', 'geometry', 'transform', 'masking', 'linear gradient', 'radial gradient', 'color range', 'luminance range', 'subject', 'sky', 'background', 'raw', 'dng', 'jpeg', 'iso', 'aperture', 'shutter speed', 'focal length', 'depth of field', 'dof', 'bokeh', 'white balance', 'temp', 'tint', 'histogram', 'vignette', 'grain', 'retouch', 'healing brush', 'clone stamp', 'optics', 'profile', 'chromatic aberration', 'split toning', 'calibration',
    'រូបថត', 'ថតរូប', 'កែពណ៌', 'ព្រិល', 'ព្រិលផ្ទៃខាងក្រោយ', 'កាត់តរូប', 'កាត់ background', 'ពន្លឺ', 'ស្រមោល', 'កម្រិតពន្លឺ', 'ភាពច្បាស់', 'រលោង', 'បំបាត់មុន', 'ពណ៌ស្រស់', 'ពណ៌ស្លេក', 'កែរូប', 'ព្រីសិត', 'ហ្វ៊ីលទ័រ', 'ផ្ទៃខាងក្រោយ', 'មេឃ', 'កាមេរ៉ា', 'ឡេន',

    // 3. Tools & Interface
    'pen tool', 'brush tool', 'magic wand', 'lasso', 'marquee', 'eyedropper', 'gradient tool', 'shape builder', 'pathfinder', 'layer mask', 'clipping mask', 'content-aware', 'liquify', 'dodge', 'burn', 'sponge', 'smudge', 'drop shadow', 'inner shadow', 'outer glow', 'bevel', 'emboss', 'stroke', 'fill', 'smart object', 'adjustment layer', 'artboard', 'anchor point', 'direct selection', 'perspective grid', 'blend tool', 'image trace', 'auto layout', 'component', 'variant', 'plugin', 'boolean operation',
    'keyframe', 'timeline', 'sequence', 'transition', 'cross dissolve', 'razor tool', 'ripple edit', 'rolling edit', 'rate stretch', 'slip tool', 'slide tool', 'color matte', 'rotobrush', 'tracker', 'motion blur', 'graph editor', 'pre-compose', 'null object', 'puppet pin', 'expressions', 'luma matte', 'alpha matte', 'chroma key', 'green screen', 'lut', 'lumetri', 'audio sync', 'render', 'codec', 'bitrate', 'fps', 'frame rate',
    'កាត់វីដេអូ', 'កាត់ត', 'អេហ្វិច', 'សំឡេង', 'ល្បឿន', 'tool', 'menu', 'panel', 'shortcut', 'ឧបករណ៍', 'ម៉ឺនុយ',

    // 4. Graphic Design Core
    'design', 'graphic', 'art', 'layout', 'composition', 'grid', 'alignment', 'balance', 'hierarchy', 'scale', 'proportion', 'repetition', 'white space', 'negative space', 'rule of thirds', 'golden ratio', 'focal point', 'tension', 'margin', 'bleed', 'crop', 'trim', 'canvas', 'visual', 'aesthetics', 'motif', 'pattern', 'shape', 'form', 'texture', 'symmetry', 'asymmetry', 'perspective',
    'រចនា', 'ឌីហ្សាញ', 'សិល្បៈ', 'គូរ', 'ប្លង់', 'ក្រឡាចត្រង្គ', 'តម្រឹម', 'តុល្យភាព', 'ភាពផ្ទុយ', 'ឋានានុក្រម', 'ទំហំ', 'សមាមាត្រ', 'ចន្លោះទទេ', 'ចំណុចកណ្តាល', 'គែម', 'កាត់', 'ទ្រឹស្តី', 'គោលការណ៍', 'គន្លឹះ', 'រូបរាង', 'សោភ័ណភាព',

    // 5. Color Theory
    'color', 'colour', 'rgb', 'cmyk', 'hex', 'pantone', 'hue', 'palette', 'harmony', 'complementary', 'analogous', 'triadic', 'monochromatic', 'psychology', 'gradient', 'opacity', 'transparency', 'blend mode', 'swatches', 'grayscale', 'warm color', 'cool color', 'color wheel',
    'ពណ៌', 'លាយពណ៌', 'ចិត្តសាស្ត្រពណ៌', 'កូដពណ៌', 'ក្ដៅ', 'ត្រជាក់', 'ភាពថ្លា',

    // 6. Typography
    'typography', 'font', 'text', 'type', 'typeface', 'kerning', 'tracking', 'leading', 'serif', 'sans-serif', 'script', 'display', 'slab', 'ligature', 'baseline', 'x-height', 'ascender', 'descender', 'paragraph', 'heading', 'glyph', 'lorem ipsum', 'uppercase', 'lowercase', 'lettering', 'calligraphy', 'weight', 'italic', 'bold',
    'អក្សរ', 'ហ្វុន', 'វាយអត្ថបទ', 'គម្លាតអក្សរ', 'បន្ទាត់', 'កថាខណ្ឌ', 'ចំណងជើង', 'ទំហំអក្សរ', 'កម្រាស់អក្សរ',

    // 7. Vector & Formats
    'vector', 'raster', 'pixel', 'resolution', 'dpi', 'ppi', 'svg', 'png', 'jpg', 'pdf', 'eps', 'tiff', 'gif', 'export', 'import', 'compression', 'anti-aliasing', 'layer', 'mask', 'path', 'node', 'bezier',
    'វ៉ិចទ័រ', 'រ៉ាស្ទ័រ', 'ភីកសែល', 'គុណភាពរូប', 'បែករូប', 'ច្បាស់', 'ឡេយ័រ', 'សេវ', 'អិចស្ពត', 'លុប',

    // 8. UI/UX
    'ui', 'ux', 'user interface', 'user experience', 'wireframe', 'prototype', 'mockup', 'web', 'app', 'mobile', 'responsive', 'button', 'cta', 'icon', 'iconography', 'interaction', 'bento', 'glassmorphism', 'neumorphism', 'flat design', 'accessibility', 'usability', 'affordance', 'heuristic', 'journey', 'persona', 'frontend', 'css', 'html',

    // 9. Software
    'photoshop', 'illustrator', 'indesign', 'figma', 'affinity', 'premiere', 'after effects', 'canva', 'midjourney', 'firefly', 'ai', 'procreate', 'coreldraw', 'davinci', 'blender', 'cinema 4d', 'maya', 'capcut', 'final cut', 'sketch', 'xd', 'motion graphic', 'animation', 'vfx', 'chatgpt',

    // 10. Print & Business
    'print', 'prepress', 'offset', 'gsm', 'paper', 'ink', 'dot gain', 'overprint', 'knockout', 'trapping', 'emboss', 'foil', 'die cut', 'matte', 'glossy', 'color profile', 'icc',
    'បោះពុម្ព', 'រោងពុម្ព', 'ក្រដាស', 'ទឹកថ្នាំ', 'ខ្នាត',
    'portfolio', 'client', 'freelance', 'price', 'pricing', 'contract', 'deposit', 'copyright', 'plagiarism', 'brand', 'branding', 'logo', 'identity', 'retainer', 'imposter', 'brief', 'pitch', 'case study', 'rate', 'invoice', 'gestalt', 'hicks law', 'fitts law', 'nielsen', 'archetype', 'rebrand', 'guidelines',
    'អតិថិជន', 'ភ្ញៀវ', 'រកការងារ', 'តម្លៃ', 'គិតលុយ', 'កិច្ចសន្យា', 'កម្មសិទ្ធិបញ្ញា', 'ឡូហ្គោ', 'យីហោ', 'ម៉ាក', 'រកចំណូល', 'អាជីវកម្ម',

    // 11. Basic Colors & Shapes
    'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'black', 'white', 'gray', 'pink', 'brown',
    'ក្រហម', 'ខៀវ', 'បៃតង', 'លឿង', 'ទឹកក្រូច', 'ស្វាយ', 'ខ្មៅ', 'ស', 'ប្រផេះ', 'ផ្កាឈូក', 'ត្នោត',
    'circle', 'square', 'triangle', 'rectangle', 'polygon', 'star', 'line', 'curve',
    'រង្វង់', 'ការ៉េ', 'ត្រីកោណ', 'ចតុកោណ', 'បន្ទាត់', 'រាងកោង',

    // 12. ✦ AFFINITY-SPECIFIC VOCABULARY (Photo · Designer · Publisher) ✦
    'affinity', 'affinity photo', 'affinity designer', 'affinity publisher', 'affinity pro', 'affinity suite',
    'persona', 'pixel persona', 'develop persona', 'export persona', 'liquify persona', 'photo persona', 'designer persona', 'tone mapping persona',
    'studiolink', 'studio link', 'live filter', 'live filters', 'frequency separation', 'inpaint', 'inpainting', 'blemish', 'healing', 'clone', 'develop',
    'macro', 'macros', 'snapshot', 'symbol', 'symbols', 'constraint', 'slice', 'slices', 'snapping', 'isometric',
    'master page', 'master pages', 'facing pages', 'spread', 'data merge', 'preflight', 'baseline grid', 'sections',
    'text frame', 'frame text', 'artistic text', 'picture frame', 'text style', 'paragraph style', 'character style', 'table', 'auto-flow', 'autoflow',
    'node tool', 'corner tool', 'geometry operation', 'boolean', 'expand stroke', 'global color', 'swatch', 'assets', 'assets panel',
    'blend range', 'blend ranges', 'rasterize', 'group', 'ungroup', 'recolor', 'studio', 'resource manager', 'linked', 'embedded',
    'photo', 'designer', 'publisher', 'power duplicate',
    'អាហ្វីនីធី', 'ស្រទាប់', 'របាំង', 'ទំព័រមេ', 'រ៉េតធូស', 'ស្លាយ',
];

// ==========================================
// 🛡️ THE GATEKEEPER FUNCTION (GOD-TIER REFINED)
// ==========================================
export const isDesignRelated = (userInput) => {
    if (!userInput || userInput.trim().length === 0) return false;
    
    const cleanInput = userInput.toLowerCase().trim();

    return DESIGN_DICTIONARY_WHITELIST.some(keyword => {
        const lowerKeyword = keyword.toLowerCase();

        // 1. សម្រាប់ពាក្យបច្ចេកទេសអង់គ្លេសខ្លីៗ (ឧ. 'ai', 'ui', 'ux', 'rgb')
        // ប្រើ \b ដើម្បីការពារកុំឱ្យច្រឡំ (ឧ. 'rain' មិនឱ្យជាប់ 'ai' ទេ)
        if (lowerKeyword.length <= 3 && /^[a-z0-9]+$/.test(lowerKeyword)) {
            const enRegex = new RegExp(`\\b${lowerKeyword}\\b`, 'i');
            return enRegex.test(cleanInput);
        }

        // 2. សម្រាប់ពាក្យខ្មែរខ្លីៗ (ឧ. 'ស', 'ខ្មៅ', 'កែ')
        // ដោយសារ \b មិនស្គាល់អក្សរខ្មែរ យើងប្រើ Custom Boundary Logic
        // លក្ខខណ្ឌ៖ ត្រូវនៅក្បាល/កន្ទុយប្រយោគ, ជាប់ដកឃ្លា, ឬជាប់សញ្ញាផ្សេងៗដែលមិនមែនអក្សរខ្មែរ
        if (/[\u1780-\u17FF]/.test(lowerKeyword) && lowerKeyword.length <= 2) {
            const boundary = '(^|[\\s]|[^\\u1780-\\u17FF])';
            const khRegex = new RegExp(`${boundary}${lowerKeyword}(${boundary.replace('^', '$')})`, 'i');
            return khRegex.test(cleanInput);
        }

        // 3. សម្រាប់ឃ្លាវែងៗ ឬពាក្យបច្ចេកទេសទូទៅ
        // ប្រើ .includes() ធម្មតាដើម្បីឱ្យមានភាពបត់បែន
        return cleanInput.includes(lowerKeyword);
    });
};