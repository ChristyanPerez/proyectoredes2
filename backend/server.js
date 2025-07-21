const http = require('http');
const fs = require('fs');
const path = require('path');
const db = require('./db');

const PORT = 3001;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Permitir CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Servir el archivo formulario.html
  if (url === '/' || url === '/formulario.html') {
    const filePath = path.join(__dirname, 'formulario.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error al cargar el formulario');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
    return;
  }

  // Procesar POST de /api/contacto
  if (url === '/api/contacto' && method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const datos = JSON.parse(body);
        const { nombre, email, mensaje } = datos;

        const query = 'INSERT INTO datos (nombre, correo, mensaje) VALUES (?, ?, ?)';
        db.query(query, [nombre, email, mensaje], (err, result) => {
          if (err) {
            console.error('Error al insertar en la base de datos:', err);
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Error al guardar en la base de datos' }));
          } else {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Mensaje guardado exitosamente' }));
          }
        });
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Datos inválidos' }));
      }
    });
    return;
  }

  // Ruta no encontrada
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
