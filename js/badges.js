function initAchievementBadges() {
    // Get all badges
    const badges = document.querySelectorAll('.achievement-badge');
    
    // Add click effects to all badges
    badges.forEach(badge => {
        badge.addEventListener('click', () => {
            // Don't animate locked badges when clicked
            if (!badge.classList.contains('locked')) {
                badge.classList.add('pulse');
                setTimeout(() => {
                    badge.classList.remove('pulse');
                }, 700);
            }
        });
    });
    
    // Set up scroll-based unlocking
    const lockedBadges = document.querySelectorAll('.achievement-badge.locked');
    
    if (lockedBadges.length > 0) {
        // Add scroll event listener
        window.addEventListener('scroll', () => {
            // Check each locked badge
            lockedBadges.forEach(badge => {
                // Get the scroll threshold from the data attribute
                const unlockScroll = parseInt(badge.getAttribute('data-unlock-scroll') || '0');
                
                // Check if we've scrolled past the threshold
                if (window.scrollY > unlockScroll) {
                    unlockBadge(badge);
                }
            });
        });
    }
}

function unlockBadge(badge) {
    // Only process if badge is still locked
    if (badge.classList.contains('locked')) {
        // Remove locked class
        badge.classList.remove('locked');
        
        // Add unlocking animation class
        badge.classList.add('unlocking');
        
        // Get badge name
        const badgeName = badge.getAttribute('data-badge-name') || 'Achievement';
        
        // Create notification (optional)
        const notification = document.createElement('div');
        notification.classList.add('badge-notification');
        notification.innerHTML = `
            <div class="badge-notification-icon">
                <i data-feather="award"></i>
            </div>
            <div class="badge-notification-text">
                <h4>Badge Unlocked!</h4>
                <p>${badgeName}</p>
            </div>
        `;
        
        // Add notification to the page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove notification after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
        
        // Remove animation class after it completes
        setTimeout(() => {
            badge.classList.remove('unlocking');
        }, 1000);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initAchievementBadges);