import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Carousel from '../components/Carousel/productCarousel';
import ProductsList from './ProductsList';
import {
  getAllProductsList,
  getTopRatedProducts,
} from '../redux/actions/productActions';
import TopRatedProducts from '../components/TopRatedProducts/TopRatedProducts';
import { getAllCarousel } from '../redux/actions/carouselActions';

const Homepage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsList());
    dispatch(getTopRatedProducts());
    dispatch(getAllCarousel());
  }, [dispatch]);

  return (
    <>
      <Carousel />
      <ProductsList />
      <TopRatedProducts />
    </>
  );
};

export default Homepage;
