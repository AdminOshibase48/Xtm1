// Data dummy untuk anggota kelas - NAMA LENGKAP SEMUA
const membersData = [
    { id: 1, name: "Drs. Nurhayat Arif, MK", role: "Wali Kelas", avatar: "NA" },
    { id: 2, name: "Lutfi", role: "Ketua Kelas", avatar: "LF" },
    { id: 3, name: "Cika", role: "Wakil Ketua", avatar: "CK" },
    { id: 4, name: "Khanza", role: "Bendahara 1", avatar: "KZ" },
    { id: 5, name: "Mutiya", role: "Bendahara 2", avatar: "MT" },
    { id: 6, name: "Putri", role: "S.Olahraga", avatar: "PT" },
    { id: 7, name: "Tia", role: "Sekretaris 1", avatar: "TA" },
    { id: 8, name: "Fitra", role: "Sekretaris 2", avatar: "FT" },
    { id: 9, name: "Andika", role: "S.Peralatan", avatar: "AD" },
    { id: 10, name: "Farel", role: "S.Kerohanian", avatar: "FR" },
    { id: 11, name: "Redzuan", role: "S.Keamanan", avatar: "RZ" },
    { id: 12, name: "Nursyam", role: "Web Developer", avatar: "NS" },
    { id: 13, name: "Rizky", role: "Siswa", avatar: "RK" },
    { id: 14, name: "Rafa", role: "Siswa", avatar: "RF" },
    { id: 15, name: "Johan", role: "Siswa", avatar: "JH" },
    { id: 16, name: "Afif", role: "Siswa", avatar: "AF" }
];

// Data dummy untuk feed kelas
const feedData = [
    { 
        id: 1, 
        author: "Lutfi", 
        avatar: "LF", 
        date: "2 jam yang lalu", 
        content: "Hari ini kita berhasil menyelesaikan proyek robot pemilah barang! Kerja bagus semuanya! 🎉", 
        image: "https://via.placeholder.com/300x200/1a237e/ffffff?text=Robot+Project",
        likes: 15,
        comments: 5
    },
    { 
        id: 2, 
        author: "Cika", 
        avatar: "CK", 
        date: "1 hari yang lalu", 
        content: "Jangan lupa besok ada presentasi proyek di lab mekatronika. Siapkan materi dan prototype kalian!", 
        likes: 8,
        comments: 3
    },
    { 
        id: 3, 
        author: "Fitra", 
        avatar: "FT", 
        date: "2 hari yang lalu", 
        content: "Foto dokumentasi kegiatan praktikum kemarin. Semua terlihat serius dan fokus! 👨‍🔧", 
        image: "https://via.placeholder.com/300x200/0a1128/ffffff?text=Praktikum+Mekatronika",
        likes: 22,
        comments: 7
    }
];

// Data quiz
const quizData = [
    {
        question: "Apa yang dimaksud dengan Mekatronika?",
        options: [
            "Ilmu tentang mesin",
            "Gabungan teknik mesin, elektronika, dan informatika",
            "Ilmu tentang robotika saja",
            "Cabang dari teknik elektro"
        ],
        correct: 1
    },
    {
        question: "Komponen apa yang biasanya digunakan dalam sistem otomasi?",
        options: [
            "PLC (Programmable Logic Controller)",
            "Transistor",
            "Kapasitor",
            "Resistor"
        ],
        correct: 0
    },
    {
        question: "Apa fungsi sensor dalam sistem mekatronika?",
        options: [
            "Menggerakkan aktuator",
            "Mengolah data",
            "Mendeteksi perubahan lingkungan",
            "Menyimpan program"
        ],
        correct: 2
    }
];

// Inisialisasi variabel global
let currentQuizQuestion = 0;
let quizScore = 0;
let musicInitialized = false;

// ========================================
// POPUP SEDERHANA (TAMBAHAN BARU)
// ========================================

