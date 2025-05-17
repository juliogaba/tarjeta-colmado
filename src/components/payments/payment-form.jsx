
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingBasket, CalendarDays, StickyNote } from "lucide-react";

const PaymentForm = ({ loan, onSubmit, onCancel }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    amount: "", // El monto del consumo
    description: "", // Descripción del consumo
    paymentDate: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast({
        title: "Error",
        description: "El monto del consumo debe ser mayor a cero.",
        variant: "destructive",
      });
      return;
    }
    if (!formData.description.trim()) {
      toast({
        title: "Error",
        description: "Por favor, ingrese una descripción para el consumo.",
        variant: "destructive",
      });
      return;
    }
    
    const consumption = {
      id: Date.now().toString(),
      creditId: loan.id,
      ...formData,
      amount: parseFloat(formData.amount),
    };
    
    onSubmit(consumption);
    
    toast({
      title: "Consumo Registrado",
      description: "El consumo ha sido registrado exitosamente.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Monto del Consumo</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                className="pl-8"
                step="0.01"
                min="0"
                placeholder="Ej: 150.75"
              />
            </div>
             {loan?.remainingAmount !== undefined && (
              <p className="text-sm text-gray-500 mt-1">
                Crédito disponible: ${loan.remainingAmount.toLocaleString()}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="description">Descripción del Consumo</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ej: Compra de víveres, refrescos"
            />
          </div>
          
          <div>
            <Label htmlFor="paymentDate">Fecha del Consumo</Label>
            <Input
              id="paymentDate"
              name="paymentDate"
              type="date"
              value={formData.paymentDate}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-emerald-800 mb-2 flex items-center">
            <ShoppingBasket className="h-4 w-4 mr-2" />
            Resumen del Consumo
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-emerald-600">Monto</span>
              <span className="font-medium">${parseFloat(formData.amount || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-emerald-600">Colmado</span>
              <span className="font-medium">{loan?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-emerald-600">Fecha</span>
              <span className="font-medium">{formData.paymentDate}</span>
            </div>
             {formData.description && (
              <div className="flex justify-between pt-2 border-t border-emerald-200">
                <span className="text-sm text-emerald-600 flex items-center"><StickyNote className="h-3 w-3 mr-1"/> Descripción</span>
                <span className="font-medium text-right truncate max-w-[180px] sm:max-w-xs" title={formData.description}>{formData.description}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Registrar Consumo</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default PaymentForm;
