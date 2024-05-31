const tarea_colaborador = require('../model/tarea_colaborador')
const tarea = require('../model/tarea')
const colaborador = require('../model/colaborador')
const proyecto = require('../model/proyecto')

const { Op } = require('sequelize')

/**
 * @typedef {Object} AssignColaboratorToProyectoTarea
 * @property {Number} id_proyecto
 * @property {Number} id_tarea
 * @property {Number} id_colaborador
 */

/**
 * 
 * @param {Boolean} includeTarea 
 * @param {Boolean} includeColaborador 
 * @param {Boolean} includeProyecto 
 * @returns {Array<Object>} 
 */

function getIncludesForTareasColaborador(includeTarea=false, includeColaborador=false, includeProyecto=false){
    const include = []
    
    if(includeTarea) include.push({model: tarea, as: 'tarea'})
    if(includeColaborador) include.push({model: colaborador, as: 'colaborador'})
    if(includeProyecto) include.push({model: proyecto, as: 'proyecto'})    

    return include
}

/**
 * 
 * @param {Boolean} includeTarea 
 * @param {Boolean} includeColaborador 
 * @param {Boolean} includeProyecto 
 * @returns 
 */
async function getAllTareasColaborador(includeTarea=false, includeColaborador=false, includeProyecto=false) {

    const include = getIncludesForTareasColaborador(includeTarea, includeColaborador, includeProyecto)
    return tarea_colaborador.findAll({include: include})
}

function getAllTareasFromProyecto(idProyecto, includeTarea = false, includeColaborador=false, includeProyecto=false){
    const include = getIncludesForTareasColaborador(includeTarea, includeColaborador, includeProyecto)

    return tarea_colaborador.findAll({
        where: {
            id_proyecto: idProyecto
        },
        include: include
    })
}

function getAllTareasFromColaborador(idColaborador, includeTarea = false, includeColaborador=false, includeProyecto=false){

    const include = getIncludesForTareasColaborador(includeTarea, includeColaborador, includeProyecto)

    return tarea_colaborador.findAll({
        where: {
            id_colaborador: idColaborador
        },
        include: include
    })
}

/**
 * @typedef {Object} AssignmentTarea
 * @property {Number} id_tarea
 * @param {AssignmentTarea} object 
 */

function getTareaColaboradorById({id_tarea}){
    console.log('id_tarea: ', id_tarea)
    
    return tarea_colaborador.findOne({
        where: { id_tarea: id_tarea }
    })
}

/**
 * 
 * @param {Number} idTarea
 * @param {Number} idColaborador
 */

function isColaboradorAssignedToTarea(idTarea, idColaborador){
    const result = tarea_colaborador.findOne({
        where: {
            [Op.and] : [
                {
                    id_tarea: idTarea
                },
                {
                    id_colaborador: idColaborador
                }
            ]
        }
    })
    return result
}


/**
 * 
 * @param {AssignColaboratorToProyectoTarea} object 
 */
function getTareaColaborador(object, includeTarea=false,includeColaborador=false, includeProyecto=false){
    const include = getIncludesForTareasColaborador(includeTarea, includeColaborador, includeProyecto)
    
    const search = []

    if(object.id_colaborador) search.push({id_colaborador: object.id_colaborador})
    if(object.id_proyecto) search.push({id_proyecto: object.id_proyecto})
    if(object.id_tarea) search.push({id_tarea: object.id_tarea})

    return tarea_colaborador.findOne({
        where: {
            [Op.and]: search
        },
        include: include
    })
}

/**
 * @param {AssignColaboratorToProyectoTarea} object
 */
async function createTareaColaborador(object){
    const tareaColaborador = tarea_colaborador.create(object)
    
    return tareaColaborador
}

/**
 * 
 * @param {AssignColaboratorToProyectoTarea} object 
 */
async function deleteTareaColaborador(object){
    const tarea_colaborador = await getTareaColaborador(object)

    if(tarea_colaborador){
        await tarea_colaborador.destroy()
        return true
    }

    return false
}

/**
 * 
 * @param {Number} idTarea 
 */

async function getAsignacionesTareas(idTarea){
    return await tarea_colaborador.findAll({
        where: {
            id_tarea: idTarea
        }
    })
}

/**
 * @param {Object} objectToEvaluate 
 * @returns {AssignColaboratorToProyectoTarea | null}
 * Function to parse the body of the request
 */

function isAssignColaboradorToProyectoTarea(objectToEvaluate){

    const keys = ['id_tarea', 'id_colaborador']
    
    for (let key of keys){
        if(!objectToEvaluate[key]) {
            console.log(key)
            return null
        }        
        if(isNaN(Number(objectToEvaluate[key]))) {
            console.log(key)
            return null
        }
    }

    return objectToEvaluate 
}


/**
/**
 * @typedef {Object} CreatingTarea
 * @property {String} nombre
 * @property {String} descripcion
 * @property {String} fecha_inicio
 * @property {String} fecha_fin
 * @property {Number} id_proyecto
 * @property {Number} id_colaborador
 */
/**
 * @param {CreatingTarea} objectToEvaluate 
 * @returns 
 */

function isCreateTarea(objectToEvaluate){
    console.log(objectToEvaluate)
    const keysTarea = ['nombre', 'descripcion', 'fecha_inicio', 'fecha_fin']
    const keysAsignacion = ['id_proyecto', 'id_colaborador']
    
    for (let key of keysTarea){
        if(!objectToEvaluate[key]) {
            console.log(key)
            return null
        }
        if(typeof objectToEvaluate[key] != 'string'){ 
            console.log(key)
            return null
        }   
    }
    
    for (let key of keysAsignacion){
        if(!objectToEvaluate[key]){
            console.log(key)
            return null
        }        
        if(isNaN(Number(objectToEvaluate[key]))){
            console.log(key)
            return null
        }
    }
    return objectToEvaluate
    
}

async function deleteAllAssignationsFromTarea(idTarea){
    const assignations = await tarea_colaborador.findAll({
        where: {
            id_tarea: idTarea
        }
    })

    for (let assignation of assignations){
        await assignation.destroy()
    }
}

module.exports = {
    getAllTareasColaborador,
    getAllTareasFromProyecto,
    getAllTareasFromColaborador,
    createTareaColaborador,
    getTareaColaborador,
    deleteTareaColaborador,
    isAssignColaboradorToProyectoTarea,
    isCreateTarea,
    getAsignacionesTareas,
    deleteAllAssignationsFromTarea,
    getTareaColaboradorById,
    isColaboradorAssignedToTarea
}