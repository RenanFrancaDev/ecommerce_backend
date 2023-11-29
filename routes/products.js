const express = require('express');
const router = express.Router();
const connectDatabase = require('../src/midddlewares/connectDB');

router.use(express.json());
router.use(connectDatabase);

router.post('/register', (req, res) => {
  const db = req.dbConnection;
  const { name, description, price } = req.body;
  
  sql = 'INSERT INTO products (name, description, price) VALUES (?, ?, ?)';
  const values = [name, description, price];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Erro ao criar produto no banco de dados:', err);
      return res.status(500).json({ error: err });
    }
    
    const novoProdutoId = results.insertId;

    const sql2 = 'INSERT INTO stock (id_product) VALUES (?)';

    db.query(sql2, [novoProdutoId], (err2, results2) => {
      if (err2) {
        console.error('Erro na segunda consulta ao banco de dados:', err2);
        return res.status(500).json({ error: err2 });
      }

      res.json({ data: { novoProdutoId } });
      
      db.release();
    });
  });
});


router.get('/', (req, res) => {
  const db = req.dbConnection;

  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Erro na consulta ao banco de dados:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    res.json({ data: results });
    
    db.release();
  });
});

router.get('/:id', (req, res) => {
  const db = req.dbConnection;
  const id = req.params.id;

  const sql = 'SELECT * FROM products WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro na consulta ao banco de dados:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    res.json({ data: results });
    
    db.release();
  });
});

router.put('/:id', (req, res) => {
  const db = req.dbConnection;
  const id = req.params.id;
  const updatedFields = req.body;

  const sql = 'UPDATE products SET ? WHERE id = ?';
  const values = [updatedFields, id];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Erro ao editar produto no banco de dados:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    res.json({ data: results });
    
    db.release();
  });
});

router.delete('/:id', (req, res) => {
  const db = req.dbConnection;
  const id = req.params.id;
  
  const sql = 'DELETE FROM stock WHERE id_product = ?';
  const sql2 = 'DELETE FROM products WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao excluir produto do banco de dados:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  db.query(sql2, [id], (err, results) => {
    if (err) {
      console.error('Erro ao excluir produto do banco de dados:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    res.json({ data: results });
    db.release();

    });
});

module.exports = router;