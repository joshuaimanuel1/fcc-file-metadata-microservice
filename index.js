require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");


const multer = require("multer");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.use(cors());

app.use("/public", express.static(process.cwd() + "/public"));


app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});


app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  try {
    
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    
    const fileMetadata = {
      name: req.file.originalname, 
      type: req.file.mimetype, 
      size: req.file.size,
    };

    res.json(fileMetadata);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
