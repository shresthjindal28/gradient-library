import React from 'react';

export default function RoutesIndexPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-[#CFFFE2] via-[#A2D5C6] to-[#F6F6F6] bg-clip-text text-transparent">
            Manual Routing Example
          </h1>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10">
            <p className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-6">
              This is the <code className="px-2 py-1 bg-white/10 rounded text-[#CFFFE2]">/routes</code> index page.
            </p>
            <p className="text-base sm:text-lg text-gray-400">
              Try visiting <code className="px-2 py-1 bg-white/10 rounded text-[#A2D5C6]">/routes/anything</code> to see manual routing in action.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 