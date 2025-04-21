// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initScrollEffects();
    
    // Initialize Feather icons if not already initialized
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check if user has a preference stored
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }
    
    themeToggle.addEventListener('click', function() {
        // Toggle dark/light mode
        body.classList.toggle('dark-mode');
        
        // Save preference
        const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        localStorage.setItem('theme', currentTheme);
        
        // Animate campfire on toggle
        animateCampfireToggle();
    });
}

// Animate campfire when toggling themes
function animateCampfireToggle() {
    const flames = document.querySelectorAll('.flame');
    
    // Create a flicker animation
    flames.forEach(flame => {
        flame.style.animation = 'none';
        flame.offsetHeight; // Trigger reflow
        flame.style.animation = 'flicker 0.5s infinite alternate';
    });
    
    // Add a burst effect
    const campfire = document.querySelector('.campfire');
    campfire.classList.add('toggle-burst');
    
    // Remove the effect after animation completes
    setTimeout(() => {
        campfire.classList.remove('toggle-burst');
    }, 500);
}

// Initialize scroll effects
function initScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Change navigation background opacity on scroll
        updateNavOpacity(scrollPosition);
        
        // Add fade-in effect to sections as they come into view
        fadeInSections(scrollPosition);
    });
}

// Update navigation opacity based on scroll position
function updateNavOpacity(scrollPosition) {
    const nav = document.querySelector('.main-nav');
    const maxScroll = 200;
    const scrollRatio = Math.min(scrollPosition / maxScroll, 1);
    
    if (document.body.classList.contains('dark-mode')) {
        nav.style.backgroundColor = `rgba(10, 35, 66, ${0.9 + scrollRatio * 0.1})`;
    } else {
        nav.style.backgroundColor = `rgba(255, 255, 255, ${0.9 + scrollRatio * 0.1})`;
    }
    
    // Add box shadow when scrolled
    if (scrollPosition > 50) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
}

// Fade in sections as they come into view
function fadeInSections(scrollPosition) {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = sectionTop < windowHeight - 100;
        
        if (sectionVisible) {
            section.classList.add('visible');
        }
    });
}

// Smooth scroll to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});
