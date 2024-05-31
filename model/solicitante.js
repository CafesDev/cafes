const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize")
const municipio = require('../model/municipio');

const solicitantes = sequelize.define('solicitantes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombres: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    apellido_paterno: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    apellido_materno: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    domicilio: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    id_municipio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'solicitantes',
    createdAt: false, 
    updatedAt: false 
});

solicitantes.belongsTo(municipio, { foreignKey: 'id_municipio' });
module.exports = solicitantes;