// Dynamic Projects Section
document.addEventListener('DOMContentLoaded', () => {
    const addProjectBtn = document.getElementById('add-project-btn');
    const projectsContainer = document.getElementById('projects-container');
    const previewProjectsSection = document.getElementById('preview-projects-section');
    const previewProjectsList = document.getElementById('preview-projects-list');
    
    let projectCount = 0;

    addProjectBtn.addEventListener('click', () => {
        projectCount++;
        
        const card = document.createElement('div');
        card.className = 'dynamic-card';
        card.id = `project-card-${projectCount}`;
        
        card.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeProject('${card.id}')"><i class="fa-solid fa-xmark"></i></button>
            <div class="form-group">
                <label>Project Title *</label>
                <input type="text" class="proj-title" placeholder="E-commerce Website" oninput="updateProjectsPreview()">
            </div>
            <div class="form-group">
                <label>Description *</label>
                <textarea class="proj-desc" rows="2" placeholder="Describe the project..." oninput="updateProjectsPreview()"></textarea>
            </div>
            <div class="form-group">
                <label>Technologies Used *</label>
                <input type="text" class="proj-tech" placeholder="HTML, CSS, JavaScript" oninput="updateProjectsPreview()">
            </div>
            <div class="input-grid">
                <div class="form-group">
                    <label>Duration</label>
                    <input type="text" class="proj-duration" placeholder="Jan 2023 - Mar 2023" oninput="updateProjectsPreview()">
                </div>
                <div class="form-group">
                    <label>Role</label>
                    <input type="text" class="proj-role" placeholder="Frontend Developer" oninput="updateProjectsPreview()">
                </div>
            </div>
            <div class="input-grid">
                <div class="form-group">
                    <label>GitHub Link</label>
                    <input type="url" class="proj-github" placeholder="https://github.com/..." oninput="updateProjectsPreview()">
                </div>
                <div class="form-group">
                    <label>Live Demo Link</label>
                    <input type="url" class="proj-demo" placeholder="https://..." oninput="updateProjectsPreview()">
                </div>
            </div>
            <div class="form-group">
                <label>Highlights (One per line)</label>
                <textarea class="proj-highlights" rows="3" placeholder="• Highlight 1\n• Highlight 2" oninput="updateProjectsPreview()"></textarea>
            </div>
        `;
        
        projectsContainer.appendChild(card);
        updateProjectsPreview();
        document.dispatchEvent(new Event('formUpdated'));
    });

    window.removeProject = (cardId) => {
        const card = document.getElementById(cardId);
        if (card) {
            card.remove();
            updateProjectsPreview();
            document.dispatchEvent(new Event('formUpdated'));
        }
    };

    window.updateProjectsPreview = () => {
        const cards = projectsContainer.querySelectorAll('.dynamic-card');
        previewProjectsList.innerHTML = '';
        
        if (cards.length > 0) {
            previewProjectsSection.style.display = 'block';
            cards.forEach(card => {
                const title = card.querySelector('.proj-title').value || 'Project Title';
                const desc = card.querySelector('.proj-desc').value;
                const tech = card.querySelector('.proj-tech').value;
                const duration = card.querySelector('.proj-duration').value;
                const role = card.querySelector('.proj-role').value;
                const github = card.querySelector('.proj-github').value;
                const demo = card.querySelector('.proj-demo').value;
                const highlights = card.querySelector('.proj-highlights').value;
                
                const item = document.createElement('div');
                item.className = 'timeline-item';
                
                let detailsHTML = '';
                if(desc) detailsHTML += `<div class="timeline-desc">${desc}</div>`;
                if(tech) detailsHTML += `<div class="timeline-desc" style="margin-top: 5px;"><strong>Technologies:</strong> ${tech}</div>`;
                if(role) detailsHTML += `<div class="timeline-desc"><strong>Role:</strong> ${role}</div>`;
                
                let linksHTML = '';
                if(github || demo) {
                    linksHTML += `<div class="timeline-desc" style="margin-top: 5px;">`;
                    if(github) linksHTML += `<strong>GitHub:</strong> ${github.replace(/^https?:\/\//, '')} `;
                    if(github && demo) linksHTML += ` | `;
                    if(demo) linksHTML += `<strong>Live Demo:</strong> ${demo.replace(/^https?:\/\//, '')}`;
                    linksHTML += `</div>`;
                }

                let highlightsHTML = '';
                if(highlights) {
                    const lines = highlights.split('\n').filter(line => line.trim() !== '');
                    if(lines.length > 0) {
                        highlightsHTML += `<div class="timeline-desc" style="margin-top: 5px;"><strong>Highlights:</strong><ul>`;
                        lines.forEach(line => {
                            highlightsHTML += `<li style="margin-left: 15px;">${line.replace(/^•\s*/, '')}</li>`;
                        });
                        highlightsHTML += `</ul></div>`;
                    }
                }

                item.innerHTML = `
                    <div class="timeline-header">
                        <span class="timeline-title">${title}</span>
                        <span class="timeline-date">${duration}</span>
                    </div>
                    ${detailsHTML}
                    ${linksHTML}
                    ${highlightsHTML}
                `;
                previewProjectsList.appendChild(item);
            });
        } else {
            previewProjectsSection.style.display = 'none';
        }
    };

    document.addEventListener('formUpdated', updateProjectsPreview);
});
