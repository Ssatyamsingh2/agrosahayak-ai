// app.js — Chat UI logic: sending messages, rendering responses, mic input

const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const micBtn = document.getElementById("mic-btn");

function appendMessage(text, sender = "bot") {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  const p = document.createElement("p");
  p.textContent = text;
  msg.appendChild(p);
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return msg;
}

/**
 * Placeholder for the actual farming-assistant response logic.
 * Replace this with a call to your backend/LLM endpoint that returns
 * a farming-related answer in the currently selected language.
 */
async function getAssistantReply(userText) {
  // TODO: replace with a real API call, e.g.:
  // const res = await fetch("/api/ask", { method: "POST", body: JSON.stringify({ text: userText, lang: currentLang }) });
  // return (await res.json()).reply;
  return `(demo reply) I heard: "${userText}". Hook this up to your farming knowledge base or LLM backend.`;
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  appendMessage(text, "user");
  chatInput.value = "";

  const reply = await getAssistantReply(text);
  appendMessage(reply, "bot");

  // Speak the reply aloud (pass your ElevenLabs API key here if available)
  speak(reply);
});

// Voice input via the Web Speech API (falls back silently if unsupported)
if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  micBtn.addEventListener("click", () => {
    recognition.lang = document.documentElement.getAttribute("lang") || "en-IN";
    recognition.start();
  });

  recognition.addEventListener("result", (event) => {
    const transcript = event.results[0][0].transcript;
    chatInput.value = transcript;
  });

  recognition.addEventListener("error", (event) => {
    console.warn("Speech recognition error:", event.error);
  });
} else {
  micBtn.disabled = true;
  micBtn.title = "Voice input not supported in this browser";
}
