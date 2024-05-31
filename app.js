// Importar Express y crear una aplicación
const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
// require('dotenv').config()
const morgan = require('morgan')

// Serve static content from the `dist` folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Importar las rutas
// const indexRouter = require('./routes/index');
const colaboradoresRouter = require('./routes/colaborador') 
const solicitantesRouter = require('./routes/solicitante')
const solicitudesRouter = require('./routes/solicitud')
const authenticateRouter = require('./routes/authenticate')
const licenciaturasRouter = require('./routes/licenciatura')
const municipiosRouter = require('./routes/municipio');
const organizacionesRouter = require('./routes/organizacion');
const proyectosRouter = require('./routes/proyecto');
const tareasRouter = require('./routes/tarea');
const tipo_colaboradoresRouter = require('./routes/tipo_colaborador');
const tipo_serviciosRouter = require('./routes/tipo_servicio');
const tarea_colaboradorRouter = require('./routes/tarea_colaborador')

// Configurar middleware
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.urlencoded({ extended: false })); // Middleware para parsear los cuerpos de las solicitudes codificados en URL
app.use(express.static('public')); // Middleware para servir archivos estáticos en la carpeta 'public'
app.use(cors())
app.use(morgan())

// Configurar las rutas
// app.use('/', indexRouter);
app.use('/api', colaboradoresRouter);
app.use('/api', solicitantesRouter);
app.use('/api', solicitudesRouter);
app.use('/api', authenticateRouter);
app.use('/api', licenciaturasRouter);
app.use('/api', municipiosRouter);
app.use('/api', organizacionesRouter);
app.use('/api', proyectosRouter);
app.use('/api', tareasRouter);
app.use('/api', tipo_colaboradoresRouter);
app.use('/api', tipo_serviciosRouter);
app.use('/api', tarea_colaboradorRouter);


// Vistas
// app.set('views', path.join(__dirname, 'frontend'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend','control_pane', 'index.html'));
})


// Manejo de errores
app.use((req, res, next) => {
    const error = new Error('Recurso no encontrado');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            message: err.message,
        },
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
    console.log(`Modo de ejecucion: ${process.env.MODE}`)
});