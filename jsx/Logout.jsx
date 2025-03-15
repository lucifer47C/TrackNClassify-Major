import React from 'react';
import { useAuth } from './auth/AuthContext'; // Auth context for managing auth state
import { useNavigate } from 'react-router-dom'; // Navigation hook
import { signOut } from 'firebase/auth'; // Firebase auth sign out function
import { auth } from '../firebase'; // Firebase auth instance
import Header from './Header'; // Header component
import Navbar from './Navbar'; // Navbar component
import './css/Logout.css'; // CSS for styling

const LogoutConfirmation = () => {
  const { authState, setAuthState } = useAuth(); // Get auth state and updater function
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setAuthState({ token: null, user: null }); // Clear auth state
    navigate('/'); // Redirect to home or login page
  };

  // Function to handle Firebase logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      logout(); // Clear auth state and navigate
    } catch (error) {
      console.error('Error logging out:', error); // Handle any sign-out errors
    }
  };

  // Function to navigate back to the previous page
  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  // Get user details from authState
  const user = authState.user;

  return (
    <div>
      <Header /> {/* Render header */}
      <Navbar /> {/* Render navbar */}
      <div className="logout-confirmation">
        <h2>Are you sure you want to log out?</h2>
        {user && (
          <p>Logged in as: {user.username || user.email}</p> 
        )}
        <button onClick={handleLogout}>Log out</button> {/* Log out button */}
        <button onClick={handleGoBack}>Go back</button> {/* Go back button */}
      </div>
    </div>
  );
};

export default LogoutConfirmation;
