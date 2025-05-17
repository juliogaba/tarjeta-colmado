
import React from "react";

const LoanFormSummary = ({ formData, monthlyPayment, colmados = [], isClientCredit = false, isAdminForm = false }) => {
  const selectedColmadoName = formData.colmadoId && (isAdminForm || isClientCredit) && colmados.length > 0
    ? colmados.find(c => c.id === formData.colmadoId)?.name
    : null;

  return (
    <div className="bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 p-4 rounded-lg shadow">
      <h3 className="text-sm font-semibold text-blue-800 mb-3 border-b pb-2 border-blue-200">Resumen del Crédito</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div>
          <p className="text-xs text-blue-600">Límite de Crédito</p>
          <p className="font-bold text-blue-700">${parseInt(formData.amount || 0).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-blue-600">Pago Estimado al Corte</p>
          <p className="font-bold text-blue-700">${parseFloat(monthlyPayment || 0).toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div>
          <p className="text-xs text-blue-600">Cliente</p>
          <p className="font-medium text-gray-700 truncate" title={formData.clientName || "N/A"}>{formData.clientName || "N/A"}</p>
        </div>
        <div>
          <p className="text-xs text-blue-600">Plazo</p>
          <p className="font-medium text-gray-700">{formData.term || 0} {formData.term === 1 ? "mes" : "meses"}</p>
        </div>
        {selectedColmadoName && (
          <div className="col-span-2">
            <p className="text-xs text-blue-600">Colmado</p>
            <p className="font-medium text-gray-700 truncate" title={selectedColmadoName}>{selectedColmadoName}</p>
          </div>
        )}
        {formData.cedula && (
           <div className="col-span-2">
            <p className="text-xs text-blue-600">Cédula</p>
            <p className="font-medium text-gray-700">{formData.cedula}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanFormSummary;
