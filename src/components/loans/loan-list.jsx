
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";

const getStatusColor = (status) => {
  switch (status) {
    case "Activo": return "text-green-500";
    case "Pagado": return "text-blue-500";
    case "Pendiente Aprobación": return "text-yellow-600";
    case "Rechazado": return "text-red-500";
    default: return "text-gray-500";
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const RenderCreditCard = ({ credit, onViewDetails, onApproveCredit }) => (
  <motion.div variants={itemVariants} layout key={credit.id}>
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-800 border dark:border-slate-700">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-blue-700 dark:text-sky-400">{credit.clientName || "Cliente Desconocido"}</CardTitle>
            <CardDescription className="text-xs text-gray-500 dark:text-slate-400">{credit.colmadoName || "Sin Colmado Asignado"}</CardDescription>
          </div>
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(credit.status).replace('text-', 'bg-').replace('-500', '-100').replace('-600', '-100')} ${getStatusColor(credit.status)}`}>
            {credit.status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="text-sm space-y-1.5 text-gray-700 dark:text-slate-300">
        <p><strong>Monto:</strong> ${credit.amount.toLocaleString()}</p>
        <p><strong>Pendiente:</strong> ${credit.remainingAmount.toLocaleString()}</p>
        <p><strong>Tipo:</strong> {credit.type === "colmado" ? "Crédito Colmado" : "Personal"}</p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 bg-gray-50 dark:bg-slate-800/50 p-3 border-t dark:border-slate-700">
        <Button variant="outline" size="sm" onClick={() => onViewDetails(credit)}>
          <Info className="h-4 w-4 mr-1.5"/> Detalles
        </Button>
        {credit.status === "Pendiente Aprobación" && onApproveCredit && (
          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => onApproveCredit(credit.id)}>
            <CheckCircle className="h-4 w-4 mr-1.5"/> Aprobar
          </Button>
        )}
      </CardFooter>
    </Card>
  </motion.div>
);

const LoanList = ({ credits, onViewDetails, onApproveCredit, emptyListMessage, showApprovalButton = true }) => {
  const message = emptyListMessage || {
    icon: <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-yellow-400 dark:text-yellow-500"/>,
    title: "No se encontraron créditos.",
    text: "Intenta ajustar tu búsqueda o filtro.",
  };

  return (
    <AnimatePresence>
      {credits.length > 0 ? (
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {credits.map((credit) => (
            <RenderCreditCard 
              key={credit.id} 
              credit={credit} 
              onViewDetails={onViewDetails} 
              onApproveCredit={showApprovalButton ? onApproveCredit : undefined}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 text-gray-500 dark:text-slate-400">
          {message.icon}
          <p className="text-xl">{message.title}</p>
          <p>{message.text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoanList;
