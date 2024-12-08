import React, { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Grid 
} from '@mui/material';

const AuthPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Grid 
      container 
      justifyContent="center" 
      alignItems="center" 
      style={{ height: '100vh', backgroundColor: '#f5f5f5' }}
    >
      <Paper elevation={3} style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          {tabValue === 0 ? 'Sign Up' : 'Login'}
        </Typography>
        <Tabs value={tabValue} onChange={handleChange} centered>
          <Tab label="Sign Up" />
          <Tab label="Login" />
        </Tabs>
        <Box mt={2}>
          {tabValue === 0 ? (
            <form>
              <TextField
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Password"
                margin="normal"
                variant="outlined"
                type="password"
              />
              <Button 
                fullWidth 
                variant="contained" 
                color="primary" 
                style={{ marginTop: '1rem' }}
              >
                Sign Up
              </Button>
            </form>
          ) : (
            <form>
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Password"
                margin="normal"
                variant="outlined"
                type="password"
              />
              <Button 
                fullWidth 
                variant="contained" 
                color="primary" 
                style={{ marginTop: '1rem' }}
              >
                Login
              </Button>
            </form>
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

export default AuthPage;
