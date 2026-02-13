// ========================================
// DECLARAÇÃO DE VARIÁVEIS (UMA VEZ APENAS)
// ========================================
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const scrollDownArrow = document.querySelector('.scroll-down');
const whatsappFloat = document.getElementById('whatsapp-float');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const backToTop = document.getElementById('back-to-top');
let lastScrollTop = 0;

// ========================================
// LOADING SCREEN
// ========================================
window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
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

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    });
});

// ========================================
// SCROLL EFFECTS (navbar, arrow, whatsapp, back-to-top)
// ========================================
// Hide WhatsApp float initially
if (whatsappFloat) {
    whatsappFloat.style.opacity = '0';
    whatsappFloat.style.transform = 'scale(0)';
    whatsappFloat.style.pointerEvents = 'none';
}

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Navbar effect
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/Show scroll down arrow
    if (scrollDownArrow) {
        if (scrollTop > 150) {
            scrollDownArrow.style.opacity = '0';
            scrollDownArrow.style.pointerEvents = 'none';
        } else {
            scrollDownArrow.style.opacity = '1';
            scrollDownArrow.style.pointerEvents = 'auto';
        }
    }
    
    // Show WhatsApp float button after scroll
    if (whatsappFloat) {
        if (scrollTop > 300) {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.transform = 'scale(1)';
            whatsappFloat.style.pointerEvents = 'auto';
        } else {
            whatsappFloat.style.opacity = '0';
            whatsappFloat.style.transform = 'scale(0)';
            whatsappFloat.style.pointerEvents = 'none';
        }
    }
    
    // Show back to top button after scroll
    if (backToTop) {
        if (scrollTop > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    }
    
    lastScrollTop = scrollTop;
});

// ========================================
// BACK TO TOP BUTTON
// ========================================
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    });
}

// ========================================
// FADE-IN ON SCROLL (Intersection Observer)
// ========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe all fade-in elements
const fadeElements = document.querySelectorAll('.fade-in-element');
fadeElements.forEach(element => {
    observer.observe(element);
});

// ========================================
// STAGGER DELAY FOR FADE-IN ELEMENTS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-element');
    
    fadeElements.forEach((element) => {
        const section = element.closest('section');
        const elementsInSection = section ? Array.from(section.querySelectorAll('.fade-in-element')) : [];
        const indexInSection = elementsInSection.indexOf(element);
        
        element.style.transitionDelay = `${indexInSection * 0.1}s`;
    });
});

// ========================================
// CONTACT FORM SUBMISSION (COM SEGURANÇA)
// ========================================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values and trim whitespace
        const nome = contactForm.querySelector('[name="nome"]').value.trim();
        const telefone = contactForm.querySelector('[name="telefone"]').value.trim();
        const mensagem = contactForm.querySelector('[name="mensagem"]').value.trim();
        
        // Validação básica
        if (!nome || nome.length < 2) {
            alert('Por favor, digite um nome válido (mínimo 2 caracteres).');
            return;
        }
        
        if (!telefone || telefone.length < 10) {
            alert('Por favor, digite um telefone válido (mínimo 10 dígitos).');
            return;
        }
        
        // Função para sanitizar inputs (remove caracteres potencialmente perigosos)
        const sanitize = (str) => {
            return str
                .replace(/[<>]/g, '')           // Remove < e >
                .replace(/javascript:/gi, '')    // Remove javascript:
                .replace(/on\w+=/gi, '')         // Remove eventos inline (onclick, onerror, etc)
                .substring(0, 500);              // Limita tamanho máximo
        };
        
        // Sanitiza todos os inputs
        const nomeSanitizado = sanitize(nome);
        const telefoneSanitizado = sanitize(telefone);
        const mensagemSanitizada = sanitize(mensagem);
        
        // Create WhatsApp message (encodeURIComponent protege contra injeção na URL)
        const whatsappText = mensagemSanitizada 
            ? `Olá! Meu nome é ${nomeSanitizado}.\n\nTelefone: ${telefoneSanitizado}\n\nMensagem: ${mensagemSanitizada}`
            : `Olá! Meu nome é ${nomeSanitizado}.\n\nTelefone: ${telefoneSanitizado}\n\nGostaria de saber mais sobre os serviços da Íntegra.`;
        
        const whatsappMessage = encodeURIComponent(whatsappText);
        
        // Redirect to WhatsApp
        window.open(`https://wa.me/5561993175875?text=${whatsappMessage}`, '_blank');
        
        // Show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
    });
}

// Reset form function
function resetForm() {
    if (contactForm && formSuccess) {
        contactForm.reset();
        contactForm.style.display = 'flex';
        formSuccess.style.display = 'none';
    }
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
