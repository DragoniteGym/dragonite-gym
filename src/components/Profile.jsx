/**
 * @module Profile
 * @description user's profile page (contains saved exercises)
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

const bodyparts = [
    {
      url: exercisePhoto,
      title: 'Abs',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Arms',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Back',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Calves',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Cardio',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Chest',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Glutes',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Legs',
      link: '/search',
      width: '30%',
    },
    {
      url: exercisePhoto,
      title: 'Shoulders',
      link: '/search',
      width: '30%',
    },
  ];

const Profile = () => {
    return(
        <><div>
        <p>This is the Profile Page</p>
        <p><Link to='/home' id='home'>Home</Link></p>
        <p><Link to='/' id='landing'>Sign Out</Link></p>
        </div>
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly',
        backgroundImage: `url(${dragonscales})`, minWidth: 300, width: '100%'}}>
        {bodyparts.map((bodypart) => (
            <Card sx={{ maxWidth: 345, minWidth: 250, margin: 2, width: bodypart.width }}>
                <CardActionArea component={Link} to={bodypart.link}>
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