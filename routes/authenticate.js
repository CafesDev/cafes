const { Router } = require('express')
const createHashPassword = require('../services/createHashPassword')
const Colaborador = require('../model/colaborador')
const { Op } = require('sequelize')
const { generateToken } = require('../middleware/authentication')

const router = Router()

router.post('/authenticate', async (req, res) => {
    console.log('Doing authentication')
    const {username, password}= req.body

    console.log(username, password)

    const passwordHash = createHashPassword(password)

    const colaborador = await Colaborador.findOne({
        where: {
             [Op.and]: [
                {
                    [Op.or]: [
                        {correo_personal: username},
                        {matricula: username},
                        {matricula: username.slice(1,10)}
                    ]
                },
                {contrasena: passwordHash},
                {estado: 'Activo'}
             ]
    }})

    if (!colaborador) return res.status(401)

    const colaboradorJSON = colaborador.toJSON()

    const token = generateToken({sub: colaboradorJSON.matricula})

    const {contrasena, ...colaboradorResponse} = colaboradorJSON

    console.log(colaboradorResponse)

    res.status(200).json({
        user: colaboradorResponse,
        token
    })
})

module.exports = router