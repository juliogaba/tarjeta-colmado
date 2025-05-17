
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Store, DollarSign, CalendarDays, FileText } from "lucide-react";

const LoanFormFields = ({
  formData,
  handleChange,
  handleSliderChange,
  handleSelectChange,
  colmados = [],
  isClientCredit = false,
  isAdminForm = false,
  showCedulaField = false
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="clientName" className="flex items-center text-gray-700"><User className="h-4 w-4 mr-2 text-blue-600"/>Nombre del Cliente</Label>
        <Input
          id="clientName"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          placeholder="Ej: Juan Pérez"
          className="bg-white focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {showCedulaField && (
        <div>
          <Label htmlFor="cedula" className="flex items-center text-gray-700"><FileText className="h-4 w-4 mr-2 text-blue-600"/>Número de Cédula (Opcional)</Label>
          <Input
            id="cedula"
            name="cedula"
            value={formData.cedula || ""}
            onChange={handleChange}
            placeholder="Ej: 001-1234567-8"
            className="bg-white focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {(isAdminForm || isClientCredit) && colmados.length > 0 && (
        <div>
          <Label htmlFor="colmadoId" className="flex items-center text-gray-700"><Store className="h-4 w-4 mr-2 text-blue-600"/>Colmado que gestionará</Label>
          <Select value={formData.colmadoId} onValueChange={(value) => handleSelectChange("colmadoId", value)}>
            <SelectTrigger id="colmadoId" className="bg-white focus:ring-blue-500 focus:border-blue-500">
              <SelectValue placeholder="Seleccionar colmado" />
            </SelectTrigger>
            <SelectContent>
              {colmados.map(colmado => (
                <SelectItem key={colmado.id} value={colmado.id}>{colmado.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <Label htmlFor="amount" className="flex items-center text-gray-700"><DollarSign className="h-4 w-4 mr-2 text-blue-600" />Límite de Crédito</Label>
          <div className="flex items-center text-gray-700">
            <span className="font-medium text-blue-700">${parseInt(formData.amount || 0).toLocaleString()}</span>
          </div>
        </div>
        <Slider
          id="amount"
          name="amount"
          value={[formData.amount || 0]}
          min={100} 
          max={20000} 
          step={100}
          onValueChange={(value) => handleSliderChange("amount", value)}
          className="mb-2 [&>span:first-child]:h-2 [&>span:first-child]:bg-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>$100</span>
          <span>$20,000</span>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <Label htmlFor="term" className="flex items-center text-gray-700"><CalendarDays className="h-4 w-4 mr-2 text-blue-600"/>Plazo de Pago (meses)</Label>
           <div className="flex items-center text-gray-700">
             <span className="font-medium text-blue-700">{formData.term || 0} {formData.term === 1 ? "mes" : "meses"}</span>
          </div>
        </div>
        <Slider
          id="term"
          name="term"
          value={[formData.term || 0]}
          min={1} 
          max={12} 
          step={1}
          onValueChange={(value) => handleSliderChange("term", value)}
          className="mb-2 [&>span:first-child]:h-2 [&>span:first-child]:bg-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>1 mes</span>
          <span>12 meses</span>
        </div>
      </div>
      
      <div>
        <Label htmlFor="startDate" className="flex items-center text-gray-700"><CalendarDays className="h-4 w-4 mr-2 text-blue-600"/>Fecha de Apertura del Crédito</Label>
        <Input
          id="startDate"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          className="bg-white focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default LoanFormFields;
