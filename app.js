const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const sequelize = require("./models/db");

// Import des routes
const utilisateurRoutes = require("./routes/utilisateurRoutes");
const contenuRoutes = require("./routes/contenuRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const commentaireRoutes = require("./routes/commentaireRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Import du service de synchronisation
const synchronizeDatabase = require("./services/databaseService");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/utilisateurs", utilisateurRoutes);
app.use("/contenus", contenuRoutes);
app.use("/medias", mediaRoutes);
app.use("/commentaires", commentaireRoutes);
app.use("/notifications", notificationRoutes);

// Lancement du serveur avec synchronisation de la base de données
(async () => {
  try {
    await synchronizeDatabase(); // Synchronisation des tables
    app.listen(PORT, () => {
      console.log(`Server running on`);
    });
  } catch (error) {
    console.error("Erreur au démarrage de l'application :", error);
  }
})();


sequelize.authenticate()
  .then(() => {
    console.log("Connexion à la base de données Azure réussie !");
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données :", error);
  });
