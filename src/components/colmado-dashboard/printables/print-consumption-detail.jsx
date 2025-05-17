
import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const PrintConsumptionDetail = React.forwardRef(({ consumptionData }, ref) => {
  if (!consumptionData) return null;

  const {
    clientName,
    colmadoName,
    amount,
    date,
    description,
  } = consumptionData;

  return (
    <div ref={ref} className="p-8 bg-white text-gray-800 font-serif">
      <style type="text/css" media="print">
        {`
          @page { 
            size: A5 portrait; 
            margin: 20mm; 
          }
          body { 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact; 
            background-color: #fff !important;
            color: #000 !important;
          }
          .print-container {
            font-family: 'Times New Roman', Times, serif;
            color: #333;
          }
          .print-header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #666;
            padding-bottom: 15px;
          }
          .print-header h1 {
            font-size: 22pt;
            margin: 0;
            color: #111;
          }
          .print-header p {
            font-size: 12pt;
            margin: 5px 0 0 0;
            color: #444;
          }
          .detail-item {
            margin-bottom: 15px;
            font-size: 14pt;
            display: flex;
            justify-content: space-between;
            padding-bottom: 5px;
            border-bottom: 1px dotted #ccc;
          }
          .detail-item strong {
            font-weight: 600;
            color: #222;
            margin-right: 10px;
          }
          .detail-item span {
            text-align: right;
          }
          .description-section {
            margin-top: 20px;
          }
          .description-section strong {
            display: block;
            margin-bottom: 5px;
          }
          .description-section p {
            font-size: 13pt;
            padding: 10px;
            border: 1px solid #eee;
            border-radius: 4px;
            background-color: #f9f9f9;
            min-height: 50px;
          }
          .print-footer {
            margin-top: 40px;
            text-align: center;
            font-size: 10pt;
            color: #777;
          }
        `}
      </style>
      <div className="print-container">
        <div className="print-header">
          <h1>Detalle de Consumo</h1>
          <p>{colmadoName || "Nombre del Colmado"}</p>
        </div>

        <div className="detail-item">
          <strong>Cliente:</strong>
          <span>{clientName || "N/A"}</span>
        </div>

        <div className="detail-item">
          <strong>Monto del Consumo:</strong>
          <span>${amount ? parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}</span>
        </div>

        <div className="detail-item">
          <strong>Fecha del Consumo:</strong>
          <span>{date ? format(new Date(date), "dd MMMM yyyy", { locale: es }) : "N/A"}</span>
        </div>
        
        {description && (
          <div className="description-section detail-item">
            <strong>Descripción:</strong>
            <p>{description}</p>
          </div>
        )}

        <div className="print-footer">
          <p>Generado el: {format(new Date(), "dd MMMM yyyy, hh:mm a", { locale: es })}</p>
        </div>
      </div>
    </div>
  );
});

PrintConsumptionDetail.displayName = "PrintConsumptionDetail";
export default PrintConsumptionDetail;
