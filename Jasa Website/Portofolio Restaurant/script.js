/* =====================================================
   LUMIÈRE MODERN DINING
   JavaScript
===================================================== */


/* ================= HEADER ================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

});


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

  navMenu.classList.toggle("active");

});


document.querySelectorAll(".nav-menu a").forEach(link => {

  link.addEventListener("click", () => {

    navMenu.classList.remove("active");

  });

});


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.12
  }

);


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* ================= MENU FILTER ================= */

const filterButtons =
  document.querySelectorAll(".menu-tabs button");

const menuCards =
  document.querySelectorAll(".menu-card");


filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    menuCards.forEach(card => {

      const category = card.dataset.category;

      if (
        filter === "all" ||
        category === filter
      ) {

        card.classList.remove("hidden");

      } else {

        card.classList.add("hidden");

      }

    });

  });

});


/* ================= MENU MODAL ================= */

const menuModal =
  document.getElementById("menuModal");

const modalClose =
  document.getElementById("modalClose");

const modalTitle =
  document.getElementById("modalTitle");

const modalReserve =
  document.getElementById("modalReserve");


document.querySelectorAll(".menu-plus")
  .forEach(button => {

    button.addEventListener("click", () => {

      modalTitle.textContent =
        button.dataset.menu;

      menuModal.classList.add("show");

      document.body.classList.add("modal-open");

    });

  });


modalClose.addEventListener("click", closeModal);


menuModal.addEventListener("click", event => {

  if (event.target === menuModal) {
    closeModal();
  }

});


function closeModal() {

  menuModal.classList.remove("show");

  document.body.classList.remove("modal-open");

}


modalReserve.addEventListener("click", () => {

  closeModal();

  document
    .getElementById("reservation")
    .scrollIntoView({
      behavior: "smooth"
    });

});


/* ================= TESTIMONIAL ================= */

const testimonials = [

  {
    text:
      "Salah satu pengalaman dining terbaik yang pernah saya rasakan. Makanannya luar biasa dan suasananya benar-benar membuat kami ingin kembali.",
    name:
      "Amanda Putri"
  },

  {
    text:
      "Detail kecil di setiap hidangan benar-benar terasa. Service-nya juga sangat profesional dan suasananya nyaman.",
    name:
      "Raka Pratama"
  },

  {
    text:
      "Tempat yang cocok untuk dinner spesial. Makanannya memorable, interiornya cantik, dan pelayanannya sangat ramah.",
    name:
      "Nadia Aulia"
  }

];


let testimonialIndex = 0;


const testimonialText =
  document.getElementById("testimonialText");

const testimonialName =
  document.getElementById("testimonialName");


function updateTestimonial() {

  testimonialText.style.opacity = "0";
  testimonialName.style.opacity = "0";

  setTimeout(() => {

    testimonialText.textContent =
      `“${testimonials[testimonialIndex].text}”`;

    testimonialName.textContent =
      testimonials[testimonialIndex].name;

    testimonialText.style.opacity = "1";
    testimonialName.style.opacity = "1";

  }, 200);

}


document
  .getElementById("nextTestimonial")
  .addEventListener("click", () => {

    testimonialIndex++;

    if (
      testimonialIndex >= testimonials.length
    ) {

      testimonialIndex = 0;

    }

    updateTestimonial();

  });


document
  .getElementById("prevTestimonial")
  .addEventListener("click", () => {

    testimonialIndex--;

    if (testimonialIndex < 0) {

      testimonialIndex =
        testimonials.length - 1;

    }

    updateTestimonial();

  });


/* ================= RESERVATION ================= */

const reservationForm =
  document.getElementById("reservationForm");

const toast =
  document.getElementById("toast");


reservationForm.addEventListener("submit", event => {

  event.preventDefault();

  const name =
    document.getElementById("name").value;

  const date =
    document.getElementById("date").value;

  const time =
    document.getElementById("time").value;

  const guests =
    document.getElementById("guests").value;


  if (!name || !date || !time || !guests) {

    showToast(
      "Please complete the form",
      "Isi semua data reservasi terlebih dahulu."
    );

    return;

  }


  showToast(
    "Reservation received!",
    `Terima kasih ${name}. Reservasi ${guests} pada ${date}, ${time} berhasil dikirim.`
  );


  reservationForm.reset();

});


/* ================= TOAST ================= */

function showToast(title, message) {

  toast.innerHTML = `
    <strong>${title}</strong>
    <span>${message}</span>
  `;

  toast.classList.add("show");


  setTimeout(() => {

    toast.classList.remove("show");

  }, 4500);

}


/* ================= VIEW FULL MENU ================= */

const viewMenuBtn =
  document.getElementById("viewMenuBtn");


viewMenuBtn.addEventListener("click", () => {

  showToast(
    "Full Menu",
    "Demo portfolio — halaman menu lengkap dapat ditambahkan."
  );

});


/* ================= DATE MINIMUM ================= */

const dateInput =
  document.getElementById("date");

const today =
  new Date().toISOString().split("T")[0];

dateInput.min = today;


/* ================= KEYBOARD ESC ================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeModal();

    navMenu.classList.remove("active");

  }

});


/* ================= SMOOTH LINK ================= */

document.querySelectorAll('a[href^="#"]')
  .forEach(anchor => {

    anchor.addEventListener("click", function(event) {

      const target =
        document.querySelector(
          this.getAttribute("href")
        );

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });