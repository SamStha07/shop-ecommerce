import React from 'react';
import { Carousel } from 'antd';
import { makeStyles } from '@material-ui/core';

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

  return (
    <Carousel autoplay>
      <div>
        <img
          className={classes.root}
          src="https://images.unsplash.com/photo-1607857667450-11af69c5e8ea?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt="img1"
        />
      </div>
      <div>
        <img
          className={classes.root}
          src="https://images.unsplash.com/photo-1558716378-95ab2d0c7af4?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fHJuU0tESHd3WVVrfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt="img2"
        />
      </div>
      <div>
        <img
          className={classes.root}
          src="https://images.unsplash.com/photo-1607608879760-c1464a648e72?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHJuU0tESHd3WVVrfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt="img3"
        />
      </div>
    </Carousel>
  );
};

export default ProductCarousel;
