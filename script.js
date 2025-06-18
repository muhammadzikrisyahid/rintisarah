// FINAL FIX script.js - Galeri Slider Dinamis, Tombol Navigasi, Video Otomatis

window.addEventListener("DOMContentLoaded", () => {
  const translations = {
    en: {
      welcome: "Welcome to Rintis Arah",
      community: "Nature Lovers & Hikers Community",
      shareStory: "Share Your Hiking Story",
      info: "Mountain Info",
      gallery: "Mountain Gallery",
      video: "Video Documentation",
      notfound: "Mountain not found. Try 'merbabu' or 'rinjani'."
    },
    id: {
      welcome: "Selamat Datang di Rintis Arah",
      community: "Komunitas Pecinta Alam dan Pendaki Gunung",
      shareStory: "Bagikan Cerita Pendakianmu",
      info: "Informasi Gunung",
      gallery: "Galeri Gunung",
      video: "Video Dokumentasi",
      notfound: "Gunung tidak ditemukan. Coba ketik 'merbabu' atau 'rinjani'."
    }
  };

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

      const galleryTitle = document.createElement("h2");
      galleryTitle.textContent = translations[currentLang].gallery;
      const slider = createImageSlider(input);

      const videoTitle = document.createElement("h2");
      videoTitle.textContent = translations[currentLang].video;
      const videoBlock = createVideoBlock(input);

      resultSection.appendChild(galleryTitle);
      resultSection.appendChild(slider);
      resultSection.appendChild(videoTitle);
      resultSection.appendChild(videoBlock);
    } else {
      infoBox.textContent = translations[currentLang].notfound;
      simaksiBox.textContent = weatherBox.textContent = transportBox.textContent = "";
      mapBox.innerHTML = "";
      resultSection.innerHTML = "";
    }
  }

  function createImageSlider(folderName) {
    const sliderContainer = document.createElement("div");
    sliderContainer.className = "slider-container";
    const track = document.createElement("div");
    track.className = "slider-track";

    for (let i = 1; i <= 10; i++) {
      const img = new Image();
      img.src = `images/${folderName}/${i}.jpg`;
      img.className = "slider-image";
      img.onerror = () => {};
      track.appendChild(img);
    }

    let index = 0;
    const leftBtn = document.createElement("button");
    const rightBtn = document.createElement("button");
    leftBtn.className = "slider-button left";
    rightBtn.className = "slider-button right";
    leftBtn.textContent = "❮";
    rightBtn.textContent = "❯";

    leftBtn.onclick = () => {
      if (index > 0) index--;
      track.style.transform = `translateX(-${index * 100}%)`;
    };
    rightBtn.onclick = () => {
      if (index < track.childElementCount - 1) index++;
      track.style.transform = `translateX(-${index * 100}%)`;
    };

    sliderContainer.appendChild(leftBtn);
    sliderContainer.appendChild(track);
    sliderContainer.appendChild(rightBtn);

    return sliderContainer;
  }

  function createVideoBlock(folderName) {
    const container = document.createElement("div");
    container.className = "video-container";
    for (let i = 1; i <= 5; i++) {
      const videoPath = `videos/${folderName}/${i}.mp4`;
      const video = document.createElement("video");
      video.setAttribute("controls", true);
      video.setAttribute("width", "100%");
      const source = document.createElement("source");
      source.src = videoPath;
      source.type = "video/mp4";
      video.appendChild(source);
      container.appendChild(video);
    }
    return container;
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
