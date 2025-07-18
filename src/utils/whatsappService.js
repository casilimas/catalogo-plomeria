// ✅ src/utils/whatsappService.js
const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const enviarWhatsapp = async (telefono, mensaje) => {
  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM, // 📦 Variable desde .env
      to: `whatsapp:${telefono}`,
      body: mensaje,
    });
  } catch (error) {
    console.error("❌ Error al enviar WhatsApp:", error.message);
    throw error;
  }
};

module.exports = { enviarWhatsapp };
