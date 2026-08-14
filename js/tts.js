// tts.js — Text-to-speech via the ElevenLabs API, with a browser-native fallback.
//
// NOTE: Do not hardcode your ElevenLabs API key in client-side code for a real
// deployment. Route requests through a small backend/proxy that holds the key
// server-side. For this demo, speak() accepts an optional apiKey argument and
// falls back to the browser's SpeechSynthesis API when one isn't supplied.

const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech";
// Replace with a voice ID suited to the target language/accent.
const VOICE_ID = "REPLACE_WITH_VOICE_ID";

// The browser has no "Haryanvi" voice, so we fall back to Hindi for speech —
// Haryanvi is mutually intelligible enough with Hindi for browser TTS purposes.
const BROWSER_TTS_LANG_MAP = {
  en: "en-IN",
  hi: "hi-IN",
  hry: "hi-IN",
};

/**
 * Speak the given text aloud using the ElevenLabs TTS API.
 * Falls back to the browser's built-in SpeechSynthesis API if no apiKey is
 * supplied or the ElevenLabs request fails (offline, rate limit, etc).
 */
async function speak(text, apiKey) {
  if (!text) return;

  if (!apiKey) {
    fallbackSpeak(text);
    return;
  }

  try {
    const response = await fetch(`${ELEVENLABS_API_URL}/${VOICE_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.4, similarity_boost: 0.8 },
      }),
    });

    if (!response.ok) throw new Error(`TTS request failed: ${response.status}`);

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (err) {
    console.warn("ElevenLabs TTS failed, falling back to browser voice:", err);
    fallbackSpeak(text);
  }
}

/** Browser-native speech synthesis fallback. */
function fallbackSpeak(text) {
  if (!("speechSynthesis" in window)) return;
  const lang = document.documentElement.getAttribute("lang") || "en";
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = BROWSER_TTS_LANG_MAP[lang] || "en-IN";
  window.speechSynthesis.cancel(); // stop any previous utterance first
  window.speechSynthesis.speak(utterance);
}
