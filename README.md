# E-Learning TKJ (Teknik Komputer dan Jaringan)

Platform pembelajaran interaktif yang dirancang khusus untuk siswa jurusan Teknik Komputer dan Jaringan. Proyek ini bertujuan untuk memudahkan siswa dalam mempelajari materi hardware, mengasah kemampuan melalui kuis, serta mempraktikkan perakitan komputer melalui simulasi interaktif.

## ✨ Fitur Utama

- **📚 Materi Pembelajaran**: Akses materi hardware komputer yang terstruktur dan detail untuk memudahkan proses belajar.
- **✍️ Kuis Interaktif**: Uji pemahaman siswa dengan kuis interaktif yang memberikan hasil skor secara real-time.
- **🖥️ Simulasi Rakit PC**: Pengalaman belajar interaktif untuk mensimulasikan proses perakitan PC secara virtual.
- **🔐 Sistem Autentikasi**: Fitur Login dan Register untuk pengelolaan akun pengguna dan keamanan data.
- **📊 Dashboard**: Pantau progres belajar dan akses cepat ke berbagai fitur utama dalam satu halaman.
- **🎨 Desain Modern**: Tampilan responsif, profesional, dan nyaman dipandang dengan dukungan Tailwind CSS dan animasi Framer Motion.

## 🚀 Tech Stack

- **Framework**: [React.js](https://react.dev/) (via [Vite](https://vitejs.dev/))
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router DOM](https://reactrouter.com/)

## 🛠️ Instalasi & Menjalankan Proyek

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda:

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/maungpindad/elearning-tkj.git
   ```

2. **Masuk ke direktori proyek:**
   ```bash
   cd elearning-tkj
   ```

3. **Instal dependensi:**
   ```bash
   npm install
   ```

4. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```

5. **Akses aplikasi:**
   Buka browser dan akses `http://localhost:5173` (atau port yang tertera di terminal Anda).

## 📁 Struktur Folder

Berikut adalah ringkasan struktur folder utama dalam proyek ini:

```text
src/
├── assets/       # Aset gambar dan file statis
├── components/   # Komponen UI yang reusable (UI elements)
├── context/      # Manajemen state global (misal: AuthContext untuk login)
├── data/         # Penyimpanan data statis (Materi hardware, soal kuis, data simulasi)
├── layouts/      # Template layout utama aplikasi (MainLayout)
└── pages/        # Halaman-halaman utama aplikasi (Dashboard, Materi, Quiz, Simulasi, dll)
```

## 📄 Lisensi

Proyek ini dikembangkan untuk tujuan pendidikan dan pengembangan kemampuan siswa di bidang Teknik Komputer dan Jaringan.

---
*Developed with ❤️ for TKJ Students.*