import React, { useState } from 'react';
import { Checkbox } from 'antd';

const CheckboxBrand = ({ brand, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value); // checks the index value
    const newChecked = [...checked]; // values checks xa vane every value will be pushed here

    // -1 means there is no value in checked state that value will be pushed in checked state ,,, else values already exists then pull/throws/splice that vales from state or array
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    // console.log(newChecked);
    handleFilters(newChecked);
  };

  return (
    <>
      {brand &&
        brand.childCategory.map((child, index) => (
          <div key={index}>
            <Checkbox onChange={() => handleToggle(child._id)} type='checkbox'>
              {child.name}
            </Checkbox>
          </div>
        ))}
    </>
  );
};

export default CheckboxBrand;
