const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize")

const tipos_servicios = sequelize.define('tipos_servicio', {
    clave: {
        type: DataTypes.STRING(3),
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'tipos_servicio',
    createdAt: false, 
    updatedAt: false 
});



module.exports = tipos_servicios;