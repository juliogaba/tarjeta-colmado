
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, FilePlus2 } from "lucide-react";

const ActionCards = ({ 
  onOpenCreditRequest, 
  onOpenRegisterConsumption
}) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 bg-gradient-to-br from-sky-400 to-blue-500 text-white">
          <CardHeader>
              <CardTitle className="flex items-center"><FilePlus2 className="mr-2"/> Solicitar Nuevo Crédito</CardTitle>
              <CardDescription className="text-sky-100">Inicia una nueva solicitud de crédito para un cliente.</CardDescription>
          </CardHeader>
          <CardContent>
              <Button 
                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm" 
                onClick={() => {
                  console.log("ActionCards: Nueva Solicitud clicked. Type of onOpenCreditRequest:", typeof onOpenCreditRequest);
                  if (typeof onOpenCreditRequest === 'function') {
                    onOpenCreditRequest();
                  } else {
                    console.error("ActionCards: onOpenCreditRequest is not a function");
                  }
                }}
              >
                  <FilePlus2 className="mr-2 h-4 w-4"/> Nueva Solicitud
              </Button>
          </CardContent>
      </Card>
      
      <Card className="hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 bg-gradient-to-br from-amber-400 to-orange-500 text-white">
          <CardHeader>
              <CardTitle className="flex items-center"><DollarSign className="mr-2"/> Registrar Consumo de Cliente</CardTitle>
              <CardDescription className="text-amber-100">Registra un nuevo consumo para un cliente existente.</CardDescription>
          </CardHeader>
          <CardContent>
              <Button 
                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm" 
                onClick={() => {
                  console.log("ActionCards: Registrar Consumo clicked. Type of onOpenRegisterConsumption:", typeof onOpenRegisterConsumption);
                  if (typeof onOpenRegisterConsumption === 'function') {
                    onOpenRegisterConsumption();
                  } else {
                    console.error("ActionCards: onOpenRegisterConsumption is not a function");
                  }
                }}
              >
                  <DollarSign className="mr-2 h-4 w-4"/> Registrar Consumo
              </Button>
          </CardContent>
      </Card>
    </div>
  );
};

export default ActionCards;
