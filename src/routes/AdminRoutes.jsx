
import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '@/pages/dashboard';
import LoansPage from '@/pages/loans';
import PaymentsPage from '@/pages/payments';
import AnalyticsPage from '@/pages/analytics';
import ColmadosPage from '@/pages/colmados';
import ColmadoDashboard from '@/pages/colmado-dashboard';
import UserManagementPage from '@/pages/user-management';

const AdminRoutes = ({ 
  credits, 
  consumptions, 
  colmadosData, 
  updateCredits, 
  addCredit, 
  updateColmados, 
  currentUser, 
  addConsumption,
  users,
  addUser,
  updateUser,
  deleteUser
}) => {
  return (
    <>
      <Route path="/" element={<Dashboard credits={credits} consumptions={consumptions} />} />
      <Route path="/creditos" element={<LoansPage credits={credits} updateCredits={updateCredits} addCredit={addCredit} colmados={colmadosData} />} />
      <Route path="/creditos/nuevo" element={<LoansPage credits={credits} updateCredits={updateCredits} addCredit={addCredit} colmados={colmadosData} />} />
      <Route path="/consumos" element={<PaymentsPage consumptions={consumptions} credits={credits} />} />
      <Route path="/analisis" element={<AnalyticsPage credits={credits} consumptions={consumptions}/>} />
      <Route path="/colmados" element={<ColmadosPage allColmados={colmadosData} updateColmados={updateColmados} />} />
      <Route 
        path="/usuarios" 
        element={
          <UserManagementPage 
            users={users} 
            addUser={addUser} 
            updateUser={updateUser} 
            deleteUser={deleteUser}
            allColmados={colmadosData}
          />
        } 
      />
      <Route path="/colmado-dashboard/:colmadoId" element={
        <ColmadoDashboard 
          currentUser={currentUser}
          globalCredits={credits} 
          globalConsumptions={consumptions}
          allColmados={colmadosData}
          updateCredits={updateCredits}
          addCredit={addCredit}
          addConsumption={addConsumption}
        />
      } />
    </>
  );
};

export default AdminRoutes;
