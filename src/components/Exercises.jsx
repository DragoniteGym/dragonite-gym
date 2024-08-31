/**
 * @module Exercises
 * @description loads exercises from database
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import dragonscales from '../assets/dragonscales.png';
import exercisePhoto from '../assets/exercise.jpg';

const workouts = [
    {
      url: exercisePhoto,
      title: 'Abs',
      text: '',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Arms',
      text: '',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Back',
      text: '',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Calves',
      text: '',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Cardio',
      text: '',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Chest',
      text: '',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Glutes',
      text: '',
      link: '/search',
      width: '30%',
    },
  ];

  // Create load exercises function
    // Fetch exercises from DB using user_id and muscle group name (/exercises/?)
        // Use useEffect to make API call when page renders?
    // Load response from DB into array
    // Populate cards with array info

const Exercises = () => {
    return(
        <><div>
        <p>Here are your saved exercises!</p>
        <p><Link to='/profile' id='profile'>Profile</Link></p>
        <p><Link to='/' id='landing'>Sign Out</Link></p>
        </div>
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly',
        backgroundImage: `url(${dragonscales})`, minWidth: 300, width: '100%'}}>
        {workouts.map((workout) => (
            <Card sx={{ maxWidth: 345, minWidth: 250, margin: 2, width: workout.width }}>
                <CardActionArea component={Link} to={workout.link}>
                    <CardMedia
                    component="img"
                    height="140"
                    image={workout.url}
                    alt={workout.title} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {workout.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {workout.text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        ))}
        </Box></> 
    )
};

export default Exercises;