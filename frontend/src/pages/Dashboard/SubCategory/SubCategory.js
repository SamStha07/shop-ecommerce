import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
import { Button, Breadcrumb, Form } from 'react-bootstrap';
import { Select, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import SubCatTable from './SubCatTable';
import SuccessMessage from '../../../components/Message/successMessage';
import ErrorMessage from '../../../components/Message/errorMessage';
import { getAllCategories } from '../../../redux/actions/categoryActions';
import {
  getAllSubCategories,
  createSubCategory,
} from '../../../redux/actions/subCategoryActions';
import { CREATE_SUB_CATEGORY_RESET } from '../../../redux/constants/categoryConstants';
import { LinkContainer } from 'react-router-bootstrap';

const SubCategory = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllSubCategories());
  }, [dispatch]);

  const createSubCat = useSelector((state) => state.createSubCategory);
  const { success, error } = createSubCat;

  const allCategories = useSelector((state) => state.getAllCategory);
  const { category: categoryList } = allCategories;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSubCategory(name, category));
    setName('');
    setCategory('');
  };

  return (
    <>
      <h5>Sub-Categories</h5>

      <Breadcrumb>
        <LinkContainer to='/dashboard'>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </LinkContainer>
        <LinkContainer to='/dashboard/category/create'>
          <Breadcrumb.Item>Category</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Sub-Category</Breadcrumb.Item>
      </Breadcrumb>

      {success && (
        <SuccessMessage
          header='Success'
          message='Sub-Category Added'
          reset={CREATE_SUB_CATEGORY_RESET}
        />
      )}
      {error && (
        <ErrorMessage
          header='Error'
          message={error}
          reset={CREATE_SUB_CATEGORY_RESET}
        />
      )}

      <MDBRow className='py-2'>
        <MDBCol lg='4' md='7' className='mb-4'>
          <MDBCard>
            <MDBCardBody>
              <Form onSubmit={handleSubmit}>
                <p className='h5 py-1'>Add Sub-Category</p>
                <hr />
                <label
                  htmlFor='Name'
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

                <label
                  htmlFor='Category'
                  className='grey-text font-weight-light h6'
                >
                  Category*
                </label>
                <div>
                  <Select
                    style={{ minWidth: '100%' }}
                    labelId={uuidv4()}
                    id={uuidv4()}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categoryList &&
                      categoryList.map((cat) => (
                        <MenuItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                  </Select>
                </div>

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
              <SubCatTable />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default SubCategory;
