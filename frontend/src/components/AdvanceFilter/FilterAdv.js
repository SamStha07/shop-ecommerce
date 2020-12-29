import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getChildCatUnderSubCatID } from '../../redux/actions/childCategoryActions';
import CheckboxBrand from '../Checkbox/Checkbox';

const FilterAdv = ({ products, mainHandleFilter }) => {
  const [myFilters, setMyFilters] = useState({
    filters: { brand: [], price: [] },
  });

  const id = products.productsList[0].subCategory._id;

  const dispatch = useDispatch();

  const childCatWithSubCat = useSelector(
    (state) => state.getChildCatWithSubCategoryID
  );
  const { childCategory: childCategoryList } = childCatWithSubCat;

  useEffect(() => {
    if (id) {
      dispatch(getChildCatUnderSubCatID(id));
    }
  }, [dispatch, id]);

  // it accepts the values from child component
  const handleFilters = (filters, filterBy) => {
    // console.log('Filter', filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    setMyFilters(newFilters);
    console.log(newFilters);
  };

  return (
    <>
      <div style={{ marginBottom: '6px', fontSize: '18px' }}>
        Filter by Brand
      </div>
      <ul>
        <CheckboxBrand
          brand={childCategoryList}
          handleFilters={(filters) => handleFilters(filters, 'brand')}
        />
      </ul>
    </>
  );
};

export default FilterAdv;
