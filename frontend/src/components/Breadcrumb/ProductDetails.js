import React from 'react';
import { Breadcrumb } from 'antd';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    // flexWrap: 'wrap',
    overflowWrap: 'anywhere',
  },
});

const ProductDetails = ({ product }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Breadcrumb separator=">">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{product.category.name}</Breadcrumb.Item>
        <Breadcrumb.Item>{product.subCategory.name}</Breadcrumb.Item>
        <Breadcrumb.Item>{product.brand.name}</Breadcrumb.Item>
        <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default ProductDetails;
