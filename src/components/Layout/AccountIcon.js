import React from 'react';
import { Button, MenuItem, Menu } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

const AccountIcon = ({ history }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        edge="end"
        // aria-label="account of current user"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        // anchorOrigin={{
        //   vertical: 'top',
        //   horizontal: 'right',
        // }}
        keepMounted
        // transformOrigin={{
        //   vertical: 'top',
        //   horizontal: 'right',
        // }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default AccountIcon;
