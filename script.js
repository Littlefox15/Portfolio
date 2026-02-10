// ===== Navigation =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ===== Smooth Scrolling =====
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

// ===== Active Nav Link on Scroll =====
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ===== Scroll Animation =====
const scrollElements = document.querySelectorAll('.expertise-card, .project-card, .education-card, .skill-category');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop > (window.innerHeight || document.documentElement.clientHeight);
};

const displayScrollElements = () => {
    scrollElements.forEach((element) => {
        if (elementInView(element, 1.25)) {
            element.classList.add('scrolled');
        } else if (elementOutofView(element)) {
            element.classList.remove('scrolled');
        }
    });
};

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    .expertise-card, .project-card, .education-card, .skill-category {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .expertise-card.scrolled, .project-card.scrolled, .education-card.scrolled, .skill-category.scrolled {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', displayScrollElements);
displayScrollElements();

// ===== Form Submission =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission
    console.log('Form Data:', formData);
    
    // Show success message
    const submitBtn = contactForm.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ Message Sent!';
    submitBtn.style.background = '#28a745';
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        contactForm.reset();
    }, 3000);
});

// ===== Progress Bar Animation =====
const progressBars = document.querySelectorAll('.progress-fill');

const animateProgressBars = () => {
    progressBars.forEach(bar => {
        if (elementInView(bar.closest('.skill-bar'))) {
            const width = bar.style.width;
            bar.style.width = width;
        }
    });
};

window.addEventListener('scroll', animateProgressBars);

// ===== Navbar Scroll Effect =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// ===== Initialize on Load =====
window.addEventListener('load', () => {
    displayScrollElements();
    animateProgressBars();
});
