const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const {
  createCarousel,
  carouselList,
  updateCarousel,
  deleteCarousel,
  carouselByID,
} = require('../controllers/carouselController');

const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadCarousel = upload.single('image');

const resizePhoto = (req, res, next) => {
  // console.log(req.file);
  if (!req.file) {
    return next();
  }

  const name = req.file.originalname.split('.')[0];
  req.file.filename = `${name}-${Date.now()}.jpeg`;

  // size - square
  sharp(req.file.buffer)
    .resize(800, 300)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/carousel/${req.file.filename}`);

  next();
};

router.post(
  '/create',
  protect,
  uploadCarousel,
  resizePhoto,
  restrictTo('admin', 'seller'),
  createCarousel
);
router.get('/list', carouselList);

router.delete('/:id', protect, restrictTo('admin', 'seller'), deleteCarousel);
router.put(
  '/:id',
  protect,
  uploadCarousel,
  resizePhoto,
  restrictTo('admin', 'seller'),
  updateCarousel
);
router.get('/:id', protect, restrictTo('admin', 'seller'), carouselByID);

module.exports = router;
