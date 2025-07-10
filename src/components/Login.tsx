import React, { useState } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  username: string;
  isAdmin: boolean;
}

export default function Login({ onLogin }: { onLogin: (user: User, token: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const res = await axios.post('/api/login', { username, password });
      onLogin(res.data.user, res.data.token);
    } catch (err: unknown) {
      setError(axios.isAxiosError(err) ? err.response?.data?.message || 'Login failed' : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Welcome Back</h2>
      
      <div className="form-field">
        <label htmlFor="username">Username</label>
        <input 
          id="username"
          type="text"
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          placeholder="Enter your username" 
          required 
          disabled={isLoading}
        />
      </div>
      
      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input 
          id="password"
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Enter your password" 
          required 
          disabled={isLoading}
        />
      </div>
      
      <button 
        type="submit" 
        disabled={isLoading}
        className={isLoading ? 'loading' : ''}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      
      {error && <div className="error">{error}</div>}
    </form>
  );
}
