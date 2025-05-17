
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

export const useCreditActions = ({
  toast,
  colmadoId,
  colmadoInfo,
  addCredit,
  creditRequestModal,
}) => {
  const handleCreditRequestSubmit = useCallback((formData) => {
    const newCredit = {
      id: `credit-${uuidv4()}`,
      colmadoId: colmadoId,
      colmadoName: colmadoInfo?.name || "N/A",
      clientName: formData.clientName,
      cedula: formData.cedula,
      amount: parseFloat(formData.amount),
      remainingAmount: parseFloat(formData.amount),
      interestRate: 0.15,
      term: parseInt(formData.term),
      startDate: format(new Date(), 'yyyy-MM-dd'),
      nextPaymentDate: format(new Date(new Date().setMonth(new Date().getMonth() + parseInt(formData.term))), 'yyyy-MM-dd'),
      nextPaymentAmount: 0,
      status: "Pendiente",
      type: "colmado",
      createdAt: new Date().toISOString(),
    };
    addCredit(newCredit);
    toast({ title: "Solicitud de Crédito Enviada", description: `La solicitud para ${formData.clientName} ha sido registrada.` });
    if (creditRequestModal && typeof creditRequestModal.close === 'function') {
        creditRequestModal.close();
    } else {
        console.error("creditRequestModal.close is not a function or creditRequestModal is undefined");
    }
  }, [addCredit, toast, colmadoId, colmadoInfo, creditRequestModal]);

  return {
    handleCreditRequestSubmit,
  };
};
