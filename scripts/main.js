
// Main application logic
class ResonatingSoulsApp {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupModals();
        this.setupForms();
        this.animateIndicators();
    }

    bindEvents() {
        // Modal triggers
        document.getElementById('signUpBtn').addEventListener('click', () => {
            this.openModal('signUpModal');
        });

        document.getElementById('signInBtn').addEventListener('click', () => {
            this.openModal('signInModal');
        });

        // Close buttons
        document.getElementById('closeSignUp').addEventListener('click', () => {
            this.closeModal('signUpModal');
        });

        document.getElementById('closeSignIn').addEventListener('click', () => {
            this.closeModal('signInModal');
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    setupModals() {
        // Add entrance animations
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('transitionend', (e) => {
                if (e.target === modal && !modal.style.display === 'block') {
                    modal.style.display = 'none';
                }
            });
        });
    }

    setupForms() {
        // Sign up form
        const signUpForm = document.getElementById('signUpForm');
        if (signUpForm) {
            signUpForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignUp(new FormData(signUpForm));
            });
        }

        // Sign in form
        const signInForm = document.getElementById('signInForm');
        if (signInForm) {
            signInForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignIn(new FormData(signInForm));
            });
        }

        // Add real-time validation
        this.setupFormValidation();
    }

    setupFormValidation() {
        // Password confirmation validation
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');

        if (password && confirmPassword) {
            confirmPassword.addEventListener('input', () => {
                if (password.value !== confirmPassword.value) {
                    confirmPassword.setCustomValidity('Passwords do not match');
                    confirmPassword.style.borderColor = '#ef4444';
                } else {
                    confirmPassword.setCustomValidity('');
                    confirmPassword.style.borderColor = '#d1d5db';
                }
            });
        }

        // Email validation
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value && !this.isValidEmail(input.value)) {
                    input.style.borderColor = '#ef4444';
                    this.showTooltip(input, 'Please enter a valid email address');
                } else {
                    input.style.borderColor = '#d1d5db';
                    this.hideTooltip(input);
                }
            });
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Trigger entrance animation
            setTimeout(() => {
                modal.style.opacity = '1';
                const content = modal.querySelector('.modal-content');
                if (content) {
                    content.style.transform = 'translateY(0)';
                }
            }, 10);
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.opacity = '0';
            const content = modal.querySelector('.modal-content');
            if (content) {
                content.style.transform = 'translateY(-50px)';
            }
            
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            this.closeModal(modal.id);
        });
    }

    handleSignUp(formData) {
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (data.password !== data.confirmPassword) {
            this.showNotification('Passwords do not match!', 'error');
            return;
        }

        if (data.password.length < 8) {
            this.showNotification('Password must be at least 8 characters long!', 'error');
            return;
        }

        // Simulate API call
        this.showLoading('Creating your account...');
        
        setTimeout(() => {
            this.hideLoading();
            this.showNotification('Account created successfully! Welcome to Resonating Souls!', 'success');
            this.closeModal('signUpModal');
            console.log('Sign up data:', data);
        }, 2000);
    }

    handleSignIn(formData) {
        const data = Object.fromEntries(formData);
        
        // Simulate API call
        this.showLoading('Signing you in...');
        
        setTimeout(() => {
            this.hideLoading();
            this.showNotification('Welcome back!', 'success');
            this.closeModal('signInModal');
            console.log('Sign in data:', data);
        }, 1500);
    }

    animateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        let currentIndex = 0;

        setInterval(() => {
            indicators.forEach((indicator, index) => {
                indicator.style.transform = index === currentIndex ? 'scale(1.3)' : 'scale(1)';
                indicator.style.opacity = index === currentIndex ? '1' : '0.6';
            });
            
            currentIndex = (currentIndex + 1) % indicators.length;
        }, 1000);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;

        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.background = 'linear-gradient(45deg, #059669, #10b981)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(45deg, #dc2626, #ef4444)';
                break;
            default:
                notification.style.background = 'linear-gradient(45deg, #3b82f6, #60a5fa)';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    showLoading(message) {
        const overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        `;

        const loader = document.createElement('div');
        loader.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        `;

        const spinner = document.createElement('div');
        spinner.style.cssText = `
            width: 40px;
            height: 40px;
            border: 4px solid #f3f4f6;
            border-top: 4px solid #f97316;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        `;

        const text = document.createElement('p');
        text.textContent = message;
        text.style.cssText = `
            margin: 0;
            color: #374151;
            font-weight: 500;
        `;

        loader.appendChild(spinner);
        loader.appendChild(text);
        overlay.appendChild(loader);
        document.body.appendChild(overlay);

        // Add spinner animation
        const spinnerStyle = document.createElement('style');
        spinnerStyle.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinnerStyle);
    }

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
        }
    }

    showTooltip(element, message) {
        this.hideTooltip(element);
        
        const tooltip = document.createElement('div');
        tooltip.className = 'field-tooltip';
        tooltip.textContent = message;
        tooltip.style.cssText = `
            position: absolute;
            bottom: 100%;
            left: 0;
            background: #ef4444;
            color: white;
            padding: 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            white-space: nowrap;
            z-index: 1000;
            transform: translateY(-5px);
        `;

        element.style.position = 'relative';
        element.parentNode.appendChild(tooltip);
    }

    hideTooltip(element) {
        const tooltip = element.parentNode.querySelector('.field-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResonatingSoulsApp();
});
