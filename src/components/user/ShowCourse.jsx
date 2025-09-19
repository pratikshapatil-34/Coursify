import React, { useEffect, useState } from 'react'
import Appbar from '../Appbar';
import axios from 'axios';
import '../style/style.css'
import { CircularProgress,Grid, Card, CardContent,Typography,CardMedia,Button, Box, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faShoppingBasket, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { School, Store, PlayArrow } from '@mui/icons-material';

const ShowCourse = () => {
  const [course,setCourse] = useState([]);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState("");

    useEffect(()=>{
      setLoading(true);
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
        navigate('/login');
        return;
      }
      
      axios.get('https://coursify.onrender.com/users/purchasedCourses',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then((res)=>{
        setLoading(false);
        setCourse(res.data.purchasedCourses);
      }).catch((err)=>{
        setError("Failed to load your courses.");
        setLoading(false);
      })
    }, [navigate])

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
    <Appbar isLoggedIn={true} username={JSON.parse(localStorage.getItem('user'))}></Appbar>
    
    {loading ? (
      <Box className="loading-container">
        <CircularProgress size={60} sx={{ color: 'white' }} />
        <Typography className="loading-text" sx={{ color: 'white', fontSize: '1.2rem' }}>
          Loading your courses...
        </Typography>
      </Box>
    ) : (
      <Box sx={{ pb: 4 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h3" className="section-title" sx={{ color: 'white', mb: 2 }}>
            <School sx={{ fontSize: '3rem', mr: 2, verticalAlign: 'middle' }} />
            My Learning Journey
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3, maxWidth: '600px', mx: 'auto' }}>
            Continue your learning with your purchased courses
          </Typography>
          <Button 
            startIcon={<Store />} 
            variant="contained" 
            size="large"
            onClick={() => navigate('/user/courses')}
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
            Explore More Courses
          </Button>
        </Box>
        
        {course.length === 0 ? (
          <Box className="empty-state">
            <School className="empty-state-icon" sx={{ color: 'white' }} />
            <Typography variant="h5" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
              No courses purchased yet
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3 }}>
              Start your learning journey by purchasing your first course
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<Store />}
              onClick={() => navigate('/user/courses')}
              sx={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white'
              }}
            >
              Browse Courses
            </Button>
          </Box>
        ) : (
          <Box className="courses-grid" sx={{ gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
            {course.map((data, index) => (
              <Fade in timeout={600 + index * 100} key={data._id}>
                <div>
                  <CourseCard 
                    id={data._id} 
                    title={data.title} 
                    description={data.description} 
                    imgLink={data.imageLink} 
                    price={data.price}
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

  function CourseCard(props){
    const navigate = useNavigate();
    return(
      <Card className="course-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
          
          <Button 
            variant="contained" 
            fullWidth
            size="large"
            startIcon={<PlayArrow />}
            onClick={() => navigate(`/user/courses/${props.id}`)}
            sx={{ 
              mt: 'auto',
              py: 1.5,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              }
            }}
          >
            Continue Learning
          </Button>
        </CardContent>
      </Card>
    )
  }
}

export default ShowCourse;