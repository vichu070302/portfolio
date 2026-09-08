// Global Hamburger Menu Toggle Function
window.toggleMobileMenu = function(e) {
    if (e) {
        e.stopPropagation();
    }
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
};

document.addEventListener('click', (e) => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu && navMenu.classList.contains('active')) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Smooth Scrolling & Close Mobile Menu for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();

            // Close mobile menu if open
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');

            // Scroll with fixed navbar offset deduction
            const headerOffset = 75;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Theme Toggle (Moon / Sun Button)
function initThemeToggle() {
    const themeToggleBtns = document.querySelectorAll('.theme-toggle, #themeToggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    function updateThemeIcon(theme) {
        themeToggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'fas fa-moon';
                } else {
                    icon.className = 'fas fa-sun';
                }
            }
        });
    }

    updateThemeIcon(savedTheme);

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
    initThemeToggle();
}

// Initial URL Hash Smooth Scroll (e.g. index.html#case-studies)
function handleInitialHashScroll() {
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            setTimeout(() => {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 250);
        }
    }
}

window.addEventListener('load', handleInitialHashScroll);

// Enhanced Navbar class on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Animate skill bars on scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector('.skill-progress');
            if (skillProgress && !skillProgress.classList.contains('animated')) {
                const targetWidth = skillProgress.getAttribute('data-width') || skillProgress.style.width || '85%';
                skillProgress.style.width = '0%';
                setTimeout(() => {
                    skillProgress.style.width = targetWidth;
                    skillProgress.classList.add('animated');
                }, 100);
            }
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-item').forEach(item => {
    skillObserver.observe(item);
});

// Enhanced scroll animation for elements with staggered timing
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.project-card, .service-card, .experience-item, .testimonial-card').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(item);
});

// Form submission (if you have a contact form)
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted');
    });
}

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Download CV button
const downloadBtn = document.querySelector('.download-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // Replace with your actual CV file path
        const link = document.createElement('a');
        link.href = '#'; // Add your CV file path here
        link.download = 'Vishnu-Prasad-CV.pdf';
        link.click();
    });
}

// Enhanced Scroll to top button with better animation
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.title = 'Scroll to Top';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
        scrollToTopBtn.style.animation = 'fadeIn 0.3s ease';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced hover effect for cards
document.querySelectorAll('.project-card, .service-card, .skill-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add CSS for scroll to top button and animations
const scrollToTopStyle = document.createElement('style');
scrollToTopStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #52dc3d, #27ae60);
        color: #060b11;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
        z-index: 999;
        box-shadow: 0 8px 20px rgba(82, 220, 61, 0.3);
    }

    .scroll-to-top:hover {
        background: linear-gradient(135deg, #27ae60, #52dc3d);
        transform: translateY(-5px);
        box-shadow: 0 12px 30px rgba(82, 220, 61, 0.5);
    }

    .nav-link.active {
        color: #52dc3d;
        border-bottom: 2px solid #52dc3d;
        padding-bottom: 5px;
    }

    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(10, 14, 39, 0.98);
            flex-direction: column;
            gap: 10px;
            padding: 20px;
            display: none;
            border-bottom: 1px solid #8899be;
        }

        .nav-menu.active {
            display: flex;
        }

        .scroll-to-top {
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            font-size: 16px;
        }
    }
`;
document.head.appendChild(scrollToTopStyle);

// Add cursor tracking effect for enhanced interactivity
document.addEventListener('mousemove', (e) => {
    // Optional: Add custom cursor effects here
});

console.log('✨ Portfolio script loaded successfully!');


// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector('.skill-progress');
            if (skillProgress && !skillProgress.classList.contains('animated')) {
                const width = skillProgress.style.width;
                skillProgress.style.width = '0';
                setTimeout(() => {
                    skillProgress.style.width = width;
                    skillProgress.classList.add('animated');
                }, 100);
            }
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-item').forEach(item => {
    skillObserver.observe(item);
});

// Add scroll animation for elements
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.project-card, .service-card, .experience-item, .testimonial-card').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(item);
});

// Form submission (if you have a contact form)
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted');
    });
}

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Download CV button
const downloadBtn = document.querySelector('.download-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // Replace with your actual CV file path
        const link = document.createElement('a');
        link.href = '#'; // Add your CV file path here
        link.download = 'Jakso-CV.pdf';
        link.click();
    });
}

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add CSS for scroll to top button and animations
const scrollToTopStyle = document.createElement('style');
scrollToTopStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #52dc3d, #27ae60);
        color: #060b11;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
        z-index: 999;
        box-shadow: 0 8px 20px rgba(82, 220, 61, 0.3);
    }

    .scroll-to-top:hover {
        background: linear-gradient(135deg, #27ae60, #52dc3d);
        transform: translateY(-5px);
        box-shadow: 0 12px 30px rgba(82, 220, 61, 0.5);
    }

    .nav-link.active {
        color: #52dc3d;
        border-bottom: 2px solid #52dc3d;
        padding-bottom: 5px;
    }

    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(10, 14, 39, 0.98);
            flex-direction: column;
            gap: 10px;
            padding: 20px;
            display: none;
            border-bottom: 1px solid var(--border-color);
        }

        .nav-menu.active {
            display: flex;
        }

        .scroll-to-top {
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            font-size: 16px;
        }
    }
`;
document.head.appendChild(scrollToTopStyle);

