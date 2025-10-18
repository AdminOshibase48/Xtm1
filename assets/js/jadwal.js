// Jadwal Pelajaran XTM1
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Jadwal Pelajaran XTM1 Initializing...');
    
    // Initialize semua komponen
    initThemeToggle();
    initMusicControl();
    initNavigation();
    initRobot();
    initSchedule();
    initCurrentDay();
    initAnimations();
    
    console.log('✅ Jadwal Pelajaran XTM1 berhasil dimuat!');
});

// ========== THEME TOGGLE ==========
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            document.body.classList.toggle('light-mode');
            
            if (themeIcon) {
                themeIcon.className = document.body.classList.contains('dark-mode') 
                    ? 'fas fa-moon' 
                    : 'fas fa-sun';
            }
            
            const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
        });
    }
}

// ========== MUSIC CONTROL ==========
function initMusicControl() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    if (!musicToggle || !bgMusic) {
        console.log('🎵 Musik dinonaktifkan - elemen tidak ditemukan');
        if (musicToggle) musicToggle.style.display = 'none';
        return;
    }
    
    const musicIcon = musicToggle.querySelector('i');
    let isPlaying = false;
    
    // Setup music
    bgMusic.volume = 0.3;
    bgMusic.preload = 'metadata';
    
    function toggleMusic() {
        if (isPlaying) {
            // Pause musik
            bgMusic.pause();
            isPlaying = false;
            musicIcon.className = 'fas fa-music';
            musicToggle.classList.remove('playing');
        } else {
            // Play musik dengan error handling
            const playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        isPlaying = true;
                        musicIcon.className = 'fas fa-volume-up';
                        musicToggle.classList.add('playing');
                        console.log('🎵 Musik berhasil diputar');
                    })
                    .catch(error => {
                        console.log('🔇 Tidak bisa memutar musik:', error);
                        showMusicHelp();
                        isPlaying = false;
                        musicIcon.className = 'fas fa-music';
                    });
            }
        }
    }
    
    function showMusicHelp() {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            background: var(--card-bg);
            color: var(--text-color);
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: var(--shadow);
            z-index: 10000;
            max-width: 280px;
            border-left: 4px solid var(--accent-orange);
            font-size: 0.9rem;
        `;
        notification.innerHTML = `
            <strong>Tips Audio</strong><br>
            Beberapa browser membutuhkan interaksi pengguna terlebih dahulu.
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 4000);
    }
    
    musicToggle.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        toggleMusic();
    });
    
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isPlaying) {
            bgMusic.pause();
        }
    });
}

// ========== NAVIGATION ==========
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ========== ROBOT MASKOT ==========
function initRobot() {
    const robot = document.getElementById('robot');
    const robotSpeech = document.getElementById('robotSpeech');
    
    if (robot && robotSpeech) {
        const greetings = [
            "Halo! Ini jadwal pelajaran XTM1!",
            "Cek pelajaran hari ini!",
            "Jangan sampai telat ya!",
            "Siapkan buku dan alat praktikum!",
            "XTM1 - Rajin belajar!",
            "Semangat menuntut ilmu!"
        ];
        
        let currentGreeting = 0;
        
        robot.addEventListener('click', function() {
            robotSpeech.textContent = greetings[currentGreeting];
            robotSpeech.style.opacity = '1';
            
            currentGreeting = (currentGreeting + 1) % greetings.length;
            
            setTimeout(() => {
                robotSpeech.style.opacity = '0';
            }, 3000);
        });
        
        // Random greetings
        setInterval(() => {
            if (Math.random() < 0.3) {
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

// ========== SCHEDULE FUNCTIONALITY ==========
function initSchedule() {
    const dayFilters = document.querySelectorAll('.day-filter');
    const viewOptions = document.querySelectorAll('.view-option');
    const scheduleContainer = document.querySelector('.schedule-container');
    
    let currentDay = 'all';
    let currentView = 'grid';
    
    // Day filter functionality
    dayFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            dayFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');
            
            currentDay = this.getAttribute('data-day');
            filterSchedule();
        });
    });
    
    // View option functionality
    viewOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            viewOptions.forEach(o => o.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            
            currentView = this.getAttribute('data-view');
            changeView();
        });
    });
    
    function filterSchedule() {
        const daySchedules = document.querySelectorAll('.day-schedule');
        
        daySchedules.forEach(schedule => {
            if (currentDay === 'all' || schedule.id === currentDay) {
                schedule.classList.add('active');
            } else {
                schedule.classList.remove('active');
            }
        });
    }
    
    function changeView() {
        if (currentView === 'list') {
            scheduleContainer.classList.add('list-view');
        } else {
            scheduleContainer.classList.remove('list-view');
        }
    }
    
    // Lesson card interactions
    const lessonCards = document.querySelectorAll('.lesson-card');
    lessonCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('click', function() {
            const lessonName = this.querySelector('.lesson-name').textContent;
            const lessonTime = this.querySelector('.time-start').textContent;
            console.log(`📚 Mengklik: ${lessonName} (${lessonTime})`);
        });
    });
}

