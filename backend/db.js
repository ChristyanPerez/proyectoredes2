const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'usuario',
  password: process.env.DB_PASSWORD || 'clave123',
  database: process.env.DB_NAME || 'formulario_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la BD:', err);
    return;
  }
  console.log('Conectado a la BD');
});

module.exports = db;
