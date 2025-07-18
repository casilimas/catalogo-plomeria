const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  telefono: {
    type: String,
    required: true,
    unique: true, // Para evitar duplicados
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
