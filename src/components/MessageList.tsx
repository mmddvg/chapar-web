import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface Message {
  id: string;
  sender: string;
  content: string;
  created_at : Date;
}

interface MessageListProps {
  chatName: string;
  messages: PvMessage[] | GroupMessage[] ;
  onSendMessage: (content: string) => void;
  setMessages: (prevMessages:any) => void
}

const MessageList: React.FC<MessageListProps> = ({ chatName, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <Paper style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Chat Header */}
      <Box padding="1rem" borderBottom="1px solid #ddd">
        <Typography variant="h6" gutterBottom>
          {chatName}
        </Typography>
      </Box>

      {/* Messages List */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    marginBottom: 2,
                    padding: '10px',
                    borderRadius: '10px',
                    backgroundColor: '#dbeafe',
                    maxWidth: '60%',
                    alignSelf: message.sender == 'You' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 'bold', color: '#1e40af', marginBottom: '5px' }}
                  >
                    {message.sender}
                  </Typography>
                  <Typography variant="body1">{message.message}</Typography>
                  <Typography variant="caption" sx={{ color: '#6b7280', textAlign: 'right', display: 'block' }}>
                    {message.created_at.toString()}
                  </Typography>
                </Box>
              ))}
            </Box>

      {/* Message Input */}
      <Box display="flex" alignItems="center" padding="1rem" borderTop="1px solid #ddd">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          sx={{ marginRight: '1rem' }}
        />
        <IconButton
          color="primary"
          onClick={handleSendMessage}
          size="large"
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            '&:hover': { backgroundColor: '#115293' },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default MessageList;
