// ✅ src/controlador/listarUsuarios.js
const Usuario = require("../models/User");

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-__v -createdAt -updatedAt");
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("❌ Error al listar usuarios:", error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

module.exports = { listarUsuarios };
