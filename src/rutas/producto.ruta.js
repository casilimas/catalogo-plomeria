// src/rutas/producto.ruta.js
const express = require("express");
const router = express.Router();
const { crearProducto, obtenerProductos } = require("../controlador/productoControlador"); 
const proteger = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// 📌 Ruta pública: Ver todos los productos
router.get("/productos", obtenerProductos);

// ✅ Ruta protegida con subida de imagen
router.post("/productos", proteger, upload.single("file"), crearProducto);

module.exports = router;
