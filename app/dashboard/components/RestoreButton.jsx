'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function RestoreButton({ auditLogId, actionType, originalId, onRestoreSuccess }) {
  const [isRestoring, setIsRestoring] = useState(false);
  const { data: session, status } = useSession();
  
  // Conditionally render the button based on action type and user role
  const isRestorable = ['edited', 'deleted'].includes(actionType);
  const canRestore = session?.user?.role === 'admin' || session?.user?.role === 'editor';

  if (!isRestorable || !canRestore) {
    return null;
  }

  const handleRestore = async () => {
    if (!window.confirm(`Are you sure you want to restore this ${actionType} change for ID ${originalId}?`)) {
      return;
    }

    setIsRestoring(true);
    try {
      const response = await fetch('/api/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditLogId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Restore failed: ${errorData.message}`);
        console.error('Restore failed:', errorData.message);
      } else {
        alert('Record successfully restored!');
        if (onRestoreSuccess) {
          onRestoreSuccess(); // Callback to refresh the table
        }
      }
    } catch (error) {
      alert('An unexpected error occurred.');
      console.error('Restore API call failed:', error);
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <button
      onClick={handleRestore}
      disabled={isRestoring}
      className={`px-3 py-1 rounded text-white text-sm font-medium transition-colors duration-200 ${
        isRestoring ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'
      }`}
    >
      {isRestoring ? 'Restoring...' : 'Restore'}
    </button>
  );
}