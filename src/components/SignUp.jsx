/**
 * @module SignUp
 * @description sign up page
 */

import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    return(
        <div>
            <p>This is the Sign Up Page</p>
            <p><Link to='/login' id='login'>Login</Link></p>
            <p><Link to='/' id='landing'>Back</Link></p>
        </div>
    )
};

export default SignUp;