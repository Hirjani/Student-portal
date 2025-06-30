const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const secret = process.env.JWT_SECRET;
const fs = require("fs");

const generateToken = (payload, options = { expiresIn: "30d" }) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token);
    });
  });
};

const uploadDir = "uploads/profiles/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Configure Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept images and documents
    if (file.fieldname === "photo") {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed for photo"), false);
      }
    } else if (file.fieldname === "resume") {
      if (
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only PDF and DOC files are allowed for resume"), false);
      }
    } else {
      cb(null, true);
    }
  },
});

// Export upload middleware for multiple files
const uploadFiles = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

module.exports = {
  generateToken,
  uploadFiles,
};
