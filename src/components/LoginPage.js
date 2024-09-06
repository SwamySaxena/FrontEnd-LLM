import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { AuthContext } from '../AuthContext'; // Import AuthContext

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access login function from AuthContext

  const handleLogin = async () => {
    try {
      const data = await loginUser({ username, password });
      login(data.access_token); // Call the login function to set the authentication state
      navigate('/conversation'); // Redirect to conversation page on successful login
    } catch (err) {
      console.error('Error during login:', err); // Log the error
      setError(err.message); // Display error message from API or a generic error
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
