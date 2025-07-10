import React, { useState } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  username: string;
  isAdmin: boolean;
}

export default function Signup({ onSignup }: { onSignup: (user: User, token: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await axios.post('/api/signup', { username, password });
      // Auto-login after signup
      const res = await axios.post('/api/login', { username, password });
      onSignup(res.data.user, res.data.token);
    } catch (err: unknown) {
      setError(
        err instanceof Error && 'response' in err && err.response && 
        typeof err.response === 'object' && 'data' in err.response &&
        err.response.data && typeof err.response.data === 'object' &&
        'message' in err.response.data && typeof err.response.data.message === 'string'
          ? err.response.data.message
          : 'Signup failed'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Create Account</h2>
      
      <div className="form-field">
        <label htmlFor="signup-username">Username</label>
        <input 
          id="signup-username"
          type="text"
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          placeholder="Choose a username" 
          required 
          disabled={isLoading}
        />
      </div>
      
      <div className="form-field">
        <label htmlFor="signup-password">Password</label>
        <input 
          id="signup-password"
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Choose a password" 
          required 
          disabled={isLoading}
        />
      </div>
      
      <div className="form-field">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input 
          id="confirm-password"
          type="password" 
          value={confirmPassword} 
          onChange={e => setConfirmPassword(e.target.value)} 
          placeholder="Confirm your password" 
          required 
          disabled={isLoading}
        />
      </div>
      
      <button 
        type="submit" 
        disabled={isLoading}
        className={isLoading ? 'loading' : ''}
      >
        {isLoading ? 'Creating Account...' : 'Sign Up'}
      </button>
      
      {error && <div className="error">{error}</div>}
    </form>
  );
}
