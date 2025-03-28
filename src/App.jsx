import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UsersList from './components/UsersList';
import EditUser from './components/EditUser';
import AddUser from './components/AddUser'; 
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersList />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          }
        />
        <Route // Add this route
          path="/add-user"
          element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;