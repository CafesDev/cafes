const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize")

const tarea = sequelize.define('tareas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    estado: {
        type: DataTypes.ENUM('Pendiente', 'Iniciada', 'Terminada'),
        allowNull: false,
        defaultValue: 'Pendiente'
    }
}, {
    tableName: 'tareas',
    createdAt: false, 
    updatedAt: false 
});

module.exports = tarea;