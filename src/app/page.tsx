"use client";

import React, { useState, useEffect } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import AdminPanel from "../components/AdminPanel";
import Gallery from "../components/Gallery";
import Navigation from "../components/Navigation";

interface User {
  _id: string;
  username: string;
  isAdmin: boolean;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");
  const [showSignup, setShowSignup] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    // Check for stored token/user on component mount
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        // Invalid stored data, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  const handleSignup = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  const handleLogout = () => {
    setUser(null);
    setToken("");
    setShowAdminPanel(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <div className="app-container">
      <Navigation 
        user={user} 
        onLogout={handleLogout} 
        setShowSignup={setShowSignup} 
      />
      
      <div className="content-wrapper">
        {!user ? (
          <div className="auth-container">
            <div className="auth-content">
              <div className="auth-header">
                <h1 className="hero-title">Gradient Library</h1>
                <p className="hero-subtitle">Discover and download beautiful gradient images for your projects</p>
              </div>
              
              <div className="auth-forms">
                {showSignup ? (
                  <Signup onSignup={handleSignup} />
                ) : (
                  <Login onLogin={handleLogin} />
                )}
                <p className="auth-toggle">
                  {showSignup
                    ? "Already have an account? "
                    : "Don't have an account? "}
                  <button 
                    className="auth-toggle-btn" 
                    onClick={() => setShowSignup(!showSignup)}
                  >
                    {showSignup ? "Login" : "Sign Up"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        ) : (
          user.isAdmin && (
            <div className="admin-container">
              {showAdminPanel ? (
                <AdminPanel token={token} />
              ) : (
                <div className="admin-prompt">
                  <button 
                    className="admin-toggle-btn" 
                    onClick={() => setShowAdminPanel(true)}
                  >
                    Open Admin Panel
                  </button>
                </div>
              )}
            </div>
          )
        )}
        
        <Gallery token={token} />
      </div>
      
      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Gradient Library. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
