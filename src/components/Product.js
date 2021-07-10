import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core';

import Rating from './Rating';
import { productsImagesUrl } from '../urlConfig';

const useStyle = makeStyles((theme) => ({
  root: {
    // [theme.breakpoints.down('lg' || 'md' || 'sm')]: {

    // },
    margin: '0 .2rem 1.5rem .2rem',
  },
  image: {
    height: '10rem',
    width: '80%',
    display: 'flex',
    objectFit: 'contain',
    alignItems: 'center',
    margin: 'auto',
    marginTop: '1rem',
    [theme.breakpoints.down('sm' || 'xs')]: {
      height: '8rem',
      width: '4rem',
    },
  },
  name: {
    display: 'block',
    maxWidth: '250px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: 'black',
  },
}));

const Product = ({ product }) => {
  const classes = useStyle();
  return (
    <Card className={classes.root}>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={productsImagesUrl(product.images[0].img)}
          className={classes.image}
          variant='top'
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong className={classes.name}>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={` ${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3' style={{ marginTop: '1rem' }}>
          Rs.{product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
