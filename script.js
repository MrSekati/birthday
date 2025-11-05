// Countdown Timer
function updateCountdown() {
    const eventDate = new Date('November 29, 2025 14:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
    document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
    
    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById('countdown').innerHTML = "The celebration has started!";
    }
}

// Initialize countdown
const countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();

// Add floating elements dynamically
function createFloatingElement() {
    const floatingElements = document.querySelector('.floating-elements');
    const types = ['🎈', '✨', '🎉', '🥳'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const element = document.createElement('div');
    element.className = 'floating';
    element.innerHTML = type;
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDuration = (15 + Math.random() * 15) + 's';
    element.style.animationDelay = Math.random() * 10 + 's';
    
    floatingElements.appendChild(element);
    
    // Remove element after animation completes
    setTimeout(() => {
        element.remove();
    }, 30000);
}

// Create initial floating elements
for (let i = 0; i < 10; i++) {
    setTimeout(createFloatingElement, i * 1000);
}

// Continue creating floating elements
setInterval(createFloatingElement, 2000);

// Music Consent and Control
document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicConsent = document.getElementById('musicConsent');
    const acceptMusic = document.getElementById('acceptMusic');
    const declineMusic = document.getElementById('declineMusic');
    
    // Show consent modal after a short delay
    setTimeout(() => {
        if (musicConsent && !localStorage.getItem('musicPreference')) {
            musicConsent.style.display = 'flex';
        }
    }, 1000);
    
    // Handle music acceptance
    if (acceptMusic) {
        acceptMusic.addEventListener('click', function() {
            localStorage.setItem('musicPreference', 'accepted');
            musicConsent.style.display = 'none';
            playBackgroundMusic();
        });
    }
    
    // Handle music decline
    if (declineMusic) {
        declineMusic.addEventListener('click', function() {
            localStorage.setItem('musicPreference', 'declined');
            musicConsent.style.display = 'none';
        });
    }
    
    // Play background music
    function playBackgroundMusic() {
        if (backgroundMusic) {
            backgroundMusic.volume = 0.3;
            backgroundMusic.play().catch(error => {
                console.log('Music play failed:', error);
            });
        }
    }
    
    // Music toggle functionality
    if (musicToggle && backgroundMusic) {
        musicToggle.addEventListener('click', function() {
            const musicIcon = musicToggle.querySelector('i');
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicIcon.className = 'fas fa-volume-up';
                musicToggle.classList.remove('muted');
            } else {
                backgroundMusic.pause();
                musicIcon.className = 'fas fa-volume-mute';
                musicToggle.classList.add('muted');
            }
        });
    }
    
    // Auto-play if previously accepted
    if (localStorage.getItem('musicPreference') === 'accepted') {
        playBackgroundMusic();
    }
});