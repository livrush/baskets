require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT;
const MONGO = process.env.OFFLINE_MONGO;
const helpers = require('./server-helpers.js');
// let DB = null;

app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, '/')));

// !!! //////////////////////////////////////////////////////////////
// !!! BASKETS //////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

app.get('/basket', helpers.basket.get);
app.post('/basket', helpers.basket.post);
app.put('/basket', helpers.basket.put);
app.delete('/basket', helpers.basket.delete);

// !!! //////////////////////////////////////////////////////////////
// !!! CERAMICS /////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

app.get('/ceramic', helpers.ceramic.get);
app.post('/ceramic', helpers.ceramic.post);
app.put('/ceramic', helpers.ceramic.put);
// app.delete('/ceramic', helpers.ceramic.delete);

// !!! //////////////////////////////////////////////////////////////
// !!! ACCESSORY ////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

// app.get('/accessory', helpers.accessory.get);
// app.post('/accessory', helpers.accessory.post);
// app.put('/accessory', helpers.accessory.put);
// app.delete('/accessory', helpers.accessory.delete);

// !!! //////////////////////////////////////////////////////////////
// !!! DATABASE CONNECTION //////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

MongoClient.connect(MONGO, (err, database) => {
  // DB = database;
  module.exports.DB = database;
  app.listen(PORT, function() { console.log(`localhost:${PORT}`) });
});
