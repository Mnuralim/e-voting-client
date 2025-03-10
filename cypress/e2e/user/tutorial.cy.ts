// describe("Halaman Tutorial", () => {
//   beforeEach(() => {
//     cy.visit("/tutorial");
//   });

//   describe("Tampilan Awal Halaman", () => {
//     it("harus menampilkan halaman tutorial dengan judul yang benar", () => {
//       cy.get("h2").contains("Mulai Sekarang").should("be.visible");
//       cy.get(".grid-cols-1.lg\\:grid-cols-2").should("exist");
//     });

//     it("harus menampilkan semua kategori tutorial", () => {
//       cy.get(".grid-cols-1.lg\\:grid-cols-2 > div").should("have.length", 3);
//       cy.contains("Android").should("be.visible");
//       cy.contains("IOS").should("be.visible");
//       cy.contains("Desktop").should("be.visible");
//     });
//   });

//   describe("Fungsi Navigasi", () => {
//     it("harus membuka menu mobile ketika ikon hamburger diklik pada tampilan mobile", () => {
//       cy.viewport("iphone-6");

//       cy.get(".bg-black\\/30").should("have.class", "left-[-100%]");

//       cy.get("button").find('img[alt="hamburger-white"]').click();

//       cy.get(".bg-black\\/30").should("have.class", "left-0");

//       cy.get("button").find('img[alt="close-button"]').click();

//       cy.get(".bg-black\\/30").should("have.class", "left-[-100%]");
//     });

//     it("harus membuka submenu ketika kategori tutorial diklik", () => {
//       cy.viewport(1280, 800);

//       cy.contains("Android").click();

//       cy.contains("Install Misses Browser").should("be.visible");
//       cy.contains(
//         "Cara Install dan Membuat Akun MetaMask di Misses Browser"
//       ).should("be.visible");
//     });
//   });

//   describe("Pemilihan Tutorial", () => {
//     it("harus menampilkan konten tutorial ketika sub-tutorial dipilih", () => {
//       cy.viewport(1280, 800);

//       cy.contains("Android").click();

//       cy.contains("Install Misses Browser").click();

//       cy.get("h2").contains("Install Misses Browser").should("be.visible");
//       cy.contains(
//         "Installing MetaMask on Google Chrome and Mozilla Firefox is a straightforward process. Follow these steps:"
//       ).should("be.visible");

//       cy.contains("Install Misses Browser").should("be.visible");
//     });

//     it("harus menampilkan tutorial MetaMask dengan langkah-langkah yang benar", () => {
//       cy.viewport(1280, 800);

//       cy.contains("Android").click();

//       cy.contains(
//         "Cara Install dan Membuat Akun MetaMask di Misses Browser"
//       ).click();

//       cy.get("h2")
//         .contains("Cara Install dan Membuat Akun MetaMask di Misses Browser")
//         .should("be.visible");

//       cy.contains(
//         "MetaMask adalah dompet kripto yang memungkinkan Anda mengelola aset kripto dan berinteraksi dengan aplikasi terdesentralisasi (dApps)"
//       ).should("be.visible");

//       cy.contains("Buka Misses Browser dan Akses Chrome Web Store").should(
//         "be.visible"
//       );
//       cy.contains("Klik 'Add to Chrome' untuk Memulai Instalasi").should(
//         "be.visible"
//       );
//     });
//   });

//   describe("Fungsi Komponen Step", () => {
//     it("harus menampilkan langkah-langkah tutorial dengan benar termasuk gambar dan tautan", () => {
//       cy.viewport(1280, 800);

//       cy.contains("Desktop").click();

//       cy.contains("Install MetaMask di Browser Desktop").click();

//       cy.contains("Buka Browser Desktop Anda").should("be.visible");

//       cy.get(
//         'a[href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"]'
//       ).should("exist");

//       cy.get('img[alt="Tunggu Proses Instalasi Selesai"]').should("exist");
//     });
//   });

//   describe("Fungsi Pagination", () => {
//     it("harus dapat berpindah antar tutorial menggunakan tombol navigasi", () => {
//       cy.viewport(1280, 800);

//       cy.contains("Android").click();

//       cy.contains("Install Misses Browser").click();

//       cy.get("h2").contains("Install Misses Browser").should("be.visible");

//       cy.contains(
//         "Cara Install dan Membuat Akun MetaMask di Misses Browser"
//       ).click();

//       cy.get("h2")
//         .contains("Cara Install dan Membuat Akun MetaMask di Misses Browser")
//         .should("be.visible");

//       cy.contains("Install Misses Browser").click();

//       cy.get("h2").contains("Install Misses Browser").should("be.visible");
//     });
//   });

//   describe("Responsifitas", () => {
//     it("harus memiliki tampilan yang berbeda pada desktop dan mobile", () => {
//       cy.viewport(1280, 800);
//       cy.get(".lg\\:grid-cols-6").should("be.visible");
//       cy.get(".lg\\:col-span-5").should("be.visible");
//       cy.viewport("iphone-6");
//       cy.get("button").find('img[alt="hamburger-white"]').should("be.visible");
//       cy.get(".bg-black\\/30").should("have.class", "left-[-100%]");
//     });
//   });

//   describe("Hooks dan State Management", () => {
//     it("harus mempertahankan state tutorial yang dipilih saat navigasi", () => {
//       cy.viewport(1280, 800);

//       cy.contains("Android").click();
//       cy.contains(
//         "Cara Install dan Membuat Akun MetaMask di Misses Browser"
//       ).click();

//       cy.contains(
//         "Cara Install dan Membuat Akun MetaMask di Misses Browser"
//       ).should("have.class", "text-[#D1BF00]");

//       cy.get("h2")
//         .contains("Cara Install dan Membuat Akun MetaMask di Misses Browser")
//         .should("be.visible");
//     });
//   });
// });
