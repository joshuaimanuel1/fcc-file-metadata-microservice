require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// Impor 'multer'
const multer = require("multer");

// Konfigurasi Multer
// Kita tidak perlu menyimpan file secara permanen,
// jadi kita gunakan 'memoryStorage' agar file disimpan di RAM
// sebagai objek Buffer.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Middleware ---
app.use(cors());
// Sajikan file statis (CSS) dari folder 'public'
app.use("/public", express.static(process.cwd() + "/public"));

// --- Halaman Utama ---
// Sajikan file HTML dari folder 'views'
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// --- API Endpoint (Tes 2, 3, dan 4) ---

/**
 * Endpoint ini menerima file yang di-upload.
 * Kita gunakan middleware 'upload.single('upfile')'.
 * 'upfile' harus cocok dengan atribut 'name' di form HTML (Tes 3).
 * Multer akan memproses file dan menaruh infonya di 'req.file'.
 */
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  try {
    // Jika tidak ada file yang di-upload, req.file akan 'undefined'
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // (Tes 4) Buat respons JSON sesuai format yang diminta
    const fileMetadata = {
      name: req.file.originalname, // Nama asli file
      type: req.file.mimetype, // Tipe MIME file (mis. 'image/png')
      size: req.file.size, // Ukuran file dalam bytes
    };

    res.json(fileMetadata);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// --- Listener ---
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
