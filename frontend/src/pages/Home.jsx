import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../components/AuthContext';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import NewPost from '../components/NewPost';
import Welcome from '../components/Welcome';
import ContentCard from '../components/ContentCard';
import UserProfileCard from '../components/UserProfileCard';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const { loggedIn, username, token, setLoggedIn, setUsername, setToken } = useContext(AuthContext);
  const [data, setData] = useState({}); // Initialize data state


  useEffect(() => {
    const usernameLocal = localStorage.getItem('username');
    const isLoginLocal = localStorage.getItem('loggedIn');
    if (usernameLocal !== null) setUsername(usernameLocal);
    if (isLoginLocal !== null) setLoggedIn(true);
  }, []);

  // Dummy data for posts
  const [posts, setPosts] = useState([]);


  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/');
      const responseData = response.data;
      setPosts(responseData);
    } catch (error) {
      console.error('Error retrieving posts:', error);
    }
  };


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/');
        const responseData = response.data;
        setPosts(responseData);
      } catch (error) {
        console.error('Error retrieving posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = () => {
    setCurrentPage('post');
  };

  const handleHomeClick = () => {
    setCurrentPage('home');
    fetchPosts();
  };

  const handleProfileClick = async () => {
    setCurrentPage('profile');
    try {
      const response = await axios.get(`http://localhost:8000/profile?usernameOrEmail=${username}`);
      const responseData = response.data;
  
      const userProfile = {
        profilePicture: responseData.profilePicture,
        fullName: responseData.fullName,
        bio: responseData.bio,
        username: responseData.username,
        email: responseData.email,
      };
  
      setData(userProfile);
  
      console.log(userProfile);
    } catch (error) {
      console.error('Error retrieving user profile', error);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setToken('');
    localStorage.removeItem('username');
    localStorage.removeItem('loggedIn');
    setCurrentPage('home');
  };

  return (
    <>
      {!loggedIn && <Welcome />}
      {loggedIn && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            minHeight: '100vh',
            p: 2,
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              position: 'fixed',
              top: 0,
              zIndex: 1,
              backgroundColor: '#ffffff',
              mb: '0px',
              mt: '0px',
              width: '100vw',
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              {/* Navigation Buttons */}
              <Grid item xs={4} sx={{ mb: 2 }}>
                <Button
                  startIcon={<HomeIcon sx={{ fontSize: 28 }} />}
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={handleHomeClick}
                >
                  Home
                </Button>
              </Grid>
              <Grid item xs={4} sx={{ mb: 2 }}>
                <Button
                  startIcon={<PostAddIcon sx={{ fontSize: 28 }} />}
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={handlePostClick}
                >
                  Post
                </Button>
              </Grid>
              <Grid item xs={4} sx={{ mb: 2 }}>
                <Button
                  startIcon={<AccountCircleIcon sx={{ fontSize: 28 }} />}
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={handleProfileClick}
                >
                  Profile
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* Render content based on currentPage */}
          {currentPage === 'home' && (
            <>
              {posts.map((post) => (
                <Grid item key={post.id} xs={12} sm={6} md={4}>
                  <ContentCard post={post} />
                </Grid>
              ))}
            </>
          )}

          {currentPage === 'post' && (
            <Grid
              container
              justifyContent="center"
              alignItems="start"
              sx={{ Height: '50vh' }}
            >
              <Grid item xs={12} sm={6} md={4}>
                <NewPost />
              </Grid>
            </Grid>
          )}

          {currentPage === 'profile' && (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ Height: '50vh' }}
            >
              <Grid item xs={12} sm={6} md={4}>
                <UserProfileCard {...data} />
                <Button
                  startIcon={<LogoutIcon />}
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
}
