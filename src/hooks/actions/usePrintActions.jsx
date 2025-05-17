
import React, { useRef, useCallback } from 'react';
import PrintClientStatement from '@/components/colmado-dashboard/printables/print-client-statement';
import PrintSimpleConsumptionReceipt from '@/components/colmado-dashboard/printables/print-simple-consumption-receipt';

export const usePrintActions = ({
  globalConsumptions,
  globalCredits,
  colmadoInfo,
  dashboardState,
  stateSetters,
}) => {
  const printableComponentRef = useRef();
  const { setPrintableContent } = stateSetters;

  const handlePrintClientStatement = useCallback(() => {
    if (dashboardState.selectedClientCreditDetails) {
      const clientConsumptions = globalConsumptions.filter(c => c.creditId === dashboardState.selectedClientCreditDetails.id);
      setPrintableContent(
        <PrintClientStatement
          credit={dashboardState.selectedClientCreditDetails}
          consumptions={clientConsumptions}
          colmadoName={colmadoInfo?.name || 'N/A'}
        />
      );
      setTimeout(() => {
        if (printableComponentRef.current && typeof printableComponentRef.current.print === 'function') {
          printableComponentRef.current.print();
        } else if (printableComponentRef.current) {
            window.print();
        }
        setPrintableContent(null); 
      }, 100);
    }
  }, [dashboardState.selectedClientCreditDetails, globalConsumptions, colmadoInfo, setPrintableContent]);

  const handlePrintSimpleConsumptionReceipt = useCallback((consumption) => {
    const creditForConsumption = globalCredits.find(c => c.id === consumption.creditId);
    setPrintableContent(
      <PrintSimpleConsumptionReceipt
        consumption={consumption}
        clientName={consumption.clientName}
        cedula={creditForConsumption?.cedula}
        creditLimit={creditForConsumption?.amount}
        remainingBalance={creditForConsumption ? creditForConsumption.amount - (globalConsumptions.filter(c => c.creditId === consumption.creditId).reduce((sum, cons) => sum + cons.amount, 0)) : undefined}
        colmadoName={colmadoInfo?.name || 'N/A'}
      />
    );
     setTimeout(() => {
      if (printableComponentRef.current && typeof printableComponentRef.current.print === 'function') {
          printableComponentRef.current.print();
        } else if (printableComponentRef.current) {
            window.print();
        }
      setPrintableContent(null);
    }, 100);
  }, [globalConsumptions, globalCredits, colmadoInfo, setPrintableContent]);

  return {
    printableComponentRef,
    handlePrintClientStatement,
    handlePrintSimpleConsumptionReceipt,
  };
};
