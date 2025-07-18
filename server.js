const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); 
const productoRuta = require("./src/rutas/producto.ruta"); 
const adminRuta = require("./src/rutas/admin.ruta"); 
const usuarioRuta = require("./src/rutas/usuario.ruta");
const cotizacionRuta = require("./src/rutas/cotizacion.ruta");
const loginAdminRoutes = require("./src/rutas/loginAdmin.ruta");


// Configuración de entorno
dotenv.config();

// Conexión a la base de datos
connectDB();

// Inicializar Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas API
app.use("/api", productoRuta);
app.use("/api", adminRuta); 
app.use("/api", usuarioRuta);
app.use("/api", cotizacionRuta);
app.use("/api", loginAdminRoutes);


// Ruta base
app.get("/", (req, res) => {
  res.send("🚀 API Catálogo Plomería corriendo...");
});

// Puerto
const PORT = process.env.PORT || 3900;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
