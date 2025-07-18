const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios." });
    }

    // Buscar admin por email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Administrador no encontrado." });
    }

    // Comparar contraseña
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Inicio de sesión exitoso.",
      token,
      admin: {
        id: admin._id,
        nombre: admin.nombre,
        email: admin.email,
        telefono: admin.telefono,
      },
    });
  } catch (error) {
    console.error("❌ Error en loginAdmin:", error);
    res.status(500).json({ message: "Error en el servidor al iniciar sesión." });
  }
};

module.exports = { loginAdmin };
