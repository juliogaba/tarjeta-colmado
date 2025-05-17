
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const ApproveCreditDialog = ({ isOpen, onOpenChange, loanToApprove, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar Aprobación de Crédito</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas aprobar el crédito para <span className="font-semibold">{loanToApprove?.clientName}</span> por un monto de ${loanToApprove?.amount.toLocaleString()}?
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end space-x-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={onConfirm} className="bg-green-600 hover:bg-green-700 text-white">
            <CheckCircle className="mr-2 h-4 w-4"/> Confirmar Aprobación
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveCreditDialog;
