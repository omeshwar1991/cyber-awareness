
// particlesJS setup
particlesJS("particles-js", {
  particles: {
    number: { value: 90 },
    color: { value: "#00ffcc" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 140,
      color: "#00ffcc",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: "none",
      out_mode: "bounce"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" }
    },
    modes: {
      repulse: { distance: 100 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

// Popup logic
const openBtn = document.getElementById("openBtn");
const popup = document.getElementById("popupForm");
const closeBtn = document.getElementById("closeBtn");

openBtn.addEventListener("click", () => {
  popup.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  popup.classList.remove("active");
});

window.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    popup.classList.remove("active");
  }
});
