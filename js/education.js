// Dynamic Education Section
document.addEventListener('DOMContentLoaded', () => {
    const addEducationBtn = document.getElementById('add-education-btn');
    const educationContainer = document.getElementById('education-container');
    const previewEducationSection = document.getElementById('preview-education-section');
    const previewEducationList = document.getElementById('preview-education-list');
    
    let educationCount = 0;

    addEducationBtn.addEventListener('click', () => {
        educationCount++;
        
        const card = document.createElement('div');
        card.className = 'dynamic-card';
        card.id = `edu-card-${educationCount}`;
        
        card.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeEducation('${card.id}')"><i class="fa-solid fa-xmark"></i></button>
            <div class="form-group">
                <label>Institution/College</label>
                <input type="text" class="edu-inst" placeholder="University of Technology" oninput="updateEducationPreview()">
            </div>
            <div class="form-group">
                <label>Degree</label>
                <input type="text" class="edu-degree" placeholder="B.Sc. Computer Science" oninput="updateEducationPreview()">
            </div>
            <div class="input-grid">
                <div class="form-group">
                    <label>Duration (e.g., 2018 - 2022)</label>
                    <input type="text" class="edu-duration" placeholder="2018 - 2022" oninput="updateEducationPreview()">
                </div>
                <div class="form-group">
                    <label>CGPA/Percentage</label>
                    <input type="text" class="edu-cgpa" placeholder="3.8/4.0" oninput="updateEducationPreview()">
                </div>
            </div>
        `;
        
        educationContainer.appendChild(card);
        updateEducationPreview();
        document.dispatchEvent(new Event('formUpdated')); // Update progress
    });

    window.removeEducation = (cardId) => {
        const card = document.getElementById(cardId);
        if (card) {
            card.remove();
            updateEducationPreview();
            document.dispatchEvent(new Event('formUpdated'));
        }
    };

    window.updateEducationPreview = () => {
        const cards = educationContainer.querySelectorAll('.dynamic-card');
        previewEducationList.innerHTML = '';
        
        if (cards.length > 0) {
            previewEducationSection.style.display = 'block';
            cards.forEach(card => {
                const inst = card.querySelector('.edu-inst').value || 'Institution Name';
                const degree = card.querySelector('.edu-degree').value || 'Degree Name';
                const duration = card.querySelector('.edu-duration').value;
                const cgpa = card.querySelector('.edu-cgpa').value;
                
                const item = document.createElement('div');
                item.className = 'timeline-item';
                item.innerHTML = `
                    <div class="timeline-header">
                        <span class="timeline-title">${degree}</span>
                        <span class="timeline-date">${duration}</span>
                    </div>
                    <div class="timeline-subtitle">${inst}</div>
                    ${cgpa ? `<div class="timeline-desc">CGPA/Percentage: ${cgpa}</div>` : ''}
                `;
                previewEducationList.appendChild(item);
            });
        } else {
            previewEducationSection.style.display = 'none';
        }
    };

    document.addEventListener('formUpdated', updateEducationPreview);
});
