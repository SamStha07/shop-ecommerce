import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
  const userAuthData = useSelector((state) => state.userLogin);
  const { userInfo } = userAuthData;

  const access = (props) => {
    switch (userInfo.user.role) {
      case 'admin':
        return <Component {...props} />;
      case 'seller':
        return <Component {...props} />;
      default:
        return <Redirect to="/" />;
    }
  };

  return (
    <Route
      {...rest}
      render={(props) => (!userInfo ? <Redirect to="/login" /> : access(props))}
    />
  );
};

export default AdminRoute;
