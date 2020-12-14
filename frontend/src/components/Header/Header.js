import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Avatar } from '@material-ui/core';
import { Drawer, Menu, Spin } from 'antd';

import Search from '../Search/Search';
import { logout } from '../../redux/actions/authActions';
import { getAllCategories } from '../../redux/actions/categoryActions';
import { getSubCatUnderMainCatID } from '../../redux/actions/subCategoryActions';
import { getChildCatUnderSubCatID } from '../../redux/actions/childCategoryActions';
import { userImageUrl } from '../../urlConfig';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#2874f0',
    fontWeight: '200',
    fontSize: '1.1rem',
  },
  btn: {
    marginRight: '2rem',
  },
  spinner: {
    textAlign: 'center',
    borderRadius: '4px',
    marginBottom: '20px',
    padding: '30px 50px',
    margin: '20px 0',
  },
}));

const Header = () => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  const { SubMenu } = Menu;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categorylist = useSelector((state) => state.getAllCategory);
  const { category: allCategories } = categorylist;

  const subCatwithMainCat = useSelector(
    (state) => state.getSubCatWithCategoryID,
  );
  const {
    subCategory: subCategoryList,
    loading: loadingSubCat,
  } = subCatwithMainCat;

  const childCatWithSubCat = useSelector(
    (state) => state.getChildCatWithSubCategoryID,
  );
  const {
    childCategory: childCategoryList,
    loading: loadingChildCat,
  } = childCatWithSubCat;
  console.log(childCategoryList);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleClick = (e) => {
    console.log('click ', e);
  };

  const showProfile = () => {
    if (userInfo) {
      return (
        <LinkContainer
          to="/profile"
          style={{ cursor: 'pointer' }}
          onClick={() => setVisible(false)}
        >
          <div>
            <Avatar
              alt="image"
              src={userImageUrl(userInfo.user.photo)}
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
              {userInfo.user.name}
            </p>
          </div>
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
              <Menu
                onClick={handleClick}
                style={{
                  width: 230,
                  marginLeft: '-12px',
                  fontWeight: 'normal',
                }}
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
              >
                {allCategories &&
                  allCategories.map((cat) => (
                    <SubMenu
                      key={cat._id}
                      title={cat.name}
                      onTitleClick={() =>
                        dispatch(getSubCatUnderMainCatID(cat._id))
                      }
                    >
                      {loadingSubCat ? (
                        <div className={classes.spinner}>
                          <Spin />
                        </div>
                      ) : (
                        <>
                          {subCategoryList &&
                            subCategoryList.subCategory.map((subCat) => (
                              <SubMenu
                                key={subCat._id}
                                title={subCat.name}
                                onTitleClick={() =>
                                  dispatch(getChildCatUnderSubCatID(subCat._id))
                                }
                              >
                                {loadingChildCat ? (
                                  <diV className={classes.spinner}>
                                    <Spin />
                                  </diV>
                                ) : (
                                  <>
                                    {childCategoryList &&
                                      childCategoryList.childCategory.map(
                                        (childCat) => (
                                          <Menu.Item key={childCat._id}>
                                            {childCat.name}
                                          </Menu.Item>
                                        ),
                                      )}
                                  </>
                                )}
                              </SubMenu>
                            ))}
                        </>
                      )}
                    </SubMenu>
                  ))}
              </Menu>
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
