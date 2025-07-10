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
    <nav className="sticky top-0 left-0 right-0 z-[100] backdrop-blur-xl bg-black/70 border-b border-purple-500/20">
      <div className="flex justify-between items-center p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/">
            <h1>GRADORA</h1>
          </Link>
        </div>
        
        <div className="flex items-center gap-8">
          <Link href="/" className="text-white font-medium text-base relative transition-all duration-300 hover:text-purple-400 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-gradient-to-r after:from-purple-700 after:to-purple-400 after:transition-all after:duration-300 hover:after:w-full">
            Gallery
          </Link>
          {user?.isAdmin && (
            <Link href="/admin" className="text-white font-medium text-base relative transition-all duration-300 hover:text-purple-400 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-gradient-to-r after:from-purple-700 after:to-purple-400 after:transition-all after:duration-300 hover:after:w-full">
              Admin Panel
            </Link>
          )}
          <div className="flex gap-3">
            {!user ? (
              <>
                <button 
                  className="px-4 py-2 rounded-lg border border-purple-400 bg-transparent text-purple-400 font-medium cursor-pointer transition-all hover:bg-purple-400/10" 
                  onClick={() => setShowSignup(false)}
                >
                  Login
                </button>
                <button 
                  className="px-4 py-2 rounded-lg border-none bg-gradient-to-r from-purple-700 to-purple-400 text-white font-medium cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]" 
                  onClick={() => setShowSignup(true)}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="font-medium text-sm">{user.username}</span>
                  {user.isAdmin && <span className="text-xs bg-gradient-to-r from-purple-700 to-purple-400 text-white px-1.5 py-0.5 rounded mt-1">Admin</span>}
                </div>
                <button 
                  className="px-4 py-2 rounded-lg border border-[#ff4d6d] bg-transparent text-[#ff4d6d] font-medium cursor-pointer transition-all hover:bg-[rgba(255,77,109,0.1)]" 
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