// Add cursor tracking effect for enhanced interactivity
document.addEventListener('mousemove', (e) => {
    // Optional: Add custom cursor effects here
});

console.log('✨ Portfolio script loaded successfully!');

// Global UI/UX Showcase Modal Controller Functions
window.openUiUxShowcaseModal = function(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const modal = document.getElementById('uiuxModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeUiUxShowcaseModal = function(e) {
    if (e) {
        e.preventDefault();
    }
    const modal = document.getElementById('uiuxModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

function initUiUxModal() {
    const mobileAppCard = document.getElementById('mobileAppUiCard');
    const viewUiUxBtn = document.getElementById('viewUiUxBtn');
    const openModalBtn = document.getElementById('openUiUxModal');
    const uiuxModal = document.getElementById('uiuxModal');
    const closeModalBtn = document.getElementById('closeUiUxModal');
    const detailsTabBtns = document.querySelectorAll('.details-tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (viewUiUxBtn) {
        viewUiUxBtn.addEventListener('click', window.openUiUxShowcaseModal);
    }

    if (openModalBtn) {
        openModalBtn.addEventListener('click', window.openUiUxShowcaseModal);
    }

    if (mobileAppCard) {
        mobileAppCard.addEventListener('click', window.openUiUxShowcaseModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', window.closeUiUxShowcaseModal);
    }

    // Close on clicking backdrop outside container
    if (uiuxModal) {
        uiuxModal.addEventListener('click', (e) => {
            if (e.target === uiuxModal) {
                window.closeUiUxShowcaseModal(e);
            }
        });
    }

    // Close on ESC key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && uiuxModal && uiuxModal.classList.contains('active')) {
            window.closeUiUxShowcaseModal(e);
        }
    });

    // Details Tab Switcher
    detailsTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            detailsTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetTab = btn.getAttribute('data-tab');
            tabPanes.forEach(pane => {
                if (pane.id === targetTab) {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });
        });
    });
}

// ==========================================================================
// INTERACTIVE SCROLL ANIMATIONS, REVEALS & 3D MOUSE TILT CONTROLLER
// ==========================================================================

// 1. Top Scroll Reading Progress Bar
function updateScrollProgress() {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight > 0) {
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercentage + '%';
    }
}
window.addEventListener('scroll', updateScrollProgress);

// 2. IntersectionObserver Scroll Reveal Controller
function initScrollReveal() {
    const revealTargets = document.querySelectorAll(
        '.section-title, .project-card, .skill-card, .service-card, .about-content, .contact-item, .hero-content, .hero-image'
    );

    revealTargets.forEach((el, index) => {
        if (!el.classList.contains('reveal-on-scroll')) {
            el.classList.add('reveal-on-scroll');
        }
        // Stagger grid items dynamically
        const delay = (index % 3) * 0.12;
        el.style.transitionDelay = `${delay}s`;
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-reveal-active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealTargets.forEach(el => revealObserver.observe(el));
}

// 3. Interactive 3D Card Mouse Tilt Tracking
function init3DTilt() {
    const cards = document.querySelectorAll('.project-card, .skill-card, .service-card');
    cards.forEach(card => {
        card.classList.add('tilt-card');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

// Dual Compatibility Static Path Fixer for GitHub Pages & Django
function fixStaticDjangoTags() {
    document.querySelectorAll('img').forEach(img => {
        let src = img.getAttribute('src');
        if (src && (src.includes('{%') || src.includes('%7B%25'))) {
            let match = src.match(/['"](.*?)['"]/);
            if (match && match[1]) {
                img.src = 'static/' + match[1];
            }
        }
    });
}

function initAllScrollAnimations() {
    fixStaticDjangoTags();
    initUiUxModal();
    initScrollReveal();
    init3DTilt();
    updateScrollProgress();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllScrollAnimations);
} else {
    initAllScrollAnimations();
}


