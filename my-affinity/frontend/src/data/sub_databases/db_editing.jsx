export const editingData = [
    // 1. LIGHTROOM & RAW BASICS
    {
        primaryKeys: ['RAW vs JPEG', 'raw vs jpeg photography'],
        keys: ['raw format', 'jpeg', 'ថតរូប raw', 'ប្រភេទរូប'],
        regex: ['raw format', 'jpeg', 'raw vs jpeg'],
        answer: "បាទ **ការថតរូបជា File RAW ខុសពី JPEG ដាច់ស្រឡះ៖**\n\n📷 **RAW:** ប្រៀបដូចជាសាច់ស្រស់! វាផ្ទុកទិន្នន័យពន្លឺនិងពណ៌១០០%ពីកាមេរ៉ា។ អ្នកអាចទាញពន្លឺមេឃដែលសក្បុស ឱ្យឃើញពពកវិញបានយ៉ាងងាយក្នុង Lightroom។\n🖼️ **JPEG:** ប្រៀបដូចជាសាច់ចម្អិនរួច! កាមេរ៉ាបានលុបទិន្នន័យចោលខ្លះដើម្បីឱ្យ File តូច។ បើអ្នកទាញពន្លឺខ្លាំងពេក រូបនឹងបែកគ្រាប់។\n\n💡 **គន្លឹះអាជីព៖** តែងតែថតរូបជា RAW បើអ្នកចង់យកមកកែពណ៌ (Color Grading) បែប Cinematic!",
        answer_en: "**Shooting in RAW vs JPEG is fundamentally different:**\n\n📷 **RAW:** Think of it as raw, uncooked ingredients. It contains 100% of the light and color data captured by the camera sensor. You can easily recover blown-out white skies in Lightroom.\n🖼️ **JPEG:** Think of it as a fully baked cake. The camera permanently compressed and deleted data to make the file small. If you try to heavily color grade it, the pixels will break apart.\n\n💡 **Pro Tip:** Always shoot in RAW if you plan to do professional Color Grading!",
        chips: ["អ្វីទៅជា Histogram ក្នុង Lightroom?", "ការកែពណ៌ RAW"],
        chips_en: ["What is a Histogram in Lightroom?", "RAW Color Grading"]
    },
    {
        primaryKeys: ['អ្វីទៅជា Histogram ក្នុង Lightroom?', 'what is a histogram'],
        keys: ['histogram', 'ក្រាហ្វិកពន្លឺ', 'មើលពន្លឺ'],
        regex: ['histogram', 'ក្រាហ្វិកពន្លឺ'],
        answer: "បាទ **Histogram (ក្រាហ្វិកពន្លឺ)** គឺជាឧបករណ៍វាស់ពន្លឺដ៏ជាក់លាក់បំផុត មិនអាចកុហកភ្នែកយើងបានទេ!\n\nវាបង្ហាញពីបរិមាណភីកសែល (Pixels) នៅក្នុងរូបភាពរបស់អ្នក៖\n- **ឆ្វេងបំផុត:** ចំណុចខ្មៅងងឹត (Blacks)\n- **កណ្តាល:** ពន្លឺមធ្យម (Midtones / Exposure)\n- **ស្តាំបំផុត:** ចំណុចភ្លឺខ្លាំង (Whites)\n\n💡 **គន្លឹះអាជីព៖** បើក្រាហ្វិកកកស្ទះនៅខាងឆ្វេងខ្លាំងពេក មានន័យថារូបអ្នកងងឹតមើលលែងឃើញអ្វីហើយ (Underexposed)។ បើវាហៀរទៅខាងស្តាំពេក គឺរូបអ្នកឆេះពន្លឺហើយ (Overexposed)! ព្យាយាមសារ៉េឱ្យក្រាហ្វិកស្ថិតនៅកណ្តាលរាងដូចភ្នំ។",
        answer_en: "**The Histogram** is the ultimate truth-teller for lighting in photography!\n\nIt visually graphs the amount of pixels in your image based on brightness:\n- **Far Left:** Pure Blacks (Shadows)\n- **Middle:** Midtones (General Exposure)\n- **Far Right:** Pure Whites (Highlights)\n\n💡 **Pro Tip:** If the graph is clustered heavily on the left edge, your image is critically underexposed (crushed blacks). If it touches the far right edge, your highlights are blown out! Aim for a balanced, mountain-like shape in the middle.",
        chips: ["របៀបកែពន្លឺ ក្នុង Affinity", "តើ Tone Curve ប្រើធ្វើអ្វី?"],
        chips_en: ["How to edit light in Affinity", "How to use Tone Curve?"]
    },
    {
        primaryKeys: ['តើ Tone Curve ប្រើធ្វើអ្វី?', 'tone curve lightroom'],
        keys: ['tone curve', 'ខ្សែកោង', 's curve', 'ទាញពន្លឺ'],
        regex: ['tone curve', 's curve', 'ខ្សែកោង'],
        answer: "បាទ **Tone Curve (ខ្សែកោងពន្លឺ)** គឺជាអាវុធសម្ងាត់សម្រាប់បង្កើតរូបភាពបែបភាពយន្ត (Cinematic)!\n\n- ចំណុចខាងក្រោមគឺ **ស្រមោល (Shadows)**\n- ចំណុចកណ្តាលគឺ **ពន្លឺមធ្យម (Midtones)**\n- ចំណុចខាងលើគឺ **ពន្លឺភ្លឺ (Highlights)**\n\n💡 **គន្លឹះអាជីព (S-Curve):** ដើម្បីឱ្យរូបមើលទៅថ្លៃថ្នូរ សូមទាញចំណុច Highlights ឡើងលើបន្តិច រួចទាញចំណុច Shadows ចុះក្រោមបន្តិច ដើម្បីបង្កើតជារាង **អក្សរ S**។ វាបង្កើត Contrast ដែលមើលទៅធម្មជាតិ និងទាក់ទាញបំផុត!",
        answer_en: "**The Tone Curve** is the ultimate secret weapon for achieving cinematic color grading!\n\n- Bottom of the curve = **Shadows**\n- Middle of the curve = **Midtones**\n- Top of the curve = **Highlights**\n\n💡 **Pro Tip (The S-Curve):** To instantly make a photo look professional, plot a point on the Highlights and drag it slightly UP, then plot a point on the Shadows and drag it slightly DOWN. This creates an **'S' shape**, injecting beautiful, organic contrast into your image!",
        chips: ["អ្វីទៅជា Histogram ក្នុង Lightroom?", "ពណ៌ Cinematic"],
        chips_en: ["What is a Histogram in Lightroom?", "Cinematic Color"]
    },
    {
        primaryKeys: ['Clarity vs Texture ក្នុង Lightroom', 'clarity vs texture'],
        keys: ['clarity', 'texture', 'ភាពច្បាស់', 'ធ្វើឱ្យរូបច្បាស់', 'lightroom clarity'],
        regex: ['clarity', 'texture', 'ភាពច្បាស់'],
        answer: "បាទ នៅក្នុងមុខងារអូសទាញរបស់ Lightroom ទាំងពីរនេះធ្វើឱ្យរូបភាពច្បាស់ តែវាមានឥទ្ធិពលខុសគ្នា៖\n\n🔍 **Texture:** បង្កើនភាពលម្អិតខ្នាតតូច (ដូចជារន្ធញើស គ្រាប់ខ្សាច់ ឬសរសៃសក់) ដោយមិនប៉ះពាល់ដល់ពន្លឺរួមរបស់រូបភាពទេ។ ល្អបំផុតសម្រាប់បញ្ជាក់ស្បែក ឬអាហារ។\n🥊 **Clarity:** បង្កើន Contrast នៅត្រង់ Midtones ខ្លាំងមែនទែន! ធ្វើឱ្យរូបមើលទៅរឹងមាំ ដិត និងកាច (Grunge look)។ 💡 **បំរាម៖** កុំអូស Clarity ខ្លាំងពេកលើស្បែកមនុស្ស ព្រោះវានឹងធ្វើឱ្យមុខមើលទៅចាស់ និងខ្មៅក្រញុះ!",
        answer_en: "In Lightroom, both sliders add detail, but they behave very differently:\n\n🔍 **Texture:** Enhances fine, medium-sized details (like skin pores, sand, or hair strands) without affecting the overall contrast of the image. Great for food and portraits.\n🥊 **Clarity:** Aggressively boosts contrast purely in the midtones! It makes images look gritty, hard, and punchy (Grunge look). 💡 **Warning:** Never push Clarity too high on human faces, or it will age the subject by 20 years and make them look dirty!",
        chips: ["អ្វីទៅជា Vector និង Raster?", "ការធ្វើឱ្យរូបស្លេកៗ (Fading) 🌫️"],
        chips_en: ["Vector vs Raster?", "How to fade images properly 🌫️"]
    },
    // 2. PHOTOMANIPULATION & BLENDING
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
    // 3. COLOR GRADING & LIGHTING
    { 
        primaryKeys: ['របៀបកែពន្លឺ ក្នុង Affinity', 'how to edit light in affinity'],
        keys: ['edit light', 'កែពន្លឺ', 'brightness', 'exposure', 'លេងពន្លឺ'],
        regex: ['edit light', 'កែពន្លឺ', 'brightness', 'exposure', 'លេងពន្លឺ'],
        answer: "បាទ **ការកែពន្លឺ (Exposure/Lighting) គឺជាជំហានដំបូងបំផុតមុននឹងលេងពណ៌!**\n\n១. **Curves:** ប្រើខ្សែកោង Curves ដើម្បីទាញ Highlight (ពន្លឺខ្លាំង) ឡើងលើបន្តិច និងទាញ Shadows (ស្រមោល) ចុះក្រោមបន្តិច ដើម្បីបង្កើត S-Curve ដែលផ្តល់នូវ Contrast យ៉ាងស្រស់ស្អាត។\n២. **Shadows & Highlights:** បើរូបថតងងឹតមុខតួអង្គ សូមទាញ Shadows ឡើងបន្តិច។ បើមេឃសក្បុសពេក សូមទាញ Highlights ចុះ។", 
        answer_en: "**Correcting lighting is always the very first step before you touch any colors!**\n\n1. **Curves Tool:** Pull the top of the curve up slightly for brighter highlights, and pull the bottom down slightly for darker shadows. This creates the legendary 'S-Curve' for instant professional contrast.\n2. **Shadows & Highlights:** If your subject's face is dark, boost the 'Shadows' slider. If the sky is blown out, lower the 'Highlights' slider.",
        chips: ["ពណ៌ Cinematic", "តើ Tone Curve ប្រើធ្វើអ្វី?"],
        chips_en: ["Cinematic Color", "How to use Tone Curve?"]
    },
    { 
        primaryKeys: ['ពណ៌ Cinematic', 'cinematic color'],
        keys: ['cinematic', 'teal and orange', 'ពណ៌កុន', 'color grading'],
        regex: ['cinematic', 'teal and orange', 'ពណ៌កុន', 'color grading'],
        answer: "បាទ **ពណ៌បែប Cinematic (ពណ៌រោងកុន) ភាគច្រើនប្រើក្បួន Teal & Orange!**\n\nហេតុអ្វី? ព្រោះស្បែកមនុស្សយើងស្ថិតនៅក្នុងតំបន់ពណ៌ទឹកក្រូច (Orange) ចំណែកឯពណ៌ផ្ទុយរបស់វាគឺពណ៌ខៀវបៃតង (Teal)។ ពេលអ្នកដាក់ពណ៌ Teal ទៅក្នុងផ្ទៃខាងក្រោយ (Background/Shadows) វាធ្វើឱ្យតួអង្គលេចធ្លោខ្លាំង និងផ្តល់អារម្មណ៍ដូចកំពុងមើលកុនហូលីវូដ។\n\n💡 **របៀបធ្វើ៖** ប្រើ Color Grading (ឬ Color Balance) រួចរុញ Shadows ទៅរកពណ៌ខៀវ (Blue/Cyan) និងរុញ Highlights ទៅរកពណ៌លឿងទឹកក្រូច។", 
        answer_en: "**The classic 'Cinematic Look' relies heavily on the Teal & Orange color harmony!**\n\nWhy? Because human skin tones naturally fall into the Orange spectrum. Its exact opposite on the color wheel is Teal/Cyan. Pushing Teal into the shadows creates massive color contrast that makes the subject pop off the screen like a Hollywood movie.\n\n💡 **How to do it:** Open the Color Grading (or Color Balance) tool. Push your Shadows toward Cyan/Blue, and your Highlights toward Orange/Yellow.",
        chips: ["របៀបកែពន្លឺ ក្នុង Affinity", "តើ LUTs ជាអ្វី?"],
        chips_en: ["How to edit light in Affinity", "What are LUTs?"]
    },
    {
        primaryKeys: ['Color Grading (Split Toning)', 'split toning color grading'],
        keys: ['color grading', 'split toning', 'លាយពណ៌រូប', 'កែពណ៌'],
        regex: ['color grading', 'split toning', 'កែពណ៌'],
        answer: "បាទ **Color Grading (ឬការដាក់ពណ៌)** គឺជាការបន្ថែមសាច់ពណ៌ (Mood) ទៅឱ្យរូបភាពទាំងមូលបន្ទាប់ពីកែពន្លឺរួច!\n\nនៅក្នុងឧបករណ៍ Color Grading របស់ Lightroom/Affinity មានរង្វង់ពណ៌ ៣៖\n១. **Shadows (ស្រមោល):** ចាក់ពណ៌ចូលទៅក្នុងតំបន់ងងឹត (ឧ. ដាក់ពណ៌ខៀវងងឹត ឱ្យមើលទៅកាច ឬអាថ៌កំបាំង)។\n២. **Midtones (កណ្តាល):** គ្រប់គ្រងពណ៌ស្បែកមនុស្ស។\n៣. **Highlights (ពន្លឺ):** ចាក់ពណ៌ចូលទៅតំបន់ភ្លឺ (ឧ. ដាក់ពណ៌លឿងក្តៅ ដើម្បីឱ្យមើលទៅដូចពេលថ្ងៃរះ)។\n\n💡 **គន្លឹះអាជីព៖** ពណ៌បែបកុនល្បីៗ (Blockbusters) តែងតែរុញ Shadows ទៅពណ៌ Teal (ខៀវបៃតង) និង Highlights ទៅពណ៌ Orange (ទឹកក្រូច)។",
        answer_en: "**Color Grading (Split Toning)** is injecting a specific color mood into your image after the basic exposure is fixed!\n\nIn the Color Grading panel of Lightroom/Affinity, you have 3 color wheels:\n1. **Shadows:** Injects color into the darkest areas (e.g., adding deep blue for a gritty, mysterious vibe).\n2. **Midtones:** Primarily affects human skin tones.\n3. **Highlights:** Injects color into the brightest areas (e.g., adding warm yellow for a sunrise effect).\n\n💡 **Pro Tip:** The famous Hollywood Blockbuster look is achieved by pushing the Shadows wheel towards Teal (Cyan/Blue) and the Highlights wheel towards Orange.",
        chips: ["ពណ៌ Cinematic", "RAW vs JPEG"],
        chips_en: ["Cinematic Color", "RAW vs JPEG photography"]
    },
    {
        primaryKeys: ['របៀបធ្វើស្បែករលោង (Frequency Separation)', 'frequency separation skin retouching'],
        keys: ['frequency separation', 'ស្បែករលោង', 'កែមុខ', 'smooth skin', 'retouch skin', 'ធ្វើឱ្យស្បែករលោង'],
        regex: ['frequency separation', 'ស្បែករលោង', 'smooth skin', 'retouch skin'],
        answer: "បាទ **Frequency Separation** គឺជាក្បួនកែស្បែកមុខកម្រិតកំពូល ដែលអ្នកថតរូបទស្សនាវដ្តីប្រើ!\n\nវាបំបែករូបភាពជា ២ ស្រទាប់ (Layers) ផ្សេងគ្នា៖\n១. **ស្រទាប់ពណ៌ (Low Frequency):** មានតែពណ៌និងពន្លឺស្បែក។ អ្នកអាចយកជក់ទៅផាត់បំបាត់ភាពក្រហម ឬស្នាមជាំបាន ដោយមិនធ្វើឱ្យបាត់រន្ធញើស។\n២. **ស្រទាប់ផ្ទៃ (High Frequency):** មានតែរន្ធញើសនិងសាច់ក្រណាត់។ អ្នកអាចលុបមុន ឬស្នាមជ្រួញបានយ៉ាងស្អាត ដោយមិនធ្វើឱ្យខូចពណ៌ស្បែកទាល់តែសោះ។\n\n💡 **នៅក្នុង Affinity Photo:** អ្នកគ្រាន់តែចូលទៅកាន់ `Filters > Frequency Separation` គឺវាធ្វើរឿងនេះដោយស្វ័យប្រវត្តិ!",
        answer_en: "**Frequency Separation** is the ultimate, high-end skin retouching secret used by magazine retouchers!\n\nIt mathematically splits your image into 2 separate layers:\n1. **Color/Tone Layer (Low Frequency):** Contains only the colors and lighting. You can paint away redness and uneven skin tones without destroying the skin's texture.\n2. **Texture Layer (High Frequency):** Contains only pores, wrinkles, and acne. You can use the healing brush to remove a pimple without ruining the underlying skin color.\n\n💡 **In Affinity Photo:** Simply go to `Filters > Frequency Separation` and it sets up the entire process for you instantly!",
        chips: ["ឧបករណ៍កាត់តនិងកែសម្ផស្ស (Retouching Tools)", "កាត់តរូបភាព (Photomanipulation)"],
        chips_en: ["Affinity retouching tools", "Photomanipulation techniques"]
    },
    {
        primaryKeys: ['តើ LUTs ជាអ្វី?', 'what are luts lookup tables'],
        keys: ['lut', 'luts', 'color lookup', 'ពណ៌កុន', 'filter'],
        regex: ['lut', 'luts', 'color lookup'],
        answer: "បាទ **LUTs (Color Look-Up Tables)** គឺជាអាវុធសម្ងាត់ដែលឧស្សាហកម្មភាពយន្តហូលីវូដប្រើដើម្បីកែពណ៌វីដេអូ!\n\nនៅក្នុង Affinity Photo អ្នកអាចអូសយកឯកសារ LUTs (ទម្រង់ .cube ឬ .3dl) មកដាក់លើរូបថតរបស់អ្នក។ វាជាការកែប្រែពណ៌ដ៏ស្មុគស្មាញ (ផ្លាស់ប្តូរទាំងកម្រិតពណ៌ ពន្លឺ និងស្រមោលក្នុងពេលតែមួយ) ត្រឹមតែមួយឃ្លីក (1-Click) ប៉ុណ្ណោះ។\n\n💡 **របៀបប្រើ៖** បង្កើត Adjustment Layer ដែលមានឈ្មោះថា **LUT** រួច Load ឯកសារ LUTs ដែលអ្នកទាញយកពីអ៊ីនធឺណិតចូល។ រូបថតធម្មតារបស់អ្នកនឹងប្រែក្លាយទៅជាមានសាច់ពណ៌បែប Cinematic ភ្លាមៗ។",
        answer_en: "**LUTs (Color Look-Up Tables)** are the secret color-grading files used by Hollywood colorists to give movies their distinct vibe!\n\nIn Affinity Photo, you can apply LUT files (.cube or .3dl) to your photos. A LUT is essentially a hyper-advanced filter that mathematically remaps the colors, contrast, and shadows of your image in a single click.\n\n💡 **How to use them:** Create a **LUT** Adjustment Layer, then click 'Load' to select a cinematic LUT you downloaded from the internet. Your flat photo will instantly look like a movie still!",
        chips: ["Color Grading (Split Toning)", "ពណ៌ Cinematic"],
        chips_en: ["Split Toning Color Grading", "Cinematic Color"]
    },
    // 4. TROUBLESHOOTING
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
        regex: ['depth of field', 'blur', 'bokeh', 'រូបព្រិលក្រោយ', 'ព្រិល background'],
        answer: "បាទ **Depth of Field (ទំហំច្បាស់)** គឺជាបច្ចេកទេសបំបែកវត្ថុគោលចេញពីផ្ទៃខាងក្រោយរញ៉េរញ៉ៃ។\n\nបើអ្នកចង់ឱ្យវត្ថុគោលលេចធ្លោខ្លាំង អ្នកត្រូវធ្វើឱ្យ Background ព្រិល (ហៅថា Blur ឬ Bokeh)។ នៅក្នុងកម្មវិធីរចនា អ្នកអាចប្រើ **Gaussian Blur** ឬ **Lens Blur** រួចលាយជាមួយ Layer Mask ដើម្បីបង្កើតអារម្មណ៍ដូចថតចេញពីកាមេរ៉ា Lens ធំអាជីពពិតៗ។ វាក៏ជួយបង្កើន Visual Hierarchy ផងដែរ!",
        answer_en: "**Depth of Field (DOF)** is a technique used to isolate your main subject from a distracting background.\n\nBy applying a realistic blur (Bokeh) to the background using **Lens Blur** or **Gaussian Blur** combined with a gradient mask, you instantly create a cinematic, professional-camera look. This forces the viewer's eye exactly onto what matters most!",
        chips: ["របៀបបែងចែក Foreground និង Background 🏞️", "តើ Hierarchy ជាអ្វី?"],
        chips_en: ["Foreground vs Background Depth 🏞️", "Visual Hierarchy"]
    },
    {
        primaryKeys: ['រូបភាពខ្ញុំព្រិល', 'my image is blurry'],
        keys: ['មិនច្បាស់', 'ព្រិល', 'បែកគ្រាប់', 'pixelated', 'blurry'],
        regex: ['blurry', 'មិនច្បាស់', 'ព្រិល', 'បែកគ្រាប់', 'pixelated'],
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