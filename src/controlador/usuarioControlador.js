const User = require("../models/User");

// 🧾 Registrar usuario visitante para cotización
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, telefono } = req.body;

    if (!nombre || !telefono) {
      return res.status(400).json({ message: "Nombre y teléfono son obligatorios" });
    }

    // Verificar si ya existe
    const existente = await User.findOne({ telefono });
    if (existente) {
      return res.status(200).json({ message: "Ya estás registrado", user: existente });
    }

    // Crear nuevo usuario
    const nuevoUsuario = new User({ nombre, telefono });
    const guardado = await nuevoUsuario.save();

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: guardado
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = { registrarUsuario };
