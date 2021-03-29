const axios = require('axios');
const express = require('express');
const env = require('dotenv');
const path = require('path');
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const connectDB = require('./config/db');
const GlobalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const userRoute = require('./routes/userRoutes');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoutes');
const userImageUpload = require('./routes/userImageUploadRoute');
const productImageUpload = require('./routes/productUploadRoute');
const orderRoute = require('./routes/orderRoutes');
const Order = require('./models/orderModel');

const app = express();

env.config();

connectDB();

// Set security HTTP headers
app.use(helmet());

// Body parser
app.use(cors());
app.use(express.json());

// connects with frontend

app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

//routes
app.use('/api/users', userRoute);
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);
app.use('/api/upload', userImageUpload);
app.use('/api/multipleuploads', productImageUpload);
app.use('/api/orders', orderRoute);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// khalti payment integration
app.post('/api/config/khalti/:id/pay', async (req, res) => {
  console.log(req.body); // {token, amount}
  const { token, amount } = req.body;
  const data = { token, amount };

  const config = {
    headers: {
      Authorization: 'Key test_secret_key_914edc2e91fe4b85b379153a669c6777',
    },
  };

  await axios
    .post('https://khalti.com/api/v2/payment/verify/', data, config)
    .then(async (response) => {
      // console.log(response.data);
      const order = await Order.findById(req.params.id);

      // console.log(order);

      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: order.id,
          status: 200,
          update_time: Date.now(),
          email_address: response.data.user.email,
        };
      }

      const updatedOrder = await order.save();
      console.log(updatedOrder);
      res.status(200).json(updatedOrder);
    })
    .catch((error) => {
      console.log(error.message);
    });

  // not working
  // await axios
  //   .get('https://khalti.com/api/v2/merchant-transaction/', data, config)
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // await axios
  //   .get('https://khalti.com/api/v2/payment/status/', data, config)
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
});

// to see static files
// http:localhost:5000/img/users/${filename}
// OR http:localhost:5000/img/products/${filename}
app.use(express.static('public'));

// Global error handling Middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(GlobalErrorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port}...`
      .yellow.bold
  );
});
