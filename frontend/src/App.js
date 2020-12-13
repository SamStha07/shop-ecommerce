import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminSellerRoute';
import AdminSellerRoute from './routes/AdminSellerRoute';
import Sidebar from './components/layout/Sidebar';

import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import Order from './pages/Order';
import Header from './components/Header/Header';
import Cart from './pages/Cart';
// import AllCategories from './pages/Dashboard/Category/AllCategories';
import Category from './pages/Dashboard/Category/Category';
import SubCategory from './pages/Dashboard/SubCategory/SubCategory';
import ChildCategory from './pages/Dashboard/ChildCategory/ChildCategory';
import CreateProduct from './pages/Dashboard/Product/Create';
import AllProductsList from './pages/Dashboard/Product/AllProducts';
import EditProduct from './pages/Dashboard/Product/EditProduct';
import Home from './pages/Dashboard/Home/Home';
import CreateUser from './pages/Dashboard/Users/CreateUser';
import AllUsers from './pages/Dashboard/Users/AllUsers';
// import Main from './components/Dashboard/Main';

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <BrowserRouter>
      {userInfo &&
      (userInfo.user.role === 'admin' || userInfo.user.role === 'seller') ? (
        <Sidebar>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route exact path="/dashboard" component={Home} />
            <Route
              exact
              path="/dashboard/category/create"
              component={Category}
            />
            <Route
              exact
              path="/dashboard/subcategory/create"
              component={SubCategory}
            />
            <Route
              exact
              path="/dashboard/childcategory/create"
              component={ChildCategory}
            />
            {/* <Route
                exact
                path="/dashboard/categories"
                component={AllCategories}
              /> */}
            <Route
              exact
              path="/dashboard/product/create"
              component={CreateProduct}
            />
            <Route
              exact
              path="/dashboard/products"
              component={AllProductsList}
            />
            <Route
              exact
              path="/dashboard/products/edit/:id"
              component={EditProduct}
            />
            <Route exact path="/dashboard/user/create" component={CreateUser} />
            <Route exact path="/dashboard/users" component={AllUsers} />
          </Switch>
        </Sidebar>
      ) : (
        <>
          <Header />
          <Container>
            <main className="py-3">
              <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/" exact component={Homepage} />
                <Route path="/cart" exact component={Cart} />

                <PrivateRoute path="/profile" exact component={Profile} />
                <PrivateRoute path="/orders" exact component={Order} />

                <Route render={() => <div>404 Not found</div>} />
              </Switch>
            </main>
          </Container>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
