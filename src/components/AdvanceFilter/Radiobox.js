import React, { useState } from 'react';

const Radiobox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    setValue(e.target.value);
    handleFilters(e.target.value);
  };

  return (
    <>
      {prices.map((p, index) => (
        <div key={index}>
          <input
            onChange={handleChange}
            value={`${p._id}`}
            name={p}
            type='radio'
            className='mr-2 ml-4'
          />
          <label className='form-check-label' style={{ fontSize: '14px' }}>
            {p.name}
          </label>
        </div>
      ))}
    </>
  );
};

export default Radiobox;
