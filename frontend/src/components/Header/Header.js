import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { Badge } from 'antd';

import Search from '../Search/Search';
import { logout } from '../../redux/actions/authActions';
import { getMyDetails } from '../../redux/actions/userActions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#2874f0',
    fontWeight: '200',
    fontSize: '1.1rem',
  },
  btn: {
    marginRight: '2rem',
  },
  cartItems: {
    background: 'red',
    color: '#fff',
    fontSize: '0.8rem',
    position: 'absolute',
    width: '18px',
    height: '18px',
    top: '-9px',
    right: '29px',
    padding: '0 5px',
    borderRadius: '50%',
    fontWeight: '500',
    [theme.breakpoints.down('sm')]: {
      right: '97%',
    },
    [theme.breakpoints.down('xs')]: {
      right: '93%',
    },
  },
}));

const Header = ({ history }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { userInfoDetails } = userDetails;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (!userInfoDetails && userInfo) {
      dispatch(getMyDetails(userInfo.user._id));
    }
  }, [dispatch, userInfoDetails, userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar className={classes.root} variant='dark' expand='lg' sticky='top'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Shop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <Search history={history} />} />

            <Nav className='ml-auto '>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <div className='d-flex'>
                    <div className='mr-1'>
                      <Badge
                        offset={[0, -6]}
                        size={'small'}
                        count={cartItems && cartItems.length}
                      >
                        <i className='fas fa-shopping-cart'></i>
                      </Badge>
                    </div>{' '}
                    Cart
                  </div>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.user.name} id='firstname'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  {userInfo.user.role === 'user' && (
                    <LinkContainer to='/myorders'>
                      <NavDropdown.Item>My Orders</NavDropdown.Item>
                    </LinkContainer>
                  )}

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo &&
                (userInfo.user.role === 'admin' ||
                  userInfo.user.role === 'seller') && (
                  <LinkContainer to='/dashboard'>
                    <Nav.Link>Dashboard</Nav.Link>
                  </LinkContainer>
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
