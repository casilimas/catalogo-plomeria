// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String, // URL de Cloudinary
  },
  categoria: {
    type: String,
    required: true,
  },
  destacado: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);
