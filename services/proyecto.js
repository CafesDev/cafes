const Proyecto = require('../model/proyecto');

async function getAllProyectos() {
  return await Proyecto.findAll();
}

async function getProyectoById(id) {
  return await Proyecto.findByPk(id);
}

async function getProyectoByName(name){
  return await Proyecto.findOne({
    where: {nombre: name}
  })
}

async function createProyecto(datosProyecto) {
  return await Proyecto.create(datosProyecto);
}

async function updateProyecto(id, datosActualizados) {
  const proyecto = await Proyecto.findByPk(id);
  if (!proyecto) {
    throw new Error('Proyecto no encontrado');
  }
  return await proyecto.update(datosActualizados);
}

async function deleteProyecto(id) {
  const proyecto = await Proyecto.findByPk(id);
  if (!proyecto) {
    throw new Error('Proyecto no encontrado');
  }
  await proyecto.destroy();
}

module.exports = {
  getAllProyectos,
  getProyectoById,
  createProyecto,
  updateProyecto,
  deleteProyecto,
  getProyectoByName
};
