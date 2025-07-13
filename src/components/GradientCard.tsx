
import React from 'react';
import Image from 'next/image';


// Unified Gradient interface for both local and Cloudinary gradients
export interface Gradient {
  _id?: string;
  public_id?: string;
  name?: string;
  imageUrl?: string;
  url?: string;
  created_at?: string;
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
  // Fallbacks for required fields
  const id = gradient._id || gradient.public_id || '';
  const name = gradient.name || gradient.public_id || 'Untitled';
  const imageUrl = gradient.imageUrl || gradient.url || '';

  return (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 relative">
      {/* Download Icon in Top-Right Corner - always visible and outside modal trigger */}
      <div className="absolute top-3 right-3 z-20">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDownload(id);
          }}
          disabled={!isUserLoggedIn || !id}
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
      {/* Image Container - only triggers modal */}
      <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => onOpenModal(gradient)}>
        <Image 
          src={imageUrl} 
          alt={name} 
          width={400} 
          height={400} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
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