// Particles animation for background
(function() {
  // Configuration
  const particlesConfig = {
    count: 50,
    minSize: 1,
    maxSize: 3,
    minSpeed: 0.2,
    maxSpeed: 0.8,
    color: 'rgba(255, 255, 255, 0.7)',
    containerSelector: '#particles-container'
  };

  // State variables
  let particles = [];
  let container;
  let containerWidth;
  let containerHeight;
  let canvas;
  let ctx;

  // Initialize particles
  function init() {
    container = document.querySelector(particlesConfig.containerSelector);
    if (!container) return;

    // Create canvas
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    // Set canvas size
    resizeCanvas();

    // Create particles
    createParticles();

    // Start animation
    animate();

    // Add resize listener
    window.addEventListener('resize', resizeCanvas);
  }

  // Resize canvas and update particles
  function resizeCanvas() {
    containerWidth = container.offsetWidth;
    containerHeight = container.offsetHeight;
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    // Recreate particles on resize
    if (particles.length > 0) {
      createParticles();
    }
  }

  // Create particles based on configuration
  function createParticles() {
    particles = [];
    
    for (let i = 0; i < particlesConfig.count; i++) {
      particles.push({
        x: Math.random() * containerWidth,
        y: Math.random() * containerHeight,
        size: Math.random() * (particlesConfig.maxSize - particlesConfig.minSize) + particlesConfig.minSize,
        speed: Math.random() * (particlesConfig.maxSpeed - particlesConfig.minSpeed) + particlesConfig.minSpeed,
        direction: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.5
      });
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, containerWidth, containerHeight);
    
    // Update and draw each particle
    particles.forEach(particle => {
      // Move particle
      particle.x += Math.cos(particle.direction) * particle.speed;
      particle.y += Math.sin(particle.direction) * particle.speed;
      
      // Check boundaries and bounce
      if (particle.x < 0 || particle.x > containerWidth) {
        particle.direction = Math.PI - particle.direction;
      }
      
      if (particle.y < 0 || particle.y > containerHeight) {
        particle.direction = -particle.direction;
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particlesConfig.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    
    requestAnimationFrame(animate);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();