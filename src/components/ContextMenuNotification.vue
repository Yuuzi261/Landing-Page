<template>
  <transition name="fade">
    <div v-if="visible" class="notification">
      <p>{{ message }}</p>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  visible: Boolean,
  message: String,
})
</script>

<style scoped>
.notification {
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.25);
  color: white;
  padding: 15px 30px;
  border-radius: 999px;
  z-index: 9999;
  text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
