<template>
  <TerminalWindow title="my_links.json" emoji="✨">
    <div style="color: #4a90e2; margin-bottom: 20px">
      <span class="prompt">yuuzi@cute-terminal:~$</span> <span style="color: #87ceeb">cat my_links.json</span>
    </div>

    <div class="links-grid">
      <div class="link-card" v-for="link in links" :key="link.title" @click="openLink(link.url)">
        <div class="link-icon">{{ link.icon }}</div>
        <div class="link-title">{{ link.title }}</div>
        <div class="link-description">{{ link.description }}</div>
        <div class="link-url">{{ link.displayUrl }}</div>
      </div>
    </div>
  </TerminalWindow>
</template>

<script setup>
  import TerminalWindow from './TerminalWindow.vue'
  import links from '../data/links.js'

  const openLink = (url) => {
    window.open(url, '_blank')
  }
</script>

<style scoped>
  .prompt {
    color: #4a90e2;
    font-weight: 600;
  }

  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin: 30px 0;
  }

  .link-card {
    background: rgba(255, 255, 255, 0.8);
    border: 2px solid #d4edff;
    border-radius: 16px;
    padding: 20px;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(5px);
  }

  .link-card:hover {
    transform: translateY(-8px) scale(1.03);
    border-color: #87ceeb;
    box-shadow: 0 15px 30px rgba(135, 206, 235, 0.3);
    background: rgba(255, 255, 255, 0.95);
  }

  .link-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(135, 206, 235, 0.15), transparent);
    transition: left 0.6s;
  }

  .link-card:hover::before {
    left: 100%;
  }

  .link-icon {
    font-size: 28px;
    margin-bottom: 12px;
    display: inline-block;
    animation: gentleBounce 3s infinite;
  }

  @keyframes gentleBounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-8px);
    }
    60% {
      transform: translateY(-4px);
    }
  }

  .link-title {
    color: #4a90e2;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .link-description {
    color: #6b7c8d;
    font-size: 13px;
    line-height: 1.4;
  }

  .link-url {
    color: #87ceeb;
    font-size: 12px;
    margin-top: 10px;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    .links-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
