// Dynamic Certifications Section
document.addEventListener('DOMContentLoaded', () => {
    const addCertificationBtn = document.getElementById('add-certification-btn');
    const certificationsContainer = document.getElementById('certifications-container');
    const previewCertificationsSection = document.getElementById('preview-certifications-section');
    const previewCertificationsList = document.getElementById('preview-certifications-list');
    
    let certificationCount = 0;

    addCertificationBtn.addEventListener('click', () => {
        certificationCount++;
        
        const card = document.createElement('div');
        card.className = 'dynamic-card';
        card.id = `cert-card-${certificationCount}`;
        
        card.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeCertification('${card.id}')"><i class="fa-solid fa-xmark"></i></button>
            <div class="form-group">
                <label>Certificate Title *</label>
                <input type="text" class="cert-title" placeholder="Responsive Web Design" oninput="updateCertificationsPreview()">
            </div>
            <div class="form-group">
                <label>Organization / Company *</label>
                <input type="text" class="cert-org" placeholder="freeCodeCamp" oninput="updateCertificationsPreview()">
            </div>
            <div class="form-group">
                <label>Issue Date</label>
                <input type="text" class="cert-date" placeholder="Aug 2023" oninput="updateCertificationsPreview()">
            </div>
            <div class="form-group">
                <label>Description *</label>
                <textarea class="cert-desc" rows="2" placeholder="Description of what was learned..." oninput="updateCertificationsPreview()"></textarea>
            </div>
            <div class="form-group">
                <label>Skills Learned</label>
                <input type="text" class="cert-skills" placeholder="HTML, CSS" oninput="updateCertificationsPreview()">
            </div>
            <div class="form-group">
                <label>Credential URL</label>
                <input type="url" class="cert-url" placeholder="https://..." oninput="updateCertificationsPreview()">
            </div>
        `;
        
        certificationsContainer.appendChild(card);
        updateCertificationsPreview();
        document.dispatchEvent(new Event('formUpdated'));
    });

    window.removeCertification = (cardId) => {
        const card = document.getElementById(cardId);
        if (card) {
            card.remove();
            updateCertificationsPreview();
            document.dispatchEvent(new Event('formUpdated'));
        }
    };

    window.updateCertificationsPreview = () => {
        const cards = certificationsContainer.querySelectorAll('.dynamic-card');
        previewCertificationsList.innerHTML = '';
        
        if (cards.length > 0) {
            previewCertificationsSection.style.display = 'block';
            cards.forEach(card => {
                const title = card.querySelector('.cert-title').value || 'Certificate Title';
                const org = card.querySelector('.cert-org').value || 'Organization';
                const date = card.querySelector('.cert-date').value;
                const desc = card.querySelector('.cert-desc').value;
                const skills = card.querySelector('.cert-skills').value;
                const url = card.querySelector('.cert-url').value;
                
                const item = document.createElement('div');
                item.className = 'timeline-item';
                
                let detailsHTML = '';
                if(skills) detailsHTML += `<div class="timeline-desc" style="margin-top: 5px;"><strong>Skills:</strong> ${skills}</div>`;
                if(desc) detailsHTML += `<div class="timeline-desc" style="margin-top: 5px;"><strong>Description:</strong> ${desc}</div>`;
                if(url) detailsHTML += `<div class="timeline-desc" style="margin-top: 5px;"><strong>Credential:</strong> ${url.replace(/^https?:\/\//, '')}</div>`;
                
                item.innerHTML = `
                    <div class="timeline-header">
                        <span class="timeline-title">${title}</span>
                        <span class="timeline-date">${date}</span>
                    </div>
                    <div class="timeline-subtitle">${org}</div>
                    ${detailsHTML}
                `;
                previewCertificationsList.appendChild(item);
            });
        } else {
            previewCertificationsSection.style.display = 'none';
        }
    };

    document.addEventListener('formUpdated', updateCertificationsPreview);
});
