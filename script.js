document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    
    // Only active on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Add delay to outline for smoother feel
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
        
        // Hover effects for cursor
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '50px';
                cursorOutline.style.height = '50px';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '30px';
                cursorOutline.style.height = '30px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // Scroll Observer for Fade Up Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const fadeElements = document.querySelectorAll('.section-title, .about-text, .stats, .skill-card, .project-card, .contact-desc, .huge-btn');
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1), transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
        observer.observe(el);
    });

    // Add class 'visible' logic
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Glitch Text Effect
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        const textToGlitch = glitchText.getAttribute('data-text');
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        
        glitchText.addEventListener('mouseover', () => {
            let iteration = 0;
            const interval = setInterval(() => {
                glitchText.innerText = glitchText.innerText.split('')
                    .map((letter, index) => {
                        if(index < iteration) {
                            return textToGlitch[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)]
                    })
                    .join('');
                
                if(iteration >= textToGlitch.length){ 
                    clearInterval(interval);
                }
                
                iteration += 1 / 3;
            }, 30);
        });
    }
});
