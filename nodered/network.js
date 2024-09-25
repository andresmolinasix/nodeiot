const express = require('express');
const RED = require('node-red');
const response = require('../network/response'); // Usa el mismo sistema de respuestas que el microservicio MySQL

const router = express.Router();

// Ruta para obtener el estado de los flujos
router.get('/flows', getFlows);

// Ruta para crear o actualizar un flujo en Node-RED
router.post('/flows', addFlow);

// Ruta para eliminar un flujo
router.delete('/flows/:id', deleteFlow);

// Ruta para ejecutar un nodo específico o flujo
router.post('/trigger', triggerFlow);

// Función para obtener la lista de flujos
async function getFlows(req, res, next) {
    try {
        const flows = await RED.nodes.getFlows(); // Obtiene los flujos de Node-RED
        response.success(req, res, flows, 200);   // Devuelve los flujos en la respuesta
    } catch (error) {
        response.error(req, res, 'Error al obtener flujos', 500, error);
    }
}

// Función para añadir un nuevo flujo o actualizar uno existente
async function addFlow(req, res, next) {
    try {
        const newFlow = req.body;
        await RED.nodes.setFlows(newFlow);        // Establece los flujos en Node-RED
        response.success(req, res, 'Flujo agregado o actualizado correctamente', 201);
    } catch (error) {
        response.error(req, res, 'Error al agregar o actualizar flujo', 500, error);
    }
}

// Función para eliminar un flujo
async function deleteFlow(req, res, next) {
    try {
        const flowId = req.params.id;
        const flows = await RED.nodes.getFlows();
        const updatedFlows = flows.filter(flow => flow.id !== flowId); // Filtra los flujos para eliminar el seleccionado

        await RED.nodes.setFlows(updatedFlows);   // Establece los flujos actualizados sin el que se eliminó
        response.success(req, res, 'Flujo eliminado correctamente', 200);
    } catch (error) {
        response.error(req, res, 'Error al eliminar flujo', 500, error);
    }
}

// Función para desencadenar un flujo o nodo específico
async function triggerFlow(req, res, next) {
    try {
        const { flowId, data } = req.body; // Obtiene el ID del flujo y los datos para ejecutar
        const node = RED.nodes.getNode(flowId);   // Obtiene el nodo por ID

        if (node) {
            node.receive(data);                   // Envía los datos al nodo para que se ejecute
            response.success(req, res, `Flujo ${flowId} ejecutado`, 200);
        } else {
            response.error(req, res, `Nodo ${flowId} no encontrado`, 404);
        }
    } catch (error) {
        response.error(req, res, 'Error al ejecutar el flujo', 500, error);
    }
}

module.exports = router;
