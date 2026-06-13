const hardwareData = [
  {
    id: 'cpu',
    name: 'CPU (Central Processing Unit)',
    shortDescription:
      'Otak utama komputer yang mengeksekusi instruksi dan mengendalikan seluruh komponen sistem.',
    icon: 'Cpu',
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&h=400&fit=crop',
    subMaterials: [
      {
        title: 'Fungsi Utama CPU',
        imageUrl: 'https://images.unsplash.com/photo-1555618254-5a3d78e2f888?w=800&h=400&fit=crop',
        content:
          'CPU adalah otak dari komputer yang bertugas mengeksekusi instruksi dari program, melakukan kalkulasi aritmatika dan logika, serta mengontrol aliran data antar komponen. Setiap perintah yang dikirim pengguna akan diproses oleh CPU sebelum diteruskan ke komponen lain.',
      },
      {
        title: 'Kecepatan Clock (Clock Speed)',
        imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&h=400&fit=crop',
        content:
          'Clock speed diukur dalam satuan GHz (Gigahertz) yang menunjukkan berapa miliar siklus yang dapat dilakukan CPU per detik. Semakin tinggi clock speed, semakin cepat CPU mengeksekusi instruksi. Namun, performa nyata juga dipengaruhi oleh arsitektur dan jumlah core.',
      },
      {
        title: 'Core & Thread',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
        content:
          'Core adalah unit pemrosesan fisik di dalam CPU. CPU modern memiliki 2 hingga 64 core. Thread adalah alur eksekusi virtual — teknologi Hyper-Threading (Intel) atau SMT (AMD) memungkinkan 1 core menangani 2 thread sekaligus, meningkatkan efisiensi multitasking.',
      },
      {
        title: 'Cache Memory',
        imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&h=400&fit=crop',
        content:
          'Cache adalah memori kecil berkecepatan tinggi yang terletak di dalam CPU. Terdapat 3 level cache: L1 (paling cepat, paling kecil ~64KB), L2 (~256KB-1MB per core), dan L3 (paling besar ~8-96MB, dibagi antar core). Cache menyimpan data yang sering diakses agar CPU tidak perlu membaca dari RAM yang lebih lambat.',
      },
      {
        title: 'Jenis & Merek CPU',
        imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&h=400&fit=crop',
        content:
          'Dua produsen CPU utama adalah Intel (Core i3/i5/i7/i9) dan AMD (Ryzen 3/5/7/9). Intel terkenal dengan single-core performance dan efisiensi daya, sementara AMD unggul dalam multi-core performance dan harga yang kompetitif. Pemilihan CPU harus disesuaikan dengan motherboard yang kompatibel (socket type).',
      },
      {
        title: 'TDP & Pendinginan',
        imageUrl: 'https://images.unsplash.com/photo-1587202372635-348c9c2afc6b?w=800&h=400&fit=crop',
        content:
          'TDP (Thermal Design Power) menunjukkan panas maksimum yang dihasilkan CPU dalam watt. CPU dengan TDP tinggi (>95W) membutuhkan pendingin aftermarket (air cooling atau liquid cooling), sementara CPU dengan TDP rendah cukup menggunakan stock cooler. Suhu kerja ideal CPU adalah 30-45°C idle dan 60-85°C beban penuh.',
      },
    ],
  },
  {
    id: 'gpu',
    name: 'GPU (Graphics Processing Unit)',
    shortDescription:
      'Prosesor khusus grafis yang mengolah tampilan visual, rendering 3D, dan akselerasi komputasi paralel.',
    icon: 'Monitor',
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&h=400&fit=crop',
    subMaterials: [
      {
        title: 'Fungsi GPU',
        imageUrl: 'https://images.unsplash.com/photo-1555618254-5a3d78e2f888?w=800&h=400&fit=crop',
        content:
          'GPU (Graphics Processing Unit) adalah prosesor khusus yang dirancang untuk mengolah data grafis secara paralel. GPU menangani rendering gambar, video, animasi 3D, dan antarmuka visual pada monitor. GPU modern juga digunakan untuk komputasi paralel seperti AI/Machine Learning dan mining cryptocurrency.',
      },
      {
        title: 'GPU Terintegrasi vs Diskrit',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
        content:
          'GPU Terintegrasi (iGPU) menyatu dengan CPU dan menggunakan RAM sistem — cocok untuk kebutuhan ringan seperti browsing dan office. GPU Diskrit adalah kartu grafis terpisah dengan VRAM sendiri — wajib untuk gaming, editing video, dan rendering 3D. Intel UHD Graphics dan AMD Radeon Graphics adalah contoh iGPU; NVIDIA GeForce dan AMD Radeon RX adalah GPU diskrit.',
      },
      {
        title: 'VRAM (Video RAM)',
        imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&h=400&fit=crop',
        content:
          'VRAM adalah memori khusus pada GPU yang menyimpan tekstur, frame buffer, dan data grafis. Kapasitas VRAM umum: 4GB (entry), 8GB (mainstream gaming), 12-16GB (high-end), 24GB+ (professional). Tipe VRAM terkini adalah GDDR6 dan GDDR6X dengan bandwidth hingga 1TB/s pada GPU kelas atas.',
      },
      {
        title: 'Core GPU: CUDA & Stream Processors',
        imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&h=400&fit=crop',
        content:
          'GPU memiliki ribuan core kecil untuk pemrosesan paralel. NVIDIA menyebutnya CUDA Cores, AMD menyebutnya Stream Processors. GPU modern seperti RTX 4090 memiliki 16.384 CUDA Cores. Semakin banyak core, semakin tinggi kemampuan rendering dan komputasi paralelnya.',
      },
      {
        title: 'Ray Tracing & DLSS/FSR',
        imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&h=400&fit=crop',
        content:
          'Ray Tracing adalah teknologi rendering cahaya realistis yang mensimulasikan pantulan, bayangan, dan pencahayaan global. NVIDIA RTX memiliki dedicated RT Cores untuk ini. DLSS (NVIDIA) dan FSR (AMD) adalah teknologi upscaling berbasis AI yang meningkatkan FPS tanpa mengorbankan kualitas visual secara signifikan.',
      },
    ],
  },
  {
    id: 'ram',
    name: 'RAM (Random Access Memory)',
    shortDescription:
      'Memori sementara berkecepatan tinggi yang menyimpan data aktif untuk akses cepat oleh CPU.',
    icon: 'MemoryStick',
    imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&h=400&fit=crop',
    subMaterials: [
      {
        title: 'Fungsi RAM',
        imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&h=400&fit=crop',
        content:
          'RAM (Random Access Memory) adalah memori volatile yang menyimpan data sementara selama komputer menyala. RAM menjembatani kesenjangan kecepatan antara CPU yang super cepat dan storage (SSD/HDD) yang relatif lambat. Data di RAM hilang saat komputer dimatikan — berbeda dengan storage yang bersifat permanen.',
      },
      {
        title: 'Jenis RAM: DDR3, DDR4, DDR5',
        imageUrl: 'https://images.unsplash.com/photo-1541029071515-d0501fe7b65f?w=800&h=400&fit=crop',
        content:
          'DDR (Double Data Rate) adalah standar RAM yang terus berkembang. DDR4 (2014): 2133-3200 MHz, 1.2V, kapasitas hingga 32GB/stick. DDR5 (2020): 4800-8400 MHz, 1.1V, kapasitas hingga 64GB/stick, bandwidth 50% lebih tinggi dari DDR4. DDR3 sudah dianggap usang untuk sistem modern.',
      },
      {
        title: 'Kapasitas RAM',
        imageUrl: 'https://images.unsplash.com/photo-1555618254-5a3d78e2f888?w=800&h=400&fit=crop',
        content:
          'Kebutuhan RAM minimum: 8GB untuk browsing dan office, 16GB (sweet spot) untuk gaming dan multitasking, 32GB untuk content creation dan streaming, 64GB+ untuk workstation profesional dan virtualisasi. Pastikan motherboard mendukung kapasitas maksimum yang diinginkan.',
      },
      {
        title: 'Dual Channel & Quad Channel',
        imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&h=400&fit=crop',
        content:
          'Konfigurasi dual channel menggunakan 2 stick RAM identik pada slot berpasangan untuk menggandakan bandwidth. Motherboard mainstream mendukung dual channel (slot A1+B1 atau A2+B2). Platform HEDT (High-End Desktop) seperti Intel X-series dan AMD Threadripper mendukung quad channel untuk bandwidth maksimum.',
      },
      {
        title: 'Timing & Latency (CL)',
        imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&h=400&fit=crop',
        content:
          'CAS Latency (CL) adalah jeda (dalam siklus clock) antara perintah baca dan data tersedia. Semakin rendah CL, semakin responsif RAM. Contoh: DDR4-3200 CL16 lebih baik dari CL18. Saat memilih RAM, pertimbangkan keseimbangan antara frekuensi (MHz) dan latency — frekuensi tinggi dengan CL rendah adalah kombinasi terbaik.',
      },
    ],
  },
  {
    id: 'motherboard',
    name: 'Motherboard (Papan Induk)',
    shortDescription:
      'Papan sirkuit utama yang menghubungkan seluruh komponen komputer menjadi satu sistem yang utuh.',
    icon: 'CircuitBoard',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
    subMaterials: [
      {
        title: 'Fungsi Motherboard',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
        content:
          'Motherboard adalah papan sirkuit cetak (PCB) utama yang menjadi fondasi tempat seluruh komponen terpasang dan berkomunikasi. Motherboard menyediakan jalur data (bus), slot ekspansi, konektor daya, port I/O, dan chipset yang mengatur komunikasi antar komponen.',
      },
      {
        title: 'Form Factor (Ukuran)',
        imageUrl: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=400&fit=crop',
        content:
          'ATX (305x244mm): Standar paling umum, slot ekspansi terbanyak, ideal untuk PC desktop. Micro-ATX (244x244mm): Lebih kecil, lebih murah, cocok untuk budget build. Mini-ITX (170x170mm): Sangat ringkas, 1 slot PCIe, cocok untuk HTPC atau portable build. E-ATX: Lebih lebar dari ATX, untuk sistem enthusiast dengan fitur lengkap.',
      },
      {
        title: 'Socket & Chipset',
        imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&h=400&fit=crop',
        content:
          'Socket adalah tempat CPU dipasang — setiap generasi CPU memiliki socket spesifik (Intel: LGA1700 untuk Gen 12-14, LGA1851 untuk Core Ultra; AMD: AM5 untuk Ryzen 7000-9000). Chipset adalah IC yang menentukan fitur motherboard: jumlah PCIe lanes, port USB, dukungan overclocking. Seri chipset: Intel (H, B, Z-series) dan AMD (A, B, X-series).',
      },
      {
        title: 'Slot Ekspansi',
        imageUrl: 'https://images.unsplash.com/photo-1555618254-5a3d78e2f888?w=800&h=400&fit=crop',
        content:
          'PCIe x16: Untuk GPU, mendukung PCIe 5.0 pada motherboard terkini (bandwidth 64GB/s). PCIe x1/x4: Untuk expansion card seperti WiFi, sound card, capture card. M.2 Slot: Untuk SSD NVMe super cepat (hingga 7000+ MB/s). DIMM Slot: Untuk RAM, motherboard mainstream memiliki 2-4 slot.',
      },
      {
        title: 'Port & Konektor',
        imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&h=400&fit=crop',
        content:
          'Back Panel I/O: USB (Type-A, Type-C, berbagai versi 2.0/3.0/3.1/3.2), HDMI/DisplayPort untuk display terintegrasi, Ethernet (RJ45, 1Gbps/2.5Gbps/10Gbps), Audio jacks, WiFi antenna connectors. Internal: SATA untuk HDD/SSD 2.5", USB headers, fan headers (CPU_FAN, SYS_FAN), front panel connectors (power, reset, LED).',
      },
    ],
  },
  {
    id: 'storage',
    name: 'Storage (Penyimpanan)',
    shortDescription:
      'Media penyimpanan data permanen untuk sistem operasi, aplikasi, dan file pengguna.',
    icon: 'HardDrive',
    imageUrl: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=600&h=400&fit=crop',
    subMaterials: [
      {
        title: 'Fungsi Storage',
        imageUrl: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&h=400&fit=crop',
        content:
          'Storage adalah media penyimpanan non-volatile yang menyimpan data secara permanen meski komputer dimatikan. Storage menyimpan sistem operasi, aplikasi, game, dokumen, foto, video, dan semua file pengguna. Kecepatan storage sangat mempengaruhi boot time dan loading aplikasi.',
      },
      {
        title: 'HDD (Hard Disk Drive)',
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
        content:
          'HDD menggunakan piringan magnetik berputar (5400/7200 RPM) dan head mekanik untuk membaca/menulis data. Kelebihan: harga murah per GB, kapasitas besar (1-22TB), cocok untuk penyimpanan data masif. Kekurangan: lambat (80-160 MB/s), rentan guncangan fisik, bising, boros daya.',
      },
      {
        title: 'SSD SATA (2.5")',
        imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=400&fit=crop',
        content:
          'SSD SATA menggunakan flash memory tanpa komponen bergerak. Kecepatan dibatasi interface SATA III (maks 550 MB/s). Jauh lebih cepat dari HDD, lebih tahan guncangan, silent, hemat daya. Cocok untuk upgrade dari HDD atau sebagai storage game/library. Harga semakin terjangkau untuk kapasitas 500GB-2TB.',
      },
      {
        title: 'SSD NVMe M.2',
        imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&h=400&fit=crop',
        content:
          'SSD NVMe menggunakan interface PCIe melalui slot M.2 dengan kecepatan sangat tinggi. Gen3: hingga 3500 MB/s, Gen4: hingga 7400 MB/s, Gen5: hingga 14.000 MB/s. Tidak ada kabel — langsung tertancap di motherboard. Ideal untuk OS dan aplikasi yang membutuhkan loading cepat. Perhatikan: tidak semua M.2 slot mendukung NVMe (ada yang SATA-only).',
      },
      {
        title: 'Tips Memilih Storage',
        imageUrl: 'https://images.unsplash.com/photo-1555618254-5a3d78e2f888?w=800&h=400&fit=crop',
        content:
          'Rekomendasi build modern: NVMe SSD 500GB-1TB untuk OS + aplikasi (boot dalam hitungan detik), SSD SATA 1-2TB untuk game library, HDD 4TB+ untuk penyimpanan data massal (video, backup). Pastikan motherboard memiliki slot M.2 yang cukup. Pertimbangkan endurance (TBW — Total Bytes Written) untuk SSD yang sering ditulis.',
      },
    ],
  },
  {
    id: 'psu',
    name: 'PSU (Power Supply Unit)',
    shortDescription:
      'Unit catu daya yang mengkonversi arus AC menjadi DC untuk didistribusikan ke seluruh komponen PC.',
    icon: 'Zap',
    imageUrl: 'https://images.unsplash.com/photo-1587202372635-348c9c2afc6b?w=600&h=400&fit=crop',
    subMaterials: [
      {
        title: 'Fungsi PSU',
        imageUrl: 'https://images.unsplash.com/photo-1587202372635-348c9c2afc6b?w=800&h=400&fit=crop',
        content:
          'PSU (Power Supply Unit) mengkonversi arus bolak-balik (AC 220V) dari stop kontak menjadi arus searah (DC) yang dibutuhkan komponen PC (3.3V, 5V, 12V). PSU juga menstabilkan tegangan dan melindungi komponen dari fluktuasi listrik. PSU yang buruk dapat merusak komponen lain atau menyebabkan system crash.',
      },
      {
        title: 'Rating Watt & Kebutuhan Daya',
        imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&h=400&fit=crop',
        content:
          'Kapasitas PSU diukur dalam Watt. Estimasi kebutuhan: Office/entry PC: 300-450W, Gaming mid-range: 550-650W, Gaming high-end: 750-850W, Workstation/enthusiast: 1000W+. Pilih PSU dengan headroom 20-30% dari total konsumsi sistem untuk efisiensi optimal dan ruang upgrade. Gunakan kalkulator PSU online untuk estimasi akurat.',
      },
      {
        title: 'Sertifikasi 80 Plus',
        imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&h=400&fit=crop',
        content:
          'Sertifikasi efisiensi energi PSU: 80 Plus (82% efisien), Bronze (85%), Silver (87%), Gold (90%), Platinum (92%), Titanium (94%). PSU dengan rating lebih tinggi menghasilkan panas lebih sedikit, lebih hemat listrik, dan umumnya menggunakan komponen internal yang lebih berkualitas.',
      },
      {
        title: 'Modular vs Non-Modular',
        imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&h=400&fit=crop',
        content:
          'Non-Modular: Semua kabel terpasang permanen — murah tapi kabel berantakan dan airflow terganggu. Semi-Modular: Kabel 24-pin dan CPU 8-pin permanen, sisanya bisa dilepas — pilihan balance terbaik. Fully Modular: Semua kabel bisa dilepas — termahal tapi manajemen kabel paling rapi dan airflow optimal.',
      },
      {
        title: 'Proteksi & Keamanan',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
        content:
          'Fitur proteksi penting pada PSU: OVP (Over Voltage Protection), UVP (Under Voltage Protection), OCP (Over Current Protection), OPP (Over Power Protection), OTP (Over Temperature Protection), SCP (Short Circuit Protection). Pilih PSU dari merek terpercaya (Seasonic, Corsair, EVGA, Be Quiet, Cooler Master) dan jangan menghemat budget untuk PSU.',
      },
    ],
  },
  {
    id: 'casing',
    name: 'Casing (Chassis)',
    shortDescription:
      'Rumah pelindung yang menyatukan seluruh komponen PC sekaligus mengatur sirkulasi udara dan estetika.',
    icon: 'Box',
    imageUrl: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&h=400&fit=crop',
    subMaterials: [
      {
        title: 'Fungsi Casing',
        imageUrl: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=400&fit=crop',
        content:
          'Casing bukan hanya kotak untuk menyimpan komponen. Fungsinya mencakup: (1) Melindungi komponen dari debu, benturan, dan gangguan fisik; (2) Mengatur aliran udara (airflow) untuk pendinginan optimal; (3) Mengurangi noise dari komponen; (4) Menyediakan struktur mounting yang sesuai standar; (5) Estetika dan personalisasi build.',
      },
      {
        title: 'Form Factor Casing',
        imageUrl: 'https://images.unsplash.com/photo-1587202372635-348c9c2afc6b?w=800&h=400&fit=crop',
        content:
          'Full Tower: Mendukung E-ATX, banyak slot drive dan fan, ideal untuk water cooling custom. Mid Tower: Mendukung ATX, ukuran paling populer untuk gaming/build umum. Micro-ATX Tower: Lebih ringkas, mendukung mATX. Mini-ITX/SFF (Small Form Factor): Sangat kecil, tantangan untuk manajemen kabel dan pendinginan. Pilih casing yang sesuai dengan ukuran motherboard.',
      },
      {
        title: 'Airflow & Kipas',
        imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&h=400&fit=crop',
        content:
          'Prinsip airflow: Udara dingin masuk dari depan/bawah (intake), udara panas keluar dari belakang/atas (exhaust). Konfigurasi ideal: 2-3 intake fan di depan, 1 exhaust fan di belakang, opsional 1-2 exhaust di atas. Positive pressure (lebih banyak intake) mengurangi debu. Perhatikan dukungan fan: ukuran (120mm/140mm), jumlah mounting point, dan filter debu.',
      },
      {
        title: 'Material & Build Quality',
        imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&h=400&fit=crop',
        content:
          'Material casing umum: Steel (SPCC/SECC) — kokoh dan murah; Aluminium — ringan dan premium; Tempered Glass — side panel bening untuk showcase. Kualitas build dilihat dari: ketebalan panel, finishing (powder coating), rubber grommets untuk manajemen kabel, tool-less design untuk drive bay, dan filter debu yang mudah dilepas-dibersihkan.',
      },
      {
        title: 'Fitur Modern Casing',
        imageUrl: 'https://images.unsplash.com/photo-1555618254-5a3d78e2f888?w=800&h=400&fit=crop',
        content:
          'Fitur yang perlu diperhatikan: PSU shroud (penutup PSU) untuk tampilan lebih rapi, cable management space (ruang di belakang motherboard tray), USB-C front panel, ARGB hub/fan controller, radiator support (240/280/360mm untuk AIO liquid cooling), GPU clearance maksimum (semakin tebal GPU modern membutuhkan ruang lebih), dan vertical GPU mount untuk showcase kartu grafis.',
      },
    ],
  },
]

export default hardwareData