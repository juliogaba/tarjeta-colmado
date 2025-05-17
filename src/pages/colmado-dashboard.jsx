
import React, { useMemo } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { useColmadoData } from '@/hooks/useColmadoData';
import { useColmadoDashboardState } from '@/hooks/useColmadoDashboardState';
import { useColmadoActions } from '@/hooks/useColmadoActions';
import ColmadoDashboardLayout from '@/components/colmado-dashboard/layout/colmado-dashboard-layout';
import ColmadoDashboardModals from '@/components/colmado-dashboard/layout/colmado-dashboard-modals';
import PrintableComponentWrapper from '@/components/colmado-dashboard/printables/printable-component-wrapper';

const ColmadoDashboard = ({ 
  currentUser, 
  globalCredits, 
  globalConsumptions, 
  allColmados,
  updateCredits,
  addCredit,
  addConsumption
}) => {
  const { colmadoId: colmadoIdFromParamsUrl } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const colmadoId = currentUser?.colmadoId || colmadoIdFromParamsUrl;

  console.log("ColmadoDashboard - colmadoId determined:", colmadoId);
  console.log("ColmadoDashboard - currentUser.colmadoId:", currentUser?.colmadoId);
  console.log("ColmadoDashboard - allColmados prop:", allColmados);

  const { 
    colmadoInfo, 
    clientsCredits, 
    colmadoConsumptions, 
    stats, 
    loadingData, 
    errorData 
  } = useColmadoData(colmadoId, globalCredits, globalConsumptions, allColmados);

  const { dashboardState, modalStates, stateSetters } = useColmadoDashboardState(false);

  const actions = useColmadoActions({
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
    navigate
  });

  console.log("ColmadoDashboard modalStates:", modalStates);
  console.log("ColmadoDashboard actions:", actions);
  console.log("ColmadoDashboard dashboardState:", dashboardState);
  console.log("ColmadoDashboard colmadoInfo from useColmadoData:", colmadoInfo);
  console.log("ColmadoDashboard errorData from useColmadoData:", errorData);


  if (loadingData) {
    return <div className="flex items-center justify-center h-screen text-xl font-semibold text-primary">Cargando datos del colmado...</div>;
  }

  if (errorData || !colmadoInfo) {
    return <div className="flex items-center justify-center h-screen text-xl font-semibold text-red-500">Error al cargar datos: {errorData || "Colmado no encontrado."}</div>;
  }
  
  if (currentUser?.role === "colmado" && currentUser?.colmadoId !== colmadoIdFromParamsUrl && colmadoIdFromParamsUrl) {
     console.warn(`Colmado user accessing dashboard for a different colmadoId. CurrentUser.colmadoId: ${currentUser?.colmadoId}, params.colmadoId: ${colmadoIdFromParamsUrl}. Redirecting.`);
    return <Navigate to={`/colmado-dashboard/${currentUser.colmadoId}`} replace />;
  }

  return (
    <>
      <ColmadoDashboardLayout
        colmadoInfo={colmadoInfo}
        stats={stats}
        clientsCredits={clientsCredits}
        colmadoConsumptions={colmadoConsumptions}
        actions={actions}
        modalStates={modalStates}
      />
      <ColmadoDashboardModals
        modalStates={modalStates}
        onCreditRequestSubmit={actions.handleCreditRequestSubmit}
        onClientIdSubmit={actions.handleClientIdSubmit}
        onConsumptionSubmit={actions.handleConsumptionSubmit}
        onShowQrCode={actions.handleShowQrCode}
        onPrintStatement={actions.handlePrintClientStatement}
        onMakePayment={() => { /* Lógica para realizar pago desde detalles del cliente */}}
        onQrCodeScanned={actions.handleQrCodeScanned}
        colmadoInfo={colmadoInfo}
        selectedClientCreditForConsumption={dashboardState.selectedClientCreditForConsumption}
        selectedClientCreditDetails={dashboardState.selectedClientCreditDetails}
        qrCodeValue={dashboardState.qrCodeValue}
      />
      {dashboardState.printableContent && (
        <PrintableComponentWrapper ref={actions.printableComponentRef}>
          {dashboardState.printableContent}
        </PrintableComponentWrapper>
      )}
    </>
  );
};

export default ColmadoDashboard;
