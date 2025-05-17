
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "@/pages/login"; 
import AdminRoutes from "@/routes/AdminRoutes";
import ColmadoUserRoutes from "@/routes/ColmadoUserRoutes";
import AccountConfigError from "@/components/layout/account-config-error";

const AppRoutes = ({ appData }) => {
  const { currentUser, colmadosData, users } = appData;

  if (!currentUser) {
    return (
      <Routes>
        <Route 
          path="/login" 
          element={
            <LoginPage 
              onLogin={appData.handleLogin} 
              allColmados={colmadosData} 
              users={users} 
            />
          } 
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (currentUser.role === "admin") {
    const adminDashboardRoute = AdminRoutes(appData).props.children.find(route => route.props.path === "/");
    return (
      <Routes>
        {AdminRoutes(appData)}
        {adminDashboardRoute && <Route path="/" element={adminDashboardRoute.props.element} />}
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  if (currentUser.role === "colmado") {
    if (!currentUser.colmadoId) {
      return (
        <Routes>
          <Route path="*" element={<AccountConfigError />} />
        </Routes>
      );
    }
    const colmadoDashboardPath = `/colmado-dashboard/${currentUser.colmadoId}`;
    return (
      <Routes>
        {ColmadoUserRoutes(appData)}
        <Route path="/" element={<Navigate to={colmadoDashboardPath} replace />} />
        <Route path="/*" element={<Navigate to={colmadoDashboardPath} replace />} />
      </Routes>
    );
  }
  
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
