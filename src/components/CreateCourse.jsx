import React, { useState,useEffect } from "react";
import axios from "axios";
import "./style/style.css";
import Appbar from "./Appbar";
import {Route, useNavigate} from "react-router-dom";
import { Card, CardContent, TextField, Typography, Button, FormControlLabel, Checkbox, FormGroup, Snackbar, Alert, Box, Switch, Paper, Fade, CircularProgress } from "@mui/material";
import { School, Add, Image, AttachMoney, Publish } from '@mui/icons-material';

function CreateCourse() {
    const navigate = useNavigate();
    const [open,setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [price,setPrice] = useState("");
    const [imageLink,setImg] = useState("");
    const [published,setpublished] = useState(false);
    const [error,setError] = useState(false);
    const [errmessage,setErrmessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");

    function handleTrue(e){
        if(e.target.checked){
            setpublished(true);
        }
    }
    function handleFalse(e){
        if(e.target.checked){
            setpublished(false);
        }
    }

    function handleImageChange(url) {
        setImg(url);
        setImagePreview(url);
    }

    function handleBtn(e){
        if(title === "" || desc === "" || price === 0 || imageLink === ""){
            setErrmessage("Enter valid inputs");
            setError(true);
        }
        else{
            setError(false);
            setLoading(true);
        const access_token =  JSON.parse( localStorage.getItem("access_token"));
        axios.post("https://coursify.onrender.com/admin/courses",{
            title:title,
            description:desc,
            price:price,
            imageLink:imageLink,
            published:published
        },{
           headers:
            {
                "Content-Type":"application/json",
                Authorization: `Bearer ${access_token}`
            }
        }).then((res)=>{
            setLoading(false);
            setOpen(true);
            callback();
        })
        .catch((err)=>{
            setLoading(false);
            setErrmessage("Failed to create course. Please try again.");
            setError(true);
        })
    }
    }


    function callback(){
        setOpen(false);
        navigate('/courses');
    }
    return( 
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', py: 4 }}>
    <Appbar isLoggedIn={true} username={JSON.parse(localStorage.getItem('username'))}></Appbar>
    
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
                        Create New Course
                    </Typography>
                    <Typography 
                        variant="h6" 
                        sx={{
                            color: 'rgba(255,255,255,0.9)',
                            maxWidth: '600px',
                            mx: 'auto'
                        }}
                    >
                        Share your knowledge and create an engaging learning experience
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
                    {/* Form */}
                    <Paper className="form-container" sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                label="Course Title" 
                                placeholder="Enter an engaging course title"
                                value={title}
                                onChange={(e) => {setTitle(e.target.value); setError(false)}}
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
                                placeholder="Describe what students will learn in this course"
                                value={desc}
                                onChange={(e) => {setDesc(e.target.value); setError(false)}}
                            />
                            
                            <TextField  
                                fullWidth
                                type="number" 
                                variant="outlined" 
                                label="Price (₹)" 
                                placeholder="Set course price"
                                value={price}
                                onChange={(e) => {setPrice(e.target.value); setError(false)}}
                                InputProps={{
                                    startAdornment: <AttachMoney sx={{ mr: 1, color: '#667eea' }} />
                                }}
                            />
                            
                            <TextField  
                                fullWidth
                                type="url" 
                                variant="outlined" 
                                label="Course Image URL" 
                                placeholder="Enter image URL for course thumbnail"
                                value={imageLink}
                                onChange={(e) => {handleImageChange(e.target.value); setError(false)}}
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
                                    onChange={(e) => setpublished(e.target.checked)}
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
                            
                            {error && (
                                <Alert severity="error" sx={{ borderRadius: 2 }}>
                                    {errmessage}
                                </Alert>
                            )}
                            
                            <Button 
                                variant="contained" 
                                size="large"
                                fullWidth
                                startIcon={loading ? <CircularProgress size={20} /> : <Add />}
                                onClick={handleBtn}
                                disabled={loading}
                                sx={{ 
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 600
                                }}
                            >
                                {loading ? 'Creating Course...' : 'Create Course'}
                            </Button>
                        </Box>
                    </Paper>

                    {/* Preview */}
                    <Box sx={{ flex: 1, maxWidth: { md: '400px' } }}>
                        <Paper className="form-container">
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                                Course Preview
                            </Typography>
                            
                            <Card className="course-card" sx={{ maxWidth: '100%' }}>
                                {imagePreview ? (
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={imagePreview}
                                        alt="Course preview"
                                        onError={(e) => {
                                            e.target.src = 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400';
                                        }}
                                    />
                                ) : (
                                    <Box sx={{ 
                                        height: 200, 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        background: 'linear-gradient(135deg, #f5f5f5, #e0e0e0)'
                                    }}>
                                        <Image sx={{ fontSize: '3rem', color: '#ccc' }} />
                                    </Box>
                                )}
                                
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                        {title || 'Course Title'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                                        {desc || 'Course description will appear here...'}
                                    </Typography>
                                    <Typography variant="h6" className="price-tag">
                                        ₹{price || '0'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </Fade>
    </Container>

        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert severity="success" onClose={() => setOpen(false)}>
                Course created successfully! Redirecting...
            </Alert>
        </Snackbar>
    </Box>
    )
    }
export default CreateCourse;