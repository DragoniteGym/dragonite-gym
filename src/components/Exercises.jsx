/**
 * @module Exercises
 * @description loads exercises from database
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkouts } from '../reducers/exerciseReducer';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import dragonscales from '../assets/dragonscales.png';
import exercisePhoto from '../assets/exercise.jpg';

const Exercises = () => {
    
    const dispatch = useDispatch();

    const { bodypart } = useSelector(state => state.exercises);
    const { user_id } = useSelector(state => state.user);
    const { workouts } = useSelector(state => state.exercises);
    
    const loadExercises = async () => {
      try {
        // Fetch exercises from DB using bodypart and user_id
        const response = await fetch('http://localhost:3000/api/savedWorkouts/getWorkouts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bodypart, user: user_id}),
        });

        if (response.ok) {
          // If successful, update state with saved workouts
          const result = await response.json();
          console.log(result);
          console.log(result);
          // Update state with saved workouts
          dispatch(updateWorkouts(result));
        } else {
          // Handle retrieval errors
          const result = await response.json();
          console.error('Error retrieving saved workouts:', result);
        }
      } catch (err) {
        console.log('Error in loadExercises:', err);
      }
    };

    useEffect(() => {
        // Use useEffect to make API call to database when page renders
        loadExercises();
        alert(`You selected ${bodypart} and your user_id is ${user_id}`);
      }, []);

    return(
        <><div>
        <p>Here are your saved exercises!</p>
        <p><Link to='/profile' id='profile'>Profile</Link></p>
        <p><Link to='/' id='landing'>Sign Out</Link></p>
        </div>
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly',
        backgroundImage: `url(${dragonscales})`, minWidth: 300, width: '100%'}}>
        {workouts.map((workout) => (
            <Card key={workout.title} sx={{ maxWidth: 345, minWidth: 250, margin: 2, width: workout.width }}>
                <CardActionArea component={Link} to={workout.link}>
                    <CardMedia
                    component="img"
                    height="140"
                    image={exercisePhoto}
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