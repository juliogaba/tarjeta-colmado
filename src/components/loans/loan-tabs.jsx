
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";
import LoanListControls from "@/components/loans/loan-list-controls";
import LoanList from "@/components/loans/loan-list";

const LoanTabs = ({ 
  credits, 
  pendingApprovalCredits, 
  filteredCredits, 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus, 
  onViewDetails, 
  onApproveCredit 
}) => {

  const pendingApprovalEmptyMessage = {
    icon: <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-400"/>,
    title: "¡Excelente!",
    text: "No hay créditos pendientes de aprobación en este momento.",
  };

  return (
    <Tabs defaultValue="todosLosCreditos" className="w-full">
      <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 mb-6">
        <TabsTrigger value="todosLosCreditos">Todos los Créditos</TabsTrigger>
        <TabsTrigger value="pendientesAprobacion" className="relative">
          Pendientes Aprobación
          {pendingApprovalCredits.length > 0 && (
            <span className="absolute top-0 right-1 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {pendingApprovalCredits.length}
            </span>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="todosLosCreditos">
        <LoanListControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <LoanList 
          credits={filteredCredits} 
          onViewDetails={onViewDetails} 
          onApproveCredit={onApproveCredit}
        />
      </TabsContent>

      <TabsContent value="pendientesAprobacion">
         <h2 className="text-xl font-semibold mb-4 text-gray-700">Créditos Pendientes de Aprobación</h2>
        <LoanList 
          credits={pendingApprovalCredits} 
          onViewDetails={onViewDetails} 
          onApproveCredit={onApproveCredit}
          emptyListMessage={pendingApprovalEmptyMessage}
        />
      </TabsContent>
    </Tabs>
  );
};

export default LoanTabs;
