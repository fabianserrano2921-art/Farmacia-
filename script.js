/* ===== Sueroterapia (Aura Theme) — Script ===== */

// ---------- Tailwind Config ----------
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "outline": "#828178",
        "on-primary-fixed-variant": "#5c4d74",
        "on-tertiary-fixed-variant": "#704b4b",
        "surface-dim": "#e6e2d8",
        "inverse-primary": "#e2cffe",
        "surface-tint": "#6d5d85",
        "on-secondary-fixed-variant": "#436161",
        "on-surface": "#393831",
        "surface-container-high": "#f1eee5",
        "surface-bright": "#fffbff",
        "outline-variant": "#bcb9b0",
        "on-primary": "#ffffff",
        "on-secondary-container": "#395757",
        "secondary": "#4c6a6a",
        "on-tertiary-fixed": "#502f30",
        "tertiary": "#815a5b",
        "on-error": "#ffffff",
        "inverse-on-surface": "#9f9d97",
        "on-surface-variant": "#66645d",
        "primary-dim": "#605179",
        "secondary-container": "#c8e9e9",
        "surface": "#fffbff",
        "on-tertiary": "#ffffff",
        "primary": "#6d5d85",
        "on-secondary-fixed": "#274445",
        "tertiary-container": "#fecbcb",
        "on-background": "#393831",
        "error-dim": "#6b0221",
        "on-primary-container": "#52446a",
        "surface-container-highest": "#ebe8de",
        "surface-container-low": "#fdf9f1",
        "tertiary-fixed-dim": "#efbdbd",
        "background": "#fffbff",
        "error-container": "#f97386",
        "surface-container": "#f7f3eb",
        "primary-fixed-dim": "#d4c1ef",
        "on-secondary": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "primary-container": "#e2cffe",
        "on-tertiary-container": "#654142",
        "tertiary-dim": "#744e4f",
        "inverse-surface": "#0f0e0b",
        "secondary-dim": "#405d5e",
        "error": "#af3b50",
        "on-primary-fixed": "#3f3156",
        "surface-variant": "#ebe8de",
        "tertiary-fixed": "#fecbcb",
        "on-error-container": "#6e0523",
        "secondary-fixed-dim": "#badbdb",
        "secondary-fixed": "#c8e9e9",
        "primary-fixed": "#e2cffe"
      },
      fontFamily: {
        "headline": ["Noto Serif"],
        "body": ["Manrope"],
        "label": ["Manrope"]
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
    },
  },
};

// ---------- WhatsApp helper ----------
const WA_NUMBER = "50660024222";

function openWhatsApp(message) {
  const encoded = encodeURIComponent(message || "Hola, me gustaría agendar una cita en Sueroterapia.");
  window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, "_blank");
}

// ---------- DOM Ready ----------
document.addEventListener("DOMContentLoaded", () => {

  // ---- Nav drawer ----
  const menuBtn = document.getElementById("menu-btn");
  const drawer  = document.getElementById("nav-drawer");
  const overlay = document.getElementById("drawer-overlay");

  function openDrawer() {
    if (drawer && overlay) {
      drawer.classList.remove("-translate-x-full");
      overlay.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  }
  function closeDrawer() {
    if (drawer && overlay) {
      drawer.classList.add("-translate-x-full");
      overlay.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  if (menuBtn) menuBtn.addEventListener("click", openDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);

  // ---- Smooth-scroll for anchors ----
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      closeDrawer();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ---- Scroll-reveal (IntersectionObserver) ----
  const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
  if (reveals.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(el => obs.observe(el));
  }

  // ---- Header shrink ----
  const nav = document.querySelector("nav.fixed");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("shadow-md", window.scrollY > 60);
    }, { passive: true });
  }

  // ---- Treatment buttons → WhatsApp ----
  document.querySelectorAll("[data-treatment]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      openWhatsApp(`Hola, me interesa el tratamiento: ${btn.getAttribute("data-treatment")}. ¿Me puede dar más información?`);
    });
  });

  // ---- Generic WhatsApp buttons ----
  document.querySelectorAll("[data-wa]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      openWhatsApp(btn.getAttribute("data-wa"));
    });
  });

  // ---- Promo buttons → WhatsApp ----
  document.querySelectorAll("[data-promo]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      openWhatsApp(`Hola, me interesa la promoción: ${btn.getAttribute("data-promo")}. ¿Está disponible?`);
    });
  });

});