const express = require('express');
const response = require('../network/response'); // Asegúrate de tener este módulo para manejar respuestas
const Store = require('../store/mysql'); 
const cors = require('cors');

const router = express.Router();

// Configurar CORS
router.use(cors());

// Ruta para listar todas las tablas
router.get('/tablas', async (req, res) => {
    try {
        const [results] = await Store.listTables(); // Función para listar tablas en tu Store
        response.success(req, res, results, 200);
    } catch (error) {
        response.error(req, res, 'Error al obtener las tablas', 500);
    }
});

// Rutas para operaciones CRUD
router.get('/:table', async (req, res) => {
    try {
        const datos = await Store.list(req.params.table);
        response.success(req, res, datos, 200);
    } catch (error) {
        response.error(req, res, 'Error al listar datos', 500);
    }
});

router.get('/:table/:id', async (req, res) => {
    try {
        const datos = await Store.get(req.params.table, req.params.id);
        response.success(req, res, datos, 200);
    } catch (error) {
        response.error(req, res, 'Error al obtener datos', 500);
    }
});

router.post('/:table', async (req, res) => {
    try {
        const datos = await Store.insert(req.params.table, req.body);
        response.success(req, res, datos, 201); // 201 para recurso creado
    } catch (error) {
        response.error(req, res, 'Error al insertar datos', 500);
    }
});

router.put('/:table', async (req, res) => {
    try {
        const datos = await Store.upsert(req.params.table, req.body);
        response.success(req, res, datos, 200);
    } catch (error) {
        response.error(req, res, 'Error al actualizar datos', 500);
    }
});

module.exports = router;
