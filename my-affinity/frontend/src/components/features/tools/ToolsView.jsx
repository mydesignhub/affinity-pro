import React, { useState, useEffect, useRef } from 'react';
import { Palette, Lightbulb, Download, XCircle, Grid, Monitor, Smartphone, Square, ChevronRight, RefreshCw, Copy, Info, CheckCircle2, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext'; 

const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
    }
};

// 🌟 MOVED GLOBALLY TO FIX REFERENCE CRASH 🌟
const hslToHex = (h, s, l) => {
    l /= 100; const a = s * Math.min(l, 1 - l) / 100;
    const f = n => { const k = (n + h / 30) % 12; const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); return Math.round(255 * color).toString(16).padStart(2, '0'); };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
};

const hexToHsl = (hex) => {
    let r = parseInt(hex.substring(1,3), 16) / 255;
    let g = parseInt(hex.substring(3,5), 16) / 255;
    let b = parseInt(hex.substring(5,7), 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) };
};

const getColorName = (h, s, l) => {
    const COLOR_DICTIONARY = [
        ["Black",0,0,0], ["White",0,0,100], ["Gray",0,0,50], ["Silver",0,0,75],
        ["Light Gray",0,0,83], ["Dark Gray",0,0,33], ["Dim Gray",0,0,41],
        ["Red",0,100,50], ["Dark Red",0,100,27], ["Maroon",0,100,25],
        ["Salmon",6,93,71], ["Tomato",9,100,64], ["Coral",16,100,66],
        ["Orange Red",16,100,50], ["Chocolate",16,100,45], ["Crimson",348,83,47],
        ["Pink",350,100,88], ["Hot Pink",330,100,71], ["Orange",39,100,50], 
        ["Gold",51,100,50], ["Yellow",60,100,50], ["Brown",30,59,41],
        ["Olive",60,100,25], ["Lime",120,100,50], ["Green",120,100,25], 
        ["Teal",180,100,25], ["Cyan",180,100,50], ["Blue",240,100,50], 
        ["Navy",240,100,25], ["Indigo",275,100,25], ["Purple",300,100,25], 
        ["Magenta",300,100,50]
    ];

    let closestColor = "Unknown";
    let minDistance = Infinity;

    for (let i = 0; i < COLOR_DICTIONARY.length; i++) {
        const [name, targetH, targetS, targetL] = COLOR_DICTIONARY[i];
        let dh = Math.min(Math.abs(h - targetH), 360 - Math.abs(h - targetH));
        const sWeight = s / 100;
        const lWeight = 1 - Math.abs(50 - l) / 50; 
        dh = dh * sWeight * lWeight;
        let ds = s - targetS;
        let dl = l - targetL;
        let distance = Math.sqrt(dh*dh + ds*ds + dl*dl);
        
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = name;
        }
    }
    return closestColor;
};

