const { Router } = require('express');
const { getAllMunicipios, getMunicipioById, createMunicipio, updateMunicipio, deleteMunicipio } = require('../services/municipio');
const { municipioCreationSchema, municipioEditionSchema } = require('../schemas/municipio.schema');
const { ZodError } = require('zod');

const router = Router();

// Ruta para obtener todos los municipios
router.get('/municipios', async (req, res) => {
  try {
    const municipios = await getAllMunicipios();
    return res.status(200).json(municipios);
  } catch (error) {
    console.error('Error al obtener los municipios:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener un municipio por su ID
router.get('/municipios/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const municipio = await getMunicipioById(id);
    if (!municipio) {
      return res.status(404).json({ error: 'Municipio no encontrado' });
    }
    return res.status(200).json(municipio);
  } catch (error) {
    console.error('Error al obtener el municipio:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para crear un nuevo municipio
router.post('/municipios', async (req, res) => {
  const nuevoMunicipio = req.body;
  try {
    const nuevoMunicipioDataValidated = municipioCreationSchema.parse(nuevoMunicipio)
    const id = Math.floor(Math.random() * 1_000_000)
    nuevoMunicipioDataValidated.id = id
    const municipioCreado = await createMunicipio(nuevoMunicipioDataValidated);
    return res.status(201).json(municipioCreado);
  } catch (error) {
    console.error('Error al crear el municipio:', error);

    if (error instanceof ZodError)
        return res.status(400).json({error: error.errors})
    
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para actualizar un municipio por su ID
router.put('/municipios/:id', async (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  try {
    const datosValidados = municipioEditionSchema.parse(datosActualizados)
    const municipioActualizado = await updateMunicipio(id, datosValidados);
    return res.status(200).json(municipioActualizado);
  } catch (error) {
    console.error('Error al actualizar el municipio:', error);

    if (error instanceof ZodError)
      return res.status(400).json({error: error.errors})
    
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para eliminar un municipio por su ID
router.delete('/municipios/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await deleteMunicipio(id);
    return res.status(204).end();
  } catch (error) {
    console.error('Error al eliminar el municipio:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
