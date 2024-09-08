import React, { useState } from 'react';
import { account, ID } from '../lib/appwrite';

const Register = ({ onRegisterSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const register = async () => {
    try {
      await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password); // Log in after registration
      const user = await account.get();
      onRegisterSuccess(user);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="form-header">Register</h2>
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
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="custom-input"
        />
        <button
          type="button"
          onClick={register}
          className="custom-button button-register"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
