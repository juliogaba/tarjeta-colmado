
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import LoanDetails from '@/components/loans/loan-details'; 
import { CheckCircle } from 'lucide-react';

const LoanDetailsDialog = ({ isOpen, onOpenChange, loan, onClose, onMakePayment, onShowQrCode, onPrintStatement, isColmadoView = false, onApproveCredit }) => {
  if (!loan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        <LoanDetails 
          loan={loan} 
          onClose={onClose} 
          onMakePayment={onMakePayment}
          onShowQrCode={onShowQrCode}
          onPrintStatement={onPrintStatement}
          isColmadoView={isColmadoView}
        />
        {loan.status === "Pendiente Aprobación" && onApproveCredit && !isColmadoView && (
          <DialogFooter className="p-4 border-t bg-gray-50 dark:bg-slate-800/50">
            <Button 
              onClick={() => {
                onApproveCredit(loan.id);
                onClose(); 
              }} 
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white"
            >
              <CheckCircle className="mr-2 h-4 w-4"/> Aprobar Crédito
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoanDetailsDialog;
