import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
import { Button, Breadcrumb, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import CategoriesTable from './CategoryTable';
import {
  createCategory,
  getAllCategories,
} from '../../../redux/actions/categoryActions';
import { CREATE_CATEGORY_RESET } from '../../../redux/constants/categoryConstants';
import SuccessMessage from '../../../components/Message/successMessage';
import ErrorMessage from '../../../components/Message/errorMessage';
import { LinkContainer } from 'react-router-bootstrap';

const CategoryCreate = () => {
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const createCat = useSelector((state) => state.createCategory);
  const { success, error } = createCat;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory(name));
    setName('');
  };

  return (
    <>
      <h5>Categories</h5>

      <Breadcrumb>
        <LinkContainer to='/dashboard'>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Category</Breadcrumb.Item>
      </Breadcrumb>

      {success && (
        <SuccessMessage
          header='Success'
          message='Category Added'
          reset={CREATE_CATEGORY_RESET}
        />
      )}
      {error && (
        <ErrorMessage
          header='Error'
          message={error}
          reset={CREATE_CATEGORY_RESET}
        />
      )}

      <MDBRow className='py-2'>
        <MDBCol lg='4' md='7' className='mb-4'>
          <MDBCard>
            <MDBCardBody>
              <Form onSubmit={handleSubmit}>
                <p className='h5 py-1'>Add Main Category</p>
                <hr />
                <label
                  htmlFor='defaultFormCardNameEx'
                  className='grey-text font-weight-light h6'
                >
                  Name*
                </label>
                <input
                  type='text'
                  id={uuidv4()}
                  className='form-control'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <br />
                <Button variant='primary' type='submit'>
                  Add New
                </Button>
              </Form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol lg='8' md='12'>
          <MDBCard>
            <MDBCardBody>
              <CategoriesTable />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default CategoryCreate;
