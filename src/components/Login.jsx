/**
 * @module Login
 * @description Login page with form handling and navigation
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a POST request to the backend with the correct data shape
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password_hash: password }), // Updated to match the required data shape
      });

      if (response.ok) {
        // On successful login, get the JWT token, redirect to the home page
        const result = await response.json();
        localStorage.setItem('token', result.token);
        console.log('user', result.username)
        console.log('email', result.email);
        navigate('/home');
      } else {
        // Handle login errors
        const result = await response.json();
        console.error('Login error:', result.message);
        alert('Login failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div>
      <p>This is the Login Page</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        <Link to="/signup" id="signup">
          Sign Up
        </Link>
      </p>
      <p>
        <Link to="/" id="landing">
          Back
        </Link>
      </p>
    </div>
  );
};

export default Login;

