// Progress bar animation
(function() {
  // Configuration
  const progressConfig = {
    startPercent: 12,
    maxPercent: 100,
    incrementStep: 0.1,
    incrementInterval: 100, // milliseconds
    resetDelay: 1000, // milliseconds
    progressBarSelector: '#progress-bar',
    progressTextSelector: '#progress-percentage',
    progressCarSelector: '#progress-car'
  };

  // State variables
  let currentPercent = progressConfig.startPercent;
  let progressBar;
  let progressText;
  let progressCar;
  let animationInterval;

  // Initialize progress bar
  function init() {
    progressBar = document.querySelector(progressConfig.progressBarSelector);
    progressText = document.querySelector(progressConfig.progressTextSelector);
    progressCar = document.querySelector(progressConfig.progressCarSelector);
    
    if (!progressBar || !progressText || !progressCar) return;
    
    // Set initial state
    updateProgressBar();
    
    // Start animation
    startProgressAnimation();
  }

  // Update progress bar and text
  function updateProgressBar() {
    progressBar.style.width = `${currentPercent}%`;
    progressText.textContent = `${Math.round(currentPercent)}%`;
    
    // Update car position
    const containerWidth = progressBar.parentElement.offsetWidth;
    const carPosition = (containerWidth * currentPercent / 100) - 30; // Center the car on the progress point
    progressCar.style.left = `${Math.max(0, Math.min(carPosition, containerWidth - 60))}px`; // Keep car within bounds
  }

  // Start progress animation
  function startProgressAnimation() {
    // Clear any existing interval
    if (animationInterval) {
      clearInterval(animationInterval);
    }
    
    // Set up animation interval
    animationInterval = setInterval(() => {
      // Increment progress
      currentPercent += progressConfig.incrementStep;
      
      // Check if reached max
      if (currentPercent >= progressConfig.maxPercent) {
        clearInterval(animationInterval);
        currentPercent = progressConfig.maxPercent;
        updateProgressBar();
        
        // Reset after delay
        setTimeout(resetProgress, progressConfig.resetDelay);
      } else {
        updateProgressBar();
      }
    }, progressConfig.incrementInterval);
  }

  // Reset progress bar
  function resetProgress() {
    // Animate back to start
    const resetInterval = setInterval(() => {
      // Decrement progress quickly
      currentPercent -= progressConfig.incrementStep * 5;
      
      // Check if reached start
      if (currentPercent <= progressConfig.startPercent) {
        clearInterval(resetInterval);
        currentPercent = progressConfig.startPercent;
        updateProgressBar();
        
        // Restart animation
        startProgressAnimation();
      } else {
        updateProgressBar();
      }
    }, progressConfig.incrementInterval / 5);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();