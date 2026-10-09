const navLinks = document.querySelectorAll('.nav-link');

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

            const hamburger = document.getElementById('hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');

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
                icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
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

const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted');
    });
}

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href')?.slice(1) === current) {
            link.classList.add('active');
        }
    });
});

const downloadBtn = document.querySelector('.download-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'Vishnu-Prasad-CV.pdf';
        link.click();
    });
}

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

document.querySelectorAll('.project-card, .service-card, .skill-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

const scrollToTopStyle = document.createElement('style');
scrollToTopStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
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

document.addEventListener('mousemove', () => {
    // Optional: Add custom cursor effects here
});

console.log('✨ Portfolio script loaded successfully!');

// Global E-Commerce Showcase Modal Controller Functions
window.openEcommerceShowcaseModal = function(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const modal = document.getElementById('ecommerceModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeEcommerceShowcaseModal = function(e) {
    if (e) {
        e.preventDefault();
    }
    const modal = document.getElementById('ecommerceModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

function initEcommerceModal() {
    const ecommerceCard = document.getElementById('ecommerceCard');
    const modal = document.getElementById('ecommerceModal');
    const closeModalBtn = document.getElementById('closeEcommerceModal');

    if (ecommerceCard) {
        ecommerceCard.addEventListener('click', window.openEcommerceShowcaseModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', window.closeEcommerceShowcaseModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                window.closeEcommerceShowcaseModal(e);
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            window.closeEcommerceShowcaseModal(e);
        }
    });
}

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

// Back to Case Studies Navigation Handler (Prevents 404 on Django/static hosting)
function initBackHomeButtons() {
    document.querySelectorAll('.back-home-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const href = btn.getAttribute('href');
            if (href && href.includes('#case-studies')) {
                const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';
                if (isHomePage) {
                    e.preventDefault();
                    const target = document.querySelector('#case-studies');
                    if (target) {
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                } else {
                    e.preventDefault();
                    const homePath = window.location.protocol === 'file:' ? 'index.html#case-studies' : '/#case-studies';
                    window.location.href = homePath;
                }
            }
        });
    });
}

function initAllScrollAnimations() {
    fixStaticDjangoTags();
    initBackHomeButtons();
    initEcommerceModal();
    initUiUxModal();
    initScrollReveal();
    init3DTilt();
    updateScrollProgress();
    initCustomCursor();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllScrollAnimations);
} else {
    initAllScrollAnimations();
}

// ==========================================================================
// VISHNU'S AI PORTFOLIO ASSISTANT CHATBOT ENGINE (2026)
// ==========================================================================

window.toggleAiAssistantModal = function(e) {
    if (e) e.stopPropagation();
    const modal = document.getElementById('aiAssistantModal');
    if (modal) {
        modal.classList.toggle('active');
        if (modal.classList.contains('active')) {
            const input = document.getElementById('aiUserInput');
            if (input) setTimeout(() => input.focus(), 200);
        }
    }
};

window.sendQuickPrompt = function(promptText) {
    const userInput = document.getElementById('aiUserInput');
    if (userInput) {
        userInput.value = promptText;
        const form = document.getElementById('aiInputForm');
        if (form) {
            form.dispatchEvent(new Event('submit', { cancelable: true }));
        }
    }
};

