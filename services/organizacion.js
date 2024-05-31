const Organizacion = require('../model/organizacion');

async function getAllOrganizaciones() {
  return await Organizacion.findAll();
}

async function getOrganizacionById(id) {
  return await Organizacion.findByPk(id);
}

async function createOrganizacion(datosOrganizacion) {
  return await Organizacion.create(datosOrganizacion);
}

async function updateOrganizacion(id, datosActualizados) {
  const organizacion = await Organizacion.findByPk(id);
  if (!organizacion) {
    throw new Error('Organización no encontrada');
  }
  return await organizacion.update(datosActualizados);
}

async function deleteOrganizacion(id) {
  const organizacion = await Organizacion.findByPk(id);
  if (!organizacion) {
    throw new Error('Organización no encontrada');
  }
  await organizacion.destroy();
}

module.exports = {
  getAllOrganizaciones,
  getOrganizacionById,
  createOrganizacion,
  updateOrganizacion,
  deleteOrganizacion
};
