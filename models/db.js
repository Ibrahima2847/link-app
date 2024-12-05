const { Sequelize } = require("sequelize");

// Configuration pour SQL Server
const sequelize = new Sequelize("desa-db", "sqladmin", "@desa-0506", {
  host: "desa-sql-server.database.windows.net", // Nom de ton serveur Azure
  dialect: "mssql", // Utilisation de SQL Server
  dialectOptions: {
    options: {
      encrypt: true, // Nécessaire pour Azure
      trustServerCertificate: false,
    },
  },
  logging: console.log, // Désactive les logs SQL si besoin avec `false`
});

module.exports = sequelize;
