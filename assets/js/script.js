// ========================================
// ANNOUNCEMENT POPUP FUNCTIONS
// ========================================

// Fungsi untuk menampilkan popup announcement
function showAnnouncementPopup() {
    // Cek apakah popup sudah pernah ditampilkan hari ini
    const popupShown = localStorage.getItem('popupShown');
    const today = new Date().toDateString();
    
    // Jika belum pernah ditampilkan hari ini, tampilkan popup
    if (popupShown !== today) {
        setTimeout(function() {
            const popup = document.getElementById('announcement-popup');
            if (popup) {
                popup.style.display = 'flex';
                localStorage.setItem('popupShown', today);
                console.log('✅ Popup announcement ditampilkan');
                
                // Mulai timer countdown
                startCountdownTimer();
            }
        }, 1000); // Tampilkan setelah 1 detik
    }
}

// Fungsi untuk setup tombol popup
function setupPopupButtons() {
    // Tombol close (X)
    const closeBtn = document.getElementById('close-popup');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            const popup = document.getElementById('announcement-popup');
            if (popup) {
                popup.style.display = 'none';
                console.log('❌ Popup ditutup');
            }
        });
    }
    
    // Tombol "Jelajahi Sekarang"
    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const popup = document.getElementById('announcement-popup');
            if (popup) {
                popup.style.display = 'none';
                console.log('📍 Tombol Jelajahi diklik');
                
                // Scroll ke section About
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Trigger robot greeting
                setTimeout(function() {
                    const robotSpeech = document.getElementById('robotSpeech');
                    if (robotSpeech) {
                        robotSpeech.textContent = 'Yuk jelajahi fitur AI beta kami! 🤖✨';
                        robotSpeech.style.opacity = '1';
                        
                        setTimeout(function() {
                            robotSpeech.style.opacity = '0';
                        }, 4000);
                    }
                }, 1000);
            }
        });
    }
    
    // Tombol "Nanti Saja"
    const closeLaterBtn = document.getElementById('close-btn');
    if (closeLaterBtn) {
        closeLaterBtn.addEventListener('click', function() {
            const popup = document.getElementById('announcement-popup');
            if (popup) {
                popup.style.display = 'none';
                console.log('⏳ Popup ditutup (nanti saja)');
            }
        });
    }
    
    // Close popup dengan klik di luar area
    const popupOverlay = document.getElementById('announcement-popup');
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                console.log('🖱️ Popup ditutup (klik luar)');
            }
        });
    }
    
    // Close popup dengan tombol Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const popup = document.getElementById('announcement-popup');
            if (popup && popup.style.display === 'flex') {
                popup.style.display = 'none';
                console.log('⌨️ Popup ditutup (Escape)');
            }
        }
    });
}

// Fungsi untuk countdown timer
function startCountdownTimer() {
    // Set target date (30 hari dari sekarang)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        
        if (timeLeft < 0) {
            // Timer selesai
            return;
        }
        
        // Hitung hari, jam, menit, detik
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Update tampilan
        const daysElement = document.getElementById('popup-days');
        const hoursElement = document.getElementById('popup-hours');
        const minutesElement = document.getElementById('popup-minutes');
        const secondsElement = document.getElementById('popup-seconds');
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update timer setiap detik
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Fungsi untuk reset popup setelah 7 hari
function checkLastVisit() {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date().getTime();
    
    if (lastVisit) {
        const daysSinceLastVisit = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastVisit >= 7) {
            // Reset popup untuk returning visitor
            localStorage.removeItem('popupShown');
            console.log('🔄 Popup direset (7 hari)');
        }
    }
    
    // Update last visit time
    localStorage.setItem('lastVisit', now.toString());
}

// ========================================
// INTEGRASI KE INITIALIZATION
// ========================================

// Tambahkan fungsi initPopup ke DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Panggil fungsi popup setelah inisialisasi lainnya
    setTimeout(function() {
        showAnnouncementPopup();
        setupPopupButtons();
        checkLastVisit();
    }, 500);
    
    // Sisanya tetap sama seperti sebelumnya...
    initNavigation();
    initRobot();
    initMembers();
    initFeed();
    initGames();
    initThemeToggle();
    initMusicControl();
    initScrollAnimations();
    
    console.log('✅ XTM1 Space berhasil dimuat!');
});

// ========================================
// TAMBAHAN CSS UNTUK POPUP (Tambahkan ke style.css)
// ========================================
/*
Tambahkan kode CSS ini ke file style.css Anda:

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideIn {
    from { 
        opacity: 0;
        transform: translateY(-50px) scale(0.9);
    }
    to { 
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* Responsive untuk mobile */
@media (max-width: 768px) {
    #announcement-popup > div {
        padding: 25px 20px !important;
        width: 95% !important;
        margin: 10px !important;
    }
    
    #announcement-popup h2 {
        font-size: 2rem !important;
    }
    
    #announcement-popup .timer-container {
        gap: 5px !important;
    }
    
    #announcement-popup .timer-item {
        padding: 10px !important;
        min-width: 50px !important;
    }
    
    #announcement-popup .action-button {
        padding: 10px 20px !important;
    }
}

@media (max-width: 480px) {
    #announcement-popup > div {
        padding: 20px 15px !important;
    }
    
    #announcement-popup h2 {
        font-size: 1.8rem !important;
    }
    
    #announcement-popup .timer-container {
        flex-wrap: wrap;
        justify-content: center;
    }
    
    #announcement-popup .timer-item {
        flex: 1;
        min-width: 70px !important;
        margin: 5px;
    }
    
    #announcement-popup .action-buttons {
        flex-direction: column;
        gap: 10px;
    }
}
*/

// ========================================
// FUNGSI UTILITY TAMBAHAN UNTUK POPUP
// ========================================

// Fungsi untuk mengecek apakah popup sudah ada di HTML
function checkPopupExists() {
    const popup = document.getElementById('announcement-popup');
    if (!popup) {
        console.log('⚠️ Popup element tidak ditemukan di HTML');
        return false;
    }
    return true;
}

// Fungsi untuk debug popup
function debugPopup() {
    const popup = document.getElementById('announcement-popup');
    if (popup) {
        console.log('🔍 Debug Popup:');
        console.log('- Display style:', popup.style.display);
        console.log('- Element exists:', true);
        console.log('- Child count:', popup.children.length);
        
        // Check buttons
        const buttons = {
            'close-popup': document.getElementById('close-popup'),
            'explore-btn': document.getElementById('explore-btn'),
            'close-btn': document.getElementById('close-btn')
        };
        
        for (const [id, element] of Object.entries(buttons)) {
            console.log(`- ${id}:`, element ? 'Found' : 'Not found');
        }
    } else {
        console.log('❌ Popup element tidak ditemukan');
    }
}

// Panggil debug jika diperlukan
// debugPopup();

console.log('✅ Popup functions loaded successfully!');
