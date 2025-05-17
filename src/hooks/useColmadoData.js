
import { useMemo, useEffect, useState } from 'react';

export const useColmadoData = (colmadoId, globalCredits, globalConsumptions, allColmadosData) => {
  const [loadingData, setLoadingData] = useState(true);
  const [errorData, setErrorData] = useState(null);
  
  const colmadoInfo = useMemo(() => {
    if (!allColmadosData || !colmadoId) return null;
    const found = allColmadosData.find(c => c.id === colmadoId);
    return found;
  }, [allColmadosData, colmadoId]);

  const clientsCredits = useMemo(() => {
    if (!globalCredits || !colmadoId) return [];
    return globalCredits.filter(credit => credit.colmadoId === colmadoId && credit.status === "Activo");
  }, [globalCredits, colmadoId]);

  const colmadoConsumptions = useMemo(() => {
    if (!globalConsumptions || !colmadoId) return [];
    return globalConsumptions
      .filter(consumption => consumption.colmadoId === colmadoId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);
  }, [globalConsumptions, colmadoId]);

  const stats = useMemo(() => {
    if (!clientsCredits || !colmadoConsumptions || !globalCredits || !colmadoId) {
        return { 
            totalClients: 0, 
            totalConsumedToday: 0, 
            activeCredits: 0,
            totalCreditGiven: 0,
            totalConsumption: 0,
        };
    }

    const activeColmadoCredits = globalCredits.filter(
      credit => credit.colmadoId === colmadoId && credit.status === "Activo"
    );
    
    const totalClients = new Set(activeColmadoCredits.map(c => c.cedula || c.clientId)).size;
    
    const totalConsumedToday = colmadoConsumptions
      .filter(c => new Date(c.paymentDate).toDateString() === new Date().toDateString())
      .reduce((sum, c) => sum + c.amount, 0);

    const totalCreditGivenByColmado = activeColmadoCredits.reduce((sum, credit) => sum + credit.amount, 0);
    
    const totalConsumptionByColmado = globalConsumptions
        .filter(consumption => consumption.colmadoId === colmadoId)
        .reduce((sum, consumption) => sum + consumption.amount, 0);
    
    return {
      totalClients: totalClients,
      totalConsumedToday: totalConsumedToday,
      activeCredits: activeColmadoCredits.length,
      totalCreditGiven: totalCreditGivenByColmado,
      totalConsumption: totalConsumptionByColmado,
    };
  }, [clientsCredits, colmadoConsumptions, globalCredits, colmadoId]);

  useEffect(() => {
    setLoadingData(true);
    setErrorData(null);
    if (colmadoId && Array.isArray(allColmadosData)) {
      const foundColmado = allColmadosData.find(c => c.id === colmadoId);
      if (!foundColmado) {
        setErrorData("Colmado no encontrado.");
      }
    } else if (!colmadoId) {
        setErrorData("ID de Colmado no proporcionado.");
    } else if (!Array.isArray(allColmadosData)) {
        setErrorData("Lista de colmados no disponible.");
    }
    setLoadingData(false);
  }, [colmadoId, allColmadosData]);


  return { colmadoInfo, clientsCredits, colmadoConsumptions, stats, loadingData, errorData };
};
