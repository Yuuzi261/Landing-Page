import { ref, onMounted, onUnmounted, isRef } from 'vue'

/**
 * A Vue Composable for creating a typewriter effect.
 * @param {string|string[]|import('vue').Ref<string[]>} textOrSentences - A string, an array of strings, or a ref of an array of strings to type out.
 * @param {object} options - Configuration options.
 * @param {boolean} [options.loop=false] - Whether to loop through sentences indefinitely.
 * @param {number} [options.typingSpeed=150] - Speed of typing in ms.
 * @param {number} [options.deletingSpeed=75] - Speed of deleting in ms.
 * @param {number} [options.delay=1000] - Delay in ms after a sentence is typed before it starts deleting (in loop mode).
 * @param {boolean} [options.manualStart=false] - If true, the animation will not start on mount and must be triggered by calling the returned `start` function.
 * @param {boolean} [options.html=false] - If true, the typewriter will correctly handle and render HTML tags within the string.
 */
export function useTypewriter(textOrSentences, options = {}) {
  const {
    loop = false,
    typingSpeed = 150,
    deletingSpeed = 75,
    delay = 1000,
    manualStart = false,
    html = false,
  } = options

  const typedText = ref('')
  const isFinished = ref(false)
  const showCursor = ref(false)

  const sentences = isRef(textOrSentences)
    ? textOrSentences.value
    : Array.isArray(textOrSentences)
      ? textOrSentences
      : [textOrSentences]

  const sentenceIndex = ref(0)
  let typingTimeout
  let deletingTimeout

  const cleanup = () => {
    clearTimeout(typingTimeout)
    clearTimeout(deletingTimeout)
  }

  const typeSentence = (sentence) => {
    if (typeof sentence === 'undefined') {
      isFinished.value = true
      showCursor.value = loop // Keep cursor if looping
      return
    }

    showCursor.value = true
    isFinished.value = false
    let i = 0
    typedText.value = ''

    const type = () => {
      if (i < sentence.length) {
        let char = sentence.charAt(i)
        let nextI = i + 1

        if (html && char === '<') {
          const tagEndIndex = sentence.indexOf('>', i)
          if (tagEndIndex !== -1) {
            typedText.value += sentence.substring(i, tagEndIndex + 1)
            nextI = tagEndIndex + 1
          } else {
            typedText.value += char // Malformed tag
          }
        } else {
          typedText.value += char
        }
        i = nextI
        typingTimeout = setTimeout(type, typingSpeed)
      } else {
        // Finished typing this sentence
        if (loop) {
          deletingTimeout = setTimeout(deleteSentence, delay)
        } else {
          isFinished.value = true
          // The component can decide whether to hide the cursor
        }
      }
    }
    type()
  }

  const deleteSentence = () => {
    const del = () => {
      if (typedText.value.length > 0) {
        typedText.value = typedText.value.slice(0, -1)
        deletingTimeout = setTimeout(del, deletingSpeed)
      } else {
        sentenceIndex.value++
        if (sentenceIndex.value >= sentences.length) {
          if (loop) {
            sentenceIndex.value = 0
          } else {
            isFinished.value = true
            showCursor.value = false
            return
          }
        }
        typingTimeout = setTimeout(() => typeSentence(sentences[sentenceIndex.value]), 500)
      }
    }
    del()
  }

  const start = () => {
    cleanup()
    sentenceIndex.value = 0
    typedText.value = ''
    isFinished.value = false
    showCursor.value = false

    if (sentences && sentences.length > 0) {
      typeSentence(sentences[sentenceIndex.value])
    }
  }

  if (!manualStart) {
    onMounted(start)
  }

  onUnmounted(cleanup)

  return { typedText, isFinished, showCursor, start }
}
