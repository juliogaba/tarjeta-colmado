
import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, ShoppingCart, Info } from "lucide-react";

const LoanCard = ({ loan, onViewDetails, onMakePayment }) => {
  const { id, name, amount, remainingAmount, nextPaymentDate, nextPaymentAmount, status, type } = loan;
  
  const progressValue = amount > 0 ? ((amount - remainingAmount) / amount) * 100 : 0;
  const isColmadoCard = type === "colmado";
  
  let statusColor = "bg-blue-100 text-blue-800";
  if (status === "Pagado") {
    statusColor = "bg-green-100 text-green-800";
  } else if (status === "Atrasado") {
    statusColor = "bg-red-100 text-red-800";
  } else if (status === "Pendiente") {
    statusColor = "bg-yellow-100 text-yellow-800";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card-hover"
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold">{name}</CardTitle>
              <p className="text-sm text-gray-500">{isColmadoCard ? "Crédito de Colmado" : `Tasa: ${loan.interestRate}%`}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
              {status}
            </span>
          </div>
        </CardHeader>
        <CardContent className="pb-0 flex-grow">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">{isColmadoCard ? "Uso del crédito" : "Progreso de pago"}</span>
            <span className="text-sm font-medium">{progressValue.toFixed(0)}%</span>
          </div>
          <Progress value={progressValue} className="h-2 mb-4" />
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">{isColmadoCard ? "Límite de Crédito" : "Monto total"}</span>
              <span className="text-lg font-bold flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                ${amount.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">{isColmadoCard ? "Saldo Disponible" : "Restante"}</span>
              <span className="text-lg font-bold flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                ${remainingAmount.toLocaleString()}
              </span>
            </div>
          </div>
          
          {nextPaymentDate && (
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">{isColmadoCard ? "Próxima Fecha de Corte" : "Próximo pago"}</p>
                  <p className="font-medium">
                    {format(new Date(nextPaymentDate), "d 'de' MMMM, yyyy", { locale: es })}
                  </p>
                  <p className="text-sm font-bold text-primary">
                    {isColmadoCard ? "Saldo al corte: " : "Monto: "}
                    ${nextPaymentAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-4 flex justify-between">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(id)} className="flex items-center">
            <Info className="mr-2 h-4 w-4" /> Ver detalles
          </Button>
          <Button size="sm" onClick={() => onMakePayment(id)} className="flex items-center">
            <ShoppingCart className="mr-2 h-4 w-4" /> {isColmadoCard ? "Registrar Consumo" : "Realizar Pago"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default LoanCard;
