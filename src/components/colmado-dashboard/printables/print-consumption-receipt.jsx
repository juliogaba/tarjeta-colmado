
import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const PrintConsumptionReceipt = React.forwardRef(({ consumption, colmadoName }, ref) => {
  if (!consumption) return null;

  return (
    <div ref={ref} className="p-4 bg-white text-black font-sans">
      <style type="text/css" media="print">
        {`
          @page { size: auto; margin: 10mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-container { font-family: 'Arial', sans-serif; color: #333; }
          .header { text-align: center; margin-bottom: 20px; }
          .header h1 { font-size: 1.5em; margin:0; color: #1a237e; }
          .header p { font-size: 0.9em; margin:0; }
          .details-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .details-table th, .details-table td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 0.9em; }
          .details-table th { background-color: #f2f2f2; }
          .total-section { text-align: right; margin-top: 20px; }
          .total-section p { font-size: 1.1em; font-weight: bold; margin: 5px 0; }
          .footer { text-align: center; font-size: 0.8em; margin-top: 30px; border-top: 1px dashed #ccc; padding-top: 10px; }
        `}
      </style>
      <div className="print-container">
        <div className="header">
          <h1>{colmadoName || "Colmado XYZ"}</h1>
          <p>Recibo de Consumo</p>
        </div>

        <table className="details-table">
          <tbody>
            <tr><th>Fecha:</th><td>{format(new Date(consumption.paymentDate || consumption.createdAt), "dd MMM yyyy, hh:mm a", { locale: es })}</td></tr>
            <tr><th>Cliente:</th><td>{consumption.clientName || "N/A"}</td></tr>
            <tr><th>ID Transacción:</th><td>{consumption.id}</td></tr>
            <tr><th>ID Crédito:</th><td>{consumption.creditId}</td></tr>
            <tr><th>Descripción:</th><td>{consumption.description || "Consumo General"}</td></tr>
          </tbody>
        </table>

        <div className="total-section">
          <p>Monto Consumido: <span style={{color: "#2e7d32"}}>${consumption.amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
        </div>

        <div className="footer">
          <p>¡Gracias por su compra!</p>
          <p>Este no es un comprobante fiscal.</p>
        </div>
      </div>
    </div>
  );
});
PrintConsumptionReceipt.displayName = "PrintConsumptionReceipt";
export default PrintConsumptionReceipt;
