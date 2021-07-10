import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, makeStyles, Icon } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import TableProducts from './AllProductsTable';
import SuccessMessage from '../../../components/Message/successMessage';
import {
  CREATE_PRODUCT_RESET,
  DELETE_PRODUCT_RESET,
  EDIT_PRODUCT_RESET,
} from '../../../redux/constants/productConstants';
import { getAllProductsList } from '../../../redux/actions/productActions';

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

  const dispatch = useDispatch();

  const create = useSelector((state) => state.createProduct);
  const { success: successCreate } = create;

  const editProduct = useSelector((state) => state.editProduct);
  const { success: editSuccess } = editProduct;

  const deleteProd = useSelector((state) => state.deleteProduct);
  const { success: deleteSuccess, error: deleteError } = deleteProd;

  useEffect(() => {
    dispatch(getAllProductsList());
  }, [dispatch, deleteSuccess]);

  return (
    <>
      <h5>All Products</h5>

      {successCreate && (
        <SuccessMessage
          header='Success'
          message='Product Added'
          reset={CREATE_PRODUCT_RESET}
        />
      )}
      {editSuccess && (
        <SuccessMessage
          header='Success'
          message='Product Updated'
          reset={EDIT_PRODUCT_RESET}
        />
      )}
      {deleteSuccess && (
        <SuccessMessage
          header='Success'
          message='Product Deleted'
          reset={DELETE_PRODUCT_RESET}
        />
      )}

      {deleteError && (
        <SuccessMessage
          header='Error'
          message={deleteError}
          reset={DELETE_PRODUCT_RESET}
        />
      )}

      <div className='m-auto'>
        <LinkContainer to='/dashboard/product/create'>
          <Button className={classes.button}>
            <Icon
              style={{ fontSize: '13px', marginLeft: '2px' }}
              className='fa fa-plus'
            ></Icon>
            Create
          </Button>
        </LinkContainer>
      </div>

      <div>
        <TableProducts />
      </div>
    </>
  );
};

export default AllProducts;
