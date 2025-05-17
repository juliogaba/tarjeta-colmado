
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DollarSign, CalendarDays, Percent, Hash, UserCircle, Building, QrCode, Printer, FileText } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const LoanDetails = ({ loan, onClose, onMakePayment, onShowQrCode, onPrintStatement, isColmadoView = false }) => {
  if (!loan) return <p>No hay detalles del préstamo para mostrar.</p>;

  const amountUsed = loan.amount - loan.remainingAmount;
  const progress = loan.amount > 0 ? (amountUsed / loan.amount) * 100 : 0;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(parseISO(dateString), "PPP", { locale: es });
    } catch (error) {
      return dateString; 
    }
  };
  
  const DetailItem = ({ icon, label, value, className = "" }) => (
    <div className={`flex items-start space-x-3 ${className}`}>
      {React.cloneElement(icon, { className: "h-5 w-5 text-blue-600 mt-1" })}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <Card className="w-full shadow-lg border-t-4 border-blue-600">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">Detalles del Crédito</CardTitle>
            <CardDescription className="text-gray-600">
              Cliente: {loan.clientName || 'N/A'}
              {loan.cedula && ` | Cédula: ${loan.cedula}`}
              {!loan.cedula && loan.clientId && ` | ID Cliente: ${loan.clientId}`}
            </CardDescription>
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full
            ${loan.status === 'Activo' ? 'bg-green-100 text-green-700' : 
              loan.status === 'Pagado' ? 'bg-blue-100 text-blue-700' :
              loan.status === 'Pendiente Aprobación' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'}`}>
            {loan.status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Progreso del Crédito</span>
            <span className="text-sm font-bold text-blue-600">{progress.toFixed(2)}%</span>
          </div>
          <Progress value={progress} className="w-full h-3 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-indigo-500" />
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Usado: ${amountUsed.toLocaleString()}</span>
            <span>Disponible: ${loan.remainingAmount.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <DetailItem icon={<DollarSign />} label="Monto Total Aprobado" value={`$${loan.amount.toLocaleString()}`} />
          <DetailItem icon={<DollarSign />} label="Monto Restante" value={`$${loan.remainingAmount.toLocaleString()}`} />
          {loan.interestRate !== undefined && <DetailItem icon={<Percent />} label="Tasa de Interés" value={`${loan.interestRate}%`} />}
          <DetailItem icon={<Hash />} label="Plazo" value={`${loan.term} mes(es)`} />
          <DetailItem icon={<CalendarDays />} label="Fecha de Inicio" value={formatDate(loan.startDate)} />
          <DetailItem icon={<CalendarDays />} label="Próximo Pago (Estimado)" value={formatDate(loan.nextPaymentDate)} />
          {loan.nextPaymentAmount !== undefined && <DetailItem icon={<DollarSign />} label="Monto Próximo Pago" value={`$${loan.nextPaymentAmount.toLocaleString()}`} />}
          {loan.colmadoName && <DetailItem icon={<Building />} label="Colmado" value={loan.colmadoName} />}
          {loan.type && <DetailItem icon={<FileText />} label="Tipo de Crédito" value={loan.type === 'colmado' ? 'Crédito de Colmado' : loan.type} />}
        </div>

        {loan.consumptions && loan.consumptions.length > 0 && (
          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-2">Consumos Recientes:</h4>
            <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
              {loan.consumptions.slice(0, 5).map(cons => (
                <div key={cons.id} className="text-xs p-2 bg-white border rounded-md shadow-sm">
                  <div className="flex justify-between">
                    <span>{cons.description || "Consumo"} ({formatDate(cons.createdAt || cons.paymentDate)})</span>
                    <span className="font-medium">${cons.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t">
        {isColmadoView && onShowQrCode && loan.status === 'Activo' && (
          <Button variant="outline" onClick={() => onShowQrCode(loan.id, loan.clientName)} className="w-full sm:w-auto">
            <QrCode className="mr-2 h-4 w-4" /> Mostrar QR (No funcional)
          </Button>
        )}
        {isColmadoView && onPrintStatement && (
           <Button variant="outline" onClick={() => onPrintStatement(loan)} className="w-full sm:w-auto">
            <Printer className="mr-2 h-4 w-4" /> Imprimir Estado
          </Button>
        )}
        {!isColmadoView && onMakePayment && loan.status === 'Activo' && (
          <Button onClick={() => onMakePayment(loan)} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
            <DollarSign className="mr-2 h-4 w-4" /> Realizar Pago
          </Button>
        )}
        <Button variant="ghost" onClick={onClose} className="w-full sm:w-auto">Cerrar</Button>
      </CardFooter>
    </Card>
  );
};

export default LoanDetails;
