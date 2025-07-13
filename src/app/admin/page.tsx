'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import AdminPanel from '../../components/AdminPanel';

export default function AdminPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  // Check if user is admin (using the same logic as Navigation component)
  const isAdmin = user?.publicMetadata?.isAdmin === true || true; // Temporarily make everyone admin

  useEffect(() => {
    if (isLoaded && !user) {
      // User is not signed in, redirect to home
      router.push('/');
      return;
    }

    if (isLoaded && user && !isAdmin) {
      // User is signed in but not admin, redirect to home
      router.push('/');
      return;
    }

    // For now, we'll create a temporary token
    // In a real app, you'd get this from your authentication system
    if (user && isAdmin) {
      setToken('temporary-admin-token');
    }
  }, [user, isLoaded, isAdmin, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(120,119,198,0.1)_180deg,transparent_360deg)] animate-spin [animation-duration:20s]"></div>
        </div>
        
        {/* Loading Content */}
        <div className="relative z-10 text-center">
          <div className="inline-block p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            <div className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Initializing Admin Portal...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(239,68,68,0.3),transparent_50%)]"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="inline-block p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl">
            <div className="text-white text-xl font-semibold">Redirecting...</div>
          </div>
        </div>
      </div>
    );
  }

  const adminFeatures = [
    {
      id: 1,
      title: "Upload Gradients",
      description: "Add stunning new gradient images to expand the library collection",
      icon: "🎨",
      gradient: "from-violet-600 via-purple-600 to-blue-600",
      bgGradient: "from-violet-500/20 to-blue-500/20",
      active: true,
      stats: "Active"
    },
    {
      id: 2,
      title: "Manage Users",
      description: "Oversee user accounts, permissions, and community management",
      icon: "👥",
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      bgGradient: "from-emerald-500/20 to-cyan-500/20",
      active: false,
      stats: "Coming Soon"
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description: "Deep insights into downloads, trends, and user engagement",
      icon: "📊",
      gradient: "from-orange-600 via-red-600 to-pink-600",
      bgGradient: "from-orange-500/20 to-pink-500/20",
      active: false,
      stats: "Coming Soon"
    },
    {
      id: 4,
      title: "Content Moderation",
      description: "Review, approve, and curate user-submitted gradients",
      icon: "🛡️",
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
      bgGradient: "from-indigo-500/20 to-pink-500/20",
      active: false,
      stats: "Coming Soon"
    },
    {
      id: 5,
      title: "API Management",
      description: "Monitor API usage, rate limits, and developer access",
      icon: "⚡",
      gradient: "from-yellow-600 via-orange-600 to-red-600",
      bgGradient: "from-yellow-500/20 to-red-500/20",
      active: false,
      stats: "Coming Soon"
    },
    {
      id: 6,
      title: "System Health",
      description: "Server monitoring, performance metrics, and system status",
      icon: "💚",
      gradient: "from-green-600 via-emerald-600 to-teal-600",
      bgGradient: "from-green-500/20 to-teal-500/20",
      active: false,
      stats: "Coming Soon"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* Floating Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Hero Header */}
            <div className="text-center mb-16">
              <div className="inline-block p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full mb-6">
                <div className="bg-slate-900 rounded-full px-6 py-2">
                  <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Welcome back, {user?.firstName || 'Admin'}
                  </span>
                </div>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent tracking-tight">
                  Admin
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
                  Command Center
                </span>
              </h1>
              
              <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
                Orchestrate your gradient universe with precision and style. 
                Every pixel, every hue, under your complete control.
              </p>
            </div>

            {/* Upload Section - Enhanced */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                    Gradient Upload Studio
                  </h2>
                  <p className="text-white/70">Transform your creative visions into shareable masterpieces</p>
                </div>
                
                {token && (
                  <div className="max-w-4xl mx-auto">
                    <AdminPanel token={token} />
                  </div>
                )}
              </div>
            </div>

            {/* Admin Features Grid */}
            <div className="mb-16">
              <h2 className="text-4xl font-bold text-center mb-12">
                <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Power Tools & Analytics
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {adminFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className={`group relative cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                      activeCard === feature.id ? 'scale-105' : ''
                    }`}
                    onMouseEnter={() => setActiveCard(feature.id)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    {/* Card */}
                    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${feature.bgGradient} backdrop-blur-xl border border-white/10 p-6 h-full shadow-xl`}>
                      
                      {/* Gradient Border Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}></div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon & Status */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-4xl">{feature.icon}</div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            feature.active 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                              : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          }`}>
                            {feature.stats}
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                          {feature.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-white/70 text-sm leading-relaxed mb-4">
                          {feature.description}
                        </p>
                        
                        {/* Action Button */}
                        <div className={`inline-flex items-center text-sm font-semibold ${
                          feature.active 
                            ? 'text-white group-hover:text-purple-300' 
                            : 'text-white/50'
                        } transition-colors duration-300`}>
                          {feature.active ? 'Access Now' : 'Coming Soon'}
                          {feature.active && (
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      
                      {/* Hover Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl blur-xl`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats Section */}
            <div className="bg-gradient-to-r from-slate-800/50 to-purple-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Platform Overview
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    1,247
                  </div>
                  <div className="text-white/70 text-sm">Total Gradients</div>
                </div>
                
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    5,832
                  </div>
                  <div className="text-white/70 text-sm">Downloads</div>
                </div>
                
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    342
                  </div>
                  <div className="text-white/70 text-sm">Active Users</div>
                </div>
                
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    98.7%
                  </div>
                  <div className="text-white/70 text-sm">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
