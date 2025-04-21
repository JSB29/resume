function initLoading() {
    // Check if loading screen exists
    if (!document.querySelector('.loading-screen')) {
        createLoadingScreen();
    }
    
    // Start loading animation
    animateLoading();
}

function createLoadingScreen() {
    // Create loading screen container
    const loadingScreen = document.createElement('div');
    loadingScreen.classList.add('loading-screen');
    
    // Create loading mountain
    const loadingMountain = document.createElement('div');
    loadingMountain.classList.add('loading-mountain');
    
    // Create hiker
    const loadingHiker = document.createElement('div');
    loadingHiker.classList.add('loading-hiker');
    
    // Add hiker to mountain
    loadingMountain.appendChild(loadingHiker);
    
    // Create loading progress bar
    const loadingProgress = document.createElement('div');
    loadingProgress.classList.add('loading-progress');
    
    const loadingProgressInner = document.createElement('div');
    loadingProgressInner.classList.add('loading-progress-inner');
    
    loadingProgress.appendChild(loadingProgressInner);
    
    // Create loading text
    const loadingText = document.createElement('div');
    loadingText.classList.add('loading-text');
    loadingText.textContent = 'Loading adventure...';
    
    // Assemble loading screen
    loadingScreen.appendChild(loadingMountain);
    loadingScreen.appendChild(loadingProgress);
    loadingScreen.appendChild(loadingText);
    
    // Add to document
    document.body.appendChild(loadingScreen);
}

function animateLoading() {
    const progressBar = document.querySelector('.loading-progress-inner');
    const loadingText = document.querySelector('.loading-text');
    const loadingScreen = document.querySelector('.loading-screen');
    
    if (!progressBar || !loadingText || !loadingScreen) return;
    
    // Get all resources that need to be loaded
    const images = Array.from(document.images);
    const stylesheets = Array.from(document.styleSheets);
    const scripts = Array.from(document.scripts).filter(script => script.src); // Only external scripts
    
    const totalResources = images.length + stylesheets.length + scripts.length;
    let loadedResources = 0;
    
    // Function to update progress
    function updateProgress(value, message) {
        if (progressBar) {
            progressBar.style.width = `${value}%`;
        }
        
        if (loadingText && message) {
            loadingText.textContent = message;
        }
    }
    
    // Function to finish loading
    function finishLoading() {
        updateProgress(100, 'Ready for adventure!');
        
        // Hide loading screen after a short delay
        setTimeout(() => {
            loadingScreen.classList.add('loading-hidden');
            
            // Remove from DOM after transition completes
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 500);
    }
    
    // Simulate progress for demo purposes
    // In a real application, you would check resource loading progress
    let progress = 0;
    
    // Start at 0%
    updateProgress(0, 'Starting expedition...');
    
    // Simulate incremental loading
    const loadingSteps = [
        { progress: 10, message: 'Preparing gear...' },
        { progress: 25, message: 'Packing supplies...' },
        { progress: 40, message: 'Studying the map...' },
        { progress: 60, message: 'Planning the route...' },
        { progress: 75, message: 'Checking weather...' },
        { progress: 90, message: 'Almost ready...' },
        { progress: 100, message: 'Adventure awaits!' }
    ];
    
    // Simulate loading progress
    loadingSteps.forEach((step, index) => {
        setTimeout(() => {
            updateProgress(step.progress, step.message);
            
            // If this is the last step, finish loading
            if (index === loadingSteps.length - 1) {
                setTimeout(finishLoading, 500);
            }
        }, (index + 1) * 400);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initLoading);