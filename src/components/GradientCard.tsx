import React from 'react';
import Image from 'next/image';

interface Gradient {
  _id: string;
  name: string;
  imageUrl: string;
}

interface GradientCardProps {
  gradient: Gradient;
  onDownload: (id: string) => void;
  onOpenModal: (gradient: Gradient) => void;
  isUserLoggedIn: boolean;
}

export default function GradientCard({ 
  gradient, 
  onDownload, 
  onOpenModal, 
  isUserLoggedIn 
}: GradientCardProps) {
  return (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => onOpenModal(gradient)}>
        <Image 
          src={gradient.imageUrl} 
          alt={gradient.name} 
          width={400} 
          height={400} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
        {/* Download Icon in Top-Right Corner */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDownload(gradient._id);
            }}
            disabled={!isUserLoggedIn}
            className={`p-3 rounded-full transition-all duration-200 transform hover:scale-110 shadow-lg ${
              isUserLoggedIn 
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white hover:shadow-xl hover:shadow-purple-500/30' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            title={isUserLoggedIn ? 'Download' : 'Login to Download'}
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
              />
            </svg>
          </button>
        </div>

        {/* Hover Overlay for View Details */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
            <span className="text-white font-medium text-sm">View Details</span>
          </div>
        </div>
      </div>
    </div>
  );
} 