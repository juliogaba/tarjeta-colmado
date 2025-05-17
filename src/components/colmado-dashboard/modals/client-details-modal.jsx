
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import LoanDetails from "@/components/loans/loan-details";

const ClientDetailsModal = ({ isOpen, onOpenChange, clientCredit, onMakePayment, onShowQrCode, onPrintStatement }) => {
  if (!clientCredit) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
         <DialogHeader>
          <DialogTitle>Detalles del Crédito de {clientCredit?.clientName}</DialogTitle>
          <DialogDescription>
            {clientCredit?.cedula ? `Cédula: ${clientCredit.cedula} | ` : ""}
            {clientCredit?.clientId ? `ID Cliente: ${clientCredit.clientId} | ` : ""}
            Gestionado por: {clientCredit?.colmadoName}
          </DialogDescription>
        </DialogHeader>
        <LoanDetails
          loan={clientCredit}
          onClose={() => onOpenChange(false)}
          onMakePayment={() => onMakePayment(clientCredit)}
          onShowQrCode={onShowQrCode}
          onPrintStatement={onPrintStatement}
          isColmadoView={true}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ClientDetailsModal;
