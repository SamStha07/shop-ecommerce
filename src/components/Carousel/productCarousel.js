import React from 'react';
import { Carousel } from 'antd';
import { Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core';
import List from '../CategoriesList';

import Slider from 'react-slick';
import './productCarosel.css';
import { useSelector } from 'react-redux';
import { carouselImagesUrl } from '../../urlConfig';

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

  const { loading, carousel } = useSelector((state) => state.getAllCarousel);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <List />
        </Col>
        <Col md={9}>
          <Slider {...settings}>
            {carousel &&
              carousel.map((item) => (
                <img src={carouselImagesUrl(item.image)} alt='' />
              ))}
          </Slider>
        </Col>
      </Row>
    </>
  );
};

export default ProductCarousel;
