/**
 * @module Chat
 * @description chat message page
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Chat = () => {
    return(
        <div>
            <p>This is the Chat Page</p>
            <p><Link to='/home' id='home'>Home</Link></p>
            <p><Link to='/' id='landing'>Sign Out</Link></p>
        </div>
    )
};

export default Chat;