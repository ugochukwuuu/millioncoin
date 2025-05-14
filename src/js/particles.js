// Particles animation for floating coins
(function() {
  // Configuration
  const particlesConfig = {
    count: 35, // Increased from 15 to 35 (2.33 times more)
    containerSelector: '#particles-container'
  };

  // State variables
  let particles = [];
  let container;
  let containerWidth;
  let containerHeight;
  let canvas;
  let ctx;
  const coinImage = new Image();
  coinImage.src = 'src/assets/coin.png'; // Path to your coin image

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

    // Wait for coin image to load before creating particles and animating
    if (coinImage.complete) {
      createParticles();
      animate();
    } else {
      coinImage.onload = () => {
        createParticles();
        animate();
      };
    }

    // Add resize listener
    window.addEventListener('resize', resizeCanvas);
  }

  // Resize canvas and update particles
  function resizeCanvas() {
    containerWidth = container.offsetWidth;
    containerHeight = container.offsetHeight;
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    // Recreate particles on resize if they exist
    if (particles.length > 0 && coinImage.complete) {
      createParticles();
    }
  }

  // Create particles (coins) with properties for floating effect
  function createParticles() {
    particles = [];
    for (let i = 0; i < particlesConfig.count; i++) {
      particles.push({
        x: Math.random() * containerWidth,
        y: Math.random() * containerHeight,
        size: Math.random() * 20 + 40, // Increased size range: 20 to 60 pixels (previously 20 to 40)
        speed: Math.random() * 0.3 + 0.1, // Slow speed for floating effect
        direction: Math.random() * Math.PI * 2, // Random direction
        amplitude: Math.random() * 5 + 5, // Bobbing distance (5-10 pixels)
        phase: Math.random() * Math.PI * 2, // Starting point of bobbing
        phaseSpeed: Math.random() * 0.01 + 0.01, // Bobbing speed
        rotation: 0, // Initial rotation
        rotationSpeed: Math.random() * 0.02 - 0.01 // Rotation speed between -0.01 and 0.01
      });
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, containerWidth, containerHeight);

    // Update each particle's position and properties
    particles.forEach(particle => {
      // Move particle
      particle.x += Math.cos(particle.direction) * particle.speed;
      particle.y += Math.sin(particle.direction) * particle.speed;

      // Bounce off boundaries based on center position
      if (particle.x < 0 || particle.x > containerWidth) {
        particle.direction = Math.PI - particle.direction;
      }
      if (particle.y < 0 || particle.y > containerHeight) {
        particle.direction = -particle.direction;
      }

      // Update bobbing phase and rotation
      particle.phase += particle.phaseSpeed;
      particle.rotation += particle.rotationSpeed;
    });

    // Draw particles (coins) if image is loaded
    if (coinImage.complete) {
      particles.forEach(particle => {
        const drawY = particle.y + particle.amplitude * Math.sin(particle.phase); // Bobbing effect
        const halfSize = particle.size / 2;

        // Save context, translate, rotate, draw coin, restore
        ctx.save();
        ctx.translate(particle.x, drawY);
        ctx.rotate(particle.rotation);
        ctx.drawImage(coinImage, -halfSize, -halfSize, particle.size, particle.size);
        ctx.restore();
      });
    }

    requestAnimationFrame(animate);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();