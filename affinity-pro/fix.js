const fs = require('fs');
const file = 'd:/My App/Affinity Pro/affinity-pro/frontend/src/data/sub_databases/db_design.jsx';
let lines = fs.readFileSync(file, 'utf8').split('\n');

const newLines = [
"export const designData = [",
"    {",
"        primaryKeys: [\"វចនានុក្រម៖ Resolution និង Pixel 🔍\",\"Dictionary: Resolution & Pixel 🔍\",\"តើ DPI និង PPI ខុសគ្នាម៉េច? 🖨️ (design 0)\",\"តើ Resolution ស្តង់ដារសម្រាប់ការបោះពុម្ពគួរប៉ុន្មាន? 🔍 (design 0)\",\"របៀប Export រូបបង្ហោះកុំឱ្យបែកគុណភាព? 📱 (design 0)\",\"DPI vs PPI? 🖨️ (design 0)\",\"Best Resolution for printing? 🔍 (design 0)\",\"How to export high-quality for social media? 📱 (design 0)\"],",
"        keys: [\"resolution\",\"pixel\",\"ភីកសែល\",\"ភាពច្បាស់\",\"ទំហំរូបភាព\",\"ppi\",\"dpi\"],",
"        regex: [\"^resolution$\",\"^pixel$\",\"^pixels$\",\"^ppi$\",\"^dpi$\",\"^ភាពច្បាស់$\"],",
"        answer: \"🔍 **Resolution (ភាពច្បាស់):** គឺជាចំនួនទិន្នន័យដែលមានក្នុងរូបភាពមួយ។ កាលណា Resolution កាន់តែខ្ពស់ រូបភាពកាន់តែច្បាស់។\\n\\nវាត្រូវបានបែងចែកជាពីរពាក្យបច្ចេកទេសដែលគេឧស្សាហ៍ច្រឡំ៖\\n- **PPI (Pixels Per Inch):** ចំនួនគ្រាប់ភីកសែលលើ \\\"អេក្រង់ឌីជីថល\\\"។ (ស្តង់ដារ Web គឺ 72 ទៅ 150 PPI)\\n- **DPI (Dots Per Inch):** ចំនួនតំណក់ទឹកថ្នាំរបស់ \\\"ម៉ាស៊ីនព្រីន\\\"។ (ស្តង់ដារបោះពុម្ពគឺ 300 PPI/DPI ឡើងទៅ)\\n\\n💡 ក្នុង Affinity PC V3 អ្នកអាចកំណត់ DPI យ៉ាងជាក់លាក់នៅពេលបង្កើតឯកសារថ្មី (New Document) ដើម្បីធានាបានគុណភាពច្បាស់បំផុត។\",",
"        answer_en: \"🔍 **Resolution:** Refers to the amount of detail an image holds. Higher resolution means higher image quality.\\n\\nIt is divided into two commonly confused terms:\\n- **PPI (Pixels Per Inch):** The number of square pixels on a \\\"Digital Screen\\\". (Standard for Web is 72 to 150 PPI)\\n- **DPI (Dots Per Inch):** The number of ink droplets produced by a \\\"Physical Printer\\\". (Standard for Print is 300 PPI/DPI)\\n\\n💡 On Affinity PC V3, you can precisely set your document's DPI during the New Document setup to guarantee the highest quality output.\",",
"        chips: [\"តើ DPI និង PPI ខុសគ្នាម៉េច? 🖨️ (design 0)\",\"តើ Resolution ស្តង់ដារសម្រាប់ការបោះពុម្ពគួរប៉ុន្មាន? 🔍 (design 0)\",\"របៀប Export រូបបង្ហោះកុំឱ្យបែកគុណភាព? 📱 (design 0)\"],",
"        chips_en: [\"DPI vs PPI? 🖨️ (design 0)\",\"Best Resolution for printing? 🔍 (design 0)\",\"How to export high-quality for social media? 📱 (design 0)\"]",
"    },"
];

lines.splice(4, 9, ...newLines);
fs.writeFileSync(file, lines.join('\n'));
console.log('Fixed db_design.jsx');
