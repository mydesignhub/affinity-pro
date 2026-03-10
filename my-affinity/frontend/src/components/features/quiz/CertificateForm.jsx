import React, { useState, useRef, useEffect } from 'react';
import { Award, ShieldCheck, Download, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const CertificateForm = ({ certData, isDarkMode = true, onBack }) => {
    const { lang } = useLanguage(); 
    const [downloadState, setDownloadState] = useState(null); // null, 'pdf', or 'png'
    const fontClass = lang === 'en' ? 'font-serif' : 'font-khmer';
    const dateObj = new Date(certData?.date || Date.now());
    const today = dateObj.toLocaleDateString(lang === 'en' ? 'en-US' : 'km-KH', { year: 'numeric', month: 'long', day: 'numeric' });

    const studentName = certData?.name || "Student Name";
    const courseName = certData?.courseName || "Graphic Design Master"; 
    
    // Check if name contains Khmer characters to prevent letter-spacing from breaking it in PDF
    const hasKhmerName = /[\u1780-\u17FF]/.test(studentName);
    
    // Base size is 57px (25% less than original 76px). Dynamically shrinks if name is longer than 20 chars.
    const nameFontSize = studentName.length > 20 ? Math.max(28, Math.floor(57 * (20 / studentName.length))) : 57;

    // Dynamic scaling ref to keep the preview responsive while the core element remains 1123x794px
    const wrapperRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            if (wrapperRef.current) {
                const width = wrapperRef.current.offsetWidth;
                // 1123px is the exact fixed width of the certificate canvas
                setScale(Math.min(width / 1123, 1));
            }
        };
        window.addEventListener('resize', updateScale);
        updateScale(); // Initial scale
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    const handleDownloadPDF = async () => {
        if (downloadState) return;
        setDownloadState('pdf');
        
        try {
            // Force the browser to wait until the Khmer font is fully loaded to ensure it renders in the PDF
            await document.fonts.ready; 

            const element = document.getElementById('certificate-node');
            const scaler = document.getElementById('certificate-scaler');
            const scalerParent = document.getElementById('certificate-scaler-parent');
            const innerContent = document.getElementById('certificate-inner-wrapper'); 
            
            const originalTransform = scaler ? scaler.style.transform : '';
            const originalParentPosition = scalerParent ? scalerParent.style.position : '';
            const originalParentTop = scalerParent ? scalerParent.style.top : '';
            const originalParentLeft = scalerParent ? scalerParent.style.left : '';
            const originalParentTransform = scalerParent ? scalerParent.style.transform : '';
            const originalParentZIndex = scalerParent ? scalerParent.style.zIndex : '';
            const originalInnerTransform = innerContent ? innerContent.style.transform : '';
            
            // Temporarily remove preview scale AND position it safely to prevent any viewport cropping
            if (scaler) scaler.style.transform = 'scale(1)';
            if (scalerParent) {
                scalerParent.style.position = 'fixed';
                scalerParent.style.top = '0';
                scalerParent.style.left = '0';
                scalerParent.style.transform = 'none';
                scalerParent.style.zIndex = '-9999';
            }
            // Shift ONLY for PDF export to fix the right-side gap while keeping the web preview perfectly centered
            if (innerContent) {
                innerContent.style.transform = 'translateX(20px)';
            }
            
            // Configured for exact preview match, optimized to prevent Affinity/Illustrator crashes
            const opt = {
                margin: 0,
                // Dynamically update the filename based on the course name
                filename: `${certData?.name || 'Student'}_${courseName.replace(/\s+/g, '_')}_Certificate.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 3, // 300 DPI equivalent - prevents memory crashes while maintaining HD print quality
                    useCORS: true, 
                    logging: false,
                    backgroundColor: isDarkMode ? '#0A0F1D' : '#FAFAFA',
                    windowWidth: 1123, // Force window width to prevent responsive cropping on small screens
                    width: 1123,
                    height: 794
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape', compress: true } // compress enabled for compatibility
            };

            const generatePDF = () => {
                window.html2pdf().set(opt).from(element).save().then(() => {
                    if (scaler) scaler.style.transform = originalTransform;
                    if (scalerParent) {
                        scalerParent.style.position = originalParentPosition;
                        scalerParent.style.top = originalParentTop;
                        scalerParent.style.left = originalParentLeft;
                        scalerParent.style.transform = originalParentTransform;
                        scalerParent.style.zIndex = originalParentZIndex;
                    }
                    if (innerContent) innerContent.style.transform = originalInnerTransform;
                    setDownloadState(null);
                }).catch((err) => {
                    if (scaler) scaler.style.transform = originalTransform;
                    if (scalerParent) {
                        scalerParent.style.position = originalParentPosition;
                        scalerParent.style.top = originalParentTop;
                        scalerParent.style.left = originalParentLeft;
                        scalerParent.style.transform = originalParentTransform;
                        scalerParent.style.zIndex = originalParentZIndex;
                    }
                    if (innerContent) innerContent.style.transform = originalInnerTransform;
                    console.error("PDF generation error:", err);
                    setDownloadState(null);
                });
            };

            if (window.html2pdf) { 
                generatePDF(); 
            } else {
                const script = document.createElement('script');
                script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
                script.onload = generatePDF;
                script.onerror = () => {
                    if (scaler) scaler.style.transform = originalTransform;
                    if (scalerParent) {
                        scalerParent.style.position = originalParentPosition;
                        scalerParent.style.top = originalParentTop;
                        scalerParent.style.left = originalParentLeft;
                        scalerParent.style.transform = originalParentTransform;
                        scalerParent.style.zIndex = originalParentZIndex;
                    }
                    if (innerContent) innerContent.style.transform = originalInnerTransform;
                    console.error("Failed to load html2pdf.js script");
                    setDownloadState(null);
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
            
            {/* Responsiveness engine: Wraps the exact-pixel-size artboard and zooms it to fit screen */}
            <div ref={wrapperRef} className="w-full relative overflow-visible mb-6" style={{ height: `${794 * scale}px` }}>
                <div id="certificate-scaler-parent" className="absolute top-0 left-1/2" style={{ width: `${1123 * scale}px`, height: `${794 * scale}px`, transform: 'translateX(-50%)' }}>
                    <div id="certificate-scaler" style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: '1123px', height: '794px' }} className="absolute top-0 left-0 shadow-2xl rounded-sm">
                        
                        {/* THE CERTIFICATE (Fixed 1123x794px physical dimensions to perfectly map to A4 without fractional pixel bleeding) */}
                        <div id="certificate-node" className={`w-[1123px] h-[794px] relative overflow-hidden text-center ${isDarkMode ? 'bg-[#0A0F1D]' : 'bg-[#FAFAFA]'}`}>
                            
                            {/* Inner Faint Background Pattern Layer (Optional safety layer) */}
                            <div className="absolute inset-0 w-full h-full z-0 opacity-0 pointer-events-none"></div>

                            {/* --- Frame and Content Group - Perfectly Centered natively in Preview --- */}
                            {/* translate-x-[20px] is now applied dynamically ONLY during PDF export via the ID below */}
                            <div id="certificate-inner-wrapper" className="absolute inset-0 w-full h-full flex items-center justify-center">

                                {/* Refined Premium Frame */}
                                <div className={`absolute top-[35px] bottom-[35px] left-[35px] right-[35px] border-[1px] z-10 pointer-events-none ${isDarkMode ? 'border-[#D4AF37] opacity-40' : 'border-[#1E3A8A] opacity-30'}`}></div>
                                
                                {/* Elegant Corner Brackets */}
                                <div className={`absolute top-[30px] left-[30px] w-[60px] h-[60px] border-t-[3px] border-l-[3px] z-10 ${isDarkMode ? 'border-[#D4AF37]' : 'border-[#1E3A8A]'}`}></div>
                                <div className={`absolute top-[30px] right-[30px] w-[60px] h-[60px] border-t-[3px] border-r-[3px] z-10 ${isDarkMode ? 'border-[#D4AF37]' : 'border-[#1E3A8A]'}`}></div>
                                <div className={`absolute bottom-[30px] left-[30px] w-[60px] h-[60px] border-b-[3px] border-l-[3px] z-10 ${isDarkMode ? 'border-[#D4AF37]' : 'border-[#1E3A8A]'}`}></div>
                                <div className={`absolute bottom-[30px] right-[30px] w-[60px] h-[60px] border-b-[3px] border-r-[3px] z-10 ${isDarkMode ? 'border-[#D4AF37]' : 'border-[#1E3A8A]'}`}></div>

                                {/* Inner Content Wrapper - Flex centering to perfectly balance top and bottom space */}
                                <div className="relative w-full h-full z-20 flex flex-col items-center justify-center px-[130px]">
                                    
                                    {/* Header / Title */}
                                    <div className="flex justify-center mb-4">
                                        <Award size={44} strokeWidth={1.5} className={`${isDarkMode ? 'text-[#D4AF37]' : 'text-[#1E3A8A]'}`} />
                                    </div>
                                    {/* Added paddingLeft to perfectly balance the tracking (letter-spacing) visual offset */}
                                    <h1 
                                        className={`text-[42px] leading-tight ${fontClass} font-bold ${lang === 'en' ? 'tracking-[0.22em] uppercase' : 'tracking-normal'} mb-2 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}
                                        style={lang === 'en' ? { paddingLeft: '0.22em' } : {}}
                                    >
                                        {lang === 'en' ? 'Certificate of Completion' : 'វិញ្ញាបនបត្របញ្ជាក់ការសិក្សា'}
                                   </h1>
                                    
                                    {/* Elegant Divider */}
                                    <div className="w-[450px] flex items-center justify-center gap-4 mb-10 opacity-80">
                                        <div className={`h-[1px] flex-1 ${isDarkMode ? 'bg-[#D4AF37]' : 'bg-[#1E3A8A]'} opacity-40`}></div>
                                        <div className={`w-2.5 h-2.5 shrink-0 rotate-45 ${isDarkMode ? 'bg-[#D4AF37]' : 'bg-[#1E3A8A]'}`}></div>
                                        <div className={`h-[1px] flex-1 ${isDarkMode ? 'bg-[#D4AF37]' : 'bg-[#1E3A8A]'} opacity-40`}></div>
                                    </div>

                                    {/* Main Body */}
                                    <p className={`text-[18px] mb-6 ${fontClass} italic ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}>
                                        {lang === 'en' ? 'This certifies that' : 'ប័ណ្ណនេះបញ្ជាក់ថា'}
                                    </p>
                                    
                                    {/* Student Name */}
                                    <div className={`w-[650px] border-b-[1px] border-opacity-40 pb-4 mb-10 ${isDarkMode ? 'border-[#D4AF37]' : 'border-[#1E3A8A]'}`}>
                                        <h2 
                                            className={`leading-none font-khmer font-black italic ${hasKhmerName ? 'tracking-normal' : 'tracking-wide'} whitespace-nowrap ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#1E3A8A]'}`}
                                            style={{ fontSize: `${nameFontSize}px`, paddingLeft: hasKhmerName ? '0' : '0.025em' }}
                                        >
                                            {studentName}
                                        </h2>
                                    </div>

                                    <p 
                                        className={`text-[14px] ${fontClass} ${lang === 'en' ? 'uppercase tracking-[0.2em]' : 'tracking-normal'} mb-4 ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}
                                        style={lang === 'en' ? { paddingLeft: '0.2em' } : {}}
                                    >
                                        {lang === 'en' ? 'Has successfully completed the course' : 'បានបញ្ចប់ដោយជោគជ័យនូវវគ្គសិក្សា'}
                                    </p>
                                    
                                    {/* Course Name */}
                                    <h3 
                                        className={`text-[36px] font-serif font-bold uppercase tracking-[0.15em] mb-14 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}
                                        style={{ paddingLeft: '0.15em' }}
                                    >
                                        {courseName}
                                    </h3>

                                    {/* Footer - Flow layout aligns naturally within the flex container */}
                                    <div className="w-full flex justify-between items-end">
                                        
                                        {/* Date Section */}
                                        <div className="w-[240px] text-center">
                                            <p className={`font-serif text-[22px] mb-2 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                                                {today}
                                            </p>
                                            <div className={`h-[1px] w-full mb-3 opacity-40 ${isDarkMode ? 'bg-[#D4AF37]' : 'bg-[#1E3A8A]'}`}></div>
                                            <p 
                                                className={`text-[12px] ${fontClass} ${lang === 'en' ? 'uppercase tracking-[0.2em]' : 'tracking-normal'} ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}
                                                style={lang === 'en' ? { paddingLeft: '0.2em' } : {}}
                                            >
                                                {lang === 'en' ? 'Date Issued' : 'កាលបរិច្ឆេទ'}
                                            </p>
                                        </div>
                                        
                                        {/* Center Seal Section */}
                                        <div className="flex flex-col items-center justify-end px-4">
                                            <p 
                                                className={`text-[10px] font-serif uppercase tracking-[0.2em] mb-3 ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#1E3A8A]'}`}
                                                style={{ paddingLeft: '0.2em' }}
                                            >
                                                Verified By
                                            </p>
                                            {/* Adjusted logo size to be more standard and balanced with the certificate scale */}
                                            <div className="w-[76px] h-[76px] flex items-center justify-center my-1">
                                                {/* App Icon Style Logo (Rounded Square Outline with Geometric Inner Shape) */}
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? '#D4AF37' : '#1E3A8A'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-[64px] h-[64px]">
                                                    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                                                    <path d="M12 7l4 4-4 4-4-4 4-4z" />
                                                </svg>
                                            </div>
                                            <p 
                                                className={`font-serif font-bold text-[11px] tracking-widest uppercase mt-2 ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#1E3A8A]'}`}
                                                style={{ paddingLeft: '0.1em' }}
                                            >
                                                My Design
                                            </p>
                                        </div>

                                        {/* Score Section */}
                                        <div className="w-[240px] text-center">
                                            <p className={`font-serif font-bold text-[22px] mb-2 ${isDarkMode ? 'text-[#F1F1F1]' : 'text-[#1A1A1A]'}`}>
                                                {certData?.score || 100}%
                                            </p>
                                            <div className={`h-[1px] w-full mb-3 opacity-40 ${isDarkMode ? 'bg-[#D4AF37]' : 'bg-[#1E3A8A]'}`}></div>
                                            <p 
                                                className={`text-[12px] ${fontClass} ${lang === 'en' ? 'uppercase tracking-[0.2em]' : 'tracking-normal'} ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#6B7280]'}`}
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
            
            <div className="mt-2 flex flex-row justify-center gap-6 w-full max-w-2xl relative z-10">
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