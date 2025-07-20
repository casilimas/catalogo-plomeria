// models/Product.js
const mongoose = require("mongoose");

const varianteSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  medida: {
    type: String,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
  }
}, { _id: false });

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
  },
  variantes: {
    type: [varianteSchema],
    required: true,
    validate: v => v.length > 0,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);
