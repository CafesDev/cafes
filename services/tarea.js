const Tarea = require('../model/tarea');

async function getAllTareas() {
  return await Tarea.findAll();
}
async function getTareasByNombre(name){
  return await Tarea.findAll({
    where: {
      nombre: name
    }
  });
}

async function getTareaById(id) {
  return await Tarea.findByPk(id);
}

async function createTarea(datosTarea) {
  return await Tarea.create(datosTarea);
}

async function updateTarea(id, datosActualizados) {
  const tarea = await Tarea.findByPk(id);
  if (!tarea) {
    throw new Error('Tarea no encontrada');
  }
  return await tarea.update(datosActualizados);
}

async function deleteTarea(id) {
  const tarea = await Tarea.findByPk(id);
  if (!tarea) {
    throw new Error('Tarea no encontrada');
  }
  await tarea.destroy();
}

/**
 * @typedef {Object} UpdatingTareaData
 * @property {String} nombre
 * @property {Date} fecha_inicio
 * @property {Date} fecha_fin
 * @property {String} descripcion
 * @property {'Pendiente', 'Iniciada', 'Terminada'} estado
 * 
 * @param {Object} objectToEvaluate
 * 
 * @returns {UpdatingTareaData | null}
 */

function isUpdateTareaData(objectToEvaluate){

  const keys = ['nombre', 'fecha_inicio', 'fecha_fin', 'descripcion', 'estado']

  for (let key of keys)
    if (objectToEvaluate[key] === undefined)
      return null

  if(estado != 'Pendiente' || estado != 'Iniciada' || estado != 'Terminada') return null

  objectToEvaluate.fecha_inicio = new Date(objectToEvaluate.fecha_inicio)
  objectToEvaluate.fecha_fin = new Date(objectToEvaluate.fecha_fin)

  if(objectToEvaluate.fecha_inicio == undefined) return null
  if(objectToEvaluate.fecha_fin == undefined) return null
  if(objectToEvaluate.fecha_inicio > objectToEvaluate.fecha_fin) return null


  return objectToEvaluate
  

}

module.exports = {
  getAllTareas,
  getTareaById,
  createTarea,
  updateTarea,
  deleteTarea,
  getTareasByNombre,
  isUpdateTareaData
};
