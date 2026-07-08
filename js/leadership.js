// Dynamic Leadership & Achievements Section
document.addEventListener('DOMContentLoaded', () => {
    const addLeadershipBtn = document.getElementById('add-leadership-btn');
    const leadershipContainer = document.getElementById('leadership-container');
    const previewLeadershipSection = document.getElementById('preview-leadership-section');
    const previewLeadershipList = document.getElementById('preview-leadership-list');
    
    let leadershipCount = 0;

    addLeadershipBtn.addEventListener('click', () => {
        leadershipCount++;
        
        const card = document.createElement('div');
        card.className = 'dynamic-card';
        card.id = `leadership-card-${leadershipCount}`;
        
        card.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeLeadership('${card.id}')"><i class="fa-solid fa-xmark"></i></button>
            <div class="form-group">
                <label>Position / Role *</label>
                <input type="text" class="lead-role" placeholder="Campus Ambassador" oninput="updateLeadershipPreview()">
            </div>
            <div class="form-group">
                <label>Organization *</label>
                <input type="text" class="lead-org" placeholder="GeeksforGeeks" oninput="updateLeadershipPreview()">
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" class="lead-duration" placeholder="2022 - Present" oninput="updateLeadershipPreview()">
            </div>
            <div class="form-group">
                <label>Achievement Description</label>
                <textarea class="lead-desc" rows="3" placeholder="Describe your achievements (one per line for bullets)..." oninput="updateLeadershipPreview()"></textarea>
            </div>
        `;
        
        leadershipContainer.appendChild(card);
        updateLeadershipPreview();
        document.dispatchEvent(new Event('formUpdated'));
    });

    window.removeLeadership = (cardId) => {
        const card = document.getElementById(cardId);
        if (card) {
            card.remove();
            updateLeadershipPreview();
            document.dispatchEvent(new Event('formUpdated'));
        }
    };

    window.updateLeadershipPreview = () => {
        const cards = leadershipContainer.querySelectorAll('.dynamic-card');
        previewLeadershipList.innerHTML = '';
        
        if (cards.length > 0) {
            previewLeadershipSection.style.display = 'block';
            cards.forEach(card => {
                const role = card.querySelector('.lead-role').value || 'Position';
                const org = card.querySelector('.lead-org').value || 'Organization';
                const duration = card.querySelector('.lead-duration').value;
                const desc = card.querySelector('.lead-desc').value;
                
                const item = document.createElement('div');
                item.className = 'timeline-item';
                
                let descHTML = '';
                if(desc) {
                    const lines = desc.split('\n').filter(line => line.trim() !== '');
                    if(lines.length > 1) {
                         descHTML += `<div class="timeline-desc" style="margin-top: 5px;"><ul>`;
                         lines.forEach(line => {
                             descHTML += `<li style="margin-left: 15px;">${line.replace(/^•\s*/, '')}</li>`;
                         });
                         descHTML += `</ul></div>`;
                    } else if(lines.length === 1) {
                        descHTML = `<div class="timeline-desc">${lines[0].replace(/^•\s*/, '')}</div>`;
                    }
                }

                item.innerHTML = `
                    <div class="timeline-header">
                        <span class="timeline-title">${role}</span>
                        <span class="timeline-date">${duration}</span>
                    </div>
                    <div class="timeline-subtitle">${org}</div>
                    ${descHTML}
                `;
                previewLeadershipList.appendChild(item);
            });
        } else {
            previewLeadershipSection.style.display = 'none';
        }
    };

    document.addEventListener('formUpdated', updateLeadershipPreview);
});
