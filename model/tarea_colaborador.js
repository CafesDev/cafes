const sequelize = require('../config/sequelize')
const { DataTypes } = require('sequelize')
const proyecto = require('./proyecto')
const tarea = require('./tarea')
const colaborador = require('./colaborador')

const tarea_colaborador = sequelize.define('tarea_colaborador', {
    id_proyecto: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
        
    },
    id_tarea: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_colaborador: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    }
},{
     tableName: 'tareas_colaboradores',
     createdAt: false,
     updatedAt: false
})

tarea_colaborador.belongsTo(proyecto, {foreignKey: 'id_proyecto', as: 'proyecto'})
tarea_colaborador.belongsTo(tarea, {foreignKey: 'id_tarea', as: 'tarea'})
tarea_colaborador.belongsTo(colaborador, {foreignKey: 'id_colaborador', as: 'colaborador'})



module.exports = tarea_colaborador