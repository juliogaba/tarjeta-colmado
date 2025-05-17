
import React from 'react';
import DashboardHeader from '@/components/colmado-dashboard/layout/dashboard-header';
import ClientList from '@/components/colmado-dashboard/client-list';
import RecentConsumptions from '@/components/colmado-dashboard/recent-consumptions';
import ActionCards from '@/components/colmado-dashboard/action-cards';

const ColmadoMainContent = ({
  colmadoInfo,
  stats,
  clientsCredits,
  colmadoConsumptions,
  actions,
  modalStates,
}) => {
  if (!colmadoInfo) {
    return <div className="p-8 text-center text-red-500">Información del colmado no disponible.</div>;
  }

  console.log("ColmadoMainContent received modalStates:", modalStates);
  console.log("ColmadoMainContent received actions:", actions);

  const handleOpenCreditRequest = () => {
    console.log("ColmadoMainContent: handleOpenCreditRequest called. modalStates.creditRequestModal:", modalStates?.creditRequestModal);
    if (modalStates?.creditRequestModal && typeof modalStates.creditRequestModal.open === 'function') {
      modalStates.creditRequestModal.open();
    } else {
      console.error("ColmadoMainContent: creditRequestModal.open is not available or not a function. ModalStates:", modalStates);
    }
  };

  const handleOpenRegisterConsumption = () => {
    console.log("ColmadoMainContent: handleOpenRegisterConsumption called. actions.handleInitiateConsumptionByIdProcess:", actions?.handleInitiateConsumptionByIdProcess);
    if (actions?.handleInitiateConsumptionByIdProcess && typeof actions.handleInitiateConsumptionByIdProcess === 'function') {
      actions.handleInitiateConsumptionByIdProcess();
    } else {
      console.error("ColmadoMainContent: actions.handleInitiateConsumptionByIdProcess is not available or not a function. Actions:", actions);
    }
  };
  
  return (
    <>
      <DashboardHeader 
        colmadoName={colmadoInfo.name} 
      />
      
      <ActionCards 
        onOpenCreditRequest={handleOpenCreditRequest}
        onOpenRegisterConsumption={handleOpenRegisterConsumption}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <ClientList 
            clientsCredits={clientsCredits} 
            onViewDetails={actions.handleViewClientDetails}
            onRegisterConsumption={(creditId, clientName) => {
                if (actions?.handleOpenRegisterConsumptionWithClient && typeof actions.handleOpenRegisterConsumptionWithClient === 'function') {
                    actions.handleOpenRegisterConsumptionWithClient(clientsCredits.find(c => c.id === creditId));
                } else {
                    console.error("ColmadoMainContent: ClientList onRegisterConsumption - actions.handleOpenRegisterConsumptionWithClient is not a function. Actions:", actions);
                }
            }}
            onShowQrCode={actions.handleShowQrCode}
          />
        </div>
        <div>
          <RecentConsumptions 
            consumptions={colmadoConsumptions} 
            onPrintSimpleReceipt={actions.handlePrintSimpleConsumptionReceipt}
          />
        </div>
      </div>
    </>
  );
};

export default ColmadoMainContent;
