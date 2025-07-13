import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser, useAuth } from '@clerk/nextjs';
import GradientCard from './GradientCard';
import GradientModal from './GradientModal';
import SearchBar from './SearchBar';
import Carosal from './Carosal';

interface Gradient {
  _id: string;
  name: string;
  imageUrl: string;
}

// Local gradients using images from public folder
const localGradients: Gradient[] = [
  {
    _id: 'local-1',
    name: 'ChatGPT Image',
    imageUrl: '/ChatGPT Image Jul 13, 2025, 12_44_18 PM.png'
  },
  {
    _id: 'local-2',
    name: 'Galactic',
    imageUrl: '/Galactic.png'
  },
  {
    _id: 'local-3',
    name: 'Gloosy Wave',
    imageUrl: '/gloosy-wave5.png'
  },
  {
    _id: 'local-4',
    name: 'Milad Fakurian',
    imageUrl: '/milad-fakurian-nY14Fs8pxT8-unsplash.jpg'
  }
];

export default function Gallery() {
  const { user } = useUser();
  const { getToken } = useAuth();
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
    if (!user) {
      setError('You must be logged in to download.');
      setTimeout(() => setError(''), 3000);
      return;
    }
    try {
      const token = await getToken();
      const gradient = gradients.find(g => g._id === id);
      const fileName = gradient ? `${gradient.name.replace(/[^a-zA-Z0-9]/g, '_')}.png` : 'gradient.png';
      const response = await fetch(`/api/download?id=${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Download failed');
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
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError('Unauthorized: Please log in again.');
      } else {
        setError('Download failed.');
      }
      setTimeout(() => setError(''), 3000);
    }
  };

  const openModal = (gradient: Gradient) => setSelectedGradient(gradient);
  const closeModal = () => setSelectedGradient(null);

  const filteredGradients = gradients.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            {filteredGradients.map(gradient => (
              <GradientCard
                key={gradient._id}
                gradient={gradient}
                onDownload={handleDownload}
                onOpenModal={openModal}
                isUserLoggedIn={!!user}
              />
            ))}
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
        gradient={selectedGradient}
        onClose={closeModal}
        onDownload={handleDownload}
        isUserLoggedIn={!!user}
      />
    </div>
  );
}
