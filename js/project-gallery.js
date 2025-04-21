function initProjectGallery() {
    // Get all filter buttons and project cards
    const filterButtons = document.querySelectorAll('.project-filter-button');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the selected filter
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            filterProjects(filter, projectCards);
            
            // Animate the transition
            animateFilterChange();
        });
    });
    
    // Add click events to project cards to open modals
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            openProjectModal(card);
        });
    });
    
    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        const modal = document.querySelector('.project-modal');
        if (modal && !modal.contains(e.target) && !Array.from(projectCards).some(card => card.contains(e.target))) {
            closeProjectModal();
        }
    });
}

function filterProjects(filter, projectCards) {
    projectCards.forEach(card => {
        // Get categories for this card
        const categories = card.getAttribute('data-categories');
        
        // Check if card matches filter or if filter is 'all'
        if (filter === 'all' || categories.includes(filter)) {
            card.style.display = '';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

function animateFilterChange() {
    // Add some visual effect to indicate filter change
    const gallery = document.querySelector('.project-gallery');
    if (gallery) {
        gallery.classList.add('filtering');
        setTimeout(() => {
            gallery.classList.remove('filtering');
        }, 500);
    }
}

function openProjectModal(projectCard) {
    // Close any existing modal
    closeProjectModal();
    
    // Get project details
    const title = projectCard.querySelector('.project-title').textContent;
    const description = projectCard.querySelector('.project-description').textContent;
    const imageUrl = projectCard.querySelector('.project-image').getAttribute('src');
    const technologies = projectCard.getAttribute('data-technologies') || '';
    const year = projectCard.getAttribute('data-year') || '';
    
    // Create modal
    const modal = document.createElement('div');
    modal.classList.add('project-modal');
    
    // Set modal content
    modal.innerHTML = `
        <div class="project-modal-content">
            <button class="modal-close-btn">&times;</button>
            <div class="modal-image-container">
                <img src="${imageUrl}" alt="${title}" class="modal-image">
            </div>
            <div class="modal-details">
                <h2 class="modal-title">${title}</h2>
                <div class="modal-metadata">
                    <span class="modal-year">${year}</span>
                    <span class="modal-technologies">${technologies}</span>
                </div>
                <p class="modal-description">${description}</p>
                <div class="modal-links">
                    <a href="javascript:void(0)" class="modal-link">View Project</a>
                    <a href="javascript:void(0)" class="modal-link">GitHub</a>
                </div>
            </div>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Add close button event
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProjectModal);
    }
}

function closeProjectModal() {
    const modal = document.querySelector('.project-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initProjectGallery);