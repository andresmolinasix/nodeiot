const express = require('express');
const router = express.Router();
const MapController = require('./controller');

// Ruta para obtener coordenadas de una tabla específica
router.get('/coordenadas/:nombreTabla', MapController.getCoordenadas);

module.exports = router;
