import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Container } from 'react-bootstrap';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { getMyDetails, userUpdateProfile } from '../redux/actions/userActions';
import UserUpdateLoader from '../components/Loader/UserUpdateLoader';
import UpdatePassword from './UpdatePassword';

const useStyles = makeStyles((theme) => ({
  prgressColor: {
    color: '#fff',
  },
}));

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const classes = useStyles();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { userInfoDetails, loading } = userDetails;

  const userUpdated = useSelector((state) => state.userUpdated);
  const {
    loading: userUpdatedLoading,
    success,
    userInfoUpdated,
    error: errorUserUpdated,
  } = userUpdated;

  useEffect(() => {
    if (!userInfoDetails) {
      dispatch(getMyDetails(userInfo.user._id));
    } else {
      setName(userInfoDetails.name);
      setEmail(userInfoDetails.email);
    }
  }, [userInfoDetails, dispatch, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(userUpdateProfile({ id: userInfo.user._id, name, email }));

    dispatch(getMyDetails(userInfo.user._id));
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
            <h2>User Profile</h2>

            <Container>
              {success && (
                <Alert className="mt-3 mb-2" severity="success">
                  User Updated Successfully
                </Alert>
              )}
              {errorUserUpdated && (
                <Alert className="mt-3 mb-2" severity="error">
                  {errorUserUpdated}
                </Alert>
              )}
              <Form onSubmit={submitHandler}>
                {loading ? (
                  <UserUpdateLoader />
                ) : (
                  <>
                    <Form.Group controlId="first">
                      <Form.Label style={{ fontSize: '1rem' }}>
                        Name:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="email">
                      <Form.Label style={{ fontSize: '1rem' }}>
                        Email Address:
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </>
                )}

                <Button
                  className="mb-4"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                >
                  {userUpdatedLoading ? (
                    <CircularProgress
                      color="inherit"
                      className={classes.prgressColor}
                    />
                  ) : (
                    <>Update User</>
                  )}
                </Button>
              </Form>
            </Container>
          </Col>
          <UpdatePassword />
        </Row>
      </Container>
    </>
  );
};

export default Profile;
