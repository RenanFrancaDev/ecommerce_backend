const express = require("express");
const router = express.Router();
const connectDatabase = require("../src/midddlewares/connectDB");
const axios = require("axios");

router.use(express.json());
router.use(connectDatabase);

router.post("/", async function (req, res) {
  const db = req.dbConnection;
  const { products, id_user } = req.body;
  let stock_ok = true; //validation

    // validation quantity os the stock
  for (const element of products) {
    try {
      
      const response = await axios.get(
        `http://localhost:4000/stock/${element.id}`
      );
      const result = response.data.result;
      const quantity = result.quantity;


      if (element.quantity > quantity) {
        stock_ok = false;
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  //insufficient stock
  if (!stock_ok) {
    res.status(401).send("Verifique a quantidade em estoque");
    
  } else { //sufficient stock
    const sql = "INSERT INTO sales (id_user, total_price) VALUES (?, ?)";
    const salevalue = [id_user, 0];

    db.query(sql, salevalue, (err, results) => {
      if (err) {
        
        console.error("Erro ao criar produto no banco de dados:", err);
        return res.status(500).json({ error: err });
      }

      const saleId = results.insertId;
      let totalValue = 0;

      // INSERT ORDER_PRODUCT TABLE
      for (const product of products) {
        sqlProductSales =
          "INSERT INTO order_product (id_sales, id_product, quantity) VALUES (?, ?, ?)";
        const valuesProductSales = [
          saleId,
          product.id,
          product.quantity,
        ];
        db.query(sqlProductSales, valuesProductSales, (err, results) => {
          if (err) {
            console.error("Erro ao criar produto no banco de dados:", err);
            return res.status(500).json({ error: err });
          }
        });
        totalValue += product.price * product.quantity;

        const requestBody = {
          quantity: product.quantity,
        };


        //UPDATE STOCK AFTER ORDER - REQUEST API
        axios
          .put(
            `http://localhost:4000/stock/update/${product.id}`,
            requestBody
          )
          .then((response) => {
            if (response.status === 200) {
              console.log(
                `Estoque atualizado com sucesso para o produto ${product.id}`
              );
            } else {
              console.error(
                `Erro ao atualizar o estoque para o produto ${product.id}`
              );
            }
          })
          .catch((error) => {
            console.error(
              `Erro ao fazer a requisição para atualizar o estoque: ${error.message}`
            );
          });
      }

      db.query("UPDATE sales SET total_price = ? WHERE id = ?", [
        totalValue,
        saleId,
      ]);

      res.status(200).send("Venda inserida com sucesso!");
    });
    db.release();
  }
});

// get all sales
router.get("/all", (req, res) => {
  const db = req.dbConnection;

  db.query("SELECT * FROM sales", (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    console.log(results);

    res.status(200).json({
      status: "OK",
      mensagem: "Sucesso ao consultar vendas",
      data: results,
    });

    db.release();
  });
});

// GET sale by id
router.get("/:id", (req, res) => {
  const db = req.dbConnection;
  const id = req.params.id;

  const sql = "SELECT * FROM sales WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.status(200).json({
      status: "OK",
      mensagem: "Sucesso ao consultar venda",
      result: results[0],
    });

    db.release();
  });
});


module.exports = router;