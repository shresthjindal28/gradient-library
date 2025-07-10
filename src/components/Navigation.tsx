import React from 'react';
import Link from 'next/link';

interface User {
  username: string;
  isAdmin: boolean;
}

interface NavigationProps {
  user: User | null;
  onLogout: () => void;
  setShowSignup: (show: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, onLogout, setShowSignup }) => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <Link href="/">
            <h1>GRADORA</h1>
          </Link>
        </div>
        
        <div className="nav-links">
          <Link href="/" className="nav-link">
            Gallery
          </Link>
          {user?.isAdmin && (
            <Link href="/admin" className="nav-link">
              Admin Panel
            </Link>
          )}
          <div className="nav-auth">
            {!user ? (
              <>
                <button 
                  className="auth-button login-button" 
                  onClick={() => setShowSignup(false)}
                >
                  Login
                </button>
                <button 
                  className="auth-button signup-button" 
                  onClick={() => setShowSignup(true)}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="user-menu">
                <div className="user-info">
                  <span className="username">{user.username}</span>
                  {user.isAdmin && <span className="admin-badge">Admin</span>}
                </div>
                <button 
                  className="auth-button logout-button" 
                  onClick={onLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
