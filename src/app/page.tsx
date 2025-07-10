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
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navigation 
        user={user} 
        onLogout={handleLogout} 
        setShowSignup={setShowSignup} 
      />
      
      <div className="flex-1 w-full max-w-7xl mx-auto px-8 py-16">
        {!user ? (
          <div className="flex justify-center mb-24">
            <div className="flex flex-col items-center max-w-[800px] text-center">
              <div className="mb-10">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent tracking-tight">Gradient Library</h1>
                <p className="text-xl text-gray-200">Discover and download beautiful gradient images for your projects</p>
              </div>
              
              <div className="w-full max-w-[380px]">
                {showSignup ? (
                  <Signup onSignup={handleSignup} />
                ) : (
                  <Login onLogin={handleLogin} />
                )}
                <p className="text-center mt-6 text-gray-300">
                  {showSignup
                    ? "Already have an account? "
                    : "Don't have an account? "}
                  <button 
                    className="text-purple-400 font-medium hover:underline" 
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
            <div className="mb-8">
              {showAdminPanel ? (
                <AdminPanel token={token} />
              ) : (
                <div className="flex justify-center my-8">
                  <button 
                    className="px-6 py-3 bg-gradient-to-r from-purple-700 to-purple-400 text-white rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]" 
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
      
      <footer className="mt-auto py-8 px-8 border-t border-purple-900/20 bg-black/70 backdrop-blur">
        <div className="flex justify-between items-center max-w-7xl mx-auto text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Gradient Library. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
