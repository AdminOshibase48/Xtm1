// ========================================
// DATA DUMMY UNTUK ANGGOTA KELAS
// ========================================

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
    { id: 12, name: "Nursyam", role: "Web Developer", avatar: "NS" }
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
// POPUP ANNOUNCEMENT - FIXED VERSION
// ========================================

// Fungsi untuk menampilkan popup
function showAnnouncementPopup() {
    // Cek apakah sudah pernah ditampilkan hari ini
    const today = new Date().toDateString();
    const popupShown = localStorage.getItem('popupShown');
    
    if (popupShown !== today) {
        // Buat overlay background
        const overlay = document.createElement('div');
        overlay.id = 'popup-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 17, 40, 0.95);
            backdrop-filter: blur(10px);
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.5s ease;
        `;
        
        // Buat popup container
        const popup = document.createElement('div');
        popup.id = 'announcement-popup';
        popup.style.cssText = `
            position: relative;
            background: linear-gradient(145deg, #0a1128 0%, #1a237e 100%);
            padding: 40px;
            border-radius: 20px;
            border: 2px solid #ff6d00;
            box-shadow: 0 0 40px rgba(255, 109, 0, 0.3);
            max-width: 500px;
            width: 90%;
            animation: slideIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
        
        // Konten popup
        popup.innerHTML = `
            <!-- Tombol Close -->
            <button id="popup-close-btn" style="
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
                transition: all 0.3s;
                z-index: 9999;
            ">×</button>
            
            <!-- Konten -->
            <div style="text-align: center;">
                <!-- Header -->
                <div style="margin-bottom: 20px;">
                    <h2 style="font-family: 'Orbitron', sans-serif; font-size: 2.5rem; color: #ff6d00; margin-bottom: 10px;">XTM1</h2>
                    <p style="color: #ffab40; font-size: 1.1rem;">Website AI Beta Launch! 🚀</p>
                </div>
                
                <!-- Pesan -->
                <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; margin-bottom: 25px; border-left: 4px solid #ff6d00;">
                    <p style="color: white; margin-bottom: 10px; line-height: 1.6;">
                        <strong>🎉 Selamat datang di XTM1 Space v2.0!</strong>
                    </p>
                    <p style="color: rgba(255, 255, 255, 0.9); font-size: 0.95rem;">
                        Website resmi kelas XTM1 dengan fitur AI beta dan pengalaman terbaru.
                    </p>
                </div>
                
                <!-- Fitur -->
                <div style="margin-bottom: 25px;">
                    <ul style="color: rgba(255, 255, 255, 0.9); text-align: left; padding-left: 20px;">
                        <li style="margin-bottom: 8px;">🤖 AI Assistant Chat</li>
                        <li style="margin-bottom: 8px;">🎮 Game & Quiz Interaktif</li>
                        <li style="margin-bottom: 8px;">📊 Dashboard Anggota Real-time</li>
                        <li>📱 Responsif semua device</li>
                    </ul>
                </div>
                
                <!-- Countdown Timer -->
                <div id="popup-timer" style="display: flex; justify-content: center; gap: 10px; margin: 25px 0;">
                    <!-- Timer akan diisi oleh JavaScript -->
                </div>
                
                <!-- Tombol Aksi -->
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button id="popup-explore-btn" style="
                        background: linear-gradient(45deg, #ff6d00, #ff9100);
                        color: white;
                        border: none;
                        padding: 12px 25px;
                        border-radius: 25px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                        box-shadow: 0 5px 15px rgba(255, 109, 0, 0.3);
                    ">Jelajahi Sekarang</button>
                    
                    <button id="popup-later-btn" style="
                        background: transparent;
                        border: 2px solid #ff6d00;
                        color: #ff6d00;
                        padding: 12px 25px;
                        border-radius: 25px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                    ">Nanti Saja</button>
                </div>
                
                <!-- Footer -->
                <p style="margin-top: 20px; color: rgba(255, 255, 255, 0.6); font-size: 0.85rem;">
                    ⚡ Website ini akan terus dikembangkan dengan fitur AI canggih!
                </p>
            </div>
        `;
        
        // Tambahkan ke overlay
        overlay.appendChild(popup);
        document.body.appendChild(overlay);
        
        // Setup timer
        setupPopupTimer();
        
        // Setup event listeners
        setupPopupEvents();
        
        // Simpan ke localStorage
        localStorage.setItem('popupShown', today);
    }
}

// Setup event listeners untuk popup
function setupPopupEvents() {
    // Tombol close
    const closeBtn = document.getElementById('popup-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAnnouncementPopup);
    }
    
    // Tombol explore
    const exploreBtn = document.getElementById('popup-explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            closeAnnouncementPopup();
            setTimeout(() => {
                // Scroll ke about section
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Trigger robot greeting
                setTimeout(() => {
                    const robotSpeech = document.getElementById('robotSpeech');
                    if (robotSpeech) {
                        robotSpeech.textContent = 'Yuk jelajahi fitur AI beta kami! 🤖✨';
                        robotSpeech.style.opacity = '1';
                        
                        setTimeout(() => {
                            robotSpeech.style.opacity = '0';
                        }, 4000);
                    }
                }, 500);
            }, 300);
        });
    }
    
    // Tombol nanti
    const laterBtn = document.getElementById('popup-later-btn');
    if (laterBtn) {
        laterBtn.addEventListener('click', closeAnnouncementPopup);
    }
    
    // Close dengan klik di luar popup
    const overlay = document.getElementById('popup-overlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeAnnouncementPopup();
            }
        });
    }
    
    // Close dengan Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const overlay = document.getElementById('popup-overlay');
            if (overlay) {
                closeAnnouncementPopup();
            }
        }
    });
}

