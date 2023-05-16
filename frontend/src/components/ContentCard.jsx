import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import Grid from '@mui/material/Grid';
import Axios from 'axios';

const ContentCard = ({ post }) => {
  const { username, media, createdDate, likes, caption } = post;

  const usernameLocal = localStorage.getItem('username');

  const handleLike = async () => {
    try {
      const response = await Axios.post('http://localhost:8000/like', {
        image: media.toString(), // Pass the 'media' value as 'image'
        usernameOrEmail: usernameLocal, // Pass the 'usernameLocal' value as 'usernameOrEmail'
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error giving like', error);
      console.log(usernameLocal)
      console.log(media)
    }
  };  

  // Construct the image URL

  return (
    <Card variant="outlined">
      {/* Media/Image */}
      <div
        style={{
          width: '500px',
          height: '500px',
          position: 'relative',
        }}
        sx={{
          '@media (max-width: 600px)': {
            width: '100%',
            height: 'auto',
          },
        }}
      >
        <img
          src={require(`../image/${media}`)}
          alt="Post Media"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      <CardContent>
        {/* Grid Layout */}
        <Grid container spacing={0} alignItems="center">
          <Grid item xs={8}>
            <Typography variant="h6" gutterBottom>
              {username}
            </Typography>
          </Grid>
          <Grid item xs={4} container justifyContent="flex-end">
            {/* Like and Comment Buttons */}
            <IconButton onClick={handleLike}>
              <FavoriteIcon />
            </IconButton>
            <IconButton>
              <CommentIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            {/* Caption */}
            <Typography variant="body1" gutterBottom>
              {caption}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {/* Created Date */}
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {createdDate}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {/* Number of Likes */}
            <Typography variant="body1">Likes: {likes}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ContentCard;
