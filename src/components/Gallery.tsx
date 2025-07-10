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
    <div className="gallery">
      <h2>Gradient Gallery</h2>
      
      <div className="gallery-controls">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search gradients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="search-clear" 
              onClick={() => setSearchTerm('')}
            >
              ×
            </button>
          )}
        </div>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading gradients...</p>
        </div>
      ) : filteredGradients.length === 0 ? (
        <div className="no-results">
          <p>No gradients found matching `{searchTerm}`</p>
        </div>
      ) : (
        <div className="gradient-list">
          {filteredGradients.map(gradient => (
            <div key={gradient._id} className="gradient-item">
              <div className="gradient-image-container" onClick={() => openModal(gradient)}>
                <Image 
                  src={gradient.imageUrl} 
                  alt={gradient.name} 
                  width={300} 
                  height={300} 
                  className="gradient-img" 
                />
                <div className="gradient-overlay">
                  <span className="view-text">View</span>
                </div>
              </div>
              <div className="gradient-info">
                <h3>{gradient.name}</h3>
                <button 
                  onClick={() => handleDownload(gradient._id)}
                  className="download-btn"
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
        <div className="gradient-modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-image-container">
              <Image 
                src={selectedGradient.imageUrl} 
                alt={selectedGradient.name} 
                width={600} 
                height={600} 
                className="modal-image"
              />
            </div>
            <div className="modal-info">
              <h3>{selectedGradient.name}</h3>
              <button 
                onClick={() => handleDownload(selectedGradient._id)}
                className="modal-download-btn"
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
