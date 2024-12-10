import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

interface HeaderProps {
  name: string;
  username: string;
}

const Header: React.FC<HeaderProps> = ({ name, username }) => {
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
