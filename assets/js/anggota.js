// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Halaman Anggota XTM1 Initializing...');
    
    // Initialize semua komponen
    initThemeToggle();
    initMusicControl();
    initNavigation();
    initRobot();
    initSearchFilter();
    initAnimations();
    initStatistics();
    
    console.log('✅ Halaman Anggota XTM1 berhasil dimuat!');
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
            "Halo! Ini daftar anggota XTM1!",
            "Klik kartu anggota untuk detail!",
            "Gunakan search untuk mencari nama!",
            "Filter berdasarkan gender!",
            "XTM1 - Teknologi & Kreativitas!",
            "41 anggota keluarga besar XTM1!"
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

// ========== SEARCH & FILTER ==========
function initSearchFilter() {
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const memberCards = document.querySelectorAll('.member-card');
    
    let currentFilter = 'all';
    let currentSearch = '';
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            currentSearch = e.target.value.toLowerCase();
            filterMembers();
        });
    }
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            currentFilter = this.getAttribute('data-filter');
            filterMembers();
        });
    });
    
    function filterMembers() {
        let visibleCount = 0;
        
        memberCards.forEach(card => {
            const name = card.querySelector('.member-name').textContent.toLowerCase();
            const gender = card.getAttribute('data-gender');
            
            const matchesSearch = name.includes(currentSearch);
            const matchesFilter = currentFilter === 'all' || gender === currentFilter;
            
            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
                visibleCount++;
                // Add animation delay for staggered effect
                card.style.animationDelay = `${visibleCount * 0.05}s`;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update counter
        updateMemberCount(visibleCount);
    }
    
    function updateMemberCount(count) {
        const counterElement = document.querySelector('.counter-number');
        if (counterElement) {
            counterElement.textContent = count;
        }
    }
    
    // Member card interactions
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }, 150);
            
            // Show member info (bisa dikembangkan untuk modal detail)
            const name = this.querySelector('.member-name').textContent;
            console.log(`👤 Mengklik: ${name}`);
        });
    });
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
    const elementsToObserve = document.querySelectorAll('.member-card, .stat-card, .search-filter-container');
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

// ========== STATISTICS ==========
function initStatistics() {
    // Hitung statistik berdasarkan data yang ada
    const memberCards = document.querySelectorAll('.member-card');
    let maleCount = 0;
    let femaleCount = 0;
    
    memberCards.forEach(card => {
        const gender = card.getAttribute('data-gender');
        if (gender === 'male') {
            maleCount++;
        } else if (gender === 'female') {
            femaleCount++;
        }
    });
    
    // Update statistics display
    updateStatistics(maleCount, femaleCount);
    
    // Animate counters
    animateCounter('maleCount', maleCount);
    animateCounter('femaleCount', femaleCount);
}

function updateStatistics(maleCount, femaleCount) {
    const totalMembers = maleCount + femaleCount;
    
    const totalElement = document.getElementById('totalMembers');
    const maleElement = document.getElementById('maleCount');
    const femaleElement = document.getElementById('femaleCount');
    
    if (totalElement) totalElement.textContent = totalMembers;
    if (maleElement) maleElement.textContent = maleCount;
    if (femaleElement) femaleElement.textContent = femaleCount;
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let currentValue = 0;
    const duration = 2000; // 2 seconds
    const increment = targetValue / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue);
    }, 16);
}

// ========== UTILITY FUNCTIONS ==========
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
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
👥 XTM1 ANGGOTA KELAS
📊 Total: 41 Anggota
👨 Laki-laki: 28
👩 Perempuan: 13
🎯 Fitur: Search, Filter, Animasi
🚀 Powered by XTM1 Space
`);
