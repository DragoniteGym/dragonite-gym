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
import neckPhoto from '../assets/neck.jpg';
import shouldersPhoto from '../assets/shoulders.jpg';

import Navbar from './NavBar.jsx';


const bodyparts = [
    {
      url: absPhoto,
      title: 'Abs',
      text: `The abdominal muscles support the trunk, allow movement, and hold organs in place. 
      The deep abdominal muscles, together with the intrinsic back muscles, help keep the body stable and balanced.`,
    },
    {
      url: armsPhoto,
      title: 'Arms',
      text: `The muscles in your arms work together to help with big (throwing a ball) and small (pinching your fingers) 
      arm movements.`,
    },
    {
      url: backPhoto,
      title: 'Back',
      text: `The back muscles serve to allow: flex/extension, rotation, and side bending of the back. 
      They assist with movement of the limbs, locomotor function, and assistance in breathing.`,
    },
    {
      url: calvesPhoto,
      title: 'Calves',
      text: `Calf muscles help support you when you stand and enable you to move your feet and lower legs. 
      It allows you to jump, rotate your ankle, flex your foot and "lock" your knee to jump.`,
    },
    {
      url: cardioPhoto,
      title: 'Cardio',
      text: `Cardio exercises work your cardiovascular system by elevating your heart rate and requiring your 
      body to pump blood efficiently. Cardio provides overall health benefits and improve physical tasks like: swimming, cycling, and running.`,
    },
    {
      url: chestPhoto,
      title: 'Chest',
      text: `The chest muscles, or pectoralis muscles, assist with the extension and rotation of the arms, 
      and movement of the shoulders. They help in supporting the weight of the upper body and breathing.`,
    },
    {
      url: glutesPhoto,
      title: 'Glutes',
      text: `The gluteal muscles (buttock muscles) help stabilize the upper body and pelvis, aid in 
      locomotion, and extend the hip. They include the largest muscle in the body, the gluteus maximus.`,
    },
    {
      url: legsPhoto,
      title: 'Legs',
      text: `The leg muscles, which include the hamstrings and quadriceps, extend the hip and flex the knee. 
      They play an important part in the gait cycle of walking/running/jumping.`,
    },
    {
      url: neckPhoto,
      title: 'Neck',
      text: `The neck muscles help support the head and protect the cervical spine. It allows for rotation 
      and extension, and connects the cranium (head) to the thorax (chest).`,
    },
    {
      url: shouldersPhoto,
      title: 'Shoulders',
      text: `The shoulder muscles help to stablize the shoulder joints and assist with flexion of the arms.`,
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
            <Card key={bodypart.title} sx={{ maxWidth: 345, minWidth: 250, margin: 2, width: '30%' }}>
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
                            {bodypart.text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        ))}
        </Box></> 
    )
};

export default Profile;