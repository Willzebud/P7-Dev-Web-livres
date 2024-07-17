const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  if (MIME_TYPES[file.mimetype]) {
    callback(null, true);
  } else {
    callback(new Error("Invalid file type. Only JPG and PNG files are allowed."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("image");

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return next();
    }

    const name = path.parse(req.file.originalname).name.split(" ").join("_");
    const filename = `${name + Date.now()}`;

    sharp(req.file.buffer)
      .resize(800)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toFile(`images/${filename}.jpeg`, (err, info) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        req.file.filename = `${filename}.jpeg`;
        next();
      });
  });
};

