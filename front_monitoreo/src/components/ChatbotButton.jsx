import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';
import DrawerIndicador from './DrawerIndicator';
import Chatbot from './ChatBot';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';

const ChatbotButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    return (
        <>
            <Fab 
                color="primary" 
                aria-label="chat"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000
                }}
                onClick={toggleDrawer(true)}
            >
                <ChatIcon />
            </Fab>
            <DrawerIndicador
                anchor="right"
                open={isOpen}
                toggleDrawer={toggleDrawer}
                content={
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h6">
                                    Chatbot
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Box sx={{ flex: 1, overflow: 'hidden' }}>
                            <Chatbot />
                        </Box>
                    </Box>
                }
            />
        </>
    );
};

export default ChatbotButton;