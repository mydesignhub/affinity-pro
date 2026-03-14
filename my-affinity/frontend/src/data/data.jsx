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

// 🌟 MICRO-LEARNING COURSE DATA 🌟
export const courseData = {
  photo: [
    { 
      id: 'ph1', 
      title: 'មេរៀនទី ១៖ ការចាប់ផ្តើម និងផ្ទៃការងារ', 
      title_en: 'Lesson 1: Getting Started & Workspace', 
      desc: 'ស្ទាត់ជំនាញលើ Home Screen, កាយវិការបញ្ជា (Touch Gestures) និង Command Controller។', 
      desc_en: 'Master the iPad Home Screen, touch gestures, and the Command Controller.', 
      steps: [
        { id: 1, khmer: 'Home Screen៖ រៀនពីការគ្រប់គ្រង "Live Docs" និងការរៀបចំគម្រោងការងារ។', english: 'The Home Screen: Learn to manage "Live Docs" and organize work.', videoUrl: 'https://www.youtube.com/embed/SdIxhfX_XyU' },
        { id: 2, khmer: 'កាយវិការបញ្ជា (Touch Gestures)៖ ប្រើម្រាមពីរដើម្បី Undo, ម្រាមបីដើម្បី Redo និងការចាប់ពង្រីក។', english: 'Touch Gestures: Master two-finger undo, three-finger redo, and pinching.', videoUrl: '' },
        { id: 3, khmer: 'ផ្ទៃកម្មវិធី (Interface)៖ ស្វែងយល់ពី Tools, Studios និង Contextual Toolbar។', english: 'Interface Layout: Navigate Tools, Studios, and the Contextual Toolbar.', videoUrl: '' },
        { id: 4, khmer: 'ឧបករណ៍លើ iPad៖ ការប្រើប្រាស់ Command Controller និង Quick Menu។', english: 'iPad-Specific Tools: Use the Command Controller and Quick Menu.', videoUrl: '' }
      ]
    },
    { 
      id: 'ph2', 
      title: 'មេរៀនទី ២៖ មូលដ្ឋាននៃការកែរូបថត', 
      title_en: 'Lesson 2: Fundamental Photo Editing', 
      desc: 'ការនាំចូលឯកសារ RAW, ការកាត់តម្រឹម និងការប្រើប្រាស់ Develop Persona។', 
      desc_en: 'Import RAW files, crop, and master the non-destructive Develop Persona.', 
      steps: [
        { id: 1, khmer: 'ការនាំចូល និងការដាក់រូបភាព៖ អូសទាញរូបភាព ឬប្រើម៉ឺនុយ Place។', english: 'Importing & Placement: Drag and drop images or use the Place menu.', videoUrl: '' },
        { id: 2, khmer: 'កាត់ និងតម្រឹម៖ ប្រើ Crop tool និងតម្រង់ប្លង់ផ្តេក (Horizon) ឱ្យត្រង់។', english: 'Crop & Straighten: Use the Crop tool and straighten horizons.', videoUrl: '' },
        { id: 3, khmer: 'Develop Persona៖ ការកែតម្រូវពន្លឺ និងស្រមោលលើឯកសារ RAW ដោយមិនខូចគុណភាពដើម។', english: 'The Develop Persona: Non-destructive adjustments to RAW files.', videoUrl: '' },
        { id: 4, khmer: 'ការលុបស្នាម៖ ប្រើ Inpainting និង Spot Healing ដើម្បីលុបមុន ឬវត្ថុមិនចង់បាន។', english: 'Basic Retouching: Use Inpainting and Spot Healing for blemishes.', videoUrl: '' }
      ]
    },
    { 
      id: 'ph3', 
      title: 'មេរៀនទី ៣៖ Layers, Masks និងការកែពណ៌', 
      title_en: 'Lesson 3: Layers, Masks & Adjustments', 
      desc: 'គ្រប់គ្រង Pixel និង Vector Layers, ការស៊ិចឡិច (Selections) និង Live Filters។', 
      desc_en: 'Control pixel and vector layers, smart selections, and live filters.', 
      steps: [
        { id: 1, khmer: 'ការគ្រប់គ្រង Layer៖ ស្វែងយល់ពី Pixel, Vector និង Text layers។', english: 'Layer Management: Understand pixel, vector, and text layers.', videoUrl: '' },
        { id: 2, khmer: 'Selections៖ ប្រើ Smart Selection Brush និង Refine Edge ដើម្បីកាត់សក់។', english: 'Selections: Use the Smart Selection Brush and Refine Edge.', videoUrl: '' },
        { id: 3, khmer: 'ការកែពណ៌ (Adjustments)៖ ប្រើ Curves, Levels និង HSL layers ដែលអាចកែប្រែបានគ្រប់ពេល។', english: 'Non-Destructive Adjustments: Apply Curves, Levels, and HSL layers.', videoUrl: '' },
        { id: 4, khmer: 'Masking៖ ប្រើ Mask Layers ដើម្បីលាក់ផ្នែកខ្លះនៃរូបភាព។', english: 'Masking: Use Mask Layers to hide parts of an image.', videoUrl: '' }
      ]
    },
    { 
      id: 'ph4', 
      title: 'មេរៀនទី ៤៖ ការផ្គុំរូប និង Export ឯកសារ', 
      title_en: 'Lesson 4: Creative Projects & Exporting', 
      desc: 'បន្ថែម Effect អក្សរ, Blend Modes និងការ Export ឯកសារចុងក្រោយ។', 
      desc_en: 'Add text effects, blend modes, and export slices for final delivery.', 
      steps: [
        { id: 1, khmer: 'ការបន្ថែមអក្សរ និង FX៖ ប្រើ Text tool និង FX Studio សម្រាប់ដាក់ស្រមោល និងគែម។', english: 'Adding Text & FX: Use the Text tool and FX Studio for outlines.', videoUrl: '' },
        { id: 2, khmer: 'Compositing៖ ផ្គុំរូបភាពដោយប្រើ Blend Modes (Multiply, Screen) ឱ្យស៊ីសង្វាក់គ្នា។', english: 'Compositing: Combine assets using Blend Modes (Multiply, Screen).', videoUrl: '' },
        { id: 3, khmer: 'Export Persona៖ Export ជា JPEG, PNG ឬ TIFF ជាមួយនឹងការគ្រប់គ្រងទំហំ។', english: 'Export Persona: Export in JPEG, PNG, or TIFF with slice control.', videoUrl: '' }
      ]
    },
    { 
      id: 'ph5', 
      title: 'មេរៀនទី ៥៖ ក្បួនកែស្បែក Portrait អាជីព', 
      title_en: 'Lesson 5: Professional Portrait Retouch', 
      desc: 'ស្ទាត់ជំនាញបច្ចេកទេស Frequency Separation និង Dodge & Burn សម្រាប់ការកែរូប Portrait។', 
      desc_en: 'Master Frequency Separation and non-destructive dodging and burning.', 
      steps: [
        { id: 1, khmer: 'Frequency Separation៖ បំបែករូបភាពជា High/Low frequency ដើម្បីកែស្បែកឱ្យម៉ដ្ឋ។', english: 'Frequency Separation: Split image into High/Low frequency for skin smoothing.', videoUrl: '' },
        { id: 2, khmer: 'Dodge and Burn៖ បន្ថែមពន្លឺ និងស្រមោលដើម្បីបង្កើតទម្រង់មុខឱ្យកាន់តែលេចធ្លោ។', english: 'Dodge and Burn: Selectively lighten and darken areas to add contouring.', videoUrl: '' },
        { id: 3, khmer: 'ភ្នែក និងធ្មេញ៖ ធ្វើឱ្យកែវភ្នែកភ្លឺ និងធ្មេញសបែបធម្មជាតិ។', english: 'Eyes and Teeth: Enhance iris clarity and whiten teeth naturally.', videoUrl: '' },
        { id: 4, khmer: 'ការលុបស្នាមលម្អិត៖ ប្រើ Inpainting លើ High-frequency layer ឱ្យម៉ដ្ឋខៃ។', english: 'Detail Refinement: Use Inpainting on the high-frequency layer.', videoUrl: '' }
      ]
    },
    { 
      id: 'ph6', 
      title: 'មេរៀនទី ៦៖ ក្បួនកាត់តរូបភាពកម្រិតខ្ពស់', 
      title_en: 'Lesson 6: Advanced Digital Compositing', 
      desc: 'បង្កើតទស្សនីយភាពដោយការផ្គុំរូបភាពច្រើនផ្ទាំងបញ្ចូលគ្នា (Compositing) ឱ្យមើលទៅដូចពិតៗ។', 
      desc_en: 'Create seamless multi-asset scenes with realistic atmospheric effects.', 
      steps: [
        { id: 1, khmer: 'ការរួមបញ្ចូលរូបភាព៖ នាំចូល និងចាត់ចែងរូបភាពជាច្រើនផ្ទាំង។', english: 'Asset Integration: Import and place multiple images.', videoUrl: '' },
        { id: 2, khmer: 'Complex Masking៖ កាត់សក់ ឬគែមស្មុគស្មាញឱ្យបានសុក្រិត។', english: 'Complex Masking: Refine hair or fine edges accurately.', videoUrl: '' },
        { id: 3, khmer: 'ពន្លឺ និងស្រមោល៖ បង្កើតស្រមោលដោយប្រើ Live Gaussian Blur។', english: 'Global Lighting & Shading: Create shadows using Live Gaussian Blur.', videoUrl: '' },
        { id: 4, khmer: 'Effect បរិយាកាស៖ ប្រើ Mesh Warp និង LUTs ដើម្បីបង្រួបបង្រួមពណ៌។', english: 'Atmospheric Effects: Apply Mesh Warp and LUTs to unify colors.', videoUrl: '' }
      ]
    },
    { 
      id: 'ph7', 
      title: 'គម្រោងទី ១៖ Product Mockup អាជីវកម្ម', 
      title_en: 'Project 1: Commercial Product Mockup', 
      desc: 'ដាក់ Pattern ទៅលើវត្ថុ 3D ដោយប្រើប្រាស់ Blend Modes។', 
      desc_en: 'Place a custom pattern onto a 3D-looking object using Blend Modes.', 
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ ដាក់ Pattern រចនាផ្ទាល់ខ្លួនទៅលើវត្ថុ 3D ដូចជាកែវ ឬដប។', english: 'Goal: Place a custom pattern onto a 3D-looking object.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ប្រើ Clipping Masks និង Blend Modes ដើម្បីរក្សាស្រមោលដើម។', english: 'Key Skill: Master Clipping Masks and Blend Modes to preserve shadows.', videoUrl: '' }
      ]
    },
    { 
      id: 'ph8', 
      title: 'គម្រោងទី ២៖ ទស្សនីយភាព Dark Angel', 
      title_en: 'Project 2: Fantasy Dark Angel', 
      desc: 'បង្កើតទស្សនីយភាពបែប Cinematic ដោយផ្គុំរូបភាពយ៉ាងតិច ៥ ផ្ទាំង។', 
      desc_en: 'Create a cinematic scene combining at least 5 different image assets.', 
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ បង្កើតផ្ទាំងទស្សនីយភាពបែបភាពយន្ត។', english: 'Goal: Create a dramatic scene using multiple assets.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ប្រើ Adjustment Layers និង Brush Tools ដើម្បីគូរពន្លឺ។', english: 'Key Skill: Use Adjustment Layers and Brush Tools to paint highlights manually.', videoUrl: '' }
      ]
    },
    { 
      id: 'ph9', 
      title: 'គម្រោងទី ៣៖ ប្លង់សៀវភៅ Comic', 
      title_en: 'Project 3: Digital Comic Page', 
      desc: 'បំប្លែងរូបថតធម្មតាឱ្យទៅជារូបគំនូរបែបសៀវភៅ Comic។', 
      desc_en: 'Transform a standard photo into a stylized comic book illustration.', 
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ ប្រែក្លាយរូបថតទៅជាគំនូរ Comic។', english: 'Goal: Transform a photo into a comic illustration.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ប្រើ Pen Tool, Text Studio និង Live Filters (Halftone)។', english: 'Key Skill: Use the Pen Tool, Text Studio, and Live Filters (Halftone).', videoUrl: '' }
      ]
    },
    { 
      id: 'ph10', 
      title: 'គម្រោងទី ៤៖ ទាញយកចំណាប់អារម្មណ៍ YouTube', 
      title_en: 'Project 4: Social Media Thumbnail', 
      desc: 'រចនា Thumbnail សម្រាប់ YouTube ដែលទាក់ទាញភ្នែកខ្លាំង។', 
      desc_en: 'Design a high-impact YouTube thumbnail with bold typography and Layer FX.', 
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ រចនា YouTube Thumbnail ដែលទាក់ទាញភ្នែក។', english: 'Goal: Design a high-impact YouTube thumbnail.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ បញ្ចូលគ្នានូវ Smart Selections, Fill Layers និង Layer FX លើអក្សរ។', english: 'Key Skill: Combine Smart Selections, Fill Layers, and bold Layer FX.', videoUrl: '' }
      ]
    }
  ],
  designer: [
    { 
      id: 'ds1', 
      title: 'មេរៀនទី ១៖ ទម្លាប់ Vector និងផ្ទៃការងារ', 
      title_en: 'Lesson 1: The Vector Mindset & UI', 
      desc: 'ការផ្លាស់ប្តូរ Personas, ការរៀបចំ Artboards និងកាយវិការបញ្ជាសម្រាប់ Vector។', 
      desc_en: 'Switch between Personas, set up Artboards, and master vector gestures.', 
      steps: [
        { id: 1, khmer: 'Personas ទាំងបី៖ Designer (Vector), Pixel (Raster) និង Export។', english: 'The Three Personas: Designer (Vector), Pixel (Raster), and Export.', videoUrl: '' },
        { id: 2, khmer: 'Canvas៖ ការរៀបចំ Artboards សម្រាប់គម្រោងមានទំព័រច្រើន។', english: 'The Canvas: Setting up Artboards for multi-page projects.', videoUrl: '' },
        { id: 3, khmer: 'ការបញ្ជាកាយវិការ៖ ម្រាមពីរ Undo, Quick Menu និង Command Controller។', english: 'Gesture Mastery: Two-finger undo, Quick Menu, and Command Controller.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds2', 
      title: 'មេរៀនទី ២៖ ធរណីមាត្រ និង Shape Builder', 
      title_en: 'Lesson 2: Geometry & Shape Builder', 
      desc: 'បង្កើតរូបរាងស្មុគស្មាញដោយប្រើ Boolean operations និង Shape Builder។', 
      desc_en: 'Create complex forms intuitively using Boolean operations and the Shape Builder.', 
      steps: [
        { id: 1, khmer: 'រូបរាងមូលដ្ឋាន (Shapes)៖ ការប្រើប្រាស់ឧបករណ៍ Cog, Star និង Donut។', english: 'Parametric Shapes: Using the Cog, Star, and Donut tools.', videoUrl: '' },
        { id: 2, khmer: 'Boolean Operations៖ ការបូក ដក និងប្រសព្វរូបរាងចូលគ្នា។', english: 'Boolean Operations: Joining, subtracting, and intersecting shapes.', videoUrl: '' },
        { id: 3, khmer: 'Shape Builder Tool៖ ការ "ផាត់" កាត់រូបរាងដែលត្រួតគ្នាដើម្បីបង្កើតរូបរាងថ្មី។', english: 'The Shape Builder Tool: "Painting" across overlapping shapes.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds3', 
      title: 'មេរៀនទី ៣៖ Pen Tool និង Node Tool', 
      title_en: 'Lesson 3: The Pen & Node Tools', 
      desc: 'ស្ទាត់ជំនាញលើខ្សែបន្ទាត់កោង Bézier, ការកែប្រែ Node និង Knife Tool។', 
      desc_en: 'Master Bézier curves, node conversion, and the vector Knife Tool.', 
      steps: [
        { id: 1, khmer: 'ភាពសុក្រិតរបស់ Pen Tool៖ របៀបចុចទាញ (click-drag) សម្រាប់ខ្សែកោង។', english: 'Pen Tool Precision: "Click-drag" for curves and Alt/Option modifiers.', videoUrl: '' },
        { id: 2, khmer: 'Node Tool៖ ការបំប្លែង Nodes (Sharp, Smooth, Smart)។', english: 'Node Tool: Converting nodes (Sharp, Smooth, Smart).', videoUrl: '' },
        { id: 3, khmer: 'Knife Tool៖ ការកាត់ផ្តាច់ Vector ដើម្បីបង្កើតបំណែក។', english: 'Knife Tool: Slicing through objects to create organic breaks.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds4', 
      title: 'មេរៀនទី ៤៖ ពណ៌, Gradients និង Appearance', 
      title_en: 'Lesson 4: Color, Gradients & Appearance', 
      desc: 'ការរៀបចំស្តាយល៍ Stroke និង Fill ច្រើនជាន់ដោយប្រើ Appearance Studio។', 
      desc_en: 'Stack multiple strokes and fills using the powerful Appearance Studio.', 
      steps: [
        { id: 1, khmer: 'Fill & Stroke៖ ការគ្រប់គ្រងកម្រាស់បន្ទាត់ និងក្បាលព្រួញ។', english: 'Fill & Stroke: Managing line weights and pressure profiles.', videoUrl: '' },
        { id: 2, khmer: 'Gradient Tool៖ ការចាក់ពណ៌រលាយ (Linear, Radial, Conical)។', english: 'The Gradient Tool: Applying linear, radial, and conical fills.', videoUrl: '' },
        { id: 3, khmer: 'Appearance Studio៖ ការបន្ថែម Strokes និង Fills ជាច្រើនជាន់លើវត្ថុតែមួយ។', english: 'Appearance Studio: Adding Multiple Strokes to a single object.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds5', 
      title: 'មេរៀនទី ៥៖ អក្សរ និង Vector Assets', 
      title_en: 'Lesson 5: Typography & Vector Assets', 
      desc: 'ការសរសេរអក្សរតាមខ្សែបន្ទាត់កោង និងបង្កើត Asset library ដើម្បីប្រើប្រាស់ឡើងវិញ។', 
      desc_en: 'Flow text along curved paths and build a reusable Asset library.', 
      steps: [
        { id: 1, khmer: 'Artistic vs Frame Text៖ ការប្រើប្រាស់អក្សរចំណងជើង និងអត្ថបទវែង។', english: 'Artistic vs. Frame Text: Scaling headlines vs. wrapping body copy.', videoUrl: '' },
        { id: 2, khmer: 'Path Text៖ ការសរសេរអក្សរឱ្យរត់តាមខ្សែបន្ទាត់ Vector កោង។', english: 'Path Text: Flowing words along a curved vector line.', videoUrl: '' },
        { id: 3, khmer: 'Assets Studio៖ ការចងក្រងបណ្តុំ Icons និងឯកសារដើម្បីទាញប្រើលឿន។', english: 'The Assets Studio: Creating a library of reusable icons.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds6', 
      title: 'មេរៀនទី ៦៖ ការបញ្ជូលគ្នាជាមួយ Pixel Persona', 
      title_en: 'Lesson 6: The Pixel Persona Integration', 
      desc: 'ការបន្ថែមភាពគ្រើម (Textures) ទៅលើរូប Vector ដោយប្រើ Pixel Persona។', 
      desc_en: 'Add raster textures, grain, and gritty brushes to clean vector shapes.', 
      steps: [
        { id: 1, khmer: 'Hybrid Workflow៖ ផ្លាស់ប្តូរទៅកាន់ Pixel Persona ដើម្បីបន្ថែម Texture និងជក់។', english: 'Hybrid Workflow: Switch to Pixel Persona to add texture and grain.', videoUrl: '' },
        { id: 2, khmer: 'Vector Masking៖ ការប្រើប្រាស់ Vector ដើម្បីកាត់ ឬលាក់ផ្នែកខ្លះនៃរូបភាព Pixel។', english: 'Vector Masking: Using vector shapes to "clip" raster images inside.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds7', 
      title: 'គម្រោងទី ១៖ Flat Icon បែប Minimalist', 
      title_en: 'Project 1: Minimalist Flat Icon Set', 
      desc: 'រចនា Icon បែប Flat ចំនួន ៥ ដោយប្រើត្រឹមតែរូបរាងមូលដ្ឋាន (Basic Shapes)។', 
      desc_en: 'Design 5 cohesive icons using only basic geometric shapes.', 
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ រចនា Icon ចំនួន ៥ ដោយប្រើ Shape Builder។', english: 'Goal: Design 5 icons using basic shapes and the Shape Builder.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ការគ្រប់គ្រងភាពស៊ីមេទ្រី (Symmetry) និង Transform Studio។', english: 'Key Skill: Mastering symmetry and the Transform Studio.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds8', 
      title: 'គម្រោងទី ២៖ ការរចនា Logo អាជីព', 
      title_en: 'Project 2: Professional Logo & Branding', 
      desc: 'គូរព្រាង និងប្រែក្លាយ Logo ទៅជា Vector ដោយប្រើប្រាស់ Pen Tool។', 
      desc_en: 'Vectorize a logo using the Pen Tool based on a hand-drawn sketch import.', 
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ បង្កើត Logo បែប Vector ដោយផ្អែកលើគំនូរព្រាងដោយដៃ។', english: 'Goal: Create a vectorized logo from a sketch.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ការគ្រប់គ្រង Node, ការសម្រួលខ្សែបន្ទាត់ និងការ Export ជា SVG។', english: 'Key Skill: Node management, path simplification, and SVG export.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds9', 
      title: 'គម្រោងទី ៣៖ ប្លង់បន្ទប់បែប Isometric', 
      title_en: 'Project 3: Isometric Room Illustration', 
      desc: 'បង្កើតរូបគំនូរបន្ទប់ 3D ដោយប្រើប្រាស់ Isometric Grid និង Axonometric Panel។', 
      desc_en: 'Build a 3D-looking room using the Isometric Grid and Axonometric Panel.', 
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ បង្កើតទិដ្ឋភាពបន្ទប់ 3D ដោយប្រើ Isometric Grid។', english: 'Goal: Build a 3D-looking room using the Isometric Grid.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ការប្រើប្រាស់ Axonometric Panel ដើម្បីចាប់ (Snap) រាងចូលប្លង់ 3D។', english: 'Key Skill: Using the Axonometric Panel to snap shapes to 3D.', videoUrl: '' }
      ]
    },
    { 
      id: 'ds10', 
      title: 'គម្រោងទី ៤៖ Poster ទាក់ទាញបែប Vector', 
      title_en: 'Project 4: High-Impact Vector Poster', 
      desc: 'រចនា Poster ដោយបញ្ចូលគ្នានូវ Path Text និង Stock Image masking។', 
      desc_en: 'Design a print-ready poster combining Path Text and Stock Image masking.', 
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ រចនា Poster ដោយបញ្ចូល Path Text និង Masking។', english: 'Goal: Design a poster combining Path Text and Stock masking.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ការរៀបចំប្លង់ និងការ Export សម្រាប់បោះពុម្ព (PDF)។', english: 'Key Skill: Advanced layering and Export Persona for PDFs.', videoUrl: '' }
      ]
    }
  ],
  publisher: [
    { 
      id: 'pb1', 
      title: 'មេរៀនទី ១៖ ផ្ទៃការងារ និងរចនាសម្ព័ន្ធឯកសារ', 
      title_en: 'Lesson 1: Interface & Architecture', 
      desc: 'កំណត់ទំព័រ Spreads, Bleed, Margins និងប្រើប្រាស់ StudioLink នៅក្នុង Publisher។', 
      desc_en: 'Configure spreads, bleeds, margins, and utilize StudioLink directly inside Publisher.', 
      steps: [
        { id: 1, khmer: 'Home Screen៖ ការបង្កើតឯកសារសម្រាប់ Print, Web, ឬ Devices។', english: 'The Home Screen: Create presets for Print, Web, or Devices.', videoUrl: '' },
        { id: 2, khmer: 'Document Setup៖ កំណត់ Facing Pages, Bleed និង Margins។', english: 'Document Setup: Configure Facing Pages, Bleed, and Margins.', videoUrl: '' },
        { id: 3, khmer: 'Publisher Menu៖ ការផ្លាស់ប្តូរ Personas និងការប្រើប្រាស់ StudioLink។', english: 'The Publisher Icon Menu: Switch Personas and use StudioLink.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb2', 
      title: 'មេរៀនទី ២៖ Master Pages និងការរៀបចំប្លង់', 
      title_en: 'Lesson 2: Master Pages & Layout', 
      desc: 'ធ្វើស្វ័យប្រវត្តិកម្មលើ Background និង Header ដោយប្រើ Pages Studio។', 
      desc_en: 'Automate backgrounds and headers using the Pages Studio and Master linking.', 
      steps: [
        { id: 1, khmer: 'មូលដ្ឋាន Master Page៖ បង្កើតទំព័រគំរូសម្រាប់ផ្ទៃខាងក្រោយ និង Header។', english: 'Master Page Basics: Create reusable backgrounds and headers.', videoUrl: '' },
        { id: 2, khmer: 'ការប្រើប្រាស់ Masters៖ ទាញ Master page ដាក់ចូលទៅក្នុងទំព័រការងារ។', english: 'Applying Masters: Apply a master page to specific content pages.', videoUrl: '' },
        { id: 3, khmer: 'Edit Detached៖ ការកែប្រែចំណុចណាមួយនៃ Master ដោយមិនធ្វើឱ្យប៉ះពាល់ទំព័រផ្សេង។', english: 'Edit Detached: Modify a master element without breaking its link.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb3', 
      title: 'មេរៀនទី ៣៖ ប្រអប់អក្សរ និង Typography', 
      title_en: 'Lesson 3: Text Frames & Typography', 
      desc: 'ភ្ជាប់ប្រអប់អក្សរដើម្បីឱ្យអត្ថបទហូរឆ្លងកាត់ទំព័រជាច្រើនដោយស្វ័យប្រវត្តិ។', 
      desc_en: 'Link text frames to pour body copy across multiple spreads.', 
      steps: [
        { id: 1, khmer: 'Frame vs Artistic Text៖ ប្រើ Frame Text សម្រាប់អត្ថបទវែងៗ។', english: 'Frame vs. Artistic Text: Use Frame Text for large body copy.', videoUrl: '' },
        { id: 2, khmer: 'Text Flow & Linking៖ ភ្ជាប់ប្រអប់អក្សរដើម្បីឱ្យអត្ថបទហូរពីទំព័រមួយទៅទំព័រមួយទៀត។', english: 'Text Flow & Linking: Link frames so text "pours" across pages.', videoUrl: '' },
        { id: 3, khmer: 'Typography Controls៖ ការកំណត់គម្លាតអក្សរ (Tracking, Kerning)។', english: 'Typography Controls: Master tracking, kerning, and baseline shift.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb4', 
      title: 'មេរៀនទី ៤៖ Styles និងការកំណត់ទម្រង់', 
      title_en: 'Lesson 4: Styles & Formatting', 
      desc: 'បង្កើត Paragraph Styles រួម ដើម្បីធ្វើស្វ័យប្រវត្តិកម្មលើការរៀបចំ Formatting។', 
      desc_en: 'Create global Paragraph Styles to automate bullet lists and chapter formatting.', 
      steps: [
        { id: 1, khmer: 'Paragraph & Character Styles៖ ធានាភាពស៊ីសង្វាក់គ្នានៃហ្វុនអក្សរ។', english: 'Paragraph & Character Styles: Ensure consistent fonts globally.', videoUrl: '' },
        { id: 2, khmer: 'បញ្ជី (Lists)៖ ធ្វើស្វ័យប្រវត្តិកម្មលើ Bullet និងលេខរៀង។', english: 'Bullet & Numbered Lists: Automate lists using Paragraph Studio.', videoUrl: '' },
        { id: 3, khmer: 'Find & Replace៖ ស្វែងរក និងផ្លាស់ប្តូរពាក្យ ឬទម្រង់អក្សរនៅទូទាំងឯកសារ។', english: 'Find & Replace: Quickly update text or formatting document-wide.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb5', 
      title: 'មេរៀនទី ៥៖ រូបភាព, Assets និងតារាង', 
      title_en: 'Lesson 5: Images, Assets & Tables', 
      desc: 'បង្កើតតារាងទិន្នន័យ និងរៀបចំរូបភាពចូលទៅក្នុង Picture Frames។', 
      desc_en: 'Build formatted data tables and drop images perfectly into Picture Frames.', 
      steps: [
        { id: 1, khmer: 'Picture Frames៖ បង្កើតកន្លែងត្រៀមដាក់រូប និង Place រូបភាពចូល។', english: 'Picture Frames: Create placeholders and "Place" images inside.', videoUrl: '' },
        { id: 2, khmer: 'Assets Studio៖ រក្សាទុក Logo និងឯកសាររចនាដើម្បីទាញប្រើពេលក្រោយ។', english: 'The Assets Studio: Store logos and design elements for quick use.', videoUrl: '' },
        { id: 3, khmer: 'Table Tool៖ ការសាងសង់ និងរៀបចំតារាងទិន្នន័យ (ពណ៌ គែម និងអក្សរ)។', english: 'Table Tool: Build data tables with custom cell borders and fills.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb6', 
      title: 'មេរៀនទី ៦៖ ឧបករណ៍បោះពុម្ពកម្រិតខ្ពស់', 
      title_en: 'Lesson 6: Advanced Publishing Tools', 
      desc: 'បង្កើតមាតិកាសៀវភៅដោយស្វ័យប្រវត្តិ និងប្រើប្រាស់ Preflight Studio។', 
      desc_en: 'Generate a Table of Contents automatically and use the Preflight Studio.', 
      steps: [
        { id: 1, khmer: 'Section Manager៖ រៀបចំឯកសារជាជំពូក ឬផ្នែកៗ។', english: 'Section Manager: Organize a large document into chapters.', videoUrl: '' },
        { id: 2, khmer: 'មាតិកា និង Index៖ បង្កើតតារាងមាតិកាដោយស្វ័យប្រវត្តិ។', english: 'TOC & Indexing: Automatically generate a Table of Contents.', videoUrl: '' },
        { id: 3, khmer: 'Preflight Studio៖ ត្រួតពិនិត្យកំហុសមុននឹង Export (ដូចជារូបភាពបែក)។', english: 'Preflight Studio: Monitor for errors like low-resolution images.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb7', 
      title: 'គម្រោងទី ១៖ អត្ថបទចុះទស្សនាវដ្តី', 
      title_en: 'Project 1: Magazine Feature Article', 
      desc: 'រៀបចំប្លង់អត្ថបទសម្រាប់ទស្សនាវដ្តី ដែលមានរូបភាពធំ ចំណងជើង និងអត្ថបទ ៣ ជួរ។', 
      desc_en: 'Create a feature article with a hero image, headline, and three text columns.', 
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ រចនាអត្ថបទជាមួយរូបភាពធំ និងអត្ថបទជាជួរៗ។', english: 'Goal: Create an article layout with hero image and columns.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ការកំណត់ Text Wrap ជុំវិញរូបភាព និងការប្រើ Drop Caps។', english: 'Key Skill: Mastering Text Wrap around images and Drop Caps.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb8', 
      title: 'គម្រោងទី ២៖ Corporate Brochure ៨ ទំព័រ', 
      title_en: 'Project 2: Corporate Brochure', 
      desc: 'រចនាខិត្តប័ណ្ណ (Brochure) ៨ ទំព័រ ដោយប្រើ Global Colors និង Master Pages។', 
      desc_en: 'Design an 8-page brochure utilizing Global Colors and multiple Master Pages.', 
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ រចនា Brochure ដែលមាន ៨ ទំព័រ។', english: 'Goal: Design an 8-page brochure using two Master Pages.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ការគ្រប់គ្រងពណ៌ប្រេន (Global Colors) ឱ្យបានច្បាស់លាស់។', english: 'Key Skill: Managing consistent branding with Global Colors.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb9', 
      title: 'គម្រោងទី ៣៖ Digital Planner អន្តរកម្ម', 
      title_en: 'Project 3: Digital Interactive Planner', 
      desc: 'បង្កើតសៀវភៅផែនការប្រចាំខែ (Digital Planner) ជា PDF ដែលអាចចុច Link បាន។', 
      desc_en: 'Create a monthly PDF planner with functional hyperlinks and complex tabs.', 
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ បង្កើត Digital Planner ជា PDF ដែលអាចចុចបាន។', english: 'Goal: Create a monthly planner with functional hyperlinks.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ការប្រើប្រាស់ Hyperlinks Studio និង Master Page Stacking។', english: 'Key Skill: Using the Hyperlinks Studio and Master Page Stacking.', videoUrl: '' }
      ]
    },
    { 
      id: 'pb10', 
      title: 'គម្រោងទី ៤៖ ការរៀបចំប្លង់សៀវភៅអាជីព', 
      title_en: 'Project 4: Professional Book Layout', 
      desc: 'រៀបចំប្លង់សៀវភៅដែលមានលេខរៀងទំព័រស្វ័យប្រវត្តិ និង Export ជា PDF សម្រាប់ការបោះពុម្ព។', 
      desc_en: 'Layout a short chapter book with automated page numbers and Print PDF/X-4 export.', 
      steps: [
        { id: 1, khmer: 'គោលដៅ៖ រៀបចំប្លង់សៀវភៅរួមមាន ក្រប មាតិកា និងលេខទំព័រ។', english: 'Goal: Layout a book including cover, TOC, and page numbers.', videoUrl: '' },
        { id: 2, khmer: 'ជំនាញគោល៖ ការប្រើ Books Panel និងការ Export ជា PDF សម្រាប់បោះពុម្ព (PDF/X-4)។', english: 'Key Skill: Using the Books Panel and Exporting for Print (PDF/X-4).', videoUrl: '' }
      ]
    }
  ]
};

// 🌟 THE ULTIMATE 150-QUESTION DATABASE (50 PHOTO, 50 DESIGNER, 50 PUBLISHER) 🌟
export const initialQuestionBank = [
    // --- 🎨 PHOTO: 1-50 ---
    { id: 1, app: 'photo', level: 'beginner', correct: 1, question: "តើកាយវិការ (Gesture) មួយណានៅលើ iPad សម្រាប់ប្រើដើម្បី Undo ក្នុង Affinity Photo?", question_en: "Which iPad gesture is used to Undo in Affinity Photo?", options: ["អូសម្រាមដៃបីចុះក្រោម", "ប៉ះម្រាមដៃពីរលើអេក្រង់ព្រមគ្នា (Two-finger tap)", "អូសម្រាមដៃពីរទៅឆ្វេង", "ចុចឱ្យជាប់លើអេក្រង់"], options_en: ["Three-finger swipe down", "Two-finger tap", "Two-finger swipe left", "Long press on the screen"] },
    { id: 2, app: 'photo', level: 'beginner', correct: 2, question: "តើកាយវិការមួយណាសម្រាប់ធ្វើការ Redo?", question_en: "Which gesture is used to Redo?", options: ["អូសម្រាមពីរទៅស្តាំ", "ប៉ះម្រាមពីរ", "ប៉ះម្រាមបីព្រមគ្នា (Three-finger tap)", "ក្រឡុក iPad"], options_en: ["Two-finger swipe right", "Two-finger tap", "Three-finger tap", "Shake the iPad"] },
    { id: 3, app: 'photo', level: 'beginner', correct: 0, question: "តើ Persona មួយណាដែលត្រូវប្រើសម្រាប់កែពណ៌រូបភាព RAW ដោយមិនខូចសាច់រូបដើម?", question_en: "Which Persona is used for non-destructive RAW image processing?", options: ["Develop Persona", "Photo Persona", "Liquify Persona", "Export Persona"], options_en: ["Develop Persona", "Photo Persona", "Liquify Persona", "Export Persona"] },
    { id: 4, app: 'photo', level: 'beginner', correct: 1, question: "តើ Command Controller នៅលើអេក្រង់មានតួនាទីជំនួសអ្វី?", question_en: "What does the on-screen Command Controller replace?", options: ["ជំនួស Mouse", "ជំនួស Modifier Keys (Shift, Command, Alt) នៅលើ Keyboard", "ជំនួស Pen Tool", "ជំនួសការ Save"], options_en: ["Replaces the Mouse", "Replaces keyboard Modifier Keys (Shift, Command, Alt)", "Replaces the Pen Tool", "Replaces the Save button"] },
    { id: 5, app: 'photo', level: 'beginner', correct: 3, question: "តើអ្នកត្រូវអូសម្រាមដៃប៉ុន្មានចុះក្រោម ដើម្បីបើក Quick Menu?", question_en: "How many fingers do you swipe down to open the Quick Menu?", options: ["១ ម្រាម", "២ ម្រាម", "៤ ម្រាម", "៣ ម្រាម"], options_en: ["1 finger", "2 fingers", "4 fingers", "3 fingers"] },
    { id: 6, app: 'photo', level: 'intermediate', correct: 1, question: "តើឧបករណ៍មួយណាដែលល្អបំផុតសម្រាប់លុបមុន ឬស្នាមតូចៗចេញពីស្បែកមុខ?", question_en: "Which tool is best for removing blemishes or small spots from skin?", options: ["Eraser Tool", "Inpainting Brush Tool", "Paint Brush Tool", "Dodge Tool"], options_en: ["Eraser Tool", "Inpainting Brush Tool", "Paint Brush Tool", "Dodge Tool"] },
    { id: 7, app: 'photo', level: 'intermediate', correct: 2, question: "តើ Layer Mask មានតួនាទីអ្វី?", question_en: "What is the function of a Layer Mask?", options: ["ប្តូរពណ៌រូបភាពទៅជាសខ្មៅ", "លុបរូបចោលជារៀងរហូត", "លាក់ (Hide) ឬ បង្ហាញ (Reveal) ផ្នែកខ្លះនៃ Layer ដោយមិនលុបសាច់រូប", "ធ្វើឱ្យរូបភាពច្បាស់ជាងមុន"], options_en: ["Turns the image black and white", "Deletes pixels permanently", "Hides or reveals parts of a layer non-destructively", "Sharpens the image"] },
    { id: 8, app: 'photo', level: 'intermediate', correct: 1, question: "តើឧបករណ៍អ្វីដែលល្អបំផុតសម្រាប់ Select សក់មនុស្ស ឬរោមសត្វ?", question_en: "What is the best tool/feature for selecting human hair or animal fur?", options: ["Magic Wand Tool", "Smart Selection Brush រួមជាមួយ Refine Edge", "Marquee Tool", "Pen Tool"], options_en: ["Magic Wand Tool", "Smart Selection Brush combined with Refine Edge", "Marquee Tool", "Pen Tool"] },
    { id: 9, app: 'photo', level: 'intermediate', correct: 0, question: "ប្រសិនបើអ្នកចង់ប្តូរពណ៌អាវ (Hue) ដោយមិនប៉ះពាល់ពណ៌ស្បែកមុខ តើត្រូវប្រើ Adjustment អ្វី?", question_en: "If you want to change a shirt's color without affecting skin tones, which Adjustment do you use?", options: ["HSL (Hue, Saturation, Luminosity)", "Black and White", "Invert", "Exposure"], options_en: ["HSL (Hue, Saturation, Luminosity)", "Black and White", "Invert", "Exposure"] },
    { id: 10, app: 'photo', level: 'intermediate', correct: 1, question: "តើ Blend Mode មួយណាដែលជួយលុប Background ពណ៌ស ឱ្យរលាយបាត់?", question_en: "Which Blend Mode helps knock out a pure white background?", options: ["Screen", "Multiply", "Overlay", "Add"], options_en: ["Screen", "Multiply", "Overlay", "Add"] },
    { id: 11, app: 'photo', level: 'advanced', correct: 0, question: "តើ Blend Mode មួយណាដែលជួយលុប Background ពណ៌ខ្មៅ ឱ្យរលាយបាត់?", question_en: "Which Blend Mode helps knock out a pure black background?", options: ["Screen", "Multiply", "Color Burn", "Darken"], options_en: ["Screen", "Multiply", "Color Burn", "Darken"] },
    { id: 12, app: 'photo', level: 'advanced', correct: 1, question: "តើបច្ចេកទេស Frequency Separation បំបែករូបភាពជាអ្វីខ្លះ?", question_en: "What does the Frequency Separation technique split an image into?", options: ["បំបែកពណ៌ក្រហម និងពណ៌ខៀវ", "បំបែក វាយនភាពស្បែក (High) និង ពណ៌/ពន្លឺ (Low)", "បំបែក Background និង Foreground", "បំបែក ពន្លឺ (Highlights) និង ស្រមោល (Shadows)"], options_en: ["Splits red and blue colors", "Splits Skin Texture (High) and Tone/Color (Low)", "Splits Background and Foreground", "Splits Highlights and Shadows"] },
    { id: 13, app: 'photo', level: 'advanced', correct: 2, question: "តើ Live Filters (ដូចជា Gaussian Blur) មានលក្ខណៈពិសេសយ៉ាងណាធៀបនឹង Filter ធម្មតា?", question_en: "What makes Live Filters (like Gaussian Blur) special compared to normal filters?", options: ["វាដើរលឿនជាង", "វាទាញយកអ៊ីនធឺណិត", "វាជា Non-destructive (អាចចូលទៅកែប្រែ ឬលុបចោលវិញបានគ្រប់ពេល)", "វាមានតែពណ៌ខ្មៅស"], options_en: ["They process faster", "They require the internet", "They are Non-destructive (can be edited or removed at any time)", "They are only black and white"] },
    { id: 14, app: 'photo', level: 'advanced', correct: 1, question: "ក្នុងការកែប្រែរូបភាព តើ Dodge Tool ប្រើសម្រាប់អ្វី?", question_en: "In photo retouching, what is the Dodge Tool used for?", options: ["ធ្វើឱ្យរូបងងឹត (Darken)", "ធ្វើឱ្យរូបភ្លឺជាងមុន (Lighten)", "លុបពណ៌", "កាត់រូប"], options_en: ["Darkening the image", "Lightening the image", "Removing color", "Cropping the image"] },
    { id: 15, app: 'photo', level: 'advanced', correct: 0, question: "ក្នុងការកែប្រែរូបភាព តើ Burn Tool ប្រើសម្រាប់អ្វី?", question_en: "In photo retouching, what is the Burn Tool used for?", options: ["ធ្វើឱ្យរូបងងឹត (Darken)", "ធ្វើឱ្យរូបភ្លឺជាងមុន (Lighten)", "ដុតកុំព្យូទ័រឱ្យក្តៅ", "បន្ថែមភាពច្បាស់ (Sharpen)"], options_en: ["Darkening the image", "Lightening the image", "Overheating the computer", "Sharpening the image"] },
    { id: 16, app: 'photo', level: 'intermediate', correct: 1, question: "តើ Export Persona មានអត្ថប្រយោជន៍ចម្បងអ្វី?", question_en: "What is the main benefit of the Export Persona?", options: ["សម្រាប់ព្រីនរូប", "សម្រាប់កាត់រូបភាពមួយផ្ទាំងធំទៅជាបំណែកតូចៗ (Slices) ហើយ Export ព្រមគ្នា", "សម្រាប់ផ្ញើអ៊ីមែល", "សម្រាប់កែពណ៌"], options_en: ["Printing images", "Slicing a large document into smaller pieces and exporting them simultaneously", "Sending emails", "Color grading"] },
    { id: 17, app: 'photo', level: 'beginner', correct: 2, question: "តើអ្វីទៅជាមុខងាររបស់ Clipping Mask?", question_en: "What is the function of a Clipping Mask?", options: ["កាត់វីដេអូ", "ថតចម្លងរូប", "យករូបភាពមួយទៅបង្ហាញតែនៅក្នុងរាង (Shape) ខាងក្រោមវាប៉ុណ្ណោះ", "ចាក់ពណ៌ស"], options_en: ["Cutting video", "Copying the image", "Constraining an image to only show within the boundaries of the layer directly below it", "Filling with white"] },
    { id: 18, app: 'photo', level: 'beginner', correct: 1, question: "តើការចុច Double-tap លើ Navigator panel នឹងធ្វើអ្វី?", question_en: "What does double-tapping the Navigator panel do?", options: ["បិទកម្មវិធី", "Zoom រូបភាពមកទំហំ 100% ភ្លាមៗ", "លុបរូបចោល", "Save រូប"], options_en: ["Closes the app", "Instantly zooms the image to 100%", "Deletes the image", "Saves the image"] },
    { id: 19, app: 'photo', level: 'intermediate', correct: 0, question: "តើ LUT (Lookup Table) ប្រើសម្រាប់អ្វីក្នុង Affinity Photo?", question_en: "What is a LUT (Lookup Table) used for in Affinity Photo?", options: ["ប្តូរពណ៌រូបភាពទៅជាស្តាយល៍ភាពយន្ត (Cinematic Color Grading) យ៉ាងរហ័ស", "បង្កើតតារាង Excel", "កាត់តអត្ថបទ", "តម្រឹមរូប"], options_en: ["Quickly applying cinematic color grading presets to an image", "Creating Excel tables", "Editing text", "Aligning images"] },
    { id: 20, app: 'photo', level: 'advanced', correct: 1, question: "តើ Live Mesh Warp filter អនុញ្ញាតឱ្យអ្នកធ្វើអ្វី?", question_en: "What does the Live Mesh Warp filter allow you to do?", options: ["ប្តូរពណ៌", "ទាញពត់ និងកាឡៃរូបភាព (Distort) ទៅតាមក្រឡា Grid ដោយមិនខូចរូបដើម", "លុបសម្លេងរំខាន", "បង្កើតស្រមោលអក្សរ"], options_en: ["Change colors", "Non-destructively distort and bend an image using a customizable grid", "Remove audio noise", "Create text shadows"] },
    { id: 21, app: 'photo', level: 'intermediate', correct: 1, question: "តើមុខងារ 'Save History With Document' អនុញ្ញាតឱ្យអ្នកធ្វើអ្វី?", question_en: "What does 'Save History With Document' allow you to do?", options: ["Save រូបភាពជា PDF", "អាច Undo ជំហានចាស់ៗបាន ទោះបីជាអ្នកបិទកម្មវិធីហើយបើកវាម្តងទៀតក៏ដោយ", "Save ចូល Cloud ស្វ័យប្រវត្តិ", "ចែករំលែកប្រវត្តិការងារទៅមិត្តភក្តិ"], options_en: ["Save image as PDF", "Allows you to Undo previous steps even after closing and reopening the app", "Auto-saves to the Cloud", "Shares work history with friends"] },
    { id: 22, app: 'photo', level: 'advanced', correct: 0, question: "តើ Focus Merge ប្រើសម្រាប់គោលបំណងអ្វីចម្បង?", question_en: "What is the primary purpose of Focus Merge?", options: ["បញ្ចូលរូបថតច្រើនសន្លឹកដែលមានចំណុចច្បាស់ (Focus) ខុសៗគ្នា ទៅជារូបមួយដែលច្បាស់តាំងពីមុខដល់ក្រោយ", "ធ្វើឱ្យផ្ទៃខាងក្រោយព្រិល (Blur)", "បញ្ចូលវីដេអូបញ្ចាំងចូលគ្នា", "លុបសម្លេងរំខានពីរូបភាព"], options_en: ["Combines multiple photos with different focal points into one image that is sharp from front to back", "Blurs the background", "Merges projected videos", "Removes noise from the image"] },
    { id: 23, app: 'photo', level: 'advanced', correct: 2, question: "តើ HDR Merge ល្អបំផុតសម្រាប់ស្ថានភាពបែបណា?", question_en: "What is HDR Merge best suited for?", options: ["ថតរូប Portrait កៀកៗ", "ថតកីឡាដែលមានចលនាលឿន", "ថតទិដ្ឋភាពដែលមានពន្លឺខ្លាំងពេកនិងងងឹតពេកក្នុងប្លង់តែមួយ (High Dynamic Range)", "ថតរូបសខ្មៅ"], options_en: ["Close-up portraits", "Fast-moving sports", "Scenes with extreme highlights and deep shadows in the same frame (High Dynamic Range)", "Black and white photography"] },
    { id: 24, app: 'photo', level: 'beginner', correct: 1, question: "តើ Panorama Merge មានតួនាទីអ្វី?", question_en: "What is the function of Panorama Merge?", options: ["បំប្លែងរូបទៅជា 3D", "ដេរភ្ជាប់រូបថតដែលថតតៗគ្នា (Overlapping) ឱ្យក្លាយជារូបភាពផ្ទាំងធំនិងវែងមួយ", "កាត់រូបភាពឱ្យខ្លី", "ប្តូរពណ៌មេឃស្វ័យប្រវត្តិ"], options_en: ["Converts image to 3D", "Stitches overlapping photos together into one wide, expansive image", "Cuts images shorter", "Changes sky color automatically"] },
    { id: 25, app: 'photo', level: 'intermediate', correct: 1, question: "តើ Inpainting Brush ខុសពី Clone Brush យ៉ាងដូចម្តេច?", question_en: "How is the Inpainting Brush different from the Clone Brush?", options: ["គ្មានភាពខុសគ្នាទេ", "Inpainting ប្រើ AI ដើម្បីគណនា និងប៉ះប៉ូវសាច់រូបដោយស្វ័យប្រវត្តិ ចំណែក Clone ត្រូវថតចម្លង (Copy) ពីកន្លែងមួយទៅដាក់កន្លែងមួយទៀត", "Clone ដើរលឿនជាង Inpainting", "Inpainting ប្រើសម្រាប់តែលុបអក្សរ"], options_en: ["No difference", "Inpainting uses AI to seamlessly fill areas, while Clone copies exact pixels from a source point", "Clone is faster than Inpainting", "Inpainting is only for deleting text"] },
    { id: 26, app: 'photo', level: 'intermediate', correct: 0, question: "តើ Filter 'Unsharp Mask' ធ្វើអ្វីទៅលើរូបភាព?", question_en: "What does the 'Unsharp Mask' filter do to an image?", options: ["បង្កើនភាពច្បាស់ (Sharpen) ដោយការបន្ថែម Contrast នៅតាមគែមរបស់វត្ថុ", "ធ្វើឱ្យរូបភាពព្រិល", "លុបពណ៌ចេញពីរូបភាព", "បង្កើតស្រមោល"], options_en: ["Increases sharpness by adding contrast along the edges of objects", "Blurs the image", "Removes color from the image", "Creates shadows"] },
    { id: 27, app: 'photo', level: 'advanced', correct: 1, question: "នៅក្នុង Liquify Persona តើឧបករណ៍ Mesh Warp ប្រើសម្រាប់អ្វី?", question_en: "In the Liquify Persona, what is the Mesh Warp tool used for?", options: ["សម្រាប់កាត់រូប", "សម្រាប់ទាញ ពត់ ឬបង្រួម/ពង្រីកសាច់រូបភាពដោយប្រើបណ្តាញក្រឡា (Grid)", "សម្រាប់ចាក់ពណ៌", "សម្រាប់វាស់ទំហំ"], options_en: ["For cropping", "For pushing, pulling, shrinking, or bloating areas of an image using a grid", "For painting colors", "For measuring sizes"] },
    { id: 28, app: 'photo', level: 'intermediate', correct: 2, question: "តើ Histogram បង្ហាញព័ត៌មានអ្វីខ្លះពីរូបភាព?", question_en: "What information does the Histogram show?", options: ["ចំនួន Layer", "ទំហំ File", "ការចែកចាយនៃកម្រិតពន្លឺ (Shadows, Midtones, Highlights) និងពណ៌", "ឈ្មោះអ្នកថតរូប"], options_en: ["Number of layers", "File size", "The distribution of tonal values (Shadows, Midtones, Highlights) and colors", "Photographer's name"] },
    { id: 29, app: 'photo', level: 'advanced', correct: 0, question: "តើ Luminosity Mask ជាអ្វី?", question_en: "What is a Luminosity Mask?", options: ["ការ Select ផ្នែកណាមួយនៃរូបភាពដោយផ្អែកលើកម្រិតពន្លឺ (ភាពភ្លឺ ឬងងឹត) របស់វា", "ការជ្រើសរើសតាមពណ៌", "ការកាត់រូបជារាងរង្វង់", "ការដាក់ពន្លឺសិប្បនិម្មិត"], options_en: ["Selecting specific areas of an image based entirely on their brightness levels", "Selecting by color", "Cutting an image in a circle", "Adding artificial light"] },
    { id: 30, app: 'photo', level: 'intermediate', correct: 1, question: "តើ Split Toning ប្រើសម្រាប់អ្វី?", question_en: "What is Split Toning used for?", options: ["កាត់រូបភាពជាពីរ", "ចាក់ពណ៌មួយទៅលើតំបន់ភ្លឺ (Highlights) និងពណ៌មួយទៀតទៅលើតំបន់ងងឹត (Shadows)", "បំបែកអេក្រង់ជាពីរ", "បំបែកវីដេអូ"], options_en: ["Cutting the image in half", "Tinting the Highlights with one color, and the Shadows with another", "Splitting the screen in two", "Splitting a video"] },
    { id: 31, app: 'photo', level: 'advanced', correct: 2, question: "តើ Macros នៅក្នុង Affinity Photo មានអត្ថប្រយោជន៍អ្វី?", question_en: "What is the benefit of Macros in Affinity Photo?", options: ["ធ្វើឱ្យរូបភាពធំជាងមុន", "សម្រាប់គូររូប 3D", "ថត (Record) សកម្មភាពដែលយើងធ្វើដដែលៗ ដើម្បីអោយកម្មវិធីធ្វើវាដោយស្វ័យប្រវត្តិនៅពេលក្រោយ", "បកប្រែអត្ថបទ"], options_en: ["Makes the image larger", "For 3D drawing", "Records a series of repetitive actions to play them back automatically later", "Translates text"] },
    { id: 32, app: 'photo', level: 'beginner', correct: 1, question: "នៅលើ iPad ជំនាន់ថ្មី តើការគោះ (Double-tap) លើខ្មៅដៃ Apple Pencil ជាទូទៅវាធ្វើអ្វី?", question_en: "On newer iPads, what does double-tapping the Apple Pencil typically do?", options: ["បិទកម្មវិធី", "ផ្លាស់ប្តូរត្រឡប់ទៅមករវាង Tool បច្ចុប្បន្ន និង Eraser (ជ័រលុប)", "Save រូបភាព", "Zoom រូបភាព"], options_en: ["Closes the app", "Switches back and forth between the current tool and the Eraser", "Saves the image", "Zooms the image"] },
    { id: 33, app: 'photo', level: 'intermediate', correct: 0, question: "តើ Defringe នៅក្នុង Develop Persona មានតួនាទីអ្វី?", question_en: "What does Defringe do in the Develop Persona?", options: ["លុបពន្លឺពណ៌ស្វាយ ឬបៃតងដែលជះនៅតាមគែមវត្ថុ (Chromatic Aberration)", "ធ្វើឱ្យរូបភាពភ្លឺ", "លុបផ្ទៃខាងក្រោយ", "ធ្វើឱ្យរូបភាពចាស់កញ្ចាស់"], options_en: ["Removes purple or green color fringing along high-contrast edges (Chromatic Aberration)", "Brightens the image", "Removes the background", "Makes the image look vintage"] },
    { id: 34, app: 'photo', level: 'intermediate', correct: 1, question: "តើភាពខុសគ្នារវាង Vibrance និង Saturation គឺអ្វី?", question_en: "What is the difference between Vibrance and Saturation?", options: ["គ្មានខុសគ្នាទេ", "Vibrance បង្កើនពណ៌ដែលស្លេកៗដោយការពារពណ៌ស្បែក (Skin tones) ចំណែក Saturation បង្កើនកម្រិតពណ៌ទាំងអស់ព្រមគ្នា", "Saturation ល្អជាងសម្រាប់រូបថតមនុស្ស", "Vibrance ធ្វើឱ្យរូបទៅជាសខ្មៅ"], options_en: ["No difference", "Vibrance intelligently boosts dull colors while protecting skin tones, whereas Saturation boosts all colors equally", "Saturation is better for portraits", "Vibrance turns the image B&W"] },
    { id: 35, app: 'photo', level: 'beginner', correct: 1, question: "តើការ Rasterize Layer មួយមានន័យដូចម្តេច?", question_en: "What does it mean to Rasterize a layer?", options: ["លុបវាចោល", "បំប្លែងអក្សរ, Vector, ឬ Live Filter អោយទៅជា Layer រូបភាពធម្មតា (Pixels)", "ផ្លាស់ប្តូរឈ្មោះវា", "ចាក់សោរវា"], options_en: ["Delete it", "Converts text, vectors, or live filters into a standard flat pixel layer", "Renames it", "Locks it"] },
    { id: 36, app: 'photo', level: 'advanced', correct: 0, question: "តើមុខងារ Protect Alpha (Lock Transparent Pixels) អនុញ្ញាតឱ្យអ្នកធ្វើអ្វី?", question_en: "What does Protect Alpha allow you to do?", options: ["ផាត់ពណ៌បានតែលើសាច់រូបដែលមានស្រាប់ ដោយមិនប្រឡាក់ចេញទៅក្រៅ (កន្លែងថ្លា)", "ចាក់សោរមិនឱ្យគេលួចរូប", "លាក់រូបភាព", "បង្កើនទំហំរូប"], options_en: ["Allows you to paint only over existing pixels without spilling into the transparent areas", "Locks the image from theft", "Hides the image", "Increases image size"] },
    { id: 37, app: 'photo', level: 'intermediate', correct: 1, question: "តើ Lighting Filter អនុញ្ញាតឱ្យអ្នកធ្វើអ្វី?", question_en: "What does the Lighting Filter allow you to do?", options: ["បង្កើនពន្លឺអេក្រង់ iPad", "ដាក់ប្រភពពន្លឺសិប្បនិម្មិត (Artificial Light 3D) ទៅលើរូបភាព", "កាត់បន្ថយភ្លើង", "លុបស្រមោលទាំងអស់"], options_en: ["Increases iPad screen brightness", "Places artificial 3D light sources and directional spots onto an image", "Reduces electricity", "Removes all shadows"] },
    { id: 38, app: 'photo', level: 'advanced', correct: 1, question: "តើ Displacement Map ប្រើសម្រាប់ធ្វើអ្វី?", question_en: "What is a Displacement Map used for?", options: ["មើលផែនទីប្រទេស", "រុំឡូហ្គោ ឬរូបភាពឱ្យវៀចតាមផ្នត់អាវ ឬវាយនភាព 3D ខាងក្រោមវាយ៉ាងពិតប្រាកដ", "ស្វែងរកទីតាំងក្នុងកម្មវិធី", "វាស់ចម្ងាយ"], options_en: ["Looking at country maps", "Realistically wrapping a logo or image along the 3D folds and textures of the layer underneath (like a t-shirt)", "Finding locations in the app", "Measuring distances"] },
    { id: 39, app: 'photo', level: 'intermediate', correct: 2, question: "តើមុខងារ White Balance ប្រើដើម្បីកែតម្រូវអ្វី?", question_en: "What is the White Balance function used to correct?", options: ["ទំហំរូបភាព", "ភាពច្បាស់ (Sharpness)", "សីតុណ្ហភាពពណ៌ (ក្តៅ/ត្រជាក់) និង Tint ឱ្យមើលទៅឃើញធម្មជាតិ", "ស្រមោលខ្មៅ"], options_en: ["Image size", "Sharpness", "Color temperature (Warm/Cool) and Tint to make lighting look natural", "Black shadows"] },
    { id: 40, app: 'photo', level: 'advanced', correct: 1, question: "តើ Blend Ranges (រូបកងចក្រ) ប្រើសម្រាប់អ្វី?", question_en: "What are Blend Ranges used for?", options: ["បង្វិលរូបភាព", "កំណត់កម្រិត Opacity របស់ Layer មួយដោយផ្អែកលើពន្លឺ (Luminosity) នៃ Layer ខាងក្រោមវា", "កាត់តសម្លេង", "បូកលេខ"], options_en: ["Rotating the image", "Controlling a layer's opacity strictly based on the underlying luminosity (shadows/highlights) curve", "Audio editing", "Math addition"] },
    { id: 41, app: 'photo', level: 'intermediate', correct: 0, question: "តើ Channels Panel បង្ហាញអ្វីខ្លះ?", question_en: "What does the Channels Panel display?", options: ["ស្រទាប់ពណ៌ក្រហម បៃតង ខៀវ (RGB) និង Alpha របស់រូបភាពដាច់ដោយឡែកពីគ្នា", "ប៉ុស្តិ៍ទូរទស្សន៍", "បញ្ជីឈ្មោះ Font", "បញ្ជីឈ្មោះ Brush"], options_en: ["The individual Red, Green, Blue (RGB), and Alpha channels of the image", "TV channels", "Font lists", "Brush lists"] },
    { id: 42, app: 'photo', level: 'advanced', correct: 1, question: "តើមុខងារ 'Continuous Export' ក្នុង Export Persona មានប្រយោជន៍អ្វី?", question_en: "What is the benefit of 'Continuous Export' in the Export Persona?", options: ["Export រូបចោលរហូតមិនឈប់", "រាល់ពេលដែលអ្នកកែប្រែរូបភាព វាធ្វើការ Export File នោះដោយស្វ័យប្រវត្តិទៅកាន់ Folder ដែលបានកំណត់", "Export ជាវីដេអូ", "បង្ខំឱ្យកុំព្យូទ័រដើរលឿន"], options_en: ["Exports the image endlessly", "Automatically overwrites and exports the file to your designated folder the moment you make any change", "Exports as video", "Forces the computer to run fast"] },
    { id: 43, app: 'photo', level: 'intermediate', correct: 0, question: "តើ Perspective Transform ប្រើសម្រាប់អ្វី?", question_en: "What is Perspective Transform used for?", options: ["ទាញកែទម្រង់រូបភាពឱ្យស៊ីនឹងប្លង់ 3D (ឧ. យកវីដេអូទៅបិទលើអេក្រង់ទូរទស្សន៍ដែលងាកចំហៀង)", "ប្តូរពណ៌", "កាត់រូបជារង្វង់", "បន្ថែមអក្សរ"], options_en: ["Warping an image to match a 3D perspective plane (e.g., placing an image onto a tilted TV screen)", "Changing colors", "Cropping into a circle", "Adding text"] },
    { id: 44, app: 'photo', level: 'intermediate', correct: 1, question: "តើ Quick Mask អនុញ្ញាតឱ្យអ្នកធ្វើអ្វី?", question_en: "What does Quick Mask allow you to do?", options: ["ពាក់ម៉ាស់លឿនៗ", "ប្រើ Brush គូរដើម្បីបង្កើត Selection ដែលមើលឃើញជាពណ៌ក្រហមព្រិលៗ", "លុបរូបយ៉ាងលឿន", "Save រូបយ៉ាងលឿន"], options_en: ["Wear a mask quickly", "Use a Brush to paint a selection area visually represented by a red overlay", "Delete an image quickly", "Save an image quickly"] },
    { id: 45, app: 'photo', level: 'advanced', correct: 2, question: "នៅក្នុង Refine Edge តើជក់ប្រភេទ Matte ប្រើសម្រាប់ផាត់លើកន្លែងណា?", question_en: "In Refine Edge, where should you paint with the Matte brush?", options: ["ផាត់លើផ្ទៃខាងក្រោយដែលចង់លុប", "ផាត់លើវត្ថុដែលចង់ទុក", "ផាត់នៅតាមគែមដែលស្មុគស្មាញ (ដូចជាសក់ ឬរោម) ដើម្បីឱ្យ AI ជួយកាត់ឱ្យម៉ត់", "ផាត់លើអក្សរ"], options_en: ["Paint on the background to delete", "Paint on the object to keep", "Paint along complex edges (like hair or fur) so the AI precisely extracts it", "Paint on text"] },
    { id: 46, app: 'photo', level: 'intermediate', correct: 1, question: "តើចំនុចកណ្តាល (Gamma) នៅក្នុង Levels Adjustment គ្រប់គ្រងអ្វី?", question_en: "What does the middle point (Gamma) in Levels Adjustment control?", options: ["ពន្លឺខ្លាំងបំផុត (White)", "កម្រិតពន្លឺកណ្តាល (Midtones) ដោយមិនធ្វើឱ្យប៉ះពាល់ដល់ចំណុចខ្មៅនិងសខ្លាំង", "កម្រិតងងឹត (Black)", "កម្រិតពណ៌ (Saturation)"], options_en: ["The absolute whites", "The midtones, without clipping the absolute blacks or whites", "The absolute blacks", "Color saturation"] },
    { id: 47, app: 'photo', level: 'intermediate', correct: 0, question: "តើ Invert Adjustment ធ្វើអ្វីទៅលើរូបភាព?", question_en: "What does the Invert Adjustment do?", options: ["បំប្លែងពណ៌រូបភាពទៅជាពណ៌ផ្ទុយ (Negative) ដូចជាខ្មៅទៅស ក្រហមទៅខៀវបៃតង", "ត្រឡប់រូបភាពពីឆ្វេងទៅស្តាំ", "ត្រឡប់ពីរូបភាពទៅជាអក្សរ", "ធ្វើឱ្យរូបភាពច្បាស់"], options_en: ["Inverts all colors to their exact opposites (Negative), like black to white, red to cyan", "Flips the image left to right", "Flips image to text", "Makes the image clear"] },
    { id: 48, app: 'photo', level: 'advanced', correct: 1, question: "ភាពខុសគ្នារវាង Masking និង Clipping គឺអ្វី?", question_en: "What is the difference between Masking and Clipping?", options: ["គ្មានខុសគ្នាទេ", "Mask ប្រើពណ៌សខ្មៅដើម្បីលាក់រូប ចំណែក Clipping កំណត់ការបង្ហាញរូបភាពទៅតាមទំហំរបស់វត្ថុខាងក្រោមវា", "Mask សម្រាប់រូប Clipping សម្រាប់វីដេអូ", "Clipping ងាយស្រួលជាង"], options_en: ["No difference", "Masking uses black/white to hide pixels; Clipping constrains visibility to the boundary of the parent layer", "Mask is for images, Clipping for video", "Clipping is easier"] },
    { id: 49, app: 'photo', level: 'beginner', correct: 2, question: "ប្រសិនបើអ្នកសង្កត់ម្រាមដៃមួយ (One-finger modifier) ពេលកំពុងទាញ Move Tool វាមានមុខងារជាអ្វី?", question_en: "If you hold one finger on the screen while dragging the Move Tool, what does it do?", options: ["លុបរូបភាពចោល", "Zoom រូបភាព", "វានឹងថតចម្លង (Duplicate) វត្ថុនោះ", "ប្តូរពណ៌វត្ថុ"], options_en: ["Deletes the image", "Zooms the image", "It instantly duplicates the object", "Changes object color"] },
    { id: 50, app: 'photo', level: 'intermediate', correct: 1, question: "តើអ្វីជាអត្ថប្រយោជន៍ធំបំផុតនៃការប្រើប្រាស់ Adjustment Layers ជំនួសឱ្យការកែផ្ទាល់លើរូបភាព?", question_en: "What is the biggest benefit of using Adjustment Layers instead of applying edits directly?", options: ["ដើរលឿនជាង", "វាជា Non-destructive មានន័យថាអ្នកអាចត្រលប់មកកែប្រែកម្រិតរបស់វា ឬលុបវាចោលវិញនៅថ្ងៃក្រោយបានជានិច្ច", "ធ្វើឱ្យទំហំ File តូច", "ធ្វើឱ្យរូបភាពមានចលនា"], options_en: ["It runs faster", "It is non-destructive, meaning you can re-adjust its settings or delete it entirely at any time in the future", "Makes the file size smaller", "Animates the image"] },

    // --- ✒️ DESIGNER: 51-100 ---
    { id: 51, app: 'designer', level: 'beginner', correct: 1, question: "តើចំណុចពិសេសរបស់ Affinity Designer គឺអ្វី?", question_en: "What is the unique core feature of Affinity Designer?", options: ["សម្រាប់កាត់តវីដេអូ", "ការធ្វើការរវាង Vector និង Pixel ក្នុងកម្មវិធីតែមួយ", "សម្រាប់សរសេរកូដ Website", "សម្រាប់តែគូររូប 3D ប៉ុណ្ណោះ"], options_en: ["Video editing", "Seamless switching between Vector and Pixel workspaces", "Coding websites", "Only for 3D modeling"] },
    { id: 52, app: 'designer', level: 'beginner', correct: 1, question: "តើ Artboards ប្រើសម្រាប់អ្វី?", question_en: "What are Artboards used for?", options: ["លាយពណ៌គំនូរ", "បង្កើតផ្ទាំងក្រដាសការងារច្រើនក្នុងឯកសារតែមួយ (Multi-page)", "សម្រាប់សរសេរអក្សរ", "សម្រាប់ថតរូប"], options_en: ["Mixing paint colors", "Creating multiple separate canvas spaces within a single document", "Writing text", "Taking photos"] },
    { id: 53, app: 'designer', level: 'beginner', correct: 2, question: "ប្រសិនបើអ្នកចង់បង្កើតរាងព្រះច័ន្ទចំណិត តើអ្នកគួរប្រើឧបករណ៍មួយណាឱ្យលឿនបំផុត?", question_en: "If you want to create a crescent moon shape, which tool is the fastest?", options: ["Pen Tool", "Pencil Tool", "Crescent Shape Tool (ក្នុងបញ្ជី Parametric Shapes)", "Brush Tool"], options_en: ["Pen Tool", "Pencil Tool", "Crescent Shape Tool (Parametric Shapes)", "Brush Tool"] },
    { id: 54, app: 'designer', level: 'beginner', correct: 1, question: "ពេលគូររាងការ៉េ ឬរង្វង់ តើត្រូវចុចអ្វីដើម្បីឱ្យវាមានសមាមាត្រស្មើគ្នា (Perfect Proportion)?", question_en: "When drawing a square or circle, what must you hold to keep it in perfect proportion?", options: ["Alt / Option", "ប្រើ Command Controller (សង្កត់លើ Shift)", "Ctrl", "ចុច ២ ដង"], options_en: ["Alt / Option", "Use the Command Controller (hold Shift)", "Ctrl", "Double tap"] },
    { id: 55, app: 'designer', level: 'intermediate', correct: 0, question: "តើ Shape Builder Tool ប្រើសម្រាប់អ្វី?", question_en: "What is the Shape Builder Tool used for?", options: ["អូសកាត់រូបរាងដែលត្រួតគ្នា ដើម្បីបង្កើតជារូបរាងថ្មី", "សម្រាប់លុប Background", "សម្រាប់វាស់ទំហំរូបភាព", "សម្រាប់ប្តូរពណ៌រូប"], options_en: ["Dragging across overlapping shapes to instantly merge or subtract them into new shapes", "Removing backgrounds", "Measuring image size", "Changing image colors"] },
    { id: 56, app: 'designer', level: 'intermediate', correct: 1, question: "តើ Boolean Operation 'Subtract' ធ្វើអ្វី?", question_en: "What does the 'Subtract' Boolean Operation do?", options: ["បូករូបពីរចូលគ្នា", "យករូបខាងលើទៅកាត់ខ្វៀលរូបខាងក្រោម (Punch a hole)", "ផ្លាស់ប្តូរពណ៌រូប", "លុបរូបចោល"], options_en: ["Adds two shapes together", "Uses the top shape to punch a hole through the bottom shape", "Changes shape colors", "Deletes shapes"] },
    { id: 57, app: 'designer', level: 'intermediate', correct: 0, question: "តើអ្វីជាភាពខុសគ្នារវាង Smooth Node និង Sharp Node?", question_en: "What is the difference between a Smooth Node and a Sharp Node?", options: ["Smooth សម្រាប់ខ្សែបន្ទាត់កោង, Sharp សម្រាប់ខ្សែបន្ទាត់ត្រង់ ឬជ្រុងមុត", "Smooth មានពណ៌, Sharp អត់ពណ៌", "Smooth សម្រាប់រូបភាព, Sharp សម្រាប់វីដេអូ", "គ្មានភាពខុសគ្នាទេ"], options_en: ["Smooth is for curved lines, Sharp is for straight lines or sharp corners", "Smooth has color, Sharp has none", "Smooth is for images, Sharp for video", "No difference"] },
    { id: 58, app: 'designer', level: 'intermediate', correct: 1, question: "ពេលកំពុងប្រើ Pen Tool លើ iPad តើអ្នកត្រូវធ្វើដូចម្តេចដើម្បីបំបែក (Break) ទិសដៅនៃខ្សែកោង?", question_en: "While using the Pen Tool on iPad, how do you break the handle direction of a curve?", options: ["ចុចម្រាមដៃបី", "ប្រើ Command Controller (ចុច Option/Alt)", "អូសចុះក្រោម", "មិនអាចធ្វើបានទេនៅលើ iPad"], options_en: ["Three-finger tap", "Use the Command Controller (hold Option/Alt)", "Swipe down", "It cannot be done on iPad"] },
    { id: 59, app: 'designer', level: 'advanced', correct: 0, question: "តើ Appearance Studio ក្នុង Designer អនុញ្ញាតឱ្យអ្នកធ្វើអ្វី?", question_en: "What does the Appearance Studio allow you to do?", options: ["បន្ថែម Fill និង Stroke ច្រើនជាន់ទៅលើវត្ថុតែមួយ (Multiple Strokes)", "កែពណ៌ស្បែកមុខ", "លុបអក្សរ", "បង្កើត Artboard"], options_en: ["Add multiple stacked Fills and Strokes to a single vector object", "Retouch skin", "Delete text", "Create an Artboard"] },
    { id: 60, app: 'designer', level: 'advanced', correct: 1, question: "តើ Isometric Grid សាកសមបំផុតសម្រាប់គូរអ្វី?", question_en: "What is the Isometric Grid best suited for drawing?", options: ["គូររូបមនុស្ស", "គូរទិដ្ឋភាព ឬវត្ថុ 3D ដែលគ្មានចំណុចរួមតូច (Vanishing point)", "គូរឡូហ្គោអក្សរ", "គូររូបថតធម្មជាតិ"], options_en: ["Drawing portraits", "Drawing 3D scenes or objects without a vanishing point perspective", "Drawing text logos", "Painting landscapes"] },
    { id: 61, app: 'designer', level: 'beginner', correct: 2, question: "ប្រសិនបើអ្នកចង់សរសេរចំណងជើងដែលរំកិលទំហំធំតូចតាមការទាញ តើអ្នកត្រូវប្រើអ្វី?", question_en: "If you want to type a headline that scales up and down when you drag its corners, what should you use?", options: ["Frame Text Tool", "Pen Tool", "Artistic Text Tool", "Brush Tool"], options_en: ["Frame Text Tool", "Pen Tool", "Artistic Text Tool", "Brush Tool"] },
    { id: 62, app: 'designer', level: 'intermediate', correct: 0, question: "តើមុខងារ Path Text ប្រើសម្រាប់ធ្វើអ្វី?", question_en: "What is the Path Text feature used for?", options: ["សរសេរអក្សរឱ្យរត់តាមបណ្តោយខ្សែបន្ទាត់ Vector កោង ឬរង្វង់", "សរសេរអក្សរជាកថាខណ្ឌ", "ប្តូរហ្វុនអក្សរ", "បកប្រែភាសា"], options_en: ["Typing text that flows along a curved vector line or circle", "Writing paragraphs", "Changing fonts", "Translating languages"] },
    { id: 63, app: 'designer', level: 'advanced', correct: 1, question: "ហេតុអ្វីបានជាអ្នកគួររក្សាទុក Logo នៅក្នុង Assets Studio?", question_en: "Why should you save your Logo in the Assets Studio?", options: ["ដើម្បីការពារការលួច", "ដើម្បីងាយស្រួលទាញយកមកប្រើឡើងវិញក្នុងគ្រប់គម្រោងដោយមិនបាច់ Copy/Paste ពីឯកសារចាស់", "ដើម្បីឱ្យ File តូច", "ដើម្បីប្តូរពណ៌វា"], options_en: ["To prevent theft", "To easily drag and drop it into any future project without having to open old files", "To make the file smaller", "To change its color"] },
    { id: 64, app: 'designer', level: 'intermediate', correct: 0, question: "តើអ្នកអាចប្រើជក់ (Pixel Brushes) មកផាត់លើរូប Vector ក្នុង Affinity Designer បានទេ?", question_en: "Can you use Pixel Brushes to paint over a Vector shape in Affinity Designer?", options: ["បាន! ដោយគ្រាន់តែប្តូរទៅ Pixel Persona រួចផាត់ពីលើ ឬផាត់ចូលក្នុង Vector (Clipping)", "មិនបានទេ", "បានតែលើ iPad ជំនាន់ថ្មី", "បានតែអក្សរប៉ុណ្ណោះ"], options_en: ["Yes! By switching to the Pixel Persona and clipping the paint inside the vector shape", "No", "Only on newer iPads", "Only on text"] },
    { id: 65, app: 'designer', level: 'advanced', correct: 1, question: "តើ Knife Tool មានមុខងារអ្វី?", question_en: "What is the function of the Knife Tool?", options: ["សម្រាប់លុបពណ៌", "សម្រាប់អារកាត់ផ្តាច់រូប Vector និងខ្សែបន្ទាត់ឱ្យទៅជាបំណែកៗ", "សម្រាប់បង្វិលរូប", "សម្រាប់ដាក់ស្រមោល"], options_en: ["Removing color", "Slicing through vector shapes and paths to cut them into separate pieces", "Rotating images", "Adding shadows"] },
    { id: 66, app: 'designer', level: 'beginner', correct: 1, question: "តើ File Format មួយណាដែលអ្នកគួរ Export បើអ្នកចង់រក្សាគុណភាព Vector ឱ្យនៅដដែល?", question_en: "Which file format should you export if you want to retain infinite Vector scaling?", options: [".JPG", ".SVG (ឬ .EPS)", ".PNG", ".GIF"], options_en: [".JPG", ".SVG (or .EPS)", ".PNG", ".GIF"] },
    { id: 67, app: 'designer', level: 'advanced', correct: 0, question: "តើមុខងារ 'Symbols' ខុសពី Group ធម្មតាយ៉ាងណា?", question_en: "How does the 'Symbols' feature differ from a normal Group?", options: ["បើអ្នកកែប្រែ Symbol មួយ នោះ Symbol ដែលដូចគ្នានៅកន្លែងផ្សេងនឹងប្រែប្រួលតាមទាំងអស់ដោយស្វ័យប្រវត្តិ", "វាមិនអាចប្តូរទំហំបានទេ", "វាប្រើបានតែជាមួយអក្សរ", "វាបាត់នៅពេល Save"], options_en: ["If you edit one Symbol, all other instances of that symbol update automatically", "It cannot be resized", "It only works with text", "It disappears when saving"] },
    { id: 68, app: 'designer', level: 'intermediate', correct: 1, question: "តើឧបករណ៍ Contour Tool ប្រើសម្រាប់អ្វី?", question_en: "What is the Contour Tool used for?", options: ["សម្រាប់វាស់ពន្លឺ", "សម្រាប់ពង្រីក ឬបង្រួមគែមរបស់រូប Vector (Offset path) ឱ្យធំចេញក្រៅ ឬតូចចូលក្នុង", "សម្រាប់កាត់អក្សរ", "សម្រាប់បន្ថែមពណ៌"], options_en: ["Measuring light", "Uniformly expanding or contracting the outline of a vector shape (Offset path)", "Cutting text", "Adding color"] },
    { id: 69, app: 'designer', level: 'beginner', correct: 0, question: "តើឧបករណ៍ណាប្រើសម្រាប់ចម្លងពណ៌ពីវត្ថុមួយទៅវត្ថុមួយទៀត?", question_en: "Which tool is used to copy a color from one object to another?", options: ["Color Picker Tool (Eyedropper)", "Move Tool", "Eraser Tool", "Node Tool"], options_en: ["Color Picker Tool (Eyedropper)", "Move Tool", "Eraser Tool", "Node Tool"] },
    { id: 70, app: 'designer', level: 'intermediate', correct: 1, question: "អ្វីទៅជា Corner Tool នៅក្នុង Affinity Designer?", question_en: "What is the Corner Tool in Affinity Designer?", options: ["សម្រាប់ប្តូរពណ៌ជ្រុង", "សម្រាប់ទាញជ្រុងស្រួចៗនៃវត្ថុ Vector ឱ្យទៅជាជ្រុងកោង (Rounded Corners) យ៉ាងរលូន", "សម្រាប់កាត់ជ្រុងចោល", "សម្រាប់វាស់មុំ"], options_en: ["Changing corner colors", "Pulling sharp vector corners to create perfectly smooth Rounded Corners", "Deleting corners", "Measuring angles"] },
    { id: 71, app: 'designer', level: 'intermediate', correct: 1, question: "មុខងារ Expand Stroke ធ្វើអ្វី?", question_en: "What does the Expand Stroke function do?", options: ["លុបបន្ទាត់ចោល", "បំប្លែងបន្ទាត់ (Stroke) ឱ្យក្លាយទៅជារូបរាងវត្ថុ (Shape) ពេញលេញ", "ធ្វើឱ្យបន្ទាត់វែងជាងមុន", "ប្តូរពណ៌បន្ទាត់"], options_en: ["Deletes the line", "Converts a Stroke into a fully editable 2D vector Shape", "Makes the line longer", "Changes the line color"] },
    { id: 72, app: 'designer', level: 'advanced', correct: 0, question: "ការសង្កត់ Alt/Option (ឬ Command Controller) ពេលចុច Boolean Add បង្កើតបានជាអ្វី?", question_en: "Holding Alt/Option while clicking the Boolean Add button creates what?", options: ["Compound Shape (រាងដែលផ្គុំគ្នា តែនៅអាចកែប្រែរាងដើមបាន)", "Group ធម្មតា", "រូបភាព Pixel", "វាលុបរូបចោល"], options_en: ["A Compound Shape (a merged shape where the original parts remain fully editable)", "A normal Group", "A pixel image", "It deletes the shapes"] },
    { id: 73, app: 'designer', level: 'advanced', correct: 1, question: "តើ Stroke Pressure Profile ប្រើសម្រាប់អ្វី?", question_en: "What is the Stroke Pressure Profile used for?", options: ["សម្រាប់វាស់កម្លាំងដៃ", "គ្រប់គ្រងកម្រាស់បន្ទាត់ (Stroke) ឱ្យមានចុងស្រួច ឬកណ្តាលធំ ដោយមិនបាច់ប្រើ Brush", "សម្រាប់ប្តូរពណ៌", "សម្រាប់ពង្រីករូបរាង"], options_en: ["Measuring hand strength", "Manually controlling the thickness of a vector stroke to create tapered or varied widths without using a brush", "Changing colors", "Scaling shapes"] },
    { id: 74, app: 'designer', level: 'advanced', correct: 1, question: "តើ Point Transform Tool ប្រើសម្រាប់អ្វី?", question_en: "What is the Point Transform Tool used for?", options: ["សម្រាប់ប្តូរទីតាំងរូប", "បង្វិល ឬពង្រីកវត្ថុដោយផ្អែកលើចំណុចអ័ក្ស (Pivot) ជាក់លាក់ណាមួយដោយសុក្រិត", "សម្រាប់គូសបន្ទាត់ត្រង់", "សម្រាប់ដាក់ Effect"], options_en: ["Changing image position", "Rotating or scaling an object precisely based on a custom defined pivot point", "Drawing straight lines", "Adding effects"] },
    { id: 75, app: 'designer', level: 'intermediate', correct: 1, question: "តើមុខងារ Snapping ជួយអ្វីខ្លះក្នុងការរចនា?", question_en: "How does Snapping help in your design workflow?", options: ["ជួយឱ្យកុំព្យូទ័រដើរលឿន", "ជួយឆក់ទាញវត្ថុឱ្យត្រង់ជួរ ឬប៉ះគ្នាជាមួយវត្ថុផ្សេងទៀតបានល្អឥតខ្ចោះ", "ជួយឱ្យរូបភាពមានចលនា", "ជួយលុបវត្ថុដែលមិនចាំបាច់"], options_en: ["Makes the computer run faster", "Magnetically pulls objects to perfectly align or touch other elements and grids", "Animates the image", "Deletes unnecessary objects"] },
    { id: 76, app: 'designer', level: 'intermediate', correct: 0, question: "តើត្រូវសង្កត់អ្វី (នៅលើ Command Controller) ដើម្បីបង្វិលវត្ថុម្ដង ១៥ ដឺក្រេ?", question_en: "What must you hold (on the Command Controller) to strictly rotate an object in 15-degree increments?", options: ["Shift", "Alt", "Command", "Space"], options_en: ["Shift", "Alt", "Command", "Space"] },
    { id: 77, app: 'designer', level: 'advanced', correct: 1, question: "ការគូសធីក 'Scale with Object' លើ Stroke មានន័យដូចម្តេច?", question_en: "What does checking 'Scale with Object' on a Stroke mean?", options: ["រូបភាពនឹងប្តូរពណ៌", "កម្រាស់បន្ទាត់នឹងប្រែប្រួលតូចធំដោយស្វ័យប្រវត្តិទៅតាមទំហំរូបពេលយើងទាញពង្រីក", "បន្ទាត់នឹងត្រូវលុបចោល", "រូបភាពនឹងប្តូរទៅជា 3D"], options_en: ["The image changes color", "The stroke thickness automatically scales proportionately when you resize the object", "The line will be deleted", "The image turns 3D"] },
    { id: 78, app: 'designer', level: 'advanced', correct: 2, question: "ហេតុអ្វីត្រូវបំប្លែង 'Convert to Curves' លើអក្សរមុនពេលបញ្ជូនឯកសារទៅរោងពុម្ព?", question_en: "Why should you use 'Convert to Curves' on text before sending a file to a commercial printer?", options: ["ដើម្បីឱ្យអក្សរស្អាតជាងមុន", "ដើម្បីឱ្យអក្សរមានស្រមោល", "ដើម្បីការពារកុំឱ្យបាត់ Font ដែលនាំឱ្យខូចទម្រង់អក្សរដើម", "ដើម្បីប្តូរភាសាអក្សរ"], options_en: ["To make the text prettier", "To add shadows to text", "To bake the text into pure vector shapes so missing font errors don't ruin the layout", "To change the language"] },
    { id: 79, app: 'designer', level: 'advanced', correct: 1, question: "តើ Global Colors គឺជាអ្វី?", question_en: "What are Global Colors?", options: ["ពណ៌ធម្មតា", "ពណ៌ដែលនៅពេលអ្នកកែប្រែវា គ្រប់វត្ថុទាំងអស់ដែលប្រើពណ៌នេះក្នុងឯកសារនឹងប្រែប្រួលតាមស្វ័យប្រវត្តិ", "ពណ៌សម្រាប់តែផែនទី", "ពណ៌ដែលអាចមានចលនា"], options_en: ["Normal colors", "A linked color swatch; if you change the swatch, every object using it updates instantly", "Colors only for maps", "Animated colors"] },
    { id: 80, app: 'designer', level: 'intermediate', correct: 1, question: "តើ View Mode បែប Outline (Wireframe) មានប្រយោជន៍អ្វី?", question_en: "What is the benefit of the Outline (Wireframe) View Mode?", options: ["សម្រាប់ព្រីនរូបសខ្មៅ", "បង្ហាញតែគ្រោងឆ្អឹងបន្ទាត់ (Paths) ដើម្បីងាយស្រួលរកកំហុស ឬវត្ថុដែលលាក់កំបាំងដោយមិនខ្វល់ពីពណ៌", "ធ្វើឱ្យរូបភាពច្បាស់", "សម្រាប់វាស់ទម្ងន់វត្ថុ"], options_en: ["Printing B&W photos", "Strips away all color and shows pure vector paths to easily find hidden elements and errors", "Makes the image clear", "Measuring object weight"] },
    { id: 81, app: 'designer', level: 'advanced', correct: 0, question: "តើប្លង់ (Planes) ទាំង ៣ របស់ Isometric Studio មានអ្វីខ្លះ?", question_en: "What are the 3 core planes in the Isometric Studio?", options: ["Top, Front, Side", "Left, Right, Center", "Up, Down, Middle", "Red, Green, Blue"], options_en: ["Top, Front, Side", "Left, Right, Center", "Up, Down, Middle", "Red, Green, Blue"] },
    { id: 82, app: 'designer', level: 'advanced', correct: 1, question: "នៅក្នុង Gradient Tool តើអ្នកអាចបន្ថែមអ្វីដើម្បីឱ្យពណ៌មើលទៅគ្រើមៗបែប Vintage?", question_en: "In the Gradient Tool, what can you add to make the color transition look gritty and vintage?", options: ["បន្ថែមស្រមោល (Shadow)", "បន្ថែមគ្រាប់អុចៗ (Noise) នៅលើ Color Stop", "បន្ថែមខ្សែបន្ទាត់ (Stroke)", "បន្ថែមពន្លឺ (Glow)"], options_en: ["Add a Shadow", "Add 'Noise' directly onto the color stop slider", "Add a Stroke", "Add a Glow"] },
    { id: 83, app: 'designer', level: 'intermediate', correct: 1, question: "បើទាញពង្រីកប្រអប់ Frame Text តើមានអ្វីកើតឡើងចំពោះអក្សរខាងក្នុង?", question_en: "If you drag the bounding box of a Frame Text, what happens to the text inside?", options: ["អក្សររីកធំតាម", "អត្ថបទគ្រាន់តែរៀបជួរថ្មី (Reflows) ប៉ុន្តែទំហំអក្សរ (Font size) នៅរក្សាដដែល", "អក្សរត្រូវលុបចោល", "អក្សរប្តូរពណ៌"], options_en: ["The text scales up", "The text simply reflows into the new space, but the Font Size remains exactly the same", "The text is deleted", "The text changes color"] },
    { id: 84, app: 'designer', level: 'beginner', correct: 1, question: "តើត្រូវធ្វើដូចម្តេចដើម្បីដាក់រូបភាពចូលក្នុងរង្វង់ (Clipping)?", question_en: "How do you place an image inside a circle (Clipping)?", options: ["ប្រើ Eraser លុបរូបភាព", "អូស Layer រូបភាពទម្លាក់ចូលទៅក្នុង (ខាងស្តាំ) Layer រង្វង់", "ប្តូរពណ៌រង្វង់", "ចុចប៊ូតុង Delete"], options_en: ["Erase the image", "Drag and drop the image layer directly into (to the right of) the circle shape layer", "Change circle color", "Press Delete"] },
    { id: 85, app: 'designer', level: 'intermediate', correct: 1, question: "តើមុខងារ Sculpt របស់ Pencil Tool ធ្វើអ្វី?", question_en: "What does the Sculpt mode of the Pencil Tool do?", options: ["លុបគំនូរចោល", "អនុញ្ញាតឱ្យអ្នកគូសជាន់កែប្រែខ្សែបន្ទាត់ចាស់ ឱ្យទៅជារូបរាងថ្មីយ៉ាងរលូនដោយមិនបាច់គូសជាពីរខ្សែ", "ប្តូរពណ៌គំនូរ", "បង្កើតរូប 3D"], options_en: ["Deletes drawings", "Allows you to seamlessly reshape an existing drawn line by simply drawing over it", "Changes drawing colors", "Creates 3D models"] },
    { id: 86, app: 'designer', level: 'advanced', correct: 0, question: "តើមុខងារ Slice នៅក្នុង Export Persona ជួយអ្វីខ្លះក្នុងការរចនា UI?", question_en: "How do Slices in the Export Persona help in UI design?", options: ["អនុញ្ញាតឱ្យអ្នកកាត់ Icon រាប់សិបនៅក្នុងផ្ទាំងតែមួយ ហើយ Export ពួកវាចេញជា File ដាច់ដោយឡែកពីគ្នាក្នុងពេលតែមួយ", "ធ្វើឱ្យអេក្រង់ភ្លឺ", "ជួយឱ្យវាយអក្សរលឿន", "ជួយការពារមេរោគ"], options_en: ["Allows you to draw boxes over dozens of individual icons and export them all as separate files simultaneously", "Brightens the screen", "Helps type faster", "Protects from viruses"] },
    { id: 87, app: 'designer', level: 'intermediate', correct: 1, question: "តើអ្នកអាចកាត់សាច់រូបភាព (Pixels) ដូចក្នុង Photoshop នៅពេលកំពុងប្រើ Designer បានទេ?", question_en: "Can you erase pixels (like in Photoshop) while working in Affinity Designer?", options: ["មិនបានទេ", "បាន ដោយប្តូរទៅកាន់ Pixel Persona រួចប្រើប្រាស់ Pixel Eraser ឬ Selection Tools", "បាន តែត្រូវបិទកម្មវិធីសិន", "បានតែលើអក្សរ"], options_en: ["No", "Yes, by switching to the Pixel Persona and using the Eraser or Marquee Selection tools", "Yes, but you must restart the app", "Only on text"] },
    { id: 88, app: 'designer', level: 'intermediate', correct: 0, question: "តើ Baseline Shift ក្នុង Typography ប្រើសម្រាប់អ្វី?", question_en: "What is Baseline Shift in Typography used for?", options: ["រុញតួអក្សរណាមួយឱ្យឡើងលើ ឬចុះក្រោមខុសពីបន្ទាត់គោលរបស់វា (ឧ. ធ្វើលេខស្វ័យគុណតូចៗ)", "ប្តូរហ្វុន", "ប្តូរពណ៌អក្សរ", "ធ្វើអោយអក្សរធំទាំងអស់"], options_en: ["Pushing specific characters above or below their normal resting line (e.g., creating custom exponents/symbols)", "Changing fonts", "Changing text color", "Making all text uppercase"] },
    { id: 89, app: 'designer', level: 'beginner', correct: 1, question: "តើ FX Studio ក្នុង Designer អនុញ្ញាតឱ្យអ្នកបន្ថែមអ្វី?", question_en: "What does the FX Studio in Designer allow you to add?", options: ["វីដេអូ", "Effect ដូចជា ស្រមោល (Drop Shadow), គែម (Outline), និងពន្លឺ (Outer Glow) ទៅលើវត្ថុណាមួយ", "ចម្រៀង", "អក្សរ 3D"], options_en: ["Videos", "Live raster effects like Drop Shadows, Outlines, and Outer Glows to any object", "Music", "3D text"] },
    { id: 90, app: 'designer', level: 'advanced', correct: 2, question: "តើអ្នកអាចរក្សាទុក (Save) កម្រងពណ៌ (Color Palette) ពីសាច់រូបថតណាមួយដោយស្វ័យប្រវត្តិបានទេ?", question_en: "Can you automatically generate and save a Color Palette from a specific photograph?", options: ["មិនបានទេ", "បាន តែត្រូវចុចយកពណ៌ម្តងមួយៗ", "បាន ដោយប្រើមុខងារ 'Create Palette from Image' នៅក្នុង Swatches Studio", "បានតែនៅលើកុំព្យូទ័រ"], options_en: ["No", "Yes, but you must pick colors one by one", "Yes, using the 'Create Palette from Image' function in the Swatches Studio", "Only on desktop"] },
    { id: 91, app: 'designer', level: 'beginner', correct: 1, question: "តើ History Slider ជួយអ្វីអ្នក?", question_en: "What does the History Slider help you do?", options: ["លុបឯកសារ", "អូសត្រឡប់ក្រោយ (Undo) ឬទៅមុខរាប់រយជំហានយ៉ាងលឿនដោយគ្រាន់តែទាញរំកិលចុះឡើង", "ប្តូរពណ៌", "Save ការងារ"], options_en: ["Deletes files", "Instantly scrub backwards (Undo) or forwards through hundreds of steps by just dragging the slider", "Changes colors", "Saves work"] },
    { id: 92, app: 'designer', level: 'intermediate', correct: 1, question: "តើ Boolean 'Add' ខុសពី 'Group' យ៉ាងណា?", question_en: "How does Boolean 'Add' differ from 'Group'?", options: ["គ្មានខុសគ្នាទេ", "Group រក្សារូបរាងដាច់ដោយឡែកពីគ្នា ឯ Add រំលាយរូបទាំងអស់ទៅជារូបរាង (Shape) តែមួយ", "Add សម្រាប់តែអក្សរ", "Group លុបពណ៌ចោល"], options_en: ["No difference", "Group keeps individual shapes separate; Add permanently welds them into a single unified shape path", "Add is only for text", "Group deletes colors"] },
    { id: 93, app: 'designer', level: 'advanced', correct: 1, question: "តើពាក្យបញ្ជា (Command) អ្វីដែលប្រើដើម្បីយកវត្ថុទៅដាក់ចូលក្នុងរូបរាងផ្សេងទៀតភ្លាមៗ?", question_en: "What command is used to instantly drop an object inside another selected shape?", options: ["Copy", "Paste Inside (ឬ Insert Inside)", "Delete", "Export"], options_en: ["Copy", "Paste Inside (or Insert Inside)", "Delete", "Export"] },
    { id: 94, app: 'designer', level: 'intermediate', correct: 2, question: "តើការចាក់សោរ (Lock) Layer មានប្រយោជន៍អ្វី?", question_en: "What is the benefit of Locking a layer?", options: ["ធ្វើឱ្យវាផ្លាស់ប្តូរពណ៌", "ធ្វើឱ្យវាធំជាងមុន", "ការពារវត្ថុនោះកុំឱ្យត្រូវរំកិល ឬលុបដោយអចេតនាពេលកំពុងធ្វើការ", "លាក់វាមិនឱ្យឃើញ"], options_en: ["Makes it change color", "Makes it bigger", "Prevents the object from being accidentally moved, selected, or deleted while working on other things", "Hides it from view"] },
    { id: 95, app: 'designer', level: 'advanced', correct: 1, question: "តើអ្នកអាចបើកឯកសាររបស់ Adobe Illustrator (.AI) នៅក្នុង Affinity Designer បានទេ?", question_en: "Can you open Adobe Illustrator (.AI) files in Affinity Designer?", options: ["មិនបានទាំងស្រុងទេ", "បាន ប្រសិនបើឯកសារ .AI នោះត្រូវបាន Save ដោយភ្ជាប់ជាមួយទម្រង់ PDF Compatible", "បាន តែមិនអាចកែប្រែបាន", "បានតែអក្សរ"], options_en: ["Absolutely not", "Yes, as long as the .AI file was saved with 'Create PDF Compatible File' checked", "Yes, but it cannot be edited", "Only the text"] },
    { id: 96, app: 'designer', level: 'intermediate', correct: 1, question: "តើមុខងារ 'Move Data Entry' អនុញ្ញាតឱ្យអ្នកធ្វើអ្វី?", question_en: "What does the 'Move Data Entry' feature allow you to do?", options: ["ប្តូរទិន្នន័យទូរស័ព្ទ", "រំកិល បង្វិល ឬចម្លងវត្ថុដោយការវាយបញ្ចូលតួលេខចម្ងាយយ៉ាងសុក្រិត (ឧ. រំកិល ១០mm ម្តងៗ)", "ចាក់សោរឯកសារ", "លុបប្រវត្តិការងារ"], options_en: ["Change mobile data", "Move, rotate, or duplicate objects by typing exact mathematical distances (e.g., exactly 10mm away)", "Lock the file", "Delete work history"] },
    { id: 97, app: 'designer', level: 'beginner', correct: 2, question: "តើ Corner Tool អាចប្រើដើម្បីបង្កើតជ្រុងបែបណាខ្លះ?", question_en: "What types of corners can the Corner Tool create?", options: ["បានតែជ្រុងកោងប៉ុណ្ណោះ", "បានតែជ្រុងត្រង់ប៉ុណ្ណោះ", "ជ្រុងកោង (Rounded), កាត់ត្រង់ (Straight), កោងចូលក្នុង (Concave) និងកាត់ខ្វៀល (Cutout)", "មិនអាចប្តូរបានទេ"], options_en: ["Only rounded corners", "Only straight corners", "Rounded, Straight, Concave, and Cutout corners", "Cannot be changed"] },
    { id: 98, app: 'designer', level: 'advanced', correct: 0, question: "តើមុខងារ Rubber Band ក្នុង Node Tool ជួយអ្វីខ្លះ?", question_en: "How does the Rubber Band mode in the Node Tool help you?", options: ["វាបង្ហាញខ្សែបន្ទាត់ព្រាងពណ៌ខៀវ ដើម្បីអោយអ្នកដឹងមុនថាតើខ្សែកោងនឹងមានរាងបែបណាមុនពេលអ្នកចុច", "វាលុបចំណុច", "វាប្តូរពណ៌បន្ទាត់", "វាចាក់សោរចំណុច"], options_en: ["It displays a live blue preview line so you know exactly what the curve will look like before you tap", "It deletes nodes", "It changes line color", "It locks nodes"] },
    { id: 99, app: 'designer', level: 'intermediate', correct: 1, question: "តើ Alignment Panel ប្រើសម្រាប់អ្វី?", question_en: "What is the Alignment Panel used for?", options: ["ប្តូរពណ៌", "តម្រឹមវត្ថុច្រើនឱ្យត្រង់ជួរគ្នា (ឧ. ស្មើឆ្វេង កណ្តាល ស្តាំ) ឬចែកគម្លាតស្មើៗគ្នាដោយស្វ័យប្រវត្តិ", "កាត់រូបភាព", "បង្កើនពន្លឺ"], options_en: ["Changing colors", "Automatically aligning multiple objects (left, center, right) or distributing exact equal space between them", "Cropping images", "Increasing brightness"] },
    { id: 100, app: 'designer', level: 'advanced', correct: 0, question: "នៅក្នុង Affinity Designer តើ 'Vector Brush Tool' ខុសពី 'Pencil Tool' យ៉ាងណា?", question_en: "In Affinity Designer, how does the 'Vector Brush Tool' differ from the 'Pencil Tool'?", options: ["Vector Brush ទាញយកក្បាលជក់រូបភាព (Raster textures) មកបិទតាមបណ្តោយខ្សែបន្ទាត់ Vector ចំណែក Pencil គូសតែបន្ទាត់សាមញ្ញសុទ្ធ", "គ្មានភាពខុសគ្នាទេ", "Pencil Tool មានពណ៌ច្រើនជាង", "Brush Tool មិនអាចកែប្រែបានទេ"], options_en: ["Vector Brush stretches raster textures along a vector path, whereas the Pencil tool draws plain solid paths", "No difference", "Pencil tool has more colors", "Brush tool paths cannot be edited"] },

    // --- 📚 PUBLISHER: 101-150 ---
    { id: 101, app: 'publisher', level: 'beginner', correct: 1, question: "តើ Affinity Publisher ត្រូវបានគេប្រើប្រាស់ជាចម្បងសម្រាប់អ្វី?", question_en: "What is Affinity Publisher primarily used for?", options: ["គូរឡូហ្គោ", "ការរៀបចំប្លង់ទំព័រច្រើនដូចជា សៀវភៅ ទស្សនាវដ្តី និងខិត្តប័ណ្ណ", "កាត់តរូបភាពកម្រិតខ្ពស់", "ធ្វើគំនូរជីវចល"], options_en: ["Drawing logos", "Multi-page layout design like books, magazines, and brochures", "Advanced photo manipulation", "Making animations"] },
    { id: 102, app: 'publisher', level: 'beginner', correct: 2, question: "តើមុខងារ StudioLink នៅក្នុង Publisher អនុញ្ញាតឱ្យអ្នកធ្វើអ្វី?", question_en: "What does the StudioLink feature in Publisher allow you to do?", options: ["ភ្ជាប់ទៅអ៊ីនធឺណិត", "ផ្ញើសារក្នុងក្រុម", "ប្រើប្រាស់ Tools របស់ Photo និង Designer ដោយមិនបាច់បិទកម្មវិធី", "ភ្ជាប់ទៅម៉ាស៊ីនព្រីន"], options_en: ["Connect to the internet", "Send group messages", "Use Photo and Designer tools seamlessly without leaving Publisher", "Connect to a printer"] },
    { id: 103, app: 'publisher', level: 'beginner', correct: 1, question: "តើមុខងារ Facing Pages ក្នុងឯកសារមានន័យដូចម្តេច?", question_en: "What does the 'Facing Pages' document setup mean?", options: ["ទំព័រដែលចាក់ពណ៌ខ្មៅ", "ទំព័រដែលតម្រៀបជាគូៗ (Spreads) ដូចពេលយើងបើកសៀវភៅអាន", "ទំព័រដែលលាក់ទុក", "ទំព័រសម្រាប់តែ Web"], options_en: ["Pages filled with black", "Pages arranged in 2-page spreads, exactly how an open book looks", "Hidden pages", "Web-only pages"] },
    { id: 104, app: 'publisher', level: 'intermediate', correct: 1, question: "តើ Master Pages ប្រើសម្រាប់អ្វី?", question_en: "What are Master Pages used for?", options: ["សម្រាប់ព្រីនចេញ", "សម្រាប់ដាក់ធាតុ (ដូចជាលេខទំព័រ ឬ Header) ដែលត្រូវបង្ហាញស្ទួនៗគ្នានៅលើទំព័រជាច្រើន", "សម្រាប់សរសេរកូដ", "សម្រាប់គូររូបភាពកាតូន"], options_en: ["For printing out", "Placing repeating elements (like page numbers or headers) automatically across multiple pages", "Writing code", "Drawing cartoons"] },
    { id: 105, app: 'publisher', level: 'intermediate', correct: 0, question: "តើអ្វីទៅជាមុខងាររបស់ Text Flow?", question_en: "What is the function of Text Flow (Linked Text Frames)?", options: ["អនុញ្ញាតឱ្យអត្ថបទហូរពីប្រអប់មួយ ទៅប្រអប់មួយទៀត ទោះនៅទំព័រផ្សេងគ្នាក៏ដោយ", "ធ្វើឱ្យអក្សរមានចលនា", "ប្តូរពណ៌អក្សរដោយស្វ័យប្រវត្តិ", "បកប្រែភាសា"], options_en: ["Allows long text to continuously pour from one frame into another, even across different pages", "Animates the text", "Changes text colors automatically", "Translates languages"] },
    { id: 106, app: 'publisher', level: 'intermediate', correct: 1, question: "ហេតុអ្វីបានជាយើងគួរប្រើ Paragraph Styles?", question_en: "Why should you use Paragraph Styles?", options: ["ព្រោះវាធ្វើឱ្យ File ស្រាល", "ដើម្បីគ្រប់គ្រង និងផ្លាស់ប្តូរទម្រង់ហ្វុន (Font) នៅទូទាំងឯកសារទាំងមូលដោយចុចតែម្តង", "ដើម្បីដាក់រូបភាព", "គ្មានប្រយោជន៍ទេ"], options_en: ["It makes the file lighter", "To globally control and instantly update font formatting across the entire document with one click", "To place images", "It is useless"] },
    { id: 107, app: 'publisher', level: 'advanced', correct: 2, question: "តើ Preflight Studio មានតួនាទីអ្វីមុនពេលអ្នក Export សៀវភៅ?", question_en: "What is the role of the Preflight Studio before exporting a book?", options: ["គណនាតម្លៃសៀវភៅ", "ដាក់លេខកូដសម្ងាត់", "ត្រួតពិនិត្យរកកំហុស ដូចជារូបភាពបែក ឬអក្សរហៀរចេញពីប្រអប់", "ប្តូរភាសាសៀវភៅ"], options_en: ["Calculates book price", "Adds a password", "Scans the document for live errors like low-resolution images or overflowing text frames", "Changes the book language"] },
    { id: 108, app: 'publisher', level: 'beginner', correct: 1, question: "តើឧបករណ៍ Picture Frame Tool ប្រើសម្រាប់អ្វី?", question_en: "What is the Picture Frame Tool used for?", options: ["សម្រាប់គូររូបភាព", "សម្រាប់គូសប្រអប់ត្រៀមទុក (Placeholder) ដើម្បីដាក់រូបភាពចូលនៅពេលក្រោយ", "សម្រាប់លុបរូបភាព", "សម្រាប់ធ្វើស៊ុមរូបថតពណ៌មាស"], options_en: ["Drawing pictures", "Creating a placeholder box to perfectly drop images into later", "Deleting pictures", "Making gold photo frames"] },
    { id: 109, app: 'publisher', level: 'intermediate', correct: 0, question: "តើ Margin នៅក្នុង Publisher មានប្រយោជន៍អ្វី?", question_en: "What is the purpose of Margins in Publisher?", options: ["ជាបន្ទាត់សុវត្ថិភាពខាងក្នុង ដើម្បីកុំឱ្យអក្សរនៅកៀកគែមក្រដាសពេក", "ជាបន្ទាត់សម្រាប់កាត់ក្រដាសចោល", "ជាកន្លែងដាក់ពណ៌", "ជាកន្លែងសម្រាប់សរសេរចំណងជើង"], options_en: ["An inner safety boundary to ensure text doesn't sit too close to the paper edge", "A line for cutting paper", "A place for coloring", "A place for writing titles"] },
    { id: 110, app: 'publisher', level: 'intermediate', correct: 1, question: "តើ Bleed នៅក្នុង Document Setup គឺជាអ្វី?", question_en: "What is the Bleed in Document Setup?", options: ["ប្រភេទពណ៌", "គែមបន្ថែមដែលហៀរចេញក្រៅទំហំក្រដាស ដើម្បីការពារកុំឱ្យមានសល់គែមពណ៌សពេលរោងពុម្ពកាត់កាត", "ឈ្មោះហ្វុនអក្សរ", "ប្រភេទក្រដាសព្រីន"], options_en: ["A color type", "An extended boundary outside the page size to prevent accidental white borders when the printer trims the paper", "A font name", "A print paper type"] },
    { id: 111, app: 'publisher', level: 'advanced', correct: 1, question: "តើ 'Edit Detached' នៅក្នុងការគ្រប់គ្រង Master Page ធ្វើអ្វីខ្លះ?", question_en: "What does 'Edit Detached' do when managing Master Pages?", options: ["លុប Master Page ចោល", "អនុញ្ញាតឱ្យអ្នកកែប្រែវត្ថុរបស់ Master Page តែនៅលើទំព័រមួយប៉ុណ្ណោះ ដោយមិនប៉ះពាល់ដល់ទំព័រផ្សេងទៀត", "ចម្លងទំព័រ", "ផ្លាស់ប្តូរពណ៌ Master Page"], options_en: ["Deletes the Master Page", "Allows you to modify a Master Page object on one specific page without breaking the link for all other pages", "Copies the page", "Changes the Master Page color"] },
    { id: 112, app: 'publisher', level: 'advanced', correct: 0, question: "តើមុខងារ Data Merge ប្រើសម្រាប់អ្វី?", question_en: "What is the Data Merge feature used for?", options: ["ទាញយកទិន្នន័យពី Excel ឬ CSV មកបង្កើតកាត, សំបុត្រ ឬវិក្កយបត្ររាប់រយសន្លឹកដោយស្វ័យប្រវត្តិ", "បញ្ចូលរូបភាពពីរចូលគ្នា", "លុបទិន្នន័យចោល", "បកប្រែអត្ថបទ"], options_en: ["Pulling data from an Excel or CSV file to automatically generate hundreds of business cards, letters, or invoices", "Merging two images", "Deleting data", "Translating text"] },
    { id: 113, app: 'publisher', level: 'advanced', correct: 1, question: "តើ Section Manager ប្រើសម្រាប់អ្វីក្នុងការធ្វើសៀវភៅ?", question_en: "What is the Section Manager used for in book layout?", options: ["រៀបចំពណ៌សៀវភៅ", "បែងចែកឯកសារជាជំពូក (Chapters) ដើម្បីកំណត់រចនាប័ទ្មលេខទំព័រខុសៗគ្នា (ឧ. លេខរ៉ូម៉ាំង និងលេខធម្មតា)", "កាត់តវីដេអូសៀវភៅ", "ធ្វើក្របទស្សនាវដ្តី"], options_en: ["Arranging book colors", "Dividing the document into Chapters to control different page numbering styles (e.g., Roman vs Arabic numerals)", "Video editing books", "Making magazine covers"] },
    { id: 114, app: 'publisher', level: 'intermediate', correct: 0, question: "តើមុខងារ Table of Contents (TOC) ដំណើរការដោយរបៀបណា?", question_en: "How does the Table of Contents (TOC) feature work?", options: ["វាទាញយកអត្ថបទដែលមាន Paragraph Styles ដែលអ្នកកំណត់ រួចបង្កើតជាមាតិកាដោយស្វ័យប្រវត្តិ", "វាត្រូវតែវាយដោយដៃទាំងអស់", "វាទាញយករូបភាពមកធ្វើជាមាតិកា", "វាទាញយកពី Google"], options_en: ["It scans for text using specific Paragraph Styles you select and automatically generates the index list", "It must be typed entirely by hand", "It pulls images into an index", "It pulls from Google"] },
    { id: 115, app: 'publisher', level: 'advanced', correct: 1, question: "ប្រសិនបើអ្នកចង់បង្កើត Button ឬអត្ថបទដែលអាចចុចបើក Website បាន (ក្នុង PDF) តើត្រូវប្រើ Panel មួយណា?", question_en: "If you want to create a clickable button or text that opens a Website in a PDF, which panel do you use?", options: ["Symbols Panel", "Hyperlinks Panel", "Assets Panel", "Color Panel"], options_en: ["Symbols Panel", "Hyperlinks Panel", "Assets Panel", "Color Panel"] },
    { id: 116, app: 'publisher', level: 'intermediate', correct: 1, question: "តើ Baseline Grid ជួយអ្វីខ្លះក្នុងការរៀបចំប្លង់អត្ថបទ?", question_en: "How does the Baseline Grid help in text layout?", options: ["ធ្វើឱ្យអក្សរមានពណ៌ដូចគ្នា", "បង្ខំឱ្យបន្ទាត់អត្ថបទនៅលើទំព័រទាំងអស់ តម្រឹមស្មើគ្នាល្អឥតខ្ចោះជួរដេក (Alignment)", "ធ្វើឱ្យអក្សរធំជាងមុន", "លុបអក្សរចោល"], options_en: ["Makes text the same color", "Forces text lines across all pages and columns to perfectly align horizontally", "Makes text larger", "Deletes text"] },
    { id: 117, app: 'publisher', level: 'beginner', correct: 0, question: "តើ Text Wrap មានន័យដូចម្តេច?", question_en: "What does Text Wrap mean?", options: ["ការរុញអត្ថបទឱ្យរត់គេច (ព័ទ្ធជុំវិញ) រូបភាព ឬវត្ថុណាមួយ", "ការលាក់អត្ថបទ", "ការផ្លាស់ប្តូរហ្វុនអក្សរ", "ការធ្វើឱ្យអត្ថបទមានស្រមោល"], options_en: ["Pushing text to flow completely around an image or object", "Hiding text", "Changing text fonts", "Adding shadows to text"] },
    { id: 118, app: 'publisher', level: 'advanced', correct: 1, question: "តើ Package feature ក្នុង Affinity Publisher ធ្វើអ្វី?", question_en: "What does the Package feature in Affinity Publisher do?", options: ["វេចខ្ចប់សៀវភៅពិតៗ", "ប្រមូលផ្តុំឯកសារ រូបភាព (Linked images) និងហ្វុន (Fonts) ទាំងអស់ដាក់ក្នុង Folder តែមួយដើម្បីផ្ញើទៅរោងពុម្ព", "បង្កើត File ZIP តែមួយមុខ", "បង្រួមទំហំ File អោយតូចបំផុត"], options_en: ["Physically packages books", "Collects the Publisher file, all linked images, and fonts into one folder to send to the printer", "Only creates a ZIP file", "Compresses file size to minimum"] },
    { id: 119, app: 'publisher', level: 'intermediate', correct: 1, question: "ភាពខុសគ្នារវាង Linked Image និង Embedded Image គឺអ្វី?", question_en: "What is the difference between a Linked Image and an Embedded Image?", options: ["គ្មានភាពខុសគ្នាទេ", "Linked មិនបញ្ជូលរូបទៅក្នុង File ទេ ធ្វើឱ្យ File ស្រាលចំណែក Embedded បញ្ចូលរូបទៅក្នុង File ផ្ទាល់ធ្វើឱ្យ File ធ្ងន់", "Linked មានពណ៌ Embedded គ្មានពណ៌", "Embedded សម្រាប់តែវីដេអូ"], options_en: ["No difference", "Linked points to an external image keeping the file size small; Embedded saves the image directly into the document making it heavier", "Linked has color, Embedded doesn't", "Embedded is only for video"] },
    { id: 120, app: 'publisher', level: 'advanced', correct: 0, question: "តើ Format មួយណាដែលរោងពុម្ពខ្នាតធំ (Commercial Printers) តែងតែទាមទារសម្រាប់ការ Export?", question_en: "Which format do commercial printers usually require for Exporting?", options: ["PDF/X-4 (ឬ PDF/X-1a)", "PNG", "SVG", "GIF"], options_en: ["PDF/X-4 (or PDF/X-1a)", "PNG", "SVG", "GIF"] },
    { id: 121, app: 'publisher', level: 'intermediate', correct: 1, question: "តើមុខងារ 'Pinning' នៅក្នុង Publisher ប្រើសម្រាប់អ្វី?", question_en: "What is the 'Pinning' feature in Publisher used for?", options: ["ចាក់សោរឯកសារ", "ភ្ជាប់ (Pin) រូបភាពទៅនឹងអត្ថបទ ដើម្បីឱ្យរូបភាពរំកិលតាមពេលអត្ថបទត្រូវរុញចុះក្រោម", "ដាក់លេខកូដសម្ងាត់", "ភ្ជាប់អ៊ីនធឺណិត"], options_en: ["Locking the document", "Pinning an image to text so it moves automatically when text is reflowed", "Setting a password", "Connecting to the internet"] },
    { id: 122, app: 'publisher', level: 'intermediate', correct: 0, question: "តើ Drop Caps គឺជាអ្វី?", question_en: "What are Drop Caps?", options: ["ការធ្វើឱ្យអក្សរទីមួយនៃកថាខណ្ឌមានទំហំធំ (ធ្លាក់ចុះ២-៣បន្ទាត់)", "ការលុបអក្សរធំចោល", "ការដាក់ស្រមោលអក្សរ", "ប្រភេទនៃមួក"], options_en: ["Enlarging the first letter of a paragraph to drop down multiple lines", "Deleting capital letters", "Adding shadows to text", "A type of hat"] },
    { id: 123, app: 'publisher', level: 'advanced', correct: 1, question: "តើ Resource Manager មានតួនាទីអ្វី?", question_en: "What is the role of the Resource Manager?", options: ["គ្រប់គ្រងបុគ្គលិក", "គ្រប់គ្រង និងតាមដានរូបភាពឬឯកសារទាំងអស់ដែលបាន Link ចូលក្នុងសៀវភៅ", "គ្រប់គ្រងពណ៌", "គ្រប់គ្រងទំហំក្រដាស"], options_en: ["Managing employees", "Managing and tracking all linked images/files placed in the document", "Managing colors", "Managing paper size"] },
    { id: 124, app: 'publisher', level: 'advanced', correct: 1, question: "តើ Character Style ខុសពី Paragraph Style យ៉ាងម៉េច?", question_en: "How does Character Style differ from Paragraph Style?", options: ["គ្មានខុសគ្នាទេ", "Character ប្រើលើអក្សរដែលបាន Select បន្តិចបន្តួច ចំណែក Paragraph ប្តូរទាំងកថាខណ្ឌតែម្តង", "Character សម្រាប់រូបភាព Paragraph សម្រាប់អក្សរ", "Paragraph ដើរលឿនជាង"], options_en: ["No difference", "Character style applies only to highlighted text, Paragraph applies to the entire text block", "Character is for images, Paragraph for text", "Paragraph runs faster"] },
    { id: 125, app: 'publisher', level: 'intermediate', correct: 2, question: "តើអក្សរ 'Ligatures' គឺជាអ្វី?", question_en: "What are 'Ligatures' in typography?", options: ["អក្សរដែលមានពណ៌", "អក្សរដែលសរសេរខុស", "ការតភ្ជាប់តួអក្សរពីរឬច្រើនបញ្ចូលគ្នាឱ្យមើលទៅស្អាត (ឧ. f និង i ក្លាយជា fi)", "អក្សរដែលគ្មានកន្ទុយ"], options_en: ["Colored letters", "Misspelled words", "Two or more letters visually joined together for typographic elegance (e.g., 'fi')", "Letters without serifs"] },
    { id: 126, app: 'publisher', level: 'beginner', correct: 1, question: "តើសញ្ញាភ្នែកពណ៌ក្រហម (Red Eye Icon) នៅខាងស្តាំប្រអប់អក្សរមានន័យថាម៉េច?", question_en: "What does the Red Eye Icon on the right side of a text frame mean?", options: ["ប្រអប់អក្សរមានមេរោគ", "ប្រអប់នោះតូចពេក ធ្វើឱ្យអក្សរហៀរចេញមកក្រៅ (Overflowing Text)", "អក្សរនោះត្រូវគេលួច", "ហ្វុនអក្សរមិនត្រឹមត្រូវ"], options_en: ["The text frame has a virus", "The frame is too small, causing text to overflow and be hidden", "The text is stolen", "Incorrect font"] },
    { id: 127, app: 'publisher', level: 'advanced', correct: 0, question: "តើមុខងារ Optical Alignment ជួយអ្វីខ្លះ?", question_en: "How does Optical Alignment help?", options: ["រុញសញ្ញាខណ្ឌ (ឧ. សញ្ញាព្រួញ ឬក្បៀស) ឱ្យចេញក្រៅគែមប្រអប់បន្តិច ដើម្បីឱ្យជួរអក្សរមើលទៅត្រង់ស្អាត", "ជួយឱ្យអ្នកមើលឃើញច្បាស់នៅពេលយប់", "ផ្លាស់ប្តូរពណ៌កែវភ្នែក", "ធ្វើឱ្យអក្សរធំជាងមុន"], options_en: ["Pushes punctuation slightly outside the text frame edge to make the margin visually straight", "Helps you see clearly at night", "Changes eye color", "Makes text bigger"] },
    { id: 128, app: 'publisher', level: 'beginner', correct: 1, question: "តើការ Export ជា 'Spreads' មានន័យថាម៉េច?", question_en: "What does Exporting as 'Spreads' mean?", options: ["Export ជាវីដេអូ", "ព្រីនទំព័រជាប់គ្នាជាគូៗ (ទំព័រឆ្វេងនិងស្តាំជាប់គ្នាជារូបមួយ)", "Export តែរូបភាព", "Export ជា File ផ្សេងៗគ្នា"], options_en: ["Export as video", "Exporting left and right facing pages joined together as a single wide image/page", "Export only images", "Export as separate files"] },
    { id: 129, app: 'publisher', level: 'advanced', correct: 1, question: "តើមុខងារ Glyph Browser ប្រើសម្រាប់អ្វី?", question_en: "What is the Glyph Browser used for?", options: ["ស្វែងរកក្នុងអ៊ីនធឺណិត", "ស្វែងរកនិមិត្តសញ្ញា ឬអក្សរពិសេសៗដែលគ្មាននៅលើ Keyboard (ឧ. ©, ™)", "ស្វែងរករូបភាព", "ស្វែងរកឈ្មោះ Font"], options_en: ["Searching the internet", "Finding special symbols and characters not available on a standard keyboard", "Searching for images", "Searching for font names"] },
    { id: 130, app: 'publisher', level: 'intermediate', correct: 0, question: "តើត្រូវធ្វើដូចម្តេចបើអ្នកចង់ប្តូរពាក្យ 'Company' ទៅជា 'Brand' គ្រប់ទំព័រទាំងអស់ក្នុងសៀវភៅ?", question_en: "How do you change the word 'Company' to 'Brand' across all pages in a book?", options: ["ប្រើមុខងារ Find and Replace", "អានហើយកែដោយដៃម្តងមួយៗ", "លុបសៀវភៅចោល", "មិនអាចធ្វើបានទេ"], options_en: ["Use the Find and Replace panel", "Read and change them manually one by one", "Delete the book", "It cannot be done"] },
    { id: 131, app: 'publisher', level: 'intermediate', correct: 1, question: "តើការដាក់លេខទំព័រ (Page Number) គួរធ្វើនៅលើទីតាំងណាទើបត្រូវ?", question_en: "Where should Page Numbers be placed correctly?", options: ["នៅលើទំព័រនីមួយៗផ្ទាល់", "នៅលើ Master Pages", "នៅលើក្របទស្សនាវដ្តី", "នៅលើ Picture Frame"], options_en: ["Directly on each page", "On the Master Pages", "On the magazine cover", "On a Picture Frame"] },
    { id: 132, app: 'publisher', level: 'advanced', correct: 0, question: "បើចង់ Export ទៅរោងពុម្ព តើអ្នកគួរជ្រើសរើសជម្រើសមួយណាទើបល្អបំផុត?", question_en: "If exporting to a commercial printer, which option is best?", options: ["PDF (សម្រាប់ Print) - ជាពិសេស PDF/X", "PNG", "JPEG", "GIF"], options_en: ["PDF (for Print) - specifically PDF/X standards", "PNG", "JPEG", "GIF"] },
    { id: 133, app: 'publisher', level: 'intermediate', correct: 1, question: "តើមុខងារ 'Show Text Flow' បង្ហាញអ្វីខ្លះ?", question_en: "What does 'Show Text Flow' display?", options: ["ទឹកដែលកំពុងហូរ", "បង្ហាញខ្សែបន្ទាត់ព្រាងដែលតភ្ជាប់ប្រអប់អក្សរមួយទៅប្រអប់អក្សរមួយទៀត", "បង្ហាញវីដេអូ", "បង្ហាញពណ៌អក្សរ"], options_en: ["Flowing water", "Displays the invisible threads linking one text frame to another", "Displays video", "Displays text color"] },
    { id: 134, app: 'publisher', level: 'advanced', correct: 1, question: "បើមានបញ្ហា 'Missing Fonts' តើត្រូវធ្វើដូចម្តេច?", question_en: "What should you do if you encounter a 'Missing Fonts' error?", options: ["លុបអក្សរចោល", "ចូលទៅ Font Manager ដើម្បីជំនួសហ្វុននោះដោយហ្វុនផ្សេងដែលមាន", "បិទកម្មវិធី", "ព្រីនវាចេញតែម្តង"], options_en: ["Delete the text", "Go to the Font Manager to swap it out with an available font", "Close the app", "Print it anyway"] },
    { id: 135, app: 'publisher', level: 'advanced', correct: 0, question: "តើ Package feature ជួយសម្រួលការងារអ្វី?", question_en: "How does the Package feature simplify work?", options: ["វាប្រមូលផ្តុំ ឯកសារ ហ្វុន និងរូបភាពទាំងអស់ដាក់ក្នុង Folder តែមួយ ងាយស្រួលផ្ញើទៅអ្នកដទៃ", "វាជួយឱ្យកុំព្យូទ័រដើរលឿន", "វាវេចខ្ចប់សៀវភៅពិតៗ", "វាបកប្រែភាសា"], options_en: ["It gathers the document, all used fonts, and linked images into one neat folder for sharing", "It makes the computer run faster", "It physically packages books", "It translates languages"] },
    { id: 136, app: 'publisher', level: 'intermediate', correct: 2, question: "តើមុខងារ Hyperlink អាចភ្ជាប់ទៅកាន់ទីតាំងណាខ្លះ?", question_en: "Where can the Hyperlink feature link to?", options: ["បានតែវេបសាយប៉ុណ្ណោះ", "បានតែទំព័រក្នុងសៀវភៅប៉ុណ្ណោះ", "វេបសាយ (URL), អ៊ីមែល, ឬទំព័រណាមួយនៅក្នុងឯកសារនោះ", "មិនអាចភ្ជាប់ទៅណាបានទេ"], options_en: ["Only websites", "Only pages within the book", "Web URLs, Emails, or specific pages within the same document", "Cannot link anywhere"] },
    { id: 137, app: 'publisher', level: 'advanced', correct: 1, question: "តើ Cross-Reference មានអត្ថប្រយោជន៍អ្វី?", question_en: "What is the benefit of a Cross-Reference?", options: ["លុបអក្សរចោល", "បង្កើតអត្ថបទចង្អុលបង្ហាញ (ឧ. សូមមើលទំព័រ ៥) ដែលវានឹងប្តូរលេខទំព័រដោយស្វ័យប្រវត្តិបើសៀវភៅត្រូវរុញទំព័រ", "ប្តូរពណ៌អក្សរ", "បង្វិលរូបភាព"], options_en: ["Deletes text", "Creates dynamic references (e.g., 'See page 5') that automatically update if the page numbers shift", "Changes text color", "Rotates images"] },
    { id: 138, app: 'publisher', level: 'intermediate', correct: 0, question: "តើ Index នៅក្នុងសៀវភៅគឺជាអ្វី?", question_en: "What is an Index in a book?", options: ["តារាងពាក្យគន្លឹះដែលតម្រៀបតាមអក្ខរក្រមនៅចុងសៀវភៅ ជាមួយនឹងលេខទំព័ររបស់វា", "គម្របសៀវភៅ", "រូបភាពនៅដើមសៀវភៅ", "ចំណងជើងរឿង"], options_en: ["An alphabetical list of keywords and their corresponding page numbers at the end of a book", "Book cover", "Images at the beginning of the book", "Story title"] },
    { id: 139, app: 'publisher', level: 'advanced', correct: 1, question: "តើអាចដាក់លេខកូដសម្ងាត់ (Password) លើឯកសារ PDF បានទេពី Publisher?", question_en: "Can you set a Password on a PDF file exported from Publisher?", options: ["មិនបានទេ", "បាន ដោយកំណត់នៅក្នុងផ្ទាំង PDF Export Options", "បានតែតាមរយៈកម្មវិធីផ្សេង", "បានតែលើរូបភាព"], options_en: ["No", "Yes, by configuring the Password Protection settings in PDF Export Options", "Only through other software", "Only on images"] },
    { id: 140, app: 'publisher', level: 'advanced', correct: 1, question: "តើ 'Slug Area' គឺជាអ្វី?", question_en: "What is the 'Slug Area'?", options: ["សត្វខ្យង", "តំបន់នៅខាងក្រៅ Bleed សម្រាប់ដាក់ព័ត៌មាន ឬចំណាំប្រាប់ទៅកាន់រោងពុម្ព", "កន្លែងសម្រាប់គូររូប", "កន្លែងសម្រាប់ចាក់ពណ៌ខ្មៅ"], options_en: ["A type of snail", "The area outside the bleed used for printer instructions or color bars", "A place to draw", "A place to fill with black"] },
    { id: 141, app: 'publisher', level: 'advanced', correct: 0, question: "តើ Color Profile (ឧ. FOGRA39) មានតួនាទីអ្វី?", question_en: "What is the role of a Color Profile (e.g., FOGRA39)?", options: ["ធានាថាពណ៌ដែលអ្នកឃើញ និងពណ៌ដែលរោងពុម្ពបោះពុម្ពចេញមក គឺដូចគ្នា", "ប្តូររូបទៅជាសខ្មៅ", "ធ្វើឱ្យ File ស្រាល", "ប្តូរទំហំសៀវភៅ"], options_en: ["Ensures the colors you see on screen match the exact ink output of the printing press", "Turns the image black and white", "Makes the file lighter", "Changes book size"] },
    { id: 142, app: 'publisher', level: 'advanced', correct: 1, question: "តើ 'Overprint Black' មានន័យដូចម្តេច?", question_en: "What does 'Overprint Black' mean?", options: ["ព្រីនតែពណ៌ខ្មៅសុទ្ធ", "អក្សរពណ៌ខ្មៅនឹងបោះពុម្ពត្រួតពីលើពណ៌ផ្ទៃខាងក្រោយដោយមិនចោះប្រហោង (ការពារកុំឱ្យមានគែមសកាលណាម៉ាស៊ីនព្រីនរំកិលខុស)", "កុំព្យូទ័រនឹងគាំង", "ព្រីនចេញមកគ្មានពណ៌"], options_en: ["Prints only pure black", "Black text prints directly over background colors without knocking them out (prevents white gaps if printer misaligns)", "Computer will crash", "Prints with no color"] },
    { id: 143, app: 'publisher', level: 'intermediate', correct: 1, question: "តើការបង្កើត Table ក្នុង Publisher យើងអាចកំណត់អ្វីបានខ្លះ?", question_en: "What can you configure when creating a Table in Publisher?", options: ["កំណត់បានតែទំហំប៉ុណ្ណោះ", "អាចកំណត់ពណ៌ផ្ទៃ គែមបន្ទាត់ និងស្ទីលអក្សរសម្រាប់តារាងទាំងមូល", "កំណត់បានតែពណ៌សខ្មៅ", "មិនអាចកំណត់អ្វីបានទេ"], options_en: ["Only size can be configured", "You can configure cell fills, borders, and typography styles for the entire table", "Only black and white can be configured", "Cannot configure anything"] },
    { id: 144, app: 'publisher', level: 'intermediate', correct: 0, question: "ក្នុង Section Manager តើអាចកំណត់លេខទំព័រចាប់ផ្តើមឡើងវិញ (Restart page numbering) បានទេ?", question_en: "In the Section Manager, can you restart page numbering?", options: ["បាន អ្នកអាចកំណត់ឱ្យជំពូកថ្មីចាប់ផ្តើមពីទំព័រទី ១ ឡើងវិញជានិច្ច", "មិនបានទេ លេខត្រូវតែរត់បន្តគ្នារហូត", "បានតែនៅទំព័រចុងក្រោយ", "បានតែទំព័រសេស"], options_en: ["Yes, you can force a new chapter to restart numbering from page 1", "No, numbers must run continuously", "Only on the last page", "Only on odd pages"] },
    { id: 145, app: 'publisher', level: 'advanced', correct: 1, question: "តើ Baseline Grid មានភាពខុសគ្នាពី Document Grid យ៉ាងម៉េច?", question_en: "How does the Baseline Grid differ from the Document Grid?", options: ["គ្មានខុសគ្នាទេ", "Baseline សម្រាប់ទាញជួរអក្សរឱ្យត្រង់ ចំណែក Document Grid សម្រាប់ទាញរូបរាង និងប្លង់", "Baseline មានពណ៌ Document Grid អត់ពណ៌", "Baseline សម្រាប់តែវីដេអូ"], options_en: ["No difference", "Baseline is specifically for aligning text rows, Document Grid is for objects and layouts", "Baseline has color, Document Grid doesn't", "Baseline is only for video"] },
    { id: 146, app: 'publisher', level: 'advanced', correct: 1, question: "តើអ្នកអាចទាញយក Master Page មួយ ទៅដាក់ត្រួតលើ Master Page មួយទៀតបានទេ?", question_en: "Can you apply a Master Page onto another Master Page?", options: ["មិនបានទេ", "បាន! វាហៅថា Master Page Hierarchies ដើម្បីកុំឱ្យរចនាវត្ថុដដែលៗ", "បាន តែវាគាំងកម្មវិធី", "បានតែនៅលើកុំព្យូទ័រ"], options_en: ["No", "Yes! This is called Master Page Hierarchies, saving you from rebuilding repeated elements", "Yes, but it crashes the app", "Only on desktop"] },
    { id: 147, app: 'publisher', level: 'advanced', correct: 0, question: "ពេលនាំចូលអត្ថបទពី Microsoft Word ចូល Publisher តើវាជាប់ Styles មកជាមួយទេ?", question_en: "When importing text from Microsoft Word into Publisher, does it keep the Styles?", options: ["វាអាចទាញយក Styles ដើមមកជាមួយ ហើយយើងអាច Map វាចូលទៅក្នុង Styles របស់ Publisher បាន", "មិនជាប់ទេ អត្ថបទនឹងទៅជាកាឡៃ", "ជាប់តែពណ៌ខ្មៅ", "មិនអាចនាំចូលពី Word បានទេ"], options_en: ["It can import the original styles, which you can map directly to your Publisher Paragraph Styles", "No, the text will be corrupted", "Only black color is kept", "Cannot import from Word"] },
    { id: 148, app: 'publisher', level: 'intermediate', correct: 1, question: "តើ Text Frame Columns អនុញ្ញាតឱ្យអ្នកធ្វើអ្វី?", question_en: "What do Text Frame Columns allow you to do?", options: ["ប្តូរពណ៌អក្សរ", "បែងចែកប្រអប់អក្សរតែមួយ ឱ្យទៅជា ២ ឬ ៣ ជួរ (Columns) ដោយស្វ័យប្រវត្តិ", "លុបប្រអប់អក្សរចោល", "ធ្វើឱ្យប្រអប់វិល"], options_en: ["Change text color", "Automatically splits a single text frame into 2, 3, or more vertical columns", "Delete the text frame", "Make the frame spin"] },
    { id: 149, app: 'publisher', level: 'intermediate', correct: 0, question: "តើអ្វីទៅជា 'Soft Return' ពេលកំពុងវាយអត្ថបទ (Shift + Enter)?", question_en: "What is a 'Soft Return' when typing text (Shift + Enter)?", options: ["ទម្លាក់ជួរថ្មីដោយមិនដាច់កថាខណ្ឌ (រក្សា Paragraph Style ដដែល)", "លុបអក្សរមួយពាក្យ", "ត្រលប់ក្រោយ (Undo)", "ប្តូរហ្វុន"], options_en: ["Creates a line break without starting a new paragraph (keeps current Paragraph Style)", "Deletes one word", "Goes back (Undo)", "Changes the font"] },
    { id: 150, app: 'publisher', level: 'advanced', correct: 1, question: "តើ Affinity Publisher គាំទ្រឯកសារ .INDD របស់ Adobe InDesign ទេ?", question_en: "Does Affinity Publisher support Adobe InDesign .INDD files?", options: ["គាំទ្រ ១០០%", "មិនគាំទ្រ .INDD ទេ ប៉ុន្តែអាចបើកឯកសារ .IDML របស់ InDesign បានយ៉ាងល្អ", "មិនគាំទ្រទាល់តែសោះ", "គាំទ្រតែនៅលើ Mac"], options_en: ["Supports 100%", "It does not support .INDD files, but it CAN open InDesign .IDML files perfectly", "Does not support at all", "Supports only on Mac"] }
];