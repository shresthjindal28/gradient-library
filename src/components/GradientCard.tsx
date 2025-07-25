
import React from 'react';
import Image from 'next/image';


import type { Gradient } from '../types/gradient';

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
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 sm:hover:-translate-y-2 relative w-full">
      {/* Download Icon in Top-Right Corner - visible on hover */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDownload(id);
          }}
          disabled={!isUserLoggedIn || !id}
          className={`p-2 sm:p-3 rounded-full transition-all duration-200 transform hover:scale-110 shadow-lg ${
            isUserLoggedIn 
              ? 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white hover:shadow-xl hover:shadow-purple-500/30' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
          title={isUserLoggedIn ? 'Download' : 'Login to Download'}
        >
          <svg 
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" 
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
      {/* Image Container - maintaining original aspect ratio for masonry layout */}
      <div className="relative w-full overflow-hidden cursor-pointer" onClick={() => onOpenModal(gradient)}>
        <Image 
          src={imageUrl} 
          alt={name} 
          width={0}
          height={0}
          sizes="(max-width: 480px) 50vw, (max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, (max-width: 1280px) 16vw, (max-width: 1536px) 14vw, 12vw"
          className="gradient-image w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" 
          style={{ aspectRatio: 'auto' }}
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>
    </div>
  );
} 