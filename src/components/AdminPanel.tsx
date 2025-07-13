import React from 'react';
// ...existing code...

// This component is now only a placeholder for upload. Use AdminGradientManager for management.
export default function AdminPanel() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center text-white/80 p-8 border border-white/10 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-indigo-500/10">
        <h2 className="text-2xl font-bold mb-2">Gradient Upload Studio</h2>
        <p>Upload functionality is now managed in a dedicated section below.</p>
      </div>
    </div>
  );
}
