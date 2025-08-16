import { onMounted, onUnmounted, ref } from 'vue'

/**
 * A Vue Composable for observing when an element enters or leaves the viewport.
 * @param {import('vue').Ref<Element>} elementRef - The ref of the element to observe.
 * @param {() => void} onIntersect - Callback function to execute when the element becomes visible.
 * @param {object} options - IntersectionObserver options.
 * @param {number} [options.threshold=0.1] - Percentage of the element that needs to be visible.
 */
export function useIntersectionObserver(elementRef, onIntersect, options = { threshold: 0.1 }) {
  const isVisible = ref(false)
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (onIntersect) {
            onIntersect()
          }
        } else {
          // Reset when it goes out of view
          isVisible.value = false
        }
      })
    }, options)

    if (elementRef.value) {
      observer.observe(elementRef.value)
    }
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return { isVisible }
}
