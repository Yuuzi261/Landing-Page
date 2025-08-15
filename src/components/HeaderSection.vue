<template>
    <TerminalWindow title="cute_terminal.sh" emoji="♡">
        <div style="color: #4a90e2; margin-bottom: 20px;">
            <span class="prompt">yuuzi@cute-terminal:~$</span> <span style="color: #87ceeb;">whoami</span>
        </div>
        <div style="margin: 20px 0; color: #5a6c7d; line-height: 1.6;">
            嗨！我是Yuuzi <span class="cute-emoji">( ˶ᵔ ᵕ ᵔ˶ )</span><br>
            歡迎來到我的個人網站！<br>
            這裡收藏了我在網路世界的各種足跡～<br><br>
            <span style="color: #87ceeb; font-size: 12px;">💡 提示：下面的終端機可以真的打指令喔！試試看 help 指令</span>
        </div>
    </TerminalWindow>
</template>

<script setup>
import TerminalWindow from './TerminalWindow.vue';
</script>

<style scoped>
.prompt {
    color: #4a90e2;
    font-weight: 600;
}
.cute-emoji {
    display: inline-block;
    animation: wiggle 2s ease-in-out infinite;
}

@keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(3deg); }
    75% { transform: rotate(-3deg); }
}
</style>
