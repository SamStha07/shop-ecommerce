import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Button, Col, Form, ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Rating from '../components/Rating';
import Message from '../components/Message/Message';
import { Link } from 'react-router-dom';
import {
  createProductReview,
  getProductByID,
} from '../redux/actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../redux/constants/productConstants';

const useStyles = makeStyles((theme) => ({
  rating: {
    marginTop: '2rem',
    '& p': {
      fontSize: '20px',
    },
  },
}));

const Reviews = ({
  product,
  userInfo,
  errorProductReview,
  id,
  successProductreview,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const classes = useStyles();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  useEffect(() => {
    if (successProductreview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      dispatch(getProductByID(id));
    }
  }, [successProductreview, dispatch, id, errorProductReview]);

  return (
    <Col>
      <div className={classes.rating}>
        <p>{`Ratings & Reviews of ${product.name}`}</p>

        <div style={{ width: '50%' }}>
          {product.reviews.length === 0 && <Message>No reviews</Message>}

          <ListGroup variant='flush'>
            {product.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h5>Write a Customer Review</h5>

              {errorProductReview && (
                <Message variant='danger'>{errorProductReview}</Message>
              )}

              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as='select'
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Control>

                    <Form.Group controlId='comment'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        row='3'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Form.Group>

                  <Button type='submit' variant='primary' className='btn-sm'>
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to='/login'>sign in</Link> to write a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </Col>
  );
};

export default Reviews;
