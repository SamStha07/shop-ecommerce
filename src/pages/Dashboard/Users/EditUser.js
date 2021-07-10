import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  CircularProgress,
  makeStyles,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import FormContainer from '../../../components/FormContainer/FormContainer';
import {
  GET_USER_BY_ID_RESET,
  USERS_EDIT_RESET,
} from '../../../redux/constants/userConstants';
import { getUserByID, userEdit } from '../../../redux/actions/userActions';
import ErrorMessage from '../../../components/Message/errorMessage';

const useStyles = makeStyles((theme) => ({
  prgressColor: {
    color: '#fff',
  },
}));

const EditUser = ({ match, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const classes = useStyles();

  const paramsUserID = match.params.id;

  const dispatch = useDispatch();

  const {
    loading: editLoading,
    success: editSuccess,
    error: editError,
  } = useSelector((state) => state.usersEdit);
  const { user, error: getUserIDError, loading: getUserIDLoader } = useSelector(
    (state) => state.getUserById
  );

  useEffect(() => {
    if (editSuccess) {
      history.push('/dashboard/users');
      // dispatch({ type: USERS_EDIT_RESET });
      dispatch({ type: GET_USER_BY_ID_RESET });
    }
  }, [editSuccess, history, dispatch]);

  useEffect(() => {
    if (!user) {
      dispatch(getUserByID(paramsUserID));
    } else {
      if (user._id !== paramsUserID) {
        dispatch(getUserByID(paramsUserID));
      } else {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
    }
  }, [dispatch, user, paramsUserID]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(userEdit({ id: user._id }, name, email, role));
  };

  return (
    <FormContainer>
      <div
        style={{
          textTransform: 'uppercase',
          fontSize: '2rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Edit User
      </div>

      {editError && (
        <ErrorMessage
          header='Error'
          message={editError}
          reset={USERS_EDIT_RESET}
        />
      )}
      {getUserIDError && (
        <ErrorMessage
          header='Error'
          message={getUserIDError}
          reset={GET_USER_BY_ID_RESET}
        />
      )}

      <Container>
        {getUserIDLoader ? (
          <div
            style={{
              position: 'absolute',
              margin: '0 auto',
              top: '50%',
              left: '50%',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Form onSubmit={submitHandler}>
            <TextField
              variant='outlined'
              type='name'
              margin='normal'
              required
              fullWidth
              id='name'
              label='Name'
              name='Name'
              autoComplete='name'
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              variant='outlined'
              type='email'
              margin='normal'
              placeholder='ex:- JohnDoe@gmail.com'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <RadioGroup
              aria-label='gender'
              name='gender1'
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel value='user' control={<Radio />} label='User' />
              <FormControlLabel
                value='admin'
                control={<Radio />}
                label='Admin'
              />
            </RadioGroup>

            <Button
              className='mt-2'
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
            >
              {editLoading ? (
                <CircularProgress
                  color='inherit'
                  className={classes.prgressColor}
                />
              ) : (
                <>Update</>
              )}
            </Button>
          </Form>
        )}
      </Container>
    </FormContainer>
  );
};

export default EditUser;
