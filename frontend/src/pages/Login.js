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

import { login } from '../redux/actions/authActions';
import FormContainer from '../components/FormContainer/FormContainer';

const useStyles = makeStyles((theme) => ({
  prgressColor: {
    color: '#fff',
  },
}));

const Login = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      <h1
        style={{
          textTransform: 'uppercase',
        }}
      >
        Sign In
      </h1>

      <Container>
        {error && <Alert severity="error">{error}</Alert>}

        <Form onSubmit={submitHandler}>
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
            autoFocus
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

          <Button
            className="mt-2"
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
              <>Sign In</>
            )}
          </Button>
        </Form>
      </Container>

      <Row className="py-3">
        <Col>
          New Customer?
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            {' '}
            Register
          </Link>
        </Col>
        {/* <Col className="text-right">
          <Link to={'/forgotPasssword'}>Forgot Password?</Link>
        </Col> */}
      </Row>
    </FormContainer>
  );
};

export default Login;
