import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, ListGroup, Row, Image, Form } from 'react-bootstrap';
import { makeStyles, Card, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Modal } from 'antd';

import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import { productsImagesUrl } from '../urlConfig';

const useStyles = makeStyles((theme) => ({
  deleteBtn: {
    '&:hover': {
      color: 'red',
      cursor: 'pointer',
    },
  },
}));

const Cart = ({ match, location, history }) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems && cartItems.length === 0 ? (
          <h1>Your cart is empty</h1>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      style={{
                        display: 'flex',
                        objectFit: 'contain',
                        height: '3rem',
                        width: '100%',
                        justifyContent: 'center',
                      }}
                      src={productsImagesUrl(item.image[0].img)}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>Rs.{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <div className={classes.deleteBtn}>
                      <DeleteIcon onClick={(e) => setVisible(true)} />
                    </div>

                    <Modal
                      title='Delete Product From Cart'
                      visible={visible}
                      onOk={() => {
                        dispatch(removeFromCart(item.product));
                        setVisible(false);
                      }}
                      onCancel={() => setVisible(false)}
                    >
                      <p>Are you sure? You want to delete {item.name}</p>
                    </Modal>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              Rs.
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button onClick={checkoutHandler}>Proceed To Checkout</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
