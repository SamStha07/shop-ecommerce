import React from 'react';
import { Carousel } from 'antd';
import { Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core';
import List from '../CategoriesList';

import Slider from 'react-slick';
import './productCarosel.css';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '300px',
    width: '100%',
    lineHeight: '160px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      height: '250px',
    },
    [theme.breakpoints.down('sm')]: {
      height: '180px',
    },
    [theme.breakpoints.down('xs')]: {
      height: '130px',
    },
  },
}));

const ProductCarousel = () => {
  const classes = useStyles();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <List />
        </Col>
        <Col md={9}>
          <Slider {...settings}>
            <div>
              <img
                className={classes.root}
                src='https://images.unsplash.com/photo-1558716378-95ab2d0c7af4?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fHJuU0tESHd3WVVrfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                alt='img2'
              />
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <img
                className={classes.root}
                src='https://images.unsplash.com/photo-1558716378-95ab2d0c7af4?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fHJuU0tESHd3WVVrfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                alt='img2'
              />
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
        </Col>
      </Row>
    </>
  );
};

export default ProductCarousel;
