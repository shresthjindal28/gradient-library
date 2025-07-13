
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
    <div>
      <h3 className="text-2xl font-bold mb-4">Upload & Manage Gradients</h3>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-indigo-500/10 rounded-3xl"></div>
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl"></div>
        <div className="relative z-10 p-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl mb-4">
              <div className="text-4xl">🎨</div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Gradient Upload Studio
            </h2>
            <p className="text-white/70">Transform your creative vision into a shareable masterpiece</p>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="gradient-name" className="block text-sm font-semibold text-white/90 ml-1">
                Gradient Name
              </label>
              <input
                id="gradient-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter a creative name for your gradient"
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 focus:shadow-lg focus:shadow-purple-500/20"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-white/90 ml-1">
                Gradient Image
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
                  aria-label="Upload gradient image file"
                  title="Select an image file to upload as a gradient"
                />
                <div className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${
                  previewUrl
                    ? 'border-purple-400/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10'
                    : 'border-white/20 bg-white/5 hover:border-purple-400/30 hover:bg-white/10'
                }`}>
                  {previewUrl ? (
                    <div className="relative p-4">
                      <div className="relative mx-auto w-fit">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          width={300}
                          height={200}
                          className="max-w-full h-auto max-h-48 rounded-xl object-cover shadow-xl border border-white/10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                      </div>
                      <div className="text-center mt-4">
                        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90 border border-white/20">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Click to change image
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="mb-4">
                        <div className="inline-block p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl">
                          <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-white font-semibold mb-2">Upload Gradient Image</h3>
                      <p className="text-white/60 text-sm mb-4">Drop your image here or click to browse</p>
                      <div className="text-xs text-white/50">Supports: JPG, PNG, GIF, WebP</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !file}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden group ${
                loading || !file
                  ? 'bg-white/10 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/25'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center justify-center">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    Processing Upload...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload to Library
                  </>
                )}
              </div>
            </button>
          </div>
          {message && (
            <div className={`mt-6 p-4 rounded-xl border backdrop-blur-sm ${
              message.includes('failed') || message.includes('error')
                ? 'bg-red-500/10 border-red-500/20 text-red-300'
                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
            }`}>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3 mt-0.5">
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
                <div className="text-sm font-medium">{message}</div>
              </div>
            </div>
          )}
        </div>
      </form>

      {/* Manage Section */}
      <h3 className="text-2xl font-bold mb-4">Manage Gradients</h3>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading && <div>Loading...</div>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gradients.map(g => (
          <div key={g.public_id} className="relative border rounded-xl p-2 bg-white/5">
            <Image src={g.url} alt={g.public_id} width={200} height={120} className="rounded-lg" />
            <button
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-3 py-1 text-xs hover:bg-red-700"
              onClick={() => handleDelete(g.public_id)}
              disabled={loading}
            >
              Delete
            </button>
            <div className="text-xs text-white/70 mt-2">{g.public_id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
