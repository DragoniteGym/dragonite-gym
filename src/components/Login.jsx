/**
 * @module Login
 * @description Login page with form handling and navigation
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUserId } from '../reducers/userReducer';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dragonscales from '../assets/dragonscales.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password_hash: password }), // Updated to match the required data shape
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('token', result.token);
        // Update state with user id for rendering saved profile
        dispatch(updateUserId(result.id));
        navigate('/home');
      } else {
        const result = await response.json();
        alert('Login failed: ' + result.message);
      }
    } catch (error) {
      alert('An error occurred during login.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${dragonscales})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        padding: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 2,
          padding: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              borderRadius: 20, // Rounded corners for a sleeker look
              padding: '10px 20px', // Adjust padding for a sleeker button
              fontWeight: 'bold', // Make text bold for better visibility
              boxShadow: 1, // Subtle shadow for a floating effect
              '&:hover': {
                boxShadow: 3, // Deeper shadow on hover
                backgroundColor: 'rgba(0, 123, 255, 0.9)', // Slightly darker on hover
              },
            }}
          >
            Login
          </Button>
        </form>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            <Link to="/signup" style={{ textDecoration: 'none', color: '#007bff' }}>
              Sign Up
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
              Back
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;



