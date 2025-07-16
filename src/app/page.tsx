"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Gallery from "../components/Gallery";
import Navigation from "../components/Navigation";

export default function Home() {
  // Generate random particle data only on the client to avoid hydration errors
  const [particles, setParticles] = useState<Array<{
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
  }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${4 + Math.random() * 3}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      <Navigation />
      {/* Hero Section */}
      <section className="relative min-h-[75vh] sm:min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#F6F6F6]/30 rounded-full animate-float"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.animationDelay,
                animationDuration: particle.animationDuration,
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Main heading with enhanced styling */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-[#CFFFE2] via-[#A2D5C6] to-[#F6F6F6] bg-clip-text text-transparent tracking-tight leading-tight">
            GRADORA
          </h1>
          
          {/* Subtitle with enhanced typography */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
            Discover and download beautiful gradient images for your projects. 
            <span className="block text-[#CFFFE2] font-semibold mt-2">
              Transform your designs with stunning visual effects.
            </span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center mb-6 sm:mb-7 lg:mb-8">
            <button className="w-full sm:w-auto group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#A2D5C6] via-[#CFFFE2] to-[#F6F6F6] text-black font-bold text-base sm:text-lg lg:text-xl shadow-lg shadow-[#A2D5C6]/30 hover:shadow-[#A2D5C6]/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <span className="relative z-20">Explore Gradients</span>
            </button>
            
            <Link href="/docs" className="w-full sm:w-auto">
              <button className="w-full group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl border-2 border-[#F6F6F6]/30 bg-[#F6F6F6]/5 backdrop-blur-sm text-[#F6F6F6] font-bold text-base sm:text-lg lg:text-xl hover:border-[#F6F6F6]/50 hover:bg-[#F6F6F6]/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <span className="relative z-20">Learn More</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#F6F6F6]/0 via-[#F6F6F6]/10 to-[#F6F6F6]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-xl sm:rounded-2xl z-10"></div>
              </button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-3xl mx-auto">
            <div className="text-center group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] bg-clip-text text-transparent mb-2">500+</div>
              <div className="text-gray-400 text-xs sm:text-sm lg:text-base font-medium">Gradient Collections</div>
            </div>
            <div className="text-center group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#A2D5C6] to-[#CFFFE2] bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-gray-400 text-xs sm:text-sm lg:text-base font-medium">Downloads</div>
            </div>
            <div className="text-center group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#CFFFE2] to-[#F6F6F6] bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-gray-400 text-xs sm:text-sm lg:text-base font-medium">Available</div>
            </div>
          </div>
        </div>
        
        
      </section>

      {/* Gallery Section */}
      <section className="relative py-8 sm:py-12 md:py-16">
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] bg-clip-text text-transparent">
              Featured Gradients
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Handpicked gradients to inspire your next project
            </p>
          </div>
          <Gallery />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mt-auto py-12 px-8 border-t border-[#A2D5C6]/20 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#A2D5C6]/5 via-transparent to-transparent"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-black bg-gradient-to-r from-[#CFFFE2] via-[#A2D5C6] to-[#F6F6F6] bg-clip-text text-transparent tracking-wider mb-4">
              GRADORA
            </h3>
            <p className="text-gray-400 text-sm max-w-md">
              Your ultimate destination for beautiful gradient images. 
              Transform your designs with our curated collection.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <a href="#" className="hover:text-[#CFFFE2] transition-colors">Browse All</a>
                <a href="#" className="hover:text-[#CFFFE2] transition-colors">Popular</a>
                <a href="#" className="hover:text-[#CFFFE2] transition-colors">Newest</a>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <a href="#" className="hover:text-[#CFFFE2] transition-colors">Help Center</a>
                <a href="#" className="hover:text-[#CFFFE2] transition-colors">Contact Us</a>
                <a href="#" className="hover:text-[#CFFFE2] transition-colors">API Docs</a>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <a href="#" className="hover:text-[#CFFFE2] transition-colors">Terms</a>
                <a href="#" className="hover:text-[#CFFFE2] transition-colors">Privacy</a>
                <a href="#" className="hover:text-[#CFFFE2] transition-colors">License</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 border-t border-[#A2D5C6]/20 mt-8 pt-8">
          {/* Social Media Icons */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <h4 className="font-semibold text-white mr-4">Follow Us:</h4>
            
            {/* GitHub Button */}
            <div className="relative group">
              <a 
                href="https://github.com/shresthjindal28/gradient-library" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Give Star on GitHub"
                aria-label="Give Star on GitHub"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F6F6F6]/10 backdrop-blur-sm border border-[#F6F6F6]/20 text-white/90 hover:text-white transition-all duration-300 hover:bg-[#F6F6F6]/20 hover:border-[#F6F6F6]/40 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900/95 backdrop-blur-lg border border-[#F6F6F6]/20 rounded-lg text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                Give Star ⭐
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
              </div>
            </div>

            {/* LinkedIn Button */}
            <div className="relative group">
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
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900/95 backdrop-blur-lg border border-[#F6F6F6]/20 rounded-lg text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                LinkedIn
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
              </div>
            </div>

            {/* X (Twitter) Button */}
            <div className="relative group">
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
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900/95 backdrop-blur-lg border border-[#F6F6F6]/20 rounded-lg text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                Follow on X
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} GRADORA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
