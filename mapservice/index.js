const express = require('express');
const app = express();
const config = require('../config')
const mapRoutes = require('./network');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/api/map', mapRoutes); // Ruta base para el microservicio de mapa

const PORT = config.mapService.port;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
