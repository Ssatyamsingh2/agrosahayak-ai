# AgroSahayak AI 🌾

A multilingual (English, Hindi, Haryanvi) web platform built to help farmers across India get quick, practical support — crop disease guidance, nearby fertilizer shops, and government scheme information — without needing to read or type in English.

**Live demo:** open `index.html` in a browser, or serve the folder locally (see below).

## Why this project

Most agri-tech tools assume farmers are comfortable with English and text-heavy interfaces. AgroSahayak AI is built around the opposite assumption: content is available in Hindi and Haryanvi, key results can be read aloud, and the UI stays simple enough to use on a basic smartphone.

## Features

- 🌱 **Crop Disease Detection** — upload a photo of a crop or leaf and get a likely diagnosis with a suggested remedy, readable and audible in the selected language.
- 🏪 **Fertilizer Shop Finder** — locate nearby agriculture/fertilizer shops with contact info, ratings, open/closed status, and one-tap directions.
- 🏛️ **Government Schemes** — search and browse major farmer welfare schemes (PM-KISAN, PMFBY, KCC, PM-KUSUM, Soil Health Card, e-NAM) with eligibility summaries and official links.
- 🌐 **Trilingual UI** — every page switches instantly between English, Hindi, and Haryanvi.
- 🔊 **Voice output** — diagnosis results can be read aloud, using the ElevenLabs API when configured, with an automatic browser-speech fallback.
- 👷 **Labour Booking** and **👨‍⚕️ Expert Booking** — scoped as the next features (shown on the homepage as "coming soon").

## Tech Stack

- **HTML5, CSS3, Vanilla JavaScript** — no framework, no build step, easy to read and extend
- **ElevenLabs Text-to-Speech API** — natural-sounding multilingual voice output
- **Web Speech API** — voice fallback and (future) voice input
- **Google Maps / Places** — directions links now; live nearby-search is the next integration (see Roadmap)

## Project Structure

```
agrosahayak-ai/
├── index.html          # Homepage — feature overview
├── disease.html         # Crop disease detection
├── shops.html            # Fertilizer shop finder
├── schemes.html           # Government schemes browser
├── css/
│   └── style.css          # Shared styling for all pages
├── js/
│   ├── i18n.js              # Shared EN/HI/Haryanvi translation dictionary
│   ├── nav.js                # Active nav-link highlighting
│   ├── tts.js                 # ElevenLabs TTS + browser-speech fallback
│   ├── disease.js              # Disease detection UI + demo classifier
│   ├── shops.js                 # Shop finder UI + geolocation + demo data
│   └── schemes.js                # Schemes dataset + search/filter
└── README.md
```

## Getting Started

```bash
git clone https://github.com/Ssatyamsingh2/agrosahayak-ai.git
cd agrosahayak-ai
npx serve .          # or just open index.html directly in a browser
```

No build step, no dependencies to install — it's plain HTML/CSS/JS.

## Current Status — what's real vs. what's a demo stand-in

Being upfront about this matters for an interview: this is an honest work-in-progress, not a finished product.

| Feature | Status |
|---|---|
| Multilingual UI (EN/HI/Haryanvi) | ✅ Fully working |
| Voice output (browser fallback) | ✅ Fully working |
| Voice output (ElevenLabs) | ⚙️ Wired up, needs an API key |
| Disease detection | 🧪 Demo classifier — picks from a small local dataset to simulate a diagnosis. Built so `classifyImage()` in `js/disease.js` can be swapped for a real model (TensorFlow.js in-browser, or a backend inference endpoint) without touching the UI. |
| Shop finder | 🧪 Demo data — shows a bundled sample dataset of Haryana fertilizer shops. `fetchNearbyShops()` in `js/shops.js` already tries a `/api/shops` backend first, and only falls back to sample data if that endpoint isn't available. |
| Government schemes | ✅ Real, curated scheme data (names, descriptions, official links) |
| Labour booking / Expert booking | 📋 Scoped, not yet built |

## Roadmap

- [ ] Swap the demo disease classifier for a real model (TensorFlow.js or a trained CNN served via a backend)
- [ ] Add a backend proxy for Google Places "Nearby Search" so shop results are live, not sample data
- [ ] Build out Labour Booking and Expert Booking
- [ ] Persist user language preference and recent searches
- [ ] Accessibility pass (screen reader labels, keyboard navigation, larger tap targets)

## License

MIT
