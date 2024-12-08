import React, { useState } from 'react';
import { Box, Tabs, Tab, TextField, Button, Typography, Paper, Grid2 } from '@mui/material';
import { useJwt } from '../context/jwt';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const baseUrl = "http://localhost:8080"

const AuthPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({ name: '', username: '', password: '' });
  const { setJwt } = useJwt();
  const router = useRouter();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const endpoint = baseUrl +( tabValue === 0 ? '/signup' : '/login');
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log("response : ",data)
    if (response.ok) {
      Cookies.set('jwt', data.token); 
      setJwt(data.token);
      router.push('/app');
    } else {
      alert(data.message || 'Something went wrong!');
    }
  };

  return (
    <Grid2 container justifyContent="center" alignItems="center" style={{ height: '100vh', backgroundColor: '#f5f5f5' }}>
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
                name="name"
                label="Name"
                margin="normal"
                variant="outlined"
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                name="user_name"
                label="Username"
                margin="normal"
                variant="outlined"
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                name="password"
                label="Password"
                margin="normal"
                variant="outlined"
                type="password"
                onChange={handleInputChange}
              />
              <Button fullWidth variant="contained" color="primary" style={{ marginTop: '1rem' }} onClick={handleSubmit}>
                Sign Up
              </Button>
            </form>
          ) : (
            <form>
              <TextField
                fullWidth
                name="user_name"
                label="Username"
                margin="normal"
                variant="outlined"
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                name="password"
                label="Password"
                margin="normal"
                variant="outlined"
                type="password"
                onChange={handleInputChange}
              />
              <Button fullWidth variant="contained" color="primary" style={{ marginTop: '1rem' }} onClick={handleSubmit}>
                Login
              </Button>
            </form>
          )}
        </Box>
      </Paper>
    </Grid2>
  );
};

export default AuthPage;
