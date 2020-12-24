import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Product from '../components/Product';

const ProductsList = () => {
  const products = useSelector((state) => state.getAllProducts);
  const { productsList, loading } = products;

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <Row>
            {productsList &&
              productsList.productsList.map((product) => (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
        </>
      )}
    </>
  );
};

export default ProductsList;
