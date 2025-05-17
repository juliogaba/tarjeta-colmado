
import { useCallback } from 'react';
import { useCreditActions } from '@/hooks/actions/useCreditActions';
import { useConsumptionActions } from '@/hooks/actions/useConsumptionActions';
import { usePrintActions } from '@/hooks/actions/usePrintActions';
import { useQrCodeActions } from '@/hooks/actions/useQrCodeActions';

export const useColmadoActions = ({
  toast,
  colmadoId,
  colmadoInfo,
  globalCredits,
  globalConsumptions,
  clientsCredits, 
  addCredit,
  addConsumption,
  updateCredits,
  modalStates,
  dashboardState,
  stateSetters,
  navigate, 
}) => {
  const { 
    clientDetailsModal, 
  } = modalStates || {}; 

  const { 
    setSelectedClientCreditDetails,
  } = stateSetters || {};

  const creditActions = useCreditActions({
    toast,
    colmadoId,
    colmadoInfo,
    addCredit,
    creditRequestModal: modalStates?.creditRequestModal,
  });

  const consumptionActions = useConsumptionActions({
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
  });

  const printActions = usePrintActions({
    globalConsumptions,
    globalCredits,
    colmadoInfo,
    dashboardState,
    stateSetters,
  });

  const qrCodeActions = useQrCodeActions({
    toast,
    colmadoId,
    globalCredits,
    modalStates,
    stateSetters,
  });
  
  const handleViewClientDetails = useCallback((credit) => {
    if (setSelectedClientCreditDetails && typeof setSelectedClientCreditDetails === 'function') {
      setSelectedClientCreditDetails(credit);
    } else {
      console.error("useColmadoActions: setSelectedClientCreditDetails is not a function or undefined");
    }

    if (clientDetailsModal && typeof clientDetailsModal.open === 'function') {
        clientDetailsModal.open();
    } else {
        console.error("useColmadoActions: clientDetailsModal.open is not a function or clientDetailsModal is undefined. ModalStates:", modalStates);
    }
  }, [setSelectedClientCreditDetails, clientDetailsModal, modalStates]);

  return {
    printableComponentRef: printActions.printableComponentRef,
    ...creditActions,
    ...consumptionActions,
    ...printActions,
    ...qrCodeActions,
    handleViewClientDetails,
  };
};
