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
import absPhoto from '../assets/abs.jpg';
import armsPhoto from '../assets/arms.jpg';
import backPhoto from '../assets/back.jpg';
import calvesPhoto from '../assets/calves.jpg';
import cardioPhoto from '../assets/cardio.jpg';
import chestPhoto from '../assets/chest.jpg';
import glutesPhoto from '../assets/glutes.jpg';
import legsPhoto from '../assets/legs.jpg';
import shouldersPhoto from '../assets/shoulders.jpg';

import Navbar from './NavBar.jsx';


const bodyparts = [
    {
      url: absPhoto,
      title: 'Abs',
    },
    {
      url: armsPhoto,
      title: 'Arms',
    },
    {
      url: backPhoto,
      title: 'Back',
    },
    {
      url: calvesPhoto,
      title: 'Calves',
    },
    {
      url: cardioPhoto,
      title: 'Cardio',
    },
    {
      url: chestPhoto,
      title: 'Chest',
    },
    {
      url: glutesPhoto,
      title: 'Glutes',
    },
    {
      url: legsPhoto,
      title: 'Legs',
    },
    {
      url: shouldersPhoto,
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
        <>
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