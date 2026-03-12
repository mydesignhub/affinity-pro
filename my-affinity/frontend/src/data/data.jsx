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

// 🌟 BILINGUAL 3-PILLAR IPAD MASTERCLASS CURRICULUM 🌟
export const courseData = {
  photo: [
    { 
      id: 'ph1', 
      title: 'ជំពូកទី ១៖ ការចាប់ផ្តើម និងផ្ទៃការងារ', 
      title_en: 'Phase 1: Getting Started & Workspace', 
      desc: 'ស្ទាត់ជំនាញលើ Home Screen, កាយវិការបញ្ជា (Touch Gestures) និង Command Controller។', 
      desc_en: 'Master the iPad Home Screen, touch gestures, and the Command Controller.', 
      content: '• Home Screen៖ រៀនពីការគ្រប់គ្រង "Live Docs" និងការរៀបចំគម្រោងការងារ។\n• កាយវិការបញ្ជា (Touch Gestures)៖ ប្រើម្រាមពីរដើម្បី Undo, ម្រាមបីដើម្បី Redo និងការចាប់ពង្រីក។\n• ផ្ទៃកម្មវិធី (Interface)៖ ស្វែងយល់ពី Tools, Studios និង Contextual Toolbar។\n• ឧបករណ៍លើ iPad៖ ការប្រើប្រាស់ Command Controller និង Quick Menu។', 
      content_en: '• The Home Screen: Learn to manage "Live Docs" and organize work.\n• Touch Gestures: Master two-finger undo, three-finger redo, and pinching.\n• Interface Layout: Navigate Tools, Studios, and the Contextual Toolbar.\n• iPad-Specific Tools: Use the Command Controller and Quick Menu.', 
      videoUrl: 'https://www.youtube.com/embed/KjL759jG9m4' 
    },
    { 
      id: 'ph2', 
      title: 'ជំពូកទី ២៖ មូលដ្ឋាននៃការកែរូបថត', 
      title_en: 'Phase 2: Fundamental Photo Editing', 
      desc: 'ការនាំចូលឯកសារ RAW, ការកាត់តម្រឹម និងការប្រើប្រាស់ Develop Persona។', 
      desc_en: 'Import RAW files, crop, and master the non-destructive Develop Persona.', 
      content: '• ការនាំចូល និងការដាក់រូបភាព៖ អូសទាញរូបភាព ឬប្រើម៉ឺនុយ Place។\n• កាត់ និងតម្រឹម៖ ប្រើ Crop tool និងតម្រង់ប្លង់ផ្តេក (Horizon) ឱ្យត្រង់។\n• Develop Persona៖ ការកែតម្រូវពន្លឺ និងស្រមោលលើឯកសារ RAW ដោយមិនខូចគុណភាពដើម។\n• ការលុបស្នាម៖ ប្រើ Inpainting និង Spot Healing ដើម្បីលុបមុន ឬវត្ថុមិនចង់បាន។', 
      content_en: '• Importing & Placement: Drag and drop images or use the Place menu.\n• Crop & Straighten: Use the Crop tool and straighten horizons.\n• The Develop Persona: Non-destructive adjustments to RAW files.\n• Basic Retouching: Use Inpainting and Spot Healing for blemishes.', 
      videoUrl: '' 
    },
    { 
      id: 'ph3', 
      title: 'ជំពូកទី ៣៖ Layers, Masks និងការកែពណ៌', 
      title_en: 'Phase 3: Layers, Masks & Adjustments', 
      desc: 'គ្រប់គ្រង Pixel និង Vector Layers, ការស៊ិចឡិច (Selections) និង Live Filters។', 
      desc_en: 'Control pixel and vector layers, smart selections, and live filters.', 
      content: '• ការគ្រប់គ្រង Layer៖ ស្វែងយល់ពី Pixel, Vector និង Text layers។\n• Selections៖ ប្រើ Smart Selection Brush និង Refine Edge ដើម្បីកាត់សក់។\n• ការកែពណ៌ (Adjustments)៖ ប្រើ Curves, Levels និង HSL layers ដែលអាចកែប្រែបានគ្រប់ពេល។\n• Masking៖ ប្រើ Mask Layers ដើម្បីលាក់ផ្នែកខ្លះនៃរូបភាព។', 
      content_en: '• Layer Management: Understand pixel, vector, and text layers.\n• Selections: Use the Smart Selection Brush and Refine Edge.\n• Non-Destructive Adjustments: Apply Curves, Levels, and HSL layers.\n• Masking: Use Mask Layers to hide parts of an image.', 
      videoUrl: '' 
    },
    { 
      id: 'ph4', 
      title: 'ជំពូកទី ៤៖ ការផ្គុំរូប និង Export ឯកសារ', 
      title_en: 'Phase 4: Creative Projects & Exporting', 
      desc: 'បន្ថែម Effect អក្សរ, Blend Modes និងការ Export ឯកសារចុងក្រោយ។', 
      desc_en: 'Add text effects, blend modes, and export slices for final delivery.', 
      content: '• ការបន្ថែមអក្សរ និង FX៖ ប្រើ Text tool និង FX Studio សម្រាប់ដាក់ស្រមោល និងគែម។\n• Compositing៖ ផ្គុំរូបភាពដោយប្រើ Blend Modes (Multiply, Screen) ឱ្យស៊ីសង្វាក់គ្នា។\n• Export Persona៖ Export ជា JPEG, PNG ឬ TIFF ជាមួយនឹងការគ្រប់គ្រងទំហំ។', 
      content_en: '• Adding Text & FX: Use the Text tool and FX Studio for outlines.\n• Compositing: Combine assets using Blend Modes (Multiply, Screen).\n• Export Persona: Export in JPEG, PNG, or TIFF with slice control.', 
      videoUrl: '' 
    },
    { 
      id: 'ph5', 
      title: 'ជំពូកទី ៥៖ ក្បួនកែស្បែក Portrait អាជីព', 
      title_en: 'Phase 5: Professional Portrait Retouch', 
      desc: 'ស្ទាត់ជំនាញបច្ចេកទេស Frequency Separation និង Dodge & Burn សម្រាប់ការកែរូប Portrait។', 
      desc_en: 'Master Frequency Separation and non-destructive dodging and burning.', 
      content: '• Frequency Separation៖ បំបែករូបភាពជា High/Low frequency ដើម្បីកែស្បែកឱ្យម៉ដ្ឋតែមិនបាត់សាច់រូប។\n• Dodge and Burn៖ បន្ថែមពន្លឺ និងស្រមោលដើម្បីបង្កើតទម្រង់មុខឱ្យកាន់តែលេចធ្លោ។\n• ភ្នែក និងធ្មេញ៖ ធ្វើឱ្យកែវភ្នែកភ្លឺ និងធ្មេញសបែបធម្មជាតិ។\n• ការលុបស្នាមលម្អិត៖ ប្រើ Inpainting លើ High-frequency layer ឱ្យម៉ដ្ឋខៃ។', 
      content_en: '• Frequency Separation: Split image into High/Low frequency for skin smoothing.\n• Dodge and Burn: Selectively lighten and darken areas to add contouring.\n• Eyes and Teeth: Enhance iris clarity and whiten teeth naturally.\n• Detail Refinement: Use Inpainting on the high-frequency layer.', 
      videoUrl: '' 
    },
    { 
      id: 'ph6', 
      title: 'ជំពូកទី ៦៖ ក្បួនកាត់តរូបភាពកម្រិតខ្ពស់', 
      title_en: 'Phase 6: Advanced Digital Compositing', 
      desc: 'បង្កើតទស្សនីយភាពដោយការផ្គុំរូបភាពច្រើនផ្ទាំងបញ្ចូលគ្នា (Compositing) ឱ្យមើលទៅដូចពិតៗ។', 
      desc_en: 'Create seamless multi-asset scenes with realistic atmospheric effects.', 
      content: '• ការរួមបញ្ចូលរូបភាព៖ នាំចូល និងចាត់ចែងរូបភាពជាច្រើនផ្ទាំង។\n• Complex Masking៖ កាត់សក់ ឬគែមស្មុគស្មាញឱ្យបានសុក្រិត។\n• ពន្លឺ និងស្រមោល៖ បង្កើតស្រមោលដោយប្រើ Live Gaussian Blur។\n• Effect បរិយាកាស៖ ប្រើ Mesh Warp និង LUTs ដើម្បីបង្រួបបង្រួមពណ៌។', 
      content_en: '• Asset Integration: Import and place multiple images.\n• Complex Masking: Refine hair or fine edges accurately.\n• Global Lighting & Shading: Create shadows using Live Gaussian Blur.\n• Atmospheric Effects: Apply Mesh Warp and LUTs to unify colors.', 
      videoUrl: '' 
    },
    { 
      id: 'ph7', 
      title: 'គម្រោងទី ៧៖ Product Mockup អាជីវកម្ម', 
      title_en: 'Project 7: Commercial Product Mockup', 
      desc: 'ដាក់ Pattern ទៅលើវត្ថុ 3D ដោយប្រើប្រាស់ Blend Modes។', 
      desc_en: 'Place a custom pattern onto a 3D-looking object using Blend Modes.', 
      content: '• គោលដៅ៖ ដាក់ Pattern រចនាផ្ទាល់ខ្លួនទៅលើវត្ថុ 3D ដូចជាកែវ ឬដប។\n• ជំនាញគោល៖ ប្រើ Clipping Masks និង Blend Modes ដើម្បីរក្សាស្រមោលដើមរបស់វត្ថុ។', 
      content_en: '• Goal: Place a custom pattern onto a 3D-looking object.\n• Key Skill: Master Clipping Masks and Blend Modes to preserve shadows.', 
      videoUrl: '' 
    },
    { 
      id: 'ph8', 
      title: 'គម្រោងទី ៨៖ ទស្សនីយភាព Dark Angel', 
      title_en: 'Project 8: Fantasy Dark Angel', 
      desc: 'បង្កើតទស្សនីយភាពបែប Cinematic ដោយផ្គុំរូបភាពយ៉ាងតិច ៥ ផ្ទាំង។', 
      desc_en: 'Create a cinematic scene combining at least 5 different image assets.', 
      content: '• គោលដៅ៖ បង្កើតផ្ទាំងទស្សនីយភាពបែបភាពយន្ត។\n• ជំនាញគោល៖ ប្រើ Adjustment Layers និង Brush Tools ដើម្បីគូរពន្លឺ និងស្រមោលដោយដៃ។', 
      content_en: '• Goal: Create a dramatic scene using multiple assets.\n• Key Skill: Use Adjustment Layers and Brush Tools to paint highlights manually.', 
      videoUrl: '' 
    },
    { 
      id: 'ph9', 
      title: 'គម្រោងទី ៩៖ ប្លង់សៀវភៅ Comic', 
      title_en: 'Project 9: Digital Comic Page', 
      desc: 'បំប្លែងរូបថតធម្មតាឱ្យទៅជារូបគំនូរបែបសៀវភៅ Comic។', 
      desc_en: 'Transform a standard photo into a stylized comic book illustration.', 
      content: '• គោលដៅ៖ ប្រែក្លាយរូបថតទៅជាគំនូរ Comic។\n• ជំនាញគោល៖ ប្រើ Pen Tool, Text Studio និង Live Filters (Halftone)។', 
      content_en: '• Goal: Transform a photo into a comic illustration.\n• Key Skill: Use the Pen Tool, Text Studio, and Live Filters (Halftone).', 
      videoUrl: '' 
    },
    { 
      id: 'ph10', 
      title: 'គម្រោងទី ១០៖ ទាញយកចំណាប់អារម្មណ៍ YouTube', 
      title_en: 'Project 10: Social Media Thumbnail', 
      desc: 'រចនា Thumbnail សម្រាប់ YouTube ដែលទាក់ទាញភ្នែកខ្លាំង។', 
      desc_en: 'Design a high-impact YouTube thumbnail with bold typography and Layer FX.', 
      content: '• គោលដៅ៖ រចនា YouTube Thumbnail ដែលទាក់ទាញភ្នែក។\n• ជំនាញគោល៖ បញ្ចូលគ្នានូវ Smart Selections, Fill Layers និង Layer FX លើអក្សរ។', 
      content_en: '• Goal: Design a high-impact YouTube thumbnail.\n• Key Skill: Combine Smart Selections, Fill Layers, and bold Layer FX.', 
      videoUrl: '' 
    }
  ],
  designer: [
    { 
      id: 'ds1', 
      title: 'ជំពូកទី ១៖ ទម្លាប់ Vector និងផ្ទៃការងារ', 
      title_en: 'Phase 1: The Vector Mindset & UI', 
      desc: 'ការផ្លាស់ប្តូរ Personas, ការរៀបចំ Artboards និងកាយវិការបញ្ជាសម្រាប់ Vector។', 
      desc_en: 'Switch between Personas, set up Artboards, and master vector gestures.', 
      content: '• Personas ទាំងបី៖ Designer (Vector), Pixel (Raster) និង Export។\n• Canvas៖ ការរៀបចំ Artboards សម្រាប់គម្រោងមានទំព័រច្រើន។\n• ការបញ្ជាកាយវិការ៖ ម្រាមពីរ Undo, Quick Menu និង Command Controller។', 
      content_en: '• The Three Personas: Designer (Vector), Pixel (Raster), and Export.\n• The Canvas: Setting up Artboards for multi-page projects.\n• Gesture Mastery: Two-finger undo, Quick Menu, and Command Controller.', 
      videoUrl: '' 
    },
    { 
      id: 'ds2', 
      title: 'ជំពូកទី ២៖ ធរណីមាត្រ និង Shape Builder', 
      title_en: 'Phase 2: Geometry & Shape Builder', 
      desc: 'បង្កើតរូបរាងស្មុគស្មាញដោយប្រើ Boolean operations និង Shape Builder។', 
      desc_en: 'Create complex forms intuitively using Boolean operations and the Shape Builder.', 
      content: '• រូបរាងមូលដ្ឋាន (Shapes)៖ ការប្រើប្រាស់ឧបករណ៍ Cog, Star និង Donut។\n• Boolean Operations៖ ការបូក ដក និងប្រសព្វរូបរាងចូលគ្នា។\n• Shape Builder Tool៖ ការ "ផាត់" កាត់រូបរាងដែលត្រួតគ្នាដើម្បីបង្កើតរូបរាងថ្មី។', 
      content_en: '• Parametric Shapes: Using the Cog, Star, and Donut tools.\n• Boolean Operations: Joining, subtracting, and intersecting shapes.\n• The Shape Builder Tool: "Painting" across overlapping shapes.', 
      videoUrl: '' 
    },
    { 
      id: 'ds3', 
      title: 'ជំពូកទី ៣៖ Pen Tool និង Node Tool', 
      title_en: 'Phase 3: The Pen & Node Tools', 
      desc: 'ស្ទាត់ជំនាញលើខ្សែបន្ទាត់កោង Bézier, ការកែប្រែ Node និង Knife Tool។', 
      desc_en: 'Master Bézier curves, node conversion, and the vector Knife Tool.', 
      content: '• ភាពសុក្រិតរបស់ Pen Tool៖ របៀបចុចទាញ (click-drag) សម្រាប់ខ្សែកោង និងប្រើ Alt/Option។\n• Node Tool៖ ការបំប្លែង Nodes (Sharp, Smooth, Smart)។\n• Knife Tool៖ ការកាត់ផ្តាច់ Vector ដើម្បីបង្កើតបំណែក។', 
      content_en: '• Pen Tool Precision: "Click-drag" for curves and Alt/Option modifiers.\n• Node Tool: Converting nodes (Sharp, Smooth, Smart).\n• Knife Tool: Slicing through objects to create organic breaks.', 
      videoUrl: '' 
    },
    { 
      id: 'ds4', 
      title: 'ជំពូកទី ៤៖ ពណ៌, Gradients និង Appearance', 
      title_en: 'Phase 4: Color, Gradients & Appearance', 
      desc: 'ការរៀបចំស្តាយល៍ Stroke និង Fill ច្រើនជាន់ដោយប្រើ Appearance Studio។', 
      desc_en: 'Stack multiple strokes and fills using the powerful Appearance Studio.', 
      content: '• Fill & Stroke៖ ការគ្រប់គ្រងកម្រាស់បន្ទាត់ និងក្បាលព្រួញ។\n• Gradient Tool៖ ការចាក់ពណ៌រលាយ (Linear, Radial, Conical)។\n• Appearance Studio៖ ការបន្ថែម Strokes និង Fills ជាច្រើនជាន់លើវត្ថុតែមួយ។', 
      content_en: '• Fill & Stroke: Managing line weights and pressure profiles.\n• The Gradient Tool: Applying linear, radial, and conical fills.\n• Appearance Studio: Adding Multiple Strokes to a single object.', 
      videoUrl: '' 
    },
    { 
      id: 'ds5', 
      title: 'ជំពូកទី ៥៖ អក្សរ និង Vector Assets', 
      title_en: 'Phase 5: Typography & Vector Assets', 
      desc: 'ការសរសេរអក្សរតាមខ្សែបន្ទាត់កោង និងបង្កើត Asset library ដើម្បីប្រើប្រាស់ឡើងវិញ។', 
      desc_en: 'Flow text along curved paths and build a reusable Asset library.', 
      content: '• Artistic vs Frame Text៖ ការប្រើប្រាស់អក្សរចំណងជើង និងអត្ថបទវែង។\n• Path Text៖ ការសរសេរអក្សរឱ្យរត់តាមខ្សែបន្ទាត់ Vector កោង។\n• Assets Studio៖ ការចងក្រងបណ្តុំ Icons និងឯកសារដើម្បីទាញប្រើលឿន។', 
      content_en: '• Artistic vs. Frame Text: Scaling headlines vs. wrapping body copy.\n• Path Text: Flowing words along a curved vector line.\n• The Assets Studio: Creating a library of reusable icons.', 
      videoUrl: '' 
    },
    { 
      id: 'ds6', 
      title: 'ជំពូកទី ៦៖ ការបញ្ជូលគ្នាជាមួយ Pixel Persona', 
      title_en: 'Phase 6: The Pixel Persona Integration', 
      desc: 'ការបន្ថែមភាពគ្រើម (Textures) ទៅលើរូប Vector ដោយប្រើ Pixel Persona។', 
      desc_en: 'Add raster textures, grain, and gritty brushes to clean vector shapes.', 
      content: '• Hybrid Workflow៖ ផ្លាស់ប្តូរទៅកាន់ Pixel Persona ដើម្បីបន្ថែម Texture និងជក់។\n• Vector Masking៖ ការប្រើប្រាស់ Vector ដើម្បីកាត់ ឬលាក់ផ្នែកខ្លះនៃរូបភាព Pixel។', 
      content_en: '• Hybrid Workflow: Switch to Pixel Persona to add texture and grain.\n• Vector Masking: Using vector shapes to "clip" raster images inside.', 
      videoUrl: '' 
    },
    { 
      id: 'ds7', 
      title: 'គម្រោងទី ៧៖ Flat Icon បែប Minimalist', 
      title_en: 'Project 7: Minimalist Flat Icon Set', 
      desc: 'រចនា Icon បែប Flat ចំនួន ៥ ដោយប្រើត្រឹមតែរូបរាងមូលដ្ឋាន (Basic Shapes)។', 
      desc_en: 'Design 5 cohesive icons using only basic geometric shapes.', 
      content: '• គោលដៅ៖ រចនា Icon ចំនួន ៥ ដោយប្រើ Shape Builder។\n• ជំនាញគោល៖ ការគ្រប់គ្រងភាពស៊ីមេទ្រី (Symmetry) និង Transform Studio។', 
      content_en: '• Goal: Design 5 icons using basic shapes and the Shape Builder.\n• Key Skill: Mastering symmetry and the Transform Studio.', 
      videoUrl: '' 
    },
    { 
      id: 'ds8', 
      title: 'គម្រោងទី ៨៖ ការរចនា Logo អាជីព', 
      title_en: 'Project 8: Professional Logo & Branding', 
      desc: 'គូរព្រាង និងប្រែក្លាយ Logo ទៅជា Vector ដោយប្រើប្រាស់ Pen Tool។', 
      desc_en: 'Vectorize a logo using the Pen Tool based on a hand-drawn sketch import.', 
      content: '• គោលដៅ៖ បង្កើត Logo បែប Vector ដោយផ្អែកលើគំនូរព្រាងដោយដៃ។\n• ជំនាញគោល៖ ការគ្រប់គ្រង Node, ការសម្រួលខ្សែបន្ទាត់ និងការ Export ជា SVG។', 
      content_en: '• Goal: Create a vectorized logo from a sketch.\n• Key Skill: Node management, path simplification, and SVG export.', 
      videoUrl: '' 
    },
    { 
      id: 'ds9', 
      title: 'គម្រោងទី ៩៖ ប្លង់បន្ទប់បែប Isometric', 
      title_en: 'Project 9: Isometric Room Illustration', 
      desc: 'បង្កើតរូបគំនូរបន្ទប់ 3D ដោយប្រើប្រាស់ Isometric Grid និង Axonometric Panel។', 
      desc_en: 'Build a 3D-looking room using the Isometric Grid and Axonometric Panel.', 
      content: '• គោលដៅ៖ បង្កើតទិដ្ឋភាពបន្ទប់ 3D ដោយប្រើ Isometric Grid។\n• ជំនាញគោល៖ ការប្រើប្រាស់ Axonometric Panel ដើម្បីចាប់ (Snap) រាងចូលប្លង់ 3D។', 
      content_en: '• Goal: Build a 3D-looking room using the Isometric Grid.\n• Key Skill: Using the Axonometric Panel to snap shapes to 3D.', 
      videoUrl: '' 
    },
    { 
      id: 'ds10', 
      title: 'គម្រោងទី ១០៖ Poster ទាក់ទាញបែប Vector', 
      title_en: 'Project 10: High-Impact Vector Poster', 
      desc: 'រចនា Poster ដោយបញ្ចូលគ្នានូវ Path Text និង Stock Image masking។', 
      desc_en: 'Design a print-ready poster combining Path Text and Stock Image masking.', 
      content: '• គោលដៅ៖ រចនា Poster ដោយបញ្ចូល Path Text និង Masking។\n• ជំនាញគោល៖ ការរៀបចំប្លង់ និងការ Export សម្រាប់បោះពុម្ព (PDF)។', 
      content_en: '• Goal: Design a poster combining Path Text and Stock masking.\n• Key Skill: Advanced layering and Export Persona for PDFs.', 
      videoUrl: '' 
    }
  ],
  publisher: [
    { 
      id: 'pb1', 
      title: 'ជំពូកទី ១៖ ផ្ទៃការងារ និងរចនាសម្ព័ន្ធឯកសារ', 
      title_en: 'Phase 1: Interface & Architecture', 
      desc: 'កំណត់ទំព័រ Spreads, Bleed, Margins និងប្រើប្រាស់ StudioLink នៅក្នុង Publisher។', 
      desc_en: 'Configure spreads, bleeds, margins, and utilize StudioLink directly inside Publisher.', 
      content: '• Home Screen៖ ការបង្កើតឯកសារសម្រាប់ Print, Web, ឬ Devices។\n• Document Setup៖ កំណត់ Facing Pages, Bleed និង Margins។\n• Publisher Menu៖ ការផ្លាស់ប្តូរ Personas និងការប្រើប្រាស់ StudioLink។', 
      content_en: '• The Home Screen: Create presets for Print, Web, or Devices.\n• Document Setup: Configure Facing Pages, Bleed, and Margins.\n• The Publisher Icon Menu: Switch Personas and use StudioLink.', 
      videoUrl: '' 
    },
    { 
      id: 'pb2', 
      title: 'ជំពូកទី ២៖ Master Pages និងការរៀបចំប្លង់', 
      title_en: 'Phase 2: Master Pages & Layout', 
      desc: 'ធ្វើស្វ័យប្រវត្តិកម្មលើ Background និង Header ដោយប្រើ Pages Studio។', 
      desc_en: 'Automate backgrounds and headers using the Pages Studio and Master linking.', 
      content: '• មូលដ្ឋាន Master Page៖ បង្កើតទំព័រគំរូសម្រាប់ផ្ទៃខាងក្រោយ និង Header។\n• ការប្រើប្រាស់ Masters៖ ទាញ Master page ដាក់ចូលទៅក្នុងទំព័រការងារ។\n• Edit Detached៖ ការកែប្រែចំណុចណាមួយនៃ Master ដោយមិនធ្វើឱ្យប៉ះពាល់ទំព័រផ្សេង។', 
      content_en: '• Master Page Basics: Create reusable backgrounds and headers.\n• Applying Masters: Apply a master page to specific content pages.\n• Edit Detached: Modify a master element without breaking its link.', 
      videoUrl: '' 
    },
    { 
      id: 'pb3', 
      title: 'ជំពូកទី ៣៖ ប្រអប់អក្សរ និង Typography', 
      title_en: 'Phase 3: Text Frames & Typography', 
      desc: 'ភ្ជាប់ប្រអប់អក្សរដើម្បីឱ្យអត្ថបទហូរឆ្លងកាត់ទំព័រជាច្រើនដោយស្វ័យប្រវត្តិ។', 
      desc_en: 'Link text frames to pour body copy across multiple spreads.', 
      content: '• Frame vs Artistic Text៖ ប្រើ Frame Text សម្រាប់អត្ថបទវែងៗ។\n• Text Flow & Linking៖ ភ្ជាប់ប្រអប់អក្សរដើម្បីឱ្យអត្ថបទហូរពីទំព័រមួយទៅទំព័រមួយទៀត។\n• Typography Controls៖ ការកំណត់គម្លាតអក្សរ (Tracking, Kerning)។', 
      content_en: '• Frame vs. Artistic Text: Use Frame Text for large body copy.\n• Text Flow & Linking: Link frames so text "pours" across pages.\n• Typography Controls: Master tracking, kerning, and baseline shift.', 
      videoUrl: '' 
    },
    { 
      id: 'pb4', 
      title: 'ជំពូកទី ៤៖ Styles និងការកំណត់ទម្រង់', 
      title_en: 'Phase 4: Styles & Formatting', 
      desc: 'បង្កើត Paragraph Styles រួម ដើម្បីធ្វើស្វ័យប្រវត្តិកម្មលើការរៀបចំ Formatting។', 
      desc_en: 'Create global Paragraph Styles to automate bullet lists and chapter formatting.', 
      content: '• Paragraph & Character Styles៖ ធានាភាពស៊ីសង្វាក់គ្នានៃហ្វុនអក្សរពេញមួយសៀវភៅ។\n• បញ្ជី (Lists)៖ ធ្វើស្វ័យប្រវត្តិកម្មលើ Bullet និងលេខរៀង។\n• Find & Replace៖ ស្វែងរក និងផ្លាស់ប្តូរពាក្យ ឬទម្រង់អក្សរនៅទូទាំងឯកសារ។', 
      content_en: '• Paragraph & Character Styles: Ensure consistent fonts globally.\n• Bullet & Numbered Lists: Automate lists using Paragraph Studio.\n• Find & Replace: Quickly update text or formatting document-wide.', 
      videoUrl: '' 
    },
    { 
      id: 'pb5', 
      title: 'ជំពូកទី ៥៖ រូបភាព, Assets និងតារាង', 
      title_en: 'Phase 5: Images, Assets & Tables', 
      desc: 'បង្កើតតារាងទិន្នន័យ និងរៀបចំរូបភាពចូលទៅក្នុង Picture Frames។', 
      desc_en: 'Build formatted data tables and drop images perfectly into Picture Frames.', 
      content: '• Picture Frames៖ បង្កើតកន្លែងត្រៀមដាក់រូប និង Place រូបភាពចូល។\n• Assets Studio៖ រក្សាទុក Logo និងឯកសាររចនាដើម្បីទាញប្រើពេលក្រោយ។\n• Table Tool៖ ការសាងសង់ និងរៀបចំតារាងទិន្នន័យ (ពណ៌ គែម និងអក្សរ)។', 
      content_en: '• Picture Frames: Create placeholders and "Place" images inside.\n• The Assets Studio: Store logos and design elements for quick use.\n• Table Tool: Build data tables with custom cell borders and fills.', 
      videoUrl: '' 
    },
    { 
      id: 'pb6', 
      title: 'ជំពូកទី ៦៖ ឧបករណ៍បោះពុម្ពកម្រិតខ្ពស់', 
      title_en: 'Phase 6: Advanced Publishing Tools', 
      desc: 'បង្កើតមាតិកាសៀវភៅដោយស្វ័យប្រវត្តិ និងប្រើប្រាស់ Preflight Studio។', 
      desc_en: 'Generate a Table of Contents automatically and use the Preflight Studio.', 
      content: '• Section Manager៖ រៀបចំឯកសារជាជំពូក ឬផ្នែកៗ។\n• មាតិកា និង Index៖ បង្កើតតារាងមាតិកាដោយស្វ័យប្រវត្តិ។\n• Preflight Studio៖ ត្រួតពិនិត្យកំហុសមុននឹង Export (ដូចជារូបភាពបែក)។', 
      content_en: '• Section Manager: Organize a large document into chapters.\n• TOC & Indexing: Automatically generate a Table of Contents.\n• Preflight Studio: Monitor for errors like low-resolution images.', 
      videoUrl: '' 
    },
    { 
      id: 'pb7', 
      title: 'គម្រោងទី ៧៖ អត្ថបទចុះទស្សនាវដ្តី', 
      title_en: 'Project 7: Magazine Feature Article', 
      desc: 'រៀបចំប្លង់អត្ថបទសម្រាប់ទស្សនាវដ្តី ដែលមានរូបភាពធំ ចំណងជើង និងអត្ថបទ ៣ ជួរ។', 
      desc_en: 'Create a feature article with a hero image, headline, and three text columns.', 
      content: '• គោលដៅ៖ រចនាអត្ថបទជាមួយរូបភាពធំ និងអត្ថបទជាជួរៗ។\n• ជំនាញគោល៖ ការកំណត់ Text Wrap ជុំវិញរូបភាព និងការប្រើ Drop Caps។', 
      content_en: '• Goal: Create an article layout with hero image and columns.\n• Key Skill: Mastering Text Wrap around images and Drop Caps.', 
      videoUrl: '' 
    },
    { 
      id: 'pb8', 
      title: 'គម្រោងទី ៨៖ Corporate Brochure ៨ ទំព័រ', 
      title_en: 'Project 8: Corporate Brochure', 
      desc: 'រចនាខិត្តប័ណ្ណ (Brochure) ៨ ទំព័រ ដោយប្រើ Global Colors និង Master Pages។', 
      desc_en: 'Design an 8-page brochure utilizing Global Colors and multiple Master Pages.', 
      content: '• គោលដៅ៖ រចនា Brochure ដែលមាន ៨ ទំព័រ។\n• ជំនាញគោល៖ ការគ្រប់គ្រងពណ៌ប្រេន (Global Colors) ឱ្យបានច្បាស់លាស់។', 
      content_en: '• Goal: Design an 8-page brochure using two Master Pages.\n• Key Skill: Managing consistent branding with Global Colors.', 
      videoUrl: '' 
    },
    { 
      id: 'pb9', 
      title: 'គម្រោងទី ៩៖ Digital Planner អន្តរកម្ម', 
      title_en: 'Project 9: Digital Interactive Planner', 
      desc: 'បង្កើតសៀវភៅផែនការប្រចាំខែ (Digital Planner) ជា PDF ដែលអាចចុច Link បាន។', 
      desc_en: 'Create a monthly PDF planner with functional hyperlinks and complex tabs.', 
      content: '• គោលដៅ៖ បង្កើត Digital Planner ជា PDF ដែលអាចចុចបាន។\n• ជំនាញគោល៖ ការប្រើប្រាស់ Hyperlinks Studio និង Master Page Stacking។', 
      content_en: '• Goal: Create a monthly planner with functional hyperlinks.\n• Key Skill: Using the Hyperlinks Studio and Master Page Stacking.', 
      videoUrl: '' 
    },
    { 
      id: 'pb10', 
      title: 'គម្រោងទី ១០៖ ការរៀបចំប្លង់សៀវភៅអាជីព', 
      title_en: 'Project 10: Professional Book Layout', 
      desc: 'រៀបចំប្លង់សៀវភៅដែលមានលេខរៀងទំព័រស្វ័យប្រវត្តិ និង Export ជា PDF សម្រាប់ការបោះពុម្ព។', 
      desc_en: 'Layout a short chapter book with automated page numbers and Print PDF/X-4 export.', 
      content: '• គោលដៅ៖ រៀបចំប្លង់សៀវភៅរួមមាន ក្រប មាតិកា និងលេខទំព័រ។\n• ជំនាញគោល៖ ការប្រើ Books Panel និងការ Export ជា PDF សម្រាប់បោះពុម្ព (PDF/X-4)។', 
      content_en: '• Goal: Layout a book including cover, TOC, and page numbers.\n• Key Skill: Using the Books Panel and Exporting for Print (PDF/X-4).', 
      videoUrl: '' 
    }
  ]
};

