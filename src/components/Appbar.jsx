import React from 'react';
import { AppBar, ButtonGroup, Typography, Button, Link, Avatar, Chip, Box } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import { Person, ExitToApp, School } from '@mui/icons-material';

function Appbar({isLoggedIn,username}){
  const navigate = useNavigate();
  function handleClick(e){
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }
  return (
  <AppBar 
    position='sticky' 
    sx={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      height: "80px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      borderBottom: '1px solid rgba(102, 126, 234, 0.1)'
    }}
  >
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: "5%" }}>
          <School sx={{ color: '#667eea', fontSize: '2rem', marginRight: 1 }} />
          <Link 
            underline='none' 
            sx={{
              fontWeight: "700",
              fontSize: "1.8rem",
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease'
              }
            }} 
            onClick={(e)=>{navigate('/')}}
          >
            Coursify
          </Link>
        </Box>
        <Box sx={{ marginRight: "5%", display: "flex", alignItems: "center", gap: 2 }}>
        </Link>
        <div style={{marginRight:"10%",display:"flex"}} >
        {isLoggedIn ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Chip 
            avatar={<Avatar sx={{ bgcolor: '#667eea' }}><Person /></Avatar>}
            label={`Welcome, ${username}!`}
            variant="outlined"
            sx={{ 
              borderColor: '#667eea',
              color: '#667eea',
              fontWeight: 500,
              '& .MuiChip-avatar': {
                color: 'white'
              }
            }}
          />
          <Button 
            variant='contained' 
            startIcon={<ExitToApp />}
            onClick={handleClick}
            sx={{
              background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #d32f2f 0%, #c62828 100%)',
              }
            }}
          >
            Logout
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button 
            variant='outlined' 
            onClick={() =>{navigate('/register')}}
            sx={{ minWidth: '100px' }}
          >
            Sign Up
          </Button>
          <Button 
            variant='contained' 
            onClick={() =>{navigate('/login')}}
            sx={{ minWidth: '100px' }}
          >
            Login
          </Button>
        </Box>
      )}
        </Box>
  </AppBar>
  )
}

export default Appbar;