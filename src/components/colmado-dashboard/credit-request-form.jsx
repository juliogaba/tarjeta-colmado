
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, User, CalendarDays, Hash, FileText } from "lucide-react";

const CreditRequestForm = ({ onSubmit, onCancel, colmadoName }) => {
  const [clientName, setClientName] = useState("");
  const [cedula, setCedula] = useState("");
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("1"); 
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !amount || !term || !startDate) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }
    onSubmit({
      clientName,
      cedula: cedula.trim(), 
      amount: parseFloat(amount),
      term: parseInt(term, 10),
      startDate,
    });
    setClientName("");
    setCedula("");
    setAmount("");
    setTerm("1");
    setStartDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl bg-gradient-to-br from-gray-50 to-blue-50">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800">Nueva Solicitud de Crédito</CardTitle>
        <CardDescription className="text-gray-600">Colmado: {colmadoName || "N/A"}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="clientName" className="flex items-center text-gray-700"><User className="mr-2 h-4 w-4 text-blue-600" />Nombre del Cliente</Label>
            <Input
              id="clientName"
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Ej: Juan Pérez"
              required
              className="bg-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cedula" className="flex items-center text-gray-700"><FileText className="mr-2 h-4 w-4 text-blue-600" />Número de Cédula (Opcional)</Label>
            <Input
              id="cedula"
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Ej: 001-1234567-8"
              className="bg-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center text-gray-700"><DollarSign className="mr-2 h-4 w-4 text-blue-600" />Monto Solicitado</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Ej: 5000"
                required
                min="1"
                className="bg-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="term" className="flex items-center text-gray-700"><Hash className="mr-2 h-4 w-4 text-blue-600" />Plazo (meses)</Label>
              <Input
                id="term"
                type="number"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Ej: 1"
                required
                min="1"
                className="bg-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate" className="flex items-center text-gray-700"><CalendarDays className="mr-2 h-4 w-4 text-blue-600" />Fecha de Inicio</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="bg-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="border-gray-400 text-gray-700 hover:bg-gray-100">
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
              Enviar Solicitud
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreditRequestForm;
