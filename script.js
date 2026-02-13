// Smooth scroll for anchor links
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

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    if (mobileMenu.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-element').forEach(el => {
    observer.observe(el);
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        nome: contactForm.nome.value,
        telefone: contactForm.telefone.value,
        mensagem: contactForm.mensagem.value
    };
    
    console.log('Form submitted:', formData);
    
    // Simular envio (substitua por sua API real)
    // await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // });
    
    // Show success message
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
});

function resetForm() {
    contactForm.reset();
    contactForm.style.display = 'flex';
    formSuccess.style.display = 'none';
}

// Add stagger delay to animated elements
document.querySelectorAll('.services-grid .service-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.benefits-grid .benefit-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.12}s`;
});