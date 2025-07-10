import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Gradient {
  _id: string;
  name: string;
  imageUrl: string;
}

export default function Gallery({ token }: { token?: string }) {
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
    if (!token) {
      setError('You must be logged in to download.');
      setTimeout(() => setError(''), 3000);
      return;
    }
    
    try {
      const res = await axios.get(`/api/download?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.open(res.data.imageUrl, '_blank');
    } catch {
      setError('Download failed.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const openModal = (gradient: Gradient) => {
    setSelectedGradient(gradient);
  };

  const closeModal = () => {
    setSelectedGradient(null);
  };

  const filteredGradients = gradients.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto my-16">
      <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-purple-700 bg-clip-text text-transparent tracking-tight">Gradient Gallery</h2>
      
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <input 
            type="text" 
            placeholder="Search gradients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3.5 px-5 rounded-full border border-purple-500/20 bg-[rgba(30,30,30,0.8)] text-white text-base transition-all focus:outline-none focus:border-purple-400 focus:shadow-[0_0_0_2px_rgba(139,92,246,0.2)]"
          />
          {searchTerm && (
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-gray-400 text-2xl cursor-pointer transition-colors hover:text-white"
              onClick={() => setSearchTerm('')}
            >
              ×
            </button>
          )}
        </div>
      </div>
      
      {error && <div className="text-[#ff4d6d] mt-2 text-sm bg-[rgba(255,77,109,0.1)] p-2.5 rounded-md border-l-[3px] border-[#ff4d6d]">{error}</div>}
      
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[200px] gap-5 text-gray-300">
          <div className="w-10 h-10 border-3 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
          <p>Loading gradients...</p>
        </div>
      ) : filteredGradients.length === 0 ? (
        <div className="text-center py-12 text-gray-300 text-xl">
          <p>No gradients found matching `{searchTerm}`</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredGradients.map(gradient => (
            <div key={gradient._id} className="bg-[rgba(15,15,15,0.8)] rounded-2xl border border-purple-500/20 backdrop-blur-lg p-5 text-center transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              <div className="relative overflow-hidden rounded-xl cursor-pointer" onClick={() => openModal(gradient)}>
                <Image 
                  src={gradient.imageUrl} 
                  alt={gradient.name} 
                  width={300} 
                  height={300} 
                  className="w-full h-[250px] object-cover transition-transform duration-500 hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100">
                  <span className="text-white font-medium px-5 py-2 bg-black/60 rounded-full">View</span>
                </div>
              </div>
              <div className="py-3">
                <h3 className="font-medium text-lg mb-3">{gradient.name}</h3>
                <button 
                  onClick={() => handleDownload(gradient._id)}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-700 to-purple-400 text-white border-none font-medium cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for selected gradient */}
      {selectedGradient && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur flex items-center justify-center z-[1000]" onClick={closeModal}>
          <div className="bg-[rgba(15,15,15,0.8)] rounded-2xl max-w-[90%] w-[700px] overflow-hidden relative border border-purple-500/20" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 bg-black/50 border-none text-white w-[30px] h-[30px] rounded-full flex items-center justify-center text-2xl cursor-pointer z-10" onClick={closeModal}>×</button>
            <div className="w-full h-[400px] overflow-hidden">
              <Image 
                src={selectedGradient.imageUrl} 
                alt={selectedGradient.name} 
                width={600} 
                height={600} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-5 flex justify-between items-center">
              <h3 className="text-2xl font-medium">{selectedGradient.name}</h3>
              <button 
                onClick={() => handleDownload(selectedGradient._id)}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-700 to-purple-400 text-white border-none font-medium cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
              >
                Download Gradient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