window.handleAiChatSubmit = function(e) {
    e.preventDefault();
    const input = document.getElementById('aiUserInput');
    const messagesContainer = document.getElementById('aiChatMessages');
    if (!input || !messagesContainer) return;

    const userText = input.value.trim();
    if (!userText) return;

    // Append user message bubble
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'ai-message user-message';
    userMsgDiv.innerHTML = `
        <div class="msg-avatar"><i class="fas fa-user"></i></div>
        <div class="msg-bubble"><p>${escapeHtml(userText)}</p></div>
    `;
    messagesContainer.appendChild(userMsgDiv);
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Show typing indicator
    const botMsgDiv = document.createElement('div');
    botMsgDiv.className = 'ai-message bot-message';
    botMsgDiv.innerHTML = `
        <div class="msg-avatar"><i class="fas fa-robot"></i></div>
        <div class="msg-bubble"><p><i class="fas fa-spinner fa-spin"></i> Analyzing Vishnu's portfolio knowledge base...</p></div>
    `;
    messagesContainer.appendChild(botMsgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Generate intelligent AI response after short delay
    setTimeout(() => {
        const responseText = generatePortfolioAiResponse(userText);
        const bubble = botMsgDiv.querySelector('.msg-bubble');
        if (bubble) {
            bubble.innerHTML = responseText;
        }
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 450);
};

function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

function generatePortfolioAiResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('skill') || q.includes('technolog') || q.includes('stack') || q.includes('ai') || q.includes('llm') || q.includes('gpt')) {
        return `<p>⚡ <strong>Vishnu's AI & Technical Skill Set:</strong></p>
                <ul>
                    <li>🤖 <strong>AI & LLMs:</strong> OpenAI API, Gemini API, Prompt Engineering, Agentic Workflows, Cursor AI (92%)</li>
                    <li>🐍 <strong>Backend:</strong> Python, Django, REST APIs, SQLite3, PythonAnywhere (88%)</li>
                    <li>🎨 <strong>UI/UX Design:</strong> Figma, Design Systems, Mobile App Wireframing, Spline 3D (95%)</li>
                    <li>💻 <strong>Frontend:</strong> HTML5, CSS3, JavaScript ES6, Responsive Web Layouts (95%)</li>
                </ul>`;
    } else if (q.includes('project') || q.includes('jakso') || q.includes('lumina') || q.includes('e-commerce') || q.includes('ecommerce')) {
        return `<p>🛍️ <strong>Vishnu's Featured AI & E-Commerce Projects:</strong></p>
                <p>1. <strong>Jakso Django E-Commerce:</strong> Full-stack web application hosted on PythonAnywhere featuring Django ORM, authentication, and cart backend.<br>
                2. <strong>Lumina Furniture:</strong> High-performance responsive e-commerce web app with 3D product viewports.<br>
                3. <strong>Figma Mobile UI Showcase:</strong> Cake Shop App, Luxe Perfume 3D Experience, and AstroConnect Mobile App UI.</p>`;
    } else if (q.includes('hire') || q.includes('work') || q.includes('company') || q.includes('job') || q.includes('role') || q.includes('feature')) {
        return `<p>🚀 <strong>Why Hire Vishnu for AI & Web Development?</strong></p>
                <p>Vishnu builds end-to-end intelligent web products from AI concept to production code! He specializes in integrating LLM APIs (OpenAI/Gemini), creating AI agents, engineering Django backends, and crafting Figma UI/UX design systems.</p>`;
    } else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('call')) {
        return `<p>📩 <strong>Contact Vishnu Prasad:</strong></p>
                <ul>
                    <li>📧 Email: <a href="mailto:vichu0703@gmail.com" style="color: #38bdf8;">vichu0703@gmail.com</a></li>
                    <li>📞 Phone: <a href="tel:+919778720176" style="color: #38bdf8;">+91 9778720176</a></li>
                    <li>📍 Location: Palakkad, Kerala, India</li>
                    <li>🌐 GitHub: <a href="https://github.com/vichu070302" target="_blank" style="color: #38bdf8;">github.com/vichu070302</a></li>
                </ul>`;
    } else {
        return `<p>💡 Vishnu is an <strong>AI-Powered Full Stack Developer & UI/UX Designer</strong> specializing in Python Django, AI Agent workflows, OpenAI/Gemini integrations, and responsive Figma designs.</p>
                <p>Feel free to ask about his <strong>AI skills</strong>, <strong>Jakso/Lumina projects</strong>, or <strong>contact info</strong>!</p>`;
    }
}

// ==========================================================================
// CUSTOM SMOOTH INTERACTIVE CURSOR & TRAILING PARTICLES SYSTEM
// ==========================================================================

function initCustomCursor() {
    const dot = document.getElementById('cursorDot');
    const follower = document.getElementById('cursorFollower');
    if (!dot || !follower || window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;
    let lastParticleTime = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;

        const now = Date.now();
        if (now - lastParticleTime > 45) {
            spawnCursorParticle(mouseX, mouseY);
            lastParticleTime = now;
        }
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.18;
        followerY += (mouseY - followerY) * 0.18;

        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    const hoverables = document.querySelectorAll('a, button, .project-card, .csk-card, .service-card, input, textarea, .ai-chip');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => follower.classList.remove('cursor-hover'));
    });

    document.addEventListener('mousedown', () => follower.classList.add('cursor-active'));
    document.addEventListener('mouseup', () => follower.classList.remove('cursor-active'));
}

function spawnCursorParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const angle = Math.random() * Math.PI * 2;
    const distance = 10 + Math.random() * 16;
    const destX = x + Math.cos(angle) * distance;
    const destY = y + Math.sin(angle) * distance;

    document.body.appendChild(particle);

    requestAnimationFrame(() => {
        particle.style.left = `${destX}px`;
        particle.style.top = `${destY}px`;
        particle.style.transform = `translate(-50%, -50%) scale(0)`;
        particle.style.opacity = `0`;
    });

    setTimeout(() => particle.remove(), 550);
}


