
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import ColmadoDashboard from '@/pages/colmado-dashboard';

const ColmadoUserRoutes = ({ currentUser, credits, consumptions, colmadosData, updateCredits, addCredit, addConsumption }) => {
  return (
    <>
      <Route 
        path="/colmado-dashboard/:colmadoId" 
        element={
          <ColmadoDashboard 
            currentUser={currentUser}
            globalCredits={credits} 
            globalConsumptions={consumptions}
            allColmados={colmadosData}
            updateCredits={updateCredits}
            addCredit={addCredit}
            addConsumption={addConsumption}
          />
        } 
      />
      <Route path="/" element={<Navigate to={`/colmado-dashboard/${currentUser.colmadoId}`} replace />} />
      <Route path="/creditos" element={<Navigate to={`/colmado-dashboard/${currentUser.colmadoId}`} replace />} />
      <Route path="/consumos" element={<Navigate to={`/colmado-dashboard/${currentUser.colmadoId}`} replace />} />
      <Route path="/analisis" element={<Navigate to={`/colmado-dashboard/${currentUser.colmadoId}`} replace />} />
      <Route path="/colmados" element={<Navigate to={`/colmado-dashboard/${currentUser.colmadoId}`} replace />} />
    </>
  );
};

export default ColmadoUserRoutes;
