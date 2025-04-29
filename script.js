document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add shadow to header on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        if(document.body.classList.contains('dark-mode')){
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Make the search icon functional:
    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.querySelector('.search-container');
    
    searchIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        searchContainer.classList.toggle('active');
    });
    
    // Optional: Hide search container when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target) && !searchIcon.contains(e.target)) {
            searchContainer.classList.remove('active');
        }
    });

    // Back-to-top functionality for angle-up icon in the footer
    const backToTopLink = document.querySelector('footer .footer-content a[href="angle"]');
    if (backToTopLink) {
        backToTopLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 200; // Lower is faster
    const animateOnScroll = true;
    
    function animateNumbers() {
        statNumbers.forEach(statNumber => {
            const target = parseInt(statNumber.getAttribute('data-target'));
            const increment = target / speed;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                statNumber.textContent = Math.floor(current);
            }, 1);
        });
    }
    
    if (animateOnScroll) {
        // Use Intersection Observer to animate when scrolled into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelector('.stats-section').querySelectorAll('.stat-item').forEach(item => {
            observer.observe(item);
        });
    } else {
        // Animate immediately
        animateNumbers();
    }
});