// ==========================================================================
// 🧠 CONVERSATION ENGINE — Combined "Elite" rules harvested from every app
// ==========================================================================
// This module holds the *domain-agnostic* conversational intelligence that was
// previously scattered across Marketing-Pro, Affinity, and Lightroom chatbots,
// now unified and adapted for the GRAPHIC DESIGN assistant. It contains NO
// design knowledge itself — that lives in knowledge.js / config.js. This file
// is purely "how the bot thinks and behaves".
//
// Brought together here:
//   • 8-layer Khmer NLP cleanup pipeline (from Marketing-Pro)
//   • Multi-turn intent detection: correction / uncertain / continuation
//   • User-profile entity extraction + persistence (adapted to design)
//   • Multi-choice question parsing (clarify on a bare "yes")
//   • Gibberish guard, retry/offline chips, word-boundary blacklist matching
// ==========================================================================

// --------------------------------------------------------------------------
// 1. TEXT NORMALIZATION HELPERS
// --------------------------------------------------------------------------

// Keyword cleaner — keeps only letters/numbers/combining-marks across ANY
// script, dropping spaces, punctuation, and zero-width characters. So "RGB?",
// "rgb", and "r g b" all collapse to the same comparable token.
const stripPunct = (t) => (t || '').toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}\p{M}]/gu, '');

// superClean is the same normalization, exported for the trusted-chip path so
// "What is the Meta Pixel?" === "what is meta pixel".
export const superClean = (t) => (t || '').toLowerCase().replace(/[^\p{L}\p{N}\p{M}]/gu, '');

