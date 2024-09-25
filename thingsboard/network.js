const express = require('express');
const response = require('../network/response'); // Importa el módulo de respuesta
const thingsboardAPI = require('../../utils/thingsboard'); // Importa el cliente de ThingsBoard

const router = express.Router();

// Define las rutas para el microservicio de ThingsBoard
router.get('/device/:id', getDevice);
router.post('/device', createDevice);
router.put('/device/:id', updateDevice);

async function getDevice(req, res, next) {
    try {
        const responseData = await thingsboardAPI.get(`/device/${req.params.id}`);
        response.success(req, res, responseData.data, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
}

async function createDevice(req, res, next) {
    try {
        const deviceData = req.body;
        const responseData = await thingsboardAPI.post('/device', deviceData);
        response.success(req, res, responseData.data, 201);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
}

async function updateDevice(req, res, next) {
    try {
        const deviceData = req.body;
        const responseData = await thingsboardAPI.put(`/device/${req.params.id}`, deviceData);
        response.success(req, res, responseData.data, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
}

module.exports = router;
