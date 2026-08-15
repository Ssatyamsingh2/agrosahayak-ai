// shops.js — Fertilizer/agriculture shop finder.
//
// Google's Places API can't be called directly from client-side JS for this
// use case (it needs a server-side key and has CORS restrictions), so the
// real integration point is a small backend endpoint, e.g.:
//
//   GET /api/shops?lat=<lat>&lng=<lng>
//   → proxies to Google Places "Nearby Search" and returns JSON
//
// fetchNearbyShops() below tries that endpoint first and, if it's not
// available (as in this static demo), falls back to a bundled sample
// dataset of fertilizer shops in Haryana so the page stays fully demoable.

const DEMO_SHOPS = [
  {
    name: "Krishi Kendra Fertilizers",
    address: "Main Bazar, Sonipat, Haryana",
    phone: "+91 98120 00001",
    rating: 4.3,
    open: true,
    lat: 28.9931,
    lng: 77.0151,
  },
  {
    name: "Haryana Beej Bhandar",
    address: "Grain Market Road, Panipat, Haryana",
    phone: "+91 98120 00002",
    rating: 4.0,
    open: true,
    lat: 29.3909,
    lng: 76.9635,
  },
  {
    name: "Kisan Agro Center",
    address: "Delhi Road, Rohtak, Haryana",
    phone: "+91 98120 00003",
    rating: 4.5,
    open: false,
    lat: 28.8955,
    lng: 76.6066,
  },
  {
    name: "Green Field Fertilizer & Seeds",
    address: "Old Bus Stand, Jind, Haryana",
    phone: "+91 98120 00004",
    rating: 3.9,
    open: true,
    lat: 29.3157,
    lng: 76.3145,
  },
];

const locationInput = document.getElementById("location-input");
const useLocationBtn = document.getElementById("use-location-btn");
const searchBtn = document.getElementById("search-btn");
const resultsWrap = document.getElementById("shop-results");

async function fetchNearbyShops(lat, lng, place) {
  try {
    const res = await fetch(`/api/shops?lat=${lat}&lng=${lng}`);
    if (res.ok) return await res.json();
  } catch (err) {
    // Backend not available in this static demo — fall through to sample data.
  }
  return DEMO_SHOPS;
}

function renderShops(shops) {
  const dict = translations[currentLang];
  resultsWrap.innerHTML = "";

  shops.forEach((shop) => {
    const card = document.createElement("div");
    card.className = "shop-card";

    const mapsUrl = shop.lat
      ? `https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.address)}`;

    card.innerHTML = `
      <div class="shop-info">
        <h4>${shop.name}</h4>
        <div class="meta">${shop.address}</div>
        <div class="meta">⭐ ${shop.rating} &nbsp;•&nbsp;
          <span class="${shop.open ? "status-open" : "status-closed"}">
            ${shop.open ? "Open now" : "Closed"}
          </span>
        </div>
        <div class="meta">📞 ${shop.phone}</div>
      </div>
      <a class="directions-link" href="${mapsUrl}" target="_blank" rel="noopener">
        ${dict.get_directions}
      </a>
    `;
    resultsWrap.appendChild(card);
  });
}

async function runSearch(lat, lng, place) {
  resultsWrap.innerHTML = `<p class="page-subtitle">…</p>`;
  const shops = await fetchNearbyShops(lat, lng, place);
  renderShops(shops);
}

searchBtn.addEventListener("click", () => {
  const place = locationInput.value.trim();
  runSearch(null, null, place);
});

useLocationBtn.addEventListener("click", () => {
  if (!("geolocation" in navigator)) {
    runSearch(null, null, "");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      runSearch(latitude, longitude, "");
    },
    () => {
      // Permission denied or unavailable — fall back to sample data.
      runSearch(null, null, "");
    }
  );
});

// Show sample results on first load so the page isn't empty.
document.addEventListener("DOMContentLoaded", () => {
  renderShops(DEMO_SHOPS);
});

document.addEventListener("langchange", () => {
  renderShops(DEMO_SHOPS);
});
