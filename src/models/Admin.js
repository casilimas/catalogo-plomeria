const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true, // Puedes hacer que no sea requerido si lo prefieres
    trim: true,
  },
}, {
  timestamps: true,
});

// 🔐 Middleware para hashear contraseña solo si es nueva o modificada
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔍 Método para comparar contraseña ingresada con la encriptada
adminSchema.methods.compararPassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);
