'use client';

import { useJwt } from "@/context/jwt";
import { useEffect, useState } from "react";
import {  Backdrop, Box, CircularProgress, Grid2 } from "@mui/material";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import MessageList from "@/components/MessageList";
import ChatList from "@/components/ChatList";
import Loader from "@/components/Loader";
import Cookies from 'js-cookie';
import useChatStore from "@/context/state";

export default function Home() {
  const token : string = Cookies.get('jwt')??"";

  const { user } = useJwt();
  const [selectedChat, setSelectedChat] = useState<string | null>(null); 


  const [activeTab, setActiveTab] = useState<0|1>(0);
  
  useEffect(() => {
    if (!user) {
      console.log('Fetching user data...');
    }
  }, [user]);


  let {addGroupChat, 
   addPrivateChat, 
   addChatter, 
   addNonContactChatter,
   privateChats, 
   groupChats, 
   chatters} = useChatStore(state => state);
  

  useEffect(() => {
    fetch("http://localhost:8080/restricted/chats",{
        method:"GET",
        headers: {
            Authorization: `Bearer ${token}`,
          }
    }).then(res => res.json()).then(res => {
        for (let i = 0;i< res.pvs.length;i++){
          addPrivateChat({...res.pvs[i],messages:[]})
        }
        for (let i = 0;i< res.groups.length;i++){
          addGroupChat({...res.groups[i],messages:[]})
        }
    });

    fetch("http://localhost:8080/restricted/contacts",{
      method:"GET",
      headers: {
          Authorization: `Bearer ${token}`,
        }
  }).then(res => res.json()).then(res => {
    console.log("response : " , res);
    if (res){
      for (let i of res){
        addChatter(i,true);
      }
    }
      
  });
  },[])

  useEffect(() => {
    for (let i of privateChats){
    fetch(`http://localhost:8080/restricted/user/${i.user_id}`,{
      method:"GET",
      headers: {
          Authorization: `Bearer ${token}`,
        }
  }).then(d => d.json()).then(d => addNonContactChatter({...d,contact_id:d.id},i.id)).catch(console.error)
}
  },[privateChats])

  if (!user) {
    return <Loader/>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f3f4f6' }}>
      <Header name={user.name} username={user.username} />
      <Grid2 container sx={{ flexGrow: 1 }}>
        <Grid2 size={1} sx={{ position: 'relative', zIndex: 10 }}>
          <Menu />
        </Grid2>

        
        <Grid2
            size={3}
            sx={{
            height: '100vh',
            overflowY: 'hidden', 
            backgroundColor: '#fff',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            }}>
            <ChatList activeTab={activeTab} setActiveTab={setActiveTab} onSelectChat={setSelectedChat} selectedChat={selectedChat}/>
        </Grid2>

        <Grid2 size={8} sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb', padding: 2 }}>
        {selectedChat ? (
          <MessageList
          selectedChat={selectedChat}
          token={token}
          activeTab={activeTab}
          chatName={activeTab == 0 ? (selectedChat ? (chatters.find(d => d.pv_id == selectedChat)?.name) : "Chats") : (groupChats.find((chat:any) => chat.id == selectedChat)?.name || 'Groups')}
          />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexGrow={1}
            sx={{ backgroundColor: '#f3f4f6' }}
          >
            Select a chat to start messaging
          </Box>
        )}
      </Grid2>
      </Grid2>
    </Box>
  );
}
