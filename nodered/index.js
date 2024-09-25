const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const RED = require('node-red');

const config = require('../config');
const nodeRedRouter = require('./network'); // Importamos las rutas definidas en network.js

const app = express();
app.use(bodyParser.json());

// Configuramos Node-RED para ejecutarse dentro de nuestro servidor Express
const server = http.createServer(app);

// Opciones de Node-RED (puedes personalizar estos valores según tus necesidades)
const settings = {
    httpAdminRoot: '/red', // Ruta para la interfaz de administración de Node-RED
    httpNodeRoot: '/api',  // Ruta para los nodos de la API expuestos por Node-RED
    userDir: './nodered_data', // Carpeta para almacenar la configuración de los flujos
    functionGlobalContext: {} // Contexto global para funciones personalizadas
};

// Inicializa Node-RED con las configuraciones
RED.init(server, settings);

// Rutas de Node-RED
app.use(settings.httpAdminRoot, RED.httpAdmin); // Interfaz visual de administración de Node-RED
app.use(settings.httpNodeRoot, RED.httpNode);   // Nodos que definen APIs HTTP

// Añadimos las rutas personalizadas de Node-RED
app.use('/', nodeRedRouter);

// Inicia el servidor en el puerto especificado en config.nodeRedService.port
server.listen(config.nodeRedService.port, () => {
    console.log('Node-RED escuchando en el puerto', config.nodeRedService.port);
});

// Inicia Node-RED
RED.start();
