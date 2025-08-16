<template>
  <div ref="elementRef" class="scroll-animate" :class="{ 'is-visible': isVisible }">
    <div class="footer">
      <div>
        <span class="prompt">yuuzi@cute-terminal:~$</span>
        <span v-html="typedCommand"></span>
        <span class="typing-cursor" :style="{ visibility: showCursor ? 'visible' : 'hidden' }"></span>
      </div>
      <div class="content-container" :class="{ 'is-visible': isCommandFinished }">
        <br />
        <span style="color: #87ceeb">Made with ♡ and lots of caffeine ☕</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useIntersectionObserver } from '../composables/useIntersectionObserver.js'

  const elementRef = ref(null)
  const typedCommand = ref('')
  const showCursor = ref(false)
  const isCommandFinished = ref(false)
  const hasTypingPlayedOnce = ref(false)
  const commandToType = ' echo "Thanks for visiting! <span class=\'cute-emoji\'>♡(˃͈ દ ˂͈ ♡)</span>"'

  const startTypingAnimation = () => {
    if (hasTypingPlayedOnce.value) return
    hasTypingPlayedOnce.value = true
    showCursor.value = true

    setTimeout(() => {
      let i = 0
      const intervalId = setInterval(() => {
        if (i >= commandToType.length) {
          clearInterval(intervalId)
          showCursor.value = false
          setTimeout(() => {
            isCommandFinished.value = true
          }, 200)
          return
        }

        if (commandToType[i] === '<') {
          const endIndex = commandToType.indexOf('>', i)
          typedCommand.value += commandToType.substring(i, endIndex + 1)
          i = endIndex + 1
        } else {
          typedCommand.value += commandToType[i]
          i++
        }
      }, 80)
    }, 300)
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
