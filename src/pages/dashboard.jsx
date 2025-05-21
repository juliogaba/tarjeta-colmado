
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import AdminStatsGrid from "@/components/dashboard/admin/admin-stats-grid";
import AdminCreditSummary from "@/components/dashboard/admin/admin-credit-summary";
import AdminRecentActivityLists from "@/components/dashboard/admin/admin-recent-activity-lists";
import AdminUpcomingPayments from "@/components/dashboard/admin/admin-upcoming-payments";

const Dashboard = ({ credits: initialCredits, consumptions: initialConsumptions }) => {
  const { toast } = useToast();
  const [credits, setCredits] = useState([]);
  const [consumptions, setConsumptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [colmadosCount, setColmadosCount] = useState(0);

  useEffect(() => {
    setCredits(initialCredits || []);
    setConsumptions(initialConsumptions || []);
    
    const storedColmados = localStorage.getItem("colmados");
    if (storedColmados) {
      setColmadosCount(JSON.parse(storedColmados).length);
    }
    
    setLoading(false);
    
    if (initialCredits !== undefined && initialConsumptions !== undefined) {
        toast({
          title: "¡Bienvenido al Panel de Administrador!",
          description: "Supervisa toda la actividad de Tarjeta Colmado.",
        });
    }
  }, [toast, initialCredits, initialConsumptions]);

  const totalDebt = credits.reduce((sum, credit) => sum + (credit.amount - credit.remainingAmount), 0);
  const totalCreditLimit = credits.reduce((sum, credit) => sum + credit.amount, 0);
  const availableCreditGlobal = totalCreditLimit - totalDebt; 
  const totalConsumedOverall = consumptions.reduce((sum, consumption) => sum + consumption.amount, 0);
  
  const currentDate = new Date();
  const upcomingPaymentsList = credits
    .filter(credit => {
  const date = new Date(credit.nextPaymentDate);
  return credit.nextPaymentDate && !isNaN(date) && date > currentDate && credit.status === "Activo";
})

    .sort((a, b) => {
  const dateA = new Date(a.nextPaymentDate);
  const dateB = new Date(b.nextPaymentDate);
  return (!isNaN(dateA) && !isNaN(dateB)) ? dateA - dateB : 0;
})

    .slice(0, 5);

  const globalCreditHealth = Math.max(300, Math.min(850, 850 - (totalDebt / (totalCreditLimit || 1)) * 200)); 

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Cargando datos...</div>;
  }
  
  const activeCreditsCount = credits.filter(c => c.status === "Activo").length;
  const pendingApprovalCount = credits.filter(c => c.status === "Pendiente Aprobación").length;

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader title="Panel de Control Administrador" description="Supervisa la red Tarjeta Colmado"/>

      <AdminStatsGrid
        totalDebt={totalDebt}
        totalConsumed={totalConsumedOverall}
        activeCreditsCount={activeCreditsCount}
        colmadosCount={colmadosCount}
        pendingApprovalCount={pendingApprovalCount}
      />

      <AdminCreditSummary
        totalCreditLimit={totalCreditLimit}
        totalDebt={totalDebt}
        availableCreditGlobal={availableCreditGlobal}
        globalCreditHealth={globalCreditHealth}
      />

      <AdminRecentActivityLists 
        credits={credits.filter(c => c.status === "Activo").slice(0, 5)} 
        consumptions={consumptions.slice(0, 5)} 
      />
      
      <AdminUpcomingPayments upcomingPayments={upcomingPaymentsList} />
    </div>
  );
};

export default Dashboard;
