
import React from "react";
import { Route } from "react-router-dom";
import AdminDashboard from "@/pages/dashboard";
import LoansPage from "@/pages/loans";
import PaymentsPage from "@/pages/payments";
import AnalyticsPage from "@/pages/analytics";
import ColmadosPage from "@/pages/colmados";
import ColmadoDashboardPage from "@/pages/colmado-dashboard";

const AdminRoutes = ({ credits, consumptions, colmadosData, updateCredits, addCredit, updateColmados, currentUser, addConsumption }) => {
  return (
    <>
      <Route path="/" element={<AdminDashboard credits={credits} consumptions={consumptions} />} />
      <Route path="/creditos" element={<LoansPage credits={credits} updateCredits={updateCredits} addCredit={addCredit} colmados={colmadosData} />} />
      <Route path="/creditos/nuevo" element={<LoansPage credits={credits} updateCredits={updateCredits} addCredit={addCredit} colmados={colmadosData} />} />
      <Route path="/consumos" element={<PaymentsPage consumptions={consumptions} credits={credits} />} />
      <Route path="/analisis" element={<AnalyticsPage credits={credits} consumptions={consumptions}/>} />
      <Route path="/colmados" element={<ColmadosPage allColmados={colmadosData} updateColmados={updateColmados} />} />
      <Route path="/colmado-dashboard/:colmadoId" element={
        <ColmadoDashboardPage 
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
