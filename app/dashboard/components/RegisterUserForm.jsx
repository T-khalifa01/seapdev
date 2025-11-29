'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function RegisterUserForm() {
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('viewer'); // New state for the user's role
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (status === 'loading') {
    return <p className="text-gray-400">Loading user session...</p>;
  }

  if (session?.user?.role !== 'admin') {
    return <p className="text-red-500">You do not have permission to register new users.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Include the new 'role' field in the request body
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      setError(data.message || 'Registration failed.');
    } else {
      setSuccess(data.message);
      setName('');
      setEmail('');
      setPassword('');
      setRole('viewer'); // Reset the role to the default value
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg mx-auto">
      <h1 className="text-2xl font-bold text-white text-center mb-6">Register New User</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        {/* New dropdown for Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-300">User Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        {success && <p className="text-sm text-green-500 text-center">{success}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Registering...' : 'Register User'}
        </button>
      </form>
    </div>
  );
}