// src/rutas/cotizacion.ruta.js
const express = require("express");
const router = express.Router();
const { procesarCotizacion } = require("../controlador/procesarCotizacion");

// 📌 Ruta pública para procesar cotización
router.post("/cotizacion", procesarCotizacion);

module.exports = router;
