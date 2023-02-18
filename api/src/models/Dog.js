const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("dog", {
    id: {
      type: DataTypes.UUID, //Universally Unique Identifiers
      defaultValue: Sequelize.UUIDV4, //Versión 4 (Más utilizada)
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING, //Utilizo URL.
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lifeSpan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
