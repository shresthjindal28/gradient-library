'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';


// Unified Gradient interface for both local and Cloudinary gradients
interface Gradient {
  _id?: string;
  public_id?: string;
  name?: string;
  imageUrl?: string;
  url?: string;
  created_at?: string;
}

interface CarouselProps {
  gradients: Gradient[];
  autoPlay?: boolean;
  interval?: number;
}

export default function Carousel({ 
  gradients, 
  autoPlay = true,
  interval = 3000
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && gradients.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % gradients.length);
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, interval, gradients.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % gradients.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + gradients.length) % gradients.length);
  };

  const goToCard = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!gradients || gradients.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gradient-to-br from-[#A2D5C6]/20 to-[#CFFFE2]/20 rounded-2xl border border-[#F6F6F6]/10">
        <p className="text-white/60 text-lg">No gradients available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full flex items-center justify-center flex-col mb-6 sm:mb-8 md:mb-10">
            {/* Main Carousel Container */}
      <div className="relative h-[40vh] w-[90vw] sm:h-[50vh] sm:w-[85vw] md:h-[60vh] md:w-[80vw] lg:h-[70vh] lg:w-[70vw] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-transparent bg-gradient-to-r from-[#A2D5C6] via-[#CFFFE2] to-[#F6F6F6] bg-clip-border before:absolute before:inset-0 before:rounded-lg sm:before:rounded-xl md:before:rounded-2xl before:p-[2px] before:bg-gradient-to-r before:from-[#A2D5C6] before:via-[#CFFFE2] before:to-[#F6F6F6] before:animate-pulse after:absolute after:inset-0 after:rounded-lg sm:after:rounded-xl md:after:rounded-2xl after:bg-gradient-to-r after:from-[#A2D5C6]/50 after:via-[#CFFFE2]/50 after:to-[#F6F6F6]/50 after:animate-[pulse_3s_ease-in-out_infinite] shadow-[0_0_10px_rgba(162,213,198,0.4),0_0_20px_rgba(207,255,226,0.3),0_0_30px_rgba(246,246,246,0.2)] sm:shadow-[0_0_15px_rgba(162,213,198,0.4),0_0_30px_rgba(207,255,226,0.3),0_0_45px_rgba(246,246,246,0.2)] md:shadow-[0_0_20px_rgba(162,213,198,0.4),0_0_40px_rgba(207,255,226,0.3),0_0_60px_rgba(246,246,246,0.2)] hover:shadow-[0_0_15px_rgba(162,213,198,0.6),0_0_30px_rgba(207,255,226,0.4),0_0_45px_rgba(246,246,246,0.3)] sm:hover:shadow-[0_0_20px_rgba(162,213,198,0.6),0_0_40px_rgba(207,255,226,0.4),0_0_60px_rgba(246,246,246,0.3)] md:hover:shadow-[0_0_30px_rgba(162,213,198,0.6),0_0_60px_rgba(207,255,226,0.4),0_0_90px_rgba(246,246,246,0.3)] transition-all duration-1000">
        <div className="relative h-full w-full rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-[#A2D5C6]/20 to-[#CFFFE2]/20">
          <div ref={carouselRef} className="relative w-full h-full">
          {gradients.map((gradient, index) => (
            <div
              key={gradient._id}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
                index === currentIndex 
                  ? 'opacity-100 scale-100 translate-x-0 rotate-y-0 z-10' 
                  : index === (currentIndex - 1 + gradients.length) % gradients.length
                  ? 'opacity-0 scale-75 -translate-x-full rotate-y-12 z-0'
                  : index === (currentIndex + 1) % gradients.length
                  ? 'opacity-0 scale-75 translate-x-full -rotate-y-12 z-0'
                  : 'opacity-0 scale-75 translate-x-full z-0'
              }`}
            >
              <div className="w-full h-full">
                <Image 
                  src={gradient.imageUrl || '/placeholder.png'} 
                  alt={gradient.name || 'Gradient image'} 
                  width={0}
                  height={0}
                  sizes="(max-width: 640px) 90vw, (max-width: 768px) 85vw, (max-width: 1024px) 80vw, 70vw"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-125" 
                />
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {gradients.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 md:p-3 rounded-full bg-[#F6F6F6]/10 backdrop-blur-sm border border-[#F6F6F6]/20 text-white hover:bg-[#F6F6F6]/20 transition-all duration-200 hover:scale-110"
              aria-label="Previous card"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 md:p-3 rounded-full bg-[#F6F6F6]/10 backdrop-blur-sm border border-[#F6F6F6]/20 text-white hover:bg-[#F6F6F6]/20 transition-all duration-200 hover:scale-110"
              aria-label="Next card"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Play/Pause Button */}
        {gradients.length > 1 && (
          <button
            onClick={togglePlayPause}
            className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 z-20 p-1.5 sm:p-2 md:p-2 rounded-full bg-[#F6F6F6]/10 backdrop-blur-sm border border-[#F6F6F6]/20 text-white hover:bg-[#F6F6F6]/20 transition-all duration-200"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Dots Indicator */}
      {gradients.length > 1 && (
        <div className="flex justify-center mt-3 sm:mt-4 md:mt-6 space-x-1.5 sm:space-x-2">
          {gradients.map((_, index) => (
            <button
              key={index}
              onClick={() => goToCard(index)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-[#CFFFE2] to-[#A2D5C6] scale-125'
                  : 'bg-[#F6F6F6]/30 hover:bg-[#F6F6F6]/50'
              }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Card Counter */}
      {gradients.length > 1 && (
        <div className="text-center mt-2 sm:mt-3 md:mt-4">
          <span className="text-white/60 text-xs sm:text-sm">
            {currentIndex + 1} of {gradients.length}
          </span>
        </div>
      )}
    </div>
  );
}
