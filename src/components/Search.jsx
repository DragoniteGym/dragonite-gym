/**
 * @module Search
 * @description search page for exercises
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import dragonscales from '../assets/dragonscales.png';
import Navbar from './NavBar.jsx';

const Search = () => {

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const loadSearch = async () => {
        try {
          // Fetch exercises from API
          const response = await fetch('http://localhost:3000/api/exercise/searchExercise', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: search }),
          });
  
          if (response.ok) {
            const result = await response.json();
            console.log(response);
            // Update state
            setSearchResults(result);
          } else {
            // Handle retrieval errors
            const result = await response.json();
            console.error('Error retrieving exercises from search:', response);
          }
        } catch (err) {
          console.log('Error in loadSearch:', err);
        }
      };

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(`Searching for ${search}`);
        // Make fetch request
        loadSearch();
    };

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
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'white',
                        padding: 1,
                        borderRadius: 1,
                        boxShadow: 1,
                        width: '60%',
                        maxWidth: '300px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1, 
                    }}
                >
                    <TextField
                        id='search-bar'
                        onChange={handleSearchChange}
                        label='Search'
                        variant='outlined'
                        placeholder='Search for exercises...'
                        size='small'
                        fullWidth
                    />
                    <IconButton type='submit' aria-label='search' onClick={handleSearch}>
                        <SearchIcon style={{ fill: 'blue' }} />
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                {searchResults.map((searchResult) => (
                    <Card key={searchResult.name} sx={{ maxWidth: 345, minWidth: 250, margin: 2, width: '30%' }}>
                        <CardActionArea component={Link} to={searchResult.gifUrl}>
                            <CardMedia
                                component="img"
                                height="340"
                                image={searchResult.gifUrl}
                                alt={searchResult.name} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {searchResult.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    <p>Equipment: {searchResult.equipment}</p>
                                    <p>Target: {searchResult.target}</p>
                                    <p>Secondary Muscles: {searchResult.secondaryMuscles.join(', ')}</p>
                                    {searchResult.instructions.map((instruction) => (
                                    <p>{instruction}</p>
                                    ))}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
                </Box>
            </Box>
        </>
    );
};

export default Search;