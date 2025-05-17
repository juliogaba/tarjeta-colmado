
import React from 'react';
import { useParams } from 'react-router-dom';
import LoanDetails from '@/components/loans/loan-details';
import AppLoading from '@/components/layout/app-loading';

const LoanDetailsPage = ({ appData }) => {
  const { creditId } = useParams();
  const { credits, consumptions, loading, currentUser } = appData;

  if (loading) {
    return <AppLoading />;
  }

  const credit = credits.find(c => c.id === creditId);

  if (!credit) {
    return <div className="container mx-auto p-4 text-center">Crédito no encontrado.</div>;
  }
  
  if (currentUser.role === 'cliente' && credit.client_id !== currentUser.id && credit.client_id !== currentUser.auth_user_id) {
     return <div className="container mx-auto p-4 text-center">No tienes permiso para ver este crédito.</div>;
  }


  const relatedConsumptions = consumptions.filter(con => con.credit_id === creditId);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Detalles del Crédito</h1>
      <LoanDetails
        credit={credit}
        consumptions={relatedConsumptions}
        currentUser={currentUser}
        onMakePayment={() => {}}
        onAddConsumption={() => {}}
        showAdminActions={currentUser.role === 'admin'}
        showColmadoActions={currentUser.role === 'colmado' && currentUser.colmadoId === credit.colmado_id}
      />
    </div>
  );
};

export default LoanDetailsPage;
