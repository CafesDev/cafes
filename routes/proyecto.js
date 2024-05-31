const { Router } = require('express');
const { getAllProyectos, getProyectoById, createProyecto, updateProyecto, deleteProyecto } = require('../services/proyecto');
const { generateIntId } = require('../services/generateID')
const { getColaboradorById } = require('../services/colaborador')
const { getSolicitudById } = require('../services/solicitud')
const { getProyectoByName} = require('../services/proyecto')
const { getAllTareasFromProyecto } = require('../services/tarea_colaborador')
const { getTareaById } = require('../services/tarea')

const router = Router();

// Ruta para obtener todos los proyectos
router.get('/proyectos', async (req, res) => {
  try {
    const proyectos = await getAllProyectos();
    res.status(200).json(proyectos);
  } catch (error) {
    console.error('Error al obtener los proyectos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener un proyecto por su ID
router.get('/proyectos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const proyecto = await getProyectoById(id);
    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    res.status(200).json(proyecto);
  } catch (error) {
    console.error('Error al obtener el proyecto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para crear un nuevo proyecto
router.post('/proyectos', async (req, res) => {
  const template = {
    id_solicitud : 'integer',
    id_responsable : 'integer',
    nombre: 'string',
    fecha_limite: 'date(yyyy-mm-dd)',
    asignacion_contribuyente: 'string',
    material: 'string'
  }
  const nuevoProyecto = req.body;

  //Is the data needed
  if (!nuevoProyecto.id_solicitud) return res.status(400).json({error: 'ID de solicitud requerido', template: JSON.stringify(template)})
  if (!nuevoProyecto.id_responsable) return res.status(400).json({error: 'ID de colaborador requerido', template: JSON.stringify(template)})
  if (!nuevoProyecto.nombre) return res.status(400).json({error: 'Nombre requerido', template: JSON.stringify(template)})
  if (!nuevoProyecto.fecha_limite) return res.status(400).json({error: 'Fecha limite requerido', template: JSON.stringify(template)})
  if (!nuevoProyecto.asignacion_contribuyente) return res.status(400).json({error: 'Asignacion contribuyente requerido', template: JSON.stringify(template)})
  
    //Is data valid
  if (!(await getColaboradorById(nuevoProyecto.id_responsable))) return res.status(404).json({error: 'ID colaborador inválida', template: JSON.stringify(template)})
  if (!(await getSolicitudById(nuevoProyecto.id_solicitud))) return res.status(404).json({error: 'ID solicitud inválida', template: JSON.stringify(template)})
  if (await getProyectoByName(nuevoProyecto.nombre)) return res.status(400).json({error: 'Ya existe un proyecto con ese nombre', template: JSON.stringify(template)})
  
  const fechaActual = new Date();
  const fechaLimite = new Date(nuevoProyecto.fecha_limite);

  if (fechaLimite <= fechaActual) {
    return res.status(400).json({ error: 'La fecha límite debe ser posterior a la fecha actual', template: JSON.stringify(template)});
  }

  if (nuevoProyecto.nombre.length > 20) return res.status(400).json({ error: 'El nombre del proyecto tiene que ser maximo de 20 caracteres', template: JSON.stringify(template)});
  //Generate data
  nuevoProyecto.id = generateIntId()
  nuevoProyecto.estado = 'Pendiente'
  nuevoProyecto.semestre = fechaActual.getFullYear()
  nuevoProyecto.particion = (fechaActual.getMonth() > 6)? '_2' : '_1'

  console.log(nuevoProyecto)

  try {
    const proyectoCreado = await createProyecto(nuevoProyecto);
    console.log(proyectoCreado)
    return res.status(201).json(proyectoCreado);
  } catch (error) {
    console.error('Error al crear el proyecto:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para actualizar un proyecto por su ID
router.put('/proyectos/:id', async (req, res) => {
  const id = req.params.id;
  const template = {
    id_colaborador : 'integer',
    nombre: 'string',
    fecha_limite: 'date(yyyy-mm-dd)',
    asignacion_contribuyente: 'string',
    material: 'string'
  }
  const unmutableData = {
    id: 'integer',
    id_solicitud: 'integer',
    semestre: 'integer',
    particion: 'string'
  }

  const proyecto = await getProyectoById(id)
  if (!proyecto) return res.status(404).json({error: 'No se encontró un proyecto con el ID proporcionado', template: JSON.stringify(template)})
    
    const datosActualizados = req.body;

    //No ussage of unmutable data
    for (let key in unmutableData){
      if (datosActualizados[key]) return res.status(400).json({error: `El valor ${key} es inmutable`, template: JSON.stringify(template)})
    }
    
    //Validate that at least one field is different
    let isAllDataTheSame = true
    console.log(datosActualizados)
    for (let key in template){
      isAllDataTheSame &= (datosActualizados[key] == proyecto[key]) && (datosActualizados[key] != undefined) 
    }
    if (isAllDataTheSame) return res.status(400).json({error: 'Todos los datos proporcionados son iguales', template: JSON.stringify(template)})
    
      //Validations
    if (datosActualizados.fecha_limite){
      const fechaActual = new Date();
      const fechaLimite = new Date(datosActualizados.fecha_limite);
    
      if (fechaLimite <= fechaActual) {
        return res.status(400).json({ error: 'La fecha límite debe ser posterior a la fecha actual', template: JSON.stringify(template)});
      }
    }

    if (datosActualizados.id_colaborador && (await getColaboradorById(datosActualizados.id_colaborador)))
        return res.status(404).json({ error: 'ID de colaborador inválida', template: JSON.stringify(template) })

  try {
    const proyectoActualizado = await updateProyecto(id, datosActualizados);
    return res.status(200).json(proyectoActualizado);
  } catch (error) {
    console.error('Error al actualizar el proyecto:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para eliminar un proyecto por su ID
router.delete('/proyectos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const tareasColaborador = await getAllTareasFromProyecto(id, true)

    // console.log(tareas)

    for (let tareaColaborador of tareasColaborador) {
     const idTarea = tareaColaborador.id_tarea

     await tareaColaborador.destroy()

     const tarea = await getTareaById(idTarea)
     await tarea.destroy()
     
    }
    
    await deleteProyecto(id);
    return res.status(204).end();
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
