const express = require("express");
const router = express.Router();
const { registrarUsuario } = require("../controlador/usuarioControlador");

// Ruta pública: POST /api/usuarios/registro
router.post("/usuarios/registro", registrarUsuario);

module.exports = router;
