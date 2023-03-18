const express = require('express');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config({ path: './local.env' });

const usersRoutes = require('./routes/users-routes');
const productsRoutes = require('./routes/products-routes.js');
const addressesRoutes = require('./routes/addresses-routes');
const HttpError = require('./models/http-error');

const app = express();

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

app.use(bodyParser.json());

app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/addresses', addressesRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    https.createServer(options, app).listen(5000);
  })
  .catch(err => {
    console.log(err);
  });