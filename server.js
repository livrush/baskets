require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT;
const MONGO = process.env.MONGO;
let DB = null;

app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, '/')));

// !!! //////////////////////////////////////////////////////////////
// !!! BASKETS //////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

app.get('/basket', (req, res) => {
  DB.collection('baskets').find().toArray(function(err, results) {
    results.sort(function(a, b) {
      return a.year - b.year;
    });
    res.send(results);
  });
});

app.post('/basket', (req, res) => {
  const basket = prepareBasketInformation(req.body);
  DB.collection('baskets').save(basket, (err, result) => {
    if (err) return console.error(err);
    console.log('Basket saved to database!');
    res.redirect('/');
  })
});

app.put('/basket', (req, res) => {
  const basket = prepareBasketInformation(req.body.data);
  if (req.body.password === process.env.SECRET) {
    DB.collection('baskets').replaceOne({ _id: ObjectId(req.body.id) }, basket, (err, result) => {
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
    DB.collection('baskets').deleteOne({ _id: ObjectId(req.body.id) }, (err, result) => {
      if (err) return console.error(err);
      console.log(`Basket ${req.body.id} deleted from database!`);
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(401);
  }
});

// !!! //////////////////////////////////////////////////////////////
// !!! CERAMICS /////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

app.get('/ceramic', (req, res) => {
  DB.collection('ceramics').find().toArray(function(err, results) {
    results.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
    res.send(results);
  });
});

app.post('/ceramic', (req, res) => {
  const ceramic = prepareCeramicInformation(req.body);
  DB.collection('ceramics').save(ceramic, (err, result) => {
    if (err) return console.error(err);
    console.log('Ceramic saved to database!');
    res.redirect('/');
  })
});

app.put('/ceramic', (req, res) => {
  const ceramic = prepareCeramicInformation(req.body.data);
  if (req.body.password === process.env.SECRET) {
    DB.collection('ceramics').replaceOne({ _id: ObjectId(req.body.id) }, ceramic, (err, result) => {
      if (err) return console.error(err);
      console.log(`Ceramic ${req.body.id} update in database!`);
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(401);
  }
});

// !!! //////////////////////////////////////////////////////////////
// !!! DATABASE CONNECTION //////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

MongoClient.connect(MONGO, (err, database) => {
  DB = database;
  app.listen(PORT, function() { console.log(`localhost:${PORT}`) });
});

// !!! //////////////////////////////////////////////////////////////
// !!! HELPER FUNCTIONS /////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

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

function prepareCeramicInformation (product) {
  const updatedProduct = product;
  updatedProduct.name = product.name.replace(/\b\w/g, l => l.toUpperCase());
  updatedProduct.type = product.type.replace(/\b\w/g, l => l.toUpperCase());
  if (updatedProduct['accessories-list']) {
    updatedProduct['accessories-list'] = product['accessories-list'].split(',');
  }
  return updatedProduct;
}