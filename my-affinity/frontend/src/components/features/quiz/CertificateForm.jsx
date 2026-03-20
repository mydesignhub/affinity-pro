import React, { useState, useRef, useEffect } from 'react';
import { Award, Download, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const CertificateForm = ({ certData, isDarkMode = true, onBack }) => {
    const { lang } = useLanguage(); 
    const [downloadState, setDownloadState] = useState(null);
    const fontClass = lang === 'en' ? 'font-serif' : 'font-khmer';
    const dateObj = new Date(certData?.date || Date.now());
    const today = dateObj.toLocaleDateString(lang === 'en' ? 'en-US' : 'km-KH', { year: 'numeric', month: 'long', day: 'numeric' });

    const studentName = certData?.name || "Student Name";
    // Mapped to the Affinity App's data structure
    const courseName = certData?.appCourse || "Affinity Masterclass"; 
    const score = certData?.score || 100;
    
    const hasKhmerName = /[\u1780-\u17FF]/.test(studentName);
    const nameFontSize = studentName.length > 20 ? Math.max(28, Math.floor(57 * (20 / studentName.length))) : 57;

    const wrapperRef = useRef(null);
    const [scale, setScale] = useState(1);
    
    // State to hold the raw, strictly modified SVG HTML for the logo
    const [logoHtml, setLogoHtml] = useState(null);

    useEffect(() => {
        const updateScale = () => {
            if (wrapperRef.current) {
                const width = wrapperRef.current.offsetWidth;
                setScale(Math.min(width / 1123, 1));
            }
        };
        window.addEventListener('resize', updateScale);
        setTimeout(updateScale, 100); 
        
        // Fetch and sanitize the logo for PDF compatibility
        fetch('/certificate_logo.svg')
            .then(res => res.text())
            .then(text => {
                if (text.includes('<svg')) {
                    let modifiedSvg = text;
                    
                    // 1. Strip any existing width/height
                    modifiedSvg = modifiedSvg.replace(/\s(width|height)="[^"]*"/g, '');
                    
                    // 2. Ensure XML namespace exists
                    if (!modifiedSvg.includes('xmlns=')) {
                        modifiedSvg = modifiedSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
                    }
                    
                    // 3. Force exact physical pixel dimensions
                    modifiedSvg = modifiedSvg.replace('<svg', '<svg width="96" height="96"');
                    
                    setLogoHtml(modifiedSvg);
                }
            })
            .catch(e => console.log('Logo fetch error:', e));

        return () => window.removeEventListener('resize', updateScale);
    }, []);

    const handleDownloadPDF = async () => {
        if (downloadState) return;
        setDownloadState('pdf');
        
        try {
            await document.fonts.ready; 

            const element = document.getElementById('certificate-node');
            const scalerParent = document.getElementById('certificate-scaler-parent');
            const scaler = document.getElementById('certificate-scaler');
            
            const origParentPos = scalerParent ? scalerParent.style.position : '';
            const origParentLeft = scalerParent ? scalerParent.style.left : '';
            const origParentTransform = scalerParent ? scalerParent.style.transform : '';
            const origScalerTransform = scaler ? scaler.style.transform : '';
            
            // Temporarily remove CSS transforms so html2canvas captures the full size
            if (scalerParent) {
                scalerParent.style.position = 'absolute';
                scalerParent.style.left = '0px';
                scalerParent.style.transform = 'none';
            }
            if (scaler) {
                scaler.style.transform = 'none';
            }
            
            window.scrollTo(0, 0); 
            
            const opt = {
                margin: 0,
                filename: `${studentName.replace(/\s+/g, '_')}_Certificate.pdf`,
                image: { type: 'jpeg', quality: 1.0 },
                html2canvas: { 
                    scale: 3,
                    useCORS: true, 
                    logging: false,
                    x: 0,
                    y: 0,
                    scrollX: 0,
                    scrollY: 0,
                    backgroundColor: '#0A0F1D', // Forced Dark Mode Background
                    width: 1123,
                    height: 794,
                    windowWidth: 1123
                },
                jsPDF: { unit: 'px', format: [1123, 794], orientation: 'landscape', hotfixes: ["px_scaling"] }
            };

            const restoreStyles = () => {
                if (scalerParent) {
                    scalerParent.style.position = origParentPos;
                    scalerParent.style.left = origParentLeft;
                    scalerParent.style.transform = origParentTransform;
                }
                if (scaler) {
                    scaler.style.transform = origScalerTransform;
                }
                setDownloadState(null);
            };

            const generatePDF = () => {
                window.html2pdf().set(opt).from(element).save().then(restoreStyles).catch((err) => {
                    console.error("PDF generation error:", err);
                    restoreStyles();
                });
            };

            // Inject html2pdf script dynamically if not loaded
            if (window.html2pdf) { 
                generatePDF(); 
            } else {
                const script = document.createElement('script');
                script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
                script.onload = generatePDF;
                script.onerror = () => {
                    console.error("Failed to load html2pdf.js script");
                    restoreStyles();
                };
                document.head.appendChild(script);
            }
        } catch (err) {
            console.error("Download initialization error:", err);
            setDownloadState(null);
        }
    };
    
    return (
        <div className="flex h-full flex-col items-center justify-center p-4 animate-fade-in-up w-full max-w-5xl mx-auto">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700;900&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Great+Vibes&display=swap');
                    .font-kantumruy { font-family: 'Kantumruy Pro', sans-serif; }
                    .font-serif-luxury { font-family: 'Cinzel', serif; }
                    .font-signature { font-family: 'Great Vibes', cursive; }
                `}
            </style>
            
            {/* Certificate Scaler Wrapper */}
            <div ref={wrapperRef} className="w-full relative overflow-visible mb-6" style={{ height: `${794 * scale}px` }}>
                <div id="certificate-scaler-parent" className="absolute top-0 left-1/2" style={{ width: `${1123 * scale}px`, height: `${794 * scale}px`, transform: 'translateX(-50%)' }}>
                    
                    {/* 🌟 FORCED DARK MODE BACKGROUND: bg-[#0A0F1D] */}
                    <div id="certificate-scaler" style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: '1123px', height: '794px' }} className="absolute top-0 left-0 shadow-2xl rounded-sm bg-[#0A0F1D]">
                        
                        {/* THE CERTIFICATE HTML NODE (Captured for PDF) */}
                        <div id="certificate-node" className="w-[1123px] h-[794px] relative overflow-hidden text-center bg-[#0A0F1D]">
                            
                            <div className="absolute inset-0 w-full h-full z-0 opacity-0 pointer-events-none"></div>

                            <div className="absolute inset-0 w-full h-full flex items-center justify-center">

                                {/* 🌟 FORCED DARK MODE BORDERS */}
                                <div className="absolute top-[35px] bottom-[35px] left-[35px] right-[35px] border-[1px] z-10 pointer-events-none border-[#D4AF37] opacity-40"></div>
                                
                                <div className="absolute top-[30px] left-[30px] w-[60px] h-[60px] border-t-[3px] border-l-[3px] z-10 border-[#D4AF37]"></div>
                                <div className="absolute top-[30px] right-[30px] w-[60px] h-[60px] border-t-[3px] border-r-[3px] z-10 border-[#D4AF37]"></div>
                                <div className="absolute bottom-[30px] left-[30px] w-[60px] h-[60px] border-b-[3px] border-l-[3px] z-10 border-[#D4AF37]"></div>
                                <div className="absolute bottom-[30px] right-[30px] w-[60px] h-[60px] border-b-[3px] border-r-[3px] z-10 border-[#D4AF37]"></div>

                                <div className="relative w-full h-full z-20 flex flex-col items-center justify-center px-[130px]">
                                    
                                    <div className="flex justify-center mb-4">
                                        <Award size={44} strokeWidth={1.5} className="text-[#D4AF37]" />
                                    </div>
                                    
                                    <h1 
                                        className={`text-[42px] leading-tight ${fontClass} font-bold ${lang === 'en' ? 'tracking-[0.22em] uppercase' : 'tracking-normal'} mb-2 text-[#F1F1F1]`}
                                        style={lang === 'en' ? { paddingLeft: '0.22em' } : {}}
                                    >
                                        {lang === 'en' ? 'Certificate of Completion' : 'វិញ្ញាបនបត្របញ្ជាក់ការសិក្សា'}
                                    </h1>
                                    
                                    <div className="w-[450px] flex items-center justify-center gap-4 mb-10 opacity-80">
                                        <div className="h-[1px] flex-1 bg-[#D4AF37] opacity-40"></div>
                                        <div className="w-2.5 h-2.5 shrink-0 rotate-45 bg-[#D4AF37]"></div>
                                        <div className="h-[1px] flex-1 bg-[#D4AF37] opacity-40"></div>
                                    </div>

                                    <p className={`text-[18px] mb-6 ${fontClass} italic text-[#A0A0A0]`}>
                                        {lang === 'en' ? 'This certifies that' : 'ប័ណ្ណនេះបញ្ជាក់ថា'}
                                    </p>
                                    
                                    <div className="w-[650px] border-b-[1px] border-opacity-40 pb-4 mb-10 border-[#D4AF37]">
                                        <h2 
                                            className={`leading-none font-khmer font-black italic ${hasKhmerName ? 'tracking-normal' : 'tracking-wide'} whitespace-nowrap text-[#D4AF37]`}
                                            style={{ fontSize: `${nameFontSize}px`, paddingLeft: hasKhmerName ? '0' : '0.025em' }}
                                        >
                                            {studentName}
                                        </h2>
                                    </div>

                                    <p 
                                        className={`text-[14px] ${fontClass} ${lang === 'en' ? 'uppercase tracking-[0.2em]' : 'tracking-normal'} mb-4 text-[#A0A0A0]`}
                                        style={lang === 'en' ? { paddingLeft: '0.2em' } : {}}
                                    >
                                        {lang === 'en' ? 'Has successfully completed the course' : 'បានបញ្ចប់ដោយជោគជ័យនូវវគ្គសិក្សា'}
                                    </p>
                                    
                                    <h3 
                                        className="text-[36px] font-serif font-bold uppercase tracking-[0.15em] mb-14 text-[#F1F1F1]"
                                        style={{ paddingLeft: '0.15em' }}
                                    >
                                        {courseName}
                                    </h3>

                                    <div className="w-full flex justify-between items-end">
                                        
                                        <div className="w-[240px] text-center">
                                            <p className="font-serif text-[22px] mb-2 text-[#F1F1F1]">
                                                {today}
                                            </p>
                                            <div className="h-[1px] w-full mb-3 opacity-40 bg-[#D4AF37]"></div>
                                            <p 
                                                className={`text-[12px] ${fontClass} ${lang === 'en' ? 'uppercase tracking-[0.2em]' : 'tracking-normal'} text-[#A0A0A0]`}
                                                style={lang === 'en' ? { paddingLeft: '0.2em' } : {}}
                                            >
                                                {lang === 'en' ? 'Date Issued' : 'កាលបរិច្ឆេទ'}
                                            </p>
                                        </div>
                                        
                                        <div className="flex flex-col items-center justify-end px-4">
                                            <p 
                                                className="text-[10px] font-serif uppercase tracking-[0.2em] mb-3 text-[#D4AF37]"
                                                style={{ paddingLeft: '0.2em' }}
                                            >
                                                Verified By
                                            </p>
                                            
                                            <div className="w-[114px] h-[114px] flex items-center justify-center my-1">
                                                {logoHtml ? (
                                                    <div 
                                                        className="flex items-center justify-center text-[#D4AF37]" 
                                                        dangerouslySetInnerHTML={{ __html: logoHtml }}
                                                    />
                                                ) : (
                                                    <div className="w-[96px] h-[96px] border-2 border-dashed border-[#D4AF37]/30 rounded-lg flex items-center justify-center">
                                                        <Award className="w-8 h-8 text-[#D4AF37]/50" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="w-[240px] text-center">
                                            <p className="font-serif font-bold text-[22px] mb-2 text-[#F1F1F1]">
                                                {score}%
                                            </p>
                                            <div className="h-[1px] w-full mb-3 opacity-40 bg-[#D4AF37]"></div>
                                            <p 
                                                className={`text-[12px] ${fontClass} ${lang === 'en' ? 'uppercase tracking-[0.2em]' : 'tracking-normal'} text-[#A0A0A0]`}
                                                style={lang === 'en' ? { paddingLeft: '0.2em' } : {}}
                                            >
                                                {lang === 'en' ? 'Final Score' : 'ពិន្ទុសម្រេច'}
                                            </p>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Buttons isolated outside the printable area */}
            <div className="mt-2 flex flex-row justify-center gap-6 w-full max-w-2xl relative z-10 shrink-0">
                <button 
                    onClick={handleDownloadPDF} 
                    disabled={!!downloadState}
                    className={`flex-1 max-w-[250px] py-3 sm:py-4 rounded-xl font-bold font-khmer flex items-center justify-center gap-2 shadow-lg transition-all ${downloadState === 'pdf' ? 'opacity-70 cursor-wait' : 'active:scale-95'} ${isDarkMode ? 'bg-[#D4AF37] hover:bg-[#B38728] text-[#0A0F1D]' : 'bg-[#1E3A8A] hover:bg-[#152C6B] text-white'}`}
                >
                    <Download size={20} /> 
                    {downloadState === 'pdf' 
                        ? (lang === 'en' ? 'Generating PDF...' : 'កំពុងបង្កើត PDF...') 
                        : (lang === 'en' ? 'Download PDF' : 'ទាញយក PDF')
                    }
                </button>
                <button 
                    onClick={onBack} 
                    disabled={!!downloadState} 
                    className={`flex-1 max-w-[250px] py-3 sm:py-4 border-[1.5px] rounded-xl font-bold font-khmer flex items-center justify-center gap-2 transition-all ${!!downloadState ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'} ${isDarkMode ? 'border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10' : 'border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10'}`}
                >
                    <ArrowLeft size={20} /> {lang === 'en' ? 'Go Back' : 'ត្រលប់ក្រោយ'}
                </button>
            </div>
        </div>
    );
};

export default CertificateForm;