const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔄 Subir archivo PDF directamente desde buffer
const subirPDFBuffer = async (buffer, nombrePublico) => {
  return await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // para PDF
        folder: "cotizaciones",
        public_id: nombrePublico,
      },
      (error, result) => {
        if (error) {
          console.error("❌ Error al subir buffer a Cloudinary:", error);
          return reject(error);
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

module.exports = {
  cloudinary,
  subirPDFBuffer,
};
