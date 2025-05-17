
import React from 'react';

const ColmadoDashboardLoading = () => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 text-center bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
    <div className="w-16 h-16 border-4 border-sky-500 border-dashed rounded-full animate-spin mb-6"></div>
    <h1 className="text-3xl font-bold text-sky-600 dark:text-sky-400 mb-3 tracking-tight">Cargando Dashboard del Colmado</h1>
    <p className="text-slate-600 dark:text-slate-400 max-w-md">
      Estamos preparando la información de su colmado. Esto podría tomar un momento.
    </p>
  </div>
);

export default ColmadoDashboardLoading;
