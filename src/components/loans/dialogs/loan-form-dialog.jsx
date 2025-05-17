
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import LoanForm from "@/components/loans/loan-form"; // LoanForm general, no el de colmado

const LoanFormDialog = ({ 
  isOpen, 
  onOpenChange, 
  creditToEdit, // Renombrado de selectedLoan a creditToEdit para consistencia
  onSubmit, 
  onCancel,
  colmados = [], // Para el selector de colmado en el admin form
  currentUserId = null // Para saber si es admin o colmado
}) => {
  const isEditing = !!creditToEdit;
  const dialogTitle = isEditing ? "Editar Crédito" : "Registrar Nuevo Crédito";
  const dialogDescription = isEditing 
    ? `Modifica los detalles del crédito para ${creditToEdit.clientName}.` 
    : "Completa el formulario para registrar un nuevo crédito en el sistema.";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] bg-white rounded-lg shadow-xl">
        <DialogHeader className="p-6 border-b border-gray-200">
          <DialogTitle className="text-xl font-semibold text-gray-800">{dialogTitle}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <LoanForm
            onSubmit={(data) => {
              onSubmit(data);
              // onOpenChange(false); // Cerrar el modal se maneja externamente si es necesario
            }}
            creditToEdit={creditToEdit}
            onCancel={() => {
              onCancel();
              // onOpenChange(false); // Asegurar que el modal se cierre al cancelar
            }}
            colmados={colmados}
            currentUserId={currentUserId} // Pasar el ID del usuario actual
            isAdminForm={true} // Indicar que este es el formulario de administrador
            isClientCredit={false} // No es para aprobar crédito de colmado, sino creación general
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoanFormDialog;
