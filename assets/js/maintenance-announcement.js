// Countdown Timer
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    
    // Set end time (6 hours from now)
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 6);
    
    function updateCountdown() {
        const now = new Date();
        const diff = endTime - now;
        
        if (diff <= 0) {
            countdownElement.textContent = "00:00:00";
            countdownElement.style.color = "#4CAF50";
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownElement.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Change color when less than 1 hour remaining
        if (hours === 0 && minutes < 60) {
            countdownElement.style.color = "#FF9800";
        }
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
}

// Check if maintenance is still active
function checkStatus() {
    // In real implementation, you would check an API or server status
    // For now, we'll simulate checking
    
    const isStillMaintenance = true; // Change to false when maintenance is done
    
    if (isStillMaintenance) {
        alert("⚠️ Maintenance masih berlangsung. Silakan coba lagi nanti.");
    } else {
        // Redirect to main website
        window.location.href = "index.html";
    }
}

// Auto-refresh progress bar animation
function animateProgressBar() {
    const progressBar = document.querySelector('.progress');
    let width = 65;
    
    setInterval(() => {
        if (width < 100) {
            width += Math.random() * 0.5; // Slowly increase progress
            if (width > 100) width = 100;
            progressBar.style.width = width + '%';
            document.querySelector('.progress-text').textContent = Math.floor(width) + '% Complete';
        }
    }, 3000); // Update every 3 seconds
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    animateProgressBar();
    
    // Add click event to refresh button
    document.querySelector('.refresh-btn').addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Refreshing...';
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Status';
            // In real app, you would fetch new status here
        }, 1500);
    });
    
    // Check for maintenance status every 30 seconds
    setInterval(() => {
        // This would be an API call in real implementation
        console.log("Checking maintenance status...");
    }, 30000);
});
