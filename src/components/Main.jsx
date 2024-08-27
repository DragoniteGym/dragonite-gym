/**
 * @module Main
 * @description landing page component (homepage)
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
    return(
        <div>
            <p>Welcome to Dragonite Gym. Evolve your workout!</p>
            <Link to='/login' id='start'>Login</Link>
        </div>
    )
};

export default Main;