
import { useCallback } from 'react';

export const useQrCodeActions = ({
  toast,
  colmadoId,
  globalCredits,
  modalStates,
  stateSetters,
}) => {
  const { qrCodeDisplayModal, qrCodeScannerModal } = modalStates;
  const { setQrCodeValue, setSelectedClientCreditDetails, setSelectedClientCreditForConsumption } = stateSetters;
  const { registerConsumptionModal } = modalStates;


  const handleShowQrCode = useCallback((credit) => {
    if (credit && credit.id) {
      const qrData = JSON.stringify({ type: 'creditId', id: credit.id, clientName: credit.clientName, colmadoId: credit.colmadoId });
      setQrCodeValue(qrData);
      setSelectedClientCreditDetails(credit);
      if (qrCodeDisplayModal && typeof qrCodeDisplayModal.open === 'function') qrCodeDisplayModal.open();
    } else {
      toast({ title: "Error", description: "No se pudo generar el código QR. Datos del crédito incompletos.", variant: "destructive" });
    }
  }, [setQrCodeValue, setSelectedClientCreditDetails, qrCodeDisplayModal, toast]);

  const handleOpenQrScanner = useCallback(() => {
    if (qrCodeScannerModal && typeof qrCodeScannerModal.open === 'function') {
      qrCodeScannerModal.open();
    } else {
      toast({ title: "Función no disponible", description: "El escáner QR no está habilitado.", variant: "destructive" });
    }
  }, [qrCodeScannerModal, toast]);

  const handleQrCodeScanned = useCallback((decodedText) => {
    try {
      const scannedData = JSON.parse(decodedText);
      if (scannedData.type === 'creditId' && scannedData.id) {
        const foundCredit = globalCredits.find(c => c.id === scannedData.id && c.colmadoId === colmadoId);
        if (foundCredit) {
          if (foundCredit.status !== "Activo") {
            toast({ title: "Crédito No Activo", description: `El crédito para ${foundCredit.clientName} no está activo.`, variant: "destructive" });
            if (qrCodeScannerModal && typeof qrCodeScannerModal.close === 'function') qrCodeScannerModal.close();
            return;
          }
          setSelectedClientCreditForConsumption(foundCredit);
          if (qrCodeScannerModal && typeof qrCodeScannerModal.close === 'function') qrCodeScannerModal.close();
          if (registerConsumptionModal && typeof registerConsumptionModal.open === 'function') registerConsumptionModal.open();
        } else {
          toast({ title: "Crédito no válido", description: "El código QR no corresponde a un crédito válido para este colmado.", variant: "destructive" });
        }
      } else {
        toast({ title: "Código QR no reconocido", description: "El formato del código QR no es compatible.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error al procesar QR", description: "No se pudo leer la información del código QR.", variant: "destructive" });
      console.error("Error processing QR code:", error);
    }
  }, [globalCredits, colmadoId, toast, setSelectedClientCreditForConsumption, registerConsumptionModal, qrCodeScannerModal]);

  return {
    handleShowQrCode,
    handleOpenQrScanner,
    handleQrCodeScanned,
  };
};
