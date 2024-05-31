const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize")

const organizacion = sequelize.define('organizaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre_organizacion: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: false
    }, 
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
}, {
    tableName: 'organizaciones',
    createdAt: false, 
    updatedAt: false 
});

module.exports = organizacion;