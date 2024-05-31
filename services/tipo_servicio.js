const TipoServicio = require('../model/tipo_servicio');

async function getAllTiposServicios() {
  return await TipoServicio.findAll();
}

async function getTipoServicioByClave(clave) {
  return await TipoServicio.findByPk(clave);
}

async function createTipoServicio(datosTipoServicio) {
  return await TipoServicio.create(datosTipoServicio);
}

async function updateTipoServicio(clave, datosActualizados) {
  const tipoServicio = await TipoServicio.findByPk(clave);
  if (!tipoServicio) {
    throw new Error('Tipo de servicio no encontrado');
  }
  return await tipoServicio.update(datosActualizados);
}

async function deleteTipoServicio(clave) {
  const tipoServicio = await TipoServicio.findByPk(clave);
  if (!tipoServicio) {
    throw new Error('Tipo de servicio no encontrado');
  }
  await tipoServicio.destroy();
}

module.exports = {
  getAllTiposServicios,
  getTipoServicioByClave,
  createTipoServicio,
  updateTipoServicio,
  deleteTipoServicio
};
