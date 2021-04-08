const Carousel = require('../models/carouselModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createCarousel = catchAsync(async (req, res, next) => {
  const image = req.file.filename;
  // console.log(req.file);
  const carousel = await Carousel.create({ ...req.body, image });

  res.status(201).json(carousel);
});

exports.carouselList = catchAsync(async (req, res, next) => {
  const list = await Carousel.find().sort({ createdAt: -1 }).limit(5);

  res.status(200).json(list);
});

exports.carouselByID = catchAsync(async (req, res, next) => {
  const carousel = await Carousel.findById(req.params.id);

  if (!carousel) {
    return next(
      new AppError(`Carousel with that ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json(carousel);
});

exports.updateCarousel = catchAsync(async (req, res, next) => {
  Carousel.findById(req.params.id).then((item) => {
    item.name = req.body.name;
    item.image = req.file.filename;

    item
      .save()
      .then((data) => res.status(201).json(data))
      .catch((err) =>
        next(new AppError(`Carousel with that ${req.params.id} not found`, 404))
      );
  });
});

exports.deleteCarousel = catchAsync(async (req, res, next) => {
  const deleteData = await Carousel.findByIdAndDelete(req.params.id);

  if (!deleteData) {
    return next(new AppError('No carousel found with that ID', 404));
  }

  res.status(204).json({
    data: null,
  });
});
