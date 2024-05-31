const { Router } = require('express');
const { getAllOrganizaciones, getOrganizacionById, createOrganizacion, updateOrganizacion, deleteOrganizacion } = require('../services/organizacion');
const { organizacionCreationSchema, organizacionEditionSchema } = require('../schemas/organizacion.schema')
const router = Router();
const { ZodError } = require('zod')

// Ruta para obtener todas las organizaciones
router.get('/organizaciones', async (req, res) => {
  try {
    const organizaciones = await getAllOrganizaciones();
    return res.status(200).json(organizaciones);
  } catch (error) {
    console.error('Error al obtener las organizaciones:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener una organización por su ID
router.get('/organizaciones/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const organizacion = await getOrganizacionById(id);
    if (!organizacion) {
      return res.status(404).json({ error: 'Organización no encontrada' });
    }
    res.status(200).json(organizacion);
  } catch (error) {
    console.error('Error al obtener la organización:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para crear una nueva organización
router.post('/organizaciones', async (req, res) => {
  const nuevaOrganizacion = req.body;

  try{
    const organizacionData = organizacionCreationSchema.parse(nuevaOrganizacion)
    const id = Math.floor(Math.random() * 1000000000)
    organizacionData.id = id
    const newOrganizacion = await createOrganizacion(organizacionData)

    
    return res.status(200).json(newOrganizacion)
  }
  catch(err){
    if(err instanceof ZodError)
      return res.status(400).json({error: err.errors})
    
  }
  
});

// Ruta para actualizar una organización por su ID
router.put('/organizaciones/:id', async (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  try {
    const nuevosDatosOrganizacion = organizacionEditionSchema.parse(datosActualizados)
    const organizacionActualizada = await updateOrganizacion(id, nuevosDatosOrganizacion)
    return res.status(200).json(organizacionActualizada)
  } catch (error) {
    if(error instanceof ZodError)
        return res.status(400).json({error: error.errors})
    
    console.error('Error al actualizar la organización:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para eliminar una organización por su ID
router.delete('/organizaciones/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await deleteOrganizacion(id);
    res.status(204).end();
  } catch (error) {
    console.error('Error al eliminar la organización:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
