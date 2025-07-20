const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const { Readable } = require("stream");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Subir imagen desde buffer (para productos)
const subirImagenBuffer = (buffer, nombreArchivo) => {
  return new Promise((resolve, reject) => {
    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "productos",
        public_id: `productos/${nombreArchivo}`,
      },
      (error, result) => {
        if (error) {
          console.error("❌ Error al subir imagen:", error);
          return reject(error);
        }
        resolve(result);
      }
    );

    readable.pipe(stream);
  });
};

module.exports = {
  subirImagenBuffer,
};
