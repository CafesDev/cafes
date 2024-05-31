const Solicitantes = require('../model/solicitante')

function getAllSolicitantes(){
    return Solicitantes.findAll()
}

function getSolicitanteById(id){
    return Solicitantes.findByPk(id)
}

function createSolicitante(object){
    const solicitante = Solicitantes.build(object)
    solicitante.save()
    return solicitante
}

module.exports = {
    getAllSolicitantes,
    createSolicitante,
    getSolicitanteById
}