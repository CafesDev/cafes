const { Router } = require('express')
const { getAllSolicitantes, createSolicitante } = require('../services/solicitante')

const router = Router('/')


router.get('/solicitantes',async (req, res) => {
    let solicitantes = await getAllSolicitantes()

    solicitantes = JSON.parse(JSON.stringify(solicitantes, null, 2))
    
    res.status(200).json(solicitantes)
})

router.post('/solicitantes',async (req, res) => {
  const newSolicitante = req.body
  console.log(newSolicitante)
  if (!isSolicitanteCreationInterface(newSolicitante))
    return res.status(400).json({error: "Wrong parsing for body"})

  newSolicitante.id = Math.floor(Math.random()*1000)

  let answer = await createSolicitante(newSolicitante)

  console.log(answer)
  
  res.status(200).json(answer)
})

/**
 * @param {Object} object
 */
function isSolicitanteCreationInterface(object){
  if (typeof object != 'object') return false
  if (!object.nombres) return false
  if (!object.apellido_paterno) return false
  if (!object.apellido_materno) return false
  if (!object.domicilio) return false
  if (!object.id_municipio) return false
  if (!object.telefono) return false
  if (!object.correo_electronico) return false

  return true
}

module.exports = router