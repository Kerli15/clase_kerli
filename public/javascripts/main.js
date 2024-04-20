import darkThemeButton from "/javascripts/dark_theme.js";

const doc = document; // Abreviación de document

doc.addEventListener("DOMContentLoaded", (e) => {
  // Delegación de eventos
  scrollTopButton(".scroll-top-btn");
});

darkThemeButton(".dark-theme-btn", ".dark-theme-i");

/* Scroll Top Button */

function scrollTopButton(btn) {
  const $scrollBtn = doc.querySelector(btn);
  window.addEventListener("scroll", (e) => {
    let scrollTop = window.pageYOffset || doc.documentElement.scrollTop;

    if (scrollTop > 150) {
      $scrollBtn.classList.remove("hidden");
    } else {
      $scrollBtn.classList.add("hidden");
    }
  });
  doc.addEventListener("click", (e) => {
    if (e.target.matches(btn)) {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    }
  });
}

/* Scale CV */
function scaleCV() {
  doc.body.classList.add("scale-cv");
}

function removeScale() {
  doc.body.classList.remove("scale-cv");
}
