// Importar Express y crear un router
const express = require('express');
const router = express.Router();

// Ruta principal: /
router.get('/', (req, res) => {
    res.send('¡Hola, mundo desde Express!');
});

// Exportar el router para ser utilizado en otros archivos
module.exports = router;
