import { ref, onMounted, watch } from 'vue'

/**
 * A Vue Composable for creating a typewriter effect.
 * @param {import('vue').Ref<string[]> | string[]} linesRef - A ref or array of strings to type out.
 * @param {object} options - Configuration options.
 * @param {number} [options.typingSpeed=50] - Speed of typing in ms.
 * @param {number} [options.lineDelay=400] - Delay before starting a new line in ms.
 */
export function useTypewriter(linesRef, options = {}) {
  const { typingSpeed = 50, lineDelay = 400 } = options

  const typedContent = ref('')
  const isFinished = ref(false)
  const internalLines = ref(Array.isArray(linesRef) ? linesRef : linesRef.value)

  const type = () => {
    let lineIndex = 0
    let charIndex = 0
    let currentHtml = ''
    isFinished.value = false

    const typeChar = () => {
      if (lineIndex >= internalLines.value.length) {
        // Typing finished for all lines
        typedContent.value = currentHtml.trim().replace(/<br>$/, '') // Remove trailing <br>
        isFinished.value = true
        return
      }

      const currentLine = internalLines.value[lineIndex]
      if (charIndex >= currentLine.length) {
        // End of line
        lineIndex++
        charIndex = 0
        currentHtml += '<br>'
        setTimeout(typeChar, lineDelay)
        return
      }

      const char = currentLine[charIndex]
      let nextCharIndex = charIndex + 1

      // Handle HTML tags: find the closing '>' and treat the whole tag as one "character"
      if (char === '<') {
        const tagEndIndex = currentLine.indexOf('>', charIndex)
        if (tagEndIndex !== -1) {
          currentHtml += currentLine.substring(charIndex, tagEndIndex + 1)
          nextCharIndex = tagEndIndex + 1
        } else {
          currentHtml += char // Fallback for malformed tags
        }
      } else {
        currentHtml += char
      }

      // Update content with cursor
      typedContent.value = currentHtml + '<span class="typing-cursor"></span>'
      charIndex = nextCharIndex

      setTimeout(typeChar, typingSpeed)
    }

    typeChar()
  }

  onMounted(type)

  // If the source lines change, re-trigger the animation
  watch(
    linesRef,
    (newLines) => {
      internalLines.value = newLines
      type()
    },
    { deep: true }
  )

  return { typedContent, isFinished }
}
