function initTimeline() {
    // References to elements
    const timeline = document.querySelector('.timeline');
    const compass = document.querySelector('.timeline-compass');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (!timeline || !compass) return;
    
    // Set up scroll event to update compass position
    window.addEventListener('scroll', () => {
        updateCompassPosition();
    });
    
    // Add hover effects to timeline items
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const marker = item.querySelector('.timeline-marker');
            if (marker) {
                marker.style.transform = 'translateX(-50%) scale(1.2)';
                marker.style.backgroundColor = '#FF6B35';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const marker = item.querySelector('.timeline-marker');
            if (marker) {
                marker.style.transform = 'translateX(-50%)';
                marker.style.backgroundColor = '#0A2342';
            }
        });
    });
    
    // Initial position
    updateCompassPosition();
}

function updateCompassPosition() {
    const timeline = document.querySelector('.timeline');
    const compass = document.querySelector('.timeline-compass');
    const timelineSection = document.querySelector('.timeline-section');
    
    if (!timeline || !compass || !timelineSection) return;
    
    const timelineRect = timeline.getBoundingClientRect();
    const sectionRect = timelineSection.getBoundingClientRect();
    
    // Calculate the visible portion of the timeline
    const timelineTop = timelineRect.top;
    const timelineHeight = timelineRect.height;
    const windowHeight = window.innerHeight;
    
    // Calculate the scroll progress through the timeline
    let progress = 0;
    
    if (timelineTop <= 0) {
        // Timeline has scrolled past the top of the viewport
        progress = Math.min(1, Math.abs(timelineTop) / (timelineHeight - windowHeight));
    }
    
    // Map progress to the height of the timeline (excluding the compass size)
    const maxCompassTravel = timelineHeight - compass.offsetHeight;
    const compassPosition = progress * maxCompassTravel;
    
    // Update compass position
    compass.style.top = `${compassPosition}px`;
    
    // Add pulsing effect when compass moves
    compass.classList.add('pulsing');
    setTimeout(() => {
        compass.classList.remove('pulsing');
    }, 300);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initTimeline);