window.addEventListener("DOMContentLoaded", () => {
  const translations = {
    en: {
      welcome: "Welcome to Rintis Arah",
      community: "Nature Lovers & Hikers Community",
      shareStory: "Share Your Hiking Story",
      info: "Mountain Info",
      notfound: "Mountain not found. Try 'merbabu' or 'rinjani'.",
      about: `
        <h2>About Us</h2>
        <p>Rintis Arah is a community of nature lovers who explore mountains with responsibility and love for the environment. We focus on education, conservation, and meaningful journeys.</p>
        <h3>Vision</h3>
        <p>To create a space for growth and homecoming for young souls seeking direction—through trails, pauses, and meaningful journeys.</p>
        <h3>Mission</h3>
        <p>We believe that caring for nature is caring for ourselves, because protecting the environment is not just an act, but a way to heal and awaken the soul. Through every journey and expedition, we create meaning that shapes perspective and character. We foster a sincere and growing community where differences are celebrated, stories are shared, and friends become family. By turning stories into movement through documentation, we voice values, raise awareness, and inspire change. As a generation that cares deeply, we believe great change starts with small awareness.</p>
      `
    },
    id: {
      welcome: "Selamat Datang di Rintis Arah",
      community: "Komunitas Pecinta Alam dan Pendaki Gunung",
      shareStory: "Bagikan Cerita Pendakianmu",
      info: "Informasi Gunung",
      notfound: "Gunung tidak ditemukan. Coba ketik 'merbabu' atau 'rinjani'.",
      about: `
        <h2>Tentang Kami</h2>
        <p>Rintis Arah adalah komunitas pecinta alam yang menjelajah gunung dengan tanggung jawab dan cinta lingkungan. Kami berfokus pada edukasi, pelestarian, dan perjalanan penuh makna.</p>
        <h3>Visi</h3>
        <p>Membangun ruang tumbuh dan pulang bagi jiwa-jiwa muda yang mencari arah—melalui jejak, jeda, dan perjalanan yang bermakna.</p>
        <h3>Misi</h3>
        <p>Kami percaya bahwa merawat alam adalah merawat diri, karena menjaga lingkungan bukan sekadar aksi, melainkan cara untuk menyembuhkan dan menyadarkan diri. Melalui setiap perjalanan dan ekspedisi, kami mencipta makna yang membentuk perspektif dan karakter. Kami menghidupkan komunitas yang tulus dan terus tumbuh, di mana perbedaan dirayakan, cerita dibagikan, dan teman menjadi keluarga. Dengan mengubah cerita menjadi gerak lewat dokumentasi, kami menyuarakan nilai, membangun kesadaran, dan menginspirasi perubahan. Sebagai generasi yang peduli dan peka terhadap alam, sesama, dan suara hati, kami yakin bahwa perubahan besar selalu berawal dari kesadaran kecil.</p>
      `
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
    
    const tentang = document.getElementById("tentang");
    if (tentang) {
      tentang.innerHTML = translations[lang].about;
    }

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
    const isLight = document.body.classList.contains("light-mode");
    document.getElementById("toggleTheme").textContent = isLight ? "🌞" : "🌙";
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
