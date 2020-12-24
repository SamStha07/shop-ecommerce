import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../components/FormContainer/FormContainer';
import { register } from '../redux/actions/authActions';

const useStyles = makeStyles((theme) => ({
  prgressColor: {
    color: '#fff',
  },
}));

const Register = ({ location, history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const classes = useStyles();

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userInfoLogin } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfoLogin) {
      history.push(redirect);
    }
  }, [userInfoLogin, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    }
    dispatch(register(username, email, password, confirmPassword));
  };

  return (
    <FormContainer>
      <h1
        style={{
          textTransform: 'uppercase',
        }}
      >
        Sign Up
      </h1>
      <Container>
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="error">{message}</Alert>}

        <Form onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            type="username"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            variant="outlined"
            type="email"
            margin="normal"
            placeholder="ex:- JohnDoe@gmail.com"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            type="password"
            margin="normal"
            placeholder="************"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            variant="outlined"
            type="password"
            margin="normal"
            placeholder="************"
            required
            fullWidth
            id="confirmpassword"
            label="Confirm Password"
            name="confirmpassword"
            autoComplete="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            className="mt-2"
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {loading ? (
              <CircularProgress
                color="inherit"
                className={classes.prgressColor}
              />
            ) : (
              <>Sign Up</>
            )}
          </Button>
        </Form>
      </Container>

      <Row className="py-3">
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
