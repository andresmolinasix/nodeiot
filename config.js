module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'youruser',
        password: process.env.MYSQL_PASS || 'yourpassword',
        database: process.env.MYSQL_DB || 'yourdatabase',
    },
    mysqlService: {
        port: process.env.MYSQL_SRV_PORT || 3001,
    },
    nodeRedService: {                    // <-- Agregamos esta sección
        host: process.env.NODERED_HOST || 'localhost',
        port: process.env.NODERED_PORT || 3002, // Define el puerto que prefieras
    },
    thingsboard: {
        host: process.env.TB_HOST || 'thingsboard', // Nombre del servicio en Docker
        port: process.env.TB_PORT || 8081,
        token: process.env.TB_TOKEN || 'nodeIoT',
    },
    modelsService: { // Agregamos esta sección para el servicio de models
        port: process.env.MODELS_SERVICE_PORT || 3003, // Cambia el puerto si es necesario
    },
    tramaService: { // Agregamos esta sección para el servicio de models
        port: process.env.MODELS_SERVICE_PORT || 3004, // Cambia el puerto si es necesario
    },
    mapService: { // Agregamos esta sección para el servicio de models
        port: process.env.MODELS_SERVICE_PORT || 3005, // Cambia el puerto si es necesario
    },
    
}