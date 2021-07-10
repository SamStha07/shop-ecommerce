import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { getProductListOfBrand } from '../redux/actions/productActions';

const BrandListPage = ({ match }) => {
  const id = match.params.id;

  console.log(id);
  const dispatch = useDispatch();

  const brands = useSelector((state) => state.getProductListUnderBrand);
  const { loading, brandList } = brands;

  useEffect(() => {
    dispatch(getProductListOfBrand(id));
  }, [dispatch, id]);

  return (
    <Row>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {brandList &&
            brandList.products.map((product) => (
              <Col key={product._id} xs={12} sm={6} lg={3}>
                <Product product={product} />
              </Col>
            ))}
        </>
      )}
    </Row>
  );
};

export default BrandListPage;
