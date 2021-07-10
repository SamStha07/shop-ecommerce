import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import KhaltiCheckout from 'khalti-checkout-web';

import { productsImagesUrl } from '../urlConfig';
import ErrorMessage from '../components/Message/errorMessage';

import {
  getOrderDetails,
  payOrder,
  orderDeliver,
  payOrderFromKhalti,
} from '../redux/actions/orderActions';
import Message from '../components/Message/Message';
import axiosInstance from '../helpers/axios';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../redux/constants/orderConstants';
import Invoice from '../components/Order/Invoice';

const OrderPage = ({ match, history }) => {
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderId = match.params.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const deliverOrder = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = deliverOrder;

  if (!loading) {
    // Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axiosInstance.get('/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        // order.isPaid = true;
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver, userInfo, history]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverdHandler = () => {
    dispatch(orderDeliver(order));
  };

  // Khalti
  let config = {
    // replace this key with yours
    publicKey: 'test_public_key_11bb1a30e4b145b7a2b389b96a61c371',
    amount: '5000',
    productIdentity: `${orderId}`,
    productName: 'ecommerce',
    productUrl: `http://localhost:3000/product/5fd663a869e6f11b94df0482`,
    eventHandler: {
      async onSuccess(payload) {
        // hit merchant api for initiating verfication
        // console.log(payload);
        // dispatch(payOrder(orderId, payload));
        const { token, amount } = payload;
        const data = { token, amount };
        // console.log(data);

        dispatch(payOrderFromKhalti(orderId, data));

        // await axiosInstance.post(`/config/khalti/${orderId}/pay`, data);
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error.message);
      },
      onClose() {
        console.log('widget is closing');
      },
    },
    paymentPreference: ['KHALTI'],
  };

  const payWithKhalti = () => {
    let checkout = new KhaltiCheckout(config);
    const totalAmount = order.totalPrice * 100;
    const mobileNumber = order.shippingAddress && order.shippingAddress.mobile;
    checkout.show({ amount: totalAmount, mobile: mobileNumber });
  };

  // const MyDocument = (

  // );

  return loading ? (
    <h1>Loading</h1>
  ) : error ? (
    <ErrorMessage header='Error' message={error} />
  ) : (
    <>
      <h4>Order {orderId}</h4>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h5>Shipping</h5>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a
                  style={{ color: 'black' }}
                  href={`mailto:${order.user.email}`}
                >
                  {order.user.email}
                </a>
              </p>
              <p>
                <strong
                  style={{ fontSize: '1rem', textTransform: 'capitalize' }}
                >
                  Address: {order.shippingAddress.addressName},{' '}
                  {order.shippingAddress.city}, {order.shippingAddress.region}
                </strong>
              </p>

              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>Payment Method</h5>

              <p>
                <strong
                  style={{ fontSize: '1rem', textTransform: 'capitalize' }}
                >
                  Method: {order.paymentMethod}
                </strong>
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>Order Items</h5>
              {order.orderItems.length === 0 ? (
                <h1>Your order is empty</h1>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'contain',
                            }}
                            src={productsImagesUrl(item.image)}
                          ></Image>
                        </Col>
                        <Col>
                          <Link
                            style={{
                              color: 'black',
                              textDecoration: 'underline',
                            }}
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} * Rs.{item.price} = Rs.
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h5>Order Summary</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Rs.{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Rs.{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax(13% VAT)</Col>
                  <Col>Rs.{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs.{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <p>Loading</p>}
                  {!sdkReady ? (
                    <p>Loading</p>
                  ) : (
                    <>
                      {/* <Button
                        size='sm'
                        variant='outlined'
                        color='primary'
                        // fullWidth
                        onClick={payWithKhalti}
                      >
                        Khalti
                      </Button> */}
                      {order.paymentMethod !== 'Khalti' ? (
                        <Button
                          size='sm'
                          variant='outlined'
                          color='primary'
                          // fullWidth
                          onClick={payWithKhalti}
                        >
                          Khalti
                        </Button>
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </>
                  )}
                </ListGroup.Item>
              )}

              {order.isPaid && (
                <PDFDownloadLink
                  document={<Invoice order={order} />}
                  fileName='invoice.pdf'
                  className='btn btn-sm'
                >
                  Download PDF
                </PDFDownloadLink>
              )}

              {loadingDeliver && <h1>Loading</h1>}

              {userInfo &&
                userInfo.user.role === 'admin' &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block btn-sm'
                      onClick={deliverdHandler}
                    >
                      Mark as delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
