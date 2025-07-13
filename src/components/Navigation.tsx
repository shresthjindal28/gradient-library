import React from 'react';
import Link from 'next/link';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';

interface NavigationProps {
  onLogout?: () => void;
}

const Navigation: React.FC<NavigationProps> = () => {
  const { user } = useUser();
  // Check for admin role in user.publicMetadata
  const isAdmin = !!user && !!user.publicMetadata && user.publicMetadata.role === 'admin';
  return (
    <nav className="sticky top-0 left-0 right-0 z-[100] backdrop-blur-3xl bg-transparent border border-white/10 border-t-0 shadow-2xl shadow-black/20">
      
      {/* Animated background gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#CFFFE2]/60 to-transparent"></div>
      
      <div className="flex justify-between items-center p-4 md:px-6 max-w-7xl mx-auto relative z-10">
        {/* Logo with enhanced styling */}
        <div className="flex items-center group">
          <Link href="/" className="relative">
            <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#CFFFE2] via-[#A2D5C6] to-[#F6F6F6] bg-clip-text text-transparent tracking-wider transform transition-all duration-500 hover:scale-105 hover:tracking-widest relative drop-shadow-lg">
              GRADORA
              <div className="absolute -inset-1 bg-gradient-to-r from-[#A2D5C6]/30 to-[#CFFFE2]/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 z-10"></div>
            </h1>
          </Link>
        </div>
        
        <div className="flex items-center gap-8">
          {/* Enhanced navigation links */}
          <div className="hidden md:flex items-center gap-6">
            
            {isAdmin && (
              <Link href="/admin" className="relative group px-4 py-2 text-white/90 font-semibold text-base transition-all duration-300 hover:text-white drop-shadow-sm overflow-hidden">
                <span className="relative z-20">Admin Panel</span>
                <div className="absolute inset-0 bg-[#F6F6F6]/10 backdrop-blur-sm rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 border border-[#F6F6F6]/20 z-10"></div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] group-hover:w-full group-hover:left-0 transition-all duration-300 shadow-lg shadow-[#CFFFE2]/50 z-10"></div>
              </Link>
            )}
          </div>

          {/* Enhanced auth buttons */}
          <div className="flex gap-3">
            <SignedOut>
              <SignInButton>
                <button className="group relative px-5 py-2 rounded-xl border border-[#F6F6F6]/30 bg-[#F6F6F6]/5 backdrop-blur-sm text-white/90 font-semibold cursor-pointer transition-all duration-300 hover:border-[#F6F6F6]/50 hover:text-white hover:bg-[#F6F6F6]/10 hover:shadow-lg hover:shadow-[#F6F6F6]/10 overflow-hidden">
                  <span className="relative z-20 drop-shadow-sm">Login</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F6F6F6]/0 via-[#F6F6F6]/10 to-[#F6F6F6]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 z-10"></div>
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="group relative px-5 py-2 rounded-xl border border-[#A2D5C6]/50 bg-gradient-to-r from-[#A2D5C6]/80 via-[#CFFFE2]/80 to-[#F6F6F6]/80 backdrop-blur-sm text-black font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#A2D5C6]/30 overflow-hidden">
                  <span className="relative z-20 drop-shadow-sm">Sign Up</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#CFFFE2]/50 via-[#A2D5C6]/50 to-[#CFFFE2]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12 z-10"></div>
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-4 bg-[#F6F6F6]/10 backdrop-blur-md rounded-xl p-3 border border-[#F6F6F6]/20 shadow-lg shadow-black/10">
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-sm text-white drop-shadow-sm">
                    {user?.fullName || user?.username || user?.emailAddresses?.[0]?.emailAddress}
                  </span>
                  
                </div>
                <div className="relative group">
                  <div className="relative">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8 cursor-pointer",
                          userButtonPopoverCard: "bg-gray-900/95 backdrop-blur-lg border border-[#F6F6F6]/20 shadow-xl z-[200]",
                          userButtonPopoverActions: "text-white",
                          userButtonPopoverActionButton: "text-white hover:bg-[#CFFFE2]/10 transition-colors",
                          userButtonPopoverActionButtonText: "text-white",
                          userButtonPopoverFooter: "hidden",
                          userButtonTrigger: "focus:outline-none focus:ring-2 focus:ring-[#CFFFE2]/50 rounded-full"
                        }
                      }}
                      afterSignOutUrl="/"
                    />
                    
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#A2D5C6]/20 to-[#CFFFE2]/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>

        {/* Mobile menu button (placeholder for future mobile nav) */}
        <div className="md:hidden">
          <button 
            className="p-2 text-white/90 hover:text-white transition-colors backdrop-blur-sm bg-[#F6F6F6]/10 rounded-lg border border-[#F6F6F6]/20"
            aria-label="Open mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating orb decorations - more subtle for glass effect */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#F6F6F6]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-0 right-1/4 w-24 h-24 bg-[#CFFFE2]/10 rounded-full blur-2xl animate-pulse [animation-delay:1s]"></div>
    </nav>
  );
};

export default Navigation;
