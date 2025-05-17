
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import CreditRequestForm from "@/components/colmado-dashboard/credit-request-form";

const CreditRequestModal = ({ isOpen, onOpenChange, onSubmit, colmadoName }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0">
        <CreditRequestForm 
          onSubmit={(data) => {
            onSubmit(data);
            onOpenChange(false); 
          }}
          onCancel={() => onOpenChange(false)}
          colmadoName={colmadoName}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreditRequestModal;
