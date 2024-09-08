import React, { useState, useEffect } from 'react';
import Login from '../components/Login'; // Import the Login component
import Register from '../components/Register'; // Import the Register component
import { account } from '../lib/appwrite';

const Signup = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true); // Toggle between login and register

  useEffect(() => {
    // Check for existing session on component mount
    const checkSession = async () => {
      try {
        const user = await account.get();
        setLoggedInUser(user); // Set logged in user if session exists
      } catch (error) {
        if (error.code === 401) {
          // This means no session exists or it's expired, so handle it gracefully
          console.log('No active session, user is not logged in yet.');
        } else {
          console.error('Unexpected error:', error); // Log unexpected errors only
        }
      }
    };
    checkSession(); // Check for session
  }, []);

  // Handle logout
  const logout = async () => {
    try {
      await account.deleteSession('current');
      setLoggedInUser(null); // Clear the session
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="form-container w-full">
        {loggedInUser ? (
          <>
            <h2 className="form-header">Welcome, {loggedInUser.name}</h2>
            <button
              onClick={logout}
              className="custom-button button-logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setShowLogin(true)}
                className={`toggle-button rounded-l-lg ${showLogin ? 'toggle-active' : 'toggle-inactive'}`}
              >
                Login
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className={`toggle-button rounded-r-lg ${!showLogin ? 'toggle-active' : 'toggle-inactive'}`}
              >
                Register
              </button>
            </div>

            {showLogin ? (
              <Login onLoginSuccess={setLoggedInUser} />
            ) : (
              <Register onRegisterSuccess={setLoggedInUser} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
