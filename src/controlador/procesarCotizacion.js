const { enviarWhatsapp } = require("../utils/whatsappService");
const Admin = require("../models/Admin");

const procesarCotizacion = async (req, res) => {
  try {
    const { nombre, telefono, productos } = req.body;

    if (!nombre || !telefono || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ message: "Nombre, teléfono y productos son obligatorios" });
    }

    // 🧾 Crear mensaje de texto con la cotización
    let mensaje = `📋 Cotización para: ${nombre}\n📱 Teléfono: ${telefono}\n\n🛒 Productos:\n`;

    let total = 0;
    productos.forEach((p, i) => {
      const subtotal = p.cantidad * p.precioUnitario;
      total += subtotal;
      mensaje += `${i + 1}. ${p.nombre} - ${p.cantidad} x $${p.precioUnitario} = $${subtotal.toFixed(2)}\n`;
    });

    mensaje += `\n💰 Total: $${total.toFixed(2)}`;

    // Lista de teléfonos ya notificados para evitar duplicados
    const telefonosNotificados = new Set();

    // 📲 Enviar al cliente
    if (!telefonosNotificados.has(telefono)) {
      await enviarWhatsapp(telefono, mensaje);
      telefonosNotificados.add(telefono);
    }

    // 📲 Enviar a todos los administradores (evitar duplicados)
    const admins = await Admin.find();
    for (const admin of admins) {
      if (!telefonosNotificados.has(admin.telefono)) {
        await enviarWhatsapp(admin.telefono, mensaje);
        telefonosNotificados.add(admin.telefono);
      }
    }

    res.status(200).json({
      message: "Cotización enviada por WhatsApp sin generar PDF.",
    });
  } catch (error) {
    console.error("❌ Error al procesar cotización:", error);
    res.status(500).json({ message: "Error al enviar la cotización por WhatsApp" });
  }
};

module.exports = { procesarCotizacion };
