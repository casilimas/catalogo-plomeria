// src/controlador/productoControlador.js
const Product = require("../models/Product");
const { subirImagenBuffer } = require("../utils/cloudinary");

// 🧾 Obtener todos los productos (ruta pública)
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Product.find().sort({ createdAt: -1 }); // del más reciente al más antiguo
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

// 🛠 Crear un nuevo producto (ruta protegida con imagen)
const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, destacado } = req.body;

    if (!nombre || !precio || !categoria || !req.file) {
      return res.status(400).json({ message: "Faltan campos obligatorios o imagen" });
    }

    const resultadoImagen = await subirImagenBuffer(req.file.buffer, req.file.originalname);

    const nuevoProducto = new Product({
      nombre,
      descripcion,
      precio,
      imagen: resultadoImagen.secure_url,
      categoria,
      destacado: destacado || false,
    });

    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = {
  obtenerProductos,
  crearProducto,
};
