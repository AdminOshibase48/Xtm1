// Simple JavaScript for additional interactivity
document.addEventListener('DOMContentLoaded', function() {
    const redirectBtn = document.querySelector('.redirect-btn');
    
    // Add click animation
    redirectBtn.addEventListener('click', function(e) {
        // You can add analytics tracking here
        console.log('Redirecting to Google Drive...');
    });
    
    // Add some floating animation to the card
    const card = document.querySelector('.redirect-card');
    card.style.transform = 'translateY(0)';
    
    // Simple entrance animation
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
});
