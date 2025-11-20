// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';

// export default function UserManagement() {
//     const { data: session } = useSession();
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (session) {
//             fetchUsers();
//         }
//     }, [session]);

//     const fetchUsers = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch('/api/users');
//             if (!response.ok) {
//                 const data = await response.json();
//                 throw new Error(data.message || 'Failed to fetch users.');
//             }
//             const data = await response.json();
//             setUsers(data);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleToggleActive = async (userId, isActive) => {
//         try {
//             const response = await fetch(`/api/users/${userId}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ is_active: isActive ? 0 : 1 }),
//             });
//             if (!response.ok) {
//                 const data = await response.json();
//                 throw new Error(data.message || 'Failed to update user status.');
//             }
//             // Refresh the user list after a successful update
//             fetchUsers();
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     if (loading) return <p className="text-center text-gray-400">Loading users...</p>;
//     if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//     return (
//         <div className="p-4">
//             <h2 className="text-xl font-bold mb-4 text-white">Manage Users</h2>
//             <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
//                 <table className="min-w-full divide-y divide-gray-700">
//                     <thead className="bg-gray-700">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-gray-800 divide-y divide-gray-700">
//                         {users.map((user) => (
//                             <tr key={user.id} className="hover:bg-gray-700 transition-colors">
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.name}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.role}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                                         {user.is_active ? 'Active' : 'Disabled'}
//                                     </span>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                     <button
//                                         onClick={() => handleToggleActive(user.id, user.is_active)}
//                                         className={`py-1 px-3 rounded-md text-white transition-colors ${user.is_active ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
//                                     >
//                                         {user.is_active ? 'Disable' : 'Enable'}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';

// export default function UserManagement() {
//     const { data: session } = useSession();
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (session) {
//             fetchUsers();
//         }
//     }, [session]);

//     const fetchUsers = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch('/api/users');
//             if (!response.ok) {
//                 const data = await response.json();
//                 throw new Error(data.message || 'Failed to fetch users.');
//             }
//             const data = await response.json();
//             setUsers(data);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleToggleActive = async (userId, userRole, isActive) => {
//         setError(null); // Clear previous errors
        
//         // **1. Get the current count of active admins for the checks**
//         const activeAdminCount = users.filter(u => u.role === 'admin' && u.is_active).length;

//         // --- CHECK 1: Prevent disabling the last active admin ---
//         if (userRole === 'admin' && isActive && activeAdminCount <= 1) {
//             // Check if the current action is 'Disable' AND this is the last admin
//             const errorMessage = "Cannot disable the only active Administrator. You must promote another user first.";
//             alert(errorMessage);
//             setError(errorMessage);
//             return;
//         }

//         // --- CHECK 2: Prevent the user from disabling their own account ---
//         if (userId === session.user.id) {
//             const errorMessage = "You cannot disable your own active session.";
//             alert(errorMessage);
//             setError(errorMessage);
//             return;
//         }

//         try {
//             const response = await fetch(`/api/users/${userId}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 // Note: isActive is the current status. We toggle it for the body.
//                 body: JSON.stringify({ is_active: isActive ? 0 : 1 }), 
//             });
//             if (!response.ok) {
//                 const data = await response.json();
//                 throw new Error(data.message || 'Failed to update user status.');
//             }
//             // Refresh the user list after a successful update
//             fetchUsers();
//         } catch (err) {
//             setError(err.message);
//         }
//     };
    

//     if (loading) return <p className="text-center text-gray-400">Loading users...</p>;
//     if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//     return (
//         <div className="p-4">
//             <h2 className="text-xl font-bold mb-4 text-white">Manage Users</h2>
//             <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
//                 <table className="min-w-full divide-y divide-gray-700">
//                     <thead className="bg-gray-700">
//                         <tr>
//                             {/* ... table headers ... */}
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-gray-800 divide-y divide-gray-700">
//                         {users.map((user) => (
//                             <tr key={user.id} className="hover:bg-gray-700 transition-colors">
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.name}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.role}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                                         {user.is_active ? 'Active' : 'Disabled'}
//                                     </span>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                     <button
//                                         // MODIFIED: Pass userRole to the handler
//                                         onClick={() => handleToggleActive(user.id, user.role, user.is_active)} 
//                                         className={`py-1 px-3 rounded-md text-white transition-colors ${user.is_active ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
//                                         // OPTIONAL: Visually disable the button for the current user
//                                         disabled={user.id === session.user.id}
//                                     >
//                                         {user.is_active ? 'Disable' : 'Enable'}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }





'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function UserManagement() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session) {
      fetchUsers();
    }
  }, [session]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch users.');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (userId, userRole, isActive) => {
    setError(null); // Clear previous errors
    
    // **1. Get the current count of active admins for the checks**
    const activeAdminCount = users.filter(u => u.role === 'admin' && u.is_active).length;
    const willBeDisabled = isActive; // If currently active, clicking the button means disabling (is_active: 0)

    // --- CHECK 1: Prevent disabling the last active admin ---
    if (userRole === 'admin' && willBeDisabled && activeAdminCount <= 1) {
      const errorMessage = "Cannot disable the only active Administrator. You must promote another user first.";
      alert(errorMessage);
      setError(errorMessage);
      return;
    }

    // --- CHECK 2: Prevent the user from disabling their own account ---
    if (userId === session.user.id && willBeDisabled) {
      const errorMessage = "You cannot disable your own active account.";
      alert(errorMessage);
      setError(errorMessage);
      return;
    }
    
    // Prevent action if the user is attempting to enable themselves (which makes no sense)
    if (userId === session.user.id && !willBeDisabled) {
        const errorMessage = "You are already logged in and active.";
      alert(errorMessage);
      setError(errorMessage);
      return;
    }


    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        // isActive is the current status. We toggle it for the body.
        body: JSON.stringify({ is_active: willBeDisabled ? 0 : 1 }), 
      });
      if (!response.ok) {
        const data = await response.json();
        // Capture and display the detailed error message sent from the server (e.g., the 403 error)
        throw new Error(data.message || 'Failed to update user status.');
      }
      // Refresh the user list after a successful update
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
    };
    
    // ... (rest of the component remains the same)

    if (loading) return <p className="text-center text-gray-400">Loading users...</p>;
    // Display the error message at the top of the component
    if (error) return (
      <div className="p-4">
        <p className="text-center bg-red-800 p-3 rounded-lg text-white font-medium mb-4">Error: {error}</p>
        {/* Re-render the table below the error after a brief delay if needed, 
          but for now, we'll keep the error display simple and persistent. */}
        <p className="text-center text-gray-400">Loading users...</p>
      </div>
    );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-white">Manage Users</h2>
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.is_active ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleToggleActive(user.id, user.role, user.is_active)} 
                    className={`py-1 px-3 rounded-md text-white transition-colors ${user.is_active ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                    // REMOVED: disabled={user.id === session.user.id} 
                    // RATIONALE: We need the button to be clickable to show the error message.
                  >
                    {user.is_active ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}