import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import CheckoutSteps from '../components/CheckoutSteps';
import { productsImagesUrl } from '../urlConfig';
import { createOrder } from '../redux/actions/orderActions';
import ErrorMessage from '../components/Message/errorMessage';

const PlaceOrder = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 10000 ? 0 : 100);

  cart.taxPrice = addDecimals(Number((0.13 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  );

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    console.log(cart.cartItems);
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      {error && (
        <ErrorMessage
          header='Error'
          message={error}
          // reset={ORDER_CREATE_RESET}
        />
      )}
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h5>Shipping</h5>
              <p>
                <strong
                  style={{ fontSize: '1rem', textTransform: 'capitalize' }}
                >
                  Address: {cart.shippingAddress.addressName},{' '}
                  {cart.shippingAddress.city}, {cart.shippingAddress.region}
                </strong>
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>Payment Method</h5>
              <strong style={{ fontSize: '1rem', textTransform: 'capitalize' }}>
                Method: {cart.paymentMethod}
              </strong>
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>Order Items</h5>
              {cart.cartItems.length === 0 ? (
                <h1>Your cart is empty</h1>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
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
                  <Col>Rs.{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Rs.{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax(13% VAT)</Col>
                  <Col>Rs.{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs.{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block btn-sm'
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
