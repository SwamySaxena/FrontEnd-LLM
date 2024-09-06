import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext); // Access authentication context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate('/'); // Redirect to home page after logging out
  };

  return (
    <div className="navbar">
      {!isLoggedIn && <Link to="/">Home</Link>} {/* Only show Home if not logged in */}
      {isLoggedIn ? (
        <>
          <Link to="/conversation">Conversation</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
