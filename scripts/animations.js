
// Animation utilities
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.createStars();
        this.animateOnScroll();
        this.handleHoverEffects();
    }

    createStars() {
        const starsContainer = document.querySelector('.parallax-stars');
        if (!starsContainer) return;

        // Clear existing stars
        starsContainer.innerHTML = '';

        // Create 100 stars
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: white;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 3}s;
                opacity: ${Math.random() * 0.8 + 0.2};
            `;
            starsContainer.appendChild(star);
        }
    }

    animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        }, observerOptions);

        // Observe animated elements
        document.querySelectorAll('.main-logo, .tagline, .description').forEach(el => {
            observer.observe(el);
        });
    }

    handleHoverEffects() {
        // Add ripple effect to buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', this.createRipple);
        });

        // Add glow effects
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.boxShadow = '0 0 30px rgba(249, 115, 22, 0.6)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.boxShadow = '0 10px 25px rgba(249, 115, 22, 0.3)';
            });
        });
    }

    createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
}

// Parallax effect
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.bg-orb');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationManager();
    initParallax();
});
