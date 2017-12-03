require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT;
const MONGO = process.env.MONGO;
const helpers = require('./server-helpers');
let DB = null;

app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, '/')));

// !!! //////////////////////////////////////////////////////////////
// !!! BASKETS //////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

app.get('/basket', );

app.post('/basket', );

app.put('/basket', );

app.delete('/basket', );

// !!! //////////////////////////////////////////////////////////////
// !!! CERAMICS /////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

app.get('/basket', );

app.post('/basket', );

app.put('/basket', );

app.delete('/basket', );

// !!! //////////////////////////////////////////////////////////////
// !!! DATABASE CONNECTION //////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

MongoClient.connect(MONGO, (err, database) => {
  DB = database;
  app.listen(PORT, function() { console.log(`localhost:${PORT}`) });
});
