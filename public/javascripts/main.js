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

const FormularioAbrirbtn=
document.querySelector("#formulario-abrir-btn");
const FormularioCerrarbtn=
document.querySelector("#formulario-cerrar-btn");
const modal=
document.querySelector("#modal");

FormularioAbrirbtn.addEventListener("click", ()=>{
  modal.showModal();
})

FormularioCerrarbtn.addEventListener("click", ()=>{
  modal.close();
})

const ContactoAbrirbtn=
document.querySelector("#contacto-abrir-btn");
const ContactoCerrarbtn=
document.querySelector("#contacto-cerrar-btn");
const ventana=
document.querySelector("#ventana");

ContactoAbrirbtn.addEventListener("click", ()=>{
  ventana.showModal();
})

ContactoCerrarbtn.addEventListener("click", ()=>{
  ventana.close();
})
