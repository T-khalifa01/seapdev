


'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

// Icon for synchronization/refresh
const IconSync = ({ className = "h-5 w-5", isSpinning = false }) => (
  // <svg className={`${className} ${isSpinning ? 'animate-spin' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
  //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m15.356 2H20v-5m-9-4v5h.582m15.356 2A8.001 8.001 0 014.582 9m15.356 2H20v-5" />
  // </svg>
  <svg className={`${className} ${isSpinning ? 'animate-spin' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" >
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>

);

const DashHeader = ({ pageTitle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false); // State for sync loading
  const [syncMessage, setSyncMessage] = useState(null); // State for sync feedback
  const dropdownRef = useRef(null);

  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === 'admin';

  // --- SYNC LOGIC INTEGRATED HERE ---
  const handleSync = async () => {
    if (!isAdmin || isSyncing) return;

    setIsSyncing(true);
    setSyncMessage({ text: 'Starting sync...', isError: false });

    try {
      const response = await fetch('/api/sync-gforms', {
        method: 'POST', // Use POST as the API modifies the database
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle 403 (Permission Denied) or 500 (Server Error)
        setSyncMessage({ text: data.message || 'Sync failed: Server error.', isError: true });
        return;
      }

      // Success message with count from the API response
      const count = data.count || 0;
      const successText = count > 0 
        ? `Sync complete! Inserted ${count} new row(s).` 
        : data.message || 'Sync complete. No new rows found.';
          
      setSyncMessage({ text: successText, isError: false });

    } catch (error) {
      setSyncMessage({ text: 'Network error occurred during sync.', isError: true });
      console.error('Manual sync error:', error);
    } finally {
      setIsSyncing(false);
      
      // Clear status message after 5 seconds
      setTimeout(() => setSyncMessage(null), 5000); 
    }
  };
  // ------------------------------------

  // Function to toggle the dropdown's visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
    setIsDropdownOpen(false);
  };

  if (!session) {
    return null;
  }

  const syncButtonClasses = `p-2 rounded-full transition-colors ${
    isSyncing 
      ? 'text-yellow-400 cursor-not-allowed'
      : 'text-gray-400 hover:text-white hover:bg-gray-700'
  }`;
  
  // Determine the style for the floating status message
  const messageStyle = syncMessage 
    ? syncMessage.isError 
      ? 'bg-red-600' 
      : 'bg-green-600'
    : 'hidden';


  return (
    <header className="flex flex-col">
      {/* Floating Sync Status Message */}
      <div className={`w-full py-2 px-4 text-center text-sm font-medium ${messageStyle}`}>
        {syncMessage?.text}
      </div>

      {/* Main Header Row */}
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white shadow-md">
        
        {/* Left side: Page Title */}
        <div className="flex items-center space-x-4">
          <button className="lg:hidden">
            {/* Hamburger menu icon placeholder */}
          </button>
          <h1 className="text-xl font-semibold">{`{ ${session.user.role} } : ${pageTitle}`}</h1>
        </div>

        {/* Right side: Sync Button and User Profile */}
        <div className="flex items-center space-x-4">

          {/* SYNC ICON BUTTON */}
          {isAdmin && (
            <button
              onClick={handleSync}
              disabled={isSyncing}
              aria-label="Manually synchronize data"
              className={syncButtonClasses}
            >
              <IconSync isSpinning={isSyncing} />
            </button>
          )}

          {/* User Profile and Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              {/* User Image/Status Icon */}
              <div className="relative h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                {/* User image placeholder */}
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-400 ring-2 ring-gray-800"></span>
              </div>
              
              {/* User Name */}
              <div className="hidden sm:block text-xl lg:mr-10">
                <h3 className="font-medium">{session.user.name}</h3>
              </div>
            </div>
            
            {/* Dropdown Menu - Conditionally Rendered */}
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20">
                <ul className="py-2">
                  <li
                    className="px-4 py-2 hover:bg-gray-700 transition-colors duration-200 cursor-pointer text-gray-300 hover:text-white flex items-center justify-between space-x-2"
                    onClick={handleLogout}
                  >
                    <span className=''>Logout</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className='w-6 h-6 text-red rotate-270 flex justify-self-end' >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashHeader;