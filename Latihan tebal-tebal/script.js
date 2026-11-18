// ===== 1. Data produk =====
// jumlah = berapa banyak di keranjang (awalnya 0)
const produk = [
  { nama: "Kaos",        harga: 55000,  emoji: "👕", jumlah: 0 },
  { nama: "Topi",        harga: 35000,  emoji: "🧢", jumlah: 0 },
  { nama: "Sepatu",      harga: 250000, emoji: "👟", jumlah: 0 },
  { nama: "Buku Tulis",  harga: 8000,   emoji: "📓", jumlah: 0 },
  { nama: "Tas Sekolah", harga: 120000, emoji: "🎒", jumlah: 0 },
  { nama: "Headset",     harga: 90000,  emoji: "🎧", jumlah: 0 }
];

// ===== 2. Tampilkan produk di halaman =====
function tampilkanProduk() {
  let isi = "";
  for (let i = 0; i < produk.length; i++) {
    isi += `
      <div class="produk">
        <div class="emoji">${produk[i].emoji}</div>
        <h3>${produk[i].nama}</h3>
        <p>Rp ${produk[i].harga}</p>
        <button class="utama" onclick="tambah(${i})">Beli</button>
      </div>`;
  }
  document.getElementById("grid").innerHTML = isi;
}

// ===== 3. Tambah dan kurangi barang =====
function tambah(nomor) {
  produk[nomor].jumlah = produk[nomor].jumlah + 1;
  tampilkanKeranjang();
}

function kurang(nomor) {
  produk[nomor].jumlah = produk[nomor].jumlah - 1;
  tampilkanKeranjang();
}

// ===== 4. Tampilkan isi keranjang =====
function tampilkanKeranjang() {
  let isi = "";
  let total = 0;
  let banyak = 0;

  for (let i = 0; i < produk.length; i++) {
    if (produk[i].jumlah > 0) {
      isi += `
        <div class="baris">
          ${produk[i].nama} x ${produk[i].jumlah}
          <button onclick="kurang(${i})">-</button>
          <button onclick="tambah(${i})">+</button>
        </div>`;
      total = total + produk[i].harga * produk[i].jumlah;
      banyak = banyak + produk[i].jumlah;
    }
  }

  document.getElementById("isi-keranjang").innerHTML = isi;
  document.getElementById("total").textContent = "Rp " + total;
  document.getElementById("tombol-keranjang").textContent = "Keranjang (" + banyak + ")";
}

// ===== 5. Buka, tutup, dan bayar =====
document.getElementById("tombol-keranjang").onclick = function () {
  document.getElementById("keranjang").style.display = "block";
};

document.getElementById("tutup").onclick = function () {
  document.getElementById("keranjang").style.display = "none";
};

document.getElementById("bayar").onclick = function () {
  alert("Terima kasih sudah belanja!");
};

// ===== 6. Jalankan pertama kali =====
tampilkanProduk();
tampilkanKeranjang();