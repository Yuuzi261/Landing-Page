<template>
  <div ref="elementRef" class="scroll-animate" :class="{ 'is-visible': isVisible }">
    <div class="footer">
      <div>
        <span class="prompt">yuuzi@cute-terminal:~$</span>
        <span v-html="typedText"></span>
        <span class="typing-cursor" v-if="showCursor"></span>
      </div>
      <div class="content-container" :class="{ 'is-visible': isFinished }">
        <br />
        <span style="color: #87ceeb">Made with ♡ and lots of caffeine ☕</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { useIntersectionObserver } from '@/composables/useIntersectionObserver.js'
  import { useTypewriter } from '@/composables/useTypewriter.js'

  const elementRef = ref(null)
  const hasTypingPlayedOnce = ref(false)
  const commandToType = ' echo "Thanks for visiting! <span class=\'cute-emoji\'>♡(˃͈ દ ˂͈ ♡)</span>"'

  const { typedText, isFinished, showCursor, start } = useTypewriter(commandToType, {
    manualStart: true,
    typingSpeed: 80,
    html: true,
  })

  // Hides the cursor when finished.
  watch(isFinished, (finished) => {
    if (finished) {
      showCursor.value = false
    }
  })

  const startTypingAnimation = () => {
    if (hasTypingPlayedOnce.value) return
    hasTypingPlayedOnce.value = true
    setTimeout(start, 300)
  }

  const { isVisible } = useIntersectionObserver(elementRef, startTypingAnimation)
</script>

<style scoped>
  .footer {
    text-align: center;
    padding: 30px;
    color: #87ceeb;
    font-size: 13px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 12px;
    margin: 20px 0;
  }

  .prompt {
    color: #4a90e2;
    font-weight: 600;
  }

  :deep(.cute-emoji) {
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
