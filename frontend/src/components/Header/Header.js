import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Avatar } from '@material-ui/core';
import { Drawer } from 'antd';

import Search from '../Search/Search';
import { logout } from '../../redux/actions/authActions';
import { getMyDetails } from '../../redux/actions/userActions';
import { userImageUrl } from '../../urlConfig';
import DrawerList from './DrawerList';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#2874f0',
    fontWeight: '200',
    fontSize: '1.1rem',
  },
  btn: {
    marginRight: '2rem',
  },
}));

const Header = () => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { userInfoDetails, loading } = userDetails;

  useEffect(() => {
    if (!userInfoDetails && userInfo) {
      dispatch(getMyDetails(userInfo.user._id));
    }
  }, [dispatch, userInfoDetails, userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const showProfile = () => {
    if (userInfo) {
      return (
        <LinkContainer
          to="/profile"
          style={{ cursor: 'pointer' }}
          onClick={() => setVisible(false)}
        >
          {userInfoDetails && (
            <div>
              <Avatar
                alt="image"
                src={userImageUrl(userInfoDetails.photo)}
                style={{
                  height: '50px',
                  width: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '40%',
                }}
              />
              <p
                style={{
                  textAlign: 'center',
                  margin: 'auto',
                }}
              >
                {userInfoDetails.name}
              </p>
            </div>
          )}
        </LinkContainer>
      );
    }
  };

  return (
    <>
      <Navbar className={classes.root} variant="dark" expand="lg" sticky="top">
        <Container>
          <>
            <div className={classes.btn} onClick={() => setVisible(true)}>
              <span class="navbar-toggler-icon"></span>
            </div>

            <Drawer
              style={{ zIndex: '123123213' }}
              title={showProfile()}
              placement="left"
              closable={false}
              onClose={() => setVisible(false)}
              visible={visible}
            >
              <DrawerList />
            </Drawer>
          </>
          <LinkContainer to="/">
            <Navbar.Brand>Shop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Search />

            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i class="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.user.name} id="firstname">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  {userInfo.user.role === 'user' && (
                    <LinkContainer to="/orders">
                      <NavDropdown.Item>My Orders</NavDropdown.Item>
                    </LinkContainer>
                  )}

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo &&
                (userInfo.user.role === 'admin' ||
                  userInfo.user.role === 'seller') && (
                  <LinkContainer to="/dashboard">
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
