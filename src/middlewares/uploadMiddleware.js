// src/middlewares/uploadMiddleware.js
const multer = require("multer");

// Usamos almacenamiento en memoria (buffer), ideal para subir a Cloudinary sin guardar en disco
const storage = multer.memoryStorage();

// Filtro para aceptar solo imágenes JPG, PNG, JPEG
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos .jpeg, .jpg o .png"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // máximo 5MB
});

module.exports = upload;
