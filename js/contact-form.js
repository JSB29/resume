function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    // Add submit event handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Remove any existing error messages
        document.querySelectorAll('.form-error').forEach(el => el.remove());
        
        // Validate the form
        if (validateForm(this)) {
            // Simulate form submission (replace with actual submission in production)
            simulateFormSubmission(this);
        }
    });
    
    // Add input event listeners for real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove error messages when user starts typing
            const errorElement = this.parentNode.querySelector('.form-error');
            if (errorElement) {
                errorElement.remove();
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    
    // Validate name (not empty)
    const nameInput = form.querySelector('#name');
    if (!nameInput.value.trim()) {
        addErrorMessage(nameInput, 'Please enter your name');
        isValid = false;
    }
    
    // Validate email (proper format)
    const emailInput = form.querySelector('#email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        addErrorMessage(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message (not empty and minimum length)
    const messageInput = form.querySelector('#message');
    if (!messageInput.value.trim()) {
        addErrorMessage(messageInput, 'Please enter a message');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        addErrorMessage(messageInput, 'Your message is too short (minimum 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

function addErrorMessage(field, message) {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('form-error');
    errorDiv.textContent = message;
    
    // Add after field
    field.parentNode.appendChild(errorDiv);
    
    // Highlight the field
    field.classList.add('error');
    
    // Remove highlight on focus
    field.addEventListener('focus', function() {
        this.classList.remove('error');
    }, { once: true });
}

function simulateFormSubmission(form) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate network request
    setTimeout(() => {
        // Hide loading state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.classList.add('form-success');
        successMessage.textContent = 'Thank you! Your message has been sent successfully.';
        
        // Add to form
        form.prepend(successMessage);
        
        // Clear form
        form.reset();
        
        // Remove success message after delay
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }, 1500);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initContactForm);