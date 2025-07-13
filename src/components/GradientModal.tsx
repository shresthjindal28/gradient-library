import React from 'react';
import Image from 'next/image';

interface Gradient {
  _id: string;
  name: string;
  imageUrl: string;
}

interface GradientModalProps {
  gradient: Gradient | null;
  onClose: () => void;
  onDownload: (id: string) => void;
  isUserLoggedIn: boolean;
}

export default function GradientModal({ 
  gradient, 
  onClose, 
  onDownload, 
  isUserLoggedIn 
}: GradientModalProps) {
  if (!gradient) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-900/95 backdrop-blur-sm border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">{gradient.name}</h2>
          <button 
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="aspect-video rounded-xl overflow-hidden mb-6">
            <Image 
              src={gradient.imageUrl} 
              alt={gradient.name} 
              width={800} 
              height={600} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end">
            <button 
              onClick={() => onDownload(gradient._id)}
              disabled={!isUserLoggedIn}
              className={`font-medium py-3 px-8 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 ${
                isUserLoggedIn 
                  ? 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white hover:shadow-lg hover:shadow-purple-500/25' 
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isUserLoggedIn ? 'Download Gradient' : 'Login to Download'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 