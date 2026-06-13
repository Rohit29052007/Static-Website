/* ============================================
   ROHIT ATHAVAN R — Portfolio Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Cursor Glow Effect ──────────────────────
    const cursorGlow = document.getElementById('cursorGlow');
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('active');
    });

    // ─── Navbar Scroll Effect ────────────────────
    const navbar = document.getElementById('navbar');
    const scrollIndicator = document.getElementById('scrollIndicator');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide scroll indicator after scrolling
        if (window.scrollY > 200 && scrollIndicator) {
            scrollIndicator.style.opacity = '0';
        }
    });

    // ─── Mobile Navigation ───────────────────────
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ─── Active Nav Link on Scroll ───────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinksList.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ─── Typewriter Effect ───────────────────────
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
        'CS Student',
        'ML Enthusiast',
        'App Developer',
        'Problem Solver'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typewrite() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400; // Pause before next word
        }

        setTimeout(typewrite, typeSpeed);
    }

    typewrite();

    // ─── Stat Counter Animation ──────────────────
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsCounted = false;

    function animateStats() {
        if (statsCounted) return;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 1500;
            const step = target / (duration / 30);
            let current = 0;

            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 30);
        });

        statsCounted = true;
    }

    // ─── Skill Bar Animation ─────────────────────
    let skillsAnimated = false;

    function animateSkillBars() {
        if (skillsAnimated) return;

        document.querySelectorAll('.skill-fill').forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 200);
        });

        skillsAnimated = true;
    }

    // ─── Scroll Reveal (Intersection Observer) ───
    const revealElements = document.querySelectorAll(
        '.section-header, .about-text, .about-visual, .skill-card, .project-card, .contact-info, .contact-form-wrapper'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger stats animation when hero stats are visible
                if (entry.target.closest('.hero')) {
                    animateStats();
                }

                // Trigger skill bars animation
                if (entry.target.classList.contains('skill-card')) {
                    animateSkillBars();
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    // Also observe hero stats directly
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }

    // Trigger stats on load since hero is immediately visible
    setTimeout(animateStats, 800);

    // ─── Stagger Skill Card Animations ───────────
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.08}s`;
    });

    // ─── Contact Form Handler ────────────────────
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            contactForm.innerHTML = `
                <div class="form-success">
                    <p style="font-size: 1.5rem; margin-bottom: 12px;">✓</p>
                    <p>Thanks for reaching out!</p>
                    <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 8px;">
                        I'll get back to you soon.
                    </p>
                </div>
            `;
        }, 1200);
    });

    // ─── Smooth Scroll for CTA Buttons ───────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

});
