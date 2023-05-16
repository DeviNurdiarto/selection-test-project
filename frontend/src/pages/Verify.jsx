import React, { useState, useEffect } from 'react';
import { Button, Card, CircularProgress, Typography } from '@mui/material';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyAccount = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleVerification = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams(location.search);
      const verificationToken = params.get('token');

      if (verificationToken) {
        // Simulate verification delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Perform verification using the verification token
        const response = await Axios.patch(`http://localhost:8000/verification?token=${verificationToken}`);
        const message = response.data.message;

        // Show success notification
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: message,
          showConfirmButton: false,
          timer: 1500,
        });

        // Simulate delay after verification
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Handle further actions after verification
        // For example, navigate to the login page
        navigate('/login');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error occurred during verification';

      // Log the error for troubleshooting
      console.log(error);

      // Show error notification
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    handleVerification();
  }, [location.search, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ padding: '2rem', width: '350px', textAlign: 'center' }}>
        <Typography variant="h6">Account Verification</Typography>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: '2rem' }}
          onClick={handleVerification}
        >
          {loading ? <CircularProgress size={24} /> : 'Verify Account'}
        </Button>
      </Card>
    </div>
  );
};

export default VerifyAccount;
