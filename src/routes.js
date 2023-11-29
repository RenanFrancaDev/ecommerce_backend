function routes(app) {
    app.use('/users', require('../routes/users'));
    app.use('/products', require('../routes/products.js'));
    app.use('/stock', require('../routes/stock.js'));
    // app.use('/order_product', require('../routes/order-items.js'));
    // app.use('/sales', require('../routes/sales.js'));
    return;
  }
  
  module.exports = routes;