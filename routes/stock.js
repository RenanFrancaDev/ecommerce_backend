const express = require("express");
const router = express.Router();
const connectDatabase = require("../src/midddlewares/connectDB");

router.use(express.json());
router.use(connectDatabase);

router.put("/edit/:id", (req, res) => {
  const db = req.dbConnection;
  const id = req.params.id;
  const updatedFields = req.body;

  const sql = "UPDATE stock SET ? WHERE id_product = ?";
  const values = [updatedFields, id];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao excluir produto do banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });

    db.release();
  });
});

router.put("/update/:id", (req, res) => {
  const db = req.dbConnection;
  const productId = req.params.id;
  const { quantity } = req.body;

  db.query(
    "SELECT quantity FROM stock WHERE id_product = ?",
    [productId],
    (err, results) => {
      if (err) {
        console.error("Erro ao consultar o estoque:", err);
        res.status(500).send("Erro ao consultar o estoque");
      } else {
        if (results.length === 0) {
          res.status(404).send("Produto não encontrado no estoque");
        } else {
          const currentStock = results[0].quantity;

          if (currentStock < quantity) {
            res.status(400).send("Quantidade insuficiente em estoque");
          } else {
            const newStock = currentStock - quantity;

            db.query(
              "SELECT name FROM products WHERE id = ?",
              [productId],
              (err, results) => {
                if (err) {
                  console.error("Erro ao consultar o nome do produto:", err);
                  res.status(500).send("Erro ao consultar o nome do produto");
                } else {
                  if (results.length === 0) {
                    res
                      .status(404)
                      .send("Nome do Produto não encontrado no estoque");
                  } else {
                    const productName = results[0].name;

                    db.query(
                      "UPDATE stock SET quantity = ? WHERE id_product = ?",
                      [newStock, productId, productName],
                      (err, results) => {
                        if (err) {
                          console.error("Erro ao atualizar o estoque:", err);
                          res.status(500).send("Erro ao atualizar o estoque");
                        } else {
                          console.log("Estoque atualizado com sucesso");
                          res
                            .status(200)
                            .send(
                              "Estoque atualizado com sucesso, quantidade atual: " + productName + " é " + newStock
                            );
                        }
                      }
                    );
                  }
                }
              }
            );
          }
        }
      }
    }
  );
});

router.get("/:id", (req, res) => {
  const db = req.dbConnection;
  const id = req.params.id;

  const sql = "SELECT * FROM stock WHERE id_product = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({
      status: "OK",
      mensagem: "Sucesso ao consultar estoque",
      result: results[0],
    });

    db.release();
  });
});

router.get("/", (req, res) => {
  const db = req.dbConnection;

  db.query("SELECT * FROM stock", (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    console.log(results);

    res.json({
      status: "OK",
      mensagem: "Sucesso ao consultar estoque",
      data: results,
    });

    db.release();
  });
});

module.exports = router;
