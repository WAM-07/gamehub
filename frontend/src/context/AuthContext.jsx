import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/v1/auth/me');
      setUser(res.data.data);
    } catch {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    try {
      const res = await axios.post('/api/v1/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      await fetchUser();
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      return false;
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post('/api/v1/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      await fetchUser();
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

