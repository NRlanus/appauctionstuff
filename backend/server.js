const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Admin1234',
  database: 'auctionstuff'
});


  //================GET ITEMS LIST================
app.get('/api/items', (req, res) => {
    const sqlSelect = "SELECT * FROM items";
    db.query(sqlSelect, (err, result) => {
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
    db.query(sqlSelect, (err, result) => {
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
    db.query(sqlSelect, (err, result) => {
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
    // Ejemplo de cómo podrías insertar datos en la tabla 'items'
    const { itemNumber, name, purchasePrice, soldPrice, notes, retail, monthlyInPurchase, dateSold, site } = req.body; // Asegúrate de validar y sanitizar los datos de entrada
    const sqlInsert = "INSERT INTO items (ItemNumber, Name, PurchasePrice, SoldPrice, Notes, Retail, MonthlyInPurchase, DateSold, Site) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [itemNumber, name, purchasePrice, soldPrice, notes, retail, monthlyInPurchase, dateSold, site], (err, result) => {
      if (err) {
        console.error("Error al insertar en 'items':", err);
        res.status(500).send('Error al agregar el item');
      } else {
        res.status(200).send('Item agregado correctamente');
      }
    });
  });
  app.post('/api/add-fees', (req, res) => {
    // Ejemplo de cómo podrías insertar datos en la tabla 'items'
    const { invoiceId, premium, freight, tax  } = req.body; // Asegúrate de validar y sanitizar los datos de entrada
    const sqlInsert = "INSERT INTO fees (InvoiceId, Premium, Freight, Tax) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [invoiceId, premium, freight, tax], (err, result) => {
      if (err) {
        console.error("Error al insertar en 'fees':", err);
        res.status(500).send('Error al agregar el item');
      } else {
        res.status(200).send('Item agregado correctamente');
      }
    });
  });

  //===================UPDATE ITEMS=================================
  app.patch('/api/update-item/:id', (req, res) => {
    const  id  = req.params.id;
    const updates = req.body;
  console.log(req.body);
  console.log('id: ', req.params.id);
    // Inicializar partes de la consulta SQL
    let query = 'UPDATE items SET ';
    const queryParams = [];
  
    // Construir dinámicamente la consulta SQL basada en los campos proporcionados
    Object.entries(updates).forEach(([key, value], index) => {
      if (value != null) { // Asegúrate de incluir solo campos que no sean null
        query += `${key} = ?`;
        queryParams.push(value);
  
        if (index < Object.keys(updates).length - 1) {
          query += ", ";
        }
      }
    });
  
    query += ` WHERE id = ?`;
    queryParams.push(id);
  
    // Verificar que al menos un campo ha sido proporcionado
    if (queryParams.length === 1) { // Solo el ID está presente, ningún campo a actualizar
      return res.status(400).send({ error: 'No se proporcionaron campos para actualizar.' });
    }
  
    // Ejecutar la consulta
    db.query(query, queryParams, (err, result) => {
      if (err) {
        console.error("Error al actualizar 'items':", err);
        res.status(500).send('Error al actualizar el item');
      } else {
        res.status(200).send('Item actualizado correctamente');
      }
    });
  });
  

  //===================UPDATE FEES=================================
  app.patch('/api/update-fees/:id', (req, res) => {
    const  id  = req.params.id;
    const updates = req.body;
  console.log(req.body);
  console.log('id: ', req.params.id);
    // Inicializar partes de la consulta SQL
    let query = 'UPDATE fees SET ';
    const queryParams = [];
  
    // Construir dinámicamente la consulta SQL basada en los campos proporcionados
    Object.entries(updates).forEach(([key, value], index) => {
      if (value != null) { // Asegúrate de incluir solo campos que no sean null
        query += `${key} = ?`;
        queryParams.push(value);
  
        if (index < Object.keys(updates).length - 1) {
          query += ", ";
        }
      }
    });
  
    query += ` WHERE id = ?`;
    queryParams.push(id);
  
    // Verificar que al menos un campo ha sido proporcionado
    if (queryParams.length === 1) { // Solo el ID está presente, ningún campo a actualizar
      return res.status(400).send({ error: 'No se proporcionaron campos para actualizar.' });
    }
  
    // Ejecutar la consulta
    db.query(query, queryParams, (err, result) => {
      if (err) {
        console.error("Error al actualizar 'items':", err);
        res.status(500).send('Error al actualizar el fee');
      } else {
        res.status(200).send('Item actualizado correctamente');
      }
    });
  });
  

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
