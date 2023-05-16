import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Axios from 'axios';

const ContentCard = ({ post }) => {
  const { username, media, createdDate, likes, caption } = post;

  const usernameLocal = localStorage.getItem('username');

  const [isEdit, setIsEdit] = useState(false);
  const [editedCaption, setEditedCaption] = useState(caption);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = async () => {
    try {
      // Save the edited caption
      await Axios.post('http://localhost:8000/edit', {
        image: media.toString(),
        usernameOrEmail: usernameLocal,
        caption: editedCaption,
      });
      setIsEdit(false);
    } catch (error) {
      console.error('Error saving caption', error);
    }
  };

  const handleDelete = async () => {
    // Add your delete logic here
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
            {isEdit ? (
              <IconButton onClick={handleSave}>
                <SaveIcon />
              </IconButton>
            ) : (
              <>
                <IconButton onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            {/* Caption */}
            {isEdit ? (
              <TextField
                value={editedCaption}
                onChange={(e) => setEditedCaption(e.target.value)}
                fullWidth
              />
            ) : (
              <Typography variant="body1" gutterBottom>
                {caption}
              </Typography>
            )}
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
