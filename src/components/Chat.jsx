/**
 * @module Chat
 * @description chat message page
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { ChatContainer, MessageList, MessageItem, MessageHeader, Username, Timestamp, MessageContent, InputContainer, Input, SendButton } from '../styles/ChatStyles';
import { Button, Typography, List } from '@mui/material';


const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/home');
            return;
        }

        const newSocket = io('http://localhost:3000', {
            transports: ['websocket'],
            query: { token },
        });
        setSocket(newSocket);

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

        newSocket.on('chat message', (msg) => {
            console.log('Received chat message:', msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            newSocket.off('chat message');
            newSocket.disconnect();
        };
    }, [navigate]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            socket.emit('chat message', { username, message });
            setMessage('');
        } else {
            console.error('Message cannot be empty');
        }
    };

    return (
        <ChatContainer>
            <Typography variant="h4" gutterBottom>
                Hey Bro!
            </Typography>
            <Typography variant="body1">
                <Link to="/home">Home</Link> | <Link to="/">Sign Out</Link>
            </Typography>
            <MessageList>
                <List>
                    {messages.map((msg, index) => (
                        <MessageItem
                            key={index}
                            owner={msg.username === username ? 'own' : 'other'}
                        >
                            <MessageHeader>
                                <Username>{msg.username}</Username>
                                <Timestamp>{msg.timestamp}</Timestamp>
                            </MessageHeader>
                            <MessageContent>{msg.message}</MessageContent>
                        </MessageItem>
                    ))}
                </List>
            </MessageList>
            <InputContainer onSubmit={sendMessage}>
                <Input
                    variant="outlined"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <SendButton type="submit" variant="contained">
                    Send
                </SendButton>
            </InputContainer>
        </ChatContainer>
    );
};

export default Chat;
