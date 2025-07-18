// ✅ src/controlador/borrarAdmin.js
const Admin = require("../models/Admin");

const borrarAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const adminEliminado = await Admin.findByIdAndDelete(id);

    if (!adminEliminado) {
      return res.status(404).json({ message: "Administrador no encontrado" });
    }

    res.status(200).json({ message: "Administrador eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al borrar admin:", error);
    res.status(500).json({ message: "Error al eliminar el administrador" });
  }
};

module.exports = { borrarAdmin };
