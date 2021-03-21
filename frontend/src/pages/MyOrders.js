import React, { useEffect } from 'react';
import { Button, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { listMyOrders } from '../redux/actions/orderActions';

const Order = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading, error, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(listMyOrders());
    }
  }, [dispatch, userInfo, history]);

  return (
    <Col md={12}>
      <h3>My Orders</h3>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          {orders && orders.length === 0 ? (
            <div style={{}}>
              Your Orders are currently empty. Please buy some products inorder
              to see your orders.
            </div>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>Rs.{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          />
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          />
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant='dark' className='btn-sm'>
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </Col>
  );
};

export default Order;
