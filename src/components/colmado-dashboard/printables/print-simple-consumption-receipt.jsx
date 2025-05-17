
import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const PrintSimpleConsumptionReceipt = React.forwardRef(({ consumption, colmadoName, clientCredit }, ref) => {
  if (!consumption) return null;

  const balanceAfterConsumption = clientCredit ? clientCredit.remainingAmount : 'N/A'; 
  const creditLimit = clientCredit ? clientCredit.amount : 'N/A';

  return (
    <div ref={ref} className="p-4 bg-white text-black font-sans text-sm">
      <style type="text/css" media="print">
        {`
          @page { size: 80mm auto; margin: 5mm; } /* Typical receipt paper width */
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; font-family: 'Courier New', monospace; }
          .receipt-container { width: 100%; }
          .receipt-header { text-align: center; margin-bottom: 10px; }
          .receipt-header h2 { font-size: 1.1em; margin: 0; font-weight: bold; }
          .receipt-header p { font-size: 0.8em; margin: 2px 0; }
          .receipt-details { margin-bottom: 10px; }
          .receipt-details p { margin: 3px 0; font-size: 0.9em; }
          .receipt-details strong { font-weight: bold; }
          .item-line { display: flex; justify-content: space-between; margin: 2px 0; font-size: 0.9em; }
          .total-line { display: flex; justify-content: space-between; margin-top: 8px; padding-top: 8px; border-top: 1px dashed #000; font-size: 1em; font-weight: bold; }
          .balance-info { margin-top: 10px; padding-top: 5px; border-top: 1px solid #eee; }
          .balance-info p { margin: 3px 0; font-size: 0.85em; }
          .receipt-footer { text-align: center; font-size: 0.75em; margin-top: 15px; }
        `}
      </style>
      <div className="receipt-container">
        <div className="receipt-header">
          <h2>{colmadoName || "Colmado XYZ"}</h2>
          <p>Recibo de Consumo</p>
          <p>{format(new Date(consumption.paymentDate || consumption.createdAt), "dd/MM/yyyy hh:mm a", { locale: es })}</p>
        </div>

        <div className="receipt-details">
          <p><strong>Cliente:</strong> {consumption.clientName || "N/A"}</p>
          {clientCredit?.cedula && <p><strong>Cédula:</strong> {clientCredit.cedula}</p>}
          <p><strong>ID Trans.:</strong> {consumption.id}</p>
          <p><strong>ID Crédito:</strong> {consumption.creditId}</p>
        </div>
        
        <div className="item-line">
          <span>{consumption.description || "Consumo General"}</span>
          <span>${consumption.amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>

        <div className="total-line">
          <span>TOTAL CONSUMO:</span>
          <span>${consumption.amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>

        {clientCredit && (
          <div className="balance-info">
            <p>Límite de Crédito: ${creditLimit?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p>Balance Disponible: ${balanceAfterConsumption?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        )}

        <div className="receipt-footer">
          <p>¡Gracias por su compra!</p>
          <p>Este no es un comprobante fiscal.</p>
        </div>
      </div>
    </div>
  );
});
PrintSimpleConsumptionReceipt.displayName = "PrintSimpleConsumptionReceipt";
export default PrintSimpleConsumptionReceipt;
