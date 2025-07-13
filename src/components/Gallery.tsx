import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import GradientCard from './GradientCard';
import GradientModal from './GradientModal';
import type { Gradient } from '../types/gradient';
import SearchBar from './SearchBar';
import Carosal from './Carosal';



// Local gradients using images from public folder
const localGradients: Gradient[] = [
  {
    _id: 'local-1',
    public_id: 'local-1',
    name: 'ChatGPT Image 1',
    url: '/ChatGPT Image Jul 13, 2025, 12_44_18 PM.png',
    imageUrl: '/ChatGPT Image Jul 13, 2025, 12_44_18 PM.png',
    created_at: '2025-07-13T00:00:00Z'
  },
  {
    _id: 'local-2',
    public_id: 'local-2',
    name: 'ChatGPT Image 2',
    url: '/ChatGPT Image Jul 13, 2025, 01_04_10 PM.png',
    imageUrl: '/ChatGPT Image Jul 13, 2025, 01_04_10 PM.png',
    created_at: '2025-07-13T00:00:00Z'
  },
  {
    _id: 'local-4',
    public_id: 'local-4',
    name: 'ChatGPT Image 4',
    url: '/ChatGPT Image Jul 13, 2025, 01_31_28 PM.png',
    imageUrl: '/ChatGPT Image Jul 13, 2025, 01_31_28 PM.png',
    created_at: '2025-07-13T00:00:00Z'
  },
  {
    _id: 'local-5',
    public_id: 'local-5',
    name: 'Milad Fakurian',
    url: '/milad-fakurian-nY14Fs8pxT8-unsplash.jpg',
    imageUrl: '/milad-fakurian-nY14Fs8pxT8-unsplash.jpg',
    created_at: '2025-07-13T00:00:00Z'
  }
];

export default function Gallery() {
  const { user } = useUser();
  const [gradients, setGradients] = useState<Gradient[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGradient, setSelectedGradient] = useState<Gradient | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/gradients')
      .then(res => {
        setGradients(res.data.gradients);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load gradients');
        setLoading(false);
      });
  }, []);

  const handleDownload = async (id: string) => {
    try {
      // Try to find the gradient in both remote and local arrays using both _id and public_id
      let gradient = gradients.find(g => g._id === id || g.public_id === id);
      if (!gradient) {
        gradient = localGradients.find(g => g._id === id || g.public_id === id);
      }
      if (!gradient) throw new Error('Gradient not found');
      const imageUrl = gradient.imageUrl || gradient.url;
      if (!imageUrl) throw new Error('Image URL not found');
      const safeName = gradient.name ? gradient.name : gradient.public_id ? gradient.public_id : 'gradient';
      const fileName = `${safeName.replace(/[^a-zA-Z0-9]/g, '_')}.png`;

      // If the image is a local file (starts with /), download directly
      if (imageUrl.startsWith('/')) {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      // For remote images, use the API route
      const response = await fetch(`/api/download?url=${encodeURIComponent(imageUrl)}`);
      if (!response.ok) {
        const text = await response.text();
        setError(`Download failed: ${text}`);
        setTimeout(() => setError(''), 3000);
        return;
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      setError('Download failed.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const openModal = (gradient: Gradient) => setSelectedGradient(gradient);
  const closeModal = () => setSelectedGradient(null);

  const filteredGradients = gradients.filter(g => {
    const name = g.name || g.public_id || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Helper to get the correct id for a gradient (local or remote)
  function getGradientId(gradient: Gradient) {
    return gradient._id || gradient.public_id || '';
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <Carosal
        gradients={localGradients}
      />



        {/* Search Section */}
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          onClearSearch={() => setSearchTerm('')} 
        />

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-gray-400 text-lg font-medium">Loading gradients...</p>
          </div>
        ) : filteredGradients.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No gradients found</h3>
              <p className="text-gray-500">
                {searchTerm ? `No results for "${searchTerm}"` : 'No gradients available'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredGradients.map(gradient => {
              const id = getGradientId(gradient);
              return (
                <GradientCard
                  key={id}
                  gradient={{
                    ...gradient,
                    name: gradient.name || gradient.public_id || 'Untitled',
                    imageUrl: gradient.imageUrl || gradient.url || '',
                    _id: gradient._id,
                    public_id: gradient.public_id,
                  }}
                  onDownload={handleDownload}
                  onOpenModal={openModal}
                  isUserLoggedIn={!!user}
                />
              );
            })}
          </div>
        )}

        {/* Results Count */}
        {!loading && filteredGradients.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-400 text-sm">
              Showing {filteredGradients.length} of {gradients.length} gradients
            </p>
          </div>
        )}
      </div>

      {/* Modal for selected gradient */}
      <GradientModal
        gradient={selectedGradient && (selectedGradient._id || selectedGradient.public_id) ? selectedGradient : null}
        onClose={closeModal}
        onDownload={handleDownload}
        isUserLoggedIn={!!user}
      />
    </div>
  );
}
