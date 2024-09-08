import React, { useState } from 'react';
import { account } from '../lib/appwrite';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const login = async () => {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      onLoginSuccess(user);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="form-header">Login</h2>
      {errorMessage && (
        <div className="error-message" role="alert">
          <strong className="font-bold">Error: </strong>
          <span>{errorMessage}</span>
        </div>
      )}
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="custom-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="custom-input"
        />
        <button
          type="button"
          onClick={login}
          className="custom-button button-login"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
