
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { DollarSign, User, CalendarDays, Info } from "lucide-react";
import { calculateInterestAndPenalty } from "@/lib/interest-calculator";

const RecordPaymentForm = ({ clientsCredits, onSubmit, onCancel }) => {
  const { toast } = useToast();
  const [selectedCreditId, setSelectedCreditId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedCreditDetails, setSelectedCreditDetails] = useState(null);
  const [calculatedDues, setCalculatedDues] = useState(null);

  useEffect(() => {
    if (selectedCreditId) {
      const credit = clientsCredits.find(c => c.id === selectedCreditId);
      setSelectedCreditDetails(credit);
      if (credit) {
        const consumed = credit.amount - credit.remainingAmount;
        if (consumed > 0) {
          const dues = calculateInterestAndPenalty(consumed, credit.startDate, credit.lastPaymentDate);
          setCalculatedDues(dues);
          setPaymentAmount(dues.totalAmountDue.toFixed(2));
        } else {
          setCalculatedDues(null);
          setPaymentAmount("0.00");
        }
      }
    } else {
      setSelectedCreditDetails(null);
      setCalculatedDues(null);
      setPaymentAmount("");
    }
  }, [selectedCreditId, clientsCredits]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCreditId) {
      toast({ title: "Error", description: "Por favor, seleccione un cliente/crédito.", variant: "destructive" });
      return;
    }
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      toast({ title: "Error", description: "El monto del pago debe ser mayor a cero.", variant: "destructive" });
      return;
    }

    onSubmit({
      creditId: selectedCreditId,
      amount: parseFloat(paymentAmount),
      paymentDate,
    });
    toast({ title: "Pago Registrado", description: "El pago ha sido procesado exitosamente." });
  };
  
  const activeClientsCredits = clientsCredits.filter(c => c.status === "Activo" || c.status === "Suspendido" || (c.amount - c.remainingAmount > 0));

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <Label htmlFor="creditId">Cliente / Crédito</Label>
        <Select onValueChange={setSelectedCreditId} value={selectedCreditId}>
          <SelectTrigger id="creditId">
            <SelectValue placeholder="Seleccione un cliente/crédito" />
          </SelectTrigger>
          <SelectContent>
            {activeClientsCredits.length > 0 ? activeClientsCredits.map(credit => (
              <SelectItem key={credit.id} value={credit.id}>
                {credit.clientName} (Disponible: ${credit.remainingAmount.toLocaleString()})
              </SelectItem>
            )) : <p className="p-4 text-sm text-gray-500">No hay créditos activos o con balance pendiente.</p>}
          </SelectContent>
        </Select>
      </div>

      {selectedCreditDetails && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-800 space-y-2"
        >
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"><Info className="h-4 w-4 mr-2 text-blue-500"/>Información del Crédito</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">Límite Total: ${selectedCreditDetails.amount.toLocaleString()}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Consumido (Capital): ${(selectedCreditDetails.amount - selectedCreditDetails.remainingAmount).toLocaleString()}</p>
          {calculatedDues && (selectedCreditDetails.amount - selectedCreditDetails.remainingAmount > 0) && (
            <>
              <p className="text-xs text-gray-600 dark:text-gray-400">Interés/Penalidad Calculada: ${calculatedDues.interestAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({ (calculatedDues.totalEffectiveRate * 100).toFixed(0) }%)</p>
              <p className="text-xs font-semibold text-red-600 dark:text-red-400">Monto Total Adeudado: ${calculatedDues.totalAmountDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 italic">{calculatedDues.statusMessage}</p>
            </>
          )}
           {(selectedCreditDetails.amount - selectedCreditDetails.remainingAmount <= 0) && (
            <p className="text-xs text-green-600 dark:text-green-400">Este crédito no tiene balance consumido pendiente.</p>
           )}
        </motion.div>
      )}

      <div>
        <Label htmlFor="paymentAmount">Monto del Pago</Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="paymentAmount"
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="pl-10"
            placeholder="0.00"
            step="0.01"
            min="0.01"
            disabled={!selectedCreditId || (selectedCreditDetails && (selectedCreditDetails.amount - selectedCreditDetails.remainingAmount <= 0))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="paymentDate">Fecha del Pago</Label>
        <Input
          id="paymentDate"
          type="date"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={!selectedCreditId || !paymentAmount || parseFloat(paymentAmount) <= 0 || (selectedCreditDetails && (selectedCreditDetails.amount - selectedCreditDetails.remainingAmount <= 0))}>
          Registrar Pago
        </Button>
      </div>
    </motion.form>
  );
};

export default RecordPaymentForm;
