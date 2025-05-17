
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/login";
import AdminRoutes from "@/routes/admin-routes";
import ColmadoUserRoutes from "@/routes/colmado-user-routes";

const AppRouter = ({
  currentUser,
  credits,
  consumptions,
  colmadosData,
  updateCredits,
  addCredit,
  addConsumption,
  updateColmados,
  handleLogin
}) => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} allColmados={colmadosData} />} />
      
      {currentUser?.role === "admin" && 
        AdminRoutes({ 
          credits, 
          consumptions, 
          colmadosData, 
          updateCredits, 
          addCredit, 
          updateColmados,
          currentUser,
          addConsumption
        })
      }

      {currentUser?.role === "colmado" && currentUser.colmadoId && 
        ColmadoUserRoutes({ 
          currentUser, 
          credits, 
          consumptions, 
          colmadosData, 
          updateCredits, 
          addCredit,
          addConsumption
        })
      }
      
      {!currentUser && (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}

      {currentUser && !currentUser.colmadoId && currentUser.role === "colmado" && (
         <Route path="*" element={
          <div className="flex flex-col items-center justify-center h-screen text-center p-4">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error de Configuración de Cuenta</h1>
            <p className="text-slate-700 dark:text-slate-200 mb-2">Su cuenta de colmado no tiene un ID de colmado asignado.</p>
            <p className="text-slate-500 dark:text-slate-400">Por favor, contacte al administrador para resolver este problema.</p>
          </div>
        } />
      )}
    </Routes>
  );
};

export default AppRouter;
