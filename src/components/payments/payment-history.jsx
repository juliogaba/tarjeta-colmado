
import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Calendar, Check, AlertCircle } from "lucide-react";

const PaymentHistory = ({ payments }) => {
  // Ordenar pagos por fecha (más recientes primero)
  const sortedPayments = [...payments].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Historial de pagos</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedPayments.length > 0 ? (
            <div className="space-y-4">
              {sortedPayments.map((payment) => (
                <PaymentItem key={payment.id} payment={payment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No hay pagos registrados
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const PaymentItem = ({ payment }) => {
  const { amount, paymentMethod, paymentDate, status, loanName } = payment;
  
  const formattedDate = format(new Date(paymentDate), "d 'de' MMMM, yyyy", { locale: es });
  
  // Determinar el icono y color basado en el método de pago
  let methodIcon = <CreditCard className="h-4 w-4" />;
  let methodColor = "bg-blue-100 text-blue-800";
  
  if (paymentMethod === "transferencia") {
    methodColor = "bg-purple-100 text-purple-800";
  } else if (paymentMethod === "efectivo") {
    methodColor = "bg-green-100 text-green-800";
  }
  
  // Determinar el color basado en el estado
  let statusColor = "bg-green-100 text-green-800";
  let statusIcon = <Check className="h-3 w-3" />;
  
  if (status === "Pendiente") {
    statusColor = "bg-yellow-100 text-yellow-800";
    statusIcon = <AlertCircle className="h-3 w-3" />;
  } else if (status === "Fallido") {
    statusColor = "bg-red-100 text-red-800";
    statusIcon = <AlertCircle className="h-3 w-3" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-start">
        <div className={`p-2 rounded-full ${methodColor} mr-3`}>
          {methodIcon}
        </div>
        <div>
          <p className="font-medium">{loanName || "Préstamo"}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <span className="font-bold text-lg mr-3">${amount.toLocaleString()}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${statusColor}`}>
          {statusIcon}
          <span className="ml-1">{status}</span>
        </span>
      </div>
    </motion.div>
  );
};

export default PaymentHistory;
