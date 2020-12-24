import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  rating: {
    marginTop: '2rem',
    '& p': {
      fontSize: '20px',
    },
  },
}));

const Ratings = ({ product }) => {
  // const [rating, setRating] = useState(0);
  const classes = useStyles();
  return (
    <div className={classes.rating}>
      <p>{`Ratings & Reviews of ${product.name}`}</p>
    </div>
  );
};

export default Ratings;
