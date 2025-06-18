// FINAL FIX script.js - Hanya Info Gunung, Tanpa Gambar & Video

window.addEventListener("DOMContentLoaded", () => {
  const translations = {
    en: {
      welcome: "Welcome to Rintis Arah",
      community: "Nature Lovers & Hikers Community",
      shareStory: "Share Your Hiking Story",
      info: "Mountain Info",
      notfound: "Mountain not found. Try 'merbabu' or 'rinjani'."
    },
    id: {
      welcome: "Selamat Datang di Rintis Arah",
      community: "Komunitas Pecinta Alam dan Pendaki Gunung",
      shareStory: "Bagikan Cerita Pendakianmu",
      info: "Informasi Gunung",
      notfound: "Gunung tidak ditemukan. Coba ketik 'merbabu' atau 'rinjani'."
    }
 


  let mountainData = {};
  let currentLang = "id";

  fetch('mountains.json')
    .then(res => res.json())
    .then(data => mountainData = data)
    .catch(err => console.error('Failed to load JSON:', err));

  function switchLanguage(lang) {
    currentLang = lang;
    document.querySelector("#beranda h2").textContent = translations[lang].welcome;
    document.querySelector("#beranda p").textContent = translations[lang].community;
    document.querySelector("#infoSection h2").textContent = translations[lang].info;
    document.querySelector("#form-cerita h2").textContent = translations[lang].shareStory;
    handleSearch();
  }

  async function handleSearch(query = null) {
    const input = query || document.getElementById("unifiedSearch").value.trim().toLowerCase();
    const infoBox = document.getElementById("mountainInfo");
    const simaksiBox = document.getElementById("simaksiResult");
    const weatherBox = document.getElementById("weatherResult");
    const transportBox = document.getElementById("transportResult");
    const mapBox = document.getElementById("mapContainer");
    const resultSection = document.getElementById("searchResult") || createResultSection();
    resultSection.innerHTML = "";

    const result = mountainData[input];
    if (result) {
      const content = result[currentLang];
      infoBox.textContent = content.info;
      simaksiBox.textContent = "Simaksi: " + content.simaksi;
      weatherBox.textContent = "Cuaca: " + content.weather;
      transportBox.textContent = "Transportasi: " + content.transport;
      mapBox.innerHTML = `<iframe class='map-frame' src="${content.map}&output=embed" allowfullscreen></iframe>`;
    } else {
      infoBox.textContent = translations[currentLang].notfound;
      simaksiBox.textContent = weatherBox.textContent = transportBox.textContent = "";
      mapBox.innerHTML = "";
      resultSection.innerHTML = "";
    }
  }

  function createResultSection() {
    const section = document.createElement("section");
    section.className = "frame animate";
    section.id = "searchResult";
    document.querySelector("main").insertBefore(section, document.getElementById("form-cerita"));
    return section;
  }

  function searchFromGallery(gunung) {
    document.getElementById("unifiedSearch").value = gunung;
    handleSearch(gunung);
  }

  document.getElementById("unifiedSearch").addEventListener("keydown", e => {
    if (e.key === "Enter") handleSearch();
  });

  document.getElementById("toggleTheme").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.getElementById("toggleTheme").textContent =
      document.body.classList.contains("light-mode") ? "🌞" : "🌙";
  });

  document.getElementById("languageSelect").addEventListener("change", (e) => {
    switchLanguage(e.target.value);
  });

  document.getElementById("hamburger").addEventListener("click", () => {
    document.getElementById("navMenu").classList.toggle("show");
  });

  document.getElementById("storyForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Cerita kamu berhasil dikirim!");
    e.target.reset();
  });

  window.searchFromGallery = searchFromGallery;
  window.handleSearch = handleSearch;

  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.display = "none";
    });
  }
});
