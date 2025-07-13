
import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import Image from 'next/image';
import type { Gradient } from '../types/gradient';

export default function AdminGradientManager() {
  const [gradients, setGradients] = useState<Gradient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { getToken } = useAuth();

  const fetchGradients = async () => {
    setLoading(true);
    setError('');
    try {
      const token = await getToken();
      const res = await axios.get('/api/gradients', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGradients(res.data.gradients);
    } catch {
      setError('Failed to fetch gradients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGradients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
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
    setLoading(true);
    try {
      const token = await getToken();
      const gradientsFormData = new FormData();
      gradientsFormData.append('name', name);
      gradientsFormData.append('file', file);
      await axios.post('/api/gradients', gradientsFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      setMessage('Gradient successfully uploaded!');
      setName('');
      setFile(null);
      setPreviewUrl(null);
      const fileInput = document.getElementById('gradient-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      fetchGradients();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Upload failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (public_id: string) => {
    if (!confirm('Are you sure you want to delete this gradient?')) return;
    setLoading(true);
    setError('');
    try {
      const token = await getToken();
      await axios.delete('/api/delete-gradient', {
        data: { public_id },
        headers: { Authorization: `Bearer ${token}` },
      });
      setGradients(gradients.filter(g => g.public_id !== public_id));
    } catch {
      setError('Failed to delete gradient');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            Gradient Manager
          </h2>
          <p className="text-gray-400 text-sm mt-1">Upload and manage your gradient collection</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium">
            {gradients.length} gradients
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6">
        <form onSubmit={handleUpload} className="space-y-6">
          {/* Form Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Upload New Gradient</h3>
            <p className="text-gray-400 text-sm">Add beautiful gradients to your collection</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="gradient-name" className="block text-sm font-medium text-white/90">
                Gradient Name
              </label>
              <input
                id="gradient-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g., Sunset Vibes"
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/20"
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/90">
                Upload Image
              </label>
              <div className="relative">
                <input
                  id="gradient-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={loading}
                  title="Select an image file to upload as a gradient"
                  aria-label="Upload gradient image file"
                />
                <div className={`relative overflow-hidden rounded-lg border-2 border-dashed transition-all duration-200 ${
                  file
                    ? 'border-blue-400/50 bg-blue-500/5'
                    : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10'
                } p-4`}>
                  {file ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-8 h-8 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{file.name}</p>
                        <p className="text-gray-400 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto mb-2 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-white/60 text-sm">Choose file</p>
                      <p className="text-gray-500 text-xs">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-sm font-medium text-white mb-3">Preview</h4>
              <div className="relative w-full h-32 rounded-lg overflow-hidden">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !file}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
              loading || !file
                ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Uploading...
              </div>
            ) : (
              'Upload Gradient'
            )}
          </button>

          {/* Message */}
          {message && (
            <div className={`p-4 rounded-lg border ${
              message.includes('failed') || message.includes('error')
                ? 'bg-red-500/10 border-red-500/20 text-red-300'
                : 'bg-green-500/10 border-green-500/20 text-green-300'
            }`}>
              <div className="flex items-center">
                <div className="mr-3">
                  {message.includes('failed') || message.includes('error') ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium">{message}</span>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Gradients Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Manage Gradients</h3>
          <button
            onClick={fetchGradients}
            disabled={loading}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm transition-all duration-200 flex items-center"
          >
            <svg className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {loading && gradients.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading gradients...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gradients.map(gradient => (
              <div key={gradient.public_id} className="group relative bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all duration-200">
                <div className="relative aspect-video">
                  <Image
                    src={gradient.url}
                    alt={gradient.public_id}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(gradient.public_id)}
                    disabled={loading}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 hover:bg-red-500 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm"
                    title="Delete gradient"
                    aria-label={`Delete gradient ${gradient.public_id}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                {/* Gradient Info */}
                <div className="p-3">
                  <p className="text-white text-sm font-medium truncate">{gradient.public_id}</p>
                  <p className="text-gray-400 text-xs">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {gradients.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No gradients yet</h3>
            <p className="text-gray-400 text-sm">Upload your first gradient to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
