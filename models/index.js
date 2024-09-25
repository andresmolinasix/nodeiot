const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config'); // Asegúrate de tener la configuración correcta
const UserModel = require('./user.model');
const AuthModel = require('./auth.model');
const PostModel = require('./post.model');
const DataModel = require('./data.model'); // Asegúrate de tener este modelo
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    dialect: 'mysql',
});

// Inicialización de modelos
const User = UserModel(sequelize, DataTypes);
const Auth = AuthModel(sequelize, DataTypes);
const Post = PostModel(sequelize, DataTypes);
const Data = DataModel(sequelize, DataTypes); // Modelo para la nueva tabla

// Sincronizar modelos y crear usuario genérico
sequelize.sync({ force: true }) // Cambia a `false` en producción
    .then(async () => {
        console.log('Conexión a la base de datos establecida exitosamente.');

        // Crear un usuario genérico
        const genericUser = await User.create({
            id: '123', // Cambia esto a un UUID o valor único en producción
            username: 'adminNodeIoT',
            name: 'andresmolina',
            correo: 'andresmolina@gmail.com',
        });

        // Crear un usuario en el modelo Auth si es necesario
        await Auth.create({
            id: '123', // Asegúrate de que el ID sea único
            username: 'adminNodeIoT',
            password: 'Molina', // Asegúrate de hashear la contraseña en producción
        });

        console.log('Usuario genérico creado:', genericUser.username);

        // Cargar datos desde data.csv
        const results = [];
        const filePath = path.join(__dirname, 'data.csv');

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                // Procesar e insertar datos en la base de datos
                for (const item of results) {
                    await Data.create(item); // Asegúrate de que tu modelo Data sea adecuado para los datos
                }
                console.log('Datos cargados correctamente desde data.csv');
            })
            .on('error', (err) => {
                console.error('Error al leer el archivo:', err);
            });
    })
    .catch(error => {
        console.error('Error al conectar a la base de datos:', error);
    });

// Exporta los modelos si es necesario
module.exports = {
    User,
    Auth,
    Post,
    Data,
};
