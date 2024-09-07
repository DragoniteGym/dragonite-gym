/**
 * @module Search
 * @description search page for exercises
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import dragonscales from '../assets/dragonscales.png';
import Navbar from './NavBar.jsx';

const Search = () => {
    return(
        <>
            <Box sx={{
                backgroundImage: `url(${dragonscales})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat',
                minHeight: '100vh',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                }}>
                <Navbar />
            
            </Box>
        </>
    )
};

export default Search;