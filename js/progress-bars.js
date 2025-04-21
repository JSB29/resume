function initProgressBars() {
    // Get all progress bars
    const progressBars = document.querySelectorAll('.skill-progress-bar');
    
    // Set up IntersectionObserver to trigger animation when progress bars come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBar(entry.target);
                // Once animated, no need to observe anymore
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Trigger when at least 20% of the element is visible
    
    // Start observing each progress bar
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

function animateProgressBar(bar) {
    // Get the percentage from the data attribute
    const percentage = bar.getAttribute('data-percentage');
    
    // Get the inner progress element
    const progressInner = bar.querySelector('.progress-inner');
    
    // Add a small delay before animation starts
    setTimeout(() => {
        // Animate the width
        progressInner.style.width = `${percentage}%`;
    }, 300);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initProgressBars);