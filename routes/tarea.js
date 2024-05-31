const { Router } = require('express');
const { getAllTareas, getTareaById, createTarea, updateTarea, deleteTarea, getTareasByNombre } = require('../services/tarea');
const { isCreateTarea, getAsignacionesTareas, createTareaColaborador, deleteAllAssignationsFromTarea } = require('../services/tarea_colaborador')
const { getProyectoById } = require('../services/proyecto')
const { getColaboradorById } = require('../services/colaborador')

const router = Router();

// Ruta para obtener todas las tareas
router.get('/tareas', async (req, res) => {
  try {
    const tareas = await getAllTareas();
    res.status(200).json(tareas);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener una tarea por su ID
router.get('/tareas/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const tarea = await getTareaById(id);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json(tarea);
  } catch (error) {
    console.error('Error al obtener la tarea:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para crear una nueva tarea
router.post('/tareas', async (req, res) => {

  const template = {
    nombre: 'string',
    descripcion: 'string',
    fecha_inicio: 'DateString(YYYY-MM-DD)',
    fecha_fin: 'DateString(YYYY-MM-DD)',
    id_proyecto: 'integer',
    id_colaborador: 'integer'
  }

  const nuevaTarea = isCreateTarea(req.body)
  if (!nuevaTarea) return res.status(400).json({error: 'El formato de la peticion es incorrecto', template}) 

  nuevaTarea.id = Math.floor(Math.random() * 1000000000)

  const proyecto = await getProyectoById(nuevaTarea.id_proyecto)
  const colaborador = await getColaboradorById(nuevaTarea.id_colaborador)
  
  if(!proyecto ) return res.status(404).json({error: 'El id de proyecto utilizado no existe'})
  if(!colaborador) return res.status(404).json({error: 'El id de colaborador utilizado no existe'})

  const tareasConMismoNombre = await getTareasByNombre(nuevaTarea.nombre)

  for(let tarea of tareasConMismoNombre){
    let asignaciones = await getAsignacionesTareas(tarea.id)

    for (let asignacion of asignaciones){
      if(asignacion.id_proyecto == nuevaTarea.id_proyecto) return res.status(401).json({error: 'Ya existe una tarea con el mismo nombre en el proyecto'})
    }

  }   
  try {
    const tareaCreada = await createTarea(nuevaTarea);
    const tareaColaborador = await (createTareaColaborador({id_colaborador: nuevaTarea.id_colaborador, id_proyecto: nuevaTarea.id_proyecto, id_tarea: tareaCreada.id}))

    tareaColaborador.tarea = tareaCreada
    
    return res.status(201).json({
      id_colaborador: tareaColaborador.id_colaborador,
      id_proyecto: tareaColaborador.id_proyecto,
      id_tarea: tareaColaborador.id_tarea,
      tarea: tareaCreada
    });
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para actualizar una tarea por su ID
router.put('/tareas/:id', async (req, res) => {
  console.log(req.params)
  const id = req.params.id;
  const datosActualizados = req.body;
  try {
    const tareaActualizada = await updateTarea(id, datosActualizados);
    res.status(200).json(tareaActualizada);
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para eliminar una tarea por su ID
router.delete('/tareas/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const tarea = await getTareaById(id);
    if(!tarea) return res.status(404).json({error: 'La tarea no existe'})
    await deleteAllAssignationsFromTarea(id)
    await deleteTarea(id);
    res.status(204).json({tarea_eliminada: id});
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
