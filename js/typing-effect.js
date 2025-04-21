function initTypingEffect() {
    const textElement = document.querySelector('.hero-subtitle');
    
    if (!textElement) return;
    
    // Store the original text and clear it
    const originalText = textElement.textContent;
    textElement.textContent = '';
    textElement.classList.add('typing-text');
    
    // Start typing
    setTimeout(() => {
        typeText(textElement, originalText, 0, 70);
    }, 1000);
}

function typeText(element, text, index, speed) {
    if (index < text.length) {
        // Add next character
        element.textContent += text.charAt(index);
        
        // Continue with next character after delay
        setTimeout(() => {
            typeText(element, text, index + 1, speed);
        }, speed);
    } else {
        // Typing is complete, remove cursor effect
        setTimeout(() => {
            element.classList.remove('typing-text');
        }, 1500);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initTypingEffect);