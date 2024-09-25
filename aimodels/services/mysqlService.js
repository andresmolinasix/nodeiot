// services/mysqlService.js
const mysql = require('mysql2/promise');

// Configurar la conexión a MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'youruser',
  password: 'yourpassword',
  database: 'yourdatabase',
});

module.exports = pool;
