/**
 * @module Chat
 * @description chat message page
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null); // Use state to store socket instance

    useEffect(() => {
        const token = localStorage.getItem('token')
        const newSocket = io('http://localhost:3000', {
            transports: ['websocket'],
            query: { token },
        });
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Socket connected');
        });
    
        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
        });
    
        newSocket.on('chat message', (msg) => {
            console.log('Received chat message event');
            console.log('username:', msg.username);
            console.log('message received on client:', msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        const fetchUsername = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/auth/session', {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('data.username', data.username);
                    setUsername(data.username);
                    newSocket.emit('set username', data.username);
                } else {
                    navigate('/home');
                }
            } catch (error) {
                console.error('Error fetching session data:', error);
                alert('An error occurred while fetching session data.');
            }
        };

        fetchUsername();

        return () => {
            newSocket.off('chat message');
            newSocket.disconnect();
        };
    }, [navigate]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            console.log('username', username)
            console.log('sending message:', message);
            socket.emit('chat message', { username, message });
            setMessage('');
        } else {
            console.error('Socket is not initialized');
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
                                textAlign: msg.username === username ? 'right' : 'left',
                                alignSelf: msg.username === username ? 'flex-end' : 'flex-start',
                                listStyleType: 'none',
                            }}
                        >
                            <strong>{msg.username}</strong>
                            <span style={{ fontSize: '0.6em', color: 'gray' }}> {msg.timestamp} </span> <br />
                            {msg.message}
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
