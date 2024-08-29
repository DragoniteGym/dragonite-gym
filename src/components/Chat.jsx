/**
 * @module Chat
 * @description chat message page
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // testing user before db setup
        const user = prompt('Enter username');
        setUsername(user);
        console.log('username:', user);
        socket.emit('set username', user);

        socket.on('chat message', (msg) => {
            console.log('message received on client:', msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            console.log('sending message:', message);
            socket.emit('chat message', message);
            setMessage('');
        }
    };

    return (
        <div>
            <div>
                <p>This is the Chat Page</p>
                <p><Link to='/home' id='home'>Home</Link></p>
                <p><Link to='/' id='landing'>Sign Out</Link></p>
            </div>
            <div>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}
                            style={{
                                textAlign: msg.user === username ? 'right' : 'left',
                                alignSelf: msg.user === username ? 'flex-end' : 'flex-start',
                                listStyleType: 'none',
                            }}
                        >
                            <strong>{msg.user}</strong>: {msg.message}
                        </li>
                    ))}
                </ul>
            </div>
                <form onSubmit={sendMessage}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
    );
};

export default Chat;
