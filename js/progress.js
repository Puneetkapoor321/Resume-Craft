// progress.js
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    const calculateProgress = () => {
        let score = 0;
        let total = 11;
        
        // 1. Name
        if(document.getElementById('fullName').value.trim()) score++;
        
        // 2. Email
        if(document.getElementById('email').value.trim()) score++;
        
        // 3. Phone
        if(document.getElementById('phone').value.trim()) score++;
        
        // 4. Summary (Min 30 chars)
        if(document.getElementById('summary').value.trim().length >= 30) score++;
        
        // 5. Profile Photo
        const photoSrc = document.getElementById('form-profile-img').src;
        if(photoSrc && photoSrc !== window.location.href && !photoSrc.endsWith('/')) score++;
        
        // 6. Education
        if(document.querySelectorAll('#education-container .dynamic-card').length > 0) score++;
        
        // 7. Experience
        if(document.querySelectorAll('#experience-container .dynamic-card').length > 0) score++;
        
        // 8. Skills
        if(document.querySelectorAll('#selected-skills-container .skill-tag').length > 0) score++;
        
        // 9. Projects
        if(document.querySelectorAll('#projects-container .dynamic-card').length > 0) score++;
        
        // 10. Certifications
        if(document.querySelectorAll('#certifications-container .dynamic-card').length > 0) score++;
        
        // 11. Leadership & Achievements
        if(document.querySelectorAll('#leadership-container .dynamic-card').length > 0) score++;
        
        const percentage = Math.round((score / total) * 100);
        
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% Complete`;
    };

    document.addEventListener('formUpdated', calculateProgress);
    // Initial call
    calculateProgress();
});
