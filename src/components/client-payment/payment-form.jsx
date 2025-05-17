
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

const ClientPaymentForm = ({ credit, calculatedDetails, onSubmit }) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDescription, setPaymentDescription] = useState('Pago de consumo/ciclo');

  useEffect(() => {
    if (calculatedDetails?.amountDue > 0) {
      // Sugerir el monto adeudado, pero permitir al usuario cambiarlo
      // setPaymentAmount(calculatedDetails.amountDue.toFixed(2));
    } else {
      setPaymentAmount('');
    }
  }, [calculatedDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credit || !paymentAmount || parseFloat(paymentAmount) <= 0) {
      alert("Por favor, ingrese un monto de pago válido.");
      return;
    }
    onSubmit({
      creditId: credit.id,
      clientId: credit.clientId || credit.cedula,
      amount: parseFloat(paymentAmount),
      description: paymentDescription,
      paymentDate: new Date().toISOString(),
    });
    setPaymentAmount(''); // Resetear después de enviar
  };

  if (!credit) {
    return <p>No se ha seleccionado un crédito para realizar el pago.</p>;
  }

  const amountDueDisplay = calculatedDetails?.amountDue > 0 
    ? calculatedDetails.amountDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : "0.00";

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Realizar Pago para {credit.clientName}</CardTitle>
        <CardDescription>
          Monto Adeudado del Ciclo (Estimado): <span className="font-semibold text-green-600">${amountDueDisplay}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="payment-amount">Monto del Pago</Label>
            <div className="relative mt-1">
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
          <div>
            <Label htmlFor="payment-description">Descripción (Opcional)</Label>
            <Input
              id="payment-description"
              placeholder="Ej: Abono al consumo del ciclo"
              value={paymentDescription}
              onChange={(e) => setPaymentDescription(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full">
            Confirmar Pago
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ClientPaymentForm;
