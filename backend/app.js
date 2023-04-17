const express = require('express');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('dotenv').config({ path: './local.env' });

const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const addressesRoutes = require('./routes/addressesRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const imageRoutes = require('./routes/tempImageRoutes');
const HttpError = require('./models/httpError');

const app = express();

// Certificates that are required for HTTPS
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

// Add middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

// Add API endpoints
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/addresses', addressesRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/imageHandler', imageRoutes);

// Error handler for routes that don't exist
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

// Error handler for when something goes wrong with a route
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// Connects node.js to mongodb server
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    https.createServer(options, app).listen(5000);
  })
  .catch(err => {
    console.log(err);
  });