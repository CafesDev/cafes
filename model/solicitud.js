const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize")
const solicitantes = require('../model/solicitante');
const tipos_servicio = require('../model/tipo_servicio');
const organizacion = require('../model/organizacion');

const solicitudes = sequelize.define('solicitudes', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    },
    id_solicitante: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nombre: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    tipo_servicio: {
        type: DataTypes.STRING(3),
        allowNull: true
    },
    id_organizacion: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('Aceptada', 'Rechazada', 'Espera'),
        allowNull: false,
        defaultValue: 'Espera'
    }
}, {
    tableName: 'solicitudes',
    createdAt: false, 
    updatedAt: false 
});

solicitudes.belongsTo(solicitantes, { foreignKey: 'id_solicitante' });
solicitudes.belongsTo(tipos_servicio, { foreignKey: 'tipo_servicio' });
solicitudes.belongsTo(organizacion, { foreignKey: 'id_organizacion' });

module.exports = solicitudes;