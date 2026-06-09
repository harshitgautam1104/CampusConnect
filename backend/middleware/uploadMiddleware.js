const multer = require('multer');
const path = require('path');

// Storage setting
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Sab files 'uploads' folder mein jayengi
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const upload = multer({ storage });

module.exports = upload;