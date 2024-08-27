/**
 * @module Search
 * @description search page for exercises
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
    return(
        <div>
            <p>This is the Search Page</p>
            <p><Link to='/home' id='home'>Home</Link></p>
            <p><Link to='/' id='landing'>Sign Out</Link></p>
        </div>
    )
};

export default Search;