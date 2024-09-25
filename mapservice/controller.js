const mysql = require('mysql2/promise');
const config = require('../config');

// Configuración de la conexión a la base de datos
const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

// Función para obtener coordenadas de una tabla específica
const getCoordenadas = async (req, res) => {
    const { nombreTabla } = req.params; // Obtener el nombre de la tabla de los parámetros de la solicitud

    try {
        const connection = await mysql.createConnection(dbconf);
        const query = `SELECT DISTINCT longitud, latitud FROM ??`; // Usar ?? para evitar inyecciones SQL
        const [results] = await connection.query(query, [nombreTabla]); // Pasar el nombre de la tabla como parámetro

        await connection.end(); // Cerrar la conexión

        if (results.length === 0) {
            return res.status(404).json({ message: 'No se encontraron coordenadas.' });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error('Error al obtener coordenadas:', error);
        res.status(500).json({ message: 'Error al obtener coordenadas' });
    }
};

module.exports = {
    getCoordenadas,
};
