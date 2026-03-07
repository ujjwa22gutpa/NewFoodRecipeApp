
const multer = require('multer');
const path = require('path');// for handling file paths
const fs = require('fs');

const uploadDir = path.join(__dirname, '../../public/images');

// Create directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + '-' + Math.random().toString(36).substring(7) + path.extname(file.originalname); // unique filename with original extension
    cb(null, fileName);
  }
});

const upload = multer({ 
  storage: storage,
});

module.exports = { upload };