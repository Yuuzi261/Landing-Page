<template>
  <div class="terminal-window">
    <div class="terminal-header">
      <div class="terminal-dots">
        <div class="dot red"></div>
        <div class="dot yellow"></div>
        <div class="dot green"></div>
      </div>
      <div class="terminal-title">
        <span>{{ title }}</span>
        <span class="cute-emoji">{{ emoji }}</span>
      </div>
    </div>
    <div class="terminal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    title: String,
    emoji: String,
  })
</script>

<style scoped>
  .terminal-window {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(74, 144, 226, 0.15);
    margin: 20px 0;
    border: 2px solid #b8d4f0;
    overflow: hidden;
    animation: softGlow 3s ease-in-out infinite alternate;
    backdrop-filter: blur(10px);
  }

  @keyframes softGlow {
    from {
      box-shadow: 0 8px 25px rgba(135, 206, 235, 0.2);
    }
    to {
      box-shadow: 0 15px 35px rgba(135, 206, 235, 0.35);
    }
  }

  .terminal-header {
    background: linear-gradient(90deg, #87ceeb, #b8d4f0, #d4edff);
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .terminal-dots {
    display: flex;
    gap: 8px;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation: gentlePulse 2.5s infinite;
  }

  .dot.red {
    background: #ffb3ba;
  }
  .dot.yellow {
    background: #ffdfba;
  }
  .dot.green {
    background: #baffc9;
  }

  @keyframes gentlePulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(0.9);
    }
  }

  .terminal-title {
    color: #4a90e2;
    font-weight: 600;
    margin-left: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .terminal-content {
    padding: 30px;
    background: rgba(248, 252, 255, 0.9);
    color: #5a6c7d;
  }

  .cute-emoji {
    display: inline-block;
    animation: wiggle 2s ease-in-out infinite;
  }

  @keyframes wiggle {
    0%,
    100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(3deg);
    }
    75% {
      transform: rotate(-3deg);
    }
  }
</style>
