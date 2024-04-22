const express = require('express');
const mysql = require('mysql');

const app = express();
const cors = require('cors');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0', 
  database: 'p1_18'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.get('/', (req, res) => {
  res.send('API funcionando correctamente.');
});


// Agregar un nuevo proceso
app.post('/api/NuevoProceso', (req, res) => {
  
    const { pid, nombre, llamada, tamano, fecha } = req.body;
    const query = 'INSERT INTO procesos (pid, nombre, llamada, tamano, fecha) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [pid, nombre, llamada, tamano, fecha], (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Error al insertar en la base de datos", error: error });
      }
      res.status(201).json({ message: `Proceso agregado con ID: ${results.insertId}` });
    });
  });

// Obtener todos los procesos
app.get('/api/ObtenerProcesos', (req, res) => {
    const query = 'SELECT * FROM procesos';
    db.query(query, (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Error al obtener procesos", error: error });
      }
      res.status(200).json(results);
    });
  });
  

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
