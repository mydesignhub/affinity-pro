export const editingData = [
    // 1. PHOTOMANIPULATION & BLENDING
    {
        primaryKeys: ['កាត់តរូបភាព', 'photomanipulation'],
        keys: ['កាត់តរូប', 'តរូប', 'blend image', 'match color', 'shadow', 'កាត់ត'],
        regex: ['photomanipulation', 'កាត់តរូប', 'តរូប', 'blend image', 'match color'],
        answer: "បាទ អាថ៌កំបាំងនៃការកាត់តរូប (Photomanipulation) ឱ្យមើលទៅពិតៗ ស៊ីសាច់តែមួយ គឺត្រូវយកចិត្តទុកដាក់លើ ៣ចំណុចនេះ៖\n\n១. **ពន្លឺ (Matching Light):** ពន្លឺត្រូវតែមកពីទិសដៅតែមួយ។ បើ Background ពន្លឺមកពីឆ្វេង រូបមនុស្សក៏ត្រូវមានពន្លឺពីឆ្វេងដែរ។\n២. **ស្រមោល (Contact Shadow):** កន្លែងដែលជើង ឬវត្ថុប៉ះផ្ទាល់ជាមួយដី ស្រមោលត្រូវតែដិតខ្លាំង (Darkest) រួចទើបព្រិលទៅចុង។\n៣. **ពណ៌ (Color Grading):** ប្រើ Color Balance ឬ Gradient Map ដើម្បីចាក់ពណ៌ស្តើងៗពីលើរូបទាំងអស់ ឱ្យវាមើលទៅស្ថិតក្នុងបរិយាកាសតែមួយពិតៗ។\n\n💡 **គន្លឹះអាជីព៖** ត្រូវប្រាកដថា Resolution នៃរូបតួអង្គ និងផ្ទៃខាងក្រោយមានភាពស្រដៀងគ្នា ដើម្បីកុំឱ្យមើលទៅក្លែងក្លាយ។",
        answer_en: "The absolute secret to seamless, realistic Photomanipulation lies in these 3 steps:\n\n1. **Matching Light Source:** The lighting must make sense. If the background sun is on the left, your subject must have highlights on their left side.\n2. **Contact Shadows:** The tiny area where an object physically touches the ground must be extremely dark, fading out softly.\n3. **Global Color Grading:** Use a Gradient Map or Color Balance layer over the *entire* artwork to unify the tones and make it feel like one single environment.\n\n💡 **Pro Tip:** Ensure the resolution and pixel sharpness of your subject matches the background closely, otherwise it will instantly look like a fake cutout.",
        chips: ["រលាយវត្ថុនិង Background បញ្ចូលគ្នា 🌪️", "របៀបបង្កើតស្រមោលឱ្យពិតៗ 👥"],
        chips_en: ["How to seamlessly blend subjects 🌪️", "Mastering realistic shadows 👥"]
    },
    {
        primaryKeys: ['រលាយវត្ថុនិង Background បញ្ចូលគ្នា', 'how to blend subjects'],
        keys: ['រលាយ', 'blend', 'ស៊ីគ្នា', 'ស៊ីសាច់', 'blend subject', 'match subject'],
        regex: ['រលាយ', 'blend', 'ស៊ីគ្នា', 'ស៊ីសាច់', 'blend subject', 'match subject'],
        answer: "បាទ **វិធីធ្វើឱ្យរូបកាត់ត (Subject) រលាយចូល Background ១០០%៖**\n\n១. **Match Luminosity (កម្រិតពន្លឺ):** ប្រើកែវយឹត (Levels) ធានាថាចំណុចខ្មៅបំផុតនៃវត្ថុ គឺមានពណ៌ខ្មៅស្មើនឹងចំណុចខ្មៅបំផុតនៃ Background។ (បើតួអង្គខ្មៅដិតពេក តែ Background ស្រអាប់ វានឹងមើលទៅអណ្តែតមិនចូលគ្នាទេ)។\n២. **Match Color (កម្រិតពណ៌):** ប្រើ Color Balance ដើម្បីរុញពណ៌តួអង្គឱ្យស្របទៅតាមពណ៌បរិយាកាស (ឧ. បើកាត់តចូលព្រៃ ត្រូវថែមពណ៌បៃតង/លឿងលើតួអង្គបន្តិច)។\n៣. **Atmospheric Wrap (រុំបរិយាកាស):** បង្កើត Layer ថ្មីមួយ បូមពណ៌ពី Background មកផាត់ស្តើងៗ (Opacity 10%) ជុំវិញគែមតួអង្គ។ វាបង្កើតជាពន្លឺចាំងផ្លាត (Light Wrap) ធ្វើឱ្យរូបមើលទៅស៊ីសាច់តែមួយ!",
        answer_en: "**The Masterclass workflow for seamlessly blending a cut-out subject into a new background:**\n\n1. **Match Luminosity:** Use a Levels adjustment to ensure the darkest black point on your subject perfectly matches the darkest black point on the background. (If your subject is pure black but the background is faded grey, it will look like a fake sticker).\n2. **Match Color Tone:** Use Color Balance to inject ambient color into the subject. (If placing them in a forest, add slight greens and yellows to their midtones).\n3. **Atmospheric Light Wrap:** Create a new layer above the subject. Sample a bright color from the background and softly paint it over the subject's edges at 10% opacity. This mimics real-world light wrapping around the object!",
        chips: ["របៀបប្តូរថ្ងៃទៅយប់ (Day to Night) 🌙", "ការធ្វើឱ្យរូបស្លេកៗ (Fading) 🌫️"],
        chips_en: ["How to turn Day into Night? 🌙", "How to fade images properly 🌫️"]
    },
    {
        primaryKeys: ['ការធ្វើឱ្យរូបស្លេកៗ (Fading)', 'how to fade images properly'],
        keys: ['ស្លេក', 'រូបស្លេកៗ', 'fade image', 'opacity fade', 'ធ្វើឱ្យស្លេក'],
        regex: ['ស្លេក', 'រូបស្លេកៗ', 'fade', 'opacity fade'],
        answer: "បាទ **បច្ចេកទេសធ្វើឱ្យរូបភាពមានសភាពស្លេកចូលគ្នា (Fading / Blending Edges)៖**\n\nដើម្បីធ្វើឱ្យ **រូបស្លេកៗ** រលាយចូលទៅក្នុងផ្ទៃខាងក្រោយ ឬពណ៌ណាមួយ អ្នកមិនគួរប្រើជ័រលុប (Eraser Tool) ទេ! ត្រូវអនុវត្តតាមក្បួននេះ៖\n\n១. **ប្រើ Layer Mask:** បង្កើត Mask នៅលើរូបភាពរបស់អ្នក។\n២. **ប្រើ Gradient Tool (G):** ជ្រើសរើសពណ៌ខ្មៅ និងស រួចអូសទាញលើ Mask ចាប់ពីគែមរូបភាពចូលមកក្នុង។ កន្លែងពណ៌ខ្មៅនឹងលាក់រូបភាព ធ្វើឱ្យវាក្លាយជា **រូបស្លេកៗ** បន្តិចម្តងៗយ៉ាងទន់ភ្លន់ និងប្រណីតបំផុត (Non-destructive)។\n\n💡 **គន្លឹះអាជីព៖** ការប្រើបច្ចេកទេសរូបស្លេកៗនេះ ល្អបំផុតសម្រាប់ការរចនា Poster ដែលបញ្ចូលរូបភាពមនុស្សទៅក្នុងផ្ទៃមេឃ ឬទេសភាពធំៗ។",
        answer_en: "**The professional technique for fading images (Blending Edges):**\n\nTo make an image progressively fade into a background or solid color, you should NEVER use the standard Eraser Tool! Follow this workflow:\n\n1. **Use a Layer Mask:** Apply a mask to your image layer.\n2. **Use the Gradient Tool (G):** Choose a Black-to-White gradient and drag it across the mask from the edge inwards. The black areas will hide the pixels, creating a buttery-smooth, fainted/faded transition that is completely non-destructive.\n\n💡 **Pro Tip:** This fading technique is essential for movie posters when blending a giant portrait into a landscape or sky.",
        chips: ["តើ Masking ជាអ្វី?", "របៀបបង្កើតស្រមោលឱ្យពិតៗ 👥"],
        chips_en: ["What is Masking?", "Mastering realistic shadows 👥"]
    },
    {
        primaryKeys: ['របៀបប្តូរថ្ងៃទៅយប់ (Day to Night)', 'day to night editing'],
        keys: ['ថ្ងៃទៅយប់', 'យប់', 'day to night', 'turn to night', 'ធ្វើឱ្យយប់'],
        regex: ['ថ្ងៃទៅយប់', 'យប់', 'day to night', 'turn to night'],
        answer: "បាទ **ការកាត់តរូបភាពពីថ្ងៃ ទៅយប់ (Day to Night) ទាមទារក្បួន៣ជំហាន៖**\n\n១. **បន្ថយពន្លឺ និងផ្លាស់ប្តូរពណ៌ខៀវ (Cooling):** ប្រើ Color Lookup (LUTs) យក 'Moonlight' ឬ 'NightFromDay' រួចប្រើ Curves ទាញបន្ថយ Midtones ឱ្យងងឹត។ ពេលយប់ ពន្លឺព្រះច័ន្ទផ្តល់ពណ៌ខៀវ(Cyan/Blue) ទៅលើបរិយាកាសទាំងមូល។\n២. **លុបស្រមោលថ្ងៃត្រង់:** បើរូបដើមមានពន្លឺថ្ងៃខ្លាំង អ្នកត្រូវប្រើ Clone Stamp ឬ Healing Brush ដើម្បីលុបស្រមោលស្រួចៗចោល។ ពេលយប់ ស្រមោលជាទូទៅព្រិលខ្លាំងណាស់។\n៣. **បន្ថែមភ្លើងសិប្បនិម្មិត (Artificial Lights):** ប្រើ Brush ពណ៌លឿង ឬទឹកក្រូច ផាត់លើបង្អួច ចង្កៀង ឬភ្លើងឡាន។ បន្ទាប់មកប្តូរ Blend Mode ទៅជា **Screen** ឬ **Linear Dodge (Add)** រួចប្រើ Layer Style 'Outer Glow' ដើម្បីឱ្យភ្លើងជះពន្លឺពិតៗ។",
        answer_en: "**The Day-to-Night Photomanipulation Workflow:**\n\n1. **Darken and Cool (Color Grading):** Use a Color Lookup (LUT) like 'Moonlight' or 'NightFromDay', and pull down the Midtones using a Curves adjustment. Nighttime naturally bathes everything in a cool Cyan/Blue ambient light.\n2. **Kill Harsh Shadows:** If your daytime photo has harsh, sharp shadows from the sun, you must soften or remove them using the Clone Stamp. Night scenes generally have very soft, diffuse shadows.\n3. **Add Artificial Lighting:** Paint bright yellow/orange onto streetlamps or windows. Change the Blend Mode to **Screen** or **Linear Dodge (Add)**, and apply an 'Outer Glow' Layer Style to make the light realistically bleed into the dark atmosphere.",
        chips: ["តើ Blend Modes ដំណើរការយ៉ាងម៉េច?", "របៀបបង្កើតស្រមោលឱ្យពិតៗ 👥"],
        chips_en: ["How do Blend Modes work?", "Mastering realistic shadows 👥"]
    },
    {
        primaryKeys: ['របៀបបង្កើតស្រមោលឱ្យពិតៗ', 'mastering shadows'],
        keys: ['ស្រមោល', 'shadow', 'cast shadow', 'drop shadow', 'contact shadow', 'បង្កើតស្រមោល'],
        regex: ['ស្រមោល', 'shadow', 'cast shadow', 'drop shadow', 'contact shadow'],
        answer: "បាទ **អាថ៌កំបាំងនៃការបង្កើតស្រមោល (Mastering Shadows) កុំប្រើតែ Drop Shadow មួយជាន់!**\n\nស្រមោលពិតប្រាកដមាន ២ ផ្នែក៖\n១. **Contact Shadow (ស្រមោលប៉ះ):** គឺជាបន្ទាត់ស្តើងៗ ពណ៌ងងឹតខ្លាំង និងមុតស្រួចបំផុត ដែលស្ថិតនៅចំពីក្រោមបាតជើង ឬកង់ឡានដែលប៉ះផ្ទាល់នឹងដី។\n២. **Cast Shadow (ស្រមោលលាត):** គឺជាស្រមោលដែលលាតសន្ធឹងតាមទិសដៅពន្លឺជះ។ **ច្បាប់រូបវិទ្យា៖** ស្រមោលកាន់តែនៅឆ្ងាយពីវត្ថុ វាត្រូវតែកាន់តែព្រិល (Blur) និងកាន់តែថ្លា (Lower Opacity)។\n\n💡 **គន្លឹះមាស៖** កុំប្រើពណ៌ខ្មៅ (Pure Black) ធ្វើស្រមោល! ត្រូវបឺតយកពណ៌ងងឹតបំផុតពី Background (ឧ. ដីពណ៌ត្នោត ត្រូវយកពណ៌ត្នោតក្រាស់) រួចប្តូរ Blend Mode ទៅជា **Multiply**។",
        answer_en: "**The secret to Mastering Shadows: Never just use a single Drop Shadow!**\n\nRealistic shadows are made of 2 parts:\n1. **Contact Shadow:** A very thin, incredibly dark, and razor-sharp shadow exactly where the object physically touches the ground (under the shoes/tires).\n2. **Cast Shadow:** The longer shadow stretched out by the light source. **Physics Rule:** The further the shadow gets from the object, the blurrier it gets (Gaussian Blur) and the more transparent it becomes (Fade Opacity).\n\n💡 **Golden Tip:** NEVER use Pure Black for shadows! Sample the darkest color from the floor (e.g., dark brown dirt) and set the shadow layer's Blend Mode to **Multiply**.",
        chips: ["តើ Dodge និង Burn គឺជាអ្វី?", "រលាយវត្ថុនិង Background បញ្ចូលគ្នា 🌪️"],
        chips_en: ["What is Dodge and Burn?", "How to seamlessly blend subjects 🌪️"]
    },
    {
        primaryKeys: ['របៀបកាត់សក់ឬ Background ឱ្យស្អាត', 'precise background removal'],
        keys: ['កាត់ background', 'remove bg', 'លុបផ្ទៃខាងក្រោយ', 'refine edge', 'កាត់សក់', 'cut out'],
        regex: ['កាត់.*background', 'remove bg', 'លុបផ្ទៃខាងក្រោយ', 'refine edge', 'កាត់សក់', 'cut out'],
        answer: "បាទ **ការកាត់ Background ត្រូវប្រើឧបករណ៍ទៅតាមប្រភេទវត្ថុ៖**\n\n១. **វត្ថុមានគែមរឹង (Hard Edges):** ដូចជា ឡាន ទូរស័ព្ទ កែវ។ អ្នក **ត្រូវតែប្រើ Pen Tool** ដើម្បីគូសតាមគែមវា។ ការប្រើឧបករណ៍ស្វ័យប្រវត្តិនឹងធ្វើឱ្យគែមវាមើលទៅមិនស្មើគ្នា ឬឆែបៗ។\n២. **សក់ មែកឈើ ឬរោមសត្វ (Soft/Complex Edges):** ប្រើ Selection Brush Tool ជ្រើសរើសរូបជាមុន រួចចុចប៊ូតុង **Refine Edge**។ យកជក់ផាត់តាមគែមសក់ កម្មវិធីនឹងគណនាបំបែកសរសៃសក់ចេញពីផ្ទៃខាងក្រោយយ៉ាងឆ្លាតវៃ។\n\n💡 **គន្លឹះអាជីព៖** តែងតែ Output ឯកសារដែលកាត់រួចជា 'Layer Mask' ជានិច្ច ជៀសវាងការលុបសាច់រូបចោល (Destructive) ទើបយើងអាចកែសម្រួលគែមសក់ពេលក្រោយបាន។",
        answer_en: "**Precise Background Removal depends entirely on what you are cutting out:**\n\n1. **Hard Edges (Cars, Phones, Buildings):** You **must use the Pen Tool** to create a sharp Vector Clipping Path. Magic selection tools will leave jagged, amateur edges on hard products.\n2. **Soft/Complex Edges (Hair, Fur, Trees):** Use the Selection Brush to get the main body, then click **Refine Edge**. Paint over the flyaway hairs, and the software will mathematically separate the tiny hair strands from the background.\n\n💡 **Pro Tip:** Always Output your selection as a 'Layer Mask'. This is non-destructive, meaning if the AI cut off part of an ear, you can easily paint it back later using white on the mask.",
        chips: ["តើ Pen Tool ប្រើធ្វើអ្វី?", "តើ Masking ជាអ្វី?"],
        chips_en: ["How to use the Pen Tool?", "What is Masking?"]
    },
    {
        primaryKeys: ['ប្តូរវត្ថុទៅជាមាស', 'turn anything into gold effect'],
        keys: ['មាស', 'ប្រាក់', 'gold', 'silver', 'metallic', 'មាសប្រាក់', 'ធ្វើឱ្យឡើងមាស'],
        regex: ['មាស', 'ប្រាក់', 'gold', 'silver', 'metallic'],
        answer: "បាទ **របៀបប្តូរវត្ថុណាមួយ (រូបចម្លាក់ ឡាន ឬសម្លៀកបំពាក់) ទៅជាមាស (Gold) ឬប្រាក់ (Silver)៖**\n\nលោហៈធាតុមានលក្ខណៈពិសេសគឺវាមានចំណាំងផ្លាតពន្លឺដិតខ្លាំង (High Contrast)។\n១. **Desaturate:** លុបពណ៌ដើមរបស់វត្ថុនោះចោលឱ្យទៅជាសខ្មៅ (Black & White)។\n២. **High Contrast Curves:** ប្រើ Curves ទាញរាងអក្សរ S ឱ្យកោងខ្លាំងមែនទែន ដើម្បីឱ្យចំណុចស កាន់តែសក្បុស និងចំណុចខ្មៅ កាន់តែងងឹត (នេះជាអ្វីដែលបង្កើតភាពរលោងរបស់លោហៈ)។\n៣. **Gradient Map:** \n   - **សម្រាប់ពណ៌មាស (Gold):** ចាក់ Gradient Map ពីឆ្វេងទៅស្តាំ៖ `ពណ៌ត្នោតចាស់ -> ពណ៌ទឹកក្រូច -> ពណ៌លឿង -> ពណ៌ស`។\n   - **សម្រាប់ពណ៌ប្រាក់ (Silver):** ចាក់ Gradient Map ពីឆ្វេងទៅស្តាំ៖ `ពណ៌ប្រផេះចាស់ -> ពណ៌ប្រផេះស្រាល -> ពណ៌ស`។",
        answer_en: "**The professional workflow to turn any object (statues, cars, clothing) into realistic Gold or Silver:**\n\nMetallic surfaces are defined by their extreme, sharp contrast and reflections.\n1. **Desaturate:** Remove all original color to make the object pure Black & White.\n2. **High Contrast Curves:** Apply a severe 'S-Curve' adjustment. You want the bright highlights to clip to pure white, and the shadows to crush to deep black. This simulates a shiny, highly reflective metallic surface.\n3. **Gradient Map:** Apply a Gradient Map layer.\n   - **For Gold:** Map the gradient colors from `Dark Brown -> Orange -> Yellow -> Pure White`.\n   - **For Silver:** Map the gradient colors from `Dark Slate Grey -> Light Grey -> Pure White`.",
        chips: ["តើ Blend Modes ដំណើរការយ៉ាងម៉េច?", "របៀបបង្កើត Text Effects ស្អាតៗ ✨"],
        chips_en: ["How do Blend Modes work?", "How to create premium Text Effects ✨"]
    },

    // 2. COLOR GRADING (Graphic Design Focus)
    { 
        primaryKeys: ['របៀបកែពន្លឺ ក្នុង Affinity', 'how to edit light in affinity'],
        keys: ['edit light', 'កែពន្លឺ', 'brightness', 'exposure', 'លេងពន្លឺ'],
        regex: ['edit light', 'កែពន្លឺ', 'brightness', 'exposure', 'លេងពន្លឺ'],
        answer: "បាទ **ការកែពន្លឺ (Exposure/Lighting) គឺជាជំហានដំបូងបំផុតមុននឹងលេងពណ៌!**\n\n១. **Curves:** ប្រើខ្សែកោង Curves ដើម្បីទាញ Highlight (ពន្លឺខ្លាំង) ឡើងលើបន្តិច និងទាញ Shadows (ស្រមោល) ចុះក្រោមបន្តិច ដើម្បីបង្កើត S-Curve ដែលផ្តល់នូវ Contrast យ៉ាងស្រស់ស្អាត។\n២. **Shadows & Highlights:** បើរូបថតងងឹតមុខតួអង្គ សូមទាញ Shadows ឡើងបន្តិច។ បើមេឃសក្បុសពេក សូមទាញ Highlights ចុះ។", 
        answer_en: "**Correcting lighting is always the very first step before you touch any colors!**\n\n1. **Curves Tool:** Pull the top of the curve up slightly for brighter highlights, and pull the bottom down slightly for darker shadows. This creates the legendary 'S-Curve' for instant professional contrast.\n2. **Shadows & Highlights:** If your subject's face is dark, boost the 'Shadows' slider. If the sky is blown out, lower the 'Highlights' slider.",
        chips: ["ពណ៌ Cinematic", "កាត់តរូបភាព (Photomanipulation)"],
        chips_en: ["Cinematic Color", "Photomanipulation techniques"]
    },
    { 
        primaryKeys: ['ពណ៌ Cinematic', 'cinematic color'],
        keys: ['cinematic', 'teal and orange', 'ពណ៌កុន', 'color grading'],
        regex: ['cinematic', 'teal and orange', 'ពណ៌កុន', 'color grading'],
        answer: "បាទ **ពណ៌បែប Cinematic (ពណ៌រោងកុន) ភាគច្រើនប្រើក្បួន Teal & Orange!**\n\nហេតុអ្វី? ព្រោះស្បែកមនុស្សយើងស្ថិតនៅក្នុងតំបន់ពណ៌ទឹកក្រូច (Orange) ចំណែកឯពណ៌ផ្ទុយរបស់វាគឺពណ៌ខៀវបៃតង (Teal)។ ពេលអ្នកដាក់ពណ៌ Teal ទៅក្នុងផ្ទៃខាងក្រោយ (Background/Shadows) វាធ្វើឱ្យតួអង្គលេចធ្លោខ្លាំង និងផ្តល់អារម្មណ៍ដូចកំពុងមើលកុនហូលីវូដ។\n\n💡 **របៀបធ្វើ៖** ប្រើ Color Balance រួចរុញ Shadows ទៅរកពណ៌ខៀវ (Blue/Cyan) និងរុញ Highlights ទៅរកពណ៌លឿងទឹកក្រូច។", 
        answer_en: "**The classic 'Cinematic Look' relies heavily on the Teal & Orange color harmony!**\n\nWhy? Because human skin tones naturally fall into the Orange spectrum. Its exact opposite on the color wheel is Teal/Cyan. Pushing Teal into the shadows creates massive color contrast that makes the subject pop off the screen like a Hollywood movie.\n\n💡 **How to do it:** Open the Color Balance tool. Push your Shadows toward Cyan/Blue, and your Highlights toward Orange/Yellow.",
        chips: ["តើ Dodge និង Burn គឺជាអ្វី?", "Color Grading (Split Toning)"],
        chips_en: ["What is Dodge and Burn?", "Split Toning Color Grading"]
    },
    {
        primaryKeys: ['Color Grading (Split Toning)', 'split toning color grading'],
        keys: ['color grading', 'split toning', 'លាយពណ៌រូប', 'កែពណ៌'],
        regex: ['color grading', 'split toning', 'កែពណ៌'],
        answer: "បាទ **Color Grading (ឬការដាក់ពណ៌)** គឺជាការបន្ថែមសាច់ពណ៌ (Mood) ទៅឱ្យរូបភាពទាំងមូលបន្ទាប់ពីកែពន្លឺរួច!\n\nនៅក្នុងឧបករណ៍ Color Balance / Split Toning របស់ Affinity អ្នកអាចបញ្ជាពណ៌បាន ៣ កម្រិត៖\n១. **Shadows (ស្រមោល):** ចាក់ពណ៌ចូលទៅក្នុងតំបន់ងងឹត (ឧ. ដាក់ពណ៌ខៀវងងឹត ឱ្យមើលទៅកាច ឬអាថ៌កំបាំង)។\n២. **Midtones (កណ្តាល):** គ្រប់គ្រងពណ៌ស្បែកមនុស្សទូទៅ។\n៣. **Highlights (ពន្លឺ):** ចាក់ពណ៌ចូលទៅតំបន់ភ្លឺ (ឧ. ដាក់ពណ៌លឿងក្តៅ ដើម្បីឱ្យមើលទៅដូចពេលថ្ងៃរះ)។",
        answer_en: "**Color Grading (Split Toning)** is injecting a specific color mood into your image after the basic exposure is fixed!\n\nIn the Color Balance adjustments of Affinity, you can control 3 tonal ranges:\n1. **Shadows:** Injects color into the darkest areas (e.g., adding deep blue for a gritty, mysterious vibe).\n2. **Midtones:** Primarily affects human skin tones.\n3. **Highlights:** Injects color into the brightest areas (e.g., adding warm yellow for a sunrise effect).",
        chips: ["ពណ៌ Cinematic", "របៀបបង្កើតស្រមោលឱ្យពិតៗ 👥"],
        chips_en: ["Cinematic Color", "Mastering realistic shadows 👥"]
    },

    // 3. TROUBLESHOOTING & GENERAL EDITING CONCEPTS
    {
        primaryKeys: ['តើ Dodge និង Burn គឺជាអ្វី?', 'dodge and burn'],
        keys: ['dodge & burn', 'បង្កើតពន្លឺ', 'ធ្វើឱ្យរូបលេច'],
        regex: ['dodge and burn', 'dodge & burn', 'បង្កើតពន្លឺ', 'ធ្វើឱ្យរូបលេច'],
        answer: "បាទ **Dodge & Burn** គឺជាបច្ចេកទេសដ៏មានឥទ្ធិពលបំផុត ដើម្បីជួយឱ្យរូបភាពរាបស្មើ ២D មើលទៅមានជម្រៅ (3D) និងលេចធ្លោជាងមុន។\n\n☀️ **Dodge:** ប្រើសម្រាប់គូរលើកន្លែងដែលត្រូវពន្លឺ (Highlights) ឱ្យវាកាន់តែភ្លឺ។\n🌑 **Burn:** ប្រើសម្រាប់គូរលើកន្លែងស្រមោល (Shadows) ឱ្យវាកាន់តែងងឹត។\n\n💡 **គន្លឹះ Professional៖** កុំប្រើ Tool នេះផ្ទាល់លើរូប! ត្រូវបង្កើត Layer ថ្មីមួយ ចាក់ពណ៌ប្រផេះ 50% (50% Gray) រួចប្តូរ Blend Mode ទៅជា Soft Light ឬ Overlay ទើបគូរលុបងាយស្រួល និងមិនខូចសាច់រូប (Non-destructive)។",
        answer_en: "**Dodge & Burn** is a magical retouching technique used to sculpt light and shadow, giving flat 2D images incredible 3D depth and pop.\n\n☀️ **Dodge:** Lightens the highlights.\n🌑 **Burn:** Darkens the shadows.\n\n💡 **Pro Tip:** Never dodge and burn directly on your photo layer! Create a new layer, fill it with 50% Gray, set the Blend Mode to Soft Light or Overlay, and paint with black/white on that. It's completely non-destructive!",
        chips: ["របៀបបង្កើតស្រមោលឱ្យពិតៗ 👥", "តើ Masking ជាអ្វី?"],
        chips_en: ["Mastering realistic shadows 👥", "What is Masking?"]
    },
    {
        primaryKeys: ['ព្រិល Background', 'depth of field'],
        keys: ['depth of field', 'blur', 'bokeh', 'រូបព្រិលក្រោយ'],
        regex: ['depth of field', 'blur filter', 'bokeh', 'រូបព្រិលក្រោយ', 'ព្រិល background'],
        answer: "បាទ **Depth of Field (ទំហំច្បាស់)** គឺជាបច្ចេកទេសបំបែកវត្ថុគោលចេញពីផ្ទៃខាងក្រោយរញ៉េរញ៉ៃ។\n\nបើអ្នកចង់ឱ្យវត្ថុគោលលេចធ្លោខ្លាំង អ្នកត្រូវធ្វើឱ្យ Background ព្រិល (ហៅថា Blur ឬ Bokeh)។ នៅក្នុងកម្មវិធីរចនា អ្នកអាចប្រើ **Gaussian Blur** ឬ **Lens Blur** រួចលាយជាមួយ Layer Mask ដើម្បីបង្កើតអារម្មណ៍ដូចថតចេញពីកាមេរ៉ា Lens ធំអាជីពពិតៗ។ វាក៏ជួយបង្កើន Visual Hierarchy ផងដែរ!",
        answer_en: "**Depth of Field (DOF)** is a technique used to isolate your main subject from a distracting background.\n\nBy applying a realistic blur (Bokeh) to the background using **Lens Blur** or **Gaussian Blur** combined with a gradient mask, you instantly create a cinematic, professional-camera look. This forces the viewer's eye exactly onto what matters most!",
        chips: ["របៀបបែងចែក Foreground និង Background 🏞️", "អ្វីទៅជា Hierarchy?"],
        chips_en: ["Foreground vs Background Depth 🏞️", "Visual Hierarchy"]
    },
    {
        primaryKeys: ['រូបភាពខ្ញុំព្រិល', 'my image is blurry'],
        keys: ['មិនច្បាស់', 'ព្រិល', 'បែកគ្រាប់', 'pixelated', 'blurry', 'រូបព្រិល', 'រូបមិនច្បាស់'],
        regex: ['blurry', 'មិនច្បាស់', 'បែកគ្រាប់', 'pixelated'],
        answer: "បាទ តោះដោះស្រាយបញ្ហារូបព្រិលនេះ! តើអ្នកកំពុងរៀបចំរូបនេះសម្រាប់ **បោះពុម្ព (Print)** ឬសម្រាប់ផុសលើ **អេក្រង់ (Web/Social)**?",
        answer_en: "Let's fix that blurry image! Are you trying to prepare this image for **Physical Printing** or for a **Digital Screen (Web/Social)**?",
        chips: ["សម្រាប់បោះពុម្ព 🖨️", "សម្រាប់អេក្រង់ 💻"],
        chips_en: ["For Printing 🖨️", "For Screen 💻"]
    },
    {
        primaryKeys: ['សម្រាប់បោះពុម្ព', 'for printing'],
        keys: ['បោះពុម្ព', 'print'],
        regex: ['សម្រាប់បោះពុម្ព', 'print'],
        answer: "បាទ សម្រាប់ការបោះពុម្ព Resolution ត្រូវតែយ៉ាងហោចណាស់ **300 PPI**។ \n\n💡 **បញ្ជាក់៖** បើវានៅតែព្រិល គឺដោយសារ File ដើមតូចពេក។ កុំទាញពង្រីកក្នុងកម្មវិធី ព្រោះវានឹងបែកគ្រាប់! សាកល្បងប្រើកម្មវិធី AI Upscaler ជំនួសវិញ។",
        answer_en: "For printing, your image must be at least **300 PPI**.\n\n💡 **Note:** If it's still blurry at 300 PPI, the original file is simply too small. Do not just scale it up manually! Try using an AI Image Upscaler instead.",
        chips: ["តើ Resolution (PPI) ប៉ុន្មាន?", "អ្វីទៅជា Vector និង Raster?"],
        chips_en: ["Best Resolution for printing?", "Vector vs Raster?"]
    },
    {
        primaryKeys: ['សម្រាប់អេក្រង់', 'for screen'],
        keys: ['អេក្រង់', 'screen', 'web'],
        regex: ['សម្រាប់អេក្រង់', 'screen', 'web'],
        answer: "បាទ សម្រាប់អេក្រង់ Resolution 72 ទៅ 150 PPI គឺច្បាស់ហើយ។ \n\n💡 **បញ្ហាទូទៅ៖** បើរូបផុសចូល Facebook ស្រាប់តែព្រិល ភាគច្រើនមកពី File ធំពេក ហើយ Facebook បង្អាប់ (Compress) វា។ ត្រូវប្រាកដថាទំហំវាត្រឹម 1080x1080px (សម្រាប់ Square) ឬ 1080x1350px (សម្រាប់ Portrait) ហើយ Export ជា **sRGB** Color Space!",
        answer_en: "For screens, 72-150 PPI is standard. \n\n💡 **Common Issue:** If your image looks blurry after uploading to Facebook, it's often because the file was *too large* and the platform aggressively compressed it. Make sure the size is exactly 1080x1080px (Square) or 1080x1350px (Portrait) and always export in the **sRGB** Color Space!",
        chips: ["តើ RGB និង CMYK ខុសគ្នាម៉េច?", "ប្រភេទ File"],
        chips_en: ["RGB vs CMYK difference?", "File Formats"]
    }
];