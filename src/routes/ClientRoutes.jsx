
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoanDetailsPage from '@/pages/loan-details-page'; 
import Dashboard from '@/pages/dashboard';


const ClientRoutes = ({ appData }) => {
  const { currentUser } = appData;

  if (!currentUser || currentUser.role !== 'cliente') {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <Routes>
      <Route path="/" element={currentUser.associated_credit_id ? <Navigate to={`/credit-details/${currentUser.associated_credit_id}`} replace /> : <Dashboard appData={appData} />} />
      <Route path="/credit-details/:creditId" element={<LoanDetailsPage appData={appData} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default ClientRoutes;
