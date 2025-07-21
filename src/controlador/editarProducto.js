// src/controlador/editarProducto.js
const Product = require("../models/Product");
const { subirImagenBuffer } = require("../utils/cloudinary");

const editarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, categoria, destacado, variantes } = req.body;

    const producto = await Product.findById(id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const parsedVariantes = JSON.parse(variantes);
    if (!Array.isArray(parsedVariantes) || parsedVariantes.length === 0) {
      return res.status(400).json({ message: "Debes proporcionar al menos una variante" });
    }

    // Si hay nueva imagen
    if (req.file) {
      const resultadoImagen = await subirImagenBuffer(req.file.buffer, req.file.originalname);
      producto.imagen = resultadoImagen.secure_url;
    }

    producto.nombre = nombre || producto.nombre;
    producto.descripcion = descripcion || producto.descripcion;
    producto.categoria = categoria || producto.categoria;
    producto.destacado = destacado || false;
    producto.variantes = parsedVariantes;

    const actualizado = await producto.save();
    res.status(200).json(actualizado);
  } catch (error) {
    console.error("Error al editar producto:", error);
    res.status(500).json({ message: "Error al editar producto" });
  }
};

module.exports = editarProducto;
