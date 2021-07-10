import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const FilterLoader = () => {
  return (
    <>
      <div style={{ marginTop: '2rem' }}>
        {/* <Skeleton variant='rect' width={'100%'} height={110} /> */}
        <Skeleton variant='body1' width={'60%'} />
        <Skeleton variant='text' width={'30%'} />
        <Skeleton variant='text' width={'30%'} />
        <Skeleton variant='text' width={'30%'} />
        <Skeleton variant='text' width={'30%'} />
      </div>
      <div style={{ marginTop: '2rem' }}>
        {/* <Skeleton variant='rect' width={'100%'} height={110} /> */}
        <Skeleton variant='body1' width={'60%'} />
        <Skeleton variant='text' width={'30%'} />
        <Skeleton variant='text' width={'30%'} />
        <Skeleton variant='text' width={'30%'} />
        <Skeleton variant='text' width={'30%'} />
        <Skeleton variant='text' width={'30%'} />
        <Skeleton variant='text' width={'30%'} />
      </div>
    </>
  );
};

export default FilterLoader;
