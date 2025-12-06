// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the saved theme
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Theme toggle event
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            // Switch to light mode
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark mode
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    // ========== MUSIC CONTROL - FIXED VERSION ==========
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    if (musicToggle && bgMusic) {
        const musicIcon = musicToggle.querySelector('i');
        let isPlaying = false;
        
        // Setup music
        bgMusic.volume = 0.3;
        bgMusic.preload = 'metadata';
        
        function toggleMusic() {
            if (isPlaying) {
                // Pause music
                bgMusic.pause();
                isPlaying = false;
                musicIcon.className = 'fas fa-music';
                musicToggle.classList.remove('playing');
            } else {
                // Play music dengan error handling
                const playPromise = bgMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            isPlaying = true;
                            musicIcon.className = 'fas fa-volume-up';
                            musicToggle.classList.add('playing');
                        })
                        .catch(error => {
                            console.log('Music play failed:', error);
                            isPlaying = false;
                            musicIcon.className = 'fas fa-music';
                        });
                }
            }
        }
        
        musicToggle.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            toggleMusic();
        });
        
        // Pause music ketika tab tidak aktif
        document.addEventListener('visibilitychange', function() {
            if (document.hidden && isPlaying) {
                bgMusic.pause();
            }
        });
    }
    
    // Add animation delays for staggered animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add hover effects to folder cards
    const folderCards = document.querySelectorAll('.folder-card');
    folderCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add loading animation for drive access button
    const driveAccessBtn = document.querySelector('.drive-access-btn');
    if (driveAccessBtn) {
        driveAccessBtn.addEventListener('click', function(e) {
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengarahkan ke Drive...';
            this.style.opacity = '0.8';
            
            // Reset after 2 seconds (in case redirect fails)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.opacity = '1';
            }, 2000);
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.folder-card, .quick-link, .drive-access-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Console welcome message
    console.log(`
    🚀 Selamat datang di XTM1 DOCS!
    📁 Dokumentasi Kelas Mekatronika
    👥 41 Anggota | 📚 50+ File
    🔗 Klik Liknya tuhh disana etdah 
    `);
});

// =====================================================
// POPUP PENGUMUMAN - STRATEGI MARKETING YANG BENAR
// =====================================================

// Announcement Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const announcementPopup = document.getElementById('announcement-popup');
    const closeBtn = document.querySelector('.announcement-close');
    const closePermanentlyBtn = document.getElementById('close-permanently');
    const tryBotBtn = document.getElementById('try-bot-btn');
    
    // Jika elemen popup tidak ditemukan, jangan jalankan kode ini
    if (!announcementPopup) {
        console.log('❌ Popup pengumuman tidak ditemukan');
        return;
    }
    
    console.log('✅ Popup ditemukan, siap ditampilkan');
    
    // 🔴 STRATEGI MARKETING YANG BENAR:
    // 1. HANYA cek jika user sudah pernah KLIK "COBA CHATBOT"
    // 2. JANGAN cek untuk tombol "Nanti Saja" atau "Close"
    const hasTriedChatbot = localStorage.getItem('hasTriedChatbot');
    
    // Tampilkan popup SETIAP KALI, kecuali user sudah pernah klik "Coba Chatbot"
    setTimeout(() => {
        if (!hasTriedChatbot) {
            announcementPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('📢 Popup ditampilkan untuk marketing!');
        } else {
            console.log('😊 User sudah pernah mencoba chatbot, popup disembunyikan');
        }
    }, 1500); // Delay 1.5 detik agar user lihat website dulu
    
    // Fungsi untuk menutup popup
    function closeAnnouncement() {
        announcementPopup.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // 1. TOMBOL CLOSE (×) - Hanya tutup untuk sesi ini
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeAnnouncement();
            console.log('❌ Popup ditutup, tapi besok muncul lagi');
        });
    }
    
    // 2. TOMBOL "NANTI SAJA" - Hanya tutup untuk sesi ini
    if (closePermanentlyBtn) {
        closePermanentlyBtn.addEventListener('click', function() {
            closeAnnouncement();
            console.log('⏸️ User pilih "Nanti Saja", besok muncul lagi');
        });
    }
    
    // 3. 🚀 TOMBOL "COBA CHATBOT" - INI SATU-SATUNYA YANG SIMPAN KE localStorage
    if (tryBotBtn) {
        tryBotBtn.addEventListener('click', function() {
            closeAnnouncement();
            
            // ⚡ SIMPAN BAHWA USER SUDAH COBA CHATBOT
            localStorage.setItem('hasTriedChatbot', 'true');
            console.log('✅ User klik "Coba Chatbot", tidak akan muncul lagi');
            
            // Buka chatbot di tab baru
            const chatbotUrl = 'https://xmekatronika1ai.infinityfree.me/';
            window.open(chatbotUrl, '_blank');
            console.log('🤖 Chatbot dibuka:', chatbotUrl);
        });
    }
    
    // Tutup popup ketika klik di luar area konten
    announcementPopup.addEventListener('click', function(e) {
        if (e.target === announcementPopup) {
            closeAnnouncement();
            console.log('🖱️ Klik di luar popup, besok muncul lagi');
        }
    });
    
    // Tutup dengan tombol ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && announcementPopup.classList.contains('active')) {
            closeAnnouncement();
            console.log('⌨️ ESC ditekan, besok muncul lagi');
        }
    });
});

// 🔧 FUNGSI UNTUK TESTING & RESET
function resetChatbotPreference() {
    localStorage.removeItem('hasTriedChatbot');
    console.log('🔄 Preference direset, popup akan muncul lagi');
    location.reload();
}

function forceShowPopup() {
    const popup = document.getElementById('announcement-popup');
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('🔧 Popup dipaksa tampil');
    }
}

console.log('🎯 Popup marketing siap! Tampilkan tiap user masuk!');
