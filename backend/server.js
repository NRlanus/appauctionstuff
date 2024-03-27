const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.on('ready', () => {
  const dbPath = path.join(app.getPath('userData'), 'mydatabase.db');
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
      if (err) {
          console.error('Error al abrir la base de datos', err.message);
      } else {
          console.log('Conectado a la base de datos SQLite.');
          initializeDatabase();
      }
  });
});

 
function initializeDatabase() {
  db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ItemNumber TEXT,
    Name TEXT,
    PurchasePrice REAL,
    SoldPrice REAL,
    Notes TEXT,
    Retail REAL,
    MonthlyInPurchase TEXT,
    DateSold TEXT,
    Site TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS fees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    InvoiceId TEXT,
    Premium REAL,
    Freight REAL,
    Tax REAL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS numbers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Number TEXT,
    Description TEXT
  )`);

  // Puedes continuar aquí con la creación de otras tablas necesarias.
  console.log("Tablas inicializadas correctamente.");
}
/*const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Admin1234',
  database: 'auctionstuff'
});*/



  //================GET ITEMS LIST================
app.get('/api/items', (req, res) => {
  const sqlSelect = "SELECT * FROM items";
  db.all(sqlSelect, [], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al obtener los datos');
    } else {
      res.send(result);
    }
  });
});

  //================GET NUMBERS LIST================
app.get('/api/numbers', (req, res) => {
  const sqlSelect = "SELECT * FROM numbers";
  db.all(sqlSelect, [], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener los datos de la segunda tabla');
    } else {
      res.send(result);
    }
  });
});
app.get('/api/fees', (req, res) => {
  const sqlSelect = "SELECT * FROM fees";
  db.all(sqlSelect, [], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener los datos de la segunda tabla');
    } else {
      res.send(result);
    }
  });
});
  
//===================ADD NEW ITEMS=======================
app.post('/api/add-item', (req, res) => {
    const { itemNumber, name, purchasePrice, soldPrice, notes, retail, monthlyInPurchase, dateSold, site } = req.body;
    const sqlInsert = "INSERT INTO items (ItemNumber, Name, PurchasePrice, SoldPrice, Notes, Retail, MonthlyInPurchase, DateSold, Site) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.run(sqlInsert, [itemNumber, name, purchasePrice, soldPrice, notes, retail, monthlyInPurchase, dateSold, site], function(err) {
      if (err) {
        console.error("Error al insertar en 'items':", err);
        res.status(500).send('Error al agregar el item');
      } else {
        res.status(200).send(`Item agregado correctamente con el ID: ${this.lastID}`);
      }
    });
});

app.post('/api/add-fees', (req, res) => {
  const { invoiceId, premium, freight, tax } = req.body;
  const sqlInsert = "INSERT INTO fees (InvoiceId, Premium, Freight, Tax) VALUES (?, ?, ?, ?)";
  db.run(sqlInsert, [invoiceId, premium, freight, tax], function(err) {
    if (err) {
      console.error("Error al insertar en 'fees':", err);
      res.status(500).send('Error al agregar el fee');
    } else {
      res.status(200).send(`Fee agregado correctamente con el ID: ${this.lastID}`);
    }
  });
});

  //===================UPDATE ITEMS=================================
  app.patch('/api/update-item/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    let query = 'UPDATE items SET ';
    const queryParams = [];
  
    Object.entries(updates).forEach(([key, value], index) => {
      if (value != null) {
        query += `${key} = ?`;
        queryParams.push(value);
  
        if (index < Object.entries(updates).length - 1) {
          query += ", ";
        }
      }
    });
  
    query += ` WHERE id = ?`;
    queryParams.push(id);
  
    if (queryParams.length <= 1) { // Incluyendo el ID
      res.status(400).send({ error: 'No se proporcionaron campos para actualizar.' });
    } else {
      db.run(query, queryParams, function(err) {
        if (err) {
          console.error("Error al actualizar 'items':", err);
          res.status(500).send('Error al actualizar el item');
        } else {
          res.status(200).send(`Item actualizado correctamente. Filas afectadas: ${this.changes}`);
        }
      });
    }
  });
  
  app.patch('/api/update-fees/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    let query = 'UPDATE fees SET ';
    const queryParams = [];
  
    Object.entries(updates).forEach(([key, value], index) => {
      if (value != null) {
        query += `${key} = ?`;
        queryParams.push(value);
  
        if (index < Object.entries(updates).length - 1) {
          query += ", ";
        }
      }
    });
  
    query += ` WHERE id = ?`;
    queryParams.push(id);
  
    if (queryParams.length <= 1) {
      res.status(400).send({ error: 'No se proporcionaron campos para actualizar.' });
    } else {
      db.run(query, queryParams, function(err) {
        if (err) {
          console.error("Error al actualizar 'fees':", err);
          res.status(500).send('Error al actualizar el fee');
        } else {
          res.status(200).send(`Fee actualizado correctamente. Filas afectadas: ${this.changes}`);
        }
      });
    }
  });
  

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
