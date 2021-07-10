import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';

import FormContainer from '../components/FormContainer/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../redux/actions/cartActions';

const Payment = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  console.log(shippingAddress);

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('Khalti');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h4>Payment Method</h4>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>

            <Col>
              <Form.Check
                type='radio'
                label='Khalti'
                id='Khalti'
                name='paymentMethod'
                value='Khalti'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>

              <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button className='btn-sm' type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Payment;
