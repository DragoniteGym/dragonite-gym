/**
 * @module Landing
 * @description landing page component (main page)
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return(
        <div>
            <p>Welcome to Dragonite Gym. Evolve your workout!</p>
            <p><Link to='/login' id='login'>Login</Link></p>
            <p><Link to='/signup' id='signup'>Sign Up</Link></p>
            <p><Link to='/home' id='home'>Home</Link></p>
            <p><Link to='/search' id='search'>Search</Link></p>
            <p><Link to='/profile' id='profile'>Profile</Link></p>
            <p><Link to='/chat' id='chat'>Chat</Link></p>
        </div>
    )
};

export default Landing;