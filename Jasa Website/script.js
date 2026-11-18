// =============================
// RFWS CONFIGURATION
// Ganti nomor di bawah dengan nomor WhatsApp bisnis kamu.
// Format: kode negara tanpa + atau spasi. Contoh Indonesia: 62812xxxxxxxx
// =============================
const WHATSAPP_NUMBER = "6281234567890";

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
menuBtn?.addEventListener("click", () => {
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
  nav.style.position = "absolute";
  nav.style.top = "78px";
  nav.style.left = "0";
  nav.style.right = "0";
  nav.style.padding = "20px 24px";
  nav.style.background = "#0b0d10";
  nav.style.flexDirection = "column";
  nav.style.borderBottom = "1px solid #25272e";
});

document.getElementById("projectForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const type = document.getElementById("type").value;
  const message = document.getElementById("message").value.trim();

  const text =
`Halo RFWS! Saya ${name}.

Saya tertarik dengan jasa: ${type}.

Kebutuhan saya:
${message}

Saya ingin konsultasi mengenai scope, fitur, estimasi waktu, dan penawaran project.`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