export const initialQuestionBank = [
    // Foundations & Basics (1-20)
    { id: 1, question: "អ្វីជាពណ៌បឋម (Primary Colors) ក្នុងទ្រឹស្តីសិល្បៈទូទៅ?", question_en: "What are the Primary Colors in general art theory?", options: ["ក្រហម ខៀវ លឿង", "ស ខ្មៅ ប្រផេះ", "បៃតង ទឹកក្រូច ស្វាយ", "ក្រហម បៃតង ខៀវ"], options_en: ["Red, Blue, Yellow", "White, Black, Gray", "Green, Orange, Purple", "Red, Green, Blue"], correct: 0, level: "beginner" },
    { id: 2, question: "ប្រព័ន្ធពណ៌ RGB ត្រូវគេប្រើប្រាស់សម្រាប់អ្វី?", question_en: "What is the RGB color mode primarily used for?", options: ["ការបោះពុម្ពលើក្រដាស", "ការបង្ហាញលើអេក្រង់ឌីជីថល", "ការគូរគំនូរដោយដៃ", "ការលាយថ្នាំពណ៌ទឹក"], options_en: ["Physical printing", "Digital screen displays", "Hand-drawn illustration", "Mixing watercolors"], correct: 1, level: "beginner" },
    { id: 3, question: "ប្រព័ន្ធពណ៌ CMYK តំណាងអោយពណ៌អ្វីខ្លះ?", question_en: "What colors does the CMYK model represent?", options: ["Cyan, Magenta, Yellow, Key (Black)", "Crimson, Maroon, Yellow, Khaki", "Cyan, Mint, Yellow, Key", "Clear, Magenta, Yellow, Kraft"], options_en: ["Cyan, Magenta, Yellow, Key (Black)", "Crimson, Maroon, Yellow, Khaki", "Cyan, Mint, Yellow, Key", "Clear, Magenta, Yellow, Kraft"], correct: 0, level: "beginner" },
    { id: 4, question: "តើអ្វីទៅជា Typography?", question_en: "What is Typography?", options: ["សិល្បៈនៃការថតរូប", "ការកាត់តវីដេអូ", "សិល្បៈ និងបច្ចេកទេសនៃការរៀបចំអក្សរ", "ការគូរគំនូរបែបបុរាណ"], options_en: ["The art of photography", "Video editing", "The art and technique of arranging type", "Traditional painting"], correct: 2, level: "beginner" },
    { id: 5, question: "Vector Graphics ត្រូវបានបង្កើតឡើងដោយអ្វី?", question_en: "What are Vector Graphics created from?", options: ["ភីកសែល (Pixels)", "រូបមន្តគណិតវិទ្យា (Points & Paths)", "គ្រាប់អុចៗរាប់លាន", "ទឹកថ្នាំកុំព្យូទ័រ"], options_en: ["Pixels", "Mathematical formulas (Points & Paths)", "Millions of dots", "Computer ink"], correct: 1, level: "beginner" },
    { id: 6, question: "តើ 'White Space' (Negative Space) មានន័យដូចម្តេច?", question_en: "What does 'White Space' (Negative Space) mean?", options: ["ផ្ទៃដែលមានពណ៌សសុទ្ធ", "ចន្លោះទទេដើម្បីអោយការរចនាមានខ្យល់ដកដង្ហើម", "កំហុសក្នុងការរចនាដែលភ្លេចដាក់រូប", "Background ដែលភ្លឺខ្លាំងពេក"], options_en: ["A pure white background", "Empty space that lets the design breathe", "A design error where an image is missing", "A background that is too bright"], correct: 1, level: "beginner" },
    { id: 7, question: "Contrast (ភាពផ្ទុយគ្នា) មានតួនាទីសំខាន់អ្វីខ្លះ?", question_en: "What is the primary role of Contrast?", options: ["ធ្វើអោយមើលមិនឃើញច្បាស់", "រំលេចចំណុចសំខាន់ (Focal Point) ឱ្យលេចធ្លោ", "ធ្វើអោយពណ៌ទាំងអស់ប្រែជាស្រអាប់", "កាត់បន្ថយទំហំ File របស់រូបភាព"], options_en: ["To make things blurry", "To make the focal point stand out", "To make all colors dull", "To reduce file size"], correct: 1, level: "beginner" },
    { id: 8, question: "ហ្វុនអក្សរប្រភេទ Serif (មានកន្ទុយ) សាកសមបំផុតសម្រាប់អ្វី?", question_en: "What is a Serif font best suited for?", options: ["ការរចនា UI/UX និងបច្ចេកវិទ្យា", "ភាពផ្លូវការ និងការអានអត្ថបទសៀវភៅវែងៗ", "ការរចនាបែបកំប្លែង និងកុមារ", "ការរចនាបែបអនាគត (Sci-Fi)"], options_en: ["UI/UX and technology designs", "Formality and reading long-form books", "Comedic and children's designs", "Futuristic Sci-Fi designs"], correct: 1, level: "beginner" },
    { id: 9, question: "Alignment (ការតម្រឹម) ជួយអ្វីខ្លះដល់ការរចនា?", question_en: "How does Alignment help a design?", options: ["ធ្វើអោយមានភាពរញ៉េរញ៉ៃ", "បង្កើតភាពមានសណ្តាប់ធ្នាប់ និងងាយអាន", "ផ្លាស់ប្តូរពណ៌នៃអត្ថបទ", "លុបចោលអក្សរដែលមិនចាំបាច់"], options_en: ["It makes the design chaotic", "It creates order and readability", "It changes text color", "It deletes unnecessary text"], correct: 1, level: "beginner" },
    { id: 10, question: "កម្រិត Resolution 300 PPI ល្អបំផុតសម្រាប់អ្វី?", question_en: "What is a 300 PPI resolution best for?", options: ["បង្ហោះលើ Facebook", "បញ្ជូនទៅរោងពុម្ព (Print)", "ដាក់ក្នុង Website", "ផ្ញើចូល Telegram"], options_en: ["Posting on Facebook", "Sending to a physical printer", "Using on a Website", "Sending via Telegram"], correct: 1, level: "beginner" },
    { id: 11, question: "កម្មវិធីណាដែលសាកសមបំផុតសម្រាប់ការគូរ Logo?", question_en: "Which software is best suited for designing a Logo?", options: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Premiere Pro", "Microsoft Word"], options_en: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Premiere Pro", "Microsoft Word"], correct: 1, level: "intermediate" },
    { id: 12, question: "តើ File មួយណាជាទម្រង់ Vector?", question_en: "Which of the following is a Vector file format?", options: [".jpg", ".png", ".svg", ".gif"], options_en: [".jpg", ".png", ".svg", ".gif"], correct: 2, level: "intermediate" },
    { id: 13, question: "តើ Hierarchy (ឋានានុក្រម) ក្នុងការរចនាគឺអ្វី?", question_en: "What is Visual Hierarchy in design?", options: ["ការប្រើពណ៌ច្រើនបញ្ចូលគ្នា", "ការរៀបចំលំដាប់ភាពសំខាន់នៃព័ត៌មាន", "ការដាក់អក្សរឱ្យធំប៉ុនៗគ្នាទាំងអស់", "ការលុបផ្ទៃខាងក្រោយចេញ"], options_en: ["Mixing many colors together", "Arranging the order of visual importance", "Making all text exactly the same size", "Removing the background"], correct: 1, level: "intermediate" },
    { id: 14, question: "Bleed នៅក្នុងការរៀបចំបោះពុម្ព (Print) គឺជាអ្វី?", question_en: "What is a 'Bleed' in print design?", options: ["ពណ៌ក្រហមដែលលាយក្នុងរូប", "គែមបម្រុងទុកបន្ថែមដើម្បីកាត់កុំឱ្យសល់ពណ៌ស", "កំហុសរបស់ម៉ាស៊ីនព្រីន", "ប្រភេទទឹកថ្នាំពិសេស"], options_en: ["Red color mixed into the image", "Extra margin space intended to be trimmed off", "A printer error", "A special type of ink"], correct: 1, level: "intermediate" },
    { id: 15, question: "Kerning គឺសំដៅទៅលើការសារ៉េចន្លោះអ្វី?", question_en: "What does 'Kerning' refer to?", options: ["ចន្លោះរវាងបន្ទាត់", "ចន្លោះអក្សរពេញមួយពាក្យ", "ចន្លោះរវាងតួអក្សរតែ 'ពីរ' ប៉ុណ្ណោះ", "ចន្លោះកថាខណ្ឌទាំងមូល"], options_en: ["Space between lines", "Spacing across a whole word", "Space between exactly two individual characters", "Space between paragraphs"], correct: 2, level: "advanced" },
    { id: 16, question: "Tracking គឺសំដៅទៅលើការសារ៉េចន្លោះអ្វី?", question_en: "What does 'Tracking' refer to?", options: ["ចន្លោះអក្សរស្មើៗគ្នាពេញមួយពាក្យ (Word)", "ចន្លោះអក្សរតែពីរតួ", "ចន្លោះបន្ទាត់", "កម្ពស់នៃតួអក្សរ"], options_en: ["Uniform spacing across a whole word/block of text", "Spacing between just two letters", "Space between lines", "The height of the characters"], correct: 0, level: "advanced" },
    { id: 17, question: "Leading គឺសំដៅទៅលើការសារ៉េចន្លោះអ្វី?", question_en: "What does 'Leading' refer to?", options: ["ចន្លោះពាក្យទូទៅ", "ចន្លោះរវាងបន្ទាត់មួយទៅបន្ទាត់មួយ (Line-height)", "ទំហំអក្សរ (Font size)", "កម្រាស់អក្សរ (Font weight)"], options_en: ["General word spacing", "Vertical space between baselines of text (Line-height)", "Font size", "Font weight"], correct: 1, level: "advanced" },
    { id: 18, question: "Golden Ratio (សមាមាត្រមាស) មានតម្លៃប្រមាណប៉ុន្មាន?", question_en: "What is the approximate value of the Golden Ratio?", options: ["1:1", "1:1.618", "16:9", "4:3"], options_en: ["1:1", "1:1.618", "16:9", "4:3"], correct: 1, level: "advanced" },
    { id: 19, question: "តើប្រព័ន្ធពណ៌ Pantone ត្រូវបានគេប្រើប្រាស់សម្រាប់អ្វី?", question_en: "What is the Pantone color system primarily used for?", options: ["សម្រាប់អេក្រង់ទូរស័ព្ទ", "ជាប្រព័ន្ធពណ៌បោះពុម្ពស្តង់ដារអន្តរជាតិ", "សម្រាប់ការលាយពណ៌ទឹកគូររូប", "សម្រាប់ការថតវីដេអូ"], options_en: ["Phone screens", "Standardized international color matching for printing", "Mixing watercolor paints", "Video recording"], correct: 1, level: "advanced" },
    { id: 20, question: "អ្វីទៅជា Raster Graphics?", question_en: "What are Raster Graphics?", options: ["រូបភាពដែលគណនាដោយរូបមន្ត", "រូបភាពផ្សំឡើងពី Pixels (គ្រាប់ការ៉េតូចៗ)", "សិល្បៈអក្សរ 3D", "កូដ Website"], options_en: ["Images calculated by math", "Images made up of Pixels (tiny squares)", "3D typography art", "Website source code"], correct: 1, level: "intermediate" },

    // Color Theory & Psychology (21-40)
    { id: 21, question: "នៅក្នុងចិត្តវិទ្យាពណ៌ ពណ៌ក្រហម (Red) ច្រើនតែតំណាងឱ្យអ្វី?", question_en: "In color psychology, what does Red typically represent?", options: ["ភាពស្ងប់ស្ងាត់", "ធម្មជាតិ និងសុខភាព", "ថាមពល ចំណង់ និងការប្រញាប់", "ភាពអភិជន និងអាថ៌កំបាំង"], options_en: ["Calmness", "Nature and health", "Energy, passion, and urgency", "Royalty and mystery"], correct: 2, level: "intermediate" },
    { id: 22, question: "ពណ៌អ្វីដែលធនាគារ ឬក្រុមហ៊ុនបច្ចេកវិទ្យាច្រើនប្រើ ដើម្បីបង្ហាញពី 'ភាពជឿជាក់ និងសុវត្ថិភាព'?", question_en: "Which color do banks and tech companies use to convey 'trust and security'?", options: ["ពណ៌លឿង", "ពណ៌ខៀវ (Blue)", "ពណ៌ស្វាយ", "ពណ៌ផ្កាឈូក"], options_en: ["Yellow", "Blue", "Purple", "Pink"], correct: 1, level: "intermediate" },
    { id: 23, question: "តើពណ៌ Complementary ជាអ្វី?", question_en: "What are Complementary colors?", options: ["ពណ៌ដែលនៅទល់មុខគ្នានៅលើរង្វង់ពណ៌ (Color Wheel)", "ពណ៌ដែលនៅជាប់ៗគ្នា", "ពណ៌ស និងខ្មៅ", "ការប្រើពណ៌តែមួយ"], options_en: ["Colors directly opposite each other on the color wheel", "Colors next to each other", "Black and white", "Using only one color"], correct: 0, level: "beginner" },
    { id: 24, question: "ការប្រើប្រាស់ពណ៌ Analogous គឺមានន័យដូចម្តេច?", question_en: "What does an Analogous color scheme mean?", options: ["ពណ៌ដែលផ្ទុយគ្នាដាច់ស្រឡះ", "ពណ៌ ៣ ទៅ ៤ ដែលនៅជាប់គ្នានៅលើរង្វង់ពណ៌", "ពណ៌ដែលមិនមានពន្លឺ", "ការប្រើតែពណ៌ប្រផេះ"], options_en: ["Highly contrasting colors", "3 to 4 colors sitting next to each other on the color wheel", "Colors without light", "Using only gray"], correct: 1, level: "intermediate" },
    { id: 25, question: "ច្បាប់លាយពណ៌ Monochromatic គឺមានន័យថា៖", question_en: "A Monochromatic color scheme means:", options: ["ប្រើពណ៌ជាច្រើនលាយចូលគ្នា", "ប្រើពណ៌តែ១ប្រភេទ តែប្តូរកម្រិតភ្លឺនិងងងឹត (Tints & Shades)", "ប្រើពណ៌ស ខ្មៅ និងក្រហម", "ប្រើពណ៌ផ្ទុយគ្នា"], options_en: ["Mixing many colors together", "Using only 1 base hue but varying its tints and shades", "Using white, black, and red", "Using opposite colors"], correct: 1, level: "intermediate" },
    { id: 26, question: "ពណ៌ត្រជាក់ (Cool Colors) រួមមានពណ៌អ្វីខ្លះ?", question_en: "Which of the following are Cool Colors?", options: ["ក្រហម លឿង ទឹកក្រូច", "ខៀវ បៃតង ស្វាយ", "ស ខ្មៅ ប្រផេះ", "ត្នោត មាស លឿង"], options_en: ["Red, Yellow, Orange", "Blue, Green, Purple", "White, Black, Gray", "Brown, Gold, Yellow"], correct: 1, level: "beginner" },
    { id: 27, question: "ពណ៌ក្តៅ (Warm Colors) ច្រើនតែផ្តល់អារម្មណ៍បែបណា?", question_en: "What feeling do Warm Colors usually evoke?", options: ["ត្រជាក់ និងឯកា", "កក់ក្តៅ រំភើប និងមានថាមពល", "សោកសៅ", "ផ្លូវការខ្លាំង"], options_en: ["Cold and lonely", "Warmth, excitement, and energy", "Sadness", "Extreme formality"], correct: 1, level: "beginner" },
    { id: 28, question: "អ្វីទៅជា Tint នៅក្នុងទ្រឹស្តីពណ៌?", question_en: "What is a 'Tint' in color theory?", options: ["ការយកពណ៌ដើមទៅលាយជាមួយពណ៌ស", "ការយកពណ៌ដើមទៅលាយជាមួយពណ៌ខ្មៅ", "ការយកពណ៌ដើមទៅលាយជាមួយពណ៌ប្រផេះ", "ការធ្វើឱ្យពណ៌ទៅជាថ្លា (Transparent)"], options_en: ["Mixing a pure hue with White", "Mixing a pure hue with Black", "Mixing a pure hue with Gray", "Making a color transparent"], correct: 0, level: "advanced" },
    { id: 29, question: "អ្វីទៅជា Shade នៅក្នុងទ្រឹស្តីពណ៌?", question_en: "What is a 'Shade' in color theory?", options: ["ការលាយជាមួយពណ៌ស", "ការយកពណ៌ដើមទៅលាយជាមួយពណ៌ខ្មៅ", "ការលាយជាមួយទឹក", "ការបញ្ចេញពន្លឺ"], options_en: ["Mixing with white", "Mixing a pure hue with Black", "Mixing with water", "Emitting light"], correct: 1, level: "advanced" },
    { id: 30, question: "Rule of Thirds (ច្បាប់ភាគបី) ណែនាំឱ្យដាក់ចំណុចសំខាន់ (Focal point) នៅត្រង់ណា?", question_en: "Where does the Rule of Thirds suggest placing the focal point?", options: ["នៅចំកណ្តាលរូបភាពតែម្តង", "នៅត្រង់ចំណុចប្រសព្វនៃបន្ទាត់កាត់ខ្វែងគ្នាទាំង៤", "នៅជ្រុងណាមួយនៃរូបភាព", "នៅក្រៅគែមរូបភាព"], options_en: ["Dead center of the image", "At one of the 4 intersections of the grid lines", "In any corner of the image", "Outside the image edge"], correct: 1, level: "intermediate" },
    { id: 31, question: "Asymmetrical Balance (តុល្យភាពមិនស្មើ) នៅក្នុង Design មានន័យថា៖", question_en: "What does Asymmetrical Balance mean in design?", options: ["រចនាឆ្វេងស្តាំដូចបេះបិទ", "ទម្ងន់នៃធាតុសងខាងមានលំនឹង ទោះបីជារូបរាងឬទំហំវាមិនដូចគ្នាក៏ដោយ", "ការរចនាដែលផ្អៀងទៅម្ខាងធ្លាក់", "ការមិនប្រើប្រាស់បន្ទាត់ទាល់តែសោះ"], options_en: ["Mirroring left and right exactly", "Visual weights are balanced even if shapes/sizes are different", "A layout that leans heavily to one side", "Not using lines at all"], correct: 1, level: "advanced" },
    { id: 32, question: "តើការធ្វើឡើងវិញ (Repetition) ជួយអ្វីខ្លះក្នុងការរចនា?", question_en: "How does Repetition help a design?", options: ["ធ្វើឱ្យមើលទៅរញ៉េរញ៉ៃ", "បង្កើតភាពស៊ីសង្វាក់គ្នា (Consistency) និងអត្តសញ្ញាណតែមួយ", "កាត់បន្ថយការចាប់អារម្មណ៍", "ធ្វើឱ្យការរចនាមើលទៅចាស់កញ្ចាស់"], options_en: ["It makes it look messy", "It builds consistency and brand identity", "It reduces interest", "It makes the design look outdated"], correct: 1, level: "intermediate" },
    { id: 33, question: "Margin (គែមសុវត្ថិភាព) ក្នុងការរៀបចំប្លង់មានប្រយោជន៍អ្វី?", question_en: "What is the purpose of Margins in a layout?", options: ["សម្រាប់ទុកកាត់ចោល", "រក្សាព័ត៌មានសំខាន់កុំឱ្យដាច់ និងជួយឱ្យអត្ថបទងាយអាន", "សម្រាប់ចាក់ពណ៌ខ្មៅ", "គ្មានប្រយោជន៍អ្វីទេ"], options_en: ["To be cut off later", "To keep vital info safe and make text easier to read", "To fill with black ink", "It has no purpose"], correct: 1, level: "intermediate" },
    { id: 34, question: "Grid System (ប្រព័ន្ធក្រឡា) ត្រូវបានប្រើប្រាស់ដើម្បីអ្វី?", question_en: "What is a Grid System used for?", options: ["គូររូបតុក្កតា", "រៀបចំប្លង់អត្ថបទនិងរូបភាពឱ្យមានរបៀបរៀបរយ និងត្រង់ជួរ", "លាយពណ៌", "ធ្វើចលនាវីដេអូ"], options_en: ["Drawing cartoons", "Structuring text and images neatly and in alignment", "Mixing colors", "Creating video animations"], correct: 1, level: "intermediate" },
    { id: 35, question: "ទ្រឹស្តី 'Form follows function' (រូបរាងត្រូវបម្រើមុខងារ) កើតចេញពីចលនាសិល្បៈមួយណា?", question_en: "The theory 'Form follows function' came from which art movement?", options: ["Art Deco", "Bauhaus", "Pop Art", "Victorian"], options_en: ["Art Deco", "Bauhaus", "Pop Art", "Victorian"], correct: 1, level: "advanced" },
    { id: 36, question: "ចលនាសិល្បៈ Art Deco ភាគច្រើនសម្គាល់ដោយអ្វី?", question_en: "What generally characterizes the Art Deco movement?", options: ["គំនូរព្រាងដោយដៃ", "រាងធរណីមាត្រមុតស្រួច និងពណ៌មាសបង្ហាញពីភាពស៊ីវិល័យ", "ការលាបពណ៌ទឹកព្រិលៗ", "រូបថតសខ្មៅ"], options_en: ["Hand-drawn sketches", "Sharp geometric shapes and gold colors showing luxury", "Blurry watercolors", "Black and white photography"], correct: 1, level: "advanced" },
    { id: 37, question: "ស្ទាយរចនា Swiss Design ផ្តោតសំខាន់លើអ្វី?", question_en: "What does the Swiss Design style focus heavily on?", options: ["រូបភាពរញ៉េរញ៉ៃ", "ភាពស្អាត សណ្តាប់ធ្នាប់តាម Grid និងហ្វុនគ្មានកន្ទុយ (Sans-serif)", "ការប្រើពណ៌ត្នោត", "អក្សរផ្ចង់"], options_en: ["Chaotic imagery", "Cleanliness, strict grids, and Sans-serif typography", "Using brown colors", "Cursive calligraphy"], correct: 1, level: "advanced" },
    { id: 38, question: "តើ Baseline នៅក្នុង Typography គឺជាអ្វី?", question_en: "What is a Baseline in Typography?", options: ["បន្ទាត់ខាងលើបង្អស់", "បន្ទាត់គោលដែលតួអក្សរភាគច្រើនឈរពីលើ", "ចន្លោះប្រហោង", "ពណ៌អក្សរ"], options_en: ["The topmost line", "The invisible line where most characters sit", "The empty space", "The font color"], correct: 1, level: "intermediate" },
    { id: 39, question: "X-height សំដៅទៅលើអ្វី?", question_en: "What does X-height refer to?", options: ["កម្ពស់នៃអក្សរធំ (A, B, C)", "កម្ពស់នៃតួអក្សរតូច (lowercase) ដូចជាអក្សរ 'x'", "ទទឹងនៃអក្សរ", "ចន្លោះបន្ទាត់"], options_en: ["Height of uppercase letters", "Height of lowercase letters like 'x'", "Width of the letters", "Line spacing"], correct: 1, level: "advanced" },
    { id: 40, question: "អក្សរដូចជា 'b', 'd', 'h' មានផ្នែកដែលលូតឡើងលើ ដែលគេហៅថា៖", question_en: "Letters like 'b', 'd', 'h' have parts that extend upward, called:", options: ["Descender", "Ascender", "Counter", "Serif"], options_en: ["Descender", "Ascender", "Counter", "Serif"], correct: 1, level: "advanced" },

    // Typography & Software Tools (41-60)
    { id: 41, question: "អក្សរដូចជា 'p', 'y', 'g' មានផ្នែកដែលធ្លាក់ចុះក្រោម ដែលគេហៅថា៖", question_en: "Letters like 'p', 'y', 'g' have parts that drop downward, called:", options: ["Descender", "Ascender", "Bowl", "Terminal"], options_en: ["Descender", "Ascender", "Bowl", "Terminal"], correct: 0, level: "advanced" },
    { id: 42, question: "ហ្វុនប្រភេទ Script (អក្សរផ្ចង់) មិនគួរប្រើនៅកន្លែងណា?", question_en: "Where should you NEVER use a Script font?", options: ["ចំណងជើងធៀបការ", "ឡូហ្គោ", "អត្ថបទរាងកាយ (Body text) វែងៗ", "កាតជូនពរ"], options_en: ["Wedding titles", "Logos", "Long body text paragraphs", "Greeting cards"], correct: 2, level: "intermediate" },
    { id: 43, question: "ហ្វុនប្រភេទ Display ត្រូវបានរចនាឡើងសម្រាប់គោលបំណងអ្វី?", question_en: "What are Display fonts designed for?", options: ["សរសេរសៀវភៅ", "ចំណងជើងធំៗ (Headlines) ដែលត្រូវការទាក់ទាញភ្នែក", "ធ្វើអក្សររត់ក្រោមវីដេអូ", "សរសេរកូដ"], options_en: ["Writing books", "Large headlines that need to grab attention", "Video subtitles", "Writing code"], correct: 1, level: "intermediate" },
    { id: 44, question: "តើអ្វីទៅជា Variable Font?", question_en: "What is a Variable Font?", options: ["ហ្វុនដែលប្តូរពណ៌ដោយស្វ័យប្រវត្តិ", "ហ្វុន១File ដែលផ្ទុកទម្ងន់(Weight)ច្រើន និងអាចទាញសារ៉េបានតាមចិត្ត", "ហ្វុនដែលសរសេរមិនចេញ", "ហ្វុនដែលមានមេរោគ"], options_en: ["A font that changes color automatically", "A single file containing infinite sliding weights and styles", "An unreadable font", "A virus font"], correct: 1, level: "advanced" },
    { id: 45, question: "ភាពខុសគ្នារវាង Readability និង Legibility គឺ៖", question_en: "The difference between Readability and Legibility is:", options: ["គ្មានខុសគ្នាទេ", "Legibility គឺភាពច្បាស់នៃតួអក្សរ១ៗ ចំណែក Readability គឺភាពងាយស្រួលអាននៃអត្ថបទទាំងមូល", "Readability ជាពណ៌ Legibility ជាទំហំ", "ជាឈ្មោះកម្មវិធី"], options_en: ["No difference", "Legibility is how clear individual letters are; Readability is how easy a whole block of text is to read", "Readability is color, Legibility is size", "They are software names"], correct: 1, level: "advanced" },
    { id: 46, question: "កម្មវិធី Adobe Photoshop មិនសាកសមសម្រាប់ការងារអ្វី?", question_en: "What is Adobe Photoshop NOT suited for?", options: ["កាត់តរូបភាព", "លុបមុន", "រចនាឡូហ្គោដែលត្រូវពង្រីកធំៗ (Vector)", "ប្តូរពណ៌មេឃ"], options_en: ["Photo manipulation", "Blemish removal", "Designing scalable vector logos", "Sky replacement"], correct: 2, level: "beginner" },
    { id: 47, question: "តើឯកសារ .PSD ជាប្រភេទឯកសាររបស់កម្មវិធីអ្វី?", question_en: ".PSD is the native file format for which software?", options: ["Illustrator", "Photoshop", "Premiere", "After Effects"], options_en: ["Illustrator", "Photoshop", "Premiere", "After Effects"], correct: 1, level: "beginner" },
    { id: 48, question: "តើឯកសារ .AI ជាប្រភេទឯកសាររបស់កម្មវិធីអ្វី?", question_en: ".AI is the native file format for which software?", options: ["Illustrator", "InDesign", "Figma", "Canva"], options_en: ["Illustrator", "InDesign", "Figma", "Canva"], correct: 0, level: "beginner" },
    { id: 49, question: "កម្មវិធី Adobe InDesign ត្រូវគេប្រើប្រាស់ជាចម្បងសម្រាប់អ្វី?", question_en: "What is Adobe InDesign primarily used for?", options: ["កាត់វីដេអូ", "កាត់រូប", "រៀបចំប្លង់ទំព័រច្រើន ដូចជា ទស្សនាវដ្តី និងសៀវភៅ", "គូររូប 3D"], options_en: ["Video editing", "Photo cropping", "Multi-page layout design like magazines and books", "3D modeling"], correct: 2, level: "intermediate" },
    { id: 50, question: "កម្មវិធី Figma ត្រូវបានគេនិយមប្រើបំផុតសម្រាប់៖", question_en: "Figma is most popular for:", options: ["កែរូបថត", "ការរចនា UI/UX សម្រាប់ App និង Website", "ធ្វើវីដេអូកំប្លែង", "បោះពុម្ពសៀវភៅ"], options_en: ["Photo editing", "UI/UX design for Apps and Websites", "Making funny videos", "Printing books"], correct: 1, level: "intermediate" },
    { id: 51, question: "តើ Pen Tool មានមុខងារសំខាន់បំផុតសម្រាប់អ្វី?", question_en: "What is the primary function of the Pen Tool?", options: ["លុបអក្សរ", "គូរខ្សែបន្ទាត់ និង Path យ៉ាងសុក្រិត (Vector)", "ដាក់ពណ៌", "ពង្រីករូប"], options_en: ["Deleting text", "Drawing highly precise lines and paths (Vectors)", "Applying color", "Zooming images"], correct: 1, level: "intermediate" },
    { id: 52, question: "Layer Mask នៅក្នុង Photoshop មានតួនាទីអ្វី?", question_en: "What does a Layer Mask do in Photoshop?", options: ["លុបរូបចោលជារៀងរហូត", "បិទបាំងផ្នែកខ្លះនៃរូបភាពដោយមិនលុបសាច់រូបដើមចោល (Non-destructive)", "ធ្វើអោយរូបខ្មៅ", "បង្កើត Layer ថ្មី"], options_en: ["Deletes pixels permanently", "Hides parts of an image without erasing the original pixels (Non-destructive)", "Turns the image black", "Creates a new layer"], correct: 1, level: "advanced" },
    { id: 53, question: "Clipping Mask គឺធ្វើការយ៉ាងដូចម្តេច?", question_en: "How does a Clipping Mask work?", options: ["កាត់វីដេអូ", "យករូបភាពមួយទៅបង្ហាញតែនៅក្នុងទំហំនៃរូបរាង (Shape) ខាងក្រោមវាប៉ុណ្ណោះ", "ចាក់ពណ៌ស", "បិទកម្មវិធី"], options_en: ["Cuts video", "Constrains an image to only show within the boundaries of the shape directly below it", "Fills with white color", "Closes the software"], correct: 1, level: "advanced" },
    { id: 54, question: "Blending Modes (ដូចជា Multiply ឬ Screen) ប្រើសម្រាប់៖", question_en: "Blending Modes (like Multiply or Screen) are used for:", options: ["លុប Background ពណ៌ស ឬខ្មៅ ឱ្យរលាយចូលពណ៌ខាងក្រោម", "កាត់វីដេអូ", "ពង្រីកអក្សរ", "Save រូបភាព"], options_en: ["Knocking out white/black backgrounds to blend with layers below", "Cutting videos", "Enlarging text", "Saving images"], correct: 0, level: "advanced" },
    { id: 55, question: "អត្ថប្រយោជន៍នៃ Smart Object ក្នុង Photoshop គឺអ្វី?", question_en: "What is the benefit of a Smart Object in Photoshop?", options: ["ធ្វើអោយរូបខូចគុណភាព", "រក្សាគុណភាពរូបដើមទោះបីជាអ្នកបង្រួមឬពង្រីកវាច្រើនដងក៏ដោយ", "ប្តូរភាសាដោយស្វ័យប្រវត្តិ", "កាត់តវីដេអូ"], options_en: ["It ruins image quality", "It preserves original pixel data even if scaled down and back up multiple times", "Translates text automatically", "Video editing"], correct: 1, level: "advanced" },
    { id: 56, question: "Artboard នៅក្នុង Illustrator មានន័យដូចម្តេច?", question_en: "What is an Artboard in Illustrator?", options: ["ក្តារលាយពណ៌", "ផ្ទាំងក្រដាសការងារ (Canvas) ដែលអាចមានច្រើនផ្ទាំងក្នុង File តែមួយ", "ប្រភេទជក់គូររូប", "កន្លែងរក្សាទុក Layer"], options_en: ["A color mixing palette", "The canvas workspace (you can have multiple in one file)", "A type of brush", "A folder for layers"], correct: 1, level: "intermediate" },
    { id: 57, question: "Gradient Tool ប្រើសម្រាប់អ្វី?", question_en: "What is the Gradient Tool used for?", options: ["លុបរូប", "បង្កើតការរលាយពណ៌ពីពណ៌មួយទៅពណ៌មួយទៀតយ៉ាងទន់ភ្លន់", "តម្រង់រូប", "សរសេរអក្សរ"], options_en: ["Erasing images", "Creating a smooth transition between two or more colors", "Straightening images", "Writing text"], correct: 1, level: "beginner" },
    { id: 58, question: "ភាពខុសគ្នារវាង Opacity និង Fill ក្នុង Layer Style គឺអ្វី?", question_en: "What is the difference between Opacity and Fill in Layer Styles?", options: ["គ្មានខុសគ្នាទេ", "Opacity បន្ថយភាពច្បាស់ទាំងរូបនិង Effect ឯ Fill បន្ថយតែសាច់រូប តែរក្សា Effect (ដូចជា Shadow) នៅដដែល", "Fill ប្រើសម្រាប់តែអក្សរ", "Opacity ប្រើសម្រាប់តែរូប"], options_en: ["No difference", "Opacity fades the pixels AND layer effects; Fill fades only the pixels but keeps effects (like Drop Shadow) visible", "Fill is only for text", "Opacity is only for images"], correct: 1, level: "advanced" },
    { id: 59, question: "Drop Shadow (ស្រមោល) ជួយអ្វីខ្លះដល់ការរចនា?", question_en: "How does a Drop Shadow help a design?", options: ["ធ្វើអោយរូបមើលទៅរាបស្មើ", "បង្កើតជម្រៅ (Depth) និងធ្វើឱ្យវត្ថុលេចចេញពីផ្ទៃខាងក្រោយ", "លុបពណ៌ចោល", "ធ្វើអោយ file ស្រាល"], options_en: ["Makes the image look flat", "Creates depth and lifts the object off the background", "Removes color", "Makes the file lighter"], correct: 1, level: "intermediate" },
    { id: 60, question: "ការរចនាម៉ាកយីហោ (Branding) ខុសពី Logo Design យ៉ាងម៉េច?", question_en: "How is Branding different from Logo Design?", options: ["Branding ប្រើសម្រាប់តែខោអាវ", "Logo គឺជានិមិត្តសញ្ញា ចំណែក Branding គឺជាបទពិសោធន៍ អារម្មណ៍ និងអត្តសញ្ញាណទាំងមូលរបស់ក្រុមហ៊ុន", "គ្មានខុសគ្នាទេ", "Logo ធំជាង Branding"], options_en: ["Branding is only for clothes", "A logo is a symbol; Branding is the entire emotional experience and identity of the company", "No difference", "Logo is physically larger"], correct: 1, level: "advanced" },

    // Layout, Print, Web & Professional Practice (61-100)
    { id: 61, question: "តើ Brand Style Guide (សៀវភៅម៉ាក) មានផ្ទុកអ្វីខ្លះ?", question_en: "What does a Brand Style Guide contain?", options: ["តារាងតម្លៃទំនិញ", "ច្បាប់នៃការប្រើប្រាស់ Logo ពណ៌ និង ហ្វុនអក្សរអោយបានត្រឹមត្រូវ", "ប្រវត្តិរូបអ្នកឌីហ្សាញ", "បញ្ជីឈ្មោះអតិថិជន"], options_en: ["Product price lists", "Strict rules on how to properly use the Logo, Colors, and Typography", "The designer's resume", "Client name list"], correct: 1, level: "advanced" },
    { id: 62, question: "Target Audience (អតិថិជនគោលដៅ) គឺសំដៅលើ៖", question_en: "Target Audience refers to:", options: ["អ្នកណាដែលដើរកាត់", "ក្រុមមនុស្សជាក់លាក់ដែល Design របស់អ្នកចង់ទំនាក់ទំនងទៅរក", "ក្រុមហ៊ុនប្រកួតប្រជែង", "អ្នកលក់"], options_en: ["Anyone walking by", "The specific demographic group your design is trying to communicate with", "Competitors", "Salesmen"], correct: 1, level: "intermediate" },
    { id: 63, question: "Mockup (ម៉ុកអាប់) មានប្រយោជន៍អ្វី?", question_en: "What is the purpose of a Mockup?", options: ["សម្រាប់លុបពណ៌", "បង្ហាញ Design 2D របស់អ្នកឱ្យមើលទៅដូចរបស់ពិត 3D (ឧ. ឡូហ្គោនៅលើកែវកាហ្វេពិតៗ)", "សម្រាប់សរសេរកូដ", "សម្រាប់ព្រីនចេញ"], options_en: ["For color removal", "To display a flat 2D design in a realistic 3D environment (e.g., logo on a real coffee cup)", "For coding", "For printing out"], correct: 1, level: "intermediate" },
    { id: 64, question: "Die-line នៅក្នុងការរចនាសំបកវេចខ្ចប់ (Packaging) គឺជាអ្វី?", question_en: "What is a Die-line in packaging design?", options: ["បន្ទាត់សម្រាប់គូសពណ៌", "ពុម្ពបន្ទាត់សម្រាប់បញ្ជាក់កន្លែងដែលត្រូវ កាត់ (Cut) និង បត់ (Fold)", "ឈ្មោះហ្វុន", "ប្រភេទក្រដាស"], options_en: ["Lines for coloring", "A vector template indicating exactly where to Cut and Fold the packaging", "A font name", "A type of paper"], correct: 1, level: "advanced" },
    { id: 65, question: "Responsive Design ក្នុងការរចនា Web គឺសំដៅលើអ្វី?", question_en: "Responsive Design in web design refers to:", options: ["វេបសាយដែលឆ្លើយតបសារលឿន", "ការរៀបចំប្លង់ដែលអាចបត់បែនទំហំបានល្អគ្រប់អេក្រង់ (ទូរស័ព្ទ កុំព្យូទ័រ)", "វេបសាយដែលមានពណ៌ស្រស់", "ការប្រើអក្សរធំៗ"], options_en: ["Websites that reply to messages fast", "Layouts that automatically adapt and scale to fit any screen size (mobile, desktop)", "Websites with bright colors", "Using large fonts"], correct: 1, level: "advanced" },
    { id: 66, question: "ពាក្យកាត់ UI តំណាងអោយអ្វី?", question_en: "What does the acronym UI stand for?", options: ["User Internet", "User Interface (ចំណុចប្រទាក់ដែលអ្នកប្រើប្រាស់មើលឃើញ)", "Universal Identity", "Unique Icon"], options_en: ["User Internet", "User Interface (the visual layout the user interacts with)", "Universal Identity", "Unique Icon"], correct: 1, level: "intermediate" },
    { id: 67, question: "ពាក្យកាត់ UX តំណាងអោយអ្វី?", question_en: "What does the acronym UX stand for?", options: ["User Experience (បទពិសោធន៍ និងភាពងាយស្រួលក្នុងការប្រើប្រាស់)", "Unknown X", "User X-ray", "Useful eXample"], options_en: ["User Experience (the psychological flow and ease of use)", "Unknown X", "User X-ray", "Useful eXample"], correct: 0, level: "intermediate" },
    { id: 68, question: "Wireframe នៅក្នុង UI Design គឺជាអ្វី?", question_en: "What is a Wireframe in UI Design?", options: ["រូបភាពពណ៌ពេញ", "គំនូរព្រាងប្លង់រចនាសម្ព័ន្ធ (គ្រោងឆ្អឹង) ដែលគ្មានពណ៌ មុននឹងឈានទៅ Design ពិត", "ខ្សែភ្លើង", "កម្មវិធីកាត់ត"], options_en: ["A full-color image", "A low-fidelity structural blueprint without colors, focusing purely on layout", "Electrical wires", "Editing software"], correct: 1, level: "advanced" },
    { id: 69, question: "Prototype គឺជាអ្វី?", question_en: "What is a Prototype?", options: ["ការព្រីនចេញលើក្រដាស", "គំរូដែលអាចចុចបាន (Interactive) ធ្វើតេស្តមុននឹងឱ្យកូដឌ័រយកទៅសរសេរកូដ", "រូបភាព 3D", "ប្រភេទហ្វុន"], options_en: ["A paper printout", "An interactive, clickable mockup used for testing before coding begins", "A 3D image", "A font type"], correct: 1, level: "advanced" },
    { id: 70, question: "Motion Graphics គឺជាអ្វី?", question_en: "What are Motion Graphics?", options: ["ការគូររូបលើក្រដាស", "ការធ្វើឱ្យរូបភាពក្រាហ្វិក (Logo, អក្សរ) មានចលនារស់រវើក", "ការថតកុនក្បាច់គុន", "ការព្រីនរូបធំៗ"], options_en: ["Drawing on paper", "Bringing graphic elements (logos, text, shapes) to life through animation", "Martial arts movies", "Printing large banners"], correct: 1, level: "intermediate" },
    { id: 71, question: "Keyframe នៅក្នុងកម្មវិធី Animation គឺប្រើសម្រាប់អ្វី?", question_en: "What is a Keyframe used for in animation software?", options: ["ចាក់សោរ File", "កំណត់ចំណុចចាប់ផ្តើម ឬបញ្ចប់នៃចលនានៅវិនាទីណាមួយ", "គូររូបភាពកាតូន", "កែពណ៌រូបថត"], options_en: ["Locking the file", "Defining the starting or ending point of any transition/movement on a timeline", "Drawing cartoons", "Color grading photos"], correct: 1, level: "advanced" },
    { id: 72, question: "Easing (Ease in / Ease out) នៅក្នុង Animation ជួយអ្វី?", question_en: "How does 'Easing' help in animation?", options: ["ធ្វើឱ្យល្បឿនចលនាមើលទៅរលូន និងដូចធម្មជាតិពិតៗ មិនរឹងដូចមនុស្សយន្ត", "ធ្វើឱ្យឈប់ដើរ", "ធ្វើឱ្យប្តូរពណ៌", "ធ្វើឱ្យវីដេអូច្បាស់"], options_en: ["It makes movement look smooth and natural, rather than linear and robotic", "It stops movement", "It changes colors", "It makes video clearer"], correct: 0, level: "advanced" },
    { id: 73, question: "គោលបំណងចម្បងនៃ Infographic គឺ៖", question_en: "The primary purpose of an Infographic is:", options: ["ធ្វើអោយអត្ថបទវែង", "បំប្លែងទិន្នន័យស្មុគស្មាញ និងអត្ថបទ ទៅជារូបភាពដែលងាយយល់លឿន", "ប្រើសម្រាប់តែគណិតវិទ្យា", "បង្ហាញពីប្រវត្តិរូប"], options_en: ["To make text longer", "To convert complex data and heavy text into easily digestible visual imagery", "For math only", "To show a resume"], correct: 1, level: "intermediate" },
    { id: 74, question: "ជំហានទី១ នៃដំណើរការរចនាអាជីព (Creative Process) គឺអ្វី?", question_en: "What is the 1st step in a professional Creative Process?", options: ["បើកកម្មវិធី Photoshop ភ្លាមៗ", "ស្រាវជ្រាវ (Research) និងស្វែងយល់ពីបញ្ហា", "ជ្រើសរើសពណ៌", "រកហ្វុនអក្សរ"], options_en: ["Opening Photoshop immediately", "Research and understanding the core problem", "Choosing colors", "Finding fonts"], correct: 1, level: "intermediate" },
    { id: 75, question: "ហេតុអ្វីបានជាការគូសវាស (Sketching) សំខាន់មុនពេលប្រើកុំព្យូទ័រ?", question_en: "Why is Sketching important before using a computer?", options: ["ព្រោះអត់មានកុំព្យូទ័រប្រើ", "ជួយឱ្យខួរក្បាលបញ្ចេញគំនិតបានលឿន ដោយមិនជាប់គាំងនឹងឧបករណ៍កម្មវិធី", "ព្រោះអតិថិជនចូលចិត្តមើលក្រដាស", "ធ្វើអោយខាតពេល"], options_en: ["Because there is no computer", "It allows rapid brain-dumping of ideas without getting stuck on software technicalities", "Because clients like paper", "It wastes time"], correct: 1, level: "intermediate" },
    { id: 76, question: "Constructive Feedback (ការរិះគន់ស្ថាបនា) មានន័យដូចម្តេច?", question_en: "What does Constructive Feedback mean?", options: ["ការជេរប្រមាថ", "ការប្រាប់ពីចំណុចខ្វះខាតអមដោយហេតុផលច្បាស់លាស់ ដើម្បីកែលម្អ", "ការសរសើររហូត", "ការបដិសេធមិនមើល"], options_en: ["Insulting", "Pointing out flaws accompanied by clear reasons and suggestions for improvement", "Endless praise", "Refusing to look at it"], correct: 1, level: "intermediate" },
    { id: 77, question: "Portfolio របស់អ្នករចនាដ៏ល្អ គួរមានលក្ខណៈដូចម្តេច?", question_en: "What should a good designer's Portfolio look like?", options: ["ដាក់រាល់ស្នាដៃដែលខ្លួនធ្លាប់ធ្វើទាំងអាក្រក់ទាំងល្អ", "ដាក់ស្នាដៃតែ ៣-៥ ដែលល្អដាច់គេ និងបង្ហាញពីដំណើរការគិត (Case Study)", "ដាក់តែឈ្មោះនិងលេខទូរស័ព្ទ", "មិនបាច់មាន"], options_en: ["It includes everything they've ever made, good and bad", "It contains only 3-5 absolute best pieces and shows the thought process (Case Studies)", "Just a name and phone number", "No portfolio needed"], correct: 1, level: "advanced" },
    { id: 78, question: "Copyright Plagiarism (ការលួចចម្លងកម្មសិទ្ធិបញ្ញា) គឺ៖", question_en: "Copyright Plagiarism is:", options: ["ការមើលស្នាដៃគេយកគំនិត", "ការយកស្នាដៃគេទាំងស្រុងមកកែបន្តិចបន្តួច ហើយអះអាងថាជារបស់ខ្លួន", "ការទិញរូបភាពពីស្តុក", "ការប្រើហ្វុន Free"], options_en: ["Looking at others' work for inspiration", "Taking someone's exact work, tweaking it slightly, and claiming it as your own", "Buying stock photos", "Using free fonts"], correct: 1, level: "intermediate" },
    { id: 79, question: "តើ Commercial Use License គឺជាអ្វី?", question_en: "What is a Commercial Use License?", options: ["អាជ្ញាប័ណ្ណហាមឃាត់ការប្រើ", "អាជ្ញាប័ណ្ណដែលអនុញ្ញាតឱ្យអ្នកប្រើប្រាស់ធនធាន (រូប/ហ្វុន) ដើម្បីរកប្រាក់ចំណេញ", "អាជ្ញាប័ណ្ណសម្រាប់សិស្ស", "អាជ្ញាប័ណ្ណលួចចម្លង"], options_en: ["A license forbidding use", "A legal permit allowing you to use assets (fonts/images) for profit-generating projects", "Student license", "Piracy license"], correct: 1, level: "advanced" },
    { id: 80, question: "Eco-friendly Design (ការរចនាគិតគូរបរិស្ថាន) រួមមានទង្វើអ្វីខ្លះ?", question_en: "What does Eco-friendly Design involve?", options: ["ការព្រីនចោលច្រើន", "ការប្រើទំហំក្រដាសសន្សំសំចៃ កាត់បន្ថយទឹកថ្នាំ និងប្រើប្រាស់សំបកវេចខ្ចប់អាចកែច្នៃបាន", "ការបើកកុំព្យូទ័រចោល", "ការប្រើពណ៌បៃតងរហូត"], options_en: ["Printing excessively", "Using economic paper sizes, minimizing ink coverage, and using recyclable packaging", "Leaving computers on", "Always using green color"], correct: 1, level: "advanced" },
    { id: 81, question: "Freelancer គួរទាមទារប្រាក់កក់ (Deposit) ប៉ុន្មានមុនពេលចាប់ផ្តើមការងារ?", question_en: "How much Deposit should a Freelancer demand before starting?", options: ["0%", "ជាទូទៅ 30% ទៅ 50% ដើម្បីការពារហានិភ័យ", "100%", "ចាំយកពេលចប់តែម្តង"], options_en: ["0%", "Typically 30% to 50% to protect against ghosting", "100%", "Wait until the very end"], correct: 1, level: "advanced" },
    { id: 82, question: "តើ Contract (កិច្ចសន្យា) សំខាន់កម្រិតណាសម្រាប់ Freelancer?", question_en: "How important is a Contract for a Freelancer?", options: ["មិនសំខាន់ទេ", "សំខាន់ខ្លាំងណាស់ វាការពារទាំងអ្នករចនា និងអតិថិជនពីជម្លោះ", "មានតែនៅក្រុមហ៊ុនធំៗទេ", "នាំអោយខាតពេល"], options_en: ["Not important", "Critically important; it protects both the designer and client from disputes", "Only for big agencies", "It wastes time"], correct: 1, level: "intermediate" },
    { id: 83, question: "កម្រិត Resolution ស្តង់ដារសម្រាប់ការរចនាវេបសាយ (Web/Digital) គឺប៉ុន្មាន?", question_en: "What is the standard Resolution for Web/Digital design?", options: ["300 PPI", "72 ទៅ 150 PPI", "10 PPI", "1000 PPI"], options_en: ["300 PPI", "72 to 150 PPI", "10 PPI", "1000 PPI"], correct: 1, level: "intermediate" },
    { id: 84, question: "ប្រភេទ File រូបភាពណាដែលល្អបំផុតសម្រាប់ផ្ទៃថ្លា (Transparent Background)?", question_en: "Which image file type is best for Transparent Backgrounds?", options: [".jpg", ".png", ".bmp", ".pdf"], options_en: [".jpg", ".png", ".bmp", ".pdf"], correct: 1, level: "beginner" },
    { id: 85, question: "ប្រភេទ File .SVG ត្រូវបានគេពេញនិយមក្នុង Web Design ព្រោះ៖", question_en: ".SVG files are popular in Web Design because:", options: ["វាមានទំហំធំ", "វាជារូប Vector ទំហំស្រាល និងមិនបែកគុណភាពទោះពង្រីកធំប៉ុណ្ណាក៏ដោយ", "វាបង្ហាញវីដេអូបាន", "វាប្រើបានតែក្នុង Photoshop"], options_en: ["They have huge file sizes", "They are lightweight Vectors that never lose quality regardless of screen scale", "They can play videos", "They only work in Photoshop"], correct: 1, level: "advanced" },
    { id: 86, question: "តើ Z-Pattern Layout សាកសមបំផុតសម្រាប់អ្វី?", question_en: "What is a Z-Pattern Layout best suited for?", options: ["អានសៀវភៅប្រលោមលោក", "ផ្ទាំងផ្សព្វផ្សាយ (Poster) ឬទំព័រ Landing Page ដែលចង់ដឹកនាំភ្នែកឱ្យចុចប៊ូតុងខាងចុង", "បញ្ជីរាយនាម", "កាសែត"], options_en: ["Reading novels", "Posters or Landing Pages designed to lead the eye toward a final Call-to-Action button", "Name lists", "Newspapers"], correct: 1, level: "advanced" },
    { id: 87, question: "តើ F-Pattern Layout ត្រូវបានប្រើប្រាស់ច្រើននៅឯណា?", question_en: "Where is the F-Pattern Layout mostly used?", options: ["ការរចនាឡូហ្គោ", "វេបសាយដែលមានអត្ថបទច្រើន (Blog/News) ព្រោះមនុស្សទម្លាប់អានពីឆ្វេងទៅស្តាំ", "ការរចនាសម្លៀកបំពាក់", "ការគូរគំនូរ"], options_en: ["Logo design", "Text-heavy websites (Blogs/News) because humans naturally scan left-to-right then down", "Fashion design", "Painting"], correct: 1, level: "advanced" },
    { id: 88, question: "ការរចនាបែប Flat Design មានលក្ខណៈដូចម្តេច?", question_en: "What characterizes Flat Design?", options: ["រូបភាព 3D មានស្រមោលក្រាស់ៗ", "ការប្រើប្រាស់ពណ៌រាបស្មើ គ្មានស្រមោល គ្មាន Effect ផុស", "ការប្រើប្រាស់គំនូរព្រាងខ្មៅដៃ", "ការរចនាសំបកកេស"], options_en: ["3D images with heavy shadows", "Solid colors, 2D appearance, no shadows, and no embossed effects", "Pencil sketches", "Cardboard box design"], correct: 1, level: "intermediate" },
    { id: 89, question: "Skeuomorphism នៅក្នុងការរចនា UI មានន័យថា៖", question_en: "What does Skeuomorphism mean in UI design?", options: ["ការរចនាឱ្យរាបស្មើ", "ការរចនាប៊ូតុង ឬ Icon ឱ្យមើលទៅដូចវត្ថុពិតៗនៅក្នុងជីវិតជាក់ស្តែង (មានស្រមោល វាយនភាព)", "ការមិនប្រើរូបភាពសោះ", "ការប្រើប្រាស់តែពណ៌សខ្មៅ"], options_en: ["Making it completely flat", "Designing digital icons/buttons to look exactly like their real-world physical counterparts (textures, shadows)", "Using zero images", "Only using black and white"], correct: 1, level: "advanced" },
    { id: 90, question: "Color Cast នៅក្នុងរូបភាពគឺ៖", question_en: "A Color Cast in an image is:", options: ["រូបភាពសខ្មៅ", "ការជាប់ពណ៌មិនធម្មជាតិ (ឧ. មុខជាប់ពណ៌បៃតងដោយសារជះពន្លឺពីដើមឈើ)", "ប្រភេទ Effect", "ការចាក់ពណ៌ background"], options_en: ["A black and white photo", "An unwanted, unnatural tint across an image (e.g., green skin from tree reflection)", "An effect filter", "Filling the background"], correct: 1, level: "intermediate" },
    { id: 91, question: "ទំហំសមាមាត្រ 1:1 (Square) និយមប្រើបំផុតនៅលើ៖", question_en: "The 1:1 (Square) aspect ratio is most popular on:", options: ["ផ្ទាំងប៉ាណូធំៗ", "ការបង្ហោះរូបលើ Instagram Feed", "វីដេអូ YouTube", "កាតនាមប័ណ្ណ"], options_en: ["Large billboards", "Instagram Feed posts", "YouTube videos", "Business cards"], correct: 1, level: "beginner" },
    { id: 92, question: "ទំហំសមាមាត្រ 16:9 (Landscape) គឺស្តង់ដារសម្រាប់៖", question_en: "The 16:9 (Landscape) aspect ratio is the standard for:", options: ["រូប Profile", "វីដេអូ YouTube និងអេក្រង់ទូរទស្សន៍", "Instagram Story", "សៀវភៅ"], options_en: ["Profile pictures", "YouTube videos and TV screens", "Instagram Stories", "Books"], correct: 1, level: "beginner" },
    { id: 93, question: "ទំហំសមាមាត្រ 9:16 (Portrait) គឺស្តង់ដារសម្រាប់៖", question_en: "The 9:16 (Portrait) aspect ratio is the standard for:", options: ["Facebook Cover", "Instagram Story, Reels និង TikTok", "នាមប័ណ្ណ", "រូបតំណាង"], options_en: ["Facebook Covers", "Instagram Stories, Reels, and TikToks", "Business cards", "Icons"], correct: 1, level: "beginner" },
    { id: 94, question: "ចំណងជើង (Heading) គួរមានលក្ខណៈដូចម្តេចបើធៀបនឹងអត្ថបទរាងកាយ (Body text)?", question_en: "How should a Heading look compared to the Body text?", options: ["តូចជាង", "ធំជាង និងដិតជាង (Bold) ដើម្បីទាញភ្នែកមុនគេ", "ប៉ុនគ្នា", "មានពណ៌ស្រអាប់ជាង"], options_en: ["Smaller", "Larger and bolder to immediately grab the eye", "The exact same size", "More muted in color"], correct: 1, level: "beginner" },
    { id: 95, question: "តើ 'Lorem Ipsum' ជាអ្វី?", question_en: "What is 'Lorem Ipsum'?", options: ["ឈ្មោះហ្វុនអក្សរ", "អត្ថបទក្លែងក្លាយ (Placeholder Text) ដែលគេយកមកដាក់បំពេញចន្លោះក្នុងប្លង់រចនាជាបណ្តោះអាសន្ន", "ឈ្មោះអ្នកឌីហ្សាញ", "កម្មវិធីកាត់ត"], options_en: ["A font name", "Dummy placeholder text used to fill space in a layout mockup", "A designer's name", "Editing software"], correct: 1, level: "intermediate" },
    { id: 96, question: "បច្ចេកទេស 'Rule of Odds' នៅក្នុងការរៀបចំប្លង់ណែនាំថា៖", question_en: "What does the 'Rule of Odds' suggest in layout design?", options: ["វត្ថុមានចំនួនគូ (២, ៤, ៦) មើលទៅស្អាតជាង", "វត្ថុដែលមានចំនួនសេស (៣, ៥, ៧) មើលទៅមានភាពទាក់ទាញ និងធម្មជាតិជាងចំនួនគូ", "មិនគួរដាក់វត្ថុក្នុងរូបទេ", "ត្រូវដាក់វត្ថុតែ១គត់"], options_en: ["Even numbers (2,4,6) look better", "Odd numbers of objects (3,5,7) look much more natural and appealing than even numbers", "Don't place objects in a photo", "Only ever place 1 object"], correct: 1, level: "advanced" },
    { id: 97, question: "ការប្រើប្រាស់ពណ៌ច្រើនជាង ៤ ពណ៌ឆើតៗក្នុង Design តែមួយ ជាទូទៅនឹងបណ្តាលឱ្យ៖", question_en: "Using more than 4 bright colors in a single design usually results in:", options: ["កាន់តែស្រស់ស្អាតខ្លាំង", "រញ៉េរញ៉ៃ គ្មានសណ្តាប់ធ្នាប់ និងពិបាករកចំណុចសំខាន់", "អតិថិជនចូលចិត្ត", "ជួយឱ្យវេបសាយដើរលឿន"], options_en: ["Extreme beauty", "Visual chaos, making it difficult for the eye to find a focal point", "Clients loving it", "Faster website loading"], correct: 1, level: "intermediate" },
    { id: 98, question: "Typography 'Orphan' នៅក្នុងការវាយអត្ថបទគឺជាអ្វី?", question_en: "What is a Typographic 'Orphan'?", options: ["ក្មេងកំព្រា", "ពាក្យមួយម៉ាត់ឯកោ ដែលធ្លាក់មកនៅបន្ទាត់ចុងក្រោយគេតែឯង (មើលទៅមិនស្អាត)", "អក្សរធំនៅដើមបន្ទាត់", "ពណ៌អក្សរ"], options_en: ["A human orphan", "A single, isolated word left dangling at the bottom of a paragraph", "A drop cap letter", "Font color"], correct: 1, level: "advanced" },
    { id: 99, question: "តើអ្វីជាជំនាញទន់ (Soft Skill) ដែលអ្នករចនាក្រាហ្វិកត្រូវមាន?", question_en: "What is a crucial 'Soft Skill' for graphic designers?", options: ["ចេះប្រើ Pen Tool", "ការទំនាក់ទំនង ការសហការ និងការស្តាប់អតិថិជន", "ចេះកូដ HTML", "ចេះគូររូបដោយដៃលឿន"], options_en: ["Mastering the Pen Tool", "Communication, collaboration, and listening to clients", "Knowing HTML code", "Drawing fast by hand"], correct: 1, level: "intermediate" },
    { id: 100, question: "គោលដៅចុងក្រោយបំផុត (Ultimate Goal) នៃការរចនាក្រាហ្វិកគឺអ្វី?", question_en: "What is the Ultimate Goal of graphic design?", options: ["ធ្វើឱ្យមានភាពស្រស់ស្អាតតែមួយមុខ", "ការដោះស្រាយបញ្ហា និងការបញ្ជូនសារទៅកាន់អ្នកមើលដោយជោគជ័យ", "ប្រើប្រាស់ Effect ឱ្យបានច្រើនបំផុត", "ឈ្នះពានរង្វាន់"], options_en: ["Making things purely beautiful", "Solving visual problems and successfully communicating a message to the viewer", "Using as many effects as possible", "Winning awards"], correct: 1, level: "beginner" }