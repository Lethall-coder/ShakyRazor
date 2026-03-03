/* ========================================
   THE SHAKY RAZOR BARBERSHOP
   Main JavaScript
   ======================================== */

(function () {
    'use strict';

    /* ----------------------------------------
       Barber Data
       ========================================
       Add more barbers by adding objects to this array.
       Each barber needs:
       - id: unique identifier (matches data-barber attribute)
       - name: full name
       - title: job title
       - image: path to image
       - bio: about me text
       - bookingUrl: Vagaro booking link (can be individual or general)
       - gallery: array of image objects { src, alt } or null for placeholder
       ---------------------------------------- */
    const barbersData = [
        {
            id: 'gregory',
            name: 'Gregory Rocha',
            title: 'Owner & Head Barber',
            image: 'images/barbers/Gregory.png',
            /*
            ========================================
            PLACEHOLDER BIO - UPDATE WITH ACTUAL CONTENT
            Replace this bio with Gregory's actual bio
            ========================================
            */
            bio: 'Gregory founded The Shaky Razor in 2017 with a vision to bring classic barbering back to San Ramon. With over 10 years behind the chair, he specializes in precision fades, straight razor shaves, and making every client feel like family. When he\'s not perfecting cuts, you\'ll find him mentoring the next generation of barbers and staying on top of the latest trends in men\'s grooming.',
            /*
            ========================================
            INDIVIDUAL BOOKING LINK - UPDATE WHEN AVAILABLE
            Replace with Gregory's personal Vagaro booking page
            ========================================
            */
            bookingUrl: 'https://www.vagaro.com/theshakyrazorbarbershop',
            /*
            ========================================
            GALLERY IMAGES - ADD WHEN AVAILABLE
            Replace null with array of { src: 'path/to/image.jpg', alt: 'Description' }
            ========================================
            */
            gallery: null
        }
        /*
        ========================================
        ADD MORE BARBERS HERE
        Copy the object structure above for each new barber
        ========================================
        */
    ];

    /* ----------------------------------------
       DOM Elements
       ---------------------------------------- */
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const barberCards = document.querySelectorAll('.barber-card');
    const modal = document.getElementById('barber-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalBio = document.getElementById('modal-bio');
    const modalGallery = document.getElementById('modal-gallery');
    const modalBookBtn = document.getElementById('modal-book-btn');
    const modalBookName = document.getElementById('modal-book-name');
    const closeModalBtns = document.querySelectorAll('[data-close-modal]');
    const fadeElements = document.querySelectorAll('.fade-in');

    /* ----------------------------------------
       Mobile Navigation
       ---------------------------------------- */
    function toggleNav() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navToggle.setAttribute(
            'aria-expanded',
            navToggle.classList.contains('active')
        );

        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    function closeNav() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', toggleNav);

    navLinks.forEach(link => {
        link.addEventListener('click', closeNav);
    });

    // Close nav on click outside
    document.addEventListener('click', (e) => {
        if (
            navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)
        ) {
            closeNav();
        }
    });

    /* ----------------------------------------
       Header Scroll Effect
       ---------------------------------------- */
    let lastScrollY = 0;

    function handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    /* ----------------------------------------
       Barber Modal
       ---------------------------------------- */
    function getBarberData(barberId) {
        return barbersData.find(barber => barber.id === barberId);
    }

    function renderGallery(gallery) {
        if (!gallery || gallery.length === 0) {
            return `
                <div class="modal__gallery-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <p>Gallery coming soon</p>
                    <p style="font-size: 0.85rem; margin-top: 0.5rem;">Fresh cuts dropping soon</p>
                </div>
            `;
        }

        return `
            <div class="modal__gallery-grid">
                ${gallery.map(img => `
                    <img src="${img.src}" alt="${img.alt}" loading="lazy" class="modal__gallery-image">
                `).join('')}
            </div>
        `;
    }

    function openModal(barberId) {
        const barber = getBarberData(barberId);
        if (!barber) return;

        // Populate modal content
        modalImage.src = barber.image;
        modalImage.alt = barber.name;
        modalTitle.textContent = barber.name;
        modalSubtitle.textContent = barber.title;
        modalBio.textContent = barber.bio;
        modalGallery.innerHTML = renderGallery(barber.gallery);
        modalBookBtn.href = barber.bookingUrl;
        modalBookName.textContent = barber.name.split(' ')[0]; // First name only

        // Show modal
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        // Focus management
        modalBookBtn.focus();

        // Trap focus in modal
        trapFocus(modal);
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');

        // Return focus to the triggering element
        const activeCard = document.querySelector('.barber-card[data-active="true"]');
        if (activeCard) {
            activeCard.focus();
            activeCard.removeAttribute('data-active');
        }
    }

    // Focus trap for accessibility
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        function handleTabKey(e) {
            if (e.key !== 'Tab') return;

            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }

        element.addEventListener('keydown', handleTabKey);

        // Clean up when modal closes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.attributeName === 'class' &&
                    !element.classList.contains('active')
                ) {
                    element.removeEventListener('keydown', handleTabKey);
                    observer.disconnect();
                }
            });
        });

        observer.observe(element, { attributes: true });
    }

    // Event listeners for barber cards
    barberCards.forEach(card => {
        card.addEventListener('click', () => {
            card.setAttribute('data-active', 'true');
            openModal(card.dataset.barber);
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.setAttribute('data-active', 'true');
                openModal(card.dataset.barber);
            }
        });
    });

    // Close modal events
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    /* ----------------------------------------
       Scroll Animations (Intersection Observer)
       ---------------------------------------- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    /* ----------------------------------------
       Smooth Scroll for Safari
       ---------------------------------------- */
    // Native smooth scroll is supported in modern browsers,
    // but this provides a fallback for older Safari versions
    if (!CSS.supports('scroll-behavior', 'smooth')) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = parseInt(
                        getComputedStyle(document.documentElement)
                            .getPropertyValue('--header-height')
                    ) || 80;

                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /* ----------------------------------------
       Initialize
       ---------------------------------------- */
    function init() {
        // Trigger initial scroll handler
        handleScroll();

        // Mark elements above the fold as visible immediately
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add('visible');
            }
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
