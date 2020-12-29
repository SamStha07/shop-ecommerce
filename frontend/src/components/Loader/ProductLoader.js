import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const ProductLoader = ({ product }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <Skeleton variant='rect' width={'100%'} height={110} />
      <Skeleton variant='text' width={'90%'} />
      <Skeleton variant='text' width={'50%'} />
      <Skeleton variant='text' width={'50%'} />
    </div>
  );
};

export default ProductLoader;
