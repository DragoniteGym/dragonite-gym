/**
 * @module Landing
 * @description landing page component (main page)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import backgroundImage from '../assets/dragonscales.png';


const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 400,
    width: '80%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 200,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: `url(${backgroundImage})`,
});

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

// Top right box styling
const TopRightBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(5),
    right: theme.spacing(5),
}));

const LoginButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: 'black',
    borderRadius: '20%',
    minWidth: theme.spacing(5),
    height: theme.spacing(5),
    '&:hover': {
        backgroundColor: 'darkgray',
    },
}));

const Landing = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black' }}>
            <TopRightBox>
                <Link to="/login">
                    <LoginButton>
                        <PersonOutlineOutlinedIcon />
                    </LoginButton>
                </Link>
            </TopRightBox>

            <ImageButton
                focusRipple
                component={Link} to='/home'
            >
                <ImageSrc />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                    <Typography
                        component="span"
                        variant="h4"
                        color="inherit"
                        sx={(theme) => ({
                            position: 'relative',
                            p: 4,
                            pt: 2,
                            pb: `calc(${theme.spacing(1)} + 6px)`,
                        })}
                    >
                        Dragonite Gym
                        <Typography variant="subtitle1" color="inherit" sx={{ mt: 2, textAlign: 'center' }}>
                            Evolve your workout!
                        </Typography>
                        <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                </Image>
            </ImageButton>
        </Box>
    );
};

export default Landing;
