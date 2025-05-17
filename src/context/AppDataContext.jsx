
import React, { createContext } from 'react';
import { useAppData as useAppDataHook } from '@/hooks/useAppData';

const AppDataContext = createContext(null);

export const AppDataProvider = ({ children }) => {
  const appData = useAppDataHook();
  return (
    <AppDataContext.Provider value={appData}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppDataFromContext = () => {
  const context = React.useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppDataFromContext must be used within an AppDataProvider');
  }
  return context;
};
