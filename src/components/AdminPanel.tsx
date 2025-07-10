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
    <form onSubmit={handleUpload} className="flex flex-col gap-4 max-w-[380px] mx-auto p-8 rounded-2xl bg-[rgba(15,15,15,0.8)] border border-purple-500/20 backdrop-blur-lg shadow-[0_0_15px_rgba(139,92,246,0.5)]">
      <h2 className="text-2xl font-semibold mb-5 text-center bg-gradient-to-r from-purple-400 to-purple-700 bg-clip-text text-transparent tracking-tight">Add New Gradient</h2>
      
      <div className="flex flex-col gap-1.5">
        <label htmlFor="gradient-name" className="text-sm font-medium text-gray-200 ml-1">Gradient Name</label>
        <input 
          id="gradient-name"
          type="text"
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Enter a name for the gradient" 
          required 
          disabled={isLoading}
          className="px-4 py-3 rounded-lg border border-purple-500/20 bg-[rgba(30,30,30,0.8)] text-white text-[0.95rem] transition-all focus:outline-none focus:border-purple-400 focus:shadow-[0_0_0_2px_rgba(139,92,246,0.2)]"
        />
      </div>
      
      <div className="my-2.5 flex flex-col items-center gap-4">
        <label htmlFor="gradient-file" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-700 to-purple-400 text-white rounded-lg cursor-pointer font-medium text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]">
          {previewUrl ? 'Change Image' : 'Select Gradient Image'}
        </label>
        <input
          id="gradient-file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="absolute w-[0.1px] h-[0.1px] opacity-0 overflow-hidden -z-10"
          disabled={isLoading}
        />
        
        {previewUrl && (
          <div className="mt-4 w-full text-center">
            <Image 
              src={previewUrl} 
              alt="Preview" 
              width={200} 
              height={200} 
              className="max-w-[200px] max-h-[200px] rounded-lg object-cover border-2 border-purple-500/20 mx-auto" 
            />
          </div>
        )}
      </div>
      
      <button 
        type="submit" 
        disabled={isLoading || !file}
        className={`py-3 rounded-lg border-none bg-gradient-to-r from-purple-700 to-purple-400 text-white font-medium cursor-pointer transition-all duration-300 relative overflow-hidden text-base tracking-wide mt-2 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] ${isLoading ? 'text-transparent after:content-[""] after:absolute after:top-1/2 after:left-1/2 after:w-5 after:h-5 after:border-2 after:border-white/30 after:border-t-white after:rounded-full after:-ml-2.5 after:-mt-2.5 after:animate-spin' : ''}`}
      >
        {isLoading ? 'Uploading...' : 'Upload Gradient'}
      </button>
      
      {message && (
        <div className={message.includes('failed') ? 'text-[#ff4d6d] mt-2 text-sm bg-[rgba(255,77,109,0.1)] p-2.5 rounded-md border-l-[3px] border-[#ff4d6d]' : 'text-[#4ade80] mt-2 text-sm bg-[rgba(74,222,128,0.1)] p-2.5 rounded-md border-l-[3px] border-[#4ade80]'}
        >
          {message}
        </div>
      )}
    </form>
  );
}
