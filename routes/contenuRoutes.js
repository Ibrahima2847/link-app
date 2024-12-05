const express = require("express");
const router = express.Router();
const { upload, uploadToAzure } = require("../middlewares/upload");
const contenuController = require("../controllers/contenuController");

router.post("/create", upload.single("media"), uploadToAzure, contenuController.createContenuWithMedia);

module.exports = router;
