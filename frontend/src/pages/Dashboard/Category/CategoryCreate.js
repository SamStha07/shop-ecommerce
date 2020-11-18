import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from 'mdbreact';
import { Button, Breadcrumb, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CatgoriesTable from '../../../components/UI/AllCategories';
import { createCategory } from '../../../redux/actions/categoryActions';

const CategoryCreate = () => {
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    dispatch(createCategory(name));
  };

  return (
    <>
      <h5>Categories</h5>

      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Category</Breadcrumb.Item>
      </Breadcrumb>

      <MDBRow className="py-2">
        <MDBCol lg="4" md="7" className="mb-4">
          <MDBCard>
            <MDBCardBody>
              <Form onSubmit={handleSubmit}>
                <p className="h5 py-1">Add Main Category</p>
                <hr />
                <label
                  htmlFor="defaultFormCardNameEx"
                  className="grey-text font-weight-light h6"
                >
                  Name*
                </label>
                <input
                  type="text"
                  id="defaultFormCardNameEx"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <br />
                <Button variant="primary" type="submit">
                  Add New
                </Button>
              </Form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol lg="8" md="12">
          <MDBCard>
            <MDBCardBody>
              <CatgoriesTable />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default CategoryCreate;
