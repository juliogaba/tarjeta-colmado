
import { useState } from 'react';
import { useModalState } from '@/hooks/useModalState';

export const useColmadoDashboardState = (enableQrScanner = false) => {
  const creditRequestModal = useModalState();
  const registerConsumptionModal = useModalState();
  const clientDetailsModal = useModalState();
  const enterClientIdModal = useModalState();
  const qrCodeModal = useModalState(); 
  const qrCodeScannerModal = useModalState(enableQrScanner);

  const [selectedClientCreditForConsumption, setSelectedClientCreditForConsumption] = useState(null);
  const [selectedClientCreditDetails, setSelectedClientCreditDetails] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [printableContent, setPrintableContent] = useState(null);
  const [clientIdInput, setClientIdInput] = useState('');

  return {
    dashboardState: {
      selectedClientCreditForConsumption,
      selectedClientCreditDetails,
      qrCodeValue,
      printableContent,
      clientIdInput,
    },
    modalStates: {
      creditRequestModal,
      registerConsumptionModal,
      clientDetailsModal,
      enterClientIdModal,
      qrCodeModal, 
      ...(enableQrScanner && { qrCodeScannerModal }), 
    },
    stateSetters: {
      setSelectedClientCreditForConsumption,
      setSelectedClientCreditDetails,
      setQrCodeValue,
      setPrintableContent,
      setClientIdInput,
    }
  };
};
