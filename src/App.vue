<template>
  <HeroSection />
  <main class="main-content">
    <BackgroundEffects />
    <div class="container">
      <HeaderSection />
      <InteractiveTerminal />
      <AsciiArt />
      <LinksSection />
      <FooterSection />
    </div>
  </main>
  <ContextMenuNotification :visible="showNotification" :message="notificationMessage" />
</template>

<script setup>
  import BackgroundEffects from './components/BackgroundEffects.vue'
  import HeroSection from './components/HeroSection.vue'
  import HeaderSection from './components/HeaderSection.vue'
  import InteractiveTerminal from './components/InteractiveTerminal.vue'
  import AsciiArt from './components/AsciiArt.vue'
  import LinksSection from './components/LinksSection.vue'
  import FooterSection from './components/FooterSection.vue'
  import ContextMenuNotification from './components/ContextMenuNotification.vue'

  import { onMounted, ref } from 'vue'
  import firework from 'mouse-firework'

  const showNotification = ref(false)
  const notificationMessage = ref('')

  onMounted(() => {
    document.addEventListener('contextmenu', event => {
      event.preventDefault()
      notificationMessage.value = '(ﾟ∀。)不給你右鍵～'
      showNotification.value = true
      setTimeout(() => {
        showNotification.value = false
      }, 2000)
    })

    firework({
      excludeElements: ['a'],
      particles: [
        {
          shape: 'circle',
          move: ['emit'],
          easing: 'easeOutExpo',
          colors: [
            'rgba(135, 206, 235, .9)',
            'rgba(184, 212, 240, .9)',
            'rgba(212, 237, 255, .9)',
            'rgba(74, 144, 226, .9)',
          ],
          number: 30,
          duration: [1200, 1800],
          shapeOptions: {
            radius: [16, 32],
          },
        },
        {
          shape: 'circle',
          move: ['diffuse'],
          easing: 'easeOutExpo',
          colors: ['#c6c6c6'],
          number: 1,
          duration: [1200, 1800],
          shapeOptions: {
            radius: 20,
            alpha: 0.5,
            lineWidth: 6,
          },
        },
      ],
    })

    const originalTitle = document.title
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        document.title = '|･ω･｀) 別走嘛．．．'
      } else {
        document.title = '(ゝ∀･) 歡迎回來！'
        setTimeout(() => {
          document.title = originalTitle
        }, 1500)
      }
    })
  })
</script>
