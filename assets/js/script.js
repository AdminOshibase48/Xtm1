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

// Scroll animations
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

// Observe elements for scroll animations
document.querySelectorAll('.section-title, .home-content, .home-image, .about-text, .about-image, .gallery-item, .member-card, .achievement-item, .project-card, .contact-form, .contact-info').forEach(el => {
    observer.observe(el);
});

// Active nav link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
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
    
    console.log('Website XTM1 Mekatronika telah dimuat!');
});
