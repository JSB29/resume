function initDayNightCycle() {
    // Check if we need to add the toggle button to the DOM
    if (!document.querySelector('.day-night-toggle')) {
        createDayNightToggle();
    }
    
    // Get the toggle button and icon
    const toggleBtn = document.querySelector('.day-night-toggle');
    const toggleIcon = document.querySelector('.day-night-icon');
    
    if (!toggleBtn || !toggleIcon) return;
    
    // Add stars to the toggle icon
    for (let i = 0; i < 4; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        toggleIcon.appendChild(star);
    }
    
    // Check if there's a saved preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply the saved preference or default to light mode
    updateDayNightBackground(isDarkMode);
    
    // Add click event to toggle
    toggleBtn.addEventListener('click', () => {
        // Get current state
        const isDark = toggleIcon.classList.contains('night');
        
        // Toggle the state
        updateDayNightBackground(!isDark);
        
        // Add campfire animation if configured
        if (typeof animateCampfireToggle === 'function') {
            animateCampfireToggle(!isDark);
        }
    });
}

function createDayNightToggle() {
    // Create the toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.classList.add('day-night-toggle');
    toggleBtn.setAttribute('aria-label', 'Toggle day/night mode');
    
    // Create the toggle icon
    const toggleIcon = document.createElement('div');
    toggleIcon.classList.add('day-night-icon');
    
    // Add the icon to the button
    toggleBtn.appendChild(toggleIcon);
    
    // Add the button to the body
    document.body.appendChild(toggleBtn);
}

function updateDayNightBackground(isDarkMode = false) {
    // Get the toggle icon
    const toggleIcon = document.querySelector('.day-night-icon');
    
    if (!toggleIcon) return;
    
    // Update the toggle icon state
    if (isDarkMode) {
        toggleIcon.classList.add('night');
    } else {
        toggleIcon.classList.remove('night');
    }
    
    // Save the preference
    localStorage.setItem('darkMode', isDarkMode);
    
    // Update the document's theme (for external CSS)
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // Find all elements that need to change with theme
    document.querySelectorAll('[data-theme-toggle]').forEach(el => {
        if (isDarkMode) {
            el.classList.add('dark-mode');
        } else {
            el.classList.remove('dark-mode');
        }
    });
    
    // Adjust the main background
    const body = document.body;
    if (isDarkMode) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDayNightCycle);