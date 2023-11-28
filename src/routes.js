function routes(app) {
    app.use('/users', require('../routes/users.js'));
    // app.use('/products', require('../routes/products.js'));
    // app.use('/orders', require('../routes/orders.js'));
    // app.use('/orders-items', require('../routes/order-items.js'));
    // app.use('/sales', require('../routes/sales.js'));
    // app.use('/stock', require('../routes/stock.js'));
    return;
  }
  
  module.exports = routes;