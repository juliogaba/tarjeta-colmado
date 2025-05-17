
import React from 'react';
import CreditRequestModal from '@/components/colmado-dashboard/modals/credit-request-modal';
import EnterClientIdModal from '@/components/colmado-dashboard/modals/enter-client-id-modal';
import RegisterConsumptionModal from '@/components/colmado-dashboard/modals/register-consumption-modal';
import ClientDetailsModal from '@/components/colmado-dashboard/modals/client-details-modal';
import QrCodeModal from '@/components/colmado-dashboard/modals/qr-code-modal';
import QrScannerModal from '@/components/colmado-dashboard/modals/qr-scanner-modal';

const ColmadoDashboardModals = ({
  modalStates,
  onCreditRequestSubmit,
  onClientIdSubmit,
  onConsumptionSubmit,
  onShowQrCode,
  onPrintStatement,
  onMakePayment,
  onQrCodeScanned,
  colmadoInfo,
  selectedClientCreditForConsumption,
  selectedClientCreditDetails,
  qrCodeValue
}) => {
  const { 
    creditRequestModal, 
    enterClientIdModal, 
    registerConsumptionModal, 
    clientDetailsModal, 
    qrCodeModal,
    qrScannerModal, 
  } = modalStates || {};

  if (!creditRequestModal || !enterClientIdModal || !registerConsumptionModal || !clientDetailsModal || !qrCodeModal) {
    console.warn("ColmadoDashboardModals: Uno o más modales esenciales no están definidos en modalStates.", modalStates);
    return null; 
  }
  
  return (
    <>
      <CreditRequestModal 
        isOpen={creditRequestModal.isOpen}
        onOpenChange={creditRequestModal.handleOpenChange}
        onSubmit={onCreditRequestSubmit}
        colmadoName={colmadoInfo?.name}
      />
      <EnterClientIdModal
        isOpen={enterClientIdModal.isOpen}
        onOpenChange={enterClientIdModal.handleOpenChange}
        onSubmit={onClientIdSubmit}
      />
      <RegisterConsumptionModal
        isOpen={registerConsumptionModal.isOpen}
        onOpenChange={registerConsumptionModal.handleOpenChange}
        clientCredit={selectedClientCreditForConsumption}
        colmadoName={colmadoInfo?.name}
        onSubmit={onConsumptionSubmit}
      />
      <ClientDetailsModal
        isOpen={clientDetailsModal.isOpen}
        onOpenChange={clientDetailsModal.handleOpenChange}
        clientCredit={selectedClientCreditDetails}
        onShowQrCode={onShowQrCode}
        onPrintStatement={onPrintStatement}
        onMakePayment={onMakePayment}
      />
      <QrCodeModal 
        isOpen={qrCodeModal.isOpen}
        onOpenChange={qrCodeModal.handleOpenChange}
        value={qrCodeValue?.id || ''}
        clientName={qrCodeValue?.clientName || ''}
      />
      {qrScannerModal && (
        <QrScannerModal
          isOpen={qrScannerModal.isOpen}
          onOpenChange={qrScannerModal.handleOpenChange}
          onScanSuccess={onQrCodeScanned}
          onScanError={(error) => console.warn("QR Scan Error:", error)}
        />
      )}
    </>
  );
};

export default ColmadoDashboardModals;
