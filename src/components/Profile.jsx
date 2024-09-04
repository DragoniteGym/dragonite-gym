/**
 * @module Profile
 * @description user's profile page (contains saved exercises)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateExercises } from '../reducers/exerciseReducer';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import dragonscales from '../assets/dragonscales.png';
import exercisePhoto from '../assets/exercise.jpg';

const bodyparts = [
    {
      url: exercisePhoto,
      title: 'Abs',
    },
    {
      url: exercisePhoto,
      title: 'Arms',
    },
    {
      url: exercisePhoto,
      title: 'Back',
    },
    {
      url: exercisePhoto,
      title: 'Calves',
    },
    {
      url: exercisePhoto,
      title: 'Cardio',
    },
    {
      url: exercisePhoto,
      title: 'Chest',
    },
    {
      url: exercisePhoto,
      title: 'Glutes',
    },
    {
      url: exercisePhoto,
      title: 'Legs',
    },
    {
      url: exercisePhoto,
      title: 'Shoulders',
    },
  ];

const Profile = () => {

    const dispatch = useDispatch();
    
    const getExercises = (value) => {
        // Use dispatch to update state with correct muscle group
        dispatch(updateExercises(value));
        alert(`Navigating to your saved ${value} exercises. Let's go bro!`);
      }

    return(
        <><div>
        <p>This is the Profile Page</p>
        <p><Link to='/home' id='home'>Home</Link></p>
        <p><Link to='/' id='landing'>Sign Out</Link></p>
        </div>
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly',
        backgroundImage: `url(${dragonscales})`, minWidth: 300, width: '100%'}}>
        {bodyparts.map((bodypart) => (
            <Card sx={{ maxWidth: 345, minWidth: 250, margin: 2, width: '30%' }}>
                <CardActionArea component={Link} to='/exercises' onClick={(e) => {getExercises(bodypart.title)}}>
                    <CardMedia
                    component="img"
                    height="140"
                    image={bodypart.url}
                    alt={bodypart.title} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {bodypart.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Find {bodypart.title} exercises here!
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        ))}
        </Box></> 
    )
};

export default Profile;