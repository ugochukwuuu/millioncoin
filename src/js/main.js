// Main JavaScript for Million Coin website

  import "./particles.js"
  import "./progressBar.js"
  import "./mascot.js"

(function() {
  // Configuration
  const config = {
    ctaButtonSelector: '.cta-button',
    socialButtonsSelector: '.social-button'
  };

  // Initialize event listeners
  function init() {
    // Set up CTA button listener
    const ctaButton = document.querySelector(config.ctaButtonSelector);
    if (ctaButton) {
      ctaButton.addEventListener('click', handleCtaClick);
    }
    
    // Set up social buttons listeners
    const socialButtons = document.querySelectorAll(config.socialButtonsSelector);
    socialButtons.forEach(button => {
      button.addEventListener('click', handleSocialClick);
    });
    
    // Add page load animations
    addPageLoadAnimations();
    
    // Update page title for fun
    updatePageTitle();
  }

  // Handle CTA button click
  function handleCtaClick(event) {
    // Prevent default if it's a link
    event.preventDefault();
    
    // Add button pressed effect
    event.target.classList.add('button-pressed');
    
    // Add confetti effect
    createConfetti();
    
    // Show alert
    setTimeout(() => {
      alert('🚀 To the moon! Join us on this meme journey!');
      
      // Remove button pressed effect
      event.target.classList.remove('button-pressed');
    }, 300);
  }

  // Handle social button click
  function handleSocialClick(event) {
    // Prevent default behavior
    event.preventDefault();
    
    // Get button type
    const buttonType = event.target.classList.contains('telegram') ? 'Telegram' : 'Twitter';
    
    // Show message
    alert(`Taking you to ${buttonType}! Connect with the Million Coin community!`);
    
    // Redirect (commented out for demo)
    // window.open(event.target.href, '_blank');
  }

  // Create simple confetti effect
  function createConfetti() {
    // Create container for confetti
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '1000';
    document.body.appendChild(confettiContainer);
    
    // Create confetti pieces
    const colors = ['#ffeb3b', '#ff9800', '#ffc107', '#fff59d', '#ffe082'];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      
      // Style confetti
      confetti.style.position = 'absolute';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.opacity = Math.random() * 0.8 + 0.2;
      confetti.style.transform = 'scale(' + (Math.random() * 0.6 + 0.4) + ')';
      
      // Add animation
      confetti.style.transition = 'all ' + (Math.random() * 3 + 2) + 's linear';
      
      // Add to container
      confettiContainer.appendChild(confetti);
      
      // Animate confetti
      setTimeout(() => {
        confetti.style.top = '100vh';
        confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg) scale(' + (Math.random() * 0.6 + 0.4) + ')';
      }, 10);
      
      // Remove confetti after animation
      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
    
    // Remove container after all confetti is gone
    setTimeout(() => {
      confettiContainer.remove();
    }, 5500);
  }

  // Add page load animations
  function addPageLoadAnimations() {
    const elements = document.querySelectorAll('.header, .mascot-container, .tagline, .progress-section, .cta-container, .social-buttons');
    
    elements.forEach((element, index) => {
      // Add initial styles
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      
      // Animate in with delay
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 200 + (index * 150));
    });
  }

  // Update page title for fun
  function updatePageTitle() {
    const titles = [
      '🚀 MILLION COIN | To The Moon!',
      '💰 MILLION COIN | Make Me Rich!',
      '🔥 MILLION COIN | Join The Hype!',
      '💎 MILLION COIN | HODL!',
      '🌕 MILLION COIN | Lambo Soon!'
    ];
    
    let titleIndex = 0;
    
    // Change title every 5 seconds
    setInterval(() => {
      titleIndex = (titleIndex + 1) % titles.length;
      document.title = titles[titleIndex];
    }, 5000);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();