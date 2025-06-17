
// Modern GlowSkin Landing Page JavaScript

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        delay: 100
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('.smooth-scroll').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 80;
            const elementPosition = targetSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Advanced Navbar Scroll Effect
let lastScrollTop = 0;
const navbar = document.querySelector('.glass-nav');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class based on scroll position
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Enhanced Countdown Timer
function initCountdown() {
    // Set countdown to 24 hours from now
    const countdownDate = new Date().getTime() + (24 * 60 * 60 * 1000);
    const countdownElement = document.getElementById('countdown-timer');
    
    if (!countdownElement) return;
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        if (distance < 0) {
            clearInterval(timer);
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">00</span>
                    <span class="countdown-label">Berakhir</span>
                </div>
            `;
            return;
        }
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${hours.toString().padStart(2, '0')}</span>
                <span class="countdown-label">Jam</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes.toString().padStart(2, '0')}</span>
                <span class="countdown-label">Menit</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds.toString().padStart(2, '0')}</span>
                <span class="countdown-label">Detik</span>
            </div>
        `;
    }, 1000);
}

// Enhanced Before/After Image Comparison
function initBeforeAfter() {
    const comparisonSliders = document.querySelectorAll('.comparison-slider');
    
    comparisonSliders.forEach(slider => {
        const afterSection = slider.querySelector('.after-section');
        const handle = slider.querySelector('.slider-handle');
        
        let isMouseDown = false;
        
        function updateSlider(e) {
            if (!isMouseDown && e.type !== 'mousemove') return;
            
            const rect = slider.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            afterSection.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            handle.style.left = `${percentage}%`;
        }
        
        // Mouse events
        slider.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            updateSlider(e);
        });
        
        document.addEventListener('mousemove', updateSlider);
        document.addEventListener('mouseup', () => isMouseDown = false);
        
        // Touch events for mobile
        slider.addEventListener('touchstart', (e) => {
            isMouseDown = true;
            e.clientX = e.touches[0].clientX;
            updateSlider(e);
        });
        
        slider.addEventListener('touchmove', (e) => {
            if (isMouseDown) {
                e.clientX = e.touches[0].clientX;
                updateSlider(e);
            }
        });
        
        slider.addEventListener('touchend', () => isMouseDown = false);
        
        // Auto animation on hover for desktop
        slider.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                afterSection.style.transition = 'clip-path 0.6s ease';
                afterSection.style.clipPath = 'inset(0 0 0 0)';
                handle.style.left = '100%';
            }
        });
        
        slider.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                afterSection.style.clipPath = 'inset(0 50% 0 0)';
                handle.style.left = '50%';
            }
        });
    });
}

// Enhanced FAQ Accordion
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.classList.contains('show');
            
            // Close all other answers
            document.querySelectorAll('.faq-answer.show').forEach(openAnswer => {
                if (openAnswer !== answer) {
                    openAnswer.classList.remove('show');
                    openAnswer.previousElementSibling.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current answer
            if (!isOpen) {
                answer.classList.add('show');
                this.setAttribute('aria-expanded', 'true');
            } else {
                answer.classList.remove('show');
                this.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-circle');
    
    floatingElements.forEach(element => {
        const speed = Math.random() * 2 + 1;
        const delay = Math.random() * 2;
        
        element.style.animationDuration = `${speed * 6}s`;
        element.style.animationDelay = `${delay}s`;
    });
}

// Advanced Loading Animation
function initLoadingAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                
                // Add stagger effect for multiple elements
                const siblings = entry.target.parentNode.children;
                Array.from(siblings).forEach((sibling, index) => {
                    if (sibling.classList.contains('loading')) {
                        setTimeout(() => {
                            sibling.classList.add('loaded');
                        }, index * 100);
                    }
                });
            }
        });
    }, observerOptions);
    
    // Add loading class to AOS elements
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// Button Click Effects
function initButtonEffects() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Scale effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Analytics tracking (placeholder)
            console.log('Button clicked:', this.textContent.trim());
        });
    });
}

// WhatsApp Click Tracking and Fallback
function initWhatsAppIntegration() {
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Track WhatsApp clicks
            console.log('WhatsApp link clicked:', this.href);
            
            // Mobile optimization
            if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                // For mobile devices, ensure the link opens correctly
                setTimeout(() => {
                    const userAgent = navigator.userAgent;
                    if (/android/i.test(userAgent)) {
                        // Android handling
                        this.href = this.href.replace('https://wa.me/', 'intent://send/');
                    }
                }, 100);
            }
        });
    });
}

// Product Image Gallery Effect
function initProductGallery() {
    const productImages = document.querySelectorAll('.hero-product-img, .solution-main-img');
    
    productImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) saturate(1.2)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) saturate(1)';
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-circle');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        // Hero image parallax
        const heroImg = document.querySelector('.hero-product-img');
        if (heroImg) {
            const yPos = scrolled * 0.3;
            heroImg.style.transform = `translateY(${yPos}px)`;
        }
    });
}

// Form Validation and Enhancement
function validateAndSendWhatsApp(packageType, price) {
    const whatsappNumber = '628123456789';
    const message = `Halo, saya tertarik dengan ${packageType} GlowSkin Serum dengan harga ${price}. 

Mohon informasi lebih lanjut tentang:
- Proses pemesanan
- Metode pembayaran  
- Estimasi pengiriman
- Konsultasi produk

Terima kasih!`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Performance Optimization - Lazy Loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                        img.classList.add('loaded');
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Mobile Menu Enhancement
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            setTimeout(() => {
                const isOpen = navbarCollapse.classList.contains('show');
                document.body.style.overflow = isOpen ? 'hidden' : 'auto';
            }, 100);
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    hide: true
                });
                document.body.style.overflow = 'auto';
            });
        });
    }
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    initCountdown();
    initBeforeAfter();
    initFAQ();
    initButtonEffects();
    initWhatsAppIntegration();
    
    // Visual enhancements
    initFloatingElements();
    initLoadingAnimations();
    initProductGallery();
    initParallaxEffects();
    initLazyLoading();
    initMobileMenu();
    
    // Page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Preload critical images
    const criticalImages = [
        'https://images.unsplash.com/photo-1556228578-dd7c9fdf52d1',
        'https://images.unsplash.com/photo-1594824204098-7add17cd8c98'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Error handling for external dependencies
window.addEventListener('error', function(e) {
    console.log('Error caught:', e.error);
    // Fallback functionality if needed
});

// Performance monitoring
window.addEventListener('load', function() {
    console.log('Page fully loaded in', performance.now(), 'ms');
});
