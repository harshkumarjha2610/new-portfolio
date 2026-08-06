const fs = require('fs');
const https = require('https');
const path = require('path');

const logos = [
    { name: 'anthropic.png', url: 'https://icon.horse/icon/anthropic.com' },
    { name: 'tailwind.png', url: 'https://icon.horse/icon/tailwindcss.com' },
    { name: 'openai.png', url: 'https://icon.horse/icon/openai.com' },
    { name: 'vscode.png', url: 'https://icon.horse/icon/code.visualstudio.com' },
    { name: 'gsap.png', url: 'https://icon.horse/icon/gsap.com' },
    { name: 'framer.png', url: 'https://icon.horse/icon/framer.com' },
    { name: 'deepmind.png', url: 'https://icon.horse/icon/deepmind.google' },
    { name: 'deepseek.png', url: 'https://icon.horse/icon/deepseek.com' },
    { name: 'moonshot.png', url: 'https://icon.horse/icon/moonshot.cn' },
    { name: 'cursor.png', url: 'https://icon.horse/icon/cursor.com' },
    { name: 'vercel.png', url: 'https://icon.horse/icon/vercel.com' },
    { name: 'react.png', url: 'https://icon.horse/icon/react.dev' },
    { name: 'figma.png', url: 'https://icon.horse/icon/figma.com' },
    { name: 'github.png', url: 'https://icon.horse/icon/github.com' }
];

const dir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

logos.forEach(logo => {
    const file = fs.createWriteStream(path.join(dir, logo.name));
    https.get(logo.url, response => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
            https.get(response.headers.location, res => {
                res.pipe(file);
            });
        } else {
            response.pipe(file);
        }
    }).on('error', err => {
        console.error(err);
    });
});
