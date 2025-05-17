
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { format, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";

const AdminUpcomingPayments = ({ upcomingPayments }) => {
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };
  
  const getUrgencyColor = (date) => {
    const daysUntilPayment = differenceInDays(new Date(date), new Date());
    if (daysUntilPayment <= 3) return "border-red-400 bg-red-50";
    if (daysUntilPayment <= 7) return "border-yellow-400 bg-yellow-50";
    return "border-gray-200 bg-white";
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Calendar className="h-6 w-6 mr-3 text-purple-600" />
            <CardTitle className="text-xl">Próximos Pagos/Cortes</CardTitle>
          </div>
           <Link to="/analisis">
            <Button variant="outline" size="sm">Ver Calendario Completo</Button>
          </Link>
        </div>
        <CardDescription>Visualiza los próximos vencimientos de pago o fechas de corte de los créditos activos.</CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingPayments.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {upcomingPayments.map((payment, index) => (
              <motion.div
                key={payment.id}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className={`p-4 rounded-lg border ${getUrgencyColor(payment.nextPaymentDate)} shadow-sm hover:shadow-md transition-all duration-200`}
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{payment.clientName}</p>
                    <p className="text-xs text-gray-500">Colmado: {payment.colmadoName}</p>
                  </div>
                  <div className="text-left sm:text-right mt-2 sm:mt-0">
                    <p className="text-sm font-medium text-purple-700">
                      ${(payment.nextPaymentAmount || 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600">
                      {format(new Date(payment.nextPaymentDate), "EEEE, dd MMM yyyy", { locale: es })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-400" />
            <p className="text-lg">Todo al día.</p>
            <p>No hay pagos próximos en los siguientes días para créditos activos.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUpcomingPayments;
