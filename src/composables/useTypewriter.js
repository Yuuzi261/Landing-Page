import { ref, onMounted, onUnmounted } from 'vue'

/**
 * A Vue Composable for creating a cyclical typewriter effect.
 * @param {string[]} sentences - An array of strings to type out cyclically.
 * @param {object} options - Configuration options.
 * @param {boolean} [options.loop=false] - Whether to loop through the sentences indefinitely.
 * @param {number} [options.typingSpeed=150] - Speed of typing in ms.
 * @param {number} [options.deletingSpeed=75] - Speed of deleting in ms.
 * @param {number} [options.delay=1000] - Delay in ms after a sentence is typed before it starts deleting.
 */

export function useTypewriter(sentences, options = {}) {
  const { loop = false, typingSpeed = 150, deletingSpeed = 75, delay = 1000 } = options

  const typedText = ref('')
  const sentenceIndex = ref(0)
  let typingTimeout
  let deletingTimeout

  const typeSentence = (sentence) => {
    if (!sentence) return
    let i = 0
    typedText.value = '' // Clear before typing new sentence
    const type = () => {
      if (i < sentence.length) {
        typedText.value += sentence.charAt(i)
        i++
        typingTimeout = setTimeout(type, typingSpeed)
      } else {
        deletingTimeout = setTimeout(deleteSentence, delay)
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
            return // Stop if not looping
          }
        }
        // Start typing the next sentence
        typingTimeout = setTimeout(() => typeSentence(sentences[sentenceIndex.value]), 500)
      }
    }
    del()
  }

  onMounted(() => {
    if (sentences && sentences.length > 0) {
      typeSentence(sentences[sentenceIndex.value])
    }
  })

  onUnmounted(() => {
    clearTimeout(typingTimeout)
    clearTimeout(deletingTimeout)
  })

  return { typedText }
}
