
import React from 'react';

const AccountConfigError = () => (
  <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] text-center p-4">
    <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error de Configuración de Cuenta</h1>
    <p className="text-slate-700 dark:text-slate-300 mb-2">Su cuenta de colmado no tiene un ID de colmado asignado.</p>
    <p className="text-slate-500 dark:text-slate-400">Por favor, contacte al administrador para resolver este problema.</p>
  </div>
);

export default AccountConfigError;
