import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Appbar from '../Appbar';
import { Typography,Button,Card,CardContent,CardMedia, Snackbar, Alert, CircularProgress, Box, Fade } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoltLightning,faCartShopping, faBookOpen} from '@fortawesome/free-solid-svg-icons';
import { School, ShoppingCart, LibraryBooks } from '@mui/icons-material';
import Course from './Course';
import { useNavigate } from 'react-router-dom';
import '../style/style.css'

const GetCourses = () => {
  const [courses,setCourses] = useState([]);
  const [loading,setLoading] = useState(true);
  const [purCourses,setPurCourses] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(()=>{
    setLoading(true);
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      navigate('/login');
      return;
    }
    
    axios.get("https://coursify.onrender.com/users/courses",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res)=>{
      setCourses(res.data.courses);
      setPurCourses(res.data.purchasedCourses);
      setLoading(false);
    }).catch((err)=>{
      setError("Failed to load courses. Please try again.");
      setShowError(true);
      setLoading(false);
    })
  }, [navigate])


  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
    <Appbar isLoggedIn={true} username={JSON.parse(localStorage.getItem('user'))}></Appbar>
    
    {/* Error Snackbar */}
    <Snackbar 
      open={showError} 
      autoHideDuration={6000} 
      onClose={() => setShowError(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity="error" onClose={() => setShowError(false)}>
        {error}
      </Alert>
    </Snackbar>

    {loading ? (
      <Box className="loading-container">
        <CircularProgress size={60} sx={{ color: 'white' }} />
        <Typography className="loading-text" sx={{ color: 'white', fontSize: '1.2rem' }}>
          Loading courses...
        </Typography>
      </Box>
    ) : (
      <Box sx={{ pb: 4 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h3" className="section-title" sx={{ color: 'white', mb: 2 }}>
            <School sx={{ fontSize: '3rem', mr: 2, verticalAlign: 'middle' }} />
            Explore Courses
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3, maxWidth: '600px', mx: 'auto' }}>
            Discover amazing courses and expand your knowledge
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            startIcon={<LibraryBooks />}
            onClick={() => navigate('/user/purchasedcourses')}
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
              }
            }}
          >
            View Your Courses
          </Button>
        </Box>
        
        {courses.length === 0 ? (
          <Box className="empty-state">
            <School className="empty-state-icon" sx={{ color: 'white' }} />
            <Typography variant="h5" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
              No courses available
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Check back later for new courses
            </Typography>
          </Box>
        ) : (
          <Box className="courses-grid">
            {courses.map((c, index) => (
              <Fade in timeout={600 + index * 100} key={c._id}>
                <div>
                  <Course 
                    title={c.title} 
                    description={c.description} 
                    price={c.price} 
                    imgLink={c.imageLink} 
                    id={c._id} 
                    isPurchased={purCourses.includes(c._id)}
                  />
                </div>
              </Fade>
            ))}
          </Box>
        )}
      </Box>
    )}
    </Box>
  )
}

export default GetCourses