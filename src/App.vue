<template>
  <BackgroundEffects />
  <div class="container">
    <HeaderSection />
    <InteractiveTerminal />
    <AsciiArt />
    <LinksSection />
    <FooterSection />
  </div>
</template>

<script setup>
import BackgroundEffects from './components/BackgroundEffects.vue';
import HeaderSection from './components/HeaderSection.vue';
import InteractiveTerminal from './components/InteractiveTerminal.vue';
import AsciiArt from './components/AsciiArt.vue';
import LinksSection from './components/LinksSection.vue';
import FooterSection from './components/FooterSection.vue';
</script>