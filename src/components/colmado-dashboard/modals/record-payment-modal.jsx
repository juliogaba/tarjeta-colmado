
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import RecordPaymentForm from "@/components/payments/record-payment-form";

const RecordPaymentModal = ({ isOpen, onOpenChange, clientsCredits, onSubmit, colmadoName }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Registrar Pago de Consumo</DialogTitle>
          <DialogDescription>
            Seleccione el cliente y registre el monto pagado. Colmado: {colmadoName}
          </DialogDescription>
        </DialogHeader>
        <RecordPaymentForm
          clientsCredits={clientsCredits}
          onSubmit={(paymentData) => {
            onSubmit(paymentData);
            onOpenChange(false); 
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RecordPaymentModal;
