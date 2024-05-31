const { Router } = require('express');
const { getAllTiposColaborador, getTipoColaboradorByClave, createTipoColaborador, updateTipoColaborador, deleteTipoColaborador } = require('../services/tipo_colaborador');
const { tipoColaboradorCreationSchema, tipoColaboradorEditionSchema } = require('../schemas/tipo_colaborador.schema');
const { ZodError } = require('zod');

const router = Router();

// Ruta para obtener todos los tipos de colaborador
router.get('/tipos-colaborador', async (req, res) => {
  try {
    const tiposColaborador = await getAllTiposColaborador();
    return res.status(200).json(tiposColaborador);
  } catch (error) {
    console.error('Error al obtener los tipos de colaborador:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener un tipo de colaborador por su clave
router.get('/tipos-colaborador/:clave', async (req, res) => {
  const clave = req.params.clave;
  try {
    const tipoColaborador = await getTipoColaboradorByClave(clave);
    if (!tipoColaborador) {
      return res.status(404).json({ error: 'Tipo de colaborador no encontrado' });
    }
    return res.status(200).json(tipoColaborador);
  } catch (error) {
    console.error('Error al obtener el tipo de colaborador:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para crear un nuevo tipo de colaborador
router.post('/tipos-colaborador', async (req, res) => {
  const nuevoTipoColaborador = req.body;
  try {
    const tipoColaboradorData = tipoColaboradorCreationSchema.parse(nuevoTipoColaborador)

    const tipoColaboradorRegistrado = await getTipoColaboradorByClave(tipoColaboradorData.clave)

    if(tipoColaboradorRegistrado)
      return res.status(409).json({ error: 'El tipo de colaborador ya existe'})

    const tipoColaboradorCreado = await createTipoColaborador(tipoColaboradorData);
    return res.status(201).json(tipoColaboradorCreado);
  } catch (error) {
    console.error('Error al crear el tipo de colaborador:', error);

    if (error instanceof ZodError)
        return res.status(400).json({error: error.errors})
    
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para actualizar un tipo de colaborador por su clave
router.put('/tipos-colaborador/:clave', async (req, res) => {
  const clave = req.params.clave;
  const datosActualizados = req.body;
  try {
    const datosValidados = tipoColaboradorEditionSchema.parse(datosActualizados)
    const tipoColaboradorActualizado = await updateTipoColaborador(clave, datosValidados);
    return res.status(200).json(tipoColaboradorActualizado);
  } catch (error) {
    console.error('Error al actualizar el tipo de colaborador:', error);
    
    if (error instanceof ZodError)
      return res.status(400).json({error: error.errors})

    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para eliminar un tipo de colaborador por su clave
router.delete('/tipos-colaborador/:clave', async (req, res) => {
  const clave = req.params.clave;
  try {
    await deleteTipoColaborador(clave);
    return res.status(204).end();
  } catch (error) {
    console.error('Error al eliminar el tipo de colaborador:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
