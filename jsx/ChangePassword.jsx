// src/components/ChangePassword.js

import React, { useState } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import { useAuth } from './auth/AuthContext';
import './css/ChangePassword.css';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { authState } = useAuth();
  const user = authState.user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/users/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email, // Replace with the actual user email
          currentPassword,
          newPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setError('');
      } else {
        setError(result.message);
        setMessage('');
      }
    } catch (err) {
      console.error('Failed to change password:', err);
      setError('Failed to change password.');
      setMessage('');
    }
  };

  return (
    <div className="changepassword">
      <Header />
      <Navbar />
      <h2>Change Password</h2>
      {user && (
          <p>Logged in as: {user.username || user.email}</p> 
        )}
      {error && <div>{error}</div>}
      {message && <div>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div id='one'>
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div id='one'>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div id='one'>
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
