const z = require('zod')

const clave = z.string().min(2, 'La clave tiene que ser de al menos 2 caracteres').max(3, 'La clave es tiene un maximo de 3 caracteres')
const nombre = z.string().max(255, 'El nombre tiene un maximo de 255 caracteres')
const descripcion = z.string().max(255, 'La descripcion tiene un maximo de 255 caracteres')


const tipoColaboradorCreationSchema = z.object({
    clave,
    nombre,
    descripcion
})

const tipoColaboradorEditionSchema = z.object({
    clave: z.optional(clave),
    nombre: z.optional(nombre),
    descripcion: z.optional(descripcion),
})

module.exports = {
    tipoColaboradorCreationSchema,
    tipoColaboradorEditionSchema
}