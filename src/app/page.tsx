"use client";

import React, { useEffect, useState } from "react";
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
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
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

        <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
          {/* Main heading with enhanced styling */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-[#CFFFE2] via-[#A2D5C6] to-[#F6F6F6] bg-clip-text text-transparent tracking-tight leading-tight">
            Gradient
            <span className="block bg-gradient-to-r from-[#A2D5C6] via-[#CFFFE2] to-[#F6F6F6] bg-clip-text text-transparent">
              Library
            </span>
          </h1>
          
          {/* Subtitle with enhanced typography */}
          <p className="text-xl md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Discover and download beautiful gradient images for your projects. 
            <span className="block text-[#CFFFE2] font-semibold mt-2">
              Transform your designs with stunning visual effects.
            </span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-7">
            <button className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-[#A2D5C6] via-[#CFFFE2] to-[#F6F6F6] text-black font-bold text-lg shadow-lg shadow-[#A2D5C6]/30 hover:shadow-[#A2D5C6]/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <span className="relative z-20">Explore Gradients</span>
            </button>
            
            <button className="group relative px-8 py-4 rounded-2xl border-2 border-[#F6F6F6]/30 bg-[#F6F6F6]/5 backdrop-blur-sm text-[#F6F6F6] font-bold text-lg hover:border-[#F6F6F6]/50 hover:bg-[#F6F6F6]/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <span className="relative z-20">Learn More</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#F6F6F6]/0 via-[#F6F6F6]/10 to-[#F6F6F6]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-2xl z-10"></div>
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center group">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] bg-clip-text text-transparent mb-2">500+</div>
              <div className="text-gray-400 text-sm font-medium">Gradient Collections</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#A2D5C6] to-[#CFFFE2] bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-gray-400 text-sm font-medium">Downloads</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#CFFFE2] to-[#F6F6F6] bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-gray-400 text-sm font-medium">Available</div>
            </div>
          </div>
        </div>
        
        
      </section>

      {/* Gallery Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] bg-clip-text text-transparent">
              Featured Gradients
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
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
        
        <div className="relative z-10 border-t border-[#A2D5C6]/20 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Gradient Library. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
