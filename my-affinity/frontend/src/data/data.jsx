import React from 'react';
import { Layout, BookOpen, Star, Award, Briefcase, Palette, Type, Printer, PenTool } from 'lucide-react';

export const TIPS_LIST = [
    "ការទុកចន្លោះទំនេរ (White Space) មិនមែនមានន័យថាទទេស្អាតនោះទេ វាជួយឱ្យការរចនារបស់អ្នកមានខ្យល់ដកដង្ហើម និងងាយស្រួលមើល。", 
    "កុំប្រើប្រាស់ហ្វុនអក្សរ (Fonts) លើសពី ២ ទៅ ៣ ប្រភេទក្នុងផ្ទាំងការងារតែមួយ ដើម្បីជៀសវាងភាពរញ៉េរញ៉ៃ。",
    "ទ្រឹស្តីពណ៌ (Color Theory) គឺសំខាន់ណាស់! ការប្រើប្រាស់ពណ៌ផ្ទុយគ្នា (Complementary) ជួយឱ្យចំណុចសំខាន់លេចធ្លោ。", 
    "មុននឹងចាប់ផ្តើមប្រើកម្មវិធី (Software) គួរតែគូសវាសគំនិតនៅលើក្រដាសជាមុនសិន。", 
    "ការតម្រឹម (Alignment) គឺជាគន្លឹះដែលធ្វើឱ្យការរចនាមើលទៅមានរបៀបរៀបរយ និងមានស្តង់ដារ。", 
    "បង្កើតឋានានុក្រម (Hierarchy) ដោយប្រើទំហំ កម្រាស់ និងពណ៌ ដើម្បីដឹកនាំភ្នែកអ្នកមើលពីចំណុចមួយទៅចំណុចមួយទៀត。",
    "យល់ដឹងពីភាពខុសគ្នារវាង RGB (សម្រាប់អេក្រង់) និង CMYK (សម្រាប់ការបោះពុម្ព) ដើម្បីកុំឱ្យខុសពណ៌ពេលព្រីន。",
    "ជានិច្ចកាល ត្រូវរចនាឡូហ្គោជាទម្រង់ Vector (.ai, .svg) ដើម្បីងាយស្រួលពង្រីកមិនបែកគុណភាព。",
    "ជៀសវាងការប្រើពណ៌ខ្មៅសុទ្ធ (#000000) លើអត្ថបទវែងៗ គួរប្រើពណ៌ប្រផេះចាស់ដើម្បីកុំឱ្យចាំងភ្នែកអ្នកអានពេក。",
    "កុំពត់ ឬទាញអក្សរឱ្យខូចទ្រង់ទ្រាយ (Distort) ត្រូវសង្កត់ Shift ជានិច្ចពេលពង្រីកទំហំរូបភាព ឬអក្សរ。",
    "ប្រើប្រាស់ Grid System ដើម្បីធានាថាការរៀបចំប្លង់របស់អ្នកមានតុល្យភាព និងមានមូលដ្ឋានច្បាស់លាស់。",
    "ធ្វើការសង្កេត និងរៀនសូត្រពីស្នាដៃអ្នកដទៃ (Reference) ប៉ុន្តែកុំចម្លង (Copy) ទាំងស្រុង。",
    "💡 កុំភ្លេច Save ការងាររបស់អ្នកឱ្យបានញឹកញាប់ ដើម្បីជៀសវាងការបាត់បង់ទិន្នន័យ! 🚀"
];

export const TIPS_LIST_EN = [
    "White space doesn't mean empty space; it gives your design room to breathe and makes it easier to view.",
    "Avoid using more than 2-3 fonts in a single design to prevent visual clutter.",
    "Color Theory is crucial! Using complementary colors helps key elements stand out.",
    "Before jumping into software, sketch your ideas on paper first.",
    "Alignment is the key to making a design look organized and professional.",
    "Create Hierarchy using size, weight, and color to guide the viewer's eye.",
    "Understand the difference between RGB (for screens) and CMYK (for printing) to avoid color shifting.",
    "Always design logos as Vectors (.ai, .svg) so they can scale infinitely without losing quality.",
    "Avoid using pure black (#000000) on long body texts; use dark gray to reduce eye strain.",
    "Never distort or stretch text! Always hold Shift when resizing images or typography.",
    "Use a Grid System to ensure your layout is balanced and well-structured.",
    "Observe and learn from others' work (Reference), but do not completely copy.",
    "💡 Don't forget to Save your work frequently to avoid data loss! 🚀"
];

// 🌟 REUSABLE DEFAULT INSTRUCTIONS 🌟
const defaultInstruction = "សូមទាញយកឯកសារ (Assets) ខាងក្រោម រួចបើកវានៅក្នុងកម្មវិធីដើម្បីអនុវត្តតាមវីដេអូមួយជំហានម្តងៗ។";
const defaultInstructionEn = "Please download the provided assets below and open them in the app to follow along with the video step-by-step.";
const defaultDownloadUrl = "https://myaffinity.gumroad.com/";

