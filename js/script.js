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

/* // =========================================================
// CONTACT FORM — client-side only (no backend attached yet).
// See the README for how to wire this up to Formspree / EmailJS
// so messages actually reach your inbox.
// =========================================================
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    // e.preventDefault();
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
    //contactForm.reset();
  });
}

function showStatus(el, text, kind) {
  if (!el) return;
  el.textContent = text;
  el.classList.remove("ok", "err");
  el.classList.add("show", kind);
} */

/*   // =========================================================
// CONTACT FORM — sends to Formspree via fetch
// =========================================================
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop default submission

    // Get field values
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Client-side validation
    if (!name || !email || !message) {
      showStatus(formStatus, "⚠️ Please fill out every field.", "err");
      return;
    }
    if (!emailPattern.test(email)) {
      showStatus(formStatus, "⚠️ Please enter a valid email address.", "err");
      return;
    }

    // Build FormData from the form
    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        showStatus(formStatus, "✅ Message sent successfully! I'll get back to you soon.", "ok");
        contactForm.reset(); // clear fields only after success
      } else {
        // Handle Formspree's "empty form" or other errors
        if (data.error === "empty_form") {
          showStatus(formStatus, "⚠️ Form cannot be empty. Please fill all fields.", "err");
        } else {
          showStatus(formStatus, "❌ Something went wrong. Please try again later.", "err");
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
      showStatus(formStatus, "❌ Network error – please check your connection.", "err");
    }
  });
}

// Helper to show status messages
function showStatus(el, text, kind) {
  if (!el) return;
  el.textContent = text;
  el.className = "form-status show " + kind; // 'ok' or 'err'
}
 */

// =========================================================
// CONTACT FORM — sends to Formspree via fetch (JSON)
// =========================================================
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Use the form from the event
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Client-side validation
    if (!name || !email || !message) {
      showStatus(formStatus, "⚠️ Please fill out every field.", "err");
      return;
    }
    if (!emailPattern.test(email)) {
      showStatus(formStatus, "⚠️ Please enter a valid email address.", "err");
      return;
    }

    // Build the data object
    const payload = { name, email, message };
    console.log("📤 Sending to Formspree:", payload); // ← DEBUG

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("📥 Response from Formspree:", data); // ← DEBUG

      if (response.ok) {
        showStatus(formStatus, "✅ Message sent successfully! I'll get back to you soon.", "ok");
        form.reset();
      } else {
        // Formspree error messages
        if (data.error === "empty_form") {
          showStatus(formStatus, "⚠️ Form cannot be empty. Please fill all fields.", "err");
        } else {
          showStatus(formStatus, `❌ ${data.error || "Something went wrong. Please try again."}`, "err");
        }
      }
    } catch (error) {
      console.error("❌ Submit error:", error);
      showStatus(formStatus, "❌ Network error – please check your connection.", "err");
    }
  });
}

// Helper to show status messages (keep this if not already defined)
function showStatus(el, text, kind) {
  if (!el) return;
  el.textContent = text;
  el.className = "form-status show " + kind; // 'ok' or 'err'
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
