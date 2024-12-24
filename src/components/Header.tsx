import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import useChatStore from '@/context/state';

interface HeaderProps {
  name: string;
  username: string;
}

const Header: React.FC<HeaderProps> = ({ name, username }) => {
  let {serverUrl , switchServer}= useChatStore(state => state)
  console.log("serverUrl : " , serverUrl)
  return (
    <AppBar position="static" color="primary">
      <Toolbar style={{ justifyContent: 'flex-end' }}>
        <Box>
          <Typography variant="body1" component="div">
            {name}
          </Typography>
          <Typography variant="caption" component="div">
            @{username}
          </Typography>
          <Typography onClick={switchServer}>{serverUrl}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
