const z = require('zod')

const clave = z.string({
    required_error: 'La clave es requerida',
    invalid_type_error: 'La clave debe ser un string',
    message: 'Identificador del tipo de servicio',
    description: 'Este campo servira para identificar al servicio'
})
.min(2, 'La clave debe tener una longitud minima de 2 caracteres')
.max(3, 'La clave debe tener una longitud maxima de 3 caracteres')

const nombre = z.string({
    required_error: 'El nombre es requerido',
    invalid_type_error: 'El nombre debe ser un string',
    message: 'Nombre del tipo de servicio',
    description: 'Este campo servira para mostrar el nombre del servicio'
})
.min(10, 'El nombre debe tener una longitud minima de 10 caracteres')
.max(50, 'El nombre debe tener una longitud maxima de 50 caracteres')

const descripcion = z.optional(z.string().max(255, 'La descripcion debe tener una longitud maxima de 255 caracteres'),{
    message: 'Descripcion de del tipo de servicio',
    description: 'Este campo serivira para describir el tipo de servicio dado'
})

const tipoServicioCreationSchema = z.object({
    clave,
    nombre,
    descripcion
})

const tipoServicioEditionSchema = z.object({
    nombre: z.optional(nombre),
    descripcion
})


module.exports = {
    tipoServicioCreationSchema,
    tipoServicioEditionSchema
}