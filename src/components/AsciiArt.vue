<template>
  <div ref="elementRef" class="scroll-animate" :class="{ 'is-visible': isVisible }">
    <div class="ascii-art-container">
      <pre class="ascii-art">
  ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡
♡     ╭───────────────────────────────────────╮     ♡
                          My Links!             
            |\__/,|   (`\     ♡ ♡ ♡             
          _.|o o  |_   ) )   Find me here!       
        -(((---(((--------     ♡ ♡ ♡             
♡     ╰───────────────────────────────────────╯     ♡
  ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡</pre
      >
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useIntersectionObserver } from '@/composables/useIntersectionObserver.js'

  const elementRef = ref(null)
  const { isVisible } = useIntersectionObserver(elementRef)
</script>

<style scoped>
  .ascii-art-container {
    margin: 30px 0;
    display: flex;
    justify-content: center;
  }

  .ascii-art {
    color: #87ceeb;
    font-size: 12px;
    line-height: 1.2;
    font-family: 'JetBrains Mono', 'Consolas', 'Monaco', monospace;
    white-space: pre; /* This is crucial for alignment */
    animation: rainbow 4s linear infinite;
    /* background: rgba(255, 255, 255, 0.7); */
    padding: 20px;
    border-radius: 12px;
    /* border: 1px solid #d4edff; */
    overflow-x: auto;
  }

  @keyframes rainbow {
    0% {
      color: #87ceeb;
    }
    20% {
      color: #98d8e8;
    }
    40% {
      color: #a8e6cf;
    }
    60% {
      color: #b8d4f0;
    }
    80% {
      color: #d4a5d9;
    }
    100% {
      color: #87ceeb;
    }
  }

  @media (max-width: 768px) {
    .ascii-art {
      font-size: 10px;
      padding: 15px;
    }
  }
</style>
