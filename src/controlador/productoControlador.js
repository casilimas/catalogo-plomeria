// src/controlador/productoControlador.js
const Product = require("../models/Product");
const { subirImagenBuffer } = require("../utils/cloudinary");

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, categoria, destacado, variantes } = req.body;

    if (!nombre || !categoria || !req.file || !variantes) {
      return res.status(400).json({ message: "Faltan campos obligatorios o imagen o variantes" });
    }

    const parsedVariantes = JSON.parse(variantes); // ← asegúrate que variantes llegue como string (si usas formData)

    if (!Array.isArray(parsedVariantes) || parsedVariantes.length === 0) {
      return res.status(400).json({ message: "Debes proporcionar al menos una variante con medida y precio" });
    }

    const resultadoImagen = await subirImagenBuffer(req.file.buffer, req.file.originalname);

    const nuevoProducto = new Product({
      nombre,
      descripcion,
      imagen: resultadoImagen.secure_url,
      categoria,
      destacado: destacado || false,
      variantes: parsedVariantes.map(v => ({
        medida: v.medida,
        precio: v.precio,
      })),
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
