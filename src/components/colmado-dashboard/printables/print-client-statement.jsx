
import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const PrintClientStatement = React.forwardRef(({ clientCredit, colmadoName }, ref) => {
  if (!clientCredit) return null;

  const {
    clientName,
    cedula,
    clientId,
    id: creditId,
    amount: creditLimit,
    remainingAmount,
    startDate,
    nextPaymentDate,
    nextPaymentAmount,
    consumptions,
    interestRate,
  } = clientCredit;

  const totalConsumed = creditLimit - remainingAmount;
  const baseInterest = (interestRate || 0.15) * 100;
  const lateFeeText = nextPaymentAmount > totalConsumed * (interestRate || 0.15) 
    ? ` (incluye ${baseInterest}% interés + 5% mora)` 
    : ` (incluye ${baseInterest}% interés)`;

  return (
    <div ref={ref} className="p-2 bg-white text-black font-sans print-statement-wrapper">
      <style type="text/css" media="print">
        {`
          @page { 
            size: A4; 
            margin: 10mm; /* Reduced margin */
          }
          body { 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact; 
            font-size: 9pt; /* Slightly reduced base font size */
            line-height: 1.3; /* Adjusted line height */
          }
          .print-statement-wrapper {
            page-break-after: auto; /* Default, try to avoid breaks */
          }
          .print-statement-container { 
            font-family: 'Arial', sans-serif; 
            color: #333; 
            width: 100%;
            max-width: 190mm; /* Approx A4 width minus margins */
            margin: 0 auto;
          }
          .statement-header { text-align: center; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 1.5px solid #4A90E2; }
          .statement-header h1 { font-size: 1.4em; margin:0; color: #4A90E2; } /* Reduced */
          .statement-header p { font-size: 0.85em; margin: 3px 0; } /* Reduced */
          .client-info { margin-bottom: 12px; background-color: #f0f8ff; padding: 10px; border-radius: 6px; border: 1px solid #d1e7fd; } /* Reduced padding */
          .client-info p { margin: 3px 0; font-size: 0.85em; } /* Reduced */
          .client-info strong { color: #31708f; }
          .summary-section { display: grid; grid-template-columns: repeat(3, 1fr); gap:8px; margin-bottom: 15px; padding: 10px 0; border-top: 1px dashed #ccc; border-bottom: 1px dashed #ccc; } /* Reduced gap & padding */
          .summary-item { text-align: center; padding: 6px; background-color: #f9f9f9; border-radius:4px;} /* Reduced padding */
          .summary-item p { margin: 0; font-size: 0.8em; color: #555; } /* Reduced */
          .summary-item h3 { margin: 3px 0; font-size: 1.0em; color: #4A90E2; } /* Reduced */
          .consumptions-table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 0.8em; } /* Reduced */
          .consumptions-table th, .consumptions-table td { border: 1px solid #ccc; padding: 5px; text-align: left; } /* Reduced padding */
          .consumptions-table th { background-color: #e9ecef; color: #495057; font-weight: 600; }
          .consumptions-table tr:nth-child(even) { background-color: #f8f9fa; }
          .consumptions-table td:last-child { text-align: right; font-weight: 500; }
          .section-title { font-size: 1.1em; color: #4A90E2; margin-top: 15px; margin-bottom: 6px; border-bottom: 1px solid #e0e0e0; padding-bottom: 3px;} /* Reduced */
          .payment-info { margin-top:12px; padding:8px; background-color: #fff8e1; border: 1px solid #ffecb3; border-radius: 4px;} /* Reduced padding */
          .payment-info p { margin: 3px 0; font-size: 0.85em;} /* Reduced */
          .statement-footer { text-align: center; font-size: 0.7em; margin-top: 20px; padding-top: 8px; border-top: 1px solid #ddd; color: #666; } /* Reduced */
          
          /* Avoid breaking elements across pages */
          .client-info, .summary-section, .payment-info, .consumptions-table thead, .statement-footer {
            page-break-inside: avoid;
          }
          .consumptions-table tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
        `}
      </style>
      <div className="print-statement-container">
        <div className="statement-header">
          <h1>Estado de Cuenta de Cliente</h1>
          {colmadoName && <p>Colmado: {colmadoName}</p>}
          <p>Fecha de Emisión: {format(new Date(), "dd MMM yyyy, hh:mm a", { locale: es })}</p>
        </div>

        <div className="client-info">
          <p><strong>Cliente:</strong> {clientName || "N/A"}</p>
          {cedula && <p><strong>Cédula:</strong> {cedula}</p>}
          {clientId && <p><strong>ID Cliente:</strong> {clientId}</p>}
          <p><strong>ID de Crédito:</strong> {creditId}</p>
          <p><strong>Fecha de Apertura Crédito:</strong> {startDate ? format(new Date(startDate), "dd MMM yyyy", { locale: es }) : "N/A"}</p>
        </div>

        <div className="summary-section">
          <div className="summary-item">
            <p>Límite de Crédito</p>
            <h3>${creditLimit?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          </div>
          <div className="summary-item">
            <p>Total Consumido</p>
            <h3>${totalConsumed?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          </div>
          <div className="summary-item">
            <p>Balance Disponible</p>
            <h3 style={{color: remainingAmount >= 0 ? "#28a745" : "#dc3545"}}>${remainingAmount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          </div>
        </div>
        
        {totalConsumed > 0 && clientCredit.status === "Activo" && (
          <div className="payment-info">
            <h2 className="section-title" style={{marginTop:0, marginBottom: '8px'}}>Información de Próximo Pago</h2>
            <p><strong>Fecha Límite de Pago:</strong> {nextPaymentDate ? format(new Date(nextPaymentDate), "dd MMM yyyy", { locale: es }) : "N/A"}</p>
            <p><strong>Monto Estimado a Pagar:</strong> <strong style={{color: "#c0392b"}}>${nextPaymentAmount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}</strong>{lateFeeText}</p>
            <p style={{fontSize: '0.8em', color: '#555'}}>Nota: Si el pago se realiza después de 5 días de la fecha límite, se aplicará un cargo adicional por mora del 5% sobre el monto consumido.</p>
          </div>
        )}

        {consumptions && consumptions.length > 0 ? (
          <>
            <h2 className="section-title">Detalle de Consumos</h2>
            <table className="consumptions-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                {consumptions.sort((a, b) => new Date(b.paymentDate || b.createdAt) - new Date(a.paymentDate || a.createdAt)).map(cons => (
                  <tr key={cons.id}>
                    <td>{format(new Date(cons.paymentDate || cons.createdAt), "dd MMM yy", { locale: es })}</td>
                    <td>{cons.description || "Consumo"}</td>
                    <td>${cons.amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="text-center text-gray-600 my-6">No hay consumos registrados para este crédito.</p>
        )}

        <div className="statement-footer">
          <p>Este es un estado de cuenta informativo. Para cualquier aclaración, contacte a {colmadoName || "su colmado"}.</p>
        </div>
      </div>
    </div>
  );
});
PrintClientStatement.displayName = "PrintClientStatement";
export default PrintClientStatement;
