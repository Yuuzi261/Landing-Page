<template>
  <div ref="elementRef" class="scroll-animate" :class="{ 'is-visible': isVisible }">
    <TerminalWindow title="interactive_terminal.sh" emoji="🖥️">
      <div class="interactive-terminal" @click="focusInput">
        <div class="terminal-output content-fade-in" ref="terminalOutputRef" v-html="output"></div>
        <div class="terminal-input-line content-fade-in" style="animation-delay: 0.3s">
          <span class="prompt">user@cute-terminal:~$</span>
          <div class="input-wrapper">
            <span class="input-text">{{ textBeforeCursor }}</span>
            <span
              class="cursor"
              :style="{ visibility: isFocused ? 'visible' : 'hidden' }"
              :class="{ 'no-blink': isMoving }"
              >{{ cursorChar }}</span
            >
            <span class="input-text">{{ textAfterCursor }}</span>
            <input
              type="text"
              class="terminal-input"
              ref="terminalInputRef"
              v-model="input"
              @keydown="handleKeydown"
              @input="updateCursorPosition"
              @keyup="updateCursorPosition"
              @click="updateCursorPosition"
              @focus="handleFocus"
              @blur="isFocused = false"
              autocomplete="off"
            />
          </div>
        </div>
      </div>
    </TerminalWindow>
  </div>
</template>

<script setup>
  import { ref, onMounted, nextTick, watch } from 'vue'
  import TerminalWindow from '@/components/TerminalWindow.vue'
  import { commands } from '@/data/terminalCommands.js'
  import { welcomeMessage } from '@/data/terminalContent.js'
  import { useIntersectionObserver } from '@/composables/useIntersectionObserver.js'

  const elementRef = ref(null)
  const output = ref('')
  const input = ref('')
  const commandHistory = []
  let historyIndex = -1

  const terminalInputRef = ref(null)
  const terminalOutputRef = ref(null)
  const isFocused = ref(false)
  const isMoving = ref(false)
  let activityTimer = null

  const textBeforeCursor = ref('')
  const cursorChar = ref(' ')
  const textAfterCursor = ref('')

  const focusInput = () => {
    setTimeout(() => {
      terminalInputRef.value?.focus()
    }, 400)
  }

  const handleFocus = () => {
    isFocused.value = true
    updateCursorPosition()
  }

  onMounted(() => {
    output.value = welcomeMessage
  })

  const { isVisible } = useIntersectionObserver(elementRef)

  // When the element is not visible, we can optionally blur the input
  watch(isVisible, (newValue) => {
    if (!newValue && terminalInputRef.value) {
      terminalInputRef.value.blur()
    }
  })

  const handleUserActivity = () => {
    isMoving.value = true
    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
      isMoving.value = false
    }, 250) // Resume blinking after 250ms of inactivity
  }

  const updateCursorPosition = () => {
    handleUserActivity()
    nextTick(() => {
      if (terminalInputRef.value) {
        const caretPosition = terminalInputRef.value.selectionStart
        textBeforeCursor.value = input.value.substring(0, caretPosition)

        const char = input.value.substring(caretPosition, caretPosition + 1)
        if (char) {
          cursorChar.value = char
          textAfterCursor.value = input.value.substring(caretPosition + 1)
        } else {
          cursorChar.value = ' ' // Use a space for the block cursor at the end
          textAfterCursor.value = ''
        }
      }
    })
  }

  const scrollToBottom = () => {
    nextTick(() => {
      if (terminalOutputRef.value) {
        terminalOutputRef.value.scrollTop = terminalOutputRef.value.scrollHeight
      }
    })
  }

  const executeCommand = (commandLine) => {
    const args = commandLine.split(' ')
    const command = args[0].toLowerCase()
    const commandArgs = args.slice(1)

    output.value += `<div><span style="color: #4a90e2;">user@cute-terminal:~$</span> <span style="color: #87ceeb;">${commandLine}</span></div>`

    if (commands[command]) {
      const result = commands[command].action(commandArgs)
      if (result) {
        if (typeof result === 'object' && result.type === 'clear') {
          output.value = welcomeMessage
        } else {
          output.value += result
        }
      }
    } else {
      output.value += `<div class="command-output error">找不到指令：${command}</div><div class="command-output">輸入 'help' 查看可用指令 ♡</div>`
    }
    scrollToBottom()
  }

  const handleKeydown = (e) => {
    handleUserActivity()
    if (e.key === 'Enter') {
      if (input.value.trim()) {
        commandHistory.unshift(input.value)
        historyIndex = -1
        executeCommand(input.value)
        input.value = ''
        updateCursorPosition()
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++
        input.value = commandHistory[historyIndex]
        nextTick(() => {
          const inputEl = terminalInputRef.value
          inputEl.selectionStart = inputEl.selectionEnd = input.value.length
          updateCursorPosition()
        })
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        historyIndex--
        input.value = commandHistory[historyIndex]
      } else if (historyIndex <= 0) {
        historyIndex = -1
        input.value = ''
      }
      nextTick(() => {
        const inputEl = terminalInputRef.value
        inputEl.selectionStart = inputEl.selectionEnd = input.value.length
        updateCursorPosition()
      })
    }
  }
</script>

<style scoped>
  .interactive-terminal {
    cursor: text;
  }

  .terminal-output {
    min-height: 150px;
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 15px;
    font-size: 14px;
    line-height: 1.5;
  }

  .terminal-input-line {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .prompt {
    color: #4a90e2;
    font-weight: 600;
    flex-shrink: 0;
  }

  .input-wrapper {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
  }

  .input-text {
    color: #5a6c7d;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    white-space: pre;
    display: inline-block;
    line-height: 1.5; /* Control height via line-height */
  }

  .placeholder {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    color: #5a6c7d;
    opacity: 0.5;
    pointer-events: none;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
  }

  .terminal-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: transparent;
    caret-color: transparent;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
  }

  .cursor {
    display: inline-block;
    /* background: #87ceeb; */
    /* color: #1e293b; */
    animation: blink 1s infinite;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    line-height: 1.5;
    white-space: pre;
  }

  .cursor.no-blink {
    animation: none;
    background-color: #87ceeb;
    color: #1e293b;
  }

  @keyframes blink {
    0%,
    50% {
      background-color: #87ceeb;
      color: #1e293b;
    }
    51%,
    100% {
      background-color: transparent;
      color: inherit;
    }
  }

  /* These styles need to be accessible by v-html */
  :global(.command-output) {
    color: #6b7c8d;
    margin: 5px 0;
  }

  :global(.command-output.success) {
    color: #52c41a;
  }

  :global(.command-output.error) {
    color: #ff7875;
  }
</style>
