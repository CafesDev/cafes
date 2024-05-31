const {Router, response, request} = require('express')
const { 
    getAllTareasColaborador,
    getAllTareasFromProyecto ,
    getAllTareasFromColaborador,
    createTareaColaborador,
    getTareaColaborador,
    deleteTareaColaborador,
    isAssignColaboradorToProyectoTarea,
    getTareaColaboradorById,
    isColaboradorAssignedToTarea
} = require('../services/tarea_colaborador')

const { getProyectoById } = require('../services/proyecto')
const { getColaboradorById } = require('../services/colaborador')
const { getTareaById } = require('../services/tarea')

const router = Router()



const template = {
    // id_proyecto: 'integer',
    id_tarea: 'integer',
    id_colaborador: 'integer'
}

router.route('/tarea-colaborador')
    .get(
        async (req, res) => {
            
            const includeTarea = req.query.tarea == 'true'? true : false
            const includeColaborador = req.query.colaborador == 'true'? true : false
            const includeProyecto = req.query.proyecto == 'true'? true : false

            const allTareas = await getAllTareasColaborador(includeTarea, includeColaborador, includeProyecto)
            res.status(200).json(allTareas)
        }
    )

    .post(
        async (req, res) => {

        
            const tareaColaborador = isAssignColaboradorToProyectoTarea(req.body)
            if (!tareaColaborador) return res.status(400).json({error: 'El formato del cuerpo es invalido', templage: JSON.stringify(template)})
            
            // const proyecto = await getProyectoById(tareaColaborador.id_proyecto)
            const tareaColaboradorSameProyecto = await getTareaColaboradorById(tareaColaborador)
            const colaborador = await getColaboradorById(tareaColaborador.id_colaborador)
            const tarea = await getTareaById(tareaColaborador.id_tarea)

            const isAlreadyAssigned = await isColaboradorAssignedToTarea(tarea.id, colaborador.matricula)

            console.log(isAlreadyAssigned)

            if(isAlreadyAssigned) return res.status(409).json({error: 'El colaborador ya esta asignado a dicha tarea'})

            console.log(tareaColaboradorSameProyecto)
            tareaColaborador.id_proyecto = tareaColaboradorSameProyecto.id_proyecto
            
            // if(!proyecto ) return res.status(404).json({error: 'El id de proyecto utilizado no existe'})
            if(!colaborador) return res.status(404).json({error: 'El id de colaborador utilizado no existe'})
            if(!tarea) return res.status(404).json({error: 'El id de tarea utilizado no existe'})
            
            const isTareaColaboradorAlreadyCreated = await getTareaColaborador(tareaColaborador)
            console.log('Tarea colaborado already exists: ',isTareaColaboradorAlreadyCreated)
            if(isTareaColaboradorAlreadyCreated) return res.status(409).json({error: 'El usuario ya tiene asignada dicha tarea'})
            
            const newTareaColaborador = await createTareaColaborador(tareaColaborador)
            console.log('New Tarea colaborador: ', newTareaColaborador)
        
            return res.status(200).json(newTareaColaborador)
        
        }
    )
    .delete(

        async (req, res) => {
            const tareaColcaborador = isAssignColaboradorToProyectoTarea(req.body)
            if (!tareaColcaborador) return res.status(400).json({error: 'El formato del cuerpo es invalido', templage: JSON.stringify(template)})

            const result = await deleteTareaColaborador(tareaColcaborador)

            if(!result) return res.status(404).json({error: 'La tarea utilizada no existe'})
        
            
            res.status(200).json({'tarea': tareaColcaborador, estado: 'eliminada'})
            
        }
    )

router.get('/tarea-colaborador/proyecto/:id/', async (req, res) => {
    const idProyecto = Number(req.params.id)

    const includeTarea = req.query.tarea == 'true'? true : false
    const includeColaborador = req.query.colaborador == 'true'? true : false
    const includeProyecto = req.query.proyecto == 'true'? true : false

    if(isNaN(idProyecto)) return res.status(400).json({error: 'El id de proyecto utilizado no es un numero'})
    
    if(!( await getProyectoById(idProyecto))) return res.status(404).json({error: 'El id de proyecto utilizado no existe'})
    
    const tareasForProyecto = await getAllTareasFromProyecto(idProyecto, includeTarea, includeColaborador, includeProyecto)

    res.status(200).json(tareasForProyecto)

})

router.get('/tarea-colaborador/colaborador/:id/', async (req, res) => {
    const idColaborador = Number(req.params.id)

    const includeTarea = req.query.tarea == 'true'? true : false
    const includeColaborador = req.query.colaborador == 'true'? true : false
    const includeProyecto = req.query.proyecto == 'true'? true : false


    if(isNaN(idColaborador)) return res.status(400).json({error: 'El id de colaborador utilizado no es un numero'})
    
    if(!( await getColaboradorById(idColaborador))) return res.status(404).json({error: 'El id de colaborador utilizado no existe'})
    
    const tareasForColaborador = await getAllTareasFromColaborador(idColaborador, includeTarea, includeColaborador, includeProyecto)

    res.status(200).json(tareasForColaborador)

})



module.exports = router