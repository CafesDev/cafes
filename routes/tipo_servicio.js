const { Router } = require('express');
const { getAllTiposServicios, getTipoServicioByClave, createTipoServicio, updateTipoServicio, deleteTipoServicio } = require('../services/tipo_servicio');
const { tipoServicioCreationSchema, tipoServicioEditionSchema } = require('../schemas/tipo_servicio.schema');
const { ZodError } = require('zod');

const router = Router();

// Ruta para obtener todos los tipos de servicios
router.get('/tipos-servicios', async (req, res) => {
  try {
    const tiposServicios = await getAllTiposServicios();
    return res.status(200).json(tiposServicios);
  } catch (error) {
    console.error('Error al obtener los tipos de servicios:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener un tipo de servicio por su clave
router.get('/tipos-servicios/:clave', async (req, res) => {
  const clave = req.params.clave;
  try {
    const tipoServicio = await getTipoServicioByClave(clave);
    if (!tipoServicio) {
      return res.status(404).json({ error: 'Tipo de servicio no encontrado' });
    }
    return res.status(200).json(tipoServicio);
  } catch (error) {
    console.error('Error al obtener el tipo de servicio:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para crear un nuevo tipo de servicio
router.post('/tipos-servicios', async (req, res) => {
  const nuevoTipoServicio = req.body;
  try {
    const tipoServicioParsedData = tipoServicioCreationSchema.parse(nuevoTipoServicio)
    const tipoServicio = await getTipoServicioByClave(tipoServicioParsedData.clave);

    if (tipoServicio)
      return res.status(409).json({error: 'Clave ya registrada'})
    const tipoServicioCreado = await createTipoServicio(tipoServicioParsedData);
    return res.status(201).json(tipoServicioCreado);
  } catch (error) {
    console.error('Error al crear el tipo de servicio:', error);

    if (error instanceof ZodError)
        return res.status(400).json({error: error.errors})
    
    // return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para actualizar un tipo de servicio por su clave
router.put('/tipos-servicios/:clave', async (req, res) => {
  const clave = req.params.clave;
  const datosActualizados = req.body;
  try {
    const datosValidados = tipoServicioEditionSchema.parse(datosActualizados)
    const tipoServicioActualizado = await updateTipoServicio(clave, datosValidados);
    return res.status(200).json(tipoServicioActualizado);
  } catch (error) {
    console.error('Error al actualizar el tipo de servicio:', error);
    
    if (error instanceof ZodError)
      return res.status(400).json({error: error.errors})
  
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para eliminar un tipo de servicio por su clave
router.delete('/tipos-servicios/:clave', async (req, res) => {
  const clave = req.params.clave;
  try {
    await deleteTipoServicio(clave);
    return res.status(204).end();
  } catch (error) {
    console.error('Error al eliminar el tipo de servicio:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
