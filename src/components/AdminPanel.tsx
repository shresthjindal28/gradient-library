import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function AdminPanel({ token }: { token: string }) {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    
    // Create preview URL
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    setMessage('');
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);
    
    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Add to gradients DB
      await axios.post('/api/gradients', { name, imageUrl: res.data.imageUrl }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setMessage('Gradient successfully uploaded!');
      setName('');
      setFile(null);
      setPreviewUrl(null);
      
      // Reset file input
      const fileInput = document.getElementById('gradient-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Upload failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="admin-panel">
      <h2>Add New Gradient</h2>
      
      <div className="form-field">
        <label htmlFor="gradient-name">Gradient Name</label>
        <input 
          id="gradient-name"
          type="text"
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Enter a name for the gradient" 
          required 
          disabled={isLoading}
        />
      </div>
      
      <div className="file-upload-container">
        <label htmlFor="gradient-file" className="file-upload-label">
          {previewUrl ? 'Change Image' : 'Select Gradient Image'}
        </label>
        <input
          id="gradient-file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="file-input"
          disabled={isLoading}
        />
        
        {previewUrl && (
          <div className="file-preview">
            <Image 
              src={previewUrl} 
              alt="Preview" 
              width={200} 
              height={200} 
              className="preview-image"
            />
          </div>
        )}
      </div>
      
      <button 
        type="submit" 
        disabled={isLoading || !file}
        className={isLoading ? 'loading' : ''}
      >
        {isLoading ? 'Uploading...' : 'Upload Gradient'}
      </button>
      
      {message && (
        <div className={message.includes('failed') ? 'error' : 'message'}>
          {message}
        </div>
      )}
    </form>
  );
}
