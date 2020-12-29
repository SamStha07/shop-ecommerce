import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core';
import { Select, Button, Popover } from 'antd';

import { SearchBreadcrumb } from '../components/Breadcrumb/ProductDetails';
import {
  searchProducts,
  getFilteredProducts,
} from '../redux/actions/productActions';
import Product from '../components/Product';
import { getChildCatUnderSubCatID } from '../redux/actions/childCategoryActions';
import CheckboxBrand from '../components/AdvanceFilter/Checkbox';
import { prices } from '../components/AdvanceFilter/Prices';
import Radiobox from '../components/AdvanceFilter/Radiobox';
import ProductLoader from '../components/Loader/ProductLoader';
import FilterLoader from '../components/Loader/FilterLoader';
import { FilterList } from '@material-ui/icons';
import Paginate from '../components/Pagination/Paginate';

const useStyles = makeStyles((theme) => ({
  filter: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menu: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  sortBy: {
    display: 'flex',
    marginBottom: '1rem',
  },
}));

const SearchEngine = ({ match, children }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const classes = useStyles();

  const [products, setProducts] = useState([]);

  const [myFilters, setMyFilters] = useState({
    filters: { brand: [], price: [] },
  });
  const [limit, setLimit] = useState(20);
  const [sort, setSort] = useState('');
  const [skip, setSkip] = useState(false);

  const dispatch = useDispatch();

  const { Option } = Select;

  const search = useSelector((state) => state.searchProduct);
  const { loading, productsSearch } = search;

  useEffect(() => {
    if (productsSearch) {
      setProducts(productsSearch.productsList);
      console.log(products);
    } else {
      if (!productsSearch) {
        dispatch(searchProducts(keyword, pageNumber));
      }
    }
  }, [dispatch, keyword, pageNumber, productsSearch, products]);

  const filteredTable = () => (
    <>
      <div style={{ marginBottom: '6px', fontSize: '18px' }}>Brand</div>
      <ul>{productsSearch && productsSearch.productsList[0].brand.name}</ul>

      <div style={{ marginBottom: '6px', fontSize: '18px' }}>Price</div>
      <div>
        {/* <Radiobox
          prices={prices}
          handleFilters={(filters) => handleFilters(filters, 'price')}
        /> */}
      </div>
    </>
  );

  return (
    <div>
      {productsSearch && (
        <>
          <SearchBreadcrumb />
          <hr />
          <div className={classes.sortBy}>
            <p
              style={{ margin: 'auto', color: '#404040' }}
            >{`${products.length} items found for "${keyword}"`}</p>

            <div
              style={{
                display: 'flex',
                alignContent: 'center',
                color: '#404040',
              }}
            >
              <p style={{ margin: 'auto', marginRight: '4px' }}>Sort By: </p>
              <Select style={{ width: 120 }}>
                <Option key={1}>1</Option>
              </Select>
            </div>
          </div>
          {loading ? (
            <>
              <Row>
                <Col md={4} lg={4}>
                  <div className={classes.filter}>
                    <FilterLoader />
                  </div>
                </Col>
                <Col md={8} lg={8}>
                  <Row>
                    {productsSearch.productsList.map((item) => (
                      <Col lg={4} md={4}>
                        <ProductLoader />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </>
          ) : (
            <>
              {/* Filter Table */}
              <Row>
                <Col md={2} lg={4}>
                  <div className={classes.filter}>{filteredTable()}</div>

                  {/* Display FilterBy Button */}
                  <div className={classes.menu}>
                    <div style={{ marginBottom: '5px' }}>Filter By:</div>
                    <Popover content={filteredTable()}>
                      <Button style={{ marginBottom: '1rem' }}>
                        <FilterList />
                      </Button>
                    </Popover>
                  </div>
                </Col>

                <Col md={10} lg={8}>
                  <>
                    <Row>
                      {products &&
                        products.map((item) => (
                          <Col key={item._id} lg={4} md={6} sm={6} xs={12}>
                            <Product product={item} />
                          </Col>
                        ))}
                    </Row>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Paginate
                        pages={productsSearch.pages}
                        page={productsSearch.page}
                        keyword={keyword}
                        key={keyword ? keyword : ''}
                      />
                    </div>
                  </>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchEngine;
