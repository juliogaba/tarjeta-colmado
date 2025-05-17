
import React, { useState, useMemo } from 'react';
import DashboardHeader from '@/components/colmado-dashboard/layout/dashboard-header';
import DashboardStats from '@/components/colmado-dashboard/dashboard-stats';
import ClientList from '@/components/colmado-dashboard/client-list';
import RecentConsumptions from '@/components/colmado-dashboard/recent-consumptions';
import ActionCards from '@/components/colmado-dashboard/action-cards';
import ClientSearchBar from '@/components/colmado-dashboard/client-search-bar';

const ColmadoDashboardLayout = ({
  colmadoInfo,
  stats,
  clientsCredits,
  colmadoConsumptions,
  actions,
  modalStates,
}) => {
  
  const [clientSearchTerm, setClientSearchTerm] = useState('');

  const filteredClientsCredits = useMemo(() => {
    if (!clientsCredits) return [];
    if (!clientSearchTerm) return clientsCredits;
    
    const lowercasedFilter = clientSearchTerm.toLowerCase();
    return clientsCredits.filter(clientCredit => {
      const nameMatch = clientCredit.clientName?.toLowerCase().includes(lowercasedFilter);
      const cedulaMatch = clientCredit.cedula?.toLowerCase().includes(lowercasedFilter);
      const clientIdMatch = clientCredit.clientId?.toLowerCase().includes(lowercasedFilter);
      return nameMatch || cedulaMatch || clientIdMatch;
    });
  }, [clientsCredits, clientSearchTerm]);


  const handleOpenCreditRequest = () => {
    if (modalStates && modalStates.creditRequestModal && typeof modalStates.creditRequestModal.open === 'function') {
      modalStates.creditRequestModal.open();
    } else {
      console.error("creditRequestModal or its open function is not available");
    }
  };

  const handleOpenRegisterConsumption = () => {
    if (actions && typeof actions.handleInitiateConsumptionByIdProcess === 'function') {
      actions.handleInitiateConsumptionByIdProcess();
    } else {
      console.error("handleInitiateConsumptionByIdProcess action is not available");
    }
  };
  
  const handleOpenSummaryModal = () => {
    alert(`Resumen General:\nClientes Activos: ${stats?.totalClients || 0}\nCrédito Total Otorgado: ${stats?.totalCreditGiven?.toLocaleString() || '0.00'}`);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-gray-100 min-h-screen">
      <DashboardHeader 
        colmadoName={colmadoInfo?.name} 
        totalClients={stats?.totalClients}
        totalCreditGiven={stats?.totalCreditGiven}
        onOpenSummaryModal={handleOpenSummaryModal}
      />

      <div className="mb-6">
        <ActionCards 
          onOpenCreditRequest={handleOpenCreditRequest}
          onOpenRegisterConsumption={handleOpenRegisterConsumption}
        />
      </div>
      
      <DashboardStats stats={stats} />

      <div className="mb-6">
        <ClientSearchBar searchTerm={clientSearchTerm} onSearchTermChange={setClientSearchTerm} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ClientList 
            clientsCredits={filteredClientsCredits} 
            onViewDetails={actions.handleViewClientDetails}
            onRegisterConsumption={handleOpenRegisterConsumption} 
            onShowQrCode={actions.handleShowQrCode}
          />
        </div>
        <div>
          <RecentConsumptions consumptions={colmadoConsumptions} />
        </div>
      </div>
    </div>
  );
};

export default ColmadoDashboardLayout;
