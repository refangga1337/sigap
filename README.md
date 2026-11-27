# SiGap — Manajemen Stok Toko

Aplikasi manajemen stok, harga, HPP, dan laporan penjualan untuk toko kecil.
Vanilla JS, tanpa build step, offline-first (service worker + localStorage).

## Fitur
- Onboarding 3 langkah (nama toko, jenis, PIN)
- Dashboard KPI: penjualan, laba, stok menipis, expired, nilai stok
- Stok: produk, kategori, barcode, HPP, margin, stock in/out, batch expiry + FIFO
- Kasir/POS: scan atau cari, keranjang, bayar tunai/QRIS/transfer/kartu, struk cetak, batal + restore stok
- Purchase order + supplier, penerimaan barang
- Opname stok, daftar expired & hampir expired, tarik batch
- Kas keluar, laporan omzet/laba/terlaris, export JSON & CSV, import backup
- PIN + kunci otomatis, audit log
- PWA installable (manifest + service worker + ikon)

## Jalankan
Buka `index.html` lewat HTTP(S) (kamera butuh HTTPS):
```bash
python3 -m http.server 8080
```

## Deploy
`vercel deploy --prod` (static, tanpa framework).

## Uji
`node --check app.js` untuk sintaks; smoke test DOM tersedia terpisah (jsdom).
