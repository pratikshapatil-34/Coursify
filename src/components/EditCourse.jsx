import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom"
import "./style/style.css"
import Appbar from "./Appbar"
import { Switch,Typography,Card,CardContent, TextField,FormGroup,FormControlLabel,Button,Checkbox, CircularProgress, Box, Paper, Fade, Alert, Snackbar, CardMedia} from "@mui/material";
import { School, Save, Image, AttachMoney, Publish } from '@mui/icons-material';

function EditCourse(){
  const navigate = useNavigate();
  let {id} = useParams();
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [price,setPrice] =  useState(null);
  const [img,setImg] = useState("");
  const [published,setPublished] = useState(false);
  const [isLoading,setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(()=>{
    setIsLoading(true);
    const access_token = JSON.parse(localStorage.getItem('access_token'));
    if (!access_token) {
      navigate('/login');
      return;
    }
    
    axios.get(`https://coursify.onrender.com/admin/courses/${id}`,{
      headers:
      {
        Authorization: `Bearer ${access_token}`
      }
    }).then((res)=>{
      setTitle(res.data.title);
      setDesc(res.data.description);
      setPrice(res.data.price);
      setImg(res.data.imageLink);
      setPublished(res.data.published);
      setIsLoading(false);
    }).catch((err)=>{
      setError("Failed to load course details.");
      setShowError(true);
      setIsLoading(false);
    })
  }, [id, navigate])

  function handleClick(e){
    if (!title || !desc || !price || !img) {
      setError("Please fill in all fields.");
      setShowError(true);
      return;
    }
    
    setSaving(true);
    const access_token = JSON.parse(localStorage.getItem('access_token'));
    axios.put(`https://coursify.onrender.com/admin/courses/${id}`,{
      "title":title,
      "description":desc,
      "price":price,
      "imageLink":img,
      "published":published
    },{
      headers:{
        Authorization : `Bearer ${access_token}`
      }
    }).then((res)=>{
      setSaving(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/courses');
      }, 1500);
    }).catch((err)=>{
      setSaving(false);
      setError("Failed to update course. Please try again.");
      setShowError(true);
    })
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', py: 4 }}>
    <Appbar isLoggedIn={true} username={JSON.parse(localStorage.getItem('username'))}></Appbar>

    {/* Snackbars */}
    <Snackbar 
      open={success} 
      autoHideDuration={4000} 
      onClose={() => setSuccess(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity="success" onClose={() => setSuccess(false)}>
        Course updated successfully! Redirecting...
      </Alert>
    </Snackbar>

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

    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Fade in timeout={800}>
        <Box>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <School sx={{ fontSize: '3rem', color: 'white', mb: 2 }} />
            <Typography 
              variant="h3" 
              sx={{
                fontWeight: 800,
                color: 'white',
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              Edit Course
            </Typography>
            <Typography 
              variant="h6" 
              sx={{
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Update your course details and settings
            </Typography>
          </Box>

          {isLoading ? (
            <Box className="loading-container">
              <CircularProgress size={60} sx={{ color: 'white' }} />
              <Typography className="loading-text" sx={{ color: 'white', fontSize: '1.2rem' }}>
                Loading course details...
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
              {/* Preview */}
              <Box sx={{ flex: 1, maxWidth: { md: '400px' } }}>
                <Paper className="form-container">
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                    Course Preview
                  </Typography>
                  <CourseCard title={title} description={desc} price={price} imageLink={img} published={published} />
                </Paper>
              </Box>

              {/* Form */}
              <Paper className="form-container" sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField 
                    fullWidth 
                    variant="outlined" 
                    label="Course Title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    InputProps={{
                      startAdornment: <School sx={{ mr: 1, color: '#667eea' }} />
                    }}
                  />
                  
                  <TextField  
                    fullWidth 
                    multiline 
                    rows={4}
                    variant="outlined" 
                    label="Course Description" 
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  
                  <TextField  
                    fullWidth
                    type="number" 
                    variant="outlined" 
                    label="Price (₹)" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    InputProps={{
                      startAdornment: <AttachMoney sx={{ mr: 1, color: '#667eea' }} />
                    }}
                  />
                  
                  <TextField  
                    fullWidth
                    type="url" 
                    variant="outlined" 
                    label="Course Image URL" 
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    InputProps={{
                      startAdornment: <Image sx={{ mr: 1, color: '#667eea' }} />
                    }}
                  />
                  
                  {/* Publish Toggle */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: 2,
                    background: 'rgba(102, 126, 234, 0.1)'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Publish sx={{ color: '#667eea' }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Publish Course
                      </Typography>
                    </Box>
                    <Switch 
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#667eea',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#667eea',
                        },
                      }}
                    />
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    size="large"
                    fullWidth
                    startIcon={saving ? <CircularProgress size={20} /> : <Save />}
                    onClick={handleClick}
                    disabled={saving}
                    sx={{ 
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600
                    }}
                  >
                    {saving ? 'Updating Course...' : 'Update Course'}
                  </Button>
                </Box>
              </Paper>
            </Box>
          )}
        </Box>
      </Fade>
    </Container>
    </Box>
  )
 }

function CourseCard({ title, description, price, imageLink, published }){
  return(
    <Card className="course-card" sx={{ position: 'relative' }}>
      {/* Status Indicator */}
      <Chip 
        icon={published ? <CheckCircle /> : <Schedule />}
        label={published ? 'Published' : 'Draft'}
        className={`status-indicator ${published ? 'status-published' : 'status-draft'}`}
        size="small"
      />
      
      <CardMedia
        component="img"
        height="200"
        image={imageLink}
        alt="Course preview"
        onError={(e) => {
          e.target.src = 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400';
        }}
      />
      
      <CardContent sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {title || 'Course Title'}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#666', 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {description || 'Course description will appear here...'}
        </Typography>
        <Typography variant="h6" className="price-tag">
          ₹{price || '0'}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default EditCourse;  