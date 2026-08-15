// schemes.js — Government schemes browser.
//
// This uses a curated, hand-maintained dataset for the demo. In a fuller
// version this could instead pull from data.gov.in / MyScheme APIs, or a
// backend that periodically syncs a scheme dataset.

const SCHEMES_DB = [
  {
    id: "pm_kisan",
    tag: "Income Support",
    name: {
      en: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      hi: "पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)",
      hry: "पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)",
    },
    description: {
      en: "Provides ₹6,000 per year in three installments directly to eligible farmer families.",
      hi: "पात्र किसान परिवारों को सीधे तीन किस्तों में सालाना ₹6,000 प्रदान करता है।",
      hry: "पात्र किसान परिवारां नै सीधे तीन किस्तां म्ह साल का ₹6,000 देवै सै।",
    },
    link: "https://pmkisan.gov.in",
  },
  {
    id: "pmfby",
    tag: "Insurance",
    name: {
      en: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
      hi: "पीएमएफबीवाई (प्रधानमंत्री फसल बीमा योजना)",
      hry: "पीएमएफबीवाई (प्रधानमंत्री फसल बीमा योजना)",
    },
    description: {
      en: "Crop insurance scheme covering losses from natural calamities, pests, and diseases.",
      hi: "प्राकृतिक आपदा, कीट व बीमारी से होने वाले नुकसान को कवर करने वाली फसल बीमा योजना।",
      hry: "कुदरती आफत, कीड़े-मकोड़े अर बीमारी तै होण आळे नुकसान नै कवर करण आळी फसल बीमा योजना।",
    },
    link: "https://pmfby.gov.in",
  },
  {
    id: "kcc",
    tag: "Credit",
    name: {
      en: "Kisan Credit Card (KCC)",
      hi: "किसान क्रेडिट कार्ड (केसीसी)",
      hry: "किसान क्रेडिट कार्ड (केसीसी)",
    },
    description: {
      en: "Provides farmers with timely access to short-term credit at low interest rates.",
      hi: "किसानों को कम ब्याज दर पर समय पर अल्पकालिक र्ण उपलब्ध कराता है।",
      hry: "किसानां नै घट ब्याज पै बखत पै छोट्टे बखत का कर्जा देवै सै।",
    },
    link: "https://www.myscheme.gov.in/schemes/kcc",
  },
  {
    id: "pm_kusum",
    tag: "Solar / Energy",
    name: {
      en: "PM-KUSUM",
      hi: "पीएम-कुसुम",
      hry: "पीएम-कुसुम",
    },
    description: {
      en: "Supports installation of solar pumps and grid-connected solar plants for farmers.",
      hi: "किसानों के लिए सोलर पंप और ग्रिड से जुड़े सोलर प्लांट लगाने में सहायता करता है।",
      hry: "किसानां खात्तर सोलर पंप अर ग्रिड तै जुड़े सोलर प्लांट लगाण म्ह मदद करै सै।",
    },
    link: "https://pmkusum.mnre.gov.in",
  },
  {
    id: "soil_health_card",
    tag: "Soil / Advisory",
    name: {
      en: "Soil Health Card Scheme",
      hi: "मृदा स्वास्थ्य कार्ड योजना",
      hry: "मिट्टी सेहत कार्ड योजना",
    },
    description: {
      en: "Provides farmers with soil nutrient reports and crop-wise fertilizer recommendations.",
      hi: "किसानों को मिट्टी पोषक तत्व रिपोर्ट और फसल-वार उर्वरक सिफारिशें प्रदान करता है।",
      hry: "किसानां नै मिट्टी के पोषक तत्वां री रिपोर्ट अर फसल मुताबिक खाद की सलाह देवै सै।",
    },
    link: "https://soilhealth.dac.gov.in",
  },
  {
    id: "enam",
    tag: "Market Access",
    name: {
      en: "e-NAM (National Agriculture Market)",
      hi: "ई-नाम (राष्ट्रीय कृषि बाजार)",
      hry: "ई-नाम (राष्ट्रीय कृषि बाजार)",
    },
    description: {
      en: "An online trading platform connecting existing mandis for better price discovery.",
      hi: "बेहतर मूल्य निर्धारण के लिए मौजूदा मंडियों को जोड़ने वाला ऑनलाइन ट्रेडिंग प्लेटफॉर्म।",
      hry: "मंडियां नै जोड़ के बढ़िया भाव दिलाण आळा ऑनलाइन ट्रेडिंग प्लेटफार्म।",
    },
    link: "https://enam.gov.in",
  },
];

const searchInput = document.getElementById("scheme-search");
const resultsWrap = document.getElementById("scheme-results");

function renderSchemes(list) {
  const dict = translations[currentLang];
  const lang = currentLang;
  resultsWrap.innerHTML = "";

  if (list.length === 0) {
    resultsWrap.innerHTML = `<p class="page-subtitle">No matching schemes found.</p>`;
    return;
  }

  list.forEach((scheme) => {
    const card = document.createElement("div");
    card.className = "panel scheme-card";
    card.innerHTML = `
      <span class="scheme-tag">${scheme.tag}</span>
      <h4>${scheme.name[lang]}</h4>
      <p>${scheme.description[lang]}</p>
      <a class="scheme-link" href="${scheme.link}" target="_blank" rel="noopener">${dict.learn_more} →</a>
    `;
    resultsWrap.appendChild(card);
  });
}

function filterSchemes(query) {
  const q = query.trim().toLowerCase();
  if (!q) return SCHEMES_DB;
  return SCHEMES_DB.filter((scheme) => {
    const haystack = [
      scheme.tag,
      scheme.name.en,
      scheme.name.hi,
      scheme.description.en,
      scheme.description.hi,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

searchInput.addEventListener("input", () => {
  renderSchemes(filterSchemes(searchInput.value));
});

document.addEventListener("DOMContentLoaded", () => {
  renderSchemes(SCHEMES_DB);
});

document.addEventListener("langchange", () => {
  renderSchemes(filterSchemes(searchInput.value));
});
