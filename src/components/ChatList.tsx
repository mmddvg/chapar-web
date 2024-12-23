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
import useChatStore from '@/context/state';


interface ChatListProps {
  onSelectChat: (id: string) => void;
  selectedChat: string | null;
  activeTab : number;
  setActiveTab : (status : 0 | 1) => void
}

const ChatList: React.FC<ChatListProps> = ({
  onSelectChat,
  selectedChat,
  activeTab,
  setActiveTab,
}) => {
  let {chatters} = useChatStore(state => state);

  const handleTabChange = (event: React.SyntheticEvent, newValue: 0 | 1) => {
    setActiveTab(newValue);
  };
  let privateChats = useChatStore(state => state.privateChats)
  let groupChats = useChatStore(state => state.groupChats)

  console.log("selected chat : " , selectedChat)
  console.log("chatters : " , chatters)
  const name = selectedChat && activeTab == 0 ?chatters.find(d => d.pv_id==selectedChat)?.name:"not found"; 

  console.log("name : " , name);
  const chatsToDisplay = activeTab === 0 ? privateChats : groupChats;

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
          {chatsToDisplay.map((chat,i) => (
            <ListItemButton
              key={i}
              selected={chat.id == selectedChat}
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
                <Avatar alt={chatters.find(d => d.pv_id == chat.id)?.name} src="/placeholder-image.png" />
              </ListItemAvatar>
              <ListItemText
                primary={chatters.find(d => d.pv_id == chat.id)?.name}
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
