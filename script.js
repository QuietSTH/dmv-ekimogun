document.addEventListener('DOMContentLoaded', () => {
    console.log("DMV Ekimogun Association site loaded.");
    
    // DOM Elements
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    // 1. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Scroll to section
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // 2. Hamburger Menu Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Change hamburger icon
        if (navLinks.classList.contains('active')) {
            hamburger.innerHTML = '<i class="fas fa-times"></i>';
            hamburger.setAttribute('aria-label', 'Close menu');
        } else {
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            hamburger.setAttribute('aria-label', 'Menu');
        }
    });
    
    // 3. Back to Top Button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 4. Contact Form Submission - LIVE with Formspree (AJAX, no redirect)
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const form = e.target;
            const formData = new FormData(form);
            
            // Disable button to prevent double submission (optional)
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'SENDING...';
            }
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Hide form, show success
                    form.style.display = 'none';
                    formSuccess.style.display = 'block';
                    form.reset();
                } else {
                    // Handle error from Formspree
                    const data = await response.json();
                    if (data.errors) {
                        alert(data.errors.map(e => e.message).join(', '));
                    } else {
                        alert('Oops! There was a problem submitting your form.');
                    }
                    // Re-enable button
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'SEND MESSAGE';
                    }
                }
            } catch (error) {
                alert('Oops! There was a problem submitting your form.');
                // Re-enable button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'SEND MESSAGE';
                }
            }
        });
    }
    
    // 5. Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            hamburger.setAttribute('aria-label', 'Menu');
        }
    });
    
    // 6. Add active class to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active-nav');
                });
                
                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                const link = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (link) {
                    link.classList.add('active-nav');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Add this CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active-nav {
        color: var(--primary) !important;
        font-weight: 600;
    }
    
    .nav-links a.active-nav::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);