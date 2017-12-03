const DB = () => require('./server-offline.js').DB;
const helpers = {
  basket: {},
  ceramic: {},
  accessory: {},
}

// !!! //////////////////////////////////////////////////////////////
// !!! BASKETS //////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

helpers.basket.get = (req, res) => {
  DB().collection('baskets').find().toArray(function(err, results) {
    results.sort(function(a, b) {
      return a.year - b.year;
    });
    res.send(results);
  });
};

helpers.basket.post = (req, res) => {
  const basket = prepareBasketInformation(req.body);
  DB().collection('baskets').save(basket, (err, result) => {
    if (err) return console.error(err);
    console.log('Basket saved to database!');
    res.redirect('/');
  })
};

helpers.basket.put = (req, res) => {
  const basket = prepareBasketInformation(req.body.data);
  if (req.body.password === process.env.SECRET) {
    DB().collection('baskets').replaceOne({ _id: ObjectId(req.body.id) }, basket, (err, result) => {
      if (err) return console.error(err);
      console.log(`Basket ${req.body.id} update in database!`);
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(401);
  }
};

helpers.basket.delete = (req, res) => {
  if (req.body.password === process.env.SECRET) {
    DB().collection('baskets').deleteOne({ _id: ObjectId(req.body.id) }, (err, result) => {
      if (err) return console.error(err);
      console.log(`Basket ${req.body.id} deleted from database!`);
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(401);
  }
};

// !!! //////////////////////////////////////////////////////////////
// !!! CERAMICS /////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

helpers.ceramic.get = (req, res) => {
  DB().collection('ceramics').find().toArray(function(err, results) {
    results.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
    res.send(results);
  });
};

helpers.ceramic.post = (req, res) => {
  const ceramic = prepareCeramicInformation(req.body);
  DB().collection('ceramics').save(ceramic, (err, result) => {
    if (err) return console.error(err);
    console.log('Ceramic saved to database!');
    res.redirect('/');
  })
};

helpers.ceramic.put = (req, res) => {
  const ceramic = prepareCeramicInformation(req.body.data);
  if (req.body.password === process.env.SECRET) {
    DB().collection('ceramics').replaceOne({ _id: ObjectId(req.body.id) }, ceramic, (err, result) => {
      if (err) return console.error(err);
      console.log(`Ceramic ${req.body.id} update in database!`);
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(401);
  }
};

// !!! //////////////////////////////////////////////////////////////
// !!! CERAMICS /////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////


// !!! //////////////////////////////////////////////////////////////
// !!! EXPORTS //////////////////////////////////////////////////////
// !!! //////////////////////////////////////////////////////////////

module.exports = helpers;

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