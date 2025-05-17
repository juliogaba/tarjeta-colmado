
import React from "react";

const AppLoading = () => (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-700">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-400 mb-4"></div>
      <p className="text-2xl font-semibold text-sky-300 tracking-wider">Cargando Aplicación...</p>
      <p className="text-sm text-sky-500">Por favor, espere un momento.</p>
    </div>
  </div>
);

export default AppLoading;
