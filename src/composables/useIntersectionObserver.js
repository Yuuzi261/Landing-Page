import { onMounted, ref } from 'vue'

/**
 * A Vue Composable for observing when an element enters the viewport.
 * @param {import('vue').Ref<Element>} elementRef - The ref of the element to observe.
 * @param {() => void} onIntersect - Callback function to execute when the element becomes visible.
 * @param {object} options - IntersectionObserver options.
 * @param {number} [options.threshold=0.1] - Percentage of the element that needs to be visible.
 */
export function useIntersectionObserver(elementRef, onIntersect, options = { threshold: 0.1 }) {
  const isVisible = ref(false)

  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (onIntersect) {
            onIntersect()
          }
          observer.unobserve(entry.target) // Observe only once
        }
      })
    }, options)

    if (elementRef.value) {
      observer.observe(elementRef.value)
    }
  })

  return { isVisible }
}
