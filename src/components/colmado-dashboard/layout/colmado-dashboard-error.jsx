
import React from 'react';

const ColmadoDashboardError = ({ message }) => (
   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6 text-center bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-900 dark:to-orange-800">
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-2xl max-w-lg">
      <svg className="w-20 h-20 text-red-500 dark:text-red-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <h1 className="text-3xl font-extrabold text-red-600 dark:text-red-400 mb-4">Error al Cargar Datos</h1>
      <p className="text-slate-700 dark:text-slate-300 text-lg mb-3">
        No pudimos cargar la información del colmado.
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 p-3 rounded-md">
        Detalle: {message || "Ha ocurrido un error inesperado."}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-8 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
      >
        Intentar de Nuevo
      </button>
    </div>
  </div>
);

export default ColmadoDashboardError;
