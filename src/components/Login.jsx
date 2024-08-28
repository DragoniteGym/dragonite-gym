/**
 * @module Login
 * @description login page
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return(
        <div>
            <p>This is the Login Page</p>
            <p><Link to='/signup' id='signup'>Sign Up</Link></p>
            <p><Link to='/' id='landing'>Back</Link></p>
        </div>
    )
};

export default Login;