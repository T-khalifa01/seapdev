'use client';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
// import { useDashContext } from './DashContext';

// We're no longer using next/link, so we remove the import.

const menuItems = [
  { name: 'Dashboard', key: 'dashboard',  },
  { name: 'LGA Forms', key: 'lgaForms',  },
  { name: 'Investment Forms', key: 'investmentForms', },
  { name: 'Contact Forms', key: 'contactForms',  },
  { name: 'Subscriptions', key: 'subscriptions', },
];

// The 'onSelect' prop is a function that will be passed from the parent.
const DashSidebar = ({ onSelect, activeKey }) => {
  const { data: session, status } = useSession();
  // const { activeKey, setActiveKey } = useDashContext();

  if (status === "loading") {
    return <div className="text-gray-400">Loading...</div>;
  }
  
  return (
    <aside className="w-64 flex flex-col p-4 bg-gray-800 text-white shadow-lg min-h-screen">
      <div className="flex items-center justify-center p-4">
        {/* <h2 className="text-2xl font-bold">Admin Panel</h2> */}
      </div>
      <nav className="mt-8 flex-1">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-2">
              <a
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 cursor-pointer
                  ${activeKey === item.key ? 'bg-purple-600 text-white shadow-md' : 'hover:bg-gray-700 text-gray-300'}`}
                onClick={() => onSelect(item.name, item.key)}
              >
                {/* <item.icon className="h-5 w-5 mr-3" /> */}
                <span className="font-medium">{item.name}</span>
              </a>
            </li>
          ))}
          {/* The new "Register User" button, visible only to admins */}
            {session?.user?.role === 'admin' && (
              <>
                <li>
                  <button
                    // onClick={() => setActiveKey('register-user')}
                    onClick={() => onSelect("Add User", "register-user")}
                    className={`w-full text-left p-2 rounded ${activeKey === 'register-user' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                  >
                    ADD New User
                  </button>
                </li>
                <li>
                  <button
                    //  onClick={() => setActiveKey('user-management')}
                    onClick={() => onSelect("View Users", "user-management")}
                    className={`w-full text-left p-2 rounded ${activeKey === 'user-management' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                  >
                    User Management
                  </button>
                </li>
              </>
            )}
        </ul>
      </nav>
    </aside>
  );
};

export default DashSidebar;