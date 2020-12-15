import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Container } from 'react-bootstrap';
import {
  Button,
  CircularProgress,
  makeStyles,
  Avatar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { getMyDetails, userUpdateProfile } from '../redux/actions/userActions';
import UserUpdateLoader from '../components/Loader/UserUpdateLoader';
import UpdatePassword from './UpdatePassword';
import { userImageUrl } from '../urlConfig';
import { v4 as uuidv4 } from 'uuid';
import axios from '../helpers/axios';

const useStyles = makeStyles((theme) => ({
  prgressColor: {
    color: '#fff',
  },
}));

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
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
      setPhoto(userImageUrl(userInfoDetails.photo));
    }
  }, [userInfoDetails, dispatch, userInfo, userInfoUpdated]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append('photo', file);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/upload/users', formdata, config);
      console.log(data);
      setPhoto(data);
    } catch (error) {
      console.error(error);
      // setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // console.log({ email, name, photo });
    dispatch(userUpdateProfile({ id: userInfo.user._id, photo, name, email }));

    // if (userInfoUpdated) {
    //   dispatch(getMyDetails(userInfoUpdated.user._id));
    // }
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
                    <Form.Group>
                      <div style={{ marginBottom: '10px' }}>
                        {userInfoDetails && (
                          <Avatar
                            alt="image"
                            src={userImageUrl(userInfoDetails.photo)}
                            style={{
                              height: '100px',
                              width: '100px',
                              display: 'flex',
                              margin: 'auto',
                            }}
                          />
                        )}

                        <div style={{ marginTop: '20px' }}>
                          <Form.Control
                            type="text"
                            placeholder="Enter image url"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                          ></Form.Control>
                          <Form.File
                            id={uuidv4()}
                            label="Choose File"
                            custom
                            onChange={uploadFileHandler}
                          />
                        </div>
                      </div>
                    </Form.Group>

                    <Form.Group controlId={uuidv4()}>
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

                    <Form.Group controlId={uuidv4()}>
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
