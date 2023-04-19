const { validationResult, check } = require('express-validator');

const HttpError = require('../models/httpError');
const Product = require('../models/productRelated/product');
const { uploadImage, deleteImage } = require('../middleware/imageHandler');

// Creates new product with optional welding specifications
const createProduct = async (req, res, next) => {
  const { name, description, price, images, quantity, weldingSpecs } = req.body;

  const createdProduct = new Product({
    name,
    description,
    price,
    images,
    quantity,
  });

  let existingProduct;
  try {
    existingProduct = await Product.findOne({ name: name });
  } catch (err) {
    const error = new HttpError(
      'Searching for existing product names failed. Try again later.',
      500
    );
    return next(error);
  }

  if (existingProduct) {
    const error = new HttpError(
      'Product name exists already, please use another name.',
      422
    );
    return next(error);
  }

  if (weldingSpecs) {
    createdProduct.weldingSpecs = weldingSpecs;

    let existingModel;
    try {
      existingModel = await Product.findOne({
        'weldingSpecs.model': weldingSpecs.model,
      });
    } catch (err) {
      const error = new HttpError(
        'Searching for existing models failed. Try again later.',
        500
      );
      return next(error);
    }

    if (existingModel) {
      const error = new HttpError(
        'Model exists already, please use another model.',
        422
      );
      return next(error);
    }
  }

  try {
    await createdProduct.save();
  } catch (err) {
    // Check if the error was due to the 'weldingSpecs' field being required
    if (err.errors && err.errors['weldingSpecs']) {
      const error = new HttpError(
        'Welding specs are required for this product.',
        422
      );
      return next(error);
    }

    const error = new HttpError(
      'Creating product failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ product: createdProduct.toObject({ getters: true }) });
}

// Gets all products
const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    const error = new HttpError(
      'Fetching products failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
}

// Gets multiple products with similar names
const getProductsByName = async (req, res, next) => {
  const productName = req.params.name;

  let products;
  try {
    const regex = new RegExp(productName, 'i'); // "i" flag makes the search case-insensitive
    products = await Product.find({ name: regex });
  } catch (err) {
    const error = new HttpError(
      'Fetching products failed, please try again later.',
      500
    );
    return next(error);
  }

  if (products.length === 0) {
    const error = new HttpError(
      'Could not find products with the given name.',
      404
    );
    return next(error);
  }

  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
}

// Gets a specific product
const getProduct = async (req, res, next) => {
  const productName = req.params.name;

  let product;
  try {
    product = await Product.findOne({ name: productName });
  } catch (err) {
    const error = new HttpError(
      'Fetching product failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError(
      'Could not find product with the given name.',
      404
    );
    return next(error);
  }

  res.json({ product: product.toObject({ getters: true }) });
}

// Updates a product
const updateProduct = async (req, res, next) => {
  const productName = req.params.name;
  const { name, description, price, images, quantity, weldingSpecs } = req.body;



  let product;
  try {
    product = await Product.findOne({ name: productName });
  } catch (err) {
    const error = new HttpError(
      'Updating product failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError(
      'Could not find product with the given name.',
      404
    );
    return next(error);
  }

  name ? (product.name = name) : null;
  description ? (product.description = description) : null;
  price ? (product.price = price) : null;
  images ? (product.image = images) : null;
  quantity ? (product.quantity = quantity) : null;
  weldingSpecs ? (product.weldingSpecs = weldingSpecs) : null;

  try {
    await product.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update product.',
      500
    );
    return next(error);
  }

  res.status(200).json({ product: product.toObject({ getters: true }) });
}

// Deletes a product
const deleteProduct = async (req, res, next) => {
  const productName = req.params.name;

  let product;
  try {
    product = await Product.findOne({ name: productName });
  } catch (err) {
    const error = new HttpError(
      'Deleting product failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError(
      'Could not find product with the given name.',
      404
    );
    return next(error);
  }

  try {
    await product.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete product.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted product.' });
}

module.exports = {
  createProduct,
  getProducts,
  getProductsByName,
  getProduct,
  updateProduct,
  deleteProduct,
};
