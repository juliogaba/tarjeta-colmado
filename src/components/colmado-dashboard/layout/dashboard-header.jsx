
import React from 'react';
import { Users, BarChart3, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardHeader = ({ colmadoName, totalClients, totalCreditGiven, onOpenSummaryModal }) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 sm:p-6 rounded-lg shadow-xl mb-6">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-0 text-center sm:text-left">
          {colmadoName || "Dashboard del Colmado"}
        </h1>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center text-sm bg-white/10 px-3 py-1.5 rounded-md">
            <Users className="h-5 w-5 mr-2 text-sky-300" />
            <span>Clientes Activos: <span className="font-semibold text-sky-300">{totalClients ?? 0}</span></span>
          </div>
          <Button 
            onClick={onOpenSummaryModal} 
            variant="outline" 
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 transition-colors duration-150"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Resumen General
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
