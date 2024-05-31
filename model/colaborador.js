const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize")
const licenciaturas = require('../model/licenciatura');
const tipos_colaborador  = require('../model/tipo_colaborador');

const colaboradores = sequelize.define('colaboradores', {
    matricula: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    clave_licenciatura: {
        type: DataTypes.STRING(4),
        allowNull: false
    },
    nombres: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING(3),
        allowNull: true
    },
    apellido_paterno: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    apellido_materno: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    correo_personal: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('Activo', 'Inactivo'),
        allowNull: true,
        defaultValue: 'Activo'
    }
}, {
    tableName: 'colaboradores',
    createdAt: false, 
    updatedAt: false 
});

colaboradores.belongsTo(licenciaturas, { foreignKey: 'clave_licenciatura' });
colaboradores.belongsTo(tipos_colaborador, { foreignKey: 'tipo' });

module.exports = colaboradores;