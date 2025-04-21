function initResumeDownload() {
    // Get the download button
    const downloadBtn = document.querySelector('.resume-download-btn');
    
    if (!downloadBtn) return;
    
    // Add click event listener
    downloadBtn.addEventListener('click', function() {
        // Animate the button
        animateDownload(this);
        
        // Generate and download the resume
        setTimeout(() => {
            generateResume();
        }, 1000);
    });
}

function animateDownload(button) {
    // Add loading class
    button.classList.add('loading');
    
    // Change text
    const originalText = button.innerHTML;
    button.innerHTML = '<i data-feather="loader"></i> Generating Resume...';
    
    // Update the feather icon
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // Disable button during download
    button.disabled = true;
    
    // Set timeout to restore button state
    setTimeout(() => {
        button.classList.remove('loading');
        button.innerHTML = originalText;
        
        // Update the feather icon
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
        
        button.disabled = false;
    }, 2000);
}

function generateResume() {
    // Get user information from the page
    const name = document.querySelector('.hero-title') ? document.querySelector('.hero-title').textContent : 'Jashpreet Singh Bagga';
    const title = document.querySelector('.hero-subtitle') ? document.querySelector('.hero-subtitle').textContent : 'BBA Digital Business and Entrepreneurship';
    
    // Collect skills
    const skills = [];
    document.querySelectorAll('.skill-card h3').forEach(skill => {
        skills.push(skill.textContent);
    });
    
    // Collect experiences
    const experiences = [];
    document.querySelectorAll('.timeline-item').forEach(item => {
        const title = item.querySelector('h3') ? item.querySelector('h3').textContent : '';
        const date = item.querySelector('.timeline-date') ? item.querySelector('.timeline-date').textContent : '';
        const description = item.querySelector('p') ? item.querySelector('p').textContent : '';
        
        if (title && date) {
            experiences.push({ title, date, description });
        }
    });
    
    // Create a simple text version of the resume
    let resumeText = `RESUME - ${name}\n`;
    resumeText += `${title}\n\n`;
    
    resumeText += `CONTACT\n`;
    resumeText += `Phone: 9420868652\n`;
    resumeText += `LinkedIn: https://www.linkedin.com/in/jashpreet-singh-bagga-88975a349\n\n`;
    
    resumeText += `SKILLS\n`;
    skills.forEach(skill => {
        resumeText += `- ${skill}\n`;
    });
    resumeText += `\n`;
    
    resumeText += `EXPERIENCE & EDUCATION\n`;
    experiences.forEach(exp => {
        resumeText += `${exp.title} (${exp.date})\n`;
        resumeText += `${exp.description}\n\n`;
    });
    
    // Create a Blob and download it
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.replace(/\s+/g, '_')}_Resume.txt`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initResumeDownload);