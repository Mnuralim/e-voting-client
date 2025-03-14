export interface TutorialStep {
  title: string;
  link?: string;
  description?: string;
  image?: string;
}

export interface SubTutorial {
  title: string;
  tutorials: TutorialStep[];
  description: string;
}

export interface Tutorial {
  type: string;
  title: string;
  description: string;
  tutorials: SubTutorial[];
}

export const tutorials: Tutorial[] = [
  {
    type: "android",
    title: "Android",
    description: "Android",
    tutorials: [
      {
        title: "Install Misses Browser",
        description:
          "Installing MetaMask on Google Chrome and Mozilla Firefox is a straightforward process. Follow these steps:",
        tutorials: [
          {
            title: "Install Misses Browser",
            link: "https://play.google.com/store/apps/details?id=site.mises.browser",
            description: "Install Misses Browser",
            image: "/image/test.jpg",
          },
        ],
      },
      {
        title: "Cara Install dan Membuat Akun MetaMask di Misses Browser",
        description:
          "MetaMask adalah dompet kripto yang memungkinkan Anda mengelola aset kripto dan berinteraksi dengan aplikasi terdesentralisasi (dApps). Berikut panduan lengkap untuk menginstal dan membuat akun MetaMask di Misses Browser.",
        tutorials: [
          {
            title: "Buka Misses Browser dan Akses Chrome Web Store",
            description:
              "Buka Misses Browser di perangkat Anda, lalu kunjungi Chrome Web Store dengan mengakses link berikut:",
            link: "https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
          },
          {
            title: "Klik 'Add to Chrome' untuk Memulai Instalasi",
            description:
              "Setelah berada di halaman MetaMask di Chrome Web Store, klik tombol 'Add to Chrome' untuk memulai proses instalasi. Tombol ini terletak di sisi kanan halaman ekstensi.",
            image: "/image/tutorial/metamask-add-to-chrome.jpeg",
          },
          {
            title: "Konfirmasi Instalasi",
            description:
              "Sebuah pop-up akan muncul meminta izin untuk menambahkan ekstensi MetaMask. Klik 'Oke' untuk melanjutkan instalasi.",
            image: "/image/tutorial/metamask-install-confirmation.jpeg",
          },
          {
            title: "Tunggu Proses Instalasi Selesai",
            description:
              "MetaMask akan diunduh dan diinstal secara otomatis. Setelah selesai, ikon MetaMask akan muncul di toolbar browser Anda.",
            image: "/image/tutorial/metamask-toolbar.jpeg",
          },
          {
            title: "Buka MetaMask dan Mulai Proses Setup",
            description:
              "Klik ikon MetaMask di toolbar browser untuk membukanya. Anda akan diarahkan ke halaman setup MetaMask. ",
            image: "/image/tutorial/metamask-toolbar.jpeg",
          },
          {
            title: "Pilih 'Buat dompet baru'",
            description:
              "klik 'Buat dompet baru', Setujui ketentuan penggunaan dengan mencentang kotak yang tersedia.",
            image: "/image/tutorial/mm-get-started.jpeg",
          },
          {
            title: "Setuju Ketentuan Penggunaan",
            description:
              "Setujui ketentuan penggunaan dengan mencentang kotak yang tersedia, kemudian klik 'Saya setuju'.",
            image: "/image/tutorial/mm-agrgree.jpeg",
          },
          {
            title: "Buat kata sandi",
            description:
              "Buat kata sandi yang kuat untuk mengamankan dompet MetaMask Anda. Kata sandi ini akan digunakan setiap kali Anda mengakses MetaMask di browser ini.",
            image: "/image/tutorial/mm-password.jpeg",
          },
          {
            title: "Simpan frasa pemulihan rahasia",
            description:
              "MetaMask akan menampilkan 12 kata pemulihan (Secret Recovery Phrase). Catat kata-kata ini dengan urutan yang benar dan simpan di tempat yang aman. Frasa ini sangat penting untuk memulihkan dompet Anda jika Anda lupa password atau kehilangan akses.",
            image: "/image/tutorial/save-phrase.jpeg",
          },
          {
            title: "Konfirmasi frasa pemulihan rahasia",
            description:
              "Untuk memastikan Anda telah mencatat frasa dengan benar, MetaMask akan meminta Anda mengisi ulang frasa tersebut dengan urutan yang tepat. Ikuti petunjuk di layar untuk menyelesaikan proses ini.",
            image: "/image/tutorial/confirm-phrase.jpeg",
          },
          {
            title: "Selesai! Dompet MetaMask Anda Siap Digunakan",
            description:
              "Setelah menyelesaikan semua langkah di atas, dompet MetaMask Anda sudah siap digunakan. Anda dapat mulai mengelola aset kripto, mengirim/menerima token, dan berinteraksi dengan dApps.",
            image: "/image/tutorial/mm-finished.jpeg",
          },
        ],
      },
      // {
      //   title: "Install Misses Browser",
      //   link: "https://play.google.com/store/apps/details?id=org.missesbrowser.missesbrowser",
      //   description: "Install Misses Browser",
      //   image: "/image/test.jpg",
      // },
      // {
      //   title: "Install Metamask",
      //   link: "https://play.google.com/store/apps/details?id=org.missesbrowser.missesbrowser",
      //   description: "Install Metamask",
      //   image: "/image/test.jpg",
      // },
    ],
  },
  {
    type: "ios",
    title: "IOS",
    description: "IOS",
    tutorials: [
      // {
      //   title: "Install Misses Browser",
      //   link: "https://play.google.com/store/apps/details?id=org.missesbrowser.missesbrowser",
      //   description: "Install Misses Browser",
      //   image: "/image/test.jpg",
      // },
      // {
      //   title: "Install Metamask",
      //   link: "https://play.google.com/store/apps/details?id=org.missesbrowser.missesbrowser",
      //   description: "Install Metamask",
      //   image: "/image/test.jpg",
      // },
    ],
  },
  {
    type: "desktop",
    title: "Desktop",
    description:
      "Panduan lengkap untuk menginstal MetaMask di browser desktop seperti Chrome, Edge, Firefox, dan lainnya.",
    tutorials: [
      {
        title: "Install MetaMask di Browser Desktop",
        description:
          "MetaMask dapat diinstal di berbagai browser desktop seperti Chrome, Edge, dan Firefox. Berikut langkah-langkahnya:",
        tutorials: [
          {
            title: "Buka Browser Desktop Anda",
            description:
              "Buka browser desktop yang Anda gunakan (Chrome, Edge, Firefox, dll.) dan kunjungi halaman ekstensi MetaMask.",
            link: "https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
          },
          {
            title:
              "Klik 'Add to Chrome' (Chrome/Edge) atau 'Add to Firefox' (Firefox)",
            description:
              "Setelah berada di halaman MetaMask, klik tombol 'Add to Chrome' (untuk Chrome dan Edge) atau 'Add to Firefox' (untuk Firefox) untuk memulai instalasi.",
            image: "/image/tutorial/metamask-add-to-chrome.jpeg",
          },
          {
            title: "Konfirmasi Instalasi",
            description:
              "Sebuah pop-up akan muncul meminta izin untuk menambahkan ekstensi MetaMask. Klik 'Add Extension' (Chrome/Edge) atau 'Add' (Firefox) untuk melanjutkan instalasi.",
            image: "/image/test.jpg",
          },
          {
            title: "Tunggu Proses Instalasi Selesai",
            description:
              "MetaMask akan diunduh dan diinstal secara otomatis. Setelah selesai, ikon MetaMask akan muncul di toolbar browser Anda.",
            image: "/image/tutorial/metamask-toolbar.jpeg",
          },
          {
            title: "Buka MetaMask dan Mulai Proses Setup",
            description:
              "Klik ikon MetaMask di toolbar browser untuk membukanya. Anda akan diarahkan ke halaman setup MetaMask. Klik 'Get Started' untuk memulai.",
            image: "/image/test.jpg",
          },
          {
            title: "Pilih 'Create a Wallet'",
            description:
              "MetaMask akan menawarkan dua opsi: 'Import Wallet' (untuk mengimpor dompet yang sudah ada) atau 'Create a Wallet' (untuk membuat dompet baru). Pilih 'Create a Wallet' jika Anda baru pertama kali menggunakan MetaMask.",
            image: "/image/test.jpg",
          },
          {
            title: "Buat Password Baru",
            description:
              "Buat password yang kuat untuk mengamankan dompet MetaMask Anda. Password ini akan digunakan setiap kali Anda mengakses MetaMask di browser ini.",
            image: "/image/test.jpg",
          },
          {
            title: "Simpan Secret Recovery Phrase",
            description:
              "MetaMask akan menampilkan 12 kata pemulihan (Secret Recovery Phrase). Catat kata-kata ini dengan urutan yang benar dan simpan di tempat yang aman. Frasa ini sangat penting untuk memulihkan dompet Anda jika Anda lupa password atau kehilangan akses.",
            image: "/image/test.jpg",
          },
          {
            title: "Konfirmasi Secret Recovery Phrase",
            description:
              "Untuk memastikan Anda telah mencatat frasa dengan benar, MetaMask akan meminta Anda mengisi ulang frasa tersebut dengan urutan yang tepat. Ikuti petunjuk di layar untuk menyelesaikan proses ini.",
            image: "/image/test.jpg",
          },
          {
            title: "Selesai! Dompet MetaMask Anda Siap Digunakan",
            description:
              "Setelah menyelesaikan semua langkah di atas, dompet MetaMask Anda sudah siap digunakan. Anda dapat mulai mengelola aset kripto, mengirim/menerima token, dan berinteraksi dengan dApps.",
            image: "/image/test.jpg",
          },
        ],
      },
    ],
  },
];
