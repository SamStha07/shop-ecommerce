import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from 'mdbreact';
import { LinkContainer } from 'react-router-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { Modal } from 'antd';

import { productsImagesUrl } from '../../../urlConfig';
import { deleteProduct } from '../../../redux/actions/productActions';

const useStyles = makeStyles({
  editBtn: {
    cursor: 'pointer',
    '&:hover': {
      color: 'blue',
    },
    fontSize: '1rem',
    '@media(max-width:850px)': {
      fontSize: '1.5rem',
      marginBottom: '10px',
    },
  },
  deleteBtn: {
    cursor: 'pointer',
    '&:hover': {
      color: 'red',
    },
    marginLeft: '1rem',
    fontSize: '1rem',
    '@media(max-width:850px)': {
      marginLeft: '0px',
      fontSize: '1.5rem',
    },
  },
  image: {
    width: '30px',
    height: '50px',
    padding: '5px',
  },
  description: {
    display: 'block',
    maxWidth: '150px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  name: {
    display: 'block',
    maxWidth: '150px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
});

const AllProductsTable = () => {
  const [visible, setVisible] = useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();

  const list = useSelector((state) => state.getAllProducts);
  const { productsList, loading } = list;

  const allProductsList = () => {
    if (productsList) {
      return productsList.productsList.map((item) => (
        <tr>
          <td>
            <span className={classes.name}>{item.name}</span>
          </td>
          <td>{item.price}</td>
          <td>{item.quantity}</td>
          <td>
            <span className={classes.description}>{item.description}</span>
          </td>
          <td>
            {item.images.map((pic) => (
              <img
                className={classes.image}
                key={pic._id}
                src={productsImagesUrl(pic.img)}
                alt={pic._id}
              />
            ))}
          </td>
          <td>{item.brand.name}</td>
          <td>
            <LinkContainer to={`/dashboard/products/edit/${item._id}`}>
              <MDBIcon icon="edit" className={classes.editBtn} />
            </LinkContainer>
          </td>
          <td>
            <MDBIcon
              icon="trash"
              className={classes.deleteBtn}
              onClick={(e) => setVisible(true)}
            />

            <Modal
              title="Delete Category"
              visible={visible}
              onOk={() => {
                dispatch(deleteProduct(item._id));
                setVisible(false);
              }}
              onCancel={() => setVisible(false)}
            >
              <p>Are you sure? You want to delete {item.name}</p>
            </Modal>
          </td>
        </tr>
      ));
    }
  };

  return (
    <>
      <MDBTable btn hover responsive>
        <MDBTableHead>
          <tr>
            <th>Name</th>

            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Pictures</th>
            <th>Brand</th>
          </tr>
        </MDBTableHead>
        {loading ? (
          <div
            style={{
              position: 'absolute',
              margin: '0 auto',
              top: '50%',
              left: '50%',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <MDBTableBody>{allProductsList()}</MDBTableBody>
        )}
      </MDBTable>
    </>
  );
};

export default AllProductsTable;
