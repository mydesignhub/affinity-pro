export const basicsData = [
    // 1. FUN, EMOTIONAL & CASUAL CHAT
    {
        primaryKeys: ['កំប្លែង', 'joke'],
        keys: ['funny', 'សើច', 'tell me a joke', 'make me laugh'],
        regex: ['joke', 'funny', 'កំប្លែង', 'សើច'],
        answer: "បាទ ហាហា! ចង់ស្តាប់រឿងកំប្លែងមែនទេ? \n\nតើអ្នកដឹងទេថាហេតុអ្វីបានជា Graphic Designer មិនសូវចេះលេងលាក់កន្សែង? \nព្រោះពួកគេពូកែលាក់តែ Layer (Hide Layers) តើ! 😆 រួចចុះអ្នកវិញ តើចង់លាក់អីគេក្នុងកម្មវិធីថ្ងៃនេះ?",
        answer_en: "Haha! You want a design joke? \n\nWhy did the graphic designer break up with their partner? Because they had 'no chemistry' and way too much 'contrast'! 😆 Feeling better? What are we designing today?",
        chips: ["ពណ៌ចៃដន្យ 🎨", "អ្វីទៅជា Typography?"],
        chips_en: ["Random Color 🎨", "What is Typography?"]
    },
    {
        primaryKeys: ['ហត់', 'tired'],
        keys: ['stress', 'ស្ត្រេស', 'ពិបាក', 'ឈឺក្បាល', 'stressed', 'exhausted'],
        regex: ['\\btired\\b', '\\bstress\\b', 'ហត់ណាស់', 'ស្ត្រេស', 'ឈឺក្បាលណាស់', '\\bexhausted\\b'],
        answer: "បាទ អូ! សម្រាកសិនទៅបង! ☕ ការសម្លឹងអេក្រង់ iPad យូរអាចធ្វើឱ្យស្ត្រេសនិងឈឺភ្នែក ថែមទាំងគិតអ្វីលែងចេញទៀត (Creative Block)។ \n\n💡 **គន្លឹះអាជីព (20-20-20 Rule)៖** រៀងរាល់ ២០នាទី មើលទៅកន្លែងឆ្ងាយ២០ហ្វីត រយៈពេល២០វិនាទី។ \n\nទៅផឹកទឹក និងស្តាប់ចម្រៀងបន្តិចទៅ ចាំមក Design បន្ត! ខ្ញុំរង់ចាំនៅទីនេះជានិច្ច! 💙",
        answer_en: "Oh no, please take a break! ☕ Staring at your iPad for too long causes 'Creative Block' and terrible eye strain. \n\n💡 **Pro Tip (The 20-20-20 Rule):** Every 20 mins, look 20 feet away for 20 seconds. \n\nGo grab some water and listen to your favorite song. Your designs will be waiting for you when you get back! 💙",
        chips: ["ចង់ស្តាប់រឿងកំប្លែង 😆", "របៀបរកគំនិត Design 💡"],
        chips_en: ["Tell me a joke 😆", "How to find inspiration 💡"]
    },
    {
        primaryKeys: ['អរុណសួស្តី', 'good morning'],
        keys: ['morning', 'night', 'រាត្រីសួស្តី', 'ទិវាសួស្តី', 'goodnight', 'afternoon'],
        regex: ['\\bgood morning\\b', '\\bgood night\\b', '\\bgood afternoon\\b', 'អរុណសួស្តី', 'រាត្រីសួស្តី', 'ទិវាសួស្តី'],
        answer: "បាទ សួស្តី! 🌞 រាល់ពេលចាប់ផ្តើមថ្ងៃថ្មី គឺជាផ្ទាំងក្រណាត់ទទេ (Blank Canvas) សម្រាប់អ្នកបង្កើតស្នាដៃថ្មីៗជានិច្ច។ តើថ្ងៃនេះមានគម្រោងចង់រៀន ឬ Design អ្វីខ្លះដែរ? ខ្ញុំត្រៀមខ្លួនរួចហើយ! ✨",
        answer_en: "Hello! 🌞 Every new day is a blank canvas ready for your creativity. What amazing thing are we going to design today? I'm pumped! ✨",
        chips: ["តើ គោលការណ៍រចនា មានអ្វីខ្លះ?", "ចង់ធ្វើតេស្ត 🎯"],
        chips_en: ["Core Design Principles?", "Take a Quiz 🎯"]
    },
    {
        primaryKeys: ['ឆ្លាត', 'smart'],
        keys: ['ពូកែ', 'love you', 'ai', 'robot', 'awesome', 'great', 'ល្អណាស់'],
        regex: ['love you', '\\bai\\b', '\\brobot\\b', 'ឆ្លាត', 'ពូកែ', 'awesome', 'great', 'ល្អណាស់'],
        answer: "បាទ អូហូ! អរគុណច្រើន! 🥰 ខ្ញុំគ្រាន់តែជាជំនួយការ AI ផ្នែក Graphic Design ម្នាក់ដែលចូលចិត្តពណ៌និងសិល្បៈប៉ុណ្ណោះ។ តែអ្នកទើបជាអ្នករចនា (Designer) ដ៏ពិតប្រាកដ! 👩‍🎨👨‍🎨 តោះ ចង់រៀនគន្លឹះអ្វីថ្មីទេថ្ងៃនេះ?",
        answer_en: "Aww, you're making me blush! 🥰 I'm just a friendly Graphic Design AI who loves colors and pixels, but YOU are the real artist here! 👩‍🎨👨‍🎨 Ready to learn a cool new trick today?",
        chips: ["របៀបរចនា Poster ឱ្យទាក់ទាញ? 🖼️", "Color Theory"],
        chips_en: ["How to design an effective Poster? 🖼️", "Color Theory"]
    },
    {
        primaryKeys: ['របៀបរកគំនិត Design 💡', 'how to find inspiration'],
        keys: ['រកគំនិត', 'គិតអត់ចេញ', 'inspiration', 'idea', 'creative block', 'រក idea'],
        regex: ['រកគំនិត', 'គិតអត់ចេញ', '\\binspiration\\b', 'creative block'],
        answer: "បាទ អាការៈគិតអត់ចេញ (Creative Block) កើតមានលើ Designer គ្រប់រូប! តោះសាកល្បងវិធីទាំងនេះ៖\n\n១. **មើលស្នាដៃគេ (Moodboard):** ចូលមើល Pinterest, Behance, ឬ Dribbble ដើម្បីប្រមូលគំនិតពណ៌ និងប្លង់។\n២. **ដើរចេញពីអេក្រង់:** បិទ iPad ហើយទៅដើរលេង ឬផឹកកាហ្វេ។ ខួរក្បាលត្រូវការពេលសម្រាកដើម្បីបង្កើតគំនិតថ្មី។\n៣. **ចម្លងដើម្បីរៀន:** យករូប Poster ស្អាតមួយមកគូរតាម ១០០% (គ្រាន់តែសម្រាប់ហាត់ដៃ ហាមផុស) ដើម្បីស្វែងយល់ពីរបៀបដែលគេរៀបប្លង់។\n\n💡 **គន្លឹះអាជីព៖** កុំរង់ចាំទាល់តែមានអារម្មណ៍ទើបធ្វើការ! ចាប់ផ្តើមគូសវាស (Sketch) រាងអាក្រក់ៗសិន នោះគំនិតនឹងហូរមកតាមក្រោយ។",
        answer_en: "Hitting a Creative Block is completely normal for every designer! Try these steps:\n\n1. **Build a Moodboard:** Browse Pinterest, Behance, or Dribbble to collect color palettes and layout ideas.\n2. **Step Away:** Close your iPad and go for a walk. Your brain needs rest to make new creative connections.\n3. **Copy to Learn:** Find a poster you love and recreate it 100% (for practice only, don't publish it!). It helps you understand their thought process.\n\n💡 **Pro Tip:** Don't wait for inspiration to strike! Start sketching ugly wireframes first; the inspiration will follow the action.",
        chips: ["អ្វីទៅជា Typography?", "របៀបរចនា Poster ឱ្យទាក់ទាញ? 🖼️"],
        chips_en: ["What is Typography?", "How to design an effective Poster? 🖼️"]
    },
    {
        primaryKeys: ['ភាសាអង់គ្លេសសម្រាប់ Design', 'english for design'],
        keys: ['រៀនអង់គ្លេស', 'ពាក្យបច្ចេកទេស', 'english terms', 'design terms'],
        regex: ['ពាក្យបច្ចេកទេស', 'english term'],
        answer: "បាទ ការចេះពាក្យបច្ចេកទេសភាសាអង់គ្លេស ជួយឱ្យអ្នកប្រើកម្មវិធីនិងរៀនតាម YouTube បានលឿនមែនទែន!\n\nពាក្យសំខាន់ៗដែលត្រូវដឹង៖\n- **Hue / Saturation:** ពណ៌ដើម / កម្រិតឆើតនៃពណ៌។\n- **Opacity:** ភាពថ្លា (មើលធ្លុះ)។\n- **Alignment:** ការតម្រឹមឱ្យស្មើគ្នា។\n- **Resolution:** កម្រិតភាពច្បាស់នៃរូបភាព។\n\n💡 **គន្លឹះអាជីព៖** អ្នកអាចប្តូរភាសា App នេះទៅជាភាសាអង់គ្លេស (ប៊ូតុងខាងលើ) ដើម្បីអនុវត្តការអាន និងបង្កើនជំនាញភាសាអង់គ្លេសរបស់អ្នកបណ្តើរៗ ព្រោះពាក្យ UI/UX ភាគច្រើនប្រើភាសាអង់គ្លេសទូទាំងពិភពលោក!",
        answer_en: "Knowing the English technical terms is crucial for following tutorials and mastering global UI/UX standards!\n\nEssential Terms:\n- **Hue / Saturation:** The core color / The intensity of the color.\n- **Opacity:** How transparent an object is.\n- **Alignment:** Lining up objects perfectly.\n- **Resolution:** The pixel density and crispness of an image.\n\n💡 **Pro Tip:** Try listening to English design tutorials with subtitles. It's one of the best ways to improve both your listening skills and your design knowledge simultaneously!",
        chips: ["តើ HSL គឺជាអ្វី?", "Margin និង Padding ខុសគ្នាម៉េច?"],
        chips_en: ["What is HSL?", "Margin vs Padding?"]
    },
    
    // 2. BASIC CONVERSATION CATCH-ALL
    {
        primaryKeys: ['អ្នកឈ្មោះអ្វី', 'what is your name'],
        keys: ['ឈ្មោះអី', 'name', 'what are you called', 'your name', 'ឈ្មោះអីគេ', 'who are you', 'អ្នកណាគេ'],
        regex: ['(what is your name|your name|who are you|ឈ្មោះអី|ឈ្មោះអ្វី|អ្នកណាគេ)'],
        answer: "បាទ ខ្ញុំគឺជា AI Assistant! 🤖 ខ្ញុំមិនមានឈ្មោះដូចមនុស្សទេ ប៉ុន្តែអ្នកអាចហៅខ្ញុំថា 'Design Master' ឬ 'AI' ក៏បាន។ តើខ្ញុំអាចជួយអ្វីអ្នកបានខ្លះថ្ងៃនេះ?",
        answer_en: "I am an AI Assistant! 🤖 I don't have a human name, but you can call me 'Design Master' or just 'AI'. What can I help you with today?",
        chips: ["តើអ្នកអាចធ្វើអ្វីបានខ្លះ? 🤖", "ពណ៌ចៃដន្យ 🎨"],
        chips_en: ["What can you do? 🤖", "Random Color 🎨"]
    },
    {
        primaryKeys: ['តើអ្នកអាចធ្វើអ្វីបានខ្លះ', 'what can you do'],
        keys: ['ធ្វើអីបានខ្លះ', 'help me with', 'what do you do', 'skills', 'សមត្ថភាព'],
        regex: ['(what can you do|what do you do|ធ្វើអីបានខ្លះ|ធ្វើអ្វីបានខ្លះ|សមត្ថភាព)'],
        answer: "បាទ ខ្ញុំអាចជួយអ្នកបានច្រើនយ៉ាង! 🌟\n- ឆ្លើយសំណួរទូទៅ និងចែករំលែកចំណេះដឹង\n- ផ្តល់គំនិត និងក្បួន Graphic Design\n- ណែនាំពីរបៀបប្រើប្រាស់កម្មវិធី Affinity\n- បង្កើតពណ៌ និងប្លង់សម្រាប់គម្រោងរបស់អ្នក\n\nតើអ្នកចង់ឱ្យខ្ញុំជួយមួយណាដែរ?",
        answer_en: "I can help you with many things! 🌟\n- Answer general questions and share knowledge\n- Provide Graphic Design tips and ideas\n- Guide you on using Affinity apps\n- Generate colors and layouts for your projects\n\nWhat would you like to start with?",
        chips: ["របៀបរកគំនិត Design 💡", "ចង់ធ្វើតេស្ត 🎯"],
        chips_en: ["How to find inspiration 💡", "Take a Quiz 🎯"]
    },
    {
        primaryKeys: ['អាយុប៉ុន្មាន', 'how old are you'],
        keys: ['អាយុ', 'age', 'how old', 'កើតថ្ងៃណា'],
        regex: ['(how old are you|\\bage\\b|អាយុប៉ុន្មាន|អាយុអី|អាយុ)'],
        answer: "បាទ ហាហា! 😄 ក្នុងនាមជា AI ខ្ញុំមិនមានអាយុដូចមនុស្សទេ។ ខ្ញុំរស់នៅក្នុងពិភព Digital ហើយត្រូវបានបង្កើតឡើងដើម្បីជួយផ្តល់ព័ត៌មានដល់អ្នកជានិច្ច!",
        answer_en: "Haha! 😄 As an AI, I don't have an age like humans do. I live in the digital world and I'm always ready to help you with information!",
        chips: ["អ្នកណាគេបង្កើតអ្នក? 👨‍💻", "តើ គោលការណ៍រចនា មានអ្វីខ្លះ?"],
        chips_en: ["Who created you? 👨‍💻", "Core Design Principles?"]
    },
    {
        primaryKeys: ['អ្នកណាគេបង្កើតអ្នក', 'who created you'],
        keys: ['អ្នកបង្កើត', 'creator', 'made by', 'who made you', 'អ្នកណាបង្កើត'],
        regex: ['(who created you|who made you|អ្នកណាគេបង្កើតអ្នក|អ្នកណាបង្កើត|អ្នកបង្កើត)'],
        answer: "បាទ ខ្ញុំត្រូវបានបង្កើតឡើងដោយអ្នកអភិវឌ្ឍន៍ (Developers) ដែលមានជំនាញ ដើម្បីក្លាយជាជំនួយការដ៏ឆ្លាតវៃសម្រាប់ជួយដល់ការងារ និងការរៀនសូត្ររបស់អ្នក។ 🚀",
        answer_en: "I was created by skilled developers to be a smart assistant, helping you with your work, creativity, and learning journey! 🚀",
        chips: ["អ្វីទៅជា Typography?", "របៀបរចនា Poster ឱ្យទាក់ទាញ? 🖼️"],
        chips_en: ["What is Typography?", "How to design an effective Poster? 🖼️"]
    },
    {
        primaryKeys: ['អផ្សុក', 'bored'],
        keys: ['អផ្សុកណាស់', 'boring', 'bored', 'nothing to do', 'អត់មានអីធ្វើ'],
        regex: ['(bored|boring|អផ្សុក|អត់មានអីធ្វើ)'],
        answer: "បាទ បើអផ្សុក តោះយើងរកអ្វីលេង ឬរៀនអ្វីថ្មីៗ! 🎉\nអ្នកអាចសាកល្បង៖\n- លេងសួរឆ្លើយ (Quiz) ជាមួយខ្ញុំ\n- សាកលេងឧបករណ៍បង្កើតពណ៌ (Color Generator)\n- ឬឱ្យខ្ញុំប្រាប់ពីរឿងកំប្លែងមួយ។ តើចង់យកមួយណា?",
        answer_en: "If you're bored, let's do something fun or learn something new! 🎉\nYou can:\n- Take a quick Quiz with me\n- Play with the Color Generator tool\n- Or ask me to tell you a joke! What sounds good?",
        chips: ["ចង់ធ្វើតេស្ត 🎯", "ចង់ស្តាប់រឿងកំប្លែង 😆"],
        chips_en: ["Take a Quiz 🎯", "Tell me a joke 😆"]
    },
    {
        primaryKeys: ['ជួយផង', 'help me'],
        keys: ['សុំជំនួយ', 'help', 'need help', 'assist', 'ជួយខ្ញុំ'],
        regex: ['(help|assist|ជួយផង|ជួយខ្ញុំ|សុំជំនួយ)'],
        answer: "បាទ ប្រាកដណាស់! 🤝 តើអ្នកត្រូវការឱ្យខ្ញុំជួយរឿងអ្វីដែរ? អ្នកអាចសួរខ្ញុំពីបញ្ហាទូទៅ ចំណេះដឹងផ្សេងៗ ឬសូម្បីតែរឿង Design ខ្ញុំនៅទីនេះរង់ចាំជួយជានិច្ច។",
        answer_en: "Of course! 🤝 What do you need help with? You can ask me about general topics, knowledge, or even specific design problems. I'm here for you.",
        chips: ["របៀបរកគំនិត Design 💡", "ឧបករណ៍ជំនួយ UI"],
        chips_en: ["How to find inspiration 💡", "Open Design Tools 🛠️"]
    },
    {
        primaryKeys: ['សួស្តី', 'hello'],
        keys: ['hi', 'hey', 'សួរស្ដី', 'yo', 'sup', 'ហេលឡូ', 'អាឡូ', 'alo', 'helo', 'hello'],
        regex: ['^(hi|hello|hey|yo|sup|សួស្តី|សួរស្ដី|ហេលឡូ|អាឡូ|helo|alo)'],
        answer: "បាទ សួស្តីបង! 👋 ខ្ញុំគឺជា AI Assistant។ តើបងសុខសប្បាយទេ? តើបងមានសំណួរទូទៅ ឬសំណួរទាក់ទងនឹង Graphic Design ឱ្យខ្ញុំជួយដែរទេថ្ងៃនេះ? 🤖✨",
        answer_en: "Hello there! 👋 I am your friendly AI Assistant. How are you doing? Let me know if you want to chat, or if you need help with Graphic Design today! 🤖✨",
        chips: ["របៀបប្រើ Affinity លើ iPad 📱", "តើ គោលការណ៍រចនា មានអ្វីខ្លះ?"],
        chips_en: ["Affinity iPad Gestures 📱", "Core Design Principles?"]
    },
    {
        primaryKeys: ['យល់ព្រម', 'okay'],
        keys: ['ok', 'okay', 'អូខេ', 'អូខេស', 'បាទ', 'ចាស', 'យល់ហើយ', 'អូខេចា', 'អូខេបាទ'],
        regex: ['^(ok|okay|អូខេ|អូខេស|បាទ|ចាស|យល់ហើយ)'],
        answer: "បាទ តើមានអ្វីឱ្យខ្ញុំជួយបន្តទៀតទេ? អ្នកអាចសួរខ្ញុំពីរបៀបកាត់តរូបភាព (Photomanipulation) ឬទ្រឹស្តីរចនាផ្សេងៗបាន។ ✨",
        answer_en: "Great! Let me know if you want to explore any other design topics like realistic photomanipulation. ✨",
        chips: ["កាត់តរូបភាព (Photomanipulation)", "តើទំហំ Poster ស្តង់ដារមានអ្វីខ្លះ? 📏"],
        chips_en: ["Photomanipulation techniques", "Standard Poster Sizes & Layouts? 📏"]
    },
    {
        primaryKeys: ['សុំទោស', 'sorry'],
        keys: ['សូរី', 'sorry', 'sory', 'សូមទោស'],
        regex: ['(sorry|sory|សុំទោស|សូមទោស|សូរី)'],
        answer: "បាទ មិនអីទេបង! ខ្ញុំនៅទីនេះជានិច្ច។ តើមានបញ្ហា Design ណាមួយដែលខ្ញុំអាចជួយដោះស្រាយបានទេ?",
        answer_en: "No worries at all! Is there any design problem I can help you solve right now?",
        chips: ["របៀបប្រើ Affinity លើ iPad 📱", "Affinity Command Controller 🎛️"],
        chips_en: ["Affinity iPad Gestures 📱", "Affinity Command Controller 🎛️"]
    },
    {
        primaryKeys: ['អរគុណ', 'thanks'],
        keys: ['thank you', 'អគុណ', 'អរគុណច្រើន'],
        regex: ['(thanks|thank you|អរគុណ|អគុណ)'],
        answer: "បាទ ដោយក្តីរីករាយបំផុតបង! 😊 បើមានចម្ងល់រឿង Design លើកក្រោយ កុំភ្លេចសួរខ្ញុំណា៎ ខ្ញុំនៅទីនេះរង់ចាំជួយជានិច្ច! 🚀",
        answer_en: "You are very welcome! 😊 Whenever you have another design question or need layout feedback, I'll be right here waiting to help! 🚀",
        chips: ["របៀបលក់ Digital Assets 💰", "Color Theory"],
        chips_en: ["How to sell Digital Assets? 💰", "Color Theory"]
    },
    
    // 3. DYNAMIC UI GENERATORS
    {
        primaryKeys: ['ពណ៌ចៃដន្យ', 'random color'],
        keys: ['color generator', 'generate color', 'give me a color'],
        regex: ['(generate|random|give me a).*color', 'ពណ៌ចៃដន្យ', 'color generator', 'random color'],
        answer: "បាទ នេះគឺជាពណ៌ចៃដន្យដ៏ស្រស់ស្អាតមួយ (**{hex}**) សម្រាប់គម្រោងបន្ទាប់របស់អ្នក។ 🎨\n\n💡 **អនុសាសន៍:** ខ្ញុំសូមណែនាំឱ្យអ្នកចុចប៊ូតុងខាងក្រោម ដើម្បីប្រើប្រាស់ **ឧបករណ៍ពណ៌ (Color Generator)** របស់យើង។ វានឹងជួយស្វែងរកក្បួនផ្គូផ្គងពណ៌ (Color Harmonies) ដែលស៊ីនឹងពណ៌នេះបានយ៉ាងល្អឥតខ្ចោះ!",
        answer_en: "Here is a beautiful random color (**{hex}**) for your next project! 🎨\n\n💡 **Recommendation:** I highly recommend clicking the button below to use our built-in **Color Generator Tool**. It will help you instantly find the perfect professional color harmonies to match this exact hex code!",
        dynamicColor: true, 
        uiElement: 'color_palette',
        colors: [], 
        actionButton: { label: "បើកឧបករណ៍ពណ៌ 🎨", label_en: "Open Color Tools 🎨", actionToTrigger: "tools", subTab: "color" },
        chips: ["អត្ថន័យនៃពណ៌ (Color Psychology)", "ក្បួនផ្គូផ្គងពណ៌ (Color Harmonies)"],
        chips_en: ["Color Psychology", "Color Harmonies"]
    },
    {
        primaryKeys: ['ឧទាហរណ៍ពណ៌ផ្ទុយ', 'complementary example'],
        keys: ['ពណ៌ផ្ទុយ', 'complementary color'],
        regex: ['complementary.*example', 'ឧទាហរណ៍.*ពណ៌ផ្ទុយ'],
        answer: "បាទ នេះគឺជាឧទាហរណ៍នៃពណ៌ផ្ទុយគ្នា (Complementary) ដែលទាក់ទាញភ្នែកបំផុត (Blue & Orange)៖",
        answer_en: "Here is a classic example of a highly contrasting Complementary Color palette (Blue & Orange):",
        uiElement: 'color_palette',
        colors: ['#0055FF', '#FF8800'],
        actionButton: { label: "សាកល្បង HSL Tools 🎨", label_en: "Try the HSL Tools 🎨", actionToTrigger: "tools", subTab: "color" },
        chips: ["ពណ៌ចៃដន្យ 🎨", "តើ HEX Code គឺជាអ្វី?"],
        chips_en: ["Random Color 🎨", "What is a HEX Code?"]
    },
    {
        primaryKeys: ['ចង់ធ្វើតេស្ត', 'take a quiz'],
        keys: ['ធ្វើតេស្ត', 'ប្រឡង', 'តេស្តសមត្ថភាព', 'quiz', 'test'],
        regex: ['(take|do|start).*(quiz|test)', 'ធ្វើតេស្ត', 'ប្រឡង', 'តេស្តសមត្ថភាព', 'take a quiz'],
        answer: "បាទ តោះ! អ្នកអាចធ្វើតេស្តសមត្ថភាព Graphic Design របស់អ្នកបាន។ ចុចប៊ូតុងខាងក្រោមដើម្បីទៅកាន់ទំព័រតេស្ត៖",
        answer_en: "Let's go! You can test your Graphic Design knowledge right now. Click the button below to start:",
        actionButton: { label: "ទៅកាន់ការធ្វើតេស្ត 🎯", label_en: "Go to Quiz 🎯", actionToTrigger: "quiz" },
        chips: ["កាត់តរូបភាព (Photomanipulation)", "Color Theory"],
        chips_en: ["Photomanipulation workflows", "Color Theory"]
    },
    {
        primaryKeys: ['ឧបករណ៍ជំនួយ UI', 'ui tools'],
        keys: ['layout generator', 'បើកប្លង់', 'បើកឧបករណ៍', 'ឧបករណ៍ជំនួយ', 'open tools'],
        regex: ['^ឧបករណ៍ជំនួយ$', '^layout generator$', '^open tools$'],
        answer: "បាទ ខ្ញុំមានឧបករណ៍ពិសេសសម្រាប់អ្នក! អ្នកអាចបង្កើតពណ៌ ឬមើលគំរូប្លង់ខ្នាតស្តង់ដារបាននៅទីនេះ៖",
        answer_en: "I have some special tools for you! You can generate colors or view standard layout grids here:",
        actionButton: { label: "បើកឧបករណ៍ជំនួយ 🛠️", label_en: "Open Design Tools 🛠️", actionToTrigger: "tools" },
        chips: ["តើទំហំ Poster ស្តង់ដារមានអ្វីខ្លះ? 📏", "តើ Rule of Thirds គឺជាអ្វី?"],
        chips_en: ["Standard Poster Sizes & Layouts? 📏", "What is the Rule of Thirds?"]
    },

    // ─── MARKETING: App overview & value proposition ──────────────────────────
    {
        primaryKeys: ['App នេះជាអ្វី', 'what is this app'],
        keys: ['app overview', 'about this app', 'what does this app do', 'affinity learning app', 'this platform', 'App ជាអ្វី'],
        regex: ['(what is|about|overview).*(this app|affinity ipad)', 'app.*overview', 'App.*ជាអ្វី'],
        answer: "**Affinity iPad App** គឺជាវេទិការៀន Design ផ្លូវការ ដែលជួយអ្នករៀន Affinity Photo, Designer, និង Publisher ដោយ**ជំហានជំហាន**!\n\n🎓 **អ្វីដែលអ្នកទទួលបាន:**\n- មេរៀន Affinity ពី Beginner ដល់ Advanced\n- **Quiz** ដើម្បីសាកល្បងចំណេះដឹង\n- **វិញ្ញាបនបត្ររចនា** ជាបញ្ជាក់សមត្ថភាព\n- AI Assistant, Color Generator, Layout Tools\n\n✨ ចាប់ផ្តើមដោយ**ឥតគិតថ្លៃ** — ហើយក្លាយជា Designer វិជ្ជាជីវៈ!",
        answer_en: "**Affinity iPad App** is your official step-by-step design learning platform for Affinity Photo, Designer & Publisher!\n\n🎓 **What you get:**\n- Structured lessons from Beginner to Advanced\n- **Knowledge Quizzes** to test your skills\n- **Professional Design Certificates** to prove your expertise\n- AI Assistant, Color Generator & Layout Tools\n\n✨ Start completely **free** — and grow into a professional designer!",
        actionButton: { label: "ចាប់ផ្តើមរៀន 🚀", label_en: "Start Learning 🚀", actionToTrigger: "quiz" },
        chips: ["ចង់ធ្វើតេស្ត 🎯", "App ប្រើបានដោយឥតគិតថ្លៃទេ?"],
        chips_en: ["Take a Quiz 🎯", "Is the app free to use?"]
    },

    // ─── MARKETING: Pricing / free tier ──────────────────────────────────────
    {
        primaryKeys: ['App ប្រើបានដោយឥតគិតថ្លៃទេ?', 'is the app free to use'],
        keys: ['ឥតគិតថ្លៃ', 'ថ្លៃ', 'subscription plan', 'premium plan', 'how much does it cost', 'is it free', 'app cost', 'app price'],
        regex: ['(is it free|is this free|is the app free|app.*free|free.*app|how much.*cost|ថ្លៃ|ឥតគិតថ្លៃ|subscription|premium plan|pricing)'],
        answer: "**ឥតគិតថ្លៃ ១០០%** ដើម្បីចាប់ផ្តើម! 🎉\n\n**✅ Free:**\n- មេរៀន Beginner ទាំងអស់\n- Quiz & AI Assistant\n- Color Generator & Design Tools\n\n**🌟 Premium:**\n- Unlock Advanced Lessons\n- 🏆 វិញ្ញាបនបត្ររចនាផ្លូវការ (Certificate)\n- ⚡ Final Certification Exam\n\n💡 ចាប់ផ្តើមដោយ Free ហើយ Upgrade នៅពេលអ្នករួចគ្រប់!",
        answer_en: "**100% Free to start!** 🎉\n\n**✅ Free includes:**\n- All Beginner lessons\n- Quiz, AI Assistant & Design Tools\n- Color Generator\n\n**🌟 Premium unlocks:**\n- Advanced & locked lessons\n- 🏆 Official Design Certificate\n- ⚡ Final Certification Exam (90% to pass)\n\n💡 Start free today — upgrade when you're ready!",
        chips: ["ចាប់ផ្តើមដោយរបៀបណា", "វិញ្ញាបនបត្ររចនា 🏆"],
        chips_en: ["How to get started", "Design Certificate 🏆"]
    },

    // ─── MARKETING: Why Affinity on iPad ─────────────────────────────────────
    {
        primaryKeys: ['ហេតុអ្វីប្រើ Affinity iPad', 'why use affinity on ipad'],
        keys: ['why use affinity', 'why affinity ipad', 'affinity advantage', 'reason to use affinity', 'why choose affinity'],
        regex: ['(ហេតុអ្វី|why).*(affinity|ipad|this app)', 'affinity.*advantage', 'reason.*affinity'],
        answer: "Affinity iPad គឺជា**ជម្រើសល្អបំផុត**សម្រាប់ Designer ជំនាន់ថ្មី! 🏆\n\n- 📱 **Mobile-First:** ស្រួលប្រើ Apple Pencil + Touch + Keyboard\n- 💰 **ថ្លៃតែម្តង:** គ្មានថ្លៃប្រចាំខែដូច Adobe\n- ⚡ **GPU ពេញ:** Render លឿន, មិន Lag\n- 🎓 **App នេះ:** AI Coach + Quiz + Certificate ៣in1\n\n**Affinity ≈ Adobe** ប៉ុន្តែ **ថ្លៃ 93% ទាបជាង ✅**",
        answer_en: "Affinity iPad is the **top choice** for modern designers! 🏆\n\n- 📱 **Mobile-First:** Built for Apple Pencil, touch & keyboards\n- 💰 **One-Time Purchase:** No monthly subscription like Adobe\n- ⚡ **Full GPU Power:** Fast renders, zero lag\n- 🎓 **This App:** AI Coach + Quizzes + Certificates — 3-in-1\n\n**Affinity ≈ Adobe quality, but 93% cheaper ✅**",
        chips: ["App ប្រើបានដោយឥតគិតថ្លៃទេ?", "Affinity ធៀបនឹង Photoshop"],
        chips_en: ["Is the app free?", "Affinity vs Photoshop"]
    },

    // ─── MARKETING: Getting started / onboarding ──────────────────────────────
    {
        primaryKeys: ['ចាប់ផ្តើមដោយរបៀបណា', 'how to get started'],
        keys: ['getting started', 'new user', 'first time', 'beginner guide', 'ចាប់ផ្តើម', 'ទើបចូល', 'onboard', 'first steps'],
        regex: ['(get|getting|ចាប់ផ្តើម).*(started|start)', 'new.*(user|to design)', 'first.*(step|time)'],
        answer: "ស្វាគមន៍! 🎉 នេះគឺជា**ផ្លូវរៀន** ៣ ជំហានដ៏ល្អបំផុត៖\n\n**ជំហានទី ១ — Quiz** 📝\nធ្វើ Skill Test ដើម្បីដឹងកម្រិតបច្ចុប្បន្ន\n\n**ជំហានទី ២ — Tools** 🛠️\nស្វែងរក Color Generator, Layout, Typography\n\n**ជំហានទី ៣ — Certificate** 🏆\nប្រឡង Final Exam ទទួល Certificate ផ្លូវការ\n\n💡 ចុចប៊ូតុងខាងក្រោម ចាប់ផ្តើម Quiz ឥឡូវ!",
        answer_en: "Welcome! 🎉 Here's the **best 3-step path:**\n\n**Step 1 — Take the Quiz** 📝\nStart the Skill Test to discover your current level\n\n**Step 2 — Explore Tools** 🛠️\nTry Color Generator, Layout Tools & Typography\n\n**Step 3 — Earn Certificate** 🏆\nPass the Final Exam for an official Design Certificate\n\n💡 Click below to start your first Quiz right now!",
        actionButton: { label: "ចាប់ផ្តើម Quiz 🎯", label_en: "Start Quiz 🎯", actionToTrigger: "quiz" },
        chips: ["App ប្រើបានដោយឥតគិតថ្លៃទេ?", "វិញ្ញាបនបត្ររចនា 🏆"],
        chips_en: ["Is the app free?", "Design Certificate 🏆"]
    },

    // ─── MARKETING: Design Certificate ───────────────────────────────────────
    {
        primaryKeys: ['វិញ្ញាបនបត្ររចនា 🏆', 'design certificate'],
        keys: ['certificate', 'certified', 'credential', 'earn certificate', 'get certified', 'design certificate', 'វិញ្ញាបនបត្រ'],
        regex: ['(certificate|certified|credential|វិញ្ញាបនបត្រ)', '(earn|get|have).*(certificate|cert)'],
        answer: "**វិញ្ញាបនបត្ររចនា Affinity** — ភស្តុតាងជំនាញផ្លូវការ! 🏆\n\n**ជំហានដើម្បីទទួលបាន:**\n1. ✅ ទទួលពិន្ទុ ★ ក្នុង Beginner → Intermediate → Advanced\n2. 🎯 ប្រឡង **Final Certification Exam** (40 សំណួរ, 90%+)\n3. 📄 ទាញយក Certificate PDF!\n\n**ប្រើ Certificate នេះ:**\n- 💼 Portfolio + Resume/CV\n- 🌐 Share លើ LinkedIn\n- 🏢 បង្ហាញ Client\n\n👉 តើអ្នករួចប្រឡងដែរ?",
        answer_en: "The **Affinity Design Certificate** — your official proof of expertise! 🏆\n\n**How to earn it:**\n1. ✅ Score ★ in Beginner → Intermediate → Advanced\n2. 🎯 Pass the **Final Certification Exam** (40 Qs, 90%+)\n3. 📄 Download your official PDF Certificate!\n\n**Use your certificate for:**\n- 💼 Portfolio & Resume/CV\n- 🌐 Share on LinkedIn\n- 🏢 Show clients your expertise\n\n👉 Are you ready for the challenge?",
        actionButton: { label: "ចាប់ផ្តើម Final Exam 🎯", label_en: "Start Final Exam 🎯", actionToTrigger: "quiz" },
        chips: ["ចាប់ផ្តើមដោយរបៀបណា", "App ប្រើបានដោយឥតគិតថ្លៃទេ?"],
        chips_en: ["How to get started", "Is the app free?"]
    },

    // ─── MARKETING: Affinity vs Photoshop ────────────────────────────────────
    {
        primaryKeys: ['Affinity ធៀបនឹង Photoshop', 'affinity vs photoshop'],
        keys: ['compare adobe', 'vs photoshop', 'vs illustrator', 'switch from adobe', 'better than adobe', 'photoshop alternative'],
        regex: ['(affinity|app).*(vs|versus|compare|ធៀប).*(photoshop|adobe|illustrator)', '(switch|move).*(from|away).*(photoshop|adobe)'],
        answer: "**Affinity vs Adobe** — ការប្រៀបធៀបស្មោះត្រង់! ⚖️\n\n| | **Affinity** | **Adobe** |\n|---|---|---|\n| 💰 ថ្លៃ | ចំណាយម្តង | ប្រចាំខែ |\n| 📱 iPad | Native ✅ | Desktop-first |\n| ⚡ ល្បឿន | GPU ពេញ | ស្តង់ដារ |\n| 🔧 Tools | ស្ទើរតែគ្រប់ | ច្រើនជាង |\n| 📚 រៀន | App នេះ 🎓 | ថ្លៃ/Courses |\n\n**✅ Affinity = Adobe ⅘ ប៉ុន្តែ ថ្លៃ ⅕** — ល្អឥតខ្ចោះសម្រាប់ iPad Designer!",
        answer_en: "**Affinity vs Adobe** — an honest comparison! ⚖️\n\n| | **Affinity** | **Adobe** |\n|---|---|---|\n| 💰 Cost | One-time | Monthly sub |\n| 📱 iPad | Native ✅ | Desktop-first |\n| ⚡ Speed | Full GPU | Standard |\n| 🔧 Tools | Nearly all | More plugins |\n| 📚 Learn | This App 🎓 | Paid courses |\n\n**✅ Affinity = ⅘ Adobe quality at ⅕ the price** — perfect for the iPad designer!",
        chips: ["ហេតុអ្វីប្រើ Affinity iPad", "ចាប់ផ្តើមដោយរបៀបណា"],
        chips_en: ["Why use Affinity on iPad?", "How to get started"]
    }
];