
import React from "react";
import StatsCard from "@/components/dashboard/stats-card";
import { DollarSign, CreditCard, Store, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const AdminStatsGrid = ({ totalDebt, totalConsumed, activeCreditsCount, colmadosCount, pendingApprovalCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Deuda Total en Calle"
        value={`$${totalDebt.toLocaleString()}`}
        icon={<DollarSign className="h-6 w-6 text-red-500" />}
        description="Suma de balances pendientes"
        trend={null} 
        color="red"
      />
      <StatsCard
        title="Total Consumido (Histórico)"
        value={`$${totalConsumed.toLocaleString()}`}
        icon={<CreditCard className="h-6 w-6 text-blue-500" />}
        description="Consumo total en la red"
        trend={null}
        color="blue"
      />
       <StatsCard
        title="Colmados Activos"
        value={colmadosCount}
        icon={<Store className="h-6 w-6 text-green-500" />}
        description="Total de colmados en la red"
        trend={null}
        color="green"
        actionLink="/colmados"
        actionText="Gestionar Colmados"
      />
      <StatsCard
        title="Créditos Pendientes"
        value={pendingApprovalCount}
        icon={<Clock className="h-6 w-6 text-yellow-500" />}
        description="Solicitudes por aprobar"
        trend={null}
        color="yellow"
        actionLink="/creditos"
        actionText="Revisar Solicitudes"
      />
    </div>
  );
};

export default AdminStatsGrid;
