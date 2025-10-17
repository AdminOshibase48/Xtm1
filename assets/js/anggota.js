// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize animations
    initAnimations();
    
    // Initialize member cards interaction
    initMemberCards();
    
    console.log('✅ Halaman Anggota XTM1 berhasil dimuat!');
});

// Theme functionality
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    }
}

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Animations functionality
function initAnimations() {
    // Add animation delays for staggered animations
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all member cards
    memberCards.forEach(card => {
        observer.observe(card);
    });
    
    // Parallax effect for background circles
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.bg-circle');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.3 + (index * 0.05);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Member cards interaction
function initMemberCards() {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click effect
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }, 150);
        });
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.log('⚠️ Error:', e.message);
});

window.addEventListener('unhandledrejection', function(e) {
    console.log('⚠️ Promise error:', e.reason);
    e.preventDefault();
});
