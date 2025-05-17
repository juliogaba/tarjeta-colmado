
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Info, ShoppingCart, QrCode as QrCodeIcon, AlertTriangle, Fingerprint, FileText, DollarSign } from "lucide-react";

const ClientList = ({ clientsCredits, onViewDetails, onRegisterConsumption, onShowQrCode }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center"><User className="mr-2 text-gray-700"/> Clientes y Balances</CardTitle>
        <CardDescription>Listado de clientes con crédito y su estado actual.</CardDescription>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-auto">
        {clientsCredits.length > 0 ? clientsCredits.map(clientCredit => {
          const totalConsumed = clientCredit.amount - clientCredit.remainingAmount;
          return (
            <div 
              key={clientCredit.id} 
              className={`flex flex-col sm:flex-row justify-between sm:items-center p-3 mb-2 rounded-lg hover:bg-gray-100 transition-colors
                          ${clientCredit.status === "Pendiente Aprobación" ? "bg-yellow-50 border-l-4 border-yellow-400" : "bg-gray-50"}`}
            >
              <div className="mb-2 sm:mb-0">
                <p className="font-medium">{clientCredit.clientName}</p>
                {clientCredit.cedula && <p className="text-xs text-gray-500 flex items-center"><FileText className="h-3 w-3 mr-1 text-blue-500"/> Cédula: {clientCredit.cedula}</p>}
                {!clientCredit.cedula && clientCredit.clientId && <p className="text-xs text-gray-500">ID Cliente: {clientCredit.clientId}</p>}
                <p className="text-sm text-gray-600">Límite: <span className="font-semibold text-blue-600">${clientCredit.amount.toLocaleString()}</span></p>
                <p className="text-sm text-gray-600">Consumido: <span className="font-semibold text-red-600">${totalConsumed.toLocaleString()}</span></p>
                <p className="text-xs text-gray-500">Disponible: ${(clientCredit.remainingAmount).toLocaleString()}</p>
                {totalConsumed > 0 && clientCredit.status === "Activo" && (
                  <p className="text-xs text-green-700 font-semibold flex items-center">
                    <DollarSign className="h-3 w-3 mr-1"/> Próx. Pago Estimado: ${clientCredit.nextPaymentAmount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                  </p>
                )}
                 {totalConsumed === 0 && clientCredit.status === "Activo" && (
                  <p className="text-xs text-gray-500">Sin consumos para calcular próximo pago.</p>
                )}
                <p className="text-xs text-muted-foreground">ID Crédito: {clientCredit.id}</p>
                
                {clientCredit.status === "Pendiente Aprobación" && (
                  <p className="text-xs text-yellow-600 font-semibold mt-1 flex items-center">
                    <AlertTriangle className="h-3 w-3 mr-1" /> Crédito pendiente de aprobación
                  </p>
                )}
              </div>
              <div className="flex space-x-1 sm:space-x-2">
                 <Button size="sm" variant="outline" onClick={() => onViewDetails(clientCredit)} className="flex-1 sm:flex-none px-2 sm:px-3">
                  <Info className="h-4 w-4 sm:mr-1"/> <span className="hidden sm:inline">Ver</span>
                 </Button>
                 <Button 
                  size="sm" 
                  onClick={() => onRegisterConsumption()} 
                  className="flex-1 sm:flex-none px-2 sm:px-3 bg-blue-600 hover:bg-blue-700 text-white"
                  title={"Registrar Consumo por ID/Cédula"}
                 >
                  <Fingerprint className="h-4 w-4 sm:mr-1"/> <span className="hidden sm:inline">Consumo</span>
                 </Button>
                 {onShowQrCode && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onShowQrCode(clientCredit.id, clientCredit.clientName)} 
                    className="flex-1 sm:flex-none px-2 sm:px-3"
                    disabled={clientCredit.status !== "Activo"}
                    title={clientCredit.status !== "Activo" ? `Crédito ${clientCredit.status.toLowerCase()}` : "Mostrar Código QR (No funcional)"}
                  >
                    <QrCodeIcon className="h-4 w-4 sm:mr-1"/> <span className="hidden sm:inline">QR</span>
                  </Button>
                 )}
              </div>
            </div>
          )
        }) : <p className="text-gray-500 text-center py-4">No hay clientes con crédito asignado en este colmado.</p>}
      </CardContent>
    </Card>
  );
};

export default ClientList;
