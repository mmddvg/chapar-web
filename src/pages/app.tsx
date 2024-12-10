'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useJwt } from "@/context/jwt";
import { useEffect, useState } from "react";
import {  Backdrop, Box, CircularProgress, Grid2 } from "@mui/material";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import MessageList from "@/components/MessageList";
import ChatList from "@/components/ChatList";
import { Interface } from "readline";
import Loader from "@/components/Loader";
import Cookies from 'js-cookie';

export default function Home() {
    const token = Cookies.get('jwt');

  const { user } = useJwt();
  const [selectedChat, setSelectedChat] = useState<string | null>(null); // Move useState outside conditional rendering


  const [chats,setChats] = useState<Chat[]>([]);
  const [groups,setGroups] = useState<Chat[]>([]);
  const [pvMessages,setPvMessages] = useState<PvMessage[]>([])
  const [groupMessages,setGroupMessages] = useState<GroupMessage[]>([])
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!user) {
      console.log('Fetching user data...');
    }
  }, [user]);


  useEffect(() => {
    fetch("http://localhost:8080/restricted/chats",{
        method:"GET",
        headers: {
            Authorization: `Bearer ${token}`,
          }
    }).then(res => res.json()).then(res => {
        console.log("chats : " , res)
        setChats(res.users);
        setGroups(res.groups);
    })
  },[])
  
  useEffect(() => {
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
            setPvMessages(res);
        else 
        setGroupMessages(res);
    })
  },[selectedChat])




  useEffect(()=>{
    setPvMessages([])
    setGroupMessages([])
  },[activeTab])

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
            <ChatList activeTab={activeTab} setActiveTab={setActiveTab} groupChats={groups} privateChats={chats} onSelectChat={setSelectedChat} selectedChat={selectedChat}/>
        </Grid2>

        <Grid2 size={8} sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb', padding: 2 }}>
        {selectedChat ? (
          <MessageList
            chatName={chats.find((chat:any) => chat.id === selectedChat)?.name || 'Chat'}
            messages={activeTab == 0 ? pvMessages:groupMessages}
            onSendMessage={(content) => {
              // Handle sending a new message
              const newMessage = {
                id: String((activeTab == 0 ? pvMessages:groupMessages).length + 1),
                sender: 'You',
                content,
              };
              // Add the new message to the current messages
            //   setMessages((prevMessages : any) => [...prevMessages, newMessage]);
            }}
            setMessages={(prevMessages:any) => {[...prevMessages]}}
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
