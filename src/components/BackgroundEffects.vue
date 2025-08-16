<template>
  <div class="bg-particles" id="particles"></div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { getEffectsImageUrl } from '../utils/getEffectsImageUrl.js'

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
      particle.style.left = Math.random() * 100 + '%'
      particle.style.top = Math.random() * 100 + '%'
      particle.style.animationDelay = Math.random() * 8 + 's'
      particle.style.animationDuration = Math.random() * 5 + 5 + 's' // Slower, more gentle animation
      particle.style.width = Math.floor(Math.random() * 20 + 15) + 'px' // Random size between 15px and 35px

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
    animation: float 10s ease-in-out infinite;
    opacity: 0;
    height: auto; /* Maintain aspect ratio */
  }

  @keyframes float {
    0% {
      transform: translateY(20px) rotate(0deg) scale(1);
      opacity: 0;
    }
    10% {
        opacity: 0.6; /* Fade in */
    }
    50% {
      transform: translateY(-25px) rotate(180deg) scale(1.1);
    }
    90% {
        opacity: 0.6; /* Fade out */
    }
    100% {
      transform: translateY(20px) rotate(360deg) scale(1);
      opacity: 0;
    }
  }
</style>