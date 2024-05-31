const TipoColaborador = require('../model/tipo_colaborador');

async function getAllTiposColaborador() {
  return await TipoColaborador.findAll();
}

async function getTipoColaboradorByClave(clave) {
  return await TipoColaborador.findByPk(clave);
}

async function createTipoColaborador(datosTipoColaborador) {
  return await TipoColaborador.create(datosTipoColaborador);
}

async function updateTipoColaborador(clave, datosActualizados) {
  const tipoColaborador = await TipoColaborador.findByPk(clave);
  if (!tipoColaborador) {
    throw new Error('Tipo de colaborador no encontrado');
  }
  return await tipoColaborador.update(datosActualizados);
}

async function deleteTipoColaborador(clave) {
  const tipoColaborador = await TipoColaborador.findByPk(clave);
  if (!tipoColaborador) {
    throw new Error('Tipo de colaborador no encontrado');
  }
  await tipoColaborador.destroy();
}

module.exports = {
  getAllTiposColaborador,
  getTipoColaboradorByClave,
  createTipoColaborador,
  updateTipoColaborador,
  deleteTipoColaborador
};
