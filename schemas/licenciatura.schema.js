const z = require('zod')

const clave = z.string({
    message: 'Clave de licenciatura',
    required_error: 'Clave de licenciatura es requerida',
    invalid_type_error: 'Clave de licenciatura debe ser una cadena'
})
.min(3, 'La longitud de la clave debe ser de al menos 3 caracteres')
.max(4, 'La longitud de la clave debe ser de maximo 4 caracteres')

const nombre = z.string({
    message: 'Nombre de licenciatura',
    required_error: 'Nombre de licenciatura es requerido',
    invalid_type_error: 'Nombre de licenciatura debe ser una cadena'
})
.min(10, 'La longitud del nombre debe ser de al menos 10 caracteres')
.max(255, 'La longitud del nombre debe ser de maximo 255 caracteres')

const departamento = z.string({
    message: 'Departamento de licenciatura',
    required_error: 'Departamento de licenciatura es requerido',
    invalid_type_error: 'Departamento de licenciatura debe ser una cadena'
})
.min(10, 'La longitud del departamento debe de ser de al menos 10 caracteres')
.max(255, 'La longitud del departamento debe ser de maximo 255 caracteres')

const licenciaturaCreationSchema = z.object({
    clave,
    nombre,
    departamento
})

const licenciaturaEditionSchema = z.object({
    nombre: z.optional(nombre),
    departamento: z.optional(departamento)
})


module.exports = {
    licenciaturaCreationSchema,
    licenciaturaEditionSchema
}
