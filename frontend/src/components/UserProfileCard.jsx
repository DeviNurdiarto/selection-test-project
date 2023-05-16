import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Axios from 'axios';
import Swal from 'sweetalert2';

const UserProfileCard = ({ profilePicture, fullName, bio, username, email }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedUsername, setEditedUsername] = useState(username);
  const [editedFullName, setEditedFullName] = useState(fullName);
  const [editedBio, setEditedBio] = useState(bio);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [tmpUserName, setTmpUserName] = useState()

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    if (editedUsername.trim() === '' || editedFullName.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Username and Full Name cannot be empty.',
        confirmButtonText: 'OK'
      });
      return;
    }
  
    try {
      const updatedProfile = {
        username: editedUsername,
        fullName: editedFullName,
        bio: editedBio,
        localUsername: localStorage.getItem('username')
      };
  
      const response = await Axios.patch('http://localhost:8000/profile', updatedProfile);
      // Assuming the server responds with a success message
  
      localStorage.setItem('username', editedUsername); // Update the username in local storage
      console.log(response.data.message);
  
      setEditMode(false);
      // Update the username, full name, and bio with the edited values
      // You can make API calls or update the state as per your implementation
  
      // Show success sweet alert
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been successfully updated!',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error updating user profile', error);
  
      // Show error sweet alert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update profile. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  };  
  
  

  const handleAvatarClick = () => {
    if (editMode) {
      // Open file selection window
      document.getElementById('avatar-input').click();
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setSelectedAvatar(file);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <IconButton onClick={handleAvatarClick} disabled={!editMode}>
            <Avatar src={profilePicture} />
            <input
              type="file"
              id="avatar-input"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
          </IconButton>
        }
        action={
          editMode ? (
            <Button onClick={handleSave}>Save</Button>
          ) : (
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          )
        }
        title={editMode ? (
          <TextField
            value={editedUsername}
            onChange={(e) => setEditedUsername(e.target.value)}
            size="small"
          />
        ) : (
          username
        )}
        subheader={editMode ? (
          <TextField
            value={editedFullName}
            onChange={(e) => setEditedFullName(e.target.value)}
            size="small"
          />
        ) : (
          fullName
        )}
      />
      <div style={{ padding: '16px' }}>
        <p>Email: {email}</p>
        <p>Bio: {editMode ? (
          <TextField
            value={editedBio}
            onChange={(e) => setEditedBio(e.target.value)}
            size="small"
          />
        ) : (
          bio
        )}</p>
      </div>
    </Card>
  );
};

export default UserProfileCard;
