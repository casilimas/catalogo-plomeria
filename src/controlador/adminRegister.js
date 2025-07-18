const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

// 🔐 Función para generar token
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// 🧾 Registrar un nuevo administrador
const registrarAdmin = async (req, res) => {
  try {
    const { nombre, email, password, telefono } = req.body;

    if (!nombre || !email || !password || !telefono) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const adminExistente = await Admin.findOne({ email });
    if (adminExistente) {
      return res.status(400).json({ message: "Ya existe un admin con ese correo" });
    }

    const nuevoAdmin = new Admin({ nombre, email, password, telefono });
    await nuevoAdmin.save();

    const token = generarToken(nuevoAdmin._id);

    res.status(201).json({
      token,
      admin: {
        id: nuevoAdmin._id,
        nombre: nuevoAdmin.nombre,
        email: nuevoAdmin.email,
        telefono: nuevoAdmin.telefono,
      },
    });
  } catch (error) {
    console.error("Error al registrar admin:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = { registrarAdmin };
