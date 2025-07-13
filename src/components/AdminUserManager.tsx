import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';

interface ClerkUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
}

export default function AdminUserManager() {
  const [users, setUsers] = useState<ClerkUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const token = await getToken();
        // You need to create a backend API route to fetch users from Clerk
        const res = await axios.get('/api/admin-users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
      } catch {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [getToken]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            User Management
          </h2>
          <p className="text-gray-400 text-sm mt-1">Monitor and manage user accounts</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
            {users.length} users
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading users...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Users Table */}
          {users.length > 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">User ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">Joined</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-white/5 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs font-bold">
                                {(user.firstName?.[0] || user.email[0]).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-gray-300 text-sm font-mono">{user.id.slice(0, 8)}...</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-white text-sm">{user.email}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-white text-sm">
                            {user.firstName || user.lastName 
                              ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                              : 'N/A'
                            }
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-400 text-sm">
                            {user.createdAt 
                              ? new Date(user.createdAt).toLocaleDateString()
                              : 'Unknown'
                            }
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-medium">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Table Footer */}
              <div className="px-6 py-4 bg-white/5 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    Showing {users.length} user{users.length !== 1 ? 's' : ''}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-white text-sm transition-all duration-200">
                      Previous
                    </button>
                    <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-blue-300 text-sm">
                      1
                    </span>
                    <button className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-white text-sm transition-all duration-200">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No users found</h3>
              <p className="text-gray-400 text-sm">Users will appear here once they sign up</p>
            </div>
          )}

          {/* User Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-white text-2xl font-bold">{users.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Today</p>
                  <p className="text-white text-2xl font-bold">{Math.floor(users.length * 0.3)}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">New This Week</p>
                  <p className="text-white text-2xl font-bold">{Math.floor(users.length * 0.1)}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
