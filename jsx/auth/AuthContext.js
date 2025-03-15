/*import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Check if the token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          throw new Error('Token is expired');
        }
        setAuthState({
          token,
          user: decodedToken,
        });
      } catch (error) {
        console.error('Failed to decode token or token is expired:', error);
        localStorage.removeItem('token');
        setAuthState({
          token: null,
          user: null,
        });
        navigate('/login');
      }
    }
    setLoading(false);
  }, [navigate]);

  const login = (token) => {
    localStorage.setItem('token', token);
    try {
      const decodedToken = jwtDecode(token);
      setAuthState({
        token,
        user: decodedToken,
      });
      navigate('/home');
    } catch (error) {
      console.error('Failed to decode token:', error);
      logout(); // Clear token on error
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      token: null,
      user: null,
    });
    navigate('/login');
  };

  const changePassword = async (currentPassword, newPassword) => {
    const user = auth.currentUser;

    if (!user) {
      return { success: false, message: 'No user is logged in.' };
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      return { success: true, message: 'Password updated successfully.' };
    } catch (error) {
      console.error('Error changing password:', error);
      return { success: false, message: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, changePassword, setAuthState, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
*/
import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decoding the token
        if (decodedToken.exp * 1000 < Date.now()) {
          throw new Error('Token is expired');
        }
        setAuthState({
          token,
          user: decodedToken,
        });
      } catch (error) {
        console.error('Failed to decode token or token is expired:', error);
        localStorage.removeItem('token');
        setAuthState({
          token: null,
          user: null,
        });
        navigate('/login');
      }
    }
    setLoading(false);
  }, [navigate]);

  const login = (token) => {
    localStorage.setItem('token', token);
    try {
      const decodedToken = jwtDecode(token); // Decoding the token on login
      setAuthState({
        token,
        user: decodedToken,
      });
      navigate('/home');
    } catch (error) {
      console.error('Failed to decode token:', error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      token: null,
      user: null,
    });
    navigate('/login');
  };

  const changePassword = async (currentPassword, newPassword) => {
    const user = auth.currentUser;

    if (!user) {
      return { success: false, message: 'No user is logged in.' };
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      return { success: true, message: 'Password updated successfully.' };
    } catch (error) {
      console.error('Error changing password:', error);
      return { success: false, message: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, changePassword, setAuthState, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
