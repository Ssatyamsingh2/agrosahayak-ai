// i18n.js — Shared multilingual dictionary for all pages
// Supported languages: English (en), Hindi (hi), Haryanvi (hry)
// Every page includes this file and calls initLanguageSwitcher() on load.

const translations = {
  en: {
    nav_home: "Home",
    nav_disease: "Disease Detection",
    nav_shops: "Shop Finder",
    nav_schemes: "Govt. Schemes",

    // Home page
    hero_title: "AgroSahayak AI — Your Farming Companion",
    hero_subtitle:
      "Built for Indian farmers — detect crop diseases, find nearby fertilizer shops, and discover government schemes, all in your own language.",
    feature_disease_title: "Crop Disease Detection",
    feature_disease_desc: "Upload a photo of your crop or leaf and get a likely diagnosis with remedies — read aloud in your language.",
    feature_shops_title: "Fertilizer Shop Finder",
    feature_shops_desc: "Find nearby agriculture and fertilizer shops with contact details and directions.",
    feature_schemes_title: "Government Schemes",
    feature_schemes_desc: "Browse farmer welfare schemes like PM-KISAN and PMFBY with eligibility and official links.",
    feature_labour_title: "Labour Booking",
    feature_labour_desc: "Book farm labour on demand for sowing, harvesting, and more.",
    feature_expert_title: "Agriculture Expert Booking",
    feature_expert_desc: "Consult an agriculture expert or doctor for crop and soil issues.",
    coming_soon: "Coming soon",

    // Disease detection page
    disease_title: "Crop Disease Detection",
    disease_subtitle: "Upload a clear photo of the affected leaf or crop.",
    upload_label: "Choose an image",
    analyze_btn: "Analyze",
    analyzing: "Analyzing...",
    listen_btn: "🔊 Listen",
    disease_disclaimer:
      "This is a demo classifier for portfolio purposes. It is not a substitute for expert agronomic advice.",

    // Shop finder page
    shops_title: "Fertilizer Shop Finder",
    shops_subtitle: "Find agriculture input shops near you, anywhere in India.",
    location_placeholder: "Enter your city or state",
    use_location_btn: "📍 Use my location",
    search_btn: "Search",
    shops_notice: "Showing sample shop data for demo purposes. Live results require a Google Places API connection.",
    get_directions: "Get Directions",

    // Schemes page
    schemes_title: "Government Schemes for Farmers",
    schemes_subtitle: "Browse and search central and state welfare schemes.",
    search_schemes_placeholder: "Search schemes (e.g. insurance, credit, solar)...",
    learn_more: "Learn more",

    footer_text: "Built for farmers, in their language.",
  },

  hi: {
    nav_home: "होम",
    nav_disease: "रोग पहचान",
    nav_shops: "दुकान खोजें",
    nav_schemes: "सरकारी योजनाएं",

    hero_title: "एग्रोसहायक AI — आपका कृषि साथी",
    hero_subtitle:
      "भारत के किसानों के लिए बनाया गया — फसल रोग पहचानें, नज़दीकी खाद की दुकानें खोजें, और सरकारी योजनाओं की जानकारी पाएं, वो भी अपनी भाषा में।",
    feature_disease_title: "फसल रोग पहचान",
    feature_disease_desc: "अपनी फसल या पत्ती की फोटो अपलोड करें और उपचार सहित संभावित रोग की जानकारी पाएं — अपनी भाषा में सुनें भी।",
    feature_shops_title: "खाद की दुकान खोजें",
    feature_shops_desc: "नज़दीकी कृषि और खाद की दुकानों का पता, संपर्क और रास्ता पाएं।",
    feature_schemes_title: "सरकारी योजनाएं",
    feature_schemes_desc: "PM-KISAN और PMFBY जैसी किसान कल्याण योजनाओं की पात्रता और आधिकारिक लिंक देखें।",
    feature_labour_title: "मजदूर बुकिंग",
    feature_labour_desc: "बुवाई, कटाई और अन्य कामों के लिए खेत मजदूर बुक करें।",
    feature_expert_title: "कृषि विशेषज्ञ बुकिंग",
    feature_expert_desc: "फसल और मिट्टी की समस्याओं के लिए कृषि विशेषज्ञ से सलाह लें।",
    coming_soon: "जल्द आ रहा है",

    disease_title: "फसल रोग पहचान",
    disease_subtitle: "प्रभावित पत्ती या फसल की स्पष्ट फोटो अपलोड करें।",
    upload_label: "एक फोटो चुनें",
    analyze_btn: "जांचें",
    analyzing: "जांच की जा रही है...",
    listen_btn: "🔊 सुनें",
    disease_disclaimer: "यह एक डेमो क्लासिफायर है, पोर्टफोलियो उद्देश्य के लिए। यह विशेषज्ञ कृषि सलाह का विकल्प नहीं है।",

    shops_title: "खाद की दुकान खोजें",
    shops_subtitle: "भारत में कहीं भी अपने नज़दीक कृषि इनपुट की दुकानें खोजें।",
    location_placeholder: "अपना शहर या राज्य लिखें",
    use_location_btn: "📍 मेरी लोकेशन उपयोग करें",
    search_btn: "खोजें",
    shops_notice: "यह डेमो के लिए नमूना दुकान डेटा दिखाया जा रहा है। लाइव परिणामों के लिए Google Places API जुड़ाव आवश्यक है।",
    get_directions: "रास्ता देखें",

    schemes_title: "किसानों के लिए सरकारी योजनाएं",
    schemes_subtitle: "केंद्र और राज्य की कल्याण योजनाएं खोजें और देखें।",
    search_schemes_placeholder: "योजनाएं खोजें (जैसे बीमा, कर्ज, सोलर)...",
    learn_more: "और जानें",

    footer_text: "किसानों के लिए, उनकी अपनी भाषा में बनाया गया।",
  },

  hry: {
    nav_home: "होम",
    nav_disease: "रोग पिच्छाण",
    nav_shops: "दुकान टोहो",
    nav_schemes: "सरकारी योजना",

    hero_title: "एग्रोसहायक AI — थारा खेती का साथी",
    hero_subtitle:
      "भारत के किसानां खात्तर बणाया गया — फसल री बीमारी पिच्छाणो, धोरै की खाद की दुकानां टोहो, अर सरकारी योजनावां की जाणकारी लो, वा भी अपणी भाषा म्ह।",
    feature_disease_title: "फसल रोग पिच्छाण",
    feature_disease_desc: "अपणी फसल या पत्ती की फोटू अपलोड करो अर इलाज समेत बीमारी की जाणकारी पावो — अपणी भाषा म्ह सुणो भी।",
    feature_shops_title: "खाद की दुकान टोहो",
    feature_shops_desc: "धोरै की खेती अर खाद की दुकानां का पता, नंबर अर रस्ता पावो।",
    feature_schemes_title: "सरकारी योजना",
    feature_schemes_desc: "PM-KISAN अर PMFBY जिसी किसान भलाई योजनावां री पात्रता अर लिंक देक्खो।",
    feature_labour_title: "मजदूर बुकिंग",
    feature_labour_desc: "बिजाई, कटाई अर और काम खात्तर खेत मजदूर बुक करो।",
    feature_expert_title: "कृषि माहिर बुकिंग",
    feature_expert_desc: "फसल अर मिट्टी री समस्या खात्तर कृषि माहिर तै सलाह लो।",
    coming_soon: "जल्दी आवैगा",

    disease_title: "फसल रोग पिच्छाण",
    disease_subtitle: "बीमार पत्ती या फसल री साफ फोटू अपलोड करो।",
    upload_label: "एक फोटू चुणो",
    analyze_btn: "जांचो",
    analyzing: "जांच होरी सै...",
    listen_btn: "🔊 सुणो",
    disease_disclaimer: "या एक डेमो क्लासिफायर सै, पोर्टफोलियो खात्तर। या माहिर सलाह की जगह ना सै।",

    shops_title: "खाद की दुकान टोहो",
    shops_subtitle: "भारत म्ह किते भी अपणे धोरै की खेती-सामान दुकानां टोहो।",
    location_placeholder: "अपणा शहर या राज्य लिक्खो",
    use_location_btn: "📍 मेरी लोकेशन बरतो",
    search_btn: "टोहो",
    shops_notice: "या डेमो खात्तर नमूना दुकान डेटा दिखाया जारया सै। लाइव परिणाम खात्तर Google Places API चाहिए।",
    get_directions: "रस्ता देक्खो",

    schemes_title: "किसानां खात्तर सरकारी योजना",
    schemes_subtitle: "केंद्र अर राज्य री भलाई योजनावां टोहो अर देक्खो।",
    search_schemes_placeholder: "योजना टोहो (जिसे बीमा, कर्जा, सोलर)...",
    learn_more: "और जाणो",

    footer_text: "किसानां खात्तर, उनकी अपणी भाषा म्ह बणाया गया।",
  },
};

let currentLang = localStorage.getItem("agrosahayak_lang") || "en";

function applyTranslations(lang) {
  currentLang = translations[lang] ? lang : "en";
  localStorage.setItem("agrosahayak_lang", currentLang);
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
  document.dispatchEvent(new CustomEvent("langchange", { detail: currentLang }));
}

function initLanguageSwitcher() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyTranslations(btn.dataset.lang));
  });
  applyTranslations(currentLang);
}

document.addEventListener("DOMContentLoaded", initLanguageSwitcher);
