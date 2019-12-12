const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

// create express app
const app = express();

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json());


app.post('/shopping', db.createShopping);
app.get('/shopping/id', db.getShoppingById);
app.get('/shopping/name', db.getShoppingByName);
app.get('/shopping/data', db.getAllShoppings);
app.post('/store', db.createStore);
app.get('/store/id', db.getStoreById);
app.get('/store/name', db.getStoreByName);
app.get('/store/data', db.getAllStores);

app.get('/shopping/store/name', db.getStoreAndShoppingByName);

app.post('/results', db.createResult);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
