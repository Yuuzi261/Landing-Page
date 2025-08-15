<template>
    <div class="footer">
        <span class="prompt">yuuzi@cute-terminal:~$</span> echo "Thanks for visiting! <span class="cute-emoji">♡(˃͈ દ ˂͈ ♡)</span>"<br><br>
        <span style="color: #87ceeb;">Made with ♡ and lots of caffeine ☕</span>
    </div>
</template>

<style scoped>
.footer {
    text-align: center;
    padding: 30px;
    color: #87ceeb;
    font-size: 13px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 12px;
    margin: 20px 0;
}

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
