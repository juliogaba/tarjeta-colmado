
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const CreditSummary = ({ totalCredit, usedCredit, availableCredit, creditScore }) => {
  const usedPercentage = (usedCredit / totalCredit) * 100;
  
  // Determinar el color del puntaje de crédito
  let scoreColor = "text-red-500";
  if (creditScore >= 700) {
    scoreColor = "text-green-500";
  } else if (creditScore >= 600) {
    scoreColor = "text-yellow-500";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden shadow-lg border-none">
        <CardHeader className="pb-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <CardTitle className="text-xl">Resumen de Crédito</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Utilización de Crédito</h3>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">Utilizado</span>
                  <span className="text-sm font-medium">{usedPercentage.toFixed(0)}%</span>
                </div>
                <Progress value={usedPercentage} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500">Crédito Total</p>
                  <p className="text-lg font-bold">${totalCredit.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Disponible</p>
                  <p className="text-lg font-bold">${availableCredit.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center items-center border-l-0 md:border-l border-gray-200 pl-0 md:pl-6">
              <h3 className="text-lg font-medium mb-2">Puntaje Crediticio</h3>
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#e5e7eb" 
                    strokeWidth="10" 
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke={creditScore >= 700 ? "#10b981" : creditScore >= 600 ? "#f59e0b" : "#ef4444"} 
                    strokeWidth="10" 
                    strokeDasharray={`${(creditScore / 850) * 283} 283`} 
                    strokeDashoffset="0" 
                    strokeLinecap="round" 
                    transform="rotate(-90 50 50)" 
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className={`text-3xl font-bold ${scoreColor}`}>{creditScore}</span>
                  <span className="text-xs text-gray-500">de 850</span>
                </div>
              </div>
              <p className="mt-2 text-sm text-center">
                {creditScore >= 700 
                  ? "Excelente puntaje crediticio" 
                  : creditScore >= 600 
                    ? "Buen puntaje crediticio" 
                    : "Puntaje crediticio por mejorar"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CreditSummary;
