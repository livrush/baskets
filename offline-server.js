require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT;
const MONGO = process.env.OFFLINE_MONGO;
let db = null;

app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, '/')));

app.get('/basket', (req, res) => {
  db.collection('baskets').find().toArray(function(err, results) {
    results.sort(function(a, b) {
      return a.year - b.year;
    });
    res.send(results);
  });
});

app.post('/basket', (req, res) => {
  const basket = prepareBasketInformation(req.body);
  db.collection('baskets').save(basket, (err, result) => {
    if (err) return console.error(err);
    console.log('Basket saved to database!');
    res.redirect('/');
  })
});

app.put('/basket', (req, res) => {
  const basket = prepareBasketInformation(req.body.data);
  if (req.body.password === process.env.SECRET) {
    db.collection('baskets').replaceOne({ _id: ObjectId(req.body.id) }, basket, (err, result) => {
      if (err) return console.error(err);
      console.log(`Basket ${req.body.id} update in database!`);
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(401);
  }
});

app.delete('/basket', (req, res) => {
  if (req.body.password === process.env.SECRET) {
    db.collection('baskets').deleteOne({ _id: ObjectId(req.body.id) }, (err, result) => {
      if (err) return console.error(err);
      console.log(`Basket ${req.body.id} deleted from database!`);
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(401);
  }
});

MongoClient.connect(MONGO, (err, database) => {
  db = database;
  app.listen(PORT, function() { 
    console.log('RUNNING OFFLINE VERSION');
    console.log(`localhost:${PORT}`);
  });
});

function makeBoolean (value) {
  return value === 'true' ? true : false;
}

function prepareBasketInformation (product) {
  const updatedProduct = product;
  updatedProduct.name = product.name.replace(/\b\w/g, l => l.toUpperCase());
  updatedProduct.type = product.type.replace(/\b\w/g, l => l.toUpperCase());
  updatedProduct.lid = makeBoolean(product.lid);
  updatedProduct.liner = makeBoolean(product.liner);
  updatedProduct.protector = makeBoolean(product.protector);
  updatedProduct.accessories = makeBoolean(product.accessories);
  if (updatedProduct['accessories-list']) {
    updatedProduct['accessories-list'] = product['accessories-list'].split(',');
  }
  return updatedProduct;
}