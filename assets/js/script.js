// JavaScript untuk interaktivitas website XTM1

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Scroll animations dengan error handling
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        }
    });
}, observerOptions);

// Observe elements for scroll animations dengan pengecekan elemen
const elementsToObserve = [
    '.section-title', 
    '.home-content', 
    '.home-image', 
    '.about-text', 
    '.about-image', 
    '.gallery-item', 
    '.member-card', 
    '.achievement-item', 
    '.project-card', 
    '.contact-form', 
    '.contact-info',
    '.coming-soon-container'
];

elementsToObserve.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        observer.observe(el);
    });
});

// Active nav link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && message) {
            // In a real application, you would send this data to a server
            alert(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim.`);
            contactForm.reset();
        } else {
            alert('Harap lengkapi semua field!');
        }
    });
}

// Smooth scroll untuk anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Add initial animation to home section
    const homeContent = document.querySelector('.home-content');
    const homeImage = document.querySelector('.home-image');
    
    if (homeContent && homeImage) {
        setTimeout(() => {
            homeContent.classList.add('appear');
            homeImage.classList.add('appear');
        }, 300);
    }
    
    // Preload animasi untuk elemen yang sudah terlihat di viewport
    setTimeout(() => {
        document.querySelectorAll('.section-title').forEach(title => {
            const rect = title.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                title.classList.add('appear');
            }
        });
    }, 500);
    
    console.log('Website XTM1 Mekatronika telah dimuat!');
});

// Handle resize events untuk optimasi mobile
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Reset mobile menu pada resize
        if (window.innerWidth > 768) {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    }, 250);
});

// Tambahan: Loading animation improvement
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Force reflow untuk memastikan animasi berjalan
    document.querySelectorAll('.section-title').forEach(title => {
        title.style.animation = 'none';
        setTimeout(() => {
            title.style.animation = '';
        }, 10);
    });
});
