// =========================================================
// MOBILE NAV TOGGLE
// =========================================================
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  // close menu after clicking a link (mobile)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

// =========================================================
// ACTIVE NAV LINK — highlights the link matching current page
// =========================================================
(function highlightActiveLink() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) link.classList.add("active");
  });
})();

// =========================================================
// SCROLL REVEAL — fades/slides elements with class "reveal" in
// =========================================================
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));
}

// =========================================================
// CONTACT FORM — client-side only (no backend attached yet).
// See the README for how to wire this up to Formspree / EmailJS
// so messages actually reach your inbox.
// =========================================================
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const status = document.querySelector("#form-status");
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      showStatus(status, "Please fill in every field before sending.", "err");
      return;
    }
    if (!emailPattern.test(email)) {
      showStatus(status, "That email address doesn't look right — double check it.", "err");
      return;
    }

    // Placeholder success behavior. Replace with a real submission
    // (Formspree/EmailJS) per the README instructions.
    showStatus(status, "Thanks! This form isn't wired to a backend yet — see the README to connect it, or email me directly below.", "ok");
    contactForm.reset();
  });
}

function showStatus(el, text, kind) {
  if (!el) return;
  el.textContent = text;
  el.classList.remove("ok", "err");
  el.classList.add("show", kind);
}

// =========================================================
// PHOTOGRAPHY PAGE — category filter + lightbox
// =========================================================
const filterBtns = document.querySelectorAll(".filter-btn");
const photoItems = document.querySelectorAll(".photo-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const category = btn.dataset.filter;

    photoItems.forEach((item) => {
      const match = category === "all" || item.dataset.category === category;
      item.style.display = match ? "block" : "none";
    });
  });
});

const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

photoItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    if (!lightbox || !lightboxImg || !img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", () => lightbox.classList.remove("open"));
}
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("open");
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox) lightbox.classList.remove("open");
});