// matchesKeyword — word-boundary aware so a blacklist word like "car" does NOT
// reject "scarcity", and "medical" does not reject "medical-grade mockup".
// Short Latin acronyms use \b; Khmer / long phrases fall back to clean-includes.
export const matchesKeyword = (haystackRaw, haystackClean, keyword) => {
    if (!keyword) return false;
    const k = keyword.toLowerCase().trim();
    if (!k) return false;
    const kClean = stripPunct(k);

    // Pure short Latin token (≤3) → strict word boundary on the raw text.
    if (k.length <= 3 && /^[a-z0-9]+$/.test(k)) {
        try { return new RegExp(`\\b${k}\\b`, 'i').test(haystackRaw); } catch { return false; }
    }
    // Latin word / phrase → boundary match on raw, OR cleaned substring fallback.
    if (/^[a-z0-9 .+#&/-]+$/.test(k)) {
        const esc = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        try { if (new RegExp(`\\b${esc}\\b`, 'i').test(haystackRaw)) return true; } catch { /* fall through */ }
        return kClean.length >= 3 && haystackClean.includes(kClean);
    }
    // Khmer / mixed script → clean substring (no reliable \b for Khmer).
    return haystackClean.includes(kClean) || haystackRaw.includes(k);
};

// --------------------------------------------------------------------------
// 2. KHMER NLP CLEANUP PIPELINE (8 layers, from Marketing-Pro)
// --------------------------------------------------------------------------
// Normalizes messy phone-keyboard Khmer before search / cache / backend send.

const ZWSP = '​';
const COENG = '្';
const COENG_TA = COENG + 'ត';
const COENG_DA = COENG + 'ដ';
const YUUKALEAPINTU = 'ៈ'; // ៈ
const KHMER_BASE = 'ក-ឳ';
const KHMER_ANY = 'ក-៿';
const SENTENCE_PUNCT = '។៕៖?!';
const THAI_RANGE = /[฀-๿]/g;

const COENG_RO_REORDER = new RegExp(`([${KHMER_BASE}])(\\u17D2[${KHMER_BASE}])(\\u17D2\\u179A)`, 'g');
const COLON_BETWEEN_KHMER = new RegExp(`([${KHMER_ANY}]):(?=[${KHMER_ANY}])`, 'g');
const SPACE_BEFORE_PUNCT = new RegExp(`[ \\t]+([${SENTENCE_PUNCT}])`, 'g');
const MULTI_SPACE_AFTER_PUNCT = new RegExp(`([${SENTENCE_PUNCT}])[ \\t]+`, 'g');
const MISSING_SPACE_AFTER_PUNCT = new RegExp(`([${SENTENCE_PUNCT}])(?=\\S)`, 'g');

export const processKhmerNLP = (input) => {
    if (typeof input !== 'string' || !input) return input || '';
    let text = input;
    text = text.replace(THAI_RANGE, '');                              // Layer 1: strip Thai chars
    if (text.includes(ZWSP)) text = text.split(ZWSP).join('');        // Layer 2: drop zero-width space
    if (text.includes(COENG_DA)) text = text.split(COENG_DA).join(COENG_TA); // Layer 3: Coeng Da → Ta
    text = text.replace(COENG_RO_REORDER, (_m, b, oc, ro) => b + ro + oc);    // Layer 4: Coeng Ro order
    text = text.replace(SPACE_BEFORE_PUNCT, '$1');                    // Layer 5: no space before ។៕៖?!
    text = text.replace(MULTI_SPACE_AFTER_PUNCT, '$1 ');             // Layer 6: one space after
    text = text.replace(MISSING_SPACE_AFTER_PUNCT, '$1 ');
    text = text.replace(COLON_BETWEEN_KHMER, '$1' + YUUKALEAPINTU);   // Layer 7: colon → yuukaleapintu
    text = text.replace(/[ \t]{2,}/g, ' ').trim();                    // Layer 8: tidy whitespace
    return text;
};

// --------------------------------------------------------------------------
// 3. MULTI-TURN INTENT PATTERNS
// --------------------------------------------------------------------------
// "You misunderstood / wrong answer / that's not what I asked"
export const CORRECTION_PATTERNS_EN = /\b(i (didn'?t|did not) (ask|mean)|that'?s not what i (asked|meant)|that'?s wrong|wrong answer|wrong reply|you (?:are )?wrong|you misunderstood|you don'?t understand|that'?s not it|not (?:that|what i (?:asked|meant))|i mean(?:t)? (?:something )?(?:else|different)|different (?:question|thing)|that doesn'?t answer|off topic|off-topic|missed (?:my )?point)\b/i;
export const CORRECTION_PATTERNS_KH = ['មិនមែនអ៊ីចឹងទេ', 'ខុសហើយ', 'អត់មែនទេ', 'មិនមែនទេ', 'យល់ខុស', 'ខ្ញុំមិនបានសួរ', 'មិនត្រូវ', 'អត់ត្រូវ', 'ខុសប្រធានបទ', 'មិនមែនរឿងនេះ'];

// "I don't know where to start / what to ask / I'm a beginner"
export const UNCERTAIN_PATTERNS_EN = /\b(i (?:don'?t|do not) know (?:what|where|how) (?:to (?:ask|start|learn|begin|do)|i (?:should|can))|where (?:do|should) i (?:start|begin)|help me (?:start|begin)|i'?m (?:lost|new|confused|stuck|a beginner)|i don'?t (?:understand anything|know what to do|know anything)|teach me from (?:the )?(?:start|beginning|scratch)|i'?m new (?:here|to (?:this|design|graphic design))|guide me|walk me through|where to begin)\b/i;
export const UNCERTAIN_PATTERNS_KH = ['មិនដឹងសួរអី', 'មិនដឹងចាប់ផ្តើមពីណា', 'ចាប់ផ្តើមពីណា', 'ខ្ញុំជាមនុស្សថ្មី', 'អត់ចេះអី', 'មិនយល់អី', 'ជួយណែនាំ', 'ខ្ញុំវង្វេង', 'រៀនពីដំបូង', 'ខ្ញុំទើបតែចាប់ផ្តើម', 'មិនដឹងធ្វើម៉េច'];

// "Tell me more / explain again / go deeper / another example"
export const CONTINUATION_PATTERNS_EN = /\b(tell me more|more (?:detail|details|example|examples|info|please)|another (?:example|one)|explain (?:more|again|further|that|this)|go deeper|elaborate|expand on (?:that|this|it)|continue|keep going|more about (?:this|that|it)|and then\??|what (?:else|next))\b/i;
export const CONTINUATION_PATTERNS_KH = ['ប្រាប់បន្ថែម', 'បន្ថែមទៀត', 'លម្អិតបន្ថែម', 'ឧទាហរណ៍ផ្សេង', 'ពន្យល់បន្ថែម', 'ពន្យល់ម្តងទៀត', 'បន្ត', 'បន្តទៀត', 'ស៊ីជម្រៅ', 'លម្អិតមួយទៀត', 'អ្វីបន្ទាប់', 'យ៉ាងម៉េចទៀត'];

// "What can you do? / who are you? / what is this app? / ចេះអ្វីខ្លះ?"
// A capability/meta question — answered locally with "here is what I help with".
// Kept CONSERVATIVE (high precision): specific phrases match anywhere, but the
// ambiguous ones ("who are you", "what is this") only match a whole short
// message so "what is this Bleed?" is NOT hijacked. Anything that slips past
// is now handled by the backend's adaptive "Meta / about you" branch.
export const CAPABILITY_PATTERNS_EN = /\b(?:what can you (?:do|help|teach)|what do you (?:do|know|teach)|how can you help|what (?:are|is) your (?:features?|capabilities|purpose)|are you (?:an? )?ai\b|introduce yourself|what do you offer|what can i ask)\b|^\s*(?:who are you|what are you|what(?:'s| is) this(?: app)?|what(?:'s| is) it)\s*\??\s*$/i;
export const CAPABILITY_PATTERNS_KH = ['ចេះអ្វីខ្លះ', 'ចេះអ្វី', 'អ្នកចេះអ្វី', 'អាចធ្វើអ្វីបាន', 'ធ្វើអ្វីបាន', 'ចេះធ្វើអ្វី', 'អ្នកជានរណា', 'អ្នកជាអ្វី', 'ជួយអ្វីបាន', 'ជួយអ្វីខ្លះ', 'អាចជួយអ្វី', 'សួរអ្វីបាន', 'សួរអ្វីខ្លះ', 'មុខងារអ្វី', 'ណែនាំខ្លួន'];

// --------------------------------------------------------------------------
// 4. USER-PROFILE ENTITY EXTRACTORS (adapted to the DESIGN domain)
// --------------------------------------------------------------------------
// Quietly learns the user's skill level, software, discipline, and goal from
// their messages so backend answers can be tailored ("for a beginner on Figma
// focused on UI/UX…"). First-match-wins per group.

const SKILL_EXTRACTORS = {
    'beginner': /\b(i'?m (?:new|a beginner)|just started|never designed|first time|complete beginner)\b|ខ្ញុំជាមនុស្សថ្មី|ខ្ញុំទើបតែ|មិនទាន់ចេះ|អ្នកចាប់ផ្តើម/i,
    'intermediate': /\b(some experience|been designing for|a few months|intermediate)\b|ខ្ញុំធ្លាប់រៀន|មធ្យម|ចេះខ្លះ/i,
    'advanced': /\b(years of experience|advanced|professional designer|i'?m a pro|expert)\b|ខ្ញុំជាអ្នកជំនាញ|កម្រិតខ្ពស់|អ្នកជំនាញ/i,
};

const SOFTWARE_EXTRACTORS = {
    'Photoshop': /\b(photoshop|ps)\b|ហ្វូតូស្ហប/i,
    'Illustrator': /\b(illustrator|ai file|adobe ai)\b|អ៊ីឡាស្ត្រេទ័រ/i,
    'Figma': /\b(figma)\b|ហ្វីហ្គ្មា/i,
    'Affinity': /\b(affinity (?:designer|photo|publisher)?)\b|អាហ្វីនីធី/i,
    'InDesign': /\b(indesign)\b/i,
    'Canva': /\b(canva)\b|កែនវ៉ា/i,
    'CorelDRAW': /\b(coreldraw|corel draw|corel)\b/i,
    'Procreate': /\b(procreate)\b/i,
    'After Effects / Premiere': /\b(after effects|premiere pro|premiere|davinci)\b/i,
};

const DISCIPLINE_EXTRACTORS = {
    'logo & branding': /\b(logo|brand(?:ing)?|brand identity|visual identity)\b|ឡូហ្គោ|យីហោ|ម៉ាក/i,
    'UI/UX design': /\b(ui|ux|app design|web design|interface|wireframe|prototype)\b|អ៊ីនធើហ្វេស/i,
    'print design': /\b(print|prepress|business card|flyer|poster|brochure|packaging|banner)\b|បោះពុម្ព|នាមប័ណ្ណ|ផ្ទាំងផ្សាយ/i,
    'typography': /\b(typography|font pairing|lettering|typeface)\b|អក្សរសិល្ប៍|តួអក្សរ/i,
    'photo editing': /\b(photo edit|retouch|lightroom|remove background|compositing)\b|កែរូប|លុបផ្ទៃខាងក្រោយ/i,
    'motion & video': /\b(motion graphic|animation|video edit|reels|tiktok video)\b|ចលនា|កាត់វីដេអូ/i,
    'illustration': /\b(illustration|drawing|digital art|character design)\b|គំនូរ|ការគូរ/i,
};

const GOAL_EXTRACTORS = {
    'learning fundamentals': /\b(learn|study|understand|practice|tutorial|course)\b|រៀន|សិក្សា|អនុវត្ត/i,
    'client work': /\b(client|customer|deadline|deliver|revision)\b|អតិថិជន|ភ្ញៀវ|ការងារ/i,
    'building a portfolio': /\b(portfolio|showcase|case study)\b|ផតហ្វូលីយ៉ូ|បង្ហាញស្នាដៃ/i,
    'pricing & freelance': /\b(price|pricing|charge|freelance|how much|invoice|quote)\b|គិតលុយ|តម្លៃ|ហ្វ្រីឡង់|រកលុយ/i,
};

const PROFILE_STORAGE_KEY = 'affinityPro_user_profile';
const PROFILE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days untouched → reset

export const extractProfileSignals = (userText) => {
    if (!userText) return {};
    const signals = {};
    const scan = (map, field) => {
        for (const [name, regex] of Object.entries(map)) {
            if (regex.test(userText)) { signals[field] = name; break; }
        }
    };
    scan(SKILL_EXTRACTORS, 'skillLevel');
    scan(SOFTWARE_EXTRACTORS, 'software');
    scan(DISCIPLINE_EXTRACTORS, 'discipline');
    scan(GOAL_EXTRACTORS, 'goal');
    return signals;
};

export const readUserProfile = () => {
    try {
        const profile = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || '{}');
        if (profile.lastUpdated && (Date.now() - profile.lastUpdated) > PROFILE_TTL_MS) return {};
        return profile;
    } catch { return {}; }
};

export const updateUserProfile = (signals) => {
    if (!signals || Object.keys(signals).length === 0) return;
    const current = readUserProfile();
    const merged = { ...current, ...signals, lastUpdated: Date.now() };
    try { localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(merged)); } catch { /* storage may be unavailable */ }
};

export const clearUserProfile = () => {
    try { localStorage.removeItem(PROFILE_STORAGE_KEY); } catch { /* storage may be unavailable */ }
};

// Build the [User context: …] block prepended to backend prompts so the AI
// tailors its answer. Returns '' when we know nothing yet.
export const buildProfileContext = (lang) => {
    const profile = readUserProfile();
    const parts = [];
    if (profile.skillLevel) parts.push(`is a ${profile.skillLevel} designer`);
    if (profile.software) parts.push(`uses ${profile.software}`);
    if (profile.discipline) parts.push(`focuses on ${profile.discipline}`);
    if (profile.goal) parts.push(`is working on ${profile.goal}`);
    if (parts.length === 0) return '';
    return lang === 'en'
        ? `\n\n[User context: this user ${parts.join(', ')}. Tailor the answer to this profile — give examples in their software and keep the depth right for their level.]`
        : `\n\n[បរិបទអ្នកប្រើ៖ អ្នកប្រើនេះ ${parts.join(', ')}។ សូមតម្រូវចម្លើយឱ្យសមនឹងបរិបទនេះ — ផ្តល់ឧទាហរណ៍ក្នុងកម្មវិធីដែលគាត់ប្រើ និងកម្រិតសមរម្យនឹងសមត្ថភាពគាត់។]`;
};

// --------------------------------------------------------------------------
// 5. MULTI-CHOICE QUESTION PARSING
// --------------------------------------------------------------------------
// When the bot's last sentence was "Want X, Y, or Z?" and the user replies a
// bare "yes", we re-surface the options as chips instead of guessing.
export const parseMultiChoiceQuestion = (botText) => {
    if (!botText) return null;
    const m = botText.match(/([^?？។៕\n]+[?？])\s*$/);
    if (!m) return null;
    let question = m[1].trim();
    if (!/\bor\b|ឬ/i.test(question)) return null;

    const leadinRe = /^.*(?:\b(?:about|with|between|from|like|cover|tackle|explore|learn)\s+|(?:ពី|អំពី|ដូចជា|ក្នុងចំណោម|រវាង)\s*)/i;
    question = question.replace(leadinRe, '');
    question = question.replace(/[?？]\s*$/, '').trim();

    const choices = question
        .split(/,\s*|\s+(?:ឬ|or)\s+/i)
        .map(s => s.trim().replace(/^(?:តើ|the|a|an|or|ឬ)\s+/i, ''))
        .filter(s => s.length > 1 && s.length < 80);

    return (choices.length >= 2 && choices.length <= 5) ? choices : null;
};

// --------------------------------------------------------------------------
// 6. GIBBERISH GUARD
// --------------------------------------------------------------------------
// Catch 1-char noise and pure punctuation so we never forward nonsense to the
// backend. Known short design acronyms are explicitly allowed.
const VALID_SHORT_TERMS = new Set(['ui', 'ux', 'ai', 'ps', 'id', 'rgb', 'hex', 'dpi', 'ppi', 'svg', 'png', 'jpg', 'eps', 'pdf', 'gif', 'cmyk', 'hsl']);
export const isShortGibberish = (rawInput, cleanInput) => {
    const raw = (rawInput || '').trim();
    if (!raw) return true;
    if (VALID_SHORT_TERMS.has(raw.toLowerCase())) return false;
    // No letters/numbers in any script → pure punctuation / emoji-only noise.
    if (!/[\p{L}\p{N}]/u.test(raw)) return true;
    // Single character that is not a known term.
    if ((cleanInput || '').length <= 1) return true;
    return false;
};

// --------------------------------------------------------------------------
// 7. RETRY / OFFLINE CHIPS (must resolve locally — no backend needed)
// --------------------------------------------------------------------------
export const RETRY_CHIP_EN = '🔁 Try again';
export const RETRY_CHIP_KH = '🔁 សាកម្តងទៀត';
export const RETRY_CHIP_LABELS = [RETRY_CHIP_EN, RETRY_CHIP_KH];

// Both of these resolve from the local KNOWLEDGE_BASE (Vector/Raster dictionary
// node), so clicking them during an outage never triggers another network call.
export const OFFLINE_FALLBACK_CHIPS_EN = [RETRY_CHIP_EN, 'Vector vs Raster: What\'s the difference? 🖼️'];
export const OFFLINE_FALLBACK_CHIPS_KH = [RETRY_CHIP_KH, 'តើ Vector និង Raster ខុសគ្នាម៉េច? 🖼️'];

// --------------------------------------------------------------------------
// 8. SHORT-RETURN GREETINGS + SHORT-INPUT REJECTIONS (more variety)
// --------------------------------------------------------------------------
export const SHORT_RETURN_GREETINGS = [
    'បាទ សួស្ដីម្ដងទៀតបង! 👋 តើចង់បន្តរៀនពីក្បួនរចនាអ្វីដែរ?',
    'ហេយ៍ ជួបគ្នាទៀតហើយ! ✨ ថ្ងៃនេះចង់ស្វែងយល់ពីពណ៌ ឬ Typography?',
    'បាទ សួស្ដី! 🎨 ត្រៀមច្នៃប្រឌិតហើយឬនៅ? សួរខ្ញុំពីក្បួន Design មក!',
];
export const SHORT_RETURN_GREETINGS_EN = [
    'Hi again! 👋 Want to keep going with a design concept?',
    'Hey, good to see you! ✨ Color theory or typography today?',
    'Hello! 🎨 Ready to create? Ask me anything about design!',
];

export const SHORT_INPUT_REJECTIONS = [
    'បាទ សារនេះខ្លីពេក 😅 តើបងចង់ដឹងពីរឿង Design អ្វីដែរ? សរសេរបន្ថែមបន្តិចមក!',
    'បាទ ខ្ញុំមិនទាន់យល់ច្បាស់ទេ 🤔 សូមសរសេរសំណួរ Design ឱ្យបានពេញលេញបន្តិច។',
    'បាទ ប្រាប់ខ្ញុំបន្ថែមបន្តិចមកបង! ✍️ តើបងចង់រៀនពីពណ៌ ប្លង់ ឬអក្សរ?',
];
export const SHORT_INPUT_REJECTIONS_EN = [
    'That\'s a bit short 😅 What design topic are you curious about? Add a few more words!',
    'I didn\'t quite catch that 🤔 Could you write your design question more fully?',
    'Tell me a little more! ✍️ Are you after color, layout, or typography?',
];

// --------------------------------------------------------------------------
// 9. "I'M LOST" GUIDANCE MENU (4-path onboarding, design-scoped)
// --------------------------------------------------------------------------
export const GUIDANCE_MENU_KH = 'មិនអីទេបង — តោះធ្វើឱ្យវាងាយយល់។ 🧭 សូមជ្រើសរើសផ្នែកដែលបងចង់រៀនមុនគេ៖\n\n1️⃣ **គោលការណ៍រចនាមូលដ្ឋាន** (Layout, Hierarchy, Balance, Grid)\n2️⃣ **ពណ៌ និង Typography** (Color Theory, Font Pairing, Kerning)\n3️⃣ **កម្មវិធី និងឧបករណ៍** (Photoshop, Illustrator, Figma, Affinity)\n4️⃣ **អាជីវកម្ម និងអាជីព** (Logo, Branding, Pricing, Portfolio)\n\nបងជ្រើសរើសមួយណាដែលត្រូវការបំផុត?';
export const GUIDANCE_MENU_EN = 'No worries — let\'s make this simple. 🧭 Pick the area you\'d like to start with:\n\n1️⃣ **Design Fundamentals** (Layout, Hierarchy, Balance, Grid)\n2️⃣ **Color & Typography** (Color Theory, Font Pairing, Kerning)\n3️⃣ **Software & Tools** (Photoshop, Illustrator, Figma, Affinity)\n4️⃣ **Business & Career** (Logo, Branding, Pricing, Portfolio)\n\nWhich one do you need most?';
export const GUIDANCE_CHIPS_KH = [
    'តើ គោលការណ៍រចនា (Principles) មានអ្វីខ្លះ? 📐',
    'តើ Kerning, Tracking, Leading ខុសគ្នាម៉េច? 🔠',
    'Photoshop, Illustrator, InDesign — ប្រើខុសគ្នាម៉េច? 🖥️',
    'Designer ថ្មីៗគួរគិតលុយប៉ុន្មាន? 💵',
];
export const GUIDANCE_CHIPS_EN = [
    'What are the Core Design Principles? 📐',
    'Kerning vs Tracking vs Leading? 🔠',
    'Photoshop vs Illustrator vs InDesign? 🖥️',
    'How much should a beginner designer charge? 💵',
];

// --------------------------------------------------------------------------
// 10. CAPABILITY / ABOUT ANSWER ("what can you do? / ចេះអ្វីខ្លះ?")
// --------------------------------------------------------------------------
export const CAPABILITY_ANSWER_KH = 'បាទ! ខ្ញុំជា **My Design AI** 🎨 ជាគ្រូ Graphic Design ឌីជីថលរបស់បង។ ខ្ញុំអាចពន្យល់ និងបង្រៀនបងពី៖\n\n🎨 **ទ្រឹស្តីពណ៌** — ការលាយពណ៌, ចិត្តសាស្ត្រពណ៌, RGB/CMYK\n🔤 **Typography** — ការរើស Font, Kerning, ការរៀបអក្សរ\n📐 **គោលការណ៍រចនា** — Layout, Balance, Hierarchy, Grid\n🖼️ **Vector/Raster & ការ Export** — កុំឱ្យបែកគុណភាព\n📱 **UI/UX** — ច្បាប់ផ្លូវចិត្ត (Gestalt, Hick\'s Law…)\n💼 **អាជីវកម្ម & អាជីព** — Logo, Branding, គិតលុយ, Portfolio\n\nសាកសួរខ្ញុំមួយណាក៏បាន ឬចុចលើប្រធានបទខាងក្រោម! 👇';
export const CAPABILITY_ANSWER_EN = 'Hi! I\'m **My Design AI** 🎨 — your digital Graphic Design tutor. I can explain and teach you about:\n\n🎨 **Color Theory** — color mixing, psychology, RGB/CMYK\n🔤 **Typography** — font pairing, kerning, text layout\n📐 **Design Principles** — layout, balance, hierarchy, grids\n🖼️ **Vector/Raster & Exporting** — without quality loss\n📱 **UI/UX** — psychology laws (Gestalt, Hick\'s Law…)\n💼 **Business & Career** — logos, branding, pricing, portfolio\n\nAsk me anything, or tap a topic below! 👇';

// --------------------------------------------------------------------------
// 11. AFFIRMATIVE / NEGATIVE DETECTION (yes / no, generous but topic-safe)
// --------------------------------------------------------------------------
// Detect a bare "yes"/"ok"/"sure"/"បាទ" or "no"/"ទេ" reply. Kept to SHORT
// inputs so a message that carries a real topic ("ចង់ដឹងពី Color Theory",
// "yes tell me about grids") is NOT treated as a bare yes and instead reaches
// the KB / backend with its content intact.
const AFFIRM_EN_START = /^(?:yes|yep|yeah|yup|ya|yah|sure|ok|okay|okey|kk?|alright|aight|absolutely|definitely|certainly|please|sounds good|go ahead|go on|let'?s go|let'?s do it|do it|i do|i want|why not|fine)\b/i;
const AFFIRM_KH = ['បាទ', 'ចាស', 'ចា', 'យល់ព្រម', 'យល់ហើយ', 'ចង់', 'ចង់ដឹង', 'ចង់រៀន', 'យក', 'យកម៉ង', 'តោះ', 'បន្ត', 'អូខេ', 'បានហើយ', 'ពិតណាស់', 'ប្រាប់មក', 'មែនហើយ', 'អូខេបាទ'];
const NEGATE_EN_START = /^(?:no|nope|nah|nada|naw|no thanks|no thank you|not now|not really|maybe later|i'?m good|i'?m okay|never ?mind|pass)\b/i;
const NEGATE_KH = ['ទេ', 'អត់', 'អត់ទេ', 'អត់ចង់', 'មិនចង់', 'មិនបាច់', 'កុំ', 'លែងចង់', 'នៅទេ', 'មិនយក', 'ទេអរគុណ'];

export const isAffirmative = (rawInput, cleanInput, wordCount) => {
    const t = (rawInput || '').trim();
    if (!t) return false;
    if (wordCount <= 3 && AFFIRM_EN_START.test(t)) return true;
    // Khmer: short reply that starts with / equals an affirmative particle.
    if (wordCount <= 2) {
        for (const p of AFFIRM_KH) { if (t.startsWith(p) || cleanInput === stripPunct(p)) return true; }
    }
    return false;
};

export const isNegative = (rawInput, cleanInput, wordCount) => {
    const t = (rawInput || '').trim();
    if (!t) return false;
    if (wordCount <= 3 && NEGATE_EN_START.test(t)) return true;
    if (wordCount <= 2) {
        for (const p of NEGATE_KH) { if (t.startsWith(p) || cleanInput === stripPunct(p)) return true; }
    }
    return false;
};

// Pull the design topic the bot OFFERED in its last question so a "yes" can be
// resolved to that exact topic. Prefers the last **bold** concept, else the
// noun phrase after a lead-in ("…learn about X?", "…ពី X?").
export const extractOfferedTopic = (botText) => {
    if (!botText) return null;
    const bolds = [...botText.matchAll(/\*\*(.+?)\*\*/g)].map(m => m[1].trim()).filter(Boolean);
    for (let i = bolds.length - 1; i >= 0; i--) {
        const b = bolds[i].replace(/[?？:：]+$/, '').trim();
        if (b.length >= 2 && b.length <= 40) return b;
    }
    const qMatch = botText.match(/([^?？។៕\n]+[?？])\s*$/);
    if (qMatch) {
        const lead = qMatch[1].match(/(?:about|on|learn|explore|dive into|explain|ពី|អំពី|រៀនពី|ស្វែងយល់ពី)\s+([A-Za-z0-9ក-៿][^?？]*?)\s*[?？]/i);
        if (lead && lead[1]) {
            const cand = lead[1].trim().replace(/\s+(?:ដែរ|ទេ|ឬទេ|ដែរឬទេ|today|too|next|first)$/i, '').trim();
            if (cand.length >= 2 && cand.length <= 40) return cand;
        }
    }
    return null;
};

// Mid-conversation "no" — graceful local pivot (no backend needed).
export const NO_PIVOTS_KH = [
    'មិនអីទេបង! 👍 ចង់ប្ដូរទៅប្រធានបទផ្សេងវិញទេ? នេះជាគំនិតខ្លះ៖',
    'បាទ មិនបាច់ក៏បាន។ 🙂 ជ្រើសរើសរឿងផ្សេងដែលបងចង់ដឹង៖',
    'តោះប្ដូរថ្មី! 🔄 តើបងចង់រៀនអ្វីផ្សេងទៀតដែរ?',
];
export const NO_PIVOTS_EN = [
    'No problem! 👍 Want to explore a different topic instead? Here are a few ideas:',
    'All good — we don\'t have to. 🙂 Pick anything else you\'re curious about:',
    'Sure, let\'s switch it up! 🔄 What else would you like to learn?',
];

// --------------------------------------------------------------------------
// 12. SOCIAL / SMALL-TALK ENGINE (lively, human-like — still nudges to design)
// --------------------------------------------------------------------------
// Handles general conversation (compliments, feelings, jokes, bot identity,
// goodbyes, apologies, love, age) so the bot feels alive — but every reply
// gently steers back to Graphic Design. Runs only AFTER the KB misses, so real
// design questions are never swallowed.
const _pickOne = (arr) => arr[Math.floor(Math.random() * arr.length)];

const SOCIAL_INTENTS = [
    {
        id: 'bot_identity',
        en: /\b(are you (?:a |an )?(?:human|real|robot|bot|person|machine|ai)|are you alive|do you (?:sleep|eat|dream|have feelings|get tired)|r u (?:human|real|a bot))\b/i,
        kh: ['អ្នកជាមនុស្ស', 'អ្នកជា robot', 'អ្នកជាមនុស្សមែន', 'អ្នកគេង', 'អ្នកជា ai', 'អ្នកមានអារម្មណ៍', 'អ្នករស់'],
        res_en: [
            "Haha, I'm an AI 🤖 — your tireless Graphic Design tutor! No sleep, no coffee breaks, just here 24/7 to help you create. What shall we design today? 🎨",
            "I'm 100% AI 🤖✨ — think of me as a design mentor living inside your screen. I can't get tired, but I *can* make your layouts look amazing. What's on your mind?",
            "Great question! I'm an AI built to teach Graphic Design 🎨 — I don't dream, but if I did it'd be in perfect color palettes! What would you like to learn?",
        ],
        res_kh: [
            "ហាហា ខ្ញុំជា AI 🤖 ជាគ្រូ Graphic Design ដែលមិនចេះនឿយ! មិនគេង មិនផឹកកាហ្វេ នៅជួយបងគ្រប់ ២៤ ម៉ោង។ ថ្ងៃនេះចង់រចនាអ្វីដែរ? 🎨",
            "ខ្ញុំជា AI ១០០% 🤖✨ ដូចជាគ្រូ Design ដែលរស់នៅក្នុងអេក្រង់បងអ៊ីចឹង។ ខ្ញុំមិនចេះអស់កម្លាំងទេ តែអាចជួយឱ្យ Layout បងស្អាតបាន! តើចង់រៀនអ្វី?",
            "សំណួរល្អ! ខ្ញុំជា AI ដែលបង្កើតមកដើម្បីបង្រៀន Graphic Design 🎨។ ខ្ញុំមិនចេះសុបិនទេ តែបើចេះ ប្រហែលជាសុបិនជាពណ៌ស្អាតៗ! តើចង់រៀនអ្វីដែរ?",
        ],
    },
    {
        id: 'compliment',
        en: /\b(you'?re (?:so |really |very )?(?:smart|clever|amazing|awesome|great|the best|cool|helpful|good|brilliant|genius)|good job|well done|nice work|i like you|you rock|impressive|love you work|so helpful)\b/i,
        kh: ['ពូកែណាស់', 'ពូកែមែន', 'ឆ្លាតណាស់', 'អស្ចារ្យណាស់', 'ល្អណាស់បង', 'ខ្ញុំចូលចិត្តអ្នក', 'អ្នកពូកែ', 'ឆ្លាតមែន', 'ល្អមែន'],
        res_en: [
            "Aww, thank you! 😊 You just made my circuits happy. Let's put that energy into something beautiful — what are we working on?",
            "That's so kind! 🙏 I'm blushing in RGB 😄 Ready to make your next design even better?",
            "Thank you! 🌟 Compliments accepted in any color space. Now let's make YOU look like the pro — what shall we design?",
        ],
        res_kh: [
            "អូ អរគុណច្រើនបង! 😊 បងធ្វើឱ្យខ្ញុំសប្បាយចិត្តណាស់។ តោះយកថាមពលនេះទៅបង្កើតស្នាដៃស្អាតៗ — តើយើងធ្វើអ្វី?",
            "បងពិតជាសប្បុរសណាស់! 🙏 ខ្ញុំសើចរីករាយជាពណ៌ RGB តែម្ដង 😄 ត្រៀមធ្វើឱ្យ Design បន្ទាប់កាន់តែស្អាតហើយឬនៅ?",
            "អរគុណបង! 🌟 តោះឥឡូវនេះ ខ្ញុំនឹងជួយឱ្យបងក្លាយជា Pro Designer — តើចង់រចនាអ្វីដែរ?",
        ],
    },
    {
        id: 'feel_negative',
        en: /\b(i'?m (?:so |really |very )?(?:tired|exhausted|stressed|sad|down|frustrated|overwhelmed|burnt out|burned out|depressed|lazy)|i (?:wanna|want to) give up|i give up|i can'?t do this(?: anymore)?|i feel (?:bad|down|stuck))\b/i,
        kh: ['ខ្ញុំហត់', 'ហត់ណាស់', 'នឿយណាស់', 'អស់កម្លាំង', 'តូចចិត្ត', 'ខ្ញុំធុញ', 'ធុញណាស់', 'ចង់បោះបង់', 'លែងធ្វើបាន', 'ខ្ញុំក្រៀមក្រំ', 'ខ្ជិល'],
        res_en: [
            "Hey, take a deep breath 🌿 Even the best designers feel stuck sometimes — it's part of the creative process. Want a small, easy win to get your momentum back?",
            "I hear you 💙 Design can be draining. How about we slow down and do one simple thing together? Pick any topic and I'll keep it light.",
            "Don't be too hard on yourself 🙌 Every pro was once a beginner staring at a blank canvas. Let's take just one small step — what's troubling you?",
        ],
        res_kh: [
            "បង ដកដង្ហើមវែងៗសិន 🌿 សូម្បីតែ Designer ពូកែៗ ក៏ធ្លាប់មានពេលគាំងដែរ។ ចង់សាកធ្វើអ្វីងាយៗមួយ ដើម្បីយកកម្លាំងចិត្តមកវិញទេ?",
            "ខ្ញុំយល់ចិត្តបង 💙 ការ Design ពិតជាហត់មែន។ តោះធ្វើរឿងសាមញ្ញៗមួយជាមួយគ្នា — ជ្រើសប្រធានបទណាមួយ ខ្ញុំនឹងធ្វើឱ្យវាងាយ។",
            "កុំស្ដីបន្ទោសខ្លួនឯងពេកបង 🙌 Designer ពូកែគ្រប់រូប ធ្លាប់ជាអ្នកចាប់ផ្ដើមដែរ។ តោះដោះស្រាយម្ដងមួយជំហាន — តើមានបញ្ហាអ្វី?",
        ],
    },
    {
        id: 'feel_positive',
        en: /\b(i'?m (?:so |really |very )?(?:happy|excited|glad|motivated|pumped|inspired|ready)|i feel (?:great|good|amazing|inspired)|this is fun|i'?m enjoying)\b/i,
        kh: ['ខ្ញុំសប្បាយ', 'រំភើប', 'សប្បាយចិត្ត', 'មានកម្លាំងចិត្ត', 'សប្បាយណាស់', 'ខ្ញុំត្រៀមរួច'],
        res_en: [
            "Love that energy! 🚀 Let's channel it — what design idea is sparking for you right now?",
            "Yes! 🔥 That's the creative spirit. Tell me what you want to make and let's level it up together!",
            "Awesome to hear! 😄 Great mood = great designs. What shall we create?",
        ],
        res_kh: [
            "ខ្ញុំចូលចិត្តថាមពលនេះណាស់! 🚀 តោះយកវាមកប្រើ — តើមានគំនិត Design អ្វីកំពុងផុសក្នុងក្បាលបង?",
            "ល្អ! 🔥 នេះហើយស្មារតីច្នៃប្រឌិត។ ប្រាប់ខ្ញុំមកថាចង់ធ្វើអ្វី តោះធ្វើឱ្យវាកាន់តែល្អ!",
            "សប្បាយចិត្តណាស់ដែលឮ! 😄 អារម្មណ៍ល្អ = Design ល្អ។ តើយើងបង្កើតអ្វីដែរ?",
        ],
    },
    {
        id: 'joke',
        en: /\b(tell me a joke|make me laugh|say something funny|got any jokes|cheer me up|be funny)\b/i,
        kh: ['និយាយលេង', 'កំប្លែង', 'និយាយអីកំប្លែង', 'និយាយលេងសើច', 'ធ្វើឱ្យសើច'],
        res_en: [
            "Why did the designer break up with the color? Too many *hue*-mood swings! 😄 Okay — want to learn some real color theory?",
            "Why do designers hate Comic Sans? It has no *serif*-ious side! 😆 Speaking of fonts… want me to teach font pairing?",
            "I tried to write a joke about kerning, but the spacing came out all wrong. 😅 Want the actual Kerning trick instead?",
        ],
        res_kh: [
            "ហេតុអ្វី Designer ខឹងនឹង Comic Sans? ព្រោះវាគ្មាន *ភាពធ្ងន់ធ្ងរ* (Serif/Serious)! 😆 និយាយពី Font… តោះរៀនការផ្គូផ្គង Font ទេ?",
            "ខ្ញុំសាកនិយាយរឿងកំប្លែងពី Kerning តែគម្លាតអក្សរវាខុសអស់! 😅 ចង់រៀនគន្លឹះ Kerning ពិតៗទេ?",
            "Designer មិនដែលឯកោទេ ព្រោះតែងតែមាន *Layers* ច្រើនជាប់នឹងខ្លួន! 😄 តោះរៀនពី Layers ទេ?",
        ],
    },
    {
        id: 'laughter',
        en: /^(?:ha(?:ha)+h?|he(?:he)+|lo+l|lmao+|rofl|😂|🤣|😅|😆)[\s!.]*$/i,
        kh: [],
        res_en: [
            "😄 Glad you're having fun! Shall we keep the creativity flowing?",
            "Haha! 😁 Love it. Ready for more design tips?",
            "😆 That's the spirit! What shall we design next?",
        ],
        res_kh: [
            "😄 រីករាយណាស់ដែលបងសប្បាយ! តោះបន្តការច្នៃប្រឌិតទៀតទេ?",
            "ហាហា! 😁 តោះបន្តរៀន Design ទៀតមើល?",
            "😆 តោះ! យើងរចនាអ្វីបន្តទៀត?",
        ],
    },
    {
        id: 'farewell',
        en: /\b(bye+|goodbye|good ?night|see you|see ya|talk later|gotta go|i'?m leaving|cya|catch you later)\b/i,
        kh: ['លាហើយ', 'ជំរាបលា', 'រាត្រីសួស្ដី', 'ទៅសិន', 'លាសិន', 'ជួបគ្នាពេលក្រោយ', 'ខ្ញុំទៅហើយ'],
        res_en: [
            "Goodbye for now! 👋 Keep creating amazing things — I'll be right here when you need me. 🎨",
            "See you soon! ✨ May your layouts be balanced and your colors be vibrant!",
            "Take care! 👋 Come back anytime you want to design or learn something new.",
        ],
        res_kh: [
            "ជម្រាបលាសិនបង! 👋 បន្តបង្កើតស្នាដៃស្អាតៗណា — ខ្ញុំនៅទីនេះរង់ចាំជានិច្ច។ 🎨",
            "ជួបគ្នាពេលក្រោយ! ✨ សូមឱ្យ Layout បងមានតុល្យភាព ហើយពណ៌ស្រស់ស្អាត!",
            "ថែរក្សាខ្លួនណាបង! 👋 ពេលណាចង់ Design ឬរៀនអ្វីថ្មី ត្រឡប់មកវិញណា។",
        ],
    },
    {
        id: 'love',
        en: /\b(i love you|do you love me|will you marry me|be my (?:friend|gf|bf|girlfriend|boyfriend)|i like you so much)\b/i,
        kh: ['ស្រលាញ់អ្នក', 'អ្នកស្រលាញ់ខ្ញុំ', 'រៀបការ', 'ស្រលាញ់បង'],
        res_en: [
            "Aww 🥰 I love great design and helping YOU master it! Let's pour that love into your next project — what are we making?",
            "You're sweet! 😄 My heart belongs to clean layouts and perfect kerning. Want to create something lovely together?",
        ],
        res_kh: [
            "អូ 🥰 ខ្ញុំស្រលាញ់ការ Design ស្អាតៗ និងការជួយបងពូកែ! តោះយកស្នេហានេះទៅធ្វើ Project បន្ទាប់ — យើងធ្វើអ្វីដែរ?",
            "បងគួរឱ្យស្រលាញ់ណាស់! 😄 ប៉ុន្តែបេះដូងខ្ញុំផ្ដល់ឱ្យ Layout ស្អាតៗ និង Kerning ល្អ។ តោះបង្កើតអ្វីស្អាតៗជាមួយគ្នាទេ?",
        ],
    },
    {
        id: 'age_origin',
        en: /\b(how old are you|what'?s your age|who (?:made|created|built) you|where are you from|what'?s your name|who created you)\b/i,
        kh: ['អាយុប៉ុន្មាន', 'នរណាបង្កើត', 'មកពីណា', 'ឈ្មោះអី', 'ឈ្មោះអ្វី'],
        res_en: [
            "I'm a freshly-rendered AI 🤖 — no birthday, just version updates! I was built to be your Graphic Design tutor. What can I help you create?",
            "No age here, but my design knowledge stays up to date! 🎨 I'm here to teach you — where shall we start?",
        ],
        res_kh: [
            "ខ្ញុំជា AI ដែលទើបបង្កើតថ្មី 🤖 — គ្មានថ្ងៃកំណើតទេ មានតែ Version ថ្មីៗ! ខ្ញុំបង្កើតមកធ្វើជាគ្រូ Graphic Design របស់បង។ តើជួយបងបង្កើតអ្វី?",
            "ខ្ញុំគ្មានអាយុទេ តែចំណេះ Design របស់ខ្ញុំថ្មីជានិច្ច! 🎨 ខ្ញុំនៅទីនេះដើម្បីបង្រៀនបង — តោះចាប់ផ្ដើមពីណា?",
        ],
    },
];

// Returns a localized social response string, or null when no social intent
// matches. `lang` is 'en' or 'km'.
export const detectSocialIntent = (rawInput, lang) => {
    const t = (rawInput || '').trim();
    if (!t) return null;
    for (const s of SOCIAL_INTENTS) {
        const hit = (s.en && s.en.test(t)) || (s.kh && s.kh.length > 0 && s.kh.some(p => t.includes(p)));
        if (hit) return _pickOne(lang === 'en' ? s.res_en : s.res_kh);
    }
    return null;
};

// --------------------------------------------------------------------------
// 13. KHMER-AWARE GREETING + "HOW ARE YOU" / "WHAT'S UP" DETECTION
// --------------------------------------------------------------------------
// Broad coverage of how Cambodians actually greet and ask "how are you" —
// formal, casual, time-based, loose phone spellings, and romanized typing.
// Note: handleSend runs processKhmerNLP first (Coeng Da→Ta, etc.), so the
// Khmer reaching here is already normalized.

// Address particles people wrap around greetings / "how are you".
const ADDR = '(?:បង|អ្នក|ឯង|លោកអ្នក|លោក|ប្អូន|នាង|គាត់|ពូ|មីង|តា|យាយ|អ្នកគ្រូ|លោកគ្រូ)';
const ADDR_LEAD = new RegExp(`^(?:${ADDR})+`);
const ADDR_TRAIL = new RegExp(`(?:${ADDR})+$`);

// Formal greetings (hello / good morning / chom reap suor …).
const GREET_FORMAL_KH = ['ជម្រាបសួរ', 'ជំរាបសួរ', 'ជម្រាបសួស្តី', 'សួស្តី', 'សួស្ដី', 'សួរស្តី', 'សួរស្ដី', 'នមស្ការ', 'នមស្តេ', 'អរុណសួស្តី', 'អរុណសួស្ដី', 'ទិវាសួស្តី', 'សាយណ្ហសួស្តី', 'សាយ័ណ្ហសួស្តី', 'ល្ងាចសួស្តី'];
// Casual greetings (hi / hello / hey / alo …). Kept distinct so they are not
// substrings of design words (e.g. bare "ឡូ" is excluded — it is inside ឡូហ្គោ).
const GREET_CASUAL_KH = ['ហាយ', 'ហ៊ាយ', 'ហេឡូ', 'ហែលឡូ', 'ហ៊ែលឡូ', 'ហេលឡូ', 'ហ៊ឺឡូ', 'អាឡូ', 'ហេយ', 'ហេយ៍', 'ហ៊ីយ', 'វាសប់'];
const GREET_FORMAL_RE = /^\s*(?:good\s?(?:morning|afternoon|evening|day)|greetings|chom?\s?reap\s?su(?:o|a)r?|chum?reab\s?suor|sua\s?s?de[iy]|s[uo]{1,2}s?\s?de[iy]|namas(?:te|kar))\b/i;
const GREET_CASUAL_RE = /^\s*(?:hi+|he+y+|hello+|helo+|hallo|yo+|sup|howdy|wa?ssup|hiya|heya|alo+|yoo+)\b/i;

// Returns 'formal' | 'casual' | null. Gated to short messages — greetings are short.
export const detectGreetingType = (rawInput, wordCount = 99) => {
    const t = (rawInput || '').trim();
    if (!t || wordCount > 4) return null;
    const c = stripPunct(t);
    if (GREET_FORMAL_RE.test(t)) return 'formal';
    if (GREET_CASUAL_RE.test(t)) return 'casual';
    for (const g of GREET_FORMAL_KH) { const gc = stripPunct(g); if (gc && c.includes(gc)) return 'formal'; }
    for (const g of GREET_CASUAL_KH) { const gc = stripPunct(g); if (gc && c.includes(gc)) return 'casual'; }
    return null;
};

// "How are you?" — wellbeing (safe substrings) + romanized + ambiguous "ម៉េច…"
// phrases that only count when they make up (almost) the whole message.
const HOW_SAFE_KH = ['សុខសប្បាយ', 'សុខទេ', 'សុខជាទេ', 'សុខអត់', 'សុខសប្បាយជា', 'ស្រួលខ្លួន', 'ស្រួលទេ', 'ធូរស្បើយ', 'នៅសុខ', 'សុខភាពយ៉ាងម៉េច'];
const HOW_AMBIG_KH = ['ម៉េចហើយ', 'ម៉េចដែរ', 'យ៉ាងម៉េចដែរ', 'យ៉ាងម៉េចហើយ', 'ធ្វើម៉េចហើយ', 'ធ្វើម៉េចដែរ', 'យ៉ាងណាដែរ', 'ម៉េចហើយដែរ', 'ម៉េចដែរហើយ'];
const HOW_RE = /\b(?:how\s?(?:are|r|'re)\s?(?:you|u|ya)|how\s?(?:are|r)\s?(?:you|u)\s?doing|how\s?do\s?you\s?do|how(?:'s| is| has| have)\s?(?:it going|everything|things|life|your day|you been)|how\s?are\s?things|hope\s?you'?re\s?(?:well|good)|sok\s?s?aba?[iy]|soksaba?[iy]|sok\s?te|sosaba?[iy])\b/i;

export const isHowAreYou = (rawInput) => {
    const t = (rawInput || '').trim();
    if (!t) return false;
    const c = stripPunct(t);
    if (HOW_SAFE_KH.some(p => c.includes(stripPunct(p)))) return true;
    if (HOW_RE.test(t)) return true;
    const core = c.replace(ADDR_LEAD, '').replace(ADDR_TRAIL, '');
    return HOW_AMBIG_KH.some(p => core === stripPunct(p));
};

// "What's up? / How's life? / ធ្វើអីនៅ?"
const WHATSUP_SAFE_KH = ['មានរឿងអី', 'មានអីប្លែក', 'មានអីថ្មី', 'មានអីដែរ', 'ជីវិតម៉េចហើយ', 'ជីវិតយ៉ាងម៉េច', 'រស់នៅម៉េចដែរ', 'ម៉េចហើយជីវិត'];
const WHATSUP_AMBIG_KH = ['ធ្វើអីនៅ', 'ធ្វើអ្វីនៅ', 'កំពុងធ្វើអី', 'ធ្វើអី'];
const WHATSUP_RE = /\b(?:what'?s\s?up|what\s?is\s?up|wa(?:s|z){2,}up|wassup|wazzup|what'?s\s?new|what'?s\s?good|how'?s\s?life|how\s?is\s?life|how'?s\s?everything|how\s?goes\s?it)\b/i;

export const isWhatsUp = (rawInput) => {
    const t = (rawInput || '').trim();
    if (!t) return false;
    const c = stripPunct(t);
    if (WHATSUP_SAFE_KH.some(p => c.includes(stripPunct(p)))) return true;
    if (WHATSUP_RE.test(t)) return true;
    const core = c.replace(ADDR_LEAD, '').replace(ADDR_TRAIL, '');
    return WHATSUP_AMBIG_KH.some(p => core === stripPunct(p));
};
