<template>
  <div ref="elementRef" class="scroll-animate" :class="{ 'is-visible': isVisible }">
    <TerminalWindow title="cute_terminal.sh" emoji="♡">
      <div style="color: #4a90e2; margin-bottom: 20px">
        <span class="prompt">yuuzi@cute-terminal:~$</span>
        <span style="color: #87ceeb">{{ typedCommand }}</span>
        <span class="typing-cursor" v-if="showCursor"></span>
      </div>
      <div v-if="isCommandFinished" style="margin: 20px 0; color: #5a6c7d; line-height: 1.6">
        <div class="content-fade-in">
          嗨！我是Yuuzi <span class="cute-emoji">( ˶ᵔ ᵕ ᵔ˶ )</span><br />
          歡迎來到我的個人網站！<br />
          這裡收藏了我在網路世界的各種足跡～
        </div>
        <br />
        <div class="content-fade-in" style="animation-delay: 0.5s">
          <span style="color: #87ceeb; font-size: 12px">💡 提示：下面的終端機可以真的打指令喔！試試看 help 指令</span>
        </div>
      </div>
    </TerminalWindow>
  </div>
</template>

<script setup>
  import TerminalWindow from './TerminalWindow.vue'
  import { ref } from 'vue'
  import { useIntersectionObserver } from '../composables/useIntersectionObserver.js'

  const elementRef = ref(null)
  const typedCommand = ref('')
  const showCursor = ref(true)
  const isCommandFinished = ref(false)
  const hasTypingStarted = ref(false)
  const commandToType = ' whoami'

  const startTypingAnimation = () => {
    if (hasTypingStarted.value) return
    hasTypingStarted.value = true

    setTimeout(() => {
      let i = 0
      const intervalId = setInterval(() => {
        if (i < commandToType.length) {
          typedCommand.value += commandToType[i]
          i++
        } else {
          clearInterval(intervalId)
          showCursor.value = false
          setTimeout(() => {
            isCommandFinished.value = true
          }, 300)
        }
      }, 150)
    }, 300) // Delay after slide-in before typing
  }

  const { isVisible } = useIntersectionObserver(elementRef, startTypingAnimation)
</script>

<style scoped>
  .prompt {
    color: #4a90e2;
    font-weight: 600;
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
