import { CircularProgress } from '@material-ui/core';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { allOrdersList } from '../../../redux/actions/orderActions';

const OrdersList = () => {
  const dispatch = useDispatch();

  const ordersList = useSelector((state) => state.allOrdersList);
  const { loading, error, orders } = ordersList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(allOrdersList());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <h3>Orders</h3>

      {loading ? (
        <div style={{ display: 'flex', marginLeft: '50%' }}>
          <CircularProgress />
        </div>
      ) : (
        <MDBTable btn hover responsive style={{ marginTop: '-10px' }}>
          <MDBTableHead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>Rs.{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
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
          </MDBTableBody>
        </MDBTable>
      )}
    </>
  );
};

export default OrdersList;
