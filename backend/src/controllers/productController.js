const Category = require('../models/childCategoryModel');
const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createProduct = catchAsync(async (req, res, next) => {
  const createdBy = req.user.id;
  const product = await await Product.create({ ...req.body, createdBy });

  res.status(201).json({ product });
});

exports.productList = catchAsync(async (req, res, next) => {
  const productsList = await Product.find()
    .populate('category')
    .populate('subCategory')
    .populate('brand');

  res.status(200).json({ length: productsList.length, productsList });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const editProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!editProduct) {
    return next(
      new AppError(`Product with that ${req.params.id} not found`, 404),
    );
  }

  res.status(201).json({
    status: 'success',
    editProduct,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getProductByID = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate('category')
    .populate('subCategory')
    .populate('brand');

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({ product });
});
