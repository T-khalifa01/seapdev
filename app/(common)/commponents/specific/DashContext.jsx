'use client';

import { createContext, useState, useContext } from 'react';

// Define the shape of our context
const DashContext = createContext();

// Create a provider component that will wrap our layout
export const DashProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [activeKey, setActiveKey] = useState('dashboard');

  const value = {
    pageTitle,
    setPageTitle,
    activeKey,
    setActiveKey,
  };

  return <DashContext.Provider value={value}>{children}</DashContext.Provider>;
};

// Custom hook to easily use the context
export const useDashContext = () => {
  return useContext(DashContext);
};