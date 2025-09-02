// Professional DevOps Portfolio - Interactive JavaScript
'use strict';

// Global variables
let isMenuOpen = false;
let currentSection = 'home';
let typingInterval;
let skillsAnimated = false;

// Document ready
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Initialize all portfolio functionality
function initializePortfolio() {
    setupNavigation();
    setupMobileMenu();
    setupTypingEffect();
    setupScrollAnimations();
    setupSkillBars();
    setupSmoothScrolling();
    setupContactForm();
    
    // Initialize loading animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
}

// Navigation functionality
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle scroll events for navbar
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background when scrolled
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Handle active navigation
    window.addEventListener('scroll', updateActiveNavigation);
    
    // Add click handlers to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            closeMobileMenu();
        });
    });
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentActiveSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentActiveSection = section.id;
        }
    });
    
    if (currentActiveSection !== currentSection) {
        currentSection = currentActiveSection;
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// Mobile menu functionality
function setupMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (isMenuOpen) {
        isMenuOpen = false;
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Typing effect for hero section
function setupTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const roles = [
        'DevOps Engineer',
        'Backend Developer', 
        'AWS Solutions Architect',
        'Infrastructure Automation Expert',
        'CI/CD Pipeline Specialist'
    ];
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeRole() {
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && currentCharIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before next role
        }
        
        setTimeout(typeRole, typeSpeed);
    }
    
    // Start typing effect
    setTimeout(typeRole, 1000);
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger skill bars animation when skills section is visible
                if (entry.target.id === 'skills' && !skillsAnimated) {
                    setTimeout(() => animateSkillBars(), 300);
                    skillsAnimated = true;
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    document.querySelectorAll('section, .timeline-item, .project-card, .skills-category').forEach(el => {
        observer.observe(el);
    });
}

// Skills bars animation
function setupSkillBars() {
    // Will be triggered by scroll animation
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = `${progress}%`;
        }, index * 100);
    });
}

// Smooth scrolling
function setupSmoothScrolling() {
    // Already handled by CSS scroll-behavior, but adding JS fallback
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };
}

// Contact form functionality (if needed)
function setupContactForm() {
    // Enhanced contact interactions
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Social links interactions
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add ripple effect
            createRipple(e, this);
        });
    });
}

// Utility function to create ripple effect
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(72, 187, 120, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Terminal command simulation
function setupTerminalCommands() {
    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;
    
    // Add interactive terminal commands
    const commands = [
        { cmd: 'git status', output: 'On branch main\nYour branch is up to date with \'origin/main\'.' },
        { cmd: 'docker ps', output: 'CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS' },
        { cmd: 'kubectl get pods', output: 'NAME                     READY   STATUS    RESTARTS   AGE' }
    ];
    
    // This could be expanded for interactive terminal features
}

// Performance monitoring
function setupPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Portfolio loaded in ${loadTime.toFixed(2)}ms`);
        
        // Report Web Vitals if needed
        if ('performance' in window && 'getEntriesByType' in performance) {
            const paintEntries = performance.getEntriesByType('paint');
            paintEntries.forEach(entry => {
                console.log(`${entry.name}: ${entry.startTime.toFixed(2)}ms`);
            });
        }
    });
}

// Initialize performance monitoring
setupPerformanceMonitoring();

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    // Could send to error tracking service
});

// Prevent console spam in production
if (window.location.hostname !== 'localhost') {
    console.log('%cShikhar Raj - DevOps Portfolio', 
        'color: #48bb78; font-size: 24px; font-weight: bold;');
    console.log('%cBuilt with passion for DevOps and clean code', 
        'color: #4299e1; font-size: 14px;');
    console.log('%cInterested in the code? Check out my GitHub!', 
        'color: #ed8936; font-size: 12px;');
}

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToSection,
        animateSkillBars,
        createRipple
    };
}

// Additional professional enhancements
document.addEventListener('keydown', function(e) {
    // Add keyboard navigation
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1': scrollToSection('home'); break;
            case '2': scrollToSection('about'); break;
            case '3': scrollToSection('experience'); break;
            case '4': scrollToSection('certifications'); break;
            case '5': scrollToSection('skills'); break;
            case '6': scrollToSection('projects'); break;
            case '7': scrollToSection('contact'); break;
        }
    }
});

// Add loading states for dynamic content
function showLoading(element) {
    element.classList.add('loading');
}

function hideLoading(element) {
    element.classList.remove('loading');
}

// Accessibility enhancements
function setupAccessibility() {
    // Add focus management
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

setupAccessibility();

// Final initialization
console.log('🚀 Shikhar Raj DevOps Portfolio Initialized Successfully');
