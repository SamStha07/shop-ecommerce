import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
import { Button, Breadcrumb, Form } from 'react-bootstrap';
import { Select, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import ChildCatTable from './ChildCatTable';
import SuccessMessage from '../../../components/Message/successMessage';
import ErrorMessage from '../../../components/Message/errorMessage';
import {
  createChildCategory,
  getAllChildCategories,
} from '../../../redux/actions/childCategoryActions';
import { getAllCategories } from '../../../redux/actions/categoryActions';
import { getSubCatUnderMainCatID } from '../../../redux/actions/subCategoryActions';
import { CREATE_CHILD_CATEGORY_RESET } from '../../../redux/constants/categoryConstants';
import { LinkContainer } from 'react-router-bootstrap';

const ChildCategory = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubCategory] = useState('');

  const dispatch = useDispatch();

  const allCategories = useSelector((state) => state.getAllCategory);
  const { category: categoryList } = allCategories;

  const subCatwithMainCat = useSelector(
    (state) => state.getSubCatWithCategoryID
  );
  const { subCategory: subCategoryList } = subCatwithMainCat;

  const createChild = useSelector((state) => state.createChildCategory);
  const { success, error } = createChild;

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllChildCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createChildCategory(name, category, subcategory));
    setName('');
    setCategory('');
    setSubCategory('');
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
    dispatch(getSubCatUnderMainCatID(e.target.value));
  };

  return (
    <>
      <h5>Child-Categories</h5>

      <Breadcrumb>
        <LinkContainer to='/dashboard'>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Child-Category</Breadcrumb.Item>
      </Breadcrumb>

      {success && (
        <SuccessMessage
          header='Success'
          message='Sub-Category Added'
          reset={CREATE_CHILD_CATEGORY_RESET}
        />
      )}
      {error && (
        <ErrorMessage
          header='Error'
          message={error}
          reset={CREATE_CHILD_CATEGORY_RESET}
        />
      )}

      <MDBRow className='py-2'>
        <MDBCol lg='4' md='7' className='mb-4'>
          <MDBCard>
            <MDBCardBody>
              <Form onSubmit={handleSubmit}>
                <p className='h5 py-1'>Add Child-Category</p>
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
                  Main Category*
                </label>
                <div>
                  <Select
                    style={{ minWidth: '100%' }}
                    labelId={uuidv4()}
                    id={uuidv4()}
                    value={category}
                    onChange={handleChange}
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

                <label
                  htmlFor='Category'
                  className='grey-text font-weight-light h6'
                >
                  Sub Category*
                </label>
                <div>
                  <Select
                    style={{ minWidth: '100%' }}
                    labelId={uuidv4()}
                    id={uuidv4()}
                    value={subcategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                  >
                    {subCategoryList &&
                      subCategoryList.subCategory.map((cat) => (
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
              <ChildCatTable />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default ChildCategory;
