/**
 * @module SignUp
 * @description Sign up page with form handling and navigation
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Log form data to the console (for debugging)
        console.log('Email:', email);
        console.log('Password:', password);

        // Here you would typically handle the form submission,
        // such as sending a request to your backend to create a new user.

        // Redirect to the login page upon successful submission
        navigate('/login');
    };

    return (
        <div>
            <p>This is the Sign Up Page</p>
            <form onSubmit={handleSubmit}>
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
