// i18n.js — Multilingual string dictionary and language-switching logic
// Supports: English (en), Hindi (hi), Haryanvi (hry)

const translations = {
  en: {
    hero_title: "Your Farming Companion",
    hero_subtitle: "Ask questions about crops, weather, and farming practices — in your own language.",
    welcome_msg: "Namaste! How can I help you with your farm today?",
    input_placeholder: "Type your question here...",
    footer_text: "Built for farmers, in their language.",
  },
  hi: {
    hero_title: "आपका कृषि सहायक",
    hero_subtitle: "फसल, मौसम और खेती के तरीकों के बारे में अपनी भाषा में पूछें।",
    welcome_msg: "नमस्ते! आज मैं आपके खेत में कैसे मदद कर सकता हूं?",
    input_placeholder: "यहाँ अपना सवाल टाइप करें...",
    footer_text: "किसानों के लिए, उनकी अपनी भाषा में बनाया गया।",
  },
  hry: {
    hero_title: "थारा खेती का साथी",
    hero_subtitle: "फसल, मौसम अर खेती के तरीकां कै बारे म्ह अपणी भाषा म्ह पूछो।",
    welcome_msg: "राम राम! आज मैं थारे खेत म्ह कियां मदद कर सकूं?",
    input_placeholder: "इब्बे अपणा सवाल लिखो...",
    footer_text: "किसानां खात्तर, उनकी अपणी भाषा म्ह बणाया गया।",
  },
};

let currentLang = "en";

function applyTranslations(lang) {
  currentLang = translations[lang] ? lang : "en";
  const dict = translations[currentLang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.setAttribute("placeholder", dict[key]);
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });

  document.documentElement.setAttribute("lang", currentLang);
}

function initLanguageSwitcher() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyTranslations(btn.dataset.lang));
  });
  applyTranslations(currentLang);
}

document.addEventListener("DOMContentLoaded", initLanguageSwitcher);
