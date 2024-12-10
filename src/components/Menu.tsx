import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  ListItemButton,
} from '@mui/material';
import { Menu as MenuIcon, Group, Contacts, Logout } from '@mui/icons-material';

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <Contacts />
            </ListItemIcon>
            <ListItemText primary="Contacts" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="New Group" />
          </ListItemButton>
          <Divider />
          <ListItemButton >
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default Menu;
