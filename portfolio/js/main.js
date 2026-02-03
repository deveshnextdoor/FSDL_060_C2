/**
 * Portfolio Website JavaScript
 * Handles navigation, animations, and form interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    ThemeToggle.init();
    Navigation.init();
    ScrollAnimations.init();
    ContactForm.init();
});

/**
 * Theme Toggle Module
 * Handles dark/light mode with localStorage persistence
 */
const ThemeToggle = {
    toggle: null,

    init() {
        this.toggle = document.getElementById('theme-toggle');
        if (!this.toggle) return;

        // Check for saved preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        this.bindEvents();
    },

    bindEvents() {
        this.toggle.addEventListener('click', () => this.toggleTheme());

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    },

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
};

/**
 * Navigation Module
 * Handles navbar scroll effects and mobile menu
 */
const Navigation = {
    navbar: null,
    navToggle: null,
    navMenu: null,
    navLinks: null,

    init() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.bindEvents();
        this.updateActiveLink();
    },

    bindEvents() {
        // Navbar scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Update active link on scroll
        window.addEventListener('scroll', () => this.updateActiveLink());

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMobileMenu();
        });

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    },

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    },

    toggleMobileMenu() {
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    },

    closeMobileMenu() {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    },

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

/**
 * Scroll Animations Module
 * Handles reveal animations on scroll
 */
const ScrollAnimations = {
    elements: null,
    observer: null,

    init() {
        this.setupRevealElements();
        this.createObserver();
    },

    setupRevealElements() {
        // Add reveal class to sections and elements
        const revealSelectors = [
            '.section-title',
            '.section-subtitle',
            '.about-image-wrapper',
            '.about-text',
            '.skill-category',
            '.project-card',
            '.timeline-item',
            '.contact-info',
            '.contact-form'
        ];

        revealSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, index) => {
                el.classList.add('reveal');
                el.style.transitionDelay = `${index * 0.1}s`;
            });
        });

        this.elements = document.querySelectorAll('.reveal');
    },

    createObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, options);

        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }
};

/**
 * Contact Form Module
 * Handles form validation and submission with inline error messages
 */
const ContactForm = {
    form: null,
    inputs: null,
    successMessage: null,

    init() {
        this.form = document.getElementById('contact-form');
        if (!this.form) return;

        this.inputs = this.form.querySelectorAll('.form-input, .form-textarea');
        this.successMessage = document.getElementById('form-success');
        this.bindEvents();
    },

    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation on blur
        this.inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    },

    validateField(input) {
        const fieldName = input.name;
        const value = input.value.trim();
        const errorElement = document.getElementById(`${fieldName}-error`);

        let errorMessage = '';

        // Check if empty for required fields
        if (input.hasAttribute('required') && !value) {
            errorMessage = `${this.capitalize(fieldName)} is required`;
        }

        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Message minimum length
        if (fieldName === 'message' && value && value.length < 10) {
            errorMessage = 'Message must be at least 10 characters';
        }

        // Show/hide error
        if (errorMessage) {
            input.classList.add('error');
            if (errorElement) errorElement.textContent = errorMessage;
            return false;
        } else {
            input.classList.remove('error');
            if (errorElement) errorElement.textContent = '';
            return true;
        }
    },

    clearError(input) {
        const fieldName = input.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        input.classList.remove('error');
        if (errorElement) errorElement.textContent = '';
    },

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        this.inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Show success state
        this.showSuccess();

        // Reset form after delay
        setTimeout(() => {
            this.form.reset();
            this.resetSuccess();
        }, 5000);
    },

    showSuccess() {
        const button = this.form.querySelector('.btn-submit');
        const originalText = button.innerHTML;

        button.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"/>
            </svg>
            Sent!
        `;
        button.style.background = '#10b981';
        button.disabled = true;
        button.dataset.originalText = originalText;

        // Show success message
        if (this.successMessage) {
            this.successMessage.classList.add('show');
        }
    },

    resetSuccess() {
        const button = this.form.querySelector('.btn-submit');
        button.innerHTML = button.dataset.originalText;
        button.style.background = '';
        button.disabled = false;

        // Hide success message
        if (this.successMessage) {
            this.successMessage.classList.remove('show');
        }
    }
};

/**
 * Smooth Scroll Enhancement
 * Adds smooth scrolling for anchor links
 */
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

/**
 * Typing Animation (Optional Enhancement)
 * Can be used for hero subtitle
 */
const TypeWriter = {
    element: null,
    words: ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'],
    currentWord: 0,
    currentChar: 0,
    isDeleting: false,
    typeSpeed: 100,

    init(elementSelector) {
        this.element = document.querySelector(elementSelector);
        if (!this.element) return;

        this.element.textContent = '';
        this.type();
    },

    type() {
        const word = this.words[this.currentWord];

        if (this.isDeleting) {
            this.element.textContent = word.substring(0, this.currentChar - 1);
            this.currentChar--;
        } else {
            this.element.textContent = word.substring(0, this.currentChar + 1);
            this.currentChar++;
        }

        let delta = this.isDeleting ? 50 : this.typeSpeed;

        if (!this.isDeleting && this.currentChar === word.length) {
            delta = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentChar === 0) {
            this.isDeleting = false;
            this.currentWord = (this.currentWord + 1) % this.words.length;
            delta = 500;
        }

        setTimeout(() => this.type(), delta);
    }
};

// Optional: Enable typing animation for hero subtitle
// TypeWriter.init('.hero-subtitle');
