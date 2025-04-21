document.addEventListener('DOMContentLoaded', function() {
    initFlipCards();
});

function initFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        // Add click listener to each card
        card.addEventListener('click', function() {
            const inner = this.querySelector('.flip-card-inner');
            
            // Toggle flipped state
            if (inner.style.transform === 'rotateY(180deg)') {
                inner.style.transform = 'rotateY(0deg)';
            } else {
                inner.style.transform = 'rotateY(180deg)';
            }
            
            // Add glowing effect on flip
            addGlowEffect(card);
        });
        
        // Add hover animations
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-active');
            createCardParticles(card);
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
        });
    });
}

// Add temporary glow effect when card is flipped
function addGlowEffect(card) {
    const front = card.querySelector('.flip-card-front');
    const back = card.querySelector('.flip-card-back');
    
    // Add glow class
    front.classList.add('glow-effect');
    back.classList.add('glow-effect');
    
    // Remove after animation completes
    setTimeout(() => {
        front.classList.remove('glow-effect');
        back.classList.remove('glow-effect');
    }, 600);
}

// Create particle effect around cards on hover
function createCardParticles(card) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create particles at the edges of the card
    for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * (rect.width / 2);
        const y = centerY + Math.sin(angle) * (rect.height / 2);
        
        // Create a particle at this position
        createParticleAt(x, y);
    }
}

// Helper function to create a particle at a specific position
function createParticleAt(x, y) {
    // Check if particles system is initialized
    const particlesContainer = document.querySelector('.cursor-particles');
    if (!particlesContainer) return;
    
    // Simulate a mouse event at this position to create particles
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: x,
        clientY: y,
        bubbles: true,
        cancelable: true
    });
    
    document.dispatchEvent(mouseEvent);
}

// Add 3D tilt effect to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.flip-card, .skill-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
    
    function handleTilt(e) {
        const card = this;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = (y - centerY) / 10;
        const tiltY = -(x - centerX) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }
    
    function resetTilt() {
        // Reset but keep any other transformations (like flipping)
        this.style.transform = '';
    }
});
