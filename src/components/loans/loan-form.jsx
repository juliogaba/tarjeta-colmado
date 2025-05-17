
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import LoanFormFields from "./loan-form-fields";
import LoanFormSummary from "./loan-form-summary";

const INITIAL_FORM_DATA = {
  clientName: "",
  cedula: "",
  amount: 1000,
  term: 1,
  startDate: new Date().toISOString().split("T")[0],
  colmadoId: "",
};

const calculateMonthlyPayment = (principal, rate, term) => {
  if (term === 0 || principal === 0) return 0;
  if (rate === 0) {
    return (principal / term);
  }
  const monthlyRate = rate / 100 / 12;
  const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  return payment;
};

const LoanForm = ({ 
  onSubmit, 
  onCancel, 
  colmados = [], 
  creditToEdit = null, 
  isClientCredit = false, // True if admin is approving a credit for a colmado client
  currentUserId = null, // ID of the logged-in user (could be admin or colmado)
  isAdminForm = false // True if this form is for general admin loan creation (not ColmadoDashboard)
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    let initialData = { ...INITIAL_FORM_DATA };
    if (creditToEdit) {
      initialData = {
        clientName: creditToEdit.clientName || "",
        cedula: creditToEdit.cedula || "",
        amount: creditToEdit.amount || 1000,
        term: creditToEdit.term || 1,
        startDate: creditToEdit.startDate ? new Date(creditToEdit.startDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        colmadoId: creditToEdit.colmadoId || "",
      };
    } else if (!isAdminForm && !isClientCredit && currentUserId) { 
      initialData.colmadoId = currentUserId;
    }
    setFormData(initialData);
  }, [creditToEdit, isClientCredit, currentUserId, isAdminForm]);

  useEffect(() => {
    const payment = calculateMonthlyPayment(
      parseFloat(formData.amount || 0),
      0, // Assuming 0 interest rate for colmado credits as per previous setup
      parseInt(formData.term || 1, 10)
    );
    setMonthlyPayment(payment);
  }, [formData.amount, formData.term]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSliderChange = useCallback((name, value) => {
    setFormData(prev => ({ ...prev, [name]: value[0] }));
  }, []);
  
  const handleSelectChange = useCallback((name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.clientName.trim()) {
      toast({ title: "Error", description: "Por favor ingrese el nombre del cliente.", variant: "destructive" });
      return;
    }
    if ((isAdminForm || isClientCredit) && !formData.colmadoId && colmados.length > 0) {
        toast({ title: "Error", description: "Por favor seleccione un colmado.", variant: "destructive" });
        return;
    }
    if (parseFloat(formData.amount || 0) <= 0) {
       toast({ title: "Error", description: "El límite de crédito debe ser mayor a cero.", variant: "destructive" });
      return;
    }
    if (parseInt(formData.term || 0, 10) <= 0) {
       toast({ title: "Error", description: "El plazo debe ser mayor a cero.", variant: "destructive" });
      return;
    }
    
    const creditDataForSubmission = {
      ...formData,
      amount: parseFloat(formData.amount),
      term: parseInt(formData.term, 10),
      cedula: formData.cedula ? formData.cedula.trim() : "",
      colmadoId: formData.colmadoId || (!isAdminForm && !isClientCredit ? currentUserId : ""), 
    };
    
    onSubmit(creditDataForSubmission);
  };

  // Determine if the cedula field should be shown based on context
  // In ColmadoDashboard, CreditRequestForm is used, which has its own cedula field.
  // LoanForm is used by admin in LoansPage.
  const showCedulaFieldInLoanForm = isAdminForm || isClientCredit;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-1"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <LoanFormFields
          formData={formData}
          handleChange={handleChange}
          handleSliderChange={handleSliderChange}
          handleSelectChange={handleSelectChange}
          colmados={colmados}
          isClientCredit={isClientCredit}
          isAdminForm={isAdminForm}
          showCedulaField={showCedulaFieldInLoanForm} 
        />
        
        <LoanFormSummary
          formData={formData}
          monthlyPayment={monthlyPayment}
          colmados={colmados}
          isClientCredit={isClientCredit}
          isAdminForm={isAdminForm}
        />
        
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button type="button" variant="outline" onClick={onCancel} className="hover:bg-gray-100">
            Cancelar
          </Button>
          <Button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white">
            {creditToEdit ? "Actualizar Crédito" : (isClientCredit ? "Aprobar Crédito" : "Crear Crédito")}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default LoanForm;
