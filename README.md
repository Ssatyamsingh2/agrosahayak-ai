# AgroSahayak AI 🌾

A multilingual (English, Hindi, Haryanvi) web-based farming assistant built for Indian farmers. It provides a simple chat interface with voice input and voice-output (text-to-speech), so users who aren't comfortable reading in English can still get help in their own language.

## Tech Stack

- **HTML5, CSS3, Vanilla JavaScript** — no frameworks, kept lightweight and dependency-free
- **ElevenLabs Text-to-Speech API** — for natural-sounding voice responses
- **Web Speech API** — for voice input (mic button)

## Project Structure

```
agrosahayak-ai/
├── index.html          # Main page structure
├── css/
│   └── style.css        # Styling
├── js/
│   ├── i18n.js           # Language dictionary + switching logic (en / hi / hry)
│   ├── tts.js             # ElevenLabs TTS integration + browser fallback
│   └── app.js             # Chat UI logic, message handling, mic input
└── README.md
```

## Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/Ssatyamsingh2/agrosahayak-ai.git
   cd agrosahayak-ai
   ```
2. Open `index.html` directly in a browser, or serve it locally:
   ```bash
   npx serve .
   ```
3. To enable ElevenLabs voice output, get an API key from [elevenlabs.io](https://elevenlabs.io) and wire it into `speak()` in `js/app.js` — ideally via a small backend proxy so the key isn't exposed client-side.

## Current Status

This is a scaffold with the core UI, language-switching, chat flow, and TTS/voice-input wiring in place. The assistant's actual response logic (`getAssistantReply()` in `js/app.js`) is a placeholder — connect it to your farming knowledge base, rules engine, or LLM backend to generate real answers.

## Roadmap

- [ ] Connect `getAssistantReply()` to a real backend / LLM
- [ ] Expand language coverage and refine Haryanvi translations
- [ ] Add crop-specific quick-reply suggestions
- [ ] Persist chat history locally
- [ ] Accessibility pass (screen reader labels, keyboard navigation)

## License

MIT
