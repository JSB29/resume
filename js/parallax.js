document.addEventListener('DOMContentLoaded', function() {
    initParallax();
});

function initParallax() {
    const parallaxLayers = document.querySelectorAll('.mountain-layer');
    
    // Initial positioning
    positionParallaxLayers();
    
    // Update on scroll
    window.addEventListener('scroll', function() {
        requestAnimationFrame(positionParallaxLayers);
    });
    
    // Update on resize
    window.addEventListener('resize', function() {
        requestAnimationFrame(positionParallaxLayers);
    });
    
    function positionParallaxLayers() {
        const scrollY = window.scrollY;
        
        parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed'));
            const yPos = -(scrollY * speed);
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
}

// Create the mountain SVG dynamic background
document.addEventListener('DOMContentLoaded', function() {
    createMountainBackground();
});

function createMountainBackground() {
    // Apply mountain backgrounds to each layer
    const mountainLayers = document.querySelectorAll('.mountain-layer');
    
    mountainLayers.forEach((layer, index) => {
        // Different mountain shape and position for each layer
        const mountainSVG = createMountainSVG(index);
        layer.style.backgroundImage = `url("data:image/svg+xml;utf8,${encodeURIComponent(mountainSVG)}")`;
    });
}

function createMountainSVG(index) {
    // Create different mountain shapes based on index
    let path = '';
    const width = 1200;
    const height = 400;
    
    // Generate random peaks for each mountain layer
    switch(index) {
        case 0: // Back mountains (smallest)
            path = `M0,${height} 
                L0,280 
                L100,300 
                L200,260 
                L300,320 
                L400,280 
                L500,300 
                L600,250 
                L700,290 
                L800,270 
                L900,310 
                L1000,280 
                L1100,300 
                L1200,270 
                L1200,${height} Z`;
            break;
        case 1: // Middle mountains
            path = `M0,${height} 
                L0,220 
                L100,250 
                L200,200 
                L300,270 
                L400,220 
                L500,250 
                L600,180 
                L700,230 
                L800,200 
                L900,260 
                L1000,220 
                L1100,250 
                L1200,210 
                L1200,${height} Z`;
            break;
        case 2: // Front mountains (largest)
            path = `M0,${height} 
                L0,150 
                L100,200 
                L200,120 
                L300,220 
                L400,150 
                L500,190 
                L600,100 
                L700,170 
                L800,130 
                L900,210 
                L1000,150 
                L1100,190 
                L1200,140 
                L1200,${height} Z`;
            break;
    }
    
    // Generate SVG string
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        <path d="${path}" fill="${index === 0 ? '#193366' : index === 1 ? '#122654' : '#0A2342'}" />
    </svg>`;
    
    return svg;
}
