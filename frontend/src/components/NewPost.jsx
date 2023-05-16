import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

export default function NewPost(){
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { username } = useContext(AuthContext);

  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handlePost = () => {
    if (selectedFile && caption) {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('caption', caption);
      formData.append('image', selectedFile);

      setIsLoading(true); // Enable loading state
      console.log('Form Data:', formData); // Log the form data
      console.log(AuthContext); // Log the username state

      axios
        .post('http://localhost:8000/post', formData)
        .then((response) => {
          Swal.fire('Success', response.data.message, 'success');
          setSelectedFile(null);
          setCaption('');
        })
        .catch((error) => {
          console.error('Error creating post:', error);
          Swal.fire('Error', 'An error occurred while uploading the photo.', 'error');
        })
        .finally(() => {
          setIsLoading(false); // Disable loading state
        });
    } else {
      Swal.fire('Incomplete Data', 'Please select a file and enter a caption.', 'warning');
    }
  };

  return (
    <Container style={{height: '100vh', marginTop: '-25%'}}>
      <input
        type="file"
        accept="image/*"
        onChange={handleUploadPhoto}
        style={{ display: 'none' }}
        id="upload-photo-button"
      />
      <label htmlFor="upload-photo-button">
        <Button variant="contained" component="span" disabled={isLoading}>
          {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Upload Photo'}
        </Button>
      </label>
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}

      <TextField
        label="Caption"
        variant="outlined"
        multiline
        rows={4}
        margin="normal"
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
        style={{width: '25vw', height: 'auto'}}
      />

      <Button variant="contained" onClick={handlePost} disabled={isLoading}>
        {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Post'}
      </Button>
    </Container>
  );
};