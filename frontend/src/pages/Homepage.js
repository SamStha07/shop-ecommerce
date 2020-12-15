import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Carousel from '../components/productCarousel';
import ProductsList from './ProductsList';
import { getAllProductsList } from '../redux/actions/productActions';

const Homepage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsList());
  }, [dispatch]);

  return (
    <>
      <Carousel />
      <ProductsList />
    </>
  );
};

export default Homepage;
