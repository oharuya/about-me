(() => {
  "use strict";

  const tracks = [
    { title: "INTRO — MY LIFE, MY RHYTHM", duration: 184 },
    { title: "PROFILE — WHO I AM", duration: 198 },
    { title: "BANDS — FAVORITE SOUND", duration: 215 },
    { title: "NOVELS — BETWEEN THE LINES", duration: 206 },
    { title: "SPORTS — KEEP MOVING", duration: 192 },
    { title: "CONTACT — LEAVE A MESSAGE", duration: 176 }
  ];

  const body = document.body;
  const playToggle = document.querySelector("[data-player-toggle]");
  const playIcon = document.querySelector("[data-play-icon]");
  const trackTitle = document.querySelector("[data-track-title]");
  const currentTime = document.querySelector("[data-current-time]");
  const totalTime = document.querySelector("[data-total-time]");
  const progressTrack = document.querySelector("[data-progress-track]");
  const progressFill = document.querySelector("[data-progress-fill]");
  const toast = document.querySelector("[data-toast]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  let toastTimer;
  let timer;

  const pageIndex = Number(body.dataset.track || 0);
  let trackIndex = Number(sessionStorage.getItem("h-track-index"));
  if (!Number.isFinite(trackIndex) || trackIndex < 0 || trackIndex >= tracks.length) {
    trackIndex = pageIndex;
  }
  let elapsed = Number(sessionStorage.getItem("h-track-time")) || 0;
  let playing = sessionStorage.getItem("h-player-state") === "playing";

  const formatTime = (seconds) => {
    const safeSeconds = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(safeSeconds / 60);
    return `${minutes}:${String(safeSeconds % 60).padStart(2, "0")}`;
  };

  const savePlayer = () => {
    sessionStorage.setItem("h-track-index", String(trackIndex));
    sessionStorage.setItem("h-track-time", String(elapsed));
    sessionStorage.setItem("h-player-state", playing ? "playing" : "paused");
  };

  const renderPlayer = () => {
    const track = tracks[trackIndex];
    const percent = Math.min(100, (elapsed / track.duration) * 100);
    if (trackTitle) trackTitle.textContent = track.title;
    if (currentTime) currentTime.textContent = formatTime(elapsed);
    if (totalTime) totalTime.textContent = formatTime(track.duration);
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (playIcon) playIcon.textContent = playing ? "Ⅱ" : "▶";
    if (playToggle) playToggle.setAttribute("aria-label", playing ? "一時停止" : "再生");
    body.classList.toggle("is-playing", playing);
  };

  const startTimer = () => {
    window.clearInterval(timer);
    if (!playing) return;
    timer = window.setInterval(() => {
      elapsed += 1;
      if (elapsed >= tracks[trackIndex].duration) {
        trackIndex = (trackIndex + 1) % tracks.length;
        elapsed = 0;
      }
      renderPlayer();
      savePlayer();
    }, 1000);
  };

  const togglePlayer = () => {
    playing = !playing;
    renderPlayer();
    savePlayer();
    startTimer();
  };

  const changeTrack = (direction) => {
    trackIndex = (trackIndex + direction + tracks.length) % tracks.length;
    elapsed = 0;
    renderPlayer();
    savePlayer();
  };

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3600);
  };

  window.addEventListener("DOMContentLoaded", () => {
    window.requestAnimationFrame(() => body.classList.add("is-ready"));
    renderPlayer();
    startTimer();
  });

  playToggle?.addEventListener("click", togglePlayer);
  document.querySelector("[data-player-prev]")?.addEventListener("click", () => changeTrack(-1));
  document.querySelector("[data-player-next]")?.addEventListener("click", () => changeTrack(1));

  progressTrack?.addEventListener("click", (event) => {
    const bounds = progressTrack.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    elapsed = ratio * tracks[trackIndex].duration;
    renderPlayer();
    savePlayer();
  });

  menuToggle?.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== " " || event.repeat) return;
    const tagName = document.activeElement?.tagName;
    if (["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(tagName)) return;
    event.preventDefault();
    togglePlayer();
  });

  document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
<<<<<<< HEAD
    link.addEventListener("click", () => {
      showToast("Youtubeを開いています");
=======
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("ここに公式の音楽再生リンクを設定できます。現在はプレースホルダーです。");
>>>>>>> e5dada576489e52202fa37e05b101ba4de843a2c
    });
  });

  document.querySelectorAll("[data-demo-track]").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.demoTrack || "FAVORITE TRACK";
      trackIndex = 2;
      elapsed = 0;
      playing = true;
      renderPlayer();
      savePlayer();
      startTimer();
<<<<<<< HEAD
      showToast(`${selected} のビジュアル再生を開始しました。ミュージックリンクは「Youtubeで再生」から。`);
=======
      showToast(`${selected} のビジュアル再生を開始しました。音源リンクは後から設定できます。`);
>>>>>>> e5dada576489e52202fa37e05b101ba4de843a2c
    });
  });

  const contactForm = document.querySelector("[data-contact-form]");
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("入力内容は送信されません。このフォームはテキスト入力専用です。");
  });

  const draftFields = document.querySelectorAll("[data-draft-field]");
  draftFields.forEach((field) => {
    const key = `h-contact-${field.name}`;
    const saved = sessionStorage.getItem(key);
    if (saved) field.value = saved;
    field.addEventListener("input", () => sessionStorage.setItem(key, field.value));
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

  window.addEventListener("beforeunload", savePlayer);
})();