// Fungsi untuk close popup
function closeAnnouncementPopup() {
    const overlay = document.getElementById('popup-overlay');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }
}

// Setup timer untuk popup
function setupPopupTimer() {
    const timerContainer = document.getElementById('popup-timer');
    if (!timerContainer) return;
    
    // Buat element timer
    timerContainer.innerHTML = `
        <div style="background: rgba(255, 109, 0, 0.15); padding: 15px; border-radius: 10px; min-width: 60px; border: 1px solid rgba(255, 109, 0, 0.3);">
            <div id="popup-days" style="font-size: 2rem; font-weight: bold; color: #ff6d00; font-family: 'Orbitron', sans-serif;">30</div>
            <div style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.7);">Hari</div>
        </div>
        <div style="background: rgba(255, 109, 0, 0.15); padding: 15px; border-radius: 10px; min-width: 60px; border: 1px solid rgba(255, 109, 0, 0.3);">
            <div id="popup-hours" style="font-size: 2rem; font-weight: bold; color: #ff6d00; font-family: 'Orbitron', sans-serif;">00</div>
            <div style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.7);">Jam</div>
        </div>
        <div style="background: rgba(255, 109, 0, 0.15); padding: 15px; border-radius: 10px; min-width: 60px; border: 1px solid rgba(255, 109, 0, 0.3);">
            <div id="popup-minutes" style="font-size: 2rem; font-weight: bold; color: #ff6d00; font-family: 'Orbitron', sans-serif;">00</div>
            <div style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.7);">Menit</div>
        </div>
        <div style="background: rgba(255, 109, 0, 0.15); padding: 15px; border-radius: 10px; min-width: 60px; border: 1px solid rgba(255, 109, 0, 0.3);">
            <div id="popup-seconds" style="font-size: 2rem; font-weight: bold; color: #ff6d00; font-family: 'Orbitron', sans-serif;">00</div>
            <div style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.7);">Detik</div>
        </div>
    `;
    
    // Set target date (30 hari dari sekarang)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    // Update timer setiap detik
    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        
        if (timeLeft < 0) return;
        
        // Hitung waktu
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Update tampilan
        const daysEl = document.getElementById('popup-days');
        const hoursEl = document.getElementById('popup-hours');
        const minutesEl = document.getElementById('popup-minutes');
        const secondsEl = document.getElementById('popup-seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// ========================================
// FUNGSI UTAMA - SEMUA FITUR LAMA
// ========================================

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Tampilkan popup setelah 1 detik
    setTimeout(showAnnouncementPopup, 1000);
    
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
    currentQuizQuestion = 0;
    quizScore = 0;
    
    if (quizContainer) {
        displayQuestion();
    }
}

// Fungsi untuk menampilkan pertanyaan quiz
function displayQuestion() {
    const quizContainer = document.getElementById('quizContainer');
    
    if (currentQuizQuestion < quizData.length) {
        const question = quizData[currentQuizQuestion];
        
        let optionsHtml = '';
        question.options.forEach((option, index) => {
            optionsHtml += `
                <div class="quiz-option" data-index="${index}">
                    ${option}
                </div>
            `;
        });
        
        quizContainer.innerHTML = `
            <h3>Quiz Mekatronika (${currentQuizQuestion + 1}/${quizData.length})</h3>
            <div class="quiz-question">
                <p>${question.question}</p>
            </div>
            <div class="quiz-options">
                ${optionsHtml}
            </div>
            <div class="quiz-navigation">
                <button class="glow-btn small" id="nextQuestion" style="display: none;">Lanjut</button>
            </div>
        `;
        
        // Tambahkan event listener untuk opsi jawaban
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                const selectedIndex = parseInt(this.getAttribute('data-index'));
                checkAnswer(selectedIndex);
            });
        });
    } else {
        // Tampilkan hasil quiz
        showQuizResults();
    }
}

