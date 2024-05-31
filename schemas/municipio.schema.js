const z = require('zod')

const Municipio = z.string({
    description: 'Municipio es el nombre',
    message: 'Municipio es el nombre ',
    invalid_type_error: 'Municipio debe de ser un string',
})
.min(4, 'La longitud de municipio debe de ser de al menos 4 caracteres')
.max(255, 'La longitud de municipio debe de ser de maximo 255 caracteres')

const Estado = z.string({
    description: 'Estado es el nombre',
    message: 'Estado es el nombre ',
    invalid_type_error: 'Estado debe de ser un string',
})
.min(4, 'La longitud de estado debe de ser de al menos 4 caracteres')
.max(255, 'La longitud de estado debe de ser de maximo 255 caracteres')

const Pais = z.string({
    description: 'Estado es el nombre',
    message: 'Estado es el nombre ',
    invalid_type_error: 'Estado debe de ser un string',
})
.min(4, 'La longitud de estado debe de ser de al menos 4 caracteres')
.max(255, 'La longitud de estado debe de ser de maximo 255 caracteres')


const municipioCreationSchema = z.object({
    Municipio,
    Estado,
    Pais
})

const municipioEditionSchema = z.object({
    Municipio: z.optional(Municipio),
    Estado: z.optional(Estado),
    Pais: z.optional(Pais)
})


module.exports = {
    municipioCreationSchema,
    municipioEditionSchema
}