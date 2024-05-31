const { Router } = require('express')
const createHashPassword = require('../services/createHashPassword')
const { getAllColaboradores, createColaborador, updateColaborador, getColaboradorById} = require('../services/colaborador')

const router = Router()


router.get('/colaboradores',async (req, res) => {
  let colaboradores = await getAllColaboradores()

  colaboradores = JSON.parse(JSON.stringify(colaboradores, null, 2))
  
  res.status(200).json(colaboradores)
})

router.post('/colaboradores',async (req, res) => {
  const newColaborador = req.body
  console.log(newColaborador)
  if (!isColaboradorCreationInterface(newColaborador))
      return res.status(400).json({error: "Wrong parsing for body"})


  newColaborador.estado = 'Activo'
  newColaborador.contrasena = createHashPassword(newColaborador.contrasena)

  const isAnotherCollaboratorWithMatricula = await getColaboradorById(newColaborador.matricula)

  if (isAnotherCollaboratorWithMatricula) return res.status(409).json({error: 'El colaborador ya existe '})

  let answer = await createColaborador(newColaborador)

  console.log(answer)

  return res.status(200).json(answer)
})

router.put('/colaboradores/:matricula', async (req, res) => {
  const matricula = req.params.matricula;
  const colaboradorData = { ...req.body };

  // Verifica si se proporcionó una nueva contraseña y necesita ser hasheada
  if (colaboradorData.contrasena) {
      colaboradorData.contrasena = createHashPassword(colaboradorData.contrasena);
  }

  try {
      let colaborador = await updateColaborador(matricula, colaboradorData);
      if (!colaborador) {
          return res.status(404).json({ error: "Colaborador not found" });
      }
      res.status(200).json(colaborador);
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

/**
 * @param {Object} object
 */
function isColaboradorCreationInterface(object){
  if (typeof object != 'object') return false
  if (!object.matricula) return false
  if (!object.clave_licenciatura) return false
  if (!object.nombres) return false
  if (!object.tipo) return false
  if (!object.apellido_paterno) return false
  if (!object.apellido_materno) return false
  if (!object.telefono) return false
  if (!object.correo_personal) return false

  return true
}



module.exports = router
