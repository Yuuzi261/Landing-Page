export const commands = {
    help: {
        description: '顯示所有可用指令',
        action: () => `
<div class="command-output">可用指令列表 ✨</div>
<div class="command-output">• help - 顯示此幫助訊息</div>
<div class="command-output">• about - 關於我</div>
<div class="command-output">• links - 顯示所有連結</div>
<div class="command-output">• clear - 清空終端機</div>
<div class="command-output">• date - 顯示當前時間</div>
<div class="command-output">• whoami - 關於使用者</div>
<div class="command-output">• cute - 隨機可愛鼓勵訊息 ♡</div>
<div class="command-output">• fortune - 隨機小語</div>
<div class="command-output">• cat [檔案] - 顯示檔案內容 (試試 cat readme.txt)</div>
        `
    },
    about: {
        description: '關於我',
        action: () => `
<div class="command-output success">關於我 ♡</div>
<div class="command-output">嗨！我是一個熱愛程式設計的開發者</div>
<div class="command-output">專精不明、想到什麼就做什麼</div>
<div class="command-output">喜歡可愛的東西，可愛就是正義 (*´∀\`)~♥</div>
<div class="command-output">最愛的程式語言：Python, Vue.js, C++</div>
<div class="command-output">興趣：寫程式、看動漫、攝取咖啡因☕✨</div>
        `
    },
    links: {
        description: '顯示所有連結',
        action: () => `
<div class="command-output success">我的連結清單 📎</div>
<div class="command-output">🐙 GitHub: github.com/Yuuzi261</div>
<div class="command-output">📝 Blog: blog.yuuzi.cc</div>
<div class="command-output">🐦 Twitter: twitter.com/Yuuzi_261</div>
<div class="command-output">🦋 Bluesky: bsky.app/profile/yuuzi.cc</div>
<div class="command-output">💌 Email: your.email@example.com</div>
<div class="command-output">🎮 Discord: discord.com/users/431016551261405195</div>
        `
    },
    clear: {
        description: '清空終端機',
        action: () => {
            return { 
                type: 'clear', 
                payload: '<div class="command-output">終端機已清空！ ✨</div>' 
            };
        }
    },
    date: {
        description: '顯示當前時間',
        action: () => {
            const now = new Date();
            return `<div class="command-output success">${now.toLocaleString('zh-TW')} 🕐</div>`;
        }
    },
    whoami: {
        description: '關於使用者',
        action: () => `
<div class="command-output success">user: 可愛的訪客 ♡</div>
<div class="command-output">status: 正在對這個terminal進行暴力測試</div>
<div class="command-output">mood: 希望是開心的 (◕‿◕)</div>
<div class="command-output">location: 在我的網站上 ✨</div>
        `
    },
    cute: {
        description: '隨機可愛鼓勵訊息',
        action: () => {
            const cuteMessages = [
                '♡(˃͈ દ ˂͈ ♡) 你好可愛！',
                '(*´∀`)~♥ 今天也要加油喔！',
                '✨ 你是最棒的！✨',
                '(つ✧ω✧)つ 給你一個大大的擁抱！',
                '(｡◕‿◕｡) 希望你今天過得很開心～',
                '♡ 記得要好好照顧自己喔 ♡'
            ];
            const message = cuteMessages[Math.floor(Math.random() * cuteMessages.length)];
            return `<div class="command-output success">${message}</div>`;
        }
    },
    fortune: {
        description: '隨機小語',
        action: () => {
            const fortunes = [
                '這不是 Bug，是 Feature 😎',
                '工程師：一種把咖啡變成程式碼的機器 ☕️ → 💻',
                '別擔心，這個 Warning 只是在提醒你它很特別 😉',
                '寫累了就 while True: sleep(1000) 吧！至於怎麼醒來那是 ISR 的事 😴',
                '當我寫下這段程式時，只有我跟上帝看得懂。而現在只有上帝看得懂了 🤓☝️',
                '除錯是移除 bug 的過程，那寫程式就是放進 bug 的過程 🐛✨',
                '為什麼工程師常把聖誕節跟萬聖節搞混？因為 Dec 25 = Oct 31 🎄🎃',
                '為什麼程式設計師討厭大自然？因為太多 bug 了 🐛🌳',
                '兩大世紀難題：為什麼我的程式碼不會動🥲 / 為什麼我的程式碼動了🫨',
            ];
            const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
            return `<div class="command-output success">🔮 ${fortune}</div>`;
        }
    },
    cat: {
        description: '顯示檔案內容',
        action: (args) => {
            const files = {
                'readme.txt': `
<div class="command-output">📄 README.txt</div>
<div class="command-output">================</div>
<div class="command-output">歡迎來到我的可愛終端機！</div>
<div class="command-output">這是一個結合終端機風格與可愛元素的個人網站</div>
<div class="command-output">希望你會喜歡這個設計 ♡</div>
<div class="command-output">----------------</div>
<div class="command-output">技術棧：Vue.js, HTML, CSS</div>
<div class="command-output">風格：可愛 + 終端機</div>
<div class="command-output">製作：喜歡各種可愛東西的 Yuuzi ✨</div>
                `,
                'secrets.txt': `
<div class="command-output">🤫 secrets.txt</div>
<div class="command-output">================</div>
<div class="command-output">你以為這裡會放我的祕密嗎？</div>
<div class="command-output">才不告訴你咧～( Φ ω Φ )</div>
                `
            };
            
            if (!args || !args[0]) {
                return '<div class="command-output error">請指定檔案名稱！試試：cat readme.txt</div>';
            }
            
            const filename = args[0];
            if (files[filename]) {
                return files[filename];
            } else {
                return `<div class="command-output error">找不到檔案：${filename}</div><div class="command-output">可用檔案：readme.txt, secrets.txt</div>`;
            }
        }
    }
};
