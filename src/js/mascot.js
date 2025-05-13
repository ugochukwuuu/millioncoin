// Mascot animation
(function() {
  // Configuration
  const mascotConfig = {
    mascotSelector: '#mascot',
    wobbleInterval: 3000, // milliseconds
    wobbleDuration: 1000, // milliseconds
    wobbleClass: 'wobble-animation'
  };

  // State variables
  let mascot;
  let wobbleTimeout;

  // Initialize mascot animation
  function init() {
    mascot = document.querySelector(mascotConfig.mascotSelector);
    if (!mascot) return;

    // Add CSS animation class
    createWobbleAnimation();
    
    // Start wobble animation
    startWobble();
  }

  // Create CSS for wobble animation
  function createWobbleAnimation() {
    // Add style for animation if it doesn't exist
    if (!document.querySelector('#wobble-style')) {
      const style = document.createElement('style');
      style.id = 'wobble-style';
      style.textContent = `
        @keyframes wobble {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
          100% { transform: rotate(0deg); }
        }
        
        .wobble-animation {
          animation: wobble ${mascotConfig.wobbleDuration}ms ease-in-out;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Start wobble animation
  function startWobble() {
    // Apply wobble animation at intervals
    wobbleTimeout = setInterval(() => {
      // Reset animation
      mascot.classList.remove(mascotConfig.wobbleClass);
      
      // Trigger reflow
      void mascot.offsetWidth;
      
      // Add animation class
      mascot.classList.add(mascotConfig.wobbleClass);
    }, mascotConfig.wobbleInterval);
    
    // Initial wobble
    mascot.classList.add(mascotConfig.wobbleClass);
  }

  // Clean up on page unload
  function cleanup() {
    if (wobbleTimeout) {
      clearInterval(wobbleTimeout);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Clean up on page unload
  window.addEventListener('unload', cleanup);
})();