<template>
    <TerminalWindow title="interactive_terminal.sh" emoji="🖥️">
        <div class="interactive-terminal" @click="focusInput">
            <div class="terminal-output" ref="terminalOutputRef" v-html="output"></div>
            <div class="terminal-input-line">
                <span class="prompt">user@cute-terminal:~$</span>
                <input 
                    type="text" 
                    class="terminal-input" 
                    ref="terminalInputRef" 
                    v-model="input" 
                    @keydown="handleKeydown"
                    placeholder="輸入指令..." 
                    autocomplete="off"
                >
                <span class="cursor"></span>
            </div>
        </div>
    </TerminalWindow>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import TerminalWindow from './TerminalWindow.vue';
import { commands } from '../data/terminalCommands.js';
import { welcomeMessage } from '../data/terminalContent.js';

const output = ref(welcomeMessage);
const input = ref('');
const commandHistory = [];
let historyIndex = -1;

const terminalInputRef = ref(null);
const terminalOutputRef = ref(null);

const focusInput = () => {
    terminalInputRef.value?.focus();
};

onMounted(() => {
    focusInput();
});

const scrollToBottom = () => {
    nextTick(() => {
        if (terminalOutputRef.value) {
            terminalOutputRef.value.scrollTop = terminalOutputRef.value.scrollHeight;
        }
    });
};

const executeCommand = (commandLine) => {
    const args = commandLine.split(' ');
    const command = args[0].toLowerCase();
    const commandArgs = args.slice(1);

    output.value += `<div><span style="color: #4a90e2;">user@cute-terminal:~$</span> <span style="color: #87ceeb;">${commandLine}</span></div>`;

    if (commands[command]) {
        const result = commands[command].action(commandArgs);
        if (result) {
            if (typeof result === 'object' && result.type === 'clear') {
                output.value = result.payload;
            } else {
                output.value += result;
            }
        }
    } else {
        output.value += `<div class="command-output error">找不到指令：${command}</div><div class="command-output">輸入 'help' 查看可用指令 ♡</div>`;
    }
    scrollToBottom();
};

const handleKeydown = (e) => {
    if (e.key === 'Enter') {
        if (input.value.trim()) {
            commandHistory.unshift(input.value);
            historyIndex = -1;
            executeCommand(input.value);
            input.value = '';
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        } else if (historyIndex <= 0) {
            historyIndex = -1;
            input.value = '';
        }
    }
};
</script>

<style scoped>
.interactive-terminal {
    /* This container is now mainly for the click event */
    cursor: text;
}

.terminal-output {
    min-height: 150px;
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 15px;
    font-size: 14px;
    line-height: 1.5;
}

.terminal-input-line {
    display: flex;
    align-items: center;
    gap: 8px;
}

.prompt {
    color: #4a90e2;
    font-weight: 600;
    flex-shrink: 0;
}

.terminal-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #5a6c7d;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
}

.cursor {
    display: inline-block;
    width: 8px;
    height: 16px;
    background: #87ceeb;
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

/* These styles need to be accessible by v-html */
:global(.command-output) {
    color: #6b7c8d;
    margin: 5px 0;
}

:global(.command-output.success) {
    color: #52c41a;
}

:global(.command-output.error) {
    color: #ff7875;
}
</style>
