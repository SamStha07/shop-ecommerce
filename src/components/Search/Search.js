import React, { useState } from 'react';
import { MDBCol, MDBIcon } from 'mdbreact';
import { useDispatch } from 'react-redux';

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <MDBCol md='6'>
      <form
        className='form-inline mt-.5 mb-.5'
        type='submit'
        onSubmit={submitHandler}
      >
        <MDBIcon icon='search' />
        <input
          className='form-control form-control-sm ml-3 w-75'
          type='text'
          placeholder='Search'
          aria-label='Search'
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
    </MDBCol>
  );
};

export default Search;
