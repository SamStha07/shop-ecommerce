const express = require('express');

const Category = require('../models/categoryModel');
const Subcategory = require('../models/subCategoryModel');
const Childcategory = require('../models/childCategoryModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Category
exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({ category });
});

exports.categoryList = catchAsync(async (req, res, next) => {
  const categoriesList = await Category.find();

  res.status(200).json({ categoriesList });
});

//Sub-category
exports.createSubCategory = catchAsync(async (req, res, next) => {
  const subCategory = await Subcategory.create(req.body);

  res.status(201).json({ subCategory });
});

exports.subCategoryList = catchAsync(async (req, res, next) => {
  const subCategoriesList = await Subcategory.find();

  res.status(200).json({ subCategoriesList });
});

//Child-category
exports.createChildCategory = catchAsync(async (req, res, next) => {
  const childCategory = await Childcategory.create(req.body);

  res.status(201).json({ childCategory });
});

exports.childCategoryList = catchAsync(async (req, res, next) => {
  const childCategoriesList = await Childcategory.find();

  res.status(200).json({ childCategoriesList });
});
