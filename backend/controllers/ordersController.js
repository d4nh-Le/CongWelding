const HttpError = require('../models/httpError');
const Order = require('../models/order');

// Creates new order
const createOrder = async (req, res, next) => {
    const { orderNumber, shippingAddress, billingAddress } = req.body;

    const createdOrder = new Order({
        orderNumber,
        orderDate,
        orderStatus,
        shippingAddress,
        billingAddress,
        subtotal,
        tax,
        total,
        items
    });

    let existingOrder;
    try {
        existingOrder = await Order.findOne({orderNumber: orderNumber });
    } catch (err) {
        const error = new HttpError(
            'Searching for existing order number failed. Try again later.',
            500
        );
        return next(error);
    }

    if (existingOrder) {
        const error = new HttpError(
            'Failed to generate unique order number.',
            500
        );
        return next(error);
    }

    try {
        await createdOrder.save();
    } catch (err) {
        const error = new HttpError(
            'Creatingt order failed, please try again.',
            500
        );
    }

    res.status(201).json({ order: createdOrder.toObject({ getters: true }) });
}

// Gets all orders
const getOrders = async (req, res, next) => {
    let orders;
    try {
        orders = await Order.find();
    } catch (err) {
        const error = new HttpError(
            'Fetching orders failed, pelase try again later.',
            500
        );
        return next(error);
    }

    res.json({
        orders: orders.map((order) => order.toObject({ getters: true})),
    });
}

// Get specific order by orderNumber
const getOrderByNumber = async (req, res, next) => {

}

// Get all orders for specific user
const getOrdersForUser = async (req, res, next) => {
  const userId = req.userData.userId;

  let orders;
  try {
    orders = await Order.findOne({})
  } catch(err) {
    console.log('Still more work to do.....');
  }

}

// Updates a order by orderNumber
const updateOrder = async (req, res, next) => {
    const orderName = req.params.name;
    const { name, description, price, image, quantity, weldingSpecs } = req.body;
  
    let order;
    try {
      order = await Order.findOne({ name: orderName });
    } catch (err) {
      const error = new HttpError(
        'Updating order failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (!order) {
      const error = new HttpError(
        'Could not find order with the given name.',
        404
      );
      return next(error);
    }
  
    name ? (order.name = name) : null;
    description ? (order.description = description) : null;
    price ? (order.price = price) : null;
    image ? (order.image = image) : null;
    quantity ? (order.quantity = quantity) : null;
    weldingSpecs ? (order.weldingSpecs = weldingSpecs) : null;
  
    try {
      await order.save();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update order.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ order: order.toObject({ getters: true }) });
  }
  
  // Deletes a order
  const deleteOrder = async (req, res, next) => {
    const orderName = req.params.name;
  
    let order;
    try {
      order = await Order.findOne({ name: orderName });
    } catch (err) {
      const error = new HttpError(
        'Deleting order failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (!order) {
      const error = new HttpError(
        'Could not find order with the given name.',
        404
      );
      return next(error);
    }
  
    try {
      await order.remove();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete order.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ message: 'Deleted order.' });
  }
  
  module.exports = {
    createOrder,
    getOrders,
    getOrderByNumber,
    getOrdersForUser,
    updateOrder,
    deleteOrder,
  };
