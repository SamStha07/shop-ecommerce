import React from 'react';
import { useSelector } from 'react-redux';

import Slider from 'react-slick';

import Product from '../Product';

const TopRatedProducts = () => {
  const { products, loading } = useSelector((state) => state.topRatedProducts);

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
      <h4 style={{ marginTop: '2rem' }}>Top Rated Products</h4>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <Slider {...settings}>
            {products &&
              products.productsList.map((product) => (
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

export default TopRatedProducts;
