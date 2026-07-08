// Live Preview Logic
document.addEventListener('DOMContentLoaded', () => {
    
    const updatePreview = () => {
        // Personal Info
        const name = document.getElementById('fullName').value || 'Your Name';
        document.getElementById('preview-name').textContent = name;
        
        const jobTitle = document.getElementById('jobTitle').value || 'Your Job Title';
        document.getElementById('preview-jobTitle').textContent = jobTitle;
        
        // Contact Info
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const linkedin = document.getElementById('linkedin').value;
        const github = document.getElementById('github').value;
        
        updateContactItem('email', email);
        updateContactItem('phone', phone);
        updateContactItem('address', address);
        updateContactItem('linkedin', linkedin);
        updateContactItem('github', github);
        
        // Summary
        const summary = document.getElementById('summary').value;
        const summarySection = document.getElementById('preview-summary-section');
        const summaryText = document.getElementById('preview-summary');
        if (summary.trim()) {
            summaryText.textContent = summary;
            summarySection.style.display = 'block';
        } else {
            summarySection.style.display = 'none';
        }
        
        // Trigger animation
        const resumeA4 = document.querySelector('.resume-a4');
        if(resumeA4) {
            resumeA4.classList.remove('resume-update-anim');
            void resumeA4.offsetWidth; // Trigger reflow
            resumeA4.classList.add('resume-update-anim');
        }
    };
    
    const updateContactItem = (type, value) => {
        const container = document.getElementById(`preview-${type}-container`);
        const textElem = document.getElementById(`preview-${type}`);
        if (value && value.trim()) {
            let displayValue = value;
            if(type === 'linkedin' || type === 'github') {
                try {
                    const url = new URL(value);
                    // Remove leading www. and trailing slash
                    displayValue = (url.hostname + url.pathname).replace(/^www\./, '').replace(/\/$/, '');
                } catch(e) {
                    // Not a valid URL yet, just display as is
                }
            }
            textElem.textContent = displayValue;
            container.style.display = 'flex';
        } else {
            container.style.display = 'none';
        }
    };

    document.addEventListener('formUpdated', updatePreview);
    
    // Initial update
    updatePreview();
});
