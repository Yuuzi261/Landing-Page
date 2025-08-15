<template>
    <div class="bg-particles" id="particles"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const createParticles = () => {
    const particles = document.getElementById('particles');
    if (!particles) return;
    
    // Use v1 particles for the darker theme effect
    const emojis = ['♡', '☆', '✨', '◇', '○', '△'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particles.appendChild(particle);
    }
};

// const handleMouseMove = (e) => {
//     const cursor = document.createElement('div');
//     cursor.style.cssText = `
//         position: fixed;
//         left: ${e.clientX}px;
//         top: ${e.clientY}px;
//         width: 4px;
//         height: 4px;
//         background: #ff6b9d;
//         border-radius: 50%;
//         pointer-events: none;
//         z-index: 9999;
//         animation: cursorFade 1s ease-out forwards;
//     `;
    
//     // This is a bit inefficient, but it's for a cute effect.
//     // A better implementation might use a single style element.
//     const style = document.createElement('style');
//     style.textContent = `
//         @keyframes cursorFade {
//             0% { opacity: 1; transform: scale(1); }
//             100% { opacity: 0; transform: scale(0); }
//         }
//     `;
//     document.head.appendChild(style);
//     document.body.appendChild(cursor);
    
//     setTimeout(() => {
//         cursor.remove();
//         style.remove();
//     }, 1000);
// };

onMounted(() => {
    createParticles();
    // document.addEventListener('mousemove', handleMouseMove);
});

// onUnmounted(() => {
//     document.removeEventListener('mousemove', handleMouseMove);
// });
</script>

<style>
/* Using global style so it can affect body and dynamically created elements */
.bg-particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.particle {
    position: absolute;
    color: #ff6b9d;
    font-size: 12px;
    animation: float 6s ease-in-out infinite;
    opacity: 0.3;
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
}
</style>
