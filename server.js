const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Simple upload route
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("File received:", req.file);
  res.json({ message: "File uploaded successfully", file: req.file });
});

// Health check
app.get("/", (req, res) => {
  res.send("Multer test app is running");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
