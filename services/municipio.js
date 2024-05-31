const Municipio = require('../model/municipio');

async function getAllMunicipios() {
  return await Municipio.findAll();
}

async function getMunicipioById(id) {
  return await Municipio.findByPk(id);
}

async function createMunicipio(datosMunicipio) {
  return await Municipio.create(datosMunicipio);
}

async function updateMunicipio(id, datosActualizados) {
  const municipio = await Municipio.findByPk(id);
  if (!municipio) {
    throw new Error('Municipio no encontrado');
  }
  return await municipio.update(datosActualizados);
}

async function deleteMunicipio(id) {
  const municipio = await Municipio.findByPk(id);
  if (!municipio) {
    throw new Error('Municipio no encontrado');
  }
  await municipio.destroy();
}

module.exports = {
  getAllMunicipios,
  getMunicipioById,
  createMunicipio,
  updateMunicipio,
  deleteMunicipio
};
