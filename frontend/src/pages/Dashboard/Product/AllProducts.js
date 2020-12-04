import { Button, makeStyles, Icon } from '@material-ui/core';
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

const useStyles = makeStyles({
  button: {
    marginLeft: '90%',
    border: 'none',
    outline: 'none',
    '&:hover': {
      color: 'black',
    },
  },
});

const AllProducts = () => {
  const classes = useStyles();
  return (
    <>
      <h5>All Products</h5>

      <div className="m-auto">
        <LinkContainer to="/dashboard/product/create">
          <Button className={classes.button}>
            <Icon
              style={{ fontSize: '13px', marginLeft: '2px' }}
              className="fa fa-plus"
            ></Icon>
            Create
          </Button>
        </LinkContainer>
      </div>
    </>
  );
};

export default AllProducts;