// 🌟 IOS-STYLE FLOATING POPOVER DROPDOWN 🌟
const CustomHarmonySelect = ({ value, onChange, isDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const options = [
        { value: 'complementary', label: 'Complementary' },
        { value: 'split-complementary', label: 'Split Complementary' },
        { value: 'analogous', label: 'Analogous' },
        { value: 'accented-analogous', label: 'Accented Analogous' },
        { value: 'triadic', label: 'Triadic' },
        { value: 'tetradic', label: 'Tetradic' },
        { value: 'square', label: 'Square' },
        { value: 'tints', label: 'Tints' },
        { value: 'shades', label: 'Shades' },
        { value: 'tones', label: 'Tones' }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="relative w-[150px] sm:w-[180px]" ref={menuRef}>
            {/* The Trigger Button */}
            <button
                onClick={() => { triggerHaptic(); setIsOpen(!isOpen); }}
                className={`w-full px-4 py-2.5 rounded-xl border font-bold text-[12px] sm:text-sm shadow-sm flex items-center justify-between gap-3 transition-all active:scale-95 ${isDarkMode ? 'bg-[#121212] border-[#3A3A3C] text-[#E3E3E3]' : 'bg-[#FAFAFA] border-[#D1D5DB] text-[#1A1C1E]'}`}
            >
                <span className="truncate">{options.find(o => o.value === value)?.label}</span>
                <ChevronDown size={14} className={isOpen ? 'rotate-180 transition-transform' : 'transition-transform opacity-60'} />
            </button>

            {/* The Floating Popover (iPhone Style) */}
            {isOpen && (
                <div className={`absolute bottom-full mb-2 left-0 w-[200px] sm:w-[220px] max-h-[250px] overflow-y-auto rounded-[20px] shadow-2xl border py-1.5 animate-fade-in-up z-[100] custom-scrollbar ${isDarkMode ? 'bg-[#252525]/80 backdrop-blur-2xl border-[#3A3A3C]' : 'bg-white/80 backdrop-blur-2xl border-[#E0E0E0]'}`}>
                    {options.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => {
                                triggerHaptic();
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2.5 text-[13px] font-semibold flex items-center gap-3 transition-colors ${value === opt.value ? (isDarkMode ? 'text-[#41B6E6]' : 'text-[#0277C5]') : (isDarkMode ? 'text-[#E3E3E3] hover:bg-[#3A3A3C]/50' : 'text-[#1A1C1E] hover:bg-black/5')}`}
                        >
                            <div className="w-4 flex justify-center shrink-0">
                                {value === opt.value && <Check size={16} strokeWidth={3} />}
                            </div>
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// 🌟 RE-SCALED COLOR WHEEL TO FIT 1 SCREEN 🌟
const CustomColorWheel = ({ hsl, setHsl, isDarkMode }) => {
    const wheelRef = useRef(null);
    const hslRef = useRef(hsl);
    const [dragTarget, setDragTarget] = useState('none');

    useEffect(() => { hslRef.current = hsl; }, [hsl]);

    const R_OUTER = 90; 
    const R_INNER = 75; 
    const R_TRI = 75;   

    const updateHue = (x, y) => {
        let deg = Math.atan2(y, x) * (180 / Math.PI);
        if (deg < 0) deg += 360;
        setHsl(prev => ({ ...prev, h: Math.round(deg) }));
    };

    const updateSL = (x, y) => {
        const rad = -hslRef.current.h * (Math.PI / 180);
        const ux = x * Math.cos(rad) - y * Math.sin(rad);
        const uy = x * Math.sin(rad) + y * Math.cos(rad);

        const R = R_TRI;
        const sqrt3_2 = 0.8660254; 
        const detT = -3 * R * R * sqrt3_2; 
        
        let h_wt = (-2 * R * sqrt3_2 * (ux + R/2)) / detT;
        let b_wt = (R * sqrt3_2 * (ux + R/2) + 1.5 * R * (uy - R * sqrt3_2)) / detT;
        let w_wt = 1 - h_wt - b_wt;

        h_wt = Math.max(0, h_wt);
        b_wt = Math.max(0, b_wt);
        w_wt = Math.max(0, w_wt);
        const sum = h_wt + b_wt + w_wt;
        if (sum > 0) { h_wt /= sum; b_wt /= sum; w_wt /= sum; } 
        else { b_wt = 1; }

        const v = w_wt + h_wt;
        const s_hsv = v > 0 ? h_wt / v : 0;
        const l_norm = v * (1 - s_hsv / 2);
        const s_norm = (l_norm === 0 || l_norm === 1) ? 0 : (v - l_norm) / Math.min(l_norm, 1 - l_norm);
        
        setHsl(prev => ({ ...prev, s: Math.round(s_norm * 100), l: Math.round(l_norm * 100) }));
    };

    const handleDown = (e) => {
        if (!wheelRef.current) return;
        const rect = wheelRef.current.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - (rect.left + rect.width / 2);
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - (rect.top + rect.height / 2);
        const dist = Math.hypot(x, y);

        if (dist > R_INNER && dist <= R_OUTER + 15) {
            setDragTarget('hue');
            updateHue(x, y);
        } else if (dist <= R_INNER) {
            setDragTarget('sl');
            updateSL(x, y);
        }
    };

    useEffect(() => {
        if (dragTarget !== 'none') {
            const handleMove = (e) => {
                if (e.cancelable) e.preventDefault(); 
                if (!wheelRef.current) return;
                const rect = wheelRef.current.getBoundingClientRect();
                const x = (e.touches ? e.touches[0].clientX : e.clientX) - (rect.left + rect.width / 2);
                const y = (e.touches ? e.touches[0].clientY : e.clientY) - (rect.top + rect.height / 2);

                if (dragTarget === 'hue') updateHue(x, y);
                else if (dragTarget === 'sl') updateSL(x, y);
            };

            const handleUp = () => setDragTarget('none');

            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleUp);
            window.addEventListener('touchmove', handleMove, { passive: false });
            window.addEventListener('touchend', handleUp);
            
            return () => {
                window.removeEventListener('mousemove', handleMove);
                window.removeEventListener('mouseup', handleUp);
                window.removeEventListener('touchmove', handleMove);
                window.removeEventListener('touchend', handleUp);
            };
        }
    }, [dragTarget]);

    const l_norm = hsl.l / 100;
    const s_norm = hsl.s / 100;
    const v = l_norm + s_norm * Math.min(l_norm, 1 - l_norm);
    const s_hsv = v === 0 ? 0 : 2 * (1 - l_norm / v);

    const w_amt = (1 - s_hsv) * v;
    const h_amt = s_hsv * v;
    const b_amt = 1 - v;

    const H_pt = { x: R_TRI, y: 0 };
    const B_pt = { x: -R_TRI/2, y: -R_TRI * 0.866025 };
    const W_pt = { x: -R_TRI/2, y: R_TRI * 0.866025 };

    const mx = w_amt * W_pt.x + h_amt * H_pt.x + b_amt * B_pt.x;
    const my = w_amt * W_pt.y + h_amt * H_pt.y + b_amt * B_pt.y;

    const hueRad = hsl.h * (Math.PI / 180);
    const tx = ((R_OUTER + R_INNER) / 2) * Math.cos(hueRad);
    const ty = ((R_OUTER + R_INNER) / 2) * Math.sin(hueRad);

    return (
        <div className="flex items-center justify-center select-none pt-4 pb-2">
            <div 
                ref={wheelRef}
                onMouseDown={handleDown}
                onTouchStart={handleDown}
                className="relative rounded-full cursor-crosshair touch-none shadow-xl flex items-center justify-center"
                style={{
                    width: R_OUTER * 2, height: R_OUTER * 2,
                    background: 'conic-gradient(from 90deg, red 0deg, yellow 60deg, lime 120deg, cyan 180deg, blue 240deg, magenta 300deg, red 360deg)',
                    border: `4px solid ${isDarkMode ? '#2C2C2C' : '#E5E7EB'}`
                }}
            >
                <div 
                    className={`rounded-full shadow-inner flex items-center justify-center relative overflow-hidden ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-[#F8F9FA]'}`} 
                    style={{ width: R_INNER * 2, height: R_INNER * 2 }}
                >
                    <svg viewBox={`-${R_INNER} -${R_INNER} ${R_INNER*2} ${R_INNER*2}`} className="w-full h-full pointer-events-none" style={{ transform: `rotate(${hsl.h}deg)` }}>
                        <defs>
                            <linearGradient id="whiteGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="white" stopOpacity="1" />
                                <stop offset="100%" stopColor="white" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="blackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="black" stopOpacity="1" />
                                <stop offset="100%" stopColor="black" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <polygon points={`${H_pt.x},${H_pt.y} ${B_pt.x},${B_pt.y} ${W_pt.x},${W_pt.y}`} fill={`hsl(${hsl.h}, 100%, 50%)`} />
                        <polygon points={`${H_pt.x},${H_pt.y} ${B_pt.x},${B_pt.y} ${W_pt.x},${W_pt.y}`} fill="url(#whiteGrad)" style={{ mixBlendMode: 'screen' }} />
                        <polygon points={`${H_pt.x},${H_pt.y} ${B_pt.x},${B_pt.y} ${W_pt.x},${W_pt.y}`} fill="url(#blackGrad)" style={{ mixBlendMode: 'multiply' }} />
                        <circle 
                            cx={mx} cy={my} r="6" 
                            fill={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} 
                            stroke={isDarkMode ? "#E3E3E3" : "#FFFFFF"} strokeWidth="2.5" 
                            className="drop-shadow-lg"
                        />
                    </svg>
                </div>
                <div 
                    className="absolute w-5 h-5 bg-transparent border-[3px] border-white rounded-full shadow-[0_0_6px_rgba(0,0,0,0.8)] pointer-events-none"
                    style={{ left: '50%', top: '50%', transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))` }}
                />
            </div>
        </div>
    );
};

const CustomSlider = ({ min, max, value, onChange, gradient }) => {
    const percent = ((value - min) / (max - min)) * 100;
    return (
        <div className="relative flex-1 h-2.5 sm:h-3 rounded-full shadow-inner" style={{ background: gradient }}>
            <input 
                type="range" min={min} max={max} value={value} 
                onChange={e => onChange(Number(e.target.value))} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer m-0 p-0" 
            />
            <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-400 rounded-full pointer-events-none shadow-md transition-all duration-75"
                style={{ left: `clamp(8px, ${percent}%, calc(100% - 8px))`, transform: 'translate(-50%, -50%)' }}
            ></div>
        </div>
    );
};

// ==========================================
// 🌟 DATA: UPGRADED LAYOUTS & SIZES
// ==========================================

const layoutTypes = [
    { 
        id: 'thirds', name: 'Rule of Thirds', kh: 'ច្បាប់ភាគបី', 
        desc: 'បែងចែកផ្ទៃជា ៩ ផ្នែកស្មើគ្នា។ ដាក់ចំណុចសំខាន់ៗនៅត្រង់ចំនុចប្រសព្វទាំង ៤។', 
        desc_en: 'Divide the canvas into 9 equal parts. Place key elements at the intersections.',
        pro_details: {
            concept: 'The canvas is divided by two equally spaced horizontal lines and two vertical lines. The human eye naturally gravitates to the intersection points of these lines.',
            concept_kh: 'ផ្ទៃការងារត្រូវបានបែងចែកដោយបន្ទាត់បញ្ឈរពីរ និងផ្តេកពីរ។ ភ្នែកមនុស្សតែងតែសម្លឹងទៅរកចំនុចប្រសព្វនៃបន្ទាត់ទាំងនេះដោយស្វ័យប្រវត្តិ។',
            best_for: 'Photography, posters, and hero headers to create dynamic tension and energy.',
            best_for_kh: 'ការថតរូប, Poster និង ផ្ទាំង Header ដែលត្រូវការភាពរស់រវើកនិងមិនសូវរឹងមាំពេក។',
            pro_tip: 'Never put your main subject exactly in the center if you use this grid. Place the most important element directly on one of the 4 crash points.',
            pro_tip_kh: 'កុំដាក់វត្ថុគោលចំកណ្តាលឱ្យសោះ! ត្រូវដាក់វត្ថុដែលសំខាន់បំផុតឱ្យចំចំណុចប្រសព្វណាមួយនៃចំនុចទាំង៤។'
        }
    },
    { 
        id: 'golden', name: 'Golden Ratio Grid', kh: 'ក្រឡាសមាមាត្រមាស', 
        desc: 'សមាមាត្រ 1:1.618 (Phi) ដែលទាក់ទាញភ្នែកបំផុតតាមបែបធម្មជាតិ។', 
        desc_en: 'Uses the 1:1.618 (Phi) ratio, naturally the most aesthetically pleasing proportion.',
        pro_details: {
            concept: 'A mathematical ratio (1:1.618) found extensively in nature, classical architecture, and human anatomy. It creates a subconscious feeling of organic perfection.',
            concept_kh: 'វាជាសមាមាត្រគណិតវិទ្យា (1:1.618) ដែលមាននៅក្នុងធម្មជាតិ និងស្ថាបត្យកម្មបុរាណ។ វាផ្តល់នូវអារម្មណ៍ថាស្រស់ស្អាតនិងល្អឥតខ្ចោះដោយមិនដឹងខ្លួន។',
            best_for: 'Logo design, high-end branding, and editorial typography scaling.',
            best_for_kh: 'ការគូរឡូហ្គោ, ការរចនាម៉ាកយីហោប្រណីតៗ និងការកំណត់ទំហំអក្សរ។',
            pro_tip: 'Use this ratio to set your font sizes. If your body text is 16px, multiply by 1.618 to get a perfect headline size (approx 26px).',
            pro_tip_kh: 'ប្រើសមាមាត្រនេះសម្រាប់កំណត់ទំហំអក្សរ! បើអត្ថបទធម្មតាទំហំ 16px គុណវាជាមួយ 1.618 អ្នកនឹងបានទំហំចំណងជើងដ៏ល្អឥតខ្ចោះ (ប្រហែល 26px)។'
        }
    },
    { 
        id: 'fibonacci', name: 'Fibonacci Spiral', kh: 'វង់ខ្យងមាស', 
        desc: 'ប្លង់គូសតាមលំដាប់លេខ Fibonacci ដឹកនាំភ្នែកវិលចូលចំណុចកណ្តាល។', 
        desc_en: 'A layout following the Fibonacci sequence, guiding the eye in a spiral toward the center.',
        pro_details: {
            concept: 'An expansion of the Golden Ratio. The spiral naturally guides the viewer’s eye through the design, starting from a wide macro view and spiraling down into a specific micro detail.',
            concept_kh: 'វាគឺជាទម្រង់លម្អិតនៃសមាមាត្រមាស។ ខ្សែកោងនេះដឹកនាំភ្នែកអ្នកមើលពីចំណុចធំៗនៅខាងក្រៅ វិលចូលទៅរកចំណុចលម្អិតតូចមួយនៅកណ្តាល។',
            best_for: 'Complex illustrations, landing page eye-flow, and complex poster art.',
            best_for_kh: 'ផ្ទាំងគំនូរស្មុគស្មាញ, ការរៀបចំទំព័រ Website និង Poster សិល្បៈ។',
            pro_tip: 'Place your negative/white space in the largest block of the spiral, and put your call-to-action (CTA) or main focal point at the very tightest curl of the spiral.',
            pro_tip_kh: 'ដាក់ចន្លោះទទេ (White space) នៅប្រអប់ធំជាងគេ ហើយដាក់ប៊ូតុង ឬវត្ថុគោលនៅត្រង់ចំណុចខ្យងដែលរួញតូចបំផុត។'
        }
    },
    { 
        id: 'col12', name: '12-Column Grid', kh: 'ក្រឡា ១២ ជួរ', 
        desc: 'ស្តង់ដារសម្រាប់ការរចនា UI/UX និងវេបសាយ ងាយស្រួលបែងចែកប្លង់។', 
        desc_en: 'Standard for UI/UX and web design, allowing flexible content placement.',
        pro_details: {
            concept: 'A grid dividing the canvas into 12 vertical columns with consistent gutters (spacing) in between. It is highly divisible by 2, 3, 4, and 6.',
            concept_kh: 'ក្រឡាដែលបែងចែកផ្ទៃការងារជា ១២ ជួរបញ្ឈរដែលមានចន្លោះ (Gutter) ស្មើៗគ្នា។ វាអាចចែកដាច់នឹងលេខ ២, ៣, ៤ និង ៦។',
            best_for: 'Website design, UI/UX, and responsive dashboards.',
            best_for_kh: 'ការរចនា Website, UI/UX និងផ្ទាំង Dashboard ដែលអាចបត់បែនបាន។',
            pro_tip: 'Always align your content boxes to the edges of the columns, NEVER inside the gutters. Gutters must remain empty to act as breathing room.',
            pro_tip_kh: 'ត្រូវតម្រឹមប្រអប់អត្ថបទរបស់អ្នកឱ្យស្មើនឹងគែមជួរឈរ ហាមដាក់វាចូលក្នុងចន្លោះ Gutter ឱ្យសោះ ព្រោះចន្លោះនោះទុកសម្រាប់ជាខ្យល់ដកដង្ហើម។'
        }
    },
    { 
        id: 'modular', name: 'Modular Grid', kh: 'ក្រឡាម៉ូឌុល', 
        desc: 'ក្រឡាការ៉េតូចៗសម្រាប់រៀបចំអត្ថបទ និងរូបភាពលើ Poster ឬទស្សនាវដ្តី។', 
        desc_en: 'A grid of small squares used for organizing text and images in posters or magazines.',
        pro_details: {
            concept: 'An intersection of consistent vertical columns and horizontal rows, creating a matrix of smaller boxes (modules).',
            concept_kh: 'ការប្រសព្វគ្នារវាងជួរបញ្ឈរនិងជួរផ្តេក ដែលបង្កើតបានជាប្រអប់ក្រឡាចត្រង្គតូចៗ (Modules) ស្មើៗគ្នា។',
            best_for: 'Magazines, catalogs, schedules, and heavy data organization.',
            best_for_kh: 'ទស្សនាវដ្តី, កាតាឡុកផលិតផល និងការរៀបចំទិន្នន័យច្រើនៗ។',
            pro_tip: 'You don’t have to confine elements to a single module. Merge 4 or 6 modules together to create a large hero image area, while keeping text in single modules.',
            pro_tip_kh: 'អ្នកមិនចាំបាច់ដាក់របស់ចូលតែក្នុងមួយប្រអប់ទេ។ អ្នកអាចរំលាយប្រអប់ ៤ ចូលគ្នាដើម្បីដាក់រូបភាពធំមួយ ខណៈពេលអត្ថបទតូចៗនៅរក្សាប្រអប់ដើម។'
        }
    },
    { 
        id: 'baseline', name: 'Baseline Grid', kh: 'បន្ទាត់គោលអត្ថបទ', 
        desc: 'បន្ទាត់ផ្តេកស្មើៗគ្នា សម្រាប់តម្រឹមអត្ថបទ (Typography) ឱ្យត្រង់ជួរល្អ។', 
        desc_en: 'Evenly spaced horizontal lines for perfectly aligning typography across columns.',
        pro_details: {
            concept: 'A series of invisible horizontal lines evenly spaced across the document. Text rests exactly on these lines like ruled notebook paper.',
            concept_kh: 'បណ្តុំនៃបន្ទាត់ផ្តេកស្មើៗគ្នា ដែលមើលមិនឃើញ។ អក្សរត្រូវតម្រៀបឱ្យអង្គុយលើយ៉ាងស្អាត ដូចសរសេរលើសៀវភៅសរសេរអញ្ចឹង។',
            best_for: 'Editorial design, long-form reading, multi-column text layouts.',
            best_for_kh: 'ការរចនាសៀវភៅអាន, អត្ថបទកាសែត និងប្លង់ដែលមានអក្សរច្រើនជួរ។',
            pro_tip: 'Set your baseline grid increment to match your body text Leading (line-height). If your text leading is 24pt, your baseline grid should be every 12pt or 24pt.',
            pro_tip_kh: 'កំណត់គម្លាតបន្ទាត់គោលឱ្យស្មើនឹង Leading (គម្លាតបន្ទាត់) នៃអក្សររបស់អ្នក។ បើអក្សរមាន Leading 24pt បន្ទាត់គោលគួរតែរំលងគ្នា 24pt ដែរ។'
        }
    },
    { 
        id: 'diagonal', name: 'Diagonal Layout', kh: 'ប្លង់បញ្ឆិត', 
        desc: 'បង្កើតចលនា (Dynamic) និងភាពរស់រវើក ដោយប្រើបន្ទាត់ទ្រេត។', 
        desc_en: 'Creates dynamic movement and energy by using tilted intersecting lines.',
        pro_details: {
            concept: 'Slanting the structural grid off its horizontal/vertical axis. It completely breaks static balance and introduces a feeling of speed, aggression, and movement.',
            concept_kh: 'ការទាញបន្ទាត់ប្លង់ឱ្យទ្រេតបញ្ឆិត ដោយបំបែកទម្រង់ត្រង់ៗចោល។ វាបង្កើតបាននូវអារម្មណ៍ថាមានល្បឿន ថាមពល និងសកម្មភាពរស់រវើក។',
            best_for: 'Sports posters, energy drinks, action movies, and modern streetwear.',
            best_for_kh: 'Poster កីឡា, ភេសជ្ជៈប៉ូវកម្លាំង, កុនវាយប្រហារ និងម៉ូដសម្លៀកបំពាក់យុវវ័យ។',
            pro_tip: 'Tilt your grid exactly at 45 or 30 degrees. Align your typography exactly parallel to the diagonal slants to make it look intentionally aggressive, not just "crooked".',
            pro_tip_kh: 'គួរទ្រេតប្លង់ក្នុងមុំ ៤៥ ឬ ៣០ ដឺក្រេឱ្យច្បាស់លាស់។ ហើយត្រូវតម្រឹមអក្សរឱ្យស្របគ្នានឹងបន្ទាត់ទ្រេតនោះ ទើបវាមើលទៅមានថាមពល (មិនមែនដូចដាក់វៀចទេ)។'
        }
    },
    { 
        id: 'radial', name: 'Radial / Central', kh: 'ប្លង់កាំរស្មី', 
        desc: 'គ្រប់យ៉ាងតម្រង់ចេញ ឬចូលទៅកាន់ចំណុចកណ្តាលតែមួយ។', 
        desc_en: 'All elements radiate outward from or point inward toward a single central point.',
        pro_details: {
            concept: 'A layout where elements are positioned in a circular fashion originating from the exact center, creating a "tunnel vision" or explosion effect.',
            concept_kh: 'ការរៀបចំប្លង់ដែលគ្រប់យ៉ាងបាញ់ចេញពីចំណុចកណ្តាលដូចកាំរស្មីព្រះអាទិត្យ វាបង្កើតអារម្មណ៍ដូចកំពុងសម្លឹងចូលទៅក្នុងផ្លូវរូងក្រោមដី។',
            best_for: 'Product launches, music festival graphics, and emphasizing a single hero product.',
            best_for_kh: 'ការសម្ពោធផលិតផលថ្មី, Poster តន្ត្រី និងការចង់ទាញការចាប់អារម្មណ៍ខ្លាំងទៅលើរបស់តែមួយ។',
            pro_tip: 'Place the highest contrast color directly in the absolute center. Make the radiating elements blur or darken as they reach the edges to create a 3D tunnel effect.',
            pro_tip_kh: 'ដាក់ពណ៌ដែលឆើតបំផុតនៅចំកណ្តាល រួចធ្វើឱ្យវត្ថុដែលនៅក្បែរគែមៗរាងព្រិល ឬងងឹត ដើម្បីបង្កើតអារម្មណ៍ 3D។'
        }
    },
    { 
        id: 'triangle', name: 'Triangle Grid', kh: 'ក្រឡាត្រីកោណ', 
        desc: 'ប្លង់ដែលប្រើទម្រង់ត្រីកោណ ដើម្បីបង្កើតភាពមុតស្រួច និងថាមពល។', 
        desc_en: 'A layout using triangular shapes to create sharpness, direction, and power.',
        pro_details: {
            concept: 'Arranging focal points to form an invisible triangle. A standard triangle implies stability and strength, while an inverted (upside-down) triangle creates psychological tension and instability.',
            concept_kh: 'ការរៀបចំវត្ថុឱ្យចេញជាទម្រង់ត្រីកោណ។ ត្រីកោណឈរ បង្ហាញពីភាពរឹងមាំ តែកាលណាត្រីកោណបញ្ច្រាស វាបង្កើតភាពរំជើបរំជួលនិងតានតឹង។',
            best_for: 'Movie posters (placing characters in a pyramid), corporate hierarchy charts.',
            best_for_kh: 'Poster កុន (ដាក់តួអង្គតម្រៀបជាពីរ៉ាមីត) ឬការរចនាដែលចង់បង្ហាញពីអំណាច។',
            pro_tip: 'Place the main hero at the apex (top point) of the triangle, and supporting elements at the base. This establishes an instant visual hierarchy.',
            pro_tip_kh: 'ដាក់តួអង្គឯកនៅកំពូលនៃត្រីកោណ ហើយដាក់វត្ថុបន្ទាប់បន្សំនៅបាតក្រោម។ នេះបង្កើតឋានានុក្រមភ្នែកបានយ៉ាងលឿន។'
        }
    },
    { 
        id: 'manuscript', name: 'Manuscript Grid', kh: 'ក្រឡាសៀវភៅ', 
        desc: 'ផ្ទៃធំកណ្តាល មានគែមជុំវិញ សម្រាប់អត្ថបទវែងៗដូចជាសៀវភៅ។', 
        desc_en: 'A large central block with generous margins, used for long continuous text like books.',
        pro_details: {
            concept: 'The simplest grid: a single, large rectangular block of content surrounded by generous margins on all four sides.',
            concept_kh: 'ជាក្រឡាដែលសាមញ្ញបំផុត៖ មានផ្ទៃអត្ថបទធំមួយនៅកណ្តាល និងមានគែមទំនេរ (Margin) ធំទូលាយនៅជុំវិញវា។',
            best_for: 'Books, PDFs, blog posts, and text-heavy traditional documents.',
            best_for_kh: 'សៀវភៅ, ឯកសារ PDF, អត្ថបទ Blog និងឯកសារផ្លូវការ។',
            pro_tip: 'The margins are the most important part! Never make the text block touch the edges. Give the bottom margin the most space so the page doesn’t feel like it’s "sinking".',
            pro_tip_kh: 'គែម Margin គឺសំខាន់បំផុត! កុំដាក់អក្សរឱ្យកៀកគែមពេក។ គួរទុកគែមខាងក្រោមឱ្យធំជាងគេ ដើម្បីកុំឱ្យមើលទៅធ្ងន់ធ្លាក់ចុះក្រោម។'
        }
    },
    { 
        id: 'hierarchical', name: 'Hierarchical Grid', kh: 'ប្លង់ឋានានុក្រម', 
        desc: 'បែងចែកទំហំមិនស្មើគ្នា ផ្អែកលើភាពសំខាន់នៃព័ត៌មាន (ទំព័រមុខ Website)។', 
        desc_en: 'Unequal spatial division based entirely on the visual importance of the information.',
        pro_details: {
            concept: 'An organic, non-uniform grid where the size of the blocks is dictated entirely by the importance of the content inside them.',
            concept_kh: 'ជាប្លង់ដែលមិនស្មើគ្នា ដោយប្រអប់នីមួយៗមានទំហំធំឬតូច គឺអាស្រ័យលើភាពសំខាន់នៃព័ត៌មាននៅក្នុងនោះ។',
            best_for: 'News websites, portfolio homepages, and dashboard overviews.',
            best_for_kh: 'Website ព័ត៌មាន, ទំព័រដើមនៃ Portfolio និងផ្ទាំង Dashboard។',
            pro_tip: 'Make the #1 most important piece of content visibly 3x larger than the secondary elements to force the viewer to look there first.',
            pro_tip_kh: 'ត្រូវធ្វើឱ្យព័ត៌មានសំខាន់បំផុតទី១ មានទំហំធំជាងវត្ថុបន្ទាប់បន្សំយ៉ាងហោចណាស់ ៣ ដង ដើម្បីបង្ខំភ្នែកអ្នកមើល។'
        }
    },
    { 
        id: 'symmetrical', name: 'Symmetrical', kh: 'តុល្យភាពស្មើ', 
        desc: 'បែងចែកឆ្វេងស្តាំស្មើគ្នា ផ្តល់អារម្មណ៍ផ្លូវការ និងរឹងមាំ។', 
        desc_en: 'Equal distribution of weight on the left and right, providing a formal and stable feel.',
        pro_details: {
            concept: 'Both halves of the design (left/right or top/bottom) mirror each other in visual weight. It feels balanced, traditional, and peaceful.',
            concept_kh: 'ផ្ទៃការងារទាំងសងខាងមានទម្ងន់ស្មើគ្នាដូចឆ្លុះកញ្ចក់។ វាផ្តល់អារម្មណ៍ថាមានតុល្យភាព ប្រពៃណី និងសុវត្ថិភាព។',
            best_for: 'Wedding invitations, luxury brand logos, classic architecture presentations.',
            best_for_kh: 'ធៀបការ, ឡូហ្គោម៉ាកប្រណីតៗ និងការបង្ហាញគម្រោងស្ថាបត្យកម្ម។',
            pro_tip: 'Symmetry can become boring easily. Add one tiny element of asymmetry (like a distinct pop of color on one side) to keep the eye interested.',
            pro_tip_kh: 'ប្លង់ស្មើគ្នាពេកអាចនឹងគួរឱ្យធុញ។ គួរបន្ថែមចំណុចតូចមួយដែលមិនស្មើគ្នា (ឧ. ពណ៌ឆើតនៅជ្រុងម្ខាង) ដើម្បីឱ្យមានភាពទាក់ទាញ។'
        }
    },
    { 
        id: 'asymmetrical', name: 'Asymmetrical', kh: 'តុល្យភាពមិនស្មើ', 
        desc: 'ទំហំមិនស្មើគ្នា តែរក្សាទម្ងន់ឱ្យមានលំនឹង។ មើលទៅទំនើប និងរស់រវើក។', 
        desc_en: 'Unequal sizes but visually balanced. Looks modern, active, and highly engaging.',
        pro_details: {
            concept: 'The sides are not identical, but they have equal "Visual Weight". A large, light object on the left can be balanced by a small, dark object on the right.',
            concept_kh: 'ទំហំមិនស្មើគ្នា តែមាន "ទម្ងន់ភ្នែក" ស្មើគ្នា។ ឧទាហរណ៍៖ វត្ថុធំស្រាលនៅខាងឆ្វេង អាចទប់លំនឹងជាមួយវត្ថុតូចតែដិតនៅខាងស្តាំបាន។',
            best_for: 'Modern graphic design, dynamic branding, and artistic posters.',
            best_for_kh: 'ការរចនាម៉ូដទំនើប, ការធ្វើ Branding ប្លែកៗ និង Poster សិល្បៈ។',
            pro_tip: 'Balance is key. If you put a massive photo block on the right, balance the empty left side with very heavy, bold typography.',
            pro_tip_kh: 'តុល្យភាពគឺសំខាន់បំផុត! បើអ្នកដាក់រូបភាពយ៉ាងធំនៅខាងស្តាំ ត្រូវទប់លំនឹងនៅខាងឆ្វេងដោយប្រើអក្សរចំណងជើងដែលធំនិងក្រាស់ (Bold)។'
        }
    },
    { 
        id: 'zpattern', name: 'Z-Pattern', kh: 'ទម្រង់អាន Z', 
        desc: 'លំហូរភ្នែកអ្នកអានពីឆ្វេងទៅស្តាំ រួចចុះក្រោម។ ល្អសម្រាប់ Poster ផ្សាយពាណិជ្ជកម្ម។', 
        desc_en: 'Eye flow from top-left to top-right, then diagonally down. Great for advertisements.',
        pro_details: {
            concept: 'Mimics the natural eye movement of Western readers. The eye scans horizontally from top-left to right, darts diagonally down to the bottom-left, and scans right again.',
            concept_kh: 'វាធ្វើតាមចលនាភ្នែកអានធម្មជាតិ។ ភ្នែកនឹងអានពីឆ្វេងទៅស្តាំ រួចចុះបញ្ឆិតមកក្រោមខាងឆ្វេង ហើយអានទៅស្តាំម្តងទៀត។',
            best_for: 'Landing pages, promotional flyers, and designs with minimal text and a clear Call to Action.',
            best_for_kh: 'Landing pages, ខិត្តប័ណ្ណប្រូម៉ូសិន និងប្លង់ដែលមានអក្សរតិចតែចង់ឱ្យគេចុចទិញ។',
            pro_tip: 'Place your Logo at top-left, Navigation at top-right, Hero image in the middle diagonal, and the "Buy Now" button at the bottom-right for maximum conversion.',
            pro_tip_kh: 'ដាក់ឡូហ្គោនៅឆ្វេងលើ, រូបភាពនៅកណ្តាលបញ្ឆិត, ហើយដាក់ប៊ូតុង "ទិញឥឡូវនេះ" នៅជ្រុងស្តាំក្រោម ធានាថាមានប្រសិទ្ធភាពបំផុត!'
        }
    },
    { 
        id: 'fpattern', name: 'F-Pattern', kh: 'ទម្រង់អាន F', 
        desc: 'លំហូរភ្នែកសម្រាប់អានអត្ថបទច្រើន (មើលរហ័សពីឆ្វេងទៅស្តាំ លើចុះក្រោម)។', 
        desc_en: 'Eye flow for heavy text content (scanning quickly left-to-right, then moving down).',
        pro_details: {
            concept: 'When faced with heavy text, users scan in an F-shape: reading the top lines fully, then skimming down the left edge, occasionally reading horizontally again.',
            concept_kh: 'ពេលមានអក្សរច្រើន ភ្នែកមនុស្សនឹងអានជាទម្រង់អក្សរ F៖ អានជួរលើពេញ រួចអូសចុះតាមគែមឆ្វេង ហើយអានកាត់ៗចូលកណ្តាលបន្តិច។',
            best_for: 'Blogs, news sites, search results, and heavy data pages.',
            best_for_kh: 'អត្ថបទ Blog, វេបសាយព័ត៌មាន និងទំព័រដែលមានអក្សរច្រើន។',
            pro_tip: 'Put your most crucial keywords at the very beginning of bullet points or sentences on the left edge. Users rarely read to the end of the line.',
            pro_tip_kh: 'ដាក់ពាក្យគន្លឹះសំខាន់ៗនៅដើមប្រយោគ ឬនៅគែមខាងឆ្វេង ព្រោះអ្នកអានកម្រនឹងអានដល់ចុងបន្ទាត់ណាស់។'
        }
    },
    { 
        id: 'lpattern', name: 'L-Pattern', kh: 'ទម្រង់អាន L', 
        desc: 'រុញចំណាប់អារម្មណ៍អ្នកមើលទៅកាន់ទីធ្លាទំនេរនៅកណ្តាល ល្អសម្រាប់ស៊ុមថតរូប (Framing)។', 
        desc_en: 'Pushes viewer attention toward the negative space in the center, great for framing.',
        pro_details: {
            concept: 'The content is aligned strictly to the left edge and the bottom edge, leaving a massive, open negative space in the center/right.',
            concept_kh: 'ព័ត៌មានទាំងអស់ត្រូវបានតម្រៀបជាប់គែមឆ្វេងនិងគែមក្រោម ដែលបន្សល់ទុកផ្ទៃទំនេរយ៉ាងធំនៅចំកណ្តាលនិងខាងស្តាំ។',
            best_for: 'Minimalist posters, artistic photography, and high-end fashion branding.',
            best_for_kh: 'Poster បែបសាមញ្ញ (Minimalist), ការតាំងរូបថតសិល្បៈ និងម៉ាកសម្លៀកបំពាក់ថ្លៃៗ។',
            pro_tip: 'Use the massive negative space to showcase an isolated, highly detailed product shot. The L-shape acts like a shelf holding the product.',
            pro_tip_kh: 'ប្រើប្រាស់ផ្ទៃទំនេរដ៏ធំនោះដើម្បីដាក់បង្ហាញរូបផលិតផលតែមួយគត់ឱ្យលេចធ្លោ។ ទម្រង់ L នេះប្រៀបដូចជាធ្នើរសម្រាប់ទ្រផលិតផលអញ្ចឹង។'
        }
    },
    { 
        id: 'ypattern', name: 'Y-Pattern', kh: 'ទម្រង់អាន Y', 
        desc: 'ប្រើបន្ទាត់នាំភ្នែកពីជ្រុងទាំងសងខាង ដើម្បីជួបគ្នានៅចំណុចកណ្តាល (Focal Point)។', 
        desc_en: 'Uses lines from the top corners converging into a central focal point.',
        pro_details: {
            concept: 'Visual elements are placed at the top corners and bottom center, guiding the eye to converge exactly in the middle of the Y-shape.',
            concept_kh: 'ការដាក់វត្ថុនៅជ្រុងលើទាំងសងខាង និងនៅកណ្តាលខាងក្រោម ដើម្បីទាញភ្នែកឱ្យរត់មកជួបគ្នានៅចំកណ្តាលនៃទម្រង់ Y។',
            best_for: 'Movie posters, character introduction graphics, and aggressive marketing.',
            best_for_kh: 'Poster កុន, ការបង្ហាញតួអង្គ និងការផ្សាយពាណិជ្ជកម្មដែលចង់បានការចាប់អារម្មណ៍ខ្លាំង។',
            pro_tip: 'Place two supporting characters or visuals at the top arms of the Y, and place your absolute main focal point right at the intersection.',
            pro_tip_kh: 'ដាក់តួអង្គរងនៅជ្រុងខាងលើនៃអក្សរ Y ហើយដាក់ចំណុចសំខាន់បំផុតនៅត្រង់ចំនុចប្រសព្វតែម្តង ដើម្បីទាញភ្នែកឱ្យជាប់។'
        }
    },
    { 
        id: 'bento', name: 'Bento Grid', kh: 'ប្លង់ប្រអប់បេនតូ', 
        desc: 'រៀបចំទិន្នន័យជាប្រអប់ចតុកោណតូចធំខុសៗគ្នាផ្គុំចូលគ្នា។ ល្អសម្រាប់ UI និង Portfolio។', 
        desc_en: 'Organizing data into interlocking rectangular boxes. Popular in UI and Portfolios.',
        pro_details: {
            concept: 'Inspired by Japanese Bento boxes. It divides the layout into highly contained, interlocking rounded rectangles of varying sizes.',
            concept_kh: 'យកគំនិតពីប្រអប់បាយ Bento របស់ជប៉ុន។ វាបែងចែកទិន្នន័យទៅជាប្រអប់ចតុកោណកែងមូលតូចធំខុសៗគ្នា ដែលរៀបផ្គុំចូលគ្នាយ៉ាងមានរបៀប។',
            best_for: 'Apple-style presentations, modern app dashboards, and design portfolios.',
            best_for_kh: 'ការបង្ហាញរបៀប Apple, App Dashboards ទំនើបៗ និងការធ្វើ Portfolio។',
            pro_tip: 'Give every single box the exact same padding and border-radius. The structure only looks premium if the gaps (gutters) are perfectly mathematically equal.',
            pro_tip_kh: 'ត្រូវដាក់គម្លាត (Padding) និងភាពកោងនៃជ្រុង (Border-Radius) របស់គ្រប់ប្រអប់ទាំងអស់ឱ្យស្មើគ្នាបេះបិទ ទើបវាមើលទៅ Premium។'
        }
    },
    { 
        id: 'masonry', name: 'Masonry Grid', kh: 'ប្លង់សង់ឥដ្ឋ', 
        desc: 'រៀបចំរូបភាពមានកម្ពស់ខុសៗគ្នាតម្រៀបតៗគ្នាដោយគ្មានចន្លោះ (ដូចស្ទាយ Pinterest)។', 
        desc_en: 'Arranging images of varying heights in vertical columns without horizontal gaps.',
        pro_details: {
            concept: 'Items are placed in vertical columns, but unlike a standard grid, they do not align horizontally. They stack tightly like bricks in a wall.',
            concept_kh: 'រៀបចំវត្ថុជាជួរបញ្ឈរ តែវាមិនតម្រឹមស្មើគ្នាជាជួរផ្តេកទេ (រូបខ្លះវែង រូបខ្លះខ្លី)។ វាផ្តុំគ្នាណែនដូចគេរៀបឥដ្ឋសង់ជញ្ជាំង។',
            best_for: 'Pinterest clones, photography portfolios, and e-commerce product feeds.',
            best_for_kh: 'វេបសាយដូច Pinterest, Portfolio រូបថត និងការបង្ហាញទំនិញអនឡាញដែលមានខ្នាតរូបខុសៗគ្នា។',
            pro_tip: 'Only use Masonry if your content has highly variable heights. If all your images are square, a standard grid is much cleaner and more professional.',
            pro_tip_kh: 'គួរប្រើវាតែនៅពេលដែលរូបភាពរបស់អ្នកមានកម្ពស់ខុសៗគ្នាខ្លាំង (វែងផង ខ្លីផង)។ បើរូបប៉ុនៗគ្នា គួរប្រើក្រឡា (Grid) ធម្មតាទើបស្អាតជាង។'
        }
    }
];

const sizeData = [
    {
        title: "Facebook HQ Grids (1920px)",
        title_kh: "ខ្នាតស្តង់ដារ Facebook កម្រិតច្បាស់",
        icon: <Grid size={18} />,
        items: [
            { id: "fb-grid-1", name: "1 Vertical, 2 Squares", size: "1x (960x1920px)\n2x (1920x1920px)", ratio: "1:2 + 1:1", desc: "Upload vertical first, then 2 squares.", desc_kh: "ផុសរូបបញ្ឈរមុនគេ បន្ទាប់មករូបការ៉េ ២។" },
            { id: "fb-grid-2", name: "1 Horizontal, 2 Sq", size: "1x (1920x960px)\n2x (1920x1920px)", ratio: "2:1 + 1:1", desc: "Upload horizontal first, then 2 squares.", desc_kh: "ផុសរូបផ្តេកមុនគេ បន្ទាប់មករូបការ៉េ ២។" },
            { id: "fb-grid-3", name: "1 Tall, 3 Squares", size: "1x (1280x1920px)\n3x (1920x1920px)", ratio: "2:3 + 1:1", desc: "Upload tall image first, then 3 squares.", desc_kh: "ផុសរូបបញ្ឈរធំមុនគេ បន្ទាប់មករូបការ៉េ ៣។" },
            { id: "fb-grid-4", name: "4 Squares Grid", size: "4x (1920x1920px)", ratio: "1:1", desc: "Upload 4 exact squares for an even grid.", desc_kh: "ផុសរូបការ៉េ ៤ ស្មើគ្នា។" },
            { id: "fb-grid-5", name: "2 Sq Left, 3 Land", size: "2x (1920x1920px)\n3x (1920x1280px)", ratio: "1:1 + 3:2", desc: "Upload 2 squares, then 3 landscape shots.", desc_kh: "ផុសរូបការ៉េ២ រួចរូបផ្តេកតូចៗ៣។" },
            { id: "fb-grid-6", name: "5 Squares Grid", size: "5x (1920x1920px)", ratio: "1:1", desc: "Upload 5 high-res squares.", desc_kh: "ផុសរូបការ៉េទាំង ៥សន្លឹក។" },
            { id: "fb-cover", name: "Cover Photo", size: "1920 x 734 px", ratio: "2.61:1", desc: "High-resolution desktop and mobile cover.", desc_kh: "ខ្នាត Cover មិនដាច់ទាំងលើកុំព្យូទ័រ និងទូរស័ព្ទ។" },
            { id: "fb-portrait", name: "Portrait Post", size: "1536 x 1920 px", ratio: "4:5", desc: "Maximum vertical screen space.", desc_kh: "ស៊ីទំហំអេក្រង់ទូរស័ព្ទធំបំផុត ងាយទាក់ទាញភ្នែក។" },
        ]
    },
    {
        title: "Instagram Standards",
        title_kh: "ខ្នាតស្តង់ដារ Instagram",
        icon: <Smartphone size={18} />,
        items: [
            { id: "fb-square", name: "Square Post", size: "1080 x 1080 px", ratio: "1:1", desc: "Classic grid ratio.", desc_kh: "ខ្នាតការ៉េបុរាណ។" },
            { id: "fb-portrait", name: "Portrait Post", size: "1080 x 1350 px", ratio: "4:5", desc: "Best performing ratio for IG engagement.", desc_kh: "ខ្នាតពេញនិយមបំផុតសម្រាប់ទាញការចាប់អារម្មណ៍។" },
            { id: "ig-story", name: "Story / Reels", size: "1080 x 1920 px", ratio: "9:16", desc: "Full screen vertical content.", desc_kh: "ខ្នាតបញ្ឈរពេញអេក្រង់។" },
        ]
    },
    {
        title: "Video & Web Displays",
        title_kh: "វីដេអូ និង ផ្ទៃបង្ហាញ Website",
        icon: <Monitor size={18} />,
        items: [
            { id: "yt-thumb", name: "YouTube Thumbnail", size: "1920 x 1080 px", ratio: "16:9", desc: "Always design thumbnails in 1920p for retina.", desc_kh: "គួរតែរចនាទំហំ 1920p ជានិច្ចដើម្បីឱ្យច្បាស់។" },
            { id: "ig-story", name: "TikTok Video", size: "1080 x 1920 px", ratio: "9:16", desc: "Standard 4K portrait video size.", desc_kh: "ខ្នាតវីដេអូស្តង់ដារ។" },
            { id: "fb-landscape", name: "Standard Web Header", size: "1920 x 1080 px", ratio: "16:9", desc: "Common website hero banner size.", desc_kh: "ខ្នាតផ្ទាំងបដាវេបសាយទូទៅ។" },
        ]
    }
];

// 🌟 ALL GRAPHIC RENDERERS 🌟
const renderSizeGraphic = (id, isDark) => {
    const borderClass = isDark ? 'stroke-[#4A4A4C]' : 'stroke-[#9CA3AF]';
    const fillClass = isDark ? 'fill-[#2C2C2C]/50' : 'fill-[#E5E7EB]/50';
    const accentClass = isDark ? 'fill-[#41B6E6]/30 stroke-[#41B6E6]' : 'fill-[#0277C5]/20 stroke-[#0277C5]';

    switch(id) {
        case 'fb-square':
            return <svg viewBox="0 0 100 100" className="w-14 h-14 animate-pop-in-center"><rect x="15" y="15" width="70" height="70" rx="4" className={`${accentClass} stroke-[2.5]`} /></svg>;
        case 'fb-portrait':
            return <svg viewBox="0 0 100 100" className="w-14 h-14 animate-pop-in-center"><rect x="22" y="5" width="56" height="90" rx="4" className={`${accentClass} stroke-[2.5]`} /></svg>;
        case 'fb-landscape':
            return <svg viewBox="0 0 100 100" className="w-14 h-14 animate-pop-in-center"><rect x="5" y="25" width="90" height="50" rx="4" className={`${accentClass} stroke-[2.5]`} /></svg>;
        case 'fb-cover':
            return <svg viewBox="0 0 100 100" className="w-16 h-14 animate-pop-in-center"><rect x="0" y="32" width="100" height="36" rx="4" className={`${accentClass} stroke-[2.5]`} /></svg>;
        case 'fb-grid-1': // 1 Tall, 2 Sq
            return (
                <svg viewBox="0 0 100 100" className="w-14 h-14 animate-pop-in-center">
                    <rect x="5" y="5" width="43.5" height="90" rx="2" className={`${accentClass} stroke-[2.5]`} />
                    <rect x="51.5" y="5" width="43.5" height="43.5" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                    <rect x="51.5" y="51.5" width="43.5" height="43.5" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                </svg>
            );
        case 'fb-grid-2': // 1 Wide, 2 Sq
             return (
                <svg viewBox="0 0 100 100" className="w-14 h-14 animate-pop-in-center">
                    <rect x="5" y="5" width="90" height="43.5" rx="2" className={`${accentClass} stroke-[2.5]`} />
                    <rect x="5" y="51.5" width="43.5" height="43.5" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                    <rect x="51.5" y="51.5" width="43.5" height="43.5" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                </svg>
            );
        case 'fb-grid-3': // 1 Tall (2:3), 3 Sq
             return (
                <svg viewBox="0 0 100 100" className="w-14 h-14 animate-pop-in-center">
                    <rect x="5" y="5" width="59" height="90" rx="2" className={`${accentClass} stroke-[2.5]`} />
                    <rect x="67" y="5" width="28" height="28" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                    <rect x="67" y="36" width="28" height="28" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                    <rect x="67" y="67" width="28" height="28" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                </svg>
            );
        case 'fb-grid-4': // 4 Squares
             return (
                <svg viewBox="0 0 100 100" className="w-14 h-14 animate-pop-in-center">
                    <rect x="5" y="5" width="43.5" height="43.5" rx="2" className={`${accentClass} stroke-[2.5]`} />
                    <rect x="51.5" y="5" width="43.5" height="43.5" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                    <rect x="5" y="51.5" width="43.5" height="43.5" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                    <rect x="51.5" y="51.5" width="43.5" height="43.5" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                </svg>
            );
        case 'fb-grid-5': // 2 Sq Left, 3 Land Right
             return (
                <svg viewBox="0 0 100 100" className="w-14 h-14 animate-pop-in-center">
                    <rect x="5" y="5" width="43.5" height="43.5" rx="2" className={`${accentClass} stroke-[2.5]`} />
                    <rect x="5" y="51.5" width="43.5" height="43.5" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                    <rect x="51.5" y="5" width="43.5" height="28" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                    <rect x="51.5" y="36" width="43.5" height="28" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                    <rect x="51.5" y="67" width="43.5" height="28" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                </svg>
            );
        case 'fb-grid-6': // 2 Sq Top, 3 Sq Bottom
             return (
                <svg viewBox="0 0 100 100" className="w-14 h-14 animate-pop-in-center">
                    <rect x="5" y="5" width="43.5" height="43.5" rx="2" className={`${accentClass} stroke-[2.5]`} />
                    <rect x="51.5" y="5" width="43.5" height="43.5" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                    <rect x="5" y="51.5" width="28" height="28" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                    <rect x="36" y="51.5" width="28" height="28" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                    <rect x="67" y="51.5" width="28" height="28" rx="2" className={`${fillClass} ${borderClass} stroke-[2.5]`} />
                </svg>
            );
        case 'ig-story':
             return <svg viewBox="0 0 100 100" className="w-12 h-14 animate-pop-in-center"><rect x="15" y="5" width="70" height="90" rx="4" className={`${accentClass} stroke-[2.5]`} /></svg>;
        case 'yt-thumb':
             return <svg viewBox="0 0 100 100" className="w-16 h-14 animate-pop-in-center"><rect x="0" y="25" width="100" height="50" rx="4" className={`${accentClass} stroke-[2.5]`} /><polygon points="45,40 45,60 60,50" fill={isDark ? '#E3E3E3' : '#1A1C1E'} /></svg>;
        default:
            return <svg viewBox="0 0 100 100" className="w-14 h-14"><rect x="15" y="15" width="70" height="70" rx="4" className={`${fillClass} ${borderClass} stroke-[2.5]`} /></svg>;
    }
};

const renderLayoutGraphic = (id, isDark, orientation = 'landscape') => {
    const borderClass = isDark ? 'border-[#4A4A4C]' : 'border-[#D1D5DB]';
    const fillClass = isDark ? 'bg-[#2C2C2C]/80' : 'bg-[#E5E7EB]/80';
    const accentClass = isDark ? 'bg-[#41B6E6]/30 border-[#41B6E6]/60' : 'bg-[#0277C5]/20 border-[#0277C5]/50';
    const accentBorder = isDark ? 'border-[#41B6E6]' : 'border-[#0277C5]';
    
    const svgGuide = isDark ? '#4A4A4C' : '#9CA3AF';
    const svgAccent = isDark ? '#41B6E6' : '#0277C5';
    const svgFill = isDark ? 'rgba(65, 182, 230, 0.15)' : 'rgba(2, 119, 197, 0.1)';

    const animStyle = `
        @keyframes draw-line { to { stroke-dashoffset: 0; } }
        @keyframes pulse-node { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.5); opacity: 1; box-shadow: 0 0 10px currentColor; } }
    `;

    switch (id) {
        case 'thirds':
            return (
                <div className="absolute inset-5">
                    <style>{animStyle}</style>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                       <path d="M 33.33 0 L 33.33 100 M 66.66 0 L 66.66 100 M 0 33.33 L 100 33.33 M 0 66.66 L 100 66.66" fill="none" stroke={svgGuide} strokeWidth="0.5" strokeDasharray="3 3" />
                       {[ [33.33, 33.33], [66.66, 33.33], [33.33, 66.66], [66.66, 66.66] ].map(([x,y], i) => (
                           <circle key={i} cx={x} cy={y} r="2" fill={i === 0 ? svgAccent : svgGuide} opacity={i === 0 ? "1" : "0.5"} className={i===0 ? "animate-pop-in-center" : ""} style={i===0 ? {animation: 'pulse-node 2s infinite'} : {}}/>
                       ))}
                    </svg>
                </div>
            );
        case 'golden':
            return (
                <div className="absolute inset-5">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <rect x="0" y="0" width="100" height="100" fill="none" stroke={svgGuide} strokeWidth="0.5" strokeDasharray="2 2" />
                        <line x1="61.8" y1="0" x2="61.8" y2="100" stroke={svgGuide} strokeWidth="0.5" />
                        <line x1="61.8" y1="61.8" x2="100" y2="61.8" stroke={svgGuide} strokeWidth="0.5" />
                        <line x1="76.4" y1="61.8" x2="76.4" y2="100" stroke={svgGuide} strokeWidth="0.5" />
                        <rect x="0" y="0" width="61.8" height="100" fill={svgFill} className="animate-pop-in-center" />
                        <text x="30.9" y="50" fontSize="10" fill={svgAccent} textAnchor="middle" dominantBaseline="central" fontWeight="bold">1.618</text>
                    </svg>
                </div>
            );
        case 'fibonacci':
            const fiboGraphic = (
                <>
                    <style>{animStyle}</style>
                    <rect x="0" y="0" width="61.8" height="61.8" fill="none" stroke={svgGuide} strokeWidth="0.5" />
                    <rect x="61.8" y="0" width="38.2" height="38.2" fill="none" stroke={svgGuide} strokeWidth="0.5" />
                    <rect x="76.4" y="38.2" width="23.6" height="23.6" fill="none" stroke={svgGuide} strokeWidth="0.5" />
                    <rect x="61.8" y="47.2" width="14.6" height="14.6" fill="none" stroke={svgGuide} strokeWidth="0.5" />
                    <path 
                        d="M 0,61.8 A 61.8,61.8 0 0,1 61.8,0 A 38.2,38.2 0 0,1 100,38.2 A 23.6,23.6 0 0,1 76.4,61.8 A 14.6,14.6 0 0,1 61.8,47.2 A 9.0,9.0 0 0,1 70.8,38.2" 
                        fill="none" stroke={svgAccent} strokeWidth="1.5" strokeLinecap="round" 
                        strokeDasharray="300" strokeDashoffset="300" 
                        style={{ animation: 'draw-line 2s ease-out forwards 0.3s' }} 
                    />
                </>
            );
            return (
                <div className="absolute inset-4 flex items-center justify-center">
                    <svg viewBox="-2 -2 104 65.8" className="w-full h-full pointer-events-none overflow-visible" preserveAspectRatio="xMidYMid meet" style={orientation === 'portrait' ? {transform: 'rotate(90deg) scale(0.95)'} : {}}>
                        {fiboGraphic}
                    </svg>
                </div>
            );
        case 'col12':
            return (
                <div className="absolute inset-5 flex flex-col gap-2">
                    <div className="absolute inset-0 flex gap-[2px]">
                        {Array(12).fill(0).map((_, i) => <div key={i} className={`flex-1 h-full rounded-[2px] ${isDark ? 'bg-[#2C2C2C]/40' : 'bg-[#E5E7EB]/50'}`}></div>)}
                    </div>
                    <div className={`w-full h-1/4 rounded border-[1.5px] z-10 flex items-center justify-center shadow-sm ${accentClass}`}>
                         <span className="text-[7px] font-bold uppercase tracking-widest">Header (12 Cols)</span>
                    </div>
                    <div className="w-full flex-1 flex gap-[2px] z-10">
                         <div className={`w-[66.66%] h-full rounded border-[1.5px] flex items-center justify-center shadow-sm ${accentClass}`}>
                             <span className="text-[7px] font-bold uppercase tracking-widest">Content (8 Cols)</span>
                         </div>
                         <div className={`w-[33.33%] h-full rounded border border-dashed flex items-center justify-center ${borderClass} ${fillClass}`}>
                             <span className={`text-[7px] font-bold uppercase tracking-widest ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>Side (4)</span>
                         </div>
                    </div>
                </div>
            );
        case 'modular':
            return (
                <div className="absolute inset-5 grid grid-cols-6 grid-rows-4 gap-1.5">
                    {Array(24).fill(0).map((_, i) => {
                        const isHero = [7,8,9,13,14,15].includes(i);
                        return <div key={i} className={`rounded-sm border ${isHero ? `border-[1.5px] ${accentBorder} ${svgFill} shadow-sm` : `border-dashed ${borderClass} ${fillClass}`} animate-pop-in-center`} style={{ animationDelay: `${i * 15}ms` }}></div>
                    })}
                </div>
            );
        case 'baseline':
            return (
                <div className="absolute inset-5 overflow-hidden flex flex-col justify-center">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {Array.from({length: 12}).map((_, i) => (
                            <g key={i}>
                                <line x1="0" y1={i * 8.5 + 4} x2="100" y2={i * 8.5 + 4} stroke={svgGuide} strokeWidth="0.3" strokeDasharray="1 2" />
                                {i % 2 === 0 && i < 10 && (
                                    <rect x="5" y={i * 8.5 + 1.5} width={i===0? 80 : i===2? 90 : i===4? 60 : i===6? 85 : 40} height="2.5" rx="1" fill={svgAccent} className="animate-grow-width" style={{animationDelay: `${i*100}ms`}} />
                                )}
                            </g>
                        ))}
                    </svg>
                </div>
            );
        case 'diagonal':
            return (
                <div className="absolute inset-5 overflow-hidden">
                    <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none" preserveAspectRatio="none">
                        <line x1="0" y1="100" x2="100" y2="0" stroke={svgGuide} strokeWidth="0.5" strokeDasharray="2 2" />
                        <line x1="0" y1="0" x2="100" y2="100" stroke={svgGuide} strokeWidth="0.5" strokeDasharray="2 2" />
                        <polygon points="0,100 100,100 100,0" fill={svgFill} className="animate-pop-in-center" />
                        <rect x="25" y="25" width="50" height="50" fill="none" stroke={svgAccent} strokeWidth="1.5" transform="rotate(45 50 50)" className="animate-pop-in-center" style={{animationDelay: '200ms'}} />
                    </svg>
                </div>
            );
        case 'radial':
            return (
                <div className="absolute inset-5 overflow-hidden flex items-center justify-center">
                    <style>{animStyle}</style>
                    <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none">
                        <circle cx="50" cy="50" r="15" stroke={svgGuide} strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
                        <circle cx="50" cy="50" r="30" stroke={svgGuide} strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
                        <circle cx="50" cy="50" r="45" stroke={svgGuide} strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
                        {Array.from({length: 8}).map((_, i) => {
                            const angle = (i * 45) * (Math.PI / 180);
                            return <line key={i} x1="50" y1="50" x2={50 + 50 * Math.cos(angle)} y2={50 + 50 * Math.sin(angle)} stroke={svgGuide} strokeWidth="0.5" />;
                        })}
                        <circle cx="50" cy="50" r="6" fill={svgAccent} style={{animation: 'pulse-node 2s infinite'}} />
                    </svg>
                </div>
            );
        case 'triangle':
            return (
                <div className="absolute inset-5 overflow-hidden">
                    <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none" preserveAspectRatio="none">
                         <line x1="50" y1="15" x2="15" y2="85" stroke={svgGuide} strokeWidth="0.5" strokeDasharray="2 2" />
                         <line x1="50" y1="15" x2="85" y2="85" stroke={svgGuide} strokeWidth="0.5" strokeDasharray="2 2" />
                         <line x1="15" y1="85" x2="85" y2="85" stroke={svgGuide} strokeWidth="0.5" strokeDasharray="2 2" />
                         <polygon points="50,25 70,75 30,75" fill={svgFill} stroke={svgAccent} strokeWidth="1.5" className="animate-pop-in-center" />
                    </svg>
                </div>
            );
        case 'manuscript':
            return (
                <div className="absolute inset-0 p-6 flex items-center justify-center">
                    <div className={`w-full h-full border-[1.5px] rounded-sm flex flex-col gap-2.5 p-4 relative shadow-sm ${accentClass}`}>
                        <div className={`absolute -top-2 left-4 text-[7px] font-bold tracking-widest px-1 uppercase ${isDark ? 'bg-[#121212] text-[#6B7280]' : 'bg-[#FAFAFA] text-[#9CA3AF]'}`}>Margin</div>
                        <div className={`h-1.5 rounded-full w-[85%] ${isDark ? 'bg-[#4A4A4C]' : 'bg-[#D1D5DB]'}`}></div>
                        <div className={`h-1.5 rounded-full w-full ${isDark ? 'bg-[#4A4A4C]' : 'bg-[#D1D5DB]'}`}></div>
                        <div className={`h-1.5 rounded-full w-full ${isDark ? 'bg-[#4A4A4C]' : 'bg-[#D1D5DB]'}`}></div>
                        <div className={`h-1.5 rounded-full w-[60%] ${isDark ? 'bg-[#4A4A4C]' : 'bg-[#D1D5DB]'}`}></div>
                    </div>
                </div>
            );
        case 'hierarchical':
            return (
                <div className="absolute inset-5 grid grid-cols-4 grid-rows-4 gap-2">
                    <div className={`col-span-4 row-span-2 rounded-md border-[1.5px] flex items-center justify-center shadow-sm ${accentClass} animate-pop-in-center`} style={{ animationDelay: '100ms' }}>
                        <span className="text-[9px] font-black uppercase tracking-wider opacity-80">Primary (H1)</span>
                    </div>
                    <div className={`col-span-2 row-span-2 rounded-md border border-dashed flex items-center justify-center ${borderClass} ${fillClass} animate-pop-in-center`} style={{ animationDelay: '200ms' }}>
                        <span className="text-[7px] font-bold uppercase tracking-wider opacity-50">Secondary</span>
                    </div>
                    <div className={`col-span-2 row-span-2 grid grid-cols-2 gap-2`}>
                         <div className={`rounded-md border border-dashed ${borderClass} ${fillClass} animate-pop-in-center`} style={{ animationDelay: '300ms' }}></div>
                         <div className={`rounded-md border border-dashed ${borderClass} ${fillClass} animate-pop-in-center`} style={{ animationDelay: '400ms' }}></div>
                         <div className={`col-span-2 rounded-md border border-dashed ${borderClass} ${fillClass} animate-pop-in-center`} style={{ animationDelay: '500ms' }}></div>
                    </div>
                </div>
            );
        case 'symmetrical':
            return (
                <div className="absolute inset-5 flex items-center justify-center gap-6">
                    <div className={`w-[40%] h-[90%] rounded-md border-[1.5px] shadow-sm ${accentClass} animate-pop-in-center`}></div>
                    <div className={`absolute h-full w-[1px] border-l border-dashed ${borderClass}`}></div>
                    <div className={`w-[40%] h-[90%] rounded-md border-[1.5px] shadow-sm ${accentClass} animate-pop-in-center`} style={{ animationDelay: '200ms' }}></div>
                </div>
            );
        case 'asymmetrical':
            return (
                <div className="absolute inset-5 flex items-center justify-between px-2">
                    <div className={`w-[55%] h-[90%] rounded-md border border-dashed ${borderClass} ${fillClass} animate-pop-in-center`}></div>
                    <div className="w-[35%] flex flex-col gap-4 h-[90%] justify-center">
                        <div className={`w-full aspect-square rounded-full border-[2px] shadow-sm ${accentClass} animate-pop-in-center`} style={{ animationDelay: '200ms' }}></div>
                        <div className={`w-full h-4 rounded-full ${isDark ? 'bg-[#4A4A4C]' : 'bg-[#D1D5DB]'} animate-pop-in-center`} style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            );
        case 'zpattern':
            return (
                <div className="absolute inset-5 flex flex-col justify-between">
                    <style>{animStyle}</style>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 10,15 L 90,15 L 10,85 L 90,85" fill="none" stroke={svgAccent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="300" strokeDashoffset="300" style={{ animation: 'draw-line 2s ease-in-out forwards 0.2s' }} />
                        <polygon points="86,82 94,85 86,88" fill={svgAccent} className="animate-pop-in-center" style={{ animationDelay: '2000ms' }} />
                    </svg>
                    <div className={`w-full h-[20%] rounded-sm border border-dashed ${borderClass} ${fillClass} opacity-40`}></div>
                    <div className={`w-full h-[20%] rounded-sm border border-dashed ${borderClass} ${fillClass} opacity-40`}></div>
                </div>
            );
        case 'fpattern':
            return (
                <div className="absolute inset-5 flex flex-col gap-3">
                    <style>{animStyle}</style>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <line x1="8" y1="8" x2="8" y2="92" stroke={svgAccent} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="100" strokeDashoffset="100" style={{ animation: 'draw-line 1s ease-out forwards' }} />
                        <path d="M 8,15 L 85,15 M 8,45 L 60,45 M 8,75 L 35,75" fill="none" stroke={svgAccent} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="200" strokeDashoffset="200" style={{ animation: 'draw-line 1.5s ease-out forwards 0.5s' }} />
                    </svg>
                    <div className={`w-full h-6 rounded-sm border border-dashed ${borderClass} ${fillClass} opacity-40`}></div>
                    <div className={`w-[75%] h-6 rounded-sm border border-dashed ${borderClass} ${fillClass} opacity-40`}></div>
                    <div className={`w-[45%] h-6 rounded-sm border border-dashed ${borderClass} ${fillClass} opacity-40`}></div>
                </div>
            );
        case 'lpattern':
            return (
                <div className="absolute inset-5">
                    <style>{animStyle}</style>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 15,10 L 15,85 L 90,85" fill="none" stroke={svgAccent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="200" strokeDashoffset="200" style={{ animation: 'draw-line 1.5s ease-out forwards 0.2s' }} />
                        <polygon points="86,81 94,85 86,89" fill={svgAccent} className="animate-pop-in-center" style={{ animationDelay: '1500ms' }} />
                    </svg>
                    <div className={`absolute top-[15%] right-[15%] w-[50%] h-[50%] rounded-md border-[1.5px] ${accentClass} flex items-center justify-center animate-pop-in-center shadow-lg`} style={{ animationDelay: '800ms' }}>
                         <span className="text-[9px] font-black tracking-widest uppercase opacity-80">Subject</span>
                    </div>
                </div>
            );
        case 'ypattern':
            return (
                <div className="absolute inset-5 flex flex-col items-center justify-center">
                    <style>{animStyle}</style>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 10,10 L 50,50 M 90,10 L 50,50 M 50,50 L 50,90" fill="none" stroke={svgAccent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="150" strokeDashoffset="150" style={{ animation: 'draw-line 1.5s ease-out forwards' }} />
                        <circle cx="50" cy="50" r="5" fill={svgFill} stroke={svgAccent} strokeWidth="2" className="animate-pop-in-center" style={{ animationDelay: '1000ms' }} />
                        <polygon points="45,86 55,86 50,94" fill={svgAccent} className="animate-pop-in-center" style={{ animationDelay: '1500ms' }} />
                    </svg>
                </div>
            );
        case 'bento':
            return (
                <div className="absolute inset-4 grid grid-cols-4 grid-rows-3 gap-2">
                    <div className={`col-span-2 row-span-2 rounded-[10px] border-[1.5px] shadow-sm ${accentClass} animate-pop-in-center`} style={{ animationDelay: '100ms' }}></div>
                    <div className={`col-span-1 row-span-1 rounded-[10px] border border-dashed ${borderClass} ${fillClass} animate-pop-in-center`} style={{ animationDelay: '200ms' }}></div>
                    <div className={`col-span-1 row-span-2 rounded-[10px] border border-dashed ${borderClass} ${fillClass} animate-pop-in-center`} style={{ animationDelay: '300ms' }}></div>
                    <div className={`col-span-1 row-span-1 rounded-[10px] border border-dashed ${borderClass} ${fillClass} animate-pop-in-center`} style={{ animationDelay: '400ms' }}></div>
                    <div className={`col-span-2 row-span-1 rounded-[10px] border border-dashed ${borderClass} ${fillClass} animate-pop-in-center`} style={{ animationDelay: '500ms' }}></div>
                    <div className={`col-span-2 row-span-1 rounded-[10px] border border-dashed ${borderClass} ${fillClass} animate-pop-in-center`} style={{ animationDelay: '600ms' }}></div>
                </div>
            );
        case 'masonry':
            return (
                <div className="absolute inset-5 flex gap-2">
                    <div className="flex-1 flex flex-col gap-2">
                        <div className={`w-full h-[40%] rounded-md border border-dashed ${borderClass} ${fillClass} animate-pop-in-center`} style={{ animationDelay: '100ms' }}></div>
                        <div className={`w-full h-[60%] rounded-md border border-dashed ${borderClass} ${fillClass} animate-pop-in-center`} style={{ animationDelay: '200ms' }}></div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <div className={`w-full h-[65%] rounded-md border-[1.5px] shadow-sm ${accentClass} animate-pop-in-center`} style={{ animationDelay: '300ms' }}></div>
                        <div className={`w-full h-[35%] rounded-md border border-dashed ${borderClass} ${fillClass} animate-pop-in-center`} style={{ animationDelay: '400ms' }}></div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <div className={`w-full h-[30%] rounded-md border border-dashed ${borderClass} ${fillClass} animate-pop-in-center`} style={{ animationDelay: '500ms' }}></div>
                        <div className={`w-full h-[50%] rounded-md border border-dashed ${borderClass} ${fillClass} animate-pop-in-center`} style={{ animationDelay: '600ms' }}></div>
                        <div className={`w-full h-[20%] rounded-md border border-dashed ${borderClass} ${fillClass} animate-pop-in-center`} style={{ animationDelay: '700ms' }}></div>
                    </div>
                </div>
            );
        default:
            return null;
    }
};

const exportLayoutSVG = (id, name, orientation) => {
    const w = orientation === 'portrait' ? 1080 : orientation === 'square' ? 1080 : 1920;
    const h = orientation === 'portrait' ? 1920 : orientation === 'square' ? 1080 : 1080;
    const stroke = '#0277C5'; 
    const guide = '#9CA3AF'; 
    let svg = '';

    const rect = (x,y,width,height,c,d='', sw=2) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="none" stroke="${c}" stroke-width="${sw}" ${d ? `stroke-dasharray="${d}"` : ''} />`;
    const line = (x1,y1,x2,y2,c,d='', sw=2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${sw}" ${d ? `stroke-dasharray="${d}"` : ''} />`;
    const circle = (cx,cy,r,f,c='none',sw=0) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" stroke="${c}" stroke-width="${sw}" />`;

    switch(id) {
        case 'thirds':
            svg += line(w/3,0,w/3,h,guide,'10,10') + line(w*2/3,0,w*2/3,h,guide,'10,10');
            svg += line(0,h/3,w,h/3,guide,'10,10') + line(0,h*2/3,w,h*2/3,guide,'10,10');
            [ [w/3,h/3], [w*2/3,h/3], [w/3,h*2/3], [w*2/3,h*2/3] ].forEach(([x,y]) => { svg += circle(x,y,15,stroke); });
            break;
        case 'golden':
            const gw = w/3.618, gh = h/3.618;
            svg += line(gw,0,gw,h,guide,'10,10') + line(gw+gw*1.618,0,gw+gw*1.618,h,guide,'10,10');
            svg += line(0,gh,w,gh,guide,'10,10') + line(0,gh+gh*1.618,w,gh+gh*1.618,guide,'10,10');
            svg += rect(gw,gh,gw*1.618,gh*1.618,stroke,'',4);
            break;
        case 'fibonacci':
            const scaleP = Math.min(w/61.8, h/100) * 0.9;
            const txP = (w - 61.8*scaleP)/2;
            const tyP = (h - 100*scaleP)/2;
            const scaleL = Math.min(w/100, h/61.8) * 0.9;
            const txL = (w - 100*scaleL)/2;
            const tyL = (h - 61.8*scaleL)/2;
            const fibPath = `M 0,61.8 A 61.8,61.8 0 0,1 61.8,0 A 38.2,38.2 0 0,1 100,38.2 A 23.6,23.6 0 0,1 76.4,61.8 A 14.6,14.6 0 0,1 61.8,47.2 A 9.0,9.0 0 0,1 70.8,38.2 A 5.6,5.6 0 0,1 76.4,43.8`;
            const fibGrid = `
                <rect x="0" y="0" width="61.8" height="61.8" fill="none" stroke="${guide}" stroke-width="0.5" stroke-dasharray="2" />
                <rect x="61.8" y="0" width="38.2" height="38.2" fill="none" stroke="${guide}" stroke-width="0.5" stroke-dasharray="2" />
                <rect x="76.4" y="38.2" width="23.6" height="23.6" fill="none" stroke="${guide}" stroke-width="0.5" stroke-dasharray="2" />
                <rect x="61.8" y="47.2" width="14.6" height="14.6" fill="none" stroke="${guide}" stroke-width="0.5" stroke-dasharray="2" />
                <path d="${fibPath}" fill="none" stroke="${stroke}" stroke-width="1.5" />
            `;
            if (orientation === 'portrait') {
                svg += `<g transform="translate(${txP}, ${tyP}) scale(${scaleP})"><g transform="translate(61.8, 0) rotate(90)">${fibGrid}</g></g>`;
            } else {
                svg += `<g transform="translate(${txL}, ${tyL}) scale(${scaleL})">${fibGrid}</g>`;
            }
            break;
        case 'col12': {
            const m = w * 0.05; 
            const g = (w - 2*m) * 0.02; 
            const cw = (w - 2*m - 11*g) / 12;
            for(let i=0; i<12; i++) svg += rect(m + i*(cw+g), h*0.05, cw, h*0.9, guide, '10,10');
            break;
        }
        case 'modular': {
            const mx = w * 0.05, my = h * 0.05;
            const gw = (w - 2*mx) * 0.02, gh = (h - 2*my) * 0.02;
            const cw = (w - 2*mx - 5*gw) / 6;
            const rh = (h - 2*my - 3*gh) / 4;
            for(let r=0; r<4; r++) {
                for(let c=0; c<6; c++) {
                    svg += rect(mx + c*(cw+gw), my + r*(rh+gh), cw, rh, guide, '10,10');
                }
            }
            break;
        }
        case 'baseline':
            const rows = 12;
            const rowH = h / rows;
            for(let i=1; i<rows; i++) svg += line(0, i*rowH, w, i*rowH, stroke, '10,10');
            break;
        case 'diagonal':
            svg += line(0,0, w,h, guide, '10,10') + line(w,0, 0,h, guide, '10,10');
            svg += `<polygon points="0,${h} ${w},${h} ${w},0" fill="${stroke}" opacity="0.1" />`;
            svg += line(0,h, w,0, stroke, '', 4);
            break;
        case 'radial':
            const cx = w/2, cy = h/2;
            const maxR = Math.min(w,h) * 0.45;
            svg += circle(cx,cy, maxR*0.3, 'none', guide, 2) + circle(cx,cy, maxR*0.6, 'none', guide, 2) + circle(cx,cy, maxR, 'none', guide, 2);
            for(let i=0; i<8; i++) {
                const ang = (i*45)*Math.PI/180;
                svg += line(cx, cy, cx + maxR*Math.cos(ang), cy + maxR*Math.sin(ang), guide, '10,10');
            }
            svg += circle(cx,cy, 12, stroke);
            break;
        case 'triangle':
            const sqSize = Math.min(w,h) / 5;
            for(let i=0; i<=w/sqSize; i++) svg += line(i*sqSize,0, i*sqSize,h, guide, '10,10');
            for(let i=0; i<=h/sqSize; i++) svg += line(0,i*sqSize, w,i*sqSize, guide, '10,10');
            for(let i=-10; i<20; i++) {
                svg += line(0, i*sqSize, w, i*sqSize + w, guide, '5,5');
                svg += line(0, i*sqSize, w, i*sqSize - w, guide, '5,5');
            }
            svg += `<polygon points="${w/2},${h*0.2} ${w/2 + h*0.3},${h*0.8} ${w/2 - h*0.3},${h*0.8}" fill="${stroke}" opacity="0.2" stroke="${stroke}" stroke-width="4" />`;
            break;
        case 'manuscript':
            svg += rect(w*0.15, h*0.15, w*0.7, h*0.7, guide, '20,20', 3);
            break;
        case 'hierarchical':
            const pad = w*0.05;
            svg += rect(pad, pad, w-2*pad, h*0.2, stroke, '10,10', 4);
            svg += rect(pad, pad + h*0.25, w*0.6, h*0.65, guide, '10,10', 2);
            svg += rect(pad + w*0.65, pad + h*0.25, w*0.25, h*0.18, guide, '10,10', 2);
            svg += rect(pad + w*0.65, pad + h*0.48, w*0.25, h*0.18, guide, '10,10', 2);
            svg += rect(pad + w*0.65, pad + h*0.71, w*0.25, h*0.19, guide, '10,10', 2);
            break;
        case 'symmetrical':
            svg += rect(w*0.05, h*0.05, w*0.425, h*0.9, guide, '10,10', 2);
            svg += rect(w*0.525, h*0.05, w*0.425, h*0.9, guide, '10,10', 2);
            break;
        case 'asymmetrical':
            svg += rect(w*0.05, h*0.05, w*0.6, h*0.9, guide, '10,10', 2);
            svg += rect(w*0.7, h*0.05, w*0.25, h*0.4, stroke, '10,10', 4);
            svg += rect(w*0.7, h*0.5, w*0.25, h*0.45, guide, '10,10', 2);
            break;
        case 'zpattern':
            svg += rect(w*0.1, h*0.1, w*0.8, h*0.1, guide, '10,10');
            svg += rect(w*0.1, h*0.8, w*0.8, h*0.1, guide, '10,10');
            svg += line(w*0.1, h*0.15, w*0.9, h*0.15, stroke, '', 6);
            svg += line(w*0.9, h*0.15, w*0.1, h*0.85, stroke, '', 6);
            svg += line(w*0.1, h*0.85, w*0.9, h*0.85, stroke, '', 6);
            svg += `<polygon points="${w*0.85},${h*0.8} ${w*0.92},${h*0.85} ${w*0.85},${h*0.9}" fill="${stroke}" />`;
            svg += circle(w*0.1, h*0.15, 12, stroke) + circle(w*0.9, h*0.85, 12, stroke);
            break;
        case 'fpattern':
            svg += rect(w*0.1, h*0.1, w*0.8, h*0.1, guide, '10,10');
            svg += rect(w*0.1, h*0.3, w*0.6, h*0.1, guide, '10,10');
            svg += rect(w*0.1, h*0.5, w*0.4, h*0.1, guide, '10,10');
            svg += line(w*0.05, h*0.05, w*0.05, h*0.9, stroke, '', 6);
            svg += line(w*0.05, h*0.15, w*0.9, h*0.15, stroke, '', 4);
            svg += line(w*0.05, h*0.35, w*0.7, h*0.35, stroke, '', 4);
            svg += line(w*0.05, h*0.55, w*0.5, h*0.55, stroke, '', 4);
            break;
        case 'lpattern':
            svg += line(w*0.15, h*0.1, w*0.15, h*0.85, stroke, '', 6);
            svg += line(w*0.15, h*0.85, w*0.9, h*0.85, stroke, '', 6);
            svg += circle(w*0.15, h*0.1, 12, stroke) + circle(w*0.15, h*0.85, 12, stroke) + circle(w*0.9, h*0.85, 12, stroke);
            svg += rect(w*0.3, h*0.2, w*0.5, h*0.5, guide, '10,10', 2);
            break;
        case 'ypattern':
            const cxY = w/2, cyY = h*0.45;
            svg += line(w*0.1, h*0.1, cxY, cyY, stroke, '', 6);
            svg += line(w*0.9, h*0.1, cxY, cyY, stroke, '', 6);
            svg += line(cxY, cyY, cxY, h*0.9, stroke, '', 6);
            svg += circle(w*0.1, h*0.1, 10, stroke) + circle(w*0.9, h*0.1, 10, stroke) + circle(cxY, h*0.9, 10, stroke);
            svg += circle(cxY, cyY, 15, stroke);
            break;
        case 'bento': {
            const sp = Math.min(w,h) * 0.02, m = w * 0.05;
            const bCw = (w - 2*m - 3*sp)/4, bRh = (h - 2*m - 3*sp)/4;
            svg += rect(m, m, bCw*2+sp, bRh*2+sp, guide, '10,10', 2);
            svg += rect(m+bCw*2+sp*2, m, bCw*2+sp, bRh, stroke, '10,10', 4);
            svg += rect(m+bCw*2+sp*2, m+bRh+sp, bCw, bRh*2+sp, guide, '10,10', 2);
            svg += rect(m+bCw*3+sp*3, m+bRh+sp, bCw, bRh, guide, '10,10', 2);
            svg += rect(m+bCw*3+sp*3, m+bRh*2+sp*2, bCw, bRh, guide, '10,10', 2);
            svg += rect(m, m+bRh*2+sp*2, bCw*3+sp*2, bRh, guide, '10,10', 2);
            break;
        }
        case 'masonry': {
            const m = w * 0.05, mSp = (w - 2*m) * 0.02;
            const mCw = (w - 2*m - 2*mSp)/3, cH = h - 2*m;
            svg += rect(m, m, mCw, cH*0.35, guide, '10,10', 2);
            svg += rect(m, m+cH*0.35+mSp, mCw, cH*0.65-mSp, guide, '10,10', 2);
            svg += rect(m+mCw+mSp, m, mCw, cH*0.55, stroke, '10,10', 4);
            svg += rect(m+mCw+mSp, m+cH*0.55+mSp, mCw, cH*0.25, guide, '10,10', 2);
            svg += rect(m+mCw+mSp, m+cH*0.8+mSp*2, mCw, cH*0.2-mSp*2, guide, '10,10', 2);
            svg += rect(m+mCw*2+mSp*2, m, mCw, cH*0.4, guide, '10,10', 2);
            svg += rect(m+mCw*2+mSp*2, m+cH*0.4+mSp, mCw, cH*0.6-mSp, guide, '10,10', 2);
            break;
        }
    }

    const svgStr = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <rect width="100%" height="100%" fill="#ffffff" />
    ${svg}
</svg>`;

    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Grid_${name.replace(/\s+/g, '_')}_${orientation}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerHaptic();
};

// ==========================================
// 🌟 MAIN COMPONENT
// ==========================================

export default function ToolsView({ isDarkMode }) {
    const { t, lang } = useLanguage(); 
    
    const [toolTab, setToolTab] = useState(() => {
        if (typeof window !== 'undefined') {
            const target = localStorage.getItem('myDesign_target_subtab');
            if (target) return target;
        }
        return 'color';
    });
    
    const [baseHsl, setBaseHsl] = useState({ h: 210, s: 80, l: 50 });
    const [harmonyType, setHarmonyType] = useState('complementary');
    const [hexInput, setHexInput] = useState('');
    const [layoutOrientation, setLayoutOrientation] = useState('square'); 
    
    const allHarmonies = ['complementary', 'split-complementary', 'analogous', 'accented-analogous', 'triadic', 'tetradic', 'square', 'tints', 'shades', 'tones'];
    const [showExportModal, setShowExportModal] = useState(false);
    const [selectedExports, setSelectedExports] = useState([...allHarmonies]);
    const [isExporting, setIsExporting] = useState(false);

    // Modal States
    const [selectedLayoutDetails, setSelectedLayoutDetails] = useState(null);
    const [dragY, setDragY] = useState(0);
    const dragStartRef = useRef(0);

    useEffect(() => {
        localStorage.removeItem('myDesign_target_subtab');
        const handleSubTabSwitch = (e) => {
            if (e.detail) {
                setToolTab(e.detail);
            }
        };
        window.addEventListener('switchToolSubTab', handleSubTabSwitch);
        return () => window.removeEventListener('switchToolSubTab', handleSubTabSwitch);
    }, []);

    useEffect(() => {
        if (document.activeElement?.id !== "hex-input") {
            setHexInput(hslToHex(baseHsl.h, baseHsl.s, baseHsl.l));
        }
    }, [baseHsl]);

    const handleHexChange = (e) => {
        let val = e.target.value.toUpperCase();
        if (!val.startsWith('#')) val = '#' + val;
        setHexInput(val);
        if (/^#[0-9A-F]{6}$/i.test(val)) {
            setBaseHsl(hexToHsl(val));
        }
    };

    const getHarmonyColors = () => {
        const h = baseHsl.h, s = baseHsl.s, l = baseHsl.l;
        const norm = (deg) => Math.round((deg + 360) % 360);
        const c = (hd, sd=s, ld=l) => ({ h: norm(hd), s: Math.round(sd), l: Math.round(ld), hex: hslToHex(norm(hd), sd, ld) });
        const base = c(h);

        switch (harmonyType) {
            case 'complementary': return [base, c(h + 180)];
            case 'split-complementary': return [base, c(h + 150), c(h + 210)];
            case 'analogous': return [c(h - 30), base, c(h + 30)];
            case 'accented-analogous': return [c(h - 30), base, c(h + 30), c(h + 180)];
            case 'triadic': return [base, c(h + 120), c(h + 240)];
            case 'tetradic': return [base, c(h + 60), c(h + 180), c(h + 240)];
            case 'square': return [base, c(h + 90), c(h + 180), c(h + 270)];
            case 'tints': return Array.from({length: 9}).map((_, i) => c(h, s, l + (96 - l) * (i / 8)));
            case 'shades': return Array.from({length: 9}).map((_, i) => c(h, s, l - (l - 4) * (i / 8)));
            case 'tones': return Array.from({length: 9}).map((_, i) => c(h, s - (s - 4) * (i / 8), l));
            default: return [base];
        }
    };

    const generatedPalette = getHarmonyColors();

    const copyToClipboard = (text) => {
        const el = document.createElement('textarea'); el.value = text; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
        triggerHaptic();
    };

    const exportToPDF = async () => {
        setIsExporting(true);
        triggerHaptic();
        try {
            if (typeof window === 'undefined') return;
            if (!window.jspdf) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4', compress: false }); 

            let y = 20;
            doc.setFontSize(22);
            doc.setTextColor(30, 30, 30);
            doc.text("Graphic Design - Custom Color Palettes", 20, y);
            y += 10;
            
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            const baseHex = hslToHex(baseHsl.h, baseHsl.s, baseHsl.l);
            doc.text(`Base Color: H:${baseHsl.h}° S:${baseHsl.s}% L:${baseHsl.l}%   |   HEX: ${baseHex}`, 20, y);
            y += 15;

            const getColorsForType = (type) => {
                const h = baseHsl.h, s = baseHsl.s, l = baseHsl.l;
                const norm = (deg) => Math.round((deg + 360) % 360);
                const c = (hd, sd=s, ld=l) => ({ hex: hslToHex(norm(hd), sd, ld) });
                const base = c(h);
                switch (type) {
                    case 'complementary': return [base, c(h + 180)];
                    case 'split-complementary': return [base, c(h + 150), c(h + 210)];
                    case 'analogous': return [c(h - 30), base, c(h + 30)];
                    case 'accented-analogous': return [c(h - 30), base, c(h + 30), c(h + 180)];
                    case 'triadic': return [base, c(h + 120), c(h + 240)];
                    case 'tetradic': return [base, c(h + 60), c(h + 180), c(h + 240)];
                    case 'square': return [base, c(h + 90), c(h + 180), c(h + 270)];
                    case 'tints': return Array.from({length: 9}).map((_, i) => c(h, s, l + (96 - l) * (i / 8)));
                    case 'shades': return Array.from({length: 9}).map((_, i) => c(h, s, l - (l - 4) * (i / 8)));
                    case 'tones': return Array.from({length: 9}).map((_, i) => c(h, s - (s - 4) * (i / 8), l));
                    default: return [base];
                }
            };

            const shortTypes = ['complementary', 'split-complementary', 'analogous', 'accented-analogous', 'triadic', 'tetradic', 'square'];
            const longTypes = ['tints', 'shades', 'tones'];
            
            const selectedShort = selectedExports.filter(t => shortTypes.includes(t));
            const selectedLong = selectedExports.filter(t => longTypes.includes(t));

            let currentY = 45;

            if (selectedShort.length > 0) {
                const colWidth = 90;
                const boxSize = 13;
                const spacing = 3;

                selectedShort.forEach((type, index) => {
                    const col = index % 2;
                    const row = Math.floor(index / 2);
                    const xPos = 20 + (col * colWidth);
                    const yPos = currentY + (row * 30);

                    doc.setFontSize(10);
                    doc.setTextColor(50, 50, 50);
                    doc.text(type.toUpperCase().replace(/-/g, ' '), xPos, yPos);

                    const colors = getColorsForType(type);
                    let currentBoxX = xPos;
                    const colorsY = yPos + 4;

                    colors.forEach((color) => {
                        const hex = color.hex;
                        const r = parseInt(hex.substring(1,3), 16);
                        const g = parseInt(hex.substring(3,5), 16);
                        const b = parseInt(hex.substring(5,7), 16);
                        
                        doc.setFillColor(r, g, b);
                        doc.rect(currentBoxX, colorsY, boxSize, boxSize, 'F');
                        
                        doc.setDrawColor(220, 220, 220);
                        doc.setLineWidth(0.3);
                        doc.rect(currentBoxX, colorsY, boxSize, boxSize, 'S');

                        doc.setFontSize(7);
                        doc.setTextColor(120, 120, 120);
                        doc.text(hex, currentBoxX, colorsY + boxSize + 4);
                        
                        currentBoxX += boxSize + spacing;
                    });
                });
                currentY += Math.ceil(selectedShort.length / 2) * 30 + 5;
            }

            if (selectedShort.length > 0 && selectedLong.length > 0) {
                doc.setDrawColor(80, 80, 80); 
                doc.setLineWidth(0.5);
                doc.line(20, currentY, 190, currentY);
                currentY += 12;
            }

            if (selectedLong.length > 0) {
                const boxSize = 16;
                const spacing = 2.5;

                selectedLong.forEach((type) => {
                    if (currentY > 260) { doc.addPage(); currentY = 20; } 

                    doc.setFontSize(10);
                    doc.setTextColor(50, 50, 50);
                    doc.text(type.toUpperCase().replace(/-/g, ' '), 20, currentY);
                    
                    const colors = getColorsForType(type);
                    let currentBoxX = 20;
                    const colorsY = currentY + 4;

                    colors.forEach((color) => {
                        const r = parseInt(color.hex.substring(1,3), 16);
                        const g = parseInt(color.hex.substring(3,5), 16);
                        const b = parseInt(color.hex.substring(5,7), 16);
                        
                        doc.setFillColor(r, g, b);
                        doc.rect(currentBoxX, colorsY, boxSize, boxSize, 'F');
                        
                        doc.setDrawColor(220, 220, 220);
                        doc.setLineWidth(0.3);
                        doc.rect(currentBoxX, colorsY, boxSize, boxSize, 'S');
                        
                        currentBoxX += boxSize + spacing;
                    });
                    currentY += boxSize + 15;
                });
            }

            const pageHeight = doc.internal.pageSize.height || 297;
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text("Generated by My Design Professional Tool", 20, pageHeight - 10);

            doc.save(`GraphicDesign_Palette_${baseHex}.pdf`);
            setShowExportModal(false);
        } catch (error) {
            console.error("PDF Export failed", error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <>
        {/* 🌟 STATIC TAB BAR - SECURELY FIXED INTO THE DOM 🌟 */}
        <div className="w-full flex justify-center pt-2 pb-6 px-4">
            <div className={`p-1.5 rounded-[18px] border flex gap-1 w-full max-w-[350px] shadow-sm ${isDarkMode ? 'bg-[#1E1E1E] border-[#3A3A3C]' : 'bg-[#FFFFFF] border-[#E0E0E0]'}`}>
                {['color', 'layout', 'ratio'].map(t_id => (
                    <button 
                        key={t_id} 
                        onClick={() => { 
                            setToolTab(t_id); 
                            triggerHaptic(); 
                        }} 
                        className={`flex-1 py-2.5 rounded-[14px] text-[11px] font-bold font-khmer uppercase transition-all ${toolTab === t_id ? (isDarkMode ? 'bg-[#41B6E6] text-[#121212] shadow-md' : 'bg-[#0277C5] text-white shadow-md') : (isDarkMode ? 'text-[#9AA0A6] hover:bg-[#2C2C2C]' : 'text-[#5F6368] hover:bg-[#FAFAFA]')}`}
                    >
                        {t_id === 'color' ? t('tools_color') : t_id === 'layout' ? t('tools_layout') : t('tools_sizes')}
                    </button>
                ))}
            </div>
        </div>

        <div className="flex flex-col h-full animate-fade-in-up pb-10 w-full">

            {/* 🌟 OPTIMIZED FULL-SCREEN COLOR PANEL 🌟 */}
            {toolTab === 'color' && (
                <div className={`flex flex-col gap-3 max-w-[95%] sm:max-w-lg mx-auto w-full px-5 py-6 sm:p-8 rounded-[32px] border shadow-2xl animate-fade-in-up ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E0E0E0]'}`}>
                    
                    <CustomColorWheel hsl={baseHsl} setHsl={setBaseHsl} isDarkMode={isDarkMode} />
                    
                    <div className="flex-1 space-y-4 px-2 pt-2 w-full mx-auto">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-[14px] shadow-md border-2 shrink-0 transition-colors" style={{ backgroundColor: hslToHex(baseHsl.h, baseHsl.s, baseHsl.l), borderColor: isDarkMode ? '#3A3A3C' : '#E0E0E0' }}></div>
                            <div className="flex flex-col flex-1">
                                <span className={`text-[15px] font-black uppercase tracking-wider ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>{getColorName(baseHsl.h, baseHsl.s, baseHsl.l)}</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#5F6368]' : 'text-[#9AA0A6]'}`}>HEX:</span>
                                    <input 
                                        id="hex-input"
                                        type="text" 
                                        value={hexInput} 
                                        onChange={handleHexChange}
                                        maxLength={7}
                                        className={`w-20 text-[13px] font-mono font-bold bg-transparent outline-none uppercase border-b transition-colors ${isDarkMode ? 'text-[#9AA0A6] border-[#3A3A3C] focus:border-[#41B6E6]' : 'text-[#5F6368] border-[#D1D5DB] focus:border-[#0277C5]'}`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className={`w-4 text-[12px] font-black ${isDarkMode ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>H:</span>
                            <CustomSlider min={0} max={360} value={baseHsl.h} onChange={v => setBaseHsl(p => ({...p, h: v}))} gradient="linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)" />
                            <input type="number" min="0" max="360" value={baseHsl.h} onChange={e => setBaseHsl(p => ({...p, h: Math.max(0, Math.min(360, Number(e.target.value)))}))} className={`w-[52px] text-center text-[12px] font-mono font-bold rounded-[10px] py-2 shadow-inner border outline-none transition-colors ${isDarkMode ? 'bg-[#121212] text-[#E3E3E3] border-[#2C2C2C] focus:border-[#41B6E6]' : 'bg-[#F3F4F6] text-[#1A1C1E] border-[#E0E0E0] focus:border-[#0277C5]'}`} />
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`w-4 text-[12px] font-black ${isDarkMode ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>S:</span>
                            <CustomSlider min={0} max={100} value={baseHsl.s} onChange={v => setBaseHsl(p => ({...p, s: v}))} gradient={`linear-gradient(to right, hsl(${baseHsl.h}, 0%, ${baseHsl.l}%), hsl(${baseHsl.h}, 100%, ${baseHsl.l}%))`} />
                            <input type="number" min="0" max="100" value={baseHsl.s} onChange={e => setBaseHsl(p => ({...p, s: Math.max(0, Math.min(100, Number(e.target.value)))}))} className={`w-[52px] text-center text-[12px] font-mono font-bold rounded-[10px] py-2 shadow-inner border outline-none transition-colors ${isDarkMode ? 'bg-[#121212] text-[#E3E3E3] border-[#2C2C2C] focus:border-[#41B6E6]' : 'bg-[#F3F4F6] text-[#1A1C1E] border-[#E0E0E0] focus:border-[#0277C5]'}`} />
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`w-4 text-[12px] font-black ${isDarkMode ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>L:</span>
                            <CustomSlider min={0} max={100} value={baseHsl.l} onChange={v => setBaseHsl(p => ({...p, l: v}))} gradient={`linear-gradient(to right, #000000, hsl(${baseHsl.h}, ${baseHsl.s}%, 50%), #ffffff)`} />
                            <input type="number" min="0" max="100" value={baseHsl.l} onChange={e => setBaseHsl(p => ({...p, l: Math.max(0, Math.min(100, Number(e.target.value)))}))} className={`w-[52px] text-center text-[12px] font-mono font-bold rounded-[10px] py-2 shadow-inner border outline-none transition-colors ${isDarkMode ? 'bg-[#121212] text-[#E3E3E3] border-[#2C2C2C] focus:border-[#41B6E6]' : 'bg-[#F3F4F6] text-[#1A1C1E] border-[#E0E0E0] focus:border-[#0277C5]'}`} />
                        </div>
                    </div>

                    <div className={`mt-2 pt-6 border-t space-y-5 ${isDarkMode ? 'border-[#2C2C2C]' : 'border-[#E0E0E0]'}`}>
                        <div className="flex flex-row justify-between items-center gap-2">
                            {/* 🌟 CUSTOM IPHONE-STYLE POPOVER DROPDOWN 🌟 */}
                            <CustomHarmonySelect value={harmonyType} onChange={setHarmonyType} isDarkMode={isDarkMode} />
                            
                            <button onClick={() => { setShowExportModal(true); triggerHaptic(); }} className={`p-2.5 rounded-xl border shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 text-[11px] font-bold font-khmer uppercase tracking-wider ${isDarkMode ? 'bg-[#121212] border-[#3A3A3C] text-[#C55002] hover:bg-[#2C2C2C]' : 'bg-[#FAFAFA] border-[#D1D5DB] text-[#C55002] hover:bg-[#F3F4F6]'}`} title="Export to PDF">
                                <Download size={16} /> <span className="hidden sm:block">PDF</span>
                            </button>
                        </div>
                        
                        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center py-2">
                            {generatedPalette.map((c, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => copyToClipboard(c.hex)}>
                                    <div className={`rounded-xl shadow-lg border-2 transition-transform group-hover:scale-110 active:scale-95 flex items-center justify-center ${generatedPalette.length > 6 ? 'w-11 h-11' : 'w-14 h-14'}`} style={{ backgroundColor: c.hex, borderColor: isDarkMode ? '#3A3A3C' : '#E0E0E0' }}>
                                        <Copy size={16} className="opacity-0 group-hover:opacity-100 text-white mix-blend-difference transition-opacity" />
                                    </div>
                                    <span className={`text-[9px] font-mono font-bold tracking-widest ${isDarkMode ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>{c.hex}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {toolTab === 'layout' && (
                <div className="flex flex-col gap-6 animate-fade-in-up w-full max-w-6xl mx-auto">
                    <div className="flex justify-between items-center px-2">
                        <h4 className={`text-sm font-bold font-khmer flex items-center gap-2 ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>
                            <Grid size={16} className={isDarkMode ? "text-[#41B6E6]" : "text-[#0277C5]"}/> {t('tools_orientation')}
                        </h4>
                        <div className={`flex p-1 rounded-xl border shadow-sm ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#FAFAFA] border-[#E0E0E0]'}`}>
                            <button onClick={() => { setLayoutOrientation('landscape'); triggerHaptic(); }} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${layoutOrientation === 'landscape' ? (isDarkMode ? 'bg-[#41B6E6] text-[#121212] shadow-md' : 'bg-[#0277C5] text-white shadow-md') : (isDarkMode ? 'text-[#9AA0A6] hover:text-[#E3E3E3]' : 'text-[#5F6368] hover:text-[#1A1C1E]')}`}>
                                <Monitor size={14} /> <span className="hidden sm:block">{t('tools_landscape')}</span>
                            </button>
                            <button onClick={() => { setLayoutOrientation('portrait'); triggerHaptic(); }} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${layoutOrientation === 'portrait' ? (isDarkMode ? 'bg-[#41B6E6] text-[#121212] shadow-md' : 'bg-[#0277C5] text-white shadow-md') : (isDarkMode ? 'text-[#9AA0A6] hover:text-[#E3E3E3]' : 'text-[#5F6368] hover:text-[#1A1C1E]')}`}>
                                <Smartphone size={14} /> <span className="hidden sm:block">{t('tools_portrait')}</span>
                            </button>
                            <button onClick={() => { setLayoutOrientation('square'); triggerHaptic(); }} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${layoutOrientation === 'square' ? (isDarkMode ? 'bg-[#41B6E6] text-[#121212] shadow-md' : 'bg-[#0277C5] text-white shadow-md') : (isDarkMode ? 'text-[#9AA0A6] hover:text-[#E3E3E3]' : 'text-[#5F6368] hover:text-[#1A1C1E]')}`}>
                                <Square size={14} /> <span className="hidden sm:block">{t('tools_square')}</span>
                            </button>
                        </div>
                    </div>

                    <div className={`grid gap-4 w-full transition-all duration-500 ease-spring ${layoutOrientation === 'portrait' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto' : layoutOrientation === 'square' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-5xl mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'}`}>
                        {layoutTypes.map((l, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => { triggerHaptic(); setSelectedLayoutDetails(l); }}
                                className={`p-4 sm:p-5 rounded-[24px] border shadow-md flex flex-col gap-4 cursor-pointer hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 group ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] hover:border-[#41B6E6]/30' : 'bg-white border-[#E0E0E0] hover:border-[#0277C5]/30'}`} 
                                style={{animationDelay: `${idx * 30}ms`}}
                            >
                                <div className="flex flex-col gap-1 min-h-[44px]">
                                    <h4 className={`font-bold text-[13px] sm:text-[15px] flex justify-between items-start gap-2 transition-colors ${lang === 'km' ? 'font-khmer' : 'font-sans'} ${isDarkMode ? 'text-[#E3E3E3] group-hover:text-[#41B6E6]' : 'text-[#1A1C1E] group-hover:text-[#0277C5]'}`}>
                                        <span className="truncate">{l.name}</span> 
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className="opacity-50 font-normal text-[9px] sm:text-xs font-khmer">{lang === 'km' ? l.kh : ''}</span>
                                            
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); exportLayoutSVG(l.id, l.name, layoutOrientation); }} 
                                                className={`p-1.5 rounded-md transition-colors border ${isDarkMode ? 'border-[#3A3A3C] text-[#9AA0A6] hover:bg-[#41B6E6] hover:text-[#121212] hover:border-[#41B6E6]' : 'border-[#D1D5DB] text-[#5F6368] hover:bg-[#0277C5] hover:text-white hover:border-[#0277C5]'}`} 
                                                title="Download Grid as SVG"
                                            >
                                                <Download size={12} />
                                            </button>
                                        </div>
                                    </h4>
                                    <p className={`text-[10px] sm:text-[11px] leading-relaxed line-clamp-2 opacity-70 ${lang === 'km' ? 'font-khmer' : 'font-sans'} ${isDarkMode ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>
                                        {lang === 'en' ? (l.desc_en || l.desc) : l.desc}
                                    </p>
                                </div>
                                <div className={`${layoutOrientation === 'portrait' ? 'aspect-[3/4]' : layoutOrientation === 'square' ? 'aspect-square' : 'aspect-video'} rounded-xl border-2 flex items-center justify-center relative overflow-hidden transition-all duration-500 ease-spring ${isDarkMode ? 'border-[#2C2C2C] bg-[#121212]' : 'border-[#E0E0E0] bg-[#FAFAFA]'}`}>
                                    {renderLayoutGraphic(l.id, isDarkMode, layoutOrientation)}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div className={`p-2 rounded-full backdrop-blur-md shadow-lg ${isDarkMode ? 'bg-[#1E1E1E]/80 text-[#41B6E6]' : 'bg-white/80 text-[#0277C5]'}`}>
                                            <Info size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {toolTab === 'ratio' && (
                <div className="flex flex-col gap-8 max-w-6xl mx-auto animate-fade-in-up w-full">
                    
                    <div className={`p-4 rounded-2xl flex items-start sm:items-center gap-4 shadow-sm border ${isDarkMode ? 'bg-[#C55002]/10 border-[#C55002]/30 text-[#E3E3E3]' : 'bg-[#C55002]/5 border-[#C55002]/20 text-[#1A1C1E]'}`}>
                        <div className={`p-2 rounded-full shrink-0 ${isDarkMode ? 'bg-[#C55002]/20' : 'bg-[#C55002]/10'}`}>
                            <Info size={24} className="text-[#C55002]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black font-khmer text-sm sm:text-base tracking-tight mb-1 text-[#C55002]">
                                {lang === 'en' ? 'Pro Tip: The 1920px Rule' : 'ច្បាប់មាស 1920px'}
                            </span>
                            <span className={`text-[11px] sm:text-xs leading-relaxed font-khmer ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#5F6368]'}`}>
                                {lang === 'en' 
                                    ? 'For crystal clear Facebook grids, EVERY square (1:1) image you upload must be exactly 1920x1920 pixels. Facebook compresses smaller images heavily!' 
                                    : 'ដើម្បីឱ្យរូបភាពផុសលើ Facebook ច្បាស់ល្អ រាល់រូបការ៉េ (1:1) ទាំងអស់ត្រូវតែមានទំហំ 1920x1920px ជានិច្ច កុំឱ្យហ្វេសប៊ុកទម្លាក់គុណភាពរូប (បែកគ្រាប់)!'}
                            </span>
                        </div>
                    </div>

                    {sizeData.map((category, idx) => (
                        <div key={idx} className="flex flex-col gap-4">
                            <h3 className={`text-sm sm:text-base font-black font-khmer flex items-center gap-3 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-inner ${isDarkMode ? 'bg-[#2C2C2C] text-[#41B6E6]' : 'bg-[#E5E7EB] text-[#0277C5]'}`}>
                                    {category.icon}
                                </div>
                                {lang === 'en' ? category.title : category.title_kh}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {category.items.map((item, i) => (
                                    <div key={i} className={`p-5 rounded-[24px] border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] hover:border-[#41B6E6]/40' : 'bg-[#FFFFFF] border-[#E0E0E0] hover:border-[#0277C5]/40'}`}>
                                        
                                        <div className={`w-full h-28 mb-5 rounded-xl border flex items-center justify-center relative overflow-hidden transition-all ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#F8F9FA] border-[#E5E7EB]'}`}>
                                            {renderSizeGraphic(item.id, isDarkMode)}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between items-start">
                                                <span className={`font-bold text-[14px] leading-tight pr-2 ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>{item.name}</span>
                                                <span className={`text-[9px] font-black px-2 py-1 rounded shadow-sm shrink-0 tracking-wider ${isDarkMode ? 'bg-[#41B6E6]/10 text-[#41B6E6]' : 'bg-[#0277C5]/10 text-[#0277C5]'}`}>{item.ratio}</span>
                                            </div>
                                            <div className="flex flex-col mt-1">
                                                <span className={`text-[8px] uppercase font-black tracking-[0.2em] opacity-40 mb-0.5 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>Dimensions</span>
                                                <span className={`font-mono text-[14px] font-black tracking-tight whitespace-pre-line ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>{item.size}</span>
                                            </div>
                                            <p className={`text-[10px] mt-2 leading-relaxed opacity-70 ${lang === 'km' ? 'font-khmer' : 'font-sans'} ${isDarkMode ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>
                                                {lang === 'en' ? item.desc : item.desc_kh}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Export PDF Modal */}
        {showExportModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-md bg-black/60 transition-all">
                <div className={`w-full max-w-md p-6 rounded-[32px] border shadow-2xl animate-fade-in-up ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-[#FFFFFF] border-[#E0E0E0]'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className={`text-lg sm:text-xl font-bold font-khmer tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}><Download size={20} className="text-[#C55002]" /> {t('tools_export_pdf')}</h3>
                        <button onClick={() => setShowExportModal(false)} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-[#2C2C2C] hover:bg-[#3A3A3C] text-[#9AA0A6]' : 'bg-[#FAFAFA] hover:bg-[#E0E0E0] text-[#5F6368]'}`}><XCircle size={18}/></button>
                    </div>
                    
                    <div className="mb-4 flex gap-2">
                        <button onClick={() => { setSelectedExports([...allHarmonies]); triggerHaptic(); }} className={`flex-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-xl border transition-colors font-khmer ${isDarkMode ? 'border-[#3A3A3C] text-[#E3E3E3] hover:bg-[#2C2C2C]' : 'border-[#D1D5DB] text-[#1A1C1E] hover:bg-[#FAFAFA]'}`}>{t('tools_select_all')}</button>
                        <button onClick={() => { setSelectedExports([]); triggerHaptic(); }} className={`flex-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-xl border transition-colors font-khmer ${isDarkMode ? 'border-[#3A3A3C] text-[#E3E3E3] hover:bg-[#2C2C2C]' : 'border-[#D1D5DB] text-[#1A1C1E] hover:bg-[#FAFAFA]'}`}>{t('tools_deselect_all')}</button>
                    </div>

                    <div className={`max-h-[40vh] overflow-y-auto mb-6 p-2 rounded-2xl border grid grid-cols-2 gap-2 custom-scrollbar ${isDarkMode ? 'bg-[#121212] border-[#2C2C2C]' : 'bg-[#FAFAFA] border-[#E0E0E0]'}`}>
                        {allHarmonies.map(h => (
                            <label key={h} className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition-colors ${selectedExports.includes(h) ? (isDarkMode ? 'bg-[#41B6E6]/20 border border-[#41B6E6]/50' : 'bg-[#0277C5]/10 border border-[#0277C5]/30') : (isDarkMode ? 'hover:bg-[#2C2C2C] border border-transparent' : 'hover:bg-[#E0E0E0]/50 border border-transparent')}`}>
                                <input 
                                    type="checkbox" 
                                    checked={selectedExports.includes(h)} 
                                    onChange={(e) => {
                                        triggerHaptic();
                                        if (e.target.checked) setSelectedExports(prev => [...prev, h]);
                                        else setSelectedExports(prev => prev.filter(item => item !== h));
                                    }}
                                    className={`w-4 h-4 cursor-pointer ${isDarkMode ? 'accent-[#41B6E6]' : 'accent-[#0277C5]'}`}
                                />
                                <span className={`text-[11px] sm:text-xs font-bold capitalize tracking-wide ${isDarkMode ? (selectedExports.includes(h) ? 'text-[#E3E3E3]' : 'text-[#9AA0A6]') : (selectedExports.includes(h) ? 'text-[#1A1C1E]' : 'text-[#5F6368]')}`}>{h.replace(/-/g, ' ')}</span>
                            </label>
                        ))}
                    </div>

                    <button 
                        onClick={exportToPDF}
                        disabled={selectedExports.length === 0 || isExporting}
                        className={`w-full py-4 rounded-2xl font-khmer font-bold text-sm shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 ${selectedExports.length > 0 && !isExporting ? 'bg-[#C55002] text-[#FFFFFF] hover:bg-[#A84502]' : 'bg-gray-500/50 text-white/50 cursor-not-allowed'}`}
                    >
                        {isExporting ? <RefreshCw size={18} className="animate-spin" /> : <Download size={18} />} 
                        {isExporting ? t('tools_generating') : t('tools_export_pdf')}
                    </button>
                </div>
            </div>
        )}

        {/* PULL-TO-CLOSE FULLSCREEN MODAL FOR PRO LAYOUT DETAILS */}
        {selectedLayoutDetails && (
            <div 
                className="fixed inset-x-0 bottom-0 z-[300] bg-black/80 transition-opacity flex flex-col justify-end"
                style={{ top: 0, opacity: 1 - dragY / 500 }}
                onClick={() => setSelectedLayoutDetails(null)}
            >
                <div 
                    className={`relative w-full h-[95vh] rounded-t-[32px] flex flex-col shadow-2xl transition-transform ${isDarkMode ? 'bg-[#121212]' : 'bg-[#F8F9FA]'}`}
                    style={{ transform: `translateY(${dragY > 0 ? dragY : 0}px)`, transition: dragY === 0 ? 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none' }}
                    onClick={e => e.stopPropagation()}
                    onTouchStart={e => { dragStartRef.current = e.touches[0].clientY; }}
                    onTouchMove={e => {
                        const delta = e.touches[0].clientY - dragStartRef.current;
                        if (delta > 0) setDragY(delta);
                    }}
                    onTouchEnd={() => {
                        if (dragY > 120) {
                            triggerHaptic();
                            setSelectedLayoutDetails(null);
                        }
                        setDragY(0);
                    }}
                >
                    {/* Pull Handle */}
                    <div className="w-full flex justify-center py-4 cursor-grab active:cursor-grabbing shrink-0">
                        <div className={`w-12 h-1.5 rounded-full ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}></div>
                    </div>

                    <div className="px-5 pb-4 flex justify-between items-end shrink-0">
                        <div className="flex flex-col">
                            <h3 className={`text-2xl font-black flex items-center gap-2 ${lang === 'km' ? 'font-khmer' : 'font-sans'} ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>
                                {selectedLayoutDetails.name}
                            </h3>
                            <span className="text-[12px] font-bold font-khmer opacity-50 tracking-wider uppercase mt-1">
                                {lang === 'km' ? selectedLayoutDetails.kh : 'Layout Blueprint'}
                            </span>
                        </div>
                        <button onClick={() => { triggerHaptic(); setSelectedLayoutDetails(null); }} className={`p-2.5 rounded-full transition-colors ${isDarkMode ? 'bg-[#2C2C2C] hover:bg-[#3A3A3C] text-[#9AA0A6]' : 'bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#5F6368]'}`}>
                            <XCircle size={22} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-6 custom-scrollbar">
                        <div className={`w-full aspect-video rounded-3xl border-4 flex items-center justify-center relative overflow-hidden shadow-inner pointer-events-none ${isDarkMode ? 'border-[#1E1E1E] bg-[#1A1A1A]' : 'border-white bg-[#FFFFFF]'}`}>
                            {renderLayoutGraphic(selectedLayoutDetails.id, isDarkMode, 'landscape')}
                        </div>

                        <div className="space-y-4 font-khmer">
                            <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E0E0E0]'}`}>
                                <h4 className={`text-[12px] font-black uppercase tracking-wider mb-2.5 flex items-center gap-2 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                                    <Info size={16} /> {lang === 'en' ? 'Concept' : 'គំនិតចម្បង'}
                                </h4>
                                <p className={`text-[15px] leading-relaxed ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>
                                    {lang === 'en' ? selectedLayoutDetails?.pro_details?.concept : selectedLayoutDetails?.pro_details?.concept_kh}
                                </p>
                            </div>

                            <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white border-[#E0E0E0]'}`}>
                                <h4 className={`text-[12px] font-black uppercase tracking-wider mb-2.5 flex items-center gap-2 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                                    <CheckCircle2 size={16} /> {lang === 'en' ? 'Best Used For' : 'ល្អបំផុតសម្រាប់'}
                                </h4>
                                <p className={`text-[15px] leading-relaxed ${isDarkMode ? 'text-[#E3E3E3]' : 'text-[#1A1C1E]'}`}>
                                    {lang === 'en' ? selectedLayoutDetails?.pro_details?.best_for : selectedLayoutDetails?.pro_details?.best_for_kh}
                                </p>
                            </div>

                            <div className={`p-6 rounded-2xl border-2 shadow-lg ${isDarkMode ? 'bg-[#C55002]/10 border-[#C55002]/40' : 'bg-[#C55002]/5 border-[#C55002]/30'}`}>
                                <h4 className={`text-[12px] font-black uppercase tracking-wider mb-3 flex items-center gap-2 text-[#C55002]`}>
                                    <Lightbulb size={16} /> {lang === 'en' ? 'Pro Tip' : 'គន្លឹះអ្នកជំនាញ'}
                                </h4>
                                <p className={`text-[15px] leading-relaxed font-medium ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                                    {lang === 'en' ? selectedLayoutDetails?.pro_details?.pro_tip : selectedLayoutDetails?.pro_details?.pro_tip_kh}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={`p-5 border-t shrink-0 ${isDarkMode ? 'border-[#2C2C2C] bg-[#121212]' : 'border-[#E0E0E0] bg-[#F8F9FA]'}`}>
                        <button 
                            onClick={() => {
                                exportLayoutSVG(selectedLayoutDetails.id, selectedLayoutDetails.name, layoutOrientation);
                                triggerHaptic();
                            }} 
                            className={`w-full py-4 rounded-2xl font-black font-khmer text-[15px] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl ${isDarkMode ? 'bg-[#41B6E6] text-[#121212] hover:bg-[#329DCA]' : 'bg-[#0277C5] text-white hover:bg-[#025B96]'}`}
                        >
                            <Download size={20} />
                            {lang === 'en' ? 'Download Vector Blueprint' : 'ទាញយកប្លង់គំរូជា Vector'}
                        </button>
                    </div>

                </div>
            </div>
        )}
        </>
    );
}