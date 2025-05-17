
import React from "react";
import { useAppDataFromContext } from "@/context/AppDataContext";
import Navbar from "@/components/layout/navbar";
import AppRoutes from "@/routes/AppRoutes";
import AppLoading from "@/components/layout/app-loading";
import { Toaster } from "@/components/ui/toaster";

const AppStructure = () => {
  const appData = useAppDataFromContext();

  if (appData.loading && typeof appData.currentUser === 'undefined' && appData.isSupabaseActive) {
    return <AppLoading message="Iniciando aplicación y conectando a Supabase..." />;
  }
  
  if (appData.loading && appData.currentUser === null && window.location.pathname !== '/login' && appData.isSupabaseActive) {
     return <AppLoading message="Cargando datos de la aplicación..." />;
  }

  if (appData.loading && appData.currentUser && appData.isSupabaseActive) {
    return <AppLoading message="Cargando su sesión..." />;
  }

  if (appData.loading && !appData.isSupabaseActive && typeof appData.currentUser === 'undefined') {
    return <AppLoading message="Configurando modo demostración..." />;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 transition-colors duration-300 flex flex-col">
      {appData.currentUser && appData.isSupabaseActive && <Navbar currentUser={appData.currentUser} onLogout={appData.handleLogout} />}
      {!appData.isSupabaseActive && window.location.pathname !== '/login' && (
         <div className="bg-yellow-500 text-center p-2 text-sm text-white sticky top-0 z-50">
           Modo Demostración Activo. Conecte Supabase para funcionalidad completa.
         </div>
      )}
      <main className={`flex-grow ${appData.currentUser && appData.isSupabaseActive ? "pt-16" : ""} ${!appData.isSupabaseActive && window.location.pathname !== '/login' ? "pt-8" : ""}`}>
        <AppRoutes appData={appData} />
      </main>
      <Toaster />
    </div>
  );
};

export default AppStructure;
