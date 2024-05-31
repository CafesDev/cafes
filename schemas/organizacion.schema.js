const z = require('zod')

const nombre_organizacion = z.string().max(50, 'nombre_organizacion tiene un maximo de 50 caracteres')
const direccion = z.string().max(255, 'direccion tiene un maximo de 255 caracteres')
const telefono = z.string().max(15, 'telefono tiene un maximo de 15 caracteres').min(10, 'telefono tiene que ser minimo de 10 caracteres').regex(/^[-+]?[0-9]+$/,'telefono debe ser un numero')

const organizacionCreationSchema = z.object({
    nombre_organizacion,
    direccion,
    telefono
    
})

const organizacionEditionSchema = z.object({
    nombre_organizacion: z.optional(nombre_organizacion),
    direccion: z.optional(direccion),
    telefono: z.optional(telefono)
})

module.exports = {
    organizacionCreationSchema,
    organizacionEditionSchema
}