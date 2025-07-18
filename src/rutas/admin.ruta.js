// src/rutas/admin.ruta.js
const express = require("express");
const router = express.Router();
const { registrarAdmin } = require("../controlador/adminRegister");
const { listarAdmins } = require("../controlador/listarAdmins");
const { listarUsuarios } = require("../controlador/listarUsuarios");
const { borrarAdmin } = require("../controlador/borrarAdmin");
const proteger = require("../middlewares/authMiddleware"); // ✅

router.post("/admin/registro", registrarAdmin);

// ✅ Solo accesibles con token válido:
router.get("/admins", proteger, listarAdmins);
router.get("/usuarios", proteger, listarUsuarios);
router.delete("/admin/:id", proteger, borrarAdmin);

module.exports = router;
