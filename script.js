
// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.background = 'white';
        navbar.style.backdropFilter = 'none';
    }
});

// Countdown Timer
function startCountdown() {
    // Set countdown date (24 hours from now)
    const countdownDate = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    const countdownElement = document.getElementById('countdown');
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
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
        
        if (distance < 0) {
            clearInterval(timer);
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">00</span>
                    <span class="countdown-label">Promo Berakhir</span>
                </div>
            `;
        }
    }, 1000);
}

// Start countdown when page loads
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
});

// Loading animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
        }
    });
}, observerOptions);

// Observe all elements with loading class
document.querySelectorAll('.loading').forEach(el => {
    observer.observe(el);
});

// Add loading class to all animated elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        el.classList.add('loading');
    });
});

// Testimonial slider functionality (if needed for mobile)
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentSlide = 0;
    
    if (window.innerWidth <= 768) {
        // Hide all cards except first on mobile
        testimonialCards.forEach((card, index) => {
            if (index !== 0) {
                card.style.display = 'none';
            }
        });
        
        // Auto-rotate testimonials on mobile
        setInterval(() => {
            testimonialCards[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            testimonialCards[currentSlide].style.display = 'block';
        }, 5000);
    }
}

// Before/After image comparison
document.querySelectorAll('.before-after-images').forEach(container => {
    container.addEventListener('mouseenter', function() {
        const afterImage = this.querySelector('.after-image');
        afterImage.style.transform = 'translateX(-100%)';
    });
    
    container.addEventListener('mouseleave', function() {
        const afterImage = this.querySelector('.after-image');
        afterImage.style.transform = 'translateX(0)';
    });
});

// Add click tracking for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Track button clicks (you can integrate with analytics here)
        console.log('Button clicked:', this.textContent.trim());
    });
});

// Form validation and WhatsApp integration
function validateAndRedirectToWhatsApp(packageType, price) {
    const whatsappNumber = '628123456789';
    const message = `Halo, saya ingin memesan ${packageType} GlowSkin Serum dengan harga ${price}. Mohon informasi lebih lanjut tentang proses pemesanan.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Add floating elements animation
function createFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-badge, .hero-product-image');
    
    floatingElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialSlider();
    createFloatingElements();
    
    // Add fade-in effect to page load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add scroll-triggered animations
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-section');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add click ripple effect
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
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
document.head.appendChild(rippleStyle);

// Performance optimization
window.addEventListener('load', function() {
    // Lazy load images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add error handling for WhatsApp links
document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Track WhatsApp clicks
        console.log('WhatsApp link clicked:', this.href);
        
        // Fallback for devices without WhatsApp
        setTimeout(() => {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            if (/android/i.test(userAgent)) {
                // Android fallback
                this.href = this.href.replace('https://wa.me/', 'intent://send/');
            }
        }, 100);
    });
});
