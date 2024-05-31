const { Router } = require('express')
const { getAllSolicitudes, createSolicitud, acceptOrRejectSolicitud } = require('../services/solicitud')


const router = Router('/')


router.get('/solicitudes', async (req, res) => {
    let solicitudes = await getAllSolicitudes()

    // solicitudes = JSON.parse(JSON.stringify(solicitudes, null, 2))

    res.status(200).json(solicitudes)
})

router.post('/solicitudes',async (req, res) => {
    const newSolicitud = req.body
    if (!isSolicitudCreationInterface(newSolicitud))
      return res.status(400).json({error: "Wrong parsing for body"})
  
    newSolicitud.id = Math.floor(Math.random()*1000)
  
    let answer = await createSolicitud(newSolicitud)
  
    console.log(answer)
    
    res.status(200).json(answer)
})

router.put('/solicitudes', async (req, res) => {
    const body = req.body
    
    if (!isSolicitudAcceptanceOrRejectionInterface(body))
        return res.status(400).json({error: "Wrong parsing for body"})
    
    const updatedSolicitud = await acceptOrRejectSolicitud(body.idSolicitud,body.estado)

    if(!updatedSolicitud) return res.status(404).json({error: "Solicitud no encontrada"})
    

    return res.status(200).json(updatedSolicitud)
    
})


/**
 * 
 * @param {Object} object 
 */
function isSolicitudCreationInterface(object){
    if (
        typeof object != 'object' ||
        !object.id_solicitante ||
        !object.nombre ||
        !object.id_organizacion ||
        !object.descripcion ||
        !object.tipo_servicio ||
        !object.fecha
    )
        return false

    return true
}

/**
 * 
 * @param {Object} object 
 */
function isSolicitudAcceptanceOrRejectionInterface(object){
    if (
        typeof object != 'object' ||
        !object.idSolicitud ||
        !object.estado 
    )
        return false

    return true
}

module.exports = router