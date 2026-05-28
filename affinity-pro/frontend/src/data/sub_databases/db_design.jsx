export const designData = [
    // 1. CORE DESIGN PRINCIPLES
    {
        primaryKeys: ['គោលការណ៍រចនា', 'design principles', 'តើ គោលការណ៍រចនា មានអ្វីខ្លះ?', 'Core Design Principles?'],
        keys: ['design principles', 'ក្បួនរចនា', 'មូលដ្ឋានគ្រឹះ', 'fundamentals'],
        regex: ['design principle', 'ក្បួនរចនា', 'មូលដ្ឋានគ្រឹះ', '\\bfundamentals\\b'],
        answer: "បាទ **គោលការណ៍រចនា (Design Principles)** គឺជាក្បួនដែលធ្វើឱ្យការរចនាមើលទៅមានវិជ្ជាជីវៈ (គេនិយមហៅថា CRAP)៖\n\n១. **C - Contrast (ភាពផ្ទុយ):** ធ្វើឱ្យអ្វីមួយលេចធ្លោ។\n២. **R - Repetition (ភាពដដែលៗ):** បង្កើតភាពស៊ីសង្វាក់គ្នា។\n៣. **A - Alignment (ការតម្រឹម):** រៀបចំឱ្យមានរបៀប។\n៤. **P - Proximity (ភាពកៀកគ្នា):** ចងវត្ថុដែលទាក់ទងគ្នាជាក្រុម។\n\nតើអ្នកចង់ឱ្យខ្ញុំពន្យល់លម្អិតពីចំណុចមួយណា?",
        answer_en: "**Core Design Principles** are the rules that make a design look professional (often called CRAP):\n\n1. **C - Contrast:** Making important elements stand out.\n2. **R - Repetition:** Creating visual consistency.\n3. **A - Alignment:** Organizing elements logically.\n4. **P - Proximity:** Grouping related items together.\n\nWhich one would you like me to explain in detail?",
        chips: ["តើ Contrast ជាអ្វី?", "តើ Alignment ជាអ្វី?", "តើ Proximity ជាអ្វី?"],
        chips_en: ["What is Contrast?", "What is Alignment?", "What is Proximity?"]
    },
    {
        primaryKeys: ['ទ្រឹស្តី Gestalt', 'gestalt principles'],
        keys: ['gestalt', 'ច្បាប់ gestalt', 'similarity', 'continuity', 'closure'],
        regex: ['\\bgestalt\\b', '\\bsimilarity\\b', '\\bcontinuity\\b'],
        answer: "បាទ **ទ្រឹស្តី Gestalt** គឺជាចិត្តសាស្ត្រដែលពន្យល់ពីរបៀបដែលខួរក្បាលមនុស្សមើលឃើញវត្ថុផ្សេងៗជាក្រុមរួមគ្នា៖\n\n១. **Similarity (ភាពស្រដៀង):** វត្ថុដែលមានរាង ឬពណ៌ដូចគ្នា ខួរក្បាលគិតថាវាជាក្រុមតែមួយ។\n២. **Continuity (ភាពបន្តបន្ទាប់):** ភ្នែកមនុស្សចូលចិត្តរត់តាមខ្សែបន្ទាត់កោង ឬទិសដៅដែលកំពុងចង្អុលបង្ហាញ។\n៣. **Closure (ការបិទជិត):** ទោះបីជារូបភាពមួយគូសមិនជិតល្អ ក៏ខួរក្បាលយើងចេះបំពេញចន្លោះប្រហោងនោះឱ្យទៅជារូបពេញលេញដែរ (ឧ. ឡូហ្គោ WWF)។\n\n💡 **គន្លឹះអាជីព៖** ប្រើក្បួន Similarity ពេលធ្វើ UI Design ដើម្បីឱ្យប៊ូតុងទាំងអស់មានទម្រង់ដូចគ្នា។",
        answer_en: "**Gestalt Principles** explain the psychology behind how the human brain visually groups objects together:\n\n1. **Similarity:** Elements that look alike in color or shape are perceived as a group.\n2. **Continuity:** The eye is naturally drawn to follow a continuous line or path.\n3. **Closure:** The brain automatically fills in missing parts of a design to create a complete image (e.g., the WWF Panda logo).\n\n💡 **Pro Tip:** Use Similarity in UI Design to ensure all your clickable buttons look like they belong to the same family.",
        chips: ["តើ Proximity ជាអ្វី?", "អ្វីទៅជា Hierarchy?"],
        chips_en: ["What is Proximity?", "Visual Hierarchy"]
    },
    {
        primaryKeys: ['Symmetry និង Asymmetry', 'symmetry vs asymmetry'],
        keys: ['symmetry', 'asymmetry', 'តុល្យភាព', 'balance', 'ភាពស៊ីមេទ្រី'],
        regex: ['\\bsymmetry\\b', '\\basymmetry\\b', 'តុល្យភាព'], // Removed 'balance' to avoid color balance
        answer: "បាទ **តុល្យភាព (Balance) ក្នុងប្លង់មាន ២ ប្រភេទធំៗ៖**\n\n⚖️ **Symmetrical (ស៊ីមេទ្រី):** ឆ្វេងនិងស្តាំមានទម្ងន់ស្មើគ្នា ១០០%។ វាផ្តល់អារម្មណ៍ស្ងប់ស្ងាត់ ផ្លូវការ និងប្រណីត (ល្អសម្រាប់ធៀបការ ឬឡូហ្គោម៉ាកល្បីៗ)។\n🌪️ **Asymmetrical (អស៊ីមេទ្រី):** ឆ្វេងនិងស្តាំមិនស្មើគ្នាទេ តែមានតុល្យភាពដោយប្រើទំហំ ឬពណ៌ (ឧ. រូបធំមួយនៅខាងស្តាំ ទូទាត់ជាមួយអក្សរតូចៗច្រើននៅខាងឆ្វេង)។ វាផ្តល់អារម្មណ៍សកម្ម ទំនើប និងមានថាមពល!\n\n💡 **គន្លឹះអាជីព៖** Poster ភាគច្រើនប្រើ Asymmetrical Balance ដើម្បីបង្កើតភាពទាក់ទាញ និងកុំឱ្យមើលទៅគួរឱ្យធុញ។",
        answer_en: "**In layout design, Balance comes in two main forms:**\n\n⚖️ **Symmetrical Balance:** The left and right sides are perfect mirrors. It feels formal, calm, and luxurious (Great for wedding invitations and high-end branding).\n🌪️ **Asymmetrical Balance:** The sides are different, but visually balanced using visual weight (e.g., a massive image on the right balanced by a large block of text on the left). It feels dynamic, modern, and energetic!\n\n💡 **Pro Tip:** Most modern posters use Asymmetrical balance because it creates visual tension and keeps the viewer's eye moving.",
        chips: ["តើ Rule of Thirds គឺជាអ្វី?", "តើ Contrast ជាអ្វី?"],
        chips_en: ["What is the Rule of Thirds?", "What is Contrast?"]
    },
    {
        primaryKeys: ['តើ Contrast ជាអ្វី?', 'what is contrast'],
        keys: ['contrast', 'ភាពផ្ទុយគ្នា', 'ផ្ទុយ'],
        regex: ['\\bcontrast\\b', 'ភាពផ្ទុយ'],
        answer: "បាទ **Contrast (ភាពផ្ទុយគ្នា)** គឺការប្រើប្រាស់ភាពខុសគ្នាដាច់ស្រឡះ ដើម្បីទាក់ទាញភ្នែក និងងាយស្រួលអាន។\n\n💡 **ឧទាហរណ៍៖** \n- **ពណ៌:** អក្សរពណ៌ស លើផ្ទៃខាងក្រោយពណ៌ខ្មៅ។\n- **ទំហំ:** ចំណងជើងធំខ្លាំង ជាមួយអត្ថបទតូច។\n- **ទម្ងន់:** Font **Bold** ធៀបជាមួយ Font *Light*។\nបើគ្មាន Contrast ទេ ការរចនានឹងមើលទៅរាបស្មើ និងគួរឱ្យធុញ!",
        answer_en: "**Contrast** is the use of striking differences to grab attention and improve readability.\n\n💡 **Examples:**\n- **Color:** Crisp white text on a dark black background.\n- **Scale:** A massive headline paired with tiny body text.\n- **Weight:** A heavy **Bold** font next to a delicate *Light* font.\nWithout contrast, your design will look flat and boring!",
        chips: ["ក្បួនផ្គូផ្គងពណ៌ (Color Harmonies)", "អ្វីទៅជា Typography?"],
        chips_en: ["Color Harmonies", "What is Typography?"]
    },
    {
        primaryKeys: ['តើ Alignment ជាអ្វី?', 'what is alignment'],
        keys: ['alignment', 'តម្រឹម', 'រៀបជួរ'],
        regex: ['\\balignment\\b', 'តម្រឹម', 'រៀបជួរ'],
        answer: "បាទ **Alignment (ការតម្រឹម)** គឺការរៀបចំវត្ថុឱ្យត្រង់ជួរគ្នាដោយមានបន្ទាត់មើលមិនឃើញ (Invisible Grid)។\n\n💡 **ឧទាហរណ៍៖** \n- **Left-aligned (ឆ្វេង):** ស្រួលអានបំផុតសម្រាប់អត្ថបទវែងៗ។\n- **Center-aligned (កណ្តាល):** ល្អសម្រាប់ធៀបការ ឬចំណងជើងខ្លីៗ (កុំប្រើសម្រាប់អត្ថបទវែង!)។\n- **Right-aligned (ស្តាំ):** ល្អសម្រាប់កាលបរិច្ឆេទ ឬលេខទូរស័ព្ទនៅជ្រុង។",
        answer_en: "**Alignment** is the practice of arranging elements along an invisible line or grid to create order.\n\n💡 **Examples:**\n- **Left-aligned:** The easiest and most natural way to read long paragraphs.\n- **Center-aligned:** Looks formal, great for wedding invitations or short titles (never use for long text!).\n- **Right-aligned:** Good for small dates or numbers on the edge of a layout.",
        chips: ["តើ Proximity ជាអ្វី?", "តើ Rule of Thirds គឺជាអ្វី?"],
        chips_en: ["What is Proximity?", "What is the Rule of Thirds?"]
    },
    {
        primaryKeys: ['តើ Proximity ជាអ្វី?', 'what is proximity'],
        keys: ['proximity', 'ភាពកៀកគ្នា', 'គម្លាត'],
        regex: ['\\bproximity\\b', 'ភាពកៀកគ្នា'],
        answer: "បាទ **Proximity (ភាពកៀកគ្នា)** គឺជាការរៀបចំរបស់ដែលទាក់ទងគ្នា ឱ្យនៅជិតគ្នា ដើម្បីឱ្យខួរក្បាលងាយចាប់បានថាវាជាក្រុមតែមួយ។\n\n💡 **ឧទាហរណ៍៖** នៅក្នុងនាមប័ណ្ណ (Business Card) ឈ្មោះនិងតួនាទីគួរនៅកៀកគ្នា។ ចំណែកឯលេខទូរស័ព្ទ និងអ៊ីមែល គួរនៅកៀកគ្នាជាក្រុមមួយទៀត ដែលនៅឆ្ងាយពីឈ្មោះបន្តិច។",
        answer_en: "**Proximity** means grouping related items close together so the brain automatically perceives them as a single unit.\n\n💡 **Example:** On a Business Card, the person's Name and Job Title should be placed close together. Their Phone Number and Email should be grouped together elsewhere. This chunking makes it instantly scannable.",
        chips: ["អ្វីទៅជា White Space?", "អ្វីទៅជា Hierarchy?"],
        chips_en: ["What is White Space?", "Visual Hierarchy"]
    },
    {
        primaryKeys: ['តើ Repetition ជាអ្វី?', 'what is repetition'],
        keys: ['repetition', 'consistency', 'ធ្វើដដែលៗ', 'ភាពស៊ីសង្វាក់'],
        regex: ['\\brepetition\\b', '\\bconsistency\\b', 'ភាពស៊ីសង្វាក់'],
        answer: "បាទ **Repetition / Consistency (ភាពស៊ីសង្វាក់)** គឺការប្រើប្រាស់រចនាបថដដែលៗដើម្បីបង្កើតការចងចាំម៉ាកយីហោ (Brand Identity)។\n\n💡 **ឧទាហរណ៍៖** ក្រុមហ៊ុន Coca-Cola តែងតែប្រើប្រាស់ពណ៌ក្រហម និង Font អក្សរដដែលៗនៅគ្រប់ផ្ទាំងប៉ាណូ។ ក្នុងការរចនារបស់អ្នក អ្នកគួរប្រើ Font តែ ១ ឬ ២ ប្រភេទ និងពណ៌ ៣ មុខប៉ុណ្ណោះ ទើបមើលទៅប្រណីត។",
        answer_en: "**Repetition / Consistency** is using the same visual styles throughout a design to build a strong, unified identity.\n\n💡 **Example:** Coca-Cola always uses the exact same shade of red and the same curvy ribbon font on every advertisement. In your designs, strictly limit yourself to 1-2 fonts and a 3-color palette to keep things looking cohesive and premium.",
        chips: ["ក្បួនរចនាឡូហ្គោ (Logo Design)", "អត្ថន័យនៃពណ៌ (Color Psychology)"],
        chips_en: ["Rules of Logo Design", "Color Psychology"]
    },

    // 2. COLOR THEORY (CANVA STANDARD)
    {
        primaryKeys: ['ក្បួនផ្គូផ្គងពណ៌ (Color Harmonies)', 'color harmonies'],
        keys: ['color harmony', 'ក្បួនពណ៌', 'ច្បាប់ពណ៌', 'complementary', 'analogous', 'triadic', 'tetradic', 'monochromatic'],
        regex: ['color harmony', 'ក្បួនពណ៌', 'ច្បាប់ពណ៌', '\\banalogous\\b', '\\btriadic\\b', '\\btetradic\\b', '\\bmonochromatic\\b'], // STRIOT: Removed complementary so it doesn't fight generator
        answer: "បាទ យោងតាមក្បួន Canva Color Wheel ក្បួនផ្គូផ្គងពណ៌ (Color Harmonies) មាន ៥ ប្រភេទធំៗ៖\n\n១. **Complementary (ពណ៌ផ្ទុយ):** ពណ៌២នៅទល់មុខគ្នា។ ផ្តល់ Contrast ខ្ពស់ ធ្វើឱ្យពណ៌មើលទៅភ្លឺ និងលេចធ្លោខ្លាំង។\n២. **Monochromatic (ពណ៌ឯកកោ):** ការប្រើប្រាស់ Shades, Tints, និង Tones នៃពណ៌តែមួយ។ ងាយស្រួលប្រើ និងមើលទៅស៊ីសង្វាក់គ្នា។\n៣. **Analogous (ពណ៌ក្បែរគ្នា):** ពណ៌៣នៅជាប់គ្នា។ ត្រូវរើសពណ៌១ជាគោល (Dominant) និងពណ៌ផ្សេងទៀតគ្រាន់តែជារបស់បន្ទាប់បន្សំ។\n៤. **Triadic (ពណ៌ត្រីកោណសម័ង្ស):** ពណ៌៣ឃ្លាតស្មើគ្នាក្នុងរង្វង់ពណ៌។ ផ្តល់ភាពរស់រវើក និងរឹងមាំ ទោះបីជាមិនសូវ Contrast ខ្លាំងដូច Complementary ក្តី។\n៥. **Tetradic (ពណ៌ចតុកោណ):** ពណ៌៤ឃ្លាតស្មើគ្នា។ ក្បួននេះមានថាមពលខ្លាំង តែពិបាកថ្លឹងថ្លែងណាស់ លុះត្រាតែអ្នកឱ្យពណ៌មួយលេចធ្លោជាងគេ។",
        answer_en: "**According to Canva's Color Wheel, there are 5 core Color Harmonies:**\n\n1. **Complementary:** Two colors on opposite sides. Provides high contrast and impact; colors appear brighter together.\n2. **Monochromatic:** Three shades, tones, and tints of one base color. Very versatile and creates a harmonious look.\n3. **Analogous:** Three colors side-by-side. Versatile but can be overwhelming; balance it by choosing ONE dominant color and using the rest as accents.\n4. **Triadic:** Three colors evenly spaced. Creates bold, vibrant palettes with slightly less contrast than Complementary, making it versatile.\n5. **Tetradic:** Four colors evenly spaced. Bold but difficult to balance; works best if you let one color dominate.",
        actionButton: { label: "បង្កើតពណ៌ 🎨", label_en: "Open Color Generator 🎨", actionToTrigger: "tools", subTab: "color" },
        chips: ["ពណ៌ក្តៅ និងពណ៌ត្រជាក់", "Shades, Tints, និង Tones ខុសគ្នាម៉េច?"],
        chips_en: ["Warm vs Cool Colors", "Shades vs Tints vs Tones?"]
    },
    {
        primaryKeys: ['ពណ៌បឋម និងពណ៌រង (Primary & Secondary)', 'primary and secondary colors'],
        keys: ['primary color', 'secondary color', 'tertiary', 'ពណ៌ដើម'],
        regex: ['\\bprimary\\b', '\\bsecondary\\b', '\\btertiary\\b', 'ពណ៌បឋម', 'ពណ៌ដើម'],
        answer: "បាទ កង់ពណ៌ (Color Wheel) ត្រូវបានបែងចែកជា ៣ កម្រិត៖\n\n🥇 **Primary Colors (ពណ៌បឋម):** ជាពណ៌ដើមដែលមិនអាចលាយចេញពីពណ៌ផ្សេងបាន។\n- លើអេក្រង់ (RGB): ក្រហម(Red), បៃតង(Green), ខៀវ(Blue) ដែលរួមគ្នាបង្កើតជាពន្លឺពណ៌ស។\n- លើគំនូរ (RYB): ក្រហម, លឿង, ខៀវ។\n\n🥈 **Secondary Colors (ពណ៌រងកម្រិត១):** កើតពីការលាយពណ៌បឋម២បញ្ចូលគ្នា។\n- ក្នុង RGB: ពណ៌ Cyan, Magenta, និង Yellow។\n- ក្នុង RYB: ពណ៌ស្វាយ, ទឹកក្រូច, និងបៃតង។\n\n🥉 **Tertiary Colors (ពណ៌រងកម្រិត២):** កើតពីការលាយពណ៌បឋម និង Secondary បញ្ចូលគ្នា (មាន ៦ ពណ៌ ដូចជា លឿង-ទឹកក្រូច)។",
        answer_en: "**The color wheel is divided into three tiers:**\n\n🥇 **Primary Colors:** Colors that cannot be mixed from other colors.\n- In RGB (Light/Screens): Red, Green, Blue. Added together, they create pure white light.\n- In RYB (Paint): Red, Yellow, Blue.\n\n🥈 **Secondary Colors:** Created by mixing two primary colors.\n- In RGB: Cyan, Magenta, Yellow.\n- In RYB: Purple, Orange, Green.\n\n🥉 **Tertiary Colors:** Created by combining a secondary color with a primary color (e.g., Red-Orange, Blue-Green).",
        chips: ["តើ Color Wheel មានប៉ុន្មានប្រភេទ?", "Color Theory"],
        chips_en: ["RGB vs RYB Color Wheel?", "Color Theory"]
    },
    {
        primaryKeys: ['ពណ៌ក្តៅ និងពណ៌ត្រជាក់ (Warm vs Cool Colors)', 'warm vs cool colors'],
        keys: ['warm color', 'cool color', 'ពណ៌ក្តៅ', 'ពណ៌ត្រជាក់', 'color temperature', 'សីតុណ្ហភាពពណ៌'],
        regex: ['\\bwarm\\b', '\\bcool\\b', 'ពណ៌ក្តៅ', 'ពណ៌ត្រជាក់', '\\btemperature\\b'],
        answer: "បាទ **សីតុណ្ហភាពពណ៌ (Color Temperature)** ត្រូវបានបែងចែកជា ២ ក្រុម ដែលផ្តល់អារម្មណ៍ផ្លូវចិត្តខុសគ្នា៖\n\n🔥 **ពណ៌ក្តៅ (Warm Colors):** ពណ៌ចាប់ពី ក្រហម ដល់ លឿង។ ពណ៌ទាំងនេះធ្វើឱ្យយើងនឹកដល់កំដៅព្រះអាទិត្យ វាផ្តល់អារម្មណ៍នៃភាពកក់ក្តៅ (Coziness) និងថាមពល (Energy)។\n🧊 **ពណ៌ត្រជាក់ (Cool Colors):** ពណ៌ចាប់ពី ខៀវ ដល់ បៃតង និងស្វាយ។ ពណ៌ទាំងនេះធ្វើឱ្យយើងនឹកដល់ទឹក វាផ្តល់អារម្មណ៍ស្ងប់ស្ងាត់ (Serenity) និងភាពឯកោ (Isolation)។\n\n💡 **គន្លឹះអាជីព៖** ក្បួនពណ៌ដែលស្អាតបំផុត តែងតែមានការថ្លឹងថ្លែង (Balance) វាងពណ៌ក្តៅ និងពណ៌ត្រជាក់បញ្ចូលគ្នា!",
        answer_en: "**Color Temperature divides the color wheel into warm and cool halves:**\n\n🔥 **Warm Colors:** Colors from Red through to Yellow. These bring to mind warmth like the sun, evoking feelings of coziness and energy.\n🧊 **Cool Colors:** Colors from Blue to Green and Purple. These bring to mind coolness like water, evoking feelings of serenity and isolation.\n\n💡 **Pro Tip:** The best color combinations usually have a deliberate balance of both warm and cool colors!",
        chips: ["អត្ថន័យនៃពណ៌ (Color Psychology)", "ក្បួនផ្គូផ្គងពណ៌ (Color Harmonies)"],
        chips_en: ["Color Psychology", "Color Harmonies"]
    },
    {
        primaryKeys: ['Shades, Tints, និង Tones ខុសគ្នាម៉េច?', 'shades tints tones'],
        keys: ['shade', 'tint', 'tone', 'លាយពណ៌ស', 'លាយពណ៌ខ្មៅ', 'shades vs tints'],
        regex: ['\\bshade\\b', '\\btint\\b', '\\btone\\b', 'លាយពណ៌ស', 'លាយពណ៌ខ្មៅ'],
        answer: "បាទ អ្នកអាចបង្កើតពណ៌ជាច្រើនកម្រិតដោយបន្ថែមពណ៌ខ្មៅ ប្រផេះ ឬស ទៅលើពណ៌ដើម (Hue)៖\n\n🌑 **Shade (ស្រមោល):** បង្កើតឡើងដោយការបន្ថែម **ពណ៌ខ្មៅ** ទៅលើពណ៌ដើម។ វាធ្វើឱ្យពណ៌កាន់តែងងឹត ជ្រៅ និងមានអំណាច (Overpowering)។\n☁️ **Tint (ពណ៌ស្រាល):** បង្កើតឡើងដោយការបន្ថែម **ពណ៌ស** ទៅលើពណ៌ដើម។ វាជួយបន្ថយភាពខ្លាំងនៃពណ៌ និងល្អសម្រាប់ថ្លឹងថ្លែងក្បួនពណ៌ដែលឆើតពេក។\n🌫️ **Tone (ពណ៌ស្រអាប់):** បង្កើតឡើងដោយការបន្ថែម **ពណ៌ប្រផេះ (ស+ខ្មៅ)** ទៅលើពណ៌ដើម។ វាជួយឱ្យពណ៌មើលទៅមិនសូវលេចឆើត និងបង្ហាញពីភាពទន់ភ្លន់ដែលពណ៌ដើមមិនមាន។",
        answer_en: "**You can create multiple variations of a color by adding black, grey, or white to a base hue:**\n\n🌑 **Shade:** Created by adding **Black** to a base hue, darkening it. This creates a deeper, richer color that can be quite dramatic and overpowering.\n☁️ **Tint:** Created by adding **White** to a base hue. This lightens the color, making it less intense and very useful for balancing vivid color combinations.\n🌫️ **Tone:** Created by combining **Grey (Black + White)** with a base hue. Tones are subtler versions of the original color and reveal complexities not apparent in the base color.",
        chips: ["តើ HSL គឺជាអ្វី?", "តើ HEX Code គឺជាអ្វី?"],
        chips_en: ["What is HSL?", "What is a HEX Code?"]
    },
    {
        primaryKeys: ['តើ Color Wheel មានប៉ុន្មានប្រភេទ?', 'rgb vs ryb color wheel'],
        keys: ['ryb', 'rgb wheel', 'color wheel', 'កង់ពណ៌'],
        regex: ['\\bryb\\b', 'rgb wheel', 'color wheel', 'កង់ពណ៌'],
        answer: "បាទ **កង់ពណ៌ (Color Wheel)** ដែលបង្កើតដំបូងដោយលោក Isaac Newton ក្នុងឆ្នាំ ១៦៦៦ ត្រូវបានបែងចែកជា ២ ប្រភេទសម្រាប់អ្នករចនា៖\n\n🎨 **RYB (Red, Yellow, Blue):** គឺជាកង់ពណ៌សម្រាប់ **សិល្បករគំនូរ**។ វាជួយអ្នកគំនូរក្នុងការលាយពណ៌ថ្នាំ (Paint)។\n💻 **RGB (Red, Green, Blue):** គឺជាកង់ពណ៌សម្រាប់ **Online និង Digital** (ដូចជា Canva ផ្ទាល់)។ វាផ្អែកលើការលាយពន្លឺ (Light) ដូចជាពន្លឺបញ្ចេញពីអេក្រង់ទូរទស្សន៍ ឬកុំព្យូទ័រជាដើម។",
        answer_en: "**The Color Wheel**, originally mapped by Isaac Newton in 1666, comes in two completely different systems for modern designers:\n\n🎨 **RYB (Red, Yellow, Blue):** The traditional wheel used by **Artists**. It helps specifically with combining physical paint colors.\n💻 **RGB (Red, Green, Blue):** The wheel designed specifically for **Online and Digital use** (This is the wheel Canva uses). It refers strictly to mixing light, like on a computer or TV screen.",
        chips: ["ពណ៌បឋម និងពណ៌រង (Primary & Secondary)", "តើ RGB និង CMYK ខុសគ្នាម៉េច?"],
        chips_en: ["Primary and Secondary Colors", "RGB vs CMYK difference?"]
    },
    { 
        primaryKeys: ['តើ HSL គឺជាអ្វី?', 'what is hsl'],
        keys: ['hsl', 'hue', 'saturation', 'lightness', 'luminance'],
        regex: ['\\bhsl\\b', '\\bhue\\b', '\\bsaturation\\b', '\\blightness\\b', '\\bluminance\\b'],
        answer: "បាទ **HSL (Hue, Saturation, Luminance)** គឺជាប្រព័ន្ធវាស់វែងពណ៌ឌីជីថល៖\n\n🎨 **Hue (ពណ៌ដើម):** គឺជាពណ៌ណាមួយដែលស្ថិតនៅលើកង់ពណ៌ (Color Wheel)។\n💧 **Saturation (កម្រិតឆ្អែត):** គឺជាកម្រិតភាពខ្លាំង (Intensity) ឬភាពបរិសុទ្ធនៃពណ៌។ 100% គឺឆើតបំផុត ចំណែក 0% ក្លាយជាសខ្មៅ។\n☀️ **Luminance (ពន្លឺ):** គឺជាបរិមាណពន្លឺ (Brightness) នៅក្នុងពណ៌នោះ។ 100% គឺពណ៌សក្បុស ហើយ 0% គឺខ្មៅងងឹត។", 
        answer_en: "**HSL (Hue, Saturation, Luminance) defines how you select digital colors:**\n\n🎨 **Hue:** Basically any base color found on the color wheel.\n💧 **Saturation:** The intensity or purity of the color. 100% is vibrantly pure, while 0% is completely drained of color (Grey).\n☀️ **Luminance:** The absolute amount of brightness or light inside a color. 100% is pure white, and 0% is pitch black.",
        actionButton: { label: "សាកល្បង HSL Tools 🎨", label_en: "Try the HSL Tools 🎨", actionToTrigger: "tools", subTab: "color" },
        chips: ["ក្បួនផ្គូផ្គងពណ៌ (Color Harmonies)", "Shades, Tints, និង Tones ខុសគ្នាម៉េច?"],
        chips_en: ["Color Harmonies", "Shades vs Tints vs Tones?"]
    },
    { 
        primaryKeys: ['អត្ថន័យនៃពណ៌ (Color Psychology)', 'color psychology'],
        keys: ['psychology', 'អត្ថន័យពណ៌', 'ចិត្តសាស្ត្រពណ៌', 'color meaning'],
        regex: ['\\bpsychology\\b', 'អត្ថន័យពណ៌', 'ចិត្តសាស្ត្រពណ៌', 'color meaning'],
        answer: "បាទ **ចិត្តសាស្ត្រពណ៌ (Color Psychology)** គឺសំខាន់ណាស់ក្នុងការទាក់ទាញអារម្មណ៍អតិថិជន៖\n\n🔴 **ក្រហម:** ថាមពល ក្តៅគគុក អាហារ គ្រោះថ្នាក់ (KFC, YouTube)។\n🔵 **ខៀវ:** ភាពជឿជាក់ សុវត្ថិភាព បច្ចេកវិទ្យា (Facebook, ធនាគារ)។\n🟢 **បៃតង:** ធម្មជាតិ សុខភាព លុយ (Starbucks, Grab)។\n🟡 **លឿង:** ភាពសប្បាយរីករាយ យុវវ័យ ព្រមាន (McDonald's)។\n⚫ **ខ្មៅ:** ភាពប្រណីត អំណាច អាថ៌កំបាំង (Apple, Nike)។\n🟣 **ស្វាយ:** វេទមន្ត ភាពថ្លៃថ្នូរ និងការស្រមើស្រមៃ (Twitch, Milka)។", 
        answer_en: "**Color Psychology** is crucial for evoking the right emotion in your audience:\n\n🔴 **Red:** Energy, passion, appetite, urgency (KFC, YouTube).\n🔵 **Blue:** Trust, security, technology, calm (Facebook, Banks).\n🟢 **Green:** Nature, health, wealth, growth (Starbucks, Grab).\n🟡 **Yellow:** Happiness, youth, optimism, warning (McDonald's).\n⚫ **Black:** Luxury, power, sophistication (Apple, Nike).\n🟣 **Purple:** Magic, royalty, and imagination (Twitch, Cadbury).",
        chips: ["ពណ៌ក្តៅ និងពណ៌ត្រជាក់ (Warm vs Cool Colors)", "ក្បួនផ្គូផ្គងពណ៌ (Color Harmonies)"],
        chips_en: ["Warm vs Cool Colors", "Color Harmonies"]
    },

    // 3. TYPOGRAPHY
    { 
        primaryKeys: ['អ្វីទៅជា Typography?', 'what is typography'],
        keys: ['typography', 'ប្រភេទ font', 'រៀបអក្សរ', 'font', 'serif', 'sans-serif'],
        regex: ['\\btypography\\b', 'ប្រភេទ font', 'រៀបអក្សរ', '\\bserif\\b', '\\bsans-serif\\b'], // Removed raw 'font'
        answer: "បាទ **Typography** គឺជាសិល្បៈនៃការរៀបចំតួអក្សរ។ 🔤\n\nប្រភេទ Font ធំៗ៣មាន៖\n- **Serif (មានកន្ទុយ):** ផ្លូវការ (ឧ. Times New Roman, Kantumruy)។ ល្អសម្រាប់សៀវភៅ។\n- **Sans-Serif (គ្មានកន្ទុយ):** ទំនើប ស្រឡះ (ឧ. Arial, Suwannaphum)។ ល្អសម្រាប់អេក្រង់ទូរស័ព្ទ។\n- **Script (អក្សរផ្ចង់):** ល្អសម្រាប់ធៀបការ។ \n\n💡 **ហាមដាច់ខាត៖** កុំប្រើអក្សរផ្ចង់យកមកសរសេរអត្ថបទវែងៗ ឬដាក់ជាអក្សរធំទាំងអស់ (ALL CAPS)!", 
        answer_en: "**Typography** is the art of arranging text beautifully. 🔤\n\nMain Font Categories:\n- **Serif (with feet):** Traditional, formal (e.g., Times New Roman). Great for printed books.\n- **Sans-Serif (no feet):** Modern, clean (e.g., Arial, Helvetica). The best choice for digital screens.\n- **Script (Cursive):** Elegant and personal. \n\n💡 **Strict Rule:** Never use Script fonts for long body paragraphs or write them in ALL CAPS!",
        chips: ["របៀបតម្រៀប Font ឱ្យស្អាត?", "Kerning និង Tracking ខុសគ្នាម៉េច?"],
        chips_en: ["How to pair fonts?", "Kerning vs Tracking?"]
    },
    { 
        primaryKeys: ['របៀបតម្រៀប Font ឱ្យស្អាត?', 'how to pair fonts'],
        keys: ['font pairing', 'ផ្គូផ្គង font', 'រើស font', 'pair font'],
        regex: ['font pairing', 'ផ្គូផ្គង font', 'រើស font', '\\bpair font\\b'],
        answer: "បាទ **ក្បួនចាប់គូ Font (Font Pairing) ឱ្យមើលទៅ Professional៖**\n\n១. **ក្បួន Contrast:** ចាប់គូ Font គ្មានកន្ទុយ (Sans-Serif) ធ្វើជាចំណងជើង ជាមួយ Font មានកន្ទុយ (Serif) ធ្វើជាអត្ថបទ (ឬផ្ទុយមកវិញ)។\n២. **ក្បួនគ្រួសារតែមួយ:** ប្រើ Font តែមួយម៉ាក តែលេងទម្ងន់ខុសគ្នា (ឧ. **Roboto Black** សម្រាប់ចំណងជើង និង *Roboto Light* សម្រាប់អត្ថបទ)។\n៣. **កុំប្រើ Font ច្រើនពេក:** ប្រើត្រឹម ២ ប្រភេទក្នុងមួយផ្ទាំង គឺគ្រប់គ្រាន់ហើយ!", 
        answer_en: "**Rules for Professional Font Pairing:**\n\n1. **The Contrast Rule:** Pair a bold Sans-Serif header with a clean Serif body text (or vice-versa).\n2. **The Superfamily Rule:** Use the exact same font family, but mix the weights (e.g., **Montserrat Black** for the header, and *Montserrat Light* for the body).\n3. **The 'Less is More' Rule:** Never use more than 2 (maybe 3) font families in a single design!",
        chips: ["អ្វីទៅជា Typography?", "អ្វីទៅជា Hierarchy?"],
        chips_en: ["What is Typography?", "Visual Hierarchy"]
    },
    {
        primaryKeys: ['Web Safe Fonts ជាអ្វី?', 'what are web safe fonts'],
        keys: ['web safe fonts', 'font សម្រាប់ web', 'system fonts'],
        regex: ['web safe font', '\\bsystem font\\b'],
        answer: "បាទ **Web Safe Fonts** គឺជាពុម្ពអក្សរដែលបានដំឡើងរួចជាស្រេចនៅលើកុំព្យូទ័រឬទូរស័ព្ទគ្រប់គ្រឿង (ឧទាហរណ៍៖ Arial, Times New Roman, Verdana)។\n\nនៅពេលអ្នកធ្វើ Website ប្រសិនបើអ្នកប្រើ Font ប្លែកៗដែលទាញយកពីអ៊ីនធឺណិត វាអាចនឹងមិនបង្ហាញលើកុំព្យូទ័ររបស់អ្នកដទៃទេ លុះត្រាតែអ្នកបង្កប់វាចូល (Embed) តាមរយៈ Google Fonts ជាដើម។\n\n💡 **គន្លឹះអាជីព៖** សម្រាប់ UI/UX Design ការប្រើប្រាស់ System Fonts ជួយឱ្យ Website ដើរលឿនជាងមុន!",
        answer_en: "**Web Safe Fonts** are typefaces that come pre-installed on virtually every computer and operating system in the world (e.g., Arial, Times New Roman, Verdana).\n\nIf you design a website using a highly custom font, a visitor won't see it unless they also have that font installed, OR if you explicitly embed it using a service like Google Fonts.\n\n💡 **Pro Tip:** In modern UI/UX, relying on standard System Fonts (like San Francisco on Mac or Segoe UI) ensures your app loads instantly without waiting for font files to download.",
        chips: ["របៀបតម្រៀប Font ឱ្យស្អាត?", "អ្វីទៅជា Typography?"],
        chips_en: ["How to pair fonts?", "What is Typography?"]
    },
    { 
        primaryKeys: ['Kerning និង Tracking ខុសគ្នាម៉េច?', 'kerning vs tracking'],
        keys: ['kerning', 'tracking', 'leading', 'គម្លាតអក្សរ'],
        regex: ['\\btracking\\b', '\\bleading\\b', 'គម្លាតអក្សរ'], // Removed 'kerning' to prevent optical kerning collision
        answer: "បាទ **ការរៀបចំគម្លាតអក្សរ (Typesetting) មាន ៣ យ៉ាង៖**\n\n១. **Kerning:** ការសារ៉េចន្លោះរវាងអក្សរតែ **\"២តួ\"** ប៉ុណ្ណោះ ឱ្យមើលទៅសមាមាត្រភ្នែក។\n២. **Tracking:** ការទាញគម្លាតអក្សរ **\"ទាំងមូល\"** ក្នុងពាក្យឱ្យឃ្លាតស្មើៗគ្នា។ 💡 **ឧទាហរណ៍៖** ប្រើ Tracking ទូលាយៗជាមួយអក្សរធំ UPPERCASE មើលទៅ Premium ណាស់។\n៣. **Leading:** ចន្លោះពី **\"បន្ទាត់មួយទៅបន្ទាត់មួយ\"** (Line-height)។ បើអត្ថបទវែង គួរដាក់ Leading អោយទូលាយបន្តិចទើបស្រួលអាន។", 
        answer_en: "**Typesetting involves 3 crucial spacing techniques:**\n\n1. **Kerning:** Adjusting the space between exactly **TWO individual characters** so they look visually balanced.\n2. **Tracking:** Uniformly adjusting the spacing across an **entire word**. 💡 **Example:** Widely tracked UPPERCASE text looks very premium for subheadings.\n3. **Leading:** The vertical space between **lines of text** (Line-height). Don't squish paragraphs together!",
        chips: ["តើ Optical Kerning ជាអ្វី?", "អ្វីទៅជា Hierarchy?"],
        chips_en: ["Optical vs Metric Kerning?", "Visual Hierarchy"]
    },
    {
        primaryKeys: ['តើ Optical Kerning ជាអ្វី?', 'optical vs metric kerning'],
        keys: ['optical kerning', 'metric', 'គម្លាតអក្សរ', 'kerning optical'],
        regex: ['optical kerning', 'metric kerning'], 
        answer: "បាទ នេះជាគន្លឹះ Typography ដែលមានតែអ្នកជំនាញទេទើបដឹង៖ **Metric vs Optical Kerning**\n\n📏 **Metric Kerning:** ជាគម្លាតគណិតវិទ្យាដែលអ្នកបង្កើតហ្វុនសរសេរកូដទុក។ វាល្អសម្រាប់អត្ថបទតូចៗវែងៗ (Body Text)។\n👁️ **Optical Kerning:** កម្មវិធីរចនានឹងយក AI មកវាស់រូបរាងអក្សរនីមួយៗ (ឧទាហរណ៍អក្សរ V និង A មានគែមបញ្ឆិត) រួចរុញវាចូលគ្នាឱ្យសមាមាត្រភ្នែកមើល។ \n\n💡 **គន្លឹះអាជីព:** តែងតែប្តូរទៅប្រើ **Optical Kerning** សម្រាប់ចំណងជើង (Headlines) ឬ Logo ធំៗ នោះអក្សររបស់អ្នកនឹងមើលទៅស្មើគ្នាស្អាតឥតខ្ចោះ!",
        answer_en: "Here is a Typography secret known only to top designers: **Metric vs Optical Kerning**\n\n📏 **Metric Kerning:** Uses the default spacing math coded into the font file by its creator. Best for long paragraphs of body text.\n👁️ **Optical Kerning:** The software calculates the physical shape of adjacent letters (like the angled edges of 'V' and 'A') and visually nudges them together so they look balanced to the human eye.\n\n💡 **Pro Tip:** Always switch to **Optical Kerning** for massive Headlines, Titles, and Logos. It instantly fixes awkward, gaping holes between letters!",
        chips: ["Kerning និង Tracking ខុសគ្នាម៉េច?", "អ្វីទៅជា Typography?"],
        chips_en: ["Kerning vs Tracking?", "What is Typography?"]
    },

    // 4. LAYOUT & UI/UX
    {
        primaryKeys: ['របៀបរចនា Poster', 'poster design', 'របៀបរចនា Poster ឱ្យទាក់ទាញ? 🖼️', 'How to design an effective Poster? 🖼️'],
        keys: ['poster', 'ផ្ទាំងផ្សព្វផ្សាយ', 'រចនា poster'],
        regex: ['poster design', 'រចនា poster', 'ផ្ទាំងផ្សព្វផ្សាយ', 'របៀបធ្វើ poster'],
        answer: "បាទ សម្រាប់ការរចនា Poster ឱ្យទាក់ទាញ និងមានប្រសិទ្ធភាព ត្រូវមាន ៤ ចំណុចធំៗ (Anatomy of a Poster)៖\n\n១. **ចំណងជើង (Headline):** ត្រូវធំ ដាច់ ងាយអានពីចម្ងាយ (ទាក់ទាញចំណាប់អារម្មណ៍)។\n២. **រូបភាព (Visual/Hero Image):** យករូបដែលពាក់ព័ន្ធ និងទាក់ទាញអារម្មណ៍បំផុតមកដាក់ជា Focal Point។\n៣. **ព័ត៌មាន (Details):** ដាក់តែអ្វីដែលសំខាន់ (ថ្ងៃខែ ម៉ោង ទីកន្លែង) កុំសរសេរវែងពេក មើលទៅរញ៉េរញ៉ៃ។\n៤. **Call to Action (CTA):** ប្រាប់គេឱ្យច្បាស់ថាត្រូវធ្វើអ្វីបន្ត (ឧ. ទិញឥឡូវនេះ, តេមកលេខ..., Scan QR Code)។\n\n💡 **គន្លឹះអាជីព៖** ប្រើ White Space ឱ្យបានច្រើនជុំវិញអត្ថបទ ដើម្បីកុំឱ្យមើលទៅចង្អៀត!",
        answer_en: "For a highly effective Poster design, you need to master these 4 core elements:\n\n1. **Headline:** Must be massive, bold, and readable from a distance to hook attention.\n2. **Visual (Hero Image):** A striking image or graphic that connects emotionally with the viewer.\n3. **Details:** Only include the absolute necessary info (Time, Date, Location). Don't clutter it with long paragraphs!\n4. **Call to Action (CTA):** Tell them exactly what to do next (e.g., 'Buy Now', 'Call Us', 'Scan QR').\n\n💡 **Pro Tip:** Embrace White Space around your text blocks to give the viewer's eyes room to breathe!",
        chips: ["តើទំហំ Poster ស្តង់ដារមានអ្វីខ្លះ? 📏", "អ្វីទៅជា Hierarchy?"],
        chips_en: ["Standard Poster Sizes & Layouts? 📏", "Visual Hierarchy"]
    },
    {
        primaryKeys: ['តើទំហំ Poster ស្តង់ដារមានអ្វីខ្លះ?', 'poster sizes and layouts'],
        keys: ['ទំហំ poster', 'poster size', 'ខ្នាត poster', 'a4', 'a3', 'social media size', 'layout'],
        regex: ['ទំហំ.*poster', 'poster size', 'ខ្នាត.*poster', 'social media size'], // Removed 'layout'
        answer: "បាទ **ទំហំ និងប្លង់ (Sizes & Layouts) របស់ Poster ត្រូវបានបែងចែកជា ២ ប្រភេទធំៗ៖**\n\n🖨️ **សម្រាប់បោះពុម្ព (Print):**\n- **A4 (210 x 297mm) / A3 (297 x 420mm):** ប្រើសម្រាប់បិទប្រកាសខ្នាតតូច តាមសាលា ឬហាង។\n- **24 x 36 អាញ់ (Inch):** ខ្នាតស្តង់ដារអន្តរជាតិសម្រាប់ Poster រឿងកុន (Movie Posters) ធំៗ។\n*(កុំភ្លេចប្រើពណ៌ CMYK និង 300 PPI!)*\n\n📱 **សម្រាប់បណ្តាញសង្គម (Digital - 72 PPI, RGB):**\n- **Instagram Portrait (1080 x 1350px):** ជាទំហំល្អបំផុតព្រោះវាពេញអេក្រង់ទូរស័ព្ទ។\n- **Facebook Square (1080 x 1080px):** ស្តង់ដារទូទៅ។\n- **Story/Reels (1080 x 1920px):** សម្រាប់វីដេអូខ្លី។\n\n📐 **ក្បួនរៀបប្លង់ (Layout Structures):**\n- **Z-Pattern:** ល្អសម្រាប់ Poster ដែលមានអក្សរនិងរូបភាពឆ្លាស់គ្នា (ភ្នែកអ្នកមើលរត់ជារាងអក្សរ Z)។\n- **Rule of Thirds:** ចែកប្លង់ជា៩ក្រឡា ដាក់តួអង្គនៅចំណុចប្រសព្វដើម្បីភាពទាក់ទាញ។",
        answer_en: "**Poster Sizes & Layouts are broken down into two main categories:**\n\n🖨️ **Physical Print Sizes:**\n- **A4 (210 x 297mm) / A3 (297 x 420mm):** Standard for local event flyers, shop windows, and schools.\n- **24 x 36 Inches:** The global standard for large, theatrical Movie Posters.\n*(Always use CMYK and 300 PPI for these!)*\n\n📱 **Digital Social Media (72 PPI, RGB):**\n- **Instagram Portrait (1080 x 1350px):** The absolute best size because it takes up the maximum vertical screen space on phones.\n- **Square (1080 x 1080px):** The universal safe standard.\n- **Story (1080 x 1920px):** For full-screen vertical viewing.\n\n📐 **Top Layout Structures:**\n- **Z-Pattern:** Best for posters with balanced text and images (the eye naturally traces a 'Z' from top left to bottom right).\n- **Rule of Thirds:** Placing your main subject off-center on the grid intersections for dynamic energy.",
        chips: ["តើ Leading Lines ជាអ្វី?", "តើ Rule of Thirds គឺជាអ្វី?"],
        chips_en: ["What are Leading Lines?", "What is the Rule of Thirds?"]
    },
    {
        primaryKeys: ['តើ Leading Lines ជាអ្វី?', 'leading lines'],
        keys: ['leading lines', 'បន្ទាត់នាំភ្នែក', 'composition lines'],
        regex: ['leading line', 'បន្ទាត់នាំភ្នែក'],
        answer: "បាទ **Leading Lines (បន្ទាត់នាំភ្នែក)** គឺជាក្បួន Composition កម្រិតខ្ពស់មួយ។\n\nវាគឺជាការប្រើប្រាស់បន្ទាត់ដែលមានស្រាប់នៅក្នុងរូបភាព (ដូចជា ផ្លូវថ្នល់ ជួរឈើ ស្ពាន ឬទម្រង់អគារ) ដើម្បីចង្អុលនាំភ្នែករបស់អ្នកមើល ឱ្យរត់ត្រង់ទៅរកវត្ថុគោល (Main Subject) តែម្តង។ វាជួយឱ្យរូបភាពមានជម្រៅ និងកម្លាំងទាក់ទាញយ៉ាងខ្លាំង!",
        answer_en: "**Leading Lines** is a powerful advanced composition technique.\n\nIt involves using natural lines within an image (like roads, fences, tree lines, or architecture) to physically point the viewer's eye directly toward your main subject or focal point. It creates massive depth and visual interest!",
        chips: ["តើ Rule of Thirds គឺជាអ្វី?", "តើ Framing ជាអ្វី?"],
        chips_en: ["What is the Rule of Thirds?", "What is Framing?"]
    },
    {
        primaryKeys: ['តើ Framing ជាអ្វី?', 'framing composition'],
        keys: ['framing', 'បង្កើតស៊ុម', 'ស៊ុមរូប'],
        regex: ['\\bframing\\b', 'បង្កើតស៊ុម', 'ស៊ុមរូប'],
        answer: "បាទ នៅក្នុងការរៀបប្លង់ **Framing (ការបង្កើតស៊ុម)** គឺការប្រើប្រាស់វត្ថុដែលនៅខាងមុខ (Foreground) ដូចជា មែកឈើ បង្អួច ទ្វារ ឬកញ្ចក់ ដើម្បីធ្វើជាស៊ុមព័ទ្ធជុំវិញវត្ថុគោលដែលនៅខាងក្រោយ។\n\n💡 **អត្ថប្រយោជន៍៖** វាជួយបិទបាំងកន្លែងដែលមិនស្អាត, បង្កើតជម្រៅ (3D Depth) និងបង្ខំឱ្យភ្នែកអ្នកមើលសម្លឹងទៅចំណុចកណ្តាលតែមួយ។",
        answer_en: "In composition, **Framing (A frame within a frame)** is using foreground elements—like tree branches, archways, doors, or windows—to visually surround your main subject.\n\n💡 **Benefits:** It hides boring parts of the environment, creates incredible 3D depth, and forces the viewer's eye exactly where you want it.",
        chips: ["អ្វីទៅជា White Space?", "របៀបរចនា Poster ឱ្យទាក់ទាញ? 🖼️"],
        chips_en: ["What is White Space?", "How to design an effective Poster? 🖼️"]
    },
    { 
        primaryKeys: ['Margin និង Padding ខុសគ្នាម៉េច?', 'margin vs padding'],
        keys: ['margin', 'padding', 'spacing', 'ui ux'],
        regex: ['\\bmargin\\b', '\\bpadding\\b', '\\bspacing\\b'],
        answer: "បាទ នៅក្នុងការរចនាប្លង់ និង UI/UX គឺវាខុសគ្នាដាច់៖\n\n📦 **Padding (គម្លាតក្នុង):** គឺជាចន្លោះទទេដែលស្ថិតនៅ **ខាងក្នុង** ប្រអប់មួយ (រវាងសាច់អក្សរ និងស៊ុមប្រអប់)។ វាជួយឱ្យអក្សរមិនកៀបជាប់គែមពេក។\n↔️ **Margin (គម្លាតក្រៅ):** គឺជាចន្លោះទទេដែលស្ថិតនៅ **ខាងក្រៅ** ប្រអប់ (រវាងប្រអប់មួយ និងប្រអប់មួយទៀត)។ វាជួយរុញវត្ថុឱ្យឆ្ងាយពីគ្នា។", 
        answer_en: "**In Layout and UI/UX design, these dictate spacing:**\n\n📦 **Padding (Inner Space):** The space **inside** an element's border (between the text and the edge of a button). It stops the text from feeling cramped.\n↔️ **Margin (Outer Space):** The space **outside** an element's border. It pushes other completely separate elements away.",
        chips: ["អ្វីទៅជា White Space?", "តើ Rule of Thirds គឺជាអ្វី?"],
        chips_en: ["What is White Space?", "What is the Rule of Thirds?"]
    },
    { 
        primaryKeys: ['អ្វីទៅជា White Space?', 'what is white space'],
        keys: ['white space', 'negative space', 'ចន្លោះទទេ'],
        regex: ['white space', 'negative space', 'ចន្លោះទទេ'], 
        answer: "បាទ **White Space (ឬ Negative Space)** គឺជាចន្លោះប្រហោងជុំវិញវត្ថុ ឬអក្សរ នៅក្នុងប្លង់ការងារ។\n\nវាមិនមែនជាកន្លែងទំនេរដែលត្រូវតែញាត់របស់ចូលឱ្យពេញនោះទេ! White Space ជួយឱ្យការរចនារបស់អ្នកមាន \"ខ្យល់ដកដង្ហើម\" ងាយស្រួលមើល និងមើលទៅមានតម្លៃថ្លៃ (Premium)។ \n\n💡 **ឧទាហរណ៍៖** ក្រឡេកមើលការរចនារបស់ក្រុមហ៊ុន Apple ពួកគេប្រើប្រាស់ផ្ទៃសទំនេរយ៉ាងច្រើន ដើម្បីរំលេចផលិតផលតែមួយគត់ឱ្យលេចធ្លោ។", 
        answer_en: "**White Space (or Negative Space)** is the empty area around elements in a layout.\n\nIt is NOT wasted space that needs to be filled with clutter! White space gives your design room to breathe, drastically improves readability, and makes the design look premium and elegant.\n\n💡 **Example:** Look at Apple's marketing. They use massive amounts of white space to force your eyes directly onto the product, making it feel highly luxurious.",
        chips: ["Margin និង Padding ខុសគ្នាម៉េច?", "អ្វីទៅជា Hierarchy?"],
        chips_en: ["Margin vs Padding?", "Visual Hierarchy"]
    },
    { 
        primaryKeys: ['អ្វីទៅជា Hierarchy?', 'visual hierarchy'],
        keys: ['hierarchy', 'focal point', 'ឋានានុក្រម'],
        regex: ['\\bhierarchy\\b', 'focal point', 'ឋានានុក្រម'],
        answer: "បាទ **Visual Hierarchy (ឋានានុក្រមទស្សនីយភាព)** គឺជាការរៀបចំដើម្បីដឹកនាំភ្នែកអ្នកមើល ឱ្យដឹងថាត្រូវមើលអ្វីមុន អ្វីក្រោយ។\n\nបើយើងធ្វើឱ្យគ្រប់យ៉ាងធំប៉ុនៗគ្នា នោះគ្មានអ្វីលេចធ្លោទេ! គេបង្កើត Hierarchy តាមរយៈ៖\n១. **ទំហំ (Scale):** ដាក់ចំណងជើងឱ្យធំជាងអត្ថបទធម្មតា។\n២. **ពណ៌ (Color):** ប្រើពណ៌ឆើតសម្រាប់ប៊ូតុង ឬចំណុចសំខាន់ (Focal Point)។\n៣. **កម្រាស់ (Weight):** ប្រើអក្សរ Bold សម្រាប់ទាញភ្នែកមុនគេ។", 
        answer_en: "**Visual Hierarchy** is the arrangement of elements to logically guide the viewer's eye on what to look at first, second, and third.\n\nIf everything stands out, nothing stands out! You create hierarchy through:\n1. **Scale:** Making headlines significantly larger than body text.\n2. **Color:** Using bright accent colors for buttons or the main Focal Point.\n3. **Weight:** Using bold fonts to demand immediate attention over regular text.",
        chips: ["តើ បច្ចេកទេស Squint Test ជាអ្វី?", "អ្វីទៅជា White Space?"],
        chips_en: ["What is the Squint Test?", "White Space"]
    },
    { 
        primaryKeys: ['តើ Rule of Thirds គឺជាអ្វី?', 'what is the rule of thirds'],
        keys: ['rule of thirds', 'golden ratio', 'grid', 'ប្លង់', 'layout'],
        regex: ['rule of third', 'golden ratio', '\\bgrid\\b'], // Removed 'layout'
        answer: "បាទ **បច្ចេកទេសរៀបចំប្លង់ (Layout Grids) សំខាន់ៗមាន៖**\n\n📐 **Rule of Thirds (ច្បាប់ភាគបី):** បែងចែករូបភាពជា ៩ ប្រអប់។ វត្ថុគួរដាក់នៅត្រង់ចំណុចប្រសព្វទាំង ៤ ដើម្បីទាក់ទាញភ្នែកជាជាងដាក់នៅកណ្តាលចំ។\n🌀 **Golden Ratio:** សមាមាត្រមាសដែលស្រស់ស្អាតបំផុតតាមបែបធម្មជាតិ (1:1.618)។ ឡូហ្គោល្បីៗសុទ្ធតែគូសតាមទម្រង់នេះ។\n🧱 **Grid System:** ប្រើបន្ទាត់ក្រឡាដើម្បីជួយឱ្យការរចនាមានតុល្យភាព (ដូចជា 12-Column Grid សម្រាប់ Web Design)។\n\n💡 អ្នកអាចចូលមើលឧទាហរណ៍នៃប្លង់ទាំងនេះដោយផ្ទាល់នៅក្នុងប្រអប់ឧបករណ៍របស់យើង៖", 
        answer_en: "**Core Layout Techniques:**\n\n📐 **Rule of Thirds:** Divides the canvas into 9 equal blocks. Placing focal points at the 4 intersecting lines creates more visual interest than dead-center placement.\n🌀 **Golden Ratio:** The most naturally pleasing aesthetic proportion (1:1.618). Famous logos are mathematically drawn using this.\n🧱 **Grid Systems:** Using invisible columns (like a 12-column grid for UI) to ensure perfect alignment.\n\n💡 You can visually explore these layouts inside our built-in Design Tools:",
        actionButton: { label: "មើលគំរូប្លង់ 📐", label_en: "View Layout Grids 📐", actionToTrigger: "tools", subTab: "layout" },
        chips: ["តើទំហំ Poster ស្តង់ដារមានអ្វីខ្លះ? 📏", "តើ Alignment ជាអ្វី?"],
        chips_en: ["Standard Poster Sizes & Layouts? 📏", "What is Alignment?"]
    },
    {
        primaryKeys: ['តើ បច្ចេកទេស Squint Test ជាអ្វី?', 'what is the squint test hierarchy'],
        keys: ['squint test', 'ធ្មេចភ្នែក', 'hierarchy check', 'មើលឱ្យព្រិល'],
        regex: ['squint test', 'ធ្មេចភ្នែក'],
        answer: "បាទ **Squint Test (តិចនិកព្រិលភ្នែក)** គឺជាក្បួនតេស្តត្រួតពិនិត្យ Visual Hierarchy ដ៏មានប្រសិទ្ធភាពបំផុតនៅលើលោក!\n\nពេលអ្នកឌីហ្សាញចប់ សូមថយក្រោយបន្តិច រួច **ធ្មេចភ្នែកឱ្យព្រិលៗ (Squint your eyes)** រហូតដល់មើលអក្សរលែងដាច់។\n\n💡 **លទ្ធផល៖** តើវត្ថុណាដែលអ្នកនៅតែអាចមើលឃើញមុនគេពេលភ្នែកព្រិល? បើវាជាវត្ថុ ឬចំណងជើងដែលអ្នកចង់ឱ្យគេចាប់អារម្មណ៍មែន នោះបានន័យថា Contrast និង Hierarchy របស់អ្នកជោគជ័យហើយ! បើមើលទៅឃើញរញ៉េរញ៉ៃ អ្នកត្រូវបន្ថយទំហំរបស់រង និងតម្លើងពន្លឺវត្ថុគោល។",
        answer_en: "**The Squint Test** is the oldest and most flawless trick to instantly check your Visual Hierarchy!\n\nWhen you finish a design, lean back and **squint your eyes** until the image becomes totally blurry and you can't read the words anymore.\n\n💡 **The Result:** What is the very first shape or color blob that grabs your attention through the blur? If it's your main subject or headline, your contrast is perfect! If your eye goes to an unimportant logo in the corner, your hierarchy is broken and you need to fix your scaling.",
        chips: ["អ្វីទៅជា Hierarchy?", "តើ Contrast ជាអ្វី?"],
        chips_en: ["Visual Hierarchy", "What is Contrast?"]
    },
    { 
        primaryKeys: ['តើ UI និង UX ជាអ្វី?', 'what are ui and ux?'],
        keys: ['ui', 'ux', 'ui/ux', 'user interface', 'user experience'],
        regex: ['ui/ux', 'user interface', 'user experience'], // Strict UI/UX
        answer: "បាទ **UI និង UX គឺជាកូនភ្លោះដែលមិនអាចខ្វះគ្នាបានក្នុងការរចនា App និង Website៖**\n\n📱 **UI (User Interface):** គឺជារូបរាងខាងក្រៅ (សម្រស់)។ វាទាក់ទងនឹងការរើសពណ៌ ការប្រើ Font ភាពកោងនៃប៊ូតុង និងគម្លាត Margin/Padding ជាដើម។\n🧠 **UX (User Experience):** គឺជាបទពិសោធន៍ប្រើប្រាស់ (ភាពងាយស្រួល)។ វាទាក់ទងនឹងការរៀបចំតក្កវិជ្ជា តើអ្នកប្រើចុចទីនេះហើយទៅណាទៀត? តើវាលឿននិងងាយយល់ទេ?\n\n💡 **ឧទាហរណ៍៖** UI គឺជាថ្នាំលាបពណ៌ដ៏ស្រស់ស្អាតរបស់រថយន្ត ចំណែក UX គឺជាម៉ាស៊ីននិងចង្កូតដែលធ្វើឱ្យរថយន្តនោះងាយស្រួលបើកបរ!", 
        answer_en: "**UI and UX are the inseparable twins of digital product design:**\n\n📱 **UI (User Interface):** Focuses on the Visuals (Beauty). It deals with color palettes, typography, button shapes, and perfect spacing.\n🧠 **UX (User Experience):** Focuses on the Logic (Brain). It dictates how the app feels, how users navigate from screen to screen, and how easy it is to achieve their goals.\n\n💡 **Example:** UI is the beautiful paint job on a sports car. UX is how smoothly the car actually drives!",
        chips: ["Margin និង Padding ខុសគ្នាម៉េច?", "អ្វីទៅជា Hierarchy?"],
        chips_en: ["Margin vs Padding?", "Visual Hierarchy"]
    },

    // 5. PRODUCTION & BUSINESS
    { 
        primaryKeys: ['ក្បួនរចនាឡូហ្គោ (Logo Design)', 'rules of logo design'],
        keys: ['logo design', 'គូរឡូហ្គោ', 'ក្បួនឡូហ្គោ', 'how to design a logo'],
        regex: ['logo design', 'គូរឡូហ្គោ', 'ក្បួនឡូហ្គោ'],
        answer: "បាទ **ដើម្បីគូរ Logo មួយឱ្យទទួលបានជោគជ័យ ត្រូវគោរពតាមក្បួនទាំង ៥ នេះ៖**\n\n១. **Simple (សាមញ្ញ):** ងាយចាំ មិនញ៉េរញ៉ៃ (ឧ. Apple, Nike)។\n២. **Memorable (គួរឱ្យចងចាំ):** មើលតែមួយភ្លែតក៏ចាំជាប់ខួរក្បាល។\n៣. **Timeless (មិនហួសសម័យ):** កុំរចនាតាម Trend មួយឆាវៗ វាត្រូវតែស្អាតទោះបីជា ១០ ឆ្នាំក្រោយក៏ដោយ។\n៤. **Versatile (បត់បែន):** ត្រូវតែមើលទៅស្អាតទោះជាបោះពុម្ពពណ៌សខ្មៅ ទំហំធំប៉ុនប៉ាណូ ឬតូចប៉ុនត្រា។\n៥. **Appropriate (ស័ក្តិសម):** ពណ៌និងទម្រង់ត្រូវស៊ីនឹងប្រភេទអាជីវកម្ម (ឧ. មន្ទីរពេទ្យមិនគួរប្រើឡូហ្គោពណ៌ខ្មៅរាងស្រួចៗទេ)។", 
        answer_en: "**To create a successful Logo, it must follow these 5 golden rules:**\n\n1. **Simple:** Easy to recognize, not overly detailed (e.g., Apple, Nike).\n2. **Memorable:** Sticks in the viewer's brain after just one glance.\n3. **Timeless:** Doesn't follow quick trends; it should still look great in 10 years.\n4. **Versatile:** It must look good whether it's printed in pure black & white, on a giant billboard, or as a tiny app icon.\n5. **Appropriate:** The vibe and colors must match the industry (e.g., a hospital shouldn't use a sharp, aggressive black logo).",
        chips: ["តើ RGB និង CMYK ខុសគ្នាម៉េច?", "ប្រភេទ File"],
        chips_en: ["RGB vs CMYK difference?", "File Formats"]
    },
    { 
        primaryKeys: ['តើ RGB និង CMYK ខុសគ្នាម៉េច?', 'rgb vs cmyk'],
        keys: ['rgb', 'cmyk', 'ប្រព័ន្ធពណ៌', 'pantone', 'pms'],
        regex: ['\\bcmyk\\b', 'ប្រព័ន្ធពណ៌', '\\bpantone\\b', '\\bpms\\b'], // Removed RGB to not clash with RGB wheel
        answer: "បាទ **ប្រព័ន្ធពណ៌សំខាន់ៗដែលអ្នកត្រូវដឹង៖**\n\n💻 **RGB (Red, Green, Blue):** ជាពណ៌ប្រើដោយពន្លឺអេក្រង់។ ប្រើវាសម្រាប់រចនា Website, Facebook Post ឬ Video។\n🖨️ **CMYK (Cyan, Magenta, Yellow, Black):** ជាពណ៌ទឹកថ្នាំម៉ាស៊ីនព្រីន។ ប្រើវាសម្រាប់រចនានាមប័ណ្ណ ខិត្តប័ណ្ណ។\n🎨 **Pantone (PMS):** ជាកូដពណ៌ទឹកថ្នាំពិសេស (Spot Colors) ដែលរោងពុម្ពលាយទុកមុន ធានាថាព្រីនចេញមកពណ៌ដូចដើម ១០០% (ច្រើនប្រើលើ Logo)។\n\n⚠️ **បំរាម៖** កុំយក File RGB ទៅព្រីន ព្រោះពណ៌នឹងចេញមកស្រអាប់ខុសពីមើលលើកុំព្យូទ័រ!", 
        answer_en: "**The Critical Color Profiles:**\n\n💻 **RGB (Red, Green, Blue):** Emitted light. Use this strictly for Digital Screens (UI, Social Media, Web).\n🖨️ **CMYK (Cyan, Magenta, Yellow, Key/Black):** Physical ink. Use this for standard Physical Printing (Flyers, Posters).\n🎨 **Pantone (PMS):** Pre-mixed spot colors used in high-end printing to ensure absolute color consistency for brand logos.\n\n⚠️ **Warning:** Never print an RGB file directly; the incredibly bright screen colors will look heavily washed out when translated to CMYK ink!",
        chips: ["តើ Resolution (PPI) ប៉ុន្មាន?", "ក្បួនផ្គូផ្គងពណ៌ (Color Harmonies)"],
        chips_en: ["Best Resolution for printing?", "Color Harmonies"]
    },
    { 
        primaryKeys: ['តើ Bleed គឺជាអ្វី?', 'what is a bleed', 'សម្រាប់បោះពុម្ព 🖨️', 'For Printing 🖨️'],
        keys: ['bleed', 'margin', 'die line', 'die-line', 'គែមសុវត្ថិភាព', 'slug'],
        regex: ['\\bbleed\\b', 'die line', 'die-line', '\\bslug\\b'], // removed 'margin'
        answer: "បាទ **ពាក្យបច្ចេកទេសសម្រាប់ការបោះពុម្ព (Print Production) ដែលអ្នកត្រូវដឹង៖**\n\n✂️ **Bleed (គែមបម្រុង):** ការពង្រីកផ្ទៃ Background ឱ្យហៀរចេញក្រៅទំហំកាត់ (ជាទូទៅ 3mm)។ 💡 *ហេតុអ្វី?* ព្រោះកាំបិតរោងពុម្ពកាត់មិនត្រឹមត្រូវ ១០០% ទេ បើអត់ដាក់ Bleed អាចនឹងសល់គែមពណ៌ស។\n📏 **Margin (គែមសុវត្ថិភាព):** ចន្លោះខាងក្នុងដែលហាមដាក់អក្សរ ការពារកុំឱ្យកាត់ដាច់ចូលសាច់អត្ថបទសំខាន់ៗ។\n📝 **Slug:** ជាទំហំក្រៅ Bleed បន្តិចទៀត ទុកសម្រាប់សរសេរកំណត់ចំណាំប្រាប់ជាងពុម្ព (មិនព្រីនចេញមកទេ)។", 
        answer_en: "**Essential Print Production Terminology:**\n\n✂️ **Bleed:** Extending the background colors or images slightly beyond the actual document edge (usually by 3mm). 💡 *Why?* Because printing guillotine blades aren't 100% precise. Bleeds prevent accidental white borders on the final cut.\n📏 **Safe Margin:** An invisible inner boundary. Crucial text and logos must stay inside this line so they don't risk getting chopped off.\n📝 **Slug:** The area completely outside the bleed. Used strictly to leave printed notes or instructions for the print operator.",
        chips: ["តើ Resolution (PPI) ប៉ុន្មាន?", "តើ RGB និង CMYK ខុសគ្នាម៉េច?"],
        chips_en: ["Best Resolution for printing?", "RGB vs CMYK difference?"]
    },
    { 
        primaryKeys: ['ប្រភេទ File', 'file formats'],
        keys: ['file format', 'jpg', 'png', 'svg', 'pdf'],
        regex: ['ប្រភេទ file', '\\bjpg\\b', '\\bpng\\b', '\\bsvg\\b', '\\bpdf\\b'],
        answer: "បាទ **ប្រភេទ File នីមួយៗមានគោលដៅប្រើផ្សេងគ្នា៖**\n\n📷 **JPG / JPEG:** សម្រាប់រូបថតទូទៅ។ វាមានទំហំស្រាល ប៉ុន្តែ**អត់អាចធ្វើ Background ថ្លាបានទេ**។\n✂️ **PNG:** សម្រាប់រូបដែលត្រូវការ Background ថ្លា (Transparent) ដូចជាឡូហ្គោ ឬរូបកាត់ផ្ទៃខាងក្រោយ។\n📐 **SVG:** ជា File Vector សម្រាប់ Website។ ទំហំស្រាលមែនទែន ហើយពង្រីកប៉ុណ្ណាក៏មិនបែកគ្រាប់។\n🖨️ **PDF:** ជា File ស្តង់ដារបំផុត សម្រាប់រក្សាទុករូបភាព ឬប្លង់ ដើម្បីបញ្ជូនទៅរោងពុម្ព ដោយមិនខ្លាចវរអក្សរ។", 
        answer_en: "**Different Image File Formats and when to use them:**\n\n📷 **JPG / JPEG:** Best for complex photographs. It compresses files to be smaller but **cannot support transparent backgrounds**.\n✂️ **PNG:** Used when you need a transparent background (like placing a logo over an image without a white box behind it).\n📐 **SVG:** A Vector format for Web Design. It is incredibly lightweight and scales infinitely without pixelating.\n🖨️ **PDF:** The universal professional standard for sending finished, high-quality designs to a physical printer.",
        chips: ["តើ Resolution (PPI) ប៉ុន្មាន?", "តើ RGB និង CMYK ខុសគ្នាម៉េច?"],
        chips_en: ["Best Resolution for printing?", "RGB vs CMYK difference?"]
    },
    { 
        primaryKeys: ['តើ Resolution (PPI) ប៉ុន្មាន?', 'best resolution for printing?'],
        keys: ['resolution', 'ppi', 'dpi', 'ភាពច្បាស់', 'ទំហំរូប'],
        regex: ['\\bresolution\\b', '\\bppi\\b', '\\bdpi\\b', 'ភាពច្បាស់', 'ទំហំរូប'],
        answer: "បាទ **Resolution (ភាពច្បាស់នៃរូបភាព) ត្រូវបានបែងចែកជា ២ ស្តង់ដារធំៗ៖**\n\n🖨️ **300 PPI (Pixels Per Inch):** ជាស្តង់ដារដាច់ខាតសម្រាប់ការបោះពុម្ព (Print) ដូចជា ខិត្តប័ណ្ណ សៀវភៅ ឬនាមប័ណ្ណ។ បើទាបជាងនេះ រូបនឹងបែកគ្រាប់ពេលព្រីនចេញមក។\n💻 **72 ទៅ 150 PPI:** ជាស្តង់ដារសម្រាប់បង្ហាញលើអេក្រង់ (Web, Facebook, Instagram)។ ការប្រើ 72 PPI ជួយឱ្យ File ស្រាល និងងាយស្រួលផ្ទុកចូលអ៊ីនធឺណិត។", 
        answer_en: "**Resolution standards are divided into two main categories:**\n\n🖨️ **300 PPI (Pixels Per Inch):** The absolute gold standard for Physical Printing. Anything lower will look blurry and pixelated on paper.\n💻 **72 to 150 PPI:** The standard for Digital Screens (Web, Social Media). Using 72 PPI keeps your file size extremely small so websites load instantly.",
        chips: ["តើ Bleed គឺជាអ្វី?", "តើ RGB និង CMYK ខុសគ្នាម៉េច?"],
        chips_en: ["What is a bleed?", "RGB vs CMYK difference?"]
    },
    { 
        primaryKeys: ['របៀបគិតលុយអតិថិជន? 💰', 'how to price my work? 💰'],
        keys: ['pricing', 'charge', 'គិតលុយម៉េច', 'តម្លៃ'],
        regex: ['\\bpricing\\b', '\\bcharge\\b', 'គិតលុយម៉េច', 'តម្លៃ'],
        answer: "បាទ **របៀបគិតតម្លៃសេវាកម្ម Design (Pricing Strategies) មាន៣ធំៗ៖**\n\n១. **គិតជាម៉ោង (Hourly Rate):** ល្អសម្រាប់គម្រោងដែលមិនច្បាស់លាស់ តែវាធ្វើឱ្យអ្នកខាតបើអ្នកធ្វើការលឿននិងពូកែ។\n២. **គិតជាគម្រោង (Project-Based):** វាយតម្លៃផ្អែកលើទំហំការងារ (ឧ. គូរឡូហ្គោមួយ ១៥០$)។ នេះជារបៀបពេញនិយមបំផុត។\n៣. **គិតតាមតម្លៃអតិថិជនទទួលបាន (Value-Based):** បើឡូហ្គោអ្នកធ្វើឱ្យក្រុមហ៊ុនគេចំណេញលុយរាប់លាន អ្នកគួរយកថ្លៃខ្ពស់ជាងតម្លៃធម្មតា។\n\n💡 **គន្លឹះអាជីព៖** តែងតែទារប្រាក់កក់ (Deposit) យ៉ាងហោចណាស់ 30% មុនពេលចាប់ផ្តើមការងារ!", 
        answer_en: "**There are 3 main Pricing Strategies for Freelance Designers:**\n\n1. **Hourly Rate:** Good for undefined projects, but it punishes you for being fast and efficient.\n2. **Project-Based:** Charging a flat fee for the whole deliverable (e.g., $150 for a logo). This is the most common and standard way.\n3. **Value-Based:** Pricing based on how much value the design brings to the client. If your branding helps a huge corporation make millions, you charge them significantly more than a local coffee shop.\n\n💡 **Pro Tip:** Always require a non-refundable deposit of at least 30% before you sketch a single idea!",
        chips: ["របៀបដោះស្រាយភ្ញៀវរអ៊ូ?", "របៀបរៀបចំ Portfolio?"],
        chips_en: ["Dealing with difficult clients?", "How to build a Portfolio?"]
    },
    { 
        primaryKeys: ['របៀបដោះស្រាយភ្ញៀវរអ៊ូ?', 'dealing with difficult clients?'],
        keys: ['ភ្ញៀវរអ៊ូ', 'ភ្ញៀវកែច្រើន', 'difficult client', 'revisions', 'feedback'],
        regex: ['ភ្ញៀវរអ៊ូ', 'ភ្ញៀវកែច្រើន', 'difficult client', '\\brevisions\\b', '\\bfeedback\\b'],
        answer: "បាទ នេះជាបញ្ហាដែល Designer គ្រប់រូបត្រូវជួប! **វិធីដោះស្រាយ៖**\n\n១. **មានកិច្ចសន្យាច្បាស់លាស់:** ត្រូវកំណត់ចំនួនដងដែលអាចកែបាន (Revisions) ត្រឹម ២ ឬ ៣ដងប៉ុណ្ណោះ។ បើកែលើសហ្នឹង ត្រូវគិតលុយថែម។\n២. **កុំយកអារម្មណ៍មកលាយឡំ:** ពេលគេរិះគន់ស្នាដៃ គេមិនមែនស្អប់អ្នកទេ គេគ្រាន់តែចង់បានអ្វីដែលត្រូវចិត្តគេ។ ត្រូវស្តាប់ និងសួររកហេតុផល។\n៣. **ពន្យល់ពីគោលការណ៍រចនា:** បើភ្ញៀវសុំឱ្យធ្វើអ្វីដែលឆ្គង (ឧ. ដាក់ពុម្ពអក្សរ ៥ប្រភេទ) អ្នកត្រូវហ៊ានពន្យល់គេតាមក្បួន Design ថាហេតុអ្វីវាមិនល្អ។", 
        answer_en: "**Dealing with difficult clients or endless revisions:**\n\n1. **Contracts are King:** Always define the exact number of included revisions (usually 2 or 3). If they want more changes, charge an hourly rate.\n2. **Detach your Ego:** Client feedback is not a personal attack. They just want their vision realized. Listen and ask 'Why?'.\n3. **Educate them:** If a client asks for a terrible design choice (like using 5 different fonts), politely explain *why* it breaks design principles and offer a better solution.",
        chips: ["របៀបគិតលុយអតិថិជន? 💰", "តើ Plagiarism គឺជាអ្វី?"],
        chips_en: ["How to price my work? 💰", "What is Plagiarism?"]
    },
    { 
        primaryKeys: ['របៀបរៀបចំ Portfolio?', 'freelance tips'],
        keys: ['portfolio', 'freelance', 'រកការងារ', 'contract', 'deposit'],
        regex: ['\\bportfolio\\b', '\\bfreelance\\b', 'រកការងារ', '\\bcontract\\b', '\\bdeposit\\b'],
        answer: "បាទ **គន្លឹះមាសសម្រាប់ Freelancer៖**\n\n១. **Portfolio:** កុំដាក់ស្នាដៃរញ៉េរញ៉ៃច្រើនពេក! ដាក់តែស្នាដៃល្អបំផុត ៣-៥គម្រោង បានហើយ។ ត្រូវមាន Case Study បង្ហាញពីរបៀបដែលអ្នកគិតដោះស្រាយបញ្ហា។\n២. **ប្រាក់កក់ (Deposit):** ទារកក់មុន (30%-50%) ជានិច្ច មុននឹងចាប់ផ្តើមគិតគំនិត ដើម្បីការពារភ្ញៀវរត់ចោល និងបង្ហាញពីភាពអាជីពរបស់អ្នក។", 
        answer_en: "**Golden Tips for Freelancers:**\n\n1. **Portfolio:** Do not upload every single thing you've made! Show only your top 3-5 best projects with detailed Case Studies explaining how you solved the client's problem.\n2. **Deposits:** Always demand a 30-50% upfront deposit before starting any actual work. It weeds out bad clients and protects your time.",
        chips: ["របៀបគិតលុយអតិថិជន? 💰", "របៀបដោះស្រាយភ្ញៀវរអ៊ូ?"],
        chips_en: ["How to price my work? 💰", "Dealing with difficult clients?"]
    },
    { 
        primaryKeys: ['តើ Plagiarism គឺជាអ្វី?', 'what is plagiarism'],
        keys: ['plagiarism', 'copyright', 'កម្មសិទ្ធិបញ្ញា', 'ethics'],
        regex: ['\\bplagiarism\\b', '\\bcopyright\\b', 'កម្មសិទ្ធិបញ្ញា', '\\bethics\\b'],
        answer: "បាទ **ក្រមសីលធម៌អ្នករចនា (Ethics & Copyright):**\n\n⚖️ **Plagiarism (ការលួចចម្លង):** ការយកស្នាដៃគេទាំងស្រុងមកកែពណ៌បន្តិចបន្តួច ហើយអះអាងថាជារបស់ខ្លួន គឺជាកំហុសធ្ងន់ធ្ងរបំផុត។ រៀនយកគំនិត (Inspiration) គឺខុសពីការលួច (Copying)។\n📄 **Commercial License:** រាល់រូបភាព (Stock Image) ក្រាហ្វិក និងហ្វុន (Fonts) ដែលយកមកប្រើរចនាឱ្យអតិថិជន ត្រូវប្រាកដថាអ្នកមានសិទ្ធិប្រើប្រាស់ (License) ត្រឹមត្រូវ ដើម្បីជៀសវាងការប្តឹងផ្តល់។", 
        answer_en: "**Design Ethics & Copyright Laws:**\n\n⚖️ **Plagiarism:** Downloading someone else's work, changing the color slightly, and claiming it as your own is a fatal career mistake. Gathering 'inspiration' using moodboards is completely different from 'copying'.\n📄 **Commercial Use Licenses:** Ensure every single stock photo, vector, and font you use in a client project has a valid commercial license. Never use 'Personal Use Only' fonts for a business logo, or you risk getting your client sued.",
        chips: ["របៀបរៀបចំ Portfolio?", "តើ UI និង UX ជាអ្វី?"],
        chips_en: ["How to build a great Portfolio?", "What are UI and UX?"]
    }
];