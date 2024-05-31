const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize")

const municipio = sequelize.define('municipios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Municipio: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Estado: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Pais: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'municipios',
    createdAt: false, 
    updatedAt: false 
});

module.exports = municipio;