// ========== CURRENT DAY INFO ==========
function initCurrentDay() {
    const currentDayElement = document.getElementById('currentDay');
    const currentDateElement = document.getElementById('currentDate');
    
    if (currentDayElement && currentDateElement) {
        const now = new Date();
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        
        const dayName = days[now.getDay()];
        const date = now.getDate();
        const month = months[now.getMonth()];
        const year = now.getFullYear();
        
        currentDayElement.textContent = dayName;
        currentDateElement.textContent = `${date} ${month} ${year}`;
        
        // Highlight today's schedule
        highlightTodaySchedule(dayName.toLowerCase());
        
        // Update statistics
        updateStatistics();
    }
}

function highlightTodaySchedule(today) {
    const dayFilters = document.querySelectorAll('.day-filter');
    const indonesianDays = {
        'minggu': 'all',
        'senin': 'monday',
        'selasa': 'tuesday', 
        'rabu': 'wednesday',
        'kamis': 'thursday',
        'jumat': 'friday',
        'sabtu': 'all'
    };
    
    const todayFilter = indonesianDays[today];
    if (todayFilter) {
        // Click the corresponding filter
        const filterButton = document.querySelector(`.day-filter[data-day="${todayFilter}"]`);
        if (filterButton) {
            filterButton.click();
        }
    }
}

function updateStatistics() {
    const totalSubjects = document.getElementById('totalSubjects');
    const totalHours = document.getElementById('totalHours');
    
    if (totalSubjects && totalHours) {
        // Hitung total mata pelajaran dan jam
        const lessonCards = document.querySelectorAll('.lesson-card');
        let totalJam = 0;
        
        lessonCards.forEach(card => {
            const durationText = card.querySelector('.lesson-duration').textContent;
            const jam = parseInt(durationText.match(/\d+/)[0]);
            totalJam += jam;
        });
        
        totalSubjects.textContent = lessonCards.length;
        totalHours.textContent = totalJam;
    }
}

// ========== ANIMATIONS ==========
function initAnimations() {
    // Add animation delays for staggered animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Intersection Observer for scroll animations
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
    
    // Observe all cards and sections
    const elementsToObserve = document.querySelectorAll('.lesson-card, .summary-card, .day-card');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Parallax effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.bg-circle');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.3 + (index * 0.05);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Smooth scrolling for anchor links
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
}

// ========== ERROR HANDLING ==========
window.addEventListener('error', function(e) {
    console.log('⚠️ Error:', e.message);
});

window.addEventListener('unhandledrejection', function(e) {
    console.log('⚠️ Promise error:', e.reason);
    e.preventDefault();
});

// ========== CONSOLE MESSAGE ==========
console.log(`
📚 JADWAL PELAJARAN XTM1
🗓️ Senin: 4 Pelajaran (8 Jam)
🗓️ Selasa: 3 Pelajaran (7 Jam)  
🗓️ Rabu: 3 Pelajaran (7 Jam)
🗓️ Kamis: 4 Pelajaran (8 Jam)
🗓️ Jumat: 2 Pelajaran (5 Jam)
📊 Total: 16 Pelajaran (35 Jam)
🚀 Powered by XTM1 Space
`);
