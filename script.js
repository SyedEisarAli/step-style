class ShoeStore {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileNavigation();
        this.setupScrollAnimations();
        this.setupAddToCart();
        this.setupAnimations();
        this.setupScrollToTop();
        this.setupPageTransitions();
        this.setupLazyLoading();
    }

    // Mobile Navigation
    setupMobileNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-menu a');

        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.product-card, .category-card, .about-text, .image-placeholder').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Add to Cart Functionality
    setupAddToCart() {
        const addToCartButtons = document.querySelectorAll('.btn');

        addToCartButtons.forEach(button => {
            if (button.textContent.trim() === 'Add to Cart') {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.animateAddToCart(button);
                });
            }
        });
    }

    animateAddToCart(button) {
        const originalText = button.textContent;
        const originalBg = button.style.backgroundColor;

        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        button.appendChild(ripple);

        // Button animation
        button.textContent = '✓ Added!';
        button.style.backgroundColor = '#4CAF50';
        button.disabled = true;

        // Show notification
        this.showNotification('Product added to cart!');

        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = originalBg;
            button.disabled = false;
            ripple.remove();
        }, 2000);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Various Animations
    setupAnimations() {
        this.setupTypingAnimation();
        this.setupShoeAnimation();
        this.setupSaleCountdown();
        this.setupHoverEffects();
    }

    setupTypingAnimation() {
        const heroText = document.querySelector('.hero-content h1');
        if (heroText) {
            const text = heroText.textContent;
            heroText.textContent = '';
            let i = 0;

            const typeWriter = () => {
                if (i < text.length) {
                    heroText.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 80 + Math.random() * 40);
                }
            };

            setTimeout(typeWriter, 800);
        }
    }

    setupShoeAnimation() {
        const shoeAnimation = document.querySelector('.shoe-animation');
        if (shoeAnimation) {
            let hue = 0;
            setInterval(() => {
                hue = (hue + 0.5) % 360;
                shoeAnimation.style.background = 
                    `linear-gradient(135deg, hsl(${hue}, 100%, 65%), hsl(${(hue + 60) % 360}, 100%, 65%))`;
            }, 100);
        }
    }

    setupSaleCountdown() {
        const saleHeader = document.querySelector('.sale-header');
        if (saleHeader) {
            const countdownElement = document.createElement('div');
            countdownElement.className = 'countdown-timer';
            countdownElement.style.cssText = `
                background: rgba(255,255,255,0.2);
                padding: 12px 24px;
                border-radius: 25px;
                margin-top: 20px;
                display: inline-block;
                font-weight: 600;
                font-size: 1.1rem;
                backdrop-filter: blur(10px);
            `;

            const updateCountdown = () => {
                const now = new Date();
                const endTime = new Date();
                endTime.setHours(23, 59, 59, 999);
                
                const timeLeft = endTime - now;
                if (timeLeft <= 0) {
                    countdownElement.textContent = 'Sale ended!';
                    return;
                }

                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                countdownElement.innerHTML = 
                    `⏰ Sale ends in: <strong>${hours}h ${minutes}m ${seconds}s</strong>`;
            };

            updateCountdown();
            setInterval(updateCountdown, 1000);
            saleHeader.querySelector('.container').appendChild(countdownElement);
        }
    }

    setupHoverEffects() {
        // Enhanced hover effects for cards
        const cards = document.querySelectorAll('.category-card, .product-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-12px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Scroll to Top Button
    setupScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollBtn);

        const toggleScrollButton = () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        };

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', toggleScrollButton);
        toggleScrollButton();
    }

    // Page Transitions
    setupPageTransitions() {
        // Add CSS for page transitions
        const style = document.createElement('style');
        style.textContent = `
            .page-transition {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.4s ease, transform 0.4s ease;
            }
            .page-transition.enter {
                opacity: 1;
                transform: translateY(0);
            }
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Add transition class to main content
        const mainContent = document.querySelector('main') || document.body;
        mainContent.classList.add('page-transition');

        window.addEventListener('load', () => {
            setTimeout(() => {
                mainContent.classList.add('enter');
            }, 100);
        });
    }

    // Lazy Loading for Images
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('.product-image, .category-image').forEach(img => {
                img.style.opacity = '0';
                img.style.transform = 'scale(0.9)';
                img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                imageObserver.observe(img);
            });
        }
    }
}

// Initialize the shoe store when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ShoeStore();
});

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);