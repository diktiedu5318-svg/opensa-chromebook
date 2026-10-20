# OpenSA di Chromebook — panduan deployment (Bahasa Indonesia)

Panduan ini menambahkan workflow GitHub Pages supaya build OpenSA dapat dilakukan oleh GitHub Actions. Kamu tidak perlu memasang Node.js atau Linux di Chromebook untuk proses build.

## Penting sebelum mulai

- Ini hanya menerbitkan **kode OpenSA** sebagai situs web. Workflow tidak menyertakan file game GTA San Andreas.
- Untuk menjalankan varian `original`, OpenSA meminta folder instalasi GTA: San Andreas yang sah dari browser Chromium melalui pemilih folder lokal. File SA-MP installer (`sa-mp-0.3.DL-R1-install.exe`) bukan pengganti folder game GTA SA.
- Ini bukan klien SA-MP. OpenSA tidak otomatis dapat tersambung ke server SA-MP.
- Repo ini memakai lisensi AGPL-3.0 untuk kode OpenSA; aset GTA tidak tercakup lisensi tersebut.

## Cara deploy (semua dari browser)

1. Buat repository GitHub baru, misalnya `opensa-chromebook`.
2. Masukkan seluruh isi folder proyek ini ke repository. GitHub tidak mengekstrak ZIP otomatis saat ZIP di-upload; gunakan editor/fitur upload yang benar-benar mengunggah isi folder, atau browser-based cloud IDE yang bisa mengimpor ZIP dan melakukan push ke GitHub.
3. Pastikan branch utama bernama `main`.
4. Di repository GitHub, buka **Settings → Pages** dan pilih **GitHub Actions** sebagai build/deployment source.
5. Buka tab **Actions**. Workflow `Deploy OpenSA to GitHub Pages` akan berjalan setelah push ke `main`, atau jalankan manual melalui **Run workflow**.
6. Setelah workflow sukses, buka URL Pages yang ditampilkan GitHub Actions.

Workflow menggunakan Node.js 22 dan menjalankan `npm ci` lalu `npm run build:prod` di server GitHub, bukan di Chromebook. `VITE_BASE_PATH` disetel otomatis agar asset bekerja pada URL project Pages.

## Jika build berhasil tetapi game tidak bisa dimulai

- Build situs tidak berarti aset game sudah tersedia.
- Kamu harus memiliki salinan game yang sah dan folder data yang didukung OpenSA.
- Jalankan situs melalui HTTPS, lalu pilih folder game melalui pemilih folder yang disediakan aplikasi.
- Jika pemilih folder tidak muncul atau perangkat tidak bisa membaca format instalasi, lihat dokumentasi OpenSA dan log konsol browser.
- RAM 4 GB mungkin membatasi kinerja 3D; tutup tab lain dan gunakan kualitas grafis rendah jika opsi tersebut tersedia.

## Tautan proyek

- Source: https://github.com/AlexSergey/opensa
- Dokumentasi setup aset: `docs/development/getting-started.md`
- Lisensi: `LICENSE`
