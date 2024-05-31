const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize")

const tipos_colaborador = sequelize.define('tipos_colaborador', {
    clave: {
        type: DataTypes.STRING(3),
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'tipos_colaborador',
    createdAt: false, 
    updatedAt: false 
});

module.exports = tipos_colaborador;