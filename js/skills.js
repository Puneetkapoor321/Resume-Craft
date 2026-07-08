// skills.js
document.addEventListener('DOMContentLoaded', () => {
    const predefinedSkills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'SQL', 'Git'];
    const suggestedSkillsContainer = document.getElementById('suggested-skills');
    const selectedSkillsContainer = document.getElementById('selected-skills-container');
    const previewSkillsSection = document.getElementById('preview-skills-section');
    const previewSkillsList = document.getElementById('preview-skills-list');
    
    const customSkillInput = document.getElementById('custom-skill');
    const addSkillBtn = document.getElementById('add-skill-btn');
    
    let selectedSkills = [];

    // Initialize suggested skills
    predefinedSkills.forEach(skill => {
        const badge = document.createElement('div');
        badge.className = 'skill-badge';
        badge.textContent = skill;
        badge.addEventListener('click', () => addSkill(skill));
        suggestedSkillsContainer.appendChild(badge);
    });

    // Add custom skill
    addSkillBtn.addEventListener('click', () => {
        const val = customSkillInput.value.trim();
        if(val) {
            addSkill(val);
            customSkillInput.value = '';
        }
    });

    customSkillInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            addSkillBtn.click();
        }
    });

    function addSkill(skill) {
        if(!selectedSkills.includes(skill)) {
            selectedSkills.push(skill);
            renderSelectedSkills();
        }
    }

    window.removeSkill = (skill) => {
        selectedSkills = selectedSkills.filter(s => s !== skill);
        renderSelectedSkills();
    };

    function renderSelectedSkills() {
        // Render in Form
        selectedSkillsContainer.innerHTML = '';
        selectedSkills.forEach(skill => {
            const tag = document.createElement('div');
            tag.className = 'skill-tag';
            tag.innerHTML = `${skill} <i class="fa-solid fa-xmark" onclick="removeSkill('${skill}')"></i>`;
            selectedSkillsContainer.appendChild(tag);
        });

        // Render in Preview
        previewSkillsList.innerHTML = '';
        if(selectedSkills.length > 0) {
            previewSkillsSection.style.display = 'block';
            selectedSkills.forEach(skill => {
                const pTag = document.createElement('div');
                pTag.className = 'preview-skill-tag';
                pTag.textContent = skill;
                previewSkillsList.appendChild(pTag);
            });
        } else {
            previewSkillsSection.style.display = 'none';
        }

        document.dispatchEvent(new Event('formUpdated'));
    }

    // Clear event integration
    document.getElementById('clear-form-btn')?.addEventListener('click', () => {
        selectedSkills = [];
        renderSelectedSkills();
    });
});
