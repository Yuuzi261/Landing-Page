<template>
  <div class="bg-particles" id="particles"></div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { getEffectsImageUrl } from '@/utils/getEffectsImageUrl.js'

  const resetParticle = (particle) => {
    // Reset animation to allow re-triggering
    particle.classList.remove('animate-float')
    // Force reflow to make sure the class removal is registered
    void particle.offsetWidth

    // Re-randomize properties
    particle.style.left = Math.random() * 100 + '%'
    particle.style.top = Math.random() * 110 - 10 + '%' // Allow starting from slightly off-screen
    particle.style.animationDelay = Math.random() * 2 + 's' // Shorter delay for respawn
    particle.style.animationDuration = Math.random() * 8 + 7 + 's' // Random duration between 7s and 15s
    particle.style.width = Math.floor(Math.random() * 20 + 15) + 'px'

    // Set random direction for the animation
    particle.style.setProperty('--random-x', Math.random() > 0.5 ? 1 : -1)
    particle.style.setProperty('--random-y', Math.random() > 0.5 ? 1 : -1)

    // Add the class back to start the animation again
    particle.classList.add('animate-float')
  }

  const createParticles = () => {
    const particles = document.getElementById('particles')
    if (!particles) return

    const imageCount = 5
    const particleCount = 20

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('img')
      const imageIndex = (i % imageCount) + 1

      particle.className = 'particle'
      particle.src = getEffectsImageUrl(`effect${imageIndex}`)

      // Listen for the end of the animation
      particle.addEventListener('animationend', () => {
        resetParticle(particle)
      })

      // Initial setup
      resetParticle(particle)
      particles.appendChild(particle)
    }
  }

  onMounted(() => {
    createParticles()
  })
</script>

<style>
  .bg-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1; /* Behind the .container content (z-index: 10) */
    overflow: hidden; /* Ensure particles don't overflow the main area */
  }

  .particle {
    position: absolute;
    opacity: 0;
    height: auto;
  }

  .particle.animate-float {
    animation: float-once linear forwards;
  }

  @keyframes float-once {
    0% {
      transform: translateX(0) translateY(0) rotate(0deg) scale(0.8);
      opacity: 0;
    }
    15% {
      opacity: 0.7; /* Fade in */
    }
    50% {
      /* Move to a different position mid-animation for more randomness */
      transform: translateX(calc(var(--random-x, 1) * 40px)) translateY(calc(var(--random-y, 1) * -60px)) rotate(180deg)
        scale(1.1);
    }
    85% {
      opacity: 0.7; /* Start fading out */
    }
    100% {
      transform: translateX(calc(var(--random-x, 1) * 80px)) translateY(calc(var(--random-y, 1) * -120px))
        rotate(360deg) scale(0.8);
      opacity: 0;
    }
  }
</style>
