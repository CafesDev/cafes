const Colaborador = require('../model/colaborador')

function getAllColaboradores(){
    return Colaborador.findAll()
}

async function createColaborador(object){
    const colborador = Colaborador.build(object)
    await colborador.save()
    return colborador
}

async function getColaboradorById(id_colaborador){
    const colaborador = await Colaborador.findByPk(id_colaborador)

    if (!colaborador) return null

    return colaborador
}

async function updateColaborador(matricula, colaboradorData) {
    const colaborador = await Colaborador.findByPk(matricula);
    if (!colaborador) return null;
    await colaborador.update(colaboradorData);
    return colaborador;
}

module.exports = {
    getAllColaboradores,
    createColaborador,
    getColaboradorById,
    updateColaborador
}