import React, { useState, useEffect } from "react";
import { AuthContext } from "./components/AuthContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import VerifyAccount from "./pages/Verify";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/Home";
import NewPost from "./components/NewPost";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Check if user is already logged in by checking localStorage
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (storedToken && storedUsername) {
      setLoggedIn(true);
      setToken(storedToken);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Clear the authentication data from localStorage and reset state
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLoggedIn(false);
    setToken('');
    setUsername('');
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{loggedIn, username, token, setLoggedIn, setUsername, setToken}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verification" element={<VerifyAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/new-post" element={<NewPost />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;

