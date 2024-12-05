const Contenu = require("../models/contenu");
const Media = require("../models/media");

exports.createContenuWithMedia = async (req, res) => {
  const { user_id, title, body, is_public } = req.body;

  try {
    if (!req.fileUrl) {
      return res.status(400).json({ message: "Aucun fichier téléchargé" });
    }

    const fileType = req.file.mimetype.startsWith("image") ? "image" : "video";

    const contenu = await Contenu.create({
      user_id,
      title,
      body,
      is_public,
    });

    const media = await Media.create({
      file_path: req.fileUrl, // URL du fichier sur Azure
      type: fileType,
      contenu_id: contenu.id,
    });

    res.status(201).json({
      message: "Contenu et média créés avec succès",
      contenu,
      media,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