// Fungsi untuk memeriksa jawaban quiz
function checkAnswer(selectedIndex) {
    const correctIndex = quizData[currentQuizQuestion].correct;
    const options = document.querySelectorAll('.quiz-option');
    const nextBtn = document.getElementById('nextQuestion');
    
    // Tampilkan jawaban yang benar dan salah
    options.forEach((option, index) => {
        if (index === correctIndex) {
            option.style.background = 'var(--accent-orange)';
            option.style.color = 'white';
        } else if (index === selectedIndex && index !== correctIndex) {
            option.style.background = '#ff5252';
            option.style.color = 'white';
        }
        option.style.pointerEvents = 'none';
    });
    
    // Periksa apakah jawaban benar
    if (selectedIndex === correctIndex) {
        quizScore++;
    }
    
    // Tampilkan tombol lanjut
    if (nextBtn) {
        nextBtn.style.display = 'block';
        nextBtn.addEventListener('click', function() {
            currentQuizQuestion++;
            displayQuestion();
        });
    }
}

// Fungsi untuk menampilkan hasil quiz
function showQuizResults() {
    const quizContainer = document.getElementById('quizContainer');
    const percentage = Math.round((quizScore / quizData.length) * 100);
    
    let message = '';
    let emoji = '';
    
    if (percentage >= 80) {
        message = 'Luar biasa! Pengetahuan mekatronikamu sangat baik!';
        emoji = '🎉';
    } else if (percentage >= 60) {
        message = 'Bagus! Kamu sudah memahami dasar-dasar mekatronika.';
        emoji = '👍';
    } else {
        message = 'Jangan menyerah! Terus belajar dan tingkatkan pengetahuanmu.';
        emoji = '💪';
    }
    
    if (quizContainer) {
        quizContainer.innerHTML = `
            <h3>Hasil Quiz ${emoji}</h3>
            <div class="quiz-results">
                <div class="score-circle">
                    <h2>${percentage}%</h2>
                    <p>Skor Akhir</p>
                </div>
                <p>${message}</p>
                <p>Kamu menjawab ${quizScore} dari ${quizData.length} pertanyaan dengan benar.</p>
                <button class="glow-btn" id="restartQuiz">Ulangi Quiz</button>
                <button class="glow-btn secondary" id="closeQuiz">Tutup</button>
            </div>
        `;
        
        // Tambahkan event listener untuk tombol ulangi
        const restartBtn = document.getElementById('restartQuiz');
        if (restartBtn) {
            restartBtn.addEventListener('click', function() {
                showQuiz();
            });
        }
        
        // Tambahkan event listener untuk tombol tutup
        const closeBtn = document.getElementById('closeQuiz');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                const quizModal = document.getElementById('quizModal');
                if (quizModal) {
                    quizModal.style.display = 'none';
                }
            });
        }
    }
}

