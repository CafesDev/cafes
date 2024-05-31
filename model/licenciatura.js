const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize")

const licenciaturas = sequelize.define('licenciaturas', {
    clave: {
        type: DataTypes.STRING(4),
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    departamento: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
}, {
    tableName: 'licenciaturas',
    createdAt: false, 
    updatedAt: false 
});

module.exports = licenciaturas;