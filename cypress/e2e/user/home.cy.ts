// describe("Halaman Home", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000");
//   });

//   it("Menampilkan judul utama dengan benar", () => {
//     cy.contains("Pemilihan ORMAWA USN Kolaka 2025").should("be.visible");
//   });

//   it("Menampilkan deskripsi e-voting", () => {
//     cy.contains(
//       "Waktunya menentukan pemimpin yang akan membawa perubahan!"
//     ).should("be.visible");
//   });

//   it("Menampilkan tombol Panduan", () => {
//     cy.get("a").contains("Panduan").should("be.visible").click();
//     cy.url().should("include", "/tutorial");
//   });

//   it("Menampilkan tombol Vote Now atau Whitelist sesuai status voting", () => {
//     cy.get("a")
//       .contains(/Vote Now|Whitelist/)
//       .should("be.visible")
//       .click();
//   });

//   it("Menampilkan gambar ilustrasi utama", () => {
//     cy.get("img[alt='ilustration']").should("be.visible");
//   });

//   it("Menampilkan background HomeVector", () => {
//     cy.get("img[alt='home-vector']").should("be.visible");
//   });
// });
