const fs = require('fs');
const path = require('path');

const dbDir = path.join(__dirname, 'frontend', 'src', 'data', 'sub_databases');
const files = fs.readdirSync(dbDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const filePath = path.join(dbDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace Adobe mentions with Affinity equivalents
    content = content.replace(/កម្មវិធី Photoshop/g, 'Affinity Photo (Pixel Studio)');
    content = content.replace(/ប្រើកម្មវិធី Photoshop សម្រាប់កាត់តវា/g, 'ប្រើ Photo Persona សម្រាប់កាត់តវា');
    content = content.replace(/Illustrator សម្រាប់គូរឡូហ្គោ/g, 'Vector Studio សម្រាប់គូរឡូហ្គោ');
    content = content.replace(/in Illustrator/g, 'in Designer (Vector Studio)');
    content = content.replace(/in Photoshop/g, 'in Affinity Photo (Pixel Studio)');
    content = content.replace(/InDesign/gi, 'Affinity Publisher');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Refined ${file}`);
});
