import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import AndroidIcon from '@mui/icons-material/Android';
import { getBotResponse } from './BotResponse';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        setMessages(storedMessages);
    }, []);

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    const handleSend = () => {
        if (input.trim() !== '') {
            const newMessage = { text: input, sender: 'user' };
            setMessages(prevMessages => [...prevMessages, newMessage]);

            const botResponse = getBotResponse(input);
            setTimeout(() => {
                const botMessage = { text: botResponse, sender: 'bot' };
                setMessages(prevMessages => [...prevMessages, botMessage]);
            }, 500);

            setInput('');
        }
    }

    const getIconForSender = (sender) => {
        return sender === 'user' ? <PersonIcon /> : <AndroidIcon />;
    }

    return (
        <Box sx={{ height: '90vh', display: 'flex', flexDirection: 'column' }}>
            <Paper elevation={3} sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
                {messages.map((message, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start', mb: 1 }}>
                        <Paper elevation={1} sx={{ p: 1, bgcolor: message.sender === 'user' ? '#3DE77D' : '#36ab2b' }}>
                            <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
                                {getIconForSender(message.sender)}
                                {message.text}
                            </Typography>
                        </Paper>
                    </Box>
                ))}
                <div ref={messagesEndRef} />
            </Paper>
            <Box sx={{ display: 'flex', p: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Escribe tu mensaje aquí..."
                    sx={{
                        borderColor: '#36ab2b',
                        '& fieldset': {
                            borderColor: '#36ab2b',
                        },
                        '&:hover fieldset': {
                            borderColor: '#36ab2b',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#36ab2b',
                        },
                    }}
                />
                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleSend}
                    sx={{
                        ml: 1,
                        bgcolor: '#36ab2b',
                        color: 'white',
                        '&:hover': {
                            bgcolor: '#0C530F',
                        },
                    }}
                >
                    Enviar
                </Button>
            </Box>
        </Box>
    );

}

export default Chatbot;
