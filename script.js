document.addEventListener('DOMContentLoaded', () => {
    
    /* --- Mobile Menu Toggle --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    /* --- Navbar Scrolled State --- */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- Typewriter Effect --- */
    const roles = [
        ".NET Developer",
        "Backend Engineer",
        "Microservices Enthusiast",
        "Full-Stack Developer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    const typewriterElement = document.getElementById('typewriter');

    function typeWriter() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before start new word
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Start typewriter effect after a short delay
    setTimeout(typeWriter, 1000);


    /* --- Intersection Observer for Scroll Animations --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                // If it's the stats section, trigger counters
                if (entry.target.classList.contains('stats-grid') || entry.target.closest('.achievements')) {
                    startCounters();
                }
                
                // Optional: unobserve after animating
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with fade-in classes
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    fadeElements.forEach(el => observer.observe(el));


    /* --- Animated Counters --- */
    let countersStarted = false;
    
    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;

        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the slower

        counters.forEach(counter => {
            const animate = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                
                // Calculate increment
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(animate, 20);
                } else {
                    counter.innerText = target;
                }
            }
            animate();
        });
    }

    /* --- Form Submission (Prevent Default for demo) --- */
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Sent Successfully! <i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                form.reset();
                
                // Reset floating labels by blurring
                const inputs = form.querySelectorAll('input, textarea');
                inputs.forEach(input => input.blur());
            }, 3000);
        });
    }
});
