const Licenciatura = require('../model/licenciatura');

async function getAllLicenciaturas() {
  return await Licenciatura.findAll();
}

async function getLicenciaturaById(clave) {
  return await Licenciatura.findByPk(clave);
}

async function createLicenciatura(datosLicenciatura) {
  return await Licenciatura.create(datosLicenciatura);
}

async function updateLicenciatura(clave, datosActualizados) {
  const licenciatura = await Licenciatura.findByPk(clave);
  if (!licenciatura) {
    throw new Error('Licenciatura no encontrada');
  }
  return await licenciatura.update(datosActualizados);
}

async function deleteLicenciatura(clave) {
  const licenciatura = await Licenciatura.findByPk(clave);
  if (!licenciatura) {
    throw new Error('Licenciatura no encontrada');
  }
  await licenciatura.destroy();
}

module.exports = {
  getAllLicenciaturas,
  getLicenciaturaById,
  createLicenciatura,
  updateLicenciatura,
  deleteLicenciatura
};
