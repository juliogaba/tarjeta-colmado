
import { useCallback } from 'react';

export const usePaymentActions = ({
  toast,
  colmadoId,
  colmadoInfo,
  addPayment, // La función global de useAppData
  paymentModal, // El estado del modal de useColmadoDashboardState
  // globalCredits, // Para buscar/validar el crédito si es necesario
  // clientsCredits, // Para buscar clientes si el modal lo necesita
  // getCalculatedCreditDetails, // Si el modal necesita mostrar detalles calculados
}) => {

  const handleOpenPaymentModal = useCallback(() => {
    if (paymentModal && typeof paymentModal.open === 'function') {
      paymentModal.open();
    } else {
      console.error("PaymentModal or its open function is not available");
    }
  }, [paymentModal]);

  const handlePaymentSubmit = useCallback((paymentData) => {
    // paymentData debe incluir: creditId, clientId, amount, description, paymentDate
    const paymentPayload = {
      ...paymentData,
      colmadoId: colmadoId,
      colmadoName: colmadoInfo?.name || "N/A",
    };

    const success = addPayment(paymentPayload); // addPayment ahora está en useAppData

    if (success) {
      toast({
        title: "Pago Registrado",
        description: `El pago de ${paymentData.amount.toLocaleString()} para el cliente ha sido registrado.`,
      });
      if (paymentModal && typeof paymentModal.close === 'function') {
        paymentModal.close();
      }
    } else {
      toast({
        title: "Error al Registrar Pago",
        description: "No se pudo procesar el pago. Verifique los datos del crédito o el monto.",
        variant: "destructive",
      });
    }
  }, [addPayment, toast, colmadoId, colmadoInfo, paymentModal]);
  
  const handleOpenPaymentModalWithClient = useCallback((clientCredit) => {
    // Esta función podría pre-seleccionar el cliente en el modal de pago si es necesario
    // Por ahora, solo abre el modal general. La búsqueda se hace dentro del modal.
    if (paymentModal && typeof paymentModal.open === 'function') {
      // Podrías pasar `clientCredit` al estado del modal si PaymentModal lo maneja
      paymentModal.open();
    } else {
      console.error("PaymentModal or its open function is not available for specific client.");
    }
  }, [paymentModal]);

  return {
    handleOpenPaymentModal,
    handlePaymentSubmit,
    handleOpenPaymentModalWithClient, // Para abrir desde detalles del cliente
  };
};