// 🌟 MICRO-LEARNING COURSE DATA WITH PRACTICE FILES 🌟
export const courseData = {
  photo: [
    { 
      id: 'ph1', title: 'មេរៀនទី ១៖ ការចាប់ផ្តើម និងផ្ទៃការងារ', title_en: 'Lesson 1: Getting Started & Workspace', 
      desc: 'ស្ទាត់ជំនាញលើ Home Screen, កាយវិការបញ្ជា (Touch Gestures) និង Command Controller។', desc_en: 'Master the iPad Home Screen, touch gestures, and the Command Controller.', 
      instruction: 'មុននឹងចាប់ផ្តើម សូមទាញយកឯកសារ UI Guide ខាងក្រោមដើម្បីងាយស្រួលមើលចំណាំកន្លែង Tools ផ្សេងៗ។', instruction_en: 'Before starting, download the UI Guide PDF below to easily memorize where the tools are located.', downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'Home Screen៖ រៀនពីការគ្រប់គ្រង "Live Docs" និងការរៀបចំគម្រោងការងារ។', english: 'The Home Screen: Learn to manage "Live Docs" and organize work.', videoUrl: 'https://youtu.be/5GlKh-HH4HM' },
        { id: 2, khmer: 'កាយវិការបញ្ជា (Touch Gestures)៖ ប្រើម្រាមពីរដើម្បី Undo, ម្រាមបីដើម្បី Redo និងការចាប់ពង្រីក។', english: 'Touch Gestures: Master two-finger undo, three-finger redo, and pinching.', videoUrl: '' },
        { id: 3, khmer: 'ផ្ទៃកម្មវិធី (Interface)៖ ស្វែងយល់ពី Tools, Studios និង Contextual Toolbar។', english: 'Interface Layout: Navigate Tools, Studios, and the Contextual Toolbar.', videoUrl: '' },
        { id: 4, khmer: 'ឧបករណ៍លើ iPad៖ ការប្រើប្រាស់ Command Controller និង Quick Menu។', english: 'iPad-Specific Tools: Use the Command Controller and Quick Menu.', videoUrl: '' }
      ]
    },
    { 
      id: 'ph2', title: 'មេរៀនទី ២៖ មូលដ្ឋាននៃការកែរូបថត', title_en: 'Lesson 2: Fundamental Photo Editing', 
      desc: 'ការនាំចូលឯកសារ RAW, ការកាត់តម្រឹម និងការប្រើប្រាស់ Develop Persona។', desc_en: 'Import RAW files, crop, and master the non-destructive Develop Persona.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'ការនាំចូល និងការដាក់រូបភាព៖ អូសទាញរូបភាព ឬប្រើម៉ឺនុយ Place។', english: 'Importing & Placement: Drag and drop images or use the Place menu.', videoUrl: '' },
        { id: 2, khmer: 'កាត់ និងតម្រឹម៖ ប្រើ Crop tool និងតម្រង់ប្លង់ផ្តេក (Horizon) ឱ្យត្រង់។', english: 'Crop & Straighten: Use the Crop tool and straighten horizons.', videoUrl: '' },
        { id: 3, khmer: 'Develop Persona៖ ការកែតម្រូវពន្លឺ និងស្រមោលលើឯកសារ RAW ដោយមិនខូចគុណភាពដើម។', english: 'The Develop Persona: Non-destructive adjustments to RAW files.', videoUrl: '' },
        { id: 4, khmer: 'ការលុបស្នាម៖ ប្រើ Inpainting និង Spot Healing ដើម្បីលុបមុន ឬវត្ថុមិនចង់បាន។', english: 'Basic Retouching: Use Inpainting and Spot Healing for blemishes.', videoUrl: '' }
      ]
    },
    { 
      id: 'ph3', title: 'មេរៀនទី ៣៖ Layers, Masks និងការកែពណ៌', title_en: 'Lesson 3: Layers, Masks & Adjustments', 
      desc: 'គ្រប់គ្រង Pixel និង Vector Layers, ការស៊ិចឡិច (Selections) និង Live Filters។', desc_en: 'Control pixel and vector layers, smart selections, and live filters.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'ការគ្រប់គ្រង Layer៖ ស្វែងយល់ពី Pixel, Vector និង Text layers។', english: 'Layer Management: Understand pixel, vector, and text layers.', videoUrl: '' },
        { id: 2, khmer: 'Selections៖ ប្រើ Smart Selection Brush និង Refine Edge ដើម្បីកាត់សក់។', english: 'Selections: Use the Smart Selection Brush and Refine Edge.', videoUrl: '' },
        { id: 3, khmer: 'ការកែពណ៌ (Adjustments)៖ ប្រើ Curves, Levels និង HSL layers ដែលអាចកែប្រែបានគ្រប់ពេល។', english: 'Non-Destructive Adjustments: Apply Curves, Levels, and HSL layers.', videoUrl: '' },
        { id: 4, khmer: 'Masking៖ ប្រើ Mask Layers ដើម្បីលាក់ផ្នែកខ្លះនៃរូបភាព។', english: 'Masking: Use Mask Layers to hide parts of an image.', videoUrl: '' }
      ]
    },
    { 
      id: 'ph4', title: 'មេរៀនទី ៤៖ ការផ្គុំរូប និង Export ឯកសារ', title_en: 'Lesson 4: Creative Projects & Exporting', 
      desc: 'បន្ថែម Effect អក្សរ, Blend Modes និងការ Export ឯកសារចុងក្រោយ។', desc_en: 'Add text effects, blend modes, and export slices for final delivery.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'ការបន្ថែមអក្សរ និង FX៖ ប្រើ Text tool និង FX Studio សម្រាប់ដាក់ស្រមោល និងគែម។', english: 'Adding Text & FX: Use the Text tool and FX Studio for outlines.', videoUrl: '' },
        { id: 2, khmer: 'Compositing៖ ផ្គុំរូបភាពដោយប្រើ Blend Modes (Multiply, Screen) ឱ្យស៊ីសង្វាក់គ្នា។', english: 'Compositing: Combine assets using Blend Modes (Multiply, Screen).', videoUrl: '' },
        { id: 3, khmer: 'Export Persona៖ Export ជា JPEG, PNG ឬ TIFF ជាមួយនឹងការគ្រប់គ្រងទំហំ។', english: 'Export Persona: Export in JPEG, PNG, or TIFF with slice control.', videoUrl: '' }
      ]
    },
    { 
      id: 'ph5', title: 'មេរៀនទី ៥៖ ក្បួនកែស្បែក Portrait អាជីព', title_en: 'Lesson 5: Professional Portrait Retouch', 
      desc: 'ស្ទាត់ជំនាញបច្ចេកទេស Frequency Separation និង Dodge & Burn សម្រាប់ការកែរូប Portrait។', desc_en: 'Master Frequency Separation and non-destructive dodging and burning.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'Frequency Separation៖ បំបែករូបភាពជា High/Low frequency ដើម្បីកែស្បែកឱ្យម៉ដ្ឋ។', english: 'Frequency Separation: Split image into High/Low frequency for skin smoothing.', videoUrl: '' },
        { id: 2, khmer: 'Dodge and Burn៖ បន្ថែមពន្លឺ និងស្រមោលដើម្បីបង្កើតទម្រង់មុខឱ្យកាន់តែលេចធ្លោ។', english: 'Dodge and Burn: Selectively lighten and darken areas to add contouring.', videoUrl: '' },
        { id: 3, khmer: 'ភ្នែក និងធ្មេញ៖ ធ្វើឱ្យកែវភ្នែកភ្លឺ និងធ្មេញសបែបធម្មជាតិ។', english: 'Eyes and Teeth: Enhance iris clarity and whiten teeth naturally.', videoUrl: '' },
        { id: 4, khmer: 'ការលុបស្នាមលម្អិត៖ ប្រើ Inpainting លើ High-frequency layer ឱ្យម៉ដ្ឋខៃ។', english: 'Detail Refinement: Use Inpainting on the high-frequency layer.', videoUrl: '' }
      ]
    },
    { 
      id: 'ph6', title: 'មេរៀនទី ៦៖ ក្បួនកាត់តរូបភាពកម្រិតខ្ពស់', title_en: 'Lesson 6: Advanced Digital Compositing', 
      desc: 'បង្កើតទស្សនីយភាពដោយការផ្គុំរូបភាពច្រើនផ្ទាំងបញ្ចូលគ្នា (Compositing) ឱ្យមើលទៅដូចពិតៗ។', desc_en: 'Create seamless multi-asset scenes with realistic atmospheric effects.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'ការរួមបញ្ចូលរូបភាព៖ នាំចូល និងចាត់ចែងរូបភាពជាច្រើនផ្ទាំង។', english: 'Asset Integration: Import and place multiple images.', videoUrl: '' },
        { id: 2, khmer: 'Complex Masking៖ កាត់សក់ ឬគែមស្មុគស្មាញឱ្យបានសុក្រិត។', english: 'Complex Masking: Refine hair or fine edges accurately.', videoUrl: '' },
        { id: 3, khmer: 'ពន្លឺ និងស្រមោល៖ បង្កើតស្រមោលដោយប្រើ Live Gaussian Blur។', english: 'Global Lighting & Shading: Create shadows using Live Gaussian Blur.', videoUrl: '' },
        { id: 4, khmer: 'Effect បរិយាកាស៖ ប្រើ Mesh Warp និង LUTs ដើម្បីបង្រួបបង្រួមពណ៌។', english: 'Atmospheric Effects: Apply Mesh Warp and LUTs to unify colors.', videoUrl: '' }
      ]
    },
    { 
      id: 'ph7', title: 'គម្រោងទី ១៖ Product Mockup អាជីវកម្ម', title_en: 'Project 1: Commercial Product Mockup', 
      desc: 'ដាក់ Pattern ទៅលើវត្ថុ 3D ដោយប្រើប្រាស់ Blend Modes។', desc_en: 'Place a custom pattern onto a 3D-looking object using Blend Modes.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ ដាក់ Pattern រចនាផ្ទាល់ខ្លួនទៅលើវត្ថុ 3D ដូចជាកែវ ឬដប។', english: 'Goal: Place a custom pattern onto a 3D-looking object.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ប្រើ Clipping Masks និង Blend Modes ដើម្បីរក្សាស្រមោលដើម។', english: 'Key Skill: Master Clipping Masks and Blend Modes to preserve shadows.', videoUrl: '' }
      ]
    },
    { 
      id: 'ph8', title: 'គម្រោងទី ២៖ ទស្សនីយភាព Dark Angel', title_en: 'Project 2: Fantasy Dark Angel', 
      desc: 'បង្កើតទស្សនីយភាពបែប Cinematic ដោយផ្គុំរូបភាពយ៉ាងតិច ៥ ផ្ទាំង។', desc_en: 'Create a cinematic scene combining at least 5 different image assets.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ បង្កើតផ្ទាំងទស្សនីយភាពបែបភាពយន្ត។', english: 'Goal: Create a dramatic scene using multiple assets.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ប្រើ Adjustment Layers និង Brush Tools ដើម្បីគូរពន្លឺ។', english: 'Key Skill: Use Adjustment Layers and Brush Tools to paint highlights manually.', videoUrl: '' }
      ]
    },
    { 
      id: 'ph9', title: 'គម្រោងទី ៣៖ ប្លង់សៀវភៅ Comic', title_en: 'Project 3: Digital Comic Page', 
      desc: 'បំប្លែងរូបថតធម្មតាឱ្យទៅជារូបគំនូរបែបសៀវភៅ Comic។', desc_en: 'Transform a standard photo into a stylized comic book illustration.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ ប្រែក្លាយរូបថតទៅជាគំនូរ Comic។', english: 'Goal: Transform a photo into a comic illustration.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ប្រើ Pen Tool, Text Studio និង Live Filters (Halftone)។', english: 'Key Skill: Use the Pen Tool, Text Studio, and Live Filters (Halftone).', videoUrl: '' }
      ]
    },
    { 
      id: 'ph10', title: 'គម្រោងទី ៤៖ ទាញយកចំណាប់អារម្មណ៍ YouTube', title_en: 'Project 4: Social Media Thumbnail', 
      desc: 'រចនា Thumbnail សម្រាប់ YouTube ដែលទាក់ទាញភ្នែកខ្លាំង។', desc_en: 'Design a high-impact YouTube thumbnail with bold typography and Layer FX.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ រចនា YouTube Thumbnail ដែលទាក់ទាញភ្នែក។', english: 'Goal: Design a high-impact YouTube thumbnail.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ បញ្ចូលគ្នានូវ Smart Selections, Fill Layers និង Layer FX លើអក្សរ។', english: 'Key Skill: Combine Smart Selections, Fill Layers, and bold Layer FX.', videoUrl: '' }
      ]
    }
  ],
  designer: [
    { 
      id: 'ds1', title: 'មេរៀនទី ១៖ ទម្លាប់ Vector និងផ្ទៃការងារ', title_en: 'Lesson 1: The Vector Mindset & UI', 
      desc: 'ការផ្លាស់ប្តូរ Personas, ការរៀបចំ Artboards និងកាយវិការបញ្ជាសម្រាប់ Vector។', desc_en: 'Switch between Personas, set up Artboards, and master vector gestures.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'Personas ទាំងបី៖ Designer (Vector), Pixel (Raster) និង Export។', english: 'The Three Personas: Designer (Vector), Pixel (Raster), and Export.', videoUrl: '' },
        { id: 2, khmer: 'Canvas៖ ការរៀបចំ Artboards សម្រាប់គម្រោងមានទំព័រច្រើន។', english: 'The Canvas: Setting up Artboards for multi-page projects.', videoUrl: '' },
        { id: 3, khmer: 'ការបញ្ជាកាយវិការ៖ ម្រាមពីរ Undo, Quick Menu និង Command Controller។', english: 'Gesture Mastery: Two-finger undo, Quick Menu, and Command Controller.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds2', title: 'មេរៀនទី ២៖ ធរណីមាត្រ និង Shape Builder', title_en: 'Lesson 2: Geometry & Shape Builder', 
      desc: 'បង្កើតរូបរាងស្មុគស្មាញដោយប្រើ Boolean operations និង Shape Builder។', desc_en: 'Create complex forms intuitively using Boolean operations and the Shape Builder.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'រូបរាងមូលដ្ឋាន (Shapes)៖ ការប្រើប្រាស់ឧបករណ៍ Cog, Star និង Donut។', english: 'Parametric Shapes: Using the Cog, Star, and Donut tools.', videoUrl: '' },
        { id: 2, khmer: 'Boolean Operations៖ ការបូក ដក និងប្រសព្វរូបរាងចូលគ្នា។', english: 'Boolean Operations: Joining, subtracting, and intersecting shapes.', videoUrl: '' },
        { id: 3, khmer: 'Shape Builder Tool៖ ការ "ផាត់" កាត់រូបរាងដែលត្រួតគ្នាដើម្បីបង្កើតរូបរាងថ្មី។', english: 'The Shape Builder Tool: "Painting" across overlapping shapes.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds3', title: 'មេរៀនទី ៣៖ Pen Tool និង Node Tool', title_en: 'Lesson 3: The Pen & Node Tools', 
      desc: 'ស្ទាត់ជំនាញលើខ្សែបន្ទាត់កោង Bézier, ការកែប្រែ Node និង Knife Tool។', desc_en: 'Master Bézier curves, node conversion, and the vector Knife Tool.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'ភាពសុក្រិតរបស់ Pen Tool៖ របៀបចុចទាញ (click-drag) សម្រាប់ខ្សែកោង។', english: 'Pen Tool Precision: "Click-drag" for curves and Alt/Option modifiers.', videoUrl: '' },
        { id: 2, khmer: 'Node Tool៖ ការបំប្លែង Nodes (Sharp, Smooth, Smart)។', english: 'Node Tool: Converting nodes (Sharp, Smooth, Smart).', videoUrl: '' },
        { id: 3, khmer: 'Knife Tool៖ ការកាត់ផ្តាច់ Vector ដើម្បីបង្កើតបំណែក។', english: 'Knife Tool: Slicing through objects to create organic breaks.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds4', title: 'មេរៀនទី ៤៖ ពណ៌, Gradients និង Appearance', title_en: 'Lesson 4: Color, Gradients & Appearance', 
      desc: 'ការរៀបចំស្តាយល៍ Stroke និង Fill ច្រើនជាន់ដោយប្រើ Appearance Studio។', desc_en: 'Stack multiple strokes and fills using the powerful Appearance Studio.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'Fill & Stroke៖ ការគ្រប់គ្រងកម្រាស់បន្ទាត់ និងក្បាលព្រួញ។', english: 'Fill & Stroke: Managing line weights and pressure profiles.', videoUrl: '' },
        { id: 2, khmer: 'Gradient Tool៖ ការចាក់ពណ៌រលាយ (Linear, Radial, Conical)។', english: 'The Gradient Tool: Applying linear, radial, and conical fills.', videoUrl: '' },
        { id: 3, khmer: 'Appearance Studio៖ ការបន្ថែម Strokes និង Fills ជាច្រើនជាន់លើវត្ថុតែមួយ។', english: 'Appearance Studio: Adding Multiple Strokes to a single object.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds5', title: 'មេរៀនទី ៥៖ អក្សរ និង Vector Assets', title_en: 'Lesson 5: Typography & Vector Assets', 
      desc: 'ការសរសេរអក្សរតាមខ្សែបន្ទាត់កោង និងបង្កើត Asset library ដើម្បីប្រើប្រាស់ឡើងវិញ។', desc_en: 'Flow text along curved paths and build a reusable Asset library.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'Artistic vs Frame Text៖ ការប្រើប្រាស់អក្សរចំណងជើង និងអត្ថបទវែង។', english: 'Artistic vs. Frame Text: Scaling headlines vs. wrapping body copy.', videoUrl: '' },
        { id: 2, khmer: 'Path Text៖ ការសរសេរអក្សរឱ្យរត់តាមខ្សែបន្ទាត់ Vector កោង។', english: 'Path Text: Flowing words along a curved vector line.', videoUrl: '' },
        { id: 3, khmer: 'Assets Studio៖ ការចងក្រងបណ្តុំ Icons និងឯកសារដើម្បីទាញប្រើលឿន។', english: 'The Assets Studio: Creating a library of reusable icons.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds6', title: 'មេរៀនទី ៦៖ ការបញ្ជូលគ្នាជាមួយ Pixel Persona', title_en: 'Lesson 6: The Pixel Persona Integration', 
      desc: 'ការបន្ថែមភាពគ្រើម (Textures) ទៅលើរូប Vector ដោយប្រើ Pixel Persona។', desc_en: 'Add raster textures, grain, and gritty brushes to clean vector shapes.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'Hybrid Workflow៖ ផ្លាស់ប្តូរទៅកាន់ Pixel Persona ដើម្បីបន្ថែម Texture និងជក់។', english: 'Hybrid Workflow: Switch to Pixel Persona to add texture and grain.', videoUrl: '' },
        { id: 2, khmer: 'Vector Masking៖ ការប្រើប្រាស់ Vector ដើម្បីកាត់ ឬលាក់ផ្នែកខ្លះនៃរូបភាព Pixel។', english: 'Vector Masking: Using vector shapes to "clip" raster images inside.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds7', title: 'គម្រោងទី ១៖ Flat Icon បែប Minimalist', title_en: 'Project 1: Minimalist Flat Icon Set', 
      desc: 'រចនា Icon បែប Flat ចំនួន ៥ ដោយប្រើត្រឹមតែរូបរាងមូលដ្ឋាន (Basic Shapes)។', desc_en: 'Design 5 cohesive icons using only basic geometric shapes.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ រចនា Icon ចំនួន ៥ ដោយប្រើ Shape Builder។', english: 'Goal: Design 5 icons using basic shapes and the Shape Builder.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ការគ្រប់គ្រងភាពស៊ីមេទ្រី (Symmetry) និង Transform Studio។', english: 'Key Skill: Mastering symmetry and the Transform Studio.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds8', title: 'គម្រោងទី ២៖ ការរចនា Logo អាជីព', title_en: 'Project 2: Professional Logo & Branding', 
      desc: 'គូរព្រាង និងប្រែក្លាយ Logo ទៅជា Vector ដោយប្រើប្រាស់ Pen Tool។', desc_en: 'Vectorize a logo using the Pen Tool based on a hand-drawn sketch import.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ បង្កើត Logo បែប Vector ដោយផ្អែកលើគំនូរព្រាងដោយដៃ។', english: 'Goal: Create a vectorized logo from a sketch.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ការគ្រប់គ្រង Node, ការសម្រួលខ្សែបន្ទាត់ និងការ Export ជា SVG។', english: 'Key Skill: Node management, path simplification, and SVG export.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds9', title: 'គម្រោងទី ៣៖ ប្លង់បន្ទប់បែប Isometric', title_en: 'Project 3: Isometric Room Illustration', 
      desc: 'បង្កើតរូបគំនូរបន្ទប់ 3D ដោយប្រើប្រាស់ Isometric Grid និង Axonometric Panel។', desc_en: 'Build a 3D-looking room using the Isometric Grid and Axonometric Panel.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ បង្កើតទិដ្ឋភាពបន្ទប់ 3D ដោយប្រើ Isometric Grid។', english: 'Goal: Build a 3D-looking room using the Isometric Grid.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ការប្រើប្រាស់ Axonometric Panel ដើម្បីចាប់ (Snap) រាងចូលប្លង់ 3D។', english: 'Key Skill: Using the Axonometric Panel to snap shapes to 3D.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds10', title: 'គម្រោងទី ៤៖ Poster ទាក់ទាញបែប Vector', title_en: 'Project 4: High-Impact Vector Poster', 
      desc: 'រចនា Poster ដោយបញ្ចូលគ្នានូវ Path Text និង Stock Image masking។', desc_en: 'Design a print-ready poster combining Path Text and Stock Image masking.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ រចនា Poster ដោយបញ្ចូល Path Text និង Masking។', english: 'Goal: Design a poster combining Path Text and Stock masking.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ការរៀបចំប្លង់ និងការ Export សម្រាប់បោះពុម្ព (PDF)។', english: 'Key Skill: Advanced layering and Export Persona for PDFs.', videoUrl: '' }
      ]
    }
  ],
  publisher: [
    { 
      id: 'pb1', title: 'មេរៀនទី ១៖ ផ្ទៃការងារ និងរចនាសម្ព័ន្ធឯកសារ', title_en: 'Lesson 1: Interface & Architecture', 
      desc: 'កំណត់ទំព័រ Spreads, Bleed, Margins និងប្រើប្រាស់ StudioLink នៅក្នុង Publisher។', desc_en: 'Configure spreads, bleeds, margins, and utilize StudioLink directly inside Publisher.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'Home Screen៖ ការបង្កើតឯកសារសម្រាប់ Print, Web, ឬ Devices។', english: 'The Home Screen: Create presets for Print, Web, or Devices.', videoUrl: '' },
        { id: 2, khmer: 'Document Setup៖ កំណត់ Facing Pages, Bleed និង Margins។', english: 'Document Setup: Configure Facing Pages, Bleed, and Margins.', videoUrl: '' },
        { id: 3, khmer: 'Publisher Menu៖ ការផ្លាស់ប្តូរ Personas និងការប្រើប្រាស់ StudioLink។', english: 'The Publisher Icon Menu: Switch Personas and use StudioLink.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb2', title: 'មេរៀនទី ២៖ Master Pages និងការរៀបចំប្លង់', title_en: 'Lesson 2: Master Pages & Layout', 
      desc: 'ធ្វើស្វ័យប្រវត្តិកម្មលើ Background និង Header ដោយប្រើ Pages Studio។', desc_en: 'Automate backgrounds and headers using the Pages Studio and Master linking.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'មូលដ្ឋាន Master Page៖ បង្កើតទំព័រគំរូសម្រាប់ផ្ទៃខាងក្រោយ និង Header។', english: 'Master Page Basics: Create reusable backgrounds and headers.', videoUrl: '' },
        { id: 2, khmer: 'ការប្រើប្រាស់ Masters៖ ទាញ Master page ដាក់ចូលទៅក្នុងទំព័រការងារ។', english: 'Applying Masters: Apply a master page to specific content pages.', videoUrl: '' },
        { id: 3, khmer: 'Edit Detached៖ ការកែប្រែចំណុចណាមួយនៃ Master ដោយមិនធ្វើឱ្យប៉ះពាល់ទំព័រផ្សេង។', english: 'Edit Detached: Modify a master element without breaking its link.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb3', title: 'មេរៀនទី ៣៖ ប្រអប់អក្សរ និង Typography', title_en: 'Lesson 3: Text Frames & Typography', 
      desc: 'ភ្ជាប់ប្រអប់អក្សរដើម្បីឱ្យអត្ថបទហូរឆ្លងកាត់ទំព័រជាច្រើនដោយស្វ័យប្រវត្តិ។', desc_en: 'Link text frames to pour body copy across multiple spreads.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'Frame vs Artistic Text៖ ប្រើ Frame Text សម្រាប់អត្ថបទវែងៗ។', english: 'Frame vs. Artistic Text: Use Frame Text for large body copy.', videoUrl: '' },
        { id: 2, khmer: 'Text Flow & Linking៖ ភ្ជាប់ប្រអប់អក្សរដើម្បីឱ្យអត្ថបទហូរពីទំព័រមួយទៅទំព័រមួយទៀត។', english: 'Text Flow & Linking: Link frames so text "pours" across pages.', videoUrl: '' },
        { id: 3, khmer: 'Typography Controls៖ ការកំណត់គម្លាតអក្សរ (Tracking, Kerning)។', english: 'Typography Controls: Master tracking, kerning, and baseline shift.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb4', title: 'មេរៀនទី ៤៖ Styles និងការកំណត់ទម្រង់', title_en: 'Lesson 4: Styles & Formatting', 
      desc: 'បង្កើត Paragraph Styles រួម ដើម្បីធ្វើស្វ័យប្រវត្តិកម្មលើការរៀបចំ Formatting។', desc_en: 'Create global Paragraph Styles to automate bullet lists and chapter formatting.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'Paragraph & Character Styles៖ ធានាភាពស៊ីសង្វាក់គ្នានៃហ្វុនអក្សរ។', english: 'Paragraph & Character Styles: Ensure consistent fonts globally.', videoUrl: '' },
        { id: 2, khmer: 'បញ្ជី (Lists)៖ ធ្វើស្វ័យប្រវត្តិកម្មលើ Bullet និងលេខរៀង។', english: 'Bullet & Numbered Lists: Automate lists using Paragraph Studio.', videoUrl: '' },
        { id: 3, khmer: 'Find & Replace៖ ស្វែងរក និងផ្លាស់ប្តូរពាក្យ ឬទម្រង់អក្សរនៅទូទាំងឯកសារ។', english: 'Find & Replace: Quickly update text or formatting document-wide.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb5', title: 'មេរៀនទី ៥៖ រូបភាព, Assets និងតារាង', title_en: 'Lesson 5: Images, Assets & Tables', 
      desc: 'បង្កើតតារាងទិន្នន័យ និងរៀបចំរូបភាពចូលទៅក្នុង Picture Frames។', desc_en: 'Build formatted data tables and drop images perfectly into Picture Frames.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'Picture Frames៖ បង្កើតកន្លែងត្រៀមដាក់រូប និង Place រូបភាពចូល។', english: 'Picture Frames: Create placeholders and "Place" images inside.', videoUrl: '' },
        { id: 2, khmer: 'Assets Studio៖ រក្សាទុក Logo និងឯកសាររចនាដើម្បីទាញប្រើពេលក្រោយ។', english: 'The Assets Studio: Store logos and design elements for quick use.', videoUrl: '' },
        { id: 3, khmer: 'Table Tool៖ ការសាងសង់ និងរៀបចំតារាងទិន្នន័យ (ពណ៌ គែម និងអក្សរ)។', english: 'Table Tool: Build data tables with custom cell borders and fills.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb6', title: 'មេរៀនទី ៦៖ ឧបករណ៍បោះពុម្ពកម្រិតខ្ពស់', title_en: 'Lesson 6: Advanced Publishing Tools', 
      desc: 'បង្កើតមាតិកាសៀវភៅដោយស្វ័យប្រវត្តិ និងប្រើប្រាស់ Preflight Studio។', desc_en: 'Generate a Table of Contents automatically and use the Preflight Studio.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'Section Manager៖ រៀបចំឯកសារជាជំពូក ឬផ្នែកៗ។', english: 'Section Manager: Organize a large document into chapters.', videoUrl: '' },
        { id: 2, khmer: 'មាតិកា និង Index៖ បង្កើតតារាងមាតិកាដោយស្វ័យប្រវត្តិ។', english: 'TOC & Indexing: Automatically generate a Table of Contents.', videoUrl: '' },
        { id: 3, khmer: 'Preflight Studio៖ ត្រួតពិនិត្យកំហុសមុននឹង Export (ដូចជារូបភាពបែក)។', english: 'Preflight Studio: Monitor for errors like low-resolution images.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb7', title: 'គម្រោងទី ១៖ អត្ថបទចុះទស្សនាវដ្តី', title_en: 'Project 1: Magazine Feature Article', 
      desc: 'រៀបចំប្លង់អត្ថបទសម្រាប់ទស្សនាវដ្តី ដែលមានរូបភាពធំ ចំណងជើង និងអត្ថបទ ៣ ជួរ។', desc_en: 'Create a feature article with a hero image, headline, and three text columns.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ រចនាអត្ថបទជាមួយរូបភាពធំ និងអត្ថបទជាជួរៗ។', english: 'Goal: Create an article layout with hero image and columns.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ការកំណត់ Text Wrap ជុំវិញរូបភាព និងការប្រើ Drop Caps។', english: 'Key Skill: Mastering Text Wrap around images and Drop Caps.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb8', title: 'គម្រោងទី ២៖ Corporate Brochure ៨ ទំព័រ', title_en: 'Project 2: Corporate Brochure', 
      desc: 'រចនាខិត្តប័ណ្ណ (Brochure) ៨ ទំព័រ ដោយប្រើ Global Colors និង Master Pages។', desc_en: 'Design an 8-page brochure utilizing Global Colors and multiple Master Pages.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ រចនា Brochure ដែលមាន ៨ ទំព័រ។', english: 'Goal: Design an 8-page brochure using two Master Pages.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ការគ្រប់គ្រងពណ៌ប្រេន (Global Colors) ឱ្យបានច្បាស់លាស់។', english: 'Key Skill: Managing consistent branding with Global Colors.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb9', title: 'គម្រោងទី ៣៖ Digital Planner អន្តរកម្ម', title_en: 'Project 3: Digital Interactive Planner', 
      desc: 'បង្កើតសៀវភៅផែនការប្រចាំខែ (Digital Planner) ជា PDF ដែលអាចចុច Link បាន។', desc_en: 'Create a monthly PDF planner with functional hyperlinks and complex tabs.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ បង្កើត Digital Planner ជា PDF ដែលអាចចុចបាន។', english: 'Goal: Create a monthly planner with functional hyperlinks.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ការប្រើប្រាស់ Hyperlinks Studio និង Master Page Stacking។', english: 'Key Skill: Using the Hyperlinks Studio and Master Page Stacking.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb10', title: 'គម្រោងទី ៤៖ ការរៀបចំប្លង់សៀវភៅអាជីព', title_en: 'Project 4: Professional Book Layout', 
      desc: 'រៀបចំប្លង់សៀវភៅដែលមានលេខរៀងទំព័រស្វ័យប្រវត្តិ និង Export ជា PDF សម្រាប់ការបោះពុម្ព។', desc_en: 'Layout a short chapter book with automated page numbers and Print PDF/X-4 export.', 
      instruction: defaultInstruction, instruction_en: defaultInstructionEn, downloadUrl: defaultDownloadUrl,
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ រៀបចំប្លង់សៀវភៅរួមមាន ក្រប មាតិកា និងលេខទំព័រ។', english: 'Goal: Layout a book including cover, TOC, and page numbers.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ការប្រើ Books Panel និងការ Export ជា PDF សម្រាប់បោះពុម្ព (PDF/X-4)។', english: 'Key Skill: Using the Books Panel and Exporting for Print (PDF/X-4).', videoUrl: '' }
      ]
    }
  ]
};

// 🌟 AFFINITY IPAD MASTERCLASS EXAM QUESTIONS 🌟
export const initialQuestionBank = [
    // --- AFFINITY PHOTO (app: 'photo') ---
    { id: 1, app: 'photo', level: 'beginner', correct: 1,
      question: "តើកាយវិការ (Gesture) មួយណានៅលើ iPad សម្រាប់ប្រើដើម្បី Undo ក្នុង Affinity Photo?", 
      question_en: "Which iPad gesture is used to Undo in Affinity Photo?", 
      options: ["អូសម្រាមដៃបីចុះក្រោម", "ប៉ះម្រាមដៃពីរលើអេក្រង់ព្រមគ្នា (Two-finger tap)", "អូសម្រាមដៃពីរទៅឆ្វេង", "ចុចឱ្យជាប់លើអេក្រង់"], 
      options_en: ["Three-finger swipe down", "Two-finger tap", "Two-finger swipe left", "Long press on the screen"] 
    },
    { id: 2, app: 'photo', level: 'beginner', correct: 0,
      question: "តើ Persona មួយណាដែលត្រូវប្រើសម្រាប់កែពណ៌រូបភាព RAW ដោយមិនខូចសាច់រូបដើម?", 
      question_en: "Which Persona is used for non-destructive RAW image processing?", 
      options: ["Develop Persona", "Photo Persona", "Liquify Persona", "Export Persona"], 
      options_en: ["Develop Persona", "Photo Persona", "Liquify Persona", "Export Persona"] 
    },
    { id: 3, app: 'photo', level: 'intermediate', correct: 1,
      question: "តើឧបករណ៍មួយណាដែលល្អបំផុតសម្រាប់លុបមុន ឬស្នាមតូចៗចេញពីស្បែកមុខ?", 
      question_en: "Which tool is best for removing blemishes or small spots from skin?", 
      options: ["Eraser Tool", "Inpainting Brush Tool", "Paint Brush Tool", "Dodge Tool"], 
      options_en: ["Eraser Tool", "Inpainting Brush Tool", "Paint Brush Tool", "Dodge Tool"] 
    },
    { id: 4, app: 'photo', level: 'intermediate', correct: 2,
      question: "តើ Layer Mask មានតួនាទីអ្វី?", 
      question_en: "What is the function of a Layer Mask?", 
      options: ["ប្តូរពណ៌រូបភាពទៅជាសខ្មៅ", "លុបរូបចោលជារៀងរហូត", "លាក់ (Hide) ឬ បង្ហាញ (Reveal) ផ្នែកខ្លះនៃ Layer ដោយមិនលុបសាច់រូប", "ធ្វើឱ្យរូបភាពច្បាស់ជាងមុន"], 
      options_en: ["Turns the image black and white", "Deletes pixels permanently", "Hides or reveals parts of a layer non-destructively", "Sharpens the image"] 
    },
    { id: 5, app: 'photo', level: 'advanced', correct: 1,
      question: "តើបច្ចេកទេស Frequency Separation បំបែករូបភាពជាអ្វីខ្លះ?", 
      question_en: "What does the Frequency Separation technique split an image into?", 
      options: ["បំបែកពណ៌ក្រហម និងពណ៌ខៀវ", "បំបែក វាយនភាពស្បែក (High) និង ពណ៌/ពន្លឺ (Low)", "បំបែក Background និង Foreground", "បំបែក ពន្លឺ (Highlights) និង ស្រមោល (Shadows)"], 
      options_en: ["Splits red and blue colors", "Splits Skin Texture (High) and Tone/Color (Low)", "Splits Background and Foreground", "Splits Highlights and Shadows"] 
    },

    // --- AFFINITY DESIGNER (app: 'designer') ---
    { id: 6, app: 'designer', level: 'beginner', correct: 1,
      question: "តើចំណុចពិសេសរបស់ Affinity Designer គឺអ្វី?", 
      question_en: "What is the unique core feature of Affinity Designer?", 
      options: ["សម្រាប់កាត់តវីដេអូ", "ការធ្វើការរវាង Vector និង Pixel ក្នុងកម្មវិធីតែមួយ", "សម្រាប់សរសេរកូដ Website", "សម្រាប់តែគូររូប 3D ប៉ុណ្ណោះ"], 
      options_en: ["Video editing", "Seamless switching between Vector and Pixel workspaces", "Coding websites", "Only for 3D modeling"] 
    },
    { id: 7, app: 'designer', level: 'beginner', correct: 2,
      question: "ប្រសិនបើអ្នកចង់បង្កើតរាងព្រះច័ន្ទចំណិត តើអ្នកគួរប្រើឧបករណ៍មួយណាឱ្យលឿនបំផុត?", 
      question_en: "If you want to create a crescent moon shape, which tool is the fastest?", 
      options: ["Pen Tool", "Pencil Tool", "Crescent Shape Tool (ក្នុងបញ្ជី Parametric Shapes)", "Brush Tool"], 
      options_en: ["Pen Tool", "Pencil Tool", "Crescent Shape Tool (Parametric Shapes)", "Brush Tool"] 
    },
    { id: 8, app: 'designer', level: 'intermediate', correct: 0,
      question: "តើ Shape Builder Tool ប្រើសម្រាប់អ្វី?", 
      question_en: "What is the Shape Builder Tool used for?", 
      options: ["អូសកាត់រូបរាងដែលត្រួតគ្នា ដើម្បីបង្កើតជារូបរាងថ្មី", "សម្រាប់លុប Background", "សម្រាប់វាស់ទំហំរូបភាព", "សម្រាប់ប្តូរពណ៌រូប"], 
      options_en: ["Dragging across overlapping shapes to instantly merge or subtract them into new shapes", "Removing backgrounds", "Measuring image size", "Changing image colors"] 
    },
    { id: 9, app: 'designer', level: 'intermediate', correct: 1,
      question: "ពេលកំពុងប្រើ Pen Tool លើ iPad តើអ្នកត្រូវធ្វើដូចម្តេចដើម្បីបំបែក (Break) ទិសដៅនៃខ្សែកោង?", 
      question_en: "While using the Pen Tool on iPad, how do you break the handle direction of a curve?", 
      options: ["ចុចម្រាមដៃបី", "ប្រើ Command Controller (ចុច Option/Alt)", "អូសចុះក្រោម", "មិនអាចធ្វើបានទេនៅលើ iPad"], 
      options_en: ["Three-finger tap", "Use the Command Controller (hold Option/Alt)", "Swipe down", "It cannot be done on iPad"] 
    },
    { id: 10, app: 'designer', level: 'advanced', correct: 1,
      question: "តើ Isometric Grid សាកសមបំផុតសម្រាប់គូរអ្វី?", 
      question_en: "What is the Isometric Grid best suited for drawing?", 
      options: ["គូររូបមនុស្ស", "គូរទិដ្ឋភាព ឬវត្ថុ 3D ដែលគ្មានចំណុចរួមតូច (Vanishing point)", "គូរឡូហ្គោអក្សរ", "គូររូបថតធម្មជាតិ"], 
      options_en: ["Drawing portraits", "Drawing 3D scenes or objects without a vanishing point perspective", "Drawing text logos", "Painting landscapes"] 
    },

    // --- AFFINITY PUBLISHER (app: 'publisher') ---
    { id: 11, app: 'publisher', level: 'beginner', correct: 2,
      question: "តើមុខងារ StudioLink នៅក្នុង Publisher អនុញ្ញាតឱ្យអ្នកធ្វើអ្វី?", 
      question_en: "What does the StudioLink feature in Publisher allow you to do?", 
      options: ["ភ្ជាប់ទៅកាន់អ៊ីនធឺណិត", "លេងហ្គេម", "ប្រើប្រាស់ Tools របស់ Photo និង Designer ដោយមិនបាច់បិទកម្មវិធី", "ផ្ញើសារទៅកាន់អ្នកផ្សេង"], 
      options_en: ["Connect to the internet", "Play games", "Use Photo and Designer tools seamlessly without leaving Publisher", "Send messages to others"] 
    },
    { id: 12, app: 'publisher', level: 'beginner', correct: 1,
      question: "តើ Master Pages ប្រើសម្រាប់អ្វី?", 
      question_en: "What are Master Pages used for?", 
      options: ["សម្រាប់ព្រីនចេញ", "សម្រាប់ដាក់ធាតុ (ដូចជាលេខទំព័រ ឬ Header) ដែលត្រូវបង្ហាញស្ទួនៗគ្នានៅលើទំព័រច្រើន", "សម្រាប់សរសេរកូដ", "សម្រាប់គូររូបភាពកាតូន"], 
      options_en: ["For printing out", "Placing repeating elements (like page numbers or headers) automatically across multiple pages", "Writing code", "Drawing cartoons"] 
    },
    { id: 13, app: 'publisher', level: 'intermediate', correct: 0,
      question: "តើអ្វីទៅជាមុខងាររបស់ Text Flow?", 
      question_en: "What is the function of Text Flow (Linked Text Frames)?", 
      options: ["អនុញ្ញាតឱ្យអត្ថបទហូរពីប្រអប់មួយ ទៅប្រអប់មួយទៀត ទោះនៅទំព័រផ្សេងគ្នាក៏ដោយ", "ធ្វើឱ្យអក្សរមានចលនា", "ប្តូរពណ៌អក្សរដោយស្វ័យប្រវត្តិ", "បកប្រែភាសា"], 
      options_en: ["Allows long text to continuously pour from one frame into another, even across different pages", "Animates the text", "Changes text colors automatically", "Translates languages"] 
    },
    { id: 14, app: 'publisher', level: 'intermediate', correct: 1,
      question: "ហេតុអ្វីបានជាយើងគួរប្រើ Paragraph Styles?", 
      question_en: "Why should you use Paragraph Styles?", 
      options: ["ព្រោះវាធ្វើឱ្យ File ស្រាល", "ដើម្បីគ្រប់គ្រង និងផ្លាស់ប្តូរទម្រង់ហ្វុន (Font) នៅទូទាំងឯកសារទាំងមូលដោយចុចតែម្តង", "ដើម្បីដាក់រូបភាព", "គ្មានប្រយោជន៍ទេ"], 
      options_en: ["It makes the file lighter", "To globally control and instantly update font formatting across the entire 100-page document with one click", "To place images", "It is useless"] 
    },
    { id: 15, app: 'publisher', level: 'advanced', correct: 2,
      question: "តើ Preflight Studio មានតួនាទីអ្វីមុនពេលអ្នក Export សៀវភៅ?", 
      question_en: "What is the role of the Preflight Studio before exporting a book?", 
      options: ["គណនាតម្លៃសៀវភៅ", "ដាក់លេខកូដសម្ងាត់", "ត្រួតពិនិត្យរកកំហុស ដូចជារូបភាពបែក ឬអក្សរហៀរចេញពីប្រអប់", "ប្តូរភាសាសៀវភៅ"], 
      options_en: ["Calculates book price", "Adds a password", "Scans the document for live errors like low-resolution images or overflowing text frames", "Changes the book language"] 
    }
];