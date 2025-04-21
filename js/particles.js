document.addEventListener('DOMContentLoaded', function() {
    initParticles();
});

function initParticles() {
    const cursorParticlesContainer = document.querySelector('.cursor-particles');
    const particles = [];
    const maxParticles = 50;
    const particleColors = ['#FF6B35', '#0A2342', '#FF8C61', '#1A3457'];
    
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let mouseTimer;
    
    // Create particle container
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    cursorParticlesContainer.appendChild(particleCanvas);
    
    const ctx = particleCanvas.getContext('2d');
    
    // Update canvas size on window resize
    window.addEventListener('resize', function() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    });
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        // Reset the timer
        clearTimeout(mouseTimer);
        
        // Set a timeout to detect when the mouse stops moving
        mouseTimer = setTimeout(function() {
            isMouseMoving = false;
        }, 100);
        
        // Create new particles on mouse movement
        if (particles.length < maxParticles) {
            createParticle();
        }
    });
    
    // Start animation loop
    animateParticles();
    
    // Create a new particle
    function createParticle() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Define particle properties
        const particle = {
            x: mouseX,
            y: mouseY,
            size: Math.random() * 5 + 1,
            color: particleColors[Math.floor(Math.random() * particleColors.length)],
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            life: 100,
            opacity: 1,
            // Use different particle types based on light/dark mode
            type: isDarkMode ? 'star' : 'spark'
        };
        
        particles.push(particle);
    }
    
    // Update and draw particles
    function animateParticles() {
        // Clear canvas
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        // Update and draw each particle
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Update particle position
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Decrease life and opacity
            p.life -= 1;
            p.opacity = p.life / 100;
            
            // Draw particle based on type
            if (p.type === 'star') {
                drawStar(ctx, p.x, p.y, p.size, p.color, p.opacity);
            } else {
                drawSpark(ctx, p.x, p.y, p.size, p.color, p.opacity);
            }
            
            // Remove dead particles
            if (p.life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        
        // Request next frame
        requestAnimationFrame(animateParticles);
    }
    
    // Draw star-shaped particle (for dark mode)
    function drawStar(ctx, x, y, size, color, opacity) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        
        // Draw a 4-point star
        for (let i = 0; i < 4; i++) {
            ctx.lineTo(0, size);
            ctx.lineTo(size / 2, size / 2);
            ctx.rotate(Math.PI / 2);
        }
        
        ctx.closePath();
        ctx.fillStyle = `rgba(${hexToRgb(color)}, ${opacity})`;
        ctx.fill();
        ctx.restore();
    }
    
    // Draw spark-shaped particle (for light mode)
    function drawSpark(ctx, x, y, size, color, opacity) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = `rgba(${hexToRgb(color)}, ${opacity})`;
        ctx.shadowColor = color;
        ctx.shadowBlur = size * 2;
        ctx.fill();
        ctx.restore();
    }
    
    // Helper function to convert hex color to RGB
    function hexToRgb(hex) {
        // Remove # if present
        hex = hex.replace('#', '');
        
        // Parse the color components
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return `${r}, ${g}, ${b}`;
    }
}
