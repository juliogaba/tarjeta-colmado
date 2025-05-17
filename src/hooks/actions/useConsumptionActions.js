
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

export const useConsumptionActions = ({
  toast,
  colmadoId,
  colmadoInfo,
  globalCredits,
  addConsumption,
  updateCredits,
  modalStates,
  dashboardState,
  stateSetters,
  clientsCredits,
}) => {
  const { registerConsumptionModal, clientDetailsModal, enterClientIdModal } = modalStates;
  const { setSelectedClientCreditForConsumption, setClientIdInput } = stateSetters;

  const handleOpenRegisterConsumptionWithClient = useCallback((clientCredit) => {
    setSelectedClientCreditForConsumption(clientCredit);
    if (clientDetailsModal && typeof clientDetailsModal.close === 'function') clientDetailsModal.close();
    if (registerConsumptionModal && typeof registerConsumptionModal.open === 'function') registerConsumptionModal.open();
  }, [setSelectedClientCreditForConsumption, registerConsumptionModal, clientDetailsModal]);

  const handleConsumptionSubmit = useCallback((consumptionData) => {
    if (!dashboardState.selectedClientCreditForConsumption) {
      toast({ title: "Error", description: "No se ha seleccionado un crédito para el consumo.", variant: "destructive" });
      return;
    }
    
    const creditToUpdate = globalCredits.find(c => c.id === dashboardState.selectedClientCreditForConsumption.id);
    if (!creditToUpdate) {
        toast({ title: "Error", description: "Crédito no encontrado.", variant: "destructive" });
        return;
    }

    const consumptionAmount = parseFloat(consumptionData.amount);
    if (consumptionAmount > creditToUpdate.remainingAmount) {
        toast({ title: "Monto Excede Límite", description: "El monto del consumo excede el crédito disponible.", variant: "destructive" });
        return;
    }

    const newConsumption = {
      id: `cons-${uuidv4()}`,
      creditId: creditToUpdate.id,
      clientName: creditToUpdate.clientName,
      colmadoId: colmadoId,
      colmadoName: colmadoInfo?.name || "N/A",
      amount: consumptionAmount,
      paymentMethod: "tarjeta_colmado",
      paymentDate: format(new Date(), 'yyyy-MM-dd'),
      description: consumptionData.description || "Consumo general",
      status: "Realizado",
      createdAt: new Date().toISOString(),
    };
    addConsumption(newConsumption);

    const updatedRemainingAmount = creditToUpdate.remainingAmount - consumptionAmount;
    const updatedCreditsList = globalCredits.map(c => 
      c.id === creditToUpdate.id ? { ...c, remainingAmount: updatedRemainingAmount } : c
    );
    updateCredits(updatedCreditsList);

    toast({ title: "Consumo Registrado", description: `Consumo de ${consumptionAmount} para ${creditToUpdate.clientName} registrado.` });
    if (registerConsumptionModal && typeof registerConsumptionModal.close === 'function') registerConsumptionModal.close();
    setSelectedClientCreditForConsumption(null);
  }, [
      addConsumption, 
      updateCredits, 
      toast, 
      dashboardState.selectedClientCreditForConsumption, 
      globalCredits,
      colmadoId, 
      colmadoInfo, 
      registerConsumptionModal,
      setSelectedClientCreditForConsumption
    ]);

  const handleInitiateConsumptionByIdProcess = useCallback(() => {
    setClientIdInput('');
    if (enterClientIdModal && typeof enterClientIdModal.open === 'function') enterClientIdModal.open();
  }, [setClientIdInput, enterClientIdModal]);
  
  const handleClientIdSubmit = useCallback((idOrCedula) => {
    const foundCredit = clientsCredits.find(c => c.id === idOrCedula || c.cedula === idOrCedula);
    if (foundCredit) {
      if (foundCredit.status !== "Activo") {
        toast({ title: "Crédito No Activo", description: `El crédito para ${foundCredit.clientName} no está activo.`, variant: "destructive" });
        return;
      }
      setSelectedClientCreditForConsumption(foundCredit);
      if (enterClientIdModal && typeof enterClientIdModal.close === 'function') enterClientIdModal.close();
      if (registerConsumptionModal && typeof registerConsumptionModal.open === 'function') registerConsumptionModal.open();
    } else {
      toast({ title: "Cliente No Encontrado", description: "No se encontró un cliente con ese ID o Cédula en este colmado.", variant: "destructive" });
    }
    setClientIdInput('');
  }, [clientsCredits, toast, setSelectedClientCreditForConsumption, registerConsumptionModal, enterClientIdModal, setClientIdInput]);

  return {
    handleOpenRegisterConsumptionWithClient,
    handleConsumptionSubmit,
    handleInitiateConsumptionByIdProcess,
    handleClientIdSubmit,
  };
};
