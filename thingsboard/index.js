const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config'); // Importa la configuración
const router = require('./network'); // Importa el enrutador

const app = express();

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Usa el enrutador para manejar las rutas
app.use('/', router);

// Inicia el servidor en el puerto definido en la configuración
app.listen(config.thingsboard.port, () => {
    console.log('Servicio de ThingsBoard escuchando en el puerto', config.thingsboard.port);
});
