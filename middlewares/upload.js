const multer = require("multer");
const { uploadFileToAzure } = require("../services/azureBlobService");

const storage = multer.memoryStorage(); // Stocker les fichiers en mémoire pour les uploader directement
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limite de 50 Mo
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "video/mp4", "video/mkv"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Type de fichier non supporté"), false);
    }
  },
});

const uploadToAzure = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier téléchargé" });
    }

    const fileUrl = await uploadFileToAzure(req.file); // Télécharge vers Azure
    req.fileUrl = fileUrl; // Ajoute l'URL du fichier dans `req` pour l'utiliser dans les contrôleurs

    next(); // Passe au middleware suivant ou au contrôleur
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors du téléchargement sur Azure" });
  }
};

module.exports = { upload, uploadToAzure };
