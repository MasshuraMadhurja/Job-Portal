// src/pages/AuthPage.js

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Tabs, Tab, Box } from '@mui/material';
import { register, login } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setMessage('');
  //   try {
  //     console.log('Attempting to register');
  //     await register({ email, password });
  //     setMessage('You have registered successfully. Please login.');
  //     setEmail('');
  //     setPassword('');
  //     setTab(1); // Switch to login tab
  //   } catch (error) {
  //     console.error('Registration failed:', error);
  //     setError('You have already registered. Please login instead.');
  //   }
  // };
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await register({ email, password });
      setMessage('You have registered successfully. Please login.');
      setEmail('');
      setPassword('');
      setTab(1); // Switch to login tab
    } catch (error) {
      setError('You have already registered. Please login instead.');
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      console.log('Attempting to log in');
      const response = await login({ email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/home'); // Redirect to homepage
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setError('');
    setMessage('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        {tab === 0 ? 'Register' : 'Login'}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {message && <Typography color="primary">{message}</Typography>}
      <Tabs value={tab} onChange={handleTabChange} centered>
        <Tab label="Register" />
        <Tab label="Login" />
      </Tabs>
      <Box mt={3}>
        {tab === 0 && (
          <form onSubmit={handleRegister}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </form>
        )}
        {tab === 1 && (
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default AuthPage;
