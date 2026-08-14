// tts.js — Text-to-speech via the ElevenLabs API
// NOTE: Do not hardcode your API key in client-side code for production.
// Route requests through a small backend/proxy that holds the key server-side.

const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech";
// Replace with a voice ID suited to the target language/accent.
const VOICE_ID = "REPLACE_WITH_VOICE_ID";

/**
 * Speak the given text aloud using the ElevenLabs TTS API.
 * Falls back to the browser's built-in SpeechSynthesis API if the
 * ElevenLabs request fails (e.g. missing key, offline, rate limit).
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
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = document.documentElement.getAttribute("lang") || "en";
  window.speechSynthesis.speak(utterance);
}
