/**
 * Purple Penguin Properties LLC — scripts.js
 * Vue 3 application | WCAG 2.2 / ADA / Section 508
 */

const { createApp } = Vue;

createApp({

    /* --------------------------------------------------------
       State
    -------------------------------------------------------- */
    data() {
        return {
            isScrolled:     false,
            activeSection:  'cover',
            showHomeButton: false,
            currentYear:    new Date().getFullYear(),

            form: { name: '', email: '', subject: '', message: '' },
            errors: { name: '', email: '', subject: '', message: '' },

            submitting:    false,
            submitMessage: '',
            submitSuccess: false,

            sections: ['cover', 'mission', 'about', 'contact']
        };
    },

    /* --------------------------------------------------------
       Lifecycle
    -------------------------------------------------------- */
    mounted() {
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        this.observeRevealElements();
        this.handleScroll();
    },

    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    /* --------------------------------------------------------
       Methods
    -------------------------------------------------------- */
    methods: {

        /* ---- Scroll handler -------------------------------- */
        handleScroll() {
            const y = window.scrollY;
            this.isScrolled    = y > 50;
            this.showHomeButton = y > window.innerHeight;

            const offset = 120;
            let current = this.sections[0];
            for (const id of this.sections) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= offset) current = id;
            }
            this.activeSection = current;
        },

        /* ---- Smooth scroll helpers ------------------------- */
        scrollToSection(id) {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        },

        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        /* ---- IntersectionObserver: reveal on scroll -------- */
        observeRevealElements() {
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('visible');
                        obs.unobserve(e.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

            document.querySelectorAll('.fade-in, .team-item')
                    .forEach(el => obs.observe(el));
        },

        /* ---- Client-side validation (WCAG 3.3.1 / 3.3.3) -- */
        validateForm() {
            const errs = { name: '', email: '', subject: '', message: '' };
            let valid = true;

            if (!this.form.name.trim()) {
                errs.name = 'Name is required.';
                valid = false;
            }

            const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.form.email.trim()) {
                errs.email = 'Email address is required.';
                valid = false;
            } else if (!emailRe.test(this.form.email.trim())) {
                errs.email = 'Enter a valid email address (e.g. you@example.com).';
                valid = false;
            }

            if (!this.form.subject.trim()) {
                errs.subject = 'Subject is required.';
                valid = false;
            }

            if (!this.form.message.trim()) {
                errs.message = 'Message cannot be empty.';
                valid = false;
            }

            this.errors = errs;
            return valid;
        },

        /* ---- Contact form submission ----------------------- */
        async submitForm() {
            this.submitMessage = '';

            if (!this.validateForm()) {
                // Move focus to first invalid field (WCAG 3.3.1)
                const fieldMap = {
                    name:    'contactName',
                    email:   'contactEmail',
                    subject: 'contactSubject',
                    message: 'contactMessage'
                };
                const firstErr = Object.keys(this.errors).find(k => this.errors[k]);
                if (firstErr) document.getElementById(fieldMap[firstErr])?.focus();
                return;
            }

            this.submitting = true;

            try {
                const res = await fetch('https://formspree.io/f/mpqjkvzy', {
                    method:  'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name:     this.form.name.trim(),
                        email:    this.form.email.trim(),
                        subject:  this.form.subject.trim(),
                        message:  this.form.message.trim(),
                        _replyto: this.form.email.trim(),
                        _subject: `PPP Contact: ${this.form.subject.trim()}`
                    })
                });

                if (res.ok) {
                    this.submitSuccess = true;
                    this.submitMessage = "Message sent! We'll be in touch soon.";
                    this.form   = { name: '', email: '', subject: '', message: '' };
                    this.errors = { name: '', email: '', subject: '', message: '' };
                } else {
                    this.submitSuccess = false;
                    this.submitMessage = 'Something went wrong. Please try again or email us directly.';
                }
            } catch {
                this.submitSuccess = false;
                this.submitMessage = 'Unable to send — check your connection and try again.';
            } finally {
                this.submitting = false;
                // Move focus to status message for AT users (WCAG 4.1.3)
                this.$nextTick(() => {
                    document.getElementById('submitAlert')?.focus();
                });
            }
        }
    }

}).mount('#app');