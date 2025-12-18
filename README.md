```md
# SIMS PPOB – Take Home Test (React JS)

Web application SIMS PPOB (Payment Point Online Bank) yang dibangun sebagai bagian dari **Take Home Test Web Programmer (React JS)**.  
Aplikasi ini mengimplementasikan fitur autentikasi, top up saldo, pembayaran layanan, riwayat transaksi, serta manajemen profil pengguna.

🔗 **Live Demo**  
https://sims-ppob-deklanmalik.vercel.app/


## 📌 Teknologi yang Digunakan
- **React JS**
- **TypeScript**
- **React Router v7**
- **Redux Toolkit & RTK Query**
- **Tailwind CSS**
- **JWT Authentication**
- **Vite**


## ✨ Fitur Utama

### 🔐 Authentication
- Login & Register
- Proteksi halaman menggunakan JWT
- Auto logout jika token tidak valid / expired

### 🏠 Dashboard
- Menampilkan saldo user
- Menampilkan layanan pembayaran
- Banner promo (carousel)

### 💳 Top Up
- Input nominal top up (Rp10.000 – Rp1.000.000)
- Preset nominal
- Validasi input
- Konfirmasi Top Up
- Modal sukses & gagal
- Saldo otomatis ter-update setelah top up

### 🧾 Transaksi
- Pembayaran layanan
- Konfirmasi pembayaran
- Riwayat transaksi
- Pagination (Show More)
- Data diurutkan dari transaksi terbaru

### 👤 Profile
- Menampilkan data user
- Update nama depan & belakang
- Upload foto profil (JPEG / PNG, max 100KB)
- Default avatar jika belum upload
- Logout
```
## ⚙️ Cara Menjalankan Project (Local)

### 1️⃣ Clone Repository
```bash
git clone https://github.com/DeklanMA/-SIMS-PPOB--Take-Home-Test.git
cd -SIMS-PPOB--Take-Home-Test
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Konfigurasi Environment

Buat file `.env`:

```env
VITE_API_BASE_URL=https://your-api-url.com
```

### 4️⃣ Jalankan Aplikasi

```bash
npm run dev
```

Aplikasi akan berjalan di:

```
http://localhost:5173
```

---

## 🔑 Catatan Penting

* Semua API menggunakan **Bearer Token (JWT)**
* Email user diambil dari payload JWT
* Validasi input dilakukan di sisi client
* Aplikasi di-deploy menggunakan **free hosting**

---

## 👨‍💻 Author

**Deklan Malik Akbar**
Web Programmer (React JS)


```


