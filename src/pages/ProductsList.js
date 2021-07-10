import React from 'react';
import { useSelector } from 'react-redux';

import Slider from 'react-slick';

import Product from '../components/Product';

const ProductsList = () => {
  const products = useSelector((state) => state.getAllProducts);
  const { productsList, loading } = products;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <h4 style={{ marginTop: '2rem' }}>Latest Products</h4>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <Slider {...settings}>
            {productsList &&
              productsList.productsList.map((product) => (
                <div>
                  <Product product={product} />
                </div>
              ))}
          </Slider>
        </>
      )}
    </>
  );
};

export default ProductsList;
