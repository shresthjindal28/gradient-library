import React, { useState } from 'react';

export default function AdminPanel() {
  const [isUploadMode, setIsUploadMode] = useState(false);
  
  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4 shadow-lg shadow-blue-500/25">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Quick Upload</h2>
        <p className="text-gray-400 text-sm">Upload new gradients to your collection in seconds</p>
      </div>

      {/* Upload Interface */}
      <div className="space-y-6">
        {/* Toggle Upload Mode */}
        <div className="flex items-center justify-center">
          <button
            onClick={() => setIsUploadMode(!isUploadMode)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              isUploadMode 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            {isUploadMode ? '✓ Upload Mode Active' : '📁 Enable Upload Mode'}
          </button>
        </div>

        {isUploadMode && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 animate-in slide-in-from-top">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Upload Ready</h3>
              <p className="text-gray-400 text-sm mb-4">
                Use the Gradient Management section below for full upload functionality
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-300 text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Scroll down to upload gradients
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer group">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <span className="text-white text-sm font-bold">📊</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">View Analytics</h4>
                <p className="text-xs text-gray-400">Check upload stats</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer group">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <span className="text-white text-sm font-bold">⚙️</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">Settings</h4>
                <p className="text-xs text-gray-400">Upload preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
