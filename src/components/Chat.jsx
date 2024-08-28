/**
 * @module Chat
 * @description chat message page
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

const Chat = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // console.log
        const newSocket = io('http://localhost:8080/');
        // console.log
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to server');
        });

        newSocket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => newSocket.close();
    }, []);

    const sendMessage = () => {
        if (socket && input) {
            socket.emit('chat message', input);
            setInput('');
        }
    };

    return(
        <div>
            <div>
                <p>This is the Chat Page</p>
                <p><Link to='/home' id='home'>Home</Link></p>
                <p><Link to='/' id='landing'>Sign Out</Link></p>
            </div>
            <div>
                <h1>Chat</h1>
                <div>
                    {messages.map((msg, index) => (
                        <p key={index}>{msg}</p>
                    ))}
                </div>
                <input
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Type your message here'
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>

    )
};

export default Chat;