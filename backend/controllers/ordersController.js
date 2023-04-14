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