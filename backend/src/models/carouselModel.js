const mongoose = require('mongoose');
const slugify = require('slugify');

const carouselSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add name of the ad'],
    trim: true,
    unique: true,
  },
  image: { type: String },
  slug: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

carouselSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

module.exports = Carousel = mongoose.model('Carousel', carouselSchema);
