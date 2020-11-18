const mongoose = require('mongoose');

const childCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a category name'],
    trim: true,
    unique: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
  subCategoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: [true, 'Sub-category is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

childCategorySchema.pre('save', function (next) {
  this.name = this.name.toLowerCase();
  next();
});

module.exports = mongoose.model('ChildCategory', childCategorySchema);
