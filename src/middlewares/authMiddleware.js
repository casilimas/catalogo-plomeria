// src/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const proteger = async (req, res, next) => {
  let token;

  // Verifica si el header contiene el token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extraer token
      token = req.headers.authorization.split(" ")[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar al admin por ID y adjuntarlo a req
      const admin = await Admin.findById(decoded.id).select("-password");
      if (!admin) {
        return res.status(401).json({ message: "Admin no autorizado" });
      }

      req.admin = admin;
      next(); // ✅ continuar con el controlador
    } catch (error) {
      console.error("Error en auth middleware:", error);
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  } else {
    return res.status(401).json({ message: "No se proporcionó token" });
  }
};

module.exports = proteger;
