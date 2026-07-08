// Application Entry Point & Global Behaviors
document.addEventListener('DOMContentLoaded', () => {
    
    // Clear Form Functionality
    const clearBtn = document.getElementById('clear-form-btn');
    if(clearBtn) {
        clearBtn.addEventListener('click', () => {
            if(confirm("Are you sure you want to clear the entire form? This action cannot be undone.")) {
                const form = document.getElementById('resume-form');
                form.reset();
                
                // Clear dynamic sections
                document.getElementById('education-container').innerHTML = '';
                document.getElementById('experience-container').innerHTML = '';
                document.getElementById('selected-skills-container').innerHTML = '';
                document.getElementById('projects-container').innerHTML = '';
                document.getElementById('certifications-container').innerHTML = '';
                document.getElementById('leadership-container').innerHTML = '';
                
                // Reset photo
                const formPreviewImg = document.getElementById('form-profile-img');
                if(formPreviewImg) {
                    formPreviewImg.src = '';
                    formPreviewImg.style.display = 'none';
                }
                
                // Dispatch event to trigger preview update and progress update
                document.dispatchEvent(new Event('formUpdated'));
            }
        });
    }

    // Global listener for input changes to trigger updates
    const form = document.getElementById('resume-form');
    if(form) {
        form.addEventListener('input', () => {
            document.dispatchEvent(new Event('formUpdated'));
        });
    }
});
