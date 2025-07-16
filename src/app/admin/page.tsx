'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import AdminPanel from '../../components/AdminPanel';
import AdminGradientManager from '../../components/AdminGradientManager';
import AdminUserManager from '../../components/AdminUserManager';

export default function AdminPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
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
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Ultra Modern Dynamic Background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-gray-900 to-black"></div>
        
        {/* Animated geometric patterns */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-conic from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-conic from-emerald-500/20 via-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-conic from-purple-500/20 via-pink-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse [animation-delay:4s]"></div>
        </div>
        
        {/* Modern grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_70%_80%_at_50%_50%,#000_50%,transparent_100%)]"></div>
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHJlc3VsdD0ibm9pc2UiLz48ZmVDb2xvck1hdHJpeCBpbj0ibm9pc2UiIHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiLz48ZmVDb21wb25lbnRUcmFuc2ZlciBpbj0ibm9pc2UiIHR5cGU9ImRpc2NyZXRlIiB0YWJsZVZhbHVlcz0iMCAwLjEiLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20"></div>
      </div>

      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GA</span>
              </div>
              <h1 className="text-xl font-bold text-white">Admin Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <span className="text-sm text-white/80">Welcome, {user?.firstName || 'Admin'}</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <div className="px-6 py-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 rounded-full">
                  <span className="text-sm font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    ⚡ Admin Dashboard
                  </span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black mb-6 text-white leading-tight">
                Gradient Library
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Control Center
                </span>
              </h1>
              
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Manage your gradient collection, monitor user activity, and maintain the quality of your design library with precision tools.
              </p>
            </div>

            {/* Quick Actions Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {/* Upload Quick Action */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-2xl p-8 h-full">
                  <AdminPanel />
                </div>
              </div>
              
              {/* Stats Sidebar */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                    Platform Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Total Gradients</span>
                      <span className="text-lg font-bold text-white">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Active Users</span>
                      <span className="text-lg font-bold text-emerald-400">342</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Downloads Today</span>
                      <span className="text-lg font-bold text-blue-400">89</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">System Health</span>
                      <span className="text-sm font-semibold text-green-400">Excellent</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-all duration-200 text-left">
                      🔄 Sync Database
                    </button>
                    <button className="w-full py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-all duration-200 text-left">
                      📊 Generate Report
                    </button>
                    <button className="w-full py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-all duration-200 text-left">
                      🧹 Cleanup Cache
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Management Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8">
              {/* Gradient Management */}
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-2xl p-8">
                <AdminGradientManager />
              </div>

              {/* User Management */}
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-2xl p-8">
                <AdminUserManager />
              </div>
            </div>

            {/* Advanced Features Grid */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Advanced Tools & Analytics
                </span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
                {adminFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className={`group relative cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                      activeCard === feature.id ? 'scale-[1.02]' : ''
                    }`}
                    onMouseEnter={() => setActiveCard(feature.id)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl border border-white/10 p-6 h-full hover:border-white/20 transition-all duration-300">
                      
                      {/* Status indicator */}
                      <div className="absolute top-4 right-4">
                        <div className={`w-2 h-2 rounded-full ${
                          feature.active ? 'bg-green-400 animate-pulse' : 'bg-gray-500'
                        }`}></div>
                      </div>
                      
                      {/* Icon */}
                      <div className="w-12 h-12 mb-4 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      
                      {/* Status badge */}
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        feature.active 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                      }`}>
                        {feature.stats}
                      </div>
                      
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
