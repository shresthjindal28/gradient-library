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

            <Link href="/docs" className="relative group px-4 py-2 text-white/90 font-semibold text-base transition-all duration-300 hover:text-white drop-shadow-sm overflow-hidden">
              <span className="relative z-20">Docs</span>
              <div className="absolute inset-0 bg-[#F6F6F6]/10 backdrop-blur-sm rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 border border-[#F6F6F6]/20 z-10"></div>
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] group-hover:w-full group-hover:left-0 transition-all duration-300 shadow-lg shadow-[#CFFFE2]/50 z-10"></div>
            </Link>

            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              {/* GitHub Button */}
              <div className="relative group flex flex-col items-center">
                <a 
                  href="https://github.com/shresthjindal28/gradient-library" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Give Star on GitHub"
                  aria-label="Give Star on GitHub"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F6F6F6]/10 backdrop-blur-sm border border-[#F6F6F6]/20 text-white/90 hover:text-white transition-all duration-300 hover:bg-[#F6F6F6]/20 hover:border-[#F6F6F6]/40 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                {/* Text below icon */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900/95 backdrop-blur-lg border border-[#F6F6F6]/20 rounded-md text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl translate-y-2 group-hover:translate-y-0">
                  Give Star ⭐
                </div>
              </div>

              {/* LinkedIn Button */}
              <div className="relative group flex flex-col items-center">
                <a 
                  href="https://www.linkedin.com/in/shresth-jindal-b074ba28b/?originalSubdomain=in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Connect on LinkedIn"
                  aria-label="Connect on LinkedIn"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F6F6F6]/10 backdrop-blur-sm border border-[#F6F6F6]/20 text-white/90 hover:text-white transition-all duration-300 hover:bg-[#0077B5]/20 hover:border-[#0077B5]/40 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                {/* Text below icon */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900/95 backdrop-blur-lg border border-[#F6F6F6]/20 rounded-md text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl translate-y-2 group-hover:translate-y-0">
                  LinkedIn
                </div>
              </div>

              {/* X (Twitter) Button */}
              <div className="relative group flex flex-col items-center">
                <a 
                  href="https://x.com/shresth_ji76019" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Follow on X (Twitter)"
                  aria-label="Follow on X (Twitter)"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F6F6F6]/10 backdrop-blur-sm border border-[#F6F6F6]/20 text-white/90 hover:text-white transition-all duration-300 hover:bg-[#1DA1F2]/20 hover:border-[#1DA1F2]/40 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* Text below icon */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900/95 backdrop-blur-lg border border-[#F6F6F6]/20 rounded-md text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl translate-y-2 group-hover:translate-y-0">
                  Follow on X
                </div>
              </div>
            </div>
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
