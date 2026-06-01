const fs = require('fs');
const path = require('path');

const dbFiles = [
    'db_basics.jsx',
    'db_design.jsx',
    'db_layout.jsx',
    'db_pixel.jsx',
    'db_vector.jsx'
];

const dir = path.join(__dirname, 'frontend/src/data/sub_databases');

// We will use regex to extract objects, or better just require them if we strip the export
let combinedDb = [];

for (const file of dbFiles) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Convert ES6 export to commonjs
    content = content.replace(/export const \w+\s*=\s*/, 'module.exports = ');
    
    const tempPath = path.join(__dirname, 'temp_' + file.replace('.jsx', '.js'));
    fs.writeFileSync(tempPath, content);
    
    try {
        const data = require(tempPath);
        data.forEach(item => {
            item._sourceFile = file;
            combinedDb.push(item);
        });
    } catch (e) {
        console.error("Error evaluating " + file, e);
    }
    
    fs.unlinkSync(tempPath);
}

console.log(`Total items in COMBINED_DB: ${combinedDb.length}`);

const primaryKeysMap = new Map();
const keysMap = new Map();
const regexMap = new Map();

let collisions = 0;
let blanks = 0;
let errors = [];

combinedDb.forEach((item, index) => {
    // Check blanks
    if (!item.primaryKeys || item.primaryKeys.length === 0) {
        errors.push(`Blank primaryKeys in ${item._sourceFile} at index ${index}`);
        blanks++;
    }
    if (!item.keys || item.keys.length === 0) {
        errors.push(`Blank keys in ${item._sourceFile} at index ${index} (primaryKey: ${item.primaryKeys?.[0]})`);
        blanks++;
    }
    if (!item.regex || item.regex.length === 0) {
        errors.push(`Blank regex in ${item._sourceFile} at index ${index} (primaryKey: ${item.primaryKeys?.[0]})`);
        blanks++;
    }
    if (!item.answer || item.answer.trim() === '') {
        errors.push(`Blank answer in ${item._sourceFile} at index ${index} (primaryKey: ${item.primaryKeys?.[0]})`);
        blanks++;
    }
    if (!item.answer_en || item.answer_en.trim() === '') {
        errors.push(`Blank answer_en in ${item._sourceFile} at index ${index} (primaryKey: ${item.primaryKeys?.[0]})`);
        blanks++;
    }
    if (!item.chips || item.chips.length === 0) {
        errors.push(`Blank chips in ${item._sourceFile} at index ${index} (primaryKey: ${item.primaryKeys?.[0]})`);
        blanks++;
    }
    if (!item.chips_en || item.chips_en.length === 0) {
        errors.push(`Blank chips_en in ${item._sourceFile} at index ${index} (primaryKey: ${item.primaryKeys?.[0]})`);
        blanks++;
    }

    // Check collisions in primaryKeys
    (item.primaryKeys || []).forEach(pk => {
        let pkClean = pk.toLowerCase().trim();
        if (primaryKeysMap.has(pkClean)) {
            errors.push(`Collision in primaryKeys: "${pkClean}" found in ${primaryKeysMap.get(pkClean)} and ${item._sourceFile} (index ${index})`);
            collisions++;
        } else {
            primaryKeysMap.set(pkClean, `${item._sourceFile} (index ${index})`);
        }
    });

    // Check collisions in keys (keys should ideally be unique across intents, but maybe some overlap is allowed. Actually overlap in keys causes the bot to match multiple things, we should check)
    // Wait, let's just check primaryKeys for now, maybe keys too.
    /*
    (item.keys || []).forEach(k => {
        let kClean = k.toLowerCase().trim();
        if (keysMap.has(kClean)) {
            // keys can overlap but it's dangerous
            // errors.push(`Collision in keys: "${kClean}" found in ${keysMap.get(kClean)} and ${item._sourceFile} (index ${index})`);
            // collisions++;
        } else {
            keysMap.set(kClean, `${item._sourceFile} (index ${index})`);
        }
    });
    */
});

const strictClean = (text) => text ? text.toLowerCase().replace(/[^\p{L}\p{N}\p{M}]/gu, '') : '';

function matchesEntry(chip, entry) {
    let cleanInput = strictClean(chip);
    let rawInput = chip.trim();
    if (entry.primaryKeys && entry.primaryKeys.some(k => strictClean(k) === cleanInput)) return true;
    if (entry.keys && entry.keys.some(k => cleanInput === strictClean(k))) return true;
    if (entry.regex) {
        return entry.regex.some(r => {
            try { return new RegExp(r, 'i').test(rawInput); } catch { return false; }
        });
    }
    return false;
}

function checkChipValid(chip, source) {
    let found = combinedDb.some(entry => matchesEntry(chip, entry));
    if (!found) {
        errors.push(`Unmatched chip "${chip}" from ${source}`);
        blanks++;
    }
}

combinedDb.forEach((item, index) => {
    // ... rest of checking code
    (item.chips || []).forEach(chip => checkChipValid(chip, `item.chips at index ${index} (${item._sourceFile})`));
    (item.chips_en || []).forEach(chip => checkChipValid(chip, `item.chips_en at index ${index} (${item._sourceFile})`));
});

// Also check SUGGESTED_QUESTIONS and SUGGESTED_QUESTIONS_EN in ai_database.jsx
let aiDbContent = fs.readFileSync(path.join(__dirname, 'frontend/src/data/ai_database.jsx'), 'utf8');

function checkSuggested(name) {
    let match = aiDbContent.match(new RegExp(`export const ${name} = \\[\n?([\\s\\S]*?)\\];`));
    if (match) {
        let arrayStr = match[1];
        let items = arrayStr.split('\n').map(s => s.trim().replace(/,$/, '').replace(/^"|"$/g, '')).filter(s => s && !s.startsWith('//'));
        items.forEach(i => {
            checkChipValid(i, name);
        });
    }
}
checkSuggested('SUGGESTED_QUESTIONS');
checkSuggested('SUGGESTED_QUESTIONS_EN');

console.log(`Unmatched chips found: ${blanks}`);
errors.forEach(e => console.log(e));
