const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize")
const solicitudes = require('../model/solicitud');
const colaboradores = require('../model/colaborador');

const proyecto = sequelize.define('proyectos', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    id_solicitud: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    id_responsable: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    nombre: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('Pendiente', 'Desarrollo', 'Terminado'),
        allowNull: false,
        defaultValue: 'Pendiente'
    },
    semestre: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    particion: {
        type: DataTypes.ENUM('_1', '_2'),
        allowNull: true,
    },
    fecha_limite: {
        type: DataTypes.DATE,
        allowNull: false
    },
    material: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
    
}, {
    tableName: 'proyectos',
    createdAt: false, 
    updatedAt: false 
});

proyecto.belongsTo(solicitudes, { foreignKey: 'id_solicitud' });
proyecto.belongsTo(colaboradores, { foreignKey: 'id_responsable' });

module.exports = proyecto;