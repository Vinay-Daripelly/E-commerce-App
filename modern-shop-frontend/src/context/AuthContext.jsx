/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Get user from localStorage on initial load
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();

  const login = async (userData) => {
   try{ const user = await authService.login(userData);
    setUser(user);
    toast.success('Logged in successfully!');
    navigate('/');}
    catch(error){
        toast.error('Login failed. Please check your credentials.');
        console.error('Login error:', error);
    }
  };

  const register = async (userData) => {
    // We don't auto-login after register, just call the service
    await authService.register(userData);
    navigate('/login');
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
    toast.success('Logged out successfully!');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};