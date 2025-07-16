"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import type { Gradient } from '../types/gradient';

interface FullPageViewProps {
  gradient: Gradient | null;
  onClose: () => void;
  onDownload: (id: string) => void;
  isUserLoggedIn: boolean;
}

export default function FullPageView({ 
  gradient, 
  onClose, 
  onDownload, 
  isUserLoggedIn 
}: FullPageViewProps) {
  // Lock background scroll when full page view is open
  useEffect(() => {
    if (gradient) {
      // Prevent scrolling on the body
      document.body.style.overflow = 'hidden';
      
      // Cleanup function to restore scrolling
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [gradient]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (gradient) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [gradient, onClose]);

  if (!gradient) return null;

  const id = gradient._id || gradient.public_id || '';
  const name = gradient.name || gradient.public_id || 'Untitled';
  const imageUrl = gradient.imageUrl || gradient.url || '';

  return (
    <div 
      className="fixed inset-0 bg-black z-50 flex flex-col"
      onClick={(e) => {
        // Close when clicking outside the image
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Header with close button */}
      <div 
        className="flex items-center justify-between p-4 bg-black/90 backdrop-blur-sm border-b border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-white text-xl font-semibold truncate">{name}</h1>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          aria-label="Close (Press ESC)"
          title="Close (Press ESC)"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main image container */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <div 
          className="max-w-full max-h-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <Image 
            src={imageUrl} 
            alt={name} 
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            style={{ width: 'auto', height: 'auto' }}
            priority={true}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
      </div>

      {/* Download button at the bottom */}
      <div 
        className="flex justify-center p-6 bg-black/90 backdrop-blur-sm border-t border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => onDownload(id)}
          disabled={!isUserLoggedIn || !id}
          className={`flex items-center gap-3 font-medium py-4 px-8 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg ${
            isUserLoggedIn 
              ? 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white hover:shadow-xl hover:shadow-purple-500/25' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
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
          {isUserLoggedIn ? 'Download Gradient' : 'Login to Download'}
        </button>
        
        {/* Instructions */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <p className="text-gray-400 text-xs">Press ESC or click outside to close</p>
        </div>
      </div>
    </div>
  );
}
