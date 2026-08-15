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
// dataset of fertilizer shops spanning multiple Indian states so the page
// stays fully demoable for any location the user types, not just one region.

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
    name: "Punjab Agro Traders",
    address: "Model Town, Ludhiana, Punjab",
    phone: "+91 98140 00002",
    rating: 4.2,
    open: true,
    lat: 30.901,
    lng: 75.8573,
  },
  {
    name: "UP Kisan Seva Kendra",
    address: "Civil Lines, Lucknow, Uttar Pradesh",
    phone: "+91 98390 00003",
    rating: 4.1,
    open: false,
    lat: 26.8467,
    lng: 80.9462,
  },
  {
    name: "Rajasthan Beej Bhandar",
    address: "Station Road, Jaipur, Rajasthan",
    phone: "+91 98290 00004",
    rating: 4.4,
    open: true,
    lat: 26.9124,
    lng: 75.7873,
  },
  {
    name: "Krishi Sewa Kendra",
    address: "Sadar Bazar, Indore, Madhya Pradesh",
    phone: "+91 98260 00005",
    rating: 4.0,
    open: true,
    lat: 22.7196,
    lng: 75.8577,
  },
  {
    name: "Maharashtra Fertilizer Depot",
    address: "Shivaji Nagar, Pune, Maharashtra",
    phone: "+91 98220 00006",
    rating: 4.5,
    open: true,
    lat: 18.5308,
    lng: 73.8478,
  },
  {
    name: "Karnataka Agro Center",
    address: "Yeshwanthpur, Bengaluru, Karnataka",
    phone: "+91 98450 00007",
    rating: 4.3,
    open: false,
    lat: 13.0284,
    lng: 77.5541,
  },
  {
    name: "Tamil Nadu Uzhavar Angadi Supplies",
    address: "Koyambedu, Chennai, Tamil Nadu",
    phone: "+91 98940 00008",
    rating: 4.2,
    open: true,
    lat: 13.0732,
    lng: 80.1946,
  },
  {
    name: "Bengal Krishi Bhandar",
    address: "Burrabazar, Kolkata, West Bengal",
    phone: "+91 98300 00009",
    rating: 3.9,
    open: true,
    lat: 22.5726,
    lng: 88.363,
  },
  {
    name: "Bihar Kisan Mart",
    address: "Gandhi Maidan, Patna, Bihar",
    phone: "+91 98350 00010",
    rating: 4.0,
    open: true,
    lat: 25.6127,
    lng: 85.1445,
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

  // No live backend: if the user typed a place name, filter the sample data
  // by city/state so results feel relevant across all of India rather than
  // always showing the same fixed list.
  if (place) {
    const q = place.trim().toLowerCase();
    const matches = DEMO_SHOPS.filter((shop) => shop.address.toLowerCase().includes(q));
    if (matches.length > 0) return matches;
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
