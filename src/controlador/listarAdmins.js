// ✅ src/controlador/listarAdmins.js
const Admin = require("../models/Admin");

const listarAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-__v -createdAt -updatedAt");
    res.status(200).json(admins);
  } catch (error) {
    console.error("❌ Error al listar administradores:", error);
    res.status(500).json({ message: "Error al obtener los administradores" });
  }
};

module.exports = { listarAdmins };
