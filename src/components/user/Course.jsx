import React from 'react'
import { Card,CardMedia,Typography,CardContent,Button,Snackbar,Alert, Box, Chip, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faGift } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCart, School, CheckCircle } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Course = (props) => {

  const navigate = useNavigate();
  const [open,setOpen] = useState(false);
  const [on,setOn] = useState(false);
  const [bought,setBought] = useState(false);
  const [loading,setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  function handleClickBuy(id){
    setPurchasing(true);
    const token = JSON.parse(localStorage.getItem('token'));
    const res = axios.post(`https://coursify.onrender.com/users/courses/${id}`,{},{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res)=>{
      setPurchasing(false);
      setOpen(true);
      setBought(true);
    }).catch((err)=>{
      setPurchasing(false);
      setOn(true);
      setBought(true);
    })
  }
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };
  
  const handleCloseOn = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOn(false);
  };
  

  return (
    <>
      <Card className="course-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Purchase Status Indicator */}
        {(props.isPurchased || bought) && (
          <Chip 
            icon={<CheckCircle />}
            label="Purchased"
            className="status-indicator status-published"
            size="small"
          />
        )}
        
        <CardMedia  
          height={220}
          component="img"
          sx={{
            objectFit: "cover",
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
          image={props.imgLink}
          onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          <Typography 
            variant="h5" 
            sx={{
              fontWeight: 700,
              mb: 2,
              color: '#333',
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {props.title}
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{
              color: '#666',
              mb: 3,
              flexGrow: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.5
            }}
          >
            {props.description}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Typography 
              variant="h5" 
              className="price-tag"
              sx={{ fontWeight: 800 }}
            >
              ₹{props.price}
            </Typography>
          </Box>
          
          <Box sx={{ mt: 'auto' }}>
            {props.isPurchased || bought ? (
              <Button 
                onClick={() => navigate(`/user/courses/${props.id}`)} 
                startIcon={<School />} 
                variant="contained"
                fullWidth
                size="large"
                sx={{ 
                  py: 1.5,
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #45a049 0%, #3d8b40 100%)',
                  }
                }}
              >
                Start Learning
              </Button>
            ) : (
              <Button 
                variant="contained"  
                fullWidth 
                size="large"
                startIcon={purchasing ? <CircularProgress size={20} /> : <ShoppingCart />}
                onClick={() => handleClickBuy(props.id)}
                disabled={purchasing}
                sx={{ 
                  py: 1.5,
                  fontWeight: 600
                }}
              >
                {purchasing ? 'Processing...' : 'Buy Now'}
              </Button>
            )}
          </Box>
        </CardContent>
        
        {/* Success Snackbar */}
        <Snackbar 
          open={open} 
          autoHideDuration={4000} 
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Course purchased successfully! 🎉
          </Alert>
        </Snackbar>
        
        {/* Error Snackbar */}
        <Snackbar 
          open={on} 
          autoHideDuration={4000} 
          onClose={handleCloseOn}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseOn} severity="info" sx={{ width: '100%' }}>
            You already own this course!
          </Alert>
        </Snackbar>
      </Card>
    </>
  )
}

export default Course;