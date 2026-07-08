// Dynamic Experience Section
document.addEventListener('DOMContentLoaded', () => {
    const addExperienceBtn = document.getElementById('add-experience-btn');
    const experienceContainer = document.getElementById('experience-container');
    const previewExperienceSection = document.getElementById('preview-experience-section');
    const previewExperienceList = document.getElementById('preview-experience-list');
    
    let experienceCount = 0;

    addExperienceBtn.addEventListener('click', () => {
        experienceCount++;
        
        const card = document.createElement('div');
        card.className = 'dynamic-card';
        card.id = `exp-card-${experienceCount}`;
        
        card.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeExperience('${card.id}')"><i class="fa-solid fa-xmark"></i></button>
            <div class="form-group">
                <label>Company Name</label>
                <input type="text" class="exp-company" placeholder="Google" oninput="updateExperiencePreview()">
            </div>
            <div class="form-group">
                <label>Role</label>
                <input type="text" class="exp-role" placeholder="Software Engineer" oninput="updateExperiencePreview()">
            </div>
            <div class="form-group">
                <label>Duration (e.g., Jan 2020 - Present)</label>
                <input type="text" class="exp-duration" placeholder="Jan 2020 - Present" oninput="updateExperiencePreview()">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="exp-desc" rows="3" placeholder="Describe your responsibilities..." oninput="updateExperiencePreview()"></textarea>
            </div>
        `;
        
        experienceContainer.appendChild(card);
        updateExperiencePreview();
        document.dispatchEvent(new Event('formUpdated'));
    });

    window.removeExperience = (cardId) => {
        const card = document.getElementById(cardId);
        if (card) {
            card.remove();
            updateExperiencePreview();
            document.dispatchEvent(new Event('formUpdated'));
        }
    };

    window.updateExperiencePreview = () => {
        const cards = experienceContainer.querySelectorAll('.dynamic-card');
        previewExperienceList.innerHTML = '';
        
        if (cards.length > 0) {
            previewExperienceSection.style.display = 'block';
            cards.forEach(card => {
                const company = card.querySelector('.exp-company').value || 'Company Name';
                const role = card.querySelector('.exp-role').value || 'Role';
                const duration = card.querySelector('.exp-duration').value;
                const desc = card.querySelector('.exp-desc').value;
                
                const item = document.createElement('div');
                item.className = 'timeline-item';
                
                let descHTML = '';
                if(desc) {
                    // Split description by newlines to create simple list or paragraphs if wanted. Just text for now.
                    descHTML = `<div class="timeline-desc">${desc.replace(/\n/g, '<br>')}</div>`;
                }

                item.innerHTML = `
                    <div class="timeline-header">
                        <span class="timeline-title">${role}</span>
                        <span class="timeline-date">${duration}</span>
                    </div>
                    <div class="timeline-subtitle">${company}</div>
                    ${descHTML}
                `;
                previewExperienceList.appendChild(item);
            });
        } else {
            previewExperienceSection.style.display = 'none';
        }
    };

    document.addEventListener('formUpdated', updateExperiencePreview);
});
