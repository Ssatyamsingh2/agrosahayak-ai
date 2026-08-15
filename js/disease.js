// disease.js — Crop disease detection UI logic.
//
// This is a DEMO classifier: it does not run a real image-recognition model.
// It's built so the "detect" step can be swapped out for a real one later —
// e.g. a TensorFlow.js model loaded client-side, or a call to a backend
// endpoint (POST /api/detect-disease with the image) that runs inference
// server-side. See classifyImage() below for where that call would go.

// A small local dataset of common crop diseases, with basic remedy info,
// translated across the three supported languages.
const DISEASE_DB = [
  {
    id: "leaf_blight",
    confidence: 0.87,
    name: { en: "Leaf Blight", hi: "पत्ती झुलसा रोग", hry: "पत्ती झुलसा रोग" },
    description: {
      en: "Brown/yellow patches spreading across the leaf, often starting at the edges.",
      hi: "पत्ती पर भूरे/पीले धब्बे फैलते हैं, अक्सर किनारों से शुरू होते हैं।",
      hry: "पत्ती पै भूरे/पीले धब्बे फैलै सैं, आमतौर पै किनारां तै शुरू होवै सैं।",
    },
    remedy: {
      en: "Remove and destroy infected leaves; apply a copper-based fungicide; avoid overhead watering.",
      hi: "संक्रमित पत्तियों को हटाकर नष्ट करें; कॉपर आधारित फफूंदनाशक का उपयोग करें; ऊपर से पानी देने से बचें।",
      hry: "बीमार पत्ती तोड़ के नाश करो; कॉपर आधारित दवाई छिड़को; ऊपर तै पाणी देण तै बचो।",
    },
  },
  {
    id: "powdery_mildew",
    confidence: 0.81,
    name: { en: "Powdery Mildew", hi: "चूर्णिल आसिता", hry: "सफेद पाउडर रोग" },
    description: {
      en: "A white, powder-like fungal coating on leaves and stems.",
      hi: "पत्तियों और तनों पर सफ़ेद, पाउडर जैसी फफूंद की परत।",
      hry: "पत्ती अर टहनी पै सफ़ेद, पाउडर जिसी परत आ जावै सै।",
    },
    remedy: {
      en: "Improve air circulation, avoid excess nitrogen fertilizer, apply a sulfur-based fungicide.",
      hi: "हवा का आवागमन बेहतर करें, अधिक नाइट्रोजन उर्वरक से बचें, सल्फर आधारित फफूंदनाशक का प्रयोग करें।",
      hry: "हवा का आणा-जाणा ठीक करो, ज्यादा नाइट्रोजन खाद ना दो, सल्फर आधारित दवाई छिड़को।",
    },
  },
  {
    id: "bacterial_wilt",
    confidence: 0.78,
    name: { en: "Bacterial Wilt", hi: "जीवाणु म्लानि", hry: "बैक्टीरिया मुरझाण रोग" },
    description: {
      en: "Sudden wilting of leaves and stems despite adequate soil moisture.",
      hi: "मिट्टी में पर्याप्त नमी होने पर भी पत्तियों और तनों का अचानक मुरझाना।",
      hry: "मिट्टी म्ह पूरी नमी होण पै भी पत्ती अर टहनी अचानक मुरझा जावैं सैं।",
    },
    remedy: {
      en: "Remove infected plants, rotate crops, disinfect tools between uses.",
      hi: "संक्रमित पौधों को हटाएं, फसल चक्र अपनाएं, उपयोग के बीच औजारों को कीटाणुरहित करें।",
      hry: "बीमार पौधे हटाओ, फसल चक्र अपणाओ, औजार बरतण तै पहल्यां साफ करो।",
    },
  },
  {
    id: "healthy",
    confidence: 0.9,
    name: { en: "Healthy Leaf", hi: "स्वस्थ पत्ती", hry: "ठीक-ठाक पत्ती" },
    description: {
      en: "No obvious signs of disease detected in this image.",
      hi: "इस फोटो में बीमारी के कोई स्पष्ट संकेत नहीं मिले।",
      hry: "इस फोटू म्ह बीमारी का कोए साफ निशान कोनी मिल्या।",
    },
    remedy: {
      en: "Continue regular monitoring and balanced fertilization.",
      hi: "नियमित निगरानी और संतुलित उर्वरक जारी रखें।",
      hry: "लगातार निगरानी अर संतुलित खाद देणा जारी राक्खो।",
    },
  },
];

const imageInput = document.getElementById("image-input");
const imagePreview = document.getElementById("image-preview");
const analyzeBtn = document.getElementById("analyze-btn");
const resultCard = document.getElementById("result");
const listenBtn = document.getElementById("listen-btn");

let lastResultText = "";

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  imagePreview.src = url;
  imagePreview.style.display = "block";
  resultCard.classList.remove("show");
});

/**
 * Simulated classification step. Replace this with a real model call:
 *
 *   async function classifyImage(file) {
 *     const formData = new FormData();
 *     formData.append("image", file);
 *     const res = await fetch("/api/detect-disease", { method: "POST", body: formData });
 *     return await res.json(); // { id, confidence, ... }
 *   }
 */
async function classifyImage(file) {
  // Simulate network/inference latency.
  await new Promise((resolve) => setTimeout(resolve, 900));
  const pick = DISEASE_DB[Math.floor(Math.random() * DISEASE_DB.length)];
  return pick;
}

analyzeBtn.addEventListener("click", async () => {
  const file = imageInput.files[0];
  if (!file) {
    imageInput.focus();
    return;
  }

  analyzeBtn.disabled = true;
  const originalLabel = analyzeBtn.textContent;
  analyzeBtn.textContent = translations[currentLang].analyzing;

  const result = await classifyImage(file);
  renderResult(result);

  analyzeBtn.disabled = false;
  analyzeBtn.textContent = originalLabel;
});

function renderResult(result) {
  const dict = translations[currentLang];
  const lang = currentLang;

  document.getElementById("result-disease-name").textContent = result.name[lang];
  document.getElementById("result-description").textContent = result.description[lang];
  document.getElementById("result-remedy-label").textContent =
    lang === "en" ? "Suggested remedy:" : lang === "hi" ? "सुझाया गया उपाय:" : "सुझाया उपाय:";
  document.getElementById("result-remedy").textContent = result.remedy[lang];
  document.getElementById("result-confidence").textContent = `${Math.round(result.confidence * 100)}% confidence (demo)`;

  lastResultText = `${result.name[lang]}. ${result.description[lang]} ${result.remedy[lang]}`;
  resultCard.classList.add("show");
}

listenBtn.addEventListener("click", () => {
  if (lastResultText) speak(lastResultText);
});

// Re-render the result in the new language if the user switches language
// after already getting a diagnosis.
document.addEventListener("langchange", () => {
  const name = document.getElementById("result-disease-name").textContent;
  if (!name) return;
  const match = DISEASE_DB.find((d) => Object.values(d.name).includes(name));
  if (match) renderResult(match);
});
