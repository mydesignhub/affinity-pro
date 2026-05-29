// ==========================================
// 🎨 AFFINITY LAYOUT & WORKFLOW DATABASE (V3 PC)
// ==========================================

export const layoutData = [
    // ------------------------------------------
    // TYPOGRAPHY & TEXT TOOLS
    // ------------------------------------------
    {
        primaryKeys: ['Artistic Text vs Frame Text', 'របៀបសរសេរអក្សរ', 'Text Tools'],
        keys: ['artistic text', 'frame text', 'សរសេរអក្សរ', 'វាយអក្សរ', 'អក្សរចំណងជើង', 'អក្សរកថាខណ្ឌ', 'text tool'],
        regex: ['\\bartistic text\\b', '\\bframe text\\b', 'សរសេរអក្សរ'],
        answer: "បាទ **នៅក្នុង Affinity V3 ការសរសេរអក្សរត្រូវបែងចែកជា ២ ប្រភេទធំៗ ទៅតាមគោលបំណងរបស់អ្នក៖**\n\n🅰️ **Artistic Text Tool (អក្សរចំណងជើង):**\n- **របៀបប្រើ:** ចុចមួយដងលើអេក្រង់ រួចវាយអក្សរ។\n- **លក្ខណៈពិសេស:** ពេលអ្នកទាញពង្រីកប្រអប់របស់វា អក្សរនឹងរីកធំ ឬតូចតាមទំហំដែលអ្នកទាញ (Scale)។ ល្អបំផុតសម្រាប់ធ្វើ ចំណងជើង (Headlines) ឡូហ្គោ ឬអក្សរធំៗលើ Poster។\n\n📄 **Frame Text Tool (អក្សរកថាខណ្ឌ):**\n- **របៀបប្រើ:** អូសគូរជាប្រអប់មួយសិន ទើបវាយអក្សរបញ្ចូល។\n- **លក្ខណៈពិសេស:** ពេលអ្នកទាញពង្រីក ឬបង្រួមប្រអប់ ទំហំអក្សរនៅរក្សាដដែល (ឧ. 12pt) ប៉ុន្តែវាគ្រាន់តែទម្លាក់បន្ទាត់ ឬរុញអក្សរឱ្យត្រូវនឹងប្រអប់ថ្មី។ ល្អបំផុតសម្រាប់វាយអត្ថបទវែងៗ សៀវភៅ ឬខិត្តប័ណ្ណ (Brochures)។",
        answer_en: "**In Affinity V3, Typography is strictly divided into two distinct tools based on your exact layout intent:**\n\n🅰️ **Artistic Text Tool (Display Typography):**\n- **Usage:** Click once anywhere on the canvas and start typing.\n- **Behavior:** When you grab the bounding box handles and drag, the actual font size scales up or down geometrically. This is mandatory for Logos, Poster Headlines, and standalone graphic typography.\n\n📄 **Frame Text Tool (Paragraph Layout):**\n- **Usage:** Click and drag to physically draw a text container box before typing.\n- **Behavior:** Scaling the bounding box does NOT change the font size. Instead, it reflows the paragraph structure, forcing line breaks to adapt to the new container dimensions. This is strictly for body copy, magazines, UI text blocks, and brochures.",
        chips: ["Typography Panel (ក្បូរក្បាច់អក្សរ)", "Text Styles (កំណត់ស្តង់ដារអក្សរ)"],
        chips_en: ["Typography Panel Secrets", "Mastering Text Styles"]
    },
    {
        primaryKeys: ['Text Styles (កំណត់ស្តង់ដារអក្សរ)', 'Mastering Text Styles', 'Paragraph Styles'],
        keys: ['text styles', 'paragraph style', 'character style', 'ស្តង់ដារអក្សរ', 'ប្តូរពុម្ពអក្សរទាំងអស់', 'global text'],
        regex: ['\\btext style', 'paragraph style', 'character style'],
        answer: "បាទ **Text Styles Panel គឺជាបេះដូងនៃការធ្វើ Layout សៀវភៅ ទីផ្សារ ឬ UI ឱ្យមានភាពរហ័ស និងត្រឹមត្រូវ!**\n\nជំនួសឱ្យការ Highlight អក្សរម្តងមួយៗដើម្បីដូរពុម្ពអក្សរ អ្នកគួរប្រើប្រព័ន្ធ Styles ដែលមាន ២ កម្រិត៖\n- **Paragraph Style (កម្រិតកថាខណ្ឌ):** គ្រប់គ្រងរូបរាងអត្ថបទទាំងមូល ដូចជាទំហំ Font, គម្លាតបន្ទាត់ (Line height), និងពណ៌។ (ឧទាហរណ៍៖ បង្កើត Style មួយឈ្មោះ 'Title 1')។\n- **Character Style (កម្រិតពាក្យ):** គ្រប់គ្រងតែពាក្យ ឬតួអក្សរណាមួយក្នុងកថាខណ្ឌ។ (ឧទាហរណ៍៖ បង្កើត Style ឈ្មោះ 'Highlight Red' សម្រាប់តែពាក្យសំខាន់ៗ)។\n\n💡 **វេទមន្តនៃ V3:** បើឯកសារអ្នកមាន ១០០ ទំព័រ ហើយអ្នកចង់ប្តូរចំណងជើងពីពណ៌ខ្មៅទៅខៀវ អ្នកគ្រាន់តែចូលទៅកែក្នុង Paragraph Style 'Title 1' នោះចំណងជើងទាំង ១០០ ទំព័រនឹងប្តូរពណ៌ព្រមគ្នាក្នុង ១វិនាទី!",
        answer_en: "**The Text Styles Panel is the absolute beating heart of automated, professional multi-page document layout and UI design!**\n\nInstead of manually highlighting and formatting text blocks piecemeal, establish a master hierarchy:\n- **Paragraph Styles:** Governs macro-level formatting for entire blocks of text, including Font Family, leading (line height), alignment, and space-after. (e.g., Creating a globally linked 'H1 Headline' style).\n- **Character Styles:** Governs micro-level formatting applied only to specific words within a paragraph overriding the base style. (e.g., Creating a 'Hyperlink Blue' style for single words).\n\n💡 **The V3 Magic:** If you have a 200-page magazine and the client wants all sub-headings changed from Arial to Roboto, you don't touch the pages. You simply edit the master Paragraph Style, and every single sub-heading across all 200 pages updates instantaneously!",
        chips: ["Typography Panel (ក្បូរក្បាច់អក្សរ)", "Master Pages និង Artboards"],
        chips_en: ["Typography Panel Secrets", "Master Pages vs Artboards"]
    },
    {
        primaryKeys: ['Typography Panel (ក្បូរក្បាច់អក្សរ)', 'Typography Panel Secrets', 'Ligatures'],
        keys: ['typography', 'ligature', 'drop cap', 'stylistic alternate', 'ក្បូរក្បាច់អក្សរ', 'អក្សរភ្ជាប់'],
        regex: ['\\btypography panel\\b', '\\bligature\\b', 'drop cap'],
        answer: "បាទ **Typography Panel (ចុច Window > Text > Typography) គឺជាកន្លែងបើកសោរមុខងារសម្ងាត់របស់ពុម្ពអក្សរ (Pro Fonts)!**\n\nប្រសិនបើអ្នកប្រើពុម្ពអក្សរថ្លៃៗ ឬពុម្ពអក្សរខ្មែរប្រភេទ Unicode ជំនាន់ថ្មី អ្នកអាចទាញយកសោភ័ណភាពអតិបរមាពីវាបានតាមរយៈ៖\n- **Ligatures (អក្សរភ្ជាប់):** បើកមុខងារនេះ ដើម្បីឱ្យអក្សរដែលនៅជាប់គ្នា (ឧទាហរណ៍ 'f' និង 'i') រលាយចូលគ្នាជាតួអក្សរថ្មីមួយដ៏ស្រស់ស្អាតដោយស្វ័យប្រវត្តិ។\n- **Stylistic Alternates:** ពុម្ពអក្សរខ្លះមានរចនាបថអក្សរ 'A' ឬ 'g' ច្រើនម៉ូដ។ មុខងារនេះអនុញ្ញាតឱ្យអ្នកជ្រើសរើសម៉ូដកន្ទុយអក្សរផ្សេងៗគ្នាបាន។\n- **Drop Caps (អក្សរធំដើមកថាខណ្ឌ):** ប្រើសម្រាប់អត្ថបទកាសែត ឬទស្សនាវដ្តី ដែលពង្រីកតួអក្សរទីមួយឱ្យធំប៉ុន ៣ បន្ទាត់។",
        answer_en: "**The Typography Panel is where you unlock the deeply embedded OpenType secrets encoded inside professional-grade fonts!**\n\nPremium fonts contain thousands of hidden glyphs. This panel allows you to activate them:\n- **Ligatures:** Standard and Historical ligatures mathematically merge conflicting letter combinations (like 'f' and 'i') into a single, beautifully designed unified glyph to prevent ugly typographic collisions.\n- **Stylistic Sets & Alternates:** Many premium fonts include up to 20 entirely different stylistic variations for specific letters (e.g., a swooping tail on a 'g' vs a standard double-story 'g').\n- **Fractions & Ordinals:** Automatically formats 1/2 or 1st into proper, cleanly stacked typographical fractions and raised ordinals.\n- **Drop Caps:** Instantly formats the very first letter of a magazine article to span perfectly across multiple lines of body text.",
        chips: ["Text Wrap (រុំអក្សរ)", "Baseline Grid (តម្រឹមបន្ទាត់)"],
        chips_en: ["Text Wrapping Workflow", "Baseline Grid Alignment"]
    },
    {
        primaryKeys: ['Text Wrap (រុំអក្សរ)', 'Text Wrapping Workflow'],
        keys: ['text wrap', 'រុំអក្សរ', 'អក្សរជុំវិញរូប', 'wrap text around image', 'រុញអក្សរ'],
        regex: ['text wrap', 'រុំអក្សរ', 'wrap text'],
        answer: "បាទ **Text Wrap គឺជាមុខងារចាំបាច់សម្រាប់ធ្វើទស្សនាវដ្តី ដែលអនុញ្ញាតឱ្យអក្សររត់គេច (រុំជុំវិញ) រូបភាពដោយស្វ័យប្រវត្តិ!**\n\n១. ជ្រើសរើសរូបភាព ឬ Vector Shape ដែលអ្នកចង់ឱ្យអក្សររត់គេច។\n២. ចុចលើប៊ូតុង **Show Text Wrap Settings** នៅលើរបារខាងលើ (រូបសញ្ញាអក្សររុំជុំវិញរង្វង់)។\n៣. ជ្រើសរើសប្រភេទ Wrap:\n   - **Square:** អក្សររត់គេចចេញជារាងប្រអប់ការ៉េ។\n   - **Tight:** អក្សររត់តម្រឹមតាមរាងកោង ឬរាងពិតប្រាកដរបស់វត្ថុ (ឧ. រាងកង់ឡាន)។\n៤. ទាញ `Distance from Text` ដើម្បីកំណត់គម្លាត (Padding) កុំឱ្យអក្សរនៅជាប់រូបភាពពេក។\n💡 ឥឡូវនេះ បើអ្នកទាញរូបភាពនេះទៅដាក់ចំកណ្តាលកថាខណ្ឌ អក្សរនឹងបើកផ្លូវឱ្យរូបភាពនោះដោយខ្លួនឯង!",
        answer_en: "**Text Wrap is the cornerstone of editorial and magazine layout, forcing paragraphs to dynamically flow around intersecting images and shapes!**\n\n1. Select the image or vector shape that you want the text to avoid.\n2. Click the **Show Text Wrap Settings** icon on the top context toolbar (it looks like lines wrapping around a circle).\n3. Select your Wrap Style:\n   - **Square:** Forces the text to respect the rectangular bounding box of the image.\n   - **Tight:** The text fluidly conforms to the actual Alpha/Vector contour of the shape (e.g., text wrapping precisely around the curve of a guitar).\n4. Adjust the `Distance from Text` parameters to ensure the typography doesn't touch the image.\n💡 Now, simply drag your image directly into the center of a text block, and watch the words part like the Red Sea!",
        chips: ["Pinning / Anchored Objects", "Baseline Grid (តម្រឹមបន្ទាត់)"],
        chips_en: ["Pinning & Anchoring Objects", "Baseline Grid Alignment"]
    },
    {
        primaryKeys: ['Pinning / Anchored Objects', 'Pinning & Anchoring Objects'],
        keys: ['pinning', 'anchor', 'ភ្ជាប់រូបជាមួយអក្សរ', 'រូបរត់តាមអក្សរ', 'inline image', 'pinned object'],
        regex: ['pinning', 'anchor', 'ភ្ជាប់រូប'],
        answer: "បាទ **Pinning Panel អនុញ្ញាតឱ្យអ្នក 'ចង' រូបភាព ទៅនឹងពាក្យណាមួយក្នុងកថាខណ្ឌ។ ពេលអ្នកលុប ឬបន្ថែមអក្សរ រូបភាពនោះនឹងរត់តាមអក្សរជានិច្ច!**\n\n១. យកតួអក្សរ (Text cursor) ទៅដាក់ក្បែរពាក្យដែលអ្នកចង់ចងរូបភាពភ្ជាប់។\n២. ទាញរូបភាពដែលអ្នកចង់បាន (ឧទាហរណ៍ Icon តូចមួយ) មកដាក់លើអេក្រង់។\n៣. នៅក្នុង **Pinning Panel** (Window > Text > Pinning) ចុចប៊ូតុង **Float** ឬ **Inline**។\n   - **Inline:** រូបភាពនឹងចូលទៅតម្រឹមខ្លួនក្នុងបន្ទាត់អក្សរតែម្តង ដូចជាអក្សរមួយតួអញ្ចឹង។\n   - **Float:** រូបភាពនៅអណ្តែត ប៉ុន្តែវាមានខ្សែចំណង (Anchor) ភ្ជាប់ទៅកាន់ពាក្យនោះ។\n💡 បើគ្មានមុខងារនេះទេ ពេលអ្នក Enter ទម្លាក់បន្ទាត់ រូបភាពនៅកន្លែងចាស់ រីឯអក្សររត់ទៅបាត់!",
        answer_en: "**The Pinning Panel allows you to mathematically anchor a graphic directly to a specific word in your text flow, ensuring the image travels with the text during edits!**\n\n1. Place your text cursor exactly where you want the anchor point to exist.\n2. Ensure the graphic (e.g., an icon or a chart) is selected.\n3. Open the **Pinning Panel** (Window > Text > Pinning) and click **Inline** or **Float**.\n   - **Inline:** The graphic drops directly into the paragraph line, behaving exactly like a typed letter.\n   - **Float:** The graphic floats elsewhere on the page, but maintains an invisible tether to the word. If the word moves to page 3, the floating graphic moves to page 3.\n💡 Without Pinning, if you added 5 paragraphs of new text, your graphics would be left behind on the wrong pages!",
        chips: ["Text Wrap (រុំអក្សរ)", "Baseline Grid (តម្រឹមបន្ទាត់)"],
        chips_en: ["Text Wrapping Workflow", "Baseline Grid Alignment"]
    },
    {
        primaryKeys: ['Baseline Grid (តម្រឹមបន្ទាត់)', 'Baseline Grid Alignment'],
        keys: ['baseline grid', 'តម្រឹមបន្ទាត់អក្សរ', 'align text', 'បន្ទាត់សៀវភៅ', 'line up text'],
        regex: ['baseline grid', 'តម្រឹមបន្ទាត់អក្សរ'],
        answer: "បាទ **Baseline Grid គឺជាអាថ៌កំបាំងនៃការធ្វើសៀវភៅ ដែលធ្វើឱ្យបន្ទាត់អក្សរនៅទំព័រឆ្វេង និងទំព័រស្តាំ ស្មើគ្នាបេះបិទ!**\n\nបើគ្មានវាទេ អក្សរនៅជួរឈរឆ្វេង និងស្តាំ អាចនឹងរលាក់ មិនត្រង់បន្ទាត់គ្នាទេ។\n១. ចូលទៅកាន់ **View > Baseline Grid Manager** រួចគូសធីក `Use Baseline Grid`។\n២. អ្នកនឹងឃើញបន្ទាត់ពណ៌ខៀវដេកៗលេចឡើងពេញក្រដាស (ដូចសៀវភៅសរសេរ)។\n៣. កំណត់ `Grid Spacing` ឱ្យស្មើនឹងទំហំ Line Height នៃអក្សរអ្នក (ឧទាហរណ៍ 14pt)។\n៤. ឥឡូវនេះ អត្ថបទ (Frame Text) របស់អ្នកនឹងរត់ទៅ 'Snap' ជាប់នឹងបន្ទាត់ទាំងនោះយ៉ាងត្រង់ស្អាត មិនថារូបភាពមកច្រាន (Text Wrap) វាយ៉ាងណាក៏ដោយ!",
        answer_en: "**The Baseline Grid is the invisible typographical skeleton that forces absolute structural alignment across columns and adjacent pages!**\n\nWithout it, paragraph lines in the left column will rarely align perfectly horizontally with the right column, looking incredibly amateurish.\n1. Navigate to **View > Baseline Grid Manager** and check `Use Baseline Grid`.\n2. A persistent overlay of horizontal blue lines (like a ruled notebook) appears.\n3. Set the `Grid Spacing` to match the exact Leading (Line Height) of your Body Text (e.g., 14pt).\n4. All your Body Text will now magnetically snap its baseline to these grid lines. Even if a massive image interrupts a column, the text below the image will perfectly resume on the global grid!",
        chips: ["Text Wrap (រុំអក្សរ)", "Grid Systems & Column Guides"],
        chips_en: ["Text Wrapping Workflow", "Grid Systems & Column Guides"]
    },

    // ------------------------------------------
    // DOCUMENT PREP & PUBLISHING
    // ------------------------------------------
    {
        primaryKeys: ['Master Pages និង Artboards', 'Master Pages vs Artboards'],
        keys: ['master page', 'artboard', 'ទំព័រដើម', 'ក្ដារគូររូប', 'multi page', 'page number'],
        regex: ['master page', '\\bartboard\\b', 'ទំព័រដើម'],
        answer: "បាទ **តើពេលណាគួរប្រើ Master Pages ហើយពេលណាគួរប្រើ Artboards? ពួកវាមានតួនាទីខុសគ្នាស្រឡះ៖**\n\n🖼️ **Artboards (សម្រាប់ Designer/UI):**\n- វាជាផ្ទាំងក្រណាត់រាងការ៉េ ដែលអាចរៀបចំរាយប៉ាយតាមចិត្តលើអេក្រង់។\n- ល្អបំផុតសម្រាប់៖ ធ្វើ UI App, ឡូហ្គោច្រើនជម្រើស, ឬ Post Facebook ៥សន្លឹកជាប់គ្នា។\n\n📖 **Master Pages (សម្រាប់ Publisher/សៀវភៅ):**\n- វាជា 'ទំព័រពុម្ព' សម្រាប់ឯកសារដែលមានច្រើនទំព័រ (ដូចជាសៀវភៅ ១០០ទំព័រ)។\n- **មន្តអាគម:** បើអ្នកគូរឡូហ្គោក្រុមហ៊ុន និងលេខទំព័រ (Page Number) ចូលក្នុង Master Page នោះ ឡូហ្គោ និងលេខទំព័រនឹងលោតចូលទៅគ្រប់ទំព័រទាំង ១០០ ដោយស្វ័យប្រវត្តិ។ បើអ្នកចង់ប្តូរឡូហ្គោ គ្រាន់តែកែលើ Master Page ម្តង វាដូរគ្រប់ទំព័រតែម្តង!",
        answer_en: "**When do you use Master Pages vs Artboards? They dictate two entirely different workflow paradigms:**\n\n🖼️ **Artboards (Designer / UI Workflow):**\n- These are infinite, free-floating canvases arranged however you like on an infinite desktop.\n- **Use case:** Web design, Mobile App UI screens, designing 5 different Logo variations, or creating multiple Instagram carousel posts simultaneously.\n\n📖 **Master Pages (Publisher / Editorial Workflow):**\n- These are 'Templates' strictly structured for sequential, multi-page print or PDF documents.\n- **The Magic:** If you place a Company Logo, a Background texture, and an Auto-Page Number tag on `Master Page A`, those elements instantly propagate to all 200 pages assigned to that Master. Edit the Master once, and it updates the entire book globally!",
        chips: ["Bleed, Margins & Slug", "PDF Export Settings"],
        chips_en: ["Bleed, Margins & Slug", "PDF Export Settings"]
    },
    {
        primaryKeys: ['Bleed, Margins & Slug', 'Bleed, Margins & Print Standards'],
        keys: ['bleed', 'margin', 'slug', 'គម្លាត', 'កាត់សាច់ក្រដាស', 'print margin', 'គែមសុវត្ថិភាព'],
        regex: ['\\bbleed\\b', '\\bmargin\\b', 'កាត់សាច់ក្រដាស'],
        answer: "បាទ **មុននឹងបញ្ជូន File ទៅរោងពុម្ព អ្នកត្រូវតែស្គាល់គោលការណ៍ទាំង ៣ នេះជាដាច់ខាត៖**\n\n១. **Margins (គែមសុវត្ថិភាព):** បន្ទាត់ពណ៌ខៀវខាងក្នុងក្រដាស។ កុំសរសេរអក្សរហួសបន្ទាត់នេះ ព្រោះពេលគេកាត់សៀវភៅ វាអាចនឹងស៊ីដាច់អក្សរ។\n២. **Bleed (គែមកាត់ចោល - សំខាន់បំផុត!):** បន្ទាត់ពណ៌ស្វាយដែលនៅ **ក្រៅ** សាច់ក្រដាស (ជាទូទៅទំហំ 3mm)។ បើអ្នកមានរូបភាព ឬពណ៌ Background ពេញក្រដាស អ្នកត្រូវអូសរូបនោះឱ្យហួសចេញមកដល់ខ្សែ Bleed នេះ។ ពេលរោងពុម្ពកាត់ឆូតតាមគែម វានឹងមិនសល់គែមសៗអាក្រក់មើលឡើយ។\n៣. **Slug:** តំបន់នៅក្រៅ Bleed បន្តិចទៀត សម្រាប់សរសេរ Note ឬការណែនាំប្រាប់ទៅកាន់ជាងពុម្ព។\n\n💡 អាចកំណត់បានពេលបង្កើត File (File > New) ឬចូលកែក្នុង Document Setup គ្រប់ពេល។",
        answer_en: "**Before sending any file to a commercial printing press, you must master the holy trinity of Print Preparation:**\n\n1. **Margins (The Safe Zone):** The internal blue boundary. NEVER place typography outside the margins. When the massive hydraulic blades trim the magazines, any text too close to the edge gets sliced off.\n2. **Bleed (The Critical Overshoot):** The external purple boundary (Standard is 3mm or 0.125in) OUTSIDE your actual document edge. If you have a photograph or solid background color, you MUST stretch it past the page edge all the way to the Bleed line. This ensures that when the blade trims the paper (which always has a 1-2mm shift variance), you aren't left with an ugly sliver of white unprinted paper on the edge!\n3. **Slug:** An area even further outside the bleed used exclusively to leave textual notes, color registration marks, and instructions for the print operator.",
        chips: ["Preflight Panel (ឆែកកំហុស)", "PDF Export Settings"],
        chips_en: ["Preflight Panel (Live Check)", "PDF Export Settings"]
    },
    {
        primaryKeys: ['Preflight Panel (ឆែកកំហុស)', 'Preflight Panel (Live Check)'],
        keys: ['preflight', 'check error', 'ឆែកកំហុស', 'បាត់ font', 'missing font', 'low res image'],
        regex: ['\\bpreflight\\b', 'missing font', 'ឆែកកំហុស'],
        answer: "បាទ **Preflight Panel គឺជាវេជ្ជបណ្ឌិតដែលពិនិត្យកំហុសឯកសាររបស់អ្នកមុនពេល Save ចេញ ដើម្បីកុំឱ្យខូចការងារ!**\n\nអ្នកកំពុងធ្វើសៀវភៅ ៥០ ទំព័រ តើអ្នកច្បាស់ទេថាមិនមានកំហុស?\nបើក **Window > Preflight** វានឹងប្រាប់អ្នកភ្លាមៗនូវកំហុសដូចជា៖\n- 🔴 **Missing Fonts:** អ្នកបានប្រើ Font ដែលមិនមានក្នុងកុំព្យូទ័រនេះ។\n- 🔴 **Low Resolution Images:** មានរូបភាពខ្លះព្រិលពេក (DPI ទាបជាង 300) មិនអាចបោះពុម្ពចេញមកស្អាតបានទេ។\n- 🔴 **Overflowing Text:** អក្សរវែងពេក ធ្លាក់បាត់ចេញពីប្រអប់ Frame Text ដែលមើលមិនឃើញ។\n- 🔴 **Missing Images:** File រូបភាពដែលអ្នកភ្ជាប់ (Linked) ត្រូវបានលុបចេញពីកុំព្យូទ័រ។\n\n💡 គ្រាន់តែចុចពីរដង (Double-click) លើកំហុសនោះ កម្មវិធីនឹងរត់ទៅរកទំព័រនិងចំណុចខូចនោះភ្លាមៗ ដើម្បីឱ្យអ្នកកែតម្រូវបានទាន់ពេល!",
        answer_en: "**The Preflight Panel is your automated quality-assurance inspector, ensuring you never send a broken file to the client or the printing press!**\n\nWhen designing a 50-page magazine, human error is inevitable. Open **Window > Preflight**, and the engine actively scans your document, flagging critical errors with red warnings:\n- 🔴 **Missing Fonts:** You are using a font that isn't installed on the current operating system.\n- 🔴 **Low Resolution Images:** A placed image drops below the required 300 DPI threshold for sharp commercial printing.\n- 🔴 **Overflowing Text:** A text box is too small, meaning vital paragraphs are hidden invisibly beyond the bounding box.\n- 🔴 **Unlinked Resources:** A photograph you 'Linked' to your hard drive has been moved or deleted.\n\n💡 Simply double-click the error warning in the panel, and Affinity instantly navigates to the exact page and highlights the offending layer so you can fix it before export!",
        chips: ["Packaging Files (ប្រមូល File)", "PDF Export Settings"],
        chips_en: ["Packaging Files Workflow", "PDF Export Settings"]
    },
    {
        primaryKeys: ['PDF Export Settings', 'CMYK vs RGB Export'],
        keys: ['export pdf', 'save pdf', 'cmyk', 'rgb', 'print ready', 'pdf for web', 'save print'],
        regex: ['\\bpdf\\b', '\\bcmyk\\b', 'save print'],
        answer: "បាទ **ការ Export ឯកសារជា PDF សម្រាប់រោងពុម្ព (Print) និងសម្រាប់មើលលើទូរស័ព្ទ (Web) គឺខុសគ្នាស្រឡះ!**\n\nនៅពេលអ្នកចុច File > Export ជា PDF សូមជ្រើសរើស Preset ឱ្យត្រូវ៖\n\n🖨️ **សម្រាប់បោះពុម្ព (PDF for Print / Press Ready):**\n- ត្រូវប្រាកដថា Color Space ត្រូវបានប្តូរទៅជា **CMYK** (ពណ៌ទឹកថ្នាំរោងពុម្ព)។\n- កុំភ្លេចគូសធីក **Include Bleed** ដើម្បីឱ្យមានសាច់កាត់ដែលយើងអូសហួស (Bleed)។\n- គួរប្រើ Preset: `PDF (Press Ready)` ឬ `PDF/X-4`។\n\n💻 **សម្រាប់បញ្ជូនតាម Telegram ឬដាក់លើ Web:**\n- ជ្រើសរើស Color Space ជា **RGB** (ពណ៌ភ្លឺស្រស់ស្អាតលើអេក្រង់)។\n- ជ្រើសរើស `Downsample Images` ដើម្បីឱ្យទំហំ File តូចងាយស្រួលផ្ញើ។\n- គួរប្រើ Preset: `PDF (For Export)` ឬ `PDF (Digital)`។",
        answer_en: "**Exporting a PDF requires explicit configuration depending entirely on whether the destination is a commercial printing press or a digital screen!**\n\nWhen navigating to File > Export > PDF, do not use the default settings blindly:\n\n🖨️ **For Commercial Printing (Press Ready):**\n- You MUST ensure the Color Space is converted to **CMYK** (Cyan, Magenta, Yellow, Key/Black—the physical inks used by printers).\n- You MUST check the box to **Include Bleed**; otherwise, your carefully designed bleed margins will be deleted from the PDF.\n- Recommended Preset: `PDF (Press Ready)` or `PDF/X-4` (the industry standard).\n\n💻 **For Digital Viewing (Web / Email / Telegram):**\n- Ensure the Color Space is strictly **RGB** (to maintain vibrant, glowing colors on monitors and phones).\n- Allow the engine to 'Downsample Images' to 144 DPI or 72 DPI to compress the massive file size down to a few megabytes for easy emailing.\n- Recommended Preset: `PDF (Digital)`.",
        chips: ["Bleed, Margins & Slug", "Packaging Files (ប្រមូល File)"],
        chips_en: ["Bleed, Margins & Slug", "Packaging Files Workflow"]
    },
    {
        primaryKeys: ['Data Merge (ទាញទិន្នន័យស្វ័យប្រវត្តិ)', 'Automating with Data Merge'],
        keys: ['data merge', 'excel to id card', 'ទាញឈ្មោះពី excel', 'ធ្វើកាតបុគ្គលិកច្រើន', 'automate business cards', 'csv'],
        regex: ['data merge', 'excel', '\\bcsv\\b', 'កាតបុគ្គលិក'],
        answer: "បាទ **Data Merge គឺជាមុខងារវេទមន្តនៅក្នុង Affinity Publisher សម្រាប់ធ្វើកាតបុគ្គលិក នាមប័ណ្ណ ឬវិញ្ញាបនបត្រ រាប់រយសន្លឹកក្នុងរយៈពេលប៉ុន្មានវិនាទី!**\n\nឧទាហរណ៍៖ អ្នកចង់ធ្វើកាតបុគ្គលិក ១០០នាក់ ដោយមានឈ្មោះនិងរូបថតខុសៗគ្នា៖\n១. រៀបចំ File Excel ឬ Google Sheets មួយដែលមានឈ្មោះ និងផ្លូវទៅកាន់រូបថត រួច Save វាជាប្រភេទ **.CSV**។\n２. ចូលទៅកាន់ **Window > Data Merge Manager** រួចចុច Add Document ដើម្បីទាញយក File .CSV នោះចូល។\n៣. បង្កើត Design កាតបុគ្គលិកតែ **១សន្លឹក** ប៉ុណ្ណោះលើ Master Page។\n៤. ចូលទៅ Fields Panel (Window > References > Fields) រួចអូសពាក្យ `<Name>` ទៅទម្លាក់លើប្រអប់អក្សរ និងអូស `<Photo>` ទៅទម្លាក់លើប្រអប់រូបភាព។\n៥. ត្រឡប់ទៅ Data Merge Manager រួចចុចប៊ូតុង **Generate**។ កម្មវិធីនឹងបង្កើតឯកសារថ្មីមួយ ដែលមានកាត ១០០សន្លឹក ឈ្មោះ១០០ ខុសៗគ្នាដោយស្វ័យប្រវត្តិ!",
        answer_en: "**Data Merge is an incredibly powerful database automation tool within Affinity Publisher, designed to instantly generate hundreds of unique ID cards, certificates, or business cards in seconds!**\n\nScenario: Generating 500 employee ID badges with unique names, job titles, and portrait photos:\n1. Prepare an Excel or Google Sheet containing columns for Name, Title, and local file paths to their headshots. Export this as a **.CSV** file.\n2. Open **Window > Data Merge Manager** and click Add Data Source to link your .CSV file.\n3. Design a single, beautiful master template on your canvas.\n4. Open the Fields Panel (Window > References > Fields). Drag the `<Name>` data tag and drop it into your typography block. Drag the `<Photo>` data tag and drop it onto your image placeholder.\n5. Return to the Data Merge Manager and click **Generate**. Affinity will crunch the data and instantly output a brand new document containing 500 perfectly generated pages, each populated with the correct employee's data!",
        chips: ["Master Pages និង Artboards", "Text Styles (កំណត់ស្តង់ដារអក្សរ)"],
        chips_en: ["Master Pages vs Artboards", "Mastering Text Styles"]
    },
    {
        primaryKeys: ['Packaging Files (ប្រមូល File)', 'Packaging Files Workflow'],
        keys: ['package file', 'save package', 'ប្រមូលឯកសារ', 'ផ្ញើឯកសារទៅគេ', 'missing link', 'gather fonts'],
        regex: ['package', 'ប្រមូលឯកសារ'],
        answer: "បាទ **Packaging គឺជាមុខងារដ៏សំខាន់សម្រាប់ប្រមូល 'រូបភាព' និង 'ពុម្ពអក្សរ (Fonts)' ទាំងអស់ដាក់ក្នុង Folder តែមួយ មុននឹងផ្ញើទៅកាន់កុំព្យូទ័រអ្នកផ្សេង!**\n\nបញ្ហា៖ បើអ្នកគ្រាន់តែផ្ញើ File `.afpub` ទៅមិត្តភក្តិ ពេលគាត់បើកមក វានឹងរត់បាត់ Font និងបាត់រូបភាពដែលអ្នកបានទាញពី Desktop របស់អ្នក។\n\n✅ ដំណោះស្រាយ៖\n១. ចូលទៅកាន់ **File > Save As Package...**\n២. វានឹងឱ្យអ្នករើសកន្លែង (Folder) មួយ។\n៣. កម្មវិធីនឹងធ្វើការ Copy រាល់ពុម្ពអក្សរ (Fonts) ដែលអ្នកបានប្រើ រាល់រូបភាពដែលអ្នកបានដាក់បញ្ចូល (Linked Images) រួមទាំងឯកសារដើម យកទៅដាក់ផ្តុំគ្នាក្នុង Folder នោះ។\nឥឡូវ អ្នកអាច Zip Folder នោះទាំងមូល ហើយផ្ញើទៅអ្នកណា ក៏បើកមកនៅស្អាត ១០០% ដែរ!",
        answer_en: "**Packaging is a mandatory professional workflow that gathers and copies every single linked image and installed font used in your document into a single, unified folder structure!**\n\nThe Catastrophe: If you merely email an `.afpub` project file to a colleague, when they open it, every custom font will be missing (replaced by Arial), and every photograph linked to your desktop will be a blank red box.\n\n✅ The Solution:\n1. Navigate to **File > Save As Package...**\n2. Designate a new target folder on your hard drive.\n3. The engine physically duplicates all utilized Font files (.ttf/.otf), all Linked photography, and generates a fresh project file, sealing them all inside the new folder.\nYou can now Zip this master folder and send it to any print shop or collaborator with 100% confidence that the layout will open flawlessly without a single missing asset!",
        chips: ["Preflight Panel (ឆែកកំហុស)", "PDF Export Settings"],
        chips_en: ["Preflight Panel (Live Check)", "PDF Export Settings"]
    },

    // ------------------------------------------
    // WORKSPACE & UI MANAGEMENT
    // ------------------------------------------
    {
        primaryKeys: ['Grid Systems & Column Guides', 'Grid Systems'],
        keys: ['grid', 'column guide', 'បន្ទាត់ក្រឡា', 'គូសក្រឡា', 'snapping grid', 'layout grid'],
        regex: ['\\bgrid\\b', 'column guide', 'បន្ទាត់ក្រឡា'],
        answer: "បាទ **ដើម្បីរៀបចំ Layout ឱ្យមានរបៀបរៀបរយ អ្នកត្រូវការប្រើប្រព័ន្ធ Grids និង Guides!**\n\n- **Column Guides (បន្ទាត់ជួរឈរ):** ចូលទៅ `View > Guides Manager`។ នៅទីនេះ អ្នកអាចបង្កើត Columns ឧទាហរណ៍ ៣ ជួរ (3 Columns) និងកំណត់ Gutter (ចន្លោះប្រហោងកណ្តាល) ឱ្យមានរបៀប។ ល្អបំផុតសម្រាប់ធ្វើទស្សនាវដ្តី។\n- **Grid and Snapping Axis:** ចូលទៅ `View > Grid and Axis Manager`។ វាបង្កើតក្រឡាអុកតូចៗ (Squares) លើអេក្រង់។ អ្នកអាចបើក Snapping (រូបមេដែក) ដើម្បីឱ្យពេលអ្នកគូរប្រអប់ ឬអក្សរ វាលោតទៅទាក់ជាប់នឹងបន្ទាត់ក្រឡាទាំងនោះយ៉ាងត្រង់ស្អាតបេះបិទ! វាក៏មានក្រឡាប្រភេទ Isometric សម្រាប់គូររូប 3D ផងដែរ។",
        answer_en: "**To establish perfect, mathematically sound layouts and UIs, you must utilize the internal Grid and Guide architectures!**\n\n- **Column Guides:** Navigate to `View > Guides Manager`. Here you can globally establish vertical Columns (e.g., a classic 12-column web grid or a 3-column magazine grid) and specify the precise Gutter width between them.\n- **Document Grids:** Navigate to `View > Grid and Axis Manager`. This generates a persistent graph-paper overlay. When you activate Snapping (the Magnet icon), your vector shapes and typography blocks will physically snap to the grid intersections, guaranteeing pixel-perfect alignment globally! You can even change the grid mode to 'Isometric' to construct flawless 3D architectural vectors.",
        chips: ["Baseline Grid (តម្រឹមបន្ទាត់)", "Reset Studio (បាត់ឧបករណ៍)"],
        chips_en: ["Baseline Grid Alignment", "Resetting the Workspace"]
    },
    {
        primaryKeys: ['Reset Studio (បាត់ឧបករណ៍)', 'Resetting the Workspace', 'Where are my tools?'],
        keys: ['reset studio', 'បាត់ឧបករណ៍', 'missing panel', 'រកឧបករណ៍មិនឃើញ', 'បាត់ layers', 'restore workspace', 'where is the tool'],
        regex: ['reset studio', 'បាត់ឧបករណ៍', 'missing', 'បាត់ layers', 'រកមិនឃើញ'],
        answer: "បាទ **នេះជាបញ្ហាទូទៅបំផុត៖ បើអ្នកច្រឡំចុចខ្វែង (Close) បិទផ្ទាំង Layers Panel, Color Panel ឬឧបករណ៍នានាបាត់ តើត្រូវទាញយកមកវិញដោយរបៀបណា?**\n\nកុំបារម្ភ អ្នកអាច Reset អ្វីៗគ្រប់យ៉ាងមកសភាពដើមវិញក្នុង ១វិនាទី៖\n១. ចូលទៅកាន់ម៉ឺនុយ **Window** នៅរបារខាងលើสุด។\n２. ជ្រើសរើស **Studio > Reset Studio**។\n\nភ្លាមៗនោះ ផ្ទាំង Layers, Colors, Brushes, និងផ្ទាំងផ្សេងៗទៀតនឹងលោតត្រឡប់មកកន្លែងដើមវិញយ៉ាងមានរបៀប។\n💡 **បើបាត់របារឧបករណ៍ខាងឆ្វេង (Tools):** ចូលទៅ `Window > Toggle Tools`។\n💡 **បើបាត់របារខាងលើ (Context Toolbar):** ចូលទៅ `Window > Toggle Context Toolbar`។",
        answer_en: "**This is the absolute most common panic-moment for beginners: You accidentally clicked the 'X' on the Layers panel, and now everything is gone! How do you get it back?**\n\nDo not panic. You can instantly restore the entire user interface to factory defaults in two clicks:\n1. Navigate to the very top menu bar and click **Window**.\n2. Select **Studio > Reset Studio**.\n\nInstantly, your Layers, Colors, Brushes, and all standard panels will aggressively snap back into their default, organized docks on the right side of your screen.\n💡 **If you lost the left-hand Tool Icons:** Go to `Window > Toggle Tools`.\n💡 **If you lost the top options bar:** Go to `Window > Toggle Context Toolbar`.",
        chips: ["Save History With Document", "Change Canvas Color (ប្តូរពណ៌ Background)"],
        chips_en: ["Save History With Document", "Change Canvas Background Color"]
    },
    {
        primaryKeys: ['Change Canvas Color (ប្តូរពណ៌ Background)', 'Change Canvas Background Color'],
        keys: ['background color', 'canvas color', 'ពណ៌ផ្ទៃ', 'ប្តូរពណ៌ក្រោយ', 'ពណ៌ក្រដាស', 'transparent background'],
        regex: ['background color', 'canvas color', 'ពណ៌ផ្ទៃ', 'ពណ៌ក្រដាស'],
        answer: "បាទ **ដើម្បីប្តូរពណ៌ផ្ទៃក្រដាស (Background Canvas) នៅក្នុង Affinity មានវិធីងាយៗ ២យ៉ាង៖**\n\n✅ **វិធីទី១ (សម្រាប់ Web/UI):**\nគ្រាន់តែគូររូបប្រអប់ចតុកោណកែង (Rectangle Tool) ឱ្យធំប៉ុនសាច់ក្រដាស ចាក់ពណ៌ដែលអ្នកចង់បាន រួច Lock Layer នោះទុកនៅក្រោមគេបំផុត។ នេះជាវិធីដែលស្រួលគ្រប់គ្រងបំផុត។\n\n✅ **វិធីទី២ (កំណត់ក្នុង Document):**\nចូលទៅកាន់ `File > Document Setup...` រួចចូលទៅផ្ទាំង `Color`។ គូសធីកលើពាក្យ **'Transparent Background'** បើអ្នកចង់បានផ្ទៃថ្លា។ ប៉ុន្តែ Affinity មិនមានមុខងារ 'កំណត់ពណ៌ក្រដាសផ្ទាល់' ដូចកម្មវិធីផ្សេងទេ ហេតុនេះវិធីទី១ គឺជម្រើសស្តង់ដារបំផុត!",
        answer_en: "**To change the physical background color of your canvas in Affinity, you should adopt the industry-standard layer approach:**\n\n✅ **The Standard Workflow:**\nSimply select the Rectangle Tool (`M`), draw a massive vector box that covers your entire canvas perfectly, fill it with your desired color, drag it to the absolute bottom of your Layers panel, and click the 'Lock' icon. This is completely non-destructive and easily editable.\n\n✅ **Transparency Toggle:**\nIf you want a truly transparent background (the checkerboard pattern for PNG logos), navigate to `File > Document Setup...`, switch to the `Color` tab, and check **'Transparent Background'**. Affinity intentionally does not have a global 'canvas paint color' setting, enforcing the use of actual vector layers for colored backgrounds.",
        chips: ["Transparent Background", "Document Resize (ប្តូរទំហំ)"],
        chips_en: ["Transparent Background PNG", "Document vs Canvas Resize"]
    },
    {
        primaryKeys: ['Save History With Document', 'Time-traveling after closing'],
        keys: ['save history', 'undo after close', 'save undo', 'រក្សាទុកសកម្មភាព', 'ctrl z', 'history panel'],
        regex: ['save history', 'undo', 'history panel'],
        answer: "បាទ **នេះជាមុខងារវេទមន្តមួយរបស់ Affinity៖ អ្នកអាច Undo សកម្មភាពរបស់អ្នកឡើងវិញ ទោះបីជាអ្នកបានបិទកុំព្យូទ័រ និងបិទកម្មវិធីកាលពីម្សិលមិញក៏ដោយ!**\n\nជាទូទៅ បើអ្នក Save File ហើយបិទកម្មវិធី ពេលបើកមកវិញអ្នកមិនអាចចុច `Ctrl+Z` បានទេ។ ប៉ុន្តែបើសិនជាអ្នកចង់៖\n១. ចូលទៅកាន់ម៉ឺនុយ **File**។\n២. គូសធីកយកពាក្យ **'Save History With Document'**។\n៣. ឥឡូវអ្នកអាច Save រួចបិទកម្មវិធី។\n៤. ស្អែកឡើង ពេលអ្នកបើក File នេះវិញ សូមចូលទៅកាន់ផ្ទាំង **History Panel** នោះអ្នកនឹងឃើញសកម្មភាពរាប់រយដែលអ្នកបានធ្វើកាលពីម្សិលមិញ អ្នកអាចចុចថយក្រោយ (Undo) បានទាំងអស់!\n⚠️ **បំរាម:** ការធ្វើបែបនេះនឹងធ្វើឱ្យ File `.afphoto` ឬ `.afdesign` របស់អ្នកមានទំហំធំខ្លាំង (ឡើងដល់រាប់ GB) ព្រោះវាត្រូវទន្ទេញរាល់សកម្មភាពទាំងអស់។",
        answer_en: "**This is one of Affinity's most powerful, industry-leading features: The ability to Time-Travel (Undo) even after closing the software and rebooting your computer!**\n\nTraditionally, once you close a Photoshop document, your Undo history is permanently erased. In Affinity:\n1. Navigate to the top **File** menu.\n2. Check the option: **'Save History With Document'**.\n3. Save your `.afphoto` or `.afdesign` file and close the app.\n4. Tomorrow, when you reopen the file, open the **History Panel**. Every single brush stroke, layer edit, and color change you made yesterday is completely preserved! You can literally scrub backward in time and Undo anything!\n⚠️ **Critical Warning:** Storing mathematical history exponentially bloats your file size. A 50MB project can easily swell into a 2GB file if it memorizes thousands of complex brush strokes. Only use this for critical client projects!",
        chips: ["Assets Panel (ឃ្លាំងផ្ទុករូប)", "Macros (កត់ត្រាសកម្មភាព)"],
        chips_en: ["Affinity Assets Panel", "Macros & Batch Processing"]
    },
    {
        primaryKeys: ['Zoom & Pan (រំកិល និងពង្រីក)', 'Zooming and Panning smoothly'],
        keys: ['zoom', 'pan', 'ពង្រីក', 'រំកិល', 'scroll', 'alt scroll', 'spacebar'],
        regex: ['\\bzoom\\b', '\\bpan\\b', 'ពង្រីក'],
        answer: "បាទ **សម្រាប់អ្នកប្រើប្រាស់ PC ការបញ្ជាលើការ Zoom និងរំកិល (Pan) អេក្រង់បានលឿន គឺជួយសន្សំពេលបាន ៥០%!**\n\n- **Zoom (ពង្រីក/បង្រួម):** កុំចុចរកឧបករណ៍ Zoom (Z) នាំខាតពេល! សូមសង្កត់ប៊ូតុង **`Alt`** ឱ្យជាប់ ហើយរមៀលកង់កណ្តុរ (Scroll Wheel) ឡើងលើចុះក្រោម ដើម្បី Zoom យ៉ាងរលោងទៅកាន់ចំណុចដែលកណ្តុរអ្នកកំពុងចង្អុល។\n- **Pan (រំកិលប្លង់):** សង្កត់ប៊ូតុង **`Spacebar`** ឱ្យជាប់ (កណ្តុរនឹងប្រែជារូបបាតដៃ ✋) រួចចុចអូសកណ្តុរដើម្បីទាញរំកិលក្រដាសការងាររបស់អ្នក។\n- **មើលពេញអេក្រង់ (Fit to Screen):** គ្រាន់តែចុច **`Ctrl + 0`** រូបភាពទាំងមូលនឹងលោតមកនៅកណ្តាលអេក្រង់យ៉ាងស្អាត។ (ចុច `Ctrl + 1` ដើម្បីមើលទំហំ 100%)។",
        answer_en: "**For PC users, mastering the fluid navigation shortcuts is mandatory. It will literally cut your UI friction in half!**\n\n- **Fluid Zooming:** Never manually switch to the Magnifying Glass tool (`Z`)! Instead, simply hold the **`Alt`** key and roll your Mouse Scroll Wheel up or down. The engine will smoothly, infinitely zoom exactly where your cursor is pointing.\n- **Fluid Panning:** Hold the **`Spacebar`** key continuously. Your cursor instantly temporarily turns into the Hand Tool ✋. Click and drag your mouse to physically slide your canvas around. Release `Spacebar` to instantly return to your previous tool.\n- **Instant Reset:** Press **`Ctrl + 0`** (Zero) to instantly snap the entire document into the center of your screen perfectly (Fit to Screen). Press **`Ctrl + 1`** to snap exactly to 100% pixel-perfect resolution.",
        chips: ["Reset Studio (បាត់ឧបករណ៍)", "Grid Systems & Column Guides"],
        chips_en: ["Resetting the Workspace", "Grid Systems & Column Guides"]
    },

    // ------------------------------------------
    // ASSETS, STOCK & AUTOMATION
    // ------------------------------------------
    {
        primaryKeys: ['Assets Panel (ឃ្លាំងផ្ទុករូប)', 'Affinity Assets Panel', 'Store Logos'],
        keys: ['asset', 'assets panel', 'ឃ្លាំងរូប', 'ផ្ទុករូប', 'save logo', 'reusable component'],
        regex: ['\\bassets panel\\b', '\\basset\\b', 'ឃ្លាំងរូប'],
        answer: "បាទ **Assets Panel គឺជាឃ្លាំងផ្ទុកទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នក សម្រាប់រក្សាទុក Logo, Icon, ឬ ទម្រង់ដែលប្រើញឹកញាប់!**\n\nជំនួសឱ្យការបើក File ចាស់ៗដើម្បី Copy ឡូហ្គោ អ្នកអាច៖\n១. បើក **Assets Panel** (Window > Assets)។\n២. បង្កើត Category ថ្មីមួយ (ឧទាហរណ៍៖ 'ឡូហ្គោក្រុមហ៊ុនខ្ញុំ')។\n៣. ទាញ (Drag) ឡូហ្គោ ឬ Icon ពីផ្ទាំងគំនូររបស់អ្នក ទម្លាក់ចូលទៅក្នុង Assets Panel នេះ។\n\n🪄 **អត្ថប្រយោជន៍:** រាល់ពេលដែលអ្នកបង្កើត File ថ្មី ឡូហ្គោទាំងនោះនឹងនៅចាំក្នុងកម្មវិធីជានិច្ច។ អ្នកគ្រាន់តែទាញវាពី Assets Panel ទម្លាក់ចូល File ថ្មីជាការស្រេច! វាជួយសន្សំពេលបានយ៉ាងច្រើនសម្រាប់ការធ្វើ UI ឬ Layout ឯកសារ។",
        answer_en: "**The Assets Panel is your global, cross-document repository for reusable UI components, brand logos, and vector illustrations!**\n\nInstead of digging through folders to open old files just to copy and paste a brand logo:\n1. Open the **Assets Panel** (Window > Assets).\n2. Create a custom Category and Sub-category (e.g., 'Brand Guidelines 2026' > 'Icons').\n3. Simply drag any vector group, image, or text block straight from your canvas directly into the panel.\n\n🪄 **The Superpower:** Assets are permanently saved at the application level, completely independent of the document. Whenever you start a brand new project, all your saved UI buttons, social media icons, and client logos are instantly available to drag-and-drop into the new canvas!",
        chips: ["Stock Panel (ទាញរូបភាពព្រី)", "Macros (កត់ត្រាសកម្មភាព)"],
        chips_en: ["Stock Panel (Free Images)", "Macros & Batch Processing"]
    },
    {
        primaryKeys: ['Stock Panel (ទាញរូបភាពព្រី)', 'Stock Panel (Free Images)'],
        keys: ['stock', 'unsplash', 'pexels', 'pixabay', 'ទាញរូបព្រី', 'រូបភាព', 'free image'],
        regex: ['\\bstock panel\\b', 'unsplash', 'pexels', 'ទាញរូប'],
        answer: "បាទ **Stock Panel គឺជាកន្លែងដែលអ្នកអាចស្វែងរក និងទាញយករូបភាពគុណភាពខ្ពស់ដោយឥតគិតថ្លៃ ដោយមិនបាច់បើក Browser!**\n\nនៅក្នុងកម្មវិធី Affinity (ទាំង Designer, Photo, និង Publisher) អ្នកអាច៖\n១. បើក **Stock Panel** (Window > Stock)។\n២. ជ្រើសរើសប្រភព (Unsplash, Pexels, ឬ Pixabay)។\n៣. វាយពាក្យគន្លឹះស្វែងរក (ឧទាហរណ៍៖ 'Business Meeting' ឬ 'Nature')។\n៤. ទាញរូបភាពដែលអ្នកពេញចិត្ត ទម្លាក់ចូលផ្ទាំងការងាររបស់អ្នកផ្ទាល់តែម្តង!\n\n💡 នេះជួយសន្សំពេលវេលាយ៉ាងច្រើនក្នុងការរកមើលរូបភាពមកធ្វើជា Background ឬ Mockup សម្រាប់ Layout របស់អ្នក។",
        answer_en: "**The Stock Panel integrates the world's largest royalty-free photography databases directly into your Affinity UI workspace!**\n\nInstead of breaking your workflow to open a web browser and download files manually:\n1. Open the **Stock Panel** (Window > Stock).\n2. Choose your preferred integrated database (Unsplash, Pexels, or Pixabay).\n3. Search for a keyword (e.g., 'Cyberpunk City' or 'Minimalist Desk').\n4. Simply drag the high-resolution image thumbnail directly from the panel onto your active canvas!\n\n💡 This massively accelerates the conceptual phase of design, allowing you to instantly prototype layouts with high-quality placeholder photography without managing downloaded files on your hard drive.",
        chips: ["Assets Panel (ឃ្លាំងផ្ទុករូប)", "Export Persona (កាត់រូបរហ័ស)"],
        chips_en: ["Affinity Assets Panel", "Export Persona Mastery"]
    },
    {
        primaryKeys: ['Export Persona (កាត់រូបរហ័ស)', 'Export Persona Mastery', 'Slices'],
        keys: ['export persona', 'slice tool', 'export', 'save', 'កាត់រូប', 'export ui', 'continuous export'],
        regex: ['\\bexport persona\\b', '\\bslice\\b', 'continuous export'],
        answer: "បាទ **Export Persona គឺជាបន្ទប់ប្រតិបត្តិការសម្រាប់ការនាំចេញរូបភាព (Export) ក្នុងទ្រង់ទ្រាយធំ ដ៏មានប្រសិទ្ធភាពបំផុត!**\n\nវាមានប្រយោជន៍ខ្លាំងណាស់សម្រាប់អ្នកធ្វើ UI/UX ឬអ្នកដែលគូរ Icon ច្រើនៗក្នុង File តែមួយ៖\n- **Slice Tool:** អ្នកអាចប្រើកាំបិតនេះដើម្បីគូសស៊ុមជុំវិញ Icon នីមួយៗ។ ស៊ុមនិមួយៗតំណាងឱ្យរូបភាព ១ សន្លឹក។\n- **Layer Slices:** ឬគ្រាន់តែចូលទៅ Slices Panel រួចចុចបង្កើត Slice ពី Layer ណាមួយដោយស្វ័យប្រវត្តិ។\n- **Multi-Format Export:** អ្នកអាចកំណត់ឱ្យ Slice មួយ Save ចេញជា ៣ ប្រភេទក្នុងពេលតែមួយ (ឧ. PNG ធម្មតា, PNG ទំហំ 2x, និង SVG) ដោយគ្រាន់តែចុចប៊ូតុង Export តែម្តងគត់!\n- **Continuous Export:** បើកមុខងារនេះរាល់ពេលអ្នកកែពណ៌ Icon ក្នុងកម្មវិធី វានឹងលួច Save File ថ្មីទៅក្នុង Folder របស់អ្នកដោយស្វ័យប្រវត្តិ (អាប់ដេតភ្លាមៗ)!",
        answer_en: "**The Export Persona is an industrial-grade batch rendering engine designed specifically for UI/UX designers, game developers, and web asset creators!**\n\nInstead of exporting an entire canvas or manually saving 50 individual icons:\n- **Slices Tool:** Draw manual geometric bounding boxes around specific zones of your artwork. Each Slice acts as an independent export file.\n- **Layer Slices:** In the Slices panel, automatically generate a perfectly fitted Slice from any specific vector group or layer with one click.\n- **Multi-Resolution Rendering:** You can instruct a single Slice to simultaneously output a standard 1x PNG, a high-res 2x PNG for Retina displays, and a scalable SVG vector—all triggered by a single batch export click.\n- **Continuous Export:** An incredible automated workflow. Once configured, anytime you change the color or shape of an icon on the canvas, Affinity silently overwrites the exported PNG file on your hard drive in real-time in the background!",
        chips: ["Master Pages និង Artboards", "Macros (កត់ត្រាសកម្មភាព)"],
        chips_en: ["Master Pages vs Artboards", "Macros & Batch Processing"]
    },
    {
        primaryKeys: ['Macros (កត់ត្រាសកម្មភាព)', 'Macros & Batch Processing', 'Automate Affinity'],
        keys: ['macro', 'batch', 'record', 'កត់ត្រា', 'ធ្វើស្វ័យប្រវត្តិ', 'auto edit'],
        regex: ['\\bmacro\\b', '\\bbatch job\\b', 'កត់ត្រា'],
        answer: "បាទ **Macros នៅក្នុង Affinity Photo V3 គឺជាម៉ាស៊ីនថតចម្លងសកម្មភាព ដើម្បីធ្វើឱ្យការងារកាត់តដដែលៗក្លាយជាស្វ័យប្រវត្តិ!**\n\nប្រសិនបើអ្នកតែងតែមានទម្លាប់៖ បើករូបភាព > តម្លើងពន្លឺ 10% > បន្ថែម Gaussian Blur 2px > រួច Save។ អ្នកមិនបាច់ធ្វើវាដោយដៃរាល់ដងទេ៖\n១. បើកផ្ទាំង **Macro Panel** រួចចុចប៊ូតុង **Record (ថត)**។\n២. ធ្វើសកម្មភាពកែរូបទាំងនោះម្តង។\n៣. ចុចប៊ូតុង **Stop (ឈប់)**។ ឥឡូវកម្មវិធីបានចងចាំសកម្មភាពនេះហើយ។\n៤. ចុច **Add to Library** ដើម្បីរក្សាទុកក្បួននេះ។\n\n💡 **Batch Processing:** អ្នកអាចប្រើម៉ឺនុយ File > `New Batch Job` រួចរើសរូបភាព ១០០សន្លឹក ហើយប្រាប់កម្មវិធីឱ្យដំណើរការ Macro ដែលអ្នកទើបបង្កើតអម្បាញ់មិញនេះ។ កម្មវិធីនឹងកែរូបទាំង ១០០សន្លឹកដោយខ្លួនឯងក្នុងពេលតែប៉ុន្មានវិនាទី!",
        answer_en: "**Macros in Affinity Photo V3 serve as an automated action recorder, designed to completely eliminate repetitive manual workflows!**\n\nIf you constantly perform the exact same 5-step process (e.g., Increase Contrast > Apply Unsharp Mask > Convert to CMYK > Resize to 1080px):\n1. Open the **Macro Panel** and hit the **Record** button.\n2. Execute your entire workflow sequentially once.\n3. Hit **Stop**. Affinity has now mathematically logged every parameter change.\n4. Click **Add to Library** to permanently save this exact operational sequence.\n\n💡 **Batch Processing:** The true power of Macros is deployed via File > `New Batch Job`. You can point Affinity to a folder containing 500 raw photographs, select your saved Macro, and let the software automatically process, resize, and export all 500 images while you go get a coffee!",
        chips: ["Export Persona (កាត់រូបរហ័ស)", "Assets Panel (ឃ្លាំងផ្ទុករូប)"],
        chips_en: ["Export Persona Mastery", "Affinity Assets Panel"]
    }
];
