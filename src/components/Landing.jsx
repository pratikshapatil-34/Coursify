
import * as React from "react";
import Appbar from "./Appbar";
import videoBg from '../assets/vid.mp4'
import { Button, ButtonGroup, Typography, Box, Container, Fade, Grow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { School, PlayArrow, TrendingUp, People } from '@mui/icons-material';


function Landing() {
    const navigate = useNavigate();
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        setLoaded(true);
    }, []);

    return(
        <>
        <Appbar />
        <Box sx={{ position: 'relative', height: 'calc(100vh - 80px)', overflow: 'hidden' }}>
            <video 
                src={videoBg} 
                autoPlay 
                muted 
                loop  
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: 'brightness(0.7)'
                }}
            />
            
            {/* Overlay */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Container maxWidth="lg">
                    <Fade in={loaded} timeout={1000}>
                        <Box sx={{ textAlign: 'center', color: 'white' }}>
                            <Grow in={loaded} timeout={1500}>
                                <School sx={{ fontSize: '4rem', mb: 2, opacity: 0.9 }} />
                            </Grow>
                            
                            <Fade in={loaded} timeout={2000}>
                                <Typography 
                                    variant="h2" 
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                                    }}
                                >
                                    Welcome to the Future of Learning
                                </Typography>
                            </Fade>
                            
                            <Fade in={loaded} timeout={2500}>
                                <Typography 
                                    variant="h5" 
                                    sx={{
                                        mb: 4,
                                        opacity: 0.95,
                                        fontSize: { xs: '1.2rem', md: '1.5rem' },
                                        maxWidth: '600px',
                                        mx: 'auto',
                                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                                    }}
                                >
                                    Discover world-class courses, learn from industry experts, and transform your career with Coursify
                                </Typography>
                            </Fade>
                            
                            <Fade in={loaded} timeout={3000}>
                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <Button 
                                        variant="contained" 
                                        size="large"
                                        startIcon={<PlayArrow />}
                                        onClick={() => {navigate('/register')}}
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
                                        Start Learning Today
                                    </Button>
                                    
                                    <Button 
                                        variant="outlined" 
                                        size="large"
                                        startIcon={<TrendingUp />}
                                        onClick={() => {navigate('/user/courses')}}
                                        sx={{
                                            borderColor: 'rgba(255, 255, 255, 0.5)',
                                            color: 'white',
                                            fontSize: '1.1rem',
                                            px: 4,
                                            py: 1.5,
                                            '&:hover': {
                                                borderColor: 'white',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                    >
                                        Explore Courses
                                    </Button>
                                </Box>
                            </Fade>
                            
                            {/* Stats */}
                            <Fade in={loaded} timeout={3500}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    gap: 4, 
                                    mt: 6,
                                    flexWrap: 'wrap'
                                }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>1000+</Typography>
                                        <Typography variant="body1" sx={{ opacity: 0.9 }}>Courses Available</Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>50K+</Typography>
                                        <Typography variant="body1" sx={{ opacity: 0.9 }}>Students Enrolled</Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>95%</Typography>
                                        <Typography variant="body1" sx={{ opacity: 0.9 }}>Success Rate</Typography>
                                    </Box>
                                </Box>
                            </Fade>
                        </Box>
                    </Fade>
                </Container>
            </Box>
        </Box>
    </>
    )
}

export default Landing;