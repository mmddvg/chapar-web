import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useChatStore from '@/context/state';


interface MessageListProps {
  chatName?: string;

  activeTab : 0 | 1;
  selectedChat : string;
  token : string;

}

const MessageList: React.FC<MessageListProps> = ({ chatName ,activeTab,selectedChat,token}) => {
  let socket : WebSocket;


  let {
    pushGroupMessage,
    pushPvMessage,
    setPvMessages,
    setGroupMessages,
    chatters,
    groupChats,privateChats,
    serverUrl
  } = useChatStore(state => state);

  socket = new WebSocket(`ws://${serverUrl}/message`);
  socket.onopen = () => {
    const t = JSON.stringify({ token });
    socket.send(t);
  };  
  socket.onmessage = (e => {
     let m = JSON.parse(e.data)
     if (m['action_type'] == 0){  
      if (m['target_type'] == 0){
        pushPvMessage(m["chat_id"],{id:m['id'],created_at:m['created_at'],message:m['message'],pv_id:m['chat_id'],sender_id:m['sender_id'],seen_at:new Date()})
      }else if (m['target_type'] ==1){
        pushGroupMessage(m["chat_id"],{id:m['id'],created_at:m['created_at'],message:m['message'],group_id:m['reciever_id'],sender_id:m['sender_id']})

      }

     }else if (m['action_type'] == 1){ // TODO

     }else if (m['action_type'] == 2){

     }
  })




  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      let body = {
        action_type : 0,
        target_type : activeTab,
        reciever_id : activeTab == 0?chatters.find((v) => v.pv_id == selectedChat)?.contact_id : selectedChat,
        message : newMessage
      }
      socket.send(JSON.stringify(body))
      setNewMessage('');
    }
  };

  


  useEffect(() => {
    console.log("active tab : " , activeTab);
    if (!selectedChat){
        return
    }
    fetch(`http://localhost:8080/restricted/${activeTab == 0 ? "pv" : "group"}/${selectedChat}/messages`,{
        method:"GET",
        headers: {
            Authorization: `Bearer ${token}`,
          }
    }).then(res => res.json()).then(res => {
        console.log("response ; " , res)
        if (activeTab == 0)
            setPvMessages(selectedChat,res);
        else 
        setGroupMessages(selectedChat,res);
    })
  },[activeTab,selectedChat])




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
              {(activeTab == 0? privateChats[privateChats.findIndex(d => d.id == selectedChat)].messages:groupChats[groupChats.findIndex(d => d.id == selectedChat)].messages).map((message:any) => (
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
