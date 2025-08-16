<template>
  <div class="hero-section" ref="heroRef">
    <div
      class="background-image"
      :style="{ backgroundImage: `url(${backgroundImage})`, opacity: backgroundOpacity }"
    ></div>
    <div class="overlay" :style="{ opacity: backgroundOpacity }"></div>
    <div class="hero-content" :style="{ opacity: backgroundOpacity }">
      <h1 class="hero-title">
        <span>{{ typedText }}</span>
        <span class="typing-cursor"></span>
      </h1>
      <div class="scroll-down-indicator" @click="scrollToContent">
        <span></span>
      </div>
    </div>
    <div class="credit" :style="{ opacity: backgroundOpacity }">
      <a href="https://x.com/amsrntk3" target="_blank" rel="noopener noreferrer">
        <span class="material-symbols-outlined">copyright</span>
        <span>甘城なつき/Nachoneko💤</span>
      </a>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useTypewriter } from '../composables/useTypewriter.js'
  import backgroundImage from '/background.webp'

  const sentences = [
    "Hello, I'm Yuuzi.",
    'こにちは、ゆうじです。',
    '你好，我是 Yuuzi。'
  ]

  const { typedText } = useTypewriter(sentences, {
    loop: true,
    typingSpeed: 100,
    deletingSpeed: 50,
    delay: 2000,
  })

  const heroRef = ref(null)
  const backgroundOpacity = ref(1)

  const handleScroll = () => {
    const scrollY = window.scrollY
    const heroHeight = heroRef.value ? heroRef.value.offsetHeight : window.innerHeight
    const fadeEnd = heroHeight * 0.8

    if (scrollY < fadeEnd) {
      backgroundOpacity.value = 1 - scrollY / fadeEnd
    } else {
      backgroundOpacity.value = 0
    }
  }

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>

<style scoped>
  .hero-section {
    height: 100vh;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
  }

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: opacity 0.3s ease-out;
    z-index: 1;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2;
  }

  .hero-content {
    position: relative;
    z-index: 3;
    color: #ffffff;
    padding: 20px;
  }

  .hero-title {
    font-size: 4rem;
    font-weight: 700;
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    margin: 0;
    min-height: 120px; /* Reserve space to prevent layout shift */
  }

  .typing-cursor {
    width: 12px;
    height: 3.5rem;
    margin-left: 8px;
    vertical-align: middle;
  }

  .scroll-down-indicator {
    position: absolute;
    bottom: -8vh;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    z-index: 4;
    opacity: 0.8;
    transition: opacity 0.3s;
  }

  .scroll-down-indicator:hover {
    opacity: 1;
  }

  .scroll-down-indicator span {
    display: block;
    width: 24px;
    height: 24px;
    border-bottom: 3px solid white;
    border-right: 3px solid white;
    transform: rotate(45deg);
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0) rotate(45deg);
    }
    40% {
      transform: translateY(-20px) rotate(45deg);
    }
    60% {
      transform: translateY(-10px) rotate(45deg);
    }
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
      min-height: 80px;
    }
    .typing-cursor {
      height: 2.2rem;
    }
  }

  .credit {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 4;
    transition: opacity 0.3s ease-out;
  }

  .credit a {
    display: inline-flex; /* Use inline-flex to fit content */
    align-items: center;
    justify-content: center; /* Center content horizontally */
    gap: 6px;
    padding: 8px 12px;
    background: rgba(0, 0, 0, 0.4);
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    text-decoration: none;
    border-radius: 999px; /* Capsule shape */
    backdrop-filter: blur(5px);
    transition: all 0.3s ease;
  }

  .credit a .material-symbols-outlined {
    font-size: 20px;
  }

  .credit a:hover {
    background: rgba(0, 0, 0, 0.6);
    color: #ffffff;
    transform: translateY(-2px);
  }

  .credit a span {
    line-height: 1; /* Normalize line height for better alignment */
  }
</style>
