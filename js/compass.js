function initCompassNavigation() {
    // Check if we need to create the compass element
    if (document.querySelector('.nav-compass') && !document.querySelector('.compass-circle')) {
        createCompass();
    }
    
    // Add scroll event listener to update compass direction
    window.addEventListener('scroll', updateCompassDirection);
    
    // Initial update
    updateCompassDirection();
}

function createCompass() {
    const compassContainer = document.querySelector('.nav-compass');
    
    if (!compassContainer) return;
    
    // Create the compass circle
    const compassCircle = document.createElement('div');
    compassCircle.classList.add('compass-circle');
    
    // Create the compass needle
    const compassNeedle = document.createElement('div');
    compassNeedle.classList.add('compass-needle');
    
    // Create the direction indicator
    const compassDirection = document.createElement('div');
    compassDirection.classList.add('compass-direction');
    compassDirection.textContent = 'N';
    
    // Add needle and direction to circle
    compassCircle.appendChild(compassNeedle);
    compassCircle.appendChild(compassDirection);
    
    // Add circle to container
    compassContainer.appendChild(compassCircle);
    
    // Add click event to scroll to top
    compassContainer.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function updateCompassDirection() {
    const compassNeedle = document.querySelector('.compass-needle');
    const compassDirection = document.querySelector('.compass-direction');
    
    if (!compassNeedle || !compassDirection) return;
    
    // Calculate scroll progress (0 to 1)
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(1, Math.max(0, window.scrollY / scrollHeight));
    
    // Convert to degrees (0 to 360)
    const degrees = scrollProgress * 360;
    
    // Update needle rotation
    compassNeedle.style.transform = `translate(-50%, -50%) rotate(${degrees}deg)`;
    
    // Determine cardinal direction
    let direction = 'N';
    if (degrees > 45 && degrees <= 135) {
        direction = 'E';
    } else if (degrees > 135 && degrees <= 225) {
        direction = 'S';
    } else if (degrees > 225 && degrees <= 315) {
        direction = 'W';
    }
    
    // Update direction text
    compassDirection.textContent = direction;
    
    // Add active class when scrolled
    const compassContainer = document.querySelector('.nav-compass');
    if (compassContainer) {
        if (scrollProgress > 0.05) {
            compassContainer.classList.add('active');
        } else {
            compassContainer.classList.remove('active');
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initCompassNavigation);