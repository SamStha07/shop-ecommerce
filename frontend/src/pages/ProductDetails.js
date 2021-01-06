import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { getProductByID } from '../redux/actions/productActions';
import { productsImagesUrl } from '../urlConfig';
import { ProductBreadCrumb } from '../components/Breadcrumb/ProductDetails';
import Rating from '../components/Rating';
import RatingDetails from './Ratings';

const useStyles = makeStyles((theme) => ({
  image: {
    marginTop: '2rem',
    height: '350px',
    [theme.breakpoints.down('md')]: {
      height: '300px',
    },
    [theme.breakpoints.down('sm' || 'xs')]: {
      width: '100%',
      height: '300px',
    },
  },
  mainImage: {
    '& img': {
      display: 'flex',
      objectFit: 'contain',
      height: '30vh',
      textAlign: 'center',
      width: '100%',
      justifyContent: 'center',
      [theme.breakpoints.down('md' || 'sm' || 'xs')]: {
        height: '23vh',
        width: '100%',
      },
    },
  },
  thumbnail: {
    display: 'flex',
    marginTop: '2rem',
    justifyContent: 'center',

    '& img': {
      width: '3rem',
      height: '4rem',
      objectFit: 'contain',
      margin: '0 4px 0 4px',
      '&:hover': {
        border: '2px solid blue',
        cursor: 'pointer',
      },
      [theme.breakpoints.down('md')]: {
        width: '2rem',
        height: '3rem',
        flexWrap: 'wrap',
      },
    },
  },
  details: {
    marginTop: '2rem',
    [theme.breakpoints.down('sm' || 'xs')]: {
      marginTop: '3.5rem',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginTop: '2rem',
    },
    '& h3': {
      fontSize: '1.3rem',
    },
  },
  price: {
    fontSize: '24px',
    margin: '4px 0',
  },
  description: {
    display: 'flex',
    '& h3': {
      fontSize: '1.3rem',
      marginRight: '1.5rem',
    },
    '& p': {
      fontSize: '1rem',
    },
    [theme.breakpoints.down('sm' || 'xs')]: {
      display: 'block',
    },
  },
  status: {
    display: 'flex',
    justifyContent: 'space-between',
    '& h3': {
      paddingRight: '10px',
      fontSize: '1.3rem',
      margin: 'auto',
      [theme.breakpoints.down('xs')]: {
        paddingRight: '5px',
        fontSize: '1rem',
      },
    },
  },

  btn: {
    display: 'flex',
    marginTop: '10px',
    '& Button': {
      width: '50%',
      marginRight: '14px',
      borderRadius: '2px',
    },
    '& Button:hover': {
      opacity: '0.9',
    },
  },
  seller: {
    marginTop: '2rem',
    background: '#fafafa',
    width: '100%',
    padding: '13px 16px 10px',

    '& p': {
      fontSize: '12px',
      color: '#757575',
      margin: '2px 0',
    },
    '& h4': {
      fontSize: '20px',
      color: '#212121',
      margin: '2px 0',
    },
    '& a': {
      width: '100%',
      display: 'flex',
      textDecoration: 'none',
      justifyContent: 'center',
      fontSize: '18px',
    },
    '& a:hover': {
      textDecoration: 'underline solid',
    },
    [theme.breakpoints.down('sm' || 'xs')]: {
      marginTop: '14px',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginTop: '2rem',
    },
  },
}));

const ProductDetails = ({ match, history }) => {
  const [image, setImage] = useState('');
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const classes = useStyles();

  const id = match.params.id;

  const details = useSelector((state) => state.getProductByID);
  const { loading, productID } = details;

  const handleAddToCart = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

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
            <>
              <ProductBreadCrumb product={productID} />

              <Row>
                <Col lg={3} md={3} sm={12} xs={12}>
                  <div className={classes.image}>
                    <div className={classes.mainImage}>
                      <img src={productsImagesUrl(image)} alt={image} />
                    </div>

                    <div className={classes.thumbnail}>
                      {productID.images.map((img) => (
                        <img
                          onClick={() => {
                            setImage(img.img);
                          }}
                          src={productsImagesUrl(img.img)}
                          alt={img.img}
                          key={uuidv4()}
                        />
                      ))}
                    </div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <div className={classes.details}>
                    <h3>{productID.name}</h3>

                    <Rating
                      value={productID.rating}
                      text={` ${productID.numReviews} reviews`}
                    />
                    <hr />
                    <div style={{ display: 'flex' }}>
                      <p className={classes.price}>Rs.{productID.price}</p>
                    </div>
                    <hr />

                    <div className={classes.status}>
                      <div style={{ display: 'flex' }}>
                        <h3>Status:</h3>
                        <h3 style={{ margin: 'auto' }}>
                          {productID.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </h3>
                      </div>

                      <div style={{ display: 'flex' }}>
                        <h3>Quantity:</h3>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(productID.quantity).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </div>
                    </div>

                    <hr />
                    <div className={classes.description}>
                      <h3>Description</h3>
                      <p>{productID.description}</p>
                    </div>

                    <div className={classes.btn}>
                      <Button
                        size={'large'}
                        style={{
                          border: '1px solid #f57224',
                          background: '#f57224',
                          color: '#fff',
                        }}
                        onClick={handleAddToCart}
                      >
                        Add to cart
                      </Button>
                      <Button
                        style={{
                          border: '1px solid #2abbe8',
                          background: '#2abbe8',
                          color: '#fff',
                        }}
                        size={'large'}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </Col>
                <Col lg={3} md={3} sm={12} xs={12}>
                  <div className={classes.seller}>
                    <p>Sold by</p>
                    <h4>{productID.createdBy.name}</h4>

                    <Link to='/store'>GO TO STORE</Link>
                  </div>
                </Col>
              </Row>

              <RatingDetails product={productID} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