// Fungsi untuk inisialisasi toggle tema
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        // Terapkan tema yang disimpan
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun';
            }
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            document.body.classList.toggle('light-mode');
            
            // Update ikon tema
            if (themeIcon) {
                if (document.body.classList.contains('dark-mode')) {
                    themeIcon.className = 'fas fa-moon';
                } else {
                    themeIcon.className = 'fas fa-sun';
                }
            }
            
            // Simpan preferensi tema di localStorage
            const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
        });
    }
}

// Fungsi untuk inisialisasi kontrol musik
function initMusicControl() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    if (!musicToggle || !bgMusic) {
        console.log('❌ Elemen musik tidak ditemukan, musik dinonaktifkan');
        return;
    }
    
    const musicIcon = musicToggle.querySelector('i');
    let isPlaying = false;
    
    // Set volume
    bgMusic.volume = 0.3;
    
    // Fungsi untuk memutar musik dengan error handling
    function playMusic() {
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Success
                isPlaying = true;
                if (musicIcon) {
                    musicIcon.className = 'fas fa-volume-up';
                }
                musicToggle.classList.add('playing');
                console.log('🎵 Musik berhasil diputar');
            }).catch(error => {
                // Error handling
                console.log('❌ Tidak dapat memutar musik:', error);
                isPlaying = false;
                if (musicIcon) {
                    musicIcon.className = 'fas fa-music';
                }
                musicToggle.classList.remove('playing');
            });
        }
    }
    
    function pauseMusic() {
        bgMusic.pause();
        isPlaying = false;
        if (musicIcon) {
            musicIcon.className = 'fas fa-music';
        }
        musicToggle.classList.remove('playing');
    }
    
    // Event listener untuk toggle musik
    musicToggle.addEventListener('click', function() {
        if (!isPlaying) {
            playMusic();
        } else {
            pauseMusic();
        }
    });
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isPlaying) {
            // Pause music when tab is hidden
            bgMusic.pause();
            // Don't change isPlaying state so it resumes when visible
        } else if (!document.hidden && isPlaying) {
            // Resume music when tab becomes visible
            playMusic();
        }
    });
    
    console.log('✅ Sistem musik siap');
}

// Fungsi untuk inisialisasi animasi scroll
function initScrollAnimations() {
    // Observer untuk animasi saat elemen masuk viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Amati elemen dengan kelas fade-in
    const fadeElements = document.querySelectorAll('.fade-in, .slide-up');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Efek parallax sederhana
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.bg-circle');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.3 + (index * 0.05);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Tambahkan CSS untuk animasi popup
const popupStyle = document.createElement('style');
popupStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
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
    
    #popup-close-btn:hover {
        background: #e65c00 !important;
        transform: rotate(90deg) scale(1.1) !important;
    }
    
    #popup-explore-btn:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 20px rgba(255, 109, 0, 0.4) !important;
    }
    
    #popup-later-btn:hover {
        background: rgba(255, 109, 0, 0.1) !important;
        transform: translateY(-2px) !important;
    }
    
    /* Responsive untuk mobile */
    @media (max-width: 768px) {
        #announcement-popup {
            padding: 25px 20px !important;
            width: 95% !important;
        }
        
        #announcement-popup h2 {
            font-size: 2rem !important;
        }
        
        #popup-timer {
            flex-wrap: wrap;
            gap: 5px !important;
        }
        
        #popup-timer > div {
            padding: 10px !important;
            min-width: 50px !important;
        }
        
        #popup-explore-btn, #popup-later-btn {
            padding: 10px 20px !important;
            font-size: 0.9rem;
        }
    }
    
    @media (max-width: 480px) {
        #announcement-popup {
            padding: 20px 15px !important;
        }
        
        #announcement-popup h2 {
            font-size: 1.8rem !important;
        }
        
        #popup-timer > div {
            flex: 1;
            min-width: 70px !important;
            margin: 5px;
        }
        
        .popup-buttons {
            flex-direction: column !important;
            gap: 10px !important;
        }
    }
`;
document.head.appendChild(popupStyle);

// Error boundary global
window.addEventListener('error', function(e) {
    console.log('⚠️ Error ditangkap:', e.error);
    return true;
});

window.addEventListener('unhandledrejection', function(e) {
    console.log('⚠️ Promise rejection ditangkap:', e.reason);
    e.preventDefault();
});

console.log('✅ JavaScript XTM1 siap dengan popup yang bisa diclick!');
