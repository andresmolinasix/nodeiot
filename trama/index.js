const express = require('express');
const mysql = require('mysql2/promise'); // Asegúrate de usar mysql2 para promesas
const config = require('../config'); // Ruta a tu archivo de configuración
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware para parsear JSON

// Configuración de la conexión a la base de datos
const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

// Ruta para crear una nueva tabla y agregar sensores
app.post('/crearTabla', async (req, res) => {
    const { nombreTrama, datos } = req.body;

    // Validar entrada
    if (!nombreTrama || !Array.isArray(datos) || datos.length === 0) {
        return res.status(400).json({ message: 'El nombre de la tabla y los datos de los sensores son requeridos.' });
    }

    // Crear la tabla SQL
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ?? (
            Tag VARCHAR(255),
            Unidades VARCHAR(255),
            Descripcion TEXT,
            Host VARCHAR(255),
            Puerto VARCHAR(255),
            Longitud DECIMAL(10, 8),
            Latitud DECIMAL(10, 8)
        )
    `;

    try {
        // Crear conexión a la base de datos
        const connection = await mysql.createConnection(dbconf);

        // Ejecutar consulta para crear la tabla
        await connection.query(createTableQuery, [nombreTrama]);

        // Insertar los datos de los sensores
        const insertPromises = datos.map(sensor => {
            const insertQuery = `
                INSERT INTO ?? (Tag, Unidades, Descripcion, Host, Puerto, Longitud, Latitud)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            return connection.query(insertQuery, [
                nombreTrama,
                sensor.Tag,
                sensor.Unidades,
                sensor.Descripcion,
                sensor.Host,
                sensor.Puerto,
                sensor.Longitud,
                sensor.Latitud,
            ]);
        });

        // Esperar a que todas las inserciones se completen
        await Promise.all(insertPromises);

        // Cerrar la conexión
        await connection.end();

        return res.status(201).json({ message: `Tabla ${nombreTrama} creada y datos insertados exitosamente.` });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return res.status(500).json({ message: 'Error al crear la tabla o insertar datos.' });
    }
});

// Iniciar el servidor
const PORT = config.tramaService.port || 3004;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});