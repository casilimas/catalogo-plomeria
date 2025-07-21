const express = require("express");
const router = express.Router();

const { registrarAdmin } = require("../controlador/adminRegister");
const { listarAdmins } = require("../controlador/listarAdmins");
const { listarUsuarios } = require("../controlador/listarUsuarios");
const { borrarAdmin } = require("../controlador/borrarAdmin");
const { borrarUsuario } = require("../controlador/borrarUsuario"); // ✅ nuevo controlador

const proteger = require("../middlewares/authMiddleware");

// ✅ Registro de administrador (público o autenticado según tu lógica)
router.post("/admin/registro", registrarAdmin);

// ✅ Rutas protegidas
router.get("/admins", proteger, listarAdmins);
router.get("/usuarios", proteger, listarUsuarios);

// ✅ Rutas dinámicas SIEMPRE van al final para evitar conflictos
router.delete("/admin/:id", proteger, borrarAdmin);
router.delete("/usuario/:id", proteger, borrarUsuario); // ← nueva ruta

module.exports = router;
