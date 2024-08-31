/**
 * @module SignUp
 * @description Sign up page with form handling and navigation
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    // State for form fields
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Log form data to the console (for debugging)
        console.log('Username:', username);
        console.log('First Name:', firstname);
        console.log('Last Name:', lastname);
        console.log('Email:', email);
        console.log('Password:', password);

        try {
            // Send the sign-up request to your backend
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

            // Handle the response from your backend
            if (response.ok) {
                console.log('Sign-up successful');
                navigate('/login'); // Redirect to login page on success
            } else {
                console.error('Sign-up failed');
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
        }
    };

    return (
        <div>
            <p>This is the Sign Up Page</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input
                        type='text'
                        id='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='firstname'>First Name:</label>
                    <input
                        type='text'
                        id='firstname'
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='lastname'>Last Name:</label>
                    <input
                        type='text'
                        id='lastname'
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Sign Up</button>
            </form>
            <p><Link to='/login' id='login'>Login</Link></p>
            <p><Link to='/' id='landing'>Back</Link></p>
        </div>
    );
};

export default SignUp;

