import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../../../components/FormContainer/FormContainer';
import { registerCustomer } from '../../../redux/actions/authActions';
import { USER_NEW_REGISTER_RESET } from '../../../redux/constants/userConstants';

const useStyles = makeStyles((theme) => ({
  prgressColor: {
    color: '#fff',
  },
}));

const CreateUser = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState(null);
  const classes = useStyles();

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const newUser = useSelector((state) => state.newUserRegister);
  const { success } = newUser;

  useEffect(() => {
    if (success) {
      history.push('/dashboard/users');
      dispatch({ type: USER_NEW_REGISTER_RESET });
    }
  }, [success, history, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    }

    dispatch(registerCustomer(name, email, password, confirmPassword, role));
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
        Create User
      </div>
      <Container>
        {error && <Alert severity='error'>{error}</Alert>}
        {message && <Alert severity='error'>{message}</Alert>}

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
          <TextField
            variant='outlined'
            type='password'
            margin='normal'
            placeholder='************'
            required
            fullWidth
            id='password'
            label='Password'
            name='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            variant='outlined'
            type='password'
            margin='normal'
            placeholder='************'
            required
            fullWidth
            id='confirmpassword'
            label='Confirm Password'
            name='confirmpassword'
            autoComplete='confirm-password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <RadioGroup
            aria-label='gender'
            name='gender1'
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <FormControlLabel value='user' control={<Radio />} label='User' />
            <FormControlLabel value='admin' control={<Radio />} label='Admin' />
          </RadioGroup>

          <Button
            className='mt-2'
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
          >
            {loading ? (
              <CircularProgress
                color='inherit'
                className={classes.prgressColor}
              />
            ) : (
              <>Create new user</>
            )}
          </Button>
        </Form>
      </Container>
    </FormContainer>
  );
};

export default CreateUser;
