// Homepage Script - Fixed GSAP references and variable conflicts

document.addEventListener('DOMContentLoaded', function() {
    console.log('Homepage script loading...');
    
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.close-btn');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.add('active');
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeBtn && mobileNav) {
        closeBtn.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu when clicking outside
    if (mobileNav) {
        mobileNav.addEventListener('click', function(e) {
            if (e.target === mobileNav) {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Grid animations - ONLY if GSAP is loaded and available
    function initializeAnimations() {
        // Check if GSAP is available
        if (typeof gsap !== 'undefined' && gsap.from) {
            try {
                gsap.from('.grid-item', {
                    duration: 0.8,
                    y: 50,
                    opacity: 0,
                    stagger: 0.1,
                    ease: "power2.out"
                });
                console.log('GSAP animations initialized');
            } catch (error) {
                console.log('GSAP animation failed, using fallback:', error);
                fallbackAnimation();
            }
        } else {
            console.log('GSAP not available, using fallback animation');
            fallbackAnimation();
        }
    }
    
    // Fallback animation without GSAP
    function fallbackAnimation() {
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
        console.log('Fallback animation applied');
    }
    
    // Initialize animations after a short delay
    setTimeout(initializeAnimations, 100);
    
    console.log('Homepage script loaded successfully');
});