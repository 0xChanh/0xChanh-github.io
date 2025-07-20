// Generate stars with mouse repel effect
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = 200;
    const stars = [];

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star repelled';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        
        // Store original position
        star.originalX = parseFloat(star.style.left);
        star.originalY = parseFloat(star.style.top);
        
        starsContainer.appendChild(star);
        stars.push(star);
    }

    // Mouse move handler for star repelling
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) * 100;
        const mouseY = (e.clientY / window.innerHeight) * 100;

        stars.forEach(star => {
            const starX = star.originalX;
            const starY = star.originalY;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - starX, 2) + Math.pow(mouseY - starY, 2)
            );
            
            const repelRadius = 15; // Radius of mouse influence
            
            if (distance < repelRadius) {
                const repelForce = (repelRadius - distance) / repelRadius;
                const angle = Math.atan2(starY - mouseY, starX - mouseX);
                
                const repelX = Math.cos(angle) * repelForce * 5;
                const repelY = Math.sin(angle) * repelForce * 5;
                
                star.style.transform = `translate(${repelX}px, ${repelY}px) scale(${1 + repelForce * 0.5})`;
                star.style.opacity = 0.3 + repelForce * 0.7;
            } else {
                star.style.transform = 'translate(0px, 0px) scale(1)';
                star.style.opacity = '';
            }
        });
    });
}

// Generate shooting stars
function createShootingStars() {
    function shootingStar() {
        const shootingStarEl = document.createElement('div');
        shootingStarEl.className = 'shooting-star';
        
        // Random starting position (top-right area)
        shootingStarEl.style.left = (Math.random() * 100 + 100) + 'vw';
        shootingStarEl.style.top = (Math.random() * 50) + 'vh';
        
        // Add shooting animation
        shootingStarEl.style.animation = `shoot ${2 + Math.random() * 2}s linear forwards`;
        
        document.querySelector('.floating-particles').appendChild(shootingStarEl);
        
        // Remove after animation
        setTimeout(() => {
            if (shootingStarEl.parentNode) {
                shootingStarEl.remove();
            }
        }, 4000);
    }

    // Create shooting stars at random intervals
    setInterval(shootingStar, 3000 + Math.random() * 7000);
    
    // Create initial shooting star
    setTimeout(shootingStar, 1000);
}

// Generate floating particles
function createParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particlesContainer.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 25000);
    }, 3000);
}

// Scroll animations
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Custom cursor interactions
function initCursorInteractions() {
    // Cursor interactions for interactive elements
    const interactiveElements = document.querySelectorAll('a, .project-folder, .profile-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.cursor = 'pointer';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.cursor = 'default';
        });
    });
}

// Profile card interaction
function initProfileCard() {
    var isFlipped = false;
    const profileCard = document.querySelector('.profile-card');
    
    profileCard.addEventListener('mousemove', (e) => {
        if (isFlipped) return; // Prevent interaction when flipped
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        if (isFlipped) return; // Prevent interaction when flipped
        profileCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });


    profileCard.addEventListener('click', () => {
        if (isFlipped) {
            profileCard.style.transform = 'rotateY(0deg) scale(1)';
        } else {
            profileCard.style.transform = 'rotateY(180deg) scale(1.1)';
        }
        isFlipped = !isFlipped;
    });
}

// Parallax effect on scroll
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        document.querySelector('.floating-particles').style.transform = 
            `translate3d(0, ${rate}px, 0)`;
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createShootingStars();
    createParticles();
    initCursorInteractions();
    initProfileCard();
    initParallax();
    handleScrollAnimation();
    
    window.addEventListener('scroll', handleScrollAnimation);
});

// Smooth scroll for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});