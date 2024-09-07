/**
 * @module SignUp
 * @description Sign up page with form handling and navigation
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dragonscales from '../assets/dragonscales.png';
const SignUp = () => {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    firstname,
                    lastname,
                    email,
                    password_hash: password, // Backend expects this key
                }),
            });

            if (response.ok) {
                navigate('/login'); // Redirect to login page on success
            } else {
                console.error('Sign-up failed');
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
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
                    maxWidth: 500,
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 2,
                    padding: 3,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Username"
                            type="text"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="First Name"
                            type="text"
                            variant="outlined"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            type="text"
                            variant="outlined"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                    </Box>
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
                            borderRadius: 20, // Rounded corners
                            padding: '10px 20px', // Adjust padding
                            fontWeight: 'bold', // Bold text
                            boxShadow: 1, // Subtle shadow
                            '&:hover': {
                                boxShadow: 3, // Deeper shadow on hover
                                backgroundColor: 'rgba(0, 123, 255, 0.9)', // Darker on hover
                            },
                        }}
                    >
                        Sign Up
                    </Button>
                </form>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2">
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{
                                    borderRadius: 20, // Rounded corners
                                    padding: '10px 20px', // Adjust padding
                                    fontWeight: 'bold', // Bold text
                                    boxShadow: 1, // Subtle shadow
                                    '&:hover': {
                                        boxShadow: 3, // Deeper shadow on hover
                                        borderColor: 'rgba(0, 123, 255, 0.9)', // Darker border on hover
                                    },
                                }}
                            >
                                Login
                            </Button>
                        </Link>
                    </Typography>
                    <Typography variant="body2">
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{
                                    borderRadius: 20, // Rounded corners
                                    padding: '10px 20px', // Adjust padding
                                    fontWeight: 'bold', // Bold text
                                    boxShadow: 1, // Subtle shadow
                                    '&:hover': {
                                        boxShadow: 3, // Deeper shadow on hover
                                        borderColor: 'rgba(0, 123, 255, 0.9)', // Darker border on hover
                                    },
                                }}
                            >
                                Back
                            </Button>
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default SignUp;



