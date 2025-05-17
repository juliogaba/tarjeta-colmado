
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, DollarSign } from 'lucide-react';

const PaymentModal = ({ 
  isOpen, 
  onOpenChange, 
  onSubmit, 
  clientsCredits, 
  getCalculatedCreditDetails,
  allConsumptions, // Necesario para getCalculatedCreditDetails
  allPayments // Necesario para getCalculatedCreditDetails
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [calculatedDetails, setCalculatedDetails] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDescription, setPaymentDescription] = useState('Pago de consumo/ciclo');

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setSelectedCredit(null);
      setCalculatedDetails(null);
      setPaymentAmount('');
      setPaymentDescription('Pago de consumo/ciclo');
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedCredit && getCalculatedCreditDetails) {
      const details = getCalculatedCreditDetails(selectedCredit, [...(allConsumptions || []), ...(allPayments || [])]);
      setCalculatedDetails(details);
    } else {
      setCalculatedDetails(null);
    }
  }, [selectedCredit, getCalculatedCreditDetails, allConsumptions, allPayments]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSelectedCredit(null);
      return;
    }
    const found = clientsCredits.find(
      c => (c.cedula && c.cedula.includes(searchTerm)) || 
           (c.clientId && c.clientId.includes(searchTerm)) ||
           (c.clientName && c.clientName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setSelectedCredit(found || null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCredit || !paymentAmount || parseFloat(paymentAmount) <= 0) {
      // Podrías usar un toast aquí para el feedback
      alert("Por favor, seleccione un cliente y ingrese un monto de pago válido.");
      return;
    }
    onSubmit({
      creditId: selectedCredit.id,
      clientId: selectedCredit.clientId || selectedCredit.cedula, // o el identificador que uses
      amount: parseFloat(paymentAmount),
      description: paymentDescription,
      paymentDate: new Date().toISOString(), // o permitir seleccionar fecha
    });
    onOpenChange(false); 
  };

  const amountDueDisplay = calculatedDetails?.amountDue > 0 
    ? calculatedDetails.amountDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : "0.00";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Pago de Cliente</DialogTitle>
          <DialogDescription>Busque el cliente e ingrese el monto del pago.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Input
                id="client-search"
                placeholder="Buscar por Cédula, ID Cliente o Nombre"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
              <Button type="button" onClick={handleSearch} size="icon" variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {selectedCredit && calculatedDetails && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                <p className="font-semibold text-slate-800 dark:text-slate-200">{selectedCredit.clientName}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Cédula: {selectedCredit.cedula || 'N/A'}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Límite de Crédito: ${selectedCredit.amount.toLocaleString()}</p>
                <p className="text-sm text-green-600 dark:text-green-400 font-semibold">Monto Adeudado del Ciclo (Estimado): ${amountDueDisplay}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Interés Acumulado (Estimado): ${calculatedDetails.accumulatedInterest?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Disponible (Capital): ${selectedCredit.remainingAmount.toLocaleString()}</p>
              </div>
            )}
            {!selectedCredit && searchTerm && (
              <p className="text-sm text-red-500 text-center">Cliente no encontrado.</p>
            )}

            {selectedCredit && (
              <>
                <div className="space-y-1">
                  <Label htmlFor="payment-amount" className="text-right">
                    Monto del Pago
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="payment-amount"
                      type="number"
                      placeholder="0.00"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      required
                      className="pl-8"
                      min="0.01"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="payment-description" className="text-right">
                    Descripción (Opcional)
                  </Label>
                  <Input
                    id="payment-description"
                    placeholder="Ej: Abono al consumo"
                    value={paymentDescription}
                    onChange={(e) => setPaymentDescription(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={!selectedCredit || !paymentAmount || parseFloat(paymentAmount) <= 0}>Registrar Pago</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
