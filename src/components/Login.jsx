/**
 * @module Login
 * @description Login page with form handling and navigation
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Log the username and password to the console
    console.log('Username:', username);
    console.log('Password:', password);

    // Navigate to the home page
    navigate('/home');
  };

  return (
    <div>
      <p>This is the Login Page</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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