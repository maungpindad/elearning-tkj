const quizData = [
  // ==================== CPU ====================
  {
    hardwareId: 'cpu',
    title: 'Kuis CPU (Central Processing Unit)',
    questions: {
      easy: [
        {
          id: 1,
          text: 'Apakah kepanjangan dari CPU?',
          options: [
            'Central Processing Unit',
            'Computer Personal Unit',
            'Central Program Utility',
            'Core Processing Unit',
          ],
          correctAnswer: 'Central Processing Unit',
        },
        {
          id: 2,
          text: 'Apa fungsi utama CPU dalam sebuah komputer?',
          options: [
            'Menyimpan data secara permanen',
            'Mengeksekusi instruksi dan mengolah data',
            'Menampilkan gambar ke monitor',
            'Mengatur koneksi internet',
          ],
          correctAnswer: 'Mengeksekusi instruksi dan mengolah data',
        },
        {
          id: 3,
          text: 'Dua produsen CPU utama di pasaran adalah...',
          options: [
            'Intel dan NVIDIA',
            'Intel dan AMD',
            'AMD dan ASUS',
            'Intel dan Gigabyte',
          ],
          correctAnswer: 'Intel dan AMD',
        },
        {
          id: 4,
          text: 'Satuan yang digunakan untuk mengukur kecepatan clock CPU adalah...',
          options: ['GHz (Gigahertz)', 'GB (Gigabyte)', 'RPM', 'Watt'],
          correctAnswer: 'GHz (Gigahertz)',
        },
      ],
      medium: [
        {
          id: 5,
          text: 'Apa yang dimaksud dengan "core" dalam CPU?',
          options: [
            'Memori tambahan pada CPU',
            'Unit pemrosesan fisik di dalam CPU',
            'Kipas pendingin CPU',
            'Konektor daya CPU',
          ],
          correctAnswer: 'Unit pemrosesan fisik di dalam CPU',
        },
        {
          id: 6,
          text: 'Teknologi Intel yang memungkinkan 1 core menangani 2 thread disebut...',
          options: ['Turbo Boost', 'Hyper-Threading', 'SpeedStep', 'Optane'],
          correctAnswer: 'Hyper-Threading',
        },
        {
          id: 7,
          text: 'Apa fungsi Cache L1, L2, dan L3 pada CPU?',
          options: [
            'Menyimpan data yang sering diakses agar lebih cepat',
            'Mendinginkan suhu CPU',
            'Mengatur kecepatan kipas',
            'Menyimpan sistem operasi',
          ],
          correctAnswer: 'Menyimpan data yang sering diakses agar lebih cepat',
        },
        {
          id: 8,
          text: 'Cache level mana yang memiliki kapasitas paling besar di dalam CPU?',
          options: ['L1 Cache', 'L2 Cache', 'L3 Cache', 'L4 Cache'],
          correctAnswer: 'L3 Cache',
        },
        {
          id: 9,
          text: 'Apa kepanjangan dari TDP pada spesifikasi CPU?',
          options: [
            'Total Data Processing',
            'Thermal Design Power',
            'Turbo Dynamic Performance',
            'Thread Data Protocol',
          ],
          correctAnswer: 'Thermal Design Power',
        },
        {
          id: 10,
          text: 'CPU dengan TDP 125W sebaiknya menggunakan pendingin jenis apa?',
          options: [
            'Stock cooler bawaan',
            'Aftermarket air cooler atau liquid cooler',
            'Tidak perlu pendingin',
            'Cukup heatsink pasif',
          ],
          correctAnswer: 'Aftermarket air cooler atau liquid cooler',
        },
      ],
      hard: [
        {
          id: 11,
          text: 'Apa perbedaan mendasar antara arsitektur CPU RISC dan CISC?',
          options: [
            'RISC menggunakan instruksi kompleks, CISC menggunakan instruksi sederhana',
            'RISC menggunakan instruksi sederhana dalam jumlah banyak, CISC menggunakan instruksi kompleks dalam jumlah sedikit',
            'RISC hanya bisa menjalankan satu thread, CISC bisa menjalankan banyak thread',
            'Tidak ada perbedaan signifikan',
          ],
          correctAnswer:
            'RISC menggunakan instruksi sederhana dalam jumlah banyak, CISC menggunakan instruksi kompleks dalam jumlah sedikit',
        },
        {
          id: 12,
          text: 'Apa yang terjadi jika sebuah CPU memiliki bottleneck (kemacetan) saat dipasangkan dengan GPU high-end?',
          options: [
            'GPU tidak akan menyala',
            'CPU tidak mampu mengirim data cukup cepat sehingga performa GPU terhambat',
            'RAM akan rusak',
            'Komputer tidak bisa booting',
          ],
          correctAnswer:
            'CPU tidak mampu mengirim data cukup cepat sehingga performa GPU terhambat',
        },
        {
          id: 13,
          text: 'Bagaimana cara kerja teknologi SMT (Simultaneous Multithreading) milik AMD?',
          options: [
            'Menggabungkan dua core menjadi satu',
            'Membagi 1 core fisik menjadi 2 thread logis untuk eksekusi paralel',
            'Menonaktifkan core yang tidak digunakan',
            'Mempercepat clock speed secara otomatis',
          ],
          correctAnswer:
            'Membagi 1 core fisik menjadi 2 thread logis untuk eksekusi paralel',
        },
        {
          id: 14,
          text: 'Mengapa CPU modern menggunakan arsitektur 64-bit dibandingkan 32-bit?',
          options: [
            'Karena 64-bit lebih hemat daya',
            'Karena 64-bit dapat mengalamatkan lebih dari 4GB RAM dan memproses data lebih besar per siklus',
            'Karena 64-bit lebih murah diproduksi',
            'Karena 32-bit sudah tidak kompatibel dengan GPU modern',
          ],
          correctAnswer:
            'Karena 64-bit dapat mengalamatkan lebih dari 4GB RAM dan memproses data lebih besar per siklus',
        },
        {
          id: 15,
          text: 'Apa yang dimaksud dengan "binning" dalam proses manufaktur CPU?',
          options: [
            'Proses membuang CPU yang cacat',
            'Proses pengelompokan CPU berdasarkan kualitas dan performa setelah produksi',
            'Proses memasang heatsink ke CPU',
            'Proses overclocking di pabrik',
          ],
          correctAnswer:
            'Proses pengelompokan CPU berdasarkan kualitas dan performa setelah produksi',
        },
        {
          id: 16,
          text: 'Mengapa CPU server seperti Intel Xeon dan AMD EPYC memiliki jumlah core yang sangat banyak?',
          options: [
            'Untuk bermain game dengan FPS tinggi',
            'Untuk menangani beban kerja paralel seperti virtualisasi, database, dan cloud computing',
            'Agar konsumsi daya lebih rendah',
            'Agar lebih murah untuk diproduksi',
          ],
          correctAnswer:
            'Untuk menangani beban kerja paralel seperti virtualisasi, database, dan cloud computing',
        },
        {
          id: 17,
          text: 'Apa pengaruh fabrikasi (process node) 5nm vs 7nm pada performa dan efisiensi CPU?',
          options: [
            'Tidak ada pengaruh sama sekali',
            'Transistor 5nm lebih kecil → lebih banyak transistor dalam area sama → lebih cepat dan lebih hemat daya',
            '5nm hanya membuat CPU lebih murah',
            '7nm lebih cepat daripada 5nm karena ukurannya lebih besar',
          ],
          correctAnswer:
            'Transistor 5nm lebih kecil → lebih banyak transistor dalam area sama → lebih cepat dan lebih hemat daya',
        },
      ],
    },
  },

  // ==================== RAM ====================
  {
    hardwareId: 'ram',
    title: 'Kuis RAM (Random Access Memory)',
    questions: {
      easy: [
        {
          id: 1,
          text: 'Apakah kepanjangan dari RAM?',
          options: [
            'Read Access Memory',
            'Random Access Memory',
            'Rapid Application Module',
            'Remote Access Module',
          ],
          correctAnswer: 'Random Access Memory',
        },
        {
          id: 2,
          text: 'Apa sifat utama RAM yang membedakannya dari storage (SSD/HDD)?',
          options: [
            'RAM menyimpan data secara permanen',
            'RAM adalah memori volatile (data hilang saat mati)',
            'RAM lebih lambat dari HDD',
            'RAM hanya bisa membaca data, tidak bisa menulis',
          ],
          correctAnswer: 'RAM adalah memori volatile (data hilang saat mati)',
        },
        {
          id: 3,
          text: 'Apa fungsi utama RAM dalam komputer?',
          options: [
            'Menyimpan data permanen',
            'Menyimpan data sementara yang sedang digunakan CPU',
            'Mengatur tampilan grafis',
            'Mendinginkan komponen',
          ],
          correctAnswer: 'Menyimpan data sementara yang sedang digunakan CPU',
        },
        {
          id: 4,
          text: 'Satuan kapasitas RAM yang umum digunakan adalah...',
          options: ['GHz', 'GB (Gigabyte)', 'RPM', 'Watt'],
          correctAnswer: 'GB (Gigabyte)',
        },
      ],
      medium: [
        {
          id: 5,
          text: 'Apa perbedaan utama antara DDR4 dan DDR5?',
          options: [
            'Tidak ada perbedaan',
            'DDR5 memiliki bandwidth dan frekuensi lebih tinggi serta lebih hemat daya',
            'DDR4 lebih cepat dari DDR5',
            'DDR5 tidak kompatibel dengan prosesor modern',
          ],
          correctAnswer:
            'DDR5 memiliki bandwidth dan frekuensi lebih tinggi serta lebih hemat daya',
        },
        {
          id: 6,
          text: 'Apa yang dimaksud dengan konfigurasi Dual Channel pada RAM?',
          options: [
            'Menggunakan 1 stick RAM pada slot manapun',
            'Menggunakan 2 stick RAM identik pada slot berpasangan untuk menggandakan bandwidth',
            'Menggunakan RAM dari dua merek berbeda',
            'Menggunakan RAM dengan dua kecepatan berbeda',
          ],
          correctAnswer:
            'Menggunakan 2 stick RAM identik pada slot berpasangan untuk menggandakan bandwidth',
        },
        {
          id: 7,
          text: 'Apa arti CAS Latency (CL) pada spesifikasi RAM?',
          options: [
            'Kapasitas maksimum RAM',
            'Jeda (dalam siklus clock) antara perintah baca dan data tersedia',
            'Kecepatan transfer maksimum',
            'Tegangan operasi RAM',
          ],
          correctAnswer:
            'Jeda (dalam siklus clock) antara perintah baca dan data tersedia',
        },
        {
          id: 8,
          text: 'Berapa kapasitas RAM minimum yang direkomendasikan untuk gaming modern dan multitasking?',
          options: ['4GB', '8GB', '16GB', '64GB'],
          correctAnswer: '16GB',
        },
        {
          id: 9,
          text: 'Apa yang terjadi jika komputer kekurangan kapasitas RAM saat menjalankan banyak aplikasi?',
          options: [
            'Komputer akan mati total',
            'Sistem akan menggunakan storage sebagai virtual memory → performa turun drastis',
            'Aplikasi akan otomatis ditutup',
            'CPU akan mengambil alih fungsi RAM',
          ],
          correctAnswer:
            'Sistem akan menggunakan storage sebagai virtual memory → performa turun drastis',
        },
        {
          id: 10,
          text: 'Apakah RAM DDR5 bisa dipasang di motherboard yang hanya mendukung DDR4?',
          options: [
            'Bisa, asalkan update BIOS',
            'Tidak bisa, karena berbeda secara fisik dan elektrik',
            'Bisa, dengan adapter',
            'Bisa, DDR5 backward compatible',
          ],
          correctAnswer:
            'Tidak bisa, karena berbeda secara fisik dan elektrik',
        },
      ],
      hard: [
        {
          id: 11,
          text: 'Mana yang lebih baik: DDR4-3200 CL16 atau DDR4-3600 CL18? Jelaskan alasannya.',
          options: [
            'DDR4-3200 CL16 karena latency absolut lebih rendah',
            'DDR4-3600 CL18 karena frekuensi lebih tinggi selalu lebih baik',
            'Keduanya sama persis',
            'Tergantung aplikasi — bandwidth-sensitive pilih 3600, latency-sensitive pilih 3200',
          ],
          correctAnswer:
            'Tergantung aplikasi — bandwidth-sensitive pilih 3600, latency-sensitive pilih 3200',
        },
        {
          id: 12,
          text: 'Apa fungsi XMP (Extreme Memory Profile) pada RAM?',
          options: [
            'Mengunci RAM agar tidak bisa di-overclock',
            'Profil preset untuk menjalankan RAM pada kecepatan yang diiklankan (di atas standar JEDEC)',
            'Menghemat daya RAM',
            'Mendinginkan RAM secara otomatis',
          ],
          correctAnswer:
            'Profil preset untuk menjalankan RAM pada kecepatan yang diiklankan (di atas standar JEDEC)',
        },
        {
          id: 13,
          text: 'Apa pengaruh ECC (Error Correction Code) pada RAM, dan dimana biasanya digunakan?',
          options: [
            'Tidak ada pengaruh khusus',
            'Mendeteksi dan memperbaiki error data single-bit; digunakan di server dan workstation',
            'Meningkatkan kecepatan RAM secara drastis',
            'Mengurangi konsumsi daya RAM',
          ],
          correctAnswer:
            'Mendeteksi dan memperbaiki error data single-bit; digunakan di server dan workstation',
        },
        {
          id: 14,
          text: 'Bagaimana cara kerja memory controller dalam menentukan kecepatan RAM aktual?',
          options: [
            'Selalu mengikuti kecepatan tertinggi RAM',
            'Dipengaruhi oleh spesifikasi CPU, motherboard, dan profil XMP/DOCP yang diaktifkan',
            'Ditentukan oleh kapasitas RAM saja',
            'Selalu mengikuti standar JEDEC terendah',
          ],
          correctAnswer:
            'Dipengaruhi oleh spesifikasi CPU, motherboard, dan profil XMP/DOCP yang diaktifkan',
        },
        {
          id: 15,
          text: 'Apa perbedaan antara RAM SO-DIMM dan DIMM?',
          options: [
            'Tidak ada perbedaan',
            'SO-DIMM lebih kecil, digunakan di laptop dan mini PC; DIMM lebih besar, untuk desktop',
            'SO-DIMM lebih cepat dari DIMM',
            'DIMM hanya untuk server, SO-DIMM untuk desktop',
          ],
          correctAnswer:
            'SO-DIMM lebih kecil, digunakan di laptop dan mini PC; DIMM lebih besar, untuk desktop',
        },
        {
          id: 16,
          text: 'Mengapa HEDT platform (seperti Intel X-series dan AMD Threadripper) menggunakan konfigurasi Quad Channel?',
          options: [
            'Agar RAM lebih murah',
            'Untuk menyediakan bandwidth memori yang sangat tinggi bagi beban kerja profesional',
            'Agar bisa memasang lebih banyak kipas',
            'Karena CPU-nya lebih kecil',
          ],
          correctAnswer:
            'Untuk menyediakan bandwidth memori yang sangat tinggi bagi beban kerja profesional',
        },
        {
          id: 17,
          text: 'Apa yang dimaksud dengan "RAM rank" (single-rank vs dual-rank) dan bagaimana pengaruhnya ke performa?',
          options: [
            'Rank menentukan merek RAM',
            'Dual-rank memiliki dua set chip memory pada satu stick → bandwidth lebih tinggi dalam beberapa skenario',
            'Single-rank selalu lebih cepat',
            'Tidak ada perbedaan signifikan',
          ],
          correctAnswer:
            'Dual-rank memiliki dua set chip memory pada satu stick → bandwidth lebih tinggi dalam beberapa skenario',
        },
      ],
    },
  },

  // ==================== Motherboard ====================
  {
    hardwareId: 'motherboard',
    title: 'Kuis Motherboard (Papan Induk)',
    questions: {
      easy: [
        {
          id: 1,
          text: 'Apakah fungsi utama motherboard?',
          options: [
            'Sebagai pendingin komponen',
            'Sebagai papan sirkuit utama yang menghubungkan seluruh komponen',
            'Sebagai penyimpan data',
            'Sebagai pengolah grafis',
          ],
          correctAnswer:
            'Sebagai papan sirkuit utama yang menghubungkan seluruh komponen',
        },
        {
          id: 2,
          text: 'Apa nama slot di motherboard yang digunakan untuk memasang kartu grafis (GPU)?',
          options: ['DIMM Slot', 'SATA Port', 'PCIe x16 Slot', 'M.2 Slot'],
          correctAnswer: 'PCIe x16 Slot',
        },
        {
          id: 3,
          text: 'Apa nama tempat CPU dipasang pada motherboard?',
          options: ['Slot', 'Port', 'Socket', 'Header'],
          correctAnswer: 'Socket',
        },
        {
          id: 4,
          text: 'Apa kepanjangan dari PCB yang merupakan bahan dasar motherboard?',
          options: [
            'Personal Computer Board',
            'Printed Circuit Board',
            'Power Control Block',
            'Processor Connection Bus',
          ],
          correctAnswer: 'Printed Circuit Board',
        },
      ],
      medium: [
        {
          id: 5,
          text: 'Manakah form factor motherboard yang paling umum untuk PC desktop?',
          options: ['Mini-ITX', 'ATX', 'Nano-ITX', 'Pico-ITX'],
          correctAnswer: 'ATX',
        },
        {
          id: 6,
          text: 'Apa fungsi chipset pada motherboard?',
          options: [
            'Sebagai pendingin motherboard',
            'Mengatur komunikasi data antara CPU, RAM, GPU, dan perangkat lainnya',
            'Sebagai pengganti CPU',
            'Sebagai penyimpan data',
          ],
          correctAnswer:
            'Mengatur komunikasi data antara CPU, RAM, GPU, dan perangkat lainnya',
        },
        {
          id: 7,
          text: 'Slot M.2 pada motherboard biasanya digunakan untuk memasang...',
          options: ['CPU', 'RAM', 'SSD NVMe', 'Kartu suara'],
          correctAnswer: 'SSD NVMe',
        },
        {
          id: 8,
          text: 'Motherboard dengan form factor Mini-ITX biasanya memiliki berapa slot PCIe?',
          options: ['4 slot', '3 slot', '2 slot', '1 slot'],
          correctAnswer: '1 slot',
        },
        {
          id: 9,
          text: 'Apa perbedaan chipset Intel seri Z dibandingkan seri B?',
          options: [
            'Seri Z lebih murah',
            'Seri Z mendukung overclocking, seri B umumnya tidak',
            'Seri B memiliki lebih banyak slot RAM',
            'Tidak ada perbedaan',
          ],
          correctAnswer:
            'Seri Z mendukung overclocking, seri B umumnya tidak',
        },
        {
          id: 10,
          text: 'Konektor 24-pin pada motherboard berfungsi untuk...',
          options: [
            'Koneksi ke GPU',
            'Koneksi ke hard drive',
            'Menyuplai daya utama dari PSU ke motherboard',
            'Koneksi ke kipas casing',
          ],
          correctAnswer: 'Menyuplai daya utama dari PSU ke motherboard',
        },
      ],
      hard: [
        {
          id: 11,
          text: 'Apa yang dimaksud dengan PCIe lanes, dan mengapa jumlahnya penting pada motherboard?',
          options: [
            'Jalur data untuk koneksi internet',
            'Jalur komunikasi antara komponen — semakin banyak lanes, semakin banyak perangkat berkecepatan tinggi yang bisa dipasang',
            'Jalur untuk pendinginan',
            'Jumlah slot RAM yang tersedia',
          ],
          correctAnswer:
            'Jalur komunikasi antara komponen — semakin banyak lanes, semakin banyak perangkat berkecepatan tinggi yang bisa dipasang',
        },
        {
          id: 12,
          text: 'Apa perbedaan antara PCIe 4.0 dan PCIe 5.0 dari segi bandwidth?',
          options: [
            'Tidak ada perbedaan',
            'PCIe 5.0 memiliki bandwidth 2x lipat PCIe 4.0 (64GB/s vs 32GB/s untuk x16)',
            'PCIe 4.0 lebih cepat dari PCIe 5.0',
            'PCIe 5.0 hanya untuk GPU',
          ],
          correctAnswer:
            'PCIe 5.0 memiliki bandwidth 2x lipat PCIe 4.0 (64GB/s vs 32GB/s untuk x16)',
        },
        {
          id: 13,
          text: 'Apa fungsi VRM (Voltage Regulator Module) pada motherboard?',
          options: [
            'Mendinginkan motherboard',
            'Mengkonversi dan menstabilkan tegangan dari PSU ke tegangan yang dibutuhkan CPU',
            'Mengatur kecepatan kipas',
            'Menyimpan BIOS',
          ],
          correctAnswer:
            'Mengkonversi dan menstabilkan tegangan dari PSU ke tegangan yang dibutuhkan CPU',
        },
        {
          id: 14,
          text: 'Mengapa motherboard kelas atas memiliki lebih banyak fase VRM?',
          options: [
            'Hanya untuk estetika',
            'Semakin banyak fase VRM → distribusi beban lebih merata → lebih stabil untuk overclocking CPU high-end',
            'Untuk menambah jumlah port USB',
            'Untuk mengurangi ukuran motherboard',
          ],
          correctAnswer:
            'Semakin banyak fase VRM → distribusi beban lebih merata → lebih stabil untuk overclocking CPU high-end',
        },
        {
          id: 15,
          text: 'Apa fungsi BIOS/UEFI dan apa perbedaan keduanya?',
          options: [
            'Tidak ada perbedaan',
            'BIOS adalah firmware lama (teks-based); UEFI adalah penerusnya yang mendukung GUI, mouse, dan boot lebih cepat',
            'UEFI hanya untuk laptop',
            'BIOS lebih cepat dari UEFI',
          ],
          correctAnswer:
            'BIOS adalah firmware lama (teks-based); UEFI adalah penerusnya yang mendukung GUI, mouse, dan boot lebih cepat',
        },
        {
          id: 16,
          text: 'Bagaimana cara kerja front panel connector pada motherboard dan apa risikonya jika salah pasang?',
          options: [
            'Tidak ada risiko',
            'Konektor untuk power, reset, HDD LED — jika terbalik, tombol tidak berfungsi; jika short, bisa merusak motherboard',
            'Hanya untuk estetika',
            'Hanya digunakan di server',
          ],
          correctAnswer:
            'Konektor untuk power, reset, HDD LED — jika terbalik, tombol tidak berfungsi; jika short, bisa merusak motherboard',
        },
        {
          id: 17,
          text: 'Apa fungsi CMOS battery pada motherboard dan apa yang terjadi jika baterai habis?',
          options: [
            'Menyuplai daya ke CPU',
            'Menyimpan pengaturan BIOS/UEFI saat komputer mati — jika habis, pengaturan kembali ke default setiap restart',
            'Mendinginkan chipset',
            'Mengisi daya baterai laptop',
          ],
          correctAnswer:
            'Menyimpan pengaturan BIOS/UEFI saat komputer mati — jika habis, pengaturan kembali ke default setiap restart',
        },
      ],
    },
  },
]

export default quizData