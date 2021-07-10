import React, { useState } from 'react';
import { Col, Form, Container } from 'react-bootstrap';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';

import { userUpdateProfilePassword } from '../redux/actions/userActions';
import UserUpdatePasswordLoader from '../components/Loader/UserUpdatePasswordLoader';

const useStyles = makeStyles((theme) => ({
  prgressColor: {
    color: '#fff',
  },
}));

const UpdatePassword = () => {
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const classes = useStyles();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userInfoLoading } = userDetails;

  const userUpdatedPassword = useSelector((state) => state.userUpdatedPassword);
  const { loading, success, error } = userUpdatedPassword;

  const submitHandler = (e) => {
    e.preventDefault();

    console.log({ passwordCurrent });

    dispatch(
      userUpdateProfilePassword({
        id: userInfo.user._id,
        passwordCurrent,
        password,
        passwordConfirm,
      }),
    );
  };

  return (
    <>
      <Col md={6}>
        <h2>Update Password</h2>

        <Container>
          {success && (
            <Alert className="mt-3 mb-2" severity="success">
              Password Updated Successfully
            </Alert>
          )}
          {error && (
            <Alert className="mt-3 mb-2" severity="error">
              {error}
            </Alert>
          )}
          <Form onSubmit={submitHandler}>
            {userInfoLoading ? (
              <UserUpdatePasswordLoader />
            ) : (
              <>
                <Form.Group controlId="first">
                  <Form.Label style={{ fontSize: '1rem' }}>
                    Current Password:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Current Password"
                    value={passwordCurrent}
                    onChange={(e) => setPasswordCurrent(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label style={{ fontSize: '1rem' }}>
                    Password:
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmpassword">
                  <Form.Label style={{ fontSize: '1rem' }}>
                    Confirm Password:
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <CircularProgress
                  color="inherit"
                  className={classes.prgressColor}
                />
              ) : (
                <>Update Password</>
              )}
            </Button>
          </Form>
        </Container>
      </Col>
    </>
  );
};

export default UpdatePassword;
