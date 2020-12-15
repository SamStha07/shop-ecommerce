import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core';

import { getProductByID } from '../redux/actions/productActions';
import { productsImagesUrl } from '../urlConfig';

const useStyles = makeStyles((theme) => ({
  mainImage: {
    width: '100%',
    height: '12rem',
    marginTop: '2rem',
    objectFit: 'contain',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '10rem',
      margin: '2rem 0 0 2rem',
      objectFit: 'contain',
      overflow: 'hidden',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '8rem',
      marginLeft: '10px',
      objectFit: 'contain',
      overflow: 'hidden',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '8rem',
      marginLeft: '10px',
      objectFit: 'contain',
      overflow: 'hidden',
    },
  },
  listImages: {
    width: '3rem',
    height: '3rem',
    display: 'table-cell',
    objectFit: 'contain',
    margin: '0 0 1rem 0',
    [theme.breakpoints.down('sm')]: {
      width: '2rem',
      height: '2rem',
    },
  },
}));

const ProductDetails = ({ match }) => {
  const [image, setImage] = useState('');
  const [show, setShow] = useState('false');
  const dispatch = useDispatch();
  const classes = useStyles();

  const id = match.params.id;

  const details = useSelector((state) => state.getProductByID);
  const { loading, productID } = details;

  useEffect(() => {
    if (!productID) {
      dispatch(getProductByID(id));
    } else {
      if (productID._id !== id) {
        dispatch(getProductByID(id));
      }
      const img = productID.images[0].img;
      // console.log(img);
      setImage(img);
    }
  }, [dispatch, productID, id]);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {productID && (
            <Row style={{ marginTop: '1rem' }}>
              <Col md={1} sm={2} xs={2}>
                {productID.images.map((img) => (
                  <img
                    onClick={() => {
                      setImage(img.img);
                      // console.log(img.img);
                    }}
                    className={classes.listImages}
                    src={productsImagesUrl(img.img)}
                    alt={img.img}
                  />
                ))}
              </Col>

              <Col md={4} sm={10} xs={10}>
                <img
                  className={classes.mainImage}
                  src={productsImagesUrl(image)}
                  alt={image}
                />
              </Col>

              <Col md={7} xs={12}>
                Details
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
