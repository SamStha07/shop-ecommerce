const express = require('express');
const Order = require('../models/orderModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addOrderItems = catchAsync(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return next(new AppError('No order items', 400));
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

exports.getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.status(200).json(order);
  } else {
    return next(new AppError('Order not found', 404));
  }
});

// Update order to paid
exports.updateOrderToPaid = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // this paymentResult response will from PayPal
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_item,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    return next(new AppError('Order not found', 404));
  }
});

// Get logged in user orders
// /api.orders/myorders
exports.getMyOrders = catchAsync(async (req, res, next) => {
  // console.log(req.user._id);
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json(orders);
});

// Admin
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find().populate('user', 'id name');

  res.status(200).json(orders);
});

// Admin updates from not deliverd to delivered
exports.updateOrderToDelivered = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    return next(new AppError('Order not found', 404));
  }
});
