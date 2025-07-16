"use client";

import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import Link from "next/link";

export default function DocsPage() {
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
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#F6F6F6]/30 rounded-full animate-float"
          ></div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-[#CFFFE2] via-[#A2D5C6] to-[#F6F6F6] bg-clip-text text-transparent tracking-tight">
            Documentation
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about using Gradora Gradient Library
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative flex-1 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 sm:top-24 bg-gradient-to-br from-[#F6F6F6]/5 to-[#A2D5C6]/5 backdrop-blur-sm border border-[#F6F6F6]/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-lg font-bold mb-4 text-[#CFFFE2]">Table of Contents</h3>
              <nav className="space-y-2">
                <a href="#overview" className="block text-gray-300 hover:text-[#CFFFE2] transition-colors text-sm">Overview</a>
                <a href="#features" className="block text-gray-300 hover:text-[#CFFFE2] transition-colors text-sm">Features</a>
                <a href="#getting-started" className="block text-gray-300 hover:text-[#CFFFE2] transition-colors text-sm">Getting Started</a>
                <a href="#browsing" className="block text-gray-300 hover:text-[#CFFFE2] transition-colors text-sm">Browsing Gradients</a>
                <a href="#downloading" className="block text-gray-300 hover:text-[#CFFFE2] transition-colors text-sm">Downloading</a>
                <a href="#admin-features" className="block text-gray-300 hover:text-[#CFFFE2] transition-colors text-sm">Admin Features</a>
                <a href="#technical" className="block text-gray-300 hover:text-[#CFFFE2] transition-colors text-sm">Technical Details</a>
                <a href="#api" className="block text-gray-300 hover:text-[#CFFFE2] transition-colors text-sm">API Reference</a>
                <a href="#support" className="block text-gray-300 hover:text-[#CFFFE2] transition-colors text-sm">Support</a>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-[#F6F6F6]/5 to-[#A2D5C6]/5 backdrop-blur-sm border border-[#F6F6F6]/20 rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] bg-clip-text text-transparent">
                  Overview
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Gradora is a comprehensive gradient library platform designed to provide designers and developers 
                    with access to beautiful, high-quality gradient images. Our curated collection features over 500+ 
                    unique gradients that can be easily browsed, previewed, and downloaded for use in your projects.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Whether you&apos;re working on web design, mobile apps, presentations, or any creative project, 
                    Gradora offers the perfect gradient to enhance your visual storytelling.
                  </p>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-[#F6F6F6]/5 to-[#A2D5C6]/5 backdrop-blur-sm border border-[#F6F6F6]/20 rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] bg-clip-text text-transparent">
                  Key Features
                </h2>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-[#F6F6F6]/5 border border-[#F6F6F6]/10 rounded-lg sm:rounded-xl p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#CFFFE2] mb-2 sm:mb-3">🎨 Curated Collection</h3>
                    <p className="text-gray-300 text-sm">Over 500+ handpicked gradient images carefully selected for quality and versatility.</p>
                  </div>
                  <div className="bg-[#F6F6F6]/5 border border-[#F6F6F6]/10 rounded-lg sm:rounded-xl p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#CFFFE2] mb-2 sm:mb-3">📱 Responsive Design</h3>
                    <p className="text-gray-300 text-sm">Fully responsive interface that works seamlessly across all devices and screen sizes.</p>
                  </div>
                  <div className="bg-[#F6F6F6]/5 border border-[#F6F6F6]/10 rounded-lg sm:rounded-xl p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#CFFFE2] mb-2 sm:mb-3">🔍 Advanced Search</h3>
                    <p className="text-gray-300 text-sm">Powerful search functionality to quickly find the perfect gradient for your needs.</p>
                  </div>
                  <div className="bg-[#F6F6F6]/5 border border-[#F6F6F6]/10 rounded-lg sm:rounded-xl p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#CFFFE2] mb-2 sm:mb-3">⚡ Fast Downloads</h3>
                    <p className="text-gray-300 text-sm">Instant, high-quality downloads with multiple format options available.</p>
                  </div>
                  <div className="bg-[#F6F6F6]/5 border border-[#F6F6F6]/10 rounded-lg sm:rounded-xl p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#CFFFE2] mb-2 sm:mb-3">🔐 User Authentication</h3>
                    <p className="text-gray-300 text-sm">Secure user authentication powered by Clerk for personalized experience.</p>
                  </div>
                  <div className="bg-[#F6F6F6]/5 border border-[#F6F6F6]/10 rounded-lg sm:rounded-xl p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#CFFFE2] mb-2 sm:mb-3">🛡️ Admin Panel</h3>
                    <p className="text-gray-300 text-sm">Comprehensive admin dashboard for content management and user administration.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Getting Started */}
            <section id="getting-started" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-[#F6F6F6]/5 to-[#A2D5C6]/5 backdrop-blur-sm border border-[#F6F6F6]/20 rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] bg-clip-text text-transparent">
                  Getting Started
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Visit the Homepage</h3>
                      <p className="text-gray-300 text-sm">Navigate to the main page to see featured gradients and get an overview of our collection.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] rounded-full flex items-center justify-center text-black font-bold text-sm">2</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Browse the Gallery</h3>
                      <p className="text-gray-300 text-sm">Explore our extensive collection of gradients organized in an easy-to-navigate gallery format.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] rounded-full flex items-center justify-center text-black font-bold text-sm">3</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Search & Filter</h3>
                      <p className="text-gray-300 text-sm">Use our search functionality to find specific gradients or filter by categories.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] rounded-full flex items-center justify-center text-black font-bold text-sm">4</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Download & Use</h3>
                      <p className="text-gray-300 text-sm">Click on any gradient to preview it in full size, then download it for your projects.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Browsing Gradients */}
            <section id="browsing" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-[#F6F6F6]/5 to-[#A2D5C6]/5 backdrop-blur-sm border border-[#F6F6F6]/20 rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] bg-clip-text text-transparent">
                  Browsing Gradients
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#CFFFE2] mb-2">Gallery View</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Our gallery displays gradients in a responsive grid layout. Each gradient card shows a preview 
                      of the gradient along with quick action buttons for viewing and downloading.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#CFFFE2] mb-2">Search Functionality</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Use the search bar to find gradients by name, color, or style. The search is real-time and 
                      provides instant results as you type.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#CFFFE2] mb-2">Preview Modal</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Click on any gradient to open it in a full-screen modal where you can see the gradient in 
                      high resolution and access download options.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Downloading */}
            <section id="downloading" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-[#F6F6F6]/5 to-[#A2D5C6]/5 backdrop-blur-sm border border-[#F6F6F6]/20 rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] bg-clip-text text-transparent">
                  Downloading Gradients
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#CFFFE2] mb-2">Download Process</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Simply click the download button on any gradient card or in the preview modal. 
                      The download will start immediately with the highest quality version available.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#CFFFE2] mb-2">File Formats</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      All gradients are available in high-resolution PNG format, optimized for web and print use. 
                      Files are typically delivered in 1920x1080 resolution or higher.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#CFFFE2] mb-2">Usage Rights</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      All gradients in our library are free to use for both personal and commercial projects. 
                      No attribution required, though it&apos;s always appreciated.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Admin Features */}
            <section id="admin-features" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-[#F6F6F6]/5 to-[#A2D5C6]/5 backdrop-blur-sm border border-[#F6F6F6]/20 rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] bg-clip-text text-transparent">
                  Admin Features
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#CFFFE2] mb-2">Content Management</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Administrators can upload new gradients, edit existing ones, and manage the entire collection 
                      through our comprehensive admin panel.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#CFFFE2] mb-2">User Management</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      View and manage user accounts, monitor activity, and handle user-related administrative tasks.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#CFFFE2] mb-2">Analytics Dashboard</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Track download statistics, popular gradients, and other key metrics to understand user engagement.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Details */}
            <section id="technical" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-[#F6F6F6]/5 to-[#A2D5C6]/5 backdrop-blur-sm border border-[#F6F6F6]/20 rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] bg-clip-text text-transparent">
                  Technical Details
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#CFFFE2] mb-3">Frontend Technologies</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Next.js 15 (React Framework)</li>
                      <li>• TypeScript for type safety</li>
                      <li>• Tailwind CSS for styling</li>
                      <li>• GSAP for animations</li>
                      <li>• Embla Carousel for galleries</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#CFFFE2] mb-3">Backend & Services</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• MongoDB for database</li>
                      <li>• Cloudinary for image storage</li>
                      <li>• Clerk for authentication</li>
                      <li>• API routes for backend logic</li>
                      <li>• Vercel for deployment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* API Reference */}
            <section id="api" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-[#F6F6F6]/5 to-[#A2D5C6]/5 backdrop-blur-sm border border-[#F6F6F6]/20 rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] bg-clip-text text-transparent">
                  API Reference
                </h2>
                <div className="space-y-6">
                  <div className="bg-[#F6F6F6]/5 border border-[#F6F6F6]/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-[#CFFFE2] mb-3">GET /api/gradients</h3>
                    <p className="text-gray-300 text-sm mb-3">Retrieve all gradients from the database.</p>
                    <div className="bg-black/30 rounded-lg p-4 text-sm font-mono">
                      <span className="text-green-400">GET</span> <span className="text-blue-400">/api/gradients</span>
                    </div>
                  </div>
                  <div className="bg-[#F6F6F6]/5 border border-[#F6F6F6]/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-[#CFFFE2] mb-3">POST /api/upload</h3>
                    <p className="text-gray-300 text-sm mb-3">Upload a new gradient (Admin only).</p>
                    <div className="bg-black/30 rounded-lg p-4 text-sm font-mono">
                      <span className="text-yellow-400">POST</span> <span className="text-blue-400">/api/upload</span>
                    </div>
                  </div>
                  <div className="bg-[#F6F6F6]/5 border border-[#F6F6F6]/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-[#CFFFE2] mb-3">GET /api/download</h3>
                    <p className="text-gray-300 text-sm mb-3">Download a specific gradient by ID.</p>
                    <div className="bg-black/30 rounded-lg p-4 text-sm font-mono">
                      <span className="text-green-400">GET</span> <span className="text-blue-400">/api/download?id=[gradient_id]</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Support */}
            <section id="support" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-[#F6F6F6]/5 to-[#A2D5C6]/5 backdrop-blur-sm border border-[#F6F6F6]/20 rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] bg-clip-text text-transparent">
                  Support & Contact
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#CFFFE2] mb-3">Get Help</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </div>
                        <div>
                          <a href="https://github.com/shresthjindal28/gradient-library" className="text-white hover:text-[#CFFFE2] transition-colors">GitHub Repository</a>
                          <p className="text-gray-400 text-xs">Report issues and contribute</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </div>
                        <div>
                          <a href="https://www.linkedin.com/in/shresth-jindal-b074ba28b/" className="text-white hover:text-[#CFFFE2] transition-colors">LinkedIn Profile</a>
                          <p className="text-gray-400 text-xs">Connect with the developer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#CFFFE2] mb-3">Quick Info</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <p><strong>Current Version:</strong> 1.0.0</p>
                      <p><strong>Last Updated:</strong> July 2025</p>
                      <p><strong>License:</strong> Free for personal and commercial use</p>
                      <p><strong>Browser Support:</strong> All modern browsers</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Back to top"
          aria-label="Back to top"
          className="group relative p-3 bg-gradient-to-r from-[#A2D5C6] to-[#CFFFE2] rounded-full shadow-lg shadow-[#A2D5C6]/30 hover:shadow-[#A2D5C6]/50 transition-all duration-300 hover:scale-110"
        >
          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>

      {/* Footer */}
      <footer className="relative mt-16 py-12 px-8 border-t border-[#A2D5C6]/20 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <Link href="/" className="inline-block mb-4">
            <h3 className="text-2xl font-black bg-gradient-to-r from-[#CFFFE2] via-[#A2D5C6] to-[#F6F6F6] bg-clip-text text-transparent tracking-wider">
              GRADORA
            </h3>
          </Link>
          <p className="text-gray-400 text-sm mb-6">
            Transform your designs with beautiful gradients
          </p>
          <div className="border-t border-[#A2D5C6]/20 pt-6">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Gradient Library. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
