/**
 * @module NavBar
 * @description NavBar component
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../utils/authUtils';

// Navbar container styling
const NavbarContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
}));

// Navbar link styling
const NavbarLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: 'white',
    margin: theme.spacing(2),
    fontSize: '16px',
    '&:hover': {
        textDecoration: 'underline',
    },
}));

const StyledText = styled(Typography)(({ theme }) => ({
    textDecoration: 'none',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: theme.spacing(0.5),
    padding: theme.spacing(1, 2),
    fontSize: '14px',
    border: '2px solid white',
    borderRadius: '4px',
}));

// Styled Button for logout
const LogoutButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: 'black',
    borderRadius: '20%',
    minWidth: theme.spacing(5),
    height: theme.spacing(5),
    '&:hover': {
        backgroundColor: 'darkgray',
    },
}));

const Navbar = () => {
    return (
        <NavbarContainer>
            <Box display="flex">
                <StyledText variant="h6">
                    Dragonite Gym
                </StyledText>
                <NavbarLink to="/home">Home</NavbarLink>
                <NavbarLink to="/search">Exercises</NavbarLink>
                <NavbarLink to="/profile">Profile</NavbarLink>
                <NavbarLink to="/chat">Hey Bro!</NavbarLink>
            </Box>
            <Link to='/' id='landing' onClick={logout}>
                <LogoutButton>
                    <LogoutIcon />
                </LogoutButton>
            </Link>
        </NavbarContainer>
    );
};

export default Navbar;
