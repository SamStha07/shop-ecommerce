const express = require('express');
const {
  signup,
  login,
  logout,
  updatePassword,
  registerUser,
  userList,
} = require('../controllers/authController');
const { forgotPassword } = require('../controllers/passwordReset');
const {
  deleteMe,
  getMe,
  updateMe,
  uploadUserPhoto,
  resizeUserPhoto,
  deleteUserByAdmin,
  updateUserByAdmin,
  getUserByID,
} = require('../controllers/userController');
const { protect, restrictTo } = require('../middlewares/auth');
const {
  deleteOneUser,
  updateOneUser,
  getAllUsers,
  createUser,
} = require('../controllers/adminController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/registernewuser', registerUser);

// Password Reset - Not working
router.post('/forgot-password', forgotPassword);

// Admin
router.route('/').get(protect, restrictTo('admin'), getAllUsers);
router
  .route('/:id')
  .delete(protect, restrictTo('admin'), deleteOneUser)
  .patch(protect, restrictTo('admin'), updateOneUser);
router.post('/createUser', protect, restrictTo('admin'), createUser);

// Active users can only access this route
router.get('/me/:id', protect, getMe);
router.delete('/deleteMe', protect, deleteMe);
router.put('/update', protect, updateMe);
router.put('/updateMyPassword', protect, updatePassword);

router.get('/list', protect, restrictTo('admin'), userList);
router.delete('/:id', protect, restrictTo('admin'), deleteUserByAdmin);
router.patch('/:id', protect, restrictTo('admin'), updateUserByAdmin);
router.get('/:id', protect, getUserByID);

module.exports = router;
