const express = require("express");
const router = express.Router();

const { crearProducto, obtenerProductos } = require("../controlador/productoControlador");
const editarProducto = require("../controlador/editarProducto");

const proteger = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Rutas públicas
router.get("/productos", obtenerProductos);

// Rutas protegidas
router.post("/productos", proteger, upload.single("file"), crearProducto);
router.put("/productos/:id", proteger, upload.single("file"), editarProducto);

module.exports = router;
