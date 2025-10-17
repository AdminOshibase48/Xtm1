// Data dummy untuk anggota kelas
const membersData = [
    { id: 1, name: "Drs. Nurhayat Arif, MK", role: "Wali Kelas", avatar: "NA" },
    { id: 2, name: "Lutfi", role: "Ketua Kelas", avatar: "LF" },
    { id: 3, name: "Cika", role: "Wakil Ketua", avatar: "CK" },
    { id: 4, name: "Mutiya", role: "Bendahara", avatar: "MT" },
    { id: 5, name: "Fitra", role: "Sekretaris", avatar: "FT" },
    { id: 6, name: "Redzuan", role: "S. Keamanan", avatar: "RZ" },
    { id: 7, name: "Ahmad Rizki", role: "Ketua Kelas", avatar: "AR" },
    { id: 8, name: "Siti Nurhaliza", role: "Wakil Ketua", avatar: "SN" },
    { id: 9, name: "Budi Santoso", role: "Sekretaris", avatar: "BS" },
    { id: 10, name: "Dewi Lestari", role: "Bendahara", avatar: "DL" },
    { id: 11, name: "Fajar Pratama", role: "Koordinator Proyek", avatar: "FP" },
    { id: 12, name: "Maya Sari", role: "Desainer", avatar: "MS" }
];

// Data dummy untuk feed kelas
const feedData = [
    { 
        id: 1, 
        author: "Lutfi", 
        avatar: "LF", 
        date: "2 jam yang lalu", 
        content: "Hari ini kita berhasil menyelesaikan proyek robot pemilah barang! Kerja bagus semuanya! 🎉", 
        image: "assets/images/project-success.jpg",
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
        image: "assets/images/praktikum.jpg",
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

// Fungsi untuk inisialisasi kontrol musik - FIXED VERSION
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
                showMusicHelpMessage();
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
    
    function showMusicHelpMessage() {
        // Create a subtle notification instead of intrusive popup
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--card-bg);
            color: var(--text-color);
            padding: 15px;
            border-radius: 10px;
            box-shadow: var(--shadow);
            z-index: 10000;
            max-width: 250px;
            border-left: 4px solid var(--accent-orange);
            animation: slideInRight 0.5s ease;
        `;
        notification.innerHTML = `
            <p><strong>Tips Musik</strong></p>
            <p>Beberapa browser memerlukan interaksi pengguna terlebih dahulu untuk memutar musik.</p>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 500);
            }
        }, 5000);
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
    
    // Enable audio context on first user interaction
    function enableAudioOnInteraction() {
        if (!musicInitialized) {
            musicInitialized = true;
            console.log('🎵 Audio context siap');
            // Remove event listeners after first interaction
            document.removeEventListener('click', enableAudioOnInteraction);
            document.removeEventListener('keydown', enableAudioOnInteraction);
            document.removeEventListener('touchstart', enableAudioOnInteraction);
        }
    }
    
    // Add multiple event listeners for first interaction
    document.addEventListener('click', enableAudioOnInteraction);
    document.addEventListener('keydown', enableAudioOnInteraction);
    document.addEventListener('touchstart', enableAudioOnInteraction);
    
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

// Tambahkan CSS untuk animasi notifikasi
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .music-btn.playing {
        background: var(--accent-orange) !important;
        color: white !important;
    }
`;
document.head.appendChild(style);

// Error boundary global
window.addEventListener('error', function(e) {
    console.log('⚠️ Error ditangkap:', e.error);
    return true;
});

window.addEventListener('unhandledrejection', function(e) {
    console.log('⚠️ Promise rejection ditangkap:', e.reason);
    e.preventDefault();
});
