const { Router } = require('express');
const { getAllLicenciaturas, getLicenciaturaById, createLicenciatura, updateLicenciatura, deleteLicenciatura } = require('../services/licenciatura');
const { licenciaturaCreationSchema, licenciaturaEditionSchema } = require('../schemas/licenciatura.schema');
const { ZodError } = require('zod');

const router = Router();

// Ruta para obtener todas las licenciaturas
router.get('/licenciaturas', async (req, res) => {
  try {
    const licenciaturas = await getAllLicenciaturas();
    return res.status(200).json(licenciaturas);
  } catch (error) {
    console.error('Error al obtener las licenciaturas:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener una licenciatura por su clave
router.get('/licenciaturas/:clave', async (req, res) => {
  const clave = req.params.clave;
  try {
    const licenciatura = await getLicenciaturaById(clave);
    if (!licenciatura) {
      return res.status(404).json({ error: 'Licenciatura no encontrada' });
    }
    return res.status(200).json(licenciatura);
  } catch (error) {
    console.error('Error al obtener la licenciatura:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para crear una nueva licenciatura
router.post('/licenciaturas', async (req, res) => {
  const nuevaLicenciatura = req.body;
  try {
    const licenciaturaDataValidated = licenciaturaCreationSchema.parse(nuevaLicenciatura)

    const licenciaturaWithSameId = await getLicenciaturaById(licenciaturaDataValidated.clave)
    
    console.log('Licenciatura: ',licenciaturaWithSameId)
    if (licenciaturaWithSameId) return res.status(409).json({error: "La clave ya esta registrada"})

    
    const licenciaturaCreada = await createLicenciatura(licenciaturaDataValidated);
    return res.status(201).json(licenciaturaCreada);
  } catch (error) {
    console.error('Error al crear la licenciatura:', error);

    if (error instanceof ZodError)
      return res.status(400).json({error: error.errors})
    
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para actualizar una licenciatura
router.put('/licenciaturas/:clave', async (req, res) => {
  const clave = req.params.clave;
  const datosActualizados = req.body;
  try {
    const datosValidados = licenciaturaEditionSchema.parse(datosActualizados)
    const licenciaturaActualizada = await updateLicenciatura(clave, datosValidados);
    return res.status(200).json(licenciaturaActualizada);
  } catch (error) {
    console.error('Error al actualizar la licenciatura:', error);

    if (error instanceof ZodError)
      return res.status(400).json({error: error.errors})

    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para eliminar una licenciatura
router.delete('/licenciaturas/:clave', async (req, res) => {
  const clave = req.params.clave;
  try {
    await deleteLicenciatura(clave);
    return res.status(204).end();
  } catch (error) {
    console.error('Error al eliminar la licenciatura:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
