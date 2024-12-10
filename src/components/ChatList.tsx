import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  Avatar,
  ListItemAvatar,
} from '@mui/material';
import Loader from './Loader';


interface ChatListProps {
  privateChats: Chat[];
  groupChats: Chat[];
  onSelectChat: (id: string) => void;
  selectedChat: string | null;
  activeTab : number;
  setActiveTab : (status : number) => void
}

const ChatList: React.FC<ChatListProps> = ({
  privateChats,
  groupChats,
  onSelectChat,
  selectedChat,
  activeTab,
  setActiveTab,
}) => {

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const chatsToDisplay = activeTab === 0 ? privateChats : groupChats;

//   if (!privateChats || !groupChats) {
//     return <Loader />;
//   }

  return (
    <Paper style={{ padding: '1rem', height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Chats
      </Typography>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Private Chats" />
        <Tab label="Groups" />
      </Tabs>
      <div style={{ height: 'calc(100vh - 250px)', overflowY: 'auto' }}>
        <List>
          {chatsToDisplay.map((chat) => (
            <ListItemButton
              key={chat.id}
              selected={chat.id === selectedChat}
              onClick={() => onSelectChat(chat.id)}
              sx={{
                padding: '10px',
                borderRadius: '5px',
                margin: '5px',
                '&:hover': { backgroundColor: '#e3e3e3' },
                backgroundColor: chat.id === selectedChat ? '#e0e7ff' : 'transparent',
              }}
            >
              <ListItemAvatar>
                <Avatar alt={chat.name} src="/placeholder-image.png" />
              </ListItemAvatar>
              <ListItemText
                primary={chat.name}
                primaryTypographyProps={{
                  fontWeight: chat.id === selectedChat ? 'bold' : 'normal',
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </div>
    </Paper>
  );
};

export default ChatList;
