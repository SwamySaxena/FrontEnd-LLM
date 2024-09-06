import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser({ username, email, password });
      navigate('/login'); // Redirect to the login page after successful registration
    } catch (err) {
      console.error('Error during registration:', err); // Log the error
      setError(err.message); // Display error message from API or a generic error
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
