/**
 * @module Exercises
 * @description loads exercises from database
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import dragonscales from '../assets/dragonscales.png';
import exercisePhoto from '../assets/exercise.jpg';
import Navbar from './NavBar.jsx';

const workouts = [
    {
      url: exercisePhoto,
      title: 'Exercise #1',
      text: '',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Exercise #2',
      text: '',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Exercise #3',
      text: '',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Exercise #4',
      text: '',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Exercise #5',
      text: '',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Exercise #6',
      text: '',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Exercise #7',
      text: '',
      link: '/search',
      width: '30%',
    },
  ];

const Exercises = () => {

    const { bodypart } = useSelector(state => state.exercises);
    const { user_id } = useSelector(state => state.user);

    // Create load exercises function
        // Fetch exercises from DB using user_id and muscle group name (get from state)
        // Load response from DB into array
        // Populate cards with array info

    useEffect(() => {
        // Use useEffect to make API call when page renders?
        alert(`You selected ${bodypart} and your user_id is ${user_id}`);
      }, []);

    return(
        <>
        <Navbar />
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