// Data dummy untuk anggota kelas
const membersData = [
    { id: 1, name: "Ahmad Rizki", role: "Ketua Kelas", avatar: "AR" },
    { id: 2, name: "Siti Nurhaliza", role: "Wakil Ketua", avatar: "SN" },
    { id: 3, name: "Budi Santoso", role: "Sekretaris", avatar: "BS" },
    { id: 4, name: "Dewi Lestari", role: "Bendahara", avatar: "DL" },
    { id: 5, name: "Fajar Pratama", role: "Koordinator Proyek", avatar: "FP" },
    { id: 6, name: "Maya Sari", role: "Desainer", avatar: "MS" },
    { id: 7, name: "Rizky Ramadhan", role: "Programmer", avatar: "RR" },
    { id: 8, name: "Nina Astuti", role: "Dokumentasi", avatar: "NA" }
];

// Data dummy untuk feed kelas
const feedData = [
    { 
        id: 1, 
        author: "Ahmad Rizki", 
        avatar: "AR", 
        date: "2 jam yang lalu", 
        content: "Hari ini kita berhasil menyelesaikan proyek robot pemilah barang! Kerja bagus semuanya! 🎉", 
        image: "assets/images/project-success.jpg",
        likes: 15,
        comments: 5
    },
    { 
        id: 2, 
        author: "Siti Nurhaliza", 
        avatar: "SN", 
        date: "1 hari yang lalu", 
        content: "Jangan lupa besok ada presentasi proyek di lab mekatronika. Siapkan materi dan prototype kalian!", 
        likes: 8,
        comments: 3
    },
    { 
        id: 3, 
        author: "Budi Santoso", 
        avatar: "BS", 
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
});

// Fungsi untuk inisialisasi navigasi
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
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
            "Teknologi dan kreativitas adalah passion kami!"
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
    }
}

// Fungsi untuk inisialisasi anggota kelas
function initMembers() {
    const membersGrid = document.querySelector('.members-grid');
    
    if (membersGrid) {
        membersData.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card fade-in';
            memberCard.innerHTML = `
                <div class="member-avatar">${member.avatar}</div>
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
        feedData.forEach(post => {
            const feedCard = document.createElement('div');
            feedCard.className = 'feed-card fade-in';
            
            let imageHtml = '';
            if (post.image) {
                imageHtml = `<img src="${post.image}" alt="Post Image" class="feed-image">`;
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
            quizModal.style.display = 'block';
        });
    }
    
    if (startMemoryBtn) {
        startMemoryBtn.addEventListener('click', function() {
            alert('Game Memory akan segera hadir! Stay tuned!');
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            quizModal.style.display = 'none';
        });
    }
    
    // Tutup modal saat klik di luar konten
    window.addEventListener('click', function(event) {
        if (event.target === quizModal) {
            quizModal.style.display = 'none';
        }
    });
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
            <h3>Quiz Mekatronika</h3>
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
    nextBtn.style.display = 'block';
    nextBtn.addEventListener('click', function() {
        currentQuizQuestion++;
        displayQuestion();
    });
}

// Fungsi untuk menampilkan hasil quiz
function showQuizResults() {
    const quizContainer = document.getElementById('quizContainer');
    const percentage = Math.round((quizScore / quizData.length) * 100);
    
    let message = '';
    if (percentage >= 80) {
        message = 'Luar biasa! Pengetahuan mekatronikamu sangat baik!';
    } else if (percentage >= 60) {
        message = 'Bagus! Kamu sudah memahami dasar-dasar mekatronika.';
    } else {
        message = 'Jangan menyerah! Terus belajar dan tingkatkan pengetahuanmu.';
    }
    
    quizContainer.innerHTML = `
        <h3>Hasil Quiz</h3>
        <div class="quiz-results">
            <div class="score-circle">
                <h2>${percentage}%</h2>
                <p>Skor Akhir</p>
            </div>
            <p>${message}</p>
            <p>Kamu menjawab ${quizScore} dari ${quizData.length} pertanyaan dengan benar.</p>
            <button class="glow-btn" id="restartQuiz">Ulangi Quiz</button>
        </div>
    `;
    
    // Tambahkan event listener untuk tombol ulangi
    const restartBtn = document.getElementById('restartQuiz');
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            showQuiz();
        });
    }
}

// Fungsi untuk inisialisasi toggle tema
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        
        // Update ikon tema
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
        
        // Simpan preferensi tema di localStorage
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });
    
    // Terapkan tema yang disimpan
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        themeIcon.className = 'fas fa-sun';
    }
}

// Fungsi untuk inisialisasi kontrol musik
function initMusicControl() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicIcon = musicToggle.querySelector('i');
    
    // Coba muat musik (jika ada)
    if (bgMusic) {
        bgMusic.volume = 0.3;
        
        musicToggle.addEventListener('click', function() {
            if (bgMusic.paused) {
                bgMusic.play();
                musicIcon.className = 'fas fa-volume-up';
            } else {
                bgMusic.pause();
                musicIcon.className = 'fas fa-music';
            }
        });
    }
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
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Amati elemen dengan kelas fade-in
    const fadeElements = document.querySelectorAll('.fade-in, .slide-up');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // Efek parallax sederhana
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.bg-circle');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}
