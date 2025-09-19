import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, TextField, Button, Link, Typography, Switch, CircularProgress, Box, Alert, Fade, Paper } from "@mui/material";
import { Route, useNavigate} from "react-router-dom";
import "./style/style.css"
import Appbar from "./Appbar";
import { Login as LoginIcon, Person, AdminPanelSettings } from '@mui/icons-material';

function Login() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [password,setPass] = useState("");
    const [error,setError] = useState(false);
    const [errmessage,setErrmessage] = useState("");
    const [usertype,setUsertype] = useState(true);
    const [loading,setLoading] = useState(false);

    const [showError, setShowError] = useState(false);

    function handleBtn(){
        setLoading(true);
        setShowError(false);
        if(email === "" || password === ""){
            setError(true);
            setShowError(true);
            setErrmessage("You have entered an invalid username or password");
            setLoading(false);
            return;
        }
        else{
            setError(false);
            setErrmessage("");
        }
        if(usertype === true){
            axios.post("https://coursify.onrender.com/users/login",{},{
                headers:{
                username: email,
                password:password
                }
            }).then((res)=>{
                console.log(res);
                setLoading(false);
                localStorage.setItem('token',JSON.stringify(res.data.token));
                localStorage.setItem('user',JSON.stringify(email));
                navigate('/user/courses');
            }).catch((err)=>{
                setError(true);
                setLoading(false);
                setShowError(true);
                setErrmessage("You have entered an invalid username or password");
            })
        }
        else if(usertype === false){
        axios.post("https://coursify.onrender.com/admin/login",{},{
            headers:{
                username: email,
                password: password
            }
        }).then((res)=>{
            console.log(res);
            localStorage.setItem(`access_token`,JSON.stringify(res.data.token));
            localStorage.setItem(`username`,JSON.stringify(email));
            setLoading(false);
            navigate("/courses");
        }).catch((err)=>{
            setError(true);
            setLoading(false);
            setShowError(true);
            setErrmessage("You have entered an invalid username or password");
        })
     }   
    }

    function handleUser(check){
        if(check){
            setUsertype(false);
        }
        else{
            setUsertype(true);
        }
    }

    return <>
        <Appbar />
        <Box sx={{ 
            minHeight: 'calc(100vh - 80px)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: 2
        }}>
            <Fade in timeout={800}>
                <Paper 
                    elevation={24}
                    className="glass-card"
                    sx={{
                        width: { xs: '90%', sm: '400px' },
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <LoginIcon sx={{ fontSize: '3rem', color: '#667eea', mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#333', mb: 1 }}>
                            Welcome Back
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#666' }}>
                            Sign in to continue your learning journey
                        </Typography>
                    </Box>

                    {loading ? (
                        <Box className="loading-container" sx={{ py: 4 }}>
                            <CircularProgress size={40} sx={{ color: '#667eea' }} />
                            <Typography className="loading-text">Signing you in...</Typography>
                        </Box>
                    ) : (
                        <Box sx={{ width: '100%' }}>
                            {/* User Type Toggle */}
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                mb: 3,
                                p: 1,
                                borderRadius: 2,
                                background: 'rgba(102, 126, 234, 0.1)'
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Person sx={{ color: usertype ? '#667eea' : '#999' }} />
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            color: usertype ? '#667eea' : '#999',
                                            fontWeight: usertype ? 600 : 400
                                        }}
                                    >
                                        Student
                                    </Typography>
                                </Box>
                                
                                <Switch 
                                    checked={!usertype}
                                    onChange={(e) => handleUser(e.target.checked)}
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: '#667eea',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: '#667eea',
                                        },
                                    }}
                                />
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <AdminPanelSettings sx={{ color: !usertype ? '#667eea' : '#999' }} />
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            color: !usertype ? '#667eea' : '#999',
                                            fontWeight: !usertype ? 600 : 400
                                        }}
                                    >
                                        Admin
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Error Alert */}
                            <Fade in={showError}>
                                <Box sx={{ mb: 2 }}>
                                    {error && (
                                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                                            {errmessage}
                                        </Alert>
                                    )}
                                </Box>
                            </Fade>

                            <TextField 
                                onKeyDown={(e)=>{
                                    if(e.key === 'Enter'){
                                        handleBtn();
                                    }
                                }}
                                autoComplete="off"
                                required
                                fullWidth
                                variant="outlined" 
                                label="Email Address" 
                                type="email" 
                                onChange={(e)=>{setEmail(e.target.value); setError(false); setShowError(false)}}
                                margin="normal"
                                placeholder="Enter your email"
                                sx={{ mb: 2 }}
                            />
<TextField 
 onKeyDown={(e)=>{
    if(e.key === 'Enter'){
        handleBtn();
    }
 }}
autoComplete="off"
required
fullWidth
variant="outlined" 
label="Password" 
type="password" 
                                placeholder="Enter your password"
                                onChange={(e)=>{setPass(e.target.value); setError(false); setShowError(false)}}
                                margin="normal" 
                                sx={{ mb: 3 }}
                            />

                            <Button 
                                size="large"  
                                variant="contained" 
                                fullWidth
                                onClick={handleBtn}
                                disabled={loading}
                                sx={{ 
                                    py: 1.5, 
                                    mb: 2,
                                    fontSize: '1.1rem',
                                    fontWeight: 600
                                }}
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </Button>
                            
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" sx={{ color: '#666' }}>
                                    Don't have an account?{' '}
                                    <Button 
                                        variant="text" 
                                        onClick={() => navigate('/register')}
                                        sx={{ 
                                            color: '#667eea', 
                                            fontWeight: 600,
                                            textTransform: 'none'
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Paper>
            </Fade>
        </Box>
    </>
}

export default Login;