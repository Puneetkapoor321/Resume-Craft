// pdf.js
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-pdf-btn');
    
    if(downloadBtn) {
        downloadBtn.addEventListener('click', async () => {
            const element = document.getElementById('resume-preview');
            
            if (!element) {
                console.error("Export failed: #resume-preview element not found.");
                return;
            }

            console.log("--- PDF Generation Started ---");
            // Step 1 & 2 - Verify Resume Element & Dimensions
            console.log("Selected element:", element);
            console.log("Element width:", element.offsetWidth);
            console.log("Element height:", element.offsetHeight);
            console.log("innerHTML length:", element.innerHTML.length);
            console.log("Has child nodes:", element.hasChildNodes());

            if (element.offsetWidth === 0 || element.offsetHeight === 0) {
                console.warn("Element has 0 width or height. This will cause a blank PDF.");
            }

            // Temporarily store original scroll position and scroll to top
            // (Prevents html2canvas from rendering blank if scrolled down)
            const originalScrollY = window.scrollY;
            const originalScrollX = window.scrollX;
            window.scrollTo(0, 0);
            
            // Toggle PDF mode to hide icons and adjust styles for ATS
            element.classList.add('pdf-mode');
            document.body.classList.add('pdf-exporting'); // Handle global overflow
            
            try {
                // Step 8 - Verify Fonts
                if (document.fonts && document.fonts.ready) {
                    console.log("Waiting for fonts to load...");
                    await document.fonts.ready;
                    console.log("Fonts loaded.");
                }

                // Step 7 - Verify Images
                console.log("Waiting for images to load...");
                const images = element.querySelectorAll('img');
                const imagePromises = Array.from(images).map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise(resolve => {
                        img.onload = resolve;
                        img.onerror = resolve; // Proceed even if error
                    });
                });
                await Promise.all(imagePromises);
                console.log("Images loaded.");

                // Step 3 - Verify Rendering Timing (Wait for DOM updates to settle)
                console.log("Waiting for DOM repaints to settle...");
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Step 4 - Inspect and override CSS that may interfere
                const originalStyle = element.getAttribute('style') || '';
                element.style.setProperty('transform', 'none', 'important');
                element.style.setProperty('animation', 'none', 'important');
                element.style.setProperty('transition', 'none', 'important');
                element.style.setProperty('overflow', 'visible', 'important');
                element.style.setProperty('box-shadow', 'none', 'important');

                // Step 6 - Verify html2pdf Configuration
                console.log("Configuring html2pdf...");
                const opt = {
                    margin:       0,
                    filename:     'Resume.pdf',
                    image:        { type: 'jpeg', quality: 1.0 }, // high quality
                    html2canvas:  { 
                        scale: 2, 
                        useCORS: true,
                        logging: true, // Step 10 - Add Debug Logging internally
                        scrollY: 0,
                        backgroundColor: '#ffffff'
                    },
                    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };
                
                console.log("Starting html2pdf generation...");
                
                // Generate PDF (Steps 5 & 9 are verified automatically via output)
                await html2pdf().set(opt).from(element).save();
                
                console.log("PDF generated successfully.");

                // Restore inline styles
                if (originalStyle) {
                    element.setAttribute('style', originalStyle);
                } else {
                    element.removeAttribute('style');
                }

            } catch (error) {
                console.error("PDF Export failed:", error);
                alert("Failed to generate PDF. Please try again.");
            } finally {
                element.classList.remove('pdf-mode');
                document.body.classList.remove('pdf-exporting');
                // Restore scroll position
                window.scrollTo(originalScrollX, originalScrollY);
                console.log("--- PDF Generation Finished ---");
            }
        });
    }
});
