/**
 * @module Home
 * @description home page with app user selections
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <div>
            <p>This is the Home Page</p>
            <p><Link to='/search' id='search'>Exercises</Link></p>
            <p><Link to='/profile' id='profile'>Profile</Link></p>
            <p><Link to='/chat' id='chat'>Hey Bro!</Link></p>
            <p><Link to='/' id='landing'>Sign Out</Link></p>
        </div>
    )
};

export default Home;