/**
 * @module Profile
 * @description user's profile page (contains saved exercises)
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
    return(
        <div>
            <p>This is the Profile Page</p>
            <p><Link to='/home' id='home'>Home</Link></p>
            <p><Link to='/' id='landing'>Sign Out</Link></p>
        </div>
    )
};

export default Profile;