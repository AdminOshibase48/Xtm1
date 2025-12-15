// Countdown Timer
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    
    // Set waktu maintenance 8 jam dari sekarang
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 8);
    
    function updateCountdown() {
        const now = new Date();
        const diff = endTime - now;
        
        if (diff <= 0) {
            countdownElement.textContent = "00:00:00";
            countdownElement.style.color = "#4CAF50";
            document.querySelector('.status-text').textContent = "MAINTENANCE COMPLETED";
            document.querySelector('.status-dot').style.background = "#4CAF50";
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownElement.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Ubah warna saat kurang dari 1 jam
        if (hours === 0 && minutes < 60) {
            countdownElement.style.color = "#FF9800";
            countdownElement.style.animation = "pulse-glow 1s infinite";
        }
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
}

// Progress bar animation
function animateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    let progress = 75;
    
    setInterval(() => {
        if (progress < 100) {
            progress += 0.1;
            if (progress > 100) progress = 100;
            
            progressFill.style.width = progress + '%';
            progressText.textContent = Math.floor(progress) + '% Selesai';
            
            // Update progress items
            updateProgressItems(progress);
        }
    }, 5000); // Update setiap 5 detik
}

function updateProgressItems(progress) {
    const updateItems = document.querySelectorAll('.update-item');
    
    if (progress >= 75 && progress < 85) {
        updateItems[2].querySelector('i').className = 'fas fa-sync-alt in-progress';
        updateItems[2].querySelector('.update-time').textContent = '🔄 Sedang berjalan';
    } else if (progress >= 85 && progress < 95) {
        updateItems[2].querySelector('i').className = 'fas fa-check-circle completed';
        updateItems[2].querySelector('.update-time').textContent = '✓ Selesai';
        updateItems[3].querySelector('i').className = 'fas fa-sync-alt in-progress';
        updateItems[3].querySelector('.update-time').textContent = '🔄 Sedang berjalan';
    } else if (progress >= 95) {
        updateItems[3].querySelector('i').className = 'fas fa-check-circle completed';
        updateItems[3].querySelector('.update-time').textContent = '✓ Selesai';
    }
}

// Robot interaction
function robotSpeak() {
    const speechBubble = document.getElementById('robot-speech');
    const messages = [
        "Sistem sedang maintenance! Sabar ya...",
        "Update hampir selesai nih!",
        "Tim kami sedang bekerja keras!",
        "Website akan lebih keren setelah ini!",
        "Tunggu sebentar ya...",
        "Sedang optimasi performa nih!"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    speechBubble.textContent = randomMessage;
    
    // Show speech bubble
    speechBubble.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        speechBubble.classList.remove('show');
    }, 3000);
}

// Check if website is accessible
function checkAccess() {
    // Simulate checking maintenance status
    const isMaintenanceActive = true; // In real app, this would be an API call
    
    if (isMaintenanceActive) {
        // Show notification
        showNotification('⚠️ Maintenance masih berlangsung. Silakan coba lagi nanti.', 'warning');
        
        // Robot speaks
        setTimeout(robotSpeak, 500);
    } else {
        // Redirect to main site
        window.location.href = "index.html";
    }
}

// Refresh status
function refreshStatus() {
    const refreshBtn = event?.target || document.querySelector('.glow-btn.secondary');
    const originalText = refreshBtn.innerHTML;
    
    // Show loading state
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memperbarui...';
    refreshBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In real app, fetch actual status from server
        const currentTime = new Date().toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Show notification
        showNotification(`✅ Status diperbarui (${currentTime})`, 'success');
        
        // Reset button
        refreshBtn.innerHTML = originalText;
        refreshBtn.disabled = false;
        
        // Update progress randomly
        const progressFill = document.querySelector('.progress-fill');
        const currentProgress = parseFloat(progressFill.style.width);
        if (currentProgress < 100) {
            const newProgress = Math.min(currentProgress + 1, 100);
            progressFill.style.width = newProgress + '%';
            document.querySelector('.progress-text').textContent = Math.floor(newProgress) + '% Selesai';
        }
    }, 1500);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(255, 152, 0, 0.9)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        border-left: 4px solid ${type === 'success' ? '#388E3C' : '#F57C00'};
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: 10px;
        opacity: 0.7;
        transition: opacity 0.3s;
    }
    
    .notification button:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Auto refresh progress items
setInterval(() => {
    const updateItems = document.querySelectorAll('.update-item');
    const times = updateItems[0].querySelector('.update-time');
    const currentTime = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Update "last updated" time
    if (times) {
        times.textContent = `✓ ${currentTime}`;
    }
}, 60000); // Update setiap 1 menit

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    animateProgressBar();
    
    // Add click event to robot
    document.querySelector('.robot').addEventListener('click', robotSpeak);
    
    // Auto show robot speech on page load
    setTimeout(robotSpeak, 2000);
    
    // Check if maintenance is done every 5 minutes
    setInterval(checkMaintenanceStatus, 5 * 60 * 1000);
});

// Check maintenance status (simulated)
function checkMaintenanceStatus() {
    // In real app, this would be an API call to check if maintenance is done
    console.log("Checking maintenance status...");
    
    // Simulate: 10% chance maintenance is done
    const isDone = Math.random() < 0.1;
    
    if (isDone) {
        showNotification('🎉 Maintenance selesai! Website akan segera aktif kembali.', 'success');
    }
}
