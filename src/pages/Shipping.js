import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import FormContainer from '../components/FormContainer/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { regionList } from '../location/Region';
import { saveShippingAddress } from '../redux/actions/cartActions';

const Shipping = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  console.log(shippingAddress);

  const [name, setName] = useState(shippingAddress.name);
  const [mobile, setMobile] = useState(shippingAddress.mobile);
  const [region, setRegion] = useState(shippingAddress.region);
  const [city, setCity] = useState(shippingAddress.city);
  const [addressName, setAddressName] = useState(shippingAddress.addressName);

  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(saveShippingAddress({ name, mobile, region, city, addressName }));
    history.push('/payment');
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h4>Shipping</h4>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label style={{ fontSize: '1rem' }}>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter address'
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='mobile'>
            <Form.Label style={{ fontSize: '1rem' }}>Mobile Number</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Mobile Number'
              value={mobile}
              required
              onChange={(e) => setMobile(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='region'>
            <Form.Label style={{ fontSize: '1rem' }}>Region</Form.Label>
            <Form.Control
              as='select'
              value={region}
              required
              onChange={(e) => setRegion(e.target.value)}
            >
              {regionList.map((region) => (
                <option key={region._id}>{region.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label style={{ fontSize: '1rem' }}>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter City'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='address'>
            <Form.Label style={{ fontSize: '1rem' }}>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Address'
              value={addressName}
              required
              onChange={(e) => setAddressName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className='btn-sm' type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Shipping;
