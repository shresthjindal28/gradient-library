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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-[380px] mx-auto p-8 rounded-2xl bg-[rgba(15,15,15,0.8)] border border-purple-500/20 backdrop-blur-lg shadow-[0_0_15px_rgba(139,92,246,0.5)]">
      <h2 className="text-2xl font-semibold mb-5 text-center bg-gradient-to-r from-purple-400 to-purple-700 bg-clip-text text-transparent tracking-tight">Create Account</h2>
      
      <div className="flex flex-col gap-1.5">
        <label htmlFor="signup-username" className="text-sm font-medium text-gray-200 ml-1">Username</label>
        <input 
          id="signup-username"
          type="text"
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          placeholder="Choose a username" 
          required 
          disabled={isLoading}
          className="px-4 py-3 rounded-lg border border-purple-500/20 bg-[rgba(30,30,30,0.8)] text-white text-[0.95rem] transition-all focus:outline-none focus:border-purple-400 focus:shadow-[0_0_0_2px_rgba(139,92,246,0.2)]"
        />
      </div>
      
      <div className="flex flex-col gap-1.5">
        <label htmlFor="signup-password" className="text-sm font-medium text-gray-200 ml-1">Password</label>
        <input 
          id="signup-password"
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Choose a password" 
          required 
          disabled={isLoading}
          className="px-4 py-3 rounded-lg border border-purple-500/20 bg-[rgba(30,30,30,0.8)] text-white text-[0.95rem] transition-all focus:outline-none focus:border-purple-400 focus:shadow-[0_0_0_2px_rgba(139,92,246,0.2)]"
        />
      </div>
      
      <div className="flex flex-col gap-1.5">
        <label htmlFor="confirm-password" className="text-sm font-medium text-gray-200 ml-1">Confirm Password</label>
        <input 
          id="confirm-password"
          type="password" 
          value={confirmPassword} 
          onChange={e => setConfirmPassword(e.target.value)} 
          placeholder="Confirm your password" 
          required 
          disabled={isLoading}
          className="px-4 py-3 rounded-lg border border-purple-500/20 bg-[rgba(30,30,30,0.8)] text-white text-[0.95rem] transition-all focus:outline-none focus:border-purple-400 focus:shadow-[0_0_0_2px_rgba(139,92,246,0.2)]"
        />
      </div>
      
      <button 
        type="submit" 
        disabled={isLoading}
        className={`py-3 rounded-lg border-none bg-gradient-to-r from-purple-700 to-purple-400 text-white font-medium cursor-pointer transition-all duration-300 relative overflow-hidden text-base tracking-wide mt-2 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] ${isLoading ? 'text-transparent after:content-[""] after:absolute after:top-1/2 after:left-1/2 after:w-5 after:h-5 after:border-2 after:border-white/30 after:border-t-white after:rounded-full after:-ml-2.5 after:-mt-2.5 after:animate-spin' : ''}`}
      >
        {isLoading ? 'Creating Account...' : 'Sign Up'}
      </button>
      
      {error && <div className="text-[#ff4d6d] mt-2 text-sm bg-[rgba(255,77,109,0.1)] p-2.5 rounded-md border-l-[3px] border-[#ff4d6d]">{error}</div>}
    </form>
  );
}
