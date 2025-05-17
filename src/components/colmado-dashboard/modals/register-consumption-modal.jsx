
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PaymentForm from "@/components/payments/payment-form";

const RegisterConsumptionModal = ({ isOpen, onOpenChange, clientCredit, colmadoName, onSubmit }) => {
  if (!clientCredit) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Registrar Consumo para {clientCredit?.clientName}</DialogTitle>
          <DialogDescription>
            Colmado: {colmadoName} | Crédito Disponible: ${clientCredit?.remainingAmount?.toLocaleString()}
          </DialogDescription>
        </DialogHeader>
        <PaymentForm
          loan={clientCredit} 
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RegisterConsumptionModal;