// Tampilkan popup setelah halaman load
setTimeout(function() {
    // Cek apakah hari ini sudah liat popup
    var today = new Date().toDateString();
    var popupShown = localStorage.getItem('popupShown');
    
    if (popupShown !== today) {
        // Buat popup element
        var popup = document.createElement('div');
        popup.id = 'simple-popup';
        popup.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; display: flex; align-items: center; justify-content: center;';
        
        popup.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 17, 40, 0.95);
                z-index: 9998;
            " onclick="closePopup()"></div>
            
            <div style="
                position: relative;
                background: linear-gradient(145deg, #0a1128 0%, #1a237e 100%);
                padding: 40px;
                border-radius: 20px;
                border: 2px solid #ff6d00;
                box-shadow: 0 0 40px rgba(255, 109, 0, 0.3);
                z-index: 9999;
                max-width: 500px;
                width: 90%;
                animation: popupSlideIn 0.5s ease-out;
            ">
                <button onclick="closePopup()" style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: #ff6d00;
                    color: white;
                    border: none;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">×</button>
                
                <div style="text-align: center;">
                    <h2 style="font-family: 'Orbitron', sans-serif; font-size: 2.5rem; color: #ff6d00; margin-bottom: 10px;">XTM1</h2>
                    <p style="color: #ffab40; margin-bottom: 20px; font-size: 1.1rem;">Website AI Beta Launch! 🚀</p>
                    
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; margin-bottom: 25px; border-left: 4px solid #ff6d00;">
                        <p style="color: white; margin-bottom: 10px; line-height: 1.6;">
                            <strong>🎉 Selamat datang di XTM1 Space v2.0!</strong>
                        </p>
                        <p style="color: rgba(255, 255, 255, 0.9); font-size: 0.95rem;">
                            Website resmi kelas XTM1 dengan fitur AI beta dan pengalaman terbaru.
                        </p>
                    </div>
                    
                    <div style="display: flex; justify-content: center; gap: 10px; margin: 25px 0;">
                        <div style="background: rgba(255, 109, 0, 0.15); padding: 15px; border-radius: 10px; min-width: 60px; border: 1px solid rgba(255, 109, 0, 0.3);">
                            <div style="font-size: 2rem; font-weight: bold; color: #ff6d00; font-family: 'Orbitron', sans-serif;">30</div>
                            <div style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.7);">Hari</div>
                        </div>
                        <div style="background: rgba(255, 109, 0, 0.15); padding: 15px; border-radius: 10px; min-width: 60px; border: 1px solid rgba(255, 109, 0, 0.3);">
                            <div style="font-size: 2rem; font-weight: bold; color: #ff6d00; font-family: 'Orbitron', sans-serif;">00</div>
                            <div style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.7);">Jam</div>
                        </div>
                        <div style="background: rgba(255, 109, 0, 0.15); padding: 15px; border-radius: 10px; min-width: 60px; border: 1px solid rgba(255, 109, 0, 0.3);">
                            <div style="font-size: 2rem; font-weight: bold; color: #ff6d00; font-family: 'Orbitron', sans-serif;">00</div>
                            <div style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.7);">Menit</div>
                        </div>
                        <div style="background: rgba(255, 109, 0, 0.15); padding: 15px; border-radius: 10px; min-width: 60px; border: 1px solid rgba(255, 109, 0, 0.3);">
                            <div style="font-size: 2rem; font-weight: bold; color: #ff6d00; font-family: 'Orbitron', sans-serif;">00</div>
                            <div style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.7);">Detik</div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 15px; justify-content: center;">
                        <button onclick="exploreNow()" style="
                            background: linear-gradient(45deg, #ff6d00, #ff9100);
                            color: white;
                            border: none;
                            padding: 12px 25px;
                            border-radius: 25px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s;
                            box-shadow: 0 5px 15px rgba(255, 109, 0, 0.3);
                        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(255, 109, 0, 0.4)'" 
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(255, 109, 0, 0.3)'">
                            Jelajahi Sekarang
                        </button>
                        
                        <button onclick="closePopup()" style="
                            background: transparent;
                            border: 2px solid #ff6d00;
                            color: #ff6d00;
                            padding: 12px 25px;
                            border-radius: 25px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s;
                        " onmouseover="this.style.background='rgba(255, 109, 0, 0.1)'; this.style.transform='translateY(-2px)'" 
                        onmouseout="this.style.background='transparent'; this.style.transform='translateY(0)'">
                            Nanti Saja
                        </button>
                    </div>
                    
                    <p style="margin-top: 20px; color: rgba(255, 255, 255, 0.6); font-size: 0.85rem;">
                        ⚡ Website ini akan terus dikembangkan dengan fitur AI canggih!
                    </p>
                </div>
            </div>
            
            <style>
                @keyframes popupSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-50px) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            </style>
        `;
        
        document.body.appendChild(popup);
        localStorage.setItem('popupShown', today);
        
        // Start countdown timer
        startPopupTimer();
    }
}, 1000);

// Fungsi close popup
function closePopup() {
    var popup = document.getElementById('simple-popup');
    if (popup) {
        popup.style.animation = 'popupSlideOut 0.3s ease-out';
        setTimeout(function() {
            if (popup && popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 300);
    }
}

// Fungsi explore
function exploreNow() {
    closePopup();
    
    // Scroll ke about section
    var aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Robot greeting
    setTimeout(function() {
        var robotSpeech = document.getElementById('robotSpeech');
        if (robotSpeech) {
            robotSpeech.textContent = 'Yuk jelajahi fitur AI beta kami! 🤖✨';
            robotSpeech.style.opacity = '1';
            
            setTimeout(function() {
                robotSpeech.style.opacity = '0';
            }, 4000);
        }
    }, 500);
}

// Countdown timer untuk popup
function startPopupTimer() {
    // Set target date (30 hari dari sekarang)
    var targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    function updateTimer() {
        var now = new Date().getTime();
        var timeLeft = targetDate - now;
        
        if (timeLeft < 0) return;
        
        var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        var popup = document.getElementById('simple-popup');
        if (popup) {
            var timerDivs = popup.querySelectorAll('[style*="font-size: 2rem"]');
            if (timerDivs.length >= 4) {
                timerDivs[0].textContent = days.toString().padStart(2, '0');
                timerDivs[1].textContent = hours.toString().padStart(2, '0');
                timerDivs[2].textContent = minutes.toString().padStart(2, '0');
                timerDivs[3].textContent = seconds.toString().padStart(2, '0');
            }
        }
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Close dengan Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        var popup = document.getElementById('simple-popup');
        if (popup && popup.style.display !== 'none') {
            closePopup();
        }
    }
});

// ========================================
// FUNGSI LAMA (SEMUA TETAP ADA)
// ========================================

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi komponen
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

// Fungsi untuk inisialisasi navigasi
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Tutup menu mobile saat link diklik
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Fungsi untuk inisialisasi robot maskot
function initRobot() {
    const robot = document.getElementById('robot');
    const robotSpeech = document.getElementById('robotSpeech');
    
    if (robot && robotSpeech) {
        const greetings = [
            "Halo! Selamat datang di XTM1 Space!",
            "Saya Robo-X, maskot kelas XTM1!",
            "Ada yang bisa saya bantu?",
            "Jelajahi website kami!",
            "Teknologi dan kreativitas adalah passion kami!",
            "Klik bagian mana saja untuk menjelajahi!"
        ];
        
        let currentGreeting = 0;
        
        robot.addEventListener('click', function() {
            robotSpeech.textContent = greetings[currentGreeting];
            robotSpeech.style.opacity = '1';
            
            // Ganti greeting berikutnya
            currentGreeting = (currentGreeting + 1) % greetings.length;
            
            // Sembunyikan speech bubble setelah 3 detik
            setTimeout(() => {
                robotSpeech.style.opacity = '0';
            }, 3000);
        });
        
        // Juga buat robot bisa diklik untuk greetings acak
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance setiap 10 detik
                const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
                robotSpeech.textContent = randomGreeting;
                robotSpeech.style.opacity = '1';
                
                setTimeout(() => {
                    robotSpeech.style.opacity = '0';
                }, 2000);
            }
        }, 10000);
    }
}

// Fungsi untuk inisialisasi anggota kelas
function initMembers() {
    const membersGrid = document.querySelector('.members-grid');
    
    if (membersGrid) {
        // Clear existing content
        membersGrid.innerHTML = '';
        
        membersData.forEach((member, index) => {
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card';
            memberCard.style.animationDelay = `${index * 0.1}s`;
            memberCard.innerHTML = `
                <div class="member-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <h3 class="member-name">${member.name}</h3>
                <p class="member-role">${member.role}</p>
            `;
            membersGrid.appendChild(memberCard);
        });
    }
}

// Fungsi untuk inisialisasi feed kelas
function initFeed() {
    const feedContainer = document.querySelector('.feed-container');
    
    if (feedContainer) {
        feedData.forEach((post, index) => {
            const feedCard = document.createElement('div');
            feedCard.className = 'feed-card';
            feedCard.style.animationDelay = `${index * 0.2}s`;
            
            let imageHtml = '';
            if (post.image) {
                imageHtml = `<img src="${post.image}" alt="Post Image" class="feed-image" onerror="this.style.display='none'">`;
            }
            
            feedCard.innerHTML = `
                <div class="feed-header">
                    <div class="feed-avatar">${post.avatar}</div>
                    <div>
                        <div class="feed-author">${post.author}</div>
                        <div class="feed-date">${post.date}</div>
                    </div>
                </div>
                <div class="feed-content">
                    <p>${post.content}</p>
                    ${imageHtml}
                </div>
                <div class="feed-actions">
                    <div class="feed-action">
                        <i class="fas fa-heart"></i>
                        <span>${post.likes}</span>
                    </div>
                    <div class="feed-action">
                        <i class="fas fa-comment"></i>
                        <span>${post.comments}</span>
                    </div>
                    <div class="feed-action">
                        <i class="fas fa-share"></i>
                    </div>
                </div>
            `;
            
            feedContainer.appendChild(feedCard);
        });
    }
}

// Fungsi untuk inisialisasi game dan quiz
function initGames() {
    const startQuizBtn = document.getElementById('startQuiz');
    const startMemoryBtn = document.getElementById('startMemory');
    const quizModal = document.getElementById('quizModal');
    const closeModal = document.querySelector('.close');
    
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', function() {
            showQuiz();
            if (quizModal) {
                quizModal.style.display = 'block';
            }
        });
    }
    
    if (startMemoryBtn) {
        startMemoryBtn.addEventListener('click', function() {
            alert('Game Memory akan segera hadir! Stay tuned! 🎮');
        });
    }
    
    if (closeModal && quizModal) {
        closeModal.addEventListener('click', function() {
            quizModal.style.display = 'none';
        });
    }
    
    // Tutup modal saat klik di luar konten
    if (quizModal) {
        window.addEventListener('click', function(event) {
            if (event.target === quizModal) {
                quizModal.style.display = 'none';
            }
        });
    }
}

// Fungsi untuk menampilkan quiz
function showQuiz() {
    const quizContainer = document.getElementById('quizContainer');
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